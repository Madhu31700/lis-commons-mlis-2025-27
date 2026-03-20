import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase"
import { useAuth } from "../context/AuthContext"

const CATEGORIES = ["All","Study Notes","Tacit Knowledge","Career","Research","Opinion","Resources"]

const CAT_STYLE = {
  "Study Notes":     { bg:"#E1F5EE", color:"#085041" },
  "Tacit Knowledge": { bg:"#E6F1FB", color:"#0C447C" },
  "Career":          { bg:"#FAEEDA", color:"#633806" },
  "Research":        { bg:"#EEEDFE", color:"#3C3489" },
  "Opinion":         { bg:"#FBEAF0", color:"#72243E" },
  "Resources":       { bg:"#EAF3DE", color:"#27500A" },
  "General":         { bg:"#F5F7F6", color:"#2E4F44" },
}

const STATUS_STYLE = {
  "published": { bg:"#E1F5EE", color:"#085041", label:"Published" },
  "pending":   { bg:"#FAEEDA", color:"#633806", label:"Pending review" },
  "rejected":  { bg:"#FCEBEB", color:"#A32D2D", label:"Rejected" },
}

const ADMIN_EMAILS = [
  "madhu@drtc.isibang.ac.in",
  "madhu31700@gmail.com",
  "amisha@drtc.isibang.ac.in",
]

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000)
  if (diff < 60)     return "just now"
  if (diff < 3600)   return `${Math.floor(diff/60)}m ago`
  if (diff < 86400)  return `${Math.floor(diff/3600)}h ago`
  return `${Math.floor(diff/86400)}d ago`
}

function Avatar({ name, avatar, size=28 }) {
  const [err, setErr] = useState(false)
  if (avatar && !err) return (
    <img src={avatar} onError={()=>setErr(true)}
      style={{width:size,height:size,borderRadius:"50%",objectFit:"cover",
        border:"1.5px solid #9FE1CB",flexShrink:0}} alt={name}/>
  )
  return (
    <div style={{width:size,height:size,borderRadius:"50%",flexShrink:0,
      background:"linear-gradient(135deg,#1D9E75,#5DCAA5)",
      display:"flex",alignItems:"center",justifyContent:"center",
      color:"#fff",fontSize:size*0.4,fontWeight:"700"}}>
      {name?.charAt(0).toUpperCase()}
    </div>
  )
}

function CatPill({ category }) {
  const s = CAT_STYLE[category] || CAT_STYLE["General"]
  return (
    <span style={{display:"inline-flex",padding:"2px 10px",borderRadius:"100px",
      fontSize:"10px",fontWeight:"700",letterSpacing:"0.06em",
      background:s.bg,color:s.color}}>{category}</span>
  )
}

