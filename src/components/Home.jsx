export default function Home({ goFirstYear }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        The LIS Commons
      </h1>

      <p className="text-zinc-400 mb-16">
        MLIS 2025–2027 · A Digital Academic Repository
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          onClick={goFirstYear}
          className="cursor-pointer bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-700 rounded-3xl p-8 hover:scale-[1.02] transition"
        >
          <h2 className="text-xl font-semibold mb-3">
            First Year
          </h2>
          <p className="text-zinc-400">
            Semester-wise syllabus & materials
          </p>
        </div>

        <div className="opacity-40 bg-zinc-900 rounded-3xl p-8">
          Second Year
        </div>

        <div className="opacity-40 bg-zinc-900 rounded-3xl p-8">
          UGC NET
        </div>
      </div>
    </div>
  )
}
