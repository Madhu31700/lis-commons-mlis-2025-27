import { useEffect, useState } from "react"
import { doc, getDoc, updateDoc, increment, setDoc } from "firebase/firestore"
import { db } from "./firebase"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Intro from "./components/Intro"
import Home from "./components/Home"
import Year from "./components/Year"
import Semester from "./components/Semester"
import Paper from "./components/Paper"
import InternshipForm from "./components/InternshipForm"
import PlacementDashboard from "./components/PlacementDashboard"
import Auth from "./components/Auth"
import { useAuth } from "./context/AuthContext"

export default function App() {
  const { user } = useAuth()

  // 1. Initialize view from URL (Handles Refresh)
  const [view, setView] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get("view") || "home"
  })

  const [year, setYear] = useState(null)
  const [semester, setSemester] = useState(null)
  const [paper, setPaper] = useState(null)
  const [showAuth, setShowAuth] = useState(false)
  const [visitCount, setVisitCount] = useState(0)
  const [showIntro, setShowIntro] = useState(!sessionStorage.getItem("introSeen"))

  /* --- GLOBAL BACK BUTTON LOGIC --- */
  const changeView = (newView) => {
    setView(newView)
    window.history.pushState({ view: newView }, "", `?view=${newView}`)
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    const handlePopState = (event) => {
      const targetView = event.state?.view || "home"
      setView(targetView)
    }
    if (!window.history.state) window.history.replaceState({ view }, "", `?view=${view}`)
    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])
  /* ------------------------------- */

  /* --- ANALYTICS --- */
  useEffect(() => {
    const statsRef = doc(db, "analytics", "site_stats")
    updateDoc(statsRef, { visits: increment(1) })
      .catch(() => setDoc(statsRef, { visits: 1 }))

    getDoc(statsRef).then(snap => {
      if (snap.exists()) setVisitCount(snap.data().visits)
    })
  }, [])

  const finishIntro = () => {
    sessionStorage.setItem("introSeen", "true")
    setShowIntro(false)
  }

  const handleGoHome = () => {
    setYear(null); setSemester(null); setPaper(null);
    changeView("home")
  }

  /* --- RENDER LOGIC --- */
  let content = null

  if (view === "dashboard") {
    content = <PlacementDashboard goBack={handleGoHome} />
  } else if (view === "internship") {
    content = <InternshipForm goBack={handleGoHome} />
  } else if (view === "paper") {
    content = <Paper paper={paper} goBack={() => changeView("semester")} />
  } else if (view === "semester") {
    content = <Semester semester={semester} openPaper={(p) => { setPaper(p); changeView("paper") }} goBack={() => changeView("year")} />
  } else if (view === "year") {
    content = <Year year={year} openSemester={(s) => { setSemester(s); changeView("semester") }} goBack={handleGoHome} />
  } else if (view === "ugc-net") {
    content = (
      <div className="max-w-6xl mx-auto px-6 py-28 text-slate-100">
        <button onClick={handleGoHome} className="text-indigo-400 mb-8 flex items-center gap-2">← Back</button>
        <h2 className="text-3xl font-bold mb-12">UGC NET Materials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-slate-800 p-10 rounded-3xl border border-slate-700 opacity-50"><h3 className="text-2xl font-bold">Coming Soon</h3></div>
        </div>
      </div>
    )
  } else if (view === "upskilling") {
    content = (
      <div className="max-w-6xl mx-auto px-6 py-28 text-slate-100">
        <button onClick={handleGoHome} className="text-indigo-400 mb-8">← Back</button>
        <h2 className="text-3xl font-bold mb-4">Upskilling Hub</h2>
        <p className="text-slate-400">Advanced technical modules coming soon.</p>
      </div>
    )
  } else {
    content = (
      <Home
        visitCount={visitCount}
        openFirstYear={() => { setYear("First Year"); changeView("year") }}
        openSecondYear={() => { setYear("Second Year"); changeView("year") }}
        openUgcNet={() => changeView("ugc-net")}
        openUpskilling={() => changeView("upskilling")}
        openInternshipForm={() => { !user ? setShowAuth(true) : changeView("internship") }}
        openDashboard={() => changeView("dashboard")}
      />
    )
  }

  return (
    <>
      <Header goHome={handleGoHome} openDashboard={() => changeView("dashboard")} onLogin={() => setShowAuth(true)} />
      {showIntro ? <Intro onFinish={finishIntro} /> : (
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow">{content}</div>
          <Footer visitCount={visitCount} />
        </div>
      )}
      {showAuth && <Auth onClose={() => setShowAuth(false)} />}
    </>
  )
}