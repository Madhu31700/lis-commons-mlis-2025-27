import { useState } from "react"

/* =========================================
   DATA SOURCE
   ========================================= */
const semester2Materials = {
  "Paper 06 – Library Management and Automation": {
    notes: [
      { title: "Syllabus (PDF)", file: "/materials/first-year/semester-2/paper-06/syllabus.pdf" },
      { title: "Unit 1 Notes (PDF)", file: "/materials/first-year/semester-2/paper-06/unit1-notes.pdf" },
      { title: "Unit 2 Notes (PDF)", file: "/materials/first-year/semester-2/paper-06/unit2-notes.pdf" },
    ],
    ppt: [],
    references: [
      { title: "Selecting and Implementing an Integrated Library System", file: "/materials/first-year/semester-2/paper-06/selecting-and-implementing-an-integrated-library-system.pdf" },
      { title: "Human Resource Management: A Contemporary Approach", file: "/materials/first-year/semester-2/paper-06/human-resource-management-a-contemporary-approach.pdf" },
      { title: "Fundamentals of Collection Development and Management", file: "/materials/first-year/semester-2/paper-06/fundamentals-of-collection-development-and-management.pdf" },
      { title: "Principles for the Handling", file: "/materials/first-year/semester-2/paper-06/principles-for-the-handling.pdf" },
      { title: "Management Challenges for the 21st Century", file: "/materials/first-year/semester-2/paper-06/management-challenges-for-the-21st-century.pdf" },
      { title: "Management Basics for Information Professionals", file: "/materials/first-year/semester-2/paper-06/management-basics-for-information-professionals.pdf" },
    ],
    questions: [],
  },
  "Paper 07 – Digital Libraries": {
    notes: [
      { title: "Digital Library – Overview", file: "/materials/first-year/semester-2/paper-07/digital-library.pdf" },
      { title: "DSpace 9 – Data Notes", file: "/materials/first-year/semester-2/paper-07/dspace-9-data.pdf" },
      { title: "Digital Library – Core Concepts", file: "/materials/first-year/semester-2/paper-07/digital-library-core.pdf" },
    ],
    ppt: [],
    references: [],
    questions: [],
  },
  "Paper 08 – Knowledge Management": {
    notes: [
      { title: "Introduction to Knowledge Management", file: "/materials/first-year/semester-2/paper-08/km-introduction.pdf" },
      { title: "Introduction to KM (Part 2)", file: "/materials/first-year/semester-2/paper-08/km-introduction-2.pdf" },
      { title: "Knowledge Management Cycle", file: "/materials/first-year/semester-2/paper-08/km-cycle.pdf" },
      { title: "Wiig Knowledge Management Cycle", file: "/materials/first-year/semester-2/paper-08/wiig-km-cycle.pdf" },
      { title: "Knowledge Management Metrics", file: "/materials/first-year/semester-2/paper-08/km-metrics.pdf" },
      { title: "Knowledge Management Tools", file: "/materials/first-year/semester-2/paper-08/km-tools.pdf" },
      { title: "Knowledge Management Strategy", file: "/materials/first-year/semester-2/paper-08/knowledge-management-strategy.pdf" },
    ],
    ppt: [],
    references: [
      { title: "Knowledge Management – Kimiz Dalkir", file: "/materials/first-year/semester-2/paper-08/knowledge-management-kimiz-dalkir.pdf" },
    ],
    questions: [],
  },
  "Paper 09 – Elements of Mathematics and Statistics": {
    notes: [], ppt: [], references: [], questions: [],
  },
  "Paper 10 – Colloquium and Study of Subject": {
    type: "colloquium", 
    group1: [
      { title: "Colloquium Presentation 1", student: "Student Name", file: "/materials/first-year/semester-2/paper-10/colloquium-1.pdf" },
    ],
    group2: []
  },
}

/* =========================================
   MAIN COMPONENT
   ========================================= */
