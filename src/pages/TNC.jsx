import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import PageHeader from "../components/PageHeader"
import { api } from "../lib/api"
import { FileText } from "lucide-react"
import { useSiteTheme } from "../theme/ThemeProvider.jsx"
import { getHomeSkin } from "../theme/homeSkins.js"

export default function TNCPage() {
  const { t, i18n } = useTranslation()
  const theme = useSiteTheme()
  const skin = getHomeSkin(theme.id)
  const [state, setState] = useState({ list: [], loading: true, error: null })
  const lang = (i18n.language || "en").startsWith("zh") ? "zh" : "en"

  useEffect(() => {
    setState((s) => ({ ...s, loading: true, error: null }))
    api
      .getTncs()
      .then((res) => setState({ list: res.data || [], loading: false, error: null }))
      .catch((err) => setState({ list: [], loading: false, error: err.message }))
  }, [])

  if (state.loading) {
    return (
      <div className="pt-24">
        <PageHeader title={t("tnc.title")} subtitle={t("tnc.subtitle")} badge={t("tnc.badge")} icon={FileText} />
        <section className={`${skin.pageSectionPrimary} text-center text-gray-500`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">{t("common.loading")}</div>
        </section>
      </div>
    )
  }

  if (state.error) {
    return (
      <div className="pt-24">
        <PageHeader title={t("tnc.title")} subtitle={t("tnc.subtitle")} badge={t("tnc.badge")} icon={FileText} />
        <section className={`${skin.pageSectionPrimary} text-center text-red-600`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">{state.error}</div>
        </section>
      </div>
    )
  }

  return (
    <div className="pt-24">
      <PageHeader title={t("tnc.title")} subtitle={t("tnc.subtitle")} badge={t("tnc.badge")} icon={FileText} />
      <section className={skin.pageSectionPrimary}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {state.list.length === 0 ? (
            <p className="text-center text-gray-500">{t("tnc.empty")}</p>
          ) : (
            <div className="space-y-10">
              {state.list.map((section) => (
                <article key={section.id}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {lang === "zh" ? section.title_zh : section.title_en}
                  </h2>
                  <div className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                    {lang === "zh" ? section.content_zh || "" : section.content_en || ""}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
