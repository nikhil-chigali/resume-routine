# MASTER RESUME — NIKHIL CHIGALI

> **This document is an agent-consumable master resume.** It is a structured content pool for a downstream tailoring agent to select from when drafting JD-specific resumes. It is NOT intended for direct submission.

---

## AGENT INSTRUCTIONS (read first)

### Document structure

Every selectable item (summary variant, skill group, bullet, project, etc.) has:
- A stable ID (e.g. `EXP-VZ-B1`) for referencing
- `archetype` tags indicating which role types the item fits
- `keywords` listing JD terms this item matches
- `strength` tier (S, A, B) indicating its selection priority
- `truth` tag (verified, adjacent, familiar, none) indicating how honestly the item can be claimed

### Tailoring workflow

1. **Parse the JD.** Extract: role archetype, required skills, preferred skills, responsibilities, keywords.
2. **Classify role archetype** using the "Role Archetypes" section below.
3. **Pick ONE summary variant** that matches the archetype. You may lightly edit it to hit 2–3 JD keywords naturally, but do not fabricate capabilities.
4. **Select skill groups.** Tailored resumes should have 5–7 skill categories, not all 13. Always include groups with `strength: S` for the archetype. Include `familiar` items only if the JD explicitly names them; otherwise omit.
5. **Select experience bullets.** 3 bullets per role is the default, sized to a 2-page-preferred target. Page length is a soft preference; do not drop content to compress. Prefer bullets where `keywords` overlap JD requirements AND `strength` is high. Never exceed 4 bullets for any single role.
6. **Select projects.** 2–3 projects typical. Pick the highest-`strength` projects for the archetype.
7. **Include publications, education** unchanged unless space requires trimming.
8. **Never invent content.** If the JD requires something marked `truth: none` in this doc (e.g. a specific framework you haven't used), either omit it or honestly disclaim it. Do not hallucinate experience.
9. **Preserve numbers verbatim.** All quantitative achievements are in the `METRICS` section with canonical phrasing. Do not round, alter, or restate them.
10. **Output format.** Produce a .docx matching the style in previous tailored resumes (see `STYLE` section at the bottom).

### Honest gaps (NEVER claim as shipped work)

| Gap | Honest framing allowed |
|---|---|
| Entity resolution / record linkage | "Strong grasp of probabilistic matching, fuzzy string algorithms, and clustering techniques; applying related patterns in retrieval/similarity work." |
| TensorFlow / Keras | "Coursework and familiarity; production work is PyTorch." |
| Amazon Bedrock / Google Model Garden / NVIDIA NIM | "Familiar with concepts (model hosting, managed inference, vendor abstraction); no shipped projects." |
| HuggingFace Transformers in production | "Familiar with ecosystem and transformers library; LoRA fine-tuning work in active progress, no shippable artifact yet." |
| CrewAI in production | "LangGraph and LangChain are daily drivers; CrewAI is under active evaluation via the agentic blog-drafting pipeline. The role-based-agent abstractions port over from the LangGraph supervisor/router pattern shipped on Clinical Codes Finder and the SMS system." |
| Specialized healthcare / finance / legal domain knowledge | "Transferable patterns from regulated-industry design (guard rails, citation enforcement, audit trails); no direct domain experience." |
| B2B / GTM / CRM domain (Salesforce, Marketo, Adobe Experience Platform, lead scoring, propensity modeling, opportunity pipelines) | "Conceptual familiarity (coursework and side-project exposure to propensity modeling and lead scoring patterns); no shipped B2B sales / GTM client work yet. The underlying classification-on-imbalanced-data and tree-based-feature-attribution muscle transfers directly from the 12M+ device classification work at the LatentView Verizon engagement." |

---

## ROLE ARCHETYPES

Tag definitions used throughout this document. A tailoring agent should classify the JD into one or more of these.

| ID | Name | Signals in JD |
|---|---|---|
| `GENAI` | GenAI / LLM Engineer | RAG, agents, prompt engineering, LangChain, OpenAI/Anthropic APIs, vector databases |
| `MLOPS` | ML Platform / MLOps | CI/CD for ML, model versioning, observability, MLflow, regression gating |
| `DATA-CDP` | Data / CDP / Entity Resolution | Customer matching, dedup, Spark/Dask, SQL at scale, Pinecone/pgvector |
| `RESEARCH-CV` | Research / Computer Vision | Publications, fine-tuning, model optimization, segmentation, CV benchmarks |
| `FULLSTACK-GENAI` | Full-stack GenAI engineer | End-to-end LLM features, API design, evaluation, product-focused |
| `AGENTS` | Agentic systems specialist | Multi-agent, tool use, MCP, supervisor/router, LangGraph |
| `CLASSICAL-ML` | Classical ML engineer | scikit-learn, XGBoost, feature engineering, SHAP, tabular data |
| `FULLSTACK` | Full-stack software engineer | Frontend + backend, APIs, modern architectures, product mindset, customer-facing products, distributed systems, CI/CD / testing / observability; AI often appears as a preferred qualification rather than the primary identity |

---

## CONTACT

- **Name:** Nikhil Chigali
- **Location:** Houston, TX
- **Phone:** +1 (713) 498-2302
- **Email:** nikhil.chigali@gmail.com
- **LinkedIn:** linkedin.com/in/nikhil-chigali
- **GitHub:** github.com/nikhil-chigali
- **Blog:** nikhil-chigali.github.io

---

## SUMMARY VARIANTS

Pick exactly one. Agent may lightly edit wording to incorporate 2–3 JD keywords naturally.

### `SUM-GENERAL` — generalist
- archetype: [fallback for any]
- strength: B (use only if no better variant fits)

AI/ML engineer with 6+ years designing, building, deploying, and monitoring ML and LLM-based systems for production. Master's in Computer Science from Rice University with an ML/AI specialization. Range spans classical ML at scale (12M+ device diagnostics at Verizon), computer vision (NASA orbital inspection, SAR satellite imagery), and GenAI (production RAG with LLMOps, multi-agent systems, local SLM applications). Co-first author on a published NASA benchmark dataset (arXiv:2507.10775). Strong emphasis on evaluation rigor, observability, and honest engineering trade-offs.

### `SUM-GENAI` — GenAI-leaning
- archetype: [GENAI, FULLSTACK-GENAI, AGENTS]
- strength: S

GenAI engineer with 6+ years building production ML systems and LLM applications — RAG pipelines, multi-agent systems, and the LLMOps tooling around them. Comfortable across the full lifecycle, from retrieval design and prompt engineering to evaluation harnesses (Ragas, Langfuse) and CI-gated deployment on AWS and Azure. Shipped ML at 12M+ device scale at Verizon and co-authored a published NASA computer vision benchmark.

### `SUM-DATA` — Data/ML-platform-leaning
- archetype: [MLOPS, DATA-CDP, CLASSICAL-ML]
- strength: S

AI/ML engineer with 6+ years building production ML pipelines, LLM systems, and large-scale data workflows. Strong Python and SQL foundation, with hands-on experience in semantic similarity systems, vector databases, and distributed data processing. Shipped ML at 12M+ record scale on Verizon's enterprise warehouse. Track record of production observability, regression-gated CI, and cross-functional delivery.

### `SUM-RESEARCH` — Research/CV-leaning
- archetype: [RESEARCH-CV]
- strength: S

AI/ML engineer and applied researcher with 6+ years of experience spanning computer vision, deep learning, and GenAI. Co-first author on a published NASA benchmark dataset (arXiv:2507.10775). Expertise in model optimization under hardware constraints, dataset curation, and production deployment pipelines. Work emphasizes rigorous evaluation and coherent engineering narratives.

---

## SKILLS

### `SK-LANG` — Languages
- archetype: [all]
- strength: S for all
- items: Python (asyncio, type hints), TypeScript, SQL, PySpark, Bash, PowerShell

### `SK-FRONTEND` — Frontend & Full-Stack
- archetype: [FULLSTACK-GENAI, GENAI, AGENTS, FULLSTACK]
- strength: S for FULLSTACK-GENAI, FULLSTACK; A for GENAI when JD names React/Next.js/full-stack
- items: React (incl. React 19), Next.js, TypeScript (strict), Vite, Tailwind CSS, shadcn/ui, Streamlit, FastAPI, async SQLAlchemy 2.0, asyncpg, Pydantic v2, Alembic (migrations), REST APIs, OAuth, full-stack delivery without handoffs

### `SK-AICODE` — AI Coding & Delivery Tools
- archetype: [all when JD names AI-assisted dev]
- strength: S when JD names Claude Code, Cursor, GitHub Copilot, Windsurf, or Claude Cowork
- items: Claude Code (daily driver), Claude Cowork, Cursor, GitHub Copilot, spec-driven development with parallel sub-agents for context management, Claude Design for UI mockups and wireframes, prompt-engineered build rhythm

### `SK-ML` — ML & Data Science
- archetype: [CLASSICAL-ML, MLOPS, DATA-CDP, RESEARCH-CV]
- strength: S for [CLASSICAL-ML, RESEARCH-CV]; A for others
- items: scikit-learn, PyTorch, HuggingFace Transformers, gradient boosting (XGBoost, LightGBM), Random Forest, GLM / regression, clustering (DBSCAN, hierarchical, k-means), classification (incl. imbalanced datasets), anomaly detection, time series analysis, model explainability (SHAP, feature importance, partial dependence plots), hyperparameter optimization (Optuna, Hyperopt, grid/random search), statistical testing, controlled A/B experimentation

### `SK-DL-CV` — Deep Learning & CV
- archetype: [RESEARCH-CV]
- strength: S for RESEARCH-CV; B elsewhere
- items: PyTorch, YOLOv8, YOLOv11, CNNs, image segmentation (instance, semantic), Stable Diffusion, quantization, model optimization under compute constraints

### `SK-LLM-CORE` — LLMs & GenAI core
- archetype: [GENAI, FULLSTACK-GENAI, AGENTS]
- strength: S
- items: OpenAI API (GPT-4, embeddings), Claude API, RAG (hybrid retrieval, reranking), prompt engineering, structured data extraction, NL-to-SQL, citation enforcement

### `SK-AGENTS` — Agentic systems
- archetype: [AGENTS, GENAI, FULLSTACK-GENAI]
- strength: S for AGENTS; A for GENAI
- items: Agentic workflows, multi-agent orchestration (supervisor/router pattern), MCP (Model Context Protocol), tool-call gating, human-in-the-loop approval gates, stateful handoffs, LangGraph, Flowise, sub-agent workflows with Claude Code, Playwright browser workers for assisted-apply / browser-driven agent flows

### `SK-GENAI-TOOLING` — GenAI frameworks & tooling
- archetype: [GENAI, AGENTS, FULLSTACK-GENAI]
- strength: S
- items (verified, daily-driver): LangChain, LlamaIndex, LangGraph, Flowise, Ollama
- items (familiar, side-project or PoC class; include only if JD names): PydanticAI, CrewAI (under evaluation), LoRA fine-tuning (unsloth, in-progress)

### `SK-VECTOR` — Vector search & embeddings
- archetype: [GENAI, DATA-CDP, FULLSTACK-GENAI]
- strength: S
- items: Pinecone (serverless), pgvector, FAISS (ANN/KNN), Sentence-BERT, OpenAI embeddings (text-embedding-3-small), BM25 sparse retrieval, Cohere rerank, hybrid dense+sparse retrieval

### `SK-ER` — Entity resolution & matching
- archetype: [DATA-CDP]
- strength: S for DATA-CDP only
- truth: familiar (understand techniques; not shipped in production)
- items: Fuzzy matching (Levenshtein, Jaro-Winkler, Jaccard), phonetic encoding (Soundex, Double Metaphone), LSH blocking, probabilistic matching (Fellegi-Sunter), deduplication, RapidFuzz, jellyfish

### `SK-LLMOPS` — LLMOps & evaluation
- archetype: [GENAI, MLOPS, FULLSTACK-GENAI]
- strength: S for MLOPS, GENAI
- items: Langfuse, LangSmith, MLflow, Ragas (Faithfulness, Context Precision, Answer Relevancy), regression gating in CI, prompt versioning, golden-set curation, A/B testing of agent behaviors, P50/P95 latency tracking, cost-per-request monitoring

### `SK-DATA-DIST` — Data & distributed systems
- archetype: [DATA-CDP, MLOPS, CLASSICAL-ML]
- strength: S for DATA-CDP; A elsewhere
- items: SQL (complex joins, CTEs, window functions, performance tuning on large datasets), Spark, PySpark, Spark SQL, Databricks (Delta Lake, Parquet, notebook-driven workflows), Dask, enterprise data warehouses, cross-schema reconciliation, feature engineering at 12M+ record scale, data quality pipelines

### `SK-MLOPS` — MLOps & DevOps
- archetype: [MLOPS, all]
- strength: S for MLOPS
- items: MLflow, GitHub Actions, Docker, CI/CD pipelines, Azure ML, FastAPI, serverless deployment, regression gating, model versioning, Terraform, Infrastructure as Code (IaC)

### `SK-CLOUD` — Cloud & infrastructure
- archetype: [all]
- strength: A
- items (verified): AWS (Lambda, serverless framework), Azure (Azure ML, Power BI), Railway (Docker-based service deploy + branch-protected master CD), Supabase (managed Postgres + Auth + Storage)
- items (familiar, include only if JD names): GCP, NVIDIA NIM, Amazon Bedrock, Google Model Garden

### `SK-VIZ-BI` — Data visualization & BI
- archetype: [DATA-CDP, CLASSICAL-ML]
- strength: B
- items: Power BI, Plotly, matplotlib, dashboard design for stakeholder reporting

### `SK-SOFT` — Soft skills
- archetype: [all]
- strength: A (include when JD emphasizes soft skills / collaboration)
- items: Cross-functional collaboration, stakeholder communication, technical writing, research authorship, initiative and self-direction, root-cause analysis, trade-off documentation

---

## EXPERIENCE

### `EXP-VZ` — Verizon Communications (via LatentView Analytics)
- **Employer:** LatentView Analytics. **Client engagement:** Verizon Communications. Use "LatentView Analytics (Verizon client engagement)" labeling when applying to LatentView or any analytics / consulting firm; use "Verizon Communications" labeling when applying to telco / enterprise direct-employer firms where the Verizon brand carries more weight.
- **Role:** AI & ML Engineer
- **Location:** Houston, TX
- **Dates:** Jan 2025 – Jan 2026
- **Tech:** Python, SQL (complex joins, CTEs, window functions, performance tuning), Databricks (Delta Lake, Parquet, notebook-driven workflows), PySpark, enterprise data warehouse, scikit-learn, gradient boosting (XGBoost, LightGBM), SHAP, partial dependence, Saabas approximation, Jaccard similarity, Optuna / Hyperopt hyperparameter tuning, controlled A/B experimentation, large-scale data reconciliation (12M+ records), MLflow
- **archetype fit:** [CLASSICAL-ML: S, MLOPS: S, DATA-CDP: A, RESEARCH-CV: B, GENAI: B, AGENTS: B]

#### `EXP-VZ-B1` — SHAP → Saabas 30x speedup
- strength: S
- archetype: [all]
- keywords: SHAP, Saabas, approximation, algorithmic optimization, SLA, production ML, large-scale, 12M devices, real-time

Rescued a production deployment blocked by a 6x SLA breach (SHAP runtime 90 min vs. 15-min SLA). After parallelization and hardware scaling paths were exhausted, engineered a high-speed Saabas approximation engine that achieved a 30x runtime improvement (90 min → 3 min per region), meeting the SLA with 5x headroom and enabling real-time telemetry-driven diagnostics across a 12M+ device fleet nationwide.

#### `EXP-VZ-B2` — Jaccard validation experiment
- strength: S
- archetype: [DATA-CDP, CLASSICAL-ML, RESEARCH-CV]
- keywords: Jaccard similarity, statistical validation, precision/recall, feature attribution, rigorous validation

Eliminated deployment risk by designing a rigorous statistical validation experiment using Jaccard similarity to confirm the Saabas approximation matched SHAP's top-3 feature attributions with high consistency across router entries. Proved a zero-accuracy-cost speed gain and gave the business confidence to ship a 30x faster solution without sacrificing diagnostic reliability.

#### `EXP-VZ-B3` — SQL transformation pipelines / cross-schema reconciliation
- strength: S for DATA-CDP; A for others
- archetype: [DATA-CDP, MLOPS, CLASSICAL-ML]
- keywords: SQL, enterprise DWH, cross-schema reconciliation, record-level inconsistencies, data quality, 12M records, identity resolution (adjacent)

Engineered complex SQL transformation pipelines against Verizon's enterprise data warehouse spanning 12M+ devices. Resolved cross-schema timestamp misalignments and structured raw telemetry into model-ready feature sets. Ensured temporal consistency across data sources, eliminating a class of silent data quality failures that at 12M+ device scale could have systematically corrupted model predictions and invalidated downstream diagnostics.

#### `EXP-VZ-B4` — Cross-functional collaboration
- strength: B
- archetype: [all when JD emphasizes soft skills]
- keywords: cross-functional, stakeholder collaboration, SLA alignment

Collaborated cross-functionally with data engineers, platform team, and business stakeholders to align on SLA constraints, feature definitions, and validation criteria before committing to the final design.

#### `EXP-VZ-B5` — AI governance, security, and compliance review
- strength: S when JD names AI governance / compliance / security review
- archetype: [all when JD emphasizes enterprise readiness]
- keywords: AI governance, security review, compliance, data governance, enterprise readiness, audit trail, model attribution boundaries

Drove the AI security, governance, and compliance review for the production SHAP/Saabas deployment. Partnered with security architecture, data governance, and compliance reviewers to align on data handling, model attribution boundaries, and audit trail design before shipping to a 12M+ device telemetry fleet, navigating the enterprise review cycle without losing release momentum.

---

### `EXP-D2K` — D2K Lab, Rice University (NASA Research Collaboration)
- **Role:** AI Research Volunteer
- **Location:** Houston, TX
- **Dates:** May 2024 – Dec 2024
- **Tech:** Python, PyTorch, HuggingFace Transformers, scikit-learn, YOLOv8/v11, Stable Diffusion, NASA TTALOS pipeline, dataset curation, deduplication, quantization, Docker
- **archetype fit:** [RESEARCH-CV: S, GENAI: B, DATA-CDP: B (dataset curation angle), others: B]

#### `EXP-D2K-B1` — SWiM benchmark dataset
- strength: S for RESEARCH-CV; A for others
- archetype: [RESEARCH-CV]
- keywords: instance segmentation, benchmark dataset, synthetic data, Stable Diffusion, NASA, dataset curation, deduplication

Engineered the SWiM (Spacecraft With Masks) benchmark dataset: 64k annotated images for instance segmentation, integrating NASA's TTALOS pipeline with Stable Diffusion to simulate complex orbital environments (glare, aurora borealis, varied lighting). Addressed the absence of a standardized dataset blocking progress on spacecraft segmentation, analogous to what PoseBowl provided for pose estimation.

#### `EXP-D2K-B2` — YOLOv8/v11 fine-tuning under compute constraints
- strength: S for RESEARCH-CV
- archetype: [RESEARCH-CV, MLOPS]
- keywords: YOLOv8, YOLOv11, fine-tuning, Dice score, hardware constraints, edge ML

Fine-tuned YOLOv8 and YOLOv11 models to achieve a 0.92 Dice score while strictly adhering to hardware constraints (4-core CPU, 4 GB RAM) of NASA's inspector spacecraft.

#### `EXP-D2K-B3` — Inference optimization / quantization
- strength: S for RESEARCH-CV; A for MLOPS
- archetype: [RESEARCH-CV, MLOPS]
- keywords: inference optimization, quantization, latency, edge deployment, sub-second

Optimized inference to ~443ms via quantization and architecture selection, well within the sub-0.95s flight requirement, enabling autonomous inspection in resource-scarce orbital environments.

#### `EXP-D2K-B4` — Publication
- strength: S for RESEARCH-CV
- archetype: [RESEARCH-CV]
- keywords: arXiv, publication, benchmark, co-first author

Co-first author on the published benchmark: *A New Dataset and Performance Benchmark for Real-time Spacecraft Segmentation in Onboard Computers* (arXiv:2507.10775). Provides the first standardized evaluation framework for on-orbit vision systems.

#### `EXP-D2K-B5` — Problem reframing
- strength: A
- archetype: [all when JD values initiative / ambiguity-handling]
- keywords: problem reframing, research ambiguity, dataset contribution

Reframed the original segmentation task into a dataset contribution after identifying that the lack of a standardized benchmark, not the modeling challenge, was the actual blocker for the research community.

---

### `EXP-MSFT` — Microsoft
- **Role:** ML & DS Consultant (Data and AI)
- **Location:** Hyderabad, India
- **Dates:** Aug 2020 – Jul 2023
- **Tech:** Python, SQL (multi-source aggregations), Databricks, Power BI, statistical analysis, hypothesis testing, time series forecasting, cross-functional stakeholder collaboration, Azure portfolio management
- **archetype fit:** [CLASSICAL-ML: A, DATA-CDP: A, MLOPS: B, all archetypes when JD emphasizes business impact / collaboration: S]

#### `EXP-MSFT-B1` — KPI health transformation
- strength: S (when JD values business impact)
- archetype: [all]
- keywords: KPI, revenue forecasting, accuracy improvement, data-driven, cross-functional

Spearheaded a KPI Health transformation for multi-million-dollar Azure delivery portfolios. Replaced reactive, ad-hoc reporting with a structured bi-weekly metrics-driven review cadence. Architected a data-backed remediation framework that improved revenue forecast accuracy from 40% to 70% and forecast-to-plan adherence from 60% to 90%, correctly projecting ~$600K in previously misforecast revenue per cycle.

#### `EXP-MSFT-B2` — Statistical root-cause analysis
- strength: A
- archetype: [CLASSICAL-ML, DATA-CDP, all when JD values analytical rigor]
- keywords: statistical analysis, hypothesis testing, root-cause analysis, collaboration, revenue impact

Performed statistical root-cause analysis on underperforming delivery KPIs through hypothesis-driven trend deep-dives. Partnered with engineering leads to execute targeted, data-informed recovery plans, recovering or mitigating 4–6 at-risk projects per quarter and protecting an estimated $1M–$2M in at-risk revenue per quarter.

#### `EXP-MSFT-B3` — Power BI dashboards / automation
- strength: B; A for DATA-CDP
- archetype: [DATA-CDP, CLASSICAL-ML]
- keywords: Power BI, dashboards, automation, anomaly detection, real-time

Designed and owned automated Power BI portfolio health dashboards across multi-million-dollar Azure portfolios. Eliminated ~15 hours/week of manual tracking effort, compressed KPI anomaly detection from days to near real-time, and equipped leadership to intervene on financial and delivery risks before escalation.

#### `EXP-MSFT-B4` — Multi-source SQL aggregation
- strength: A for DATA-CDP
- archetype: [DATA-CDP, MLOPS]
- keywords: SQL aggregation, data reconciliation, multi-source, Azure telemetry

Built multi-source SQL aggregation pipelines powering these dashboards, handling reconciliation across different Azure product telemetry schemas.

---

### `EXP-IS` — Indian Servers
- **Role:** Machine Learning Engineer Intern
- **Location:** Vijayawada, India
- **Dates:** Jan 2019 – Jun 2020
- **Tech:** Python, PyTorch, deep CNNs, image segmentation, SAR (synthetic aperture radar) imagery, GitHub Actions, MLflow, Docker, Azure ML, CI/CD
- **archetype fit:** [RESEARCH-CV: A, MLOPS: A, CLASSICAL-ML: B]

#### `EXP-IS-B1` — SAR oil seep detection
- strength: A for RESEARCH-CV; B elsewhere
- archetype: [RESEARCH-CV, CLASSICAL-ML]
- keywords: CNN, segmentation, SAR imagery, domain-specific accuracy gain

Developed and fine-tuned a deep CNN model for SAR image segmentation, achieving a 30% improvement in offshore oil seep detection accuracy. Transformed an error-prone manual detection process into an automated, high-reliability system.

#### `EXP-IS-B2` — CI/CD deployment pipelines
- strength: S for MLOPS; A elsewhere
- archetype: [MLOPS]
- keywords: CI/CD, GitHub Actions, MLflow, Docker, Azure ML, release cycles

Designed and operationalized end-to-end ML deployment pipelines for PyTorch computer vision models, replacing manual release processes with automated CI/CD workflows (GitHub Actions, MLflow, Docker, Azure ML). Reduced model release cycles from days to hours.

---

## PROJECTS

### `PRJ-RAG` — Production RAG for Research Paper QA
- **Stack:** Python, LangChain, Pinecone, OpenAI, Cohere, Ragas, GitHub Actions
- **Origin (behavioral context):** Built at Rice while observing lab mates spending hours on literature reviews. Proposed the project to the professor, drove it end-to-end, and productionized it with a full LLMOps layer. Adopted by the lab for daily use.
- **archetype fit:** [GENAI: S, FULLSTACK-GENAI: S, MLOPS: A, DATA-CDP: A (semantic retrieval angle)]
- **interview themes:** initiative, self-directed impact, end-to-end ownership

#### `PRJ-RAG-B1` — Hybrid RAG ingestion pipeline
- keywords: RAG, ingestion, structured chunking, VLM, LaTeX, table extraction, Unstructured.io

Architected a production-grade hybrid RAG ingestion pipeline for research papers using Unstructured.io's VLM cloud API together with Claude Sonnet for table enrichment and contextual chunking. Transforms raw PDFs into retrieval-ready chunks; each chunk carries a structured paper > section > subsection prefix, LaTeX-rendered equations, and HTML-formatted tables.

#### `PRJ-RAG-B2` — Hybrid retrieval + reranking
- keywords: hybrid retrieval, dense+sparse, BM25, Pinecone, OpenAI embeddings, Cohere rerank, cross-encoder

Designed a hybrid retrieval architecture combining dense semantic search (OpenAI text-embedding-3-small, 1536-dim) with BM25 sparse vectors in a Pinecone serverless index, followed by a Cohere cross-encoder reranker. Closes the precision gap that pure vector search misses on acronym-heavy content.

#### `PRJ-RAG-B3` — Citation enforcement / hallucination gating
- keywords: citation enforcement, hallucination prevention, guardrails, GPT-4, factual precision

Implemented citation enforcement and hallucination gating at the generation layer. Integrated GPT-4 calls so the system explicitly declines to answer when retrieved chunks do not support the response, instead of fabricating unsupported text.

#### `PRJ-RAG-B4` — Ragas eval + CI regression gating
- keywords: Ragas, Faithfulness, Context Precision, Answer Relevancy, golden set, CI, regression gating, LLMOps

Built a full LLMOps evaluation layer using Ragas. Curated a golden dataset of ~20 manually verified QA pairs measuring Faithfulness, Answer Relevancy, and Context Precision on every run. Wired evaluation into CI so any change degrading quality below threshold automatically fails the build.

---

### `PRJ-CCF` — Clinical Codes Finder (active, public repo, demo video)
- **Stack:** Python 3.12, LangGraph, Claude (Anthropic), Pydantic, httpx, asyncio, Streamlit, pytest, uv
- **Repo:** https://github.com/nikhil-chigali/clinical-codes-finder
- **Demo video:** https://www.loom.com/share/14e85cc12fed4ae4b001382ee37fdb90
- **Link rendering note (for tailoring agent):** When this project appears in a tailored resume, embed BOTH links as hyperlinks (e.g., "Demo video" and "GitHub repo" as clickable text). Do not render the bare URL strings as plain text. Place the link pair as a separate line directly under the project header.
- **Context:** Agentic system that maps natural-language clinical queries to codes across six medical coding systems (ICD-10-CM, LOINC, RxNorm, HCPCS, UCUM, HPO). Built Apr 2026 – May 2026.
- **archetype fit:** [AGENTS: S, GENAI: S, FULLSTACK-GENAI: S, MLOPS: A]
- **interview themes:** architectural trade-off reasoning, separation of concerns, iterative improvement under measurement, bounded agent design, cost-aware engineering

#### `PRJ-CCF-B1` — System overview
- keywords: LangGraph, agentic system, state machine, multi-agent, Claude API, Streamlit deployment, medical coding

Built an agentic clinical-codes search system: a LangGraph state machine with five LLM-powered nodes (planner, executor, evaluator, re-ranker, summarizer) that maps natural-language queries to codes across six medical coding systems (ICD-10-CM, LOINC, RxNorm, HCPCS, UCUM, HPO). Walkthrough video and public repo linked; 112 passing tests.

#### `PRJ-CCF-B2` — Architecture decision (Plan-and-Execute over ReAct)
- keywords: Plan-and-Execute, ReAct, parallel fan-out, async, asyncio.gather, architecture trade-offs, agentic design

Chose Plan-and-Execute with parallel fan-out over ReAct after explicit trade-off analysis: the six coding systems are independent, so ReAct's serialized think-act-observe loop would waste latency and tokens on coordination the task doesn't need. Executor calls run concurrently via asyncio.gather with per-system failure isolation.

#### `PRJ-CCF-B3` — Bounded loop + cost-aware design
- keywords: bounded loop, conditional edges, cost optimization, refinement, agentic safety, graph state

Designed a refinement loop (Planner, Executor, Evaluator) capped at 2 iterations, enforced in graph state rather than prompted into the LLM. Added a conditional edge to short-circuit miss queries (gibberish, non-clinical) directly to the re-ranker, dropping cost from 3 LLM calls to 1 per query.

#### `PRJ-CCF-B4` — Evaluation harness
- keywords: evaluation harness, gold set, F1, recall, must-include hit rate, sliced metrics, golden-set curation, MLOps

Built a custom evaluation harness with a versioned gold set of 31 hand-curated queries across five difficulty types (simple, multi-system, ambiguous, refinement, miss). Tracks system-selection F1, top-3 recall, must-include hit rate, mean iterations, and mean API calls per query, sliced by query type to surface where the agent fails.

#### `PRJ-CCF-B5` — Iterative improvement under measurement
- keywords: prompt engineering, iterative improvement, F1 improvement, domain anchors, semantic filtering, planner

Improved system-selection F1 from 0.69 to 0.92 through targeted prompt and graph changes: replaced vague selection rules with explicit per-system domain anchors, added a non-clinical-query catch, and introduced an evaluator semantic filter that lets the re-ranker pool only domain-matched codes across systems.

#### `PRJ-CCF-B6` — Separation of concerns
- keywords: separation of concerns, contract design, evaluator, planner, agent boundaries, agentic architecture

Designed clean contracts between agents: the evaluator diagnoses what is missing or mismatched but does not prescribe remediation; the planner owns clinical reasoning and is re-entered with prose feedback on refinement. The same separation-of-concerns pattern shows up in tool-call gating across the agentic portfolio.

---

### `PRJ-CALLUP` — Callup: AI Bench-Sales Recruiting Agent (active, public repo)
- **Stack:** Python 3.12, FastAPI, async SQLAlchemy 2.0, asyncpg, Pydantic v2, Alembic, React 19, TypeScript (strict), Vite, Tailwind CSS v4, shadcn/ui, Supabase Postgres + pgvector, Supabase Auth, Playwright, Docker, Railway, GitHub Actions
- **Repo:** https://github.com/nikhil-chigali/bench-recruiter-agent
- **Link rendering note (for tailoring agent):** When this project appears in a tailored resume, embed the repo link as clickable text (e.g., "GitHub repo"). Place the link as a separate line directly under the project header.
- **Context:** Full-stack, multi-tenant SaaS platform that automates the bench-sales recruiting pipeline end-to-end: ingesting and normalizing job postings, semantically matching candidates via pgvector + LLM re-ranking, generating tailored resumes and cover letters grounded against verified candidate facts (hard no-fabrication constraint), drafting hiring-manager outreach, and assisting applications through a Playwright browser worker with a mandatory human-approval step. In active development.
- **archetype fit:** [FULLSTACK-GENAI: S, AGENTS: S, FULLSTACK: S, GENAI: A, MLOPS: A, DATA-CDP: A (semantic matching angle)]
- **interview themes:** full-stack delivery without handoffs, multi-tenant architecture, fact-grounding under business risk, AI-assisted spec-driven development, deployment discipline, human-in-the-loop agent safety

#### `PRJ-CALLUP-B1` — System overview
- keywords: full-stack, multi-tenant SaaS, AI agent, bench-sales recruiting, end-to-end pipeline, FastAPI, React 19, Supabase, pgvector

Built Callup, a full-stack multi-tenant SaaS that automates bench-sales recruiting end-to-end: ingesting and normalizing job postings, semantically matching candidates to roles, generating fact-grounded tailored resumes and cover letters, drafting hiring-manager outreach, and assisting applications through a human-in-the-loop browser worker. Async FastAPI + SQLAlchemy 2.0 + asyncpg backend, React 19 + TypeScript + Vite + Tailwind/shadcn frontend, Supabase Postgres + pgvector underneath.

#### `PRJ-CALLUP-B2` — Retrieval funnel: pgvector prefilter + LLM re-rank
- keywords: pgvector, HNSW, cosine similarity, retrieval funnel, prefilter, freshness window, applied-exclusion, LLM re-ranking, fitment score, semantic matching, hybrid retrieval

Engineered the retrieval funnel as a single composed pgvector query: relational prefilters (freshness window on posted_date, exclusion of already-applied job_ids per candidate, in-scope predicates for apply_type, work authorization, years-of-experience, location) run in the same statement as the embedding distance ORDER BY, capped at top-K. Filtering and ranking happen together, so stale or applied postings are never ranked. The top-K then goes through an LLM re-rank stage that emits a 0-100 fitment score, a rationale, and explicit missing requirements, keeping retrieval failures attributable separately from scoring failures.

#### `PRJ-CALLUP-B3` — Fact-grounded document generation
- keywords: hallucination prevention, post-generation validator, fact grounding, citation enforcement, no-fabrication constraint, LLM safety, document generation, guardrails

Built a fact-grounding pipeline that treats no-fabrication as a hard product constraint, not a soft preference: generated resumes and cover letters are validated against the candidate's verified facts via a post-generation grounding validator before release. Documents that fail validation are flagged and regenerated rather than silently shipped, preventing the failure class where an LLM invents experience to fit a JD.

#### `PRJ-CALLUP-B4` — Playwright assisted-apply with three scoped HITL gates
- keywords: Playwright, browser automation, assisted apply, automated submit with human approval, human-in-the-loop, pre-submit gate, supplemental questions, candidate-session login, sandboxed session, rate limiting, anti-bot, CAPTCHA, agent safety, Postgres job queue, SELECT FOR UPDATE SKIP LOCKED, background workers

Designed a Playwright-driven assisted-apply worker that fills Dice Easy Apply forms across a candidate's top matches in one sandboxed visible session and drives submit under recruiter approval at three scoped human-in-the-loop gates: (1) a session-start gate where the recruiter authenticates under the candidate's credentials (live entry, never stored), (2) a per-application pre-submit gate where the recruiter reviews the filled form and confirms before the agent submits, and (3) a supplemental-question gate where the agent escalates any question it cannot truthfully answer. CAPTCHA and anti-bot encounters are recorded as hard blockers, never bypassed. Rate-limited human-like pacing and per-candidate session scoping are the operational mitigations. The worker pulls from a Postgres-backed job queue using SELECT FOR UPDATE SKIP LOCKED for safe multi-worker concurrency, eliminating the need for a separate message broker.

#### `PRJ-CALLUP-B5` — Multi-tenant auth + RLS-ready schema
- keywords: multi-tenant SaaS, Supabase Auth, JWT, JWKS verification, role-based access, org_id tenancy, RLS, owner / admin / recruiter roles

Implemented Supabase JWT auth (JWKS verification) with role-based org and team management (owner / admin / recruiter) and an `org_id` tenancy column on every table to make a future Postgres RLS migration a configuration change rather than a schema rewrite. Service-key access is isolated to the backend so secrets never reach the frontend bundle.

#### `PRJ-CALLUP-B6` — Production deployment discipline
- keywords: Docker, Railway, Supabase, Alembic migrations, branch-protected master, GitHub Actions, CI/CD, pre-deploy migrations, always-deployable, lint / format / type / test gates

Shipped on Railway with two Dockerized services (API + SPA, Caddy serving the SPA) backed by Supabase managed Postgres + Auth. GitHub Actions CI enforces ruff / black / pytest on the backend and ESLint / tsc / Vite build on the frontend, gated as required status checks on a branch-protected, always-deployable master. Alembic migrations run as a pre-deploy step so a failed migration never starts a half-deployed server.

#### `PRJ-CALLUP-B7` — AI-driven spec-driven development workflow
- keywords: Claude Code, spec-driven development, parallel sub-agents, Claude Design, AI-assisted development, agentic build rhythm, mockups, wireframes, context management

Built the project using Claude Code with a spec-driven development workflow: parallel sub-agents handled backend, frontend, and infra concerns in isolation for stronger context management, and Claude Design produced UI mockups and wireframes before the React build. The same agentic sub-agent pattern shipped in production at PRJ-CCF and PRJ-SMS shows up here as a development methodology, a coherent thread from how the systems are built to how the products work.

#### `PRJ-CALLUP-B8` — Job ingestion pipeline: fetch, normalize, dedup, embed
- keywords: job ingestion, normalization, embed_text distillation, content_hash, cross-agency dedup, repost detection, posted_date, first_seen, last_seen, apply_type classification, incremental embeddings, async workers

Built the ingestion pipeline that turns raw Dice postings into clean, deduped, embedded records. Normalization extracts canonical fields and a distilled embed_text (title, must-have skills, responsibilities, with boilerplate stripped) so similarity is computed on signal rather than noise. A content_hash captures the underlying posting and supports cross-agency repost detection (different agencies, same downstream client). Three timestamps live on every posting: posted_date from Dice (freshness filtering), and first_seen / last_seen from our ingestion (re-fetch and aging). Upserts update last_seen and posted_date, embeddings re-run only when the content_hash changes, and apply_type is classified at ingest so the funnel can hard-filter for Easy Apply.

#### `PRJ-CALLUP-B9` — Cold-email drafting and Gmail OAuth send
- keywords: cold email, LLM drafting, Gmail OAuth, posting-specific outreach, contact resolution, recruiter-from send, candidate cc, outreach logging, deliverability

Built the outreach loop: an LLM drafts a posting-specific subject and body grounded in the candidate's verified facts and the JD's named requirements, the recruiter reviews and edits, and the send goes through the recruiter's connected Gmail (OAuth) so it leaves from the recruiter with the candidate cc'd. Contact resolution pulls the hiring-contact email from the posting when present and otherwise lets the recruiter fill it in manually rather than relying on a third-party enrichment service. Every send writes an Outreach row, so the application tracker reflects both the apply and the email side of each campaign.

#### `PRJ-CALLUP-B10` — Eval harness and quality gates
- keywords: eval harness, precision@k, nDCG, gold set, dedup rate, freshness audit, easy-apply share, fill accuracy, correction rate, blocker rate, regression signal, MLOps

Set up the eval harness that the POC's quality gates carry through into the MVP as a regression signal. Retrieval relevance is measured with precision@k and nDCG against hand-labeled candidate-posting pairs. Ingestion quality is audited on dedup rate (including cross-agency reposts), freshness (posted_date coverage), and the Easy-Apply share of the corpus. Assisted apply is measured by fill accuracy, recruiter correction rate, and blocker rate (CAPTCHA, anti-bot, ambiguous fields). Each pipeline stage carries its own metric so a quality regression is attributable to the stage that caused it, not the loop as a whole.

---

### `PRJ-LLMOPS` — LLMOps Observability Layer for Production RAG
- **Stack:** Langfuse, Python, GitHub Actions
- **archetype fit:** [MLOPS: S, GENAI: S, FULLSTACK-GENAI: S]
- **interview themes:** operational discipline, observability

#### `PRJ-LLMOPS-B1` — End-to-end request tracing
- keywords: Langfuse, request tracing, observability, debuggability, retrieved chunks, reranker reordering

Instrumented the full RAG pipeline with end-to-end request tracing using Langfuse. Captured retrieved chunk identities, reranker reordering decisions, versioned prompts, LLM responses, and per-request token consumption for every query.

#### `PRJ-LLMOPS-B2` — SRE-style AI quality monitoring
- keywords: P50/P95 latency, cost-per-request, citation coverage, failure rate, dashboard, anomaly detection

Implemented SRE-style AI quality monitoring tracking P50/P95 latency, cost-per-request, citation coverage rate, and failure rate across live traffic. Dashboard surfaces which pipeline stage is responsible when issues arise, cutting mean-time-to-diagnosis from hours to minutes.

#### `PRJ-LLMOPS-B3` — CI regression gating and prompt versioning
- keywords: CI, regression gating, prompt versioning, rollback, engineering discipline

Integrated regression gating into the CI pipeline, automatically blocking deployments when Faithfulness or Context Precision drops below defined thresholds. Versioned all prompts and config files alongside code so prompt changes are tracked, reviewable, and rollback-safe.

---

### `PRJ-SMS` — Agentic SMS Lead Conversion System (Client MVP)
- **Stack:** Flowise, LangChain, MCP, Python
- **Context:** Inbound lead qualification and conversion MVP built for a client. SMS agents engage leads 24/7, qualify against business criteria, answer policy/product questions via RAG, and book appointments into CRM/calendar.
- **archetype fit:** [AGENTS: S, GENAI: S, FULLSTACK-GENAI: S]
- **interview themes:** client-facing MVP work, ambiguity handling from one-liner briefs, production agent design

#### `PRJ-SMS-B1` — Four-agent supervisor/router architecture
- keywords: multi-agent, supervisor, router, Flowise, LangChain, stateful handoffs, agent orchestration

Architected a production-grade agentic SMS messaging system using Flowise and LangChain, orchestrating four cooperating agents (Qualification, Scheduling, Re-engagement, Supervisor/Router) with clear tool boundaries and stateful handoffs.

#### `PRJ-SMS-B2` — Multi-tool RAG + MCP
- keywords: RAG, multi-tool, MCP, live web scraping, grounded generation

Engineered a multi-tool RAG pipeline seeded with FAQs, policies, and high-converting conversation snippets, augmented with live web scraping for real-time product data. Integrated MCP adapters for external tools and services.

#### `PRJ-SMS-B3` — Tool-call gating
- keywords: guardrails, tool-call gating, grounded generation, hallucination prevention, false-promise prevention

Enforced citation-grounded generation with tool-call gating. Agents cannot confirm coverage or pricing without a successful backing tool call, preventing the class of failure where an agent hallucinates its way into a false commitment.

#### `PRJ-SMS-B4` — Prompt governance and A/B testing
- keywords: prompt governance, versioned config, A/B testing, reproducible, auditable

Designed a prompt governance and retrieval configuration system for all agents. Stored system prompts, retrieval profiles, MCP tool definitions, and tool-use rules in versioned config files, enabling safe A/B testing and automated regression checks.

---

### `PRJ-BLOG-PIPELINE` — Agentic Blog-Drafting Pipeline (in progress)
- **Stack:** LangGraph / CrewAI (under evaluation), Python, Jekyll
- **archetype fit:** [GENAI: A, AGENTS: A]
- **interview themes:** systems thinking, agentic design

Four-phase pipeline: (1) ingestion and analysis of project documentation and GitHub repo state; (2) planning with human approval gate; (3) per-post drafting with voice and humanization sub-agents; (4) Jekyll-ready publishing prep. Designed as a reusable artifact for the portfolio blog.

---

### `PRJ-PORTFOLIO` — GenAI Portfolio (active tracks)
- **archetype fit:** [all]
- **interview themes:** deliberate career planning, breadth of interests
- **use case:** short mention in summary or appendix when JD values breadth

Active tracks:
- Agentic Clinical Codes Finder (`PRJ-CCF`) — live demo
- Callup, AI Bench-Sales Recruiting Agent (`PRJ-CALLUP`) — full-stack multi-tenant SaaS, public repo
- Production RAG Application (`PRJ-RAG`)
- LLM Monitoring and Observability — extending `PRJ-LLMOPS`
- Real-Time Multimodal Application — in planning

---

### `PRJ-VPAD` — VPAD: Zero-to-Build Framework (active personal methodology)
- **Stack:** Claude Code sub-agents, MCP server stack (Brave Search, Firecrawl, Sequential Thinking, Context7, Excalidraw, Figma, Playwright, Linear / GitHub, Wirekitty), markdown artifact pipeline
- **archetype fit:** [AGENTS: S, FULLSTACK-GENAI: S, GENAI: A, all when JD values agentic methodology / discovery / enterprise discipline: S]
- **interview themes:** business discovery, enterprise gate discipline, agentic orchestration, methodology, full-stack delivery

#### `PRJ-VPAD-B1` — 8-phase agentic product development framework
- keywords: agentic framework, Claude Code sub-agents, MCP, methodology, end-to-end product development, idea-to-code-ready

Built VPAD: an 8-phase Claude-powered framework taking any idea from validation through engineering kickoff, with one specialized Claude Code sub-agent per phase (discovery, PRD, architecture, planning, design foundation, wireframing, visual design, TDD) and a curated MCP server stack per phase. Every phase produces structured artifacts with non-negotiables checklists and explicit user sign-off gates before advancing.

#### `PRJ-VPAD-B2` — Discovery and validation built into the loop
- keywords: business discovery, market validation, riskiest-assumption framing, stakeholder discovery, problem framing, rapid prototyping

Wired discovery into the entry phase: each new project starts with structured market research (Brave Search and Firecrawl MCPs), competitive analysis, riskiest-assumption naming, and an explicit Go / No-Go decision before any planning artifact is produced. Translates a stakeholder one-liner into a validated problem statement in hours.

#### `PRJ-VPAD-B3` — Enterprise gate discipline and traceability
- keywords: governance gates, artifact discipline, WCAG, audit traceability, sign-off, enterprise readiness

Built artifact-driven enterprise discipline into the framework: WCAG AA contrast validation, fully-typed API contracts with no `any` or `TBD`, mandatory error-branch wireframes, light and dark token parity, and a master pre-build checklist that must be fully checked before the first line of application code is written. Same gate-and-traceability pattern transfers directly to AI governance and compliance reviews.

---

## PUBLICATIONS

### `PUB-SWIM`
- strength: S for RESEARCH-CV; A elsewhere
- archetype: [RESEARCH-CV]

**Co-first author.** *A New Dataset and Performance Benchmark for Real-time Spacecraft Segmentation in Onboard Computers.* arXiv:2507.10775 (2025). Provides the first standardized evaluation framework for on-orbit vision systems, built in collaboration with NASA via the Rice University D2K Lab.

---

## CERTIFICATIONS

Grouped by theme below; preserve verification links on output. Most are Anthropic (2025); DataCamp listed separately.

### `CERT-ANTHROPIC-SUBAGENTS`
- strength: S for AGENTS; A for GENAI, FULLSTACK-GENAI
- archetype: [AGENTS, GENAI, FULLSTACK-GENAI]
- keywords: subagents, multi-agent, agentic systems, Anthropic, Claude

**Certificate of Completion: Introduction to Subagents** — Anthropic (2025). Verify: https://verify.skilljar.com/c/6nfvjivtnwth

### `CERT-ANTHROPIC-MCP-ADV`
- strength: S for AGENTS, FULLSTACK-GENAI; A for GENAI
- archetype: [AGENTS, FULLSTACK-GENAI, GENAI]
- keywords: MCP, Model Context Protocol, tool use, advanced, agent integration, Anthropic

**Certificate of Completion: Model Context Protocol — Advanced Topics** — Anthropic (2025). Verify: https://verify.skilljar.com/c/wnxofnsjooam

### `CERT-ANTHROPIC-MCP-INTRO`
- strength: S for AGENTS; A for GENAI, FULLSTACK-GENAI
- archetype: [AGENTS, GENAI, FULLSTACK-GENAI]
- keywords: MCP, Model Context Protocol, tool use, agent integration, Anthropic

**Certificate of Completion: Introduction to Model Context Protocol** — Anthropic (2025). Verify: https://verify.skilljar.com/c/968aagkm3jzb

### `CERT-ANTHROPIC-CCACTION`
- strength: A for all; S when JD names Claude Code, AI-assisted development, or developer tooling
- archetype: [all]
- keywords: Claude Code, AI-assisted development, agentic coding, sub-agents, hooks, MCP integration, Anthropic

**Certificate of Completion: Claude Code in Action** — Anthropic (2025). Verify: https://verify.skilljar.com/c/otjwv2jjdpvb

### `CERT-ANTHROPIC-CLAUDECODE`
- strength: A for all
- archetype: [all]
- keywords: Claude Code, AI tooling, developer productivity, Anthropic

**Certificate of Completion: Claude Code 101** — Anthropic (2025). Verify: https://verify.skilljar.com/c/r9rob7vkg9vf

### `CERT-ANTHROPIC-CLAUDE101`
- strength: A for GENAI, FULLSTACK-GENAI, AGENTS; B elsewhere
- archetype: [GENAI, FULLSTACK-GENAI, AGENTS]
- keywords: Claude, LLMs, Anthropic, prompt engineering

**Certificate of Completion: Claude 101** — Anthropic (2025). Verify: https://verify.skilljar.com/c/57sweowu2a85

### `CERT-ANTHROPIC-AIFLUENCY`
- strength: A for all; particularly relevant for cross-functional / advisory roles
- archetype: [all]
- keywords: AI fluency, AI literacy, foundations, frameworks, responsible AI, Anthropic

**Certificate of Completion: AI Fluency — Framework & Foundations** — Anthropic (2025). Verify: https://verify.skilljar.com/c/zevprrjae8im

### `CERT-DATACAMP-AGENTS`
- strength: A for AGENTS, GENAI, FULLSTACK-GENAI; B elsewhere
- archetype: [AGENTS, GENAI, FULLSTACK-GENAI]
- keywords: AI agents, agent fundamentals, agentic AI, tool use, agent design

**Statement of Accomplishment: AI Agent Fundamentals** — DataCamp. Verify: https://www.datacamp.com/statement-of-accomplishment/track/5a1f952d176de2dcf258a612a0c4579a13964f8d?raw=1

### `CERT-DATACAMP-AIENG`
- strength: S for GENAI, FULLSTACK-GENAI; A for MLOPS, AGENTS; B elsewhere
- archetype: [GENAI, FULLSTACK-GENAI, AGENTS, MLOPS]
- keywords: AI engineering, LLM application development, Python, developer productivity, associate-level credential, AI Engineer for Developers

**Statement of Accomplishment: Associate AI Engineer for Developers** — DataCamp (Jul 2026). Credential ID #885,962. Verify: https://www.datacamp.com/statement-of-accomplishment/track/195cd2b2685b90ffdaeccd2f4d5308a5229b353f?raw=1

---

## EDUCATION

### `EDU-RICE`
- **Institution:** Rice University
- **Degree:** M.S., Computer Science (GPA: 3.64) — ML/AI specialization
- **Location:** Houston, TX
- **Dates:** Aug 2023 – Dec 2024
- **Relevant coursework:** Machine Learning, Deep Learning, Natural Language Processing, Distributed Systems, Advanced Algorithms

### `EDU-JNTU`
- **Institution:** Jawaharlal Nehru University of Technology
- **Degree:** B.Tech., Computer Science (GPA: 8.43)
- **Location:** India
- **Dates:** Jul 2016 – Sep 2020

---

## METRICS (canonical — do not alter wording)

A pool of concrete numbers and outcomes. Pull the most JD-relevant into tailored resumes.

| ID | Metric | Context |
|---|---|---|
| `M-YOE` | 6+ years of AI/ML engineering experience | total career |
| `M-VZ-SCALE` | 12M+ devices | Verizon diagnostics platform |
| `M-VZ-SPEEDUP` | 30x SHAP runtime reduction (90 min → 3 min per region) | Verizon SHAP→Saabas |
| `M-VZ-SLA` | 5x SLA headroom | 15-min SLA vs. 3-min runtime |
| `M-SWIM-DICE` | 0.92 Dice score | SWiM spacecraft segmentation |
| `M-SWIM-LATENCY` | ~443ms inference latency | 4-core CPU / 4GB RAM, sub-0.95s flight requirement met |
| `M-SWIM-IMAGES` | 64k annotated images | SWiM benchmark dataset |
| `M-ARXIV` | arXiv:2507.10775 | co-first authorship |
| `M-MSFT-FORECAST` | 40% → 70% revenue forecast accuracy improvement | Microsoft |
| `M-MSFT-PLAN` | 60% → 90% forecast-to-plan adherence | Microsoft |
| `M-MSFT-REV` | ~$600K misforecast revenue surfaced per cycle | Microsoft |
| `M-MSFT-RECOVERY` | 4–6 at-risk projects recovered per quarter | Microsoft |
| `M-MSFT-PROTECT` | $1M–$2M at-risk revenue protected per quarter | Microsoft |
| `M-MSFT-HOURS` | ~15 hours/week of manual tracking eliminated | Microsoft Power BI |
| `M-IS-SAR` | 30% improvement in oil seep detection accuracy | Indian Servers |
| `M-IS-RELEASE` | Days → hours release cycle compression | Indian Servers CI/CD |
| `M-RAG-GOLDEN` | 20-pair golden eval set with Faithfulness, Context Precision, Answer Relevancy | PRJ-RAG |
| `M-SMS-AGENTS` | 4-agent supervisor/router architecture | PRJ-SMS |
| `M-CCF-F1` | 0.92 system-selection F1 | PRJ-CCF, gold v0.1.1, 31 queries |
| `M-CCF-RECALL` | 0.51 top-3 code recall | PRJ-CCF, same eval run |
| `M-CCF-MUSTINCLUDE` | 0.75 must-include hit rate | PRJ-CCF, same eval run |
| `M-CCF-COST` | 1.23 mean iterations, 1.65 mean API calls per query | PRJ-CCF cost proxy |
| `M-CCF-NODES` | 5 LLM-powered nodes in a LangGraph state machine | PRJ-CCF architecture |
| `M-CCF-SYSTEMS` | 6 medical coding systems (ICD-10-CM, LOINC, RxNorm, HCPCS, UCUM, HPO) | PRJ-CCF scope |
| `M-CCF-TESTS` | 112 tests passing | PRJ-CCF engineering rigor |
| `M-CCF-GOLD` | 31-query versioned gold set across 5 difficulty types | PRJ-CCF eval design |

---

## INTERVIEW-STORY INDEX

For behavioral questions. Maps themes to the strongest supporting story.

| Theme | Primary story | Supporting story |
|---|---|---|
| Initiative / above-and-beyond | `PRJ-RAG` (pitched to professor at Rice) | `EXP-VZ-B1` (Saabas first-principles thinking) |
| Ambiguity / interpreting one-liner requests | `PRJ-SMS` (client brief "help us convert leads") | `EXP-D2K-B5` (NASA dataset pivot) |
| Ownership under pressure | `EXP-VZ-B1` (SLA breach rescue) | — |
| Cross-functional collaboration | `EXP-MSFT-B2` (engineering lead partnerships) | `PRJ-SMS` (client SME interviews) |
| Growth mindset / currency with field | `PRJ-CALLUP` (Claude Code spec-driven dev with parallel sub-agents + Claude Design for UI; full-stack agentic SaaS shipped end-to-end) | `PRJ-BLOG-PIPELINE` (LangGraph / CrewAI exploration), `PRJ-PORTFOLIO` (deliberate breadth) |
| Rigor / validation discipline | `EXP-VZ-B2` (Jaccard validation) | `PRJ-RAG-B4` (Ragas + CI gating) |
| Learning from failure | `PRJ-CCF` (system-selection F1 0.69 → 0.85 → 0.92 across documented iterations; each change paired with a prompt-engineering move and a metric delta) | `PRJ-RAG` (retrieval strategy iterations) |

---

## STYLE (reference for the tailoring agent's output)

When producing the tailored .docx:

- **Page size:** US Letter (8.5" × 11") with ~0.7" margins; 2 pages preferred but soft, 3 pages acceptable. ~0.75" margins for the rare 1-page variant.
- **Font:** Calibri throughout, 10pt body / 11pt role headers / 16pt name header
- **Section headings:** ALL CAPS, bold, 11pt, with a thin black bottom border
- **Role headers:** Company bold on left, location bold right-aligned; role italic on left, dates italic right-aligned
- **Tech line:** `Tech:` in bold followed by comma-separated list, tight spacing, placed directly under role header
- **Bullets:** single-level bullets with • marker, ~2 line max per bullet, left-indented ~0.25"
- **Hyperlinks:** blue (#0563C1), underlined
- **Em-dashes:** AVOID in prose. Use commas, periods, colons, or parens instead. (En-dashes are OK in date/number ranges: `Jan 2025 – Jan 2026`, `4–6 projects`.)
- **Oxford commas:** use them
- **AI-tell phrases to avoid:** "track record," "transformative," "robust," "seamlessly," "cutting-edge," "leverage" (as a verb), "spearheaded" (overused), the "X — Y, transforming Z" cadence
- **Voice:** direct, quantitative, decision-and-result focused. State what was done and what the outcome was. Cut editorial commentary.
- **Ordering within a tailored resume:** Header → Summary → Skills → Experience (reverse chronological) → Projects → Publications (if RESEARCH-CV) → Certifications (if archetype is GENAI/AGENTS/FULLSTACK-GENAI, or if JD names Anthropic/Claude) → Education
- **Skills count:** 5–7 skill lines in a tailored resume, not all 13
- **Bullets per role:** 3 default, 4 max for most recent / most relevant role, 2 for older / less relevant roles
