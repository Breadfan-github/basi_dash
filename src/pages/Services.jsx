import { useTranslation } from "react-i18next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { FileText, Users, Shield, Clock, CheckCircle2, ArrowRight, Star, DollarSign, Heart, GraduationCap, Award, Briefcase } from "lucide-react"
import { Link } from "react-router-dom"
import PageHeader from "../components/PageHeader"
import { useSiteTheme } from "../theme/ThemeProvider.jsx"
import { getHomeSkin } from "../theme/homeSkins.js"

export default function ServicesPage() {
  const { t } = useTranslation()
  const theme = useSiteTheme()
  const skin = getHomeSkin(theme.id)
  
  const services = [
    {
      icon: FileText,
      title: t("services.prApplication.title"),
      description: t("services.prApplication.description"),
      features: [
        t("services.prApplication.features.1"),
        t("services.prApplication.features.2"),
        t("services.prApplication.features.3"),
        t("services.prApplication.features.4"),
        t("services.prApplication.features.5")
      ]
    },
    {
      icon: Users,
      title: t("services.citizenship.title"),
      description: t("services.citizenship.description"),
      features: [
        t("services.citizenship.features.1"),
        t("services.citizenship.features.2"),
        t("services.citizenship.features.3"),
        t("services.citizenship.features.4"),
        t("services.citizenship.features.5")
      ]
    },
    {
      icon: Shield,
      title: t("services.consultation.title"),
      description: t("services.consultation.description"),
      features: [
        t("services.consultation.features.1"),
        t("services.consultation.features.2"),
        t("services.consultation.features.3"),
        t("services.consultation.features.4"),
        t("services.consultation.features.5")
      ]
    },
    {
      icon: DollarSign,
      title: t("services.documents.title"),
      description: t("services.documents.description"),
      features: [
        t("services.documents.features.1"),
        t("services.documents.features.2"),
        t("services.documents.features.3"),
        t("services.documents.features.4"),
        t("services.documents.features.5")
      ]
    },
    {
      icon: Heart,
      title: t("services.charity.title"),
      description: t("services.charity.description"),
      features: [
        t("services.charity.features.1"),
        t("services.charity.features.2"),
        t("services.charity.features.3"),
        t("services.charity.features.4"),
        t("services.charity.features.5")
      ]
    },
    {
      icon: GraduationCap,
      title: t("services.education.title"),
      description: t("services.education.description"),
      features: [
        t("services.education.features.1"),
        t("services.education.features.2"),
        t("services.education.features.3"),
        t("services.education.features.4"),
        t("services.education.features.5")
      ]
    },
    {
      icon: Award,
      title: t("services.ministerial.title"),
      description: t("services.ministerial.description"),
      features: [
        t("services.ministerial.features.1"),
        t("services.ministerial.features.2"),
        t("services.ministerial.features.3"),
        t("services.ministerial.features.4"),
        t("services.ministerial.features.5")
      ]
    },
    {
      icon: Briefcase,
      title: t("services.administrative.title"),
      description: t("services.administrative.description"),
      features: [
        t("services.administrative.features.1"),
        t("services.administrative.features.2"),
        t("services.administrative.features.3"),
        t("services.administrative.features.4"),
        t("services.administrative.features.5")
      ]
    }
  ]
  
  return (
    <div className="pt-24">
      <PageHeader
        title={t("services.title")}
        subtitle={t("services.subtitle")}
        badge={t("services.badge")}
        icon={FileText}
      />

      <section className={skin.pageSectionPrimary}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <Card key={index} className={skin.pageListCard}>
                  <CardHeader>
                    <div className="mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-brand-navy-700 to-brand-royal-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-700">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/application">
                      <Button className="w-full group">
                        {t("nav.getStarted")}
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className={skin.pageSectionAlt}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-brand-carbon-900 mb-4">{t("services.whyChooseUs")}</h2>
            <p className="text-xl text-brand-carbon-600 max-w-2xl mx-auto">
              {t("services.whyChooseUsDesc")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-brand-navy-700 mb-2">95%</div>
              <div className="text-xl font-semibold text-brand-carbon-900 mb-2">{t("hero.successRate")}</div>
              <div className="text-brand-carbon-600">{t("services.successRateDesc")}</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-brand-royal-600 mb-2">1000+</div>
              <div className="text-xl font-semibold text-brand-carbon-900 mb-2">{t("hero.happyClients")}</div>
              <div className="text-brand-carbon-600">{t("services.happyClientsDesc")}</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-brand-navy-700 mb-2">15+</div>
              <div className="text-xl font-semibold text-brand-carbon-900 mb-2">{t("hero.years")} {t("about.experience")}</div>
              <div className="text-brand-carbon-600">{t("services.experienceDesc")}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

