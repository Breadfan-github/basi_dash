import { averraBrandVars, partnerBrandVars } from "./colorUtils.js"

/** @typedef {{
 *   heroLayout: 'default' | 'corporate' | 'band' | 'bold' | 'editorial' | 'warm' | 'clinical' | 'soft'
 *   navVariant: 'glass' | 'solid' | 'bordered'
 *   footerVariant: 'standard' | 'compact'
 *   layoutShell: string
 * }} SiteDesign */

const DEFAULT_HERO_IMAGE_ALT = "Singapore skyline and business professionals"

/** Same order as `THEMES` (`public/images/1.jpg`–`8.jpg` → `/images/…` on the site). */
const DEFAULT_HERO_IMAGE_BY_THEME_ID = {
  averra: "/images/1.jpg",
  "alpha-bridge": "/images/2.jpg",
  "global-residency": "/images/3.jpg",
  horizon: "/images/4.jpg",
  "lion-city": "/images/5.jpg",
  "one-axis": "/images/6.jpg",
  "pr-bridge": "/images/7.jpg",
  "prime-residency": "/images/8.jpg",
}

/** @param {string} id */
function defaultHeroImageForThemeId(id) {
  return DEFAULT_HERO_IMAGE_BY_THEME_ID[id] ?? "/images/1.jpg"
}

/**
 * @param {object} opts
 * @param {string} opts.id
 * @param {string} opts.displayName
 * @param {string} opts.logo Navbar + shared brand image URL
 * @param {string} [opts.heroLogo] Homepage hero **logo** (top); falls back to `logo`
 * @param {string} [opts.heroImage] Large hero **photo / illustration** (beside or below copy); defaults to `/images/1.jpg`–`/images/8.jpg` by theme (`9.jpg` in `public/images/` for a custom override)
 * @param {string} [opts.heroImageAlt] Alt text for `heroImage`
 * @param {Record<string, string>} opts.cssVars
 * @param {SiteDesign} opts.design
 * @param {{ en: { headline: string, cards: { title: string, body: string }[] }, zh: { headline: string, cards: { title: string, body: string }[] } } | null} [opts.aboutName]
 */
function defineTheme({
  id,
  displayName,
  logo,
  heroLogo,
  heroImage,
  heroImageAlt,
  cssVars,
  design,
  aboutName = null,
}) {
  return {
    id,
    displayName,
    logo,
    heroLogo: heroLogo ?? logo,
    heroImage: heroImage ?? defaultHeroImageForThemeId(id),
    heroImageAlt: heroImageAlt ?? DEFAULT_HERO_IMAGE_ALT,
    cssVars,
    design,
    aboutName,
  }
}

const ABOUT_ALPHA_EN = {
  headline: "What we stand for",
  cards: [
    {
      title: "Evidence-led guidance",
      body: "Every recommendation is grounded in current policy, documented requirements, and practical approval patterns—not generic advice.",
    },
    {
      title: "Client-first clarity",
      body: "We explain trade-offs, timelines, and risks in plain language so you can decide with confidence at each milestone.",
    },
    {
      title: "End-to-end partnership",
      body: "From profile review through submission and follow-up, one coordinated team stays accountable for your Singapore residency goals.",
    },
  ],
}

const ABOUT_ALPHA_ZH = {
  headline: "我们的承诺",
  cards: [
    {
      title: "以依据为本的建议",
      body: "每项建议都紧扣最新政策、文件要求与实务重点，而非泛泛策略。",
    },
    {
      title: "以客户为先的透明沟通",
      body: "我们用清晰语言说明取舍、时间与风险，帮助您在每个阶段安心决策。",
    },
    {
      title: "全流程协作伙伴",
      body: "从背景梳理到递交与跟进，由同一团队持续负责您的新加坡身份规划。",
    },
  ],
}

