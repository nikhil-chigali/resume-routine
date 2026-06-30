---
name: resume-tailor-routine
description: Tailor Nikhil Chigali's master resume to a specific job description from inside a Claude Code Routine. Produces a .docx written to a temp path so the Routine orchestrator can base64-encode it and POST it to an Apps Script webhook. This is the Routine-context adaptation of the local resume-tailor skill — same selection logic, different output sink.
---

# Resume Tailor (Routine context)

Tailor Nikhil Chigali's master resume to a specific JD, honestly and precisely. This SKILL.md is self-sufficient inside the Routine bundle: it contains everything the agent needs without reading anything outside `./resume-routine/`.

## When this skill runs

This skill is invoked by the Routine entrypoint defined in [`../CLAUDE.md`](../CLAUDE.md). The Routine has already validated that `threadId` and `jobDescription` are present and resolved any URL JD to raw text. This skill takes the raw JD text as input and produces a `.docx` file at a temp path.

## Inputs from the orchestrator

| Input | Source |
|---|---|
| `threadId` | Trigger payload (passed through, not used inside this skill) |
| `jobDescription` | Raw JD text (already URL-resolved by the orchestrator) |

## Outputs to the orchestrator

| Output | Description |
|---|---|
| `resumeDocxPath` | Absolute path to the generated `.docx` (in a temp directory). The orchestrator base64-encodes the file bytes and inlines them in the webhook POST. |
| `jdTextPath` | Absolute path to the saved JD `.txt` (in a temp directory). The orchestrator base64-encodes and inlines this too. The text includes the raw JD plus a screening-prep notes block this skill appends. |
| `companyRoleSlug` | PascalCase company + role string used in both filenames (e.g. `BradsbyGroup_AIEngineer`). Cold-send fallback: `General_<RoleType>`. |

After this skill returns, the orchestrator POSTs both files (as `resumeB64` + `jdB64`) plus the slug-derived names to the Apps Script webhook per [`../CLAUDE.md`](../CLAUDE.md) Step 3. The Routine itself does NOT touch Drive; `doPost` archives the files and replies on the Gmail thread under the user's own Google identity. After the POST, the orchestrator deletes both temp files.

## Naming convention

Both temp files use the same base name (same convention as the local skill):

- `<TMPDIR>/Nikhil_Chigali_Resume_<Company>_<Role>.docx` — the resume
- `<TMPDIR>/Nikhil_Chigali_Resume_<Company>_<Role>.txt` — the JD + screening notes

Format: `Nikhil_Chigali_Resume_` + PascalCase company + `_` + PascalCase role. No spaces, no special characters. Examples:
- `Nikhil_Chigali_Resume_Akkodis_MLDSResearchTranslation`
- `Nikhil_Chigali_Resume_QuestHalliburton_AgenticAIEngineer`
- `Nikhil_Chigali_Resume_General_AIDeveloperRAG` (no company named)

## The tailoring loop

### Step 1: Load the master

Read `../master/master_resume.md` in full. Pay attention to:
- The **AGENT INSTRUCTIONS** preamble (governs everything below)
- The **Honest Gaps** table (non-negotiable claim limits)
- The **ROLE ARCHETYPES** table (classification taxonomy)
- The **METRICS** table (canonical numbers, never rephrase)
- The **STYLE** section at the bottom

### Step 2: Parse the JD

