// Remove useState import since we use props now
import { useState } from "react" 

const semesterData = {
  "Semester I": [
    "Paper 01 – Foundations of Library and Information Science",
    "Paper 02 – Information Organisation",
    "Paper 03 – Cataloguing and Metadata",
    "Paper 04 – Information Sources, Systems and Services",
    "Paper 05 – Foundations of ICT",
  ],
  "Semester II": [
    "Paper 06 – Library Management and Automation",
    "Paper 07 – Digital Libraries",
    "Paper 08 – Knowledge Management",
    "Paper 09 – Elements of Mathematics and Statistics",
    "Paper 10 – Colloquium and Study of Subject",
  ],
  "Semester III": [
    "Paper 11 – Information Retrieval",
    "Paper 12 – Content Management Systems",
    "Paper 13 – Data Management",
    "Paper 14 – Research Methodology and Technical Writing",
    "Paper 15 – Seminar",
  ],
  "Semester IV": [
    "Paper 16 – Scientometrics and Informetrics",
    "Paper 17 – Web Based Information Systems and Services",
    "Paper 18 – Semantic Web",
    "Paper 19 – Electives",
    "Paper 20 – Dissertation",
  ],
}

// 🔥 ACCEPT PROPS HERE
export default function Year({ openPaper, goBack, activeTab, setActiveTab }) {
  
  const tabs = ["Semester I", "Semester II", "Semester III", "Semester IV"]
  
  // Use props instead of local state
  const currentPapers = semesterData[activeTab] || []

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-indigo-500/30 pb-20">
      
      {/* GLOBAL BACKGROUND */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0"></div>
      <div className="fixed inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-10">
        
        {/* --- HEADER --- */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={goBack} 
            className="group flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900/50 border border-white/10 hover:border-indigo-500/50 transition-all text-slate-400 hover:text-white"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span className="text-xs font-bold uppercase tracking-widest">Back to Hub</span>
          </button>
          
          <div className="hidden md:flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
             <span className="text-indigo-400 text-[10px] font-bold uppercase tracking-widest">Junior Cohort</span>
          </div>
        </div>

        <div className="mb-8">
           <h1 className="text-3xl md:text-5xl font-black text-white mb-2">
             Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Library</span>
           </h1>
           <p className="text-slate-400 text-sm">Select a semester tab to view papers.</p>
        </div>

        {/* --- TABS (STICKY TOP) --- */}
        <div className="sticky top-4 z-50 mb-10 p-2 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl flex overflow-x-auto no-scrollbar gap-2 shadow-2xl">
           {tabs.map((tab) => (
             <button
               key={tab}
               onClick={() => setActiveTab(tab)} // 🔥 Updates parent state
               className={`
                 flex-1 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap
                 ${activeTab === tab 
                   ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 scale-[1.02]" 
                   : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                 }
               `}
             >
               {tab}
             </button>
           ))}
        </div>

        {/* --- PAPERS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
           {currentPapers.map((paperStr, index) => {
             const [codePart, titlePart] = paperStr.split(' – ')
             const paperCode = codePart.replace('Paper ', '')

             return (
               <div 
                 key={index}
                 onClick={() => openPaper(paperStr)}
                 className="
                   group cursor-pointer relative overflow-hidden
                   bg-slate-900/40 border border-white/5 p-6 rounded-[2rem]
                   hover:bg-slate-900/60 hover:border-indigo-500/30 hover:scale-[1.01] 
                   transition-all duration-300 shadow-lg
                 "
               >
                 <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl -mr-8 -mt-8 group-hover:bg-indigo-500/20 transition-all"></div>

                 <div className="relative z-10 flex flex-col justify-between h-full min-h-[160px]">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-black text-slate-400 bg-slate-950 px-2 py-1 rounded border border-slate-800 uppercase tracking-widest group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-colors">
                          P-{paperCode}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-500 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                           <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"/></svg>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-slate-200 leading-snug group-hover:text-white transition-colors">
                        {titlePart}
                      </h3>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                       <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider group-hover:text-indigo-300">View Resources</span>
                    </div>
                 </div>
               </div>
             )
           })}
        </div>
      </div>
    </div>
  )
}