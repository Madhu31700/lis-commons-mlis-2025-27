import Hero from "./Hero"
import { Link } from "react-router-dom"

export default function HeroHome() {
  return (
    <div className="relative">
      <Hero />

      {/* Navigation Section (SEPARATE FROM HERO) */}
      <main className="relative z-50 max-w-6xl mx-auto px-6 py-20 bg-zinc-950">
        <h2 className="text-2xl font-semibold mb-8 text-zinc-100">
          Academic Repository
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/first-year">
            <HomeCard
              title="First Year"
              subtitle="Semester-wise syllabus and materials"
            />
          </Link>

          <HomeCard
            title="Second Year"
            subtitle="Advanced courses & research support"
          />

          <HomeCard
            title="UGC NET"
            subtitle="Paper 1 & LIS preparation resources"
          />
        </div>
      </main>
    </div>
  )
}

function HomeCard({ title, subtitle }) {
  return (
    <div className="cursor-pointer bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-blue-500 hover:-translate-y-1 transition">
      <h3 className="text-lg font-semibold mb-2 text-zinc-100">
        {title}
      </h3>
      <p className="text-sm text-zinc-400">
        {subtitle}
      </p>
    </div>
  )
}
