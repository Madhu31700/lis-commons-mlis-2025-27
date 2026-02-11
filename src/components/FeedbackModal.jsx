import { useState } from "react"
import { db } from "../firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { useAuth } from "../context/AuthContext"

export default function FeedbackModal({ onClose }) {
  const { user } = useAuth()
  const [type, setType] = useState("Bug Report") 
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message.trim()) return

    setLoading(true)
    try {
      await addDoc(collection(db, "feedback"), {
        userEmail: user?.email || "Anonymous",
        userName: user?.displayName || "Anonymous",
        type: type,
        message: message,
        status: "Open", // Open, In Progress, Resolved
        date: serverTimestamp()
      })
      alert("Feedback sent! Thank you.")
      onClose()
    } catch (err) {
      alert("Error: " + err.message)
    }
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-[#0f172a] border border-slate-700 w-full max-w-md p-8 rounded-3xl relative shadow-2xl">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">✕</button>

        <h2 className="text-2xl font-black text-white mb-1">Submit Feedback</h2>
        <p className="text-slate-400 text-xs mb-6">Help us improve the Librandhana experience.</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Category</label>
            <select 
              value={type}
              onChange={e => setType(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white outline-none focus:border-indigo-500 transition-colors"
            >
              <option>Bug Report</option>
              <option>Feature Request</option>
              <option>General Suggestion</option>
              <option>Content Error</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Message</label>
            <textarea 
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Describe the issue or idea..."
              rows="4"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white outline-none resize-none focus:border-indigo-500 transition-colors"
            />
          </div>

          <button 
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl uppercase tracking-widest transition-all shadow-lg shadow-indigo-500/20"
          >
            {loading ? "Sending..." : "Submit Report"}
          </button>
        </form>

      </div>
    </div>
  )
}