const partnerAbout = {
  "alpha-bridge": { en: ABOUT_ALPHA_EN, zh: ABOUT_ALPHA_ZH },
  "global-residency": {
    en: {
      headline: "Our principles",
      cards: [
        {
          title: "Global perspective, local execution",
          body: "We connect international experience with Singapore’s regulatory reality to design realistic, audit-ready pathways.",
        },
        {
          title: "Structured process",
          body: "Clear milestones, checklists, and document discipline reduce friction and keep your application on track.",
        },
        {
          title: "Long-term outlook",
          body: "We plan beyond the next form—considering family, career, and compliance so your residency story stays coherent.",
        },
      ],
    },
    zh: {
      headline: "我们的理念",
      cards: [
        {
          title: "全球视野，落地执行",
          body: "结合国际经验与新加坡法规实务，规划可执行、可备查的申请路径。",
        },
        {
          title: "结构化流程",
          body: "以节点、清单与文件纪律降低不确定性，让进度稳步推进。",
        },
        {
          title: "长线规划",
          body: "不只关注当下表格，更兼顾家庭、事业与合规，让身份叙事一致可信。",
        },
      ],
    },
  },
  horizon: {
    en: {
      headline: "Why clients choose us",
      cards: [
        {
          title: "Forward visibility",
          body: "We surface outcomes early—eligibility signals, gap analysis, and a roadmap before you commit significant time or cost.",
        },
        {
          title: "Rigorous preparation",
          body: "Narratives, evidence, and supporting materials are stress-tested against how cases are actually assessed.",
        },
        {
          title: "Responsive support",
          body: "Questions and updates are handled promptly so you are never guessing where your file stands.",
        },
      ],
    },
    zh: {
      headline: "客户信赖我们的原因",
      cards: [
        {
          title: "前置能见度",
          body: "在您投入大量时间与成本前，先厘清资格信号、差距分析与路径图。",
        },
        {
          title: "严谨筹备",
          body: "陈述、证据与支撑材料按实务评估逻辑反复校验，提升呈现质量。",
        },
        {
          title: "敏捷响应",
          body: "问题与进度更新及时回应，让您始终清楚案件所处的阶段。",
        },
      ],
    },
  },
  "lion-city": {
    en: {
      headline: "The Lion City standard",
      cards: [
        {
          title: "Rooted in Singapore",
          body: "Deep familiarity with ICA expectations and local context—tailored to professionals and families building life here.",
        },
        {
          title: "Disciplined delivery",
          body: "Consistent quality checks and version control so submissions stay accurate and complete.",
        },
        {
          title: "Respect for your story",
          body: "We preserve authenticity while shaping a coherent profile that matches policy objectives.",
        },
      ],
    },
    zh: {
      headline: "狮城服务标准",
      cards: [
        {
          title: "深耕新加坡语境",
          body: "熟悉本地理会与实务，为在此扎根的专业人士与家庭量身定制。",
        },
        {
          title: "交付有纪律",
          body: "以质量复核与版本管理确保材料一致、完整、可追溯。",
        },
        {
          title: "尊重您的经历",
          body: "在真实经历与政策导向之间找到平衡，呈现可信、连贯的个人叙事。",
        },
      ],
    },
  },
  "one-axis": {
    en: {
      headline: "Mobility, made precise",
      cards: [
        {
          title: "Cross-border fluency",
          body: "We translate complex mobility requirements into actionable steps for individuals, families, and employers.",
        },
        {
          title: "Operational focus",
          body: "Timelines, documentation, and handoffs are managed like a program—minimizing surprises.",
        },
        {
          title: "Outcome alignment",
          body: "Strategy stays tied to your visa/residency targets, not generic template bundles.",
        },
      ],
    },
    zh: {
      headline: "让全球流动更清晰",
      cards: [
        {
          title: "跨境语境洞察",
          body: "把复杂的流动性要求转译成可执行的步骤，服务个人、家庭与雇主。",
        },
        {
          title: "注重落地运营",
          body: "时间线、文件与交接以项目管理方式推进，降低意外与返工。",
        },
        {
          title: "对齐结果目标",
          body: "策略紧扣签证／居留目标，而不是堆砌无关模板。",
        },
      ],
    },
  },
  "pr-bridge": {
    en: {
      headline: "Clarity across the bridge",
      cards: [
        {
          title: "PR pathway mapping",
          body: "We connect eligibility, risk factors, and staging so the journey from work pass to PR is understandable.",
        },
        {
          title: "Documentation hygiene",
          body: "Clean bundles, naming conventions, and evidence indexing reduce officer friction and client anxiety.",
        },
        {
          title: "Measured counsel",
          body: "Direct answers—where you stand, what to fix, and what to expect next.",
        },
      ],
    },
    zh: {
      headline: "跨越申请桥梁的清晰路径",
      cards: [
        {
          title: "PR 路径规划",
          body: "把资格、风险与阶段串连起来，让从工作准证到 PR 的步伐可理解、可规划。",
        },
        {
          title: "文件规范",
          body: "整齐的材料包、命名与证据索引，降低补件与焦虑。",
        },
        {
          title: "务实建议",
          body: "直接说明现状、待改进项与下一步预期，不让您雾里看花。",
        },
      ],
    },
  },
  "prime-residency": {
    en: {
      headline: "Prime focus on residency",
      cards: [
        {
          title: "Priority on outcomes",
          body: "We prioritize moves that materially strengthen approval odds—no busywork, no decorative filler.",
        },
        {
          title: "Senior attention",
          body: "Experienced consultants remain involved; your case is not passed down an anonymous queue.",
        },
        {
          title: "Transparent economics",
          body: "Scopes and fee expectations are clarified up front alongside realistic timelines.",
        },
      ],
    },
    zh: {
      headline: "专注居留成果",
      cards: [
        {
          title: "以结果为先",
          body: "聚焦能实质提升成功率的动作，避免无效忙碌与表面文章。",
        },
        {
          title: "资深把关",
          body: "资深顾问持续参与，案件不会流入匿名流水线。",
        },
        {
          title: "费用透明",
          body: "事前说明范围、费用预期与合理时间线。",
        },
      ],
    },
  },
}