Extract, in this order:
1. Role title (verbatim)
2. Company (verbatim, or `General` if no company named)
3. Role archetype (primary + optional secondary, from the master's taxonomy)
4. Must-have skills (flag any that map to `truth: none` or `truth: familiar` in the master)
5. Nice-to-have skills
6. Keywords (flat list of tools, frameworks, techniques)
7. Domain signals (industry, scale, regulatory context)

### Step 3: Gap check

For each must-have in the JD, classify:
- **Full match**: ≥1 master item with matching `keywords` and `truth: verified`
- **Adjacent match**: related item with `truth: adjacent` or `truth: familiar` — usable with honest framing
- **No match**: no relevant item anywhere — a real gap

**In Routine context the gap check is silent** (no user to ask). Apply this rule: if 0–2 of the must-haves are "No match," proceed with honest in-resume framing for those gaps and document them in the screening-prep notes appended to the JD `.txt`. If 3+ must-haves are "No match," still produce the resume (the orchestrator does not have an abandon path), but lead the screening-prep notes with a `SCREENING RISK: HIGH` block naming the gaps and recommending the upstream caller flag the application for human review.

**Honest gaps (NEVER claim as shipped work — same as the local skill):**

| Gap | Honest framing allowed |
|---|---|
| Entity resolution / record linkage | Conceptual grasp of probabilistic matching, fuzzy strings, clustering; applying related patterns in retrieval / similarity work. |
| TensorFlow / Keras | Coursework and familiarity; production work is PyTorch. |
| Amazon Bedrock / Google Model Garden / NVIDIA NIM / Azure AI Foundry | Familiar with concepts (model hosting, managed inference, vendor abstraction); no shipped projects. |
| HuggingFace Transformers in production | Familiar with ecosystem; LoRA fine-tuning in active progress, no shippable artifact yet. |
| CrewAI in production | LangGraph + LangChain are daily drivers; CrewAI under evaluation. |
| Java / .NET / Spring Boot | Not in master. Python is the shipped backend. Do not claim. |
| Kubernetes in production | Working knowledge of patterns; shipped containerization is Docker + Railway + Azure ML. |
| Healthcare / finance / legal / O&G domain knowledge | Transferable regulated-industry patterns (guardrails, citation enforcement, audit trails); no direct domain experience. SAR oil-seep CV is the closest oil & gas adjacency. |
| B2B / GTM / CRM (Salesforce, Marketo, AEP, lead scoring) | Conceptual; no shipped B2B GTM client work. |
| Patents | No patents filed. arXiv publication covers the IP-development credential partially. |

### Step 4: Select content

Follow the master's AGENT INSTRUCTIONS. Quick summary:

**Summary:** Pick ONE variant matching the primary archetype. Break it into 5–6 bullets. The first bullet establishes seniority + credential context; the rest mirror the JD's responsibility list in order. Lightly edit to incorporate 2–3 JD keywords naturally. Do not invent capabilities.

**Skills:** 5–7 lines. Always include S-tier groups for the archetype. Include `truth: familiar` items ONLY if the JD explicitly names them. Within a group, reorder so JD-matched items lead. **Label categories using JD vocabulary** when the JD names a specific area (e.g. for an LLM Engineer JD that names "RAG and knowledge bases," "prompt engineering, few-shot," "evaluation/benchmarking," use those exact phrasings).

**Experience:** **Every experience section in the master MUST appear in the output** (Verizon + D2K + Microsoft + Indian Servers). Omitting a role to chase archetype-fit is not allowed — it reads as an unexplained gap.

**Experience bullets:** **Minimum 3 per role (hard floor)**, default 3, max 4 for the most-recent/most-relevant role. When JD scope exists, tailor; when a role has no JD-relevant angle, retain the master's bullets verbatim at the floor. Page length is a soft preference (see Step 7) — do not trim experience bullets to compress the page. If page pressure remains after a relaxed pass, the resume can run to three pages. (Exception: if the master itself has fewer than 3 bullets for a role, surface that to the user as a master-amendment ask rather than shipping a 2-bullet role.)

**Projects:** 2–3 typical. Rank by `strength` tier for archetype, then keyword overlap with JD. **Projects appear BEFORE Experience by default.** Invert (Experience above Projects) only for heavily experience-weighted JDs; note the inversion in the screening-prep notes.

**Publications:** Include `PUB-SWIM` if archetype is RESEARCH-CV, or if the JD names research authorship, IP, publications, or patents.

**Certifications:** Include the section if primary or secondary archetype is GENAI / AGENTS / FULLSTACK-GENAI, OR the JD names Anthropic, Claude, MCP, AI literacy, or responsible AI. Cap at 5. Selection by archetype:
- AGENTS primary: Subagents + MCP Advanced + MCP Intro (top 3)
- GENAI / FULLSTACK-GENAI: 3–5 from Subagents, MCP, Claude 101, Claude Code, AI Fluency
- JD names Claude Code or AI-assisted dev: lead with Claude Code in Action + Claude Code 101
- All else: omit the section

**Education:** Always include, unchanged. Trim coursework only if tight on space.

### Step 5: Header location rules

Default header location is `Houston, TX`. Overrides:

| Condition | Override |
|---|---|
| TX-based role outside Houston metro | `Austin, TX` (in-state-local signal) |
| TX-based role in Houston metro (Conroe, Sugar Land, Pearland, The Woodlands, Spring) | `Houston, TX` (natural commute base wins over the Austin signal) |
| Role requires travel (any state) | `Houston, TX` (credible launch base for short-notice travel) |
| All other states / remote | `Houston, TX` |

If the JD does not specify a location (cold send or generic), use `Houston, TX`.

### Step 6: Adapt the build script

Copy `../master/build_resume.js` to a temp working path (e.g. `<TMPDIR>/build_<companyrole>.js`). Fill in:
- `OUTPUT_PATH` → `<TMPDIR>/Nikhil_Chigali_Resume_<Company>_<Role>.docx`
- All content arrays (summary bullets, skills lines, projects, experience, certs, education)
- Tech lines and bullet text drawn from the master, verbatim where possible

Build primitives provided by the script: `t()`, `link()`, `sectionHeading()`, `roleHeader()`, `techLine()`, `skillLine()`, `projectHeader()`, `bullet()`, `certLine()`, `para()`.

Run the working script:

```
NODE_PATH=$(npm root -g) node <TMPDIR>/build_<companyrole>.js
```

Prerequisite: `docx` npm package installed globally on the Routine runtime. If missing, install before running: `npm install -g docx`.

### Step 7: Validate the output

After the script writes the `.docx`:

1. **File exists** at the expected `OUTPUT_PATH`.
2. **No em-dashes (—) in prose.** En-dashes (–) in date ranges are fine. Em-dashes inside cert titles (e.g. "Model Context Protocol — Advanced Topics") are exempt because they are the issuer's official cert name.
3. **No AI-tell phrases:** "track record," "leverage" (as a verb), "transformative," "robust," "seamlessly," "cutting-edge," "spearheaded," the "X — Y, transforming Z" cadence. Use grep over the working script source before running.
4. **Metrics fidelity:** every quantitative claim matches the master's METRICS table verbatim.
5. **Page length:** 2 pages preferred, 3 pages acceptable. Do not burn cycles trimming content to fit two pages — the bullets, projects, and skills carry the application. If the resume naturally runs to 3 pages because the JD pulled a lot of master content into scope, ship it.

### Step 8: Save the JD + screening notes

Write the JD `.txt` to `<TMPDIR>/Nikhil_Chigali_Resume_<Company>_<Role>.txt`. Structure:

```
Source: <how the JD reached the Routine, e.g. "API trigger payload">.

Role: <verbatim title>
Location: <verbatim>
Type: <FT / contract / etc., if stated>

---

FULL JD:

<verbatim JD body>

---

SCREENING-PREP NOTES:

POSITIONING (archetype: <primary>, <secondary>):
<2-3 sentences positioning the candidate against the JD>

LAYOUT:
<bullet list of layout choices made and why>

UNUSUALLY STRONG MATCHES (lean into):
<numbered list of 3-6 strongest signal alignments>

HONEST GAPS / FRAMINGS:
<numbered list of 2-5 gaps + the framing to use in screening>

NOTES:
<misc: routing context, recruiter pattern, etc.>
```

If 3+ must-haves are "No match" from Step 3's gap check, prepend a `SCREENING RISK: HIGH` block at the top of SCREENING-PREP NOTES naming the gaps.

### Step 9: Hand back to the orchestrator

Return (or expose for the orchestrator to pick up):
- `resumeDocxPath` = the temp `.docx` absolute path
- `jdTextPath` = the temp `.txt` absolute path
- `companyRoleSlug` = the PascalCase company+role used in both filenames

The orchestrator base64-encodes both files, POSTs them to the Apps Script webhook, and then deletes the temp files. Do not delete the temp files yourself.

## Style rules (enforced, same as local skill)

- **Page size:** US Letter (8.5" × 11"), ~0.7" margins; 2 pages preferred but soft, 3 pages acceptable.
- **Font:** Calibri throughout, 10pt body, 11pt role headers, 16pt name header.
- **Section headings:** ALL CAPS, bold, 11pt, thin black bottom border.
- **Role headers:** Company bold left, location bold right-aligned; role italic left, dates italic right-aligned.
- **Tech line:** `Tech:` bold + comma-separated list directly under role header.
- **Bullets:** single-level `•` marker, ~2 lines max each, left-indented ~0.25".
- **Hyperlinks:** blue (#0563C1), underlined.
- **No em-dashes (—) in prose.** Use commas, periods, colons, or parens. En-dashes (–) OK only in date/number ranges.
- **Oxford commas:** use them.
- **Voice:** direct, quantitative, decision-and-result focused.

## Principles (non-negotiable)

1. **Never fabricate experience.** If something isn't in the master, it doesn't go in the resume. Adjacent framing is fine; invention is not.
2. **Preserve canonical metrics verbatim.** Pull from the METRICS table by ID. Do not rephrase, round, or merge.
3. **Honesty on gaps beats keyword stuffing.** An ATS-beating resume that fails the screen is worse than an honest one that passes fewer filters.
4. **Two pages is the preference, not a hard constraint.** Let the resume run to three pages rather than trimming content to fit. Four+ pages still warrants a content review.
5. **Output must be a `.docx`.** The orchestrator sends `.docx` bytes to the Apps Script webhook for Drive archive + Gmail attachment; PDF / markdown are NOT acceptable.
6. **No em-dashes in prose.** Enforce even if the master accidentally contains them.
7. **Silent gap-check.** The Routine has no user to ask; document gaps in the JD `.txt` for downstream screening.
8. **The template at `../master/build_resume.js` stays untouched.** Adapt to a temp working file per run; delete the working file after success.
