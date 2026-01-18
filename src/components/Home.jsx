import Hero from "./Hero"
import { getQuoteOfTheDay } from "../data/quotes"
import { auth } from "../firebase"

const PLACEMENT_EMAILS = [
  "madhu@drtc.isibang.ac.in",
  "amisha@drtc.isibang.ac.in",
]

export default function Home({
  openFirstYear,
  openSecondYear,
  openInternshipForm,
  openDashboard,
}) {
  const quote = getQuoteOfTheDay()
  const user = auth.currentUser
  const isPlacementRep =
    user && PLACEMENT_EMAILS.includes(user.email)

  return (
    <>
      <Hero />

      <main className="max-w-6xl mx-auto px-6 py-28">
        {/* Quote */}
        <div className="mb-24 max-w-3xl">
          <p className="text-xl italic text-slate-300 mb-3 leading-relaxed">
            “{quote.text}”
          </p>
          <p className="text-sm text-slate-400">
            — {quote.author}
          </p>
        </div>

        {/* Section heading */}
        <h2 className="text-3xl font-semibold mb-16 text-slate-100 tracking-tight">
          Academic Repository
          <span className="block mt-3 h-[2px] w-20 bg-gradient-to-r from-indigo-400 to-teal-400 rounded-full"></span>
        </h2>

        {/* Year cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
          {/* First Year */}
          <div
            onClick={openFirstYear}
            className="
              cursor-pointer
              bg-gradient-to-br
              from-indigo-800/70
              via-slate-700/60
              to-teal-800/70
              rounded-3xl
              p-10
              transition-all
              duration-300
              hover:scale-[1.04]
              hover:shadow-[0_25px_60px_rgba(15,23,42,0.6)]
            "
          >
            <h3 className="text-2xl font-semibold mb-3 text-slate-100">
              First Year
            </h3>
            <p className="text-slate-300">
              Semester I & II · Core LIS Foundations
            </p>
          </div>

          {/* Second Year */}
          <div
            onClick={openSecondYear}
            className="
              cursor-pointer
              bg-gradient-to-br
              from-teal-800/70
              via-slate-700/60
              to-indigo-800/70
              rounded-3xl
              p-10
              transition-all
              duration-300
              hover:scale-[1.04]
              hover:shadow-[0_25px_60px_rgba(15,23,42,0.6)]
            "
          >
            <h3 className="text-2xl font-semibold mb-3 text-slate-100">
              Second Year
            </h3>
            <p className="text-slate-300">
              Semester III & IV · Advanced LIS & Research
            </p>
          </div>
        </div>

        {/* Internship Section */}
        <section className="mt-32 text-center">
          <h3 className="text-2xl font-semibold mb-4 text-slate-100">
            Internship & Placement Coordination
          </h3>

          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            This form helps the placement representatives understand internship
            interests of MLIS 2025–2027 students.
          </p>

          <button
            onClick={openInternshipForm}
            className="
              px-10 py-4
              rounded-full
              bg-gradient-to-r from-indigo-600 to-teal-500
              hover:from-indigo-700 hover:to-teal-600
              transition
              text-white
              tracking-wide
              text-lg
              shadow-lg
            "
          >
            Open Internship Interest Form
          </button>

          {/* Placement Dashboard Button (VISIBLE ONLY TO PLACEMENT REPS) */}
          {isPlacementRep && (
            <div className="mt-10">
              <button
                onClick={openDashboard}
                className="
                  px-8 py-3
                  rounded-full
                  bg-slate-800
                  hover:bg-slate-700
                  transition
                  text-slate-200
                  border border-slate-700
                "
              >
                Placement Representative Dashboard
              </button>
            </div>
          )}

          <p className="mt-4 text-sm text-slate-500">
            Accessible only within the Librandhana MLIS community
          </p>
        </section>
      </main>
    </>
  )
}
