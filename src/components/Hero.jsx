import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Button } from "./ui/button"
import { ArrowRight, CheckCircle, Sparkles, TrendingUp } from "lucide-react"
import { useSiteTheme } from "../theme/ThemeProvider.jsx"
import { getHomeSkin, HOME_SKINS } from "../theme/homeSkins.js"
import { getHomeCopy } from "../theme/themeHomeCopy.js"

/**
 * One structural hero pattern per theme id: split L/R, stack up/down, centered, or no image.
 * @typedef {'split-text-left'|'split-image-left'|'stack-image-top'|'stack-text-top'|'stack-image-top-editorial'|'center-no-image'|'split-compact-right-image'|'center-image-bottom'} HeroPattern
 */

/** @type {Record<string, HeroPattern>} */
const HERO_PATTERN_BY_THEME = {
  averra: "split-text-left",
  "alpha-bridge": "split-image-left",
  "global-residency": "stack-image-top",
  horizon: "stack-text-top",
  "lion-city": "stack-image-top-editorial",
  "one-axis": "center-no-image",
  "pr-bridge": "split-compact-right-image",
  "prime-residency": "center-image-bottom",
}

/** @param {string} themeId @returns {HeroPattern} */
function getHeroPattern(themeId) {
  return HERO_PATTERN_BY_THEME[themeId] ?? "split-text-left"
}

/** Full-bleed hero art: one distinct treatment per `theme.id` (not shared by layout). */
function HeroThemeBackgroundDecor({ themeId }) {
  const id = Object.prototype.hasOwnProperty.call(HOME_SKINS, themeId) ? themeId : "averra"
  const wrap = "absolute inset-0 overflow-hidden pointer-events-none"
  const averraLayers = (
    <div className={wrap}>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-brand-navy-700/20 to-brand-royal-600/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob opacity-100" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-brand-royal-600/20 to-brand-navy-700/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000 opacity-100" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-brand-royal-500/15 to-brand-navy-600/15 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000 opacity-100" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
    </div>
  )
  switch (id) {
    case "averra":
      return averraLayers
    case "alpha-bridge":
      return (
        <div className={wrap}>
          <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,transparent_47%,rgba(56,84,153,0.09)_47%,rgba(56,84,153,0.09)_48.5%,transparent_48.5%)]" />
          <div className="absolute top-0 right-0 w-[min(52vw,26rem)] h-full bg-gradient-to-l from-slate-500/25 via-slate-400/10 to-transparent" />
          <div className="absolute bottom-0 left-0 w-[44rem] h-[44rem] rounded-full bg-brand-navy-700/12 blur-3xl translate-y-[40%] -translate-x-[20%]" />
        </div>
      )
    case "global-residency":
      return (
        <div className={wrap}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_100%_0%,rgba(14,165,233,0.22),transparent_58%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_0%_100%,rgba(37,99,235,0.14),transparent_55%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,165,233,0.05)_1px,transparent_1px)] bg-[size:40px_100%]" />
        </div>
      )
    case "horizon":
      return (
        <div className={wrap}>
          <div className="absolute -top-24 right-[18%] w-[32rem] h-[32rem] bg-gradient-to-br from-red-400/30 to-orange-400/20 rounded-full blur-3xl animate-blob" />
          <div className="absolute -bottom-28 left-0 w-[38rem] h-[38rem] bg-gradient-to-tr from-amber-400/25 to-rose-500/15 rounded-full blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(251,113,133,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(251,113,133,0.06)_1px,transparent_1px)] bg-[size:34px_34px]" />
        </div>
      )
    case "lion-city":
      return (
        <div className={wrap}>
          <div className="absolute top-[18%] -left-24 w-[30rem] h-[30rem] bg-fuchsia-400/25 rounded-full blur-3xl" />
          <div className="absolute bottom-[12%] -right-20 w-[36rem] h-[36rem] bg-rose-400/22 rounded-full blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-pink-300/20 to-transparent" />
        </div>
      )
    case "one-axis":
      return (
        <div className={wrap}>
          <div className="absolute inset-0 bg-[linear-gradient(148deg,rgba(245,158,11,0.14)_0%,transparent_42%,transparent_58%,rgba(234,88,12,0.1)_100%)]" />
          <div className="absolute -top-16 -right-12 w-80 h-80 bg-amber-400/35 rounded-full blur-2xl" />
          <div className="absolute bottom-8 left-8 w-[22rem] h-[22rem] bg-yellow-300/18 rounded-full blur-3xl" />
        </div>
      )
    case "pr-bridge":
      return (
        <div className={wrap}>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:22px_22px]" />
          <div className="absolute inset-x-0 top-0 h-px bg-slate-400/70" />
          <div className="absolute left-0 top-1/4 bottom-1/4 w-px bg-slate-300/60 hidden sm:block" />
        </div>
      )
    case "prime-residency":
      return (
        <div className={wrap}>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_130%_85%_at_50%_-25%,rgba(234,88,12,0.28),transparent_52%)]" />
          <div className="absolute bottom-0 left-1/2 h-[min(55vh,28rem)] w-[min(140vw,72rem)] -translate-x-1/2 translate-y-1/4 rounded-[100%] bg-gradient-to-t from-orange-300/30 to-transparent" />
          <div className="absolute top-16 right-16 w-[18rem] h-[18rem] bg-amber-500/20 rounded-full blur-3xl" />
        </div>
      )
    default:
      return averraLayers
  }
}

