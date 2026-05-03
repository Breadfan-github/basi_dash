/**
 * One chart type per theme (`VITE_SITE_THEME`). No two themes share the same variant.
 * @typedef {'spectrum' | 'segments' | 'fillRail' | 'donut' | 'stepDots' | 'thermometer' | 'dotScale' | 'pillRow'} ScoreChartVariant
 */

/**
 * @typedef {{
 *   root: string
 *   title: string
 *   score: string
 *   badge: string
 *   legendGrid: string
 *   legendCard: string
 *   legendRange: string
 * }} ScorePanelStyle
 */

/** @type {ScorePanelStyle} */
const PANEL_AVERRA = {
  root: "w-full max-w-2xl mx-auto rounded-2xl border-2 border-brand-navy-200/70 bg-gradient-to-br from-white via-brand-silver-50/90 to-brand-royal-50/45 px-5 py-8 shadow-xl shadow-brand-navy-900/5",
  title:
    "mb-6 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-brand-navy-700 sm:text-xs",
  score: "mb-2 text-center text-6xl font-bold tabular-nums tracking-tight text-brand-navy-900",
  badge: "inline-block rounded-full px-5 py-2 text-lg font-semibold shadow-md",
  legendGrid: "mt-10 grid grid-cols-2 gap-3 md:grid-cols-3",
  legendCard: "flex items-start gap-3 rounded-xl border p-3 transition-all duration-200",
  legendRange: "text-xs text-brand-carbon-600",
}

/** @type {ScorePanelStyle} */
const PANEL_ALPHA = {
  root: "w-full max-w-2xl mx-auto border-y-4 border-brand-navy-700 bg-slate-50 px-4 py-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.7)]",
  title:
    "mx-auto mb-6 inline-block border-b-2 border-brand-navy-700 pb-2 text-center text-sm font-bold uppercase tracking-wider text-slate-900",
  score: "mb-2 text-center text-6xl font-black tabular-nums text-slate-900",
  badge: "inline-block rounded-none px-6 py-2 text-lg font-bold uppercase tracking-wide shadow-md",
  legendGrid: "mt-10 grid grid-cols-2 gap-2 md:grid-cols-3",
  legendCard: "flex items-start gap-3 rounded-none border-2 border-slate-300 bg-white p-3 transition-all duration-200",
  legendRange: "text-xs text-slate-600",
}

/** @type {ScorePanelStyle} */
const PANEL_GLOBAL = {
  root: "w-full max-w-2xl mx-auto rounded-lg border border-sky-900/15 bg-gradient-to-b from-sky-50/95 via-white to-white px-5 py-8 shadow-md ring-1 ring-sky-900/5",
  title: "mb-6 text-center text-lg font-semibold tracking-tight text-sky-950",
  score: "mb-2 text-center text-6xl font-bold tabular-nums text-sky-950",
  badge: "inline-block rounded-md px-5 py-2 text-base font-semibold shadow-sm",
  legendGrid: "mt-10 grid grid-cols-2 gap-3 md:grid-cols-3",
  legendCard: "flex items-start gap-3 rounded-lg border border-sky-100 bg-white/80 p-3 transition-all duration-200",
  legendRange: "text-xs text-sky-900/70",
}

/** @type {ScorePanelStyle} */
const PANEL_HORIZON = {
  root: "w-full max-w-2xl mx-auto rounded-2xl border-2 border-red-500/25 bg-gradient-to-br from-white via-slate-50 to-slate-100/80 px-5 py-8 shadow-lg ring-1 ring-slate-900/5",
  title: "mb-6 text-center text-xl font-extrabold tracking-tight text-slate-900",
  score:
    "mb-2 bg-gradient-to-r from-red-600 via-orange-500 to-violet-700 bg-clip-text text-center text-7xl font-black tabular-nums text-transparent",
  badge: "inline-block rounded-2xl px-6 py-2.5 text-lg font-bold shadow-md",
  legendGrid: "mt-10 grid grid-cols-2 gap-3 md:grid-cols-3",
  legendCard: "flex items-start gap-3 rounded-2xl border-2 border-slate-200/80 bg-white/90 p-3 transition-all duration-200",
  legendRange: "text-xs text-slate-600",
}