export default function Paper({ paper, goBack }) {
  const data = semester2Materials[paper] || { notes: [], ppt: [], references: [], questions: [] }
  const isColloquium = data.type === "colloquium"

  const openFile = (file) => {
    if (!file || file === "#") return alert("File coming soon.")
    window.open(file, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="min-h-screen bg-[#020617] pb-20 font-sans selection:bg-indigo-500/30">
      
      {/* --- HERO HEADER --- */}
      <div className="relative bg-slate-900 border-b border-white/5 py-12 md:py-16 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/5 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Back Button with Larger Touch Area */}
          <button 
            onClick={goBack} 
            className="flex items-center gap-2 text-indigo-400 hover:text-white transition-colors mb-6 group text-xs font-bold uppercase tracking-widest py-3 pr-4 -ml-2"
          >
            <span className="bg-indigo-500/10 p-2 rounded-lg group-hover:bg-indigo-500 group-hover:text-white transition-all">← Back</span>
          </button>
          
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            {paper.split('–')[0]} 
            <span className="block text-xl md:text-3xl text-slate-400 font-normal mt-1">{paper.split('–')[1]}</span>
          </h1>
          
          <div className="flex flex-wrap gap-3 mt-6">
            <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-bold text-slate-300 uppercase tracking-widest">Semester II</span>
            {isColloquium && <span className="px-3 py-1 rounded-full bg-indigo-900/50 border border-indigo-500/30 text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Presentation Mode</span>}
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="max-w-6xl mx-auto px-6 py-8 md:py-12">
        {isColloquium ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <ColloquiumCard group="Group 1" items={data.group1} onOpen={openFile} color="indigo" desc="Metadata & Standards" />
            <ColloquiumCard group="Group 2" items={data.group2} onOpen={openFile} color="teal" desc="Digital Preservation" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <ResourceCard title="Lecture Notes" icon="📘" items={data.notes} onOpen={openFile} theme="indigo" emptyMsg="Notes will be uploaded after lectures." />
            <ResourceCard title="Presentations" icon="📊" items={data.ppt} onOpen={openFile} theme="violet" emptyMsg="Classroom slides will appear here." />
            <ResourceCard title="Reference Material" icon="📚" items={data.references} onOpen={openFile} theme="emerald" emptyMsg="Additional reading resources." />
            <ResourceCard title="Question Papers" icon="📝" items={data.questions} onOpen={openFile} theme="amber" emptyMsg="Previous year & model papers." />
          </div>
        )}
      </div>
    </div>
  )
}

function ResourceCard({ title, icon, items, onOpen, theme, emptyMsg }) {
  const colors = {
    indigo: "from-indigo-500/10 to-indigo-500/5 border-indigo-500/20 hover:border-indigo-500/50",
    violet: "from-violet-500/10 to-violet-500/5 border-violet-500/20 hover:border-violet-500/50",
    emerald: "from-emerald-500/10 to-emerald-500/5 border-emerald-500/20 hover:border-emerald-500/50",
    amber: "from-amber-500/10 to-amber-500/5 border-amber-500/20 hover:border-amber-500/50",
  }
  const textColors = {
    indigo: "text-indigo-400 group-hover:text-indigo-300",
    violet: "text-violet-400 group-hover:text-violet-300",
    emerald: "text-emerald-400 group-hover:text-emerald-300",
    amber: "text-amber-400 group-hover:text-amber-300",
  }

  return (
    <div className={`bg-gradient-to-br ${colors[theme]} bg-slate-900/50 backdrop-blur-sm rounded-[1.5rem] md:rounded-3xl p-6 md:p-8 border transition-all duration-300 group`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-3">
          <span className="text-2xl">{icon}</span> {title}
        </h2>
        <span className="text-[10px] font-bold bg-white/5 px-2 py-1 rounded text-slate-400 border border-white/5">{items?.length || 0} FILES</span>
      </div>

      {items?.length > 0 ? (
        <div className="space-y-3">
          {items.map((item, idx) => (
            <button
              key={idx}
              onClick={() => onOpen(item.file)}
              className="w-full text-left flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-white/5 hover:bg-slate-800 hover:border-white/10 active:scale-[0.98] transition-all group/item"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <div className={`flex-shrink-0 w-1.5 h-1.5 rounded-full bg-current ${textColors[theme]}`}></div>
                <span className="text-sm font-medium text-slate-300 group-hover/item:text-white truncate">{item.title}</span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center border-2 border-dashed border-white/5 rounded-2xl">
          <p className="text-slate-500 text-xs font-medium italic">{emptyMsg}</p>
        </div>
      )}
    </div>
  )
}

function ColloquiumCard({ group, items, onOpen, color, desc }) {
  const styles = color === 'indigo' 
    ? "from-indigo-600/20 to-slate-900 border-indigo-500/30" 
    : "from-teal-600/20 to-slate-900 border-teal-500/30"
  
  const textStyle = color === 'indigo' ? "text-indigo-400" : "text-teal-400"

  return (
    <div className={`bg-gradient-to-br ${styles} backdrop-blur-md rounded-[2rem] p-6 md:p-8 border hover:shadow-2xl transition-all duration-500 group relative overflow-hidden`}>
      <div className="absolute -right-6 -top-6 text-[120px] md:text-[150px] font-black text-white/5 leading-none select-none z-0">
        {group.split(' ')[1]}
      </div>

      <div className="relative z-10">
        <div className="mb-8">
          <p className={`text-xs font-black uppercase tracking-[0.3em] ${textStyle} mb-2`}>{desc}</p>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter">{group}</h2>
        </div>

        {items?.length > 0 ? (
          <ul className="space-y-4">
            {items.map((item, i) => (
              <li key={i} onClick={() => onOpen(item.file)} className="cursor-pointer">
                <div className="bg-slate-950/40 p-5 rounded-2xl border border-white/5 hover:bg-slate-900 hover:border-white/20 active:scale-[0.98] transition-all flex justify-between items-center group/btn">
                  <div>
                    <p className="font-bold text-slate-100 text-sm group-hover/btn:text-white mb-1">{item.title}</p>
                    {item.student && <p className={`text-[10px] font-bold uppercase tracking-wider ${textStyle}`}>{item.student}</p>}
                  </div>
                  <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover/btn:bg-white/10 transition-colors`}>
                    <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-12 text-center border-2 border-dashed border-white/10 rounded-3xl bg-slate-950/20">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Pending Uploads</p>
          </div>
        )}
      </div>
    </div>
  )
}