import Hero from "./Hero"
import { getQuoteOfTheDay } from "../data/quotes"

export default function Home({ openFirstYear, openSecondYear }) {
  const quote = getQuoteOfTheDay()

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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
      </main>
    </>
  )
}
