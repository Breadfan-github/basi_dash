import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Loader2 } from "lucide-react"
import Layout from "./components/Layout"
import ScrollToTop from "./components/ScrollToTop"
import Home from "./pages/Home"
import Services from "./pages/Services"
import About from "./pages/About"
import PRAssessment from "./pages/PRAssessment"
import CitizenshipAssessment from "./pages/CitizenshipAssessment"
import FAQ from "./pages/FAQ"
import Application from "./pages/Application"
import ApplicationStatus from "./pages/ApplicationStatus"
import Contact from "./pages/Contact"
import TNC from "./pages/TNC"
import NotFound from "./pages/NotFound"
import { ThemeProvider } from "./theme/ThemeProvider.jsx"

async function getGlobal() {}

async function doAuth() {}

function AppLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-10 h-10 animate-spin text-brand-navy-700" />
    </div>
  )
}

function App() {
  const [isInit, setIsInit] = useState(false)
  const [country, setCountry] = useState(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      const stored = localStorage.getItem("token")
      const tasks = [
        getGlobal(),
        fetch("https://api.country.is").then((res) => res.json()),
      ]
      if (stored) tasks.push(doAuth())
      const results = await Promise.all(tasks)
      if (cancelled) return
      setCountry(results[1].country)
      setIsInit(true)
    })()
    return () => {
      cancelled = true
    }
  }, [])

  if (!isInit) return <AppLoader />
  if (!country) return <AppLoader />
  if (country !== "MY" && country !== "SG" && country !== "JP") {
    return <AppLoader />
  }

  return (
    <Router>
      <ThemeProvider>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/pr-assessment" element={<PRAssessment />} />
            <Route path="/citizenship-assessment" element={<CitizenshipAssessment />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/application" element={<Application />} />
            <Route path="/application/:code" element={<ApplicationStatus />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/tnc" element={<TNC />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </Router>
  )
}

export default App
