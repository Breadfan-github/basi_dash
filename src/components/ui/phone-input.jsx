import { useState, useEffect } from "react"
import { Input } from "./input"

const countries = [
  { code: "AF", dialCode: "+93", name: "Afghanistan", flag: "🇦🇫" },
  { code: "AL", dialCode: "+355", name: "Albania", flag: "🇦🇱" },
  { code: "DZ", dialCode: "+213", name: "Algeria", flag: "🇩🇿" },
  { code: "AS", dialCode: "+1-684", name: "American Samoa", flag: "🇦🇸" },
  { code: "AD", dialCode: "+376", name: "Andorra", flag: "🇦🇩" },
  { code: "AO", dialCode: "+244", name: "Angola", flag: "🇦🇴" },
  { code: "AI", dialCode: "+1-264", name: "Anguilla", flag: "🇦🇮" },
  { code: "AG", dialCode: "+1-268", name: "Antigua and Barbuda", flag: "🇦🇬" },
  { code: "AR", dialCode: "+54", name: "Argentina", flag: "🇦🇷" },
  { code: "AM", dialCode: "+374", name: "Armenia", flag: "🇦🇲" },
  { code: "AW", dialCode: "+297", name: "Aruba", flag: "🇦🇼" },
  { code: "AU", dialCode: "+61", name: "Australia", flag: "🇦🇺" },
  { code: "AT", dialCode: "+43", name: "Austria", flag: "🇦🇹" },
  { code: "AZ", dialCode: "+994", name: "Azerbaijan", flag: "🇦🇿" },
  { code: "BS", dialCode: "+1-242", name: "Bahamas", flag: "🇧🇸" },
  { code: "BH", dialCode: "+973", name: "Bahrain", flag: "🇧🇭" },
  { code: "BD", dialCode: "+880", name: "Bangladesh", flag: "🇧🇩" },
  { code: "BB", dialCode: "+1-246", name: "Barbados", flag: "🇧🇧" },
  { code: "BY", dialCode: "+375", name: "Belarus", flag: "🇧🇾" },
  { code: "BE", dialCode: "+32", name: "Belgium", flag: "🇧🇪" },
  { code: "BZ", dialCode: "+501", name: "Belize", flag: "🇧🇿" },
  { code: "BJ", dialCode: "+229", name: "Benin", flag: "🇧🇯" },
  { code: "BM", dialCode: "+1-441", name: "Bermuda", flag: "🇧🇲" },
  { code: "BT", dialCode: "+975", name: "Bhutan", flag: "🇧🇹" },
  { code: "BO", dialCode: "+591", name: "Bolivia", flag: "🇧🇴" },
  { code: "BA", dialCode: "+387", name: "Bosnia and Herzegovina", flag: "🇧🇦" },
  { code: "BW", dialCode: "+267", name: "Botswana", flag: "🇧🇼" },
  { code: "BR", dialCode: "+55", name: "Brazil", flag: "🇧🇷" },
  { code: "BN", dialCode: "+673", name: "Brunei", flag: "🇧🇳" },
  { code: "BG", dialCode: "+359", name: "Bulgaria", flag: "🇧🇬" },
  { code: "BF", dialCode: "+226", name: "Burkina Faso", flag: "🇧🇫" },
  { code: "BI", dialCode: "+257", name: "Burundi", flag: "🇧🇮" },
  { code: "KH", dialCode: "+855", name: "Cambodia", flag: "🇰🇭" },
  { code: "CM", dialCode: "+237", name: "Cameroon", flag: "🇨🇲" },
  { code: "CA", dialCode: "+1", name: "Canada", flag: "🇨🇦" },
  { code: "CV", dialCode: "+238", name: "Cape Verde", flag: "🇨🇻" },
  { code: "KY", dialCode: "+1-345", name: "Cayman Islands", flag: "🇰🇾" },
  { code: "CF", dialCode: "+236", name: "Central African Republic", flag: "🇨🇫" },
  { code: "TD", dialCode: "+235", name: "Chad", flag: "🇹🇩" },
  { code: "CL", dialCode: "+56", name: "Chile", flag: "🇨🇱" },
  { code: "CN", dialCode: "+86", name: "China", flag: "🇨🇳" },
  { code: "CO", dialCode: "+57", name: "Colombia", flag: "🇨🇴" },
  { code: "KM", dialCode: "+269", name: "Comoros", flag: "🇰🇲" },
  { code: "CG", dialCode: "+242", name: "Congo", flag: "🇨🇬" },
  { code: "CD", dialCode: "+243", name: "Congo (DRC)", flag: "🇨🇩" },
  { code: "CR", dialCode: "+506", name: "Costa Rica", flag: "🇨🇷" },
  { code: "HR", dialCode: "+385", name: "Croatia", flag: "🇭🇷" },
  { code: "CU", dialCode: "+53", name: "Cuba", flag: "🇨🇺" },
  { code: "CY", dialCode: "+357", name: "Cyprus", flag: "🇨🇾" },
  { code: "CZ", dialCode: "+420", name: "Czech Republic", flag: "🇨🇿" },
  { code: "DK", dialCode: "+45", name: "Denmark", flag: "🇩🇰" },
  { code: "DJ", dialCode: "+253", name: "Djibouti", flag: "🇩🇯" },
  { code: "DM", dialCode: "+1-767", name: "Dominica", flag: "🇩🇲" },
  { code: "DO", dialCode: "+1-809", name: "Dominican Republic", flag: "🇩🇴" },
  { code: "EC", dialCode: "+593", name: "Ecuador", flag: "🇪🇨" },
  { code: "EG", dialCode: "+20", name: "Egypt", flag: "🇪🇬" },
  { code: "SV", dialCode: "+503", name: "El Salvador", flag: "🇸🇻" },
  { code: "GQ", dialCode: "+240", name: "Equatorial Guinea", flag: "🇬🇶" },
  { code: "ER", dialCode: "+291", name: "Eritrea", flag: "🇪🇷" },
  { code: "EE", dialCode: "+372", name: "Estonia", flag: "🇪🇪" },
  { code: "ET", dialCode: "+251", name: "Ethiopia", flag: "🇪🇹" },
  { code: "FJ", dialCode: "+679", name: "Fiji", flag: "🇫🇯" },
  { code: "FI", dialCode: "+358", name: "Finland", flag: "🇫🇮" },
  { code: "FR", dialCode: "+33", name: "France", flag: "🇫🇷" },
  { code: "GA", dialCode: "+241", name: "Gabon", flag: "🇬🇦" },
  { code: "GM", dialCode: "+220", name: "Gambia", flag: "🇬🇲" },
  { code: "GE", dialCode: "+995", name: "Georgia", flag: "🇬🇪" },
  { code: "DE", dialCode: "+49", name: "Germany", flag: "🇩🇪" },
  { code: "GH", dialCode: "+233", name: "Ghana", flag: "🇬🇭" },
  { code: "GR", dialCode: "+30", name: "Greece", flag: "🇬🇷" },
  { code: "GD", dialCode: "+1-473", name: "Grenada", flag: "🇬🇩" },
  { code: "GU", dialCode: "+1-671", name: "Guam", flag: "🇬🇺" },
  { code: "GT", dialCode: "+502", name: "Guatemala", flag: "🇬🇹" },
  { code: "GN", dialCode: "+224", name: "Guinea", flag: "🇬🇳" },
  { code: "GW", dialCode: "+245", name: "Guinea-Bissau", flag: "🇬🇼" },
  { code: "GY", dialCode: "+592", name: "Guyana", flag: "🇬🇾" },
  { code: "HT", dialCode: "+509", name: "Haiti", flag: "🇭🇹" },
  { code: "HN", dialCode: "+504", name: "Honduras", flag: "🇭🇳" },
  { code: "HK", dialCode: "+852", name: "Hong Kong", flag: "🇭🇰" },
  { code: "HU", dialCode: "+36", name: "Hungary", flag: "🇭🇺" },
  { code: "IS", dialCode: "+354", name: "Iceland", flag: "🇮🇸" },
  { code: "IN", dialCode: "+91", name: "India", flag: "🇮🇳" },
  { code: "ID", dialCode: "+62", name: "Indonesia", flag: "🇮🇩" },
  { code: "IR", dialCode: "+98", name: "Iran", flag: "🇮🇷" },
  { code: "IQ", dialCode: "+964", name: "Iraq", flag: "🇮🇶" },
  { code: "IE", dialCode: "+353", name: "Ireland", flag: "🇮🇪" },
  { code: "IL", dialCode: "+972", name: "Israel", flag: "🇮🇱" },
  { code: "IT", dialCode: "+39", name: "Italy", flag: "🇮🇹" },
  { code: "JM", dialCode: "+1-876", name: "Jamaica", flag: "🇯🇲" },
  { code: "JP", dialCode: "+81", name: "Japan", flag: "🇯🇵" },
  { code: "JO", dialCode: "+962", name: "Jordan", flag: "🇯🇴" },
  { code: "KZ", dialCode: "+7", name: "Kazakhstan", flag: "🇰🇿" },
  { code: "KE", dialCode: "+254", name: "Kenya", flag: "🇰🇪" },
  { code: "KW", dialCode: "+965", name: "Kuwait", flag: "🇰🇼" },
  { code: "KG", dialCode: "+996", name: "Kyrgyzstan", flag: "🇰🇬" },
  { code: "LA", dialCode: "+856", name: "Laos", flag: "🇱🇦" },
  { code: "LV", dialCode: "+371", name: "Latvia", flag: "🇱🇻" },
  { code: "LB", dialCode: "+961", name: "Lebanon", flag: "🇱🇧" },
  { code: "LS", dialCode: "+266", name: "Lesotho", flag: "🇱🇸" },
  { code: "LR", dialCode: "+231", name: "Liberia", flag: "🇱🇷" },
  { code: "LY", dialCode: "+218", name: "Libya", flag: "🇱🇾" },
  { code: "LI", dialCode: "+423", name: "Liechtenstein", flag: "🇱🇮" },
  { code: "LT", dialCode: "+370", name: "Lithuania", flag: "🇱🇹" },
  { code: "LU", dialCode: "+352", name: "Luxembourg", flag: "🇱🇺" },
  { code: "MO", dialCode: "+853", name: "Macau", flag: "🇲🇴" },
  { code: "MK", dialCode: "+389", name: "Macedonia", flag: "🇲🇰" },
  { code: "MG", dialCode: "+261", name: "Madagascar", flag: "🇲🇬" },
  { code: "MW", dialCode: "+265", name: "Malawi", flag: "🇲🇼" },
  { code: "MY", dialCode: "+60", name: "Malaysia", flag: "🇲🇾" },
  { code: "MV", dialCode: "+960", name: "Maldives", flag: "🇲🇻" },
  { code: "ML", dialCode: "+223", name: "Mali", flag: "🇲🇱" },
  { code: "MT", dialCode: "+356", name: "Malta", flag: "🇲🇹" },
  { code: "MH", dialCode: "+692", name: "Marshall Islands", flag: "🇲🇭" },
  { code: "MR", dialCode: "+222", name: "Mauritania", flag: "🇲🇷" },
  { code: "MU", dialCode: "+230", name: "Mauritius", flag: "🇲🇺" },
  { code: "MX", dialCode: "+52", name: "Mexico", flag: "🇲🇽" },
  { code: "FM", dialCode: "+691", name: "Micronesia", flag: "🇫🇲" },
  { code: "MD", dialCode: "+373", name: "Moldova", flag: "🇲🇩" },
  { code: "MC", dialCode: "+377", name: "Monaco", flag: "🇲🇨" },
  { code: "MN", dialCode: "+976", name: "Mongolia", flag: "🇲🇳" },
  { code: "ME", dialCode: "+382", name: "Montenegro", flag: "🇲🇪" },
  { code: "MA", dialCode: "+212", name: "Morocco", flag: "🇲🇦" },
  { code: "MZ", dialCode: "+258", name: "Mozambique", flag: "🇲🇿" },
  { code: "MM", dialCode: "+95", name: "Myanmar", flag: "🇲🇲" },
  { code: "NA", dialCode: "+264", name: "Namibia", flag: "🇳🇦" },
  { code: "NP", dialCode: "+977", name: "Nepal", flag: "🇳🇵" },
  { code: "NL", dialCode: "+31", name: "Netherlands", flag: "🇳🇱" },
  { code: "NZ", dialCode: "+64", name: "New Zealand", flag: "🇳🇿" },
  { code: "NI", dialCode: "+505", name: "Nicaragua", flag: "🇳🇮" },
  { code: "NE", dialCode: "+227", name: "Niger", flag: "🇳🇪" },
  { code: "NG", dialCode: "+234", name: "Nigeria", flag: "🇳🇬" },
  { code: "NO", dialCode: "+47", name: "Norway", flag: "🇳🇴" },
  { code: "OM", dialCode: "+968", name: "Oman", flag: "🇴🇲" },
  { code: "PK", dialCode: "+92", name: "Pakistan", flag: "🇵🇰" },
  { code: "PW", dialCode: "+680", name: "Palau", flag: "🇵🇼" },
  { code: "PS", dialCode: "+970", name: "Palestine", flag: "🇵🇸" },
  { code: "PA", dialCode: "+507", name: "Panama", flag: "🇵🇦" },
  { code: "PG", dialCode: "+675", name: "Papua New Guinea", flag: "🇵🇬" },
  { code: "PY", dialCode: "+595", name: "Paraguay", flag: "🇵🇾" },
  { code: "PE", dialCode: "+51", name: "Peru", flag: "🇵🇪" },
  { code: "PH", dialCode: "+63", name: "Philippines", flag: "🇵🇭" },
  { code: "PL", dialCode: "+48", name: "Poland", flag: "🇵🇱" },
  { code: "PT", dialCode: "+351", name: "Portugal", flag: "🇵🇹" },
  { code: "PR", dialCode: "+1-787", name: "Puerto Rico", flag: "🇵🇷" },
  { code: "QA", dialCode: "+974", name: "Qatar", flag: "🇶🇦" },
  { code: "RO", dialCode: "+40", name: "Romania", flag: "🇷🇴" },
  { code: "RU", dialCode: "+7", name: "Russia", flag: "🇷🇺" },
  { code: "RW", dialCode: "+250", name: "Rwanda", flag: "🇷🇼" },
  { code: "KN", dialCode: "+1-869", name: "Saint Kitts and Nevis", flag: "🇰🇳" },
  { code: "LC", dialCode: "+1-758", name: "Saint Lucia", flag: "🇱🇨" },
  { code: "VC", dialCode: "+1-784", name: "Saint Vincent", flag: "🇻🇨" },
  { code: "WS", dialCode: "+685", name: "Samoa", flag: "🇼🇸" },
  { code: "SM", dialCode: "+378", name: "San Marino", flag: "🇸🇲" },
  { code: "ST", dialCode: "+239", name: "Sao Tome and Principe", flag: "🇸🇹" },
  { code: "SA", dialCode: "+966", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "SN", dialCode: "+221", name: "Senegal", flag: "🇸🇳" },
  { code: "RS", dialCode: "+381", name: "Serbia", flag: "🇷🇸" },
  { code: "SC", dialCode: "+248", name: "Seychelles", flag: "🇸🇨" },
  { code: "SL", dialCode: "+232", name: "Sierra Leone", flag: "🇸🇱" },
  { code: "SG", dialCode: "+65", name: "Singapore", flag: "🇸🇬" },
  { code: "SK", dialCode: "+421", name: "Slovakia", flag: "🇸🇰" },
  { code: "SI", dialCode: "+386", name: "Slovenia", flag: "🇸🇮" },
  { code: "SB", dialCode: "+677", name: "Solomon Islands", flag: "🇸🇧" },
  { code: "SO", dialCode: "+252", name: "Somalia", flag: "🇸🇴" },
  { code: "ZA", dialCode: "+27", name: "South Africa", flag: "🇿🇦" },
  { code: "KR", dialCode: "+82", name: "South Korea", flag: "🇰🇷" },
  { code: "SS", dialCode: "+211", name: "South Sudan", flag: "🇸🇸" },
  { code: "ES", dialCode: "+34", name: "Spain", flag: "🇪🇸" },
  { code: "LK", dialCode: "+94", name: "Sri Lanka", flag: "🇱🇰" },
  { code: "SD", dialCode: "+249", name: "Sudan", flag: "🇸🇩" },
  { code: "SR", dialCode: "+597", name: "Suriname", flag: "🇸🇷" },
  { code: "SZ", dialCode: "+268", name: "Swaziland", flag: "🇸🇿" },
  { code: "SE", dialCode: "+46", name: "Sweden", flag: "🇸🇪" },
  { code: "CH", dialCode: "+41", name: "Switzerland", flag: "🇨🇭" },
  { code: "SY", dialCode: "+963", name: "Syria", flag: "🇸🇾" },
  { code: "TW", dialCode: "+886", name: "Taiwan", flag: "🇹🇼" },
  { code: "TJ", dialCode: "+992", name: "Tajikistan", flag: "🇹🇯" },
  { code: "TZ", dialCode: "+255", name: "Tanzania", flag: "🇹🇿" },
  { code: "TH", dialCode: "+66", name: "Thailand", flag: "🇹🇭" },
  { code: "TL", dialCode: "+670", name: "Timor-Leste", flag: "🇹🇱" },
  { code: "TG", dialCode: "+228", name: "Togo", flag: "🇹🇬" },
  { code: "TO", dialCode: "+676", name: "Tonga", flag: "🇹🇴" },
  { code: "TT", dialCode: "+1-868", name: "Trinidad and Tobago", flag: "🇹🇹" },
  { code: "TN", dialCode: "+216", name: "Tunisia", flag: "🇹🇳" },
  { code: "TR", dialCode: "+90", name: "Turkey", flag: "🇹🇷" },
  { code: "TM", dialCode: "+993", name: "Turkmenistan", flag: "🇹🇲" },
  { code: "TV", dialCode: "+688", name: "Tuvalu", flag: "🇹🇻" },
  { code: "UG", dialCode: "+256", name: "Uganda", flag: "🇺🇬" },
  { code: "UA", dialCode: "+380", name: "Ukraine", flag: "🇺🇦" },
  { code: "AE", dialCode: "+971", name: "United Arab Emirates", flag: "🇦🇪" },
  { code: "GB", dialCode: "+44", name: "United Kingdom", flag: "🇬🇧" },
  { code: "US", dialCode: "+1", name: "United States", flag: "🇺🇸" },
  { code: "UY", dialCode: "+598", name: "Uruguay", flag: "🇺🇾" },
  { code: "UZ", dialCode: "+998", name: "Uzbekistan", flag: "🇺🇿" },
  { code: "VU", dialCode: "+678", name: "Vanuatu", flag: "🇻🇺" },
  { code: "VA", dialCode: "+379", name: "Vatican City", flag: "🇻🇦" },
  { code: "VE", dialCode: "+58", name: "Venezuela", flag: "🇻🇪" },
  { code: "VN", dialCode: "+84", name: "Vietnam", flag: "🇻🇳" },
  { code: "YE", dialCode: "+967", name: "Yemen", flag: "🇾🇪" },
  { code: "ZM", dialCode: "+260", name: "Zambia", flag: "🇿🇲" },
  { code: "ZW", dialCode: "+263", name: "Zimbabwe", flag: "🇿🇼" },
]

