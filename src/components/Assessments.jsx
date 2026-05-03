import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Button } from "./ui/button"
import { FileText, Users, ArrowRight } from "lucide-react"
import { useSiteTheme } from "../theme/ThemeProvider.jsx"
import { getHomeSkin } from "../theme/homeSkins.js"
import { getHomeCopy } from "../theme/themeHomeCopy.js"

export default function Assessments() {
  const { t, i18n } = useTranslation()
  const theme = useSiteTheme()
  const skin = getHomeSkin(theme.id)
  const copy = getHomeCopy(theme.id, i18n.language, theme.displayName)

  const assessments = [
    {
      icon: FileText,
      title: t("nav.prAssessment"),
      description: t("assessments.prDescription") || "Check your eligibility for Singapore Permanent Residence",
      href: "/pr-assessment",
      gradient: "from-brand-navy-700 to-brand-navy-800",
      bgGradient: "from-brand-navy-50 to-brand-navy-100"
    },
    {
      icon: Users,
      title: t("nav.citizenship"),
      description: t("assessments.citizenshipDescription") || "Check your eligibility for Singapore Citizenship",
      href: "/citizenship-assessment",
      gradient: "from-brand-royal-600 to-brand-royal-700",
      bgGradient: "from-brand-royal-50 to-brand-royal-100"
    }
  ]

  return (
    <section id="assessments" className={skin.assessments}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={skin.assessmentsHeaderClass}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-carbon-900 mb-4">
            {copy?.assessmentsHeading ?? t("nav.eligibilityAssessments")}
          </h2>
          <p
            className={`text-lg text-gray-600 max-w-2xl ${skin.assessmentsHeaderClass.includes("text-left") ? "" : "mx-auto"}`}
          >
            {copy?.assessmentsSubtitle ?? t("assessments.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {assessments.map((assessment, index) => {
            const Icon = assessment.icon
            return (
              <Link
                key={index}
                to={assessment.href}
                className={skin.assessmentLink}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${assessment.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <div className="relative p-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${assessment.gradient} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-brand-carbon-900 mb-3 group-hover:text-brand-navy-700 transition-colors">
                    {assessment.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {assessment.description}
                  </p>
                  
                  <div className="flex items-center text-brand-navy-700 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                    <span>{t("assessments.getStarted") || "Get Started"}</span>
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

