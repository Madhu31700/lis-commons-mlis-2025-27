import { useEffect, useState } from "react"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "../firebase"
import { useAuth } from "../context/AuthContext"

const PLACEMENT_EMAILS = [
  "madhu@drtc.isibang.ac.in",
  "amisha@drtc.isibang.ac.in",
]

export default function PlacementDashboard({ goBack }) {
  const { user } = useAuth()
  const [entries, setEntries] = useState([])

  useEffect(() => {
    if (!user || !PLACEMENT_EMAILS.includes(user.email)) return

    const ref = collection(db, "internships")
    const unsub = onSnapshot(ref, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setEntries(data)
    })

    return () => unsub()
  }, [user])

  if (!user || !PLACEMENT_EMAILS.includes(user.email)) {
    return (
      <div className="p-10 text-slate-300">
        Access restricted to Placement Representatives.
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-24 text-slate-100">
      <button onClick={goBack} className="text-indigo-400 mb-6">
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-8">
        Placement Dashboard
      </h1>

      {entries.length === 0 && (
        <p className="text-slate-400">
          No submissions yet.
        </p>
      )}

      <div className="space-y-6">
        {entries.map((e) => (
          <div
            key={e.id}
            className="bg-slate-800/60 rounded-xl p-6"
          >
            <h2 className="text-lg font-semibold">
              {e.name} ({e.roll})
            </h2>

            <p className="text-sm text-slate-400">
              {e.email}
            </p>

            <div className="mt-3 text-sm">
              <strong>Sector:</strong>{" "}
              {e.sector?.join(", ")}
            </div>

            <div className="mt-1 text-sm">
              <strong>Location:</strong>{" "}
              {e.location} · Relocation: {e.relocate}
            </div>

            <div className="mt-1 text-sm">
              <strong>Preferences:</strong>{" "}
              {[e.pref1, e.pref2, e.pref3]
                .filter(Boolean)
                .join(" | ")}
            </div>

            <div className="mt-1 text-sm">
              <strong>Skills:</strong>{" "}
              {e.skills?.join(", ")}
            </div>

            {e.cvLink && e.cvVisibility !== "hidden" && (
              <div className="mt-3">
                <a
                  href={e.cvLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-400 underline text-sm"
                >
                  View CV
                </a>
              </div>
            )}

            <div className="mt-2 text-xs text-slate-500">
              Last updated:{" "}
              {e.updatedAt?.toDate?.().toLocaleString() ||
                "—"}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
