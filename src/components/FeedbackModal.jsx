import { useState } from "react"
import { db } from "../firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { useAuth } from "../context/AuthContext"

const CATEGORIES = [
  "Bug Report",
  "Feature Request",
  "Blog — Content Issue",
  "Blog — Write / Edit",
  "Placement Cell — Form Issue",
  "Placement Cell — Dashboard",
  "Daily Challenge",
  "Paper Resources — Missing Link",
  "Paper Resources — Wrong Content",
  "Events Page",
  "Jobs Page",
  "Aspirants Guide",
  "Admin Dashboard",
  "Login / Auth Issue",
  "Design / UI Feedback",
  "Performance Issue",
  "General Suggestion",
  "Other",
]

export default function FeedbackModal({ onClose }) {
  const { user }   = useAuth()
  const [type,     setType]    = useState("Bug Report")
  const [message,  setMessage] = useState("")
  const [loading,  setLoading] = useState(false)
  const [sent,     setSent]    = useState(false)

  const handleSubmit = async () => {
    if (!message.trim()) return
    setLoading(true)
    try {
      await addDoc(collection(db, "feedback"), {
        userEmail:   user?.email       || "Anonymous",
        userName:    user?.displayName || "Anonymous",
        type,
        message:     message.trim(),
        status:      "Open",
        date:        serverTimestamp(),
      })
      setSent(true)
    } catch (err) {
      alert("Error: " + err.message)
    }
    setLoading(false)
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(13,26,22,0.7)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px', fontFamily: "'Plus Jakarta Sans',sans-serif",
    }}>
      <div style={{
        background: '#fff', borderRadius: '20px',
        width: '100%', maxWidth: '460px',
        boxShadow: '0 24px 64px rgba(13,26,22,0.25)',
        overflow: 'hidden',
      }}>
        <div style={{ height: '3px',
          background: 'linear-gradient(90deg,#1D9E75,#5DCAA5)' }} />

        <div style={{ padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-start', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontFamily: "'Lora',serif", fontSize: '20px',
                fontWeight: '600', color: '#0D1A16', marginBottom: '4px' }}>
                Send Feedback
              </h2>
              <p style={{ fontSize: '12px', color: '#5A7A6E' }}>
                Help us improve Librandhana.
              </p>
            </div>
            <button onClick={onClose} style={{
              background: '#F5F7F6', border: 'none', borderRadius: '100px',
              width: '30px', height: '30px', cursor: 'pointer',
              color: '#5A7A6E', fontSize: '14px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>✕</button>
          </div>

          {sent ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>✅</div>
              <h3 style={{ fontFamily: "'Lora',serif", fontSize: '18px',
                fontWeight: '600', color: '#0D1A16', marginBottom: '8px' }}>
                Thank you!
              </h3>
              <p style={{ fontSize: '13px', color: '#5A7A6E',
                marginBottom: '20px' }}>
                Your feedback has been sent to the admin.
              </p>
              <button onClick={onClose} style={{
                background: 'linear-gradient(135deg,#1D9E75,#0F6E56)',
                color: '#fff', border: 'none', borderRadius: '100px',
                padding: '10px 24px', fontSize: '13px',
                fontWeight: '600', cursor: 'pointer',
              }}>Close</button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

              <div>
                <label style={{ display: 'block', fontSize: '11px',
                  fontWeight: '700', color: '#1D9E75', textTransform: 'uppercase',
                  letterSpacing: '0.1em', marginBottom: '6px' }}>
                  Category
                </label>
                <select value={type} onChange={e => setType(e.target.value)}
                  style={{
                    width: '100%', padding: '10px 14px',
                    border: '1.5px solid rgba(29,158,117,0.2)',
                    borderRadius: '10px', fontSize: '13px', outline: 'none',
                    fontFamily: "'Plus Jakarta Sans',sans-serif", color: '#0D1A16',
                    background: '#fff',
                  }}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '11px',
                  fontWeight: '700', color: '#1D9E75', textTransform: 'uppercase',
                  letterSpacing: '0.1em', marginBottom: '6px' }}>
                  Message
                </label>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Describe the issue or share your idea..."
                  rows={4}
                  style={{
                    width: '100%', padding: '10px 14px',
                    border: '1.5px solid rgba(29,158,117,0.2)',
                    borderRadius: '10px', fontSize: '13px', outline: 'none',
                    resize: 'vertical',
                    fontFamily: "'Plus Jakarta Sans',sans-serif", color: '#0D1A16',
                  }}
                />
              </div>

              <div style={{ fontSize: '11px', color: '#8FA89E' }}>
                Submitting as: <strong>{user?.email}</strong>
              </div>

              <button onClick={handleSubmit}
                disabled={loading || !message.trim()} style={{
                  width: '100%', padding: '12px',
                  background: message.trim()
                    ? 'linear-gradient(135deg,#1D9E75,#0F6E56)'
                    : '#E8EDEA',
                  color: message.trim() ? '#fff' : '#8FA89E',
                  border: 'none', borderRadius: '12px',
                  fontSize: '13px', fontWeight: '600',
                  cursor: message.trim() ? 'pointer' : 'default',
                  opacity: loading ? 0.6 : 1,
                }}>
                {loading ? "Sending..." : "Submit Feedback"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}