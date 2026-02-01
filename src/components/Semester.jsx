const papersBySemester = {
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

export default function Semester({ semester, openPaper, goBack }) {
  const papers = papersBySemester[semester] || []

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 px-6 py-12 selection:bg-indigo-500/30">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-16 pt-8">
        <button 
          onClick={goBack} 
          className="text-xs font-bold text-slate-500 hover:text-indigo-400 uppercase tracking-widest transition-colors mb-6 flex items-center gap-2"
        >
          <span className="bg-slate-900 border border-slate-800 p-2 rounded-lg">← Back</span>
        </button>
        
        <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
          {semester}
        </h1>
        <p className="text-slate-400 text-lg">
          Select a paper to view study materials and resources.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {papers.map((paperStr, index) => {
          // Extract Paper ID (e.g., "01") and Title
          const [codePart, titlePart] = paperStr.split(' – ')
          const paperCode = codePart.replace('Paper ', '')

          return (
            <div 
              key={paperStr}
              onClick={() => openPaper(paperStr)}
              className="
                group
                cursor-pointer
                bg-slate-900/40 
                border border-white/5 
                hover:border-indigo-500/50 
                hover:bg-slate-900/80
                backdrop-blur-sm
                p-6 
                rounded-3xl 
                transition-all 
                duration-300 
                hover:-translate-y-1
                hover:shadow-2xl hover:shadow-indigo-500/10
                flex flex-col justify-between
                min-h-[200px]
              "
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-black text-slate-500 bg-slate-950 px-2 py-1 rounded border border-slate-800 uppercase tracking-widest group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-colors">
                    P-{paperCode}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-500 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"/></svg>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-200 leading-tight group-hover:text-white transition-colors">
                  {titlePart}
                </h3>
              </div>

              <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center">
                <span className="text-xs text-slate-500 font-medium group-hover:text-slate-400">View Materials</span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-emerald-400 transition-colors"></span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}