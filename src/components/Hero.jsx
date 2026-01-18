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
            LIBRANDHANA
          </h1>

          <p className="mt-4 text-slate-400 tracking-widest text-sm">
  A Shared Journey of Learning
</p>

        
        </div>
      </div>
    </section>
  )
}
