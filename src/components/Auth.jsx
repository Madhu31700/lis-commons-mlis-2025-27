import { useState } from "react"
import { auth, db } from "../firebase" 
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"

// --- HARDCODED SUPER ADMINS (Safety Net) ---
const SUPER_ADMINS = [
  "madhu@drtc.isibang.ac.in",
  "amisha@drtc.isibang.ac.in",
  "madhu31700@gmail.com" 
]

export default function Auth({ onClose, forceLogin }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async () => {
    setLoading(true)
    setError("")

    try {
      // 1. Initialize Google Provider
      const provider = new GoogleAuthProvider()
      
      // 2. Sign In with Google
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      const email = user.email

      // 3. Check Whitelist Logic
      let isAllowed = false
      let role = "student"

      // A. Check Super Admin List first (Fastest check)
      if (SUPER_ADMINS.includes(email)) {
        isAllowed = true
        role = "admin"
      } else {
        // B. Check Firestore Whitelist Database
        const docRef = doc(db, "allowed_users", email)
        const docSnap = await getDoc(docRef)
        
        if (docSnap.exists()) {
          isAllowed = true
          role = docSnap.data().role || "student"
        }
      }

      // 4. Final Decision
      if (isAllowed) {
        // SUCCESS: Update "Last Login" in database
        await setDoc(doc(db, "allowed_users", email), {
          lastLogin: serverTimestamp(),
          role: role,
          uid: user.uid
        }, { merge: true })

        onClose() // Close the modal
      } else {
        // FAILURE: Show Alert FIRST, then log out
        alert("ACCESS DENIED: Your email is not on the whitelist. Please contact the Admin.")
        
        await signOut(auth)
        setError("Access Denied: Your email is not on the list. Please contact the DRTC Admin.")
      }

    } catch (err) {
      console.error(err)
      setError("Login Failed: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020617] p-4 backdrop-blur-xl">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      
      <div className="relative bg-[#0f172a] border border-slate-800 p-8 md:p-12 rounded-3xl w-full max-w-md shadow-2xl text-center">
        
        {/* Only show Close button if NOT forced */}
        {!forceLogin && (
          <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">
            ✕
          </button>
        )}

        {/* Logo */}
        <div className="w-16 h-16 bg-indigo-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-indigo-600/30">
          <span className="text-2xl font-black text-white">L</span>
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">Welcome to Librandhana</h2>
        <p className="text-slate-400 text-sm mb-8">
          {forceLogin 
            ? "Restricted Access. Please sign in with your authorized email." 
            : "Sign in to save your preferences and access exclusive features."}
        </p>

        {/* Error Message Display */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 mb-6 text-red-400 text-xs font-bold">
            {error}
          </div>
        )}

        {/* Google Login Button */}
        <button 
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-4 bg-white text-black rounded-xl font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform flex items-center justify-center gap-3 shadow-xl disabled:opacity-50"
        >
          {loading ? (
            <span>Verifying Access...</span>
          ) : (
            <>
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
              Continue with Google
            </>
          )}
        </button>

        <p className="mt-6 text-[10px] text-slate-600 font-mono uppercase">
          Authorized Access Only
        </p>
      </div>
    </div>
  )
}