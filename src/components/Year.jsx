const semesterData = {
  "Semester I": [
    "Paper 01 – Foundations of Library and Information Science",
    "Paper 02 – Information Organisation",
    "Paper 03 – Cataloguing and Metadata",
    "Paper 04 – Information Sources, Systems and Services",
    "Paper 05 – Foundations of ICT",
  ],
  "Semester II": [
    "Paper 06 – Library Management and Automation",
    "Paper 07 – Digital Libraries",
    "Paper 08 – Knowledge Management",
    "Paper 09 – Elements of Mathematics and Statistics",
    "Paper 10 – Colloquium and Study of Subject",
  ],
  "Semester III": [
    "Paper 11 – Information Retrieval",
    "Paper 12 – Content Management Systems",
    "Paper 13 – Data Management",
    "Paper 14 – Research Methodology and Technical Writing",
    "Paper 15 – Seminar",
  ],
  "Semester IV": [
    "Paper 16 – Scientometrics and Informetrics",
    "Paper 17 – Web Based Information Systems and Services",
    "Paper 18 – Semantic Web",
    "Paper 19 – Electives",
    "Paper 20 – Dissertation",
  ],
}

const SEM_COLORS = {
  "Semester I":   { accent: '#1D9E75', bg: '#E1F5EE', light: '#9FE1CB' },
  "Semester II":  { accent: '#0C447C', bg: '#E6F1FB', light: '#85B7EB' },
  "Semester III": { accent: '#3C3489', bg: '#EEEDFE', light: '#AFA9EC' },
  "Semester IV":  { accent: '#633806', bg: '#FAEEDA', light: '#FAC775' },
}

export default function Year({ openPaper, goBack, activeTab, setActiveTab }) {
  const tabs = ["Semester I","Semester II","Semester III","Semester IV"]
  const papers = semesterData[activeTab] || []
  const colors = SEM_COLORS[activeTab]

  return (
    <div style={{
      fontFamily: "'Plus Jakarta Sans',sans-serif",
      background: '#F5F7F6', minHeight: '100vh',
    }}>

      {/* Header */}
      <div style={{
        background: `linear-gradient(160deg,${colors.bg},${colors.light}40,#f8faf9,#fff)`,
        padding: 'clamp(28px,4vw,40px) clamp(16px,4vw,32px)',
        borderBottom: '1px solid rgba(29,158,117,0.1)',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <button onClick={goBack} style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: 'none', border: `1.5px solid ${colors.accent}30`,
            borderRadius: '100px', padding: '7px 16px',
            fontSize: '12px', fontWeight: '600', color: colors.accent,
            cursor: 'pointer', marginBottom: '20px',
          }}>← Back to Hub</button>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: `${colors.accent}12`,
            border: `1px solid ${colors.accent}25`,
            borderRadius: '100px', padding: '3px 12px',
            fontSize: '10px', fontWeight: '700', color: colors.accent,
            letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px',
          }}>
            Junior Cohort · 2025–27
          </div>

          <h1 style={{
            fontFamily: "'Lora',serif",
            fontSize: 'clamp(24px,4vw,36px)',
            fontWeight: '600', color: '#0D1A16', marginBottom: '6px',
          }}>Academic Library</h1>
          <p style={{ fontSize: '14px', color: '#5A7A6E' }}>
            Select a semester to view papers and resources.
          </p>
        </div>
      </div>

      {/* Semester tabs */}
      <div style={{
        position: 'sticky', top: 58, zIndex: 30,
        background: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(29,158,117,0.1)',
        padding: '10px clamp(16px,4vw,32px)',
      }}>
        <div style={{
          maxWidth: '1100px', margin: '0 auto',
          display: 'flex', gap: '6px', overflowX: 'auto',
        }}>
          {tabs.map(tab => {
            const c = SEM_COLORS[tab]
            const isActive = activeTab === tab
            return (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                padding: '8px 18px', borderRadius: '100px', border: 'none',
                fontSize: '12px', fontWeight: '600', cursor: 'pointer',
                whiteSpace: 'nowrap', transition: 'all 0.15s',
                background: isActive ? c.accent : `${c.accent}10`,
                color: isActive ? '#fff' : c.accent,
              }}>{tab}</button>
            )
          })}
        </div>
      </div>

      {/* Papers grid */}
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        padding: 'clamp(24px,4vw,40px) clamp(16px,4vw,32px)',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))',
          gap: '14px',
        }}>
          {papers.map((paperStr, i) => {
            const [codePart, titlePart] = paperStr.split(' – ')
            const paperNum = codePart.replace('Paper ', '')
            return (
              <div key={i} className="card-hover"
                onClick={() => openPaper(paperStr)}
                style={{
                  background: '#fff',
                  border: `1.5px solid ${colors.accent}15`,
                  borderRadius: '18px', padding: '22px',
                  cursor: 'pointer', display: 'flex',
                  flexDirection: 'column', gap: '12px',
                }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}>
                  <span style={{
                    padding: '3px 10px', borderRadius: '100px',
                    fontSize: '10px', fontWeight: '700',
                    background: colors.bg, color: colors.accent,
                    letterSpacing: '0.06em',
                  }}>P–{paperNum}</span>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: colors.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                      stroke={colors.accent} strokeWidth="2.5">
                      <path d="M9 5l7 7-7 7"/>
                    </svg>
                  </div>
                </div>
                <h3 style={{
                  fontFamily: "'Lora',serif", fontSize: '15px',
                  fontWeight: '600', color: '#0D1A16', lineHeight: '1.4',
                  flex: 1,
                }}>{titlePart}</h3>
                <div style={{
                  paddingTop: '10px',
                  borderTop: `1px solid ${colors.accent}12`,
                  fontSize: '11px', fontWeight: '600',
                  color: colors.accent,
                }}>View Resources →</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}