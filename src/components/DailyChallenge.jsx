import { useState, useEffect } from "react"

// ── LIS QUESTION BANK ──────────────────────────────────────────

const TRIVIA = [
  { q: "Who developed the Dewey Decimal Classification system?", options: ["S.R. Ranganathan", "Melvil Dewey", "Charles Ammi Cutter", "Henry Bliss"], answer: 1 },
  { q: "What does MARC stand for?", options: ["Machine Accessible Record Catalogue", "Machine Readable Cataloguing", "Metadata and Resource Control", "Manual Archiving Reference Code"], answer: 1 },
  { q: "Ranganathan's 'Five Laws of Library Science' was published in which year?", options: ["1924", "1931", "1945", "1952"], answer: 1 },
  { q: "Which classification system uses facet analysis as its core principle?", options: ["DDC", "UDC", "Colon Classification", "LCC"], answer: 2 },
  { q: "What is the full form of OPAC?", options: ["Online Public Access Catalogue", "Open Protocol Access Centre", "Official Print Archive Catalogue", "Online Processing and Acquisition Control"], answer: 0 },
  { q: "Dublin Core has how many core metadata elements?", options: ["10", "12", "15", "18"], answer: 2 },
  { q: "Who is known as the 'Father of Library Science'?", options: ["Melvil Dewey", "S.R. Ranganathan", "Charles Cutter", "Paul Otlet"], answer: 1 },
  { q: "INFLIBNET stands for?", options: ["Information Library Network", "Integrated Library and Information Network", "Indian Library and Information Network", "Information and Library Network"], answer: 3 },
  { q: "Which standard is used for bibliographic description of library materials?", options: ["AACR2 / RDA", "ISO 9001", "MARC 856", "Dublin Core"], answer: 0 },
  { q: "Bibliometrics was coined by which scholar?", options: ["Eugene Garfield", "Alan Pritchard", "Derek de Solla Price", "Calvin Mooers"], answer: 1 },
  { q: "The first law of library science by Ranganathan states:", options: ["Every book its reader", "Books are for use", "Save the time of the reader", "Library is a growing organism"], answer: 1 },
  { q: "Koha is an example of which type of software?", options: ["Digital preservation", "Library Management System", "Reference management", "Institutional repository"], answer: 1 },
  { q: "DSpace is primarily used for:", options: ["Cataloguing", "Institutional repositories", "OPAC management", "Circulation"], answer: 1 },
  { q: "Which protocol is used for harvesting metadata in digital libraries?", options: ["HTTP", "OAI-PMH", "Z39.50", "RSS"], answer: 1 },
  { q: "H-index was proposed by:", options: ["Eugene Garfield", "Jorge Hirsch", "Alan Pritchard", "S.R. Ranganathan"], answer: 1 },
  { q: "What does ISBN stand for?", options: ["International Standard Book Number", "Integrated System Bibliographic Number", "Indian Standard Book Notation", "International Serial Bibliography Number"], answer: 0 },
  { q: "Which of these is a controlled vocabulary?", options: ["Google Scholar", "LCSH", "DOI", "BibTeX"], answer: 1 },
  { q: "The Colon Classification uses which type of notation?", options: ["Pure numerical", "Mixed — letters and symbols", "Alphabetical only", "Binary"], answer: 1 },
  { q: "Scientometrics primarily deals with:", options: ["Digital archiving", "Quantitative analysis of science", "Library automation", "Reference services"], answer: 1 },
  { q: "Which organisation maintains the MARC standards?", options: ["UNESCO", "IFLA", "Library of Congress", "ISO"], answer: 2 },
]

