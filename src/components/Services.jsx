import { useTranslation } from "react-i18next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { FileText, Users, Shield, ArrowRight, DollarSign, Heart, GraduationCap, Award, Briefcase } from "lucide-react"
import { Link } from "react-router-dom"
import { useSiteTheme } from "../theme/ThemeProvider.jsx"
import { getHomeSkin } from "../theme/homeSkins.js"
import { getHomeCopy } from "../theme/themeHomeCopy.js"
import {
  getPresentedServices,
  getServicesGridClass,
  getServiceCardSpanClass,
  getIconShellClass,
  getIconShellClassStack,
  getIconGlyphClass,
  getServiceTitleClass,
  getServicesHeaderChip,
  getServicesPresentation,
  getListMarkerParts,
} from "../theme/servicesPresentation.js"

export default function Services() {
  const { t, i18n } = useTranslation()
  const theme = useSiteTheme()
  const skin = getHomeSkin(theme.id)
  const copy = getHomeCopy(theme.id, i18n.language, theme.displayName)
  const pres = getServicesPresentation(theme.id)
  const { Icon: HeaderIcon, chipClass: headerChipClass } = getServicesHeaderChip(theme.id)
  const listMarker = getListMarkerParts(pres.listMarker)

  const baseServices = [
    {
      icon: FileText,
      title: t("services.prApplication.title"),
      description: t("services.prApplication.description"),
      features: [
        t("services.prApplication.features.1"),
        t("services.prApplication.features.2"),
        t("services.prApplication.features.3"),
      ],
      gradient: "from-brand-navy-700 to-brand-navy-800",
      bgGradient: "from-brand-navy-50 to-brand-navy-100",
    },
    {
      icon: Users,
      title: t("services.citizenship.title"),
      description: t("services.citizenship.description"),
      features: [
        t("services.citizenship.features.1"),
        t("services.citizenship.features.2"),
        t("services.citizenship.features.3"),
      ],
      gradient: "from-brand-royal-600 to-brand-royal-700",
      bgGradient: "from-brand-royal-50 to-brand-royal-100",
    },
    {
      icon: Shield,
      title: t("services.consultation.title"),
      description: t("services.consultation.description"),
      features: [
        t("services.consultation.features.1"),
        t("services.consultation.features.2"),
        t("services.consultation.features.3"),
      ],
      gradient: "from-brand-navy-700 to-brand-royal-600",
      bgGradient: "from-brand-navy-50 to-brand-royal-50",
    },
    {
      icon: DollarSign,
      title: t("services.documents.title"),
      description: t("services.documents.description"),
      features: [
        t("services.documents.features.1"),
        t("services.documents.features.2"),
        t("services.documents.features.3"),
      ],
      gradient: "from-brand-royal-600 to-brand-navy-700",
      bgGradient: "from-brand-royal-50 to-brand-navy-50",
    },
    {
      icon: Heart,
      title: t("services.charity.title"),
      description: t("services.charity.description"),
      features: [
        t("services.charity.features.1"),
        t("services.charity.features.2"),
        t("services.charity.features.3"),
      ],
      gradient: "from-brand-navy-800 to-brand-carbon-800",
      bgGradient: "from-brand-navy-100 to-brand-silver-100",
    },
    {
      icon: GraduationCap,
      title: t("services.education.title"),
      description: t("services.education.description"),
      features: [
        t("services.education.features.1"),
        t("services.education.features.2"),
        t("services.education.features.3"),
      ],
      gradient: "from-brand-royal-700 to-brand-navy-800",
      bgGradient: "from-brand-royal-100 to-brand-navy-100",
    },
    {
      icon: Award,
      title: t("services.ministerial.title"),
      description: t("services.ministerial.description"),
      features: [
        t("services.ministerial.features.1"),
        t("services.ministerial.features.2"),
        t("services.ministerial.features.3"),
      ],
      gradient: "from-brand-navy-700 to-brand-royal-700",
      bgGradient: "from-brand-navy-50 to-brand-royal-100",
    },
    {
      icon: Briefcase,
      title: t("services.administrative.title"),
      description: t("services.administrative.description"),
      features: [
        t("services.administrative.features.1"),
        t("services.administrative.features.2"),
        t("services.administrative.features.3"),
      ],
      gradient: "from-brand-carbon-800 to-brand-navy-700",
      bgGradient: "from-brand-silver-100 to-brand-navy-50",
    },
  ]

  const services = getPresentedServices(baseServices, theme.id)
  const servicesGridClass = getServicesGridClass(theme.id, skin.servicesGridClass)

  const iconAnim = "group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg"
  const MarkerIcon = listMarker.Icon

  return (
    <section id="services" className={skin.services}>
      {skin.richDecor ? (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-navy-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-royal-200/20 rounded-full blur-3xl"></div>
        </div>
      ) : null}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={skin.servicesHeaderClass}>
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold mb-6 ${headerChipClass}`}
          >
            <HeaderIcon className="w-4 h-4 shrink-0" />
            <span>{copy?.servicesBadge ?? t("services.badge")}</span>
          </div>
          <h2
            className={`text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-carbon-900 mb-6 ${skin.servicesTitleClass} ${pres.titleAlignClass}`}
          >
            {copy?.servicesTitle ?? t("services.title")}
          </h2>
          <p className={skin.servicesSubtitleClass}>{copy?.servicesSubtitle ?? t("services.subtitle")}</p>
        </div>

        <div className={servicesGridClass}>
          {services.map((service, index) => {
            const Icon = service.icon
            const spanClass = getServiceCardSpanClass(service.cardSize, index, theme.id)
            const shell = service.layoutMode === "inline" ? getIconShellClass(service.cardSize) : getIconShellClassStack(service.cardSize)
            const iconBox = (
              <div
                className={`${shell} bg-gradient-to-br ${service.gradient} flex items-center justify-center ${iconAnim}`}
              >
                <Icon className={`${getIconGlyphClass(service.cardSize)} text-white`} />
              </div>
            )

            return (
              <Card
                key={`${theme.id}-${index}-${service.title}`}
                className={[skin.serviceCard, spanClass, pres.cardShellClass].filter(Boolean).join(" ")}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {service.layoutMode === "inline" ? (
                  <CardHeader className="relative z-10 pb-4 flex flex-col sm:flex-row gap-4 sm:items-start text-left">
                    {iconBox}
                    <div className="min-w-0 flex-1 space-y-2">
                      <CardTitle className={getServiceTitleClass(service.cardSize)}>{service.title}</CardTitle>
                      <CardDescription
                        className={`text-brand-carbon-600 leading-relaxed ${service.cardSize === "sm" ? "text-sm" : "text-base"}`}
                      >
                        {service.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                ) : (
                  <CardHeader className="relative z-10 pb-4">
                    <div className="flex flex-col items-start">
                      {iconBox}
                      <CardTitle className={getServiceTitleClass(service.cardSize)}>{service.title}</CardTitle>
                      <CardDescription
                        className={`text-brand-carbon-600 leading-relaxed ${service.cardSize === "sm" ? "text-sm" : "text-base"}`}
                      >
                        {service.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                )}

                <CardContent className="relative z-10 space-y-4">
                  <ul className={pres.featureListClass}>
                    {service.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className={`flex items-start text-brand-carbon-700 group-hover:text-brand-carbon-800 transition-colors ${
                          service.cardSize === "sm" ? "text-xs sm:text-sm" : "text-sm sm:text-base"
                        }`}
                      >
                        {listMarker.dot ? (
                          <span className={listMarker.className} aria-hidden />
                        ) : (
                          MarkerIcon && (
                            <MarkerIcon
                              className={`${listMarker.className} group-hover:scale-110 transition-transform`}
                              strokeWidth={theme.id === "pr-bridge" ? 2.5 : 2}
                            />
                          )
                        )}
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/services"
                    className={`inline-flex items-center mt-4 transition-colors ${pres.learnMoreClass}`}
                  >
                    <span>{t("services.learnMore")}</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </CardContent>

                {pres.showCornerDecor ? (
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.gradient} opacity-5 group-hover:opacity-10 rounded-bl-full transition-opacity duration-500`}
                  />
                ) : null}
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
