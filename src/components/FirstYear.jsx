export default function FirstYear({ goHome }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-24">
      <button
        onClick={goHome}
        className="mb-10 text-blue-400 hover:underline"
      >
        ← Back to Home
      </button>

      <h1 className="text-3xl font-bold mb-6">
        First Year · MLIS
      </h1>

      <p className="text-zinc-400 mb-10">
        Semester-wise academic materials
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-900 rounded-2xl p-6">
          Semester 1
        </div>
        <div className="bg-zinc-900 rounded-2xl p-6">
          Semester 2
        </div>
      </div>
    </div>
  )
}
