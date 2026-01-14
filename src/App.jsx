import Hero from "./components/Hero"
import MaterialCard from "./components/MaterialCard"

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
  <Hero />

  <main className="max-w-6xl mx-auto px-6 py-16">
    <section className="mb-20">
      <h2 className="text-2xl font-semibold mb-8">
        Academic Repository
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-2">First Year</h3>
          <p className="text-zinc-400 text-sm">
            Semester-wise syllabus and materials
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-2">Second Year</h3>
          <p className="text-zinc-400 text-sm">
            Advanced courses and research support
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-2">UGC NET</h3>
          <p className="text-zinc-400 text-sm">
            Paper 1 & LIS preparation resources
          </p>
        </div>
      </div>
    </section>
  </main>
</div>
  )
}
