import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { getQuoteOfTheDay } from "../data/quotes"
import FeedbackModal from "./FeedbackModal"
import Hero from "./Hero"
import { StreakCard } from "./DailyChallenge"

const ADMIN_EMAILS = [
  "madhu@drtc.isibang.ac.in",
  "amisha@drtc.isibang.ac.in",
  "madhu31700@gmail.com",
]

const PLACEMENT_EMAILS = [
  "madhu@drtc.isibang.ac.in",
  "amisha@drtc.isibang.ac.in",
]

function QuickCard({ icon, title, subtitle, onClick, accent = "#1D9E75" }) {
  return (
    <div onClick={onClick} className="card-hover" style={{
      background: '#fff',
      border: `1.5px solid ${accent}18`,
      borderRadius: '18px', padding: '20px',
      cursor: 'pointer', display: 'flex',
      flexDirection: 'column', gap: '12px',
    }}>
      <div style={{
        width: '44px', height: '44px', borderRadius: '12px',
        background: `${accent}15`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontFamily: "'Lora',serif", fontSize: '15px',
          fontWeight: '600', color: '#0D1A16', marginBottom: '3px' }}>
          {title}
        </div>
        <div style={{ fontSize: '12px', color: '#5A7A6E' }}>{subtitle}</div>
      </div>
    </div>
  )
}

