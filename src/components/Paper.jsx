const paperDatabase = {
  "Paper 01": { questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P01.html" }] },
  "Paper 02": { questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P02.html" }] },
  "Paper 03": { questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P03.html" }] },
  "Paper 04": { questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P04.html" }] },
  "Paper 05": { questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P05.html" }] },
  "Paper 06": {
    drive_link: "https://drive.google.com/drive/folders/1VnDTxjeXITYuPIjFdACQ0MF2tgkmoFS7",
    questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P06.html" }]
  },
  "Paper 07": {
    drive_link: "https://drive.google.com/drive/folders/1sC3yGrGilPILDVWT_V5kZgYeyFIqlNop",
    questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P07.html" }]
  },
  "Paper 08": {
    drive_link: "https://drive.google.com/drive/folders/1DQ8fqZ6gAj85iFeDJ7iBeYWxiHOqq4-f",
    questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P08.html" }]
  },
  "Paper 09": {
    drive_link: "https://drive.google.com/drive/folders/1sKOMdlZoYW2U6TiSAAHbcbKFHnG-6eqD",
    questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P09.html" }]
  },
  "Paper 10": {
    type: "paper10_special",
    junior_drive: "https://drive.google.com/drive/folders/1h5V4XIO5WviU6u8kWmQybTNI0yb9TD8-",
  },
  "Paper 11": { questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P11.html" }] },
  "Paper 12": { questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P12.html" }] },
  "Paper 13": { questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P13.html" }] },
  "Paper 14": { questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P14.html" }] },
  "Paper 15": { type: "seminar_special",      senior_seminars: [] },
  "Paper 16": { questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P16.html" }] },
  "Paper 17": { questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P17.html" }] },
  "Paper 18": { questions: [{ title: "Official Question Bank", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P18.html" }] },
  "Paper 19": {
    questions: [
      { title: "Geographical Information Systems", file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P19E1.html" },
      { title: "Health Informatics",               file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P19E2.html" },
      { title: "Data and Text Mining",             file: "https://www.isibang.ac.in/~adean/infsys/database/mslis/drtc/P19E3.html" },
    ]
  },
  "Paper 20": { type: "dissertation_special", senior_theses: [] },
}

const SEM_ACCENT = {
  "Paper 01": "#1D9E75", "Paper 02": "#1D9E75", "Paper 03": "#1D9E75",
  "Paper 04": "#1D9E75", "Paper 05": "#1D9E75",
  "Paper 06": "#0C447C", "Paper 07": "#0C447C", "Paper 08": "#0C447C",
  "Paper 09": "#0C447C", "Paper 10": "#0C447C",
  "Paper 11": "#3C3489", "Paper 12": "#3C3489", "Paper 13": "#3C3489",
  "Paper 14": "#3C3489", "Paper 15": "#3C3489",
  "Paper 16": "#633806", "Paper 17": "#633806", "Paper 18": "#633806",
  "Paper 19": "#633806", "Paper 20": "#633806",
}

const SEM_BG = {
  "Paper 01": "#E1F5EE", "Paper 02": "#E1F5EE", "Paper 03": "#E1F5EE",
  "Paper 04": "#E1F5EE", "Paper 05": "#E1F5EE",
  "Paper 06": "#E6F1FB", "Paper 07": "#E6F1FB", "Paper 08": "#E6F1FB",
  "Paper 09": "#E6F1FB", "Paper 10": "#E6F1FB",
  "Paper 11": "#EEEDFE", "Paper 12": "#EEEDFE", "Paper 13": "#EEEDFE",
  "Paper 14": "#EEEDFE", "Paper 15": "#EEEDFE",
  "Paper 16": "#FAEEDA", "Paper 17": "#FAEEDA", "Paper 18": "#FAEEDA",
  "Paper 19": "#FAEEDA", "Paper 20": "#FAEEDA",
}

function openLink(url) {
  if (!url) return alert("Link coming soon.")
  window.open(url, "_blank", "noopener,noreferrer")
}

export default function Paper({ paper, goBack, batch }) {
  if (!paper) return null

  const parts      = paper.split('–')
  const paperCode  = parts[0].trim()
  const paperTitle = parts[1]?.trim() || ''
  const rawData    = paperDatabase[paperCode] || { questions: [] }

  const isPaper10      = rawData.type === "paper10_special"
  const isSeminar      = rawData.type === "seminar_special"
  const isDissertation = rawData.type === "dissertation_special"
  const isSenior       = batch === "2024-26"

  const firstYearPapers = [
    "Paper 01","Paper 02","Paper 03","Paper 04","Paper 05",
    "Paper 06","Paper 07","Paper 08","Paper 09",
  ]
  const showStandard = !(isSenior && firstYearPapers.includes(paperCode))

  const accent = SEM_ACCENT[paperCode] || "#1D9E75"
  const bg     = SEM_BG[paperCode]     || "#E1F5EE"

  const semLabel = {
    "Paper 01": "Semester I",  "Paper 02": "Semester I",
    "Paper 03": "Semester I",  "Paper 04": "Semester I",  "Paper 05": "Semester I",
    "Paper 06": "Semester II", "Paper 07": "Semester II",
    "Paper 08": "Semester II", "Paper 09": "Semester II", "Paper 10": "Semester II",
    "Paper 11": "Semester III","Paper 12": "Semester III",
    "Paper 13": "Semester III","Paper 14": "Semester III","Paper 15": "Semester III",
    "Paper 16": "Semester IV", "Paper 17": "Semester IV",
    "Paper 18": "Semester IV", "Paper 19": "Semester IV", "Paper 20": "Semester IV",
  }[paperCode] || ""

  return (
    <div style={{
      fontFamily: "'Plus Jakarta Sans',sans-serif",
      background: '#F5F7F6', minHeight: '100vh',
    }}>

      {/* ── HEADER ── */}
      <div style={{
        background: `linear-gradient(160deg,${bg},#f8faf9 60%,#fff 100%)`,
        padding: 'clamp(28px,4vw,44px) clamp(16px,4vw,32px)',
        borderBottom: `1px solid ${accent}20`,
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>

          {/* Back button */}
          <button onClick={goBack} style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            background: 'none', border: `1.5px solid ${accent}30`,
            borderRadius: '100px', padding: '7px 16px',
            fontSize: '12px', fontWeight: '600', color: accent,
            cursor: 'pointer', marginBottom: '24px',
          }}>← Back</button>

          {/* Breadcrumb pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px',
            flexWrap: 'wrap', marginBottom: '14px' }}>
            <span style={{
              padding: '3px 12px', borderRadius: '100px',
              fontSize: '11px', fontWeight: '700',
              background: bg, color: accent,
            }}>{semLabel}</span>
            <span style={{ fontSize: '11px', color: '#8FA89E' }}>›</span>
            <span style={{
              padding: '3px 12px', borderRadius: '100px',
              fontSize: '11px', fontWeight: '700',
              background: `${accent}15`, color: accent,
            }}>{paperCode}</span>
            <span style={{
              padding: '3px 12px', borderRadius: '100px',
              fontSize: '10px', fontWeight: '600',
              background: isSenior ? '#E1F5EE' : '#E6F1FB',
              color: isSenior ? '#085041' : '#0C447C',
            }}>
              {isSenior ? 'Senior · 2024–26' : 'Junior · 2025–27'}
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: "'Lora',serif",
            fontSize: 'clamp(24px,4vw,42px)',
            fontWeight: '600', color: '#0D1A16',
            lineHeight: '1.2', marginBottom: '10px',
          }}>{paperTitle}</h1>

          <p style={{ fontSize: '13px', color: '#5A7A6E' }}>
            Access class notes and previous year question papers.
          </p>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{
        maxWidth: '900px', margin: '0 auto',
        padding: 'clamp(24px,4vw,44px) clamp(16px,4vw,32px)',
      }}>

        {/* ── PAPER 10 ── */}
        {isPaper10 && !isSenior && (
          <ResourceCard
            emoji="📂"
            title="Colloquium Files"
            desc="Access presentation files and documents for Paper 10."
            label="Open Drive Folder"
            accent={accent} bg={bg}
            onClick={() => openLink(rawData.junior_drive)}
          />
        )}

        {isPaper10 && isSenior && (
          <ArchivedCard />
        )}

        {/* ── SEMINAR ── */}
        {isSeminar && (
          <SpecialSection
            title="Seminar Resources"
            desc="Presentation files and materials for Paper 15."
            accent={accent} bg={bg}
            items={rawData.senior_seminars}
          />
        )}

        {/* ── DISSERTATION ── */}
        {isDissertation && (
          <SpecialSection
            title="Dissertation Theses"
            desc="Submitted theses and research documents for Paper 20."
            accent={accent} bg={bg}
            items={rawData.senior_theses}
          />
        )}

        {/* ── STANDARD PAPERS ── */}
        {!isPaper10 && !isSeminar && !isDissertation && (
          showStandard ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))',
              gap: '16px',
            }}>

              {/* Class Notes */}
              {rawData.drive_link ? (
                <ResourceCard
                  emoji="📁"
                  title="Class Notes"
                  desc="Student notes, slides and reference materials shared on Google Drive."
                  label="Open Drive Folder"
                  accent={accent} bg={bg}
                  onClick={() => openLink(rawData.drive_link)}
                />
              ) : (
                <EmptyCard
                  emoji="📁"
                  title="Class Notes"
                  message="Notes not available yet for this paper."
                />
              )}

              {/* Question Bank — multiple for Paper 19 */}
              {paperCode === "Paper 19" ? (
                <div style={{
                  background: '#fff',
                  border: `1.5px solid ${accent}15`,
                  borderRadius: '20px', padding: '24px',
                }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '13px',
                    background: bg, fontSize: '22px',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', marginBottom: '14px',
                  }}>📝</div>
                  <h3 style={{ fontFamily: "'Lora',serif", fontSize: '18px',
                    fontWeight: '600', color: '#0D1A16', marginBottom: '4px' }}>
                    Question Banks
                  </h3>
                  <p style={{ fontSize: '12px', color: '#5A7A6E',
                    marginBottom: '16px', lineHeight: '1.5' }}>
                    Previous year papers for each elective track.
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {rawData.questions.map((q, i) => (
                      <button key={i} onClick={() => openLink(q.file)} style={{
                        background: bg, border: `1px solid ${accent}20`,
                        borderRadius: '10px', padding: '11px 14px',
                        fontSize: '13px', fontWeight: '500', color: '#0D1A16',
                        cursor: 'pointer', textAlign: 'left',
                        display: 'flex', justifyContent: 'space-between',
                        alignItems: 'center', transition: 'all 0.15s',
                      }}>
                        {q.title}
                        <span style={{ fontSize: '12px',
                          color: accent, fontWeight: '600' }}>↗</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : rawData.questions?.[0]?.file ? (
                <ResourceCard
                  emoji="📝"
                  title="Question Bank"
                  desc="Previous year question papers from official ISI database."
                  label="Open Question Bank"
                  accent={accent} bg={bg}
                  onClick={() => openLink(rawData.questions[0].file)}
                />
              ) : (
                <EmptyCard
                  emoji="📝"
                  title="Question Bank"
                  message="Question bank not available yet."
                />
              )}
            </div>
          ) : (
            <ArchivedCard />
          )
        )}
      </div>
    </div>
  )
}

// ── RESOURCE CARD ──────────────────────────────────────────────
function ResourceCard({ emoji, title, desc, label, accent, bg, onClick }) {
  return (
    <div className="card-hover" onClick={onClick} style={{
      background: '#fff', border: `1.5px solid ${accent}15`,
      borderRadius: '20px', padding: '28px', cursor: 'pointer',
      display: 'flex', flexDirection: 'column', gap: '0',
    }}>
      {/* Icon */}
      <div style={{
        width: '52px', height: '52px', borderRadius: '14px',
        background: bg, fontSize: '24px',
        display: 'flex', alignItems: 'center',
        justifyContent: 'center', marginBottom: '16px',
      }}>{emoji}</div>

      {/* Text */}
      <h3 style={{ fontFamily: "'Lora',serif", fontSize: '20px',
        fontWeight: '600', color: '#0D1A16', marginBottom: '8px' }}>
        {title}
      </h3>
      <p style={{ fontSize: '13px', color: '#5A7A6E', lineHeight: '1.6',
        marginBottom: '20px', flex: 1 }}>
        {desc}
      </p>

      {/* CTA */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        background: `linear-gradient(135deg,${accent},${accent}CC)`,
        color: '#fff', borderRadius: '100px',
        padding: '10px 20px', fontSize: '13px',
        fontWeight: '600', width: 'fit-content',
      }}>
        {label} ↗
      </div>
    </div>
  )
}

// ── EMPTY CARD ──────────────────────────────────────────────────
function EmptyCard({ emoji, title, message }) {
  return (
    <div style={{
      background: '#fff',
      border: '1.5px dashed rgba(29,158,117,0.2)',
      borderRadius: '20px', padding: '28px',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', minHeight: '200px', gap: '10px',
    }}>
      <div style={{
        width: '52px', height: '52px', borderRadius: '14px',
        background: '#F5F7F6', fontSize: '24px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{emoji}</div>
      <h3 style={{ fontFamily: "'Lora',serif", fontSize: '16px',
        fontWeight: '600', color: '#0D1A16' }}>{title}</h3>
      <p style={{ fontSize: '12px', color: '#8FA89E', lineHeight: '1.5' }}>
        {message}
      </p>
    </div>
  )
}

// ── ARCHIVED CARD ───────────────────────────────────────────────
function ArchivedCard() {
  return (
    <div style={{
      background: '#fff',
      border: '1.5px solid rgba(29,158,117,0.1)',
      borderRadius: '20px', padding: '48px',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', gap: '12px',
    }}>
      <div style={{
        width: '60px', height: '60px', borderRadius: '16px',
        background: '#F5F7F6', fontSize: '28px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>📦</div>
      <h3 style={{ fontFamily: "'Lora',serif", fontSize: '18px',
        fontWeight: '600', color: '#0D1A16' }}>
        Archived for Senior Cohort
      </h3>
      <p style={{ fontSize: '13px', color: '#8FA89E', maxWidth: '320px',
        lineHeight: '1.6' }}>
        These first-year materials are not accessible from the senior batch view.
        Switch to the junior cohort to access them.
      </p>
    </div>
  )
}

// ── SPECIAL SECTION (Seminar / Dissertation) ────────────────────
function SpecialSection({ title, desc, accent, bg, items }) {
  return (
    <div style={{
      background: '#fff', border: `1.5px solid ${accent}15`,
      borderRadius: '20px', padding: '28px',
    }}>
      <div style={{
        borderLeft: `4px solid ${accent}`,
        paddingLeft: '14px', marginBottom: '20px',
      }}>
        <h3 style={{ fontFamily: "'Lora',serif", fontSize: '20px',
          fontWeight: '600', color: '#0D1A16', marginBottom: '4px' }}>
          {title}
        </h3>
        <p style={{ fontSize: '13px', color: '#5A7A6E' }}>{desc}</p>
      </div>

      {items?.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {items.map((item, i) => (
            <button key={i}
              onClick={() => openLink(item.file)}
              style={{
                background: bg, border: `1px solid ${accent}15`,
                borderRadius: '12px', padding: '12px 16px',
                fontSize: '13px', fontWeight: '500', color: '#0D1A16',
                cursor: 'pointer', textAlign: 'left',
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              {item.title}
              <span style={{ fontSize: '12px', color: accent,
                fontWeight: '600' }}>↗</span>
            </button>
          ))}
        </div>
      ) : (
        <div style={{
          background: '#F5F7F6', borderRadius: '12px',
          padding: '24px', textAlign: 'center',
          fontSize: '13px', color: '#8FA89E', fontStyle: 'italic',
        }}>
          No files available yet — check back soon.
        </div>
      )}
    </div>
  )
}