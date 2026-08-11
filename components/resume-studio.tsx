"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import type { ChangeEvent, ReactNode } from "react"
import {
  Award,
  BriefcaseBusiness,
  Check,
  Code2,
  Download,
  GraduationCap,
  LayoutTemplate,
  Plus,
  Printer,
  Sparkles,
  Trash2,
  Upload,
} from "lucide-react"

type Experience = {
  id: string
  role: string
  company: string
  period: string
  bullets: string[]
}

type Leadership = {
  id: string
  role: string
  company: string
  period: string
  bullets: string[]
}

type AwardItem = {
  id: string
  title: string
  detail: string
}

type Education = {
  id: string
  school: string
  degree: string
  period: string
  detail: string
}

type ResumeData = {
  personal: {
    name: string
    shortName: string
    headline: string
    location: string
    phone: string
    email: string
    linkedin: string
    website: string
    availability: string
  }
  summary: string
  competencies: string[]
  experiences: Experience[]
  leadership: Leadership[]
  awards: AwardItem[]
  education: Education[]
  technical: { category: string; items: string }[]
}

type TemplateId = "signal" | "editorial" | "mono"

const starterResume: ResumeData = {
  personal: {
    name: "I-Chih Lin",
    shortName: "Eli",
    headline: "AI Product Leader | Enterprise AI | 0-to-1 Product Strategy | Engineering & Solutions Leadership",
    location: "Taiwan",
    phone: "+886 933 315 566",
    email: "l.lin860218@gmail.com",
    linkedin: "linkedin.com/in/elilin218",
    website: "",
    availability: "Open to meaningful product challenges",
  },
  summary:
    "AI product and technology leader with 8+ years across software engineering, enterprise AI, product strategy, and customer solutions. Helped scale APMIC through its US$1M Pre-A and US$7M Series A growth stages by building enterprise AI products, strengthening cross-functional execution, validating customer demand, and representing the company externally. Built CaiGunn from 0 to 1, coordinated up to 14 contributors, and led enterprise discovery across 50–80 prospects with roughly 15 proposals / POCs. Former Houzz and Garena engineer and WorldSkills Kazan 2019 Silver Medalist.",
  competencies: [
    "AI Product Strategy",
    "Enterprise GenAI / RAG",
    "0→1 Product Development",
    "Growth-Stage Product Leadership",
    "Cross-functional Leadership",
    "Engineering Leadership",
    "Technical Pre-sales",
    "Solution Design",
    "Enterprise Discovery",
    "Product Operations",
    "Public Speaking",
  ],
  experiences: [
    {
      id: "apmic-cofounder",
      role: "Co-Founder & AI Product Lead",
      company: "APMIC",
      period: "Jan 2024 — Present",
      bullets: [
        "Supported APMIC’s evolution through its US$1M Pre-A and US$7M Series A stages by strengthening product maturity, technical credibility, cross-functional execution, enterprise readiness, and the customer evidence behind the company’s growth story.",
        "Led AI product strategy and cross-functional execution across product, engineering, AI systems, pre-sales, and enterprise delivery.",
        "Built and launched CaiGunn from 0 to 1 in Apr 2024 under constrained engineering resources, coordinating 8–10-person teams and up to 14 contributors at peak.",
        "Drove the integration and productization of RAG, inference, deployment, and hardware capabilities across PrivAI and PrivStation, launched in Sep 2025.",
        "Engaged 50–80 prospects across financial services, government, and commercial sectors; led roughly 15 proposals / POCs from discovery and demo through solution design.",
        "Represented APMIC at industry events and presented PrivStation in English at APICTA 2025, earning 2nd Runner-Up in Business Services.",
      ],
    },
    {
      id: "apmic-advisor",
      role: "Product & Technology Advisor",
      company: "APMIC",
      period: "Dec 2021 — Dec 2023",
      bullets: [
        "Advised product and engineering leadership on architecture, organizational structure, delivery quality, talent development, and cross-functional collaboration.",
        "Introduced end-to-end testing, supported difficult technical problem solving, and led an official website redesign initiative.",
      ],
    },
    {
      id: "houzz",
      role: "Software Engineer",
      company: "Houzz",
      period: "Dec 2020 — Mar 2024",
      bullets: [
        "Owned consumer search improvements spanning search suggestions, cross-vertical result flows, SEO tooling, team documentation, and refactoring initiatives.",
        "Reduced TTFB by approximately 100 ms (12.5%) through cache-service optimization and supported search experiences representing about 20% of search-result traffic.",
        "Built production web experiences with React SSR and integrations across GraphQL / Thrift interfaces and frontend data architecture.",
      ],
    },
    {
      id: "garena",
      role: "Software Engineer",
      company: "Garena",
      period: "Oct 2019 — Dec 2020",
      bullets: [
        "Built full-stack web experiences for game campaigns, collaborating with designers and backend engineers from implementation through delivery.",
        "Resolved backend transaction and race-condition issues using locking strategies; improved API documentation and maintained GitLab CI/CD pipelines with workflow automation.",
      ],
    },
    {
      id: "pixnet",
      role: "Web Developer (Contractor / Intern)",
      company: "PIXNET",
      period: "2017 — 2018",
      bullets: [
        "Developed backend and web platform features, APIs, automated tests, CI workflows, and reusable open-source utilities during contractor and internship engagements.",
      ],
    },
  ],
  leadership: [
    {
      id: "worldskills-taiwan",
      role: "Deputy Chief Expert — Web Technologies",
      company: "WorldSkills Taiwan",
      period: "Aug 2022 — Present",
      bullets: [
        "Provide technical leadership for Web Technologies in Taiwan, contributing to competition design, assessment alignment, judging consistency, and competitor / expert development.",
      ],
    },
    {
      id: "worldskills-asia",
      role: "Expert — Web Technologies",
      company: "WorldSkills Asia",
      period: "2nd & 3rd editions",
      bullets: [
        "Represented Chinese Taipei as the official Web Technologies Expert, collaborating with international experts on technical standards, competition operations, and fair assessment.",
      ],
    },
  ],
  awards: [
    { id: "apicta", title: "APICTA 2025", detail: "2nd Runner-Up, Business Services category — APMIC PrivStation" },
    { id: "kazan", title: "WorldSkills Kazan 2019", detail: "Silver Medal, Web Technologies — Chinese Taipei" },
    { id: "kazan-national", title: "45th WorldSkills Kazan", detail: "National Champion, Web Technologies — Chinese Taipei team selection" },
    { id: "national-skills", title: "46th National Skills Competition", detail: "Gold Medal, Web Technologies (2017)" },
  ],
  education: [
    {
      id: "ntust",
      school: "National Taiwan University of Science and Technology (NTUST)",
      degree: "B.S., Computer Science and Information Technology",
      period: "2016 — 2019",
      detail: "Coursework: Data Structures, Algorithms, and Data Analysis",
    },
  ],
  technical: [
    { category: "Frontend", items: "React, Vue, HTML/CSS, JavaScript, Node.js" },
    { category: "Backend / API", items: "PHP/Laravel, Python/FastAPI, REST, GraphQL, Thrift" },
    { category: "Platform", items: "Linux, Redis, MySQL, Docker, Kubernetes, Nginx, GitLab/Jenkins CI/CD" },
  ],
}

