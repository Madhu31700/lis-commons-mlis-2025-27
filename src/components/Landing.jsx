import { useState, useEffect } from "react"

const FEATURES = [
  {
    emoji: "✍️",
    title: "Student Blog",
    desc: "Notes, opinions, tacit knowledge and experiences — written by DRTC students.",
    bg: "#E1F5EE", color: "#085041",
  },
  {
    emoji: "🎓",
    title: "Aspirants Guide",
    desc: "Everything about the DRTC MLIS exam, ISI Bangalore life, and how to prepare.",
    bg: "#E6F1FB", color: "#0C447C",
  },
  {
    emoji: "💼",
    title: "LIS Job Alerts",
    desc: "Curated library and information science job listings. Subscribe for email alerts.",
    bg: "#FAEEDA", color: "#633806",
  },
  {
    emoji: "📅",
    title: "LIS Events",
    desc: "Local, national, and global library science events, conferences, and webinars.",
    bg: "#EEEDFE", color: "#3C3489",
  },
  {
    emoji: "📚",
    title: "Class Resources",
    desc: "Semester notes, past papers, syllabus — exclusive for DRTC MLIS students.",
    bg: "#E1F5EE", color: "#085041",
  },
  {
    emoji: "🤝",
    title: "Placement Cell",
    desc: "Internship opportunities and placement support for DRTC students.",
    bg: "#FBEAF0", color: "#72243E",
  },
]

const RECENT_POSTS = [
  { tag: "Tacit Knowledge", title: "What nobody tells you about the first semester at DRTC", author: "Amisha", time: "5 days ago" },
  { tag: "Career",          title: "UGC NET Library Science — a guide from someone who cleared it", author: "Ravi S",  time: "1 week ago" },
  { tag: "ISI Life",        title: "Cafeteria, campus walks and why ISI Bangalore is special", author: "Priya K", time: "2 days ago" },
]

