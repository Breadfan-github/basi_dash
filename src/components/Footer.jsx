import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import { useSiteTheme } from "../theme/ThemeProvider.jsx"
import { getHomeSkin } from "../theme/homeSkins.js"
import { getThemeContact } from "../theme/themeContact.js"

export default function Footer() {
  const { t } = useTranslation()
  const theme = useSiteTheme()
  const skin = getHomeSkin(theme.id)
  const { phone, addressLines } = getThemeContact(theme.id)
  const compact = theme.design.footerVariant === "compact"

  return (
    <footer className={skin.footerShell}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={`grid grid-cols-1 gap-8 ${compact ? "md:grid-cols-2" : "md:grid-cols-4"}`}>
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">{theme.displayName}</h3>
            <p className="text-sm leading-relaxed">{t("footer.description")}</p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t("footer.quickLinks")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  {t("nav.services")}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  {t("nav.faq")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  {t("nav.contact")}
                </Link>
              </li>
              <li>
                <Link to="/tnc" className="hover:text-white transition-colors">
                  {t("nav.tnc")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t("footer.services")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/pr-assessment" className="hover:text-white transition-colors">
                  {t("footer.prAssessment")}
                </Link>
              </li>
              <li>
                <Link to="/citizenship-assessment" className="hover:text-white transition-colors">
                  {t("footer.citizenshipAssessment")}
                </Link>
              </li>
              <li>
                <Link to="/application" className="hover:text-white transition-colors">
                  {t("footer.startApplication")}
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  {t("footer.allServices")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">{t("footer.contactInfo")}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{phone}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <div className="flex flex-col">
                  {addressLines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </div>
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a href="#" className="hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-carbon-800 mt-8 pt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} {theme.displayName}. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  )
}
