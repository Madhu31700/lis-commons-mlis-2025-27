import { useState, useEffect } from "react"
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore"
import { db } from "../firebase"

const TYPE_STYLE = {
  "Bug Report":         { bg: "#FCEBEB", color: "#A32D2D" },
  "Feature Request":    { bg: "#EEEDFE", color: "#3C3489" },
  "General Suggestion": { bg: "#E6F1FB", color: "#0C447C" },
  "Login / Auth Issue": { bg: "#FBEAF0", color: "#72243E" },
  "Design / UI Feedback":{ bg: "#EAF3DE", color: "#27500A" },
  "Performance Issue":  { bg: "#FAEEDA", color: "#633806" },
}

function getTypeStyle(type) {
  for (const key of Object.keys(TYPE_STYLE)) {
    if (type?.includes(key.split(' ')[0])) return TYPE_STYLE[key]
  }
  return { bg: "#E1F5EE", color: "#085041" }
}

function timeAgo(ts) {
  if (!ts) return "—"
  const date = ts.toDate ? ts.toDate() : new Date(ts)
  const diff = Math.floor((Date.now() - date) / 1000)
  if (diff < 60)     return "just now"
  if (diff < 3600)   return `${Math.floor(diff/60)}m ago`
  if (diff < 86400)  return `${Math.floor(diff/3600)}h ago`
  return `${Math.floor(diff/86400)}d ago`
}

export default function FeedbackDashboard({ goBack }) {
  const [feedbacks, setFeedbacks] = useState([])
  const [loading,   setLoading]   = useState(true)
  const [filter,    setFilter]    = useState("All")
  const [search,    setSearch]    = useState("")

  useEffect(() => {
    const q = query(collection(db, "feedback"), orderBy("date", "desc"))
    const unsub = onSnapshot(q, snap => {
      setFeedbacks(snap.docs.map(d => ({ id: d.id, ...d.data() })))
      setLoading(false)
    })
    return () => unsub()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this feedback?")) return
    await deleteDoc(doc(db, "feedback", id))
  }

  const types = ["All", ...new Set(feedbacks.map(f => f.type).filter(Boolean))]

  const filtered = feedbacks.filter(f => {
    const matchFilter = filter === "All" || f.type === filter
    const matchSearch = search === "" ||
      f.message?.toLowerCase().includes(search.toLowerCase()) ||
      f.userEmail?.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  return (
    <div style={{
      fontFamily: "'Plus Jakarta Sans',sans-serif",
      background: '#F5F7F6', minHeight: '100vh',
    }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg,#0D1A16,#1A302A)',
        padding: 'clamp(28px,4vw,40px) clamp(16px,4vw,32px)',
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <button onClick={goBack} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.5)', fontSize: '13px',
            fontWeight: '500', marginBottom: '16px', padding: 0,
          }}>← Back to Admin</button>

          <div style={{ display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h1 style={{ fontFamily: "'Lora',serif",
                fontSize: 'clamp(22px,3vw,32px)', fontWeight: '600',
                color: '#fff', marginBottom: '4px' }}>
                Feedback Inbox
              </h1>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>
                {feedbacks.length} total · live updates
              </p>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: 'rgba(29,158,117,0.15)',
              border: '1px solid rgba(29,158,117,0.2)',
              borderRadius: '100px', padding: '6px 14px',
            }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%',
                background: '#1D9E75' }} />
              <span style={{ fontSize: '11px', fontWeight: '600',
                color: '#5DCAA5' }}>Live</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        maxWidth: '1000px', margin: '0 auto',
        padding: 'clamp(20px,3vw,32px) clamp(16px,4vw,32px)',
      }}>

        {/* Search + filter */}
        <div style={{ display: 'flex', gap: '10px',
          marginBottom: '20px', flexWrap: 'wrap' }}>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search messages or emails..."
            style={{
              flex: 1, minWidth: '200px', padding: '9px 14px',
              border: '1.5px solid rgba(29,158,117,0.2)',
              borderRadius: '10px', fontSize: '13px', outline: 'none',
              fontFamily: "'Plus Jakarta Sans',sans-serif", color: '#0D1A16',
              background: '#fff',
            }} />
        </div>

        {/* Type filter pills */}
        <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap',
          marginBottom: '20px' }}>
          {types.map(t => (
            <button key={t} onClick={() => setFilter(t)} style={{
              padding: '5px 14px', borderRadius: '100px', border: 'none',
              fontSize: '12px', fontWeight: '600', cursor: 'pointer',
              background: filter === t ? '#1D9E75' : 'rgba(29,158,117,0.08)',
              color: filter === t ? '#fff' : '#085041',
            }}>{t}</button>
          ))}
        </div>

        {/* List */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0',
            color: '#1D9E75' }}>Loading...</div>
        ) : filtered.length === 0 ? (
          <div style={{
            background: '#fff',
            border: '1.5px solid rgba(29,158,117,0.1)',
            borderRadius: '18px', padding: '60px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>📭</div>
            <p style={{ fontSize: '15px', color: '#5A7A6E',
              fontWeight: '500' }}>No feedback yet.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filtered.map(item => {
              const ts = getTypeStyle(item.type)
              return (
                <div key={item.id} style={{
                  background: '#fff',
                  border: '1.5px solid rgba(29,158,117,0.1)',
                  borderRadius: '16px', padding: '18px 20px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between',
                    alignItems: 'flex-start', gap: '12px',
                    marginBottom: '10px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center',
                      gap: '10px' }}>
                      <div style={{
                        width: '32px', height: '32px', borderRadius: '50%',
                        background: 'linear-gradient(135deg,#1D9E75,#5DCAA5)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontSize: '13px', fontWeight: '700',
                        flexShrink: 0,
                      }}>
                        {(item.userName || item.userEmail || '?').charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: '600',
                          color: '#0D1A16' }}>
                          {item.userName || 'Anonymous'}
                        </div>
                        <div style={{ fontSize: '11px', color: '#8FA89E' }}>
                          {item.userEmail} · {timeAgo(item.date)}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center',
                      gap: '8px' }}>
                      <span style={{
                        padding: '3px 10px', borderRadius: '100px',
                        fontSize: '10px', fontWeight: '700',
                        background: ts.bg, color: ts.color,
                      }}>{item.type}</span>
                      <button onClick={() => handleDelete(item.id)} style={{
                        background: '#FCEBEB', color: '#A32D2D',
                        border: 'none', borderRadius: '8px',
                        width: '28px', height: '28px',
                        display: 'flex', alignItems: 'center',
                        justifyContent: 'center', cursor: 'pointer',
                        fontSize: '12px',
                      }}>✕</button>
                    </div>
                  </div>
                  <p style={{ fontSize: '13px', color: '#2E4F44',
                    lineHeight: '1.65', whiteSpace: 'pre-wrap',
                    paddingLeft: '42px' }}>
                    {item.message}
                  </p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}