export default function Landing({ onLogin }) {
  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-indigo-500/30 font-sans">
      
      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-20 flex flex-col items-center text-center">
        
        {/* HEADER BRANDING */}
        <div className="mb-12 animate-fade-in-up">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl mx-auto flex items-center justify-center shadow-2xl shadow-indigo-500/20 mb-6">
            <span className="text-3xl font-black text-white">L</span>
          </div>
          <p className="text-indigo-400 text-xs font-bold uppercase tracking-[0.3em] mb-3">
            Knowledge Management System
          </p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-slate-400 mb-6">
            Librandhana
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Centralizing the collective intelligence of DRTC. <br />
            From scattered siloes to a unified institutional memory.
          </p>
        </div>

        {/* THE "WHY" SECTION (The KM Concept) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-16 animate-fade-in-up delay-100">
          <FeatureCard 
            icon="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            title="Siloed → Unified"
            desc="Moving resources from WhatsApp, Emails, and Drive links into one accessible, searchable repository."
          />
          <FeatureCard 
            icon="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            title="Tacit → Explicit"
            desc="Capturing the unspoken knowledge of seniors (Colloquiums, Projects) and making it available for juniors."
          />
          <FeatureCard 
            icon="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            title="Controlled Access"
            desc="A secure, academic-only environment. Access is strictly restricted to verified DRTC scholars."
          />
        </div>

        {/* LOGIN CTA */}
        <div className="bg-[#0f172a]/80 backdrop-blur-md border border-slate-700 p-8 rounded-3xl max-w-md w-full shadow-2xl animate-fade-in-up delay-200">
          <h3 className="text-xl font-bold text-white mb-2">Scholar Login</h3>
          <p className="text-slate-400 text-sm mb-6">
            Access the centralized repository.
          </p>
          
          <button 
            onClick={onLogin}
            className="w-full py-4 bg-white text-black rounded-xl font-bold text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
            Sign in with Google
          </button>

          <p className="mt-6 text-[10px] text-slate-500 font-mono uppercase tracking-wide">
            Restricted to Whitelisted Emails Only
          </p>
        </div>

        {/* FOOTER NOTE */}
        <p className="mt-16 text-slate-600 text-xs max-w-md">
          "Knowledge Management is not about technology. It's about connecting people to the knowledge they need to do their jobs."
        </p>

      </div>
    </div>
  )
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="bg-slate-900/40 border border-white/5 p-6 rounded-2xl hover:border-indigo-500/30 transition-colors text-left">
      <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-indigo-400 mb-4">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon} /></svg>
      </div>
      <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}