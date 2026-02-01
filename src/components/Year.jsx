export default function Year({ year, openSemester, goBack }) {
  const isFirstYear = year === "First Year"
  
  const semesters = isFirstYear 
    ? [
        { id: "Semester I", desc: "Foundations & Core Concepts", papers: "5 Papers", color: "indigo" },
        { id: "Semester II", desc: "Management & Tech Skills", papers: "5 Papers", color: "teal" }
      ]
    : [
        { id: "Semester III", desc: "Research & Analytics", papers: "5 Papers", color: "violet" },
        { id: "Semester IV", desc: "Advanced Systems & Dissertation", papers: "5 Papers", color: "rose" }
      ]

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 px-6 py-20 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-teal-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        <button 
          onClick={goBack} 
          className="mb-8 text-xs font-bold text-slate-500 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2"
        >
          ← Back Home
        </button>

        <h1 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">
          {year}
        </h1>
        <p className="text-slate-400 max-w-lg mb-16 text-lg">
          Select your semester to access course materials, notes, and previous year question papers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {semesters.map((sem) => (
            <SemesterCard 
              key={sem.id} 
              data={sem} 
              onClick={() => openSemester(sem.id)} 
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function SemesterCard({ data, onClick }) {
  const gradients = {
    indigo: "from-indigo-600/20 to-slate-900 border-indigo-500/30 hover:border-indigo-400",
    teal: "from-teal-600/20 to-slate-900 border-teal-500/30 hover:border-teal-400",
    violet: "from-violet-600/20 to-slate-900 border-violet-500/30 hover:border-violet-400",
    rose: "from-rose-600/20 to-slate-900 border-rose-500/30 hover:border-rose-400",
  }

  return (
    <div 
      onClick={onClick}
      className={`
        cursor-pointer 
        bg-gradient-to-br ${gradients[data.color]} 
        backdrop-blur-xl 
        border 
        p-10 
        rounded-[2.5rem] 
        group 
        relative 
        overflow-hidden 
        transition-all 
        duration-500 
        hover:scale-[1.02] 
        hover:shadow-2xl
      `}
    >
      <div className="relative z-10">
        <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest mb-4 text-slate-300">
          {data.papers}
        </span>
        <h2 className="text-3xl font-black text-white mb-2 group-hover:text-white transition-colors">
          {data.id}
        </h2>
        <p className="text-slate-400 text-sm font-medium group-hover:text-slate-200 transition-colors">
          {data.desc}
        </p>
      </div>

      {/* Hover Arrow */}
      <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
        <svg className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
      </div>
    </div>
  )
}