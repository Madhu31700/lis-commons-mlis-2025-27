import { useEffect, useState } from "react"
import { doc, getDoc, updateDoc, increment, setDoc } from "firebase/firestore"
import { db } from "./firebase"
import Header from "./components/Header"
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

  const [view, setView] = useState("home")
  const [year, setYear] = useState(null)
  const [semester, setSemester] = useState(null)
  const [paper, setPaper] = useState(null)
  const [showAuth, setShowAuth] = useState(false)
  const [visitCount, setVisitCount] = useState(0)

  const [showIntro, setShowIntro] = useState(
    !sessionStorage.getItem("introSeen")
  )

  /* ---------- VISITOR COUNTER ---------- */
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

  /* ---------- NAVIGATION HELPERS ---------- */
  const handleGoHome = () => {
    setYear(null)
    setSemester(null)
    setPaper(null)
    setView("home")
  }

  /* ---------- RENDER LOGIC ---------- */
  let content = null

  if (view === "dashboard") {
    content = <PlacementDashboard goBack={handleGoHome} />
  } else if (view === "internship") {
    content = <InternshipForm goBack={handleGoHome} />
  } else if (view === "paper") {
    content = <Paper paper={paper} goBack={() => setView("semester")} />
  } else if (view === "semester") {
    content = (
      <Semester
        semester={semester}
        openPaper={(p) => {
          setPaper(p)
          setView("paper")
        }}
        goBack={() => setView("year")}
      />
    )
  } else if (view === "year") {
    content = (
      <Year
        year={year}
        openSemester={(s) => {
          setSemester(s)
          setView("semester")
        }}
        goBack={handleGoHome}
      />
    )
  } else if (view === "ugc-net") {
    /* --- NEW UGC NET SUB-MENU (Internal Component) --- */
    content = (
      <div className="max-w-6xl mx-auto px-6 py-28 text-slate-100">
        <button onClick={handleGoHome} className="text-indigo-400 mb-8 flex items-center gap-2">← Back to Repository</button>
        <h2 className="text-3xl font-bold mb-12">UGC NET Materials <span className="text-slate-500 text-lg font-normal ml-2">/ Select Paper</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* You can link these to actual paper components later */}
           <div onClick={() => alert("Paper 1 Materials coming soon!")} className="bg-slate-800 p-10 rounded-3xl border border-slate-700 hover:border-indigo-500 cursor-pointer transition-all hover:scale-[1.02]">
              <h3 className="text-2xl font-bold">Paper 1</h3>
              <p className="text-slate-400 mt-2">General Teaching & Research Aptitude</p>
           </div>
           <div onClick={() => alert("Paper 2 Materials coming soon!")} className="bg-slate-800 p-10 rounded-3xl border border-slate-700 hover:border-indigo-500 cursor-pointer transition-all hover:scale-[1.02]">
              <h3 className="text-2xl font-bold">Paper 2</h3>
              <p className="text-slate-400 mt-2">Library & Information Science</p>
           </div>
        </div>
      </div>
    )
  } else if (view === "upskilling") {
    content = (
      <div className="max-w-6xl mx-auto px-6 py-28 text-slate-100">
        <button onClick={handleGoHome} className="text-indigo-400 mb-8">← Back</button>
        <h2 className="text-3xl font-bold mb-4">Upskilling Hub</h2>
        <p className="text-slate-400">Advanced technical modules (Python, SQL, Web Design) coming soon.</p>
      </div>
    )
  } else {
    /* --- HOME VIEW --- */
    content = (
      <Home
        visitCount={visitCount}
        openFirstYear={() => {
          setYear("First Year")
          setView("year")
        }}
        openSecondYear={() => {
          setYear("Second Year")
          setView("year")
        }}
        openUgcNet={() => setView("ugc-net")} // Opens the new UGC view
        openUpskilling={() => setView("upskilling")}
        openInternshipForm={() => {
          if (!user) {
            setShowAuth(true) // Trigger Login if not logged in
          } else {
            setView("internship")
          }
        }}
        openDashboard={() => setView("dashboard")}
      />
    )
  }

  return (
    <>
      <Header
        goHome={handleGoHome}
        openDashboard={() => setView("dashboard")}
        onLogin={() => setShowAuth(true)} // Fixes "Login not working"
      />

      {showIntro ? <Intro onFinish={finishIntro} /> : (
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow">{content}</div>
          
          {/* PROFESSIONAL FOOTER */}
          <footer className="mt-32 border-t border-slate-800 bg-[#020617] py-16 px-6 relative z-10">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12">
              <div className="max-w-md">
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-black text-white">L</div>
                   <h4 className="text-white font-black text-sm uppercase tracking-widest">Librandhana Portal</h4>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed italic border-l-2 border-indigo-500/30 pl-4">
                  "Content Owned and Maintained by the DRTC Community. 
                  Designed, Developed and hosted as an Open Access Initiative."
                </p>
                <div className="mt-6 text-slate-400 text-xs font-medium">
                  Concept Design: <span className="text-indigo-400 font-black tracking-widest uppercase">MADHU M</span>
                </div>
              </div>

              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] space-y-3 text-right">
                <p>Infrastructure: Google Firebase & Supabase</p>
                <p>Designed with Artificial Intelligence Tools</p>
                <p>Resources Credit: DRTC, ISI Bangalore</p>
                <p className="text-emerald-500 pt-4">Last Updated: Jan 31, 2026</p>
              </div>
            </div>
          </footer>
        </div>
      )}

      {showAuth && <Auth onClose={() => setShowAuth(false)} />}
    </>
  )
}