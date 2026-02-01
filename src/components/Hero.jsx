export default function Hero() {
  return (
    <section className="w-full">
      <div
        className="
          relative w-full
          /* HEIGHT: Mobile = 35vh (Short), Desktop = 85vh (Tall) */
          h-[35vh] md:h-[85vh] 
          
          flex 
          items-start md:items-center 
          justify-center

          /* BACKGROUND IMAGE CONFIGURATION */
          bg-cover bg-no-repeat
          
          /* CRITICAL FIX: 
             - Mobile: 'bg-[center_25%]' -> Focuses slightly higher to show faces 
             - Desktop (md): 'md:bg-center' -> RESTORES your original perfect computer view 
          */
          bg-[center_25%] md:bg-center
        "
        style={{
          backgroundImage: "url('/images/hero/hero1.jpg')",
          // Note: We removed backgroundPosition from here to let Tailwind handle it
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-indigo-900/30 to-slate-900/80"></div>

        {/* Content Container */}
        <div
          className="
            relative z-10 max-w-7xl px-4 text-center w-full
            pt-24 md:pt-0
            transform translate-y-0 md:-translate-y-20
          "
        >
          {/* Title */}
          <h1
            className="
              text-[clamp(2.5rem,9vw,5rem)] md:text-[clamp(3.5rem,8.5vw,7rem)]
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
          <p className="mt-2 md:mt-6 text-xs md:text-base tracking-widest text-slate-200">
            A Shared Journey of Learning
          </p>
        </div>
      </div>
    </section>
  )
}