/** @type {ScorePanelStyle} */
const PANEL_LION = {
  root: "w-full max-w-2xl mx-auto rounded-3xl border border-rose-900/12 bg-gradient-to-br from-rose-50/50 via-white to-stone-50 px-6 py-10 shadow-lg",
  title: "mb-7 text-center font-serif text-base font-medium tracking-wide text-rose-950 sm:text-lg",
  score: "mb-2 text-center text-6xl font-light tabular-nums text-rose-950",
  badge: "inline-block rounded-full px-6 py-2 text-base font-medium shadow-sm",
  legendGrid: "mt-10 grid grid-cols-2 gap-3 md:grid-cols-3",
  legendCard: "flex items-start gap-3 rounded-2xl border border-rose-100/80 bg-white/70 p-3.5 transition-all duration-200",
  legendRange: "text-xs text-stone-600",
}

/** @type {ScorePanelStyle} */
const PANEL_ONE_AXIS = {
  root: "w-full max-w-2xl mx-auto rounded-3xl border-2 border-orange-200/90 bg-gradient-to-br from-amber-50/90 via-white to-orange-50/70 px-5 py-9 shadow-lg",
  title: "mb-6 text-center text-lg font-bold text-orange-950",
  score: "mb-2 text-center text-6xl font-bold tabular-nums text-orange-950",
  badge: "inline-block rounded-2xl px-5 py-2 text-lg font-semibold shadow-md",
  legendGrid: "mt-10 grid grid-cols-2 gap-3 md:grid-cols-3",
  legendCard: "flex items-start gap-3 rounded-2xl border-2 border-orange-100 bg-white/85 p-3 transition-all duration-200",
  legendRange: "text-xs text-orange-950/70",
}

/** @type {ScorePanelStyle} */
const PANEL_PR = {
  root: "w-full max-w-2xl mx-auto rounded-md border border-slate-300 bg-slate-50 px-4 py-8 shadow-sm",
  title: "mb-6 text-center text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-600 sm:text-xs",
  score: "mb-2 text-center text-5xl font-mono font-semibold tabular-nums text-slate-900",
  badge: "inline-block rounded-md px-4 py-1.5 text-base font-semibold",
  legendGrid: "mt-10 grid grid-cols-2 gap-2 md:grid-cols-3",
  legendCard: "flex items-start gap-3 rounded-md border border-slate-200 bg-white p-3 transition-all duration-200",
  legendRange: "text-xs text-slate-600",
}

/** @type {ScorePanelStyle} */
const PANEL_PRIME = {
  root: "w-full max-w-2xl mx-auto rounded-[2rem] border border-orange-100/90 bg-gradient-to-br from-orange-50/60 via-white to-teal-50/35 px-6 py-10 shadow-xl shadow-orange-100/40",
  title: "mb-6 text-center text-lg font-semibold text-stone-800",
  score: "mb-2 text-center text-6xl font-semibold tabular-nums text-stone-900",
  badge: "inline-block rounded-full px-6 py-2.5 text-base font-medium shadow-sm",
  legendGrid: "mt-10 grid grid-cols-2 gap-3 md:grid-cols-3",
  legendCard: "flex items-start gap-3 rounded-2xl border border-orange-50 bg-white/90 p-3.5 transition-all duration-200",
  legendRange: "text-xs text-stone-600",
}

