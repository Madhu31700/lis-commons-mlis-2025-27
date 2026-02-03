import { useState } from "react"

/* =========================================
   FULL DATA SOURCE
   ========================================= */
const paperDatabase = {
  /* --- SEMESTER 1 --- */
  "Paper 01": { questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P01.html" }] },
  "Paper 02": { questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P02.html" }] },
  "Paper 03": { questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P03.html" }] },
  "Paper 04": { questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P04.html" }] },
  "Paper 05": { questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P05.html" }] },

  /* --- SEMESTER 2 (YOUR NOTES RESTORED) --- */
  "Paper 06": {
    notes: [
      { title: "Syllabus (PDF)", file: "/materials/first-year/semester-2/paper-06/syllabus.pdf" },
      { title: "Unit 1 Notes (PDF)", file: "/materials/first-year/semester-2/paper-06/unit1-notes.pdf" },
      { title: "Unit 2 Notes (PDF)", file: "/materials/first-year/semester-2/paper-06/unit2-notes.pdf" },
    ],
    references: [
      { title: "Selecting and Implementing an ILS", file: "/materials/first-year/semester-2/paper-06/selecting-and-implementing-an-integrated-library-system.pdf" },
      { title: "Human Resource Management", file: "/materials/first-year/semester-2/paper-06/human-resource-management-a-contemporary-approach.pdf" },
      { title: "Fundamentals of Collection Development", file: "/materials/first-year/semester-2/paper-06/fundamentals-of-collection-development-and-management.pdf" },
      { title: "Principles for the Handling", file: "/materials/first-year/semester-2/paper-06/principles-for-the-handling.pdf" },
      { title: "Management Challenges", file: "/materials/first-year/semester-2/paper-06/management-challenges-for-the-21st-century.pdf" },
      { title: "Management Basics", file: "/materials/first-year/semester-2/paper-06/management-basics-for-information-professionals.pdf" },
    ],
    questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P06.html" }]
  },
  "Paper 07": {
    notes: [
      { title: "Digital Library – Overview", file: "/materials/first-year/semester-2/paper-07/digital-library.pdf" },
      { title: "DSpace 9 – Data Notes", file: "/materials/first-year/semester-2/paper-07/dspace-9-data.pdf" },
      { title: "Digital Library – Core Concepts", file: "/materials/first-year/semester-2/paper-07/digital-library-core.pdf" },
    ],
    questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P07.html" }]
  },
  "Paper 08": {
    notes: [
      { title: "Introduction to Knowledge Management", file: "/materials/first-year/semester-2/paper-08/km-introduction.pdf" },
      { title: "Introduction to KM (Part 2)", file: "/materials/first-year/semester-2/paper-08/km-introduction-2.pdf" },
      { title: "Knowledge Management Cycle", file: "/materials/first-year/semester-2/paper-08/km-cycle.pdf" },
      { title: "Wiig Knowledge Management Cycle", file: "/materials/first-year/semester-2/paper-08/wiig-km-cycle.pdf" },
      { title: "Knowledge Management Metrics", file: "/materials/first-year/semester-2/paper-08/km-metrics.pdf" },
      { title: "Knowledge Management Tools", file: "/materials/first-year/semester-2/paper-08/km-tools.pdf" },
      { title: "Knowledge Management Strategy", file: "/materials/first-year/semester-2/paper-08/knowledge-management-strategy.pdf" },
    ],
    references: [
      { title: "Knowledge Management – Kimiz Dalkir", file: "/materials/first-year/semester-2/paper-08/knowledge-management-kimiz-dalkir.pdf" },
    ],
    questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P08.html" }]
  },
  "Paper 09": { 
    notes: [], ppt: [], references: [],
    questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P09.html" }] 
  },
  
  // --- PAPER 10 (SPECIAL DUAL DATA) ---
  "Paper 10": {
    type: "paper10_special", 
    
    // JUNIOR BATCH DATA (2025-27) - Included your specific file here
    junior: {
      colloquium_group1: [
        { title: "Colloquium Presentation 1", student: "Student Name", file: "/materials/first-year/semester-2/paper-10/colloquium-1.pdf" }
      ], 
      colloquium_group2: [],
      subject_group1: [], subject_group2: [], subject_group3: [], subject_group4: [],
    },

    // SENIOR BATCH DATA (2024-26) - PAST WORK
    senior: {
      colloquium_group1: [], 
      colloquium_group2: [],
      subject_group1: [], subject_group2: [], subject_group3: [], subject_group4: [],
    }
  },

  /* --- SEMESTER 3 --- */
  "Paper 11": { questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P11.html" }] },
  "Paper 12": { questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P12.html" }] },
  "Paper 13": { questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P13.html" }] },
  "Paper 14": { questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P14.html" }] },
  
  // --- PAPER 15 (SEMINAR) ---
  "Paper 15": { 
    type: "seminar_special", 
    senior_seminars: [] 
  },

  /* --- SEMESTER 4 --- */
  "Paper 16": { questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P16.html" }] },
  "Paper 17": { questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P17.html" }] },
  "Paper 18": { questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P18.html" }] },
  "Paper 19": {
    questions: [
      { title: "Geographical Information Systems", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P19E1.html" },
      { title: "Health Informatics", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P19E2.html" },
      { title: "Data and Text Mining", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P19E3.html" }
    ]
  },
  
  // --- PAPER 20 (DISSERTATION) ---
  "Paper 20": { 
    type: "dissertation_special", 
    senior_theses: [] 
  }
}

/* =========================================
   MAIN COMPONENT
   ========================================= */
export default function Paper({ paper, goBack, batch }) {
  const paperCode = paper.split('–')[0].trim()
  const rawData = paperDatabase[paperCode] || { notes: [], ppt: [], references: [], questions: [] }
  
  // --- SPECIAL TYPES ---
  const isPaper10 = rawData.type === "paper10_special"
  const isSeminar = rawData.type === "seminar_special"
  const isDissertation = rawData.type === "dissertation_special"
  const isSenior = batch === "2024-26"

  // --- SMART FILTER LOGIC ---
  let showStandardContent = true

  // 1. If Senior Batch viewing First Year Papers (01-09), HIDE Standard Content (Notes/QPs)
  // Because they have passed and don't need study notes.
  const firstYearPapers = ["Paper 01", "Paper 02", "Paper 03", "Paper 04", "Paper 05", "Paper 06", "Paper 07", "Paper 08", "Paper 09"]
  if (isSenior && firstYearPapers.includes(paperCode)) {
    showStandardContent = false
  }

  // 2. Paper 10 Logic: Select Senior vs Junior Data
  let p10Data = isSenior ? rawData.senior : rawData.junior

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
          <button onClick={goBack} className="flex items-center gap-2 text-indigo-400 hover:text-white transition-colors mb-6 group text-xs font-bold uppercase tracking-widest py-3 pr-4 -ml-2">
            <span className="bg-indigo-500/10 p-2 rounded-lg group-hover:bg-indigo-500 group-hover:text-white transition-all">← Back</span>
          </button>
          
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            {paper.split('–')[0]} 
            <span className="block text-xl md:text-3xl text-slate-400 font-normal mt-1">{paper.split('–')[1]}</span>
          </h1>

          <div className="mt-4">
            <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border ${isSenior ? 'bg-cyan-900/50 text-cyan-400 border-cyan-500/30' : 'bg-indigo-900/50 text-indigo-400 border-indigo-500/30'}`}>
              Batch {batch} View
            </span>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT GRID --- */}
      <div className="max-w-6xl mx-auto px-6 py-8 md:py-12">
        
        {/* SCENARIO 1: PAPER 10 (Colloquium/Study of Subject) */}
        {isPaper10 && (
          <div className="space-y-16">
            <div>
               <h2 className="text-2xl font-black text-white mb-8 border-l-4 border-indigo-500 pl-4">I. Colloquium</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <SpecialCard groupName="Group 1" items={p10Data?.colloquium_group1} onOpen={openFile} color="indigo" />
                 <SpecialCard groupName="Group 2" items={p10Data?.colloquium_group2} onOpen={openFile} color="indigo" />
               </div>
            </div>
            <div>
               <h2 className="text-2xl font-black text-white mb-8 border-l-4 border-teal-500 pl-4">II. Study of Subject</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <SpecialCard groupName="Group 1" items={p10Data?.subject_group1} onOpen={openFile} color="teal" />
                 <SpecialCard groupName="Group 2" items={p10Data?.subject_group2} onOpen={openFile} color="teal" />
                 <SpecialCard groupName="Group 3" items={p10Data?.subject_group3} onOpen={openFile} color="teal" />
                 <SpecialCard groupName="Group 4" items={p10Data?.subject_group4} onOpen={openFile} color="teal" />
               </div>
            </div>
          </div>
        )}

        {/* SCENARIO 2: PAPER 15 (Seminar Showcase) - Only for Seniors */}
        {isSeminar && (
           <div>
             <h2 className="text-2xl font-black text-white mb-8 border-l-4 border-violet-500 pl-4">Seminar Presentations</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <SpecialCard groupName="Seminar Files" items={rawData.senior_seminars} onOpen={openFile} color="indigo" />
             </div>
           </div>
        )}

        {/* SCENARIO 3: PAPER 20 (Dissertation Showcase) - Only for Seniors */}
        {isDissertation && (
           <div>
             <h2 className="text-2xl font-black text-white mb-8 border-l-4 border-rose-500 pl-4">Dissertation / Theses</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <SpecialCard groupName="Final Submissions" items={rawData.senior_theses} onOpen={openFile} color="teal" />
             </div>
           </div>
        )}

        {/* SCENARIO 4: STANDARD CONTENT (Notes/QPs) */}
        {!isPaper10 && !isSeminar && !isDissertation && showStandardContent ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <ResourceCard title="Lecture Notes" icon="📘" items={rawData.notes} onOpen={openFile} theme="indigo" emptyMsg="Notes will be uploaded after lectures." />
            <ResourceCard title="Presentations" icon="📊" items={rawData.ppt} onOpen={openFile} theme="violet" emptyMsg="Classroom slides will appear here." />
            <ResourceCard title="Reference Material" icon="📚" items={rawData.references} onOpen={openFile} theme="emerald" emptyMsg="Additional reading resources." />
            <ResourceCard title="Question Papers" icon="📝" items={rawData.questions} onOpen={openFile} theme="amber" emptyMsg="Archive link not available." />
          </div>
        ) : (
           // IF CONTENT HIDDEN (e.g. Senior viewing Paper 06)
           !isPaper10 && !isSeminar && !isDissertation && (
             <div className="py-20 text-center border border-white/5 rounded-3xl bg-slate-900/50">
               <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Archived Subject</p>
               <p className="text-slate-600 text-xs mt-2">Study materials hidden for Senior Batch view.</p>
             </div>
           )
        )}

      </div>
    </div>
  )
}

/* =========================================
   UI COMPONENTS
   ========================================= */

function SpecialCard({ groupName, items, onOpen, color }) {
  const styles = color === 'indigo' 
    ? "bg-indigo-900/10 border-indigo-500/20 hover:border-indigo-500/50" 
    : "bg-teal-900/10 border-teal-500/20 hover:border-teal-500/50"

  const textStyle = color === 'indigo' ? "text-indigo-400" : "text-teal-400"

  return (
    <div className={`p-8 rounded-3xl border ${styles} transition-all hover:bg-slate-900/50 group`}>
       <h3 className={`text-3xl font-black ${textStyle} mb-6 tracking-tighter opacity-80 group-hover:opacity-100`}>{groupName}</h3>
       {items && items.length > 0 ? (
         <ul className="space-y-3">
           {items.map((item, i) => (
             <li key={i} onClick={() => onOpen(item.file)} className="flex items-center gap-3 p-3 rounded-xl bg-slate-950/30 border border-white/5 cursor-pointer hover:bg-white/5">
                <div className="w-2 h-2 rounded-full bg-slate-500"></div>
                <span className="text-slate-300 text-sm font-medium">{item.title}</span> 
             </li>
           ))}
         </ul>
       ) : (
         <div className="h-24 flex items-center justify-center border-2 border-dashed border-white/5 rounded-2xl">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Pending Uploads</span>
         </div>
       )}
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
        <span className="text-[10px] font-bold bg-white/5 px-2 py-1 rounded text-slate-400 border border-white/5">
          {items?.length > 0 && items[0].file.startsWith('http') ? 'EXTERNAL' : `${items?.length || 0} FILES`}
        </span>
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
              {item.file.startsWith('http') && (
                <svg className={`w-4 h-4 ${textColors[theme]}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              )}
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