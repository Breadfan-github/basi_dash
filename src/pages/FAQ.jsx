import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { Card, CardContent } from "../components/ui/card"
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react"
import PageHeader from "../components/PageHeader"
import { useSiteTheme } from "../theme/ThemeProvider.jsx"
import { getHomeSkin } from "../theme/homeSkins.js"

function FAQItem({ question, answer, cardClassName }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Card className={cardClassName}>
      <CardContent className="p-0">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full text-left p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <span className="font-semibold text-gray-900 pr-4">{question}</span>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
          )}
        </button>
        {isOpen && (
          <div className="px-6 pb-6 text-gray-600 leading-relaxed">
            {answer}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function FAQPage() {
  const { t } = useTranslation()
  const theme = useSiteTheme()
  const skin = getHomeSkin(theme.id)
  const companyName = theme.displayName

  const faqs = [
    {
      category: t("faq.categories.prApplication"),
      questions: [
        {
          q: t("faq.questions.prEligibility"),
          a: t("faq.questions.prEligibilityAnswer")
        },
        {
          q: t("faq.questions.prProcessingTime"),
          a: t("faq.questions.prProcessingTimeAnswer")
        },
        {
          q: t("faq.questions.prDocuments"),
          a: t("faq.questions.prDocumentsAnswer")
        },
        {
          q: t("faq.questions.prWorkPermit"),
          a: t("faq.questions.prWorkPermitAnswer")
        },
        {
          q: t("faq.questions.prSuccessRate"),
          a: t("faq.questions.prSuccessRateAnswer")
        }
      ]
    },
    {
      category: t("faq.categories.citizenshipApplication"),
      questions: [
        {
          q: t("faq.questions.citizenshipPRPeriod"),
          a: t("faq.questions.citizenshipPRPeriodAnswer")
        },
        {
          q: t("faq.questions.citizenshipRequirements"),
          a: t("faq.questions.citizenshipRequirementsAnswer")
        },
        {
          q: t("faq.questions.citizenshipDual"),
          a: t("faq.questions.citizenshipDualAnswer")
        },
        {
          q: t("faq.questions.citizenshipInterview"),
          a: t("faq.questions.citizenshipInterviewAnswer")
        },
        {
          q: t("faq.questions.citizenshipProcessingTime"),
          a: t("faq.questions.citizenshipProcessingTimeAnswer")
        }
      ]
    },
    {
      category: t("faq.categories.general"),
      questions: [
        {
          q: t("faq.questions.generalServices", { companyName }),
          a: t("faq.questions.generalServicesAnswer")
        },
        {
          q: t("faq.questions.generalGuarantee"),
          a: t("faq.questions.generalGuaranteeAnswer")
        },
        {
          q: t("faq.questions.generalDifference", { companyName }),
          a: t("faq.questions.generalDifferenceAnswer")
        },
        {
          q: t("faq.questions.generalGetStarted"),
          a: t("faq.questions.generalGetStartedAnswer")
        }
      ]
    }
  ]
  
  return (
    <div className="pt-24">
      <PageHeader
        title={t("faq.title")}
        subtitle={t("faq.subtitle")}
        badge={t("faq.badge")}
        icon={HelpCircle}
      />

      <section className={skin.pageSectionPrimary}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {faqs.map((category, categoryIdx) => (
              <div key={categoryIdx}>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">{category.category}</h2>
                <div className="space-y-4">
                  {category.questions.map((faq, idx) => (
                    <FAQItem key={idx} question={faq.q} answer={faq.a} cardClassName={skin.faqCard} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={skin.faqCtaSection}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("faq.stillHaveQuestions")}</h2>
          <p className="text-xl text-gray-600 mb-8">
            {t("faq.stillHaveQuestionsDesc")}
          </p>
          <Link to="/contact" className={skin.faqCtaButton}>
            {t("faq.contactUs")}
          </Link>
        </div>
      </section>
    </div>
  )
}