/** @type {Record<string, readonly [string,string,string,string,string,string]>} */
const ZONE_COLORS = {
  averra: ["#b45309", "#c2410c", "#ca8a04", "#0f766e", "#0d9488", "#155e75"],
  "alpha-bridge": ["#7f1d1d", "#9a3412", "#a16207", "#3d6b8c", "#1e4a7a", "#1e3a5f"],
  "global-residency": ["#7c2d12", "#b45309", "#0369a1", "#0c4a6e", "#0e7490", "#164e63"],
  horizon: ["#991b1b", "#c2410c", "#d97706", "#7c3aed", "#5b21b6", "#4c1d95"],
  "lion-city": ["#7f1d1d", "#9f1239", "#a16207", "#9d174d", "#86198f", "#701a75"],
  "one-axis": ["#9a3412", "#c2410c", "#d97706", "#b45309", "#15803d", "#166534"],
  "pr-bridge": ["#475569", "#64748b", "#0f766e", "#0d9488", "#0e7490", "#155e75"],
  "prime-residency": ["#c2410c", "#ea580c", "#f97316", "#fb923c", "#14b8a6", "#0d9488"],
}

/**
 * Unique section layout per theme (order, columns, legend pattern).
 * @typedef {'classic' | 'sidebar' | 'chartBand' | 'mediaSplit' | 'editorial' | 'axisSplit' | 'listStack' | 'centerSoft'} ScoreSectionLayoutId
 */

/**
 * Six bands = seven strictly increasing edges: [min, endBand1, …, endBand5, max].
 * Numbers do **not** need to land on “hundreds” (300, 400, …). Any ascending values work,
 * e.g. [12, 27, 41, 58, 73, 89, 100], [305, 412, 603, 688, 712, 799, 850], or FICO-style [300,…,850].
 * For decimals, set `scoreNumberFormat.maximumFractionDigits` on that theme’s preset.
 * Charts use raw numbers; labels use `formatScoreValue`.
 * @typedef {readonly [number, number, number, number, number, number, number]} ScoreBounds
 */

/** Default band edges (FICO-style); used when a theme omits `scoreBounds`. */
export const DEFAULT_SCORE_BOUNDS = /** @type {const} */ ([300, 528, 650, 696, 717, 743, 850])

/**
 * Display rules for band edges and headline (Intl `toLocaleString`).
 * Set `useGrouping: false` for tiny integer scales if you want no separators.
 * @typedef {{
 *   locale?: string
 *   useGrouping?: boolean
 *   minimumFractionDigits?: number
 *   maximumFractionDigits?: number
 * }} ScoreNumberFormat
 */

/** @type {ScoreNumberFormat} */
const DEFAULT_SCORE_NUMBER_FORMAT = {
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
  useGrouping: true,
}

/**
 * @param {number} n
 * @param {ScoreNumberFormat | undefined} fmt
 */
export function formatScoreValue(n, fmt) {
  const f = { ...DEFAULT_SCORE_NUMBER_FORMAT, ...fmt }
  return Number(n).toLocaleString(f.locale, {
    maximumFractionDigits: f.maximumFractionDigits,
    minimumFractionDigits: f.minimumFractionDigits,
    useGrouping: f.useGrouping !== false,
  })
}

/**
 * @param {number} lo
 * @param {number} hi
 * @param {ScoreNumberFormat | undefined} fmt
 */
export function formatScoreRange(lo, hi, fmt) {
  return `${formatScoreValue(lo, fmt)} - ${formatScoreValue(hi, fmt)}`
}

/** @type {Record<string, ScoreBounds>} */
// Seven edges = six bands. Cuts can be “odd” values (527, 641, …); no requirement to use 100, 200, 300, …
// Keep min/max aligned with what `total_score` returns unless the API scale changes too.
const SCORE_BOUNDS_BY_THEME = {
  // Canonical FICO-style cuts
  averra: [300, 528, 650, 696, 717, 743, 850],
  // Slightly stricter low / mid bands
  "alpha-bridge": [300, 520, 640, 690, 715, 740, 850],
  // Slightly higher bar for “fair” and above
  "global-residency": [300, 530, 655, 700, 720, 745, 850],
  // Bold: wider poor / low, tighter top tiers
  horizon: [300, 540, 660, 700, 725, 750, 850],
  // Softer lower bands, same ceiling
  "lion-city": [300, 525, 645, 694, 716, 742, 850],
  // Warm / mobility: mid cuts nudged
  "one-axis": [300, 530, 652, 698, 718, 744, 850],
  // Clinical: more even middle steps
  "pr-bridge": [300, 520, 635, 680, 710, 755, 850],
  // Premium residency: stricter entry to top two tiers
  "prime-residency": [300, 535, 655, 702, 722, 748, 850],
}

