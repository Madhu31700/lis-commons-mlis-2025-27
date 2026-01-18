import { auth } from "../firebase"
import { useAuth } from "../context/AuthContext"

export default function Header({ openAuth, openDashboard }) {
  const { user } = useAuth()

  return (
    <header className="fixed top-0 w-full z-40 bg-slate-950/80 backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <span className="text-lg font-semibold text-slate-100">
          LIBRANDHANA
        </span>

        <div className="flex items-center gap-6">
          {user && (
            <span className="text-sm text-slate-400">
              {user.email}
            </span>
          )}

          {user ? (
            <>
              <button
                onClick={openDashboard}
                className="text-sm text-slate-300 hover:text-white"
              >
                Dashboard
              </button>

              <button
                onClick={() => auth.signOut()}
                className="text-sm text-red-400 hover:text-red-300"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={openAuth}
              className="text-sm text-indigo-400 hover:text-indigo-300"
            >
              Login / Sign up
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
