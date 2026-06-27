# resume-routine

Self-contained bundle for a Claude Code Routine that tailors Nikhil Chigali's master resume to a specific job description, uploads the artifacts to Google Drive, and notifies a downstream webhook.

## What it does

```
API trigger ──▶ Routine clones this repo ──▶ Reads CLAUDE.md
                                                  │
                                                  ▼
                                         Step 0: Ensure docx installed
                                         Step 1: Validate { threadId, jobDescription }
                                         Step 2: Run skill (tailor resume)
                                                  │
                                                  ▼
                                         Skill reads master/master_resume.md
                                         Skill copies master/build_resume.js to TMPDIR
                                         Skill fills in JD-specific content
                                         Skill runs build → writes .docx + .txt to TMPDIR
                                                  │
                                                  ▼
                                         Step 3: Upload .docx to RESUME_DRIVE_FOLDER_ID
                                                 → resumeFileId
                                         Step 4: Upload .txt to JD_DRIVE_FOLDER_ID
                                                 → jdFileId
                                         Step 5: POST { secret, threadId,
                                                       resumeFileId, jdFileId }
                                                 to APPS_SCRIPT_WEBAPP_URL
                                         Step 6: Cleanup TMPDIR
```

## Layout

| Path | Purpose |
|---|---|
| `CLAUDE.md` | Routine orchestration contract. First file the agent reads at runtime. Owns trigger validation, Drive upload, webhook POST, cleanup, env-var requirements, failure-mode rules. |
| `skill/SKILL.md` | The tailoring skill. Same selection logic as the local `resume-tailor` skill, adapted for the Routine: writes to `TMPDIR`, runs the gap check silently, hands paths back to the orchestrator. |
| `master/master_resume.md` | Canonical master resume. Read-only at runtime. The skill selects bullets, projects, and skills from here. |
| `master/build_resume.js` | Reference `.docx` generator. The skill copies this to `TMPDIR` per run, fills it in, executes, then deletes the copy. Template stays untouched. |
| `README.md` | You are here. Human-facing setup + maintenance guide. |

## Setup checklist

### 1. Google Drive folders

Create two Drive folders and copy their IDs:

- **Resume folder** — where tailored `.docx` files land. Grab the folder ID from the URL: `https://drive.google.com/drive/folders/<FOLDER_ID>`.
- **JD folder** — where JD + screening-prep `.txt` files land.

Share both folders with whatever service account or OAuth identity the Routine uses to call the Drive MCP.

### 2. Apps Script Web App

Deploy a Google Apps Script Web App that:

1. Accepts POST with `Content-Type: application/json` and body `{ secret, threadId, resumeFileId, jdFileId }`.
2. Validates `secret` against your shared value (constant-time compare; reject on mismatch with a generic 401).
3. Does whatever downstream work you need: write a row to a tracker sheet, send a notification, link the two Drive files, post to a Discord/Slack channel, etc.

Copy the deployed Web App URL.

### 3. Set environment variables on the Routine

| Var | Value |
|---|---|
| `RESUME_DRIVE_FOLDER_ID` | Drive folder ID from step 1 (resume folder) |
| `JD_DRIVE_FOLDER_ID` | Drive folder ID from step 1 (JD folder) |
| `APPS_SCRIPT_WEBAPP_URL` | Web App URL from step 2 |
| `WEBAPP_SECRET` | Shared secret string (generate a long random value; the Apps Script reads the same value) |

### 4. Trigger contract

Configure the API trigger to POST a payload of:

```json
{
  "threadId": "<opaque string from upstream caller>",
  "jobDescription": "<raw JD text or URL>"
}
```

Both fields are required. The Routine fails fast and exits non-zero if either is missing.

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

If steps 1–3 pass, the bundle is internally consistent. Drive uploads and webhook POST can only be tested end-to-end from inside a real Routine run with env vars set.

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
| Missing `threadId` or `jobDescription` | Fail fast, exit non-zero, no Drive uploads, no POST. |
| Missing env var at runtime | Fail fast, name the missing var, exit non-zero. |
| `docx` install fails | Fail fast on Step 0, exit non-zero. |
| Resume Drive upload fails | If JD upload also fails, exit non-zero with no POST. If JD upload succeeds, POST with `status: "partial"` and `resumeFileId: null`. |
| JD Drive upload fails | Same partial-success rule, mirrored. |
| Webhook POST returns 5xx or times out | One retry with backoff. On final failure, log payload + response, exit non-zero. |
| Webhook returns 4xx other than retryable | No retry. Log + exit non-zero. |

## Non-negotiables (lifted from CLAUDE.md)

- **No fabrication.** Honest-gap discipline is binding. If a JD requires a capability not in the master and not in the honest-gaps table, surface it in the JD `.txt` upload as a noted gap. Do not silently invent.
- **Style rules enforced.** No em-dashes in prose. No AI-tell phrases. Calibri throughout. US Letter, ~0.7" margins, 2-page target.
- **No PII to logs.** The Routine must not log JD or resume content. Log only `threadId`, the two `fileId`s, and high-level status.
- **The secret stays in the POST body only.** Never echo `WEBAPP_SECRET` into logs, headers, query strings, or filenames.
