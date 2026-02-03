import { useEffect, useRef } from "react"

export default function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)
    
    let particles = []
    const particleCount = 60 // Number of dots

    // Resize handling
    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener("resize", handleResize)

    // Particle Class
    class Particle {
      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.vx = (Math.random() - 0.5) * 0.3 // Speed X
        this.vy = (Math.random() - 0.5) * 0.3 // Speed Y
        this.size = Math.random() * 2 + 1
      }
      update() {
        this.x += this.vx
        this.y += this.vy
        if (this.x < 0 || this.x > width) this.vx *= -1
        if (this.y < 0 || this.y > height) this.vy *= -1
      }
      draw() {
        ctx.fillStyle = "rgba(99, 102, 241, 0.6)" // Indigo dots
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Initialize
    for (let i = 0; i < particleCount; i++) particles.push(new Particle())

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      
      // Draw lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.15 - distance/1000})`
            ctx.lineWidth = 0.8
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
        particles[i].update()
        particles[i].draw()
      }
      requestAnimationFrame(animate)
    }
    animate()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <section className="w-full relative h-[35vh] md:h-[85vh] overflow-hidden">
      
      {/* 1. BACKGROUND IMAGE (Your Group Photo) */}
      <div 
        className="absolute inset-0 bg-cover bg-no-repeat bg-[center_25%] md:bg-center z-0"
        style={{ backgroundImage: "url('/images/hero/hero1.jpg')" }}
      ></div>

      {/* 2. GRADIENT OVERLAY (Darker at bottom to make text readable) */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/90 z-10"></div>

      {/* 3. PARTICLE CANVAS (Floating on top) */}
      <canvas ref={canvasRef} className="absolute inset-0 z-20 opacity-60 pointer-events-none" />

      {/* 4. TEXT CONTENT */}
      <div
        className="
          relative z-30 w-full h-full
          flex items-start md:items-center justify-center
          text-center px-4
          pt-24 md:pt-0
        "
      >
        <div className="transform translate-y-0 md:-translate-y-20">
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

          <p className="mt-2 md:mt-6 text-xs md:text-base tracking-widest text-slate-200 font-medium">
            A Shared Journey of Learning
          </p>
        </div>
      </div>
    </section>
  )
}