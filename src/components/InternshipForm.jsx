import { useEffect, useState } from "react"
import { auth, db } from "../firebase"
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore"

export default function InternshipForm({ goBack }) {
  const user = auth.currentUser

  const [form, setForm] = useState({
    name: "",
    roll: "",
    sectors: [],
    roles: [],
    inst1: "",
    inst2: "",
    inst3: "",
    cvLink: "",
    consent: false,
  })

  const [status, setStatus] = useState("")
  const [checking, setChecking] = useState(true)
  const [alreadySubmitted, setAlreadySubmitted] = useState(false)

  const sectorOptions = [
    "Academic Libraries",
    "Public Libraries",
    "Special Libraries",
    "Digital Libraries / Repositories",
    "Knowledge Management / Corporate LIS",
    "Archives & Museums",
  ]

  const roleOptions = [
    "Koha (Library Automation)",
    "DSpace (Institutional Repositories)",
    "Digital Library Design",
    "Metadata & Cataloguing (MARC, RDA)",
    "Collection Development",
    "Reference & Information Services",
    "Knowledge Management (Introductory)",
    "Open Source LIS Tools",
    "Content Organization & Taxonomies",
  ]

  /* -------- Check if already submitted -------- */
  useEffect(() => {
    const checkSubmission = async () => {
      const q = query(
        collection(db, "internshipResponses"),
        where("email", "==", user.email)
      )
      const snapshot = await getDocs(q)
      if (!snapshot.empty) {
        setAlreadySubmitted(true)
      }
      setChecking(false)
    }

    checkSubmission()
  }, [user.email])

  const toggleArrayValue = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!form.consent) {
      setStatus("Consent is required.")
      return
    }

    try {
      await addDoc(collection(db, "internshipResponses"), {
        ...form,
        email: user.email,
        createdAt: serverTimestamp(),
      })
      setAlreadySubmitted(true)
    } catch (err) {
      setStatus("Error submitting form.")
    }
  }

  /* -------- Loading state -------- */
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400">
        Checking submission status…
      </div>
    )
  }

  /* -------- Already submitted -------- */
  if (alreadySubmitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-100 px-6">
        <h1 className="text-3xl font-semibold mb-4">
          Internship Form Submitted
        </h1>

        <p className="text-slate-400 max-w-xl text-center mb-10">
          You have already submitted your internship interest details.
          If any changes are required, please contact the placement
          representative.
        </p>

        <button
          onClick={goBack}
          className="px-6 py-3 bg-indigo-600 rounded hover:bg-indigo-700"
        >
          Back to Home
        </button>
      </div>
    )
  }

  /* -------- Form -------- */
  return (
    <div className="max-w-3xl mx-auto px-6 py-20 text-slate-100">
      <h1 className="text-3xl font-bold mb-6">
        Internship Interest Form
      </h1>

      <p className="text-slate-400 mb-10">
        MLIS 2025–2027 | For placement & internship coordination only
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Identity */}
        <div>
          <label className="block mb-2">Full Name</label>
          <input
            required
            className="w-full px-4 py-3 bg-slate-900 rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div>
          <label className="block mb-2">Roll / Register Number</label>
          <input
            required
            className="w-full px-4 py-3 bg-slate-900 rounded"
            value={form.roll}
            onChange={(e) => setForm({ ...form, roll: e.target.value })}
          />
        </div>

        {/* Sectors */}
        <div>
          <p className="mb-2 font-semibold">Internship Sector Interest</p>
          {sectorOptions.map((s) => (
            <label key={s} className="block">
              <input
                type="checkbox"
                className="mr-2"
                checked={form.sectors.includes(s)}
                onChange={() => toggleArrayValue("sectors", s)}
              />
              {s}
            </label>
          ))}
        </div>

        {/* Roles */}
        <div>
          <p className="mb-2 font-semibold">Role / Skill Interest</p>
          {roleOptions.map((r) => (
            <label key={r} className="block">
              <input
                type="checkbox"
                className="mr-2"
                checked={form.roles.includes(r)}
                onChange={() => toggleArrayValue("roles", r)}
              />
              {r}
            </label>
          ))}
        </div>

        {/* Institutions */}
        <div>
          <label className="block mb-2">
            Preferred Institution / Company (max 3)
          </label>
          <input
            className="w-full mb-2 px-4 py-3 bg-slate-900 rounded"
            placeholder="Preference 1"
            value={form.inst1}
            onChange={(e) => setForm({ ...form, inst1: e.target.value })}
          />
          <input
            className="w-full mb-2 px-4 py-3 bg-slate-900 rounded"
            placeholder="Preference 2"
            value={form.inst2}
            onChange={(e) => setForm({ ...form, inst2: e.target.value })}
          />
          <input
            className="w-full px-4 py-3 bg-slate-900 rounded"
            placeholder="Preference 3"
            value={form.inst3}
            onChange={(e) => setForm({ ...form, inst3: e.target.value })}
          />
        </div>

        {/* CV Link */}
        <div>
          <label className="block mb-2">CV Link</label>
          <input
            required
            className="w-full px-4 py-3 bg-slate-900 rounded"
            placeholder="Restricted access – shared with placement rep only"
            value={form.cvLink}
            onChange={(e) => setForm({ ...form, cvLink: e.target.value })}
          />
        </div>

        {/* Consent */}
        <label className="block">
          <input
            type="checkbox"
            className="mr-2"
            checked={form.consent}
            onChange={(e) => setForm({ ...form, consent: e.target.checked })}
          />
          I consent to share this information for internship coordination
          within MLIS Librandhana only.
        </label>

        <button
          type="submit"
          className="px-6 py-3 bg-indigo-600 rounded hover:bg-indigo-700"
        >
          Submit
        </button>

        {status && (
          <p className="mt-4 text-sm text-slate-300">
            {status}
          </p>
        )}
      </form>
    </div>
  )
}
