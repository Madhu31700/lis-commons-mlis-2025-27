import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { auth } from "../firebase"
import { signOut } from "firebase/auth"

const ADMIN_EMAILS = [
  "madhu@drtc.isibang.ac.in",
  "amisha@drtc.isibang.ac.in",
  "madhu31700@gmail.com",
]

export default function Header({ goHome, openDashboard, onLogin, currentView, changeView }) {
  const { user } = useAuth()
  const [imgError,   setImgError]   = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)
  const isAdmin = user && ADMIN_EMAILS.includes(user.email)

  const handleLogout = () => {
    signOut(auth)
    goHome()
    setMenuOpen(false)
  }

  const nav = (view) => {
    changeView ? changeView(view) : (window.location.href = `?view=${view}`)
    setMenuOpen(false)
  }

  const NAV_LINKS = [
    { label: 'Blog',      view: 'blog' },
    { label: 'Events',    view: 'events' },
    { label: 'Jobs',      view: 'jobs' },
    { label: 'Q&A',       view: 'qa' },
    { label: 'Resources', view: 'resources' },
  ]

  const linkStyle = (view) => ({
    fontSize: '13px', fontWeight: '500', cursor: 'pointer',
    padding: '6px 10px', borderRadius: '8px', border: 'none',
    background: currentView === view ? 'rgba(29,158,117,0.1)' : 'transparent',
    color: currentView === view ? '#1D9E75' : '#5A7A6E',
    transition: 'all 0.15s',
    textDecoration: 'none',
  })

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(255,255,255,0.97)',
      borderBottom: '1px solid rgba(29,158,117,0.12)',
      backdropFilter: 'blur(12px)',
      fontFamily: "'Plus Jakarta Sans',sans-serif",
    }}>
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        padding: '0 clamp(16px,4vw,32px)',
        height: '58px', display: 'flex',
        alignItems: 'center', justifyContent: 'space-between',
      }}>

        {/* Logo */}
        <div onClick={goHome} style={{
          display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer',
        }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '8px',
            background: 'linear-gradient(135deg,#1D9E75,#5DCAA5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Lora',serif", fontSize: '16px',
            fontWeight: '600', color: '#fff', flexShrink: 0,
          }}>L</div>
          <div>
            <div style={{ fontFamily: "'Lora',serif", fontSize: '15px',
              fontWeight: '600', color: '#0D1A16', lineHeight: 1 }}>
              Librandhana
            </div>
            <div style={{ fontSize: '8px', color: '#1D9E75', fontWeight: '700',
              letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              DRTC · ISI Bangalore
            </div>
          </div>
        </div>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px',
          '@media(max-width:640px)': { display: 'none' } }}>
          {NAV_LINKS.map(l => (
            <button key={l.view} onClick={() => nav(l.view)} style={linkStyle(l.view)}>
              {l.label}
            </button>
          ))}
          {isAdmin && (
            <button onClick={openDashboard} style={{
              ...linkStyle('dashboard'),
              color: '#A32D2D',
              background: currentView === 'dashboard'
                ? 'rgba(162,45,45,0.1)' : 'transparent',
            }}>Admin</button>
          )}
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px',
              background: '#F5F7F6', border: '1px solid rgba(29,158,117,0.15)',
              borderRadius: '100px', padding: '4px 12px 4px 4px' }}>
              {user.photoURL && !imgError ? (
                <img src={user.photoURL} onError={() => setImgError(true)}
                  style={{ width: '28px', height: '28px', borderRadius: '50%',
                    objectFit: 'cover', border: '1.5px solid #1D9E75' }} alt="" />
              ) : (
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: 'linear-gradient(135deg,#1D9E75,#5DCAA5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: '12px', fontWeight: '700',
                }}>
                  {user.displayName?.charAt(0).toUpperCase()}
                </div>
              )}
              <span style={{ fontSize: '13px', fontWeight: '600',
                color: '#0D1A16' }}>
                {user.displayName?.split(' ')[0]}
              </span>
              <button onClick={handleLogout} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: '11px', color: '#8FA89E', fontWeight: '600',
                padding: '2px 6px',
              }}>Log out</button>
            </div>
          ) : (
            <button onClick={onLogin} style={{
              background: 'linear-gradient(135deg,#1D9E75,#0F6E56)',
              color: '#fff', border: 'none', borderRadius: '100px',
              padding: '8px 18px', fontSize: '12px', fontWeight: '600',
              cursor: 'pointer',
            }}>Student Login</button>
          )}
        </div>
      </div>
    </nav>
  )
}