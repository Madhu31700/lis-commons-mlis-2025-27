const semester2Materials = {
  "Paper 06 – Library Management and Automation": {
    notes: [
      {
        title: "Unit-wise Notes (PDF)",
        file: "/materials/first-year/semester-2/paper-06/syllabus.pdf",
      },
    ],
    ppt: [],
    references: [],
    questions: [],
  },

  "Paper 07 – Digital Libraries": {
    notes: [
      {
        title: "Lecture Notes (PDF)",
        file: "/materials/first-year/semester-2/paper-07/notes.pdf",
      },
    ],
    ppt: [],
    references: [],
    questions: [],
  },

  "Paper 08 – Knowledge Management": {
    notes: [],
    ppt: [],
    references: [],
    questions: [],
  },

  "Paper 09 – Elements of Mathematics and Statistics": {
    notes: [],
    ppt: [],
    references: [],
    questions: [],
  },

  "Paper 10 – Colloquium and Study of Subject": {
    notes: [],
    ppt: [],
    references: [],
    questions: [],
  },
}

export default function Paper({ paper, goBack }) {
  const data = semester2Materials[paper]

  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      {/* Back */}
      <button
        onClick={goBack}
        className="mb-10 text-indigo-400 hover:underline"
      >
        ← Back to Semester
      </button>

      {/* Paper title */}
      <h1 className="text-2xl font-bold mb-8 text-slate-100">
        {paper}
      </h1>

      {/* Description */}
      <p className="text-slate-300 mb-12 max-w-3xl">
        This section will contain study materials for this paper.
        Notes, presentations, references, and question papers will be
        added gradually as the course progresses.
      </p>

      {/* Material sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* NOTES */}
        <div className="bg-slate-800/50 rounded-2xl p-8">
          <h2 className="text-lg font-semibold mb-2">
            📘 Notes (PDF)
          </h2>

          {data && data.notes.length > 0 ? (
            <ul className="space-y-2 text-sm">
              {data.notes.map((n) => (
  <li key={n.file}>
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        window.open(n.file, "_blank", "noopener,noreferrer")
      }}
      className="text-indigo-400 hover:underline text-left"
    >
      {n.title}
    </button>
  </li>
))}
            </ul>
          ) : (
            <p className="text-slate-400 text-sm">
              Lecture notes and reading material will appear here.
            </p>
          )}
        </div>

        {/* PPT */}
        <div className="bg-slate-800/50 rounded-2xl p-8">
          <h2 className="text-lg font-semibold mb-2">
            📊 PPT Slides
          </h2>

          {data && data.ppt.length > 0 ? (
            <ul className="space-y-2 text-sm">
              {data.ppt.map((p) => (
                <li key={p.file}>
                  <a
                    href={p.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:underline"
                  >
                    {p.title}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-400 text-sm">
              Classroom presentations will be added here.
            </p>
          )}
        </div>

        {/* REFERENCES */}
        <div className="bg-slate-800/50 rounded-2xl p-8">
          <h2 className="text-lg font-semibold mb-2">
            📚 Reference Materials
          </h2>

          {data && data.references.length > 0 ? (
            <ul className="space-y-2 text-sm">
              {data.references.map((r) => (
                <li key={r.file}>
                  <a
                    href={r.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:underline"
                  >
                    {r.title}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-400 text-sm">
              Books, articles, and external readings.
            </p>
          )}
        </div>

        {/* QUESTION PAPERS */}
        <div className="bg-slate-800/50 rounded-2xl p-8">
          <h2 className="text-lg font-semibold mb-2">
            📝 Question Papers
          </h2>

          {data && data.questions.length > 0 ? (
            <ul className="space-y-2 text-sm">
              {data.questions.map((q) => (
                <li key={q.file}>
                  <a
                    href={q.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:underline"
                  >
                    {q.title}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-400 text-sm">
              Previous year and practice question papers.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
