import {
  Award,
  BookOpen,
  Briefcase,
  Building2,
  ClipboardList,
  Compass,
  DollarSign,
  FileBadge,
  FileCheck2,
  FileText,
  FolderKanban,
  Gem,
  Globe,
  GraduationCap,
  Handshake,
  Heart,
  Landmark,
  CheckCircle2,
  CheckSquare,
  ChevronRight,
  LayoutGrid,
  Layers,
  LineChart,
  ListTodo,
  MessageSquare,
  Minus,
  Plane,
  Route,
  Scale,
  ScrollText,
  Shield,
  Sparkles,
  Stamp,
  Users,
} from "lucide-react"

/** @typedef {'sm'|'md'|'lg'} ServiceCardSize */
/** @typedef {'stack'|'inline'} CardLayoutMode */
/** @typedef {'check'|'square'|'arrow'|'minus'|'dot'|'chevron'} ListMarkerKind */

/**
 * @typedef {{
 *   order: number[],
 *   sizes: ServiceCardSize[],
 *   layouts?: CardLayoutMode[],
 *   icons: import("lucide-react").LucideIcon[],
 *   gridClass: string | null,
 *   listMarker: ListMarkerKind,
 *   headerChip: 'sparkles' | 'grid' | 'layers' | 'route' | 'heart' | 'list' | 'gem' | 'plane',
 *   headerChipClass: string,
 *   showCornerDecor: boolean,
 *   cardShellClass: string,
 *   learnMoreClass: string,
 *   titleAlignClass: string,
 *   featureListClass: string,
 * }} ServicesPresentation
 */

const I = {
  pr: 0,
  citizenship: 1,
  consultation: 2,
  documents: 3,
  charity: 4,
  education: 5,
  ministerial: 6,
  administrative: 7,
}

const STACK = /** @type {CardLayoutMode[]} */ (Array(8).fill("stack"))

/** @param {[number, CardLayoutMode][]} pairs */
function buildLayouts(pairs) {
  const out = [...STACK]
  pairs.forEach(([i, m]) => {
    out[i] = m
  })
  return out
}

