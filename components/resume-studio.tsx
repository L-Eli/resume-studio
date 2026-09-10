"use client"

import { Fragment, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
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

type ExperienceRole = {
  title: string
  period?: string
  note?: string
  bullets?: string[]
}

type Experience = {
  id: string
  role: string
  company: string
  period: string
  companyDescription?: string
  roles?: ExperienceRole[]
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

type TemplateId = "signal" | "editorial" | "mono" | "classic" | "ledger" | "gazette"

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
    "AI product leader who takes enterprise AI from first customer conversation to shipped product. Helped scale APMIC from its US$1M Pre-A to a US$7M Series A, built CaiGunn 0→1 with up to 14 contributors, and turned 50–80 enterprise conversations into ~15 proposals and POCs. Engineering background from Houzz and Garena; WorldSkills 2019 Silver Medalist.",
  competencies: [
    "AI Product Strategy",
    "Context Engineering for Enterprise LLMs",
    "0→1 Product Development",
    "Growth-Stage Product Leadership",
    "Cross-functional Leadership",
    "Technical Pre-sales",
    "Executive & External Storytelling",
  ],
  experiences: [
    {
      id: "apmic-cofounder",
      role: "Co-Founder & AI Product Lead",
      company: "APMIC",
      period: "Jan 2024 — Present",
      bullets: [
        "Helped scale APMIC from its US$1M Pre-A to a US$7M Series A through enterprise product maturity, technical credibility, and customer evidence.",
        "Built and launched CaiGunn from 0 to 1 in Apr 2024, coordinating 8–10-person teams and up to 14 contributors at peak.",
        "Productized retrieval and context pipelines, inference, deployment, and hardware into PrivAI and PrivStation (launched Sep 2025).",
        "Designed the document ingestion path behind enterprise retrieval — segmenting multi-column layouts before OCR, parsing tables into markdown with small models, and normalizing output to JSON so answers stayed faithful to the source.",
        "Led ~15 enterprise proposals / POCs across 50–80 finance, government, and commercial prospects.",
      ],
    },
    {
      id: "apmic-advisor",
      role: "Product & Technology Advisor",
      company: "APMIC",
      period: "Dec 2021 — Dec 2023",
      bullets: [
        "Advised product and engineering leadership on architecture, org structure, and delivery quality; introduced end-to-end testing and led an official website redesign.",
      ],
    },
    {
      id: "houzz",
      role: "Software Engineer",
      company: "Houzz",
      period: "Dec 2020 — Mar 2024",
      bullets: [
        "Owned consumer search experiences covering ~20% of search-result traffic — suggestions, cross-vertical result flows, and SEO tooling — from problem definition through rollout.",
        "Led a cache-service optimization that cut time-to-first-byte ~100 ms (12.5%) on the highest-traffic search paths.",
      ],
    },
    {
      id: "garena",
      role: "Software Engineer",
      company: "Garena",
      period: "Oct 2019 — Dec 2020",
      bullets: [
        "Shipped full-stack campaign experiences for game launches, coordinating designers and backend engineers end to end and hardening the release pipeline behind them.",
      ],
    },
    {
      id: "pixnet",
      role: "Web Developer (Contractor / Intern)",
      company: "PIXNET",
      period: "2017 — 2018",
      bullets: [
        "Early platform engineering across APIs, automated testing, and reusable open-source tooling.",
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
        "Lead competition design, assessment alignment, and competitor / expert development for Web Technologies in Taiwan.",
      ],
    },
    {
      id: "worldskills-asia",
      role: "Expert — Web Technologies",
      company: "WorldSkills Asia",
      period: "2nd & 3rd editions",
      bullets: [
        "Represented Chinese Taipei as official Web Technologies Expert, setting technical standards and assessment with international experts.",
      ],
    },
  ],
  awards: [
    { id: "apicta", title: "APICTA 2025", detail: "2nd Runner-Up, Business Services category — APMIC PrivStation" },
    { id: "kazan", title: "WorldSkills Kazan 2019", detail: "Silver Medal, Web Technologies — Chinese Taipei (national champion in team selection)" },
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
    { category: "AI systems", items: "Context engineering — layout-aware document ingestion, retrieval and grounding, inference and deployment, private / on-prem AI" },
    { category: "Product craft", items: "Enterprise discovery, POC to rollout, solution design, technical pre-sales" },
    { category: "Engineering", items: "React / Node, Python / FastAPI, GraphQL / REST, Docker, Kubernetes — enough depth to review architecture and unblock teams" },
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
  {
    id: "classic",
    name: "Classic",
    description: "單欄襯線，沉穩學院感，適合資深職位",
    palette: ["#ffffff", "#1c3f5f", "#1a1a18"],
  },
  {
    id: "ledger",
    name: "Ledger",
    description: "單欄，細規線分隔，顧問／金融業偏好",
    palette: ["#fbfaf7", "#5c5346", "#221f1a"],
  },
  {
    id: "gazette",
    name: "Gazette",
    description: "單欄報章風，標題大而克制，敘事清晰",
    palette: ["#ffffff", "#7a2222", "#16151a"],
  },
]

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T
const isTemplateId = (value: unknown): value is TemplateId => templateOptions.some((option) => option.id === value)

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
  const previewStageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const raw = window.localStorage.getItem("eli-resume-studio-v1")
    if (!raw) return
    const timeout = window.setTimeout(() => {
      try {
        const parsed = JSON.parse(raw) as { resume?: unknown; template?: TemplateId; savedAt?: string }
        if (parsed.resume) setResume(safeResume(parsed.resume))
        if (isTemplateId(parsed.template)) setTemplate(parsed.template)
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

  useEffect(() => {
    previewStageRef.current?.scrollTo({ top: 0, behavior: "auto" })
  }, [template])

  const { pages, measureRef, main: measureMain, side: measureSide } = usePaginatedResume(resume, template)
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
        if (isTemplateId(parsed.template)) setTemplate(parsed.template)
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
        {
          id: `experience-${Date.now()}`,
          role: "New role",
          company: "Company",
          period: "Year — Present",
          companyDescription: "Briefly describe what this company does.",
          roles: [{ title: "New role", period: "Year — Present", note: "Scope or transition context", bullets: ["Describe the outcome, scope, or impact."] }],
          bullets: [],
        },
      ],
    }))
  }

  const roleStagesFor = (experience: Experience): ExperienceRole[] => {
    if (experience.roles?.length) {
      const hasRoleBullets = experience.roles.some((role) => role.bullets?.length)
      if (!hasRoleBullets && experience.bullets.length > 0) {
        return experience.roles.map((role, index) => (index === 0 ? { ...role, bullets: experience.bullets } : role))
      }
      return experience.roles
    }
    return [{ title: experience.role, period: experience.period, note: "", bullets: experience.bullets }]
  }

  const updateExperienceRoles = (experienceId: string, updater: (roles: ExperienceRole[], experience: Experience) => ExperienceRole[]) => {
    setResume((current) => ({
      ...current,
      experiences: current.experiences.map((experience) => {
        if (experience.id !== experienceId) return experience
        const roles = updater(roleStagesFor(experience), experience)
        return { ...experience, role: roles[0]?.title ?? experience.role, period: roles[0]?.period ?? experience.period, roles, bullets: [] }
      }),
    }))
  }

  const addExperienceRole = (experienceId: string) => {
    updateExperienceRoles(experienceId, (roles) => [...roles, { title: "New role", period: "Year — Year", note: "Scope or transition context", bullets: ["Describe the responsibility, result, or technical impact."] }])
  }

  const updateExperienceRole = (experienceId: string, roleIndex: number, patch: Partial<ExperienceRole>) => {
    updateExperienceRoles(experienceId, (roles) => roles.map((role, index) => (index === roleIndex ? { ...role, ...patch } : role)))
  }

  const removeExperienceRole = (experienceId: string, roleIndex: number) => {
    updateExperienceRoles(experienceId, (roles) => roles.filter((_, index) => index !== roleIndex))
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
          <nav className="editor-quick-nav" aria-label="快速導覽">
            <p>快速導覽</p>
            <div>
              <button type="button" onClick={() => document.getElementById("editor-identity")?.scrollIntoView({ behavior: "smooth", block: "start" })}>個人資訊</button>
              <button type="button" onClick={() => document.getElementById("editor-positioning")?.scrollIntoView({ behavior: "smooth", block: "start" })}>摘要與能力</button>
              <button type="button" onClick={() => document.getElementById("editor-experience")?.scrollIntoView({ behavior: "smooth", block: "start" })}>專業經歷</button>
              <button type="button" onClick={() => document.getElementById("editor-leadership")?.scrollIntoView({ behavior: "smooth", block: "start" })}>領導與社群</button>
              <button type="button" onClick={() => document.getElementById("editor-proof")?.scrollIntoView({ behavior: "smooth", block: "start" })}>獎項與成就</button>
              <button type="button" onClick={() => document.getElementById("editor-foundation")?.scrollIntoView({ behavior: "smooth", block: "start" })}>學歷與技術</button>
              <button type="button" onClick={() => document.getElementById("editor-templates")?.scrollIntoView({ behavior: "smooth", block: "start" })}>模板</button>
            </div>
          </nav>

          <div className="editor-intro">
            <p className="eyebrow">編輯器</p>
            <h2>讓經歷變成一頁有方向的故事。</h2>
            <p>改動左側內容，右側預覽會即時同步。完成後可直接列印成 PDF，或把 JSON 帶到另一台裝置繼續編輯。</p>
          </div>

          <section id="editor-identity" className="editor-card">
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
              <Field label="Availability 標籤" value={resume.personal.availability} onChange={(value) => updatePersonal("availability", value)} />
            </div>
          </section>

          <section id="editor-positioning" className="editor-card">
            <SectionTitle icon={Sparkles} eyebrow="02 / Positioning" title="摘要與核心能力" />
            <Field label="Summary（每行一點）" value={resume.summary} onChange={(value) => setResume((current) => ({ ...current, summary: value }))} multiline />
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

          <section id="editor-experience" className="editor-card">
            <div className="section-heading-row"><SectionTitle icon={BriefcaseBusiness} eyebrow="03 / Experience" title="專業經歷" /><button className="icon-button" aria-label="新增專業經歷" onClick={addExperience}><Plus size={17} /></button></div>
            <div className="repeat-list">
              {resume.experiences.map((experience, index) => {
                const roleStages = roleStagesFor(experience)
                return (
                  <div className="repeat-item" key={experience.id}>
                    <div className="repeat-item-header"><span className="item-index">0{index + 1}</span><button className="icon-button danger" aria-label={`刪除 ${experience.company}`} onClick={() => setResume((current) => ({ ...current, experiences: current.experiences.filter((item) => item.id !== experience.id) }))}><Trash2 size={15} /></button></div>
                    <div className="field-grid compact-grid">
                      <Field label="公司" value={experience.company} onChange={(value) => setResume((current) => ({ ...current, experiences: updateListItem(current.experiences, experience.id, { company: value }) }))} />
                      <Field label="公司總期間（選填）" value={experience.period} onChange={(value) => setResume((current) => ({ ...current, experiences: updateListItem(current.experiences, experience.id, { period: value }) }))} />
                      <Field label="公司簡述（選填）" value={experience.companyDescription ?? ""} onChange={(value) => setResume((current) => ({ ...current, experiences: updateListItem(current.experiences, experience.id, { companyDescription: value }) }))} multiline />
                    </div>
                    <div className="role-editor">
                      <div className="subsection-label"><BriefcaseBusiness size={15} /> Roles at this company</div>
                      {roleStages.map((role, roleIndex) => (
                        <div className="role-editor-card" key={`${experience.id}-role-${roleIndex}`}>
                          <div className="repeat-item-header"><span className="item-index">ROLE {roleIndex + 1}</span><button className="icon-button danger" aria-label={`刪除 ${role.title}`} onClick={() => removeExperienceRole(experience.id, roleIndex)}><Trash2 size={15} /></button></div>
                          <div className="field-grid compact-grid">
                            <Field label="職稱 / 職級 / Function" value={role.title} onChange={(value) => updateExperienceRole(experience.id, roleIndex, { title: value })} />
                            <Field label="期間" value={role.period ?? ""} onChange={(value) => updateExperienceRole(experience.id, roleIndex, { period: value })} />
                            <Field label="補充（升遷、轉組、scope，可選）" value={role.note ?? ""} onChange={(value) => updateExperienceRole(experience.id, roleIndex, { note: value })} multiline />
                            <Field label="成果與責任（每行一點）" value={linesToText(role.bullets ?? [])} onChange={(value) => updateExperienceRole(experience.id, roleIndex, { bullets: textToLines(value) })} multiline />
                          </div>
                        </div>
                      ))}
                      <button className="button button-ghost" type="button" onClick={() => addExperienceRole(experience.id)}><Plus size={15} /> 新增職稱階段</button>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          <section id="editor-leadership" className="editor-card">
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

          <section id="editor-proof" className="editor-card">
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

          <section id="editor-foundation" className="editor-card">
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
              <div className="subsection-label"><Code2 size={15} /> Technical depth</div>
              {resume.technical.map((item, index) => <div className="technical-row" key={`${item.category}-${index}`}><input aria-label="技術分類" value={item.category} onChange={(event) => setResume((current) => ({ ...current, technical: current.technical.map((entry, entryIndex) => entryIndex === index ? { ...entry, category: event.target.value } : entry) }))} /><input aria-label="技術項目" value={item.items} onChange={(event) => setResume((current) => ({ ...current, technical: current.technical.map((entry, entryIndex) => entryIndex === index ? { ...entry, items: event.target.value } : entry) }))} /></div>)}
            </div>
          </section>

          <section id="editor-templates" className="editor-card template-card">
            <SectionTitle icon={LayoutTemplate} eyebrow="07 / Visual system" title="選擇內建模板" />
            <div className="template-grid">
              {templateOptions.map((option) => <button key={option.id} className={`template-option ${template === option.id ? "selected" : ""}`} onClick={() => setTemplate(option.id)}><div className={`template-swatch swatch-${option.id}`}><span /><span /><span /></div><div className="template-option-copy"><strong>{option.name}</strong><small>{option.description}</small></div>{template === option.id && <Check size={16} className="template-check" />}</button>)}
            </div>
          </section>
        </aside>

        <section className={`preview-panel ${activeView === "edit" ? "mobile-hidden" : ""}`}>
          <div className="preview-toolbar">
            <div><p className="eyebrow">Live preview</p><h2>{activeTemplate.name} template</h2></div>
            <div className="preview-toolbar-right">
              <div className="preview-meta"><span>A4 / {pages.length} {pages.length === 1 ? "page" : "pages"} / print-ready</span><span>Last saved {savedAt ? new Date(savedAt).toLocaleTimeString("zh-TW", { hour: "2-digit", minute: "2-digit" }) : "—"}</span></div>
            </div>
          </div>
          <div ref={previewStageRef} className="preview-stage">
            {pages.map((content, page) => <div className="preview-page" key={page}><ResumePaper resume={resume} template={template} page={page} pageCount={pages.length} main={content.main} side={content.side} /></div>)}
          </div>
          <div className="preview-hint"><div className="hint-icon"><Printer size={15} /></div><p><strong>要存成 PDF？</strong> 按右上角「下載 PDF」，在列印視窗選擇「另存為 PDF」。目前頁面已針對 A4 與列印色彩最佳化。</p></div>
        </section>
      </div>
      <div className="print-resume" aria-hidden="true">
        {pages.map((content, page) => <div className="print-page" key={page}><ResumePaper resume={resume} template={template} page={page} pageCount={pages.length} main={content.main} side={content.side} /></div>)}
      </div>
      <ResumeMeasurer measureRef={measureRef} resume={resume} template={template} main={measureMain} side={measureSide} />
      {notice && <div className="toast"><Check size={15} /> {notice}</div>}
    </main>
  )
}

type Block = { id: string; section: string; node: ReactNode }
type PageContent = { main: Block[]; side: Block[] }
type Personal = ResumeData["personal"]

/** Slack left at the bottom of every page so rounding in the measuring pass can never overflow it. */
const PAGE_SAFETY_MARGIN = 12

function ResumeHeaderContent({ personal }: { personal: Personal }) {
  return (
    <>
      <div className="resume-kicker">AI PRODUCT / ENTERPRISE SYSTEMS / WEB TECHNOLOGIES</div>
      <div className="resume-name-row"><div className="resume-name-line"><h1>{personal.name}</h1><p className="resume-short-name">{personal.shortName ? `“${personal.shortName}”` : ""}</p></div><span className="availability-pill">{personal.availability || "Open to meaningful work"}</span></div>
      <p className="resume-headline">{personal.headline}</p>
      <div className="resume-contact-row">
        {personal.location && <span>{personal.location}</span>}
        {personal.phone && <span>{personal.phone}</span>}
        {personal.email && <a href={`mailto:${personal.email}`}>{personal.email}</a>}
        {personal.linkedin && <a href={`https://${personal.linkedin.replace(/^https?:\/\//, "")}`} target="_blank" rel="noreferrer">{personal.linkedin.replace(/^https?:\/\//, "")}</a>}
        {personal.website && <a href={personal.website.startsWith("http") ? personal.website : `https://${personal.website}`} target="_blank" rel="noreferrer">{personal.website.replace(/^https?:\/\//, "")}</a>}
      </div>
    </>
  )
}

function ResumeContinuationContent({ personal }: { personal: Personal }) {
  return (
    <>
      <div className="resume-continuation-name"><strong>{personal.name}</strong>{personal.shortName && <span>“{personal.shortName}”</span>}</div>
      <span className="resume-continuation-label">CONTINUED</span>
    </>
  )
}

const SINGLE_COLUMN_TEMPLATES = new Set<TemplateId>(["classic", "ledger", "gazette"])
const LEADERSHIP_SECTION = "Technical leadership"

function buildBlocks(resume: ResumeData) {
  const one = (id: string, section: string, node: ReactNode, keep: boolean): Block[] => (keep ? [{ id, section, node }] : [])
  const experienceBlocks = resume.experiences.flatMap((experience) => {
    if (experience.roles?.some((role) => role.bullets?.length)) return [{ id: `exp-${experience.id}`, section: "Work Experience", node: <ResumeExperience experience={experience} /> }]
    if (experience.bullets.length <= 4) return [{ id: `exp-${experience.id}`, section: "Work Experience", node: <ResumeExperience experience={experience} /> }]

    const firstBullets = experience.bullets.slice(0, 3)
    const remainingBullets = experience.bullets.slice(3)
    const continued: Experience = {
      ...experience,
      period: "",
      companyDescription: undefined,
      roles: undefined,
      bullets: remainingBullets,
    }
    return [
      { id: `exp-${experience.id}-1`, section: "Work Experience", node: <ResumeExperience experience={{ ...experience, bullets: firstBullets }} splitHead /> },
      { id: `exp-${experience.id}-2`, section: "Work Experience", node: <ResumeExperience experience={continued} continued /> },
    ]
  })

  return {
    summary: one("summary", "Summary", <ul className="resume-summary summary-list">{textToLines(resume.summary).map((line, index) => <li key={`summary-${index}`}>{line.replace(/^[-•]\s*/, "")}</li>)}</ul>, Boolean(resume.summary.trim())),
    competencies: one("competencies", "Core competencies", <div className="competency-list">{resume.competencies.map((skill, index) => <span key={skill}>{skill}{index < resume.competencies.length - 1 && <span className="competency-separator"> · </span>}</span>)}</div>, resume.competencies.length > 0),
    experience: experienceBlocks,
    // The leadership grid lays items out side by side, so it has to be measured as one unit —
    // measuring the items separately would size them at full column width and under-count.
    leadership: one(
      "leadership",
      LEADERSHIP_SECTION,
      <div className="leadership-grid">{resume.leadership.map((item) => <ResumeExperience key={item.id} experience={item} compact />)}</div>,
      resume.leadership.length > 0,
    ),
    awards: one("awards", "Selected awards", <div className="award-list">{resume.awards.map((item) => <div className="award-item" key={item.id}><strong>{item.title}</strong><span>{item.detail}</span></div>)}</div>, resume.awards.length > 0),
    education: one("education", "Education", <div className="education-list">{resume.education.map((item) => <div className="education-item" key={item.id}><strong>{item.degree}</strong><span>{item.school}</span><small>{item.period}</small><em>{item.detail}</em></div>)}</div>, resume.education.length > 0),
    technical: one("technical", "Technical depth", <div className="technical-list">{resume.technical.map((item) => <div key={item.category}><strong>{item.category}</strong><span>{item.items}</span></div>)}</div>, resume.technical.length > 0),
  }
}

/** Blocks in the same order the editor lists them, split per column for the chosen template. */
function orderBlocks(resume: ResumeData, template: TemplateId): { main: Block[]; side: Block[] } {
  const b = buildBlocks(resume)
  if (SINGLE_COLUMN_TEMPLATES.has(template)) {
    return { main: [...b.summary, ...b.competencies, ...b.experience, ...b.leadership, ...b.awards, ...b.education, ...b.technical], side: [] }
  }
  return { main: [...b.summary, ...b.experience, ...b.leadership], side: [...b.competencies, ...b.awards, ...b.education, ...b.technical] }
}

function renderBlockColumn(blocks: Block[]) {
  const groups: { section: string; items: Block[] }[] = []
  for (const block of blocks) {
    const last = groups[groups.length - 1]
    if (last && last.section === block.section) last.items.push(block)
    else groups.push({ section: block.section, items: [block] })
  }
  return groups.map((group) => {
    return (
      <ResumeSection title={group.section} key={`${group.section}-${group.items[0].id}`}>
        {group.items.map((item) => <Fragment key={item.id}>{item.node}</Fragment>)}
      </ResumeSection>
    )
  })
}

/** Greedily fills pages, starting a fresh section label whenever a section continues onto a new page. */
function fillPages(blocks: Block[], heightOf: (id: string) => number, labelCost: number, capacityFor: (page: number) => number) {
  const pages: Block[][] = []
  let current: Block[] = []
  let used = 0
  let section: string | null = null
  for (const block of blocks) {
    const cost = heightOf(block.id) + (block.section === section ? 0 : labelCost)
    if (current.length > 0 && used + cost > capacityFor(pages.length)) {
      pages.push(current)
      current = [block]
      used = heightOf(block.id) + labelCost
      section = block.section
      continue
    }
    current.push(block)
    used += cost
    section = block.section
  }
  if (current.length > 0) pages.push(current)
  return pages
}

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect

/**
 * Measures every block off-screen at its real column width, then flows the blocks
 * into as many A4 pages as they need. Nothing is assigned to a page by index.
 */
function usePaginatedResume(resume: ResumeData, template: TemplateId) {
  const measureRef = useRef<HTMLDivElement>(null)
  const { main, side } = useMemo(() => orderBlocks(resume, template), [resume, template])
  const [pages, setPages] = useState<PageContent[]>(() => [{ main, side }])

  useIsomorphicLayoutEffect(() => {
    const root = measureRef.current
    if (!root) return
    let cancelled = false

    const measure = () => {
      if (cancelled || !measureRef.current) return
      const scope = measureRef.current
      const paper = scope.querySelector<HTMLElement>(".resume-paper")
      const body = scope.querySelector<HTMLElement>(".resume-paper-body")
      if (!paper || !body) return

      const probe = document.createElement("div")
      probe.style.cssText = "position:absolute;visibility:hidden;height:297mm"
      document.body.appendChild(probe)
      const pageHeight = probe.getBoundingClientRect().height
      probe.remove()

      const outerHeight = (element: HTMLElement | null) => {
        if (!element) return 0
        const style = getComputedStyle(element)
        return element.getBoundingClientRect().height + (parseFloat(style.marginTop) || 0) + (parseFloat(style.marginBottom) || 0)
      }
      const paperStyle = getComputedStyle(paper)
      const chrome =
        (parseFloat(paperStyle.paddingTop) || 0) +
        (parseFloat(paperStyle.paddingBottom) || 0) +
        (parseFloat(getComputedStyle(body).paddingTop) || 0) +
        outerHeight(scope.querySelector('[data-measure="footer"]'))
      const headerHeight = outerHeight(scope.querySelector('[data-measure="header"]'))
      const continuationHeight = outerHeight(scope.querySelector('[data-measure="cont"]'))
      const labelCost = outerHeight(scope.querySelector('[data-measure="label"]'))
      const capacityFor = (page: number) => pageHeight - chrome - (page === 0 ? headerHeight : continuationHeight) - PAGE_SAFETY_MARGIN

      const heights = new Map<string, number>()
      scope.querySelectorAll<HTMLElement>("[data-block]").forEach((element) => {
        const child = element.firstElementChild as HTMLElement | null
        const trailingMargin = child ? parseFloat(getComputedStyle(child).marginBottom) || 0 : 0
        heights.set(element.dataset.block ?? "", element.getBoundingClientRect().height + trailingMargin)
      })
      const heightOf = (id: string) => heights.get(id) ?? 0

      const mainPages = fillPages(main, heightOf, labelCost, capacityFor)
      const sidePages = side.length > 0 ? fillPages(side, heightOf, labelCost, capacityFor) : []
      const count = Math.max(1, mainPages.length, sidePages.length)
      setPages(Array.from({ length: count }, (_, index) => ({ main: mainPages[index] ?? [], side: sidePages[index] ?? [] })))
    }

    measure()
    if (typeof document !== "undefined" && document.fonts && document.fonts.status !== "loaded") {
      document.fonts.ready.then(measure).catch(() => {})
    }
    return () => {
      cancelled = true
    }
  }, [main, side, template])

  return { pages, measureRef, main, side }
}

function ResumeMeasurer({ measureRef, resume, template, main, side }: { measureRef: React.RefObject<HTMLDivElement | null>; resume: ResumeData; template: TemplateId; main: Block[]; side: Block[] }) {
  return (
    <div ref={measureRef} className="resume-measure" aria-hidden="true">
      <article className={`resume-paper paper-${template}`} style={{ height: "auto" }}>
        <header className="resume-paper-header" data-measure="header"><ResumeHeaderContent personal={resume.personal} /></header>
        <header className="resume-continuation-header" data-measure="cont"><ResumeContinuationContent personal={resume.personal} /></header>
        <div className="resume-paper-body">
          <main className="resume-main-column">
            <div className="resume-section" data-measure="label"><div className="resume-section-label"><span>Section</span><i /></div></div>
            {main.map((block) => <div data-block={block.id} key={block.id}>{block.node}</div>)}
          </main>
          {side.length > 0 && <aside className="resume-side-column">{side.map((block) => <div data-block={block.id} key={block.id}>{block.node}</div>)}</aside>}
        </div>
        <footer className="resume-paper-footer" data-measure="footer"><span>ELI LIN / RESUME</span><span>PAGE 1 / 1</span></footer>
      </article>
    </div>
  )
}

function ResumePaper({ resume, template, page, pageCount, main, side }: { resume: ResumeData; template: TemplateId; page: number; pageCount: number; main: Block[]; side: Block[] }) {
  const { personal } = resume
  const isOverview = page === 0
  return (
    <article className={`resume-paper paper-${template} ${isOverview ? "resume-page-overview" : "resume-page-continuation"}`}>
      {isOverview ? (
        <header className="resume-paper-header"><ResumeHeaderContent personal={personal} /></header>
      ) : (
        <header className="resume-continuation-header"><ResumeContinuationContent personal={personal} /></header>
      )}

      <div className="resume-paper-body">
        <main className="resume-main-column">{renderBlockColumn(main)}</main>
        {side.length > 0 && <aside className="resume-side-column">{renderBlockColumn(side)}</aside>}
      </div>
      <footer className="resume-paper-footer"><span>ELI LIN / RESUME</span><span>PAGE {page + 1} / {pageCount}</span></footer>
    </article>
  )
}

function ResumeSection({ title, children }: { title: string; children: ReactNode }) {
  return <section className="resume-section"><div className="resume-section-label"><span>{title}</span><i /></div>{children}</section>
}

function ResumeExperience({ experience, compact = false, continued = false, splitHead = false }: { experience: Experience | Leadership; compact?: boolean; continued?: boolean; splitHead?: boolean }) {
  const roles = "roles" in experience ? experience.roles?.filter((role) => role.title) : undefined
  const companyDescription = "companyDescription" in experience ? experience.companyDescription : undefined
  const expandedRoles = roles?.filter((role) => role.bullets?.length)

  return (
    <article className={`resume-experience ${compact ? "compact" : ""} ${roles?.length ? "grouped" : ""} ${continued ? "continued" : ""} ${splitHead ? "split-head" : ""}`}>
      <div className="resume-experience-heading">
        <div>
          <h3>{roles?.length ? experience.company : experience.role}</h3>
          {roles?.length ? (
            <>
              {companyDescription && <p className="company-description">{companyDescription}</p>}
              {expandedRoles?.length ? (
                <div className="role-stack">
                  {roles.map((role) => {
                    const rolePeriod = roles.length === 1 ? experience.period : role.period
                    return (
                      <div className="role-entry" key={`${experience.id}-${role.title}`}>
                        <div className="role-entry-heading"><strong>{role.title}</strong>{rolePeriod && <time>{rolePeriod}</time>}</div>
                        {role.note && <em>{role.note}</em>}
                        {role.bullets?.length && <ul>{role.bullets.map((bullet, index) => <li key={`${experience.id}-${role.title}-${index}`}>{bullet}</li>)}</ul>}
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="role-timeline">
                  {roles.map((role) => {
                    const rolePeriod = roles.length === 1 ? experience.period : role.period
                    return <span key={`${experience.id}-${role.title}`}>{role.title}{rolePeriod && <time>{rolePeriod}</time>}{role.note && <em>{role.note}</em>}</span>
                  })}
                </div>
              )}
            </>
          ) : (
            <p>{experience.company}{compact && <span className="meta-separator"> · </span>}</p>
          )}
        </div>
        {!roles?.length && experience.period && <time>{experience.period}</time>}
      </div>
      {(!expandedRoles?.length && experience.bullets.length > 0) && <ul>{experience.bullets.map((bullet, index) => <li key={`${experience.id}-${index}`}>{bullet}</li>)}</ul>}
    </article>
  )
}
