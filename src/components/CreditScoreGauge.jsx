import { cn } from "../lib/utils"
import { useTranslation } from "react-i18next"
import { useSiteTheme } from "../theme/ThemeProvider.jsx"
import { formatScoreRange, formatScoreValue, getScoreChartPreset } from "../theme/themeScoreCharts.js"
import { ApplicationScoreSectionLayout } from "./CreditScoreGaugeLayouts.jsx"

const DEFAULT_DONUT = { outerR: 100, innerR: 64, strokeWidth: 3 }

const SEGMENT_LABEL_KEYS = ["poor", "low", "fair", "good", "veryGood", "excellent"]

/** @param {readonly number[]} bounds */
function segmentWeights(bounds) {
  const w = []
  for (let i = 0; i < bounds.length - 1; i++) w.push(bounds[i + 1] - bounds[i])
  return w
}

/** @param {number} score @param {readonly number[]} bounds */
function scoreToPercent(score, bounds) {
  const min = bounds[0]
  const max = bounds[bounds.length - 1]
  const range = max - min
  if (range <= 0) return 0
  const s = Math.max(min, Math.min(max, score))
  return ((s - min) / range) * 100
}

/** @param {number} s @param {readonly number[]} bounds */
function scoreToThetaRad(s, bounds) {
  const min = bounds[0]
  const max = bounds[bounds.length - 1]
  const range = max - min
  const t = range <= 0 ? 0 : (s - min) / range
  return Math.PI * (1 - t)
}

/** @param {readonly number[]} zoneColors @param {readonly number[]} bounds */
function buildSpectrumBackground(zoneColors, bounds) {
  const parts = []
  for (let i = 0; i < zoneColors.length; i++) {
    const p0 = scoreToPercent(bounds[i], bounds)
    const p1 = scoreToPercent(bounds[i + 1], bounds)
    const c = zoneColors[i]
    parts.push(`${c} ${p0}%`, `${c} ${p1}%`)
  }
  return `linear-gradient(90deg, ${parts.join(", ")})`
}

function buildThermometerFill(zoneColors) {
  return `linear-gradient(to top, ${zoneColors[0]}, ${zoneColors[2]}, ${zoneColors[5]})`
}

function donutSectorPath(cx, cy, rOuter, rInner, angleStartRad, angleEndRad) {
  const xo1 = cx + rOuter * Math.cos(angleStartRad)
  const yo1 = cy - rOuter * Math.sin(angleStartRad)
  const xo2 = cx + rOuter * Math.cos(angleEndRad)
  const yo2 = cy - rOuter * Math.sin(angleEndRad)
  const xi1 = cx + rInner * Math.cos(angleStartRad)
  const yi1 = cy - rInner * Math.sin(angleStartRad)
  const xi2 = cx + rInner * Math.cos(angleEndRad)
  const yi2 = cy - rInner * Math.sin(angleEndRad)
  const sweep = angleStartRad > angleEndRad ? 1 : 0
  const large = Math.abs(angleStartRad - angleEndRad) > Math.PI ? 1 : 0
  return `M ${xo1} ${yo1} A ${rOuter} ${rOuter} 0 ${large} ${sweep} ${xo2} ${yo2} L ${xi2} ${yi2} A ${rInner} ${rInner} 0 ${large} ${1 - sweep} ${xi1} ${yi1} Z`
}

/** @param {number} s @param {readonly number[]} bounds */
function segmentIndexForScore(s, bounds) {
  const min = bounds[0]
  const max = bounds[bounds.length - 1]
  const clamped = Math.max(min, Math.min(max, s))
  const n = bounds.length - 1
  for (let i = 0; i < n; i++) {
    if (clamped >= bounds[i] && clamped <= bounds[i + 1]) return i
  }
  return n - 1
}

function getScoreRange(s, t, zoneColors, bounds, scoreFmt) {
  const i = segmentIndexForScore(s, bounds)
  return {
    label: t(`applicationStatus.scoreCategories.${SEGMENT_LABEL_KEYS[i]}`),
    color: zoneColors[i],
    range: formatScoreRange(bounds[i], bounds[i + 1], scoreFmt),
  }
}