/**
 * @typedef {{
 *   variant: ScoreChartVariant
 *   layoutId: ScoreSectionLayoutId
 *   zoneColors: readonly [string,string,string,string,string,string]
 *   scoreBounds: ScoreBounds
 *   scoreNumberFormat?: ScoreNumberFormat
 *   segmentsRounded?: 'none' | 'lg'
 *   donut?: { outerR: number, innerR: number, strokeWidth: number }
 *   panel: ScorePanelStyle
 * }} ScoreChartPreset
 */

/** @type {Record<string, ScoreChartPreset>} */
export const SCORE_CHART_BY_THEME = {
  averra: {
    variant: "spectrum",
    layoutId: "classic",
    zoneColors: ZONE_COLORS.averra,
    scoreBounds: SCORE_BOUNDS_BY_THEME.averra,
    panel: PANEL_AVERRA,
  },
  "alpha-bridge": {
    variant: "segments",
    layoutId: "sidebar",
    zoneColors: ZONE_COLORS["alpha-bridge"],
    scoreBounds: SCORE_BOUNDS_BY_THEME["alpha-bridge"],
    segmentsRounded: "none",
    panel: PANEL_ALPHA,
  },
  "global-residency": {
    variant: "fillRail",
    layoutId: "chartBand",
    zoneColors: ZONE_COLORS["global-residency"],
    scoreBounds: SCORE_BOUNDS_BY_THEME["global-residency"],
    panel: PANEL_GLOBAL,
  },
  horizon: {
    variant: "donut",
    layoutId: "mediaSplit",
    zoneColors: ZONE_COLORS.horizon,
    scoreBounds: SCORE_BOUNDS_BY_THEME.horizon,
    donut: { outerR: 102, innerR: 58, strokeWidth: 4 },
    panel: PANEL_HORIZON,
  },
  "lion-city": {
    variant: "stepDots",
    layoutId: "editorial",
    zoneColors: ZONE_COLORS["lion-city"],
    scoreBounds: SCORE_BOUNDS_BY_THEME["lion-city"],
    panel: PANEL_LION,
  },
  "one-axis": {
    variant: "thermometer",
    layoutId: "axisSplit",
    zoneColors: ZONE_COLORS["one-axis"],
    scoreBounds: SCORE_BOUNDS_BY_THEME["one-axis"],
    panel: PANEL_ONE_AXIS,
  },
  "pr-bridge": {
    variant: "dotScale",
    layoutId: "listStack",
    zoneColors: ZONE_COLORS["pr-bridge"],
    scoreBounds: SCORE_BOUNDS_BY_THEME["pr-bridge"],
    panel: PANEL_PR,
  },
  "prime-residency": {
    variant: "pillRow",
    layoutId: "centerSoft",
    zoneColors: ZONE_COLORS["prime-residency"],
    scoreBounds: SCORE_BOUNDS_BY_THEME["prime-residency"],
    panel: PANEL_PRIME,
  },
}

const DEFAULT_PRESET = SCORE_CHART_BY_THEME.averra

/** @param {string} themeId */
export function getScoreChartPreset(themeId) {
  const p = SCORE_CHART_BY_THEME[themeId] ?? DEFAULT_PRESET
  return {
    ...p,
    scoreBounds: p.scoreBounds ?? DEFAULT_SCORE_BOUNDS,
    scoreNumberFormat: { ...DEFAULT_SCORE_NUMBER_FORMAT, ...p.scoreNumberFormat },
  }
}