export default function Home({
  openBatch,
  openGovtExams,
  openUpskilling,
  openInternshipForm,
  openDashboard,
  openSyllabus,
  openAdminFeedback,
  onOpenChallenge,
}) {
  const { user } = useAuth()
  const quote = getQuoteOfTheDay()

  const isAdmin        = user && ADMIN_EMAILS.includes(user.email)
  const isPlacementRep = user && PLACEMENT_EMAILS.includes(user.email)
  const [showFeedback, setShowFeedback] = useState(false)

  return (
    <div style={{
      fontFamily: "'Plus Jakarta Sans',sans-serif",
      background: '#F5F7F6', minHeight: '100vh',
    }}>

      {/* ── HERO ── */}
      <Hero />

      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        padding: 'clamp(24px,4vw,40px) clamp(16px,4vw,32px)',
      }}>

        {/* ── QUOTE ── */}
        <div style={{
          background: '#fff',
          border: '1.5px solid rgba(29,158,117,0.12)',
          borderLeft: '4px solid #1D9E75',
          borderRadius: '0 14px 14px 0',
          padding: '16px 20px', marginBottom: '28px',
        }}>
          <p style={{
            fontFamily: "'Lora',serif",
            fontSize: 'clamp(13px,2vw,15px)',
            fontStyle: 'italic', color: '#2E4F44',
            lineHeight: '1.7', marginBottom: '6px',
          }}>"{quote.text}"</p>
          <p style={{ fontSize: '11px', color: '#8FA89E', fontWeight: '600',
            textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            — {quote.author}
          </p>
        </div>

        {/* ── SYLLABUS BANNER ── */}
        <div onClick={openSyllabus} className="card-hover" style={{
          background: 'linear-gradient(135deg,#0D1A16,#1A302A)',
          borderRadius: '20px',
          padding: 'clamp(20px,4vw,28px)',
          marginBottom: '24px', cursor: 'pointer',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '52px', height: '52px', borderRadius: '14px',
              background: 'rgba(29,158,117,0.2)',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', flexShrink: 0,
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="#1D9E75" strokeWidth="1.8">
                <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center',
                gap: '8px', marginBottom: '4px' }}>
                <span style={{
                  background: '#1D9E75', color: '#fff', fontSize: '9px',
                  fontWeight: '700', padding: '2px 8px', borderRadius: '100px',
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                }}>Official</span>
              </div>
              <div style={{ fontFamily: "'Lora',serif",
                fontSize: 'clamp(16px,3vw,22px)', fontWeight: '600',
                color: '#fff', marginBottom: '4px' }}>
                Syllabus & Curriculum
              </div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>
                Complete credit breakdown of Course
              </div>
            </div>
          </div>
          <div style={{
            background: 'linear-gradient(135deg,#1D9E75,#0F6E56)',
            color: '#fff', borderRadius: '100px',
            padding: '10px 22px', fontSize: '13px', fontWeight: '600',
            whiteSpace: 'nowrap', flexShrink: 0,
          }}>View PDF →</div>
        </div>

        {/* ── QUICK ACCESS GRID ── */}
        <div style={{ marginBottom: '10px' }}>
          <div style={{ fontSize: '10px', fontWeight: '700', color: '#1D9E75',
            letterSpacing: '0.18em', textTransform: 'uppercase',
            marginBottom: '14px' }}>
            Quick Access
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))',
            gap: '14px',
          }}>

            {/* ── DAILY CHALLENGE STREAK CARD ── */}
            <StreakCard onOpen={onOpenChallenge} />

            {/* Batch 2024-26 */}
            <QuickCard
              onClick={() => openBatch("2024-26")}
              accent="#1D9E75"
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="#1D9E75" strokeWidth="1.8">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>}
              title="Batch 2024–26"
              subtitle="Senior cohort · Papers & notes"
            />

            {/* Batch 2025-27 */}
            <QuickCard
              onClick={() => openBatch("2025-27")}
              accent="#0F6E56"
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="#0F6E56" strokeWidth="1.8">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>}
              title="Batch 2025–27"
              subtitle="Junior cohort · Papers & notes"
            />

            {/* Placement */}
            <QuickCard
              onClick={openInternshipForm}
              accent="#27500A"
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="#27500A" strokeWidth="1.8">
                <rect x="2" y="7" width="20" height="14" rx="2"/>
                <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
              </svg>}
              title="Placement Cell"
              subtitle="Fill your internship profile"
            />

            {/* Events */}
            <QuickCard
              onClick={openGovtExams}
              accent="#3C3489"
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="#3C3489" strokeWidth="1.8">
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <path d="M16 2v4M8 2v4M3 10h18"/>
              </svg>}
              title="Events & Exams"
              subtitle="LIS events, UGC NET, GATE"
            />

            {/* Upskilling */}
            <QuickCard
              onClick={openUpskilling}
              accent="#633806"
              icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="#633806" strokeWidth="1.8">
                <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>}
              title="Upskilling"
              subtitle="Tools, tech & certifications"
            />

            {/* Admin */}
            {isAdmin && (
              <QuickCard
                onClick={openDashboard}
                accent="#A32D2D"
                icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="#A32D2D" strokeWidth="1.8">
                  <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>}
                title="Admin Dashboard"
                subtitle="Manage users, posts, placement"
              />
            )}

            {/* Placement Rep */}
            {isPlacementRep && !isAdmin && (
              <QuickCard
                onClick={openDashboard}
                accent="#085041"
                icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                  stroke="#085041" strokeWidth="1.8">
                  <path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>}
                title="Placement Dashboard"
                subtitle="View student submissions"
              />
            )}

          </div>
        </div>

        {/* ── FEEDBACK ROW ── */}
        <div style={{
          marginTop: '28px', display: 'flex',
          justifyContent: 'center', gap: '10px', flexWrap: 'wrap',
        }}>
          <button onClick={() => setShowFeedback(true)} style={{
            background: 'transparent', color: '#5A7A6E',
            border: '1.5px solid rgba(29,158,117,0.2)',
            borderRadius: '100px', padding: '8px 20px',
            fontSize: '12px', fontWeight: '600', cursor: 'pointer',
          }}>Send Feedback</button>

          {isAdmin && (
            <button onClick={openAdminFeedback} style={{
              background: 'rgba(29,158,117,0.08)', color: '#085041',
              border: '1.5px solid rgba(29,158,117,0.2)',
              borderRadius: '100px', padding: '8px 20px',
              fontSize: '12px', fontWeight: '600', cursor: 'pointer',
            }}>View Feedback</button>
          )}
        </div>

      </div>

      {showFeedback && (
        <FeedbackModal onClose={() => setShowFeedback(false)} />
      )}
    </div>
  )
}