import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase"
import { useAuth } from "../context/AuthContext"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

const CATEGORY_COLORS = {
  "Study Notes":     "bg-brand-50 text-brand-500",
  "Tacit Knowledge": "bg-teal-50 text-teal-700",
  "Career":          "bg-blue-50 text-blue-700",
  "Research":        "bg-violet-50 text-violet-700",
  "Opinion":         "bg-rose-50 text-rose-600",
  "Resources":       "bg-amber-50 text-amber-700",
  "General":         "bg-stone-100 text-stone-500",
}

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000)
  if (diff < 60)    return "just now"
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

function Avatar({ name, avatar, size = "w-8 h-8" }) {
  const [err, setErr] = useState(false)
  if (avatar && !err) {
    return <img src={avatar} onError={() => setErr(true)} className={`${size} rounded-full object-cover border border-stone-200`} alt={name} />
  }
  return (
    <div className={`${size} rounded-full bg-brand-100 flex items-center justify-center text-brand-500 font-bold text-sm border border-brand-200`}>
      {name?.charAt(0).toUpperCase()}
    </div>
  )
}

export default function BlogPost({ post, goBack }) {
  const { user }          = useAuth()
  const [comments, setComments]   = useState([])
  const [newComment, setNewComment] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [upvoted, setUpvoted]     = useState(false)
  const [upvoteCount, setUpvoteCount] = useState(post.upvotes || 0)

  useEffect(() => {
    incrementViews()
    fetchComments()
    checkUpvoted()
  }, [])

  const incrementViews = async () => {
    await supabase.rpc("increment_views", { post_id: post.id })
  }

  const fetchComments = async () => {
    const { data } = await supabase
      .from("comments")
      .select("*")
      .eq("post_id", post.id)
      .order("created_at", { ascending: true })
    setComments(data || [])
  }

  const checkUpvoted = async () => {
    if (!user) return
    const { data } = await supabase
      .from("post_upvotes")
      .select("post_id")
      .eq("post_id", post.id)
      .eq("user_id", user.uid)
      .maybeSingle()
    setUpvoted(!!data)
  }

  const handleUpvote = async () => {
    if (!user) return
    if (upvoted) {
      await supabase.from("post_upvotes").delete()
        .eq("post_id", post.id).eq("user_id", user.uid)
      await supabase.from("posts").update({ upvotes: upvoteCount - 1 }).eq("id", post.id)
      setUpvoteCount(c => c - 1)
      setUpvoted(false)
    } else {
      await supabase.from("post_upvotes").insert({ post_id: post.id, user_id: user.uid })
      await supabase.from("posts").update({ upvotes: upvoteCount + 1 }).eq("id", post.id)
      setUpvoteCount(c => c + 1)
      setUpvoted(true)
    }
  }

  const handleComment = async () => {
    if (!newComment.trim() || !user) return
    setSubmitting(true)
    const { error } = await supabase.from("comments").insert({
      post_id:      post.id,
      author_id:    user.uid,
      author_name:  user.displayName || user.email,
      author_avatar: user.photoURL || null,
      body:         newComment.trim(),
    })
    if (!error) {
      setNewComment("")
      fetchComments()
    }
    setSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans pb-20">
      <div className="max-w-3xl mx-auto px-5 pt-10">

        {/* ── BACK ── */}
        <button
          onClick={goBack}
          className="flex items-center gap-2 text-sm text-stone-400 hover:text-stone-700 mb-8 transition-colors"
        >
          ← Back to Blog
        </button>

        {/* ── POST HEADER ── */}
        <div className="mb-8">
          <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg mb-4 ${CATEGORY_COLORS[post.category] || CATEGORY_COLORS["General"]}`}>
            {post.category}
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-stone-900 leading-tight mb-4">
            {post.title}
          </h1>
          {post.summary && (
            <p className="text-stone-500 text-base leading-relaxed border-l-2 border-brand-200 pl-4 mb-6 italic font-serif">
              {post.summary}
            </p>
          )}

          {/* Author + meta row */}
          <div className="flex items-center justify-between flex-wrap gap-4 py-4 border-y border-stone-100">
            <div className="flex items-center gap-3">
              <Avatar name={post.author_name} avatar={post.author_avatar} />
              <div>
                <div className="text-sm font-semibold text-stone-700">{post.author_name}</div>
                <div className="text-xs text-stone-400">{timeAgo(post.created_at)} · {post.views} views</div>
              </div>
            </div>
            {/* Upvote button */}
            <button
              onClick={handleUpvote}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all
                ${upvoted
                  ? "bg-brand-50 text-brand-400 border-brand-200"
                  : "bg-white text-stone-400 border-stone-200 hover:border-brand-200 hover:text-brand-400"
                }`}
            >
              ↑ {upvoteCount}
            </button>
          </div>
        </div>

        {/* ── POST CONTENT (Markdown) ── */}
        <div className="prose prose-stone prose-sm md:prose-base max-w-none
          prose-headings:font-serif prose-headings:font-medium
          prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg
          prose-p:leading-relaxed prose-p:text-stone-600
          prose-a:text-brand-400 prose-a:no-underline hover:prose-a:underline
          prose-blockquote:border-brand-200 prose-blockquote:text-stone-500 prose-blockquote:italic
          prose-code:bg-stone-100 prose-code:text-stone-700 prose-code:px-1 prose-code:rounded
          prose-strong:text-stone-800
          mb-12"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
          </ReactMarkdown>
        </div>

        {/* ── TAGS ── */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {post.tags.map(tag => (
              <span key={tag} className="text-xs px-3 py-1 bg-stone-100 text-stone-500 rounded-full border border-stone-200">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* ── COMMENTS ── */}
        <div className="border-t border-stone-200 pt-8">
          <h3 className="font-serif text-xl font-medium text-stone-800 mb-6">
            {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
          </h3>

          {/* Comment input */}
          {user ? (
            <div className="flex gap-3 mb-8">
              <Avatar name={user.displayName || user.email} avatar={user.photoURL} />
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  rows={3}
                  className="w-full text-sm border border-stone-200 rounded-xl px-4 py-3 bg-white text-stone-700 placeholder:text-stone-300 focus:outline-none focus:border-brand-200 resize-none"
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleComment}
                    disabled={!newComment.trim() || submitting}
                    className="bg-brand-300 hover:bg-brand-400 text-brand-50 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-40"
                  >
                    {submitting ? "Posting..." : "Post Comment"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-stone-100 rounded-xl p-4 text-sm text-stone-400 text-center mb-8">
              Sign in to leave a comment.
            </div>
          )}

          {/* Comments list */}
          <div className="space-y-5">
            {comments.map(c => (
              <div key={c.id} className="flex gap-3">
                <Avatar name={c.author_name} avatar={c.author_avatar} size="w-7 h-7" />
                <div className="flex-1 bg-white border border-stone-100 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-semibold text-stone-700">{c.author_name}</span>
                    <span className="text-[11px] text-stone-300">{timeAgo(c.created_at)}</span>
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed">{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}