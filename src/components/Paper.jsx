import { useState } from "react"

/* =========================================
   FULL DATA SOURCE (DRIVE FOLDERS)
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

  // Helper to get question link safely (since P19 has multiple, others have 1)
  const questionLink = rawData.questions && rawData.questions.length > 0 ? rawData.questions[0].file : null

  return (
    <div className="min-h-screen bg-slate-950 pb-20 font-sans">
      
      {/* HEADER */}
      <div className="relative bg-slate-900 border-b border-slate-800 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <button onClick={goBack} className="text-slate-400 hover:text-white mb-6 text-xs font-bold uppercase tracking-widest transition-colors flex items-center gap-2">
            ← Back
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{paper.split('–')[0]}</h1>
          <p className="text-xl text-slate-400">{paper.split('–')[1]}</p>
          <div className="mt-6">
            <span className={`text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-widest border ${isSenior ? 'bg-cyan-900/20 text-cyan-400 border-cyan-800' : 'bg-indigo-900/20 text-indigo-400 border-indigo-800'}`}>
              View Mode: {batch}
            </span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        {/* P10, P15, P20 SECTIONS (UNCHANGED) */}
        {isPaper10 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <DriveCard 
               title="Colloquium Files" 
               subtitle="Presentations & Docs"
               onClick={() => openLink(rawData.junior_drive)}
               color="indigo"
               hidden={isSenior}
             />
             {isSenior && <div className="md:col-span-2 py-12 text-center border border-dashed border-slate-800 rounded-xl bg-slate-900/30"><p className="text-slate-500 text-sm">Senior Archive Coming Soon</p></div>}
          </div>
        )}

        {isSeminar && <ProfessionalSection title="Seminar" color="violet"><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><ProfessionalGroup groupName="Files" items={rawData.senior_seminars} onOpen={openLink} /></div></ProfessionalSection>}
        {isDissertation && <ProfessionalSection title="Dissertation" color="rose"><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><ProfessionalGroup groupName="Theses" items={rawData.senior_theses} onOpen={openLink} /></div></ProfessionalSection>}

        {/* === STANDARD PAPERS (01-09, 11-19) === */}
        {!isPaper10 && !isSeminar && !isDissertation && showStandardContent ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* CARD 1: CLASS NOTES (Drive Card Style) */}
            {rawData.drive_link ? (
               <DriveCard 
                 title="Class Notes & References" 
                 subtitle="Access Google Drive Folder"
                 onClick={() => openLink(rawData.drive_link)}
                 color="indigo"
               />
            ) : (
               <div className="p-8 border border-dashed border-slate-800 rounded-2xl flex items-center justify-center text-slate-600 italic h-48">
                  Notes Drive Link Pending
               </div>
            )}

            {/* CARD 2: QUESTION BANK (Now matches Drive Card Style) */}
            {paperCode === "Paper 19" ? (
               // Special case for P19 (Multiple Links) - keep list style
               <ResourceList title="Question Bank (Multiple)" items={rawData.questions} onOpen={openLink} color="amber" />
            ) : (
               // Standard case - Use the beautiful Drive Card style
               <DriveCard 
                 title="Official Question Bank" 
                 subtitle="Previous Years Papers" 
                 onClick={() => openLink(questionLink)} 
                 color="amber" 
                 emptyMsg="No links available"
               />
            )}
          
          </div>
        ) : (
           !isPaper10 && !isSeminar && !isDissertation && (
             <div className="py-24 text-center border border-dashed border-slate-800 rounded-xl bg-slate-900/30">
               <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">Archived for Senior Cohort</p>
             </div>
           )
        )}

      </div>
    </div>
  )
}

/* --- REUSABLE COMPONENTS --- */

// The Unified Card Design (Used for both Notes & Question Bank)
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
        cursor-pointer group
        p-8 rounded-2xl border transition-all duration-300
        flex flex-col justify-between h-48
        ${colors[color]}
      `}
    >
      <div className="flex justify-between items-start">
        <div className="p-3 bg-slate-950 rounded-lg border border-white/5">
          {color === 'indigo' ? (
             /* Folder Icon */
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"/></svg>
          ) : (
             /* Document Icon */
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          )}
        </div>
        <span className="text-xl group-hover:translate-x-1 transition-transform">↗</span>
      </div>
      <div>
        <h3 className="text-2xl font-bold text-white mb-1">{title}</h3>
        <p className="text-sm opacity-70 font-medium uppercase tracking-wider">{subtitle}</p>
      </div>
    </div>
  )
}

function ProfessionalSection({ title, color, children }) {
  const colors = { violet: "border-violet-500", rose: "border-rose-500" }
  return <div><h2 className={`text-xl font-bold text-white mb-6 pl-4 border-l-4 ${colors[color]}`}>{title}</h2>{children}</div>
}

function ProfessionalGroup({ groupName, items, onOpen }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 hover:border-slate-700 transition-colors">
      <h3 className="text-lg font-bold text-white mb-4">{groupName}</h3>
      {items?.length > 0 ? (
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} onClick={() => onOpen(item.file)} className="flex items-center gap-3 p-3 rounded bg-slate-950 border border-slate-800 cursor-pointer hover:bg-slate-800 transition-colors group">
               <div className="w-1.5 h-1.5 bg-slate-600 rounded-full group-hover:bg-indigo-400 transition-colors"></div>
               <span className="text-slate-300 text-sm group-hover:text-white">{item.title}</span>
            </li>
          ))}
        </ul>
      ) : <div className="text-slate-600 text-xs italic">No files available</div>}
    </div>
  )
}

function ResourceList({ title, items, onOpen, color }) {
  const colors = { amber: "text-amber-400" }
  return (
    <div className="h-full bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col hover:border-slate-700 transition-colors">
      <h3 className={`text-lg font-bold mb-6 uppercase tracking-wider text-xs ${colors[color]} flex items-center gap-2`}><span>📝</span> {title}</h3>
      <div className="space-y-2 flex-grow">
        {items?.map((item, i) => (
          <div key={i} onClick={() => onOpen(item.file)} className="flex items-center justify-between p-4 rounded-lg border border-white/5 bg-slate-950/50 cursor-pointer hover:bg-slate-800 hover:border-white/10 transition-all group">
             <span className="text-slate-300 text-sm font-medium group-hover:text-white">{item.title}</span><span className="text-slate-600 text-[10px] group-hover:text-slate-400">OPEN ↗</span>
          </div>
        ))}
      </div>
    </div>
  )
}