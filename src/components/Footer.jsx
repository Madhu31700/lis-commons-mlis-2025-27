import { useEffect, useState } from "react"

export default function Footer({ visitCount }) {
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <footer className="relative z-10 bg-[#020617] pt-24 pb-12 overflow-hidden border-t border-white/5">
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-600/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* COLUMN 1: BRAND */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <span className="text-white font-black text-xl">L</span>
              </div>
              <div>
                <h2 className="text-white font-bold text-xl tracking-tight leading-none">Librandhana</h2>
                <p className="text-indigo-400 text-[10px] font-bold uppercase tracking-[0.3em]">Academic Portal</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              An Open Access initiative to bridge knowledge gaps, preserve academic memory, and empower the library science community.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 bg-slate-900/50 px-3 py-2 rounded-lg border border-white/5 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              System Status: <span className="text-emerald-400">Online & Indexing</span>
            </div>
          </div>

          {/* COLUMN 2: PROJECT CREDITS (Updated with LinkedIn) */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest border-b border-white/5 pb-2 inline-block">
              Project Credits
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                <div>
                  <p className="text-slate-200 text-sm font-bold">
                    Concept & Development by <br />
                    
                    {/* --- LINKEDIN LINK ADDED HERE --- */}
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
                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-indigo-500/50"></div>
                <div>
                  <p className="text-slate-300 text-sm font-medium">Powered by Generative AI</p>
                  <p className="text-slate-500 text-xs">Built with LLM Assistance</p>
                </div>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: ACKNOWLEDGEMENT */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-widest border-b border-white/5 pb-2 inline-block">
              Acknowledgement
            </h3>
            <div className="bg-slate-900/50 p-4 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-colors">
              <p className="text-xs text-slate-500 font-bold uppercase mb-1">Academic Home</p>
              <p className="text-slate-200 font-bold">DRTC, ISI Bangalore</p>
              
              <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
                Made possible by the academic environment and campus infrastructure. Grateful for the opportunity to learn and build.
              </p>
            </div>
          </div>
        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-600 text-[10px] font-medium">
            &copy; {new Date().getFullYear()} Librandhana. Open Access Academic License.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Last Updated</p>
              <p className="text-slate-300 text-xs font-mono">Feb 1, 2026</p>
            </div>

            <div className="h-8 w-px bg-white/10 hidden md:block"></div>

            {/* VISITOR COUNTER */}
            <div className="flex items-center gap-3 bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-full">
              <div className="flex flex-col">
                <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider leading-none mb-1">
                  Scholars Served
                </span>
                <span className={`text-white font-mono font-bold text-sm leading-none transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                  {visitCount > 0 ? visitCount.toLocaleString() : "Loading..."}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}