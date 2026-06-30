# resume-routine

Self-contained bundle for a Claude Code Routine that tailors Nikhil Chigali's master resume to a specific job description, then POSTs the bytes to a Google Apps Script webhook. The webhook archives both files to Drive and replies on the Gmail thread under your own Google identity. The Routine itself never touches Drive or Gmail — no service account, no OAuth refresh token, no Drive connector.

## What it does

```
API trigger ──▶ Routine clones this repo ──▶ Reads CLAUDE.md
                                                  │
                                                  ▼
                                         Step 0: Ensure docx installed
                                         Step 1: Parse text → { threadId, jobDescription }
                                         Step 2: Run skill (tailor resume)
                                                  │
                                                  ▼
                                         Skill reads master/master_resume.md
                                         Skill copies master/build_resume.js to TMPDIR
                                         Skill fills in JD-specific content
                                         Skill runs build → writes .docx + .txt to TMPDIR
                                                  │
                                                  ▼
                                         Step 3: POST to APPS_SCRIPT_WEBAPP_URL
                                                 body: { secret, threadId,
                                                         resumeB64, resumeName,
                                                         jdB64, jdName }
                                                 (base64 built in a subprocess
                                                  so file bytes never reach
                                                  the model token stream)
                                                  │
                                                  ▼
                                         Apps Script doPost (runs as you):
                                           - DriveApp.createFile → resumeFileId, jdFileId
                                           - GmailApp reply on threadId with .docx attached
                                           - label updates
                                           - returns { ok, resumeFileId, jdFileId }
                                                  │
                                                  ▼
                                         Step 4: Cleanup TMPDIR
```

## Layout

| Path | Purpose |
|---|---|
| `CLAUDE.md` | Routine orchestration contract. First file the agent reads at runtime. Owns trigger parsing, webhook POST shape, cleanup, env-var requirements, failure-mode rules. |
| `skill/SKILL.md` | The tailoring skill. Same selection logic as the local `resume-tailor` skill, adapted for the Routine: writes to `TMPDIR`, runs the gap check silently, hands paths back to the orchestrator. |
| `master/master_resume.md` | Canonical master resume. Read-only at runtime. The skill selects bullets, projects, and skills from here. |
| `master/build_resume.js` | Reference `.docx` generator. The skill copies this to `TMPDIR` per run, fills it in, executes, then deletes the copy. Template stays untouched. |
| `README.md` | You are here. Human-facing setup + maintenance guide. |

## Setup checklist

### 1. Google Drive folders

Create two Drive folders (resume archive + JD archive) and copy their IDs from the URL:
`https://drive.google.com/drive/folders/<FOLDER_ID>`.

The Routine NEVER reads these IDs. They live on the Apps Script side as Script Properties (`RESUME_FOLDER_ID`, `JD_FOLDER_ID`) and `doPost` writes to them using its own (your own) `DriveApp` permissions. No sharing or service-account setup is needed — the script runs as you.

### 2. Apps Script Web App

In your Apps Script project:

1. Author the `doPost` handler (canonical version lives alongside this repo; reference the one your build uses). It:
   - Validates `p.secret` against the Script Property `WEBAPP_SECRET` (reject on mismatch with `{ ok: false, error: 'unauthorized' }`).
   - Decodes `p.resumeB64` and `p.jdB64` into `Utilities.newBlob` blobs.
   - Writes both blobs to `DriveApp.getFolderById(...).createFile(blob)` using `RESUME_FOLDER_ID` and `JD_FOLDER_ID` Script Properties.
   - Looks up the Gmail thread by `p.threadId` and either drafts or sends a reply (controlled by Script Property `REPLY_MODE`, default `draft`) with the resume blob attached.
   - Returns `{ ok: true, resumeFileId, jdFileId }`.
2. Set Script Properties: `WEBAPP_SECRET`, `RESUME_FOLDER_ID`, `JD_FOLDER_ID`, `REPLY_MODE` (`draft` or `send`).
3. Deploy as a Web App; access = "Anyone" (auth is the shared secret in the POST body, not Google identity).
4. Copy the deployed `/exec` URL.

> **302 redirect gotcha:** Apps Script `/exec` URLs 302-redirect to `script.googleusercontent.com`. The Routine's `curl` invocation uses `-L` to follow the redirect. Do NOT replace `curl` with raw Node `https.request` unless you handle the 302 yourself — it returns an empty body with no error otherwise.

### 3. Set environment variables on the Routine

| Var | Value |
|---|---|
| `APPS_SCRIPT_WEBAPP_URL` | Web App `/exec` URL from step 2 |
| `WEBAPP_SECRET` | Shared secret string (generate a long random value; the Apps Script Script Property of the same name holds the matching copy) |

The Drive folder IDs are NOT here. They are on the Apps Script side as Script Properties.

### 4. Trigger contract

