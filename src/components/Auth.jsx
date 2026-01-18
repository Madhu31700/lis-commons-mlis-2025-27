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
  const [mode, setMode] = useState("login")
  const [msg, setMsg] = useState("")

  const submit = async () => {
    try {
      if (mode === "login") {
        await signInWithEmailAndPassword(auth, email, password)
      } else {
        await createUserWithEmailAndPassword(auth, email, password)
      }
      onClose()
    } catch (e) {
      setMsg(e.message)
    }
  }

  const reset = async () => {
    await sendPasswordResetEmail(auth, email)
    setMsg("Password reset email sent.")
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-slate-900 p-8 rounded-xl w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4">
          {mode === "login" ? "Login" : "Create account"}
        </h2>

        <input
          placeholder="Email"
          className="w-full mb-3 p-2 bg-slate-800 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 bg-slate-800 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={submit}
          className="w-full bg-indigo-600 py-2 rounded"
        >
          {mode === "login" ? "Login" : "Sign up"}
        </button>

        <div className="mt-4 text-sm text-slate-400">
          {mode === "login" ? (
            <>
              <button onClick={() => setMode("signup")}>
                Create account
              </button>{" "}
              ·{" "}
              <button onClick={reset}>
                Forgot password?
              </button>
            </>
          ) : (
            <button onClick={() => setMode("login")}>
              Back to login
            </button>
          )}
        </div>

        {msg && <p className="mt-3 text-xs text-slate-400">{msg}</p>}
      </div>
    </div>
  )
}
