import Navbar from "./Navbar"
import Footer from "./Footer"
import { useSiteTheme } from "../theme/ThemeProvider.jsx"
import { getHomeSkin } from "../theme/homeSkins.js"

export default function Layout({ children }) {
  const theme = useSiteTheme()
  const skin = getHomeSkin(theme.id)
  return (
    <div className={`min-h-screen flex flex-col ${theme.design.layoutShell}`}>
      <Navbar />
      <main className={`flex-grow ${skin.pageMainBg}`}>{children}</main>
      <Footer />
    </div>
  )
}