const UNSCRAMBLE = [
  { scrambled: "GLCIANOAUGT", answer: "CATALOGUING", hint: "Organising library materials by description" },
  { scrambled: "ADMETATA", answer: "METADATA", hint: "Data about data" },
  { scrambled: "TAEXNIDION", answer: "INDEXATION", hint: "Process of creating an index" },
  { scrambled: "IGOITINDISTA", answer: "DIGITISATION", hint: "Converting physical to digital" },
  { scrambled: "ATTROHIY", answer: "AUTHORITY", hint: "Controlled form of a name or subject" },
  { scrambled: "AIBBLIPGOYRH", answer: "BIBLIOGRAPHY", hint: "List of sources or references" },
  { scrambled: "HSTAURUE", answer: "THESAURUS", hint: "Controlled vocabulary tool" },
  { scrambled: "OATCSNISI", answer: "ACCESSION", hint: "Process of adding an item to a library collection" },
  { scrambled: "TCOBARIS", answer: "ABSTRACT", hint: "Brief summary of a document" },
  { scrambled: "OILATCISNSCIF", answer: "CLASSIFICATION", hint: "Systematic arrangement of knowledge" },
  { scrambled: "RRTYISEOPOT", answer: "REPOSITORY", hint: "Central location for storing digital content" },
  { scrambled: "TNOANTIO", answer: "NOTATION", hint: "Symbols used in classification schemes" },
  { scrambled: "ARCHINVGI", answer: "ARCHIVING", hint: "Preserving records for long-term access" },
  { scrambled: "YCTRIILBLAA", answer: "LIBRARY", hint: "A collection of books and resources" },
  { scrambled: "SNIOICCRUL", answer: "CIRCULATION", hint: "Lending and returning of library materials" },
]

const MATCH = [
  {
    terms:       ["DDC",        "MARC",                      "OPAC",                      "AACR2"],
    definitions: ["Dewey Decimal Classification — numerical scheme for organising knowledge", "Machine Readable Cataloguing — standard for encoding bibliographic data", "Online Public Access Catalogue — searchable library database", "Anglo-American Cataloguing Rules — standard for bibliographic description"],
    correct:     [0, 1, 2, 3],
  },
  {
    terms:       ["Bibliometrics", "Ontology",             "Metadata",      "LCSH"],
    definitions: ["Statistical analysis of publications and citations", "Formal representation of knowledge in a domain", "Structured data that describes other data", "Library of Congress Subject Headings — controlled vocabulary"],
    correct:     [0, 1, 2, 3],
  },
  {
    terms:       ["Dublin Core", "OAI-PMH",                              "DSpace",                  "Z39.50"],
    definitions: ["15-element metadata standard for web resources", "Protocol for harvesting metadata from digital repositories", "Open-source software for institutional repositories", "Protocol for information retrieval between library systems"],
    correct:     [0, 1, 2, 3],
  },
  {
    terms:       ["Facet",                  "Citation Index",                       "Thesaurus",                        "Abstract"],
    definitions: ["A characteristic of a subject used in faceted classification", "Tool for tracing citation relationships between publications", "Controlled vocabulary showing relationships between terms", "Brief summary of a document's content"],
    correct:     [0, 1, 2, 3],
  },
  {
    terms:       ["Recall",                        "Precision",                          "Recall Ratio",       "Relevance"],
    definitions: ["Proportion of relevant documents retrieved from a collection", "Proportion of retrieved documents that are relevant", "Number of relevant documents retrieved / total relevant documents", "The degree to which a document satisfies an information need"],
    correct:     [0, 1, 2, 3],
  },
]

// ── HELPERS ────────────────────────────────────────────────────

