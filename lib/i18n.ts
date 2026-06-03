export const locales = ["en", "zh"] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "en"

const sharedContactValidation = {
  "Please enter your name": "請輸入姓名",
  "Name is too long": "姓名過長",
  "Please enter your email": "請輸入電子郵件",
  "Please enter a valid email": "請輸入有效的電子郵件",
  "Email is too long": "電子郵件過長",
  "Please enter your company": "請輸入公司名稱",
  "Company is too long": "公司名稱過長",
  "Please enter a message": "請輸入訊息內容",
  "Message is too long": "訊息內容過長",
  Invalid: "格式不正確",
}

export const homeDictionaries = {
  en: {
    locale: "en",
    htmlLang: "en",
    routePath: "/",
    metadata: {
      title: "ECO Tech | AI & IT Solutions for Every Industry",
      description:
        "ECO Tech designs and develops cutting-edge AI & IT solutions for businesses across all industries. WorldSkills Champion expertise driving innovation.",
      keywords: [
        "AI solutions",
        "IT consulting",
        "software development",
        "digital transformation",
        "machine learning",
        "enterprise solutions",
      ],
      openGraphTitle: "ECO Tech | AI & IT Solutions",
      openGraphDescription: "Transforming businesses with innovative AI & IT solutions",
    },
    loading: {
      status: "Initializing...",
    },
    navigation: {
      cta: "Get Started",
      languageLabel: "中文",
      alternateLocale: "zh",
      alternateHref: "/zh",
      items: [
        { label: "Home", href: "#home" },
        { label: "Services", href: "#services" },
        { label: "About", href: "#about" },
        { label: "Partners", href: "#partners" },
        { label: "Contact", href: "#contact" },
      ],
    },
    hero: {
      badge: "WorldSkills Champion Excellence",
      heading: {
        beforeAccent: "Design & Develop",
        accent: "AI & IT",
        afterAccent: "Solutions for Every Industry",
      },
      subtitle:
        "ECO Tech transforms businesses with cutting-edge artificial intelligence and innovative technology solutions. We build the future, one solution at a time.",
      primaryCta: "Start Building",
      secondaryCta: "View Our Work",
      stats: [
        { value: "1+", label: "Year of Innovation" },
        { value: "10+", label: "Projects Delivered" },
        { value: "100%", label: "Client Satisfaction" },
      ],
    },
    services: {
      eyebrow: "Our Services",
      title: "Comprehensive IT Solutions",
      description:
        "We deliver cutting-edge technology solutions that drive innovation and growth for businesses across all industries.",
      cards: [
        {
          title: "AI Solutions",
          description:
            "Custom artificial intelligence and machine learning solutions tailored to your business needs. From predictive analytics to natural language processing.",
        },
        {
          title: "Software Development",
          description:
            "End-to-end software development services including web applications, mobile apps, and enterprise systems with modern tech stacks.",
        },
        {
          title: "Cloud Architecture",
          description:
            "Scalable cloud infrastructure design and implementation. We help you migrate, optimize, and manage your cloud resources efficiently.",
        },
        {
          title: "Cybersecurity",
          description:
            "Comprehensive security solutions to protect your digital assets. Risk assessment, penetration testing, and security audits.",
        },
        {
          title: "Digital Transformation",
          description:
            "Transform your business operations with modern technology. Process automation, workflow optimization, and digital strategy.",
        },
        {
          title: "Data Analytics",
          description:
            "Turn your data into actionable insights. Business intelligence, data visualization, and advanced analytics solutions.",
        },
      ],
    },
    about: {
      eyebrow: "About Us",
      title: "Building the Future of Business Technology",
      paragraphs: [
        "ECO Tech is a dynamic startup founded with a mission to democratize access to cutting-edge AI and IT solutions. In just one year, we have established ourselves as a trusted partner for businesses seeking digital transformation.",
        "Our team combines world-class technical expertise with deep industry knowledge, delivering solutions that not only meet today's needs but anticipate tomorrow's challenges.",
      ],
      stats: [
        { value: "2025", label: "Founded" },
        { value: "Global", label: "Reach" },
      ],
      highlights: [
        {
          title: "WorldSkills Excellence",
          description:
            "Our team includes WorldSkills Champion and Asia Expert, bringing world-class expertise to every project.",
        },
        {
          title: "Client-Centric Approach",
          description:
            "We prioritize understanding your unique challenges and delivering solutions that exceed expectations.",
        },
        {
          title: "Industry Expertise",
          description:
            "Deep experience across multiple sectors enables us to deliver tailored solutions for any industry.",
        },
        {
          title: "Innovation-Driven",
          description:
            "We stay at the forefront of technology, leveraging the latest advancements to drive your success.",
        },
      ],
    },
    partners: {
      eyebrow: "Trusted By",
      title: "Our Partners & Credentials",
      description:
        "We're proud to collaborate with leading organizations and hold prestigious credentials that validate our expertise.",
      partners: [
        { name: "WorldSkills", subtitle: "Champion" },
        { name: "WorldSkills Asia", subtitle: "Expert" },
        { name: "APMIC", subtitle: "Partner" },
        { name: "Ministry of Labor", subtitle: "Republic of China" },
        { name: "hestechs", subtitle: "Technology Partner" },
      ],
      credentials: [
        "WorldSkills Champion",
        "WorldSkills Asia's Expert",
        "APMIC Certified",
        "Government Approved",
        "Enterprise Ready",
      ],
      achievements: [
        {
          number: "01",
          title: "International Recognition",
          description:
            "WorldSkills Champion-level expertise recognized globally for technical excellence.",
        },
        {
          number: "02",
          title: "Government Trust",
          description:
            "Partnered with Ministry of Labor, Republic of China for workforce development initiatives.",
        },
        {
          number: "03",
          title: "Industry Innovation",
          description: "APMIC collaboration advancing private machine intelligence solutions.",
        },
      ],
    },
    contact: {
      eyebrow: "Contact Us",
      title: "Let's Build Something Amazing Together",
      description:
        "Ready to transform your business with AI and IT solutions? Get in touch with our team to discuss your project.",
      emailLabel: "Email",
      locationLabel: "Location",
      locationValue: "Taiwan & Worldwide",
      followLabel: "Follow Us",
      form: {
        title: "Send us a message",
        submit: "Send Message",
        labels: {
          name: "Name",
          email: "Email",
          company: "Company",
          message: "Message",
        },
        placeholders: {
          name: "Your name",
          email: "your@email.com",
          company: "Your company",
          message: "Tell us about your project...",
        },
        messages: {
          fixFields: "Please fix the highlighted fields.",
          failed: "Something went wrong. Please try again.",
          success: "Message sent. We will get back to you soon.",
          network: "Network error. Please try again.",
        },
        validationMessages: {},
      },
    },
    footer: {
      description:
        "Designing and developing AI & IT solutions for every industry. World-class expertise, global reach.",
      credentialLine: "WorldSkills Champion • WorldSkills Asia Expert",
      copyrightSuffix: "All rights reserved.",
      linkGroups: [
        {
          title: "Company",
          links: [
            { label: "About", href: "#about" },
            { label: "Services", href: "#services" },
            { label: "Partners", href: "#partners" },
            { label: "Contact", href: "#contact" },
          ],
        },
        {
          title: "Services",
          links: [
            { label: "AI Solutions", href: "#services" },
            { label: "Software Dev", href: "#services" },
            { label: "Cloud Architecture", href: "#services" },
            { label: "Data Analytics", href: "#services" },
          ],
        },
        {
          title: "Legal",
          links: [
            { label: "Privacy Policy", href: "#" },
            { label: "Terms of Service", href: "#" },
            { label: "Cookie Policy", href: "#" },
          ],
        },
      ],
    },
  },
  zh: {
    locale: "zh",
    htmlLang: "zh-Hant",
    routePath: "/zh",
    metadata: {
      title: "ECO Tech | AI 與 IT 解決方案",
      description:
        "ECO Tech 為各產業設計並開發 AI 與 IT 解決方案，以 WorldSkills 冠軍級專業協助企業創新與數位轉型。",
      keywords: [
        "AI 解決方案",
        "IT 顧問",
        "軟體開發",
        "數位轉型",
        "機器學習",
        "企業解決方案",
      ],
      openGraphTitle: "ECO Tech | AI 與 IT 解決方案",
      openGraphDescription: "以創新的 AI 與 IT 解決方案協助企業轉型",
    },
    loading: {
      status: "初始化中...",
    },
    navigation: {
      cta: "開始合作",
      languageLabel: "English",
      alternateLocale: "en",
      alternateHref: "/",
      items: [
        { label: "首頁", href: "#home" },
        { label: "服務", href: "#services" },
        { label: "關於我們", href: "#about" },
        { label: "合作夥伴", href: "#partners" },
        { label: "聯絡我們", href: "#contact" },
      ],
    },
    hero: {
      badge: "WorldSkills 冠軍級專業",
      heading: {
        beforeAccent: "設計與開發",
        accent: "AI 與 IT",
        afterAccent: "解決方案，服務每個產業",
      },
      subtitle:
        "ECO Tech 以尖端人工智慧與創新技術協助企業轉型。我們從需求到落地，打造能推動成長的數位解決方案。",
      primaryCta: "開始合作",
      secondaryCta: "查看服務",
      stats: [
        { value: "1+", label: "創新年資" },
        { value: "10+", label: "已交付專案" },
        { value: "100%", label: "客戶滿意度" },
      ],
    },
    services: {
      eyebrow: "服務項目",
      title: "完整 IT 解決方案",
      description: "我們提供能推動創新與成長的前沿技術服務，協助各產業企業完成數位升級。",
      cards: [
        {
          title: "AI 解決方案",
          description: "依照企業需求打造人工智慧與機器學習應用，涵蓋預測分析、自然語言處理與流程自動化。",
        },
        {
          title: "軟體開發",
          description: "提供端到端軟體開發服務，包含網站、行動應用與企業系統，並採用現代化技術堆疊。",
        },
        {
          title: "雲端架構",
          description: "設計並導入可擴展的雲端基礎設施，協助遷移、優化與有效管理雲端資源。",
        },
        {
          title: "資安防護",
          description: "提供風險評估、滲透測試與安全稽核，協助保護企業數位資產。",
        },
        {
          title: "數位轉型",
          description: "透過流程自動化、工作流優化與數位策略，讓企業營運更有效率。",
        },
        {
          title: "資料分析",
          description: "將資料轉化為可行動洞察，提供商業智慧、資料視覺化與進階分析方案。",
        },
      ],
    },
    about: {
      eyebrow: "關於我們",
      title: "打造企業科技的下一步",
      paragraphs: [
        "ECO Tech 是以普及尖端 AI 與 IT 解決方案為使命的新創團隊。我們在短時間內成為企業推動數位轉型時可信賴的技術夥伴。",
        "團隊結合世界級技術能力與跨產業經驗，交付能滿足當下需求、也能面向未來挑戰的解決方案。",
      ],
      stats: [
        { value: "2025", label: "成立年份" },
        { value: "全球", label: "服務範圍" },
      ],
      highlights: [
        {
          title: "WorldSkills 專業實力",
          description: "團隊具備 WorldSkills 冠軍與亞洲專家經驗，將世界級技術標準帶入每個專案。",
        },
        {
          title: "以客戶為中心",
          description: "我們先理解企業的真實挑戰，再交付超出期待且可落地的解決方案。",
        },
        {
          title: "跨產業經驗",
          description: "累積多元產業實戰經驗，能依照不同場景設計合適的技術方案。",
        },
        {
          title: "以創新驅動",
          description: "持續掌握最新技術進展，協助客戶把創新轉化為可衡量的成果。",
        },
      ],
    },
    partners: {
      eyebrow: "值得信賴",
      title: "合作夥伴與專業資歷",
      description: "我們與重要組織合作，並具備能驗證技術能力與交付品質的專業資歷。",
      partners: [
        { name: "WorldSkills", subtitle: "冠軍" },
        { name: "WorldSkills Asia", subtitle: "專家" },
        { name: "APMIC", subtitle: "合作夥伴" },
        { name: "Ministry of Labor", subtitle: "中華民國" },
        { name: "hestechs", subtitle: "技術合作夥伴" },
      ],
      credentials: [
        "WorldSkills 冠軍",
        "WorldSkills Asia 專家",
        "APMIC 認證",
        "政府信任",
        "企業級交付",
      ],
      achievements: [
        {
          number: "01",
          title: "國際級肯定",
          description: "WorldSkills 冠軍級技術能力，在全球專業舞台獲得肯定。",
        },
        {
          number: "02",
          title: "政府信任",
          description: "與中華民國勞動部合作，推動人才培育與產業升級。",
        },
        {
          number: "03",
          title: "產業創新",
          description: "透過 APMIC 合作推進 private machine intelligence 應用。",
        },
      ],
    },
    contact: {
      eyebrow: "聯絡我們",
      title: "一起打造下一個重要解決方案",
      description: "準備用 AI 與 IT 解決方案推動企業轉型了嗎？歡迎與我們討論您的專案需求。",
      emailLabel: "電子郵件",
      locationLabel: "服務地點",
      locationValue: "台灣與全球",
      followLabel: "追蹤我們",
      form: {
        title: "留下您的需求",
        submit: "送出訊息",
        labels: {
          name: "姓名",
          email: "電子郵件",
          company: "公司",
          message: "訊息",
        },
        placeholders: {
          name: "您的姓名",
          email: "your@email.com",
          company: "公司名稱",
          message: "請告訴我們您的專案需求...",
        },
        messages: {
          fixFields: "請先修正標示的欄位。",
          failed: "送出失敗，請再試一次。",
          success: "訊息已送出，我們會盡快與您聯繫。",
          network: "網路連線異常，請再試一次。",
        },
        validationMessages: sharedContactValidation,
      },
    },
    footer: {
      description: "為每個產業設計並開發 AI 與 IT 解決方案，以世界級專業服務全球客戶。",
      credentialLine: "WorldSkills 冠軍 • WorldSkills Asia 專家",
      copyrightSuffix: "保留所有權利。",
      linkGroups: [
        {
          title: "公司",
          links: [
            { label: "關於我們", href: "#about" },
            { label: "服務", href: "#services" },
            { label: "合作夥伴", href: "#partners" },
            { label: "聯絡我們", href: "#contact" },
          ],
        },
        {
          title: "服務",
          links: [
            { label: "AI 解決方案", href: "#services" },
            { label: "軟體開發", href: "#services" },
            { label: "雲端架構", href: "#services" },
            { label: "資料分析", href: "#services" },
          ],
        },
        {
          title: "法律",
          links: [
            { label: "隱私權政策", href: "#" },
            { label: "服務條款", href: "#" },
            { label: "Cookie 政策", href: "#" },
          ],
        },
      ],
    },
  },
} as const

export type HomeContent = (typeof homeDictionaries)[Locale]

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale)
}

export function getHomeContent(locale: Locale): HomeContent {
  return homeDictionaries[locale]
}

export function getLocalePath(locale: Locale) {
  return locale === defaultLocale ? "/" : `/${locale}`
}

export function getLocalizedHref(locale: Locale, fragment = "") {
  const path = getLocalePath(locale)

  if (!fragment) return path
  if (!fragment.startsWith("#")) return fragment

  return `${path}${fragment}`
}

export function getHomeMetadata(locale: Locale) {
  const content = getHomeContent(locale)

  return {
    title: content.metadata.title,
    description: content.metadata.description,
    keywords: [...content.metadata.keywords],
    openGraph: {
      title: content.metadata.openGraphTitle,
      description: content.metadata.openGraphDescription,
      type: "website" as const,
    },
  }
}
