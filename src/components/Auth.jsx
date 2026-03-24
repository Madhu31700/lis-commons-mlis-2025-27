import { useState } from "react"
import { auth, db } from "../firebase"
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"

const SUPER_ADMINS = [
  "madhu@drtc.isibang.ac.in",
  "amisha@drtc.isibang.ac.in",
  "madhu31700@gmail.com",
]

export default function Auth({ onClose, forceLogin }) {
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState("")

  const handleLogin = async () => {
    setLoading(true)
    setError("")
    try {
      const provider = new GoogleAuthProvider()
      const result   = await signInWithPopup(auth, provider)
      const user     = result.user
      const email    = user.email

      let isAllowed = false
      let role      = "student"

      if (SUPER_ADMINS.includes(email)) {
        isAllowed = true
        role      = "admin"
      } else {
        const docSnap = await getDoc(doc(db, "allowed_users", email))
        if (docSnap.exists()) {
          isAllowed = true
          role      = docSnap.data().role || "student"
        }
      }

      if (isAllowed) {
        await setDoc(doc(db, "allowed_users", email), {
          lastLogin: serverTimestamp(),
          role, uid: user.uid,
        }, { merge: true })
        onClose() // ← closes modal, App re-renders with user set
      } else {
        await signOut(auth)
        setError("Access denied. Your email is not whitelisted. Contact the DRTC admin.")
      }
    } catch (err) {
      if (!err.message.includes("popup-closed") && !err.message.includes("cancelled")) {
        setError("Login failed: " + err.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(13,26,22,0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px', fontFamily: "'Plus Jakarta Sans',sans-serif",
    }}>
      <div style={{
        background: '#fff', borderRadius: '24px',
        width: '100%', maxWidth: '420px',
        boxShadow: '0 24px 64px rgba(13,26,22,0.3)',
        position: 'relative', overflow: 'hidden',
      }}>

        {/* Top accent */}
        <div style={{ height: '4px',
          background: 'linear-gradient(90deg,#1D9E75,#5DCAA5,#1D9E75)' }} />

        <div style={{ padding: 'clamp(28px,5vw,40px)' }}>

          {/* Close */}
          {!forceLogin && (
            <button onClick={onClose} style={{
              position: 'absolute', top: '16px', right: '16px',
              background: '#F5F7F6', border: 'none', borderRadius: '100px',
              width: '32px', height: '32px', cursor: 'pointer',
              fontSize: '14px', color: '#5A7A6E',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>✕</button>
          )}

          {/* Logo */}
          <div style={{
            width: '56px', height: '56px', borderRadius: '16px',
            background: 'linear-gradient(135deg,#1D9E75,#0F6E56)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Lora',serif", fontSize: '24px',
            fontWeight: '600', color: '#fff', marginBottom: '20px',
          }}>L</div>

          <h2 style={{ fontFamily: "'Lora',serif", fontSize: '22px',
            fontWeight: '600', color: '#0D1A16', marginBottom: '8px' }}>
            Welcome to Librandhana
          </h2>
          <p style={{ fontSize: '13px', color: '#5A7A6E',
            lineHeight: '1.6', marginBottom: '24px' }}>
            {forceLogin
              ? "Restricted access. Sign in with your authorized DRTC email."
              : "Sign in with your institutional email to access the student hub."}
          </p>

          {/* DRTC notice */}
          <div style={{
            background: '#E1F5EE', border: '1px solid rgba(29,158,117,0.2)',
            borderRadius: '10px', padding: '10px 14px',
            fontSize: '12px', color: '#085041', marginBottom: '20px',
            display: 'flex', alignItems: 'flex-start', gap: '8px',
          }}>
            <span>🔒</span>
            <span>Only for DRTC MLIS students and staff. Use your institutional or whitelisted email.</span>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: '#FCEBEB', border: '1px solid #F09595',
              borderRadius: '10px', padding: '10px 14px',
              fontSize: '12px', color: '#A32D2D', marginBottom: '16px',
            }}>{error}</div>
          )}

          {/* Google button */}
          <button onClick={handleLogin} disabled={loading} style={{
            width: '100%', padding: '13px',
            background: loading ? '#F5F7F6' : '#fff',
            border: '1.5px solid rgba(29,158,117,0.2)',
            borderRadius: '12px', cursor: loading ? 'default' : 'pointer',
            fontSize: '14px', fontWeight: '600', color: '#0D1A16',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '10px', transition: 'all 0.15s',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}>
            {loading ? (
              <>
                <div style={{
                  width: '18px', height: '18px', borderRadius: '50%',
                  border: '2px solid #1D9E75', borderTopColor: 'transparent',
                  animation: 'spin 0.8s linear infinite',
                }} />
                Verifying access...
              </>
            ) : (
              <>
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  style={{ width: '20px', height: '20px' }} alt="Google" />
                Continue with Google
              </>
            )}
          </button>

          <p style={{ marginTop: '16px', fontSize: '11px', color: '#8FA89E',
            textAlign: 'center' }}>
            Authorized access only · DRTC ISI Bangalore
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}