/** @type {Record<string, ServicesPresentation>} */
export const SERVICES_PRESENTATION = {
  averra: {
    order: [I.pr, I.citizenship, I.consultation, I.documents, I.charity, I.education, I.ministerial, I.administrative],
    sizes: ["md", "md", "md", "md", "md", "md", "md", "md"],
    icons: [FileText, Users, Shield, DollarSign, Heart, GraduationCap, Award, Briefcase],
    gridClass: null,
    listMarker: "check",
    headerChip: "sparkles",
    headerChipClass: "bg-brand-navy-100/50 rounded-full text-brand-navy-700",
    showCornerDecor: true,
    cardShellClass: "",
    learnMoreClass: "text-base font-semibold text-brand-navy-700 group-hover:text-brand-royal-600",
    titleAlignClass: "",
    featureListClass: "space-y-3",
  },
  "alpha-bridge": {
    order: [I.consultation, I.pr, I.citizenship, I.documents, I.ministerial, I.administrative, I.charity, I.education],
    sizes: ["lg", "sm", "sm", "md", "sm", "sm", "md", "md"],
    layouts: buildLayouts([
      [0, "inline"],
      [1, "stack"],
      [2, "stack"],
      [3, "stack"],
      [4, "stack"],
      [5, "stack"],
      [6, "stack"],
      [7, "stack"],
    ]),
    icons: [Scale, ClipboardList, Building2, FileCheck2, Stamp, FolderKanban, Heart, BookOpen],
    gridClass: "grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8",
    listMarker: "minus",
    headerChip: "grid",
    headerChipClass: "rounded-none border-2 border-slate-700 bg-slate-100 text-slate-900",
    showCornerDecor: true,
    cardShellClass: "rounded-none border-l-4 border-slate-700 border-y border-r border-slate-300",
    learnMoreClass: "text-sm font-bold uppercase tracking-wide text-slate-800 group-hover:text-brand-navy-700 underline-offset-4 hover:underline",
    titleAlignClass: "",
    featureListClass: "space-y-2.5",
  },
  "global-residency": {
    order: [I.pr, I.documents, I.citizenship, I.consultation, I.education, I.charity, I.ministerial, I.administrative],
    sizes: ["lg", "md", "md", "md", "sm", "sm", "md", "md"],
    layouts: buildLayouts([
      [0, "inline"],
      [1, "inline"],
      [2, "stack"],
      [3, "stack"],
      [4, "stack"],
      [5, "stack"],
      [6, "stack"],
      [7, "stack"],
    ]),
    icons: [Plane, Globe, LineChart, Compass, GraduationCap, Heart, Landmark, Handshake],
    gridClass: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8",
    listMarker: "arrow",
    headerChip: "route",
    headerChipClass: "rounded-2xl bg-sky-100/90 text-sky-900 border border-sky-200 shadow-sm",
    showCornerDecor: false,
    cardShellClass: "rounded-2xl border border-sky-100 shadow-md",
    learnMoreClass: "text-sm font-semibold text-sky-800 group-hover:text-brand-navy-700 inline-flex items-center gap-1",
    titleAlignClass: "",
    featureListClass: "space-y-2.5",
  },
  horizon: {
    order: [I.administrative, I.ministerial, I.education, I.charity, I.documents, I.consultation, I.citizenship, I.pr],
    sizes: ["sm", "lg", "sm", "lg", "sm", "lg", "sm", "lg"],
    layouts: buildLayouts([
      [0, "stack"],
      [1, "inline"],
      [2, "stack"],
      [3, "inline"],
      [4, "stack"],
      [5, "inline"],
      [6, "stack"],
      [7, "inline"],
    ]),
    icons: [FolderKanban, FileBadge, BookOpen, Heart, ScrollText, MessageSquare, Users, FileText],
    gridClass: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5",
    listMarker: "dot",
    headerChip: "layers",
    headerChipClass: "rounded-full bg-rose-100 text-rose-900 border border-rose-200/80",
    showCornerDecor: true,
    cardShellClass: "rounded-2xl ring-1 ring-rose-100/80 shadow-lg",
    learnMoreClass: "text-base font-bold text-rose-700 group-hover:text-brand-navy-800",
    titleAlignClass: "",
    featureListClass: "space-y-3",
  },
  "lion-city": {
    order: [I.citizenship, I.charity, I.pr, I.consultation, I.documents, I.education, I.ministerial, I.administrative],
    sizes: ["lg", "md", "md", "sm", "sm", "md", "sm", "sm"],
    icons: [Users, Heart, FileText, MessageSquare, ScrollText, GraduationCap, Award, Briefcase],
    gridClass: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8",
    listMarker: "chevron",
    headerChip: "heart",
    headerChipClass: "rounded-full bg-gradient-to-r from-fuchsia-100 to-rose-100 text-rose-900 border border-rose-200",
    showCornerDecor: true,
    cardShellClass: "rounded-[1.75rem] border-2 border-rose-100/70 shadow-[0_12px_40px_-12px_rgba(225,29,72,0.2)]",
    learnMoreClass: "text-base font-semibold text-rose-800 group-hover:text-brand-navy-700",
    titleAlignClass: "",
    featureListClass: "space-y-3",
  },
  "one-axis": {
    order: [I.documents, I.administrative, I.pr, I.citizenship, I.consultation, I.education, I.ministerial, I.charity],
    sizes: ["sm", "sm", "lg", "lg", "md", "md", "sm", "sm"],
    layouts: buildLayouts([
      [0, "stack"],
      [1, "stack"],
      [2, "inline"],
      [3, "inline"],
      [4, "inline"],
      [5, "stack"],
      [6, "stack"],
      [7, "stack"],
    ]),
    icons: [FolderKanban, Briefcase, Plane, Users, Handshake, GraduationCap, Stamp, Heart],
    gridClass: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6",
    listMarker: "square",
    headerChip: "plane",
    headerChipClass: "rounded-full bg-amber-100 text-amber-950 border border-amber-300/70",
    showCornerDecor: false,
    cardShellClass: "rounded-2xl border-2 border-amber-200/60 bg-gradient-to-b from-white to-amber-50/40",
    learnMoreClass: "text-sm font-bold text-amber-900 group-hover:text-orange-700",
    titleAlignClass: "",
    featureListClass: "space-y-2",
  },
  "pr-bridge": {
    order: [I.pr, I.citizenship, I.consultation, I.documents, I.ministerial, I.administrative, I.education, I.charity],
    sizes: ["sm", "sm", "sm", "sm", "sm", "sm", "sm", "sm"],
    icons: [FileCheck2, ClipboardList, Shield, FileBadge, Stamp, FolderKanban, GraduationCap, Heart],
    gridClass: "grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4",
    listMarker: "minus",
    headerChip: "list",
    headerChipClass: "rounded-md border border-slate-400 bg-white text-slate-900 font-medium tracking-tight",
    showCornerDecor: false,
    cardShellClass: "rounded-md border border-slate-300 bg-white shadow-sm",
    learnMoreClass: "text-xs font-semibold uppercase tracking-wider text-slate-700 group-hover:text-brand-navy-800",
    titleAlignClass: "",
    featureListClass: "space-y-2",
  },
  "prime-residency": {
    order: [I.pr, I.citizenship, I.consultation, I.documents, I.ministerial, I.education, I.charity, I.administrative],
    sizes: ["lg", "lg", "md", "md", "md", "sm", "sm", "sm"],
    layouts: buildLayouts([
      [0, "inline"],
      [1, "inline"],
      [2, "stack"],
      [3, "stack"],
      [4, "stack"],
      [5, "stack"],
      [6, "stack"],
      [7, "stack"],
    ]),
    icons: [Award, Users, MessageSquare, DollarSign, Landmark, BookOpen, Heart, Briefcase],
    gridClass: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8",
    listMarker: "check",
    headerChip: "gem",
    headerChipClass: "rounded-2xl bg-gradient-to-r from-amber-100 to-orange-100 text-orange-950 border border-orange-200/80",
    showCornerDecor: true,
    cardShellClass: "rounded-3xl border border-orange-100 ring-1 ring-orange-100/80 shadow-lg",
    learnMoreClass: "text-base font-semibold text-orange-900 group-hover:text-brand-navy-800",
    titleAlignClass: "",
    featureListClass: "space-y-3",
  },
}