export default function Blog({ onOpenPost, onWritePost, onEditPost }) {
  const { user } = useAuth()
  const isAdmin  = user && ADMIN_EMAILS.includes(user.email)

  const [posts,     setPosts]     = useState([])
  const [myPosts,   setMyPosts]   = useState([])
  const [loading,   setLoading]   = useState(true)
  const [category,  setCategory]  = useState("All")
  const [search,    setSearch]    = useState("")
  const [tab,       setTab]       = useState("feed") // feed | mine

  useEffect(() => { fetchPosts() }, [category, tab])

  const fetchPosts = async () => {
    setLoading(true)

    if (tab === "mine" && user) {
      // Fetch user's own posts (all statuses)
      let q = supabase.from("posts").select("*")
        .eq("author_id", user.uid)
        .order("created_at", { ascending: false })
      const { data } = await q
      setMyPosts(data || [])
    } else {
      // Public feed — published only
      let q = supabase.from("posts").select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false })
      if (category !== "All") q = q.eq("category", category)
      const { data } = await q
      setPosts(data || [])
    }
    setLoading(false)
  }

  const deletePost = async (id, e) => {
    e.stopPropagation()
    if (!window.confirm("Delete this post permanently?")) return
    await supabase.from("posts").delete().eq("id", id)
    fetchPosts()
  }

  const filtered = posts.filter(p =>
    search === "" ||
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.summary?.toLowerCase().includes(search.toLowerCase())
  )

  const featured = filtered[0]
  const rest     = filtered.slice(1)

  return (
    <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",background:"#fff",minHeight:"100vh"}}>

      {/* ── HERO ── */}
      <div style={{
        background:"linear-gradient(160deg,#E1F5EE 0%,#9FE1CB 20%,#f0faf6 60%,#fff 100%)",
        padding:"clamp(32px,5vw,48px) clamp(16px,4vw,32px) clamp(24px,4vw,36px)",
        borderBottom:"1px solid rgba(29,158,117,0.1)",
      }}>
        <div style={{maxWidth:"1000px",margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:"16px"}}>
            <div>
              <div style={{fontSize:"10px",fontWeight:"700",color:"#1D9E75",letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:"8px"}}>
                DRTC MLIS · Student Blog
              </div>
              <h1 style={{fontFamily:"'Lora',serif",fontSize:"clamp(26px,4vw,38px)",fontWeight:"600",color:"#0D1A16",marginBottom:"6px"}}>
                The Blog
              </h1>
              <p style={{fontSize:"14px",color:"#5A7A6E"}}>
                Student notes, tacit knowledge, and experiences worth keeping.
              </p>
            </div>
            <div style={{display:"flex",gap:"10px",alignItems:"center",flexWrap:"wrap"}}>
              <input value={search} onChange={e=>setSearch(e.target.value)}
                placeholder="Search posts..."
                style={{padding:"9px 16px",border:"1.5px solid rgba(29,158,117,0.2)",
                  borderRadius:"100px",fontSize:"13px",outline:"none",
                  fontFamily:"'Plus Jakarta Sans',sans-serif",color:"#0D1A16",
                  background:"rgba(255,255,255,0.8)",width:"180px"}}/>
              {user && (
                <button onClick={onWritePost} style={{
                  background:"linear-gradient(135deg,#1D9E75,#0F6E56)",
                  color:"#fff",border:"none",borderRadius:"100px",
                  padding:"9px 20px",fontSize:"13px",fontWeight:"600",
                  cursor:"pointer",whiteSpace:"nowrap"}}>
                  ✍️ Write
                </button>
              )}
            </div>
          </div>

          {/* Tab switcher */}
          {user && (
            <div style={{display:"flex",gap:"6px",marginTop:"20px"}}>
              {["feed","mine"].map(t => (
                <button key={t} onClick={()=>setTab(t)} style={{
                  padding:"6px 16px",borderRadius:"100px",border:"none",
                  fontSize:"12px",fontWeight:"600",cursor:"pointer",
                  background:tab===t?"#1D9E75":"rgba(29,158,117,0.1)",
                  color:tab===t?"#fff":"#085041",transition:"all 0.15s"}}>
                  {t==="feed" ? "All Posts" : "My Posts"}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{maxWidth:"1000px",margin:"0 auto",padding:"clamp(24px,4vw,40px) clamp(16px,4vw,32px)"}}>

        {/* ── MY POSTS TAB ── */}
        {tab === "mine" && user ? (
          <div>
            <h2 style={{fontFamily:"'Lora',serif",fontSize:"20px",fontWeight:"600",color:"#0D1A16",marginBottom:"18px"}}>
              My Posts
            </h2>
            {loading ? (
              <div style={{textAlign:"center",padding:"60px 0",color:"#1D9E75"}}>Loading...</div>
            ) : myPosts.length === 0 ? (
              <div style={{textAlign:"center",padding:"60px 0"}}>
                <p style={{color:"#5A7A6E",marginBottom:"16px"}}>You haven't written anything yet.</p>
                <button onClick={onWritePost} style={{
                  background:"linear-gradient(135deg,#1D9E75,#0F6E56)",
                  color:"#fff",border:"none",borderRadius:"100px",
                  padding:"10px 22px",fontSize:"13px",fontWeight:"600",cursor:"pointer"}}>
                  Write your first post →
                </button>
              </div>
            ) : (
              <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
                {myPosts.map(post => {
                  const st = STATUS_STYLE[post.status] || STATUS_STYLE["pending"]
                  return (
                    <div key={post.id} style={{
                      background:"#fff",border:"1.5px solid rgba(29,158,117,0.12)",
                      borderRadius:"16px",padding:"18px 20px",
                      display:"flex",justifyContent:"space-between",
                      alignItems:"flex-start",gap:"16px",flexWrap:"wrap"}}>
                      <div style={{flex:1,minWidth:"200px"}}>
                        <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px",flexWrap:"wrap"}}>
                          <CatPill category={post.category}/>
                          <span style={{padding:"2px 10px",borderRadius:"100px",
                            fontSize:"10px",fontWeight:"700",
                            background:st.bg,color:st.color}}>
                            {st.label}
                          </span>
                        </div>
                        <h3 style={{fontFamily:"'Lora',serif",fontSize:"16px",
                          fontWeight:"600",color:"#0D1A16",marginBottom:"4px",
                          cursor:"pointer"}}
                          onClick={()=>post.status==="published"&&onOpenPost(post)}>
                          {post.title}
                        </h3>
                        {post.status==="rejected" && post.rejection_reason && (
                          <div style={{background:"#FCEBEB",borderRadius:"8px",
                            padding:"8px 12px",fontSize:"12px",color:"#A32D2D",
                            marginTop:"8px"}}>
                            <strong>Rejection reason:</strong> {post.rejection_reason}
                          </div>
                        )}
                        <div style={{fontSize:"11px",color:"#8FA89E",marginTop:"6px"}}>
                          {timeAgo(post.created_at)}
                        </div>
                      </div>
                      <div style={{display:"flex",gap:"8px",flexShrink:0}}>
                        <button onClick={()=>onEditPost(post)} style={{
                          background:"rgba(29,158,117,0.08)",color:"#085041",
                          border:"1px solid rgba(29,158,117,0.2)",borderRadius:"100px",
                          padding:"6px 14px",fontSize:"12px",fontWeight:"600",cursor:"pointer"}}>
                          Edit
                        </button>
                        <button onClick={e=>deletePost(post.id,e)} style={{
                          background:"#FCEBEB",color:"#A32D2D",
                          border:"none",borderRadius:"100px",
                          padding:"6px 14px",fontSize:"12px",fontWeight:"600",cursor:"pointer"}}>
                          Delete
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

        ) : (
          <>
            {/* ── CATEGORY FILTERS ── */}
            <div style={{display:"flex",gap:"8px",flexWrap:"wrap",marginBottom:"28px"}}>
              {CATEGORIES.map(c => (
                <button key={c} onClick={()=>setCategory(c)} style={{
                  padding:"6px 16px",borderRadius:"100px",border:"none",
                  fontSize:"12px",fontWeight:"600",cursor:"pointer",
                  background:category===c?"#1D9E75":"rgba(29,158,117,0.08)",
                  color:category===c?"#fff":"#085041",transition:"all 0.15s"}}>
                  {c}
                </button>
              ))}
            </div>

            {/* ── FEED ── */}
            {loading ? (
              <div style={{textAlign:"center",padding:"80px 0",color:"#1D9E75",fontSize:"14px"}}>
                Loading posts...
              </div>
            ) : filtered.length === 0 ? (
              <div style={{textAlign:"center",padding:"80px 0"}}>
                <div style={{fontSize:"48px",marginBottom:"16px"}}>📭</div>
                <p style={{fontSize:"15px",color:"#5A7A6E",marginBottom:"16px"}}>
                  No posts yet in this category.
                </p>
                {user && (
                  <button onClick={onWritePost} style={{
                    background:"none",border:"none",color:"#1D9E75",
                    fontSize:"14px",fontWeight:"600",cursor:"pointer"}}>
                    Be the first to write one →
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* Featured */}
                {featured && category==="All" && search==="" && (
                  <div onClick={()=>onOpenPost(featured)}
                    className="card-hover"
                    style={{background:"#fff",border:"1.5px solid rgba(29,158,117,0.15)",
                      borderRadius:"20px",padding:"clamp(20px,4vw,32px)",
                      marginBottom:"24px",cursor:"pointer"}}>
                    <div style={{display:"flex",gap:"8px",marginBottom:"14px",flexWrap:"wrap"}}>
                      <CatPill category={featured.category}/>
                      <span style={{display:"inline-flex",padding:"2px 10px",borderRadius:"100px",
                        fontSize:"10px",fontWeight:"700",background:"#FAEEDA",color:"#633806"}}>
                        ✦ Latest
                      </span>
                    </div>
                    <h2 style={{fontFamily:"'Lora',serif",
                      fontSize:"clamp(20px,3vw,28px)",fontWeight:"600",
                      color:"#0D1A16",lineHeight:"1.3",marginBottom:"10px",maxWidth:"700px"}}>
                      {featured.title}
                    </h2>
                    {featured.summary && (
                      <p style={{fontSize:"14px",color:"#5A7A6E",lineHeight:"1.7",
                        marginBottom:"16px",maxWidth:"600px"}}>
                        {featured.summary}
                      </p>
                    )}
                    <div style={{display:"flex",alignItems:"center",gap:"10px",flexWrap:"wrap"}}>
                      <Avatar name={featured.author_name} avatar={featured.author_avatar}/>
                      <span style={{fontSize:"13px",color:"#2E4F44",fontWeight:"500"}}>
                        {featured.author_name}
                      </span>
                      <span style={{fontSize:"12px",color:"#8FA89E"}}>
                        · {timeAgo(featured.created_at)}
                      </span>
                      <span style={{marginLeft:"auto",fontSize:"12px",color:"#8FA89E"}}>
                        ↑ {featured.upvotes} · 👁 {featured.views}
                      </span>
                    </div>
                  </div>
                )}

                {/* Grid */}
                <div style={{display:"grid",
                  gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:"16px"}}>
                  {(category==="All" && search==="" ? rest : filtered).map(post => (
                    <PostCard key={post.id} post={post}
                      onClick={()=>onOpenPost(post)}/>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function PostCard({ post, onClick }) {
  return (
    <div onClick={onClick} className="card-hover" style={{
      background:"#fff",border:"1.5px solid rgba(29,158,117,0.12)",
      borderRadius:"18px",padding:"20px",cursor:"pointer",
      display:"flex",flexDirection:"column"}}>
      <div style={{marginBottom:"10px"}}><CatPill category={post.category}/></div>
      {post.cover_image && (
        <img src={post.cover_image}
          style={{width:"100%",height:"140px",objectFit:"cover",
            borderRadius:"10px",marginBottom:"10px"}} alt=""/>
      )}
      <h3 style={{fontFamily:"'Lora',serif",fontSize:"15px",fontWeight:"600",
        color:"#0D1A16",lineHeight:"1.4",marginBottom:"8px",flex:1}}>
        {post.title}
      </h3>
      {post.summary && (
        <p style={{fontSize:"12px",color:"#5A7A6E",lineHeight:"1.6",marginBottom:"14px",
          display:"-webkit-box",WebkitLineClamp:2,
          WebkitBoxOrient:"vertical",overflow:"hidden"}}>
          {post.summary}
        </p>
      )}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",
        paddingTop:"12px",borderTop:"1px solid rgba(29,158,117,0.08)",marginTop:"auto"}}>
        <div style={{display:"flex",alignItems:"center",gap:"7px"}}>
          <Avatar name={post.author_name} avatar={post.author_avatar} size={22}/>
          <span style={{fontSize:"11px",color:"#5A7A6E"}}>{post.author_name}</span>
        </div>
        <span style={{fontSize:"11px",color:"#8FA89E"}}>
          ↑ {post.upvotes} · {timeAgo(post.created_at)}
        </span>
      </div>
    </div>
  )
}