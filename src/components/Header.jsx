import { useState } from "react"
import { auth } from "../firebase"
import { useAuth } from "../context/AuthContext"
import Auth from "./Auth"

const PLACEMENT_EMAILS = [
  "madhu@drtc.isibang.ac.in",
  "amisha@drtc.isibang.ac.in",
]

export default function Header({ openDashboard, goHome }) {
  const { user } = useAuth()
  const [showAuth, setShowAuth] = useState(false)

  const isPlacement =
    user && PLACEMENT_EMAILS.includes(user.email)

  return (
    <>
      <header className="fixed top-0 w-full z-40 bg-slate-950/80 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button
            onClick={goHome}
            className="text-lg font-semibold text-slate-100 hover:text-white"
          >
            LIBRANDHANA
          </button>

          <div className="flex items-center gap-6">
            {user && (
              <span className="text-sm text-slate-400">
                {user.email}
              </span>
            )}

            {isPlacement && (
              <button
                onClick={openDashboard}
                className="text-sm text-slate-300 hover:text-white"
              >
                Dashboard
              </button>
            )}

            {user ? (
              <button
                onClick={() => auth.signOut()}
                className="text-sm text-red-400"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="text-sm text-indigo-400"
              >
                Login / Sign up
              </button>
            )}
          </div>
        </div>
      </header>

      {showAuth && <Auth onClose={() => setShowAuth(false)} />}
    </>
  )
}