The `/fire` endpoint of the Claude Code Routine API accepts exactly ONE optional field, `text`. The value is freeform; structured payloads, JSON objects, and alternate field names are NOT parsed — anything other than `text` is silently dropped.

Pack everything the Routine needs into the single `text` string using this tagged format:

```
<thread_id>gmail thread id</thread_id>
<jd>
raw email body, multiline ok
</jd>
```

The Routine parses both values back out at Step 1:
- `thread_id` → opaque string passed through to the webhook
- `jd` → raw JD body, multiline allowed

Tags are case-sensitive. Both are REQUIRED. If either tag is missing, malformed, or empty after trimming, the Routine fails fast (no webhook POST). Closing tag `</jd>` inside the JD body would break the parser; the caller is responsible for either not embedding it or escaping it upstream.

Example `curl` against the `/fire` endpoint:

```bash
curl -X POST "$FIRE_URL" \
  -H "Authorization: Bearer $FIRE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"text": "<thread_id>abc123</thread_id>\n<jd>\nSenior AI Engineer (Remote)...\n</jd>"}'
```

For the full parsing rules and reference Node parser, see [`CLAUDE.md`](./CLAUDE.md) §Trigger contract.

## Local smoke test

Before wiring the trigger, sanity-check the bundle locally:

```bash
# 1. Confirm Node + docx
node -e "require('docx')" 2>/dev/null || npm install -g docx

# 2. Confirm the master parses (must be > 0 bytes)
wc -l master/master_resume.md

# 3. Confirm the build script runs (writes a placeholder docx)
NODE_PATH=$(npm root -g) node master/build_resume.js
ls -la tailored_resumes/  # should contain a Nikhil_Chigali_Resume_<Company>_<Role>.docx
rm -rf tailored_resumes/  # cleanup
```

If steps 1–3 pass, the bundle is internally consistent. The webhook POST and the Apps Script side can only be tested end-to-end from inside a real Routine run with env vars + Script Properties set.

## Updating the master resume

When you gain new experience, ship a new project, or correct a metric:

1. **Edit `master/master_resume.md` directly.** Do not edit individual tailored outputs.
2. Preserve stable IDs (e.g. `EXP-VZ-B1`, `PRJ-CCF-B3`). Do not renumber.
3. Update `archetype`, `keywords`, `strength`, `truth` tags as needed.
4. If you fill an `Honest Gaps` entry with real shipped work, move it out of the gaps table into the appropriate skill or experience section.
5. Any new quantitative achievement must have a matching entry in the `METRICS` table.
6. Commit and push. The next triggered Routine run picks up the new master automatically (fresh clone every run).

The local `resume-tailor` skill at `<project_root>/.claude/skills/resume-tailor/` and this Routine's `skill/SKILL.md` share the same selection logic. If you change the tailoring rules, update both.

## Failure modes

| Failure | Behavior |
|---|---|
| Malformed `text` payload (missing `<thread_id>` or `<jd>` tag, empty after trim) | Fail fast naming the offending tag, exit non-zero, no POST. Do NOT log the raw `text` blob (contains JD content). |
| Missing env var at runtime | Fail fast, name the missing var, exit non-zero. |
| `docx` install fails | Fail fast on Step 0, exit non-zero. |
| `.docx` or `.txt` build fails inside the skill | Exit non-zero before the POST is attempted. |
| Webhook POST returns 5xx or times out | One retry with short backoff. On final failure, log status + threadId + a generic error tag (NEVER the body — it contains base64 of the resume), exit non-zero. |
| Webhook POST returns 4xx other than 429 | No retry. Log + exit non-zero. |
| Webhook returns HTTP 200 with `{ ok: false, error: ... }` | Treat as logical failure. Log the short `error` tag (e.g. `unauthorized`, `thread_not_found`) plus the threadId. Exit non-zero. |
| Apps Script internally fails to write to Drive or reply on Gmail | Owned by `doPost`. The Routine sees only what `doPost` returns; no partial-success state to handle on the Routine side. |

## Non-negotiables (lifted from CLAUDE.md)

- **No fabrication.** Honest-gap discipline is binding. If a JD requires a capability not in the master and not in the honest-gaps table, surface it in the JD `.txt` (which the webhook archives to Drive) as a noted gap. Do not silently invent.
- **Style rules enforced.** No em-dashes in prose. No AI-tell phrases. Calibri throughout. US Letter, ~0.7" margins; 2 pages preferred but soft (3 pages OK).
- **No PII to logs.** The Routine must not log JD content, resume content, or base64 payloads. Log only `threadId`, the two `fileId`s the webhook returns, and high-level status.
- **Base64 stays out of the model context.** Build the POST body in a subprocess (the `node -e ...` pattern in CLAUDE.md Step 3). The model writes the `curl` invocation once; the file bytes never reach the token stream.
- **The secret stays in the POST body only.** Never echo `WEBAPP_SECRET` into logs, headers, query strings, or filenames.
