import { useAuth } from "../context/AuthContext"

const ADMIN_EMAILS = [
  "madhu@drtc.isibang.ac.in",
  "amisha@drtc.isibang.ac.in",
  "madhu31700@gmail.com",
]

export default function Footer({ visitCount }) {
  const { user } = useAuth()
  const isAdmin = user && ADMIN_EMAILS.includes(user.email)
  const today = "24 Mar 2026" // Update manually when you deploy new changes

  return (
    <footer style={{
      fontFamily: "'Plus Jakarta Sans',sans-serif",
      background: 'linear-gradient(160deg,#0D1A16,#1A302A)',
      borderTop: '1px solid rgba(29,158,117,0.15)',
      marginTop: 'auto',
    }}>

      {/* ── MAIN CONTENT ── */}
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        padding: 'clamp(36px,5vw,56px) clamp(16px,4vw,32px) clamp(24px,4vw,36px)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
        gap: '36px',
      }}>

        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center',
            gap: '10px', marginBottom: '14px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'linear-gradient(135deg,#1D9E75,#5DCAA5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Lora',serif", fontSize: '17px',
              fontWeight: '600', color: '#fff',
            }}>L</div>
            <div>
              <div style={{ fontFamily: "'Lora',serif", fontSize: '16px',
                fontWeight: '600', color: '#fff', lineHeight: 1 }}>
                Librandhana
              </div>
              <div style={{ fontSize: '9px', color: '#1D9E75',
                fontWeight: '700', letterSpacing: '0.15em',
                textTransform: 'uppercase', marginTop: '2px' }}>
                DRTC · ISI Bangalore
              </div>
            </div>
          </div>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)',
            lineHeight: '1.7', maxWidth: '240px' }}>
            A shared platform for MLIS students — notes, blog, placement, and community.
          </p>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            marginTop: '14px', background: 'rgba(29,158,117,0.1)',
            border: '1px solid rgba(29,158,117,0.2)',
            borderRadius: '100px', padding: '5px 12px',
          }}>
            <span style={{ width: '6px', height: '6px', background: '#1D9E75',
              borderRadius: '50%' }} />
            <span style={{ fontSize: '11px', fontWeight: '600',
              color: '#1D9E75' }}>System Online</span>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#1D9E75',
            textTransform: 'uppercase', letterSpacing: '0.15em',
            marginBottom: '16px' }}>
            Quick Links
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { label: 'Blog',          href: '?view=blog' },
              { label: 'Events',        href: '?view=events' },
              { label: 'Aspirants',     href: '?view=aspirants' },
              { label: 'Job Alerts',    href: '?view=jobs' },
              { label: 'MLIS Syllabus', href: 'https://www.isibang.ac.in/~adean/infsys/acadata/Brochures/mslis_new.pdf', external: true },
            ].map(l => (
              <a key={l.label} href={l.href}
                target={l.external ? '_blank' : undefined}
                rel={l.external ? 'noreferrer' : undefined}
                style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)',
                  textDecoration: 'none', transition: 'color 0.15s',
                  display: 'flex', alignItems: 'center', gap: '6px' }}
                onMouseEnter={e => e.target.style.color = '#1D9E75'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}>
                {l.label}
                {l.external && <span style={{ fontSize: '10px' }}>↗</span>}
              </a>
            ))}
          </div>
        </div>

        {/* Built by */}
        <div>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#1D9E75',
            textTransform: 'uppercase', letterSpacing: '0.15em',
            marginBottom: '16px' }}>
            Project
          </div>
          <div style={{
            background: 'rgba(29,158,117,0.06)',
            border: '1px solid rgba(29,158,117,0.15)',
            borderRadius: '14px', padding: '16px',
          }}>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)',
              marginBottom: '4px' }}>Concept & Development</div>
            <a href="https://www.linkedin.com/in/madhu-m01"
              target="_blank" rel="noreferrer"
              style={{ fontFamily: "'Lora',serif", fontSize: '16px',
                fontWeight: '600', color: '#5DCAA5', textDecoration: 'none' }}>
              Madhu M ↗
            </a>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)',
              marginTop: '4px' }}>MLIS 2025–2027 · DRTC ISI</div>
            <div style={{
              marginTop: '12px', paddingTop: '12px',
              borderTop: '1px solid rgba(29,158,117,0.1)',
              fontSize: '11px', color: 'rgba(255,255,255,0.25)',
            }}>
              Built with React · Supabase · Firebase
            </div>
          </div>
        </div>

        {/* Stats */}
        <div>
          <div style={{ fontSize: '11px', fontWeight: '700', color: '#1D9E75',
            textTransform: 'uppercase', letterSpacing: '0.15em',
            marginBottom: '16px' }}>
            Stats
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '12px', padding: '12px 14px',
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span style={{ fontSize: '12px',
                color: 'rgba(255,255,255,0.4)' }}>Total Visits</span>
              <span style={{ fontFamily: 'monospace', fontSize: '15px',
                fontWeight: '700', color: '#fff' }}>
                {visitCount ? visitCount.toLocaleString() : '—'}
              </span>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '12px', padding: '12px 14px',
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span style={{ fontSize: '12px',
                color: 'rgba(255,255,255,0.4)' }}>Access Level</span>
              <span style={{
                fontSize: '11px', fontWeight: '700', padding: '2px 10px',
                borderRadius: '100px',
                background: isAdmin
                  ? 'rgba(224,74,74,0.15)' : 'rgba(29,158,117,0.15)',
                color: isAdmin ? '#F09595' : '#5DCAA5',
              }}>
                {isAdmin ? 'Admin' : 'Student'}
              </span>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '12px', padding: '12px 14px',
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span style={{ fontSize: '12px',
                color: 'rgba(255,255,255,0.4)' }}>Last Updated</span>
              <span style={{ fontSize: '12px', fontWeight: '600',
                color: 'rgba(255,255,255,0.6)' }}>{today}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div style={{
        borderTop: '1px solid rgba(29,158,117,0.1)',
        padding: 'clamp(14px,2vw,20px) clamp(16px,4vw,32px)',
        maxWidth: '1100px', margin: '0 auto',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: '10px',
      }}>
        <span style={{ fontSize: '12px',
          color: 'rgba(255,255,255,0.25)' }}>
          © {new Date().getFullYear()} Librandhana · Open Access Academic License
        </span>
        <span style={{ fontSize: '12px',
          color: 'rgba(255,255,255,0.25)' }}>
          DRTC · Documentation Research & Training Centre · ISI Bangalore
        </span>
      </div>
    </footer>
  )
}