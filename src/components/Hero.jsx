import { getQuoteOfTheDay } from "../data/quotes"

export default function Hero() {
  const quote = getQuoteOfTheDay()

  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden select-none">
      {/* Background Images */}
      <div className="absolute inset-0">
        <img
          src="/images/hero/hero1.jpg"
          alt="Class memories"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl px-6 text-center pointer-events-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          The LIS Commons
        </h1>

        <p className="text-zinc-300 text-lg mb-2">
          MLIS 2025–2027
        </p>

        <p className="text-zinc-400 italic mb-10">
          A Digital Repository of Learning & Legacy
        </p>

        {/* Quote of the Day */}
        <div className="max-w-3xl mx-auto border border-zinc-800 bg-black/40 rounded-xl p-6 mb-10">
          <p className="text-zinc-200 text-lg leading-relaxed">
            “{quote.text}”
          </p>
          <p className="text-zinc-400 mt-3 text-sm">
            — {quote.author}
          </p>
        </div>

      
      </div>
    </section>
  )
}