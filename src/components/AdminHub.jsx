export default function AdminHub({ changeView, goBack }) {
  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-20 font-sans">
      <button onClick={goBack} className="text-slate-500 hover:text-white mb-8 flex items-center gap-2">
        ← Back to Home
      </button>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black mb-2 uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
          Admin Controls
        </h1>
        <p className="text-slate-400 mb-12">Manage users, placements, and system feedback.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* CARD 1: USER ACCESS */}
          <div 
            onClick={() => changeView("admin-users")}
            className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 hover:border-indigo-500 cursor-pointer group transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 mb-6 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-2">User Access</h3>
            <p className="text-sm text-slate-400">Whitelist emails and assign roles (Student, Alumni, Staff).</p>
          </div>

          {/* CARD 2: PLACEMENTS */}
          <div 
            onClick={() => changeView("admin-placement")}
            className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 hover:border-emerald-500 cursor-pointer group transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Placement Cell</h3>
            <p className="text-sm text-slate-400">Manage internship applications and track student progress.</p>
          </div>

          {/* CARD 3: FEEDBACK */}
          <div 
            onClick={() => changeView("admin-feedback")}
            className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 hover:border-rose-500 cursor-pointer group transition-all hover:-translate-y-1"
          >
            <div className="w-12 h-12 bg-rose-500/10 rounded-xl flex items-center justify-center text-rose-400 mb-6 group-hover:bg-rose-500 group-hover:text-white transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-2">System Feedback</h3>
            <p className="text-sm text-slate-400">View bug reports and suggestions from users.</p>
          </div>

        </div>
      </div>
    </div>
  )
}