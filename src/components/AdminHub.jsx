import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase"

const STATUS_STYLE = {
  "published": { bg:"#E1F5EE", color:"#085041", label:"Published" },
  "pending":   { bg:"#FAEEDA", color:"#633806", label:"Pending" },
  "rejected":  { bg:"#FCEBEB", color:"#A32D2D", label:"Rejected" },
}

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000)
  if (diff < 3600)  return `${Math.floor(diff/60)}m ago`
  if (diff < 86400) return `${Math.floor(diff/3600)}h ago`
  return `${Math.floor(diff/86400)}d ago`
}

export default function AdminHub({ changeView, goBack }) {
  const [activeTab,    setActiveTab]    = useState("posts")
  const [pendingPosts, setPendingPosts] = useState([])
  const [allPosts,     setAllPosts]     = useState([])
  const [loading,      setLoading]      = useState(true)
  const [rejectModal,  setRejectModal]  = useState(null) // post to reject
  const [rejectReason, setRejectReason] = useState("")

  useEffect(() => { fetchPosts() }, [])

  const fetchPosts = async () => {
    setLoading(true)
    const { data } = await supabase
      .from("posts").select("*")
      .order("created_at", { ascending: false })
    const all     = data || []
    setAllPosts(all)
    setPendingPosts(all.filter(p => p.status === "pending"))
    setLoading(false)
  }

  const approvePost = async (id) => {
    const { error } = await supabase.from("posts")
      .update({ status:"published", published:true, rejection_reason:null })
      .eq("id", id)
    if (error) { alert("Error: " + error.message); return }
    fetchPosts()
  }

  const openReject = (post) => {
    setRejectModal(post)
    setRejectReason("")
  }

  const confirmReject = async () => {
    if (!rejectModal) return
    const { error } = await supabase.from("posts")
      .update({ status:"rejected", published:false, rejection_reason: rejectReason || "Did not meet publishing standards." })
      .eq("id", rejectModal.id)
    if (error) { alert("Error: " + error.message); return }
    setRejectModal(null)
    fetchPosts()
  }

  const deletePost = async (id) => {
    if (!window.confirm("Permanently delete this post?")) return
    await supabase.from("posts").delete().eq("id", id)
    fetchPosts()
  }

  const TABS = [
    { id:"posts",     label: `Blog (${pendingPosts.length} pending)` },
    { id:"all",       label: "All Posts" },
    { id:"users",     label: "User Access" },
    { id:"placement", label: "Placement" },
    { id:"feedback",  label: "Feedback" },
  ]

  const cardS = {
    background:"#fff",
    border:"1.5px solid rgba(29,158,117,0.12)",
    borderRadius:"18px",padding:"22px",
  }

  return (
    <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",background:"#F5F7F6",minHeight:"100vh"}}>

      {/* Header */}
      <div style={{
        background:"linear-gradient(160deg,#0D1A16,#1A302A)",
        padding:"clamp(32px,5vw,48px) clamp(16px,4vw,32px)",
      }}>
        <div style={{maxWidth:"1000px",margin:"0 auto"}}>
          <button onClick={goBack} style={{
            background:"none",border:"none",cursor:"pointer",
            color:"rgba(255,255,255,0.5)",fontSize:"13px",
            fontWeight:"500",marginBottom:"20px",padding:0}}>
            ← Back to Home
          </button>
          <h1 style={{fontFamily:"'Lora',serif",
            fontSize:"clamp(24px,4vw,36px)",fontWeight:"600",
            color:"#fff",marginBottom:"6px"}}>
            Admin Dashboard
          </h1>
          <p style={{fontSize:"14px",color:"rgba(255,255,255,0.45)"}}>
            Manage posts, users, placements, and feedback.
          </p>

          {/* Tabs */}
          <div style={{display:"flex",gap:"6px",marginTop:"24px",flexWrap:"wrap"}}>
            {TABS.map(t => (
              <button key={t.id} onClick={()=>setActiveTab(t.id)} style={{
                padding:"8px 18px",borderRadius:"100px",border:"none",
                fontSize:"12px",fontWeight:"600",cursor:"pointer",
                background:activeTab===t.id?"#1D9E75":"rgba(255,255,255,0.1)",
                color:activeTab===t.id?"#fff":"rgba(255,255,255,0.6)",
                transition:"all 0.15s"}}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:"1000px",margin:"0 auto",
        padding:"clamp(24px,4vw,40px) clamp(16px,4vw,32px)"}}>

        {/* ── PENDING POSTS ── */}
        {activeTab === "posts" && (
          <div>
            <h2 style={{fontFamily:"'Lora',serif",fontSize:"22px",
              fontWeight:"600",color:"#0D1A16",marginBottom:"20px"}}>
              Pending Review
            </h2>
            {loading ? (
              <div style={{textAlign:"center",padding:"60px 0",color:"#1D9E75"}}>Loading...</div>
            ) : pendingPosts.length === 0 ? (
              <div style={{...cardS,textAlign:"center",padding:"60px"}}>
                <div style={{fontSize:"40px",marginBottom:"12px"}}>✅</div>
                <p style={{fontSize:"15px",color:"#5A7A6E",fontWeight:"500"}}>
                  All caught up — no pending posts.
                </p>
              </div>
            ) : (
              <div style={{display:"flex",flexDirection:"column",gap:"14px"}}>
                {pendingPosts.map(post => (
                  <div key={post.id} style={cardS}>
                    <div style={{display:"flex",justifyContent:"space-between",
                      alignItems:"flex-start",gap:"16px",flexWrap:"wrap"}}>
                      <div style={{flex:1,minWidth:"200px"}}>
                        <div style={{display:"flex",gap:"8px",marginBottom:"10px",flexWrap:"wrap"}}>
                          <span style={{padding:"2px 10px",borderRadius:"100px",
                            fontSize:"10px",fontWeight:"700",
                            background:"#E1F5EE",color:"#085041"}}>
                            {post.category}
                          </span>
                          <span style={{fontSize:"12px",color:"#8FA89E"}}>
                            by {post.author_name} · {timeAgo(post.created_at)}
                          </span>
                        </div>
                        <h3 style={{fontFamily:"'Lora',serif",fontSize:"18px",
                          fontWeight:"600",color:"#0D1A16",marginBottom:"6px"}}>
                          {post.title}
                        </h3>
                        {post.summary && (
                          <p style={{fontSize:"13px",color:"#5A7A6E",
                            lineHeight:"1.5",marginBottom:"10px"}}>
                            {post.summary}
                          </p>
                        )}
                        {/* Content preview */}
                        <div style={{background:"#F5F7F6",borderRadius:"10px",
                          padding:"10px 14px",fontSize:"12px",color:"#2E4F44",
                          lineHeight:"1.6",maxHeight:"100px",overflowY:"auto",
                          fontFamily:"monospace",marginBottom:"10px"}}>
                          {post.content?.slice(0,300)}{post.content?.length>300?"...":""}
                        </div>
                        {post.tags?.length > 0 && (
                          <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
                            {post.tags.map(t => (
                              <span key={t} style={{padding:"2px 8px",borderRadius:"100px",
                                fontSize:"10px",background:"#E1F5EE",color:"#085041"}}>#{t}</span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div style={{display:"flex",flexDirection:"column",gap:"8px",flexShrink:0}}>
                        <button onClick={()=>approvePost(post.id)} style={{
                          background:"linear-gradient(135deg,#1D9E75,#0F6E56)",
                          color:"#fff",border:"none",borderRadius:"100px",
                          padding:"10px 20px",fontSize:"12px",fontWeight:"700",
                          cursor:"pointer",whiteSpace:"nowrap"}}>
                          ✓ Approve & Publish
                        </button>
                        <button onClick={()=>openReject(post)} style={{
                          background:"#FCEBEB",color:"#A32D2D",border:"none",
                          borderRadius:"100px",padding:"10px 20px",
                          fontSize:"12px",fontWeight:"700",cursor:"pointer",
                          whiteSpace:"nowrap"}}>
                          ✕ Reject with reason
                        </button>
                        <button onClick={()=>deletePost(post.id)} style={{
                          background:"transparent",color:"#8FA89E",
                          border:"1px solid rgba(29,158,117,0.15)",borderRadius:"100px",
                          padding:"8px 20px",fontSize:"12px",fontWeight:"600",
                          cursor:"pointer",whiteSpace:"nowrap"}}>
                          🗑 Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── ALL POSTS ── */}
        {activeTab === "all" && (
          <div>
            <h2 style={{fontFamily:"'Lora',serif",fontSize:"22px",
              fontWeight:"600",color:"#0D1A16",marginBottom:"20px"}}>
              All Posts
            </h2>
            <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
              {allPosts.map(post => {
                const st = STATUS_STYLE[post.status] || STATUS_STYLE["pending"]
                return (
                  <div key={post.id} style={{...cardS,padding:"16px 20px"}}>
                    <div style={{display:"flex",justifyContent:"space-between",
                      alignItems:"center",gap:"16px",flexWrap:"wrap"}}>
                      <div style={{flex:1,minWidth:"200px"}}>
                        <div style={{display:"flex",gap:"8px",marginBottom:"6px",flexWrap:"wrap"}}>
                          <span style={{padding:"2px 8px",borderRadius:"100px",
                            fontSize:"10px",fontWeight:"700",
                            background:st.bg,color:st.color}}>{st.label}</span>
                          <span style={{padding:"2px 8px",borderRadius:"100px",
                            fontSize:"10px",fontWeight:"700",
                            background:"#E1F5EE",color:"#085041"}}>{post.category}</span>
                        </div>
                        <div style={{fontSize:"14px",fontWeight:"600",color:"#0D1A16"}}>
                          {post.title}
                        </div>
                        <div style={{fontSize:"11px",color:"#8FA89E",marginTop:"3px"}}>
                          {post.author_name} · {timeAgo(post.created_at)}
                        </div>
                      </div>
                      <div style={{display:"flex",gap:"8px",flexShrink:0}}>
                        {post.status !== "published" && (
                          <button onClick={()=>approvePost(post.id)} style={{
                            background:"rgba(29,158,117,0.1)",color:"#085041",
                            border:"1px solid rgba(29,158,117,0.2)",borderRadius:"100px",
                            padding:"6px 14px",fontSize:"11px",fontWeight:"600",cursor:"pointer"}}>
                            Publish
                          </button>
                        )}
                        {post.status !== "rejected" && (
                          <button onClick={()=>openReject(post)} style={{
                            background:"#FCEBEB",color:"#A32D2D",border:"none",
                            borderRadius:"100px",padding:"6px 14px",
                            fontSize:"11px",fontWeight:"600",cursor:"pointer"}}>
                            Reject
                          </button>
                        )}
                        <button onClick={()=>deletePost(post.id)} style={{
                          background:"transparent",color:"#8FA89E",
                          border:"1px solid rgba(0,0,0,0.1)",borderRadius:"100px",
                          padding:"6px 14px",fontSize:"11px",fontWeight:"600",cursor:"pointer"}}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ── OTHER TABS ── */}
        {activeTab === "users" && (
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:"16px"}}>
            <AdminCard
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>}
              title="User Access"
              desc="Whitelist emails and assign student roles."
              onClick={()=>changeView("admin-users")}/>
          </div>
        )}

        {activeTab === "placement" && (
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:"16px"}}>
            <AdminCard
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="1.8"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>}
              title="Placement Cell"
              desc="Manage internship applications and student progress."
              onClick={()=>changeView("admin-placement")}/>
          </div>
        )}

        {activeTab === "feedback" && (
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:"16px"}}>
            <AdminCard
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="1.8"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>}
              title="System Feedback"
              desc="View bug reports and suggestions from users."
              onClick={()=>changeView("admin-feedback")}/>
          </div>
        )}
      </div>

      {/* ── REJECT MODAL ── */}
      {rejectModal && (
        <div style={{
          position:"fixed",inset:0,zIndex:100,
          background:"rgba(13,26,22,0.6)",backdropFilter:"blur(4px)",
          display:"flex",alignItems:"center",justifyContent:"center",padding:"20px",
        }} onClick={()=>setRejectModal(null)}>
          <div style={{
            background:"#fff",borderRadius:"20px",padding:"32px",
            width:"100%",maxWidth:"480px",
          }} onClick={e=>e.stopPropagation()}>
            <h3 style={{fontFamily:"'Lora',serif",fontSize:"20px",
              fontWeight:"600",color:"#0D1A16",marginBottom:"6px"}}>
              Reject Post
            </h3>
            <p style={{fontSize:"13px",color:"#5A7A6E",marginBottom:"20px"}}>
              "{rejectModal.title}"
            </p>
            <label style={{display:"block",fontSize:"11px",fontWeight:"700",
              color:"#1D9E75",textTransform:"uppercase",letterSpacing:"0.1em",
              marginBottom:"8px"}}>
              Reason for rejection (shown to author)
            </label>
            <textarea
              value={rejectReason}
              onChange={e=>setRejectReason(e.target.value)}
              placeholder="e.g. Post needs more detail. Please add references and resubmit."
              rows={4}
              style={{width:"100%",padding:"10px 14px",
                border:"1.5px solid rgba(29,158,117,0.2)",
                borderRadius:"12px",fontSize:"13px",outline:"none",
                resize:"vertical",fontFamily:"'Plus Jakarta Sans',sans-serif",
                color:"#0D1A16",marginBottom:"16px"}}/>
            <div style={{display:"flex",gap:"10px",justifyContent:"flex-end"}}>
              <button onClick={()=>setRejectModal(null)} style={{
                background:"transparent",color:"#5A7A6E",
                border:"1.5px solid rgba(29,158,117,0.2)",borderRadius:"100px",
                padding:"9px 20px",fontSize:"13px",fontWeight:"600",cursor:"pointer"}}>
                Cancel
              </button>
              <button onClick={confirmReject} style={{
                background:"#E24B4A",color:"#fff",border:"none",
                borderRadius:"100px",padding:"9px 20px",
                fontSize:"13px",fontWeight:"600",cursor:"pointer"}}>
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function AdminCard({ icon, title, desc, onClick }) {
  return (
    <div onClick={onClick} className="card-hover" style={{
      background:"#fff",border:"1.5px solid rgba(29,158,117,0.12)",
      borderRadius:"18px",padding:"24px",cursor:"pointer"}}>
      <div style={{width:"44px",height:"44px",borderRadius:"12px",
        background:"#E1F5EE",display:"flex",alignItems:"center",
        justifyContent:"center",marginBottom:"14px"}}>
        {icon}
      </div>
      <h3 style={{fontFamily:"'Lora',serif",fontSize:"16px",
        fontWeight:"600",color:"#0D1A16",marginBottom:"4px"}}>{title}</h3>
      <p style={{fontSize:"12px",color:"#5A7A6E"}}>{desc}</p>
    </div>
  )
}