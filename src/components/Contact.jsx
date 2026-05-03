import { useTranslation } from "react-i18next"
import { Card, CardContent } from "./ui/card"
import { Phone, MapPin, Sparkles } from "lucide-react"
import ContactForm from "./ContactForm"
import { useSiteTheme } from "../theme/ThemeProvider.jsx"
import { getHomeSkin } from "../theme/homeSkins.js"
import { getHomeCopy } from "../theme/themeHomeCopy.js"
import { getThemeContact } from "../theme/themeContact.js"

export default function Contact() {
  const { t, i18n } = useTranslation()
  const theme = useSiteTheme()
  const skin = getHomeSkin(theme.id)
  const copy = getHomeCopy(theme.id, i18n.language, theme.displayName)
  const { phone, addressLines } = getThemeContact(theme.id)

  const contactMethods = [
    {
      icon: Phone,
      title: t("contact.phone"),
      details: [phone],
      gradient: "from-brand-navy-700 to-brand-royal-600",
    },
    {
      icon: MapPin,
      title: t("contact.address"),
      details: addressLines,
      gradient: "from-brand-royal-600 to-brand-navy-700",
    },
  ]

  return (
    <section
      id="contact"
      className={skin.contact}
    >
      {skin.richDecor ? (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-brand-navy-200/25 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-royal-200/25 rounded-full blur-3xl" />
        </div>
      ) : null}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={skin.contactHeaderClass}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-navy-100/60 rounded-full text-brand-navy-700 text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4" />
            <span>{copy?.contactBadge ?? t("contact.badge")}</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-brand-carbon-900 mb-6">
            {copy?.contactTitle ?? t("contact.title")}
          </h2>
          <p
            className={`text-xl sm:text-2xl text-brand-carbon-600 max-w-3xl leading-relaxed ${skin.contactHeaderClass.includes("text-left") ? "" : "mx-auto"}`}
          >
            {copy?.contactSubtitle ?? t("contact.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-1 space-y-6">
            {contactMethods.map((method, index) => {
              const Icon = method.icon
              return (
                <Card
                  key={index}
                  className={skin.contactSectionCard}
                >
                  <CardContent className="p-6">
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${method.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-bold text-brand-carbon-900 mb-3 text-lg">{method.title}</h3>
                    <div className="space-y-1">
                      {method.details.map((detail, idx) => (
                        <p key={idx} className="text-brand-carbon-600 hover:text-brand-carbon-900 transition-colors">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                  <div
                    className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${method.gradient} opacity-5 group-hover:opacity-10 rounded-bl-full transition-opacity duration-500`}
                  />
                </Card>
              )
            })}
          </div>

          <div className="lg:col-span-2">
            <div className={skin.contactFormWrap}>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
