import { useEffect, useState } from "react"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase"
import { useAuth } from "../context/AuthContext"
import { supabase } from "../supabase"

export default function InternshipForm({ goBack }) {
  const { user } = useAuth()

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
      const { error } = await supabase.storage.from("profile-photos").upload(fileName, file, { upsert: true })
      if (error) throw error
      const { data: urlData } = supabase.storage.from("profile-photos").getPublicUrl(fileName)
      setData((d) => ({ ...d, cvPhoto: `${urlData.publicUrl}?t=${Date.now()}` }))
    } catch (err) {
      alert("Photo upload failed.")
    } finally { setUploadingPhoto(false) }
  }

  const uploadCV = async (file) => {
    if (!file || !user) return
    try {
      setUploadingCV(true)
      const fileName = `${user.email}.pdf`
      const { error } = await supabase.storage.from("cv-files").upload(fileName, file, { upsert: true })
      if (error) throw error
      const { data: urlData } = supabase.storage.from("cv-files").getPublicUrl(fileName)
      setData((d) => ({ ...d, cvLink: urlData.publicUrl }))
    } catch (err) {
      alert("CV upload failed.")
    } finally { setUploadingCV(false) }
  }

  /* ---------- SUBMIT ---------- */
  const submit = async () => {
    if (!data.consent) return alert("Consent is mandatory")
    await setDoc(doc(db, "internships", user.email), {
      ...data,
      email: user.email,
      updatedAt: serverTimestamp(),
    })
    setStatus("Profile updated successfully!")
    setTimeout(() => setStatus(""), 3000)
  }

  if (loading) return null

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 pb-20 font-sans selection:bg-indigo-500/30">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <button onClick={goBack} className="flex items-center gap-2 text-slate-500 hover:text-indigo-400 transition-colors mb-8 group">
          <svg className="group-hover:-translate-x-1 transition-transform" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
          Back to Portal
        </button>

        <header className="mb-12">
          <h1 className="text-4xl font-black text-white tracking-tight uppercase italic">Student Profile</h1>
          <p className="text-slate-500 mt-2 font-medium tracking-wide">Update your internship preferences and professional details.</p>
        </header>

        <div className="space-y-8">
          {/* PROFILE SUMMARY SECTION */}
          <div className="bg-[#0f172a] border border-slate-800 rounded-[2.5rem] p-8 flex flex-col md:flex-row gap-8 items-center shadow-2xl">
            <div className="relative group">
              <img 
                src={data.cvPhoto || `https://ui-avatars.com/api/?name=${data.name}&background=6366f1&color=fff`} 
                className="w-36 h-36 rounded-[3rem] object-cover ring-4 ring-slate-800 group-hover:ring-indigo-500/50 transition-all duration-500" 
                alt="Profile"
              />
              <label className="absolute -bottom-1 -right-1 bg-indigo-600 p-3 rounded-2xl cursor-pointer hover:bg-indigo-500 transition-all shadow-xl hover:scale-110 active:scale-90">
                <svg width="18" height="18" fill="white" viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
                <input type="file" className="hidden" accept="image/*" onChange={e => uploadPhoto(e.target.files[0])} />
              </label>
            </div>
            <div className="flex-1 w-full space-y-4">
               <textarea 
                placeholder="Write a brief professional summary (e.g., Aspiring Data Librarian with a focus on KM)..." 
                value={data.bio}
                maxLength={200}
                onChange={e => setData({...data, bio: e.target.value})}
                className="w-full bg-slate-900 border border-slate-700 rounded-3xl p-5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none h-28 transition-all"
               />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="LinkedIn URL" value={data.linkedin} onChange={v => setData({...data, linkedin: v})} placeholder="linkedin.com/in/username" />
                  <Input label="Availability" value={data.availability} onChange={v => setData({...data, availability: v})} placeholder="e.g. May - July 2026" />
               </div>
            </div>
          </div>

          <Section title="Basic Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Full Name" value={data.name} onChange={v => setData({...data, name: v})} />
              <Input label="Roll Number" value={data.roll} onChange={v => setData({...data, roll: v})} />
              <Input label="Phone" value={data.phone} onChange={v => setData({...data, phone: v})} />
              <Input label="Programme" value={data.programme} disabled />
            </div>
          </Section>

          <Section title="Sectoral Interests">
            <div className="flex flex-wrap gap-3 mb-6">
              {["Academic Libraries", "Public Libraries", "Corporate / KM", "Publishing", "Digital Libraries", "Archives & Museums", "Data / Analytics"].map(s => (
                <Pill key={s} label={s} active={data.sector.includes(s)} onClick={() => toggleArray("sector", s)} />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Library Type (if applicable)" value={data.libraryType} onChange={v => setData({...data, libraryType: v})} />
              <Input label="Corporate Role Focus" value={data.corporateRole} onChange={v => setData({...data, corporateRole: v})} />
            </div>
          </Section>

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

          <Section title="Location Preference">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Preferred City" value={data.location} onChange={v => setData({...data, location: v})} />
              <Select label="Willing to Relocate?" value={data.relocate} options={["Yes", "No", "Depends"]} onChange={v => setData({...data, relocate: v})} />
            </div>
          </Section>

          <Section title="Documents">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col md:flex-row justify-between items-center gap-6">
               <div className="flex items-center gap-4">
                  <div className="bg-indigo-500/10 p-3 rounded-2xl border border-indigo-500/20">
                    <svg width="24" height="24" fill="none" stroke="#6366f1" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"/></svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">Curriculum Vitae (PDF)</h3>
                    {data.cvLink ? (
                        <a href={data.cvLink} target="_blank" className="text-[10px] text-indigo-400 font-black uppercase tracking-widest hover:underline">File Uploaded & Verified</a>
                    ) : (
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">No file selected</p>
                    )}
                  </div>
               </div>
               <label className="bg-white text-black hover:bg-indigo-400 hover:text-white px-8 py-3 rounded-2xl text-[10px] font-black cursor-pointer transition-all shadow-xl uppercase tracking-[0.2em]">
                 {uploadingCV ? "Syncing..." : "Upload CV"}
                 <input type="file" className="hidden" accept=".pdf" onChange={e => uploadCV(e.target.files[0])} />
               </label>
            </div>
          </Section>

          {/* UPDATED CONSENT SECTION */}
          <div className="bg-slate-900/50 border-2 border-dashed border-slate-800 rounded-[2.5rem] p-10 flex flex-col items-center text-center">
            <label className="flex items-start gap-4 max-w-2xl cursor-pointer group">
               <input 
                type="checkbox" 
                checked={data.consent} 
                onChange={() => setData({...data, consent: !data.consent})} 
                className="mt-1 w-6 h-6 rounded-lg border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500 transition-all cursor-pointer" 
               />
               <span className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-200 transition-colors text-left">
                  I hereby certify that the information provided is true and accurate. I consent to share this data with the 
                  Placement Coordination Committee for internship/placement activities. Furthermore, I agree that my 
                  anonymized data may be used for **academic research purposes** within the institution to improve 
                  future placement strategies.
               </span>
            </label>
            
            <button 
              onClick={submit} 
              disabled={uploadingPhoto || uploadingCV}
              className="mt-10 w-full md:w-80 bg-indigo-600 hover:bg-indigo-500 text-white py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] transition-all shadow-2xl shadow-indigo-600/20 active:scale-95 disabled:opacity-50"
            >
              Sync Profile
            </button>
            {status && <p className="mt-4 text-emerald-400 font-black text-xs uppercase tracking-widest animate-pulse">{status}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

/* HELPER COMPONENTS */
function Section({ title, children }) {
  return (
    <div className="bg-[#0f172a]/50 border border-slate-800/60 rounded-[2.5rem] p-10 shadow-sm">
      <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500 mb-10 flex items-center gap-4">
        {title}
        <div className="h-[1px] bg-slate-800 flex-1"></div>
      </h2>
      {children}
    </div>
  )
}

function Input({ label, value, onChange, disabled, placeholder }) {
  return (
    <div className="flex flex-col">
      <label className="text-[9px] uppercase font-black text-slate-500 ml-3 mb-2 tracking-[0.2em]">{label}</label>
      <input 
        type="text" 
        disabled={disabled}
        placeholder={placeholder}
        value={value} 
        onChange={e => onChange(e.target.value)} 
        className="bg-slate-900 border border-slate-700 rounded-2xl px-6 py-3.5 text-sm outline-none focus:border-indigo-500 transition-all text-white disabled:opacity-40 placeholder:text-slate-700" 
      />
    </div>
  )
}

function Select({ label, value, options, onChange }) {
  return (
    <div className="flex flex-col">
      <label className="text-[9px] uppercase font-black text-slate-500 ml-3 mb-2 tracking-[0.2em]">{label}</label>
      <select 
        value={value} 
        onChange={e => onChange(e.target.value)} 
        className="bg-slate-900 border border-slate-700 rounded-2xl px-6 py-3.5 text-sm outline-none focus:border-indigo-500 transition-all appearance-none cursor-pointer"
      >
        <option value="">Select Option</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}

function Pill({ label, active, onClick }) {
  return (
    <button 
      onClick={onClick} 
      className={`px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-wider border transition-all ${
        active 
        ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30 scale-105" 
        : "bg-slate-900 border-slate-700 text-slate-500 hover:border-slate-500 hover:text-slate-300"
      }`}
    >
      {label}
    </button>
  )
}