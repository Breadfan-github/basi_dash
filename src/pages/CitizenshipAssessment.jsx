import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { CheckCircle2, AlertCircle, Shield, ArrowLeft, ArrowRight, Award } from "lucide-react"
import { Link } from "react-router-dom"
import PageHeader from "../components/PageHeader"
import { useSiteTheme } from "../theme/ThemeProvider.jsx"
import { getHomeSkin } from "../theme/homeSkins.js"

export default function CitizenshipAssessment() {
  const { t } = useTranslation()
  const theme = useSiteTheme()
  const skin = getHomeSkin(theme.id)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    prStatus: "",
    ageGroup: "",
    maritalStatus: "",
    childrenStatus: "",
    residencyDuration: "",
    employmentStatus: "",
    monthlyIncome: "",
    nationalService: "",
    contributions: "",
    education: "",
    tiesToSingapore: "",
    languageIntegration: ""
  })
  const [result, setResult] = useState(null)
  const [errors, setErrors] = useState({})

  // Get all steps - all questions are shown regardless of PR status
  const getSteps = () => {
    return [
      { id: 1, key: "prStatus", type: "radio", required: true },
      { id: 2, key: "ageGroup", type: "radio", required: true },
      { id: 3, key: "maritalStatus", type: "radio", required: true },
      { id: 4, key: "childrenStatus", type: "radio", required: true },
      { id: 5, key: "residencyDuration", type: "radio", required: true },
      { id: 6, key: "employmentStatus", type: "radio", required: true },
      { id: 7, key: "monthlyIncome", type: "radio", required: true },
      { id: 8, key: "nationalService", type: "radio", required: true },
      { id: 9, key: "contributions", type: "radio", required: true },
      { id: 10, key: "education", type: "radio", required: true },
      { id: 11, key: "tiesToSingapore", type: "radio", required: true },
      { id: 12, key: "languageIntegration", type: "radio", required: true },
      { id: 13, key: "result", type: "result", required: false }
    ]
  }

  const steps = getSteps()
  const currentStep = steps.find(s => s.id === step)
  const totalSteps = steps.length

  // Calculate result when all required fields are filled
  useEffect(() => {
    const allFieldsFilled = formData.prStatus && formData.ageGroup && formData.maritalStatus && 
      formData.childrenStatus && formData.residencyDuration && formData.employmentStatus && 
      formData.monthlyIncome && formData.nationalService && formData.contributions && 
      formData.education && formData.tiesToSingapore && formData.languageIntegration

    if (allFieldsFilled) {
      const score = calculateScore(formData)
      setResult({
        score,
        eligible: score >= 70,
        recommendations: getRecommendations(score, formData)
      })
    } else {
      setResult(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData])

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleOptionSelect = (key, value) => {
    const newFormData = {...formData, [key]: value}
    setFormData(newFormData)
    // Auto-advance for radio buttons immediately
    if (currentStep?.type === "radio") {
      setTimeout(() => {
        setStep((prevStep) => {
          const steps = getSteps()
          const totalSteps = steps.length
          if (prevStep < totalSteps) {
            return prevStep + 1
          }
          return prevStep
        })
      }, 200)
    }
  }

  const calculateScore = (data) => {
    let score = 0
    
    // PR Status (0-25 points)
    if (data.prStatus === "moreThan5") score += 25
    else if (data.prStatus === "3-5") score += 20
    else if (data.prStatus === "2-3") score += 15
    else if (data.prStatus === "lessThan2") score += 10
    else if (data.prStatus === "notPR") score += 0
    
    // Age Group (0-15 points)
    if (data.ageGroup === "21-25") score += 15
    else if (data.ageGroup === "25-35") score += 15
    else if (data.ageGroup === "35-45") score += 12
    else if (data.ageGroup === "45-55") score += 8
    else if (data.ageGroup === "above55") score += 5
    
    // Marital Status (0-20 points)
    if (data.maritalStatus === "marriedCitizen2plus") score += 20
    else if (data.maritalStatus === "marriedPR") score += 15
    else if (data.maritalStatus === "single") score += 10
    else if (data.maritalStatus === "marriedForeigner") score += 5
    
    // Children Status (0-15 points)
    if (data.childrenStatus === "2plusCitizens") score += 15
    else if (data.childrenStatus === "1Citizen") score += 12
    else if (data.childrenStatus === "childrenPRs") score += 8
    else if (data.childrenStatus === "noChildren") score += 5
    
    // Residency Duration (0-20 points)
    if (data.residencyDuration === "moreThan10") score += 20
    else if (data.residencyDuration === "7-10") score += 18
    else if (data.residencyDuration === "5-7") score += 15
    else if (data.residencyDuration === "3-5") score += 10
    else if (data.residencyDuration === "lessThan3") score += 5
    
    // Employment Status (0-15 points)
    if (data.employmentStatus === "businessOwner") score += 15
    else if (data.employmentStatus === "seniorExecutive") score += 12
    else if (data.employmentStatus === "professional") score += 10
    else if (data.employmentStatus === "employed") score += 8
    else if (data.employmentStatus === "unemployed") score += 3
    
    // Monthly Income (0-20 points)
    if (data.monthlyIncome === "above20000") score += 20
    else if (data.monthlyIncome === "10000-20000") score += 18
    else if (data.monthlyIncome === "6000-10000") score += 15
    else if (data.monthlyIncome === "4000-6000") score += 10
    else if (data.monthlyIncome === "below4000") score += 5
    
    // National Service (0-15 points)
    if (data.nationalService === "completedNS") score += 15
    else if (data.nationalService === "willingToServe") score += 12
    else if (data.nationalService === "female") score += 10
    else if (data.nationalService === "exempted") score += 8
    else if (data.nationalService === "unwilling") score += 0
    
    // Contributions (0-15 points)
    if (data.contributions === "majorContributions") score += 15
    else if (data.contributions === "activeLeadership") score += 12
    else if (data.contributions === "regularVolunteer") score += 10
    else if (data.contributions === "occasionalInvolvement") score += 6
    else if (data.contributions === "minimalContributions") score += 3
    
    // Education (0-15 points)
    if (data.education === "studiedInSingapore") score += 15
    else if (data.education === "phdMasters") score += 12
    else if (data.education === "bachelors") score += 10
    else if (data.education === "diploma") score += 8
    else if (data.education === "secondary") score += 5
    
    // Ties to Singapore (0-15 points)
    if (data.tiesToSingapore === "propertyAndInvestments") score += 15
    else if (data.tiesToSingapore === "ownProperty") score += 12
    else if (data.tiesToSingapore === "longTermRental") score += 10
    else if (data.tiesToSingapore === "someTies") score += 6
    else if (data.tiesToSingapore === "minimalTies") score += 3
    
    // Language and Integration (0-15 points)
    if (data.languageIntegration === "excellentEnglishLocal") score += 15
    else if (data.languageIntegration === "fluentEnglish") score += 12
    else if (data.languageIntegration === "goodEnglish") score += 10
    else if (data.languageIntegration === "basicEnglish") score += 6
    else if (data.languageIntegration === "limitedEnglish") score += 3
    
    return Math.min(score, 100)
  }

  const getRecommendations = (score, data) => {
    const recommendations = []
    if (data.prStatus === "notPR") {
      recommendations.push(t("citizenshipAssessment.rec1"))
      recommendations.push(t("citizenshipAssessment.rec2"))
    } else if (score < 70) {
      recommendations.push(t("citizenshipAssessment.rec3"))
      recommendations.push(t("citizenshipAssessment.rec4"))
      recommendations.push(t("citizenshipAssessment.rec5"))
      recommendations.push(t("citizenshipAssessment.rec6"))
    } else {
      recommendations.push(t("citizenshipAssessment.rec7"))
      recommendations.push(t("citizenshipAssessment.rec8"))
      recommendations.push(t("citizenshipAssessment.rec9"))
      recommendations.push(t("citizenshipAssessment.rec10"))
    }
    return recommendations
  }

  return (
    <div className="pt-24">
      <PageHeader
        title={t("citizenshipAssessment.title")}
        subtitle={t("citizenshipAssessment.subtitle")}
        badge={t("citizenshipAssessment.badge")}
        icon={Shield}
      />

      <section className={skin.pageSectionPrimary}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-2 shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl">{t("citizenshipAssessment.assessment")}</CardTitle>
              <CardDescription className="text-base">
                {t("citizenshipAssessment.assessmentDesc")}
              </CardDescription>
              {/* Progress Indicator */}
              {currentStep?.type !== "result" && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {t("citizenshipAssessment.questionLabel")} {step} {t("citizenshipAssessment.of")} {totalSteps - 1}
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {Math.round((step / (totalSteps - 1)) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-brand-royal-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(step / (totalSteps - 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </CardHeader>
            <CardContent>
              {currentStep?.type === "result" ? (
                result && (
                  <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                      <h1 className="text-5xl font-bold mb-6">
                        <span className="text-gray-900">{t("citizenshipAssessment.resultsTitle")}</span>{' '}
                        <span className="text-brand-royal-700">{t("citizenshipAssessment.resultsTitleHighlight")}</span>
                      </h1>
                      <p className="text-xl text-gray-900 bg-brand-navy-50 px-6 py-3 rounded-lg inline-block">
                        {t("citizenshipAssessment.resultsSubtitle")}
                      </p>
                    </div>

                    {/* Main Result Card */}
                    <Card className="border shadow-none border-none mb-8">
                      <CardContent className="p-12">
                        <div className="text-center mb-8">
                          <div className={`w-24 h-24 ${result.eligible ? 'bg-green-100' : 'bg-orange-100'} rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-white shadow-lg`}>
                            <Award className="w-12 h-12 text-white" strokeWidth={0} fill="white" />
                          </div>
                          <h2 className={`text-3xl font-bold ${result.eligible ? 'text-green-600' : 'text-orange-600'} mb-2`}>
                            {result.score >= 80 ? t("citizenshipAssessment.strongProspects") : result.score >= 70 ? t("citizenshipAssessment.goodProspects") : result.score >= 50 ? t("citizenshipAssessment.moderateProspects") : t("citizenshipAssessment.limitedProspects")}
                          </h2>
                          <div className={`inline-block px-4 py-2 ${result.eligible ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'} rounded-full font-semibold`}>
                            {result.score >= 80 ? t("citizenshipAssessment.excellentProspects") : result.score >= 70 ? t("citizenshipAssessment.goodProspectsBadge") : result.score >= 50 ? t("citizenshipAssessment.fairProspects") : t("citizenshipAssessment.needsImprovement")}
                          </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-brand-royal-700 mb-2">
                              {result.score >= 80 ? t("citizenshipAssessment.timeline6to12") : result.score >= 70 ? t("citizenshipAssessment.timeline12to18") : result.score >= 50 ? t("citizenshipAssessment.timeline18to24") : t("citizenshipAssessment.timeline2plus")}
                            </div>
                            <div className="text-gray-600">{t("citizenshipAssessment.estimatedTimeline")}</div>
                          </div>
                          <div className="text-center">
                            <div className={`text-2xl font-bold ${result.eligible ? 'text-green-600' : 'text-orange-600'} mb-2`}>
                              {result.score >= 80 ? '90-95%' : result.score >= 70 ? '75-85%' : result.score >= 50 ? '50-70%' : '30-50%'}
                            </div>
                            <div className="text-gray-600">{t("citizenshipAssessment.successRateRange")}</div>
                          </div>
                        </div>

                        {/* Assessment Summary */}
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-xl font-semibold mb-3">{t("citizenshipAssessment.assessmentSummary")}</h3>
                            <p className="text-gray-600">
                              {result.score >= 80 
                                ? t("citizenshipAssessment.assessmentSummary80")
                                : result.score >= 70
                                ? t("citizenshipAssessment.assessmentSummary70")
                                : result.score >= 50
                                ? t("citizenshipAssessment.assessmentSummary50")
                                : t("citizenshipAssessment.assessmentSummaryLow")}
                            </p>
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold mb-3">{t("citizenshipAssessment.ourRecommendation")}</h3>
                            <p className="text-gray-600">
                              {result.score >= 80
                                ? t("citizenshipAssessment.recommendation80")
                                : result.score >= 70
                                ? t("citizenshipAssessment.recommendation70")
                                : result.score >= 50
                                ? t("citizenshipAssessment.recommendation50")
                                : t("citizenshipAssessment.recommendationLow")}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Next Steps and Important Notes */}
                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                      {/* Next Steps Card */}
                      <Card className="border-2 shadow-xl">
                        <CardHeader>
                          <CardTitle className="text-2xl font-semibold">{t("citizenshipAssessment.nextSteps")}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-brand-royal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                              <span className="text-white text-xs font-bold">1</span>
                            </div>
                            <div>
                              <div className="font-medium">{t("citizenshipAssessment.step1Title")}</div>
                              <div className="text-gray-600 text-sm">{t("citizenshipAssessment.step1Desc")}</div>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-brand-royal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                              <span className="text-white text-xs font-bold">2</span>
                            </div>
                            <div>
                              <div className="font-medium">{t("citizenshipAssessment.step2Title")}</div>
                              <div className="text-gray-600 text-sm">{t("citizenshipAssessment.step2Desc")}</div>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-brand-royal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                              <span className="text-white text-xs font-bold">3</span>
                            </div>
                            <div>
                              <div className="font-medium">{t("citizenshipAssessment.step3Title")}</div>
                              <div className="text-gray-600 text-sm">{t("citizenshipAssessment.step3Desc")}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Important Notes Card */}
                      <Card className="border-2 shadow-xl">
                        <CardHeader>
                          <CardTitle className="text-2xl font-semibold">{t("citizenshipAssessment.importantNotes")}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm text-gray-600">
                          <p>• {t("citizenshipAssessment.note1")}</p>
                          <p>• {t("citizenshipAssessment.note2")}</p>
                          <p>• {t("citizenshipAssessment.note3")}</p>
                          <p>• {t("citizenshipAssessment.note4")}</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Action Buttons */}
                    <div className="text-center mt-12">
                      <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/contact">
                          <Button size="lg" className="bg-gradient-to-r from-brand-navy-700 to-brand-royal-600 hover:from-brand-navy-800 hover:to-brand-royal-700 text-white px-8 shadow-lg hover:shadow-xl transition-all duration-300">
                            {t("citizenshipAssessment.scheduleFreeConsultation")}
                          </Button>
                        </Link>
                        <Button 
                          size="lg" 
                          variant="outline" 
                          onClick={() => {
                            setStep(1)
                            setFormData({
                              prStatus: "",
                              ageGroup: "",
                              maritalStatus: "",
                              childrenStatus: "",
                              residencyDuration: "",
                              employmentStatus: "",
                              monthlyIncome: "",
                              nationalService: "",
                              contributions: "",
                              education: "",
                              tiesToSingapore: "",
                              languageIntegration: ""
                            })
                            setResult(null)
                          }}
                          className="px-8 border-brand-royal-600 text-brand-royal-700 hover:bg-brand-royal-600 hover:text-white"
                        >
                          {t("citizenshipAssessment.retakeAssessment")}
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              ) : (
                <div className="space-y-6">
                  {/* Question 1: PR Status */}
                  {currentStep?.key === "prStatus" && (
                    <div>
                      <label className="block text-xl font-semibold text-gray-900 mb-6">
                        {t("citizenshipAssessment.question1")}
                      </label>
                      <div className="space-y-3">
                        {[
                          { value: "moreThan5", label: t("citizenshipAssessment.prMoreThan5") },
                          { value: "3-5", label: t("citizenshipAssessment.pr3to5") },
                          { value: "2-3", label: t("citizenshipAssessment.pr2to3") },
                          { value: "lessThan2", label: t("citizenshipAssessment.prLessThan2") },
                          { value: "notPR", label: t("citizenshipAssessment.notPR") }
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                              formData.prStatus === option.value
                                ? 'border-brand-royal-600 bg-brand-royal-50'
                                : 'border-gray-200 bg-white hover:border-brand-royal-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="prStatus"
                              value={option.value}
                              checked={formData.prStatus === option.value}
                              onChange={(e) => handleOptionSelect('prStatus', e.target.value)}
                              className="w-5 h-5 text-brand-royal-700 focus:ring-brand-royal-500"
                            />
                            <span className="ml-3 text-gray-900 font-medium text-lg">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Question 2: Age Group */}
                  {currentStep?.key === "ageGroup" && (
                    <div>
                      <label className="block text-xl font-semibold text-gray-900 mb-6">
                        {t("citizenshipAssessment.question2")}
                      </label>
                      <div className="space-y-3">
                        {[
                          { value: "21-25", label: t("citizenshipAssessment.age21to25") },
                          { value: "25-35", label: t("citizenshipAssessment.age25to35") },
                          { value: "35-45", label: t("citizenshipAssessment.age35to45") },
                          { value: "45-55", label: t("citizenshipAssessment.age45to55") },
                          { value: "above55", label: t("citizenshipAssessment.ageAbove55") }
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                              formData.ageGroup === option.value
                                ? 'border-brand-royal-600 bg-brand-royal-50'
                                : 'border-gray-200 bg-white hover:border-brand-royal-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="ageGroup"
                              value={option.value}
                              checked={formData.ageGroup === option.value}
                              onChange={(e) => handleOptionSelect('ageGroup', e.target.value)}
                              className="w-5 h-5 text-brand-royal-700 focus:ring-brand-royal-500"
                            />
                            <span className="ml-3 text-gray-900 font-medium text-lg">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Question 3: Marital Status */}
                  {currentStep?.key === "maritalStatus" && (
                    <div>
                      <label className="block text-xl font-semibold text-gray-900 mb-6">
                        {t("citizenshipAssessment.question3")}
                      </label>
                      <div className="space-y-3">
                        {[
                          { value: "marriedCitizen2plus", label: t("citizenshipAssessment.marriedCitizen2plus") },
                          { value: "marriedPR", label: t("citizenshipAssessment.marriedPR") },
                          { value: "single", label: t("citizenshipAssessment.single") },
                          { value: "marriedForeigner", label: t("citizenshipAssessment.marriedForeigner") }
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                              formData.maritalStatus === option.value
                                ? 'border-brand-royal-600 bg-brand-royal-50'
                                : 'border-gray-200 bg-white hover:border-brand-royal-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="maritalStatus"
                              value={option.value}
                              checked={formData.maritalStatus === option.value}
                              onChange={(e) => handleOptionSelect('maritalStatus', e.target.value)}
                              className="w-5 h-5 text-brand-royal-700 focus:ring-brand-royal-500"
                            />
                            <span className="ml-3 text-gray-900 font-medium text-lg">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Question 4: Children Status */}
                  {currentStep?.key === "childrenStatus" && (
                    <div>
                      <label className="block text-xl font-semibold text-gray-900 mb-6">
                        {t("citizenshipAssessment.question4")}
                      </label>
                      <div className="space-y-3">
                        {[
                          { value: "2plusCitizens", label: t("citizenshipAssessment.children2plusCitizens") },
                          { value: "1Citizen", label: t("citizenshipAssessment.children1Citizen") },
                          { value: "childrenPRs", label: t("citizenshipAssessment.childrenPRs") },
                          { value: "noChildren", label: t("citizenshipAssessment.noChildren") }
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                              formData.childrenStatus === option.value
                                ? 'border-brand-royal-600 bg-brand-royal-50'
                                : 'border-gray-200 bg-white hover:border-brand-royal-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="childrenStatus"
                              value={option.value}
                              checked={formData.childrenStatus === option.value}
                              onChange={(e) => handleOptionSelect('childrenStatus', e.target.value)}
                              className="w-5 h-5 text-brand-royal-700 focus:ring-brand-royal-500"
                            />
                            <span className="ml-3 text-gray-900 font-medium text-lg">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Question 5: Residency Duration */}
                  {currentStep?.key === "residencyDuration" && (
                    <div>
                      <label className="block text-xl font-semibold text-gray-900 mb-6">
                        {t("citizenshipAssessment.question5")}
                      </label>
                      <div className="space-y-3">
                        {[
                          { value: "moreThan10", label: t("citizenshipAssessment.residencyMoreThan10") },
                          { value: "7-10", label: t("citizenshipAssessment.residency7to10") },
                          { value: "5-7", label: t("citizenshipAssessment.residency5to7") },
                          { value: "3-5", label: t("citizenshipAssessment.residency3to5") },
                          { value: "lessThan3", label: t("citizenshipAssessment.residencyLessThan3") }
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                              formData.residencyDuration === option.value
                                ? 'border-brand-royal-600 bg-brand-royal-50'
                                : 'border-gray-200 bg-white hover:border-brand-royal-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="residencyDuration"
                              value={option.value}
                              checked={formData.residencyDuration === option.value}
                              onChange={(e) => handleOptionSelect('residencyDuration', e.target.value)}
                              className="w-5 h-5 text-brand-royal-700 focus:ring-brand-royal-500"
                            />
                            <span className="ml-3 text-gray-900 font-medium text-lg">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Question 6: Employment Status */}
                  {currentStep?.key === "employmentStatus" && (
                    <div>
                      <label className="block text-xl font-semibold text-gray-900 mb-6">
                        {t("citizenshipAssessment.question6")}
                      </label>
                      <div className="space-y-3">
                        {[
                          { value: "businessOwner", label: t("citizenshipAssessment.businessOwner") },
                          { value: "seniorExecutive", label: t("citizenshipAssessment.seniorExecutive") },
                          { value: "professional", label: t("citizenshipAssessment.professional") },
                          { value: "employed", label: t("citizenshipAssessment.employed") },
                          { value: "unemployed", label: t("citizenshipAssessment.unemployed") }
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                              formData.employmentStatus === option.value
                                ? 'border-brand-royal-600 bg-brand-royal-50'
                                : 'border-gray-200 bg-white hover:border-brand-royal-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="employmentStatus"
                              value={option.value}
                              checked={formData.employmentStatus === option.value}
                              onChange={(e) => handleOptionSelect('employmentStatus', e.target.value)}
                              className="w-5 h-5 text-brand-royal-700 focus:ring-brand-royal-500"
                            />
                            <span className="ml-3 text-gray-900 font-medium text-lg">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Question 7: Monthly Income */}
                  {currentStep?.key === "monthlyIncome" && (
                    <div>
                      <label className="block text-xl font-semibold text-gray-900 mb-6">
                        {t("citizenshipAssessment.question7")}
                      </label>
                      <div className="space-y-3">
                        {[
                          { value: "above20000", label: t("citizenshipAssessment.incomeAbove20000") },
                          { value: "10000-20000", label: t("citizenshipAssessment.income10000to20000") },
                          { value: "6000-10000", label: t("citizenshipAssessment.income6000to10000") },
                          { value: "4000-6000", label: t("citizenshipAssessment.income4000to6000") },
                          { value: "below4000", label: t("citizenshipAssessment.incomeBelow4000") }
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                              formData.monthlyIncome === option.value
                                ? 'border-brand-royal-600 bg-brand-royal-50'
                                : 'border-gray-200 bg-white hover:border-brand-royal-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="monthlyIncome"
                              value={option.value}
                              checked={formData.monthlyIncome === option.value}
                              onChange={(e) => handleOptionSelect('monthlyIncome', e.target.value)}
                              className="w-5 h-5 text-brand-royal-700 focus:ring-brand-royal-500"
                            />
                            <span className="ml-3 text-gray-900 font-medium text-lg">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Question 8: National Service */}
                  {currentStep?.key === "nationalService" && (
                    <div>
                      <label className="block text-xl font-semibold text-gray-900 mb-6">
                        {t("citizenshipAssessment.question8")}
                      </label>
                      <div className="space-y-3">
                        {[
                          { value: "completedNS", label: t("citizenshipAssessment.completedNS") },
                          { value: "willingToServe", label: t("citizenshipAssessment.willingToServeNS") },
                          { value: "female", label: t("citizenshipAssessment.femaleNS") },
                          { value: "exempted", label: t("citizenshipAssessment.exemptedNS") },
                          { value: "unwilling", label: t("citizenshipAssessment.unwillingNS") }
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                              formData.nationalService === option.value
                                ? 'border-brand-royal-600 bg-brand-royal-50'
                                : 'border-gray-200 bg-white hover:border-brand-royal-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="nationalService"
                              value={option.value}
                              checked={formData.nationalService === option.value}
                              onChange={(e) => handleOptionSelect('nationalService', e.target.value)}
                              className="w-5 h-5 text-brand-royal-700 focus:ring-brand-royal-500"
                            />
                            <span className="ml-3 text-gray-900 font-medium text-lg">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Question 9: Contributions */}
                  {currentStep?.key === "contributions" && (
                    <div>
                      <label className="block text-xl font-semibold text-gray-900 mb-6">
                        {t("citizenshipAssessment.question9")}
                      </label>
                      <div className="space-y-3">
                        {[
                          { value: "majorContributions", label: t("citizenshipAssessment.majorContributions") },
                          { value: "activeLeadership", label: t("citizenshipAssessment.activeLeadership") },
                          { value: "regularVolunteer", label: t("citizenshipAssessment.regularVolunteer") },
                          { value: "occasionalInvolvement", label: t("citizenshipAssessment.occasionalInvolvement") },
                          { value: "minimalContributions", label: t("citizenshipAssessment.minimalContributions") }
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                              formData.contributions === option.value
                                ? 'border-brand-royal-600 bg-brand-royal-50'
                                : 'border-gray-200 bg-white hover:border-brand-royal-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="contributions"
                              value={option.value}
                              checked={formData.contributions === option.value}
                              onChange={(e) => handleOptionSelect('contributions', e.target.value)}
                              className="w-5 h-5 text-brand-royal-700 focus:ring-brand-royal-500"
                            />
                            <span className="ml-3 text-gray-900 font-medium text-lg">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Question 10: Education */}
                  {currentStep?.key === "education" && (
                    <div>
                      <label className="block text-xl font-semibold text-gray-900 mb-6">
                        {t("citizenshipAssessment.question10")}
                      </label>
                      <div className="space-y-3">
                        {[
                          { value: "studiedInSingapore", label: t("citizenshipAssessment.studiedInSingapore") },
                          { value: "phdMasters", label: t("citizenshipAssessment.phdMasters") },
                          { value: "bachelors", label: t("citizenshipAssessment.bachelors") },
                          { value: "diploma", label: t("citizenshipAssessment.diploma") },
                          { value: "secondary", label: t("citizenshipAssessment.secondary") }
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                              formData.education === option.value
                                ? 'border-brand-royal-600 bg-brand-royal-50'
                                : 'border-gray-200 bg-white hover:border-brand-royal-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="education"
                              value={option.value}
                              checked={formData.education === option.value}
                              onChange={(e) => handleOptionSelect('education', e.target.value)}
                              className="w-5 h-5 text-brand-royal-700 focus:ring-brand-royal-500"
                            />
                            <span className="ml-3 text-gray-900 font-medium text-lg">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Question 11: Ties to Singapore */}
                  {currentStep?.key === "tiesToSingapore" && (
                    <div>
                      <label className="block text-xl font-semibold text-gray-900 mb-6">
                        {t("citizenshipAssessment.question11")}
                      </label>
                      <div className="space-y-3">
                        {[
                          { value: "propertyAndInvestments", label: t("citizenshipAssessment.propertyAndInvestments") },
                          { value: "ownProperty", label: t("citizenshipAssessment.ownProperty") },
                          { value: "longTermRental", label: t("citizenshipAssessment.longTermRental") },
                          { value: "someTies", label: t("citizenshipAssessment.someTies") },
                          { value: "minimalTies", label: t("citizenshipAssessment.minimalTies") }
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                              formData.tiesToSingapore === option.value
                                ? 'border-brand-royal-600 bg-brand-royal-50'
                                : 'border-gray-200 bg-white hover:border-brand-royal-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="tiesToSingapore"
                              value={option.value}
                              checked={formData.tiesToSingapore === option.value}
                              onChange={(e) => handleOptionSelect('tiesToSingapore', e.target.value)}
                              className="w-5 h-5 text-brand-royal-700 focus:ring-brand-royal-500"
                            />
                            <span className="ml-3 text-gray-900 font-medium text-lg">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Question 12: Language and Integration */}
                  {currentStep?.key === "languageIntegration" && (
                    <div>
                      <label className="block text-xl font-semibold text-gray-900 mb-6">
                        {t("citizenshipAssessment.question12")}
                      </label>
                      <div className="space-y-3">
                        {[
                          { value: "excellentEnglishLocal", label: t("citizenshipAssessment.excellentEnglishLocal") },
                          { value: "fluentEnglish", label: t("citizenshipAssessment.fluentEnglish") },
                          { value: "goodEnglish", label: t("citizenshipAssessment.goodEnglish") },
                          { value: "basicEnglish", label: t("citizenshipAssessment.basicEnglish") },
                          { value: "limitedEnglish", label: t("citizenshipAssessment.limitedEnglish") }
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                              formData.languageIntegration === option.value
                                ? 'border-brand-royal-600 bg-brand-royal-50'
                                : 'border-gray-200 bg-white hover:border-brand-royal-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="languageIntegration"
                              value={option.value}
                              checked={formData.languageIntegration === option.value}
                              onChange={(e) => handleOptionSelect('languageIntegration', e.target.value)}
                              className="w-5 h-5 text-brand-royal-700 focus:ring-brand-royal-500"
                            />
                            <span className="ml-3 text-gray-900 font-medium text-lg">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-6 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      disabled={step === 1}
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </Button>
                    {currentStep?.type !== "radio" && (
                      <Button
                        type="button"
                        onClick={handleNext}
                        disabled={step === totalSteps || (currentStep?.required && !formData[currentStep.key])}
                        className="flex items-center gap-2"
                      >
                        Next
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <section className={skin.assessmentBottomCta}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t("citizenshipAssessment.requirementsTitle")}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t("citizenshipAssessment.requirementsDesc")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: t("citizenshipAssessment.req1"), desc: t("citizenshipAssessment.req1Desc") },
              { title: t("citizenshipAssessment.req2"), desc: t("citizenshipAssessment.req2Desc") },
              { title: t("citizenshipAssessment.req3"), desc: t("citizenshipAssessment.req3Desc") },
              { title: t("citizenshipAssessment.req4"), desc: t("citizenshipAssessment.req4Desc") },
              { title: t("citizenshipAssessment.req5"), desc: t("citizenshipAssessment.req5Desc") },
              { title: t("citizenshipAssessment.req6"), desc: t("citizenshipAssessment.req6Desc") }
            ].map((item, idx) => (
              <Card key={idx} className="border-2">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

