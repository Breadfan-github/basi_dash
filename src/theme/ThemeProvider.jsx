import { createContext, useContext, useEffect } from "react"
import { getTheme, resolveThemeId } from "./themes.js"

const ThemeContext = createContext(null)

const activeTheme = getTheme(resolveThemeId(import.meta.env.VITE_SITE_THEME))

export function ThemeProvider({ children }) {
  useEffect(() => {
    const t = activeTheme
    document.documentElement.dataset.theme = t.id
    for (const [key, value] of Object.entries(t.cssVars)) {
      document.documentElement.style.setProperty(key, value)
    }
    document.title = t.displayName
  }, [])

  return <ThemeContext.Provider value={activeTheme}>{children}</ThemeContext.Provider>
}

export function useSiteTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error("useSiteTheme must be used within ThemeProvider")
  }
  return ctx
}

export { activeTheme }
