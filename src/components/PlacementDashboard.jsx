import { useEffect, useState } from "react"
import { auth, db } from "../firebase"
import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore"

const PLACEMENT_EMAIL = "madhu@drtc.isibang.ac.in"

export default function PlacementDashboard({ goBack }) {
  const user = auth.currentUser
  const [loading, setLoading] = useState(true)
  const [responses, setResponses] = useState([])

  /* ---- Access control ---- */
  if (!user || user.email !== PLACEMENT_EMAIL) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-300 px-6 text-center">
        <div>
          <h1 className="text-2xl font-semibold mb-4">
            Access Restricted
          </h1>
          <p className="mb-6">
            This dashboard is accessible only to the Placement Representative.
          </p>
          <button
            onClick={goBack}
            className="px-6 py-3 bg-indigo-600 rounded hover:bg-indigo-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  /* ---- Fetch data ---- */
  useEffect(() => {
    const fetchResponses = async () => {
      const q = query(
        collection(db, "internshipResponses"),
        orderBy("createdAt", "desc")
      )
      const snapshot = await getDocs(q)
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setResponses(data)
      setLoading(false)
    }

    fetchResponses()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400">
        Loading dashboard…
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 text-slate-100">
      <h1 className="text-3xl font-bold mb-10">
        Placement Representative Dashboard
      </h1>

      {responses.length === 0 ? (
        <p className="text-slate-400">
          No internship responses submitted yet.
        </p>
      ) : (
        <div className="space-y-8">
          {responses.map((r) => (
            <div
              key={r.id}
              className="bg-slate-900 rounded-2xl p-6"
            >
              <h2 className="text-xl font-semibold mb-2">
                {r.name} ({r.roll})
              </h2>

              <p className="text-sm text-slate-400 mb-4">
                {r.email}
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-1">
                    Sector Interests
                  </h3>
                  <ul className="list-disc ml-5 text-slate-300">
                    {r.sectors.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-1">
                    Role / Skill Interests
                  </h3>
                  <ul className="list-disc ml-5 text-slate-300">
                    {r.roles.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold mb-1">
                  Preferred Institutions
                </h3>
                <ul className="list-disc ml-5 text-slate-300">
                  {r.inst1 && <li>{r.inst1}</li>}
                  {r.inst2 && <li>{r.inst2}</li>}
                  {r.inst3 && <li>{r.inst3}</li>}
                </ul>
              </div>

              <div className="mt-6">
                <h3 className="font-semibold mb-1">
                  CV Link
                </h3>
                <a
                  href={r.cvLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:underline break-all"
                >
                  {r.cvLink}
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12">
        <button
          onClick={goBack}
          className="px-6 py-3 bg-indigo-600 rounded hover:bg-indigo-700"
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}
