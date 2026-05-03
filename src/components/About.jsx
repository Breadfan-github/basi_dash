import { useTranslation } from "react-i18next"
import { Card, CardContent } from "./ui/card"
import { Award, Target, Heart, Users, TrendingUp, CheckCircle, Sparkles } from "lucide-react"
import { useSiteTheme } from "../theme/ThemeProvider.jsx"
import { getHomeSkin } from "../theme/homeSkins.js"
import { getHomeCopy } from "../theme/themeHomeCopy.js"

export default function About() {
  const { t, i18n } = useTranslation()
  const theme = useSiteTheme()
  const skin = getHomeSkin(theme.id)
  const copy = getHomeCopy(theme.id, i18n.language, theme.displayName)
  const companyName = theme.displayName
  
  const values = [
    {
      icon: Award,
      title: t("about.excellence"),
      description: t("about.excellenceDesc", { companyName }),
      gradient: "from-brand-navy-700 to-brand-navy-800",
      bgGradient: "from-brand-navy-50 to-brand-navy-100"
    },
    {
      icon: Target,
      title: t("about.precision"),
      description: t("about.precisionDesc"),
      gradient: "from-brand-royal-600 to-brand-royal-700",
      bgGradient: "from-brand-royal-50 to-brand-royal-100"
    },
    {
      icon: Heart,
      title: t("about.dedication"),
      description: t("about.dedicationDesc"),
      gradient: "from-brand-navy-700 to-brand-royal-600",
      bgGradient: "from-brand-navy-50 to-brand-royal-50"
    },
    {
      icon: Users,
      title: t("about.trust"),
      description: t("about.trustDesc"),
      gradient: "from-brand-royal-600 to-brand-navy-700",
      bgGradient: "from-brand-royal-50 to-brand-navy-50"
    }
  ]
  
  return (
    <section id="about" className={skin.about}>
      {skin.richDecor ? (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-brand-royal-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-0 w-96 h-96 bg-brand-navy-200/20 rounded-full blur-3xl"></div>
        </div>
      ) : null}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Story */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-navy-100/50 rounded-full text-brand-navy-700 text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" />
                <span>{copy?.aboutChip ?? "Our Story"}</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-carbon-900 mb-6 leading-tight">
                {copy?.aboutTitle ?? t("about.title", { companyName })}
              </h2>
            </div>
            
            <div className="space-y-6">
              <p className="text-lg sm:text-xl text-brand-carbon-700 leading-relaxed">
                {copy?.aboutStory1 ?? t("about.story1", { companyName })}
              </p>
              <p className="text-lg sm:text-xl text-brand-carbon-700 leading-relaxed">
                {copy?.aboutStory2 ?? t("about.story2")}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-lg border border-brand-silver-200/50 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-brand-navy-700 flex-shrink-0" />
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-brand-navy-700 to-brand-royal-600 bg-clip-text text-transparent">95%</div>
                </div>
                <div className="text-xs sm:text-sm text-brand-carbon-600 font-medium leading-tight">{t("hero.successRate")}</div>
              </div>
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-lg border border-brand-silver-200/50 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-brand-royal-600 flex-shrink-0" />
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-brand-royal-600 to-brand-navy-700 bg-clip-text text-transparent">1000+</div>
                </div>
                <div className="text-xs sm:text-sm text-brand-carbon-600 font-medium leading-tight">{t("hero.happyClients")}</div>
              </div>
              <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-lg border border-brand-silver-200/50 hover:shadow-xl hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-2">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-brand-royal-600 flex-shrink-0" />
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-brand-royal-600 to-brand-navy-700 bg-clip-text text-transparent">15+</div>
                </div>
                <div className="text-xs sm:text-sm text-brand-carbon-600 font-medium leading-tight break-words">{t("common.experience")}</div>
              </div>
            </div>
          </div>

          {/* Right Column - Values */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <Card 
                  key={index} 
                  className="group relative border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white/80 backdrop-blur-sm hover:-translate-y-2"
                >
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${value.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  <CardContent className="p-6 sm:p-8 relative z-10">
                    <div className={`w-14 h-14 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-brand-carbon-900 mb-3 group-hover:text-brand-navy-700 transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-sm sm:text-base text-brand-carbon-600 leading-relaxed group-hover:text-brand-carbon-700 transition-colors">
                      {value.description}
                    </p>
                  </CardContent>

                  {/* Decorative corner */}
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${value.gradient} opacity-5 group-hover:opacity-10 rounded-bl-full transition-opacity duration-500`}></div>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

