import { useState, useEffect } from "react"
import { collection, query, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore"
import { db } from "../firebase"

export default function FeedbackDashboard({ goBack }) {
  const [feedbacks, setFeedbacks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(collection(db, "feedback"), orderBy("date", "desc"))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setFeedbacks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const handleDelete = async (id) => {
    if(confirm("Permanently delete this message?")) {
      await deleteDoc(doc(db, "feedback", id))
    }
  }

  const getBadgeStyle = (type) => {
    switch(type) {
      case 'Bug': return 'bg-rose-500/10 text-rose-400 border-rose-500/20'
      case 'Internship': return 'bg-teal-500/10 text-teal-400 border-teal-500/20'
      case 'Content': return 'bg-amber-500/10 text-amber-400 border-amber-500/20'
      default: return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-6 md:p-12 font-sans">
      
      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-10 flex items-center justify-between">
        <div>
          <button onClick={goBack} className="text-slate-500 hover:text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors mb-4">
            ← Back to Home
          </button>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">Admin Console</h1>
          <p className="text-slate-400 mt-2">Manage user feedback and system reports.</p>
        </div>
      </div>

      {/* DASHBOARD CONTAINER */}
      <div className="max-w-5xl mx-auto w-full bg-[#0B1120] border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* TOOLBAR */}
        <div className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 p-6 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping absolute opacity-75"></div>
              <div className="w-3 h-3 bg-emerald-500 rounded-full relative"></div>
            </div>
            <span className="font-bold text-white">Live Inbox</span>
          </div>
          <div className="bg-slate-800 px-3 py-1 rounded-lg border border-slate-700 text-xs font-mono font-bold text-slate-300">
            {feedbacks.length} Items
          </div>
        </div>

        {/* FEEDBACK LIST */}
        <div className="p-6 bg-[#0B1120] min-h-[400px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-40 space-y-4">
               <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
               <p className="text-slate-500 text-xs animate-pulse">Syncing Database...</p>
            </div>
          ) : feedbacks.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-slate-800 rounded-2xl bg-slate-900/20">
              <p className="text-slate-400 font-bold">All caught up!</p>
              <p className="text-slate-600 text-sm">No pending feedback.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {feedbacks.map((item) => (
                <div key={item.id} className="group relative bg-slate-900/50 hover:bg-slate-900 border border-slate-800 hover:border-slate-600 rounded-xl p-6 transition-all duration-300 hover:shadow-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 text-xs font-bold border border-slate-700">
                        {item.user.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-slate-200 text-xs font-bold">{item.user}</p>
                        <p className="text-slate-500 text-[10px] font-mono">{new Date(item.date).toLocaleString()}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded border ${getBadgeStyle(item.type)}`}>
                      {item.type}
                    </span>
                  </div>
                  <div className="pl-11 pr-12">
                    <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{item.message}</p>
                  </div>
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                     <button onClick={() => handleDelete(item.id)} className="p-2 bg-slate-800 hover:bg-red-500/10 hover:text-red-400 text-slate-500 rounded-lg transition-colors" title="Delete">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                     </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}