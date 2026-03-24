import { useAuth } from "../context/AuthContext"

export default function Hero() {
  const { user } = useAuth()
  const firstName = user?.displayName?.split(' ')[0] || 'Scholar'
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div style={{
      background: 'linear-gradient(160deg,#E1F5EE 0%,#9FE1CB 20%,#f0faf6 60%,#fff 100%)',
      padding: 'clamp(32px,5vw,52px) clamp(16px,4vw,32px)',
      borderBottom: '1px solid rgba(29,158,117,0.1)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: 'rgba(29,158,117,0.1)',
              border: '1px solid rgba(29,158,117,0.2)',
              borderRadius: '100px', padding: '4px 12px',
              fontSize: '11px', fontWeight: '700', color: '#085041',
              letterSpacing: '0.08em', textTransform: 'uppercase',
              marginBottom: '12px',
            }}>
              <span style={{ width: '6px', height: '6px', background: '#1D9E75',
                borderRadius: '50%' }} />
              MLIS 2025–27 · DRTC · ISI Bangalore
            </div>
            <h1 style={{
              fontFamily: "'Lora',serif",
              fontSize: 'clamp(24px,4vw,40px)',
              fontWeight: '600', color: '#0D1A16', lineHeight: '1.2',
              marginBottom: '6px',
            }}>
              {greeting}, <em style={{
                fontStyle: 'italic',
                background: 'linear-gradient(90deg,#0F6E56,#1D9E75,#5DCAA5)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>{firstName}.</em>
            </h1>
            <p style={{ fontSize: '14px', color: '#5A7A6E', lineHeight: '1.6' }}>
              Welcome to your student hub — notes, blog, placement, and more.
            </p>
          </div>

          {/* Avatar */}
          <div style={{ display: 'flex', alignItems: 'center',
            gap: '12px', flexShrink: 0 }}>
            {user?.photoURL ? (
              <img src={user.photoURL}
                style={{ width: '52px', height: '52px', borderRadius: '50%',
                  objectFit: 'cover', border: '2px solid #1D9E75' }}
                alt="" />
            ) : (
              <div style={{
                width: '52px', height: '52px', borderRadius: '50%',
                background: 'linear-gradient(135deg,#1D9E75,#5DCAA5)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: '20px', fontWeight: '700',
                border: '2px solid #1D9E75',
              }}>
                {user?.displayName?.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#0D1A16' }}>
                {user?.displayName}
              </div>
              <div style={{ fontSize: '11px', color: '#5A7A6E' }}>
                {user?.email}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}