import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { CheckCircle2, AlertCircle, ArrowLeft, ArrowRight, Award, FileText, CircleCheck } from "lucide-react"
import { Link } from "react-router-dom"
import PageHeader from "../components/PageHeader"
import { useSiteTheme } from "../theme/ThemeProvider.jsx"
import { getHomeSkin } from "../theme/homeSkins.js"

export default function PRAssessment() {
  const { t } = useTranslation()
  const theme = useSiteTheme()
  const skin = getHomeSkin(theme.id)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    immigrationStatus: "",
    residencyDuration: "",
    education: "",
    monthlySalary: "",
    industry: "",
    jobLevel: "",
    familyMembers: "",
    contributions: "",
    ageGroup: "",
    certifications: ""
  })
  const [result, setResult] = useState(null)
  const [errors, setErrors] = useState({})

  // Get all steps
  const getSteps = () => {
    return [
      { id: 1, key: "immigrationStatus", type: "radio", required: true },
      { id: 2, key: "residencyDuration", type: "radio", required: true },
      { id: 3, key: "education", type: "radio", required: true },
      { id: 4, key: "monthlySalary", type: "radio", required: true },
      { id: 5, key: "industry", type: "radio", required: true },
      { id: 6, key: "jobLevel", type: "radio", required: true },
      { id: 7, key: "familyMembers", type: "radio", required: true },
      { id: 8, key: "contributions", type: "radio", required: true },
      { id: 9, key: "ageGroup", type: "radio", required: true },
      { id: 10, key: "certifications", type: "radio", required: true },
      { id: 11, key: "result", type: "result", required: false }
    ]
  }

  const steps = getSteps()
  const totalSteps = steps.length
  const currentStep = steps.find(s => s.id === step)

  // Calculate result when all fields are filled
  useEffect(() => {
    const allFieldsFilled = formData.immigrationStatus && formData.residencyDuration && formData.education && 
                            formData.monthlySalary && formData.industry && formData.jobLevel &&
                            formData.familyMembers && formData.contributions && formData.ageGroup && formData.certifications
    
    if (allFieldsFilled && step === totalSteps) {
      const score = calculateScore(formData)
      setResult({
        score,
        eligible: score >= 60,
        recommendations: getRecommendations(score, formData)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData, step])

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
    
    // Immigration Status (0-20 points)
    if (data.immigrationStatus === "spouseCitizen") score += 20
    else if (data.immigrationStatus === "spousePR") score += 18
    else if (data.immigrationStatus === "ep") score += 15
    else if (data.immigrationStatus === "techPass") score += 15
    else if (data.immigrationStatus === "sPass") score += 12
    else if (data.immigrationStatus === "dependentPass") score += 10
    else if (data.immigrationStatus === "studentPass") score += 8
    else if (data.immigrationStatus === "workPermit") score += 5

    // Residency Duration (0-15 points)
    if (data.residencyDuration === "moreThan8") score += 15
    else if (data.residencyDuration === "5-8") score += 12
    else if (data.residencyDuration === "3-5") score += 10
    else if (data.residencyDuration === "2-3") score += 7
    else if (data.residencyDuration === "lessThan2") score += 3

    // Education (0-15 points)
    if (data.education === "phd") score += 15
    else if (data.education === "masters") score += 12
    else if (data.education === "bachelorsTop") score += 10
    else if (data.education === "bachelors") score += 8
    else if (data.education === "diploma") score += 5
    else if (data.education === "secondary") score += 2

    // Monthly Salary (0-20 points)
    if (data.monthlySalary === "above25000") score += 20
    else if (data.monthlySalary === "15000-25000") score += 18
    else if (data.monthlySalary === "8000-15000") score += 15
    else if (data.monthlySalary === "5000-8000") score += 10
    else if (data.monthlySalary === "below5000") score += 5

    // Industry (0-10 points)
    if (data.industry === "tech") score += 10
    else if (data.industry === "banking") score += 10
    else if (data.industry === "healthcare") score += 9
    else if (data.industry === "engineering") score += 8
    else if (data.industry === "education") score += 7
    else if (data.industry === "legal") score += 8
    else if (data.industry === "other") score += 5

    // Job Level (0-15 points)
    if (data.jobLevel === "cLevel") score += 15
    else if (data.jobLevel === "seniorManager") score += 12
    else if (data.jobLevel === "manager") score += 10
    else if (data.jobLevel === "seniorSpecialist") score += 8
    else if (data.jobLevel === "specialist") score += 6
    else if (data.jobLevel === "junior") score += 3

    // Family Members (0-15 points)
    if (data.familyMembers === "spouseChildrenCitizens") score += 15
    else if (data.familyMembers === "spouseCitizen") score += 12
    else if (data.familyMembers === "spouseChildrenPRs") score += 10
    else if (data.familyMembers === "spousePR") score += 8
    else if (data.familyMembers === "childrenCitizens") score += 10
    else if (data.familyMembers === "parentsSiblings") score += 6
    else if (data.familyMembers === "noFamily") score += 2

    // Contributions (0-15 points)
    if (data.contributions === "majorEconomic") score += 15
    else if (data.contributions === "activeLeadership") score += 12
    else if (data.contributions === "professionalAwards") score += 10
    else if (data.contributions === "regularVolunteer") score += 8
    else if (data.contributions === "minimalInvolvement") score += 4
    else if (data.contributions === "noContributions") score += 0

    // Age Group (0-10 points)
    if (data.ageGroup === "25-35") score += 10
    else if (data.ageGroup === "21-25") score += 8
    else if (data.ageGroup === "35-45") score += 8
    else if (data.ageGroup === "45-55") score += 5
    else if (data.ageGroup === "above55") score += 2

    // Certifications (0-10 points)
    if (data.certifications === "multipleCertifications") score += 10
    else if (data.certifications === "industryCertification") score += 7
    else if (data.certifications === "multilingual") score += 5
    else if (data.certifications === "noQualifications") score += 0

    return Math.min(score, 100)
  }

  const getRecommendations = (score, data) => {
    const recommendations = []
    if (score < 60) {
      recommendations.push(t("prAssessment.rec1"))
      recommendations.push(t("prAssessment.rec2"))
      recommendations.push(t("prAssessment.rec3"))
    } else {
      recommendations.push(t("prAssessment.rec4"))
      recommendations.push(t("prAssessment.rec5"))
      recommendations.push(t("prAssessment.rec6"))
    }
    return recommendations
  }

  return (
    <div className="pt-24">
      <PageHeader
        title={t("prAssessment.title")}
        subtitle={t("prAssessment.subtitle")}
        badge={t("prAssessment.badge")}
        icon={FileText}
      />

      <section className={skin.pageSectionPrimary}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-2 shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl">{t("prAssessment.quickAssessment")}</CardTitle>
              <CardDescription className="text-base">
                {t("prAssessment.quickAssessmentDesc")}
              </CardDescription>
              {/* Progress Indicator */}
              {currentStep?.type !== "result" && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {t("prAssessment.questionLabel")} {step} {t("prAssessment.of")} {totalSteps - 1}
                    </span>
                    <span className="text-sm font-medium text-gray-700">
                      {Math.round((step / (totalSteps - 1)) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-brand-navy-600 h-2 rounded-full transition-all duration-300"
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
                        <span className="text-gray-900">{t("prAssessment.resultsTitle")}</span>{' '}
                        <span className="text-brand-navy-700">{t("prAssessment.resultsTitleHighlight")}</span>
                      </h1>
                      <p className="text-xl text-gray-900 bg-brand-navy-50 px-6 py-3 rounded-lg inline-block">
                        {t("prAssessment.resultsSubtitle")}
                      </p>
                    </div>

                    {/* Main Result Card */}
                    <Card className="border shadow-sm mb-8">
                      <CardContent className="p-12">
                        <div className="text-center mb-8">
                          <div className="w-24 h-24 bg-brand-navy-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CircleCheck className="w-12 h-12 text-brand-navy-700" strokeWidth={2.5} />
                          </div>
                          <h2 className="text-3xl font-bold text-brand-navy-700 mb-2">
                            {result.score >= 80 ? t("prAssessment.reasonableProspects") : result.score >= 70 ? t("prAssessment.reasonableProspects") : result.score >= 60 ? t("prAssessment.reasonableProspects") : t("prAssessment.limitedProspects")}
                          </h2>
                          <div className="inline-block px-4 py-2 bg-brand-navy-100 text-brand-navy-800 rounded-full font-semibold">
                            {t("prAssessment.goodProspectsBadge")}
                          </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-brand-navy-700 mb-2">
                              {result.score >= 80 ? t("prAssessment.timeline4to8") : result.score >= 70 ? t("prAssessment.timeline4to8") : result.score >= 60 ? t("prAssessment.timeline6to12") : t("prAssessment.timeline12to18")}
                            </div>
                            <div className="text-gray-600">{t("prAssessment.estimatedTimeline")}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-600 mb-2">
                              {result.score >= 80 ? '85-90%' : result.score >= 70 ? '85-90%' : result.score >= 60 ? '75-85%' : '50-70%'}
                            </div>
                            <div className="text-gray-600">{t("prAssessment.successRateRange")}</div>
                          </div>
                        </div>

                        {/* Assessment Summary */}
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-xl font-semibold mb-3">{t("prAssessment.assessmentSummary")}</h3>
                            <p className="text-gray-600">
                              {t("prAssessment.assessmentSummaryText")}
                            </p>
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold mb-3">{t("prAssessment.ourRecommendation")}</h3>
                            <p className="text-gray-600">
                              {t("prAssessment.recommendationText")}
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
                          <CardTitle className="text-2xl font-semibold">{t("prAssessment.nextSteps")}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-brand-navy-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                              <span className="text-white text-xs font-bold">1</span>
                            </div>
                            <div>
                              <div className="font-medium">{t("prAssessment.step1Title")}</div>
                              <div className="text-gray-600 text-sm">{t("prAssessment.step1Desc")}</div>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-brand-navy-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                              <span className="text-white text-xs font-bold">2</span>
                            </div>
                            <div>
                              <div className="font-medium">{t("prAssessment.step2Title")}</div>
                              <div className="text-gray-600 text-sm">{t("prAssessment.step2Desc")}</div>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-brand-navy-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                              <span className="text-white text-xs font-bold">3</span>
                            </div>
                            <div>
                              <div className="font-medium">{t("prAssessment.step3Title")}</div>
                              <div className="text-gray-600 text-sm">{t("prAssessment.step3Desc")}</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Important Notes Card */}
                      <Card className="border-2 shadow-xl">
                        <CardHeader>
                          <CardTitle className="text-2xl font-semibold">{t("prAssessment.importantNotes")}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm text-gray-600">
                          <p>• {t("prAssessment.note1")}</p>
                          <p>• {t("prAssessment.note2")}</p>
                          <p>• {t("prAssessment.note3")}</p>
                          <p>• {t("prAssessment.note4")}</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Action Buttons */}
                    <div className="text-center mt-12">
                      <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/contact">
                          <Button size="lg" className="bg-gradient-to-r from-brand-navy-700 to-brand-royal-600 hover:from-brand-navy-800 hover:to-brand-royal-700 text-white px-8 shadow-lg hover:shadow-xl transition-all duration-300">
                            {t("prAssessment.scheduleFreeConsultation")}
                          </Button>
                        </Link>
                        <Button 
                          size="lg" 
                          variant="outline" 
                          onClick={() => {
                            setStep(1)
                            setFormData({
                              immigrationStatus: "",
                              residencyDuration: "",
                              education: "",
                              monthlySalary: "",
                              industry: "",
                              jobLevel: "",
                              familyMembers: "",
                              contributions: "",
                              ageGroup: "",
                              certifications: ""
                            })
                            setResult(null)
                          }}
                          className="px-8 border-brand-navy-600 text-brand-navy-700 hover:bg-brand-navy-600 hover:text-white"
                        >
                          {t("prAssessment.retakeAssessment")}
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              ) : (
                <div className="space-y-6">
                  {/* Question 1: Immigration Status */}
                  {currentStep?.key === "immigrationStatus" && (
                    <div>
                      <label className="block text-xl font-semibold text-gray-900 mb-6">
                        {t("prAssessment.question1")}
                      </label>
                      <div className="space-y-3">
                        {[
                          { value: "ep", label: t("prAssessment.ep") },
                          { value: "sPass", label: t("prAssessment.sPass") },
                          { value: "workPermit", label: t("prAssessment.workPermit") },
                          { value: "studentPass", label: t("prAssessment.studentPass") },
                          { value: "dependentPass", label: t("prAssessment.dependentPass") },
                          { value: "spouseCitizen", label: t("prAssessment.spouseCitizen") },
                          { value: "spousePR", label: t("prAssessment.spousePR") },
                          { value: "techPass", label: t("prAssessment.techPass") }
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                              formData.immigrationStatus === option.value
                                ? 'border-brand-navy-600 bg-brand-navy-50'
                                : 'border-gray-200 bg-white hover:border-brand-navy-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="immigrationStatus"
                              value={option.value}
                              checked={formData.immigrationStatus === option.value}
                              onChange={(e) => handleOptionSelect('immigrationStatus', e.target.value)}
                              className="w-5 h-5 text-brand-navy-700 focus:ring-brand-navy-500"
                            />
                            <span className="ml-3 text-gray-900 font-medium text-lg">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Question 2: Residency Duration */}
                  {currentStep?.key === "residencyDuration" && (
                    <div>
                      <label className="block text-xl font-semibold text-gray-900 mb-6">
                        {t("prAssessment.question2")}
                      </label>
                      <div className="space-y-3">
                        {[
                          { value: "lessThan2", label: t("prAssessment.residencyLessThan2") },
                          { value: "2-3", label: t("prAssessment.residency2to3") },
                          { value: "3-5", label: t("prAssessment.residency3to5") },
                          { value: "5-8", label: t("prAssessment.residency5to8") },
                          { value: "moreThan8", label: t("prAssessment.residencyMoreThan8") }
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                              formData.residencyDuration === option.value
                                ? 'border-brand-navy-600 bg-brand-navy-50'
                                : 'border-gray-200 bg-white hover:border-brand-navy-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="residencyDuration"
                              value={option.value}
                              checked={formData.residencyDuration === option.value}
                              onChange={(e) => handleOptionSelect('residencyDuration', e.target.value)}
                              className="w-5 h-5 text-brand-navy-700 focus:ring-brand-navy-500"
                            />
                            <span className="ml-3 text-gray-900 font-medium text-lg">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Question 3: Education */}
                  {currentStep?.key === "education" && (
                    <div>
                      <label className="block text-xl font-semibold text-gray-900 mb-6">
                        {t("prAssessment.question3")}
                      </label>
                      <div className="space-y-3">
                        {[
                          { value: "phd", label: t("prAssessment.educationPhd") },
                          { value: "masters", label: t("prAssessment.educationMasters") },
                          { value: "bachelorsTop", label: t("prAssessment.educationBachelorsTop") },
                          { value: "bachelors", label: t("prAssessment.educationBachelors") },
                          { value: "diploma", label: t("prAssessment.educationDiploma") },
                          { value: "secondary", label: t("prAssessment.educationSecondary") }
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                              formData.education === option.value
                                ? 'border-brand-navy-600 bg-brand-navy-50'
                                : 'border-gray-200 bg-white hover:border-brand-navy-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="education"
                              value={option.value}
                              checked={formData.education === option.value}
                              onChange={(e) => handleOptionSelect('education', e.target.value)}
                              className="w-5 h-5 text-brand-navy-700 focus:ring-brand-navy-500"
                            />
                            <span className="ml-3 text-gray-900 font-medium text-lg">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Question 4: Monthly Salary */}
                  {currentStep?.key === "monthlySalary" && (
                    <div>
                      <label className="block text-xl font-semibold text-gray-900 mb-6">
                        {t("prAssessment.question4")}
                      </label>
                      <div className="space-y-3">
                        {[
                          { value: "above25000", label: t("prAssessment.salaryAbove25000") },
                          { value: "15000-25000", label: t("prAssessment.salary15000to25000") },
                          { value: "8000-15000", label: t("prAssessment.salary8000to15000") },
                          { value: "5000-8000", label: t("prAssessment.salary5000to8000") },
                          { value: "below5000", label: t("prAssessment.salaryBelow5000") }
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                              formData.monthlySalary === option.value
                                ? 'border-brand-navy-600 bg-brand-navy-50'
                                : 'border-gray-200 bg-white hover:border-brand-navy-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="monthlySalary"
                              value={option.value}
                              checked={formData.monthlySalary === option.value}
                              onChange={(e) => handleOptionSelect('monthlySalary', e.target.value)}
                              className="w-5 h-5 text-brand-navy-700 focus:ring-brand-navy-500"
                            />
                            <span className="ml-3 text-gray-900 font-medium text-lg">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Question 5: Industry */}
                  {currentStep?.key === "industry" && (
                    <div>
                      <label className="block text-xl font-semibold text-gray-900 mb-6">
                        {t("prAssessment.question5")}
                      </label>
                      <div className="space-y-3">
                        {[
                          { value: "tech", label: t("prAssessment.industryTech") },
                          { value: "banking", label: t("prAssessment.industryBanking") },
                          { value: "healthcare", label: t("prAssessment.industryHealthcare") },
                          { value: "engineering", label: t("prAssessment.industryEngineering") },
                          { value: "education", label: t("prAssessment.industryEducation") },
                          { value: "legal", label: t("prAssessment.industryLegal") },
                          { value: "other", label: t("prAssessment.industryOther") }
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                              formData.industry === option.value
                                ? 'border-brand-navy-600 bg-brand-navy-50'
                                : 'border-gray-200 bg-white hover:border-brand-navy-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="industry"
                              value={option.value}
                              checked={formData.industry === option.value}
                              onChange={(e) => handleOptionSelect('industry', e.target.value)}
                              className="w-5 h-5 text-brand-navy-700 focus:ring-brand-navy-500"
                            />
                            <span className="ml-3 text-gray-900 font-medium text-lg">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Question 6: Job Level */}
                  {currentStep?.key === "jobLevel" && (
                    <div>
                      <label className="block text-xl font-semibold text-gray-900 mb-6">
                        {t("prAssessment.question6")}
                      </label>
                      <div className="space-y-3">
                        {[
                          { value: "cLevel", label: t("prAssessment.jobLevelCLevel") },
                          { value: "seniorManager", label: t("prAssessment.jobLevelSeniorManager") },
                          { value: "manager", label: t("prAssessment.jobLevelManager") },
                          { value: "seniorSpecialist", label: t("prAssessment.jobLevelSeniorSpecialist") },
                          { value: "specialist", label: t("prAssessment.jobLevelSpecialist") },
                          { value: "junior", label: t("prAssessment.jobLevelJunior") }
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                              formData.jobLevel === option.value
                                ? 'border-brand-navy-600 bg-brand-navy-50'
                                : 'border-gray-200 bg-white hover:border-brand-navy-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="jobLevel"
                              value={option.value}
                              checked={formData.jobLevel === option.value}
                              onChange={(e) => handleOptionSelect('jobLevel', e.target.value)}
                              className="w-5 h-5 text-brand-navy-700 focus:ring-brand-navy-500"
                            />
                            <span className="ml-3 text-gray-900 font-medium text-lg">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Question 7: Family Members */}
                  {currentStep?.key === "familyMembers" && (
                    <div>
                      <label className="block text-xl font-semibold text-gray-900 mb-6">
                        {t("prAssessment.question7")}
                      </label>
                      <div className="space-y-3">
                        {[
                          { value: "spouseChildrenCitizens", label: t("prAssessment.familySpouseChildrenCitizens") },
                          { value: "spouseCitizen", label: t("prAssessment.familySpouseCitizen") },
                          { value: "spouseChildrenPRs", label: t("prAssessment.familySpouseChildrenPRs") },
                          { value: "spousePR", label: t("prAssessment.familySpousePR") },
                          { value: "childrenCitizens", label: t("prAssessment.familyChildrenCitizens") },
                          { value: "parentsSiblings", label: t("prAssessment.familyParentsSiblings") },
                          { value: "noFamily", label: t("prAssessment.familyNoFamily") }
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                              formData.familyMembers === option.value
                                ? 'border-brand-navy-600 bg-brand-navy-50'
                                : 'border-gray-200 bg-white hover:border-brand-navy-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="familyMembers"
                              value={option.value}
                              checked={formData.familyMembers === option.value}
                              onChange={(e) => handleOptionSelect('familyMembers', e.target.value)}
                              className="w-5 h-5 text-brand-navy-700 focus:ring-brand-navy-500"
                            />
                            <span className="ml-3 text-gray-900 font-medium text-lg">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Question 8: Contributions */}
                  {currentStep?.key === "contributions" && (
                    <div>
                      <label className="block text-xl font-semibold text-gray-900 mb-6">
                        {t("prAssessment.question8")}
                      </label>
                      <div className="space-y-3">
                        {[
                          { value: "majorEconomic", label: t("prAssessment.contributionsMajorEconomic") },
                          { value: "activeLeadership", label: t("prAssessment.contributionsActiveLeadership") },
                          { value: "professionalAwards", label: t("prAssessment.contributionsProfessionalAwards") },
                          { value: "regularVolunteer", label: t("prAssessment.contributionsRegularVolunteer") },
                          { value: "minimalInvolvement", label: t("prAssessment.contributionsMinimalInvolvement") },
                          { value: "noContributions", label: t("prAssessment.contributionsNoContributions") }
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                              formData.contributions === option.value
                                ? 'border-brand-navy-600 bg-brand-navy-50'
                                : 'border-gray-200 bg-white hover:border-brand-navy-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="contributions"
                              value={option.value}
                              checked={formData.contributions === option.value}
                              onChange={(e) => handleOptionSelect('contributions', e.target.value)}
                              className="w-5 h-5 text-brand-navy-700 focus:ring-brand-navy-500"
                            />
                            <span className="ml-3 text-gray-900 font-medium text-lg">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Question 9: Age Group */}
                  {currentStep?.key === "ageGroup" && (
                    <div>
                      <label className="block text-xl font-semibold text-gray-900 mb-6">
                        {t("prAssessment.question9")}
                      </label>
                      <div className="space-y-3">
                        {[
                          { value: "21-25", label: t("prAssessment.age21to25") },
                          { value: "25-35", label: t("prAssessment.age25to35") },
                          { value: "35-45", label: t("prAssessment.age35to45") },
                          { value: "45-55", label: t("prAssessment.age45to55") },
                          { value: "above55", label: t("prAssessment.ageAbove55") }
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                              formData.ageGroup === option.value
                                ? 'border-brand-navy-600 bg-brand-navy-50'
                                : 'border-gray-200 bg-white hover:border-brand-navy-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="ageGroup"
                              value={option.value}
                              checked={formData.ageGroup === option.value}
                              onChange={(e) => handleOptionSelect('ageGroup', e.target.value)}
                              className="w-5 h-5 text-brand-navy-700 focus:ring-brand-navy-500"
                            />
                            <span className="ml-3 text-gray-900 font-medium text-lg">{option.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Question 10: Certifications */}
                  {currentStep?.key === "certifications" && (
                    <div>
                      <label className="block text-xl font-semibold text-gray-900 mb-6">
                        {t("prAssessment.question10")}
                      </label>
                      <div className="space-y-3">
                        {[
                          { value: "multipleCertifications", label: t("prAssessment.certificationsMultiple") },
                          { value: "industryCertification", label: t("prAssessment.certificationsIndustry") },
                          { value: "multilingual", label: t("prAssessment.certificationsMultilingual") },
                          { value: "noQualifications", label: t("prAssessment.certificationsNone") }
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                              formData.certifications === option.value
                                ? 'border-brand-navy-600 bg-brand-navy-50'
                                : 'border-gray-200 bg-white hover:border-brand-navy-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="certifications"
                              value={option.value}
                              checked={formData.certifications === option.value}
                              onChange={(e) => handleOptionSelect('certifications', e.target.value)}
                              className="w-5 h-5 text-brand-navy-700 focus:ring-brand-navy-500"
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t("prAssessment.criteriaTitle")}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t("prAssessment.criteriaDesc")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: t("prAssessment.criteriaAge"), desc: t("prAssessment.criteriaAgeDesc") },
              { title: t("prAssessment.criteriaEducation"), desc: t("prAssessment.criteriaEducationDesc") },
              { title: t("prAssessment.criteriaSalary"), desc: t("prAssessment.criteriaSalaryDesc") },
              { title: t("prAssessment.criteriaExperience"), desc: t("prAssessment.criteriaExperienceDesc") },
              { title: t("prAssessment.criteriaFamily"), desc: t("prAssessment.criteriaFamilyDesc") },
              { title: t("prAssessment.criteriaIntegration"), desc: t("prAssessment.criteriaIntegrationDesc") }
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
