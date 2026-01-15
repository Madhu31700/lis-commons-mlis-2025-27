export default function Hero() {
  return (
    <section className="w-full">
      <div
        className="relative h-[85vh] flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/hero/hero1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-indigo-900/50 to-slate-900/80"></div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-slate-100">
            The LIS Commons
          </h1>

          <p className="text-slate-300 text-lg mb-2">
            MLIS 2025–2027
          </p>

          <p className="text-slate-400 italic">
            A Cinematic Academic Repository & Class Memory
          </p>
        </div>
      </div>
    </section>
  )
}
