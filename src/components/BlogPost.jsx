import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase"
import { useAuth } from "../context/AuthContext"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

const CAT_STYLE = {
  "Study Notes":     { bg: "#E1F5EE", color: "#085041" },
  "Tacit Knowledge": { bg: "#E6F1FB", color: "#0C447C" },
  "Career":          { bg: "#FAEEDA", color: "#633806" },
  "Research":        { bg: "#EEEDFE", color: "#3C3489" },
  "Opinion":         { bg: "#FBEAF0", color: "#72243E" },
  "Resources":       { bg: "#EAF3DE", color: "#27500A" },
  "General":         { bg: "#F5F7F6", color: "#2E4F44" },
}

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000)
  if (diff < 60)    return "just now"
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

function Avatar({ name, avatar, size = 36 }) {
  const [err, setErr] = useState(false)
  if (avatar && !err) return (
    <img src={avatar} onError={() => setErr(true)}
      style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #9FE1CB', flexShrink: 0 }}
      alt={name} />
  )
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%', flexShrink: 0,
      background: 'linear-gradient(135deg,#1D9E75,#5DCAA5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontSize: size * 0.38, fontWeight: '700',
    }}>{name?.charAt(0).toUpperCase()}</div>
  )
}

export default function BlogPost({ post, goBack }) {
  const { user } = useAuth()
  const [comments,    setComments]    = useState([])
  const [newComment,  setNewComment]  = useState("")
  const [submitting,  setSubmitting]  = useState(false)
  const [upvoted,     setUpvoted]     = useState(false)
  const [upvoteCount, setUpvoteCount] = useState(post?.upvotes || 0)

  useEffect(() => {
    incrementViews()
    fetchComments()
  }, [])

  const incrementViews = async () => {
    await supabase.from("posts")
      .update({ views: (post.views || 0) + 1 })
      .eq("id", post.id)
  }

  const fetchComments = async () => {
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", post.id)
      .order("created_at", { ascending: true })
    setComments(data || [])
  }

  const handleUpvote = async () => {
    if (!user) return
    const newCount = upvoted ? upvoteCount - 1 : upvoteCount + 1
    await supabase.from("posts").update({ upvotes: newCount }).eq("id", post.id)
    setUpvoteCount(newCount)
    setUpvoted(!upvoted)
  }

  const handleComment = async () => {
    if (!newComment.trim() || !user) return
    setSubmitting(true)
    const { error } = await supabase.from("comments").insert({
      post_id:       post.id,
      author_id:     user.uid,
      author_name:   user.displayName || user.email,
      author_avatar: user.photoURL || null,
      body:          newComment.trim(),
    })
    if (!error) { setNewComment(""); fetchComments() }
    setSubmitting(false)
  }

  const catStyle = CAT_STYLE[post?.category] || CAT_STYLE["General"]

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", background: '#fff', minHeight: '100vh' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: 'clamp(32px,5vw,56px) clamp(16px,4vw,32px)' }}>

        {/* Back */}
        <button onClick={goBack} style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: '13px', color: '#5A7A6E', fontWeight: '500',
          marginBottom: '32px', padding: 0,
        }}>← Back to Blog</button>

        {/* Category + title */}
        <span style={{
          display: 'inline-flex', padding: '3px 12px', borderRadius: '100px',
          fontSize: '11px', fontWeight: '700', letterSpacing: '0.06em',
          background: catStyle.bg, color: catStyle.color, marginBottom: '16px',
        }}>{post.category}</span>

        <h1 style={{
          fontFamily: "'Lora',serif", fontSize: 'clamp(24px,4vw,38px)',
          fontWeight: '600', color: '#0D1A16', lineHeight: '1.25', marginBottom: '16px',
        }}>{post.title}</h1>

        {post.summary && (
          <p style={{
            fontFamily: "'Lora',serif", fontSize: '16px', fontStyle: 'italic',
            color: '#5A7A6E', lineHeight: '1.75',
            borderLeft: '3px solid #1D9E75', paddingLeft: '16px',
            marginBottom: '24px',
          }}>{post.summary}</p>
        )}

        {/* Author row */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '12px',
          padding: '14px 0', borderTop: '1px solid rgba(29,158,117,0.1)',
          borderBottom: '1px solid rgba(29,158,117,0.1)', marginBottom: '36px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Avatar name={post.author_name} avatar={post.author_avatar} />
            <div>
              <div style={{ fontSize: '14px', fontWeight: '600', color: '#0D1A16' }}>{post.author_name}</div>
              <div style={{ fontSize: '12px', color: '#8FA89E' }}>{timeAgo(post.created_at)} · {post.views || 0} views</div>
            </div>
          </div>
          <button onClick={handleUpvote} style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '8px 18px', borderRadius: '100px',
            border: `1.5px solid ${upvoted ? '#1D9E75' : 'rgba(29,158,117,0.2)'}`,
            background: upvoted ? '#E1F5EE' : '#fff',
            color: upvoted ? '#085041' : '#5A7A6E',
            fontSize: '13px', fontWeight: '600', cursor: 'pointer',
            transition: 'all 0.15s',
          }}>
            ↑ {upvoteCount}
          </button>
        </div>

        {/* Content */}
        <div style={{ marginBottom: '48px' }} className="prose prose-stone md:prose-base max-w-none
          prose-headings:font-serif prose-headings:font-semibold prose-headings:text-[#0D1A16]
          prose-p:text-[#2E4F44] prose-p:leading-relaxed
          prose-a:text-[#1D9E75] prose-a:no-underline hover:prose-a:underline
          prose-blockquote:border-[#1D9E75] prose-blockquote:text-[#5A7A6E] prose-blockquote:italic
          prose-code:bg-[#E1F5EE] prose-code:text-[#085041] prose-code:px-1.5 prose-code:rounded
          prose-strong:text-[#0D1A16]">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
            {post.tags.map(tag => (
              <span key={tag} style={{
                padding: '4px 12px', borderRadius: '100px', fontSize: '11px',
                background: '#E1F5EE', color: '#085041', fontWeight: '600',
              }}>#{tag}</span>
            ))}
          </div>
        )}

        {/* Comments */}
        <div style={{ borderTop: '1px solid rgba(29,158,117,0.1)', paddingTop: '32px' }}>
          <h3 style={{
            fontFamily: "'Lora',serif", fontSize: '22px', fontWeight: '600',
            color: '#0D1A16', marginBottom: '24px',
          }}>
            {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
          </h3>

          {/* Comment input */}
          {user ? (
            <div style={{ display: 'flex', gap: '12px', marginBottom: '28px' }}>
              <Avatar name={user.displayName || user.email} avatar={user.photoURL} size={32} />
              <div style={{ flex: 1 }}>
                <textarea
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  rows={3}
                  style={{
                    width: '100%', padding: '12px 16px',
                    border: '1.5px solid rgba(29,158,117,0.2)',
                    borderRadius: '14px', fontSize: '13px', outline: 'none',
                    resize: 'vertical', fontFamily: "'Plus Jakarta Sans',sans-serif",
                    color: '#0D1A16',
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                  <button onClick={handleComment}
                    disabled={!newComment.trim() || submitting}
                    style={{
                      background: 'linear-gradient(135deg,#1D9E75,#0F6E56)',
                      color: '#fff', border: 'none', borderRadius: '100px',
                      padding: '8px 20px', fontSize: '12px', fontWeight: '600',
                      cursor: 'pointer', opacity: submitting ? 0.5 : 1,
                    }}>
                    {submitting ? "Posting..." : "Post Comment"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div style={{
              background: '#E1F5EE', borderRadius: '12px', padding: '14px',
              textAlign: 'center', fontSize: '13px', color: '#085041',
              marginBottom: '24px', fontWeight: '500',
            }}>
              Sign in to leave a comment.
            </div>
          )}

          {/* Comments list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {comments.map(c => (
              <div key={c.id} style={{ display: 'flex', gap: '10px' }}>
                <Avatar name={c.author_name} avatar={c.author_avatar} size={28} />
                <div style={{
                  flex: 1, background: '#F5F7F6',
                  border: '1px solid rgba(29,158,117,0.08)',
                  borderRadius: '14px', padding: '12px 16px',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#0D1A16' }}>{c.author_name}</span>
                    <span style={{ fontSize: '11px', color: '#8FA89E' }}>{timeAgo(c.created_at)}</span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#2E4F44', lineHeight: '1.6' }}>{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}