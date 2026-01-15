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
  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <button
        onClick={goBack}
        className="mb-10 text-indigo-400 hover:underline"
      >
        ← Back to Year
      </button>

      <h1 className="text-3xl font-bold mb-12 text-slate-100">
        {semester}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {papersBySemester[semester].map((p) => (
          <div
            key={p}
            onClick={() => openPaper(p)}
            className="cursor-pointer bg-slate-800/60 rounded-2xl p-6 hover:scale-[1.02] transition"
          >
            {p}
          </div>
        ))}
      </div>
    </div>
  )
}
