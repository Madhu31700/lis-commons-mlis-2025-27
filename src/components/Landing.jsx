import { useState, useEffect } from "react"

export default function Landing({ onLogin }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans overflow-hidden relative selection:bg-indigo-500/30">
      
      {/* ================= GLOBAL BACKGROUNDS ================= */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent pointer-events-none"></div>

      {/* ================= HEADER (STATIC, BIGGER, AESTHETIC) ================= */}
      <div className="absolute top-8 left-0 right-0 z-50 flex justify-center">
        <div className="flex items-center gap-4 bg-slate-900/80 backdrop-blur-xl px-8 py-4 rounded-full border border-white/10 shadow-2xl shadow-indigo-500/20">
          {/* Logo Icon */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <span className="text-white font-black text-xl">L</span>
          </div>
          {/* Text Name */}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-cyan-200 font-black tracking-[0.2em] text-xl md:text-2xl uppercase drop-shadow-sm">
            LIBRANDHANA
          </span>
        </div>
      </div>

      {/* =====================================================================================
          1. DESKTOP VIEW (Hidden on Mobile) - UNTOUCHED
         ===================================================================================== */}
      <div className="hidden md:flex max-w-7xl mx-auto px-6 h-screen flex-row items-center justify-between relative z-10 pt-24">
        
        {/* LEFT COLUMN: TEXT */}
        <div className={`flex-1 text-left space-y-8 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
            Student Knowledge Management System
          </div>

          <h1 className="text-7xl font-black tracking-tight leading-[1.1]">
            <span className="block text-white animate-float-slow inline-block">Centralize.</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 animate-float-medium inline-block pb-2">Preserve.</span>
            <span className="block text-slate-500 animate-float-fast inline-block">Empower.</span>
          </h1>

          <p className="text-slate-400 text-lg max-w-lg leading-relaxed border-l-2 border-slate-800 pl-6">
            Bridging the gap between scattered resources and institutional memory. Access syllabus, dissertations, and peer notes in one secure portal.
          </p>

          <div className="flex gap-4 pt-4">
            <button onClick={onLogin} className="group relative px-8 py-4 bg-white text-black rounded-xl font-bold text-sm uppercase tracking-widest overflow-hidden hover:scale-105 transition-transform shadow-xl shadow-indigo-500/10">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
              <span className="relative flex items-center gap-3"><img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="G" />Scholar Login</span>
            </button>
          </div>

          <div className="pt-12 flex items-center gap-3 text-[10px] uppercase tracking-widest text-slate-600 font-bold">
            <span>Concept & Development by</span>
            <a href="https://www.linkedin.com/in/madhu-m01" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-white/5 rounded-full hover:border-indigo-500/50 transition-colors cursor-pointer">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 group-hover:animate-pulse"></div>
              <span className="text-indigo-300 group-hover:text-white transition-colors">Madhu M ↗</span>
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: 3D VISUALS */}
        <div className={`flex-1 w-full h-full relative flex items-center justify-center perspective-1000 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[100px] animate-pulse"></div>
          
          <div className="absolute top-[20%] right-[10%] bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl w-64 animate-float-slow z-20">
            <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400 mb-4"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg></div>
            <h3 className="text-white font-bold">Curated Syllabus</h3>
            <p className="text-slate-400 text-xs mt-2">Aligned with University Standards.</p>
          </div>

          <div className="relative bg-gradient-to-br from-indigo-900/80 to-slate-900/80 backdrop-blur-md p-8 rounded-3xl border border-indigo-500/30 shadow-2xl w-72 animate-float-medium z-30">
            <div className="flex justify-between items-start mb-6"><div className="w-12 h-12 bg-white text-black rounded-xl flex items-center justify-center font-black text-xl">L</div><span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded">LIVE</span></div>
            <h3 className="text-white font-bold text-lg">Research Repository</h3>
            <div className="mt-4 space-y-2"><div className="h-2 w-full bg-white/10 rounded-full"></div><div className="h-2 w-3/4 bg-white/10 rounded-full"></div></div>
            <p className="text-slate-400 text-xs mt-4">Storing Colloquiums & Theses.</p>
          </div>

          <div className="absolute bottom-[20%] left-[10%] bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl w-64 animate-float-fast z-10">
            <div className="w-10 h-10 bg-rose-500/20 rounded-lg flex items-center justify-center text-rose-400 mb-4"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg></div>
            <h3 className="text-white font-bold">Digital Archives</h3>
            <p className="text-slate-400 text-xs mt-2">Preserving institutional memory.</p>
          </div>
        </div>
      </div>

      {/* =====================================================================================
          2. MOBILE VIEW (Visible ONLY on Mobile)
         ===================================================================================== */}
      <div className="flex md:hidden flex-col min-h-screen relative z-10 px-6 pt-32 pb-6">
        
        {/* HERO */}
        <div className={`text-left space-y-5 mb-8 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
            Student KNOWLEDGE MANAGEMENT System
          </div>

          <h1 className="text-5xl font-black tracking-tight leading-[1.0]">
            <span className="block text-white">Centralize.</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 pb-2">Preserve.</span>
            <span className="block text-slate-500">Empower.</span>
          </h1>

          {/* Full "About" Description */}
          <div className="space-y-3">
             <p className="text-slate-300 text-sm leading-relaxed border-l-2 border-indigo-500 pl-4">
               Librandhana bridges the gap between scattered resources and institutional memory.
             </p>
             <p className="text-slate-400 text-xs leading-relaxed">
               Designed for scholars, this system centralizes the syllabus, archives past dissertations, and facilitates peer learning through a unified, secure portal.
             </p>
          </div>
        </div>

        {/* FEATURE STACK (Moved UP, before Login) */}
        <div className="flex-1 space-y-3 mb-8">
          
          {/* Block 1 */}
          <div className="bg-slate-900/40 backdrop-blur-md p-4 rounded-xl border border-indigo-500/20 flex items-center gap-4 animate-float-slow">
            <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center text-indigo-400">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">Curated Syllabus</h3>
              <p className="text-slate-400 text-[10px] uppercase tracking-wider">University Standards</p>
            </div>
          </div>

          {/* Block 2 */}
          <div className="bg-gradient-to-r from-indigo-900/40 to-cyan-900/40 backdrop-blur-md p-4 rounded-xl border border-cyan-500/20 flex items-center gap-4 animate-float-medium">
            <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-400">
               <span className="font-black text-sm">R</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-white font-bold text-sm">Research Repo</h3>
                <span className="bg-emerald-500/20 text-emerald-400 text-[8px] font-bold px-1.5 py-0.5 rounded">LIVE</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full"><div className="h-1.5 w-3/4 bg-cyan-500/50 rounded-full"></div></div>
            </div>
          </div>

          {/* Block 3 */}
          <div className="bg-slate-900/40 backdrop-blur-md p-4 rounded-xl border border-rose-500/20 flex items-center gap-4 animate-float-fast">
            <div className="w-10 h-10 bg-rose-500/20 rounded-lg flex items-center justify-center text-rose-400">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">Digital Archives</h3>
              <p className="text-slate-400 text-[10px] uppercase tracking-wider">Institutional Memory</p>
            </div>
          </div>

        </div>

        {/* LOGIN BUTTON (Moved HERE) */}
        <div className="mb-8">
          <button onClick={onLogin} className="w-full group relative px-8 py-4 bg-white text-black rounded-xl font-bold text-sm uppercase tracking-widest overflow-hidden hover:scale-[1.02] transition-transform shadow-xl shadow-indigo-500/10">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
            <span className="relative flex items-center justify-center gap-3"><img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="G" />Scholar Login</span>
          </button>
        </div>

        {/* MOBILE CREDITS (Bottom) */}
        <div className="text-center pb-4 mt-auto">
           <div className="text-[10px] uppercase tracking-widest text-slate-600 font-bold mb-2">
              Concept & Development by
           </div>
           <a href="https://www.linkedin.com/in/madhu-m01" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 border border-white/10 rounded-full hover:border-indigo-500/50 transition-colors cursor-pointer shadow-lg">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
              <span className="text-indigo-300 font-black text-xs tracking-wider">MADHU M ↗</span>
           </a>
        </div>

      </div>

    </div>
  )
}