import { useState, useRef, useEffect } from "react"
import { supabase } from "../lib/supabase"
import { useAuth } from "../context/AuthContext"
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"

const CATEGORIES = ["Study Notes","Tacit Knowledge","Career","Research","Opinion","Resources","General"]
const ADMIN_EMAILS = ["madhu@drtc.isibang.ac.in","madhu31700@gmail.com","amisha@drtc.isibang.ac.in"]
const READ_TIME = c => Math.max(1, Math.ceil(c.trim().split(/\s+/).length / 200))

export default function WritePost({ goBack, onPublished, editPost = null }) {
  const { user } = useAuth()
  const fileRef  = useRef()
  const coverRef = useRef()
  const isAdmin  = user && ADMIN_EMAILS.includes(user.email)
  const isEdit   = !!editPost

  const [title,     setTitle]     = useState(editPost?.title || "")
  const [summary,   setSummary]   = useState(editPost?.summary || "")
  const [content,   setContent]   = useState(editPost?.content || "")
  const [category,  setCategory]  = useState(editPost?.category || "Study Notes")
  const [tags,      setTags]      = useState(editPost?.tags?.join(", ") || "")
  const [coverImg,  setCoverImg]  = useState(editPost?.cover_image || null)
  const [coverUrl,  setCoverUrl]  = useState(editPost?.cover_image || "")
  const [saving,    setSaving]    = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error,     setError]     = useState("")
  const [preview,   setPreview]   = useState(false)

  const handleCoverUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    setCoverImg(URL.createObjectURL(file))
    try {
      const ext = file.name.split(".").pop()
      const path = `covers/${Date.now()}.${ext}`
      const { error: upErr } = await supabase.storage
        .from("blog-images").upload(path, file, { upsert: false })
      if (!upErr) {
        const { data } = supabase.storage.from("blog-images").getPublicUrl(path)
        setCoverUrl(data.publicUrl)
      }
    } catch(e) { console.warn(e) }
    setUploading(false)
  }

  const handleInlineImage = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const ext = file.name.split(".").pop()
      const path = `inline/${Date.now()}.${ext}`
      const { error: upErr } = await supabase.storage
        .from("blog-images").upload(path, file, { upsert: false })
      if (!upErr) {
        const { data } = supabase.storage.from("blog-images").getPublicUrl(path)
        setContent(prev => prev + `\n\n![image](${data.publicUrl})\n\n`)
      }
    } catch(e) { console.warn(e) }
    setUploading(false)
    e.target.value = ""
  }

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.")
      return
    }
    setSaving(true)
    setError("")

    const tagList = tags.split(",").map(t=>t.trim().toLowerCase()).filter(Boolean)
    const status  = isAdmin ? "published" : "pending"

    let err
    if (isEdit) {
      // Update existing post
      const { error: e } = await supabase.from("posts")
        .update({
          title:        title.trim(),
          summary:      summary.trim() || null,
          content:      content.trim(),
          cover_image:  coverUrl || null,
          category,
          tags:         tagList,
          // Keep original status unless admin
          ...(isAdmin ? { status: "published", published: true } : {}),
        })
        .eq("id", editPost.id)
      err = e
    } else {
      // New post
      const { error: e } = await supabase.from("posts").insert({
        title:         title.trim(),
        summary:       summary.trim() || null,
        content:       content.trim(),
        cover_image:   coverUrl || null,
        category,
        tags:          tagList,
        status,
        published:     isAdmin,
        author_id:     user.uid,
        author_name:   user.displayName || user.email,
        author_avatar: user.photoURL || null,
        upvotes:       0,
        views:         0,
      })
      err = e
    }

    setSaving(false)
    if (err) { setError(err.message); return }
    onPublished()
  }

  const inp = {
    width:"100%", padding:"10px 16px",
    border:"1.5px solid rgba(29,158,117,0.2)",
    borderRadius:"12px", fontSize:"13px", outline:"none",
    fontFamily:"'Plus Jakarta Sans',sans-serif", color:"#0D1A16", background:"#fff",
  }
  const lbl = {
    display:"block", fontSize:"11px", fontWeight:"700",
    color:"#1D9E75", textTransform:"uppercase",
    letterSpacing:"0.1em", marginBottom:"6px",
  }

  return (
    <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",background:"#fff",minHeight:"100vh"}}>

      {/* Sticky toolbar */}
      <div style={{
        position:"sticky",top:58,zIndex:40,
        background:"rgba(255,255,255,0.97)",
        borderBottom:"1px solid rgba(29,158,117,0.1)",
        backdropFilter:"blur(8px)",
        padding:"10px clamp(16px,4vw,32px)",
        display:"flex",alignItems:"center",justifyContent:"space-between",
        flexWrap:"wrap",gap:"10px",
      }}>
        <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
          <button onClick={goBack} style={{
            background:"none",border:"none",cursor:"pointer",
            fontSize:"13px",color:"#5A7A6E",fontWeight:"500",padding:0}}>
            ← {isEdit ? "Cancel edit" : "Cancel"}
          </button>
          <span style={{color:"#C8D4CE"}}>|</span>
          <span style={{fontSize:"12px",color:"#8FA89E"}}>
            {content
              ? `~${READ_TIME(content)} min read · ${content.trim().split(/\s+/).length} words`
              : "Start writing..."}
          </span>
          {uploading && <span style={{fontSize:"11px",color:"#1D9E75",fontWeight:"600"}}>Uploading image...</span>}
        </div>

        <div style={{display:"flex",gap:"8px",alignItems:"center"}}>
          <button onClick={()=>setPreview(!preview)} style={{
            background:preview?"#E1F5EE":"transparent",
            color:preview?"#085041":"#5A7A6E",
            border:"1.5px solid rgba(29,158,117,0.2)",
            borderRadius:"100px",padding:"7px 16px",
            fontSize:"12px",fontWeight:"600",cursor:"pointer"}}>
            {preview ? "✏️ Edit" : "👁 Preview"}
          </button>
          <button onClick={handleSave} disabled={saving} style={{
            background:"linear-gradient(135deg,#1D9E75,#0F6E56)",
            color:"#fff",border:"none",borderRadius:"100px",
            padding:"8px 20px",fontSize:"13px",fontWeight:"600",
            cursor:"pointer",opacity:saving?0.6:1}}>
            {saving ? "Saving..." : isEdit
              ? "Save Changes →"
              : isAdmin ? "Publish →" : "Submit for Review →"}
          </button>
        </div>
      </div>

      <div style={{maxWidth:"760px",margin:"0 auto",
        padding:"clamp(28px,4vw,48px) clamp(16px,4vw,32px)"}}>

        {/* Mode indicator */}
        <div style={{
          display:"inline-flex",alignItems:"center",gap:"6px",
          padding:"4px 12px",borderRadius:"100px",marginBottom:"20px",
          background: isEdit?"#FAEEDA":"#E1F5EE",
          color: isEdit?"#633806":"#085041",
          fontSize:"12px",fontWeight:"600",
        }}>
          {isEdit ? "✏️ Editing post" : isAdmin ? "✦ Publishing as admin" : "📝 Submitting for review"}
        </div>

        {!isAdmin && !isEdit && (
          <div style={{background:"#E1F5EE",border:"1px solid rgba(29,158,117,0.2)",
            borderRadius:"12px",padding:"12px 16px",
            fontSize:"13px",color:"#085041",marginBottom:"20px"}}>
            ℹ️ Your post will be reviewed by admin before publishing — usually within a few hours.
          </div>
        )}

        {error && (
          <div style={{background:"#FCEBEB",border:"1px solid #F09595",
            borderRadius:"12px",padding:"12px 16px",
            fontSize:"13px",color:"#A32D2D",marginBottom:"20px"}}>{error}</div>
        )}

        {/* Cover image */}
        <div style={{marginBottom:"24px"}}>
          {coverImg ? (
            <div style={{position:"relative",borderRadius:"16px",overflow:"hidden",marginBottom:"8px"}}>
              <img src={coverImg}
                style={{width:"100%",height:"220px",objectFit:"cover"}} alt="Cover"/>
              <div style={{position:"absolute",top:"10px",right:"10px",display:"flex",gap:"8px"}}>
                <button onClick={()=>coverRef.current?.click()} style={{
                  background:"rgba(0,0,0,0.5)",color:"#fff",border:"none",
                  borderRadius:"100px",padding:"5px 12px",fontSize:"11px",
                  fontWeight:"600",cursor:"pointer"}}>Change</button>
                <button onClick={()=>{setCoverImg(null);setCoverUrl("")}} style={{
                  background:"rgba(220,50,50,0.7)",color:"#fff",border:"none",
                  borderRadius:"100px",padding:"5px 12px",fontSize:"11px",
                  fontWeight:"600",cursor:"pointer"}}>Remove</button>
              </div>
            </div>
          ) : (
            <button onClick={()=>coverRef.current?.click()} style={{
              width:"100%",padding:"28px",borderRadius:"16px",
              border:"2px dashed rgba(29,158,117,0.25)",
              background:"#F5F7F6",cursor:"pointer",
              fontSize:"13px",color:"#8FA89E",fontWeight:"500",
              display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"}}>
              🖼️ Add a cover image (optional)
            </button>
          )}
          <input ref={coverRef} type="file" accept="image/*"
            style={{display:"none"}} onChange={handleCoverUpload}/>
        </div>

        {/* Title */}
        <input value={title} onChange={e=>setTitle(e.target.value)}
          placeholder="Post title..."
          style={{width:"100%",fontFamily:"'Lora',serif",
            fontSize:"clamp(20px,4vw,30px)",fontWeight:"600",
            padding:"8px 0",border:"none",
            borderBottom:"2px solid rgba(29,158,117,0.2)",
            outline:"none",color:"#0D1A16",marginBottom:"16px",background:"transparent"}}/>

        {/* Summary */}
        <div style={{marginBottom:"20px"}}>
          <label style={lbl}>Summary <span style={{color:"#8FA89E",fontWeight:"400",textTransform:"none",letterSpacing:0}}>(shown in blog feed)</span></label>
          <input value={summary} onChange={e=>setSummary(e.target.value)}
            placeholder="A one-line summary of your post..."
            style={inp}/>
        </div>

        {/* Category + Tags */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px",marginBottom:"24px"}}>
          <div>
            <label style={lbl}>Category</label>
            <select value={category} onChange={e=>setCategory(e.target.value)} style={inp}>
              {CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={lbl}>Tags <span style={{color:"#8FA89E",fontWeight:"400",textTransform:"none",letterSpacing:0}}>(comma separated)</span></label>
            <input value={tags} onChange={e=>setTags(e.target.value)}
              placeholder="ugc-net, paper-10, drtc"
              style={inp}/>
          </div>
        </div>

        {/* Inline image button */}
        <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"8px"}}>
          <label style={{...lbl,margin:0}}>Content</label>
          <button onClick={()=>fileRef.current?.click()} style={{
            background:"rgba(29,158,117,0.08)",
            border:"1px solid rgba(29,158,117,0.2)",
            borderRadius:"100px",padding:"4px 12px",
            fontSize:"11px",fontWeight:"600",color:"#085041",cursor:"pointer"}}>
            📷 Insert image
          </button>
          <input ref={fileRef} type="file" accept="image/*"
            style={{display:"none"}} onChange={handleInlineImage}/>
        </div>

        {/* Editor / Preview */}
        {!preview ? (
          <div style={{border:"1.5px solid rgba(29,158,117,0.2)",
            borderRadius:"14px",overflow:"hidden",marginBottom:"20px"}}>
            <SimpleMDE value={content} onChange={setContent}
              options={{
                placeholder:"Write your post here. Markdown is fully supported...",
                spellChecker:true,
                toolbar:[
                  "bold","italic","strikethrough","heading",
                  "|","quote","unordered-list","ordered-list","horizontal-rule",
                  "|","link","table",
                  "|","preview","fullscreen",
                  "|","undo","redo",
                ],
                minHeight:"340px",
                status:["lines","words"],
                autosave:{
                  enabled:true,
                  uniqueId:`librandhana-draft-${editPost?.id||"new"}`,
                  delay:5000,
                },
              }}/>
          </div>
        ) : (
          <div style={{border:"1.5px solid rgba(29,158,117,0.15)",
            borderRadius:"14px",padding:"24px",marginBottom:"20px",minHeight:"340px"}}
            className="prose prose-stone max-w-none prose-headings:font-serif
              prose-p:text-[#2E4F44] prose-a:text-[#1D9E75]
              prose-blockquote:border-[#1D9E75]">
            {content
              ? <div dangerouslySetInnerHTML={{__html:content.replace(/\n/g,"<br/>")}}/>
              : <p style={{color:"#8FA89E",fontStyle:"italic"}}>Nothing to preview yet.</p>}
          </div>
        )}

        {/* Author */}
        <div style={{display:"flex",alignItems:"center",gap:"12px",
          background:"#F5F7F6",border:"1px solid rgba(29,158,117,0.1)",
          borderRadius:"12px",padding:"12px 16px"}}>
          {user?.photoURL
            ? <img src={user.photoURL}
                style={{width:"36px",height:"36px",borderRadius:"50%",objectFit:"cover"}} alt=""/>
            : <div style={{width:"36px",height:"36px",borderRadius:"50%",
                background:"linear-gradient(135deg,#1D9E75,#5DCAA5)",
                display:"flex",alignItems:"center",justifyContent:"center",
                color:"#fff",fontSize:"16px",fontWeight:"700"}}>
                {user?.displayName?.charAt(0)}
              </div>
          }
          <div>
            <div style={{fontSize:"13px",fontWeight:"600",color:"#0D1A16"}}>{user?.displayName}</div>
            <div style={{fontSize:"11px",color:"#8FA89E"}}>
              {isEdit ? "Updating your post" : isAdmin ? "Publishing directly" : "Submitting for admin review"}
              {content && ` · ~${READ_TIME(content)} min read`}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}