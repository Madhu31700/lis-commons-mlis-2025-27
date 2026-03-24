import { useState, useEffect } from "react"
import { db } from "../firebase"
import { collection, getDocs, setDoc, doc, deleteDoc, serverTimestamp } from "firebase/firestore"

const ROLES = ["student","admin","faculty","Research Fellow","Alumni","Project Personnel"]

const ROLE_STYLE = {
  admin:              { bg: "#FCEBEB", color: "#A32D2D" },
  faculty:            { bg: "#FAEEDA", color: "#633806" },
  student:            { bg: "#E1F5EE", color: "#085041" },
  "Research Fellow":  { bg: "#EEEDFE", color: "#3C3489" },
  Alumni:             { bg: "#E6F1FB", color: "#0C447C" },
  "Project Personnel":{ bg: "#EAF3DE", color: "#27500A" },
}

export default function AdminPanel({ goBack }) {
  const [email,      setEmail]      = useState("")
  const [role,       setRole]       = useState("student")
  const [users,      setUsers]      = useState([])
  const [search,     setSearch]     = useState("")
  const [filterRole, setFilterRole] = useState("All")
  const [loading,    setLoading]    = useState(false)

  useEffect(() => { fetchUsers() }, [])

  const fetchUsers = async () => {
    try {
      const snap = await getDocs(collection(db, "allowed_users"))
      setUsers(snap.docs.map(d => ({ email: d.id, ...d.data() })))
    } catch (err) { console.error(err) }
  }

  const handleAdd = async () => {
    if (!email.includes("@")) return alert("Invalid email")
    setLoading(true)
    try {
      await setDoc(doc(db, "allowed_users", email), {
        role, addedAt: serverTimestamp(),
      })
      setEmail("")
      fetchUsers()
    } catch (err) { alert("Error: " + err.message) }
    setLoading(false)
  }

  const handleDelete = async (userEmail) => {
    if (!window.confirm(`Remove access for ${userEmail}?`)) return
    try {
      await deleteDoc(doc(db, "allowed_users", userEmail))
      fetchUsers()
    } catch (err) { alert("Error: " + err.message) }
  }

  const filtered = users.filter(u => {
    const matchSearch = u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole   = filterRole === "All" || u.role === filterRole
    return matchSearch && matchRole
  })

  const inp = {
    width: '100%', padding: '10px 14px',
    border: '1.5px solid rgba(29,158,117,0.2)',
    borderRadius: '10px', fontSize: '13px', outline: 'none',
    fontFamily: "'Plus Jakarta Sans',sans-serif",
    color: '#0D1A16', background: '#fff',
  }

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
          <h1 style={{ fontFamily: "'Lora',serif",
            fontSize: 'clamp(22px,3vw,32px)', fontWeight: '600',
            color: '#fff', marginBottom: '4px' }}>
            User Access Control
          </h1>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>
            {users.length} whitelisted users
          </p>
        </div>
      </div>

      <div style={{
        maxWidth: '1000px', margin: '0 auto',
        padding: 'clamp(24px,4vw,40px) clamp(16px,4vw,32px)',
        display: 'grid',
        gridTemplateColumns: 'clamp(260px,30%,320px) 1fr',
        gap: '20px', alignItems: 'start',
      }}>

        {/* Add user */}
        <div style={{
          background: '#fff',
          border: '1.5px solid rgba(29,158,117,0.12)',
          borderRadius: '18px', padding: '24px',
          position: 'sticky', top: '80px',
        }}>
          <h2 style={{ fontFamily: "'Lora',serif", fontSize: '17px',
            fontWeight: '600', color: '#0D1A16', marginBottom: '18px' }}>
            Whitelist User
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700',
                color: '#1D9E75', textTransform: 'uppercase',
                letterSpacing: '0.1em', marginBottom: '6px' }}>
                Email Address
              </label>
              <input type="email" value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="user@isibang.ac.in"
                style={inp} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: '700',
                color: '#1D9E75', textTransform: 'uppercase',
                letterSpacing: '0.1em', marginBottom: '6px' }}>
                Role
              </label>
              <select value={role} onChange={e => setRole(e.target.value)}
                style={inp}>
                {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <button onClick={handleAdd} disabled={loading} style={{
              background: 'linear-gradient(135deg,#1D9E75,#0F6E56)',
              color: '#fff', border: 'none', borderRadius: '10px',
              padding: '11px', fontSize: '13px', fontWeight: '600',
              cursor: 'pointer', opacity: loading ? 0.6 : 1,
              marginTop: '4px',
            }}>
              {loading ? "Adding..." : "Grant Access"}
            </button>
          </div>
        </div>

        {/* User list */}
        <div style={{
          background: '#fff',
          border: '1.5px solid rgba(29,158,117,0.12)',
          borderRadius: '18px', padding: '24px',
        }}>
          <div style={{ display: 'flex', gap: '10px',
            marginBottom: '16px', flexWrap: 'wrap' }}>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search emails..."
              style={{ ...inp, flex: 1, minWidth: '160px' }} />
            <select value={filterRole} onChange={e => setFilterRole(e.target.value)}
              style={{ ...inp, width: 'auto' }}>
              <option value="All">All Roles</option>
              {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          <div style={{ fontSize: '11px', fontWeight: '700', color: '#1D9E75',
            textTransform: 'uppercase', letterSpacing: '0.1em',
            marginBottom: '12px' }}>
            {filtered.length} users
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px',
            maxHeight: '60vh', overflowY: 'auto' }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0',
                color: '#8FA89E', fontSize: '14px' }}>
                No users found.
              </div>
            ) : filtered.map(u => {
              const rs = ROLE_STYLE[u.role] || ROLE_STYLE.student
              return (
                <div key={u.email} style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', gap: '12px',
                  background: '#F5F7F6',
                  border: '1px solid rgba(29,158,117,0.08)',
                  borderRadius: '10px', padding: '10px 14px',
                  flexWrap: 'wrap',
                }}>
                  <div style={{ flex: 1, minWidth: '160px' }}>
                    <div style={{ fontSize: '13px', fontWeight: '600',
                      color: '#0D1A16', wordBreak: 'break-all',
                      marginBottom: '3px' }}>{u.email}</div>
                    <span style={{
                      padding: '2px 8px', borderRadius: '100px',
                      fontSize: '10px', fontWeight: '700',
                      background: rs.bg, color: rs.color,
                    }}>{u.role || 'student'}</span>
                  </div>
                  <button onClick={() => handleDelete(u.email)} style={{
                    background: '#FCEBEB', color: '#A32D2D',
                    border: 'none', borderRadius: '8px',
                    padding: '6px 12px', fontSize: '11px',
                    fontWeight: '600', cursor: 'pointer', flexShrink: 0,
                  }}>Remove</button>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}