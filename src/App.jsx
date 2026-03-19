import { useEffect, useState } from "react"
import { doc, getDoc, updateDoc, increment, setDoc } from "firebase/firestore"
import { db } from "./firebase"

import Header    from "./components/Header"
import Footer    from "./components/Footer"
import Landing   from "./components/Landing"
import Auth      from "./components/Auth"
import Home      from "./components/Home"
import Year      from "./components/Year"
import Paper     from "./components/Paper"
import InternshipForm    from "./components/InternshipForm"
import AdminHub          from "./components/AdminHub"
import AdminPanel        from "./components/AdminPanel"
import PlacementDashboard from "./components/PlacementDashboard"
import FeedbackDashboard  from "./components/FeedbackDashboard"

// New pages
import Blog       from "./components/Blog"
import BlogPost   from "./components/BlogPost"
import WritePost  from "./components/WritePost"
import Aspirants  from "./components/Aspirants"
import Events     from "./components/Events"
import Jobs       from "./components/JobsPage"

import { useAuth } from "./context/AuthContext"

// Views that require login
const PRIVATE_VIEWS = ["batch-selection","paper","internship","dashboard","admin-users","admin-placement","admin-feedback","write-post"]

export default function App() {
  const { user } = useAuth()

  const [view, setView] = useState(() => {
    const params = new URLSearchParams(window.location.search)
    return params.get("view") || "home"
  })

  const [selectedBatch, setSelectedBatch] = useState(null)
  const [paper, setPaper]               = useState(null)
  const [currentTab, setCurrentTab]     = useState("Semester I")
  const [showAuth, setShowAuth]         = useState(false)
  const [currentPost, setCurrentPost]   = useState(null)
  const [visitCount, setVisitCount]     = useState(0)

  const changeView = (newView) => {
    // If private view and not logged in — show auth
    if (PRIVATE_VIEWS.includes(newView) && !user) {
      setShowAuth(true)
      return
    }
    setView(newView)
    window.history.pushState({ view: newView }, "", `?view=${newView}`)
    window.scrollTo(0, 0)
  }

  useEffect(() => {
    const handlePopState = (e) => setView(e.state?.view || "home")
    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  useEffect(() => {
    const statsRef = doc(db, "analytics", "site_stats")
    updateDoc(statsRef, { visits: increment(1) })
      .then(() => getDoc(statsRef))
      .then(snap => { if (snap.exists()) setVisitCount(snap.data().visits) })
      .catch(async err => {
        if (err.code === 'not-found' || err.message.includes("No document")) {
          await setDoc(statsRef, { visits: 1 })
          setVisitCount(1)
        }
      })
  }, [])

  const handleGoHome = () => {
    setSelectedBatch(null)
    setPaper(null)
    setCurrentTab("Semester I")
    setView("home")
    window.history.pushState({ view: "home" }, "", "?view=home")
    window.scrollTo(0, 0)
  }

  const openSyllabus = () => {
    window.open("https://www.isibang.ac.in/~adean/infsys/acadata/Brochures/mslis_new.pdf", "_blank")
  }

  // ── ROUTER ──
  let content = null

  if (view === "blog") content = (
    <Blog
      onOpenPost={post => { setCurrentPost(post); changeView("blog-post") }}
      onWritePost={() => changeView("write-post")}
    />
  )
  else if (view === "blog-post") content = (
    <BlogPost post={currentPost} goBack={() => changeView("blog")} />
  )
  else if (view === "write-post") content = (
    <WritePost goBack={() => changeView("blog")} onPublished={() => changeView("blog")} />
  )
  else if (view === "aspirants") content = <Aspirants />
  else if (view === "events")    content = <Events />
  else if (view === "jobs")      content = <Jobs />
  else if (view === "dashboard") content = <AdminHub changeView={changeView} goBack={handleGoHome} />
  else if (view === "admin-users")     content = <AdminPanel goBack={() => changeView("dashboard")} />
  else if (view === "admin-placement") content = <PlacementDashboard goBack={() => changeView("dashboard")} />
  else if (view === "admin-feedback")  content = <FeedbackDashboard goBack={() => changeView("dashboard")} />
  else if (view === "internship")      content = <InternshipForm goBack={handleGoHome} />
  else if (view === "batch-selection") {
    if (selectedBatch === "2024-26") {
      content = (
        <div style={{ minHeight: '100vh', background: '#F5F7F6', padding: 'clamp(32px,5vw,48px) clamp(16px,4vw,32px)' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <button onClick={handleGoHome} style={{
              display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '32px',
              background: 'none', border: '1.5px solid rgba(29,158,117,0.2)', borderRadius: '100px',
              padding: '8px 18px', fontSize: '12px', fontWeight: '600', color: '#1D9E75', cursor: 'pointer',
            }}>← Back to Hub</button>
            <h2 style={{ fontFamily: "'Lora',serif", fontSize: '32px', fontWeight: '600', color: '#0D1A16', marginBottom: '8px' }}>
              Research & Projects
            </h2>
            <p style={{ fontSize: '14px', color: '#5A7A6E', marginBottom: '32px' }}>2024–26 Senior Cohort</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '16px' }}>
              {[
                { label: 'Colloquium', sub: 'Paper 10 Presentations', color: '#1D9E75' },
                { label: 'Seminar',    sub: 'Paper 15 Showcases',     color: '#7F77DD' },
                { label: 'Dissertation', sub: 'Paper 20 Theses',      color: '#D85A30' },
              ].map(item => (
                <div key={item.label} className="card-hover" onClick={() => { setPaper(`${item.label}`); changeView("paper") }}
                  style={{
                    background: '#fff', border: `1.5px solid ${item.color}20`,
                    borderRadius: '18px', padding: '28px', cursor: 'pointer',
                  }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                    <span style={{ fontFamily: "'Lora',serif", fontSize: '20px', fontWeight: '600', color: item.color }}>{item.label[0]}</span>
                  </div>
                  <h3 style={{ fontFamily: "'Lora',serif", fontSize: '18px', fontWeight: '600', color: '#0D1A16', marginBottom: '4px' }}>{item.label}</h3>
                  <p style={{ fontSize: '12px', color: '#5A7A6E' }}>{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    } else {
      content = (
        <Year
          activeTab={currentTab}
          setActiveTab={setCurrentTab}
          openPaper={p => { setPaper(p); changeView("paper") }}
          goBack={handleGoHome}
        />
      )
    }
  }
  else if (view === "paper") content = (
    <Paper paper={paper} batch={selectedBatch} goBack={() => changeView("batch-selection")} />
  )
  else content = (
    <Home
      visitCount={visitCount}
      openBatch={batchName => { setSelectedBatch(batchName); changeView("batch-selection") }}
      openGovtExams={() => changeView("events")}
      openUpskilling={() => changeView("events")}
      openInternshipForm={() => changeView("internship")}
      openDashboard={() => changeView("dashboard")}
      openAdminFeedback={() => changeView("admin-feedback")}
      openSyllabus={openSyllabus}
    />
  )

  // ── PUBLIC PAGES (no login needed) ──
  const PUBLIC_VIEWS = ["blog", "blog-post", "aspirants", "events", "jobs"]
  const isPublicView = PUBLIC_VIEWS.includes(view)

  // Show landing for logged-out users trying to access private pages
  if (!user && !isPublicView && view !== "home") {
    return (
      <>
        <Landing onLogin={() => setShowAuth(true)} />
        {showAuth && <Auth onClose={() => setShowAuth(false)} />}
      </>
    )
  }

  // Show landing for home when not logged in
  if (!user && view === "home") {
    return (
      <>
        <Landing onLogin={() => setShowAuth(true)} />
        {showAuth && <Auth onClose={() => setShowAuth(false)} />}
      </>
    )
  }

  return (
    <>
      <Header
        goHome={handleGoHome}
        openDashboard={() => changeView("dashboard")}
        onLogin={() => setShowAuth(true)}
        currentView={view}
        changeView={changeView}
      />
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div style={{ flex: 1 }}>{content}</div>
        <Footer visitCount={visitCount} />
      </div>
      {showAuth && <Auth onClose={() => setShowAuth(false)} />}
    </>
  )
}