function buildSegmentMeta(t, zoneColors, bounds, scoreFmt) {
  return SEGMENT_LABEL_KEYS.map((key, i) => ({
    label: t(`applicationStatus.scoreCategories.${key}`),
    range: formatScoreRange(bounds[i], bounds[i + 1], scoreFmt),
    color: zoneColors[i],
    min: bounds[i],
    max: bounds[i + 1],
  }))
}

function ChartSpectrum({ zoneColors, markerPct, scoreRange, ariaLabel, bounds }) {
  const bg = buildSpectrumBackground(zoneColors, bounds)
  return (
    <div className="px-1 mb-2">
      <div className="relative h-12 w-full rounded-full border-2 border-gray-200/80 shadow-inner overflow-visible">
        <div
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{ background: bg }}
          role="img"
          aria-label={ariaLabel}
        />
        <div
          className="absolute top-1/2 z-10 h-[70%] min-h-[2rem] w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-md border-[3px] border-white shadow-md pointer-events-none"
          style={{
            left: `${markerPct}%`,
            backgroundColor: scoreRange.color,
            boxShadow: `0 2px 8px rgba(0,0,0,0.15), 0 0 0 1px ${scoreRange.color}44`,
          }}
          aria-hidden
        />
      </div>
    </div>
  )
}

function ChartSegments({ zoneColors, markerPct, scoreRange, rounded = "none", ariaLabel, bounds }) {
  const roundClass = rounded === "lg" ? "rounded-lg" : "rounded-none"
  const weights = segmentWeights(bounds)
  const cols = weights.map((w) => `${w}fr`).join(" ")
  return (
    <div className="px-1 mb-2">
      <div
        className={cn("relative grid h-12 w-full overflow-visible border-2 border-gray-200/80 bg-gray-100/80 p-0.5 shadow-inner", roundClass)}
        style={{ gridTemplateColumns: cols }}
      >
        {weights.map((_, i) => (
          <div
            key={i}
            className={cn("h-full min-h-0 min-w-0 border-r border-white/35 last:border-r-0 shadow-sm", roundClass)}
            style={{ backgroundColor: zoneColors[i] }}
          />
        ))}
        <div
          className="absolute top-1/2 z-10 h-[78%] min-h-[2.25rem] w-1 -translate-x-1/2 -translate-y-1/2 shadow-md pointer-events-none"
          style={{ left: `${markerPct}%`, backgroundColor: scoreRange.color, boxShadow: "0 0 0 2px white" }}
          aria-hidden
        />
        <span className="sr-only">{ariaLabel}</span>
      </div>
    </div>
  )
}

function ChartFillRail({ zoneColors, markerPct, ariaLabel, bounds }) {
  const bg = buildSpectrumBackground(zoneColors, bounds)
  return (
    <div className="px-1 mb-2">
      <div className="relative h-11 w-full rounded-full border-2 border-gray-200/90 bg-gray-200/90 shadow-inner overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 overflow-hidden rounded-l-full"
          style={{ width: `${markerPct}%`, background: bg }}
          role="img"
          aria-label={ariaLabel}
        />
        <div
          className="pointer-events-none absolute inset-y-0 w-px bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.08)]"
          style={{ left: `${markerPct}%`, transform: "translateX(-50%)" }}
          aria-hidden
        />
      </div>
    </div>
  )
}

