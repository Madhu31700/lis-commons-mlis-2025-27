import { useState } from "react"
import Home from "./components/Home"
import Year from "./components/Year"
import Semester from "./components/Semester"
import Paper from "./components/Paper"
import InternshipForm from "./components/InternshipForm"
import PlacementDashboard from "./components/PlacementDashboard"

export default function App() {
  const [view, setView] = useState("home")
  const [year, setYear] = useState(null)
  const [semester, setSemester] = useState(null)
  const [paper, setPaper] = useState(null)

  if (view === "dashboard") {
    return (
      <PlacementDashboard
        goBack={() => setView("home")}
      />
    )
  }

  if (view === "internship") {
    return (
      <InternshipForm
        goBack={() => setView("home")}
      />
    )
  }

  if (view === "paper") {
    return (
      <Paper
        paper={paper}
        goBack={() => setView("semester")}
      />
    )
  }

  if (view === "semester") {
    return (
      <Semester
        semester={semester}
        openPaper={(p) => {
          setPaper(p)
          setView("paper")
        }}
        goBack={() => setView("year")}
      />
    )
  }

  if (view === "year") {
    return (
      <Year
        year={year}
        openSemester={(s) => {
          setSemester(s)
          setView("semester")
        }}
        goBack={() => setView("home")}
      />
    )
  }

  return (
    <Home
      openFirstYear={() => {
        setYear("First Year")
        setView("year")
      }}
      openSecondYear={() => {
        setYear("Second Year")
        setView("year")
      }}
      openInternshipForm={() => {
        setView("internship")
      }}
      openDashboard={() => {
        setView("dashboard")
      }}
    />
  )
}
