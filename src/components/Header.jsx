import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { auth } from "../firebase"
import { signOut } from "firebase/auth"
import logoImg from '../assets/logo.jpg.png' 

export default function Header({ goHome, openDashboard, onLogin }) {
  const { user } = useAuth()
  const [imgError, setImgError] = useState(false) // Track if image fails

  const handleLogout = () => {
    signOut(auth)
    goHome()
  }

  // Get initial for fallback (e.g., "Madhu" -> "M")
  const userInitial = user?.displayName 
    ? user.displayName.charAt(0).toUpperCase() 
    : user?.email?.charAt(0).toUpperCase()

  return (
    <nav className="sticky top-0 z-50 bg-[#020617]/90 backdrop-blur-xl border-b border-white/10 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        
        {/* --- LOGO SECTION --- */}
        <div 
          onClick={goHome} 
          className="flex items-center gap-3 md:gap-4 cursor-pointer group select-none transition-opacity hover:opacity-90"
        >
          <img 
            src={logoImg} 
            alt="Librandhana Logo" 
            className="h-10 md:h-16 w-auto object-contain rounded-xl border border-white/10 shadow-lg bg-white/5" 
          />

          <div className="flex flex-col justify-center">
            <span className="text-white font-black tracking-tighter text-lg md:text-2xl uppercase leading-none">
              Librandhana
            </span>
            <span className="text-[9px] md:text-xs text-indigo-400 font-bold tracking-[0.3em] mt-0.5">
              ACADEMIC HUB
            </span>
          </div>
        </div>

        {/* --- RIGHT SIDE ACTIONS --- */}
        <div className="flex items-center gap-2 sm:gap-6">
          
          {/* Dashboard Button (Restricted - Desktop Only) */}
          {user && (user.email === "madhu@drtc.isibang.ac.in" || user.email === "amisha@drtc.isibang.ac.in") && (
            <button 
              onClick={openDashboard}
              className="hidden md:block text-xs font-bold text-slate-400 hover:text-white uppercase tracking-wider transition-colors border border-transparent hover:border-slate-700 px-3 py-1 rounded-lg"
            >
              Dashboard
            </button>
          )}

          {/* User Profile / Login */}
          {user ? (
            <div className="flex items-center gap-3 bg-slate-900/50 pl-1 pr-1 md:pl-4 md:pr-1 py-1 rounded-full border border-white/5">
              
              {/* DESKTOP: Name & Text Logout */}
              <div className="text-right hidden sm:block">
                <p className="text-xs text-white font-bold leading-none mb-1">
                  {user.displayName?.split(' ')[0]}
                </p>
                <button 
                  onClick={handleLogout} 
                  className="text-[10px] text-indigo-400 hover:text-red-400 font-bold uppercase tracking-widest transition-colors"
                >
                  Log Out
                </button>
              </div>

              {/* PROFILE IMAGE */}
              {user.photoURL && !imgError ? (
                <img 
                  src={user.photoURL} 
                  alt="Profile" 
                  onError={() => setImgError(true)}
                  className="w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-slate-700 shadow-sm object-cover"
                />
              ) : (
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-indigo-600 border-2 border-indigo-400 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                  {userInitial}
                </div>
              )}

              {/* MOBILE ONLY: Red Logout Icon Button */}
              <button 
                onClick={handleLogout}
                className="sm:hidden w-8 h-8 flex items-center justify-center rounded-full bg-red-500/10 text-red-400 ml-1 active:bg-red-500 active:text-white transition-colors"
                aria-label="Log Out"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              </button>

            </div>
          ) : (
            <button
              onClick={onLogin}
              className="bg-white text-black hover:bg-indigo-50 px-5 py-2 md:px-6 md:py-2.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest transition-all shadow-lg hover:shadow-indigo-500/20"
            >
              Log In
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}