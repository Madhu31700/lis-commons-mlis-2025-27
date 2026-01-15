export default function Paper({ paper, goBack }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <button
        onClick={goBack}
        className="mb-10 text-indigo-400 hover:underline"
      >
        ← Back to Semester
      </button>

      <h1 className="text-2xl font-bold mb-6 text-slate-100">
        {paper}
      </h1>

      <div className="space-y-6">
        <div className="bg-slate-800/60 rounded-xl p-6">
          📘 Notes (PDF)
        </div>
        <div className="bg-slate-800/60 rounded-xl p-6">
          📊 PPT Slides
        </div>
        <div className="bg-slate-800/60 rounded-xl p-6">
          📚 Reference Materials
        </div>
        <div className="bg-slate-800/60 rounded-xl p-6">
          📝 Previous Question Papers
        </div>
      </div>
    </div>
  )
}
