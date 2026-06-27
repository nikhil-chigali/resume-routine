# Resume Tailor Routine

This repo is the self-contained bundle for the Claude Code Routine that tailors Nikhil Chigali's master resume to a specific job description, then uploads the artifacts to Google Drive and notifies a downstream webhook.

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
2. **Tailor the resume.** Follow the instructions in [`./skill/SKILL.md`](./skill/SKILL.md) end-to-end. The skill produces a `.docx` resume file written to a temp path.
3. **Upload the resume to Drive.** Use the Google Drive MCP to upload the `.docx` into the folder identified by env var `RESUME_DRIVE_FOLDER_ID`. Capture the returned Drive `fileId` as `resumeFileId`.
4. **Upload the JD to Drive.** Save the JD text (the raw text used in step 2, plus the screening-prep notes the skill generates) as a `.txt` file into the folder identified by env var `JD_DRIVE_FOLDER_ID`. Capture the returned Drive `fileId` as `jdFileId`.
5. **POST to the Apps Script webhook.** Send a POST request to the URL in env var `APPS_SCRIPT_WEBAPP_URL` with this exact JSON body:

   ```json
   {
     "secret": "<value of WEBAPP_SECRET env var>",
     "threadId": "<the threadId from the trigger>",
     "resumeFileId": "<Drive fileId of the uploaded resume>",
     "jdFileId": "<Drive fileId of the uploaded JD>"
   }
   ```

   `Content-Type: application/json`. Retry on transient failure (timeout, 5xx) with one backoff retry. On final failure, log the payload and the response body, then exit non-zero.

6. **Cleanup.** Delete any local temp files (the working build script copy, the `.docx`, the JD `.txt`). The Routine's only persistent outputs are the two Drive uploads and the webhook POST.

## Required environment variables

| Var | Purpose |
|---|---|
| `RESUME_DRIVE_FOLDER_ID` | Drive folder ID where tailored `.docx` resumes are uploaded |
| `JD_DRIVE_FOLDER_ID` | Drive folder ID where JD `.txt` files are uploaded |
| `APPS_SCRIPT_WEBAPP_URL` | URL of the Apps Script Web App that receives the POST |
| `WEBAPP_SECRET` | Shared secret included verbatim in the POST body for the webhook to validate |

If any env var is missing at run time, fail fast with a clear error naming the missing var. Do not invent fallback values.

## Files in this repo

- [`CLAUDE.md`](./CLAUDE.md) — you are here. Routine-level orchestration contract.
- [`skill/SKILL.md`](./skill/SKILL.md) — the resume-tailor skill, adapted for the Routine (writes to a temp path, not the local filesystem).
- [`master/master_resume.md`](./master/master_resume.md) — canonical master resume. The skill selects from this. Do NOT edit during a run.
- [`master/build_resume.js`](./master/build_resume.js) — reference `.docx` generator. The skill copies this to a temp working file per run, fills it in, runs it, then deletes the copy.

## Non-negotiables

- **No filesystem persistence between runs.** All artifacts go to Drive + webhook. The repo state is read-only at runtime.
- **No fabrication.** The honest-gap discipline in the master is binding. If a JD requires a capability not in the master and not in the honest-gaps table, surface it in the JD `.txt` upload as a noted gap. Do NOT silently invent.
- **Style rules are enforced.** No em-dashes in prose. No AI-tell phrases ("track record," "leverage" as verb, "transformative," "robust," "seamlessly," "cutting-edge," "spearheaded"). Calibri throughout. US Letter, ~0.7" margins, 2-page target.
- **No PII leakage outside Drive + webhook.** The Routine MUST NOT log JD content, resume content, or env var values to stdout/stderr in production. Log only the threadId, the two fileIds, and high-level status.
- **The secret stays in the webhook body only.** Do NOT echo `WEBAPP_SECRET` into logs or include it in headers, query strings, or filenames.

## On failure

If any step fails after the Drive uploads have succeeded, still POST the webhook with whichever fileIds you have plus a `status: "partial"` field added to the body. If both uploads fail, do NOT POST; exit non-zero so the upstream caller can retry.
