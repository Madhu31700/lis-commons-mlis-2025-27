import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { auth } from "../firebase"
import { signOut } from "firebase/auth"
import logoImg from '../assets/logo.jpg.png'

const ADMIN_EMAILS = [
  "madhu@drtc.isibang.ac.in",
  "amisha@drtc.isibang.ac.in",
  "madhu31700@gmail.com"
]

const NAV_LINKS = [
  { label: "Blog",      view: "blog" },
  { label: "Q&A",       view: "qa" },
  { label: "Jobs",      view: "jobs" },
  { label: "Resources", view: "resources" },
]

export default function Header({ goHome, openDashboard, onLogin, currentView, changeView }) {
  const { user } = useAuth()
  const [imgError, setImgError] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const isAdmin = user && ADMIN_EMAILS.includes(user.email)
  const userInitial = user?.displayName
    ? user.displayName.charAt(0).toUpperCase()
    : user?.email?.charAt(0).toUpperCase()

  const handleLogout = () => {
    signOut(auth)
    goHome()
    setMobileOpen(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">

        {/* ── LOGO ── */}
        <button
          onClick={goHome}
          className="flex items-center gap-3 group shrink-0"
        >
          <div className="w-8 h-8 rounded-lg bg-brand-300 flex items-center justify-center shadow-sm group-hover:bg-brand-400 transition-colors">
            <span className="font-serif text-brand-50 font-semibold text-base leading-none">L</span>
          </div>
          <div className="flex flex-col leading-tight text-left">
            <span className="font-serif text-stone-800 font-semibold text-base tracking-tight">
              Librandhana
            </span>
            <span className="text-[9px] text-brand-300 font-sans font-bold uppercase tracking-[0.18em]">
              LIS Commons
            </span>
          </div>
        </button>

        {/* ── DESKTOP NAV ── */}
        <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {NAV_LINKS.map((link) => (
            <button
              key={link.view}
              onClick={() => changeView && changeView(link.view)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${currentView === link.view
                  ? "bg-brand-50 text-brand-500 font-semibold"
                  : "text-stone-500 hover:text-stone-800 hover:bg-stone-100"
                }`}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* ── RIGHT SIDE ── */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {isAdmin && (
            <button
              onClick={openDashboard}
              className="text-xs font-bold text-brand-300 hover:text-brand-500 uppercase tracking-wider transition-colors border border-brand-200 hover:border-brand-300 px-3 py-1.5 rounded-lg"
            >
              Admin
            </button>
          )}

          {user ? (
            <div className="flex items-center gap-2 bg-stone-50 pl-3 pr-1 py-1 rounded-full border border-stone-200">
              <span className="text-xs text-stone-600 font-medium">
                {user.displayName?.split(' ')[0]}
              </span>
              {user.photoURL && !imgError ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  onError={() => setImgError(true)}
                  className="w-7 h-7 rounded-full border border-stone-200 object-cover"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-brand-300 flex items-center justify-center text-brand-50 font-bold text-xs">
                  {userInitial}
                </div>
              )}
              <button
                onClick={handleLogout}
                className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-red-50 text-stone-400 hover:text-red-400 transition-colors"
                title="Log out"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          ) : (
            <button
              onClick={onLogin}
              className="flex items-center gap-2 bg-brand-300 hover:bg-brand-400 text-brand-50 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-sm"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-3.5 h-3.5" alt="" />
              Sign in
            </button>
          )}
        </div>

        {/* ── MOBILE: hamburger + avatar ── */}
        <div className="flex md:hidden items-center gap-2">
          {user && (
            user.photoURL && !imgError ? (
              <img src={user.photoURL} alt="Profile" onError={() => setImgError(true)}
                className="w-7 h-7 rounded-full border border-stone-200 object-cover" />
            ) : (
              <div className="w-7 h-7 rounded-full bg-brand-300 flex items-center justify-center text-brand-50 font-bold text-xs">
                {userInitial}
              </div>
            )
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-stone-200 text-stone-500 hover:bg-stone-100 transition-colors"
          >
            {mobileOpen ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ── MOBILE MENU ── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-stone-100 bg-white px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <button
              key={link.view}
              onClick={() => { changeView && changeView(link.view); setMobileOpen(false) }}
              className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all
                ${currentView === link.view
                  ? "bg-brand-50 text-brand-500 font-semibold"
                  : "text-stone-600 hover:bg-stone-50"
                }`}
            >
              {link.label}
            </button>
          ))}
          <div className="border-t border-stone-100 mt-2 pt-2">
            {user ? (
              <button onClick={handleLogout}
                className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-red-500 hover:bg-red-50 font-medium transition-colors">
                Log out
              </button>
            ) : (
              <button onClick={() => { onLogin(); setMobileOpen(false) }}
                className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-brand-400 hover:bg-brand-50 transition-colors">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="" />
                Sign in with Google
              </button>
            )}
            {isAdmin && (
              <button onClick={() => { openDashboard(); setMobileOpen(false) }}
                className="w-full text-left px-4 py-2.5 rounded-lg text-sm text-brand-300 font-semibold hover:bg-brand-50 transition-colors">
                Admin Dashboard
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}