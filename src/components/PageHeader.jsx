import { Sparkles } from "lucide-react"
import { useSiteTheme } from "../theme/ThemeProvider.jsx"
import { getHomeSkin } from "../theme/homeSkins.js"

/** Inner page hero. Uses `homeSkins.pageHeaderSection` per theme; optional `sectionClassName` overrides. */
export default function PageHeader({ title, subtitle, badge, icon: Icon, sectionClassName }) {
  const theme = useSiteTheme()
  const skin = getHomeSkin(theme.id)
  const sectionClass = sectionClassName ?? skin.pageHeaderSection

  return (
    <section className={sectionClass}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {badge && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-sm font-semibold mb-6 animate-fade-in">
            {Icon ? <Icon className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
            <span>{badge}</span>
          </div>
        )}

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">{title}</h1>

        {subtitle && (
          <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto opacity-95 leading-relaxed">{subtitle}</p>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </section>
  )
}
