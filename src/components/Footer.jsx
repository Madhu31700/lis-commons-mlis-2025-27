import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"

// --- CONFIGURATION ---
const ADMIN_EMAILS = [
  "madhu@drtc.isibang.ac.in",
  "amisha@drtc.isibang.ac.in",
  "madhu31700@gmail.com"
]

export default function Footer({ visitCount }) {
  const { user } = useAuth()
  const [mounted, setMounted] = useState(false)
  
  // Logic
  const isAdmin = user && ADMIN_EMAILS.includes(user.email)
  
  // --- AUTOMATIC DATE LOGIC ---
  const today = new Date()
  const formattedDate = today.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <footer className="relative z-10 bg-[#020617] pt-20 pb-10 overflow-hidden border-t border-white/5 mt-auto">
      
      {/* --- DECORATIVE GLOWS --- */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* === MAIN CONTENT COLUMNS === */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* COLUMN 1: BRAND */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/10">
                <span className="text-white font-black text-xl">L</span>
              </div>
              <div>
                <h2 className="text-white font-bold text-xl tracking-tight leading-none">Librandhana</h2>
                <p className="text-indigo-400 text-[10px] font-bold uppercase tracking-[0.3em] mt-1">Academic Portal</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              An Open Access initiative to bridge knowledge gaps, preserve academic memory, and empower the library science community.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-900/50 px-3 py-2 rounded-lg border border-white/5 w-fit shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              System Status: <span className="text-emerald-400">Online</span>
            </div>
          </div>

          {/* COLUMN 2: PROJECT CREDITS (RESTORED) */}
          <div className="md:col-span-4 space-y-6">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest border-b border-white/5 pb-2 inline-block text-opacity-80">
              Project Credits
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover:shadow-[0_0_10px_rgba(99,102,241,0.8)] transition-all"></div>
                <div>
                  <p className="text-slate-200 text-sm font-bold">
                    Concept & Development by <br />
                    <a 
                      href="https://www.linkedin.com/in/madhu-m01" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block mt-1 hover:opacity-80 transition-opacity cursor-pointer group"
                      title="Visit LinkedIn Profile"
                    >
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-teal-400 font-black tracking-wide text-base group-hover:from-indigo-300 group-hover:to-teal-300">
                        MADHU M ↗
                      </span>
                    </a>
                  </p>
                  <p className="text-slate-500 text-xs mt-1">Curated, Managed & Deployed</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500/50"></div>
                <div>
                  <p className="text-slate-300 text-sm font-medium">Powered by Generative AI</p>
                  <p className="text-slate-500 text-xs">Built with LLM Assistance</p>
                </div>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: ACKNOWLEDGEMENT (RESTORED) */}
          <div className="md:col-span-3 space-y-6">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest border-b border-white/5 pb-2 inline-block text-opacity-80">
              Acknowledgement
            </h3>
            <div className="bg-slate-900/40 backdrop-blur-md p-5 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all hover:shadow-lg hover:shadow-indigo-500/10 group">
              <p className="text-[10px] text-slate-500 font-black uppercase mb-1 tracking-wider group-hover:text-indigo-400 transition-colors">Academic Home</p>
              <p className="text-slate-200 font-bold text-lg mb-2">DRTC, ISI Bangalore</p>
              <p className="text-[11px] text-slate-400 leading-relaxed border-t border-white/5 pt-2 mt-2">
                Made possible by the academic environment and campus infrastructure.
              </p>
            </div>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-600 text-[10px] font-medium">
            &copy; {new Date().getFullYear()} Librandhana. Open Access Academic License.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
            
            {/* LAST UPDATED */}
            <div className="text-right hidden lg:block">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Last Updated</p>
              <p className="text-slate-300 text-xs font-mono">{formattedDate}</p>
            </div>

            <div className="h-8 w-px bg-white/10 hidden lg:block"></div>

            {/* ACCESS LEVEL */}
            <div className={`flex items-center gap-3 px-4 py-2 rounded-full border backdrop-blur-sm ${isAdmin ? 'bg-indigo-500/10 border-indigo-500/20' : 'bg-emerald-500/5 border-emerald-500/10'}`}>
              <div className="flex flex-col">
                <span className={`text-[9px] font-black uppercase tracking-widest leading-none mb-0.5 ${isAdmin ? 'text-indigo-400' : 'text-emerald-400'}`}>
                   Access Level
                </span>
                <span className="text-white font-bold text-xs leading-none">
                   {isAdmin ? "Administrator" : "Student"}
                </span>
              </div>
            </div>

            {/* VISITOR COUNTER */}
            <div className="flex items-center gap-3 bg-slate-800/40 backdrop-blur-md border border-slate-700/50 px-5 py-2 rounded-full shadow-lg">
              <div className="flex flex-col items-end">
                <span className="text-[9px] text-slate-400 font-black uppercase tracking-widest leading-none mb-0.5">
                  Total Visits
                </span>
                <span className={`text-white font-mono font-bold text-base leading-none transition-all duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                   {visitCount ? visitCount.toLocaleString() : "..."}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </footer>
  )
}