import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'
import { useState } from 'react'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'zh', name: '中文', flag: '🇨🇳' }
  ]

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Change language"
      >
        <Globe className="w-4 h-4 text-gray-700" />
        <span className="text-sm font-medium text-gray-700 hidden sm:inline">
         {currentLanguage.name}
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors flex items-center gap-2 ${
                  i18n.language === lang.code ? 'bg-brand-navy-50 text-brand-navy-700' : 'text-gray-700'
                }`}
              >
                <span>{lang.flag}</span>
                <span className="text-sm font-medium">{lang.name}</span>
                {i18n.language === lang.code && (
                  <span className="ml-auto text-brand-navy-700">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