export default function Hero() {
  const { t, i18n } = useTranslation()
  const theme = useSiteTheme()
  const skin = getHomeSkin(theme.id)
  const copy = getHomeCopy(theme.id, i18n.language, theme.displayName)
  const layout = theme.design.heroLayout
  const pattern = getHeroPattern(theme.id)

  const companyName = theme.displayName
  const badgeRounded =
    layout === "soft" ? "rounded-full" : layout === "corporate" ? "rounded-md" : "rounded-full"
  const statCardRounded =
    layout === "soft"
      ? "rounded-3xl"
      : layout === "corporate" || layout === "clinical"
        ? "rounded-lg"
        : "rounded-2xl"
  const primaryBtnRounded =
    layout === "soft" ? "rounded-2xl" : layout === "corporate" ? "rounded-md" : "rounded-xl"
  const imgShellRounded =
    layout === "soft"
      ? "rounded-[2rem]"
      : layout === "corporate" || layout === "clinical"
        ? "rounded-lg"
        : "rounded-3xl"

  const band =
    layout === "band" ? (
      <>
        <div className="absolute top-0 left-0 right-0 h-56 md:h-72 bg-gradient-to-r from-brand-navy-700/40 via-brand-royal-600/25 to-transparent -skew-y-1 origin-top pointer-events-none" />
        <div className="absolute top-20 left-0 w-1/3 h-32 bg-brand-navy-700/10 blur-3xl pointer-events-none" />
      </>
    ) : null

  const headlineSize =
    layout === "bold"
      ? "text-4xl sm:text-6xl md:text-7xl lg:text-8xl"
      : layout === "clinical"
        ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold"
        : "text-4xl sm:text-5xl md:text-6xl lg:text-7xl"

  const showBandOverlay = pattern === "stack-image-top"
  const showInlineStats = pattern !== "center-no-image" && !showBandOverlay
  const statRowClass =
    layout === "corporate"
      ? "grid grid-cols-3 gap-2 sm:gap-4 pt-4"
      : layout === "clinical"
        ? "grid grid-cols-3 gap-2 sm:gap-6 pt-6 border-t border-slate-200/80"
        : pattern === "center-image-bottom"
          ? "grid grid-cols-3 gap-3 pt-4 max-w-xl mx-auto w-full"
          : "grid grid-cols-3 gap-4 pt-4"

  const statCardBase = (extra) =>
    layout === "corporate"
      ? `group bg-white ${statCardRounded} p-4 sm:p-5 shadow-none border-2 border-slate-400 hover:border-brand-navy-700 transition-colors ${extra}`
      : layout === "clinical"
        ? `group bg-transparent ${statCardRounded} p-2 sm:p-3 border-0 shadow-none ${extra}`
        : `group bg-white/70 backdrop-blur-md ${statCardRounded} p-4 sm:p-5 shadow-lg border border-brand-silver-200/50 hover:shadow-xl hover:scale-105 transition-all duration-300 ${extra}`

  const textIsCentered =
    pattern === "center-no-image" ||
    pattern === "center-image-bottom" ||
    pattern === "stack-image-top" ||
    pattern === "stack-image-top-editorial"

  const textIsStackTopLeft = pattern === "stack-text-top"

  const textOuterClass = textIsStackTopLeft
    ? "space-y-8 text-left w-full"
    : textIsCentered
      ? "space-y-8 text-center max-w-3xl mx-auto w-full"
      : "space-y-8 text-center lg:text-left"

  const logoLinkClass = textIsCentered
    ? "mx-auto w-fit"
    : textIsStackTopLeft
      ? "w-fit"
      : "mx-auto lg:mx-0 w-fit"

  const descClass = textIsCentered
    ? "mx-auto"
    : textIsStackTopLeft
      ? "mx-0"
      : "mx-auto lg:mx-0"

  const ctaRowClass = textIsCentered
    ? "justify-center"
    : textIsStackTopLeft
      ? "justify-start"
      : "justify-center lg:justify-start"

  const textBlock = (
    <div className={textOuterClass}>

      <div
        className={`inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-royal-600/10 to-brand-navy-700/10 backdrop-blur-sm border border-brand-navy-200/50 text-brand-navy-700 text-sm font-semibold shadow-sm animate-fade-in ${badgeRounded} ${skin.heroBadgeRowClass}`}
      >
        <Sparkles className="w-4 h-4" />
        <span>{copy?.heroBadge ?? t("hero.badge")}</span>
      </div>

      <div className="space-y-4">
        <h1
          className={`${headlineSize} font-extrabold text-brand-carbon-800 leading-tight ${skin.heroHeadlineClass}`}
        >
          <span className="block">{copy?.heroTitle ?? t("hero.title")}</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-navy-700 via-brand-royal-600 to-brand-royal-500 animate-gradient">
            {copy?.heroTitleHighlight ?? t("hero.titleHighlight")}
          </span>
        </h1>

        <p
          className={`text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl ${descClass}`}
        >
          {copy?.heroDescription ?? t("hero.description", { companyName })}
        </p>
      </div>

      <div className={`flex flex-col sm:flex-row gap-4 ${ctaRowClass}`}>
        <Link to="/pr-assessment" className="group">
          <Button
            size="lg"
            className={`text-base sm:text-lg px-8 py-6 ${primaryBtnRounded} shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-brand-navy-700 to-brand-royal-600 hover:from-brand-navy-800 hover:to-brand-royal-700 text-white border-0`}
          >
            {copy?.heroCtaPrimary ?? t("hero.getStarted")}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
        <Link to="/citizenship-assessment">
          <Button
            size="lg"
            variant="outline"
            className={`text-base sm:text-lg px-8 py-6 ${primaryBtnRounded} border-2 border-brand-carbon-300 hover:bg-brand-silver-100 hover:border-brand-navy-700 transition-all duration-300 shadow-sm hover:shadow-md`}
          >
            {copy?.heroCtaSecondary ?? t("hero.scheduleConsultation")}
          </Button>
        </Link>
      </div>

      {showInlineStats ? (
        <div className={statRowClass}>
          <div className={statCardBase("")}>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-brand-navy-700 shrink-0" />
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-brand-navy-700 to-brand-royal-600 bg-clip-text text-transparent">
                95%
              </div>
            </div>
            <div className="text-xs sm:text-sm text-brand-carbon-600 font-medium">{t("hero.successRate")}</div>
          </div>
          <div className={statCardBase("")}>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-brand-royal-600 shrink-0" />
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-brand-royal-600 to-brand-navy-700 bg-clip-text text-transparent">
                1000+
              </div>
            </div>
            <div className="text-xs sm:text-sm text-brand-carbon-600 font-medium">{t("hero.applications")}</div>
          </div>
          <div className={statCardBase("")}>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-brand-royal-600 shrink-0" />
              <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-brand-royal-600 to-brand-navy-700 bg-clip-text text-transparent">
                15+
              </div>
            </div>
            <div className="text-xs sm:text-sm text-brand-carbon-600 font-medium">{t("hero.years")}</div>
          </div>
        </div>
      ) : pattern === "center-no-image" ? (
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-100/90 text-amber-950 px-4 py-2 text-sm font-semibold border border-amber-300/60 shadow-sm">
            <TrendingUp className="w-4 h-4" /> 95% {t("hero.successRate")}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-100/90 text-orange-950 px-4 py-2 text-sm font-semibold border border-orange-300/60 shadow-sm">
            <CheckCircle className="w-4 h-4" /> 1000+ {t("hero.applications")}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-yellow-100/90 text-yellow-950 px-4 py-2 text-sm font-semibold border border-yellow-300/60 shadow-sm">
            <Sparkles className="w-4 h-4" /> 15+ {t("hero.years")}
          </span>
        </div>
      ) : null}
    </div>
  )

  const imageFrameClass = (() => {
    switch (layout) {
      case "corporate":
        return `relative ${imgShellRounded} overflow-hidden shadow-lg border-4 border-slate-800 ring-0`
      case "clinical":
        return `relative ${imgShellRounded} overflow-hidden shadow-md border border-slate-300 ring-1 ring-slate-200`
      case "bold":
        return `relative ${imgShellRounded} overflow-hidden shadow-[0_28px_64px_-12px_rgba(244,63,94,0.35)] ring-4 ring-white/60 -rotate-1 lg:rotate-0 lg:hover:-rotate-1 transition-transform duration-500`
      case "soft":
        return `relative ${imgShellRounded} overflow-hidden shadow-[0_24px_70px_-12px_rgba(230,83,37,0.22)] ring-4 ring-orange-100/80`
      case "band":
        return `relative ${imgShellRounded} overflow-hidden shadow-2xl ring-4 ring-sky-200/40`
      default:
        return `relative ${imgShellRounded} overflow-hidden shadow-2xl ring-4 ring-white/50`
    }
  })()

  /** Keeps hero photos from dominating the fold (all patterns). */
  const splitImageShell = "w-full max-w-[260px] sm:max-w-[280px] lg:max-w-[300px] xl:max-w-[320px] mx-auto lg:mx-0"
  const stackImageShell = "w-full max-w-lg sm:max-w-xl lg:max-w-xl mx-auto"

  const desktopAspectSplit =
    pattern === "split-compact-right-image"
      ? "aspect-[3/4]"
      : layout === "clinical"
        ? "aspect-square"
        : "aspect-[3/4]"

  const mobileRounded =
    layout === "soft" ? "rounded-2xl" : layout === "corporate" || layout === "clinical" ? "rounded-lg" : "rounded-2xl"

  const imageGradientOverlay =
    layout === "clinical" ? "from-slate-900/25 via-transparent to-transparent" : "from-black/40 via-black/10 to-transparent"

  const showFloating = pattern === "split-text-left"
  const fixedFloatClass = "animate-float hidden xl:block backdrop-blur-sm"

  const heroImageInner = (aspectClass, eager, bandOverlay) => (
    <div
      className={`${aspectClass} bg-gradient-to-br from-brand-navy-700 via-brand-royal-600 to-brand-royal-500 relative`}
    >
      <img
        src={theme.heroImage}
        alt={theme.heroImageAlt}
        className="w-full h-full object-cover"
        loading={eager ? "eager" : undefined}
        onError={(e) => {
          e.target.style.display = "none"
        }}
      />
      <div className={`absolute inset-0 bg-gradient-to-t ${imageGradientOverlay}`} />
      {bandOverlay ? (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-navy-900/90 via-brand-navy-900/50 to-transparent px-4 py-4 sm:py-5">
          <div className="flex justify-between gap-2 text-white text-xs sm:text-sm font-semibold max-w-md ml-auto">
            <span className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold text-sky-200">95%</span>
              {t("hero.successRate")}
            </span>
            <span className="flex flex-col text-right">
              <span className="text-lg sm:text-xl font-bold text-sky-200">1000+</span>
              {t("hero.applications")}
            </span>
            <span className="flex flex-col text-right">
              <span className="text-lg sm:text-xl font-bold text-sky-200">15+</span>
              {t("hero.years")}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  )

  const splitFloatLayer = showFloating ? (
    <>
      <div
        className={`absolute -bottom-8 -left-8 bg-white ${statCardRounded} shadow-2xl p-5 border-2 border-brand-navy-100 ${fixedFloatClass} ${layout === "bold" ? "border-4 border-rose-200 shadow-rose-300/50" : ""} ${layout === "soft" ? "border-orange-200 shadow-orange-100/80" : ""}`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 bg-gradient-to-br from-brand-navy-700 to-brand-royal-600 ${layout === "soft" ? "rounded-2xl" : "rounded-xl"} flex items-center justify-center shadow-lg`}
          >
            <CheckCircle className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="text-3xl font-bold text-brand-carbon-900">95%</div>
            <div className="text-sm text-brand-carbon-600 font-medium">{t("hero.successRate")}</div>
          </div>
        </div>
      </div>

      <div
        className={`absolute -top-8 -right-8 bg-white ${statCardRounded} shadow-2xl p-5 border-2 border-brand-royal-100 animate-float-delayed hidden xl:block backdrop-blur-sm ${layout === "bold" ? "border-4 border-orange-200 shadow-orange-200/50" : ""} ${layout === "soft" ? "border-amber-200 shadow-amber-100/80" : ""}`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 bg-gradient-to-br from-brand-royal-600 to-brand-navy-700 ${layout === "soft" ? "rounded-2xl" : "rounded-xl"} flex items-center justify-center shadow-lg`}
          >
            <TrendingUp className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="text-3xl font-bold text-brand-carbon-900">1000+</div>
            <div className="text-sm text-brand-carbon-600 font-medium">{t("hero.happyClients")}</div>
          </div>
        </div>
      </div>
    </>
  ) : null

  const desktopVisualInSplit = (
    <div className={`relative hidden lg:block ${splitImageShell}`}>
      <div className="relative">
        <div className={imageFrameClass}>{heroImageInner(desktopAspectSplit, false, false)}</div>
        {splitFloatLayer}
      </div>
    </div>
  )

  const mobileImageBlock = (aspectClass) => (
    <div className="lg:hidden mt-8 max-w-sm mx-auto w-full">
      <div
        className={`relative w-full ${mobileRounded} overflow-hidden shadow-2xl ring-2 ring-white/50 ${layout === "corporate" ? "!ring-slate-700" : ""}`}
      >
        {heroImageInner(aspectClass, true, false)}
      </div>
    </div>
  )

  const twoColGrid = (imageFirst) => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      {imageFirst ? (
        <>
          {desktopVisualInSplit}
          {textBlock}
          {mobileImageBlock("aspect-[4/3]")}
        </>
      ) : (
        <>
          {textBlock}
          {desktopVisualInSplit}
          {mobileImageBlock("aspect-[4/3]")}
        </>
      )}
    </div>
  )

  const stackImageTopBlock = (
    <div className="flex flex-col gap-10 lg:gap-14 w-full items-stretch">
      <div className="w-full">
        <div className="hidden lg:block">
          <div className={stackImageShell}>
            <div className={imageFrameClass}>{heroImageInner("aspect-[3/2]", false, showBandOverlay)}</div>
          </div>
        </div>
        <div className="lg:hidden max-w-sm mx-auto">
          <div className={`relative w-full ${mobileRounded} overflow-hidden shadow-2xl ring-2 ring-sky-200/50`}>
            {heroImageInner("aspect-[4/3]", true, showBandOverlay)}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center px-0 sm:px-2">{textBlock}</div>
    </div>
  )

  const stackTextTopBlock = (
    <div className="flex flex-col gap-10 lg:gap-14 w-full">
      {textBlock}
      <div className="w-full hidden lg:block">
        <div className={stackImageShell}>
          <div className={imageFrameClass}>{heroImageInner("aspect-[3/2]", false, false)}</div>
        </div>
      </div>
      {mobileImageBlock("aspect-[4/3]")}
    </div>
  )

  const stackEditorialBlock = (
    <div className="flex flex-col gap-12 lg:gap-16 items-stretch w-full">
      <div className={`w-full ${stackImageShell} relative`}>
        <div
          className="absolute -left-3 top-8 bottom-8 w-1 bg-gradient-to-b from-fuchsia-500 via-rose-400 to-pink-300 rounded-full hidden lg:block"
          aria-hidden
        />
        <div className="hidden lg:block sm:ml-4">
          <div className={`relative ${imgShellRounded} overflow-hidden shadow-2xl ring-4 ring-rose-200/30`}>
            {heroImageInner("aspect-[3/2]", false, false)}
          </div>
        </div>
        <div className="lg:hidden px-1 max-w-sm mx-auto">
          <div className={`relative w-full ${mobileRounded} overflow-hidden shadow-2xl ring-2 ring-rose-200/40`}>
            {heroImageInner("aspect-[4/3]", true, false)}
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">{textBlock}</div>
    </div>
  )

  const splitCompactBlock = (
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">
      <div className="flex-1 min-w-0 w-full order-2 lg:order-1">{textBlock}</div>
      <div className="w-full max-w-sm lg:max-w-none lg:w-[min(100%,260px)] shrink-0 order-1 lg:order-2 mx-auto lg:mx-0">
        <div className="hidden lg:block relative">
          <div className={imageFrameClass}>{heroImageInner(desktopAspectSplit, false, false)}</div>
        </div>
        <div className="lg:hidden">
          <div className={`relative w-full ${mobileRounded} overflow-hidden shadow-2xl ring-2 ring-slate-300`}>
            {heroImageInner("aspect-[4/3]", true, false)}
          </div>
        </div>
      </div>
    </div>
  )

  const centerImageBottomBlock = (
    <div className="flex flex-col items-center gap-10 lg:gap-14 w-full">
      {textBlock}
      <div className="w-full max-w-sm lg:max-w-md justify-center px-2 hidden lg:flex mx-auto">
        <div className={`w-full ${imageFrameClass}`}>{heroImageInner("aspect-[4/3]", false, false)}</div>
      </div>
      <div className="lg:hidden w-full max-w-sm mx-auto px-2">
        <div className={`relative w-full ${mobileRounded} overflow-hidden shadow-2xl ring-2 ring-orange-200/60`}>
          {heroImageInner("aspect-[4/3]", true, false)}
        </div>
      </div>
    </div>
  )

  const centerNoImageBlock = <div className="flex flex-col items-center w-full max-w-3xl mx-auto">{textBlock}</div>

  const mainGrid = (() => {
    switch (pattern) {
      case "split-text-left":
        return twoColGrid(false)
      case "split-image-left":
        return twoColGrid(true)
      case "stack-image-top":
        return stackImageTopBlock
      case "stack-text-top":
        return stackTextTopBlock
      case "stack-image-top-editorial":
        return stackEditorialBlock
      case "center-no-image":
        return centerNoImageBlock
      case "split-compact-right-image":
        return splitCompactBlock
      case "center-image-bottom":
        return centerImageBottomBlock
      default:
        return twoColGrid(false)
    }
  })()

  return (
    <section
      id="hero"
      className={`relative min-h-screen flex items-center ${skin.heroBackground} overflow-hidden theme-hero theme-hero-${layout} ${skin.heroSection}`.trim()}
    >
      {band}
      <HeroThemeBackgroundDecor themeId={theme.id} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-24 py-16 sm:py-20 lg:py-24 w-full">
        {mainGrid}
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 3s ease-in-out infinite;
          animation-delay: 1.5s;
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  )
}
