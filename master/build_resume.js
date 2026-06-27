// Reference build script for a tailored resume.
// DO NOT EDIT THIS TEMPLATE. Copy it to the project root as
// `build_<companyrole>.js`, fill in the content arrays for the specific JD,
// run, then delete the copy.
//
// Prerequisites:
//   1. Node.js installed
//   2. `docx` installed globally: `npm install -g docx`
//   3. Output folders exist: `./tailored_resumes/` and `./job_descriptions/`
//
// Run:
//   NODE_PATH=$(npm root -g) node build_<companyrole>.js
//
// Output naming: ./tailored_resumes/Nikhil_Chigali_Resume_<Company>_<Role>.docx
// For cold sends without a company, use `General` as the company placeholder.

const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, AlignmentType,
  LevelFormat, BorderStyle, ExternalHyperlink, TabStopType,
} = require('docx');

// ---- config ----------------------------------------------------------------

// Default output goes into tailored_resumes/. Fill in <Company>_<Role>.
const OUTPUT_PATH = process.env.RESUME_OUTPUT || './tailored_resumes/Nikhil_Chigali_Resume_<Company>_<Role>.docx';

// US Letter, tight-but-readable margins for a 2-page target
const PAGE = {
  size: { width: 12240, height: 15840 },
  margin: { top: 720, right: 1000, bottom: 720, left: 1000 },
};

// ---- primitives ------------------------------------------------------------

const t = (text, opts = {}) => new TextRun({
  text,
  font: 'Calibri',
  size: opts.size ?? 20,
  bold: opts.bold,
  italics: opts.italics,
  color: opts.color,
  underline: opts.underline,
});

const link = (text, url) => new ExternalHyperlink({
  link: url,
  children: [new TextRun({ text, font: 'Calibri', size: 20, color: '0563C1', underline: {} })],
});

const sectionHeading = (text) => new Paragraph({
  spacing: { before: 200, after: 80 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '000000', space: 2 } },
  children: [new TextRun({ text: text.toUpperCase(), bold: true, size: 22, font: 'Calibri' })],
});

const para = (runs, opts = {}) => new Paragraph({
  spacing: { after: opts.after ?? 40, line: opts.line ?? 260 },
  children: runs,
});

const bullet = (runs) => new Paragraph({
  numbering: { reference: 'bullets', level: 0 },
  spacing: { after: 60, line: 260 },
  children: runs,
});

const RIGHT_TAB = [{ type: TabStopType.RIGHT, position: 9360 }];

const roleHeader = (company, location, role, dates) => [
  new Paragraph({
    spacing: { before: 160, after: 20 },
    tabStops: RIGHT_TAB,
    children: [t(company, { bold: true, size: 22 }), t('\t' + location, { bold: true, size: 22 })],
  }),
  new Paragraph({
    spacing: { after: 60 },
    tabStops: RIGHT_TAB,
    children: [t(role, { italics: true }), t('\t' + dates, { italics: true })],
  }),
];

const techLine = (text) => new Paragraph({
  spacing: { before: 0, after: 60, line: 240 },
  children: [t('Tech: ', { bold: true }), t(text)],
});

const skillLine = (label, items) => new Paragraph({
  spacing: { after: 40, line: 260 },
  children: [t(label + ': ', { bold: true }), t(items)],
});

const projectHeader = (title, stack) => new Paragraph({
  spacing: { before: 140, after: 40 },
  tabStops: RIGHT_TAB,
  children: [
    t(title, { bold: true, size: 22 }),
    ...(stack ? [t('\t' + stack, { italics: true })] : []),
  ],
});

const certLine = (title, issuer, url) => new Paragraph({
  spacing: { after: 60, line: 260 },
  children: [
    t(title, { bold: true }),
    t(' — ' + issuer + '  '),
    link('Verify', url),
  ],
});

// ---- header ----------------------------------------------------------------
// Contact block — edit only if the master changes.

const header = [
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 40 },
    children: [new TextRun({ text: 'NIKHIL CHIGALI', bold: true, size: 32, font: 'Calibri' })],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
    children: [
      t('Houston, TX  •  +1 (713) 498-2302  •  '),
      link('nikhil.chigali@gmail.com', 'mailto:nikhil.chigali@gmail.com'),
      t('  •  '),
      link('linkedin.com/in/nikhil-chigali', 'https://linkedin.com/in/nikhil-chigali'),
      t('  •  '),
      link('github.com/nikhil-chigali', 'https://github.com/nikhil-chigali'),
      t('  •  '),
      link('nikhil-chigali.github.io', 'https://nikhil-chigali.github.io'),
    ],
  }),
];

// ---- SUMMARY ---------------------------------------------------------------
// Bulleted summary (default layout). Start from the variant matching the
// primary archetype, then break it into 5–6 bullets. Each bullet maps to one
// JD responsibility (lead bullet establishes seniority/credential context;
// the rest mirror the JD's responsibility list in order).

const summary = [
  sectionHeading('Summary'),
  bullet([t('<<SUMMARY_BULLET_1_seniority_credential>>')]),
  bullet([t('<<SUMMARY_BULLET_2_jd_responsibility_1>>')]),
  bullet([t('<<SUMMARY_BULLET_3_jd_responsibility_2>>')]),
  bullet([t('<<SUMMARY_BULLET_4_jd_responsibility_3>>')]),
  bullet([t('<<SUMMARY_BULLET_5_jd_responsibility_4>>')]),
  bullet([t('<<SUMMARY_BULLET_6_jd_responsibility_5>>')]),
];

// ---- SKILLS ----------------------------------------------------------------
// 5–7 skill lines. Pick from master's SK-* groups based on archetype fit.
// LABEL the category using JD vocabulary when the JD names a specific area
// (e.g. "Prompt Engineering & LLM Techniques", "RAG & Knowledge Bases",
// "Model Evaluation & Benchmarking"). The master's SK-* groups are the
// content pool; the label is JD-tuned.

const skills = [
  sectionHeading('Skills'),
  skillLine('<<LABEL_1_jd_tuned>>', '<<ITEMS_1>>'),
  skillLine('<<LABEL_2_jd_tuned>>', '<<ITEMS_2>>'),
  skillLine('<<LABEL_3_jd_tuned>>', '<<ITEMS_3>>'),
  skillLine('<<LABEL_4_jd_tuned>>', '<<ITEMS_4>>'),
  skillLine('<<LABEL_5_jd_tuned>>', '<<ITEMS_5>>'),
];

// ---- PROJECTS --------------------------------------------------------------
// 2–3 projects. Selected from master's PRJ-* items.
// PROJECTS APPEAR BEFORE EXPERIENCE in the default layout — the agentic, RAG,
// LLMOps, and CV projects are the strongest signal for AI/ML roles. Revert to
// Experience-before-Projects only for heavily experience-weighted JDs and
// note the inversion in the report-back rationale.

const projects = [
  sectionHeading('Projects'),

  projectHeader('<<PROJECT_1_TITLE>>', '<<PROJECT_1_STACK>>'),
  bullet([t('<<PROJECT_1_BULLET_1>>')]),
  bullet([t('<<PROJECT_1_BULLET_2>>')]),
  bullet([t('<<PROJECT_1_BULLET_3>>')]),

  // Add Project 2 and optionally Project 3.
];

// ---- EXPERIENCE ------------------------------------------------------------
// Reverse chronological. Tech line under each role header.
// Bullets selected from master's EXP-*-B* items.
// When Projects-above-Experience tightens the page, compress to 2 bullets
// per recent role + 1 per older role.

const experience = [
  sectionHeading('Experience'),

  ...roleHeader('Verizon Communications', 'Houston, TX', 'AI & ML Engineer', 'Jan 2025 – Jan 2026'),
  techLine('<<VERIZON_TECH_LINE>>'),
  bullet([t('<<VERIZON_BULLET_1>>')]),
  bullet([t('<<VERIZON_BULLET_2>>')]),
  bullet([t('<<VERIZON_BULLET_3>>')]),

  // Add D2K Lab, Microsoft, Indian Servers as needed for the archetype.
];

// ---- CERTIFICATIONS (conditional) ------------------------------------------
// Include this section if archetype is GENAI / AGENTS / FULLSTACK-GENAI,
// or if the JD names Anthropic, Claude, or MCP. Cap at 5.

const certifications = [
  sectionHeading('Certifications'),
  certLine('<<CERT_1_TITLE>>', 'Anthropic (2025)', '<<CERT_1_URL>>'),
  // Add more certLines as needed (max 5 total).
];

// ---- EDUCATION -------------------------------------------------------------

const education = [
  sectionHeading('Education'),
  new Paragraph({
    spacing: { before: 80, after: 20 },
    tabStops: RIGHT_TAB,
    children: [t('Rice University', { bold: true }), t('\tHouston, TX', { bold: true })],
  }),
  new Paragraph({
    spacing: { after: 20 },
    tabStops: RIGHT_TAB,
    children: [t('M.S., Computer Science (GPA: 3.64) — ML/AI specialization', { italics: true }), t('\tAug 2023 – Dec 2024', { italics: true })],
  }),
  new Paragraph({
    spacing: { after: 20 },
    tabStops: RIGHT_TAB,
    children: [t('Relevant coursework: Machine Learning, Deep Learning, Natural Language Processing, Distributed Systems, Advanced Algorithms')],
  }),
  new Paragraph({
    spacing: { before: 60, after: 20 },
    tabStops: RIGHT_TAB,
    children: [t('Jawaharlal Nehru University of Technology', { bold: true }), t('\tIndia', { bold: true })],
  }),
  new Paragraph({
    spacing: { after: 80 },
    tabStops: RIGHT_TAB,
    children: [t('B.Tech., Computer Science (GPA: 8.43)', { italics: true }), t('\tJul 2016 – Sep 2020', { italics: true })],
  }),
];

// ---- assemble --------------------------------------------------------------
// Assembly order: Header → Summary (bulleted) → Skills → Projects → Experience →
//                 Publications (if RESEARCH-CV) → Certifications (conditional) → Education
// Projects come BEFORE Experience by default. Swap to ...experience, ...projects
// only for heavily experience-weighted JDs (note the inversion in report-back).
// Omit `certifications` from the spread below if the archetype does not warrant it.

const doc = new Document({
  styles: { default: { document: { run: { font: 'Calibri', size: 20 } } } },
  numbering: {
    config: [{
      reference: 'bullets',
      levels: [{
        level: 0,
        format: LevelFormat.BULLET,
        text: '•',
        alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 360, hanging: 220 } } },
      }],
    }],
  },
  sections: [{
    properties: { page: { size: PAGE.size, margin: PAGE.margin } },
    children: [...header, ...summary, ...skills, ...projects, ...experience, ...certifications, ...education],
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(OUTPUT_PATH, buf);
  console.log(`Wrote ${OUTPUT_PATH}`);
});
