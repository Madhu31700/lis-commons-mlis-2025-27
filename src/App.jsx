import { useState } from "react"
import Home from "./components/Home"
import FirstYear from "./components/FirstYear"

export default function App() {
  const [page, setPage] = useState("home")

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {page === "home" && <Home goFirstYear={() => setPage("first")} />}
      {page === "first" && <FirstYear goHome={() => setPage("home")} />}
    </div>
  )
}
