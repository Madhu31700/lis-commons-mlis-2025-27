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
        <div
          className="
            relative z-10 max-w-7xl px-8 text-center
            transform -translate-y-20
          "
        >
          {/* Title */}
          <h1
            className="
              text-[clamp(3.5rem,8.5vw,7rem)]
              font-extrabold
              tracking-[0.14em]
              bg-gradient-to-r from-indigo-300 via-cyan-200 to-fuchsia-300
              bg-clip-text text-transparent
              drop-shadow-[0_8px_35px_rgba(99,102,241,0.45)]
              leading-none
            "
          >
            LIBRANDHANA
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-sm md:text-base tracking-widest text-slate-200">
            A Shared Journey of Learning
          </p>
        </div>
      </div>
    </section>
  )
}