export default function Landing({ onLogin }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setTimeout(() => setReady(true), 80)
  }, [])

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", background: '#fff', color: '#0D1A16' }}>

      {/* ── TOP BAR ── */}
      <div style={{ height: '3px', background: 'linear-gradient(90deg,#1D9E75,#5DCAA5,#1D9E75)' }} />

      {/* ── HEADER ── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(255,255,255,0.97)',
        borderBottom: '1px solid rgba(29,158,117,0.12)',
        backdropFilter: 'blur(12px)',
      }}>
        <div style={{
          maxWidth: '1100px', margin: '0 auto',
          padding: '0 clamp(16px,4vw,32px)', height: '58px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px',
              background: 'linear-gradient(135deg,#1D9E75,#5DCAA5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Lora',serif", fontSize: '16px', fontWeight: '600', color: '#fff',
            }}>L</div>
            <div>
              <div style={{ fontFamily: "'Lora',serif", fontSize: '15px', fontWeight: '600', color: '#0D1A16', lineHeight: 1 }}>Librandhana</div>
              <div style={{ fontSize: '8px', color: '#1D9E75', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase' }}>DRTC · ISI Bangalore</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <a href="?view=blog" style={{ fontSize: '13px', color: '#5A7A6E', fontWeight: '500', textDecoration: 'none', padding: '6px 12px' }}>Blog</a>
            <a href="?view=events" style={{ fontSize: '13px', color: '#5A7A6E', fontWeight: '500', textDecoration: 'none', padding: '6px 12px' }}>Events</a>
            <a href="?view=aspirants" style={{ fontSize: '13px', color: '#5A7A6E', fontWeight: '500', textDecoration: 'none', padding: '6px 12px' }}>Aspirants</a>
            <button onClick={onLogin} style={{
              background: 'linear-gradient(135deg,#1D9E75,#0F6E56)',
              color: '#fff', border: 'none', borderRadius: '100px',
              padding: '8px 18px', fontSize: '12px', fontWeight: '600', cursor: 'pointer',
            }}>Student Login</button>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={{
        background: 'linear-gradient(160deg,#E1F5EE 0%,#9FE1CB 20%,#E8F8F2 50%,#fff 100%)',
        padding: 'clamp(48px,8vw,80px) clamp(16px,4vw,32px) clamp(40px,6vw,64px)',
        textAlign: 'center',
      }}>
        <div style={{
          opacity: ready ? 1 : 0,
          transform: ready ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s ease',
          maxWidth: '700px', margin: '0 auto',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '7px',
            background: 'rgba(29,158,117,0.1)', border: '1px solid rgba(29,158,117,0.25)',
            borderRadius: '100px', padding: '5px 14px',
            fontSize: '11px', fontWeight: '700', color: '#085041',
            letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px',
          }}>
            <span style={{ width: '6px', height: '6px', background: '#1D9E75', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
            MLIS 2024–27 · DRTC · ISI Bangalore
          </div>

          <h1 style={{
            fontFamily: "'Lora',serif",
            fontSize: 'clamp(32px,5vw,54px)',
            fontWeight: '600', lineHeight: '1.15', color: '#0D1A16',
            marginBottom: '18px',
          }}>
            A Shared Journey<br />
            <em style={{
              fontStyle: 'italic',
              background: 'linear-gradient(90deg,#0F6E56,#1D9E75,#5DCAA5)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>of Learning.</em>
          </h1>

          <p style={{
            fontSize: 'clamp(14px,2vw,16px)', color: '#5A7A6E',
            lineHeight: '1.75', maxWidth: '500px', margin: '0 auto 32px',
          }}>
            The student platform for DRTC MLIS students — blog, resources, events, job alerts, and a guide for future LIS scholars.
          </p>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={onLogin} style={{
              background: 'linear-gradient(135deg,#1D9E75,#0F6E56)',
              color: '#fff', border: 'none', borderRadius: '100px',
              padding: '13px 28px', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
            }}>
              Student Login →
            </button>
            <a href="?view=aspirants" style={{
              background: 'transparent', color: '#0D1A16',
              border: '1.5px solid rgba(13,26,22,0.2)',
              borderRadius: '100px', padding: '13px 28px',
              fontSize: '13px', fontWeight: '600', textDecoration: 'none',
            }}>
              Aspiring MLIS? →
            </a>
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(48px,6vw,72px) clamp(16px,4vw,32px)' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', color: '#1D9E75', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '10px' }}>
            What's inside
          </div>
          <h2 style={{ fontFamily: "'Lora',serif", fontSize: 'clamp(22px,3vw,32px)', fontWeight: '600', color: '#0D1A16' }}>
            Everything a DRTC student needs
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '16px' }}>
          {FEATURES.map(f => (
            <div key={f.title} className="card-hover" style={{
              border: '1.5px solid rgba(29,158,117,0.12)',
              borderRadius: '18px', padding: '22px', cursor: 'pointer', background: '#fff',
            }}>
              <div style={{
                width: '42px', height: '42px', borderRadius: '12px',
                background: f.bg, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '18px', marginBottom: '14px',
              }}>{f.emoji}</div>
              <div style={{ fontFamily: "'Lora',serif", fontSize: '15px', fontWeight: '600', color: '#0D1A16', marginBottom: '6px' }}>{f.title}</div>
              <p style={{ fontSize: '12px', color: '#5A7A6E', lineHeight: '1.65' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── RECENT POSTS ── */}
      <section style={{
        background: 'linear-gradient(180deg,#F5F7F6,#fff)',
        padding: 'clamp(40px,6vw,64px) clamp(16px,4vw,32px)',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
            <h2 style={{ fontFamily: "'Lora',serif", fontSize: 'clamp(20px,3vw,28px)', fontWeight: '600', color: '#0D1A16' }}>
              Recent from the Blog
            </h2>
            <a href="?view=blog" style={{ fontSize: '13px', color: '#1D9E75', fontWeight: '600', textDecoration: 'none' }}>
              View all posts →
            </a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: '16px' }}>
            {RECENT_POSTS.map(p => (
              <div key={p.title} className="card-hover" style={{
                background: '#fff', border: '1.5px solid rgba(29,158,117,0.1)',
                borderRadius: '16px', padding: '20px', cursor: 'pointer',
              }}>
                <span style={{
                  display: 'inline-flex', padding: '2px 10px', borderRadius: '100px',
                  fontSize: '10px', fontWeight: '700', background: '#E1F5EE', color: '#085041',
                  marginBottom: '10px',
                }}>{p.tag}</span>
                <h3 style={{
                  fontFamily: "'Lora',serif", fontSize: '14px', fontWeight: '600',
                  color: '#0D1A16', lineHeight: '1.45', marginBottom: '12px',
                }}>{p.title}</h3>
                <div style={{ fontSize: '11px', color: '#8FA89E' }}>
                  {p.author} · {p.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ASPIRANTS CTA ── */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(16px,4vw,32px) clamp(48px,6vw,72px)' }}>
        <div style={{
          background: 'linear-gradient(135deg,#0D1A16,#1A302A)',
          borderRadius: '20px', padding: 'clamp(36px,5vw,52px)',
          textAlign: 'center', position: 'relative', overflow: 'hidden',
        }}>
          <svg style={{ position: 'absolute', opacity: 0.04, top: -20, right: -20 }} width="200" height="200" viewBox="0 0 200 200" fill="white">
            <path d="M100 10 L112 70 L170 70 L122 105 L140 165 L100 130 L60 165 L78 105 L30 70 L88 70Z"/>
          </svg>
          <div style={{ fontSize: '24px', marginBottom: '12px' }}>✦</div>
          <h2 style={{ fontFamily: "'Lora',serif", fontSize: 'clamp(20px,3vw,28px)', fontWeight: '600', color: '#fff', marginBottom: '10px' }}>
            Dreaming of DRTC MLIS?
          </h2>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginBottom: '24px', lineHeight: '1.7', maxWidth: '400px', margin: '0 auto 24px' }}>
            Read about the entrance exam, ISI Bangalore campus life, and experiences from current students.
          </p>
          <a href="?view=aspirants" style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg,#1D9E75,#5DCAA5)',
            color: '#fff', border: 'none', borderRadius: '100px',
            padding: '13px 28px', fontSize: '13px', fontWeight: '700',
            textDecoration: 'none', cursor: 'pointer',
          }}>
            Read the Aspirants Guide →
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: '1px solid rgba(29,158,117,0.1)',
        padding: 'clamp(20px,3vw,28px) clamp(16px,4vw,32px)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '24px', height: '24px', borderRadius: '6px',
            background: 'linear-gradient(135deg,#1D9E75,#5DCAA5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Lora',serif", fontSize: '12px', fontWeight: '600', color: '#fff',
          }}>L</div>
          <span style={{ fontFamily: "'Lora',serif", fontSize: '13px', fontWeight: '600', color: '#0D1A16' }}>Librandhana</span>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          {['Blog','Events','Aspirants','Jobs'].map(l => (
            <a key={l} href={`?view=${l.toLowerCase()}`} style={{ fontSize: '12px', color: '#8FA89E', textDecoration: 'none' }}>{l}</a>
          ))}
        </div>
        <span style={{ fontSize: '11px', color: '#8FA89E' }}>
          Built by <a href="https://linkedin.com/in/madhu-m01" target="_blank" rel="noreferrer" style={{ color: '#1D9E75' }}>Madhu M</a> · DRTC ISI Bangalore
        </span>
      </footer>
    </div>
  )
}