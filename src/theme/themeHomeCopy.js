/** Per-theme home page copy (EN/ZH). Averra uses i18n defaults when missing. */

function fillCompany(str, companyName) {
  if (!str || typeof str !== "string") return str
  return str.replace(/\{\{companyName\}\}/g, companyName)
}

/** @param {string} themeId
 * @param {string | undefined} language i18n language
 * @param {string} companyName */
export function getHomeCopy(themeId, language, companyName) {
  const pack = THEME_HOME_COPY[themeId]
  if (!pack) return null
  const lang = language && language.startsWith("zh") ? "zh" : "en"
  const raw = pack[lang] || pack.en
  if (!raw) return null
  /** @type {Record<string, string>} */
  const out = {}
  for (const [k, v] of Object.entries(raw)) {
    out[k] = fillCompany(v, companyName)
  }
  return out
}

const THEME_HOME_COPY = {
  "alpha-bridge": {
    en: {
      heroBadge: "Structured advisory · Singapore ICA focus",
      heroTitle: "Cross the bridge from uncertainty to a",
      heroTitleHighlight: "clear PR & citizenship plan",
      heroDescription:
        "{{companyName}} serves expatriates and families who want defensible filings—timeline clarity, document discipline, and steady communication until outcome.",
      heroCtaPrimary: "Start PR eligibility",
      heroCtaSecondary: "Citizenship pathway review",
      servicesBadge: "Practice areas",
      servicesTitle: "Immigration advisory built for compliance-first outcomes",
      servicesSubtitle:
        "We align profile narrative, evidence, and milestones with how Singapore authorities assess cases—not generic templates.",
      assessmentsHeading: "Eligibility snapshots",
      assessmentsSubtitle: "Two guided checks: PR and Citizenship. Know gaps before you invest months in paperwork.",
      aboutChip: "Who we are",
      aboutTitle: "Blue-chip rigour for personal immigration matters",
      aboutStory1:
        "{{companyName}} was set up for professionals who expect the same precision from residency counsel as from tax or legal advisors.",
      aboutStory2:
        "Our team stays close to policy shifts and practical submission patterns so your file reads coherent, consistent, and audit-ready.",
      whyBadge: "Why Singapore",
      whyTitle: "Stability, rule of law, and a credible hub",
      whySubtitle:
        "For globally mobile households, Singapore remains a rare combination of transparency, connectivity, and long-term optionality.",
      contactBadge: "Reach our desk",
      contactTitle: "Book a structured intake",
      contactSubtitle:
        "Share your timeline and documents—we respond with a scoped plan, not a brochure.",
    },
    zh: {
      heroBadge: "结构化顾问 · 聚焦新加坡移民局",
      heroTitle: "从不确定走向",
      heroTitleHighlight: "清晰的永居与公民路径",
      heroDescription:
        "{{companyName}}面向希望递交稳妥、时间线清楚、文件有章可循的外籍人士与家庭，并保持沟通直至有结果。",
      heroCtaPrimary: "开始 PR 资格评估",
      heroCtaSecondary: "公民路径复核",
      servicesBadge: "业务领域",
      servicesTitle: "以合规为先的移民顾问服务",
      servicesSubtitle: "我们将履历叙事、佐证与节点对齐当局实务重点，而非套用泛泛模板。",
      assessmentsHeading: "资格速览",
      assessmentsSubtitle: "两项引导式自检：永居与公民。在投入大量填表前先看清差距。",
      aboutChip: "关于我们",
      aboutTitle: "以个人移民事务承载机构级严谨",
      aboutStory1: "{{companyName}}为期待与税务、法律同等精度的客户而设。",
      aboutStory2: "团队紧跟政策与实务趋势，让您的档案前后一致、经得起审视。",
      whyBadge: "为何新加坡",
      whyTitle: "稳定、法治与可信枢纽",
      whySubtitle: "对全球流动家庭而言，新加坡在透明、联通与长期选择面上仍具稀缺组合。",
      contactBadge: "联系顾问台",
      contactTitle: "预约结构化初步沟通",
      contactSubtitle: "请说明您的时间线与材料现状——我们以可执行方案回应，而非宣传册式回复。",
    },
  },
  "global-residency": {
    en: {
      heroBadge: "Global moves · Local filing",
      heroTitle: "Residency strategy that travels with you—anchored in",
      heroTitleHighlight: "Singapore",
      heroDescription:
        "{{companyName}} connects international careers with Singapore’s PR and citizenship frameworks—useful for relocating executives, founders, and investors.",
      heroCtaPrimary: "PR readiness check",
      heroCtaSecondary: "Citizenship outlook",
      servicesBadge: "What we assemble",
      servicesTitle: "From profile to package: one coordinated team",
      servicesSubtitle:
        "Evaluation, enhancement, and submission support designed for people whose lives span more than one jurisdiction.",
      assessmentsHeading: "Where do you stand?",
      assessmentsSubtitle: "Short assessments to map eligibility signals for PR and Citizenship before deeper engagement.",
      aboutChip: "Our stance",
      aboutTitle: "We think in jurisdictions—and sweat the Singapore file",
      aboutStory1:
        "{{companyName}} helps clients who already think globally but need their Singapore story told cleanly.",
      aboutStory2:
        "Expect plain-English trade-offs, disciplined checklists, and no drama: just executable next steps.",
      whyBadge: "Singapore lens",
      whyTitle: "A serious base in Asia-Pacific",
      whySubtitle:
        "Talent, capital, and families continue to choose Singapore for predictability and access across the region.",
      contactBadge: "Start a conversation",
      contactTitle: "Tell us your mobility picture",
      contactSubtitle: "Citizenship, PR, or both—we’ll mirror your facts to the right pathway.",
    },
    zh: {
      heroBadge: "全球移动 · 本地递交",
      heroTitle: "与您同行的新加坡",
      heroTitleHighlight: "居留策略",
      heroDescription:
        "{{companyName}}衔接跨国职业与新加坡永居、公民框架，适合外派高管、创业者与投资者。",
      heroCtaPrimary: "PR 准备度评估",
      heroCtaSecondary: "公民前景",
      servicesBadge: "我们整合什么",
      servicesTitle: "从背景梳理到材料包：同一团队协同",
      aboutChip: "我们的立场",
      aboutTitle: "用司法辖区思维落地新加坡档案",
      aboutStory1: "{{companyName}}协助已在多国生活的客户，把新加坡叙事讲清楚、讲一致。",
      aboutStory2: "以直白取舍、清单纪律与可执行动作为主，而非情绪化的承诺。",
      servicesSubtitle: "面向生活跨度超越单一司法辖区的申请人，提供评估、补强与递交支持。",
      assessmentsHeading: "您目前卡在哪？",
      assessmentsSubtitle: "简短测评，在深入合作前看清 PR 与公民的资格信号。",
      whyBadge: "新加坡视角",
      whyTitle: "亚太地区的重要支点",
      whySubtitle: "人才、资金与家庭仍因可预期性与区域联通而选择新加坡。",
      contactBadge: "开始对话",
      contactTitle: "描述您的流动与规划",
      contactSubtitle: "公民、永居或并行——我们将事实映射到合适路径。",
    },
  },
  horizon: {
    en: {
      heroBadge: "Outcome visibility early",
      heroTitle: "See your Singapore",
      heroTitleHighlight: "PR & citizenship roadmap",
      heroDescription:
        "{{companyName}} front-loads clarity—eligibility signals, gaps, and sequencing—so you commit effort with eyes open.",
      heroCtaPrimary: "PR gap analysis",
      heroCtaSecondary: "Citizenship route",
      servicesBadge: "How we work",
      servicesTitle: "Bold preparation, cautious promises",
      servicesSubtitle:
        "We stress-test narratives and evidence the way reviewers read them, then coach you through each submission milestone.",
      assessmentsHeading: "Quick eligibility lenses",
      assessmentsSubtitle: "Two entry points to understand fit: Permanent Residence and Citizenship.",
      aboutChip: "Inside Horizon",
      aboutTitle: "We prefer early awkward truths to late surprises",
      aboutStory1:
        "{{companyName}} is built around forward visibility: fewer surprises, tighter files, faster decisions on what to fix next.",
      aboutStory2:
        "If a pathway is weak, we say so—and refocus energy where it actually moves the needle.",
      whyBadge: "The Lion City case",
      whyTitle: "A forward-looking place to put roots",
      whySubtitle:
        "Economic depth, safety, and schools keep Singapore on short lists for ambitious families.",
      contactBadge: "Talk to Horizon",
      contactTitle: "Bring your timeline—we’ll mirror it to policy",
      contactSubtitle: "We reply with concrete questions and a suggested sequence, not generic FAQs.",
    },
    zh: {
      heroBadge: "前置能见度",
      heroTitle: "看清您的新加坡",
      heroTitleHighlight: "永居与公民路线图",
      heroDescription:
        "{{companyName}}把资格信号、差距与顺序前置，让您在投入前心中有数。",
      heroCtaPrimary: "PR 差距分析",
      heroCtaSecondary: "公民路径",
      servicesBadge: "工作方式",
      servicesTitle: "敢准备、不轻易许诺",
      servicesSubtitle: "按审阅者视角压力测试叙事与证据，并在每个递交节点陪跑。",
      assessmentsHeading: "快速资格透镜",
      assessmentsSubtitle: "两个入口：永久居民与公民，先看契合度。",
      aboutChip: "Horizon 内核",
      aboutTitle: "宁可早尴尬，不要晚惊吓",
      aboutStory1: "{{companyName}}强调前置能见度：更少意外、更紧致的档案、更快的纠错决策。",
      aboutStory2: "若路径薄弱会直接说明，并把精力转到真正能加分之处。",
      whyBadge: "狮城理由",
      whyTitle: "值得扎根的前瞻型城市",
      whySubtitle: "经济厚度、安全与教育让新加坡留在进取型家庭的候选前列。",
      contactBadge: "联系 Horizon",
      contactTitle: "带上您的时间线——我们对照政策拆解",
      contactSubtitle: "以具体问题与推进顺序回应，而非泛泛 FAQ。",
    },
  },
  "lion-city": {
    en: {
      heroBadge: "Rooted in Lion City",
      heroTitle: "Your neighbourhood guide to",
      heroTitleHighlight: "PR & citizenship calm",
      heroDescription:
        "{{companyName}} speaks plainly for locals-at-heart: paperwork, storytelling, and patience—without losing the human side of moving countries.",
      heroCtaPrimary: "Check PR fit",
      heroCtaSecondary: "Explore citizenship",
      servicesBadge: "On offer",
      servicesTitle: "Story-led filings for people who call Singapore home",
      servicesSubtitle:
        "From profile polish to ministerial-touch guidance, we keep the voice of your application consistent and believable.",
      assessmentsHeading: "Start with a honest snapshot",
      assessmentsSubtitle: "PR and Citizenship assessments framed around real households, not ideal profiles.",
      aboutChip: "Our tale",
      aboutTitle: "We respect how personal this journey feels",
      aboutStory1:
        "{{companyName}} treats every file like a life chapter—tone, evidence, and community links matter as much as forms.",
      aboutStory2:
        "You’ll hear direct counsel on what helps, what hurts, and what is simply noise.",
      whyBadge: "Love letter to SG",
      whyTitle: "A city-state that rewards contribution",
      whySubtitle:
        "Multicultural rhythm, strong institutions, and a bias toward earnest applicants who stay the course.",
      contactBadge: "Say hello",
      contactTitle: "We’re a message away",
      contactSubtitle: "Tell us your chapter—schools, career, family—and we’ll sketch the credible arc.",
    },
    zh: {
      heroBadge: "扎根狮城",
      heroTitle: "您身边可信赖的",
      heroTitleHighlight: "永居与公民陪伴",
      heroDescription:
        "{{companyName}}用直白语言协助把新加坡当家的群体：材料、叙事与耐心，而不失人情味。",
      heroCtaPrimary: "评估 PR 适配",
      heroCtaSecondary: "了解公民申请",
      servicesBadge: "所提供服务",
      servicesTitle: "为视新加坡为家的人做故事一致的递交",
      servicesSubtitle: "从履历打磨到推荐信思路，让申请口吻前后可信。",
      assessmentsHeading: "先做诚实快照",
      assessmentsSubtitle: "围绕真实家庭而非理想人设，搭建 PR 与公民两条入口。",
      aboutChip: "我们的故事",
      aboutTitle: "我们理解这段路有多私人",
      aboutStory1: "{{companyName}}把每份档案当作人生章节——语气、佐证与社区联结与表格同等重要。",
      aboutStory2: "您会听到直白判断：什么加分、什么减分、什么只是噪音。",
      whyBadge: "写给新加坡",
      whyTitle: "奖励持续贡献的地方",
      whySubtitle: "多元节奏、稳健制度，以及更看好踏实走到最后的申请人。",
      contactBadge: "打个招呼",
      contactTitle: "一条消息即可开始",
      contactSubtitle: "讲讲您的篇章——学业、事业与家人，我们勾勒可信叙事弧线。",
    },
  },
  "one-axis": {
    en: {
      heroBadge: "Mobility on one axis",
      heroTitle: "Align career moves with",
      heroTitleHighlight: "Singapore residency",
      heroDescription:
        "{{companyName}} helps employers and individuals sync relocations, incentives, and long-stay goals with PR and citizenship timing.",
      heroCtaPrimary: "PR timing review",
      heroCtaSecondary: "Citizenship alignment",
      servicesBadge: "Mobility stack",
      servicesTitle: "HR timelines meet immigration reality",
      servicesSubtitle:
        "We translate packages, postings, and family plans into a coherent Singapore application narrative.",
      assessmentsHeading: "Two rails: PR & Citizenship",
      assessmentsSubtitle: "Pick the assessment that matches your current move; we map friction early.",
      aboutChip: "OneAxis view",
      aboutTitle: "One spine for your global mobility puzzle",
      aboutStory1:
        "{{companyName}} focuses on the axis everyone forgets—when to file, what to strengthen first, and how proof should read.",
      aboutStory2:
        "Less slide-deck talk, more calendar discipline and document truthfulness.",
      whyBadge: "Why anchor here",
      whyTitle: "Singapore as the steady point",
      whySubtitle:
        "When everything else rotates—markets, offices, schools—many clients want one predictable base.",
      contactBadge: "Coordinate with us",
      contactTitle: "Share posting letters & milestones",
      contactSubtitle: "We fold mobility artefacts into a filing story that matches ICA’s lens.",
    },
    zh: {
      heroBadge: "单一主轴上的移动",
      heroTitle: "让职业变动与",
      heroTitleHighlight: "新加坡居留同频",
      heroDescription:
        "{{companyName}}协助企业与个人把派驻、激励与长期居留目标对齐永居与公民节奏。",
      heroCtaPrimary: "PR 时机复盘",
      heroCtaSecondary: "公民节奏对齐",
      servicesBadge: "移动栈",
      servicesTitle: "让人事与移民实务对上表",
      servicesSubtitle: "把薪酬、外派与家庭安排译成连贯的新加坡申请叙事。",
      assessmentsHeading: "双轨：永居与公民",
      assessmentsSubtitle: "按当前行程选择评估，我们会在前期标出阻力。",
      aboutChip: "OneAxis 视角",
      aboutTitle: "全球流动拼图的脊柱",
      aboutStory1: "{{companyName}}聚焦常被忽略的轴心——何时递交、先补强什么、佐证如何呈现。",
      aboutStory2: "少些路演话术，多些日历纪律与材料真实。",
      whyBadge: "为何在此锚定",
      whyTitle: "新加坡作稳定支点",
      whySubtitle: "当市场、办公室与学校都在轮动时，许多人需要一处可预期的基地。",
      contactBadge: "协同我们",
      contactTitle: "请提供派驻函与关键节点",
      contactSubtitle: "我们把移动证据编织成与当局视角一致的档案故事。",
    },
  },
  "pr-bridge": {
    en: {
      heroBadge: "Facts first",
      heroTitle: "Permanent residence guidance with",
      heroTitleHighlight: "zero fluff",
      heroDescription:
        "{{companyName}} delivers checklist-driven support: what to file, when, and why—aligned to published criteria and practical norms.",
      heroCtaPrimary: "PR checklist intake",
      heroCtaSecondary: "Citizenship criteria check",
      servicesBadge: "Deliverables",
      servicesTitle: "Document-led assistance across the full stack",
      servicesSubtitle:
        "Engagements are scoped by milestone—assessment, compilation, submission, follow-up—with transparent hand-offs.",
      assessmentsHeading: "Criteria-based screens",
      assessmentsSubtitle: "Answer structured prompts; receive a concise read on PR or Citizenship fit.",
      aboutChip: "Firm brief",
      aboutTitle: "Small team, high signal-to-noise",
      aboutStory1:
        "{{companyName}} exists for applicants who want explicit instructions and traceable references, not motivational seminars.",
      aboutStory2:
        "We keep language neutral, citations current, and expectations conservative.",
      whyBadge: "Singapore snapshot",
      whyTitle: "Why applicants still optimize for SG",
      whySubtitle:
        "Transparent rules, efficient bureaucracy relative to peers, and leverage across ASEAN.",
      contactBadge: "Secure channel",
      contactTitle: "Submit facts, receive next steps",
      contactSubtitle: "Attach your ICA stage and employment basics—we answer in bullet points where possible.",
    },
    zh: {
      heroBadge: "事实优先",
      heroTitle: "永居指导，",
      heroTitleHighlight: "只讲可执行与依据",
      heroDescription:
        "{{companyName}}提供清单式支持：递交什么、何时、为何——对齐公开标准与实务惯例。",
      heroCtaPrimary: "PR 清单入口",
      heroCtaSecondary: "公民标准核对",
      servicesBadge: "交付项",
      servicesTitle: "全流程以文件与节点驱动",
      servicesSubtitle: "按阶段界定：评估、整理、递交、跟进，交接透明。",
      assessmentsHeading: "基于标准的筛查",
      assessmentsSubtitle: "按结构化问题作答，获得关于 PR 或公民适配的简要结论。",
      aboutChip: "事务所简介",
      aboutTitle: "小团队、高信噪比",
      aboutStory1: "{{companyName}}服务需要明确指令与可追溯依据的申请人，而非励志讲座。",
      aboutStory2: "措辞克制、引用更新、预期保守。",
      whyBadge: "新加坡简况",
      whyTitle: "为何申请人仍优先优化新加坡路径",
      whySubtitle: "规则透明、相对高效的行政体验，及在东盟内的支点价值。",
      contactBadge: "安全沟通",
      contactTitle: "提交事实，拿回下一步",
      contactSubtitle: "说明 ICA 阶段与就业要点——我们尽量以要点回复。",
    },
  },
  "prime-residency": {
    en: {
      heroBadge: "Elevated advisory",
      heroTitle: "Prime pathways to",
      heroTitleHighlight: "Singapore PR & citizenship",
      heroDescription:
        "{{companyName}} blends concierge responsiveness with senior judgement—ideal when your profile is complex or high-stakes.",
      heroCtaPrimary: "Priority PR review",
      heroCtaSecondary: "Citizenship concierge",
      servicesBadge: "Signature support",
      servicesTitle: "High-touch help without losing rigour",
      servicesSubtitle:
        "White-glove scheduling, curated enhancement ideas, and disciplined narrative control through submission.",
      assessmentsHeading: "Tailored assessments",
      assessmentsSubtitle: "PR and Citizenship deep-dives with bespoke follow-up notes—not boilerplate PDFs.",
      aboutChip: "Prime promise",
      aboutTitle: "Complex lives deserve senior attention",
      aboutStory1:
        "{{companyName}} pairs warm service with sharp analysis—because residency decisions are rarely one-dimensional.",
      aboutStory2:
        "Expect proactive nudges, curated reading of policy nuance, and calm handling of surprises.",
      whyBadge: "Singapore allure",
      whyTitle: "Still the premium hub for Asia ambitions",
      whySubtitle:
        "Infrastructure, schools, and capital depth keep Singapore in the top tier for founders and families alike.",
      contactBadge: "Concierge desk",
      contactTitle: "Let us orchestrate your next step",
      contactSubtitle: "Share priorities—we craft a pacing plan that respects your bandwidth.",
    },
    zh: {
      heroBadge: "升级顾问体验",
      heroTitle: "定制节奏，迈向",
      heroTitleHighlight: "新加坡 PR 与公民",
      heroDescription:
        "{{companyName}}兼顾礼宾式响应与资深判断——适合背景复杂或风险敞口较高的客户。",
      heroCtaPrimary: "优先 PR 复盘",
      heroCtaSecondary: "公民礼宾",
      servicesBadge: "特色支持",
      servicesTitle: "高接触而不失严谨",
      servicesSubtitle: "约访省心、补强建议精选、递交阶段叙事把控。",
      assessmentsHeading: "定制评估",
      assessmentsSubtitle: "PR 与公民深度解读，附针对性备忘——而非模板化 PDF。",
      aboutChip: "Prime 承诺",
      aboutTitle: "复杂人生配得上资深关注",
      aboutStory1: "{{companyName}}把温度与锋利分析结合——居留决策很少是单维的。",
      aboutStory2: "主动提醒、细读政策分寸、遇事沉稳处理。",
      whyBadge: "新加坡魅力",
      whyTitle: "亚洲雄心的优质枢纽",
      whySubtitle: "基建、教育与资本厚度让新加坡仍居创始人与家庭清单前列。",
      contactBadge: "礼宾台",
      contactTitle: "让我们编排您的下一步",
      contactSubtitle: "告知优先事项——我们将制定尊重您精力的节奏方案。",
    },
  },
}
