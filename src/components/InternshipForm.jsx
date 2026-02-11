import { useEffect, useState } from "react"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase"
import { useAuth } from "../context/AuthContext"
import { supabase } from "../supabase"

export default function InternshipForm({ goBack }) {
  const { user } = useAuth()

  // --- STATE & LOGIC (KEPT EXACTLY AS YOURS) ---
  const [data, setData] = useState({
    name: "",
    roll: "",
    programme: "MLIS 2025–2027",
    phone: "",
    linkedin: "", 
    bio: "",      
    availability: "", 
    sector: [],
    libraryType: "",
    corporateRole: "",
    location: "",
    relocate: "",
    pref1: "",
    pref2: "",
    pref3: "",
    skills: [],
    tools: [],
    cvLink: "",
    cvPhoto: "",
    cvVisibility: "placement",
    consent: false,
  })

  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState("")
  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const [uploadingCV, setUploadingCV] = useState(false)

  /* ---------- LOAD DATA ---------- */
  useEffect(() => {
    if (!user) return
    const ref = doc(db, "internships", user.email)
    getDoc(ref).then((snap) => {
      if (snap.exists()) {
        setData((d) => ({ ...d, ...snap.data() }))
      }
      setLoading(false)
    })
  }, [user])

  const toggleArray = (field, value) => {
    setData((d) => ({
      ...d,
      [field]: d[field].includes(value)
        ? d[field].filter((v) => v !== value)
        : [...d[field], value],
    }))
  }

  /* ---------- UPLOADS ---------- */
  const uploadPhoto = async (file) => {
    if (!file || !user) return
    try {
      setUploadingPhoto(true)
      const fileName = `${user.email}.jpg`
      
      const { error } = await supabase.storage
        .from("profile-photos")
        .upload(fileName, file, { upsert: true })
      
      if (error) throw error
      
      const { data: urlData } = supabase.storage
        .from("profile-photos")
        .getPublicUrl(fileName)

      setData((d) => ({ ...d, cvPhoto: `${urlData.publicUrl}?t=${Date.now()}` }))
      
    } catch (err) {
      alert(`Photo Error: ${err.message}`)
    } finally { 
      setUploadingPhoto(false) 
    }
  }

  const uploadCV = async (file) => {
    if (!file || !user) return
    try {
      setUploadingCV(true)
      const fileName = `${user.email}.pdf`
      
      const { error } = await supabase.storage
        .from("cv-files")
        .upload(fileName, file, { upsert: true })
      
      if (error) throw error
      
      const { data: urlData } = supabase.storage
        .from("cv-files")
        .getPublicUrl(fileName)

      setData((d) => ({ ...d, cvLink: urlData.publicUrl }))
      
    } catch (err) {
      alert(`CV Error: ${err.message}`)
    } finally { 
      setUploadingCV(false) 
    }
  }

  /* ---------- SUBMIT ---------- */
  const submit = async () => {
    if (!data.consent) return alert("Consent is mandatory")
    try {
      await setDoc(doc(db, "internships", user.email), {
        ...data,
        email: user.email,
        updatedAt: serverTimestamp(),
      })
      setStatus("Profile Synced Successfully!")
      setTimeout(() => setStatus(""), 3000)
    } catch (err) {
      alert("Save failed: " + err.message)
    }
  }

  if (loading) return null

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-emerald-500/30 pb-20">
      
      {/* ================= GLOBAL BACKGROUND ================= */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0"></div>
      <div className="fixed inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-12">
        
        {/* --- HEADER --- */}
        <button 
          onClick={goBack}
          className="mb-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span>
          <span className="text-xs font-bold uppercase tracking-widest">Back to Hub</span>
        </button>

        <div className="text-center mb-12 animate-fadeIn">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 mb-6 shadow-lg shadow-emerald-500/20">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-2">
            Placement <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Profile</span>
          </h1>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Update your professional details. This data helps the Placement Cell match you with relevant opportunities.
          </p>
        </div>

        <div className="space-y-8 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
          
          {/* 1. PHOTO & BIO (Split Card - Glass Effect) */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 flex flex-col md:flex-row gap-8 items-center md:items-start shadow-xl">
            
            {/* Photo Upload */}
            <div className="relative group shrink-0">
              <div className="w-36 h-36 rounded-[2rem] p-1 bg-gradient-to-br from-emerald-500 to-cyan-500 shadow-2xl shadow-emerald-500/20">
                 <img 
                    src={data.cvPhoto || `https://ui-avatars.com/api/?name=${data.name}&background=020617&color=fff`} 
                    className="w-full h-full rounded-[1.8rem] object-cover border-4 border-[#020617]" 
                    alt="Profile"
                 />
              </div>
              <label className="absolute -bottom-2 -right-2 bg-emerald-600 hover:bg-emerald-500 text-white p-3 rounded-xl cursor-pointer transition-all shadow-lg hover:scale-110 active:scale-95 border-2 border-[#020617]">
                {uploadingPhoto ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                )}
                <input type="file" className="hidden" accept="image/*" onChange={e => uploadPhoto(e.target.files[0])} disabled={uploadingPhoto} />
              </label>
            </div>

            {/* Bio & Basic Info */}
            <div className="flex-1 w-full space-y-4">
               <div>
                  <label className="text-[10px] uppercase font-bold text-slate-500 tracking-widest ml-1 mb-2 block">Professional Summary</label>
                  <textarea 
                    placeholder="E.g., Aspiring Data Librarian passionate about Knowledge Management..." 
                    value={data.bio}
                    maxLength={200}
                    onChange={e => setData({...data, bio: e.target.value})}
                    className="w-full bg-slate-950/50 border border-slate-700 rounded-2xl p-4 text-sm focus:border-emerald-500 focus:bg-slate-900 outline-none resize-none h-28 transition-all text-white placeholder:text-slate-600"
                  />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="LinkedIn URL" value={data.linkedin} onChange={v => setData({...data, linkedin: v})} placeholder="linkedin.com/in/username" />
                  <Input label="Availability" value={data.availability} onChange={v => setData({...data, availability: v})} placeholder="e.g. May - July 2026" />
               </div>
            </div>
          </div>

          {/* 2. PERSONAL DETAILS */}
          <Section title="Personal Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Full Name" value={data.name} onChange={v => setData({...data, name: v})} />
              <Input label="Roll Number" value={data.roll} onChange={v => setData({...data, roll: v})} />
              <Input label="Phone Number" value={data.phone} onChange={v => setData({...data, phone: v})} />
              <div className="opacity-50 pointer-events-none">
                 <Input label="Programme" value={data.programme} disabled />
              </div>
            </div>
          </Section>

          {/* 3. SECTOR INTERESTS */}
          <Section title="Sectoral Interests">
            <p className="text-xs text-slate-500 mb-4 ml-1">Select areas you are interested in working:</p>
            <div className="flex flex-wrap gap-3 mb-6">
              {["Academic Libraries", "Public Libraries", "Corporate / KM", "Publishing", "Digital Libraries", "Archives & Museums", "Data / Analytics"].map(s => (
                <Pill key={s} label={s} active={data.sector.includes(s)} onClick={() => toggleArray("sector", s)} />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Specific Role Focus" value={data.corporateRole} onChange={v => setData({...data, corporateRole: v})} placeholder="e.g. Data Analyst" />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Preferred City" value={data.location} onChange={v => setData({...data, location: v})} placeholder="e.g. Bangalore" />
                <Select label="Relocate?" value={data.relocate} options={["Yes", "No", "Depends"]} onChange={v => setData({...data, relocate: v})} />
              </div>
            </div>
          </Section>

          {/* 4. SKILLS & TOOLS */}
          <Section title="Expertise & Tools">
             <div className="flex flex-wrap gap-2">
               {["Cataloguing", "Classification", "Metadata", "Digitisation", "Koha", "DSpace", "Python", "Excel", "OpenRefine"].map(s => (
                 <Pill 
                    key={s} 
                    label={s} 
                    active={data.skills.includes(s) || data.tools.includes(s)} 
                    onClick={() => toggleArray(s === "Koha" || s === "DSpace" || s === "Python" || s === "Excel" || s === "OpenRefine" ? "tools" : "skills", s)} 
                 />
               ))}
             </div>
          </Section>

          {/* 5. DOCUMENTS (CV Upload) */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl">
             <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-400 border border-red-500/20 shadow-lg shadow-red-500/10">
                   <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                </div>
                <div>
                   <h3 className="font-bold text-white mb-1">Curriculum Vitae (PDF)</h3>
                   {data.cvLink ? (
                      <a href={data.cvLink} target="_blank" className="text-xs text-emerald-400 font-bold hover:underline flex items-center gap-1.5 p-1 bg-emerald-500/10 rounded-lg w-fit border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-1"></span> Uploaded & Verified
                      </a>
                   ) : (
                      <p className="text-xs text-slate-500 font-medium">No file uploaded yet</p>
                   )}
                </div>
             </div>
             
             <label className="group relative bg-white text-black hover:bg-emerald-500 hover:text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest cursor-pointer transition-all shadow-xl hover:scale-105 active:scale-95 overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                   {uploadingCV ? "Syncing..." : "Upload PDF"} 
                   {!uploadingCV && <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>}
                </span>
                <input type="file" className="hidden" accept=".pdf" onChange={e => uploadCV(e.target.files[0])} disabled={uploadingCV} />
             </label>
          </div>

          {/* 6. CONSENT & SUBMIT */}
          <div className="border-t border-white/5 pt-8 text-center">
            <label className="inline-flex items-start gap-4 cursor-pointer group text-left max-w-2xl mx-auto mb-8 bg-slate-900/30 p-4 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all">
               <div className={`mt-0.5 w-5 h-5 rounded border flex items-center justify-center transition-all shrink-0 ${data.consent ? 'bg-emerald-500 border-emerald-500' : 'bg-slate-900 border-slate-600'}`}>
                  {data.consent && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>}
               </div>
               <input type="checkbox" checked={data.consent} onChange={() => setData({...data, consent: !data.consent})} className="hidden" />
               <span className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-200 transition-colors">
                  I consent to sharing this data with the Placement Cell. I understand this info will be used for internship coordination and academic records.
               </span>
            </label>

            <button 
              onClick={submit} 
              disabled={uploadingPhoto || uploadingCV}
              className="w-full md:w-auto px-12 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl font-black uppercase tracking-[0.2em] transition-all shadow-2xl shadow-emerald-600/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sync Profile
            </button>
            
            {status && (
              <div className="mt-6 flex justify-center animate-fadeIn">
                 <div className="inline-flex items-center gap-2 px-6 py-2 bg-emerald-500/10 text-emerald-400 rounded-full text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> {status}
                 </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

/* --- HELPER COMPONENTS (STYLED FOR GLASS LOOK) --- */
function Section({ title, children }) {
  return (
    <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 shadow-sm">
      <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-8 flex items-center gap-4">
        {title} <div className="h-[1px] bg-white/10 flex-1"></div>
      </h2>
      {children}
    </div>
  )
}

function Input({ label, value, onChange, disabled, placeholder }) {
  return (
    <div className="group">
      <label className="text-[9px] uppercase font-bold text-slate-500 ml-1 mb-1.5 block tracking-widest group-focus-within:text-emerald-500 transition-colors">{label}</label>
      <input 
        type="text" 
        disabled={disabled}
        placeholder={placeholder}
        value={value} 
        onChange={e => onChange(e.target.value)} 
        className={`w-full bg-slate-950/50 border border-slate-700 rounded-xl py-3.5 px-4 text-sm outline-none focus:border-emerald-500 focus:bg-slate-900 transition-all text-white placeholder:text-slate-700 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} 
      />
    </div>
  )
}

function Select({ label, value, options, onChange }) {
  return (
    <div className="group">
      <label className="text-[9px] uppercase font-bold text-slate-500 ml-1 mb-1.5 block tracking-widest group-focus-within:text-emerald-500 transition-colors">{label}</label>
      <select 
        value={value} 
        onChange={e => onChange(e.target.value)} 
        className="w-full bg-slate-950/50 border border-slate-700 rounded-xl py-3.5 px-4 text-sm outline-none focus:border-emerald-500 focus:bg-slate-900 transition-all text-white appearance-none cursor-pointer"
      >
        <option value="">Select</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}

function Pill({ label, active, onClick }) {
  return (
    <button 
      onClick={onClick} 
      type="button"
      className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all ${
        active 
        ? "bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-500/20 scale-105" 
        : "bg-slate-950/50 border-white/5 text-slate-400 hover:border-emerald-500/50 hover:text-emerald-400"
      }`}
    >
      {label}
    </button>
  )
}