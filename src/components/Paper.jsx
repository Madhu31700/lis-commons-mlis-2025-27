import { useState } from "react"

/* =========================================
   FULL DATA SOURCE (Your Links Preserved)
   ========================================= */
const paperDatabase = {
  /* --- SEMESTER 1 --- */
  "Paper 01": { questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P01.html" }] },
  "Paper 02": { questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P02.html" }] },
  "Paper 03": { questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P03.html" }] },
  "Paper 04": { questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P04.html" }] },
  "Paper 05": { questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P05.html" }] },

  /* --- SEMESTER 2 --- */
  "Paper 06": {
    drive_link: "https://drive.google.com/drive/folders/1VnDTxjeXITYuPIjFdACQ0MF2tgkmoFS7",
    questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P06.html" }]
  },
  "Paper 07": {
    drive_link: "https://drive.google.com/drive/folders/1sC3yGrGilPILDVWT_V5kZgYeyFIqlNop",
    questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P07.html" }]
  },
  "Paper 08": {
    drive_link: "https://drive.google.com/drive/folders/1DQ8fqZ6gAj85iFeDJ7iBeYWxiHOqq4-f",
    questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P08.html" }]
  },
  "Paper 09": {
    drive_link: "https://drive.google.com/drive/folders/1sKOMdlZoYW2U6TiSAAHbcbKFHnG-6eqD",
    questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P09.html" }]
  },
  
  // --- PAPER 10 ---
  "Paper 10": {
    type: "paper10_special",
    junior_drive: "https://drive.google.com/drive/folders/1h5V4XIO5WviU6u8kWmQybTNI0yb9TD8-",
    senior: { colloquium_group1: [], subject_group1: [] } 
  },

  /* --- SEMESTERS 3 & 4 --- */
  "Paper 11": { questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P11.html" }] },
  "Paper 12": { questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P12.html" }] },
  "Paper 13": { questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P13.html" }] },
  "Paper 14": { questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P14.html" }] },
  "Paper 15": { type: "seminar_special", senior_seminars: [] },
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
  "Paper 20": { type: "dissertation_special", senior_theses: [] }
}

/* =========================================
   MAIN COMPONENT
   ========================================= */
export default function Paper({ paper, goBack, batch }) {
  const paperCode = paper.split('–')[0].trim()
  const rawData = paperDatabase[paperCode] || { questions: [] }
  
  const isPaper10 = rawData.type === "paper10_special"
  const isSeminar = rawData.type === "seminar_special"
  const isDissertation = rawData.type === "dissertation_special"
  const isSenior = batch === "2024-26"

  // LOGIC: Hide Notes/QPs for Seniors if viewing First Year papers
  let showStandardContent = true
  const firstYearPapers = ["Paper 01", "Paper 02", "Paper 03", "Paper 04", "Paper 05", "Paper 06", "Paper 07", "Paper 08", "Paper 09"]
  if (isSenior && firstYearPapers.includes(paperCode)) showStandardContent = false

  const openLink = (url) => {
    if (!url) return alert("Link coming soon.")
    window.open(url, "_blank", "noopener,noreferrer")
  }

  // Helper to get question link safely
  const questionLink = rawData.questions && rawData.questions.length > 0 ? rawData.questions[0].file : null

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-indigo-500/30 pb-20">
      
      {/* GLOBAL BACKGROUND */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0"></div>
      <div className="fixed inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-12">
        
        {/* HEADER */}
        <button 
          onClick={goBack} 
          className="group mb-8 flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900/50 border border-white/10 hover:border-indigo-500/50 transition-all text-slate-400 hover:text-white"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span className="text-xs font-bold uppercase tracking-widest">Back</span>
        </button>

        <div className="mb-12">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest px-3 py-1 bg-indigo-500/10 rounded-md border border-indigo-500/20">
             {paper.split('–')[0]}
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white mt-4 mb-2 leading-tight">
            {paper.split('–')[1]}
          </h1>
          <div className="flex items-center gap-2 mt-4">
             <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border ${isSenior ? 'bg-cyan-900/20 text-cyan-400 border-cyan-800' : 'bg-indigo-900/20 text-indigo-400 border-indigo-800'}`}>
               {batch} Cohort
             </span>
          </div>
        </div>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
          
          {/* --- Special Sections (P10, Seminar, Dissertation) --- */}
          {isPaper10 && (
            <DriveCard 
              title="Colloquium Files" 
              subtitle="Presentations & Docs"
              onClick={() => openLink(rawData.junior_drive)}
              color="indigo"
              hidden={isSenior}
            />
          )}

          {isSeminar && (
            <div className="col-span-full">
              <ProfessionalSection title="Seminar" color="violet">
                <ProfessionalGroup groupName="Files" items={rawData.senior_seminars} onOpen={openLink} />
              </ProfessionalSection>
            </div>
          )}

          {isDissertation && (
            <div className="col-span-full">
              <ProfessionalSection title="Dissertation" color="rose">
                <ProfessionalGroup groupName="Theses" items={rawData.senior_theses} onOpen={openLink} />
              </ProfessionalSection>
            </div>
          )}

          {/* --- Standard Content (Notes & QPs) --- */}
          {!isPaper10 && !isSeminar && !isDissertation && showStandardContent ? (
            <>
              {/* CARD 1: CLASS NOTES */}
              {rawData.drive_link ? (
                 <DriveCard 
                   title="Class Notes" 
                   subtitle="Access Drive Folder"
                   onClick={() => openLink(rawData.drive_link)}
                   color="indigo"
                 />
              ) : (
                 <div className="p-8 border border-dashed border-slate-800 rounded-[2.5rem] flex items-center justify-center text-slate-600 italic h-64 bg-slate-900/30">
                    <div className="text-center">
                        <p className="text-2xl mb-2">📂</p>
                        <p className="text-xs uppercase tracking-widest font-bold">No Notes Available</p>
                    </div>
                 </div>
              )}

              {/* CARD 2: QUESTION BANK */}
              {paperCode === "Paper 19" ? (
                 <ResourceList title="Question Bank (Multiple)" items={rawData.questions} onOpen={openLink} color="amber" />
              ) : (
                 <DriveCard 
                   title="Question Bank" 
                   subtitle="Previous Years Papers" 
                   onClick={() => openLink(questionLink)} 
                   color="amber" 
                   emptyMsg="No links available"
                 />
              )}
            </>
          ) : (
             !isPaper10 && !isSeminar && !isDissertation && (
               <div className="col-span-full py-24 text-center border border-dashed border-slate-800 rounded-[2.5rem] bg-slate-900/30">
                 <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">Archived for Senior Cohort</p>
               </div>
             )
          )}

        </div>
      </div>
    </div>
  )
}

/* --- REUSABLE COMPONENTS --- */

function DriveCard({ title, subtitle, onClick, color, hidden }) {
  if (hidden) return null
  
  const colors = {
    indigo: "border-indigo-500/20 hover:border-indigo-500 bg-indigo-500/5 hover:bg-indigo-500/10 text-indigo-400",
    amber: "border-amber-500/20 hover:border-amber-500 bg-amber-500/5 hover:bg-amber-500/10 text-amber-400",
  }

  return (
    <div 
      onClick={onClick}
      className={`
        cursor-pointer group relative overflow-hidden
        p-8 rounded-[2.5rem] border transition-all duration-300
        flex flex-col justify-between h-64
        ${colors[color]} hover:scale-[1.02] shadow-2xl
      `}
    >
      <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
         {color === 'indigo' ? (
            <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"/></svg>
         ) : (
            <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
         )}
      </div>
      
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-white mb-1">{title}</h3>
        <p className="text-xs opacity-70 font-bold uppercase tracking-wider">{subtitle}</p>
      </div>
      
      <span className="relative z-10 inline-flex items-center gap-2 px-6 py-3 bg-white/10 rounded-xl text-xs font-black uppercase text-white hover:bg-white/20 transition-colors w-fit border border-white/5 backdrop-blur-sm">
        Access Materials ↗
      </span>
    </div>
  )
}

function ProfessionalSection({ title, color, children }) {
  const colors = { violet: "text-violet-400 border-violet-500", rose: "text-rose-400 border-rose-500" }
  return (
    <div className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] p-8">
      <h2 className={`text-xl font-bold mb-8 pl-4 border-l-4 ${colors[color].split(" ")[1]} ${colors[color].split(" ")[0]}`}>
        {title} Resources
      </h2>
      {children}
    </div>
  )
}

function ProfessionalGroup({ groupName, items, onOpen }) {
  return (
    <div className="bg-slate-950/50 border border-white/5 rounded-2xl p-6">
      <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4">{groupName}</h3>
      {items?.length > 0 ? (
        <ul className="space-y-3">
          {items.map((item, i) => (
            <li key={i} onClick={() => onOpen(item.file)} className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer hover:bg-slate-800 hover:border-indigo-500/50 transition-all group">
               <div className="w-2 h-2 bg-slate-600 rounded-full group-hover:bg-indigo-400 transition-colors"></div>
               <span className="text-slate-300 text-sm font-medium group-hover:text-white">{item.title}</span>
            </li>
          ))}
        </ul>
      ) : <div className="text-slate-600 text-xs italic">No files available yet.</div>}
    </div>
  )
}

function ResourceList({ title, items, onOpen, color }) {
  const colors = { amber: "text-amber-400" }
  return (
    <div className="h-64 bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8 flex flex-col hover:border-amber-500/50 transition-colors relative overflow-hidden group">
      <h3 className={`text-xl font-bold mb-6 uppercase tracking-wider text-xs ${colors[color]} flex items-center gap-2 relative z-10`}>
        <span>📝</span> {title}
      </h3>
      <div className="space-y-2 overflow-y-auto pr-2 custom-scrollbar relative z-10">
        {items?.map((item, i) => (
          <div key={i} onClick={() => onOpen(item.file)} className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-slate-950/50 cursor-pointer hover:bg-slate-800 hover:border-white/10 transition-all group-item">
             <span className="text-slate-300 text-sm font-medium group-hover:text-white">{item.title}</span>
             <span className="text-slate-600 text-[10px] group-hover:text-amber-400">OPEN ↗</span>
          </div>
        ))}
      </div>
    </div>
  )
}