const designPresets = {
  averra: {
    heroLayout: "default",
    navVariant: "glass",
    footerVariant: "standard",
    layoutShell: "",
  },
  "alpha-bridge": {
    heroLayout: "corporate",
    navVariant: "bordered",
    footerVariant: "standard",
    layoutShell: "theme-shell-corporate",
  },
  "global-residency": {
    heroLayout: "band",
    navVariant: "solid",
    footerVariant: "standard",
    layoutShell: "theme-shell-band",
  },
  horizon: {
    heroLayout: "bold",
    navVariant: "glass",
    footerVariant: "compact",
    layoutShell: "theme-shell-bold",
  },
  "lion-city": {
    heroLayout: "editorial",
    navVariant: "bordered",
    footerVariant: "standard",
    layoutShell: "theme-shell-editorial",
  },
  "one-axis": {
    heroLayout: "warm",
    navVariant: "glass",
    footerVariant: "standard",
    layoutShell: "theme-shell-warm",
  },
  "pr-bridge": {
    heroLayout: "clinical",
    navVariant: "solid",
    footerVariant: "compact",
    layoutShell: "theme-shell-clinical",
  },
  "prime-residency": {
    heroLayout: "soft",
    navVariant: "glass",
    footerVariant: "standard",
    layoutShell: "theme-shell-soft",
  },
}

export const THEMES = {
  averra: defineTheme({
    id: "averra",
    displayName: "Averra One",
    logo: "/images/logo_light.png",
    cssVars: averraBrandVars(),
    design: designPresets.averra,
    aboutName: null,
  }),
  "alpha-bridge": defineTheme({
    id: "alpha-bridge",
    displayName: "Alpha Bridge Immigration Advisory",
    logo: "/images/AlphaBridgeImmigrationAdvisory.png",
    cssVars: partnerBrandVars("#385499", "black"),
    design: designPresets["alpha-bridge"],
    aboutName: partnerAbout["alpha-bridge"],
  }),
  "global-residency": defineTheme({
    id: "global-residency",
    displayName: "Global Residency Consultancy",
    logo: "/images/GlobalResidencyConsultancy.png",
    cssVars: partnerBrandVars("#104679", "black"),
    design: designPresets["global-residency"],
    aboutName: partnerAbout["global-residency"],
  }),
  horizon: defineTheme({
    id: "horizon",
    displayName: "Horizon Immigration Consultancy",
    logo: "/images/HorizonImmigrationConsultancy.png",
    cssVars: partnerBrandVars("#EF4437", "black"),
    design: designPresets.horizon,
    aboutName: partnerAbout.horizon,
  }),
  "lion-city": defineTheme({
    id: "lion-city",
    displayName: "Lion City Residency Advisory",
    logo: "/images/LionCityResidencyAdvisory.png",
    cssVars: partnerBrandVars("#9D1B38", "black"),
    design: designPresets["lion-city"],
    aboutName: partnerAbout["lion-city"],
  }),
  "one-axis": defineTheme({
    id: "one-axis",
    displayName: "OneAxis Global Mobility SG",
    logo: "/images/OneAxisGlobalMobilitySG.png",
    cssVars: partnerBrandVars("#F57F29", "black"),
    design: designPresets["one-axis"],
    aboutName: partnerAbout["one-axis"],
  }),
  "pr-bridge": defineTheme({
    id: "pr-bridge",
    displayName: "PR Bridge Consultancy Pte Ltd",
    logo: "/images/PRBridgeConsultancyPteLtd.png",
    cssVars: partnerBrandVars("#0F537E", "grey"),
    design: designPresets["pr-bridge"],
    aboutName: partnerAbout["pr-bridge"],
  }),
  "prime-residency": defineTheme({
    id: "prime-residency",
    displayName: "Prime Residency Advisory",
    logo: "/images/PrimeResidencyAdvisory.png",
    cssVars: partnerBrandVars("#E65325", "black"),
    design: designPresets["prime-residency"],
    aboutName: partnerAbout["prime-residency"],
  }),
}

export const THEME_IDS = Object.keys(THEMES)

/** @param {string | undefined} raw */
export function resolveThemeId(raw) {
  if (!raw || typeof raw !== "string") return "averra"
  const id = raw.trim()
  return THEMES[id] ? id : "averra"
}

export function getTheme(id) {
  return THEMES[resolveThemeId(id)]
}

/** @param {string} href */
function setLinkRelAttribute(rel, href) {
  if (!href || typeof href !== "string") return
  let link = document.querySelector(`link[rel="${rel}"]`)
  if (!link) {
    link = document.createElement("link")
    link.rel = rel
    document.head.appendChild(link)
  }
  link.href = href
  if (rel === "icon") {
    const lower = href.toLowerCase()
    link.type = lower.endsWith(".svg") ? "image/svg+xml" : "image/png"
  }
}

/** Call before React mounts so `data-theme` and CSS variables apply on first paint. */
export function applyInitialDocumentTheme() {
  const theme = getTheme(resolveThemeId(import.meta.env.VITE_SITE_THEME))
  document.documentElement.dataset.theme = theme.id
  for (const [key, value] of Object.entries(theme.cssVars)) {
    document.documentElement.style.setProperty(key, value)
  }
  setLinkRelAttribute("icon", theme.logo)
  setLinkRelAttribute("apple-touch-icon", theme.logo)
}
