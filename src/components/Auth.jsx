import { useState } from "react"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth"
import { auth } from "../firebase"

export default function Auth({ onClose }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mode, setMode] = useState("login") // login | signup | reset
  const [msg, setMsg] = useState("")
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    setMsg("")
    setLoading(true)
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password)
        onClose()
      }
      if (mode === "signup") {
        await createUserWithEmailAndPassword(auth, email, password)
        onClose()
      }
      if (mode === "reset") {
        await sendPasswordResetEmail(auth, email)
        setMsg(
          "Password reset link has been sent to your email. Please check your inbox (and spam folder)."
        )
      }
    } catch (e) {
      setMsg(e.message)
    }
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-slate-900 p-8 rounded-xl w-full max-w-sm text-slate-100 relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-slate-400 hover:text-white"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">
          {mode === "login" && "Login"}
          {mode === "signup" && "Create Account"}
          {mode === "reset" && "Reset Password"}
        </h2>

        <input
          placeholder="Email"
          className="w-full mb-3 p-2 bg-slate-800 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {mode !== "reset" && (
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-2 bg-slate-800 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}

        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-indigo-600 py-2 rounded disabled:opacity-60"
        >
          {mode === "login" && "Login"}
          {mode === "signup" && "Sign Up"}
          {mode === "reset" && "Send Reset Link"}
        </button>

        <div className="mt-4 text-sm text-slate-400 space-y-2">
          {mode === "login" && (
            <>
              <button onClick={() => setMode("signup")}>
                Create new account
              </button>
              <br />
              <button onClick={() => setMode("reset")}>
                Forgot password?
              </button>
            </>
          )}

          {mode !== "login" && (
            <button onClick={() => setMode("login")}>
              ← Back to login
            </button>
          )}
        </div>

        {msg && <p className="mt-4 text-sm text-green-400">{msg}</p>}
      </div>
    </div>
  )
}
