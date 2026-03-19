import { useState } from "react"
import { supabase } from "../lib/supabase"
import { useAuth } from "../context/AuthContext"
import SimpleMDE from "react-simplemde-editor"
import "easymde/dist/easymde.min.css"

const CATEGORIES = ["Study Notes", "Tacit Knowledge", "Career", "Research", "Opinion", "Resources", "General"]

export default function WritePost({ goBack, onPublished }) {
  const { user } = useAuth()
  const [title,    setTitle]    = useState("")
  const [summary,  setSummary]  = useState("")
  const [content,  setContent]  = useState("")
  const [category, setCategory] = useState("Study Notes")
  const [tags,     setTags]     = useState("")
  const [saving,   setSaving]   = useState(false)
  const [error,    setError]    = useState("")

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.")
      return
    }
    setSaving(true)
    setError("")

    const tagList = tags
      .split(",")
      .map(t => t.trim().toLowerCase())
      .filter(Boolean)

    const { error: err } = await supabase.from("posts").insert({
      title:        title.trim(),
      summary:      summary.trim() || null,
      content:      content.trim(),
      category,
      tags:         tagList,
      author_id:    user.uid,
      author_name:  user.displayName || user.email,
      author_avatar: user.photoURL || null,
      published:    true,
    })

    setSaving(false)
    if (err) { setError("Failed to publish: " + err.message); return }
    onPublished()
  }

  return (
    <div className="min-h-screen bg-stone-50 font-sans pb-20">
      <div className="max-w-3xl mx-auto px-5 pt-10">

        {/* ── HEADER ── */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={goBack} className="text-sm text-stone-400 hover:text-stone-700 transition-colors">
            ← Cancel
          </button>
          <h1 className="font-serif text-xl font-medium text-stone-800">New Post</h1>
          <button
            onClick={handlePublish}
            disabled={saving}
            className="bg-brand-300 hover:bg-brand-400 text-brand-50 px-5 py-2 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
          >
            {saving ? "Publishing..." : "Publish →"}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-6">
            {error}
          </div>
        )}

        {/* ── FORM ── */}
        <div className="space-y-5">

          {/* Title */}
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Post title..."
            className="w-full font-serif text-2xl text-stone-800 bg-transparent border-b-2 border-stone-200 focus:border-brand-300 outline-none pb-2 placeholder:text-stone-300 transition-colors"
          />

          {/* Summary */}
          <input
            value={summary}
            onChange={e => setSummary(e.target.value)}
            placeholder="Short summary (shown in feed)..."
            className="w-full text-sm text-stone-500 bg-white border border-stone-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-200 placeholder:text-stone-300"
          />

          {/* Category + Tags row */}
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[160px]">
              <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full text-sm border border-stone-200 rounded-xl px-4 py-2.5 bg-white text-stone-700 focus:outline-none focus:border-brand-200"
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex-1 min-w-[160px]">
              <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5">Tags (comma separated)</label>
              <input
                value={tags}
                onChange={e => setTags(e.target.value)}
                placeholder="ugc-net, paper-10, drtc"
                className="w-full text-sm border border-stone-200 rounded-xl px-4 py-2.5 bg-white text-stone-700 focus:outline-none focus:border-brand-200 placeholder:text-stone-300"
              />
            </div>
          </div>

          {/* Markdown editor */}
          <div>
            <label className="block text-xs font-semibold text-stone-400 uppercase tracking-wider mb-1.5">Content (Markdown supported)</label>
            <div className="rounded-xl overflow-hidden border border-stone-200">
              <SimpleMDE
                value={content}
                onChange={setContent}
                options={{
                  placeholder: "Write your post here. Markdown is supported — headings, bold, lists, links...",
                  spellChecker: false,
                  toolbar: ["bold", "italic", "heading", "|", "quote", "unordered-list", "ordered-list", "|", "link", "|", "preview"],
                  minHeight: "300px",
                  status: false,
                }}
              />
            </div>
          </div>

          {/* Author preview */}
          <div className="flex items-center gap-3 bg-white border border-stone-200 rounded-xl px-4 py-3">
            {user?.photoURL
              ? <img src={user.photoURL} className="w-8 h-8 rounded-full border border-stone-200" alt="" />
              : <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-500 font-bold text-sm">{user?.displayName?.charAt(0)}</div>
            }
            <div>
              <div className="text-sm font-semibold text-stone-700">{user?.displayName}</div>
              <div className="text-xs text-stone-400">Publishing as you</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}