# Resume Tailor Routine

This repo is the self-contained bundle for the Claude Code Routine that tailors Nikhil Chigali's master resume to a specific job description, then POSTs the artifacts as base64-encoded bytes to a Google Apps Script webhook. The webhook archives the files to Drive and replies on the Gmail thread, all running under the user's own Google identity. The Routine itself never touches Drive or Gmail.

## Trigger contract

The Routine is invoked via the API trigger's `/fire` endpoint. The endpoint accepts exactly ONE optional field: `text`. Its value is freeform — the trigger does NOT parse JSON, structured payloads, or alternate field names. Anything other than `text` is silently dropped. Everything the Routine needs at trigger time must be packed into this single string, and the Routine parses it back out.

### Payload format

The upstream caller MUST format `text` as a tagged blob:

```
<thread_id>gmail thread id</thread_id>
<jd>
raw email body, multiline ok
</jd>
```

### Parsing rules

The Routine MUST extract two values from `text`:

- `threadId` — the substring between `<thread_id>` and `</thread_id>`, trimmed of surrounding whitespace
- `jobDescription` — the substring between `<jd>` and `</jd>`, preserved verbatim including line breaks and inner whitespace

Tags are case-sensitive (`<thread_id>`, not `<threadId>` or `<thread-id>`). Both tags are REQUIRED. The `<jd>` content may span multiple lines and contain any characters, including angle brackets, but it MUST NOT contain the literal closing tag `</jd>` (the caller is responsible for ensuring this; the Routine does not unescape).

A reference Node parser:

```js
const m = (text, open, close) => {
  const re = new RegExp(`${open}([\\s\\S]*?)${close}`);
  const match = text.match(re);
  return match ? match[1].trim() : null;
};
const threadId = m(text, '<thread_id>', '</thread_id>');
const jobDescription = m(text, '<jd>', '</jd>'); // optionally skip .trim() if leading whitespace matters
```

If either tag is missing, malformed, or extracts to an empty string after trimming, fail fast with an error that names the offending tag. Log only the failure mode, never the raw `text` blob (it contains JD content). Exit non-zero so the upstream caller can surface the malformed payload.

## What the Routine does (end to end)

For every triggered run, follow this exact sequence:

0. **Ensure dependencies.** The skill's build step needs the `docx` npm package available to Node. Cloud Routine runs clone the repo fresh, so the base image's package state is not guaranteed. Run:

   ```bash
   node -e "require('docx')" 2>/dev/null || npm install -g docx
   ```

   Check-first: a no-op (~50ms) when `docx` is already present; falls through to a global install (~5–10s) when missing. Fail fast if the install itself errors.

1. **Parse and validate input.** Extract `threadId` and `jobDescription` from the trigger's `text` field per the parsing rules in the Trigger contract section above. Confirm both are present and non-empty after trimming. `jobDescription` is treated as raw text and used as-is (the parsing rules do NOT accept URLs; if a caller sends a URL, treat the URL string itself as the JD body).
2. **Tailor the resume.** Follow the instructions in [`./skill/SKILL.md`](./skill/SKILL.md) end-to-end. The skill produces two files at temp paths and hands the paths plus the company/role slug back to the orchestrator:
   - `<TMPDIR>/Nikhil_Chigali_Resume_<Company>_<Role>.docx` — the tailored resume
   - `<TMPDIR>/Nikhil_Chigali_Resume_<Company>_<Role>.txt` — the JD body plus the screening-prep notes the skill appends

3. **POST to the Apps Script webhook.** Send a single POST to the URL in env var `APPS_SCRIPT_WEBAPP_URL` with both files inlined as base64. The webhook handles Drive archiving AND the Gmail reply atomically; the Routine does NOT touch Drive directly and does NOT need a Google connector.

   POST body (JSON, `Content-Type: application/json`):

   ```json
   {
     "secret": "<value of WEBAPP_SECRET env var>",
     "threadId": "<the threadId parsed from the trigger>",
     "resumeB64": "<base64 of the .docx bytes>",
     "resumeName": "Nikhil_Chigali_Resume_<Company>_<Role>.docx",
     "jdB64": "<base64 of the .txt bytes>",
     "jdName": "Nikhil_Chigali_Resume_<Company>_<Role>.txt"
   }
   ```

   Build the body inside a subprocess so the base64 payloads never enter the model's token stream — that keeps the run as fast as a native upload would have been and avoids spending output tokens on file contents. Reference invocation:

   ```bash
   curl -sS -L "$APPS_SCRIPT_WEBAPP_URL" \
     -H "Content-Type: application/json" \
     -d "$(node -e 'const fs=require("fs");process.stdout.write(JSON.stringify({
           secret: process.env.WEBAPP_SECRET,
           threadId: process.env.THREAD_ID,
           resumeB64: fs.readFileSync(process.env.RESUME_PATH).toString("base64"),
           resumeName: process.env.RESUME_NAME,
           jdB64: fs.readFileSync(process.env.JD_PATH).toString("base64"),
           jdName: process.env.JD_NAME
         }))')"
   ```

   Two curl details are **load-bearing**:

   - **Keep `-L`.** Apps Script `/exec` URLs 302-redirect to `script.googleusercontent.com/macros/echo`, which is what actually serves the `doPost` return value. `curl -L` follows the redirect; plain Node `https.request` does NOT and you would get a silent empty 302 with no error.
   - **Do NOT add `-X POST`.** The `-d` flag already makes the initial request a POST. Adding `-X POST` forces the POST method onto the redirected request as well, but the echo endpoint only accepts GET, so it answers 405 and you never read the response body. Without `-X POST`, curl correctly downgrades to GET when following the 302. (This combination, `-L -X POST`, is a silent footgun: the POST to `/exec` still runs `doPost` with all its side effects, but you get a 405 instead of the `{ ok: true }` confirmation, so it looks like a failure when the archive and reply may have already happened.)
   - **A successful response body is JSON** (`{ ok: true, ... }`). If the body is HTML (a Google error page such as `ReferenceError: ... is not defined`), `doPost` threw an uncaught exception on the webhook side — e.g. a missing helper function or a stale deployment serving old code. Treat a non-JSON / HTML response as fatal: exit non-zero and surface that the Apps Script deployment needs attention. It is not something the Routine can fix, and because `doPost` may have completed its Drive / Gmail side effects before crashing on the response, do NOT blindly re-POST (you would duplicate the archive and the reply) — verify state first.

   The webhook responds with `{ ok: true, resumeFileId, jdFileId }` on success. Capture those file IDs and log them; do NOT use them for any control flow inside the Routine (they are observability only).

   Retry once on transient failure (timeout or 5xx). On final failure, log only the response status, the threadId, and a generic error tag — NEVER log the response body or the POST body (both contain base64 of the resume). Exit non-zero.

