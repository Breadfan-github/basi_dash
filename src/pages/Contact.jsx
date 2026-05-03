import { useTranslation } from "react-i18next"
import { Card, CardContent } from "../components/ui/card"
import { Phone, MapPin, Clock, MessageSquare } from "lucide-react"
import PageHeader from "../components/PageHeader"
import ContactForm from "../components/ContactForm"
import { useSiteTheme } from "../theme/ThemeProvider.jsx"
import { getHomeSkin } from "../theme/homeSkins.js"
import { getThemeContact } from "../theme/themeContact.js"

export default function ContactPage() {
  const { t } = useTranslation()
  const theme = useSiteTheme()
  const skin = getHomeSkin(theme.id)
  const { phone, addressLines } = getThemeContact(theme.id)

  return (
    <div className="pt-24">
      <PageHeader
        title={t("contact.title")}
        subtitle={t("contact.subtitle")}
        badge={t("contact.badge")}
        icon={MessageSquare}
      />

      <section className={skin.pageSectionPrimary}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              <Card className={skin.contactPageCard}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-navy-700 to-brand-royal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{t("contact.phone")}</h3>
                      <p className="text-gray-600 text-sm">{phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={skin.contactPageCard}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-royal-600 to-brand-navy-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{t("contact.address")}</h3>
                      {addressLines.map((line) => (
                        <p key={line} className="text-gray-600 text-sm">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className={skin.contactPageCard}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-navy-700 to-brand-royal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{t("contact.businessHours")}</h3>
                      <p className="text-gray-600 text-sm">{t("contact.mondayFriday")}</p>
                      <p className="text-gray-600 text-sm">{t("contact.saturday")}</p>
                      <p className="text-gray-600 text-sm">{t("contact.sunday")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
