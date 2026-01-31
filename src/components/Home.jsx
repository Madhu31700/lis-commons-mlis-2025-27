import Hero from "./Hero"
import { getQuoteOfTheDay } from "../data/quotes"
import { auth } from "../firebase"

const PLACEMENT_EMAILS = [
  "madhu@drtc.isibang.ac.in",
  "amisha@drtc.isibang.ac.in",
]

export default function Home({
  openFirstYear,
  openSecondYear,
  openUgcNet,
  openUpskilling,
  openInternshipForm,
  openDashboard,
  visitCount
}) {
  const quote = getQuoteOfTheDay()
  const user = auth.currentUser
  const isPlacementRep = user && PLACEMENT_EMAILS.includes(user.email)

  return (
    <>
      <Hero />

      <main className="max-w-6xl mx-auto px-6 py-20">
        
        {/* COUNTER BADGE */}
        <div className="flex justify-end mb-12">
          <div className="bg-slate-900/80 border border-slate-800 px-5 py-2 rounded-full flex items-center gap-3 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest">
              Scholars Visited: <span className="text-white font-bold">{visitCount}</span>
            </span>
          </div>
        </div>

        {/* Quote */}
        <div className="mb-24 max-w-3xl">
          <p className="text-xl italic text-slate-300 mb-3 leading-relaxed">
            “{quote.text}”
          </p>
          <p className="text-sm text-slate-400">— {quote.author}</p>
        </div>

        {/* Section heading */}
        <h2 className="text-3xl font-semibold mb-16 text-slate-100 tracking-tight">
          Academic Repository
          <span className="block mt-3 h-[2px] w-20 bg-gradient-to-r from-indigo-400 to-teal-400 rounded-full"></span>
        </h2>

        {/* UNIFORM REPOSITORY GRID (4 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          
          <RepositoryCard 
            title="First Year" 
            subtitle="Semester I & II"
            desc="Core LIS Foundations & assignments" 
            onClick={openFirstYear} 
            gradient="from-indigo-900/80 via-slate-800 to-slate-900" 
          />
          
          <RepositoryCard 
            title="Second Year" 
            subtitle="Semester III & IV"
            desc="Advanced Research & Specializations" 
            onClick={openSecondYear} 
            gradient="from-teal-900/80 via-slate-800 to-slate-900" 
          />

          <RepositoryCard 
            title="UGC NET" 
            subtitle="JRF Preparation"
            desc="Paper 1 (General) & Paper 2 (LIS)" 
            onClick={openUgcNet} 
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
        <section className="mt-32 text-center bg-gradient-to-b from-slate-900/40 to-slate-900/10 py-20 rounded-[3rem] border border-slate-800/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500/0 via-indigo-500/50 to-indigo-500/0"></div>
          
          <h3 className="text-2xl font-semibold mb-4 text-slate-100">Internship & Placement Coordination</h3>
          <p className="text-slate-400 mb-10 max-w-2xl mx-auto px-4">
            Official portal for MLIS 2025–2027 students to manage their placement profiles.
          </p>

          <button
            onClick={openInternshipForm}
            className="px-10 py-4 rounded-full bg-indigo-600 hover:bg-indigo-500 hover:scale-105 transition-all shadow-xl shadow-indigo-600/20 text-white font-bold text-sm uppercase tracking-widest"
          >
            Access Interest Form
          </button>

          {isPlacementRep && (
            <div className="mt-8">
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

/* --- REUSABLE UNIFORM CARD COMPONENT --- */
function RepositoryCard({ title, subtitle, desc, onClick, gradient }) {
  return (
    <div
      onClick={onClick}
      className={`
        cursor-pointer
        bg-gradient-to-br ${gradient}
        border border-white/5
        rounded-[2.5rem]
        p-10
        transition-all
        duration-300
        hover:scale-[1.02]
        hover:shadow-2xl hover:shadow-indigo-500/10
        hover:border-white/10
        group
        relative
        overflow-hidden
      `}
    >
      <div className="relative z-10">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{subtitle}</p>
        <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-indigo-200 transition-colors">{title}</h3>
        <p className="text-slate-400 leading-relaxed text-sm">{desc}</p>
      </div>
      
      {/* Decorative Circle Background */}
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all"></div>
    </div>
  )
}