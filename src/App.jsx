import { useEffect, useState } from "react"
import { doc, getDoc, updateDoc, increment, setDoc } from "firebase/firestore"
import { db } from "./firebase"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./components/Home"
import Year from "./components/Year"
import Semester from "./components/Semester"
import Paper from "./components/Paper"
import InternshipForm from "./components/InternshipForm"
import PlacementDashboard from "./components/PlacementDashboard"
import FeedbackDashboard from "./components/FeedbackDashboard"
import AdminHub from "./components/AdminHub"   // <--- NEW
import AdminPanel from "./components/AdminPanel" // <--- UPDATED
import Auth from "./components/Auth"
import Landing from "./components/Landing" 
import { useAuth } from "./context/AuthContext"

export default function App() {
  const { user } = useAuth()

  // Initialize view from URL
  const [view, setView] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get("view") || "home"
  })

  const [selectedBatch, setSelectedBatch] = useState(null)
  const [year, setYear] = useState(null)
  const [semester, setSemester] = useState(null)
  const [paper, setPaper] = useState(null)
  const [showAuth, setShowAuth] = useState(false)
  const [visitCount, setVisitCount] = useState(0)

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

  /* --- ANALYTICS --- */
  useEffect(() => {
    const statsRef = doc(db, "analytics", "site_stats")
    updateDoc(statsRef, { visits: increment(1) })
      .then(() => {
        getDoc(statsRef).then(snap => {
          if (snap.exists()) setVisitCount(snap.data().visits)
        })
      })
      .catch(async (error) => {
        if (error.code === 'not-found' || error.message.includes("No document")) {
             await setDoc(statsRef, { visits: 1 })
             setVisitCount(1)
        }
      })
  }, [])

  /* --- GATEKEEPER --- */
  if (!user) {
    return (
      <>
        <Landing onLogin={() => setShowAuth(true)} />
        {showAuth && <Auth onClose={() => setShowAuth(false)} />}
      </>
    )
  }

  /* --- NAVIGATION HANDLERS --- */
  const handleGoHome = () => {
    setSelectedBatch(null); setYear(null); setSemester(null); setPaper(null);
    changeView("home")
  }
  
  const handleGoToAdminHub = () => changeView("dashboard") // Back to Main Admin Menu

  const openSyllabus = () => {
    window.open("https://www.isibang.ac.in/~adean/infsys/acadata/Brochures/mslis_new.pdf", "_blank")
  }

  /* --- ROUTER --- */
  let content = null

  // 1. MAIN ADMIN HUB
  if (view === "dashboard") {
    content = <AdminHub changeView={changeView} goBack={handleGoHome} />

  // 2. ADMIN SUB-PAGES
  } else if (view === "admin-users") {
    content = <AdminPanel goBack={handleGoToAdminHub} /> // Back to Hub, not Home

  } else if (view === "admin-placement") {
    content = <PlacementDashboard goBack={handleGoToAdminHub} />

  } else if (view === "admin-feedback") {
    content = <FeedbackDashboard goBack={handleGoToAdminHub} />

  } else if (view === "internship") {
    content = <InternshipForm goBack={handleGoHome} />
  
  } else if (view === "paper") {
    const handlePaperBack = () => selectedBatch === "2024-26" ? changeView("batch-selection") : changeView("semester")
    content = <Paper paper={paper} batch={selectedBatch} goBack={handlePaperBack} />

  } else if (view === "semester") {
    content = <Semester semester={semester} openPaper={(p) => { setPaper(p); changeView("paper") }} goBack={() => changeView("year")} />
  } else if (view === "year") {
    content = <Year year={year} openSemester={(s) => { setSemester(s); changeView("semester") }} goBack={() => changeView("batch-selection")} />
  
  } else if (view === "batch-selection") {
    // ... [KEEP YOUR BATCH SELECTION CODE EXACTLY AS IT WAS] ...
    // (I am abbreviating it here to save space, but DO NOT DELETE the Senior/Junior logic)
     if (selectedBatch === "2024-26") {
      content = (
        <div className="max-w-6xl mx-auto px-6 py-28 text-slate-100 min-h-screen">
          <button onClick={handleGoHome} className="text-cyan-400 mb-8 flex items-center gap-2 text-sm font-bold uppercase tracking-widest">← Back to Home</button>
          <div className="mb-12">
             <div className="flex items-center gap-3 mb-2"><span className="bg-cyan-900 text-cyan-200 text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest border border-cyan-700">Senior Cohort</span></div>
             <h2 className="text-4xl font-black mb-4">Research & Projects</h2>
             <p className="text-slate-400">Manage your Colloquiums, Seminars, and Dissertations.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div onClick={() => { setPaper("Paper 10 – Colloquium and Study of Subject"); changeView("paper") }} className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 hover:border-cyan-500 cursor-pointer transition-all hover:scale-[1.02] group">
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center mb-6 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-colors"><span className="font-bold text-lg">C</span></div>
                <h3 className="text-xl font-bold mb-2">Colloquium</h3><p className="text-slate-400 text-sm">Paper 10 Presentations</p>
             </div>
             <div onClick={() => { setPaper("Paper 15 – Seminar"); changeView("paper") }} className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 hover:border-violet-500 cursor-pointer transition-all hover:scale-[1.02] group">
                <div className="w-12 h-12 rounded-full bg-violet-500/10 flex items-center justify-center mb-6 text-violet-400 group-hover:bg-violet-500 group-hover:text-white transition-colors"><span className="font-bold text-lg">S</span></div>
                <h3 className="text-xl font-bold mb-2">Seminar</h3><p className="text-slate-400 text-sm">Paper 15 Showcases</p>
             </div>
             <div onClick={() => { setPaper("Paper 20 – Dissertation"); changeView("paper") }} className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 hover:border-rose-500 cursor-pointer transition-all hover:scale-[1.02] group">
                <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center mb-6 text-rose-400 group-hover:bg-rose-500 group-hover:text-white transition-colors"><span className="font-bold text-lg">D</span></div>
                <h3 className="text-xl font-bold mb-2">Dissertation</h3><p className="text-slate-400 text-sm">Paper 20 Theses</p>
             </div>
          </div>
        </div>
      )
    } else {
      content = (
        <div className="max-w-6xl mx-auto px-6 py-28 text-slate-100 min-h-screen">
          <button onClick={handleGoHome} className="text-indigo-400 mb-8 flex items-center gap-2 text-sm font-bold uppercase tracking-widest">← Back to Home</button>
          <div className="mb-12">
             <div className="flex items-center gap-3 mb-2"><span className="bg-indigo-900 text-indigo-200 text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest border border-indigo-700">Junior Cohort</span></div>
             <h2 className="text-4xl font-black mb-4">Academic Years</h2>
             <p className="text-slate-400">Select your current semester year.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div onClick={() => { setYear("First Year"); changeView("year") }} className="bg-gradient-to-br from-indigo-900/50 to-slate-900 p-10 rounded-3xl border border-white/5 hover:border-indigo-500 cursor-pointer transition-all hover:scale-[1.02] group">
                <h3 className="text-3xl font-bold mb-2">First Year</h3><p className="text-slate-400 text-sm mb-6">Semester I & II</p><span className="text-xs font-bold bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full uppercase tracking-widest group-hover:bg-indigo-600 group-hover:text-white transition-colors">Explore →</span>
             </div>
             <div onClick={() => { setYear("Second Year"); changeView("year") }} className="bg-gradient-to-br from-teal-900/50 to-slate-900 p-10 rounded-3xl border border-white/5 hover:border-teal-500 cursor-pointer transition-all hover:scale-[1.02] group">
                <h3 className="text-3xl font-bold mb-2">Second Year</h3><p className="text-slate-400 text-sm mb-6">Semester III & IV</p><span className="text-xs font-bold bg-teal-500/10 text-teal-400 px-3 py-1 rounded-full uppercase tracking-widest group-hover:bg-teal-600 group-hover:text-white transition-colors">Explore →</span>
             </div>
          </div>
        </div>
      )
    }

  } else if (view === "govt-exams") {
    content = (
      <div className="max-w-6xl mx-auto px-6 py-28 text-slate-100 min-h-screen">
        <button onClick={handleGoHome} className="text-indigo-400 mb-8 flex items-center gap-2 text-sm font-bold uppercase tracking-widest">← Back to Home</button>
        <div className="mb-12"><h2 className="text-4xl font-black mb-4">Government Exams Prep</h2><p className="text-slate-400">Resources for competitive exams in Library & Information Science.</p></div>
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-white mb-8 pl-4 border-l-4 border-indigo-500">UGC NET / JRF</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div onClick={() => window.open("https://drive.google.com/drive/folders/1SnIo29wOMefirDtS_NGHREA_fdD53Sy9", "_blank")} className="bg-slate-900/50 p-10 rounded-3xl border border-white/5 hover:border-indigo-500 cursor-pointer transition-all hover:scale-[1.02] group">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg></div>
                <h3 className="text-2xl font-bold mb-2">General Paper (Paper 1)</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">Teaching Aptitude, Research Methodology, Comprehension, Reasoning, and ICT.</p>
                <span className="text-xs font-bold bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-full uppercase tracking-widest group-hover:bg-indigo-600 group-hover:text-white transition-colors">Open Drive Folder →</span>
             </div>
             <div onClick={() => window.open("#", "_blank")} className="bg-slate-900/50 p-10 rounded-3xl border border-white/5 hover:border-teal-500 cursor-pointer transition-all hover:scale-[1.02] group">
                <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center mb-6 text-teal-400 group-hover:bg-teal-500 group-hover:text-white transition-colors"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg></div>
                <h3 className="text-2xl font-bold mb-2">LIS Subject (Paper 2)</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">Library Science Core, Knowledge Organization, Digital Libraries, and Management.</p>
                <span className="text-xs font-bold bg-teal-500/10 text-teal-400 px-4 py-2 rounded-full uppercase tracking-widest group-hover:bg-teal-600 group-hover:text-white transition-colors">Open Drive Folder →</span>
             </div>
          </div>
        </div>
        <div className="opacity-50"><h3 className="text-2xl font-bold text-slate-500 mb-6 pl-4 border-l-4 border-slate-700">KVS / NVS / EMRS (Coming Soon)</h3></div>
      </div>
    )
  } else if (view === "upskilling") {
    content = (
      <div className="max-w-6xl mx-auto px-6 py-28 text-slate-100">
        <button onClick={handleGoHome} className="text-indigo-400 mb-8 flex items-center gap-2 text-sm font-bold uppercase tracking-widest">← Back</button>
        <h2 className="text-3xl font-bold mb-4">Upskilling Hub</h2>
        <p className="text-slate-400">Advanced technical modules coming soon.</p>
      </div>
    )
  } else {
    // HOME VIEW
    content = (
      <Home 
        visitCount={visitCount} 
        openBatch={(batchName) => { setSelectedBatch(batchName); changeView("batch-selection") }} 
        openGovtExams={() => changeView("govt-exams")} 
        openUpskilling={() => changeView("upskilling")} 
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