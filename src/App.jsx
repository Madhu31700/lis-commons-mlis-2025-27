import { useEffect, useState } from "react"
import { doc, getDoc, updateDoc, increment, setDoc } from "firebase/firestore"
import { db } from "./firebase"

// --- COMPONENTS ---
import Header from "./components/Header"
import Footer from "./components/Footer"
import Landing from "./components/Landing" 
import Auth from "./components/Auth"
import Home from "./components/Home"

import Year from "./components/Year"         
import Paper from "./components/Paper"       

import InternshipForm from "./components/InternshipForm"
import AdminHub from "./components/AdminHub"
import AdminPanel from "./components/AdminPanel"
import PlacementDashboard from "./components/PlacementDashboard"
import FeedbackDashboard from "./components/FeedbackDashboard"

import { useAuth } from "./context/AuthContext"

export default function App() {
  const { user } = useAuth()

  // Initialize view from URL
  const [view, setView] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get("view") || "home"
  })

  // --- STATE MANAGEMENT ---
  const [selectedBatch, setSelectedBatch] = useState(null)
  const [paper, setPaper] = useState(null)
  const [currentTab, setCurrentTab] = useState("Semester I") 

  const [showAuth, setShowAuth] = useState(false)
  const [visitCount, setVisitCount] = useState(0)

  // Navigation Helper
  const changeView = (newView) => {
    setView(newView)
    window.history.pushState({ view: newView }, "", `?view=${newView}`)
    window.scrollTo(0, 0)
  }

  // Handle Browser Back Button
  useEffect(() => {
    const handlePopState = (event) => {
      const targetView = event.state?.view || "home"
      setView(targetView)
    }
    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  /* --- ANALYTICS ENGINE --- */
  useEffect(() => {
    const statsRef = doc(db, "analytics", "site_stats")
    
    // 1. Increment first
    updateDoc(statsRef, { visits: increment(1) })
      .then(() => {
        // 2. Fetch the updated count to display
        return getDoc(statsRef)
      })
      .then((snap) => {
        if (snap.exists()) {
          setVisitCount(snap.data().visits)
        }
      })
      .catch(async (error) => {
        // 3. If document doesn't exist, create it
        if (error.code === 'not-found' || error.message.includes("No document")) {
             await setDoc(statsRef, { visits: 1 })
             setVisitCount(1)
        }
      })
  }, [])

  if (!user) {
    return (
      <>
        <Landing onLogin={() => setShowAuth(true)} />
        {showAuth && <Auth onClose={() => setShowAuth(false)} />}
      </>
    )
  }

  // Handlers
  const handleGoHome = () => {
    setSelectedBatch(null)
    setPaper(null)
    setCurrentTab("Semester I")
    changeView("home")
  }
  
  const handleGoToAdminHub = () => changeView("dashboard")

  const openSyllabus = () => {
    window.open("https://www.isibang.ac.in/~adean/infsys/acadata/Brochures/mslis_new.pdf", "_blank")
  }

  /* --- ROUTER LOGIC --- */
  let content = null

  if (view === "dashboard") content = <AdminHub changeView={changeView} goBack={handleGoHome} />
  else if (view === "admin-users") content = <AdminPanel goBack={handleGoToAdminHub} />
  else if (view === "admin-placement") content = <PlacementDashboard goBack={handleGoToAdminHub} />
  else if (view === "admin-feedback") content = <FeedbackDashboard goBack={handleGoToAdminHub} />
  else if (view === "internship") content = <InternshipForm goBack={handleGoHome} />
  
  else if (view === "batch-selection") {
     if (selectedBatch === "2024-26") {
       content = (
        <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-cyan-500/30 pb-20">
          <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0"></div>
          <div className="fixed inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent pointer-events-none z-0"></div>
          <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
            <button onClick={handleGoHome} className="mb-8 flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900/50 border border-white/10 hover:border-cyan-500/50 transition-all text-slate-400 hover:text-white">
               <span className="text-xs font-bold uppercase tracking-widest">← Back to Hub</span>
            </button>
            <div className="mb-12">
               <div className="flex items-center gap-3 mb-2">
                 <span className="bg-cyan-500/20 text-cyan-400 text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest border border-cyan-500/30">Senior Cohort</span>
               </div>
               <h2 className="text-4xl font-black mb-4">Research & Projects</h2>
               <p className="text-slate-400 max-w-xl">Manage your specialized research components.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div onClick={() => { setPaper("Paper 10 – Colloquium and Study of Subject"); changeView("paper") }} className="bg-slate-900/40 backdrop-blur-xl p-8 rounded-[2rem] border border-white/5 hover:border-cyan-500 hover:bg-slate-900/60 cursor-pointer transition-all hover:scale-[1.02] group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-cyan-500/20 transition-all"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-6 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-colors border border-cyan-500/20"><span className="font-bold text-lg">C</span></div>
                    <h3 className="text-xl font-bold mb-2 text-white">Colloquium</h3>
                    <p className="text-slate-400 text-sm">Paper 10 Presentations</p>
                  </div>
               </div>
               <div onClick={() => { setPaper("Paper 15 – Seminar"); changeView("paper") }} className="bg-slate-900/40 backdrop-blur-xl p-8 rounded-[2rem] border border-white/5 hover:border-violet-500 hover:bg-slate-900/60 cursor-pointer transition-all hover:scale-[1.02] group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-violet-500/20 transition-all"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center mb-6 text-violet-400 group-hover:bg-violet-500 group-hover:text-white transition-colors border border-violet-500/20"><span className="font-bold text-lg">S</span></div>
                    <h3 className="text-xl font-bold mb-2 text-white">Seminar</h3>
                    <p className="text-slate-400 text-sm">Paper 15 Showcases</p>
                  </div>
               </div>
               <div onClick={() => { setPaper("Paper 20 – Dissertation"); changeView("paper") }} className="bg-slate-900/40 backdrop-blur-xl p-8 rounded-[2rem] border border-white/5 hover:border-rose-500 hover:bg-slate-900/60 cursor-pointer transition-all hover:scale-[1.02] group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-rose-500/20 transition-all"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center mb-6 text-rose-400 group-hover:bg-rose-500 group-hover:text-white transition-colors border border-rose-500/20"><span className="font-bold text-lg">D</span></div>
                    <h3 className="text-xl font-bold mb-2 text-white">Dissertation</h3>
                    <p className="text-slate-400 text-sm">Paper 20 Theses</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
       )
     } 
     else {
        content = (
          <Year 
            activeTab={currentTab}
            setActiveTab={setCurrentTab}
            openPaper={(p) => { 
              setPaper(p)
              changeView("paper") 
            }} 
            goBack={handleGoHome} 
          />
        )
     }

  } else if (view === "paper") {
    content = (
      <Paper 
        paper={paper} 
        batch={selectedBatch} 
        goBack={() => changeView("batch-selection")} 
      />
    )
  } else {
    content = (
      <Home 
        visitCount={visitCount} 
        openBatch={(batchName) => { 
          setSelectedBatch(batchName)
          changeView("batch-selection") 
        }} 
        openGovtExams={() => alert("Exams page coming soon!")} 
        openUpskilling={() => alert("Upskilling page coming soon!")} 
        openInternshipForm={() => { !user ? setShowAuth(true) : changeView("internship") }} 
        openDashboard={() => changeView("dashboard")} 
        openAdminFeedback={() => changeView("admin-feedback")}
        openSyllabus={openSyllabus} 
      />
    )
  }

  return (
    <>
      <Header goHome={handleGoHome} openDashboard={() => changeView("dashboard")} onLogin={() => setShowAuth(true)} />
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">{content}</div>
        <Footer visitCount={visitCount} />
      </div>
      {showAuth && <Auth onClose={() => setShowAuth(false)} />}
    </>
  )
}