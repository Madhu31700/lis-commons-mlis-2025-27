import Hero from "./Hero"
import { getQuoteOfTheDay } from "../data/quotes"
import { auth } from "../firebase"

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
  visitCount
}) {
  const quote = getQuoteOfTheDay()
  const user = auth.currentUser
  const isPlacementRep = user && PLACEMENT_EMAILS.includes(user.email)

  return (
    <>
      <Hero />

      <main className="max-w-6xl mx-auto px-6 py-12 md:py-20 animate-fade-in">
        
        {/* Quote */}
        <div className="mb-12 md:mb-16 max-w-3xl">
          <p className="text-lg md:text-xl italic text-slate-300 mb-3 leading-relaxed">
            “{quote.text}”
          </p>
          <p className="text-sm text-slate-400">— {quote.author}</p>
        </div>

        {/* --- SYLLABUS BANNER --- */}
        <div 
          onClick={openSyllabus}
          className="relative group cursor-pointer mb-20 overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-amber-500/10 border border-amber-500/20 hover:border-amber-500/50 transition-all"
        >
          <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
            <svg className="w-32 h-32 text-amber-500 transform rotate-12 translate-x-8 -translate-y-8" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
          </div>
          <div className="p-8 md:p-10 relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-amber-500 text-black text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest">Official</span>
                <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">Curriculum</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Download MLIS Syllabus</h3>
              <p className="text-slate-400 text-sm max-w-xl">Complete breakdown of credits, courses, and exam patterns for the academic sessions.</p>
            </div>
            <div className="flex items-center gap-2 bg-amber-500 text-black px-6 py-3 rounded-full font-bold text-sm uppercase tracking-widest group-hover:bg-amber-400 group-hover:scale-105 transition-all shadow-lg shadow-amber-500/20">
              <span>View PDF</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            </div>
          </div>
        </div>

        {/* Section heading */}
        <h2 className="text-2xl md:text-3xl font-semibold mb-12 text-slate-100 tracking-tight">
          Select Your Batch
          <span className="block mt-3 h-[2px] w-20 bg-gradient-to-r from-indigo-400 to-teal-400 rounded-full"></span>
        </h2>

        {/* GRID: BATCHES + EXAMS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-20">
          
          {/* 1. SENIOR BATCH (2024-26) - MOVED TO FIRST POSITION */}
          <RepositoryCard 
            title="MLIS 2024-26" 
            subtitle="Senior Cohort"
            desc="First Year & Second Year Resources" 
            onClick={() => openBatch("2024-26")} 
            gradient="from-cyan-900/80 via-slate-800 to-slate-900" 
          />

          {/* 2. JUNIOR BATCH (2025-27) - MOVED TO SECOND POSITION */}
          <RepositoryCard 
            title="MLIS 2025-27" 
            subtitle="Junior Cohort"
            desc="First Year & Second Year Resources" 
            onClick={() => openBatch("2025-27")} 
            gradient="from-indigo-900/80 via-slate-800 to-slate-900" 
          />

          <RepositoryCard 
            title="Govt. Exams" 
            subtitle="UGC NET • KVS • NVS"
            desc="Prep materials for Competitive Exams" 
            onClick={openGovtExams} 
            gradient="from-rose-900/80 via-slate-800 to-slate-900" 
          />

          <RepositoryCard 
            title="Upskilling" 
            subtitle="Technical Tools"
            desc="Python, SQL, Web Design & more" 
            onClick={openUpskilling} 
            gradient="from-violet-900/80 via-slate-800 to-slate-900" 
          />

        </div>

        {/* Internship Section */}
        <section className="mt-20 md:mt-32 text-center bg-gradient-to-b from-slate-900/40 to-slate-900/10 py-16 md:py-20 rounded-[2rem] md:rounded-[3rem] border border-slate-800/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500/0 via-indigo-500/50 to-indigo-500/0"></div>
          
          <h3 className="text-xl md:text-2xl font-semibold mb-4 text-slate-100 px-4">Internship & Placement Coordination</h3>
          <p className="text-slate-400 mb-10 max-w-2xl mx-auto px-6 text-sm md:text-base">
            Official portal for MLIS students to manage their placement profiles.
          </p>

          <button
            onClick={openInternshipForm}
            className="w-full md:w-auto px-10 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 hover:scale-105 transition-all shadow-xl shadow-indigo-600/20 text-white font-bold text-sm uppercase tracking-widest mb-4 md:mb-0"
          >
            Access Interest Form
          </button>

          {isPlacementRep && (
            <div className="mt-4 md:mt-8">
              <button onClick={openDashboard} className="px-8 py-3 rounded-full bg-slate-950 text-slate-400 hover:text-white border border-slate-800 text-xs font-bold uppercase tracking-widest transition-colors">
                Representative Dashboard
              </button>
            </div>
          )}
          
          <p className="mt-6 text-xs text-slate-600 font-mono">
            Login required for access
          </p>
        </section>
      </main>
    </>
  )
}

/* --- REUSABLE CARD COMPONENT --- */
function RepositoryCard({ title, subtitle, desc, onClick, gradient }) {
  return (
    <div
      onClick={onClick}
      className={`
        cursor-pointer
        bg-gradient-to-br ${gradient}
        border border-white/5
        rounded-[2rem]
        p-6 md:p-10
        transition-all
        duration-300
        active:scale-95
        hover:scale-[1.02]
        hover:shadow-2xl hover:shadow-indigo-500/10
        hover:border-white/10
        group
        relative
        overflow-hidden
      `}
    >
      <div className="relative z-10">
        <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{subtitle}</p>
        <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 text-white group-hover:text-indigo-200 transition-colors">{title}</h3>
        <p className="text-slate-400 leading-relaxed text-sm">{desc}</p>
      </div>
      
      <div className="absolute -bottom-10 -right-10 w-32 h-32 md:w-40 md:h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
    </div>
  )
}