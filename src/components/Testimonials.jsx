import { useTranslation } from "react-i18next"
import { Card, CardContent } from "./ui/card"
import { TrendingUp, GraduationCap, Shield, MapPin, Building2, Users, Trophy, Globe2 } from "lucide-react"
import { useSiteTheme } from "../theme/ThemeProvider.jsx"
import { getHomeSkin } from "../theme/homeSkins.js"
import { getHomeCopy } from "../theme/themeHomeCopy.js"

export default function WhySingapore() {
  const { t, i18n } = useTranslation()
  const theme = useSiteTheme()
  const skin = getHomeSkin(theme.id)
  const copy = getHomeCopy(theme.id, i18n.language, theme.displayName)
  
  const advantages = [
    {
      icon: TrendingUp,
      title: t("whySingapore.economy.title"),
      stat: t("whySingapore.economy.stat"),
      description: t("whySingapore.economy.description"),
      gradient: "from-brand-navy-700 to-brand-navy-800",
      bgColor: "bg-brand-navy-50"
    },
    {
      icon: GraduationCap,
      title: t("whySingapore.education.title"),
      stat: t("whySingapore.education.stat"),
      description: t("whySingapore.education.description"),
      gradient: "from-brand-royal-600 to-brand-royal-700",
      bgColor: "bg-brand-royal-50"
    },
    {
      icon: Shield,
      title: t("whySingapore.safety.title"),
      stat: t("whySingapore.safety.stat"),
      description: t("whySingapore.safety.description"),
      gradient: "from-brand-navy-700 to-brand-royal-600",
      bgColor: "bg-brand-navy-50"
    },
    {
      icon: Building2,
      title: t("whySingapore.business.title"),
      stat: t("whySingapore.business.stat"),
      description: t("whySingapore.business.description"),
      gradient: "from-brand-royal-600 to-brand-navy-700",
      bgColor: "bg-brand-royal-50"
    },
    {
      icon: MapPin,
      title: t("whySingapore.location.title"),
      stat: t("whySingapore.location.stat"),
      description: t("whySingapore.location.description"),
      gradient: "from-brand-navy-800 to-brand-carbon-800",
      bgColor: "bg-brand-navy-100"
    },
    {
      icon: Users,
      title: t("whySingapore.lifestyle.title"),
      stat: t("whySingapore.lifestyle.stat"),
      description: t("whySingapore.lifestyle.description"),
      gradient: "from-brand-royal-700 to-brand-navy-800",
      bgColor: "bg-brand-royal-100"
    }
  ]
  
  return (
    <section id="why-singapore" className={skin.whySingapore}>
      {skin.richDecor ? (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 opacity-[0.03]">
            <img
              src="/images/singapore-skyline.jpeg"
              alt="Singapore skyline"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-brand-navy-200/40 to-white/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-brand-royal-200/40 to-white/40 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-brand-navy-50/30 to-transparent rounded-full blur-3xl"></div>

          <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-brand-navy-700/5 to-transparent rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-br from-brand-royal-600/5 to-transparent rounded-full"></div>
        </div>
      ) : null}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={skin.whyHeaderClass ?? skin.servicesHeaderClass}>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-navy-700/10 to-brand-royal-600/10 border border-brand-navy-200 rounded-full text-brand-navy-700 text-sm font-semibold mb-6 shadow-sm">
            <Globe2 className="w-4 h-4" />
            <span>{copy?.whyBadge ?? t("whySingapore.badge")}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-carbon-900 mb-6">
            {copy?.whyTitle ?? t("whySingapore.title")}
          </h2>
          <p
            className={`text-xl sm:text-2xl text-brand-carbon-600 max-w-3xl leading-relaxed ${(skin.whyHeaderClass ?? skin.servicesHeaderClass).includes("text-left") ? "" : "mx-auto"}`}
          >
            {copy?.whySubtitle ?? t("whySingapore.subtitle")}
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon
            return (
              <Card 
                key={index} 
                className={skin.whyCard}
              >
                <CardContent className="p-8 relative">
                  {/* Icon with gradient background */}
                  <div className={`w-16 h-16 ${advantage.bgColor} rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-500`}>
                    <div className={`w-14 h-14 bg-gradient-to-br ${advantage.gradient} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-brand-carbon-900 mb-3">
                    {advantage.title}
                  </h3>

                  {/* Statistic */}
                  <div className={`inline-block px-4 py-2 bg-gradient-to-r ${advantage.gradient} rounded-lg mb-4 shadow-sm`}>
                    <p className="text-white font-bold text-sm">
                      {advantage.stat}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-brand-carbon-600 leading-relaxed">
                    {advantage.description}
                  </p>

                  {/* Decorative element */}
                  <div className={`absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br ${advantage.gradient} opacity-5 group-hover:opacity-10 rounded-tl-full transition-opacity duration-500`}></div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Singapore imagery showcase */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg group">
            <img 
              src="/images/marina-bay-sands.jpeg" 
              alt="Marina Bay Sands Singapore"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white font-bold text-sm">Marina Bay Sands</p>
            </div>
          </div>
          
          <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg group">
            <img 
              src="/images/garden-by-the-bay.jpeg" 
              alt="Gardens by the Bay Singapore"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white font-bold text-sm">Gardens by the Bay</p>
            </div>
          </div>
          
          <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg group">
            <img 
              src="/images/singapore-business.jpeg" 
              alt="Singapore Business District"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white font-bold text-sm">CBD Skyline</p>
            </div>
          </div>
          
          <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg group">
            <img 
              src="/images/singapore-culture.jpeg" 
              alt="Singapore Culture"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white font-bold text-sm">Cultural Heritage</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-brand-navy-700 to-brand-royal-600 rounded-3xl p-10 sm:p-14 shadow-2xl relative overflow-hidden">
          {/* Background pattern with Singapore night skyline */}
          <div className="absolute inset-0 opacity-10">
            <img 
              src="/images/singapore-skyline.jpeg" 
              alt="Singapore at night"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-20"></div>
          <div className="relative z-10">
            <Trophy className="w-16 h-16 text-white mx-auto mb-6" />
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {t("whySingapore.cta.title")}
            </h3>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {t("whySingapore.cta.description")}
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-navy-700 font-bold rounded-xl hover:bg-brand-silver-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
            >
              {t("whySingapore.cta.button")}
              <TrendingUp className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

