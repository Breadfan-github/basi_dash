import { cn } from "../lib/utils"

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

function Badge({ panel, scoreRange, label }) {
  return (
    <div
      className={panel.badge}
      style={{
        backgroundColor: `${scoreRange.color}15`,
        color: scoreRange.color,
        border: `2px solid ${scoreRange.color}40`,
      }}
    >
      {label}
    </div>
  )
}

function LegendCards({ panel, segments, isActiveSegment }) {
  return segments.map((segment, index) => {
    const isActive = isActiveSegment(segment)
    return (
      <div
        key={index}
        className={cn(panel.legendCard, isActive ? "shadow-md sm:scale-[1.02]" : "hover:shadow-sm")}
        style={{
          backgroundColor: isActive ? `${segment.color}20` : `${segment.color}08`,
          borderColor: isActive ? segment.color : `${segment.color}20`,
          borderWidth: isActive ? "2px" : "1px",
        }}
      >
        <div className="mt-0.5 h-5 w-5 shrink-0 rounded-full" style={{ backgroundColor: segment.color }} />
        <div>
          <div className="mb-1 text-sm font-semibold" style={{ color: segment.color }}>
            {segment.label}
          </div>
          <div className={panel.legendRange}>{segment.range}</div>
        </div>
      </div>
    )
  })
}

function LegendGrid({ panel, segments, isActiveSegment, className }) {
  return <div className={cn(panel.legendGrid, className)}>{LegendCards({ panel, segments, isActiveSegment })}</div>
}

