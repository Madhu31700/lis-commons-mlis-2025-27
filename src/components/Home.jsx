import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { getQuoteOfTheDay } from "../data/quotes"
import FeedbackModal from "./FeedbackModal"
import Hero from "./Hero" 

// --- CONFIGURATION ---
const ADMIN_EMAILS = [
  "madhu@drtc.isibang.ac.in",
  "amisha@drtc.isibang.ac.in",
  "madhu31700@gmail.com"
]

const PLACEMENT_EMAILS = [
  "madhu@drtc.isibang.ac.in",
  "amisha@drtc.isibang.ac.in",
]

export default function Home({
  openBatch, 
  openGovtExams,
  openUpskilling,
  openInternshipForm,
  openDashboard,     
  openSyllabus, 
  openAdminFeedback, 
  visitCount // (Not used here anymore, passed to Footer in App.jsx)
}) {
  const { user } = useAuth()
  const quote = getQuoteOfTheDay()
  
  const isPlacementRep = user && PLACEMENT_EMAILS.includes(user.email)
  const isAdmin = user && ADMIN_EMAILS.includes(user.email)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-indigo-500/30 pb-20">
      
      {/* GLOBAL BACKGROUND */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0"></div>
      <div className="fixed inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent pointer-events-none z-0"></div>

      {/* HERO SECTION */}
      <div className="relative z-10">
        <Hero /> 
      </div>

      {/* DASHBOARD CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        
        {/* Quote Strip */}
        <div className="mb-12 border-l-4 border-indigo-500 pl-6 py-2 bg-indigo-500/5 rounded-r-2xl animate-fadeIn">
          <p className="text-slate-300 text-lg italic font-light">"{quote.text}"</p>
          <p className="text-slate-500 text-xs mt-2 uppercase tracking-wider font-bold">— {quote.author}</p>
        </div>

        {/* --- BENTO GRID DASHBOARD --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-fadeIn" style={{ animationDelay: '0.1s' }}>

          {/* 1. SYLLABUS CARD */}
          <div onClick={openSyllabus} className="md:col-span-4 bg-gradient-to-r from-indigo-900/40 via-slate-900/60 to-slate-900/40 backdrop-blur-xl border border-indigo-500/30 rounded-3xl p-8 hover:border-indigo-400/50 transition-all group cursor-pointer relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
             <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-indigo-500/20 transition-all"></div>
             
             <div className="flex items-center gap-6 relative z-10">
               <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform shadow-lg shadow-indigo-500/20">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
               </div>
               <div>
                 <div className="flex items-center gap-2 mb-1">
                    <span className="bg-indigo-500 text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">Official</span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">Syllabus & Curriculum</h2>
                 </div>
                 <p className="text-slate-400 text-sm max-w-xl">Access the complete credit breakdown and course structure for 2024-2027.</p>
               </div>
             </div>

             <div className="relative z-10 bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold text-sm uppercase tracking-widest hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20 flex items-center gap-2 group-hover:translate-x-1">
                View PDF <span>→</span>
             </div>
          </div>

          {/* 2. ACADEMIC BATCHES */}
          <div className="md:col-span-2 bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 hover:border-slate-600 transition-all relative overflow-hidden">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span> Academic Batches
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => openBatch("2024-26")} className="bg-slate-800/50 hover:bg-indigo-600 border border-white/5 hover:border-indigo-500 p-4 rounded-xl text-left transition-all group/btn">
                <span className="block text-[10px] text-slate-400 group-hover/btn:text-indigo-200 mb-1 uppercase tracking-wider">Senior Cohort</span>
                <span className="block text-lg font-bold text-white">2024 - 26</span>
              </button>
              <button onClick={() => openBatch("2025-27")} className="bg-slate-800/50 hover:bg-indigo-600 border border-white/5 hover:border-indigo-500 p-4 rounded-xl text-left transition-all group/btn">
                <span className="block text-[10px] text-slate-400 group-hover/btn:text-indigo-200 mb-1 uppercase tracking-wider">Junior Cohort</span>
                <span className="block text-lg font-bold text-white">2025 - 27</span>
              </button>
            </div>
          </div>

          {/* 3. PLACEMENT CELL */}
          <div className="md:col-span-1 bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 hover:border-emerald-500/50 transition-all relative overflow-hidden flex flex-col justify-between">
             <div>
               <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 mb-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
               </div>
               <h3 className="text-lg font-bold text-white">Placement Cell</h3>
               <p className="text-slate-500 text-xs mt-2 mb-6">Manage internship profiles.</p>
             </div>

             <div className="space-y-2">
               <button onClick={openInternshipForm} className="w-full py-2 bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-300 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-white/5 transition-all">
                 Student Form
               </button>
               {isPlacementRep && (
                 <button onClick={openDashboard} className="w-full py-2 bg-emerald-900/30 hover:bg-emerald-500 hover:text-white text-emerald-400 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-emerald-500/30 transition-all">
                   Rep Dashboard
                 </button>
               )}
             </div>
          </div>

          {/* 4. GOVT EXAMS & UPSKILLING */}
          <div className="md:col-span-1 flex flex-col gap-6">
            <div onClick={openGovtExams} className="flex-1 bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 hover:border-rose-500/50 transition-all cursor-pointer group flex items-center gap-4">
              <div className="w-10 h-10 bg-rose-500/20 rounded-xl flex items-center justify-center text-rose-400 group-hover:rotate-12 transition-transform">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Govt. Exams</h3>
                <p className="text-slate-500 text-[10px] uppercase">UGC NET</p>
              </div>
            </div>

            <div onClick={openUpskilling} className="flex-1 bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-3xl p-6 hover:border-amber-500/50 transition-all cursor-pointer group flex items-center gap-4">
              <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center text-amber-400 group-hover:rotate-12 transition-transform">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Upskilling</h3>
                <p className="text-slate-500 text-[10px] uppercase">Tech Skills</p>
              </div>
            </div>
          </div>
          
          {/* FEEDBACK BUTTON & ADMIN (Moved here since bottom bar is gone) */}
          <div className="md:col-span-4 flex justify-center gap-4 mt-4">
              <button onClick={() => setShowFeedbackModal(true)} className="px-6 py-2 bg-slate-900/50 hover:bg-slate-800 text-slate-400 hover:text-white rounded-full text-xs font-bold uppercase tracking-widest transition-colors border border-white/5">
                 Send Feedback
              </button>
              {isAdmin && (
                <button onClick={openAdminFeedback} className="px-6 py-2 bg-indigo-900/30 hover:bg-indigo-600 text-indigo-400 hover:text-white rounded-full text-xs font-bold uppercase tracking-widest transition-colors border border-indigo-500/30">
                   Admin
                </button>
              )}
          </div>

        </div>
      </div>

      {showFeedbackModal && <FeedbackModal onClose={() => setShowFeedbackModal(false)} />}
    </div>
  )
}