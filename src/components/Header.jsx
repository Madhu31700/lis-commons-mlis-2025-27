import { useAuth } from "../context/AuthContext"
import { auth } from "../firebase"
import { signOut } from "firebase/auth"

/* Using your specific filename: logo.jpg.png
*/
import logoImg from '../assets/logo.jpg.png' 

export default function Header({ goHome, openDashboard, onLogin }) {
  const { user } = useAuth()

  const handleLogout = () => {
    signOut(auth)
    goHome()
  }

  return (
    <nav className="sticky top-0 z-50 bg-[#020617]/90 backdrop-blur-xl border-b border-white/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        
        {/* --- LOGO SECTION --- */}
        <div 
          onClick={goHome} 
          className="flex items-center gap-4 cursor-pointer group select-none transition-opacity hover:opacity-90"
        >
          {/* LOGO IMAGE 
              Changes: 
              1. h-12 (mobile) -> md:h-16 (desktop) = Bigger size
              2. rounded-xl + border = Professional "App Icon" look
          */}
          <img 
            src={logoImg} 
            alt="Librandhana Logo" 
            className="h-12 md:h-16 w-auto object-contain rounded-xl border border-white/10 shadow-lg bg-white/5" 
          />

          <div className="flex flex-col justify-center">
            <span className="text-white font-black tracking-tighter text-lg md:text-2xl uppercase leading-none">
              Librandhana
            </span>
            <span className="text-[10px] md:text-xs text-indigo-400 font-bold tracking-[0.3em] mt-0.5">
              ACADEMIC HUB
            </span>
          </div>
        </div>

        {/* --- RIGHT SIDE ACTIONS --- */}
        <div className="flex items-center gap-3 sm:gap-6">
          
          {/* Dashboard Button (Only for Placement Reps) */}
          {user && (user.email === "madhu@drtc.isibang.ac.in" || user.email === "amisha@drtc.isibang.ac.in") && (
            <button 
              onClick={openDashboard}
              className="hidden md:block text-xs font-bold text-slate-400 hover:text-white uppercase tracking-wider transition-colors border border-transparent hover:border-slate-700 px-3 py-1 rounded-lg"
            >
              Dashboard
            </button>
          )}

          {/* Login / User Profile */}
          {user ? (
            <div className="flex items-center gap-3 bg-slate-900/50 pr-1 pl-4 py-1 rounded-full border border-white/5">
              <div className="text-right hidden sm:block">
                <p className="text-xs text-white font-bold leading-none">{user.displayName?.split(' ')[0]}</p>
                <button 
                  onClick={handleLogout} 
                  className="text-[10px] text-indigo-400 hover:text-red-400 font-bold uppercase tracking-widest transition-colors"
                >
                  Log Out
                </button>
              </div>
              <img 
                src={user.photoURL} 
                alt="User" 
                className="w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-slate-700 shadow-sm"
              />
            </div>
          ) : (
            <button
              onClick={onLogin}
              className="bg-white text-black hover:bg-indigo-50 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all shadow-lg hover:shadow-indigo-500/20 hover:-translate-y-0.5"
            >
              Log In
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}