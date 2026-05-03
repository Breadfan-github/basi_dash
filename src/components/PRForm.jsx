import { useTranslation } from "react-i18next"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { PhoneInput } from "./ui/phone-input"
import { Button } from "./ui/button"
import { FileText } from "lucide-react"

export default function PRForm({ formData, updateFormData, step, setStep, handleSubmit }) {
  const { t } = useTranslation()

  if (step === 2) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("application.fullName")} *
            </label>
            <Input
              value={formData.fullName}
              onChange={(e) => updateFormData('fullName', e.target.value)}
              placeholder={t("application.fullNamePlaceholder")}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("application.surname")} *
            </label>
            <Input
              value={formData.surname}
              onChange={(e) => updateFormData('surname', e.target.value)}
              placeholder={t("application.surnamePlaceholder")}
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("application.ethnicName")}
          </label>
          <Input
            value={formData.ethnicName}
            onChange={(e) => updateFormData('ethnicName', e.target.value)}
            placeholder={t("application.ethnicNamePlaceholder")}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("application.sex")} *
            </label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={formData.sex}
              onChange={(e) => updateFormData('sex', e.target.value)}
              required
            >
              <option value="">{t("application.selectSex")}</option>
              <option value="male">{t("application.male")}</option>
              <option value="female">{t("application.female")}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("application.maritalStatus")} *
            </label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={formData.maritalStatus}
              onChange={(e) => updateFormData('maritalStatus', e.target.value)}
              required
            >
              <option value="">{t("application.selectMaritalStatus")}</option>
              <option value="single">{t("application.single")}</option>
              <option value="married">{t("application.married")}</option>
              <option value="divorced">{t("application.divorced")}</option>
              <option value="widowed">{t("application.widowed")}</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("application.countryOfBirth")} *
            </label>
            <Input
              value={formData.countryOfBirth}
              onChange={(e) => updateFormData('countryOfBirth', e.target.value)}
              placeholder={t("application.countryOfBirthPlaceholder")}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("application.provinceOfBirth")}
            </label>
            <Input
              value={formData.provinceOfBirth}
              onChange={(e) => updateFormData('provinceOfBirth', e.target.value)}
              placeholder={t("application.provinceOfBirthPlaceholder")}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("application.dateOfBirth")} *
          </label>
          <Input
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
            required
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("application.race")} *
            </label>
            <Input
              value={formData.race}
              onChange={(e) => updateFormData('race', e.target.value)}
              placeholder={t("application.racePlaceholder")}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("application.religion")}
            </label>
            <Input
              value={formData.religion}
              onChange={(e) => updateFormData('religion', e.target.value)}
              placeholder={t("application.religionPlaceholder")}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("application.currentImmigrationStatus")} *
          </label>
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={formData.currentImmigrationStatus}
            onChange={(e) => updateFormData('currentImmigrationStatus', e.target.value)}
            required
          >
            <option value="">{t("application.selectImmigrationStatus")}</option>
            <option value="ep">{t("application.ep")}</option>
            <option value="pep">{t("application.pep")}</option>
            <option value="sp">{t("application.sp")}</option>
            <option value="entrepass">{t("application.entrepass")}</option>
            <option value="wp">{t("application.wp")}</option>
            <option value="dependant">{t("application.dependant")}</option>
            <option value="ltvp">{t("application.ltvp")}</option>
            <option value="student">{t("application.student")}</option>
            <option value="visitor">{t("application.visitor")}</option>
            <option value="workHoliday">{t("application.workHoliday")}</option>
            <option value="miscellaneous">{t("application.miscellaneous")}</option>
            <option value="pr">{t("application.pr")}</option>
            <option value="other">{t("application.other")}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("application.occupation")} *
          </label>
          <Input
            value={formData.occupation}
            onChange={(e) => updateFormData('occupation', e.target.value)}
            placeholder={t("application.occupationPlaceholder")}
            required
          />
        </div>
        <div className="border-t pt-4">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">{t("application.income")}</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("application.basicSalary")}
              </label>
              <Input
                type="number"
                value={formData.basicSalary}
                onChange={(e) => updateFormData('basicSalary', e.target.value)}
                placeholder={t("application.basicSalaryPlaceholder")}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("application.grossSalary")}
              </label>
              <Input
                type="number"
                value={formData.grossSalary}
                onChange={(e) => updateFormData('grossSalary', e.target.value)}
                placeholder={t("application.grossSalaryPlaceholder")}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("application.netSalary")}
              </label>
              <Input
                type="number"
                value={formData.netSalary}
                onChange={(e) => updateFormData('netSalary', e.target.value)}
                placeholder={t("application.netSalaryPlaceholder")}
              />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("application.fin")}
          </label>
          <Input
            value={formData.fin}
            onChange={(e) => updateFormData('fin', e.target.value)}
            placeholder={t("application.finPlaceholder")}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("application.nationalityCitizenship")} *
          </label>
          <Input
            value={formData.nationalityCitizenship}
            onChange={(e) => updateFormData('nationalityCitizenship', e.target.value)}
            placeholder={t("application.nationalityCitizenshipPlaceholder")}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("application.originIdNumber")}
          </label>
          <Input
            value={formData.originIdNumber}
            onChange={(e) => updateFormData('originIdNumber', e.target.value)}
            placeholder={t("application.originIdNumberPlaceholder")}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("application.passportNumber")} *
          </label>
          <Input
            value={formData.passportNumber}
            onChange={(e) => updateFormData('passportNumber', e.target.value)}
            placeholder={t("application.passportNumberPlaceholder")}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("application.passportDateOfIssue")} *
          </label>
          <Input
            type="date"
            value={formData.passportDateOfIssue}
            onChange={(e) => updateFormData('passportDateOfIssue', e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("application.otherNationality")} *
          </label>
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={formData.otherNationality}
            onChange={(e) => updateFormData('otherNationality', e.target.value)}
            required
          >
            <option value="">{t("application.selectYesNo")}</option>
            <option value="yes">{t("application.yes")}</option>
            <option value="no">{t("application.no")}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("application.overseasAddress")}
          </label>
          <Textarea
            value={formData.overseasAddress}
            onChange={(e) => updateFormData('overseasAddress', e.target.value)}
            placeholder={t("application.overseasAddressPlaceholder")}
            className="min-h-[80px]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("application.postalCode")}
          </label>
          <Input
            value={formData.postalCode}
            onChange={(e) => updateFormData('postalCode', e.target.value)}
            placeholder={t("application.postalCodePlaceholder")}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("application.singaporeAddress")} *
          </label>
          <Textarea
            value={formData.singaporeAddress}
            onChange={(e) => updateFormData('singaporeAddress', e.target.value)}
            placeholder={t("application.singaporeAddressPlaceholder")}
            className="min-h-[80px]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("application.idPhoto")} *
          </label>
          <div className="space-y-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  // Validate file size (max 5MB)
                  if (file.size > 5 * 1024 * 1024) {
                    alert(t("application.idPhotoSizeError") || "File size must be less than 5MB")
                    return
                  }
                  // Validate dimensions if possible (client-side check)
                  updateFormData('idPhoto', file)
                }
              }}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-brand-navy-50 file:text-brand-navy-800 hover:file:bg-brand-navy-100"
              required
            />
            {formData.idPhoto && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 mb-2">
                  {t("application.selected")}: {formData.idPhoto.name} ({(formData.idPhoto.size / 1024).toFixed(2)} KB)
                </p>
                <img 
                  src={URL.createObjectURL(formData.idPhoto)} 
                  alt="ID photo preview" 
                  className="w-32 h-40 object-cover border-2 border-gray-300 rounded"
                />
              </div>
            )}
            {/* Notes Section with Do's & Don'ts */}
            <div className="mt-4 p-4 bg-brand-navy-50 border border-brand-navy-200 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                {t("application.idPhotoNotes")}
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h5 className="text-xs font-semibold text-green-700 mb-2">
                    ✓ {t("application.idPhotoDos")}
                  </h5>
                  <ul className="text-xs text-gray-700 space-y-1 list-disc list-inside">
                    <li>{t("application.idPhotoDo1")}</li>
                    <li>{t("application.idPhotoDo2")}</li>
                    <li>{t("application.idPhotoDo3")}</li>
                    <li>{t("application.idPhotoDo4")}</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-xs font-semibold text-red-700 mb-2">
                    ✗ {t("application.idPhotoDonts")}
                  </h5>
                  <ul className="text-xs text-gray-700 space-y-1 list-disc list-inside">
                    <li>{t("application.idPhotoDont1")}</li>
                    <li>{t("application.idPhotoDont2")}</li>
                    <li>{t("application.idPhotoDont3")}</li>
                    <li>{t("application.idPhotoDont4")}</li>
              </ul>
                </div>
              </div>
              
              {/* YouTube Video */}
              <div className="mt-4">
                <p className="text-xs text-gray-600 mb-2">{t("application.watchTutorialVideo")}</p>
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full rounded"
                    src="https://www.youtube.com/embed/yAPR2xSIA7Q"
                    title="ID Photo Tutorial"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("application.email")} *
          </label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            placeholder={t("application.emailPlaceholder")}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("application.phone")} *
          </label>
          <PhoneInput
            value={formData.phone}
            onChange={(e) => updateFormData('phone', e.target.value)}
            placeholder="1234 5678"
            required
          />
        </div>
        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => setStep(1)}>
            {t("application.back")}
          </Button>
          <Button type="submit" size="lg">
            {t("application.next")}
            <FileText className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    )
  }

  if (step === 3) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("application.spouseFullName")}
            </label>
            <Input
              value={formData.spouseFullName}
              onChange={(e) => updateFormData('spouseFullName', e.target.value)}
              placeholder={t("application.spouseFullNamePlaceholder")}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("application.spouseSurname")}
            </label>
            <Input
              value={formData.spouseSurname}
              onChange={(e) => updateFormData('spouseSurname', e.target.value)}
              placeholder={t("application.spouseSurnamePlaceholder")}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("application.spouseEthnicName")}
          </label>
          <Input
            value={formData.spouseEthnicName}
            onChange={(e) => updateFormData('spouseEthnicName', e.target.value)}
            placeholder={t("application.spouseEthnicNamePlaceholder")}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("application.spouseNric")}
          </label>
          <Input
            value={formData.spouseNric}
            onChange={(e) => updateFormData('spouseNric', e.target.value)}
            placeholder={t("application.spouseNricPlaceholder")}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("application.spouseCitizenship")}
          </label>
          <Input
            value={formData.spouseCitizenship}
            onChange={(e) => updateFormData('spouseCitizenship', e.target.value)}
            placeholder={t("application.spouseCitizenshipPlaceholder")}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("application.spouseOccupation")}
          </label>
          <Input
            value={formData.spouseOccupation}
            onChange={(e) => updateFormData('spouseOccupation', e.target.value)}
            placeholder={t("application.spouseOccupationPlaceholder")}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("application.employerNameAddress")}
          </label>
          <Textarea
            value={formData.employerNameAddress}
            onChange={(e) => updateFormData('employerNameAddress', e.target.value)}
            placeholder={t("application.employerNameAddressPlaceholder")}
            className="min-h-[100px]"
          />
        </div>
        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => {
            setStep(2)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}>
            {t("application.back")}
          </Button>
          <Button type="submit" size="lg">
            {t("application.next")}
            <FileText className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    )
  }

  // PART III - Consent of Parent/Legal Guardian (for applicant under 16 years old)
  if (step === 4) {
    return (
      <div className="space-y-6">
        <div className="bg-brand-navy-50 p-4 rounded-lg border border-brand-navy-200 mb-4">
          <p className="text-sm text-gray-700 whitespace-pre-line break-words">
            {t("application.part3ConsentText") || "I, __________________________________________________, NRIC No._____________________, being the Parent/Legal Guardian**, consent to the application for Certificate of Identity by the applicant."}
          </p>
        </div>
        <div className="mb-4">
          <label className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              checked={formData.isUnder16 || false}
              onChange={(e) => updateFormData('isUnder16', e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium text-gray-700">
              {t("application.isUnder16") || "Is the applicant under 16 years old?"}
            </span>
          </label>
        </div>
        {(formData.isUnder16) && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("application.parentGuardianName") || "Parent/Legal Guardian Name"} *
                </label>
                <Input
                  value={formData.parentGuardianName || ''}
                  onChange={(e) => updateFormData('parentGuardianName', e.target.value)}
                  placeholder={t("application.parentGuardianNamePlaceholder") || "Enter parent/guardian name"}
                  required={formData.isUnder16}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t("application.parentGuardianNric") || "NRIC No."} *
                </label>
                <Input
                  value={formData.parentGuardianNric || ''}
                  onChange={(e) => updateFormData('parentGuardianNric', e.target.value)}
                  placeholder={t("application.parentGuardianNricPlaceholder") || "Enter NRIC number"}
                  required={formData.isUnder16}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t("application.parentGuardianConsentDate") || "Consent Date"} *
              </label>
              <Input
                type="date"
                value={formData.parentGuardianConsentDate || ''}
                onChange={(e) => updateFormData('parentGuardianConsentDate', e.target.value)}
                required={formData.isUnder16}
              />
            </div>
          </>
        )}
        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => {
            setStep(3)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}>
            {t("application.back")}
          </Button>
          <Button type="submit" size="lg">
            {t("application.next")}
            <FileText className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    )
  }

  // PART IV - Declaration
  if (step === 5) {
    return (
      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
          <p className="text-sm font-semibold text-gray-900 mb-2">
            {t("application.declarationTitle") || "I declare that:"}
          </p>
          <div className="text-sm text-gray-700 space-y-2 whitespace-pre-line">
            <p>
              <strong>(a)</strong> {t("application.declarationPartA") || "All information submitted in this application is true, accurate and complete to the best of my knowledge and belief. I understand that, if I have concealed relevant information or provided false, inaccurate or misleading information, I may be prosecuted and any facilities, rights or privileges granted under this application may be withdrawn."}
            </p>
            <p>
              <strong>(b)</strong> {t("application.declarationPartB") || "I do / The child** does not have any form of travel document issued by another government."}
            </p>
            <p>
              <strong>(c)</strong> {t("application.declarationPartC") || "I also here by give my consent for your department to obtain and verify information provided by me in respect of this application, from or with any source, as you deem appropriate for the purpose of assessment of my application for immigration facilities"}
            </p>
          </div>
        </div>
        <div className="mb-4">
          <label className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              checked={formData.isChildApplication || false}
              onChange={(e) => updateFormData('isChildApplication', e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium text-gray-700">
              {t("application.isChildApplication") || "Is this application for a child?"}
            </span>
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("application.declarationPartBQuestion") || "Do you have any form of travel document issued by another government?"} *
          </label>
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={formData.hasOtherTravelDocument || ''}
            onChange={(e) => updateFormData('hasOtherTravelDocument', e.target.value)}
            required
          >
            <option value="">{t("application.selectYesNo")}</option>
            <option value="no">{t("application.no")} - {t("application.declarationPartB")}</option>
            {formData.isChildApplication && (
              <option value="child">{t("application.declarationPartBChild") || "The child** does not have any form of travel document"}</option>
            )}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("application.declarationDate") || "Declaration Date"} *
          </label>
          <Input
            type="date"
            value={formData.declarationDate || ''}
            onChange={(e) => updateFormData('declarationDate', e.target.value)}
            required
          />
        </div>
        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => {
            setStep(4)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}>
            {t("application.back")}
          </Button>
          <Button type="submit" size="lg">
            {t("application.next")}
            <FileText className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    )
  }

  // PART V - Authorisation to a Representative
  if (step === 6) {
    return (
      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
          <p className="text-sm text-gray-700 whitespace-pre-line break-words word-wrap">
            {t("application.part5AuthorizationText") || "I, the undersigned, hereby authorize Mr/Mrs./Miss/Madam**___________________________________________________________NRIC No ___________________ to collect the Certificate of Identity on my/the child's** behalf."}
          </p>
        </div>
        <div className="mb-4">
          <label className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              checked={formData.isChildRepresentative || false}
              onChange={(e) => updateFormData('isChildRepresentative', e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm font-medium text-gray-700">
              {t("application.isChildRepresentative") || "Is this authorization for a child?"}
            </span>
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("application.representativeTitle") || "Title"} *
            </label>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={formData.representativeTitle || ''}
              onChange={(e) => updateFormData('representativeTitle', e.target.value)}
              required
            >
              <option value="">{t("application.selectTitle") || "Select title"}</option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Miss">Miss</option>
              <option value="Madam">Madam</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("application.representativeName") || "Representative Name"} *
            </label>
            <Input
              value={formData.representativeName || ''}
              onChange={(e) => updateFormData('representativeName', e.target.value)}
              placeholder={t("application.representativeNamePlaceholder") || "Enter representative name"}
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t("application.authorizationDate") || "Authorization Date"} *
          </label>
          <Input
            type="date"
            value={formData.authorizationDate || ''}
            onChange={(e) => updateFormData('authorizationDate', e.target.value)}
            required
          />
        </div>
        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => {
            setStep(5)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}>
            {t("application.back")}
          </Button>
          <Button type="submit" size="lg">
            {t("application.next")}
            <FileText className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    )
  }

  return null
}