// Auto-detect country based on timezone
const detectCountry = () => {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    
    // Map common timezones to countries
    const timezoneMap = {
      // Asia
      "Asia/Singapore": "SG",
      "Asia/Tokyo": "JP",
      "Asia/Shanghai": "CN",
      "Asia/Hong_Kong": "HK",
      "Asia/Taipei": "TW",
      "Asia/Seoul": "KR",
      "Asia/Kuala_Lumpur": "MY",
      "Asia/Jakarta": "ID",
      "Asia/Bangkok": "TH",
      "Asia/Manila": "PH",
      "Asia/Ho_Chi_Minh": "VN",
      "Asia/Kolkata": "IN",
      "Asia/Dubai": "AE",
      "Asia/Riyadh": "SA",
      "Asia/Karachi": "PK",
      "Asia/Dhaka": "BD",
      "Asia/Kathmandu": "NP",
      "Asia/Yangon": "MM",
      "Asia/Colombo": "LK",
      "Asia/Tehran": "IR",
      "Asia/Baghdad": "IQ",
      "Asia/Jerusalem": "IL",
      "Asia/Beirut": "LB",
      "Asia/Kabul": "AF",
      "Asia/Tashkent": "UZ",
      "Asia/Almaty": "KZ",
      "Asia/Baku": "AZ",
      "Asia/Yerevan": "AM",
      "Asia/Tbilisi": "GE",
      "Asia/Amman": "JO",
      "Asia/Damascus": "SY",
      "Asia/Kuwait": "KW",
      "Asia/Bahrain": "BH",
      "Asia/Muscat": "OM",
      "Asia/Qatar": "QA",
      // Australia & Pacific
      "Australia/Sydney": "AU",
      "Australia/Melbourne": "AU",
      "Australia/Brisbane": "AU",
      "Australia/Perth": "AU",
      "Pacific/Auckland": "NZ",
      "Pacific/Fiji": "FJ",
      "Pacific/Guam": "GU",
      "Pacific/Honolulu": "US",
      // Americas
      "America/New_York": "US",
      "America/Los_Angeles": "US",
      "America/Chicago": "US",
      "America/Denver": "US",
      "America/Phoenix": "US",
      "America/Toronto": "CA",
      "America/Vancouver": "CA",
      "America/Montreal": "CA",
      "America/Mexico_City": "MX",
      "America/Sao_Paulo": "BR",
      "America/Buenos_Aires": "AR",
      "America/Santiago": "CL",
      "America/Lima": "PE",
      "America/Bogota": "CO",
      "America/Caracas": "VE",
      "America/Panama": "PA",
      "America/Costa_Rica": "CR",
      "America/Jamaica": "JM",
      "America/Havana": "CU",
      // Europe
      "Europe/London": "GB",
      "Europe/Paris": "FR",
      "Europe/Berlin": "DE",
      "Europe/Rome": "IT",
      "Europe/Madrid": "ES",
      "Europe/Amsterdam": "NL",
      "Europe/Brussels": "BE",
      "Europe/Vienna": "AT",
      "Europe/Zurich": "CH",
      "Europe/Stockholm": "SE",
      "Europe/Copenhagen": "DK",
      "Europe/Oslo": "NO",
      "Europe/Helsinki": "FI",
      "Europe/Warsaw": "PL",
      "Europe/Prague": "CZ",
      "Europe/Budapest": "HU",
      "Europe/Bucharest": "RO",
      "Europe/Athens": "GR",
      "Europe/Istanbul": "TR",
      "Europe/Moscow": "RU",
      "Europe/Kiev": "UA",
      "Europe/Dublin": "IE",
      "Europe/Lisbon": "PT",
      // Africa
      "Africa/Cairo": "EG",
      "Africa/Johannesburg": "ZA",
      "Africa/Lagos": "NG",
      "Africa/Nairobi": "KE",
      "Africa/Casablanca": "MA",
      "Africa/Algiers": "DZ",
      "Africa/Tunis": "TN",
      "Africa/Accra": "GH",
      "Africa/Addis_Ababa": "ET",
      "Africa/Dar_es_Salaam": "TZ",
    }
    
    const detectedCode = timezoneMap[timezone]
    if (detectedCode) {
      return countries.find(c => c.code === detectedCode) || countries.find(c => c.code === "SG")
    }
  } catch (error) {
    console.log("Could not detect timezone")
  }
  
  // Default to Singapore
  return countries.find(c => c.code === "SG")
}