function ChartDonut({ zoneColors, normalizedScore, scoreRange, donut, ariaLabel, bounds }) {
  const cx = 120
  const cy = 118
  const { outerR, innerR, strokeWidth } = donut
  const theta = scoreToThetaRad(normalizedScore, bounds)
  const px = cx + outerR * Math.cos(theta)
  const py = cy - outerR * Math.sin(theta)

  return (
    <div className="mb-2 px-1">
      <div className="mx-auto w-full max-w-[280px]">
        <svg viewBox="0 0 240 130" className="h-auto w-full" role="img" aria-label={ariaLabel}>
          {zoneColors.map((fill, i) => {
            const a0 = scoreToThetaRad(bounds[i], bounds)
            const a1 = scoreToThetaRad(bounds[i + 1], bounds)
            return <path key={i} d={donutSectorPath(cx, cy, outerR, innerR, a0, a1)} fill={fill} stroke="white" strokeWidth={0.5} />
          })}
          <line
            x1={cx}
            y1={cy}
            x2={px}
            y2={py}
            stroke={scoreRange.color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx={cx} cy={cy} r={6} fill="white" stroke={scoreRange.color} strokeWidth={2} />
        </svg>
      </div>
    </div>
  )
}

function ChartStepDots({ zoneColors, normalizedScore, ariaLabel, bounds }) {
  const weights = segmentWeights(bounds)
  return (
    <div className="px-1 mb-2">
      <div className="relative h-16 w-full" role="img" aria-label={ariaLabel}>
        <div className="absolute left-0 right-0 top-1/2 h-0.5 -translate-y-1/2 bg-gray-300" />
        {weights.map((_, i) => {
          const lo = bounds[i]
          const hi = bounds[i + 1]
          const mid = (lo + hi) / 2
          const left = scoreToPercent(mid, bounds)
          const done = normalizedScore >= hi
          const active = normalizedScore >= lo && normalizedScore <= hi
          return (
            <div
              key={i}
              className="absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${left}%` }}
            >
              <div
                className={cn(
                  "h-4 w-4 rounded-full border-2 border-white shadow-sm transition-transform",
                  active && "scale-125"
                )}
                style={{
                  backgroundColor: done || active ? zoneColors[i] : "white",
                  borderColor: zoneColors[i],
                  boxShadow: active ? `0 0 0 2px white, 0 0 0 4px ${zoneColors[i]}` : undefined,
                }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ChartThermometer({ zoneColors, markerPct, ariaLabel }) {
  const fill = buildThermometerFill(zoneColors)
  return (
    <div className="px-1 mb-2 flex flex-col items-center">
      <div className="relative h-48 w-[3.25rem] rounded-full border-2 border-gray-300/90 bg-gray-100 shadow-inner overflow-hidden" role="img" aria-label={ariaLabel}>
        <div
          className="absolute bottom-0 left-0 right-0 rounded-b-[inherit]"
          style={{ height: `${markerPct}%`, background: fill }}
        />
        <div
          className="pointer-events-none absolute left-0 right-0 h-px bg-white/70"
          style={{ bottom: `${markerPct}%`, boxShadow: "0 -1px 0 rgba(0,0,0,0.06)" }}
          aria-hidden
        />
      </div>
    </div>
  )
}

function ChartDotScale({ zoneColors, markerPct, scoreRange, ariaLabel, bounds }) {
  return (
    <div className="px-1 mb-2">
      <div className="relative py-6" role="img" aria-label={ariaLabel}>
        <div className="h-1.5 w-full rounded-full bg-slate-200 relative">
          <div
            className="absolute inset-y-0 left-0 rounded-full opacity-90"
            style={{
              width: "100%",
              background: buildSpectrumBackground(zoneColors, bounds),
            }}
          />
        </div>
        <div
          className="absolute top-1/2 z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-white shadow-md pointer-events-none"
          style={{
            left: `${markerPct}%`,
            boxShadow: `0 0 0 2px ${scoreRange.color}, 0 4px 12px rgba(15,23,42,0.2)`,
            backgroundColor: scoreRange.color,
          }}
          aria-hidden
        />
      </div>
    </div>
  )
}

/** Weighted rounded pills in a row (prime-residency); linear scale, not an arc. */
function ChartPillRow({ zoneColors, markerPct, scoreRange, bounds, ariaLabel }) {
  const weights = segmentWeights(bounds)
  return (
    <div className="px-1 mb-2">
      <div className="relative flex h-12 w-full items-center gap-1.5" role="img" aria-label={ariaLabel}>
        {weights.map((w, i) => (
          <div
            key={i}
            className="h-9 min-h-0 min-w-0 rounded-full shadow-sm ring-1 ring-stone-900/10"
            style={{
              flex: `${w} 1 0%`,
              backgroundColor: zoneColors[i],
            }}
          />
        ))}
        <div
          className="pointer-events-none absolute top-1/2 z-10 h-[72%] min-h-[2rem] w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white shadow-md"
          style={{
            left: `${markerPct}%`,
            backgroundColor: scoreRange.color,
            boxShadow: `0 2px 10px rgba(0,0,0,0.12), 0 0 0 1px ${scoreRange.color}55`,
          }}
          aria-hidden
        />
      </div>
    </div>
  )
}

export default function CreditScoreGauge({ score = 300 }) {
  const { t } = useTranslation()
  const theme = useSiteTheme()
  const preset = getScoreChartPreset(theme.id)
  const { variant, zoneColors, scoreBounds: bounds, scoreNumberFormat: scoreFmt } = preset
  const panel = preset.panel ?? getScoreChartPreset("averra").panel
  const layoutId = preset.layoutId ?? "classic"
  const segmentsRounded = preset.segmentsRounded ?? "none"
  const donut = preset.donut ?? DEFAULT_DONUT

  const minSc = bounds[0]
  const maxSc = bounds[bounds.length - 1]
  const normalizedScore = Math.max(minSc, Math.min(maxSc, score))
  const markerPct = scoreToPercent(normalizedScore, bounds)
  const scoreRange = getScoreRange(normalizedScore, t, zoneColors, bounds, scoreFmt)
  const segments = buildSegmentMeta(t, zoneColors, bounds, scoreFmt)
  const isActiveSegment = (segment) => normalizedScore >= segment.min && normalizedScore <= segment.max

  const displayScore = formatScoreValue(normalizedScore, scoreFmt)
  const ariaLabel = `${t("applicationStatus.applicationScore")}: ${displayScore}`

  const chartNode =
    variant === "spectrum" ? (
      <ChartSpectrum
        zoneColors={zoneColors}
        markerPct={markerPct}
        scoreRange={scoreRange}
        ariaLabel={ariaLabel}
        bounds={bounds}
      />
    ) : variant === "segments" ? (
      <ChartSegments
        zoneColors={zoneColors}
        markerPct={markerPct}
        scoreRange={scoreRange}
        rounded={segmentsRounded}
        ariaLabel={ariaLabel}
        bounds={bounds}
      />
    ) : variant === "fillRail" ? (
      <ChartFillRail zoneColors={zoneColors} markerPct={markerPct} ariaLabel={ariaLabel} bounds={bounds} />
    ) : variant === "donut" ? (
      <ChartDonut
        zoneColors={zoneColors}
        normalizedScore={normalizedScore}
        scoreRange={scoreRange}
        donut={donut}
        ariaLabel={ariaLabel}
        bounds={bounds}
      />
    ) : variant === "stepDots" ? (
      <ChartStepDots zoneColors={zoneColors} normalizedScore={normalizedScore} ariaLabel={ariaLabel} bounds={bounds} />
    ) : variant === "thermometer" ? (
      <ChartThermometer zoneColors={zoneColors} markerPct={markerPct} ariaLabel={ariaLabel} />
    ) : variant === "dotScale" ? (
      <ChartDotScale zoneColors={zoneColors} markerPct={markerPct} scoreRange={scoreRange} ariaLabel={ariaLabel} bounds={bounds} />
    ) : variant === "pillRow" ? (
      <ChartPillRow
        zoneColors={zoneColors}
        markerPct={markerPct}
        scoreRange={scoreRange}
        bounds={bounds}
        ariaLabel={ariaLabel}
      />
    ) : null

  return (
    <div className={panel.root}>
      <ApplicationScoreSectionLayout
        layoutId={layoutId}
        panel={panel}
        titleText={t("applicationStatus.applicationScore")}
        displayScore={displayScore}
        scoreRange={scoreRange}
        segments={segments}
        isActiveSegment={isActiveSegment}
        chartNode={chartNode}
      />
    </div>
  )
}