4. **Cleanup.** Delete the temp `.docx`, the temp `.txt`, and the working build script copy. The Routine's only persistent output is the webhook POST; Drive archiving, Gmail reply drafting/sending, and label updates are all owned by the Apps Script side.

## Required environment variables

| Var | Purpose |
|---|---|
| `APPS_SCRIPT_WEBAPP_URL` | URL of the Apps Script Web App that receives the POST |
| `WEBAPP_SECRET` | Shared secret included verbatim in the POST body for the webhook to validate |

If any env var is missing at run time, fail fast with a clear error naming the missing var. Do not invent fallback values.

The Drive folder IDs that used to live here have moved to **Apps Script Script Properties** (`RESUME_FOLDER_ID`, `JD_FOLDER_ID`). They are no longer the Routine's concern — `doPost` reads them directly.

## Files in this repo

- [`CLAUDE.md`](./CLAUDE.md) — you are here. Routine-level orchestration contract.
- [`skill/SKILL.md`](./skill/SKILL.md) — the resume-tailor skill, adapted for the Routine (writes to a temp path, not the local filesystem).
- [`master/master_resume.md`](./master/master_resume.md) — canonical master resume. The skill selects from this. Do NOT edit during a run.
- [`master/build_resume.js`](./master/build_resume.js) — reference `.docx` generator. The skill copies this to a temp working file per run, fills it in, runs it, then deletes the copy.

## Non-negotiables

- **No filesystem persistence between runs.** The Routine's only persistent output is the webhook POST. The repo state is read-only at runtime.
- **No fabrication.** The honest-gap discipline in the master is binding. If a JD requires a capability not in the master and not in the honest-gaps table, surface it in the JD `.txt` (which the webhook archives to Drive) as a noted gap. Do NOT silently invent.
- **Style rules are enforced.** No em-dashes in prose. No AI-tell phrases ("track record," "leverage" as verb, "transformative," "robust," "seamlessly," "cutting-edge," "spearheaded"). Calibri throughout. US Letter, ~0.7" margins; 2 pages preferred but soft (3 pages OK).
- **No PII to logs.** The Routine MUST NOT log JD content, resume content, base64 payloads, or env var values. Log only the threadId, the two fileIds the webhook returns, and high-level status (e.g., `posted`, `retried`, `failed`).
- **Base64 stays out of the model context.** Build the POST body in a subprocess (the `node -e ...` pattern above). The model writes the curl invocation once; the file bytes never reach the token stream.
- **The secret stays in the webhook body only.** Do NOT echo `WEBAPP_SECRET` into logs or include it in headers, query strings, or filenames.

## On failure

The webhook POST is atomic from the Routine's perspective: either it succeeds (`{ ok: true, ... }`) or it fails. There is no partial-success state to handle on the Routine side — `doPost` owns its own internal failure modes (Drive write failed, Gmail thread missing, label not found, etc.) and surfaces them in the response.

- **Transient failure** (network timeout, 5xx): retry once with a short backoff (~2s). On the second failure, exit non-zero so the upstream caller can decide whether to re-fire.
- **Authoritative failure** (4xx other than 429): do not retry. Log status + threadId, exit non-zero.
- **Webhook returns `{ ok: false, error: ... }`** with HTTP 200: treat as a logical failure. Log the `error` field (it is a short tag like `unauthorized`, `thread_not_found`, never PII) and exit non-zero.
- **Egress blocked at the network proxy** (curl exits with code 56 / `http=000` and the agent proxy reports a 403/407 CONNECT denial for `script.google.com`): this is NOT transient. The Routine environment's network policy does not permit the webhook host. Do not retry or route around it; exit non-zero and surface that the environment must allow egress to `script.google.com` and `script.googleusercontent.com` (the `/exec` redirect target).
- **Webhook returns an HTML error page** (HTTP 200 but the body is HTML, not JSON): `doPost` threw an uncaught exception (webhook-side bug or stale deployment). Treat as fatal; exit non-zero. Note the side effects may already have run, so do NOT auto-re-POST.

If Steps 0, 1, or 2 fail before the POST is attempted, do NOT POST. Exit non-zero with the step that failed in the error message.
