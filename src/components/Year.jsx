export default function Year({ year, openSemester, goBack }) {
  const semesters =
    year === "First Year"
      ? ["Semester I", "Semester II"]
      : ["Semester III", "Semester IV"]

  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <button
        onClick={goBack}
        className="mb-10 text-indigo-400 hover:underline"
      >
        ← Back to Home
      </button>

      <h1 className="text-3xl font-bold mb-12 text-slate-100">
        {year}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {semesters.map((s) => (
          <div
            key={s}
            onClick={() => openSemester(s)}
            className="cursor-pointer bg-gradient-to-br from-indigo-800/60 to-slate-800/60 rounded-3xl p-10 hover:scale-[1.03] transition"
          >
            <h2 className="text-2xl font-semibold">{s}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}