function LegendList({ panel, segments, isActiveSegment }) {
  return (
    <ul className="mt-8 w-full overflow-hidden rounded-md border border-slate-300 bg-white divide-y divide-slate-200">
      {segments.map((segment, index) => {
        const isActive = isActiveSegment(segment)
        return (
          <li
            key={index}
            className={cn(
              "flex items-center gap-4 px-4 py-3.5 transition-colors",
              isActive ? "bg-slate-100/90" : "hover:bg-slate-50/80"
            )}
          >
            <span className="h-3 w-3 shrink-0 rounded-full shadow-sm" style={{ backgroundColor: segment.color }} />
            <div className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
              <span className="text-sm font-semibold" style={{ color: segment.color }}>
                {segment.label}
              </span>
              <span className={cn(panel.legendRange, "shrink-0 font-mono tabular-nums")}>{segment.range}</span>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

function LegendChips({ panel, segments, isActiveSegment }) {
  return (
    <div className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3">
      {segments.map((segment, index) => {
        const isActive = isActiveSegment(segment)
        return (
          <div
            key={index}
            className={cn(
              "inline-flex max-w-[11rem] flex-col items-center rounded-2xl border px-3 py-2 text-center transition-all duration-200 sm:max-w-none sm:px-4",
              isActive ? "shadow-md sm:scale-105" : "opacity-90 hover:opacity-100"
            )}
            style={{
              backgroundColor: isActive ? `${segment.color}18` : `${segment.color}0a`,
              borderColor: isActive ? segment.color : `${segment.color}35`,
              borderWidth: isActive ? "2px" : "1px",
            }}
          >
            <span className="text-xs font-semibold leading-tight" style={{ color: segment.color }}>
              {segment.label}
            </span>
            <span className={cn(panel.legendRange, "mt-0.5 text-[10px]")}>{segment.range}</span>
          </div>
        )
      })}
    </div>
  )
}

/**
 * @param {{
 *   layoutId: string
 *   panel: ScorePanelStyle
 *   titleText: string
 *   displayScore: string
 *   scoreRange: { label: string, color: string }
 *   segments: any[]
 *   isActiveSegment: (s: any) => boolean
 *   chartNode: import('react').ReactNode
 * }} props
 */
export function ApplicationScoreSectionLayout({
  layoutId,
  panel,
  titleText,
  displayScore,
  scoreRange,
  segments,
  isActiveSegment,
  chartNode,
}) {
  const title = (extraClass) => <h3 className={cn(panel.title, extraClass)}>{titleText}</h3>
  const scoreNum = (extraClass) => (
    <div className={cn(panel.score, extraClass)}>{displayScore}</div>
  )
  const badge = <Badge panel={panel} scoreRange={scoreRange} label={scoreRange.label} />

  switch (layoutId) {
    case "sidebar":
      return (
        <div className="grid gap-8 lg:grid-cols-[minmax(0,13rem)_1fr] lg:items-start lg:gap-10">
          <aside className="flex flex-col items-center gap-5 border-b border-slate-300/80 pb-8 lg:border-b-0 lg:border-r lg:border-slate-300/80 lg:pb-0 lg:pr-8">
            <div className="w-full text-center lg:text-left">{title("lg:mx-0")}</div>
            <div className="flex flex-col items-center gap-2 lg:items-start">
              {scoreNum("mb-0 text-center lg:text-left")}
              {badge}
            </div>
          </aside>
          <div className="flex min-w-0 flex-col gap-8">
            {chartNode}
            <LegendGrid panel={panel} segments={segments} isActiveSegment={isActiveSegment} />
          </div>
        </div>
      )

    case "chartBand":
      return (
        <>
          <div className="-mx-5 -mt-1 mb-8 border-y border-sky-200/70 bg-gradient-to-r from-sky-100/50 via-sky-50/40 to-sky-100/30 px-5 py-6 shadow-inner sm:-mx-5">
            {chartNode}
          </div>
          {title()}
          <div className="mb-2 flex flex-col items-center gap-3 sm:mb-4 sm:flex-row sm:justify-center sm:gap-6">
            {scoreNum("mb-0")}
            {badge}
          </div>
          <LegendGrid panel={panel} segments={segments} isActiveSegment={isActiveSegment} />
        </>
      )

    case "mediaSplit":
      return (
        <>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <div className="order-2 min-w-0 flex-1 lg:order-1">{chartNode}</div>
            <div className="order-1 flex flex-col items-center gap-4 text-center lg:order-2 lg:w-52 lg:shrink-0 lg:items-end lg:text-right">
              {title("lg:w-full")}
              <div className="flex flex-col items-center gap-2 lg:items-end">
                {scoreNum("mb-0")}
                {badge}
              </div>
            </div>
          </div>
          <LegendGrid panel={panel} segments={segments} isActiveSegment={isActiveSegment} />
        </>
      )

    case "editorial":
      return (
        <>
          <div className="mb-8 grid gap-6 md:grid-cols-2 md:items-end">
            <div className="text-left">{title("mb-0 text-left")}</div>
            <div className="flex flex-col items-start gap-3 md:items-end md:text-right">
              {scoreNum("mb-0 md:text-right")}
              {badge}
            </div>
          </div>
          {chartNode}
          <LegendGrid
            panel={panel}
            segments={segments}
            isActiveSegment={isActiveSegment}
            className="mt-10 md:mx-auto md:max-w-3xl md:grid-cols-2"
          />
        </>
      )

    case "axisSplit":
      return (
        <>
          <div className="mb-8 flex flex-col items-center gap-3 border-b border-orange-200/60 pb-8 text-center md:mb-10 md:gap-4">
            {title("mb-0")}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              {scoreNum("mb-0")}
              {badge}
            </div>
          </div>
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-10">
            <div className="flex shrink-0 justify-center md:justify-start">{chartNode}</div>
            <div className="min-w-0 flex-1 md:border-l md:border-orange-200/60 md:pl-10">
              <LegendGrid
                panel={panel}
                segments={segments}
                isActiveSegment={isActiveSegment}
                className="mt-0 grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2"
              />
            </div>
          </div>
        </>
      )

    case "listStack":
      return (
        <>
          {title()}
          <div className="mb-6 text-center sm:mb-8">
            {scoreNum()}
            <div className="mt-2 flex justify-center">{badge}</div>
          </div>
          <div className="mx-auto w-full max-w-md">{chartNode}</div>
          <LegendList panel={panel} segments={segments} isActiveSegment={isActiveSegment} />
        </>
      )

    case "centerSoft":
      return (
        <>
          <div className="mx-auto flex max-w-md flex-col items-center text-center">
            {title("mb-0")}
            <div className="mt-5">{scoreNum("mb-0")}</div>
            <div className="mt-3">{badge}</div>
          </div>
          <div className="mt-10 w-full">{chartNode}</div>
          <LegendChips panel={panel} segments={segments} isActiveSegment={isActiveSegment} />
        </>
      )

    case "classic":
    default:
      return (
        <>
          {title()}
          <div className="mb-8 text-center">
            {scoreNum()}
            {badge}
          </div>
          {chartNode}
          <LegendGrid panel={panel} segments={segments} isActiveSegment={isActiveSegment} />
        </>
      )
  }
}
