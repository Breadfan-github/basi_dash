import { resolveThemeId } from "./themes.js"

/** @typedef {{ phone: string, addressLines: string[] }} ThemeContact */

const AVERRA_CONTACT = {
  phone: "+65 8475 6259",
  addressLines: ["CapitaGreen", "138 Market St, Singapore 048946", "Near Raffles Place Station"],
}

/** @type {Record<string, ThemeContact>} */
const THEME_CONTACT = {
  averra: AVERRA_CONTACT,
  "global-residency": {
    phone: "+65 8063 7232",
    addressLines: ["CapitaSpring", "88 Market Street, Singapore 048948"],
  },
  "lion-city": {
    phone: "+65 8158 3540",
    addressLines: ["Marina One East Tower", "7 Straits View, Singapore 018936"],
  },
  "prime-residency": {
    phone: "+65 8153 3811",
    addressLines: ["14 Robinson Road", "Singapore 048545"],
  },
  horizon: {
    phone: "+65 8156 2105",
    addressLines: ["International Plaza", "10 Anson Road, Singapore 079903"],
  },
  "one-axis": {
    phone: "+65 8367 9567",
    addressLines: ["One Raffles Place Tower 1", "Raffles Place, Singapore 048616"],
  },
  "pr-bridge": {
    phone: "+65 8352 6973",
    addressLines: [
      "Straits Virtual Office Singapore",
      "7 Temasek Blvd, #12-07 Suntec Tower One, Singapore 038987",
    ],
  },
  "alpha-bridge": {
    phone: "+65 8352 0438",
    addressLines: ["AZ@Paya Lebar", "140 Paya Lebar Rd, #05-22, Singapore 409015"],
  },
}

/** @param {string | undefined} themeId */
export function getThemeContact(themeId) {
  const id = resolveThemeId(themeId)
  return THEME_CONTACT[id] ?? AVERRA_CONTACT
}