const templateOptions: { id: TemplateId; name: string; description: string; palette: string[] }[] = [
  {
    id: "signal",
    name: "Signal",
    description: "深色科技感，適合產品與技術領導者",
    palette: ["#0f1f1c", "#82e2bc", "#f8f7f2"],
  },
  {
    id: "editorial",
    name: "Editorial",
    description: "米白紙感與橘紅焦點，偏敘事型",
    palette: ["#f6f0e8", "#d06a4b", "#1f2421"],
  },
  {
    id: "mono",
    name: "Mono",
    description: "極簡黑白，讓內容自己說話",
    palette: ["#ffffff", "#2158e8", "#152033"],
  },
]

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T

function safeResume(input: unknown): ResumeData {
  const candidate = input as Partial<ResumeData> | null
  if (!candidate || typeof candidate !== "object") return clone(starterResume)
  return {
    ...clone(starterResume),
    ...candidate,
    personal: { ...starterResume.personal, ...(candidate.personal ?? {}) },
    competencies: Array.isArray(candidate.competencies) ? candidate.competencies.filter(Boolean) : starterResume.competencies,
    experiences: Array.isArray(candidate.experiences) ? candidate.experiences : starterResume.experiences,
    leadership: Array.isArray(candidate.leadership) ? candidate.leadership : starterResume.leadership,
    awards: Array.isArray(candidate.awards) ? candidate.awards : starterResume.awards,
    education: Array.isArray(candidate.education) ? candidate.education : starterResume.education,
    technical: Array.isArray(candidate.technical) ? candidate.technical : starterResume.technical,
  }
}

