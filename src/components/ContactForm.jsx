import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { PhoneInput } from "./ui/phone-input"
import { Textarea } from "./ui/textarea"
import { Send, MessageSquare } from "lucide-react"
import { api } from "../lib/api"
import { useSiteTheme } from "../theme/ThemeProvider.jsx"
import { getHomeSkin } from "../theme/homeSkins.js"

export default function ContactForm() {
  const { t } = useTranslation()
  const theme = useSiteTheme()
  const skin = getHomeSkin(theme.id)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [phoneValue, setPhoneValue] = useState("")
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    setSubmitSuccess(false)

    const formData = new FormData(e.target)
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: phoneValue || formData.get('phone'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    }

    try {
      await api.submitContact(data)
      setSubmitSuccess(true)
      e.target.reset()
      setPhoneValue("")
      setTimeout(() => setSubmitSuccess(false), 5000)
    } catch (error) {
      // Handle API validation errors
      if (error.data && error.data.errors) {
        // Format validation errors
        const errorMessages = Object.entries(error.data.errors)
          .map(([field, messages]) => {
            const fieldName = field === 'firstName' ? t("contact.firstName") :
                             field === 'lastName' ? t("contact.lastName") :
                             field === 'email' ? t("contact.email") :
                             field === 'phone' ? t("contact.phone") :
                             field === 'subject' ? t("contact.subject") :
                             field === 'message' ? t("contact.message") : field
            return `${fieldName}: ${Array.isArray(messages) ? messages.join(', ') : messages}`
          })
          .join('\n')
        setSubmitError(errorMessages)
      } else if (error.data && error.data.message) {
        setSubmitError(error.data.message)
      } else if (error.message) {
        setSubmitError(error.message)
      } else {
        setSubmitError(t("contact.submitError"))
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className={skin.contactFormCard}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-6 h-6" />
          {t("contact.sendMessage")}
        </CardTitle>
        <CardDescription>
          {t("contact.formDescription")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                {t("contact.firstName")} *
              </label>
              <Input id="firstName" name="firstName" placeholder={t("contact.firstName")} required />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                {t("contact.lastName")} *
              </label>
              <Input id="lastName" name="lastName" placeholder={t("contact.lastName")} required />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              {t("contact.email")} *
            </label>
            <Input id="email" name="email" type="email" placeholder={t("contact.emailPlaceholder")} required />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              {t("contact.phone")} *
            </label>
            <PhoneInput 
              id="phone" 
              value={phoneValue}
              onChange={(e) => setPhoneValue(e.target.value)}
              placeholder="1234 5678" 
              required 
            />
            <input type="hidden" name="phone" value={phoneValue} />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
              {t("contact.subject")} *
            </label>
            <select
              id="subject"
              name="subject"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              required
            >
              <option value="">{t("contact.selectSubject")}</option>
              <option value="pr">{t("contact.prInquiry")}</option>
              <option value="citizenship">{t("contact.citizenshipInquiry")}</option>
              <option value="consultation">{t("contact.scheduleConsultation")}</option>
              <option value="assessment">{t("contact.eligibilityAssessment")}</option>
              <option value="other">{t("contact.other")}</option>
            </select>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              {t("contact.message")} *
            </label>
            <Textarea 
              id="message" 
              name="message"
              placeholder={t("contact.messagePlaceholder")}
              className="min-h-[150px]"
              required
            />
          </div>
          {submitError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {submitError}
            </div>
          )}
          {submitSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
              {t("contact.thankYou")}
            </div>
          )}
          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? t("contact.submitting") || "Submitting..." : t("contact.sendButton")}
            <Send className="ml-2 w-4 h-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

