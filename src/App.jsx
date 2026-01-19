import { useState } from "react"
import Header from "./components/Header"
import Intro from "./components/Intro"
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

  const [showIntro, setShowIntro] = useState(
    !sessionStorage.getItem("introSeen")
  )

  const finishIntro = () => {
    sessionStorage.setItem("introSeen", "true")
    setShowIntro(false)
  }

  let content = null

  if (view === "dashboard") {
    content = <PlacementDashboard goBack={() => setView("home")} />
  } else if (view === "internship") {
    content = <InternshipForm goBack={() => setView("home")} />
  } else if (view === "paper") {
    content = <Paper paper={paper} goBack={() => setView("semester")} />
  } else if (view === "semester") {
    content = (
      <Semester
        semester={semester}
        openPaper={(p) => {
          setPaper(p)
          setView("paper")
        }}
        goBack={() => setView("year")}
      />
    )
  } else if (view === "year") {
    content = (
      <Year
        year={year}
        openSemester={(s) => {
          setSemester(s)
          setView("semester")
        }}
        goBack={() => setView("home")}
      />
    )
  } else {
    content = (
      <Home
        openFirstYear={() => {
          setYear("First Year")
          setView("year")
        }}
        openSecondYear={() => {
          setYear("Second Year")
          setView("year")
        }}
        openInternshipForm={() => setView("internship")}
        openDashboard={() => setView("dashboard")}
      />
    )
  }

  return (
    <>
      <Header openDashboard={() => setView("dashboard")} />
      {showIntro ? <Intro onFinish={finishIntro} /> : content}
    </>
  )
}