function linesToText(lines: string[]) {
  return lines.join("\n")
}

function textToLines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
}

function updateListItem<T extends { id: string }>(items: T[], id: string, patch: Partial<T>) {
  return items.map((item) => (item.id === id ? { ...item, ...patch } : item))
}

function SectionTitle({ icon: Icon, eyebrow, title }: { icon: typeof BriefcaseBusiness; eyebrow: string; title: string }) {
  return (
    <div className="editor-section-heading">
      <div className="editor-section-icon"><Icon size={16} /></div>
      <div>
        <p>{eyebrow}</p>
        <h2>{title}</h2>
      </div>
    </div>
  )
}

function Field({ label, value, onChange, placeholder, multiline = false }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string; multiline?: boolean }) {
  return (
    <label className={`field ${multiline ? "field-wide" : ""}`}>
      <span>{label}</span>
      {multiline ? (
        <textarea value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} rows={5} />
      ) : (
        <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
      )}
    </label>
  )
}

export function ResumeStudio() {
  const [resume, setResume] = useState<ResumeData>(() => clone(starterResume))
  const [template, setTemplate] = useState<TemplateId>("signal")
  const [activeView, setActiveView] = useState<"edit" | "preview">("edit")
  const [savedAt, setSavedAt] = useState<string | null>(null)
  const [notice, setNotice] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const raw = window.localStorage.getItem("eli-resume-studio-v1")
    if (!raw) return
    const timeout = window.setTimeout(() => {
      try {
        const parsed = JSON.parse(raw) as { resume?: unknown; template?: TemplateId; savedAt?: string }
        if (parsed.resume) setResume(safeResume(parsed.resume))
        if (parsed.template === "signal" || parsed.template === "editorial" || parsed.template === "mono") setTemplate(parsed.template)
        if (parsed.savedAt) setSavedAt(parsed.savedAt)
      } catch {
        window.localStorage.removeItem("eli-resume-studio-v1")
      }
    }, 0)
    return () => window.clearTimeout(timeout)
  }, [])

  useEffect(() => {
    const timestamp = new Date().toISOString()
    const timeout = window.setTimeout(() => {
      window.localStorage.setItem("eli-resume-studio-v1", JSON.stringify({ resume, template, savedAt: timestamp }))
      setSavedAt(timestamp)
    }, 500)
    return () => window.clearTimeout(timeout)
  }, [resume, template])

  const activeTemplate = useMemo(() => templateOptions.find((item) => item.id === template) ?? templateOptions[0], [template])

  const updatePersonal = (key: keyof ResumeData["personal"], value: string) => {
    setResume((current) => ({ ...current, personal: { ...current.personal, [key]: value } }))
  }

  const exportJson = () => {
    const payload = JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), template, resume }, null, 2)
    const blob = new Blob([payload], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `eli-resume-${new Date().toISOString().slice(0, 10)}.json`
    link.click()
    URL.revokeObjectURL(url)
    setNotice("JSON 已下載")
    window.setTimeout(() => setNotice(""), 2400)
  }

  const importJson = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as { resume?: unknown; template?: TemplateId }
        setResume(safeResume(parsed.resume ?? parsed))
        if (parsed.template === "signal" || parsed.template === "editorial" || parsed.template === "mono") setTemplate(parsed.template)
        setNotice("JSON 已載入，預覽已更新")
      } catch {
        setNotice("這個檔案不是有效的履歷 JSON")
      }
      window.setTimeout(() => setNotice(""), 2600)
    }
    reader.readAsText(file)
    event.target.value = ""
  }

  const addExperience = () => {
    setResume((current) => ({
      ...current,
      experiences: [
        ...current.experiences,
        { id: `experience-${Date.now()}`, role: "New role", company: "Company", period: "Year — Present", bullets: ["Describe the outcome, scope, or impact."] },
      ],
    }))
  }

  const addLeadership = () => {
    setResume((current) => ({
      ...current,
      leadership: [...current.leadership, { id: `leadership-${Date.now()}`, role: "Leadership role", company: "Organization", period: "Year — Present", bullets: ["Describe the leadership contribution."] }],
    }))
  }

  const addAward = () => {
    setResume((current) => ({ ...current, awards: [...current.awards, { id: `award-${Date.now()}`, title: "Award title", detail: "Award detail" }] }))
  }

  const addEducation = () => {
    setResume((current) => ({ ...current, education: [...current.education, { id: `education-${Date.now()}`, school: "School", degree: "Degree", period: "Year — Year", detail: "Relevant coursework or focus" }] }))
  }

  return (
    <main className={`resume-studio template-${template}`}>
      <div className="studio-chrome">
        <header className="studio-header">
          <div className="brand-lockup">
            <div className="brand-mark"><Sparkles size={18} /></div>
            <div>
              <p className="brand-overline">PERSONAL RESUME STUDIO</p>
              <h1>Eli&apos;s Resume Studio</h1>
            </div>
          </div>
          <div className="header-actions">
            <span className="save-state"><span className="save-dot" />{savedAt ? "已儲存於此裝置" : "正在準備你的履歷"}</span>
            <button className="button button-ghost" onClick={() => fileInputRef.current?.click()}><Upload size={15} /> 匯入 JSON</button>
            <button className="button button-ghost" onClick={exportJson}><Download size={15} /> 匯出 JSON</button>
            <button className="button button-primary" onClick={() => window.print()}><Printer size={15} /> 下載 PDF</button>
            <input ref={fileInputRef} className="visually-hidden" type="file" accept="application/json,.json" onChange={importJson} />
          </div>
        </header>

        <div className="mobile-view-toggle" role="tablist" aria-label="編輯或預覽">
          <button className={activeView === "edit" ? "active" : ""} onClick={() => setActiveView("edit")}>編輯內容</button>
          <button className={activeView === "preview" ? "active" : ""} onClick={() => setActiveView("preview")}>預覽履歷</button>
        </div>
      </div>

      <div className="studio-layout">
        <aside className={`editor-panel ${activeView === "preview" ? "mobile-hidden" : ""}`}>
          <div className="editor-intro">
            <p className="eyebrow">編輯器</p>
            <h2>讓經歷變成一頁有方向的故事。</h2>
            <p>改動左側內容，右側預覽會即時同步。完成後可直接列印成 PDF，或把 JSON 帶到另一台裝置繼續編輯。</p>
          </div>

          <section className="editor-card">
            <SectionTitle icon={Sparkles} eyebrow="01 / Identity" title="個人資訊" />
            <div className="field-grid">
              <Field label="姓名" value={resume.personal.name} onChange={(value) => updatePersonal("name", value)} />
              <Field label="暱稱" value={resume.personal.shortName} onChange={(value) => updatePersonal("shortName", value)} />
              <Field label="職涯標題" value={resume.personal.headline} onChange={(value) => updatePersonal("headline", value)} multiline />
              <Field label="所在地" value={resume.personal.location} onChange={(value) => updatePersonal("location", value)} />
              <Field label="電話" value={resume.personal.phone} onChange={(value) => updatePersonal("phone", value)} />
              <Field label="Email" value={resume.personal.email} onChange={(value) => updatePersonal("email", value)} />
              <Field label="LinkedIn" value={resume.personal.linkedin} onChange={(value) => updatePersonal("linkedin", value)} />
              <Field label="網站（選填）" value={resume.personal.website} onChange={(value) => updatePersonal("website", value)} />
              <Field label="Availability 標籤" value={resume.personal.availability} onChange={(value) => updatePersonal("availability", value)} multiline />
            </div>
          </section>

          <section className="editor-card">
            <SectionTitle icon={Sparkles} eyebrow="02 / Positioning" title="摘要與核心能力" />
            <Field label="Executive summary" value={resume.summary} onChange={(value) => setResume((current) => ({ ...current, summary: value }))} multiline />
            <div className="chip-editor">
              <span className="field-label">Core competencies</span>
              <div className="chip-list">
                {resume.competencies.map((skill) => <button key={skill} className="edit-chip" onClick={() => setResume((current) => ({ ...current, competencies: current.competencies.filter((item) => item !== skill) }))}>{skill}<span>×</span></button>)}
              </div>
              <input aria-label="新增核心能力" placeholder="輸入後按 Enter 新增" onKeyDown={(event) => {
                if (event.key !== "Enter") return
                event.preventDefault()
                const value = event.currentTarget.value.trim()
                if (!value || resume.competencies.includes(value)) return
                setResume((current) => ({ ...current, competencies: [...current.competencies, value] }))
                event.currentTarget.value = ""
              }} />
            </div>
          </section>

          <section className="editor-card">
            <div className="section-heading-row"><SectionTitle icon={BriefcaseBusiness} eyebrow="03 / Experience" title="專業經歷" /><button className="icon-button" aria-label="新增專業經歷" onClick={addExperience}><Plus size={17} /></button></div>
            <div className="repeat-list">
              {resume.experiences.map((experience, index) => (
                <div className="repeat-item" key={experience.id}>
                  <div className="repeat-item-header"><span className="item-index">0{index + 1}</span><button className="icon-button danger" aria-label={`刪除 ${experience.role}`} onClick={() => setResume((current) => ({ ...current, experiences: current.experiences.filter((item) => item.id !== experience.id) }))}><Trash2 size={15} /></button></div>
                  <div className="field-grid compact-grid">
                    <Field label="職稱" value={experience.role} onChange={(value) => setResume((current) => ({ ...current, experiences: updateListItem(current.experiences, experience.id, { role: value }) }))} />
                    <Field label="公司" value={experience.company} onChange={(value) => setResume((current) => ({ ...current, experiences: updateListItem(current.experiences, experience.id, { company: value }) }))} />
                    <Field label="期間" value={experience.period} onChange={(value) => setResume((current) => ({ ...current, experiences: updateListItem(current.experiences, experience.id, { period: value }) }))} />
                    <Field label="成果與責任（每行一點）" value={linesToText(experience.bullets)} onChange={(value) => setResume((current) => ({ ...current, experiences: updateListItem(current.experiences, experience.id, { bullets: textToLines(value) }) }))} multiline />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="editor-card">
            <div className="section-heading-row"><SectionTitle icon={Award} eyebrow="04 / Leadership" title="領導與社群" /><button className="icon-button" aria-label="新增領導經歷" onClick={addLeadership}><Plus size={17} /></button></div>
            <div className="repeat-list">
              {resume.leadership.map((item) => (
                <div className="repeat-item" key={item.id}>
                  <div className="repeat-item-header"><span className="item-index">LEAD</span><button className="icon-button danger" aria-label={`刪除 ${item.role}`} onClick={() => setResume((current) => ({ ...current, leadership: current.leadership.filter((entry) => entry.id !== item.id) }))}><Trash2 size={15} /></button></div>
                  <div className="field-grid compact-grid">
                    <Field label="角色" value={item.role} onChange={(value) => setResume((current) => ({ ...current, leadership: updateListItem(current.leadership, item.id, { role: value }) }))} />
                    <Field label="組織" value={item.company} onChange={(value) => setResume((current) => ({ ...current, leadership: updateListItem(current.leadership, item.id, { company: value }) }))} />
                    <Field label="期間" value={item.period} onChange={(value) => setResume((current) => ({ ...current, leadership: updateListItem(current.leadership, item.id, { period: value }) }))} />
                    <Field label="貢獻（每行一點）" value={linesToText(item.bullets)} onChange={(value) => setResume((current) => ({ ...current, leadership: updateListItem(current.leadership, item.id, { bullets: textToLines(value) }) }))} multiline />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="editor-card">
            <div className="section-heading-row"><SectionTitle icon={Award} eyebrow="05 / Proof" title="獎項與成就" /><button className="icon-button" aria-label="新增獎項" onClick={addAward}><Plus size={17} /></button></div>
            <div className="repeat-list compact-repeat-list">
              {resume.awards.map((item) => (
                <div className="repeat-item" key={item.id}>
                  <div className="repeat-item-header"><span className="item-index">AWD</span><button className="icon-button danger" aria-label={`刪除 ${item.title}`} onClick={() => setResume((current) => ({ ...current, awards: current.awards.filter((entry) => entry.id !== item.id) }))}><Trash2 size={15} /></button></div>
                  <div className="field-grid compact-grid"><Field label="獎項" value={item.title} onChange={(value) => setResume((current) => ({ ...current, awards: updateListItem(current.awards, item.id, { title: value }) }))} /><Field label="細節" value={item.detail} onChange={(value) => setResume((current) => ({ ...current, awards: updateListItem(current.awards, item.id, { detail: value }) }))} /></div>
                </div>
              ))}
            </div>
          </section>

          <section className="editor-card">
            <div className="section-heading-row"><SectionTitle icon={GraduationCap} eyebrow="06 / Foundation" title="學歷與技術基礎" /><button className="icon-button" aria-label="新增學歷" onClick={addEducation}><Plus size={17} /></button></div>
            <div className="repeat-list compact-repeat-list">
              {resume.education.map((item) => (
                <div className="repeat-item" key={item.id}>
                  <div className="repeat-item-header"><span className="item-index">EDU</span><button className="icon-button danger" aria-label={`刪除 ${item.school}`} onClick={() => setResume((current) => ({ ...current, education: current.education.filter((entry) => entry.id !== item.id) }))}><Trash2 size={15} /></button></div>
                  <div className="field-grid compact-grid"><Field label="學校" value={item.school} onChange={(value) => setResume((current) => ({ ...current, education: updateListItem(current.education, item.id, { school: value }) }))} /><Field label="學位" value={item.degree} onChange={(value) => setResume((current) => ({ ...current, education: updateListItem(current.education, item.id, { degree: value }) }))} /><Field label="期間" value={item.period} onChange={(value) => setResume((current) => ({ ...current, education: updateListItem(current.education, item.id, { period: value }) }))} /><Field label="補充" value={item.detail} onChange={(value) => setResume((current) => ({ ...current, education: updateListItem(current.education, item.id, { detail: value }) }))} /></div>
                </div>
              ))}
            </div>
            <div className="technical-editor">
              <div className="subsection-label"><Code2 size={15} /> Technical foundation</div>
              {resume.technical.map((item, index) => <div className="technical-row" key={`${item.category}-${index}`}><input aria-label="技術分類" value={item.category} onChange={(event) => setResume((current) => ({ ...current, technical: current.technical.map((entry, entryIndex) => entryIndex === index ? { ...entry, category: event.target.value } : entry) }))} /><input aria-label="技術項目" value={item.items} onChange={(event) => setResume((current) => ({ ...current, technical: current.technical.map((entry, entryIndex) => entryIndex === index ? { ...entry, items: event.target.value } : entry) }))} /></div>)}
            </div>
          </section>

          <section className="editor-card template-card">
            <SectionTitle icon={LayoutTemplate} eyebrow="07 / Visual system" title="選擇內建模板" />
            <div className="template-grid">
              {templateOptions.map((option) => <button key={option.id} className={`template-option ${template === option.id ? "selected" : ""}`} onClick={() => setTemplate(option.id)}><div className={`template-swatch swatch-${option.id}`}><span /><span /><span /></div><div className="template-option-copy"><strong>{option.name}</strong><small>{option.description}</small></div>{template === option.id && <Check size={16} className="template-check" />}</button>)}
            </div>
          </section>
        </aside>

        <section className={`preview-panel ${activeView === "edit" ? "mobile-hidden" : ""}`}>
          <div className="preview-toolbar"><div><p className="eyebrow">Live preview</p><h2>{activeTemplate.name} template</h2></div><div className="preview-meta"><span>A4 / print-ready</span><span>Last saved {savedAt ? new Date(savedAt).toLocaleTimeString("zh-TW", { hour: "2-digit", minute: "2-digit" }) : "—"}</span></div></div>
          <div className="preview-stage">
            <ResumePaper resume={resume} template={template} />
          </div>
          <div className="preview-hint"><div className="hint-icon"><Printer size={15} /></div><p><strong>要存成 PDF？</strong> 按右上角「下載 PDF」，在列印視窗選擇「另存為 PDF」。目前頁面已針對 A4 與列印色彩最佳化。</p></div>
        </section>
      </div>
      {notice && <div className="toast"><Check size={15} /> {notice}</div>}
    </main>
  )
}

function ResumePaper({ resume, template }: { resume: ResumeData; template: TemplateId }) {
  const { personal } = resume
  return (
    <article className={`resume-paper paper-${template}`}>
      <header className="resume-paper-header">
        <div className="resume-kicker">AI PRODUCT / ENTERPRISE SYSTEMS / WEB TECHNOLOGIES</div>
        <div className="resume-name-row"><div><h1>{personal.name}</h1><p className="resume-short-name">{personal.shortName ? `“${personal.shortName}”` : ""}</p></div><span className="availability-pill">{personal.availability || "Open to meaningful work"}</span></div>
        <p className="resume-headline">{personal.headline}</p>
        <div className="resume-contact-row">
          {personal.location && <span>{personal.location}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.email && <a href={`mailto:${personal.email}`}>{personal.email}</a>}
          {personal.linkedin && <a href={`https://${personal.linkedin.replace(/^https?:\/\//, "")}`} target="_blank" rel="noreferrer">{personal.linkedin.replace(/^https?:\/\//, "")}</a>}
          {personal.website && <a href={personal.website.startsWith("http") ? personal.website : `https://${personal.website}`} target="_blank" rel="noreferrer">{personal.website.replace(/^https?:\/\//, "")}</a>}
        </div>
      </header>

      <div className="resume-paper-body">
        <main className="resume-main-column">
          <ResumeSection title="Executive summary"><p className="resume-summary">{resume.summary}</p></ResumeSection>
          <ResumeSection title="Professional experience">
            {resume.experiences.map((experience) => <ResumeExperience key={experience.id} experience={experience} />)}
          </ResumeSection>
          {resume.leadership.length > 0 && <ResumeSection title="Technical leadership"><div className="leadership-grid">{resume.leadership.map((item) => <ResumeExperience key={item.id} experience={item} compact />)}</div></ResumeSection>}
        </main>
        <aside className="resume-side-column">
          <ResumeSection title="Core competencies"><div className="competency-list">{resume.competencies.map((skill) => <span key={skill}>{skill}</span>)}</div></ResumeSection>
          <ResumeSection title="Selected awards"><div className="award-list">{resume.awards.map((item) => <div className="award-item" key={item.id}><strong>{item.title}</strong><span>{item.detail}</span></div>)}</div></ResumeSection>
          <ResumeSection title="Education"><div className="education-list">{resume.education.map((item) => <div className="education-item" key={item.id}><strong>{item.degree}</strong><span>{item.school}</span><small>{item.period}</small><em>{item.detail}</em></div>)}</div></ResumeSection>
          <ResumeSection title="Technical foundation"><div className="technical-list">{resume.technical.map((item) => <div key={item.category}><strong>{item.category}</strong><span>{item.items}</span></div>)}</div></ResumeSection>
        </aside>
      </div>
      <footer className="resume-paper-footer"><span>ELI LIN / RESUME</span><span>UPDATED {new Date().getFullYear()}</span></footer>
    </article>
  )
}

function ResumeSection({ title, children }: { title: string; children: ReactNode }) {
  return <section className="resume-section"><div className="resume-section-label"><span>{title}</span><i /></div>{children}</section>
}

function ResumeExperience({ experience, compact = false }: { experience: Experience | Leadership; compact?: boolean }) {
  return <article className={`resume-experience ${compact ? "compact" : ""}`}><div className="resume-experience-heading"><div><h3>{experience.role}</h3><p>{experience.company}</p></div><time>{experience.period}</time></div><ul>{experience.bullets.map((bullet, index) => <li key={`${experience.id}-${index}`}>{bullet}</li>)}</ul></article>
}