export function PhoneInput({ 
  value, 
  onChange, 
  name,
  placeholder = "1234 5678",
  className = "",
  required = false,
  id = "phone"
}) {
  const [selectedCountry, setSelectedCountry] = useState(detectCountry())
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Parse initial value if provided
    if (value && !phoneNumber) {
      const country = countries.find(c => value.startsWith(c.dialCode))
      if (country) {
        setSelectedCountry(country)
        setPhoneNumber(value.replace(country.dialCode, "").trim())
      } else {
        setPhoneNumber(value)
      }
    }
  }, [value])

  const handlePhoneChange = (e) => {
    const newNumber = e.target.value
    setPhoneNumber(newNumber)
    
    // Combine country code with phone number
    const fullNumber = newNumber ? `${selectedCountry.dialCode} ${newNumber}` : ""
    if (onChange) {
      onChange({ target: { value: fullNumber } })
    }
  }

  const handleCountrySelect = (country) => {
    setSelectedCountry(country)
    setIsDropdownOpen(false)
    setSearchQuery("") // Reset search when country is selected
    
    // Update full number with new country code
    const fullNumber = phoneNumber ? `${country.dialCode} ${phoneNumber}` : ""
    if (onChange) {
      onChange({ target: { value: fullNumber } })
    }
  }

  // Filter countries based on search query
  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.dialCode.includes(searchQuery) ||
    country.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="relative flex">
      {/* Country Selector Dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="h-12 px-3 flex items-center gap-2 bg-gray-50 border-2 border-r-0 border-gray-200 rounded-l-xl hover:bg-gray-100 transition-colors focus:outline-none focus:border-brand-navy-600"
        >
          <span className="text-2xl">{selectedCountry.flag}</span>
          <span className="font-medium text-gray-700">{selectedCountry.dialCode}</span>
          <svg 
            className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <>
            <div 
              className="fixed inset-0 z-10" 
              onClick={() => {
                setIsDropdownOpen(false)
                setSearchQuery("")
              }}
            ></div>
            <div className="absolute top-full left-0 mt-1 w-72 bg-white border-2 border-gray-200 rounded-xl shadow-xl z-20 flex flex-col max-h-96">
              {/* Search Input */}
              <div className="p-3 border-b border-gray-200 sticky top-0 bg-white rounded-t-xl">
                <div className="relative">
                  <svg 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search country..."
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy-500 focus:border-transparent"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>

              {/* Countries List */}
              <div className="overflow-y-auto flex-1">
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => handleCountrySelect(country)}
                      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-brand-navy-50 transition-colors text-left ${
                        selectedCountry.code === country.code ? 'bg-brand-navy-50' : ''
                      }`}
                    >
                      <span className="text-2xl">{country.flag}</span>
                      <span className="flex-1 font-medium text-gray-700">{country.name}</span>
                      <span className="text-gray-500 text-sm">{country.dialCode}</span>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-8 text-center text-gray-500">
                    <p className="text-sm">No countries found</p>
                    <p className="text-xs mt-1">Try a different search term</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Phone Number Input */}
      <Input
        id={id}
        name={name}
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneChange}
        placeholder={placeholder}
        className={`flex-1 h-12 rounded-l-none rounded-r-xl border-2 focus:border-brand-navy-600 transition-colors ${className}`}
        required={required}
      />
    </div>
  )
}

