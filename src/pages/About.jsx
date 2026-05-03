import { useTranslation } from "react-i18next"
import { Card, CardContent } from "../components/ui/card"
import { Award, Target, Heart, Users, CheckCircle2, TrendingUp, Sparkles, Star } from "lucide-react"
import PageHeader from "../components/PageHeader"
import { useSiteTheme } from "../theme/ThemeProvider.jsx"
import { getHomeSkin } from "../theme/homeSkins.js"

export default function AboutPage() {
  const { t, i18n } = useTranslation()
  const theme = useSiteTheme()
  const skin = getHomeSkin(theme.id)
  const companyName = theme.displayName
  const aboutNameLang = i18n.language.startsWith("zh") ? "zh" : "en"
  const partnerAboutContent = theme.aboutName?.[aboutNameLang]

  const values = [
    {
      icon: Award,
      title: t("about.excellence"),
      description: t("about.excellenceDesc", { companyName })
    },
    {
      icon: Target,
      title: t("about.precision"),
      description: t("about.precisionDesc")
    },
    {
      icon: Heart,
      title: t("about.dedication"),
      description: t("about.dedicationDesc")
    },
    {
      icon: Users,
      title: t("about.trust"),
      description: t("about.trustDesc")
    }
  ]

  const milestones = [
    { year: "2008", event: t("about.milestones.2008") },
    { year: "2012", event: t("about.milestones.2012") },
    { year: "2015", event: t("about.milestones.2015") },
    { year: "2018", event: t("about.milestones.2018") },
    { year: "2021", event: t("about.milestones.2021") },
    { year: "2024", event: t("about.milestones.2024") }
  ]
  return (
    <div className="pt-24">
      <PageHeader
        title={t("about.title", { companyName })}
        subtitle={t("about.subtitle")}
        badge={t("about.badge")}
        icon={Users}
      />

      <section className={skin.pageSectionPrimary}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-brand-carbon-900 mb-6">{t("about.ourStory")}</h2>
              <p className="text-lg text-brand-carbon-600 mb-6 leading-relaxed">
                {t("about.story1", { companyName })}
              </p>
              <p className="text-lg text-brand-carbon-600 mb-6 leading-relaxed">
                {t("about.story2")}
              </p>
              <p className="text-lg text-brand-carbon-600 leading-relaxed">
                {t("about.story3", { companyName })}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-brand-navy-700 to-brand-royal-600 rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-brand-carbon-900 mb-2">
                        {value.title}
                      </h3>
                      <p className="text-brand-carbon-600 text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className={skin.pageSectionPrimary}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-navy-700/10 to-brand-royal-600/10 backdrop-blur-sm border border-brand-navy-200/50 text-brand-navy-700 rounded-full text-sm font-semibold shadow-sm mb-6">
              <Sparkles className="w-4 h-4" />
              <span>{t("about.ourName")}</span>
            </div>
            <h2 className="text-4xl font-bold text-brand-carbon-900 mb-4">{t("about.ourName")}</h2>
            <p className="text-xl text-brand-carbon-600 max-w-2xl mx-auto">
              {partnerAboutContent ? partnerAboutContent.headline : t("about.ourNameDesc", { companyName })}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {partnerAboutContent ? (
              partnerAboutContent.cards.map((card, index) => {
                const icons = [Star, Award, Sparkles]
                const Icon = icons[index] || Sparkles
                const ringClass =
                  index === 1
                    ? "border-brand-royal-100 hover:border-brand-royal-300"
                    : "border-brand-navy-100 hover:border-brand-navy-300"
                const circleClass =
                  index === 1
                    ? "from-brand-royal-600 to-brand-royal-700"
                    : index === 2
                      ? "from-brand-navy-700 to-brand-royal-600"
                      : "from-brand-navy-700 to-brand-navy-800"
                return (
                  <Card
                    key={card.title}
                    className={`border-2 ${ringClass} transition-all duration-300 hover:shadow-xl group ${index === 2 ? "md:col-span-3 lg:col-span-1" : ""}`}
                  >
                    <CardContent className="p-8 text-center">
                      <div
                        className={`w-20 h-20 bg-gradient-to-br ${circleClass} rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                      >
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-brand-carbon-900 mb-4">{card.title}</h3>
                      <p className="text-brand-carbon-700 leading-relaxed text-base">{card.body}</p>
                    </CardContent>
                  </Card>
                )
              })
            ) : (
              <>
                <Card className="border-2 border-brand-navy-100 hover:border-brand-navy-300 transition-all duration-300 hover:shadow-xl group">
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-brand-navy-700 to-brand-navy-800 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Star className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-brand-carbon-900 mb-4">{t("about.averraTitle")}</h3>
                    <p className="text-brand-carbon-700 leading-relaxed text-base">{t("about.averraDesc")}</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-brand-royal-100 hover:border-brand-royal-300 transition-all duration-300 hover:shadow-xl group">
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-brand-royal-600 to-brand-royal-700 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Award className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-brand-carbon-900 mb-4">{t("about.oneTitle")}</h3>
                    <p className="text-brand-carbon-700 leading-relaxed text-base">{t("about.oneDesc")}</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-brand-navy-100 hover:border-brand-navy-300 transition-all duration-300 hover:shadow-xl group md:col-span-3 lg:col-span-1">
                  <CardContent className="p-8 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-brand-navy-700 to-brand-royal-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Sparkles className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-brand-carbon-900 mb-4">{t("about.averraOneTitle")}</h3>
                    <p className="text-brand-carbon-700 leading-relaxed text-base">{t("about.averraOneDesc")}</p>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </section>

      <section className={skin.pageSectionAlt}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-brand-carbon-900 mb-4">{t("about.ourJourney")}</h2>
            <p className="text-xl text-brand-carbon-600 max-w-2xl mx-auto">
              {t("about.ourJourneyDesc")}
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-brand-navy-700 to-brand-royal-600 hidden md:block"></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'} text-center md:text-left`}>
                    <div className="bg-white rounded-lg shadow-lg p-6 inline-block w-full md:w-auto">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-brand-navy-700 to-brand-royal-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <TrendingUp className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-brand-navy-700 mb-1">{milestone.year}</div>
                          <div className="text-brand-carbon-700">{milestone.event}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block w-4 h-4 bg-brand-navy-700 rounded-full border-4 border-white shadow-lg z-10"></div>
                  <div className="flex-1 hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={skin.pageSectionPrimary}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-brand-carbon-900 mb-4">{t("about.ourTeam")}</h2>
            <p className="text-xl text-brand-carbon-600 max-w-2xl mx-auto">
              {t("about.ourTeamDesc")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 text-center">
              <CardContent className="p-6">
                <div className="w-24 h-24 bg-gradient-to-br from-brand-navy-700 to-brand-royal-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-brand-carbon-900 mb-2">{t("about.expertConsultants")}</h3>
                <p className="text-brand-carbon-600">
                  {t("about.expertConsultantsDesc")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 text-center">
              <CardContent className="p-6">
                <div className="w-24 h-24 bg-gradient-to-br from-brand-royal-600 to-brand-navy-700 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-brand-carbon-900 mb-2">{t("about.provenTrackRecord")}</h3>
                <p className="text-brand-carbon-600">
                  {t("about.provenTrackRecordDesc")}
                </p>
              </CardContent>
            </Card>
            <Card className="border-2 text-center">
              <CardContent className="p-6">
                <div className="w-24 h-24 bg-gradient-to-br from-brand-navy-700 to-brand-royal-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Heart className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-brand-carbon-900 mb-2">{t("about.personalizedService")}</h3>
                <p className="text-brand-carbon-600">
                  {t("about.personalizedServiceDesc")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