function todayKey() {
  return new Date().toISOString().slice(0, 10) // "2026-03-20"
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function pickType() {
  const types = ["trivia", "unscramble", "match"]
  // Use day of year so type rotates daily
  const day = Math.floor(Date.now() / 86400000)
  return types[day % 3]
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ── CONFETTI ────────────────────────────────────────────────────

function Confetti() {
  const pieces = Array.from({ length: 32 }, (_, i) => ({
    id: i,
    color: ['#1D9E75','#5DCAA5','#FAEEDA','#9FE1CB','#EEEDFE','#FFD700'][i % 6],
    left:  `${Math.random() * 100}%`,
    delay: `${Math.random() * 0.5}s`,
    size:  `${Math.random() * 8 + 5}px`,
  }))
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none',
      overflow: 'hidden', zIndex: 10 }}>
      {pieces.map(p => (
        <div key={p.id} style={{
          position: 'absolute', top: '-10px', left: p.left,
          width: p.size, height: p.size,
          background: p.color, borderRadius: '2px',
          animation: `fall 1.2s ${p.delay} ease-in forwards`,
        }} />
      ))}
      <style>{`
        @keyframes fall {
          0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(500px) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

// ── TRIVIA CHALLENGE ────────────────────────────────────────────

function TriviaChallenge({ onSolve }) {
  const [q]       = useState(() => pickRandom(TRIVIA))
  const [selected, setSelected] = useState(null)
  const [revealed, setReveal]   = useState(false)

  const submit = () => {
    if (selected === null) return
    setReveal(true)
    if (selected === q.answer) setTimeout(onSolve, 1000)
  }

  return (
    <div>
      <div style={{ fontSize: '10px', fontWeight: '700', color: '#1D9E75',
        textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '12px' }}>
        🧠 LIS Trivia
      </div>
      <p style={{ fontFamily: "'Lora',serif", fontSize: '16px',
        fontWeight: '600', color: '#0D1A16', lineHeight: '1.5',
        marginBottom: '18px' }}>{q.q}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px',
        marginBottom: '16px' }}>
        {q.options.map((opt, i) => {
          let bg = '#F5F7F6', border = 'rgba(29,158,117,0.15)', color = '#0D1A16'
          if (revealed) {
            if (i === q.answer) { bg = '#E1F5EE'; border = '#1D9E75'; color = '#085041' }
            else if (i === selected) { bg = '#FCEBEB'; border = '#E24B4A'; color = '#A32D2D' }
          } else if (selected === i) {
            bg = '#E1F5EE'; border = '#1D9E75'; color = '#085041'
          }
          return (
            <button key={i} onClick={() => !revealed && setSelected(i)} style={{
              background: bg, border: `1.5px solid ${border}`,
              borderRadius: '10px', padding: '10px 14px',
              fontSize: '13px', fontWeight: '500', color,
              cursor: revealed ? 'default' : 'pointer',
              textAlign: 'left', transition: 'all 0.15s',
            }}>
              {revealed && i === q.answer && '✓ '}
              {revealed && i === selected && i !== q.answer && '✗ '}
              {opt}
            </button>
          )
        })}
      </div>

      {!revealed && (
        <button onClick={submit} disabled={selected === null} style={{
          width: '100%', padding: '12px',
          background: selected !== null
            ? 'linear-gradient(135deg,#1D9E75,#0F6E56)'
            : '#E8EDEA',
          color: selected !== null ? '#fff' : '#8FA89E',
          border: 'none', borderRadius: '12px',
          fontSize: '13px', fontWeight: '600', cursor: 'pointer',
        }}>Submit Answer</button>
      )}

      {revealed && selected !== q.answer && (
        <div style={{ background: '#FCEBEB', borderRadius: '10px',
          padding: '10px 14px', fontSize: '13px', color: '#A32D2D',
          marginTop: '8px' }}>
          Not quite — the correct answer is <strong>{q.options[q.answer]}</strong>
        </div>
      )}
    </div>
  )
}

// ── UNSCRAMBLE CHALLENGE ────────────────────────────────────────

function UnscrambleChallenge({ onSolve }) {
  const [q]       = useState(() => pickRandom(UNSCRAMBLE))
  const [input,   setInput]   = useState('')
  const [status,  setStatus]  = useState(null) // null | 'correct' | 'wrong'

  const check = () => {
    if (input.trim().toUpperCase() === q.answer) {
      setStatus('correct')
      setTimeout(onSolve, 800)
    } else {
      setStatus('wrong')
    }
  }

  const letters = q.scrambled.split('')

  return (
    <div>
      <div style={{ fontSize: '10px', fontWeight: '700', color: '#3C3489',
        textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '12px' }}>
        🔤 Unscramble the Term
      </div>
      <p style={{ fontSize: '13px', color: '#5A7A6E', marginBottom: '14px',
        lineHeight: '1.5' }}>
        <em>{q.hint}</em>
      </p>

      {/* Scrambled letters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px',
        marginBottom: '18px', justifyContent: 'center' }}>
        {letters.map((l, i) => (
          <div key={i} style={{
            width: '36px', height: '36px', borderRadius: '8px',
            background: '#EEEDFE', border: '1.5px solid rgba(60,52,137,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Lora',serif", fontSize: '16px', fontWeight: '700',
            color: '#3C3489',
          }}>{l}</div>
        ))}
      </div>

      <input
        value={input}
        onChange={e => { setInput(e.target.value.toUpperCase()); setStatus(null) }}
        onKeyDown={e => e.key === 'Enter' && check()}
        placeholder="Type your answer..."
        maxLength={q.answer.length + 2}
        style={{
          width: '100%', padding: '11px 14px', marginBottom: '10px',
          border: `1.5px solid ${
            status === 'correct' ? '#1D9E75'
            : status === 'wrong' ? '#E24B4A'
            : 'rgba(29,158,117,0.2)'}`,
          borderRadius: '10px', fontSize: '14px', outline: 'none',
          fontFamily: "'Plus Jakarta Sans',sans-serif",
          fontWeight: '600', color: '#0D1A16', letterSpacing: '0.08em',
          background: status === 'correct' ? '#E1F5EE'
            : status === 'wrong' ? '#FCEBEB' : '#fff',
          textTransform: 'uppercase', textAlign: 'center',
        }}
      />

      {status === 'wrong' && (
        <p style={{ fontSize: '12px', color: '#A32D2D', marginBottom: '8px',
          textAlign: 'center' }}>
          Not quite — try again!
        </p>
      )}

      <button onClick={check} style={{
        width: '100%', padding: '12px',
        background: 'linear-gradient(135deg,#3C3489,#6B62CC)',
        color: '#fff', border: 'none', borderRadius: '12px',
        fontSize: '13px', fontWeight: '600', cursor: 'pointer',
      }}>Check Answer</button>
    </div>
  )
}

// ── MATCH CHALLENGE ─────────────────────────────────────────────

function MatchChallenge({ onSolve }) {
  const [q] = useState(() => {
    const raw = pickRandom(MATCH)
    // shuffle definitions with their indices tracked
    const defIndices = shuffle([0, 1, 2, 3])
    return {
      terms: raw.terms,
      definitions: defIndices.map(i => raw.definitions[i]),
      defIndices,
    }
  })

  const [selected, setSelected]   = useState({}) // termIdx -> defIdx (in shuffled)
  const [revealed, setReveal]     = useState(false)

  const selectDef = (termIdx, defShuffledIdx) => {
    if (revealed) return
    setSelected(s => ({ ...s, [termIdx]: defShuffledIdx }))
  }

  const checkAll = () => {
    setReveal(true)
    // correct if each term maps to the definition that was originally at index termIdx
    const allCorrect = q.terms.every((_, ti) => {
      const chosenShuffled = selected[ti]
      return q.defIndices[chosenShuffled] === ti
    })
    if (allCorrect) setTimeout(onSolve, 1000)
  }

  const allSelected = Object.keys(selected).length === q.terms.length

  return (
    <div>
      <div style={{ fontSize: '10px', fontWeight: '700', color: '#633806',
        textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '12px' }}>
        🔗 Match the Definition
      </div>
      <p style={{ fontSize: '12px', color: '#5A7A6E', marginBottom: '16px' }}>
        Match each term on the left to its correct definition on the right.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px',
        marginBottom: '16px' }}>

        {/* Terms */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {q.terms.map((term, ti) => (
            <div key={ti} style={{
              background: '#FAEEDA',
              border: '1.5px solid rgba(99,56,6,0.2)',
              borderRadius: '10px', padding: '10px 12px',
              fontSize: '12px', fontWeight: '700', color: '#633806',
              minHeight: '44px', display: 'flex', alignItems: 'center',
            }}>{term}</div>
          ))}
        </div>

        {/* Definitions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {q.definitions.map((def, di) => {
            // which term has selected this def?
            const matchedTerm = Object.entries(selected).find(([, d]) => d === di)
            const termIdx = matchedTerm ? parseInt(matchedTerm[0]) : null

            let bg = '#F5F7F6'
            let border = 'rgba(29,158,117,0.15)'
            if (revealed && termIdx !== null) {
              const isCorrect = q.defIndices[di] === termIdx
              bg = isCorrect ? '#E1F5EE' : '#FCEBEB'
              border = isCorrect ? '#1D9E75' : '#E24B4A'
            } else if (termIdx !== null) {
              bg = '#E1F5EE'; border = '#1D9E75'
            }

            return (
              <div key={di} style={{
                background: bg, border: `1.5px solid ${border}`,
                borderRadius: '10px', padding: '8px 10px',
                fontSize: '11px', color: '#2E4F44', lineHeight: '1.4',
                minHeight: '44px', cursor: 'pointer', transition: 'all 0.12s',
                position: 'relative',
              }}>
                {termIdx !== null && (
                  <span style={{
                    position: 'absolute', top: '4px', right: '6px',
                    fontSize: '9px', fontWeight: '700',
                    color: '#1D9E75', background: '#E1F5EE',
                    padding: '1px 5px', borderRadius: '100px',
                  }}>{q.terms[termIdx]}</span>
                )}
                <p style={{ fontSize: '11px', color: '#2E4F44',
                  lineHeight: '1.4', paddingRight: termIdx !== null ? '40px' : 0 }}>
                  {def}
                </p>
                {/* Assign buttons */}
                {!revealed && (
                  <div style={{ display: 'flex', gap: '3px', marginTop: '5px',
                    flexWrap: 'wrap' }}>
                    {q.terms.map((t, ti) => (
                      <button key={ti} onClick={() => selectDef(ti, di)} style={{
                        padding: '2px 7px', borderRadius: '100px', border: 'none',
                        fontSize: '9px', fontWeight: '700', cursor: 'pointer',
                        background: selected[ti] === di ? '#1D9E75' : 'rgba(29,158,117,0.12)',
                        color: selected[ti] === di ? '#fff' : '#085041',
                      }}>{t}</button>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {!revealed && (
        <button onClick={checkAll} disabled={!allSelected} style={{
          width: '100%', padding: '12px',
          background: allSelected
            ? 'linear-gradient(135deg,#633806,#A85C0A)'
            : '#E8EDEA',
          color: allSelected ? '#fff' : '#8FA89E',
          border: 'none', borderRadius: '12px',
          fontSize: '13px', fontWeight: '600', cursor: 'pointer',
        }}>Check Matches</button>
      )}

      {revealed && (
        <div style={{
          background: allSelected && q.terms.every((_, ti) =>
            q.defIndices[selected[ti]] === ti)
            ? '#E1F5EE' : '#FCEBEB',
          borderRadius: '10px', padding: '10px',
          fontSize: '13px', fontWeight: '600', textAlign: 'center',
          color: '#085041',
        }}>
          {q.terms.every((_, ti) => q.defIndices[selected[ti]] === ti)
            ? '🎉 All correct!'
            : '❌ Some were off — review and try again'}
        </div>
      )}
    </div>
  )
}

// ── MAIN MODAL ──────────────────────────────────────────────────

export default function DailyChallenge({ onClose }) {
  const [solved,  setSolved]  = useState(false)
  const [points,  setPoints]  = useState(0)
  const type = pickType()

  const handleSolve = () => {
    setSolved(true)

    // Update streak in localStorage
    const today = todayKey()
    const stored = JSON.parse(localStorage.getItem('lis_streak') || '{}')
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10)
    const newStreak = stored.lastDate === yesterday ? (stored.streak || 0) + 1
      : stored.lastDate === today ? stored.streak
      : 1
    const newPoints = (stored.points || 0) + 10
    localStorage.setItem('lis_streak', JSON.stringify({
      streak: newStreak,
      lastDate: today,
      points: newPoints,
    }))
    setPoints(newPoints)
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(13,26,22,0.7)', backdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px', fontFamily: "'Plus Jakarta Sans',sans-serif",
    }}>
      <div style={{
        background: '#fff', borderRadius: '24px',
        width: '100%', maxWidth: '520px',
        boxShadow: '0 24px 64px rgba(13,26,22,0.3)',
        position: 'relative', overflow: 'hidden',
        maxHeight: '90vh', overflowY: 'auto',
      }}>
        {solved && <Confetti />}

        {/* Top bar */}
        <div style={{
          background: 'linear-gradient(135deg,#0D1A16,#1A302A)',
          padding: '16px 20px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '8px',
              background: 'rgba(29,158,117,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '16px',
            }}>⚡</div>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>
                Daily LIS Challenge
              </div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.45)' }}>
                Solve to earn 10 points
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{
            background: 'rgba(255,255,255,0.1)', border: 'none',
            borderRadius: '100px', padding: '5px 12px',
            fontSize: '12px', color: 'rgba(255,255,255,0.6)',
            cursor: 'pointer',
          }}>Skip</button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          {!solved ? (
            type === 'trivia'     ? <TriviaChallenge   onSolve={handleSolve} /> :
            type === 'unscramble' ? <UnscrambleChallenge onSolve={handleSolve} /> :
                                    <MatchChallenge     onSolve={handleSolve} />
          ) : (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: '56px', marginBottom: '12px' }}>🎉</div>
              <h2 style={{
                fontFamily: "'Lora',serif", fontSize: '24px',
                fontWeight: '600', color: '#0D1A16', marginBottom: '8px',
              }}>Well done!</h2>
              <p style={{ fontSize: '14px', color: '#5A7A6E', marginBottom: '20px' }}>
                You've solved today's LIS challenge.
              </p>
              <div style={{
                display: 'flex', justifyContent: 'center', gap: '16px',
                marginBottom: '24px', flexWrap: 'wrap',
              }}>
                <div style={{
                  background: '#E1F5EE', borderRadius: '14px',
                  padding: '12px 20px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: '22px', fontWeight: '700',
                    color: '#085041' }}>+10</div>
                  <div style={{ fontSize: '11px', color: '#5A7A6E',
                    fontWeight: '600' }}>Points earned</div>
                </div>
                <div style={{
                  background: '#FAEEDA', borderRadius: '14px',
                  padding: '12px 20px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: '22px', fontWeight: '700',
                    color: '#633806' }}>
                    {JSON.parse(localStorage.getItem('lis_streak') || '{}').streak || 1}🔥
                  </div>
                  <div style={{ fontSize: '11px', color: '#5A7A6E',
                    fontWeight: '600' }}>Day streak</div>
                </div>
              </div>
              <button onClick={onClose} style={{
                background: 'linear-gradient(135deg,#1D9E75,#0F6E56)',
                color: '#fff', border: 'none', borderRadius: '100px',
                padding: '12px 32px', fontSize: '14px',
                fontWeight: '700', cursor: 'pointer',
              }}>Continue →</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── STREAK CARD (exported for Home.jsx) ─────────────────────────

export function StreakCard({ onOpen }) {
  const stored  = JSON.parse(localStorage.getItem('lis_streak') || '{}')
  const today   = todayKey()
  const solved  = stored.lastDate === today
  const streak  = stored.streak  || 0
  const points  = stored.points  || 0

  return (
    <div onClick={onOpen} className="card-hover" style={{
      background: solved
        ? 'linear-gradient(135deg,#E1F5EE,#9FE1CB20)'
        : '#fff',
      border: `1.5px solid ${solved ? '#1D9E75' : 'rgba(29,158,117,0.12)'}`,
      borderRadius: '18px', padding: '20px',
      cursor: 'pointer', gridColumn: 'span 1',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', marginBottom: '12px' }}>
        <div style={{
          width: '44px', height: '44px', borderRadius: '12px',
          background: solved ? '#1D9E75' : '#FAEEDA',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '20px',
        }}>{solved ? '✅' : '⚡'}</div>
        {solved && (
          <span style={{
            padding: '3px 10px', borderRadius: '100px',
            fontSize: '10px', fontWeight: '700',
            background: '#1D9E75', color: '#fff',
          }}>Done today</span>
        )}
      </div>
      <div style={{ fontFamily: "'Lora',serif", fontSize: '15px',
        fontWeight: '600', color: '#0D1A16', marginBottom: '4px' }}>
        Daily Challenge
      </div>
      <p style={{ fontSize: '12px', color: '#5A7A6E', marginBottom: '12px' }}>
        {solved ? `Great work! Come back tomorrow.` : 'Solve today\'s LIS puzzle'}
      </p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <div style={{ background: '#FAEEDA', borderRadius: '8px',
          padding: '5px 10px', textAlign: 'center' }}>
          <div style={{ fontSize: '14px', fontWeight: '700',
            color: '#633806' }}>{streak}🔥</div>
          <div style={{ fontSize: '9px', color: '#8FA89E',
            fontWeight: '600' }}>Streak</div>
        </div>
        <div style={{ background: '#E1F5EE', borderRadius: '8px',
          padding: '5px 10px', textAlign: 'center' }}>
          <div style={{ fontSize: '14px', fontWeight: '700',
            color: '#085041' }}>{points}</div>
          <div style={{ fontSize: '9px', color: '#8FA89E',
            fontWeight: '600' }}>Points</div>
        </div>
      </div>
    </div>
  )
}