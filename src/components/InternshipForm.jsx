import { useEffect, useState } from "react"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase"
import { useAuth } from "../context/AuthContext"

export default function InternshipForm({ goBack }) {
  const { user } = useAuth()

  const [data, setData] = useState({
    name: "",
    roll: "",
    programme: "MLIS 2025–2027",
    phone: "",
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
    unpaid: "",
    cvLink: "",
    cvPhoto: "",
    cvVisibility: "placement",
    consent: false,
  })

  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState("")

  useEffect(() => {
    if (!user) return
    const ref = doc(db, "internships", user.email)
    getDoc(ref).then((snap) => {
      if (snap.exists()) setData((d) => ({ ...d, ...snap.data() }))
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

  const submit = async () => {
    if (!data.consent) {
      alert("Consent is mandatory")
      return
    }

    await setDoc(doc(db, "internships", user.email), {
      ...data,
      email: user.email,
      updatedAt: serverTimestamp(),
    })

    setStatus("Details saved successfully.")
  }

  if (loading) return null

  return (
    <div className="max-w-4xl mx-auto px-6 py-24 text-slate-100">
      <button onClick={goBack} className="text-indigo-400 mb-6">
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-8">
        Internship Interest Form
      </h1>

      {/* BASIC INFO */}
      <Section title="Basic Information">
        <Input label="Full Name" value={data.name} onChange={(v) => setData({ ...data, name: v })} />
        <Input label="Roll / Register Number" value={data.roll} onChange={(v) => setData({ ...data, roll: v })} />
        <Input label="Programme" value={data.programme} disabled />
        <Input label="Phone (optional)" value={data.phone} onChange={(v) => setData({ ...data, phone: v })} />
      </Section>

      {/* SECTOR */}
      <Section title="Primary Sector of Interest (multiple)">
        {[
          "Academic Libraries",
          "Public Libraries",
          "Special Libraries",
          "Corporate / KM",
          "Publishing",
          "Archives & Museums",
          "Digital Libraries",
          "Data / Analytics",
          "Not decided",
        ].map((s) => (
          <Check
            key={s}
            label={s}
            checked={data.sector.includes(s)}
            onChange={() => toggleArray("sector", s)}
          />
        ))}

        {data.sector.some((s) => s.includes("Libraries")) && (
          <Input
            label="If Library, specify type"
            value={data.libraryType}
            onChange={(v) => setData({ ...data, libraryType: v })}
          />
        )}

        {data.sector.includes("Corporate / KM") && (
          <Input
            label="If Corporate, role interest"
            value={data.corporateRole}
            onChange={(v) => setData({ ...data, corporateRole: v })}
          />
        )}
      </Section>

      {/* LOCATION */}
      <Section title="Preferred Location">
        <Input label="City / State" value={data.location} onChange={(v) => setData({ ...data, location: v })} />
        <Select
          label="Open to relocation?"
          value={data.relocate}
          options={["Yes", "No", "Depends"]}
          onChange={(v) => setData({ ...data, relocate: v })}
        />
      </Section>

      {/* INSTITUTIONS */}
      <Section title="Preferred Institutions / Companies">
        <Input label="Preference 1" value={data.pref1} onChange={(v) => setData({ ...data, pref1: v })} />
        <Input label="Preference 2" value={data.pref2} onChange={(v) => setData({ ...data, pref2: v })} />
        <Input label="Preference 3" value={data.pref3} onChange={(v) => setData({ ...data, pref3: v })} />
      </Section>

      {/* SKILLS */}
      <Section title="Skills & Tools (as per syllabus)">
        {/* Skills (conceptual) */}
        {["Cataloguing", "Classification", "Metadata", "Digitisation"].map((s) => (
          <Check key={s} label={s} checked={data.skills.includes(s)} onChange={() => toggleArray("skills", s)} />
        ))}

        {/* Tools (software) */}
        {["Koha", "DSpace", "Excel", "OpenRefine", "Basic Python"].map((t) => (
          <Check key={t} label={t} checked={data.tools.includes(t)} onChange={() => toggleArray("tools", t)} />
        ))}
      </Section>

      {/* CV */}
      <Section title="CV / Resume">
        <Input
          label="CV link (Google Drive / PDF)"
          value={data.cvLink}
          onChange={(v) => setData({ ...data, cvLink: v })}
        />

        <Input
          label="Profile Photo (JPG image link)"
          value={data.cvPhoto}
          onChange={(v) => setData({ ...data, cvPhoto: v })}
        />

        <p className="text-xs text-slate-400">
          Upload JPG to Google Drive → Share → Anyone with link → View
        </p>

        {data.cvPhoto && (
          <img
            src={data.cvPhoto}
            alt="Profile preview"
            className="mt-3 w-20 h-20 rounded-full object-cover border border-slate-700"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        )}

        <Select
          label="CV visibility"
          value={data.cvVisibility}
          options={[
            { label: "Only Placement Representative", value: "placement" },
            { label: "Allow classmates", value: "class" },
          ]}
          onChange={(v) => setData({ ...data, cvVisibility: v })}
        />
      </Section>

      {/* CONSENT */}
      <Section title="Consent">
        <Check
          label="I consent to share this information for internship and placement coordination within Librandhana."
          checked={data.consent}
          onChange={() => setData({ ...data, consent: !data.consent })}
        />
      </Section>

      <button onClick={submit} className="mt-8 bg-indigo-600 px-6 py-3 rounded">
        Save / Update
      </button>

      {status && <p className="mt-4 text-green-400">{status}</p>}
    </div>
  )
}

/* ---------- SMALL UI HELPERS ---------- */

function Section({ title, children }) {
  return (
    <div className="mb-10">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  )
}

function Input({ label, value, onChange, disabled }) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <input
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-800 p-2 rounded"
      />
    </div>
  )
}

function Select({ label, value, options, onChange }) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-800 p-2 rounded"
      >
        <option value="">Select</option>
        {options.map((o) =>
          typeof o === "string" ? (
            <option key={o}>{o}</option>
          ) : (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          )
        )}
      </select>
    </div>
  )
}

function Check({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm">
      <input type="checkbox" checked={checked} onChange={onChange} />
      {label}
    </label>
  )
}
