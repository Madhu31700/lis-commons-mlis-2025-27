const semester2Materials = {
  "Paper 06 – Library Management and Automation": {
    notes: [
  {
    title: "Syllabus (PDF)",
    file: "/materials/first-year/semester-2/paper-06/syllabus.pdf",
  },
  {
    title: "Unit 1 Notes (PDF)",
    file: "/materials/first-year/semester-2/paper-06/unit1-notes.pdf",
  },
  {
    title: "Unit 2 Notes (PDF)",
    file: "/materials/first-year/semester-2/paper-06/unit2-notes.pdf",
  },
],
    ppt: [],
    references: [
  {
    title: "Selecting and Implementing an Integrated Library System",
    file: "/materials/first-year/semester-2/paper-06/selecting-and-implementing-an-integrated-library-system.pdf",
  },
  {
    title: "Human Resource Management: A Contemporary Approach",
    file: "/materials/first-year/semester-2/paper-06/human-resource-management-a-contemporary-approach.pdf",
  },
  {
    title: "Fundamentals of Collection Development and Management",
    file: "/materials/first-year/semester-2/paper-06/fundamentals-of-collection-development-and-management.pdf",
  },
  {
    title: "Principles for the Handling",
    file: "/materials/first-year/semester-2/paper-06/principles-for-the-handling.pdf",
  },
  {
    title: "Management Challenges for the 21st Century",
    file: "/materials/first-year/semester-2/paper-06/management-challenges-for-the-21st-century.pdf",
  },
  {
    title: "Management Basics for Information Professionals",
    file: "/materials/first-year/semester-2/paper-06/management-basics-for-information-professionals.pdf",
  },
],
    questions: [],
  },
}

export default function Paper({ paper, goBack }) {
  const data = semester2Materials[paper]

  const openFile = (file) => {
    window.open(file, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      {/* Back */}
      <button
        onClick={goBack}
        className="mb-10 text-indigo-400 hover:underline"
        type="button"
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
                    onClick={() => openFile(n.file)}
                    className="text-indigo-400 hover:underline"
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
          <p className="text-slate-400 text-sm">
            Classroom presentations will be added here.
          </p>
        </div>

        {/* REFERENCES */}
        <div className="bg-slate-800/50 rounded-2xl p-8">
          <h2 className="text-lg font-semibold mb-2">
            📚 Reference Materials
          </h2>
          <p className="text-slate-400 text-sm">
            Books, articles, and external readings.
          </p>
        </div>

        {/* QUESTIONS */}
        <div className="bg-slate-800/50 rounded-2xl p-8">
          <h2 className="text-lg font-semibold mb-2">
            📝 Question Papers
          </h2>
          <p className="text-slate-400 text-sm">
            Previous year and practice question papers.
          </p>
        </div>
      </div>
    </div>
  )
}