/** @type {Record<ServicesPresentation['headerChip'], import("lucide-react").LucideIcon>} */
const HEADER_CHIP_ICONS = {
  sparkles: Sparkles,
  grid: LayoutGrid,
  layers: Layers,
  route: Route,
  heart: Heart,
  list: ListTodo,
  gem: Gem,
  plane: Plane,
}

/**
 * @param {object[]} baseServices
 * @param {string} themeId
 */
export function getPresentedServices(baseServices, themeId) {
  const preset = SERVICES_PRESENTATION[themeId] ?? SERVICES_PRESENTATION.averra
  const { order, sizes, icons, layouts } = preset
  return order.map((baseIdx, displayIdx) => {
    const base = baseServices[baseIdx]
    const icon = icons[displayIdx] ?? base.icon
    const cardSize = sizes[displayIdx] ?? "md"
    const layoutMode = layouts?.[displayIdx] ?? "stack"
    return { ...base, icon, cardSize, layoutMode }
  })
}

export function getServicesPresentation(themeId) {
  return SERVICES_PRESENTATION[themeId] ?? SERVICES_PRESENTATION.averra
}

export function getServicesHeaderChip(themeId) {
  const p = getServicesPresentation(themeId)
  return {
    Icon: HEADER_CHIP_ICONS[p.headerChip],
    chipClass: p.headerChipClass,
  }
}

export function getServicesGridClass(themeId, skinGridClass) {
  const preset = getServicesPresentation(themeId)
  return preset.gridClass ?? skinGridClass
}

/**
 * @param {ServiceCardSize} size
 * @param {number} displayIndex
 * @param {string} themeId
 */
export function getServiceCardSpanClass(size, displayIndex, themeId) {
  if (themeId === "global-residency" && size === "lg" && displayIndex === 0) {
    return "md:col-span-2"
  }
  if (themeId === "one-axis" && displayIndex === 2) {
    return "sm:col-span-2"
  }
  if (themeId === "lion-city" && size === "lg" && displayIndex === 0) {
    return "md:col-span-2"
  }
  if (themeId === "alpha-bridge" && size === "lg" && displayIndex === 0) {
    return "md:col-span-2"
  }
  if (themeId === "horizon" && size === "lg" && (displayIndex === 1 || displayIndex === 5)) {
    return "sm:col-span-2 lg:col-span-2"
  }
  return ""
}

export function getIconShellClass(cardSize) {
  if (cardSize === "sm") return "w-12 h-12 rounded-xl mb-0 shrink-0"
  if (cardSize === "lg") return "w-20 h-20 rounded-2xl mb-0 shrink-0"
  return "w-16 h-16 rounded-2xl mb-0 shrink-0"
}

export function getIconShellClassStack(cardSize) {
  if (cardSize === "sm") return "w-12 h-12 rounded-xl mb-4"
  if (cardSize === "lg") return "w-20 h-20 rounded-2xl mb-6"
  return "w-16 h-16 rounded-2xl mb-6"
}

export function getIconGlyphClass(cardSize) {
  if (cardSize === "sm") return "w-6 h-6"
  if (cardSize === "lg") return "w-10 h-10"
  return "w-8 h-8"
}

export function getServiceTitleClass(cardSize) {
  if (cardSize === "sm") return "text-lg sm:text-xl font-bold text-brand-carbon-900 mb-2 group-hover:text-brand-navy-700 transition-colors"
  if (cardSize === "lg")
    return "text-2xl sm:text-3xl font-bold text-brand-carbon-900 mb-3 group-hover:text-brand-navy-700 transition-colors"
  return "text-xl sm:text-2xl font-bold text-brand-carbon-900 mb-3 group-hover:text-brand-navy-700 transition-colors"
}

/**
 * @param {ListMarkerKind} kind
 * @returns {{ Icon: import("lucide-react").LucideIcon | null, dot: boolean, className: string }}
 */
export function getListMarkerParts(kind) {
  switch (kind) {
    case "square":
      return { Icon: CheckSquare, dot: false, className: "w-4 h-4 text-amber-600 mr-2.5 shrink-0 mt-0.5" }
    case "arrow":
      return { Icon: ChevronRight, dot: false, className: "w-4 h-4 text-sky-600 mr-2 shrink-0 mt-0.5" }
    case "minus":
      return { Icon: Minus, dot: false, className: "w-4 h-4 text-slate-500 mr-2 shrink-0 mt-0.5" }
    case "dot":
      return { Icon: null, dot: true, className: "w-2 h-2 rounded-full bg-rose-400 mr-3 shrink-0 mt-1.5" }
    case "chevron":
      return { Icon: ChevronRight, dot: false, className: "w-4 h-4 text-rose-400 mr-2 shrink-0 mt-0.5" }
    case "check":
    default:
      return { Icon: CheckCircle2, dot: false, className: "w-5 h-5 text-brand-royal-600 mr-3 shrink-0 mt-0.5" }
  }
}
