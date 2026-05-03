import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Button } from "../components/ui/button"
import { Home, ArrowLeft } from "lucide-react"
import { useSiteTheme } from "../theme/ThemeProvider.jsx"
import { getHomeSkin } from "../theme/homeSkins.js"

export default function NotFound() {
  const { t } = useTranslation()
  const theme = useSiteTheme()
  const skin = getHomeSkin(theme.id)

  return (
    <div className="pt-24">
      <section className="py-8 md:py-20 bg-white min-h-[calc(100vh-5rem)] flex items-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <div className="mb-10">
            <h1 className={`text-8xl sm:text-9xl font-bold mb-6 leading-none ${skin.notFoundNumber}`}>
              404
            </h1>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t("notFound.title")}
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-xl mx-auto">
              {t("notFound.description")}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className={skin.notFoundPrimaryBtn}>
              <Link className="flex" to="/">
                <Home className="mr-2 w-5 h-5" />
                {t("notFound.goHome")}
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => window.history.back()}
              className="border-gray-300 hover:bg-gray-50"
            >
              <ArrowLeft className="mr-2 w-5 h-5" />
              {t("notFound.goBack")}
            </Button>
          </div>

          <div className="pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              {t("notFound.helpText")}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

