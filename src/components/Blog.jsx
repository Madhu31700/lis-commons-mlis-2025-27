import { useState, useEffect } from "react"
import { supabase } from "../lib/supabase"
import { useAuth } from "../context/AuthContext"

const CATEGORIES = ["All", "Study Notes", "Tacit Knowledge", "Career", "Research", "Opinion", "Resources"]

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

function Avatar({ name, avatar, size = "w-7 h-7" }) {
  const [err, setErr] = useState(false)
  if (avatar && !err) {
    return <img src={avatar} onError={() => setErr(true)} className={`${size} rounded-full object-cover border border-stone-200`} alt={name} />
  }
  return (
    <div className={`${size} rounded-full bg-brand-100 flex items-center justify-center text-brand-500 font-bold text-xs border border-brand-200`}>
      {name?.charAt(0).toUpperCase()}
    </div>
  )
}

export default function Blog({ onOpenPost, onWritePost }) {
  const { user } = useAuth()
  const [posts, setPosts]         = useState([])
  const [loading, setLoading]     = useState(true)
  const [category, setCategory]   = useState("All")
  const [search, setSearch]       = useState("")

  useEffect(() => {
    fetchPosts()
  }, [category])

  const fetchPosts = async () => {
    setLoading(true)
    let query = supabase
      .from("posts")
      .select("*")
      .eq("published", true)
      .order("created_at", { ascending: false })

    if (category !== "All") {
      query = query.eq("category", category)
    }

    const { data, error } = await query
    if (!error) setPosts(data || [])
    setLoading(false)
  }

  const filtered = posts.filter(p =>
    search === "" ||
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.summary?.toLowerCase().includes(search.toLowerCase())
  )

  // Featured = most upvoted post
  const featured = filtered[0]
  const rest     = filtered.slice(1)

  return (
    <div className="min-h-screen bg-stone-50 font-sans pb-20">
      <div className="max-w-6xl mx-auto px-5 pt-10">

        {/* ── TOP BAR ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-3xl font-semibold text-stone-900">The Blog</h1>
            <p className="text-stone-400 text-sm mt-1">Student notes, opinions, and knowledge worth keeping.</p>
          </div>
          <div className="flex items-center gap-3">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search posts..."
              className="text-sm border border-stone-200 rounded-xl px-4 py-2 bg-white text-stone-700 placeholder:text-stone-300 focus:outline-none focus:border-brand-200 w-48"
            />
            {user && (
              <button
                onClick={onWritePost}
                className="flex items-center gap-2 bg-brand-300 hover:bg-brand-400 text-brand-50 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-sm whitespace-nowrap"
              >
                ✍️ Write
              </button>
            )}
          </div>
        </div>

        {/* ── CATEGORY FILTERS ── */}
        <div className="flex gap-2 flex-wrap mb-8">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all
                ${category === c
                  ? "bg-brand-300 text-brand-50 border-brand-300"
                  : "bg-white text-stone-500 border-stone-200 hover:border-stone-300"
                }`}
            >
              {c}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24 text-stone-300 text-sm">Loading posts...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-stone-300 text-5xl mb-4">📭</p>
            <p className="text-stone-400 font-medium">No posts yet in this category.</p>
            {user && <button onClick={onWritePost} className="mt-4 text-brand-300 text-sm font-semibold hover:underline">Be the first to write one →</button>}
          </div>
        ) : (
          <>
            {/* ── FEATURED POST ── */}
            {featured && category === "All" && search === "" && (
              <div
                onClick={() => onOpenPost(featured)}
                className="group bg-white border border-stone-200 rounded-2xl overflow-hidden mb-8 cursor-pointer hover:border-stone-300 hover:shadow-md transition-all"
              >
                <div className="p-7 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg ${CATEGORY_COLORS[featured.category] || CATEGORY_COLORS["General"]}`}>
                      {featured.category}
                    </span>
                    <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest bg-amber-50 px-2.5 py-1 rounded-lg">
                      ✦ Featured
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl font-medium text-stone-900 leading-snug mb-3 group-hover:text-brand-400 transition-colors max-w-2xl">
                    {featured.title}
                  </h2>
                  {featured.summary && (
                    <p className="text-stone-400 text-sm leading-relaxed mb-5 max-w-xl">{featured.summary}</p>
                  )}
                  <div className="flex items-center gap-3">
                    <Avatar name={featured.author_name} avatar={featured.author_avatar} />
                    <div className="text-xs text-stone-400">
                      <span className="font-medium text-stone-600">{featured.author_name}</span>
                      <span className="mx-1.5">·</span>{timeAgo(featured.created_at)}
                    </div>
                    <div className="ml-auto flex items-center gap-3 text-xs text-stone-300">
                      <span>↑ {featured.upvotes}</span>
                      <span>👁 {featured.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── POST GRID ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {(category === "All" && search === "" ? rest : filtered).map(post => (
                <PostCard key={post.id} post={post} onClick={() => onOpenPost(post)} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function PostCard({ post, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group bg-white border border-stone-200 rounded-2xl p-5 cursor-pointer hover:border-stone-300 hover:shadow-sm transition-all flex flex-col"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${CATEGORY_COLORS[post.category] || CATEGORY_COLORS["General"]}`}>
          {post.category}
        </span>
      </div>
      <h3 className="font-serif text-stone-800 font-medium text-base leading-snug mb-2 group-hover:text-brand-400 transition-colors flex-1">
        {post.title}
      </h3>
      {post.summary && (
        <p className="text-stone-400 text-xs leading-relaxed mb-4 line-clamp-2">{post.summary}</p>
      )}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-stone-100">
        <div className="flex items-center gap-2">
          <Avatar name={post.author_name} avatar={post.author_avatar} size="w-6 h-6" />
          <span className="text-xs text-stone-400">{post.author_name}</span>
        </div>
        <div className="flex items-center gap-2.5 text-[11px] text-stone-300">
          <span>↑ {post.upvotes}</span>
          <span>·</span>
          <span>{timeAgo(post.created_at)}</span>
        </div>
      </div>
    </div>
  )
}