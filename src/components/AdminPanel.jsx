import { useState, useEffect } from "react"
import { db } from "../firebase"
import { collection, getDocs, setDoc, doc, deleteDoc, serverTimestamp } from "firebase/firestore"

export default function AdminPanel({ goBack }) {
  // --- STATE VARIABLES (Must be at the top) ---
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("student")
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("All") 
  const [loading, setLoading] = useState(false)

  // 1. Fetch Users
  const fetchUsers = async () => {
    try {
      const snap = await getDocs(collection(db, "allowed_users"))
      setUsers(snap.docs.map(d => ({ email: d.id, ...d.data() })))
    } catch (err) {
      console.error("Error fetching users:", err)
    }
  }

  useEffect(() => { fetchUsers() }, [])

  // 2. Add User
  const handleAdd = async (e) => {
    e.preventDefault()
    if(!email.includes("@")) return alert("Invalid Email")
    
    setLoading(true)
    try {
      await setDoc(doc(db, "allowed_users", email), {
        role: role,
        addedAt: serverTimestamp()
      })
      setEmail("")
      fetchUsers()
      alert(`Success! ${email} added as ${role}.`)
    } catch (err) { 
      alert("Error: " + err.message) 
    }
    setLoading(false)
  }

  // 3. Delete User
  const handleDelete = async (userEmail) => {
    if(!window.confirm(`Remove access for ${userEmail}?`)) return
    try {
      await deleteDoc(doc(db, "allowed_users", userEmail))
      fetchUsers()
    } catch (err) { 
      alert("Error: " + err.message) 
    }
  }

  // 4. Filtering Logic
  const filteredUsers = users.filter(u => {
    const matchesSearch = u.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "All" || (u.role && u.role.toLowerCase() === filterRole.toLowerCase())
    return matchesSearch && matchesRole
  })

  // Role Options
  const roles = ["student", "admin", "faculty", "Research Fellow", "Alumni", "Project Personnel"]

  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-12 font-sans">
      <button onClick={goBack} className="text-slate-500 hover:text-white mb-8 flex items-center gap-2">
        ← Back to Admin Hub
      </button>
      
      <h1 className="text-3xl font-black mb-8 uppercase tracking-widest text-indigo-500">User Access Control</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: ADD USER FORM (4 Columns) */}
        <div className="lg:col-span-4 h-fit bg-slate-900/50 p-8 rounded-3xl border border-slate-800 sticky top-8">
          <h2 className="text-xl font-bold mb-6 text-white">Whitelist User</h2>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="user@example.com" 
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 mt-2 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
            
            <div>
               <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Role</label>
               <select 
                 value={role}
                 onChange={e => setRole(e.target.value)}
                 className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 mt-2 outline-none appearance-none cursor-pointer"
               >
                 {roles.map(r => <option key={r} value={r}>{r}</option>)}
               </select>
            </div>

            <button 
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 py-4 rounded-xl font-bold uppercase tracking-widest mt-4 transition-all shadow-lg active:scale-95 disabled:opacity-50"
            >
              {loading ? "Adding..." : "Grant Access"}
            </button>
          </form>
        </div>

        {/* RIGHT: USER LIST + SEARCH (8 Columns) */}
        <div className="lg:col-span-8 bg-slate-900/50 p-8 rounded-3xl border border-slate-800 flex flex-col h-[80vh]">
          
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-xl font-bold">Authorized Users ({users.length})</h2>
            
            {/* SEARCH BAR */}
            <div className="relative w-full md:w-64">
              <input 
                type="text" 
                placeholder="Search emails..." 
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-full py-2 pl-10 pr-4 text-sm focus:border-indigo-500 outline-none"
              />
              <svg className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
          </div>

          {/* ROLE TABS */}
          <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-800 pb-4">
            {["All", ...roles].map(r => (
              <button
                key={r}
                onClick={() => setFilterRole(r)}
                className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full transition-colors ${
                  filterRole === r 
                  ? "bg-indigo-500 text-white" 
                  : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* SCROLLABLE LIST */}
          <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1">
            {filteredUsers.length === 0 ? (
               <p className="text-slate-500 text-center py-10">No users found.</p>
            ) : (
              filteredUsers.map(u => (
                <div key={u.email} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-white/5 hover:bg-slate-800 transition-colors group">
                  <div>
                    <p className="font-bold text-sm text-slate-200">{u.email}</p>
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded inline-block mt-1 ${
                      u.role === 'admin' ? 'bg-indigo-500/20 text-indigo-400' : 
                      u.role === 'faculty' ? 'bg-rose-500/20 text-rose-400' :
                      'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {u.role || "student"}
                    </span>
                  </div>
                  <button 
                    onClick={() => handleDelete(u.email)}
                    className="w-8 h-8 flex items-center justify-center bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                    title="Revoke Access"
                  >
                    ✕
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  )
}