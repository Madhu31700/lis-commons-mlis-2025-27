import { useState, useEffect } from "react"
import { supabase } from "../supabase"
import * as XLSX from "xlsx"

const STATUS_COLORS = {
  submitted:  { bg: "#E1F5EE", color: "#085041", label: "Submitted" },
  reviewed:   { bg: "#E6F1FB", color: "#0C447C", label: "Reviewed" },
  shortlisted:{ bg: "#FAEEDA", color: "#633806", label: "Shortlisted" },
  placed:     { bg: "#EAF3DE", color: "#27500A", label: "Placed" },
  withdrawn:  { bg: "#FCEBEB", color: "#A32D2D", label: "Withdrawn" },
}

function timeAgo(dateStr) {
  if (!dateStr) return "—"
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000)
  if (diff < 86400)  return `${Math.floor(diff/3600)}h ago`
  return `${Math.floor(diff/86400)}d ago`
}

function Avatar({ url, name, size = 36 }) {
  const [err, setErr] = useState(false)
  if (url && !err) return (
    <img src={url} onError={() => setErr(true)}
      style={{ width: size, height: size, borderRadius: "50%",
        objectFit: "cover", border: "1.5px solid #9FE1CB", flexShrink: 0 }}
      alt={name} />
  )
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", flexShrink: 0,
      background: "linear-gradient(135deg,#1D9E75,#5DCAA5)",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontSize: size * 0.38, fontWeight: "700",
    }}>{name?.charAt(0)?.toUpperCase() || "S"}</div>
  )
}

export default function PlacementDashboard({ goBack }) {
  const [submissions, setSubmissions] = useState([])
  const [loading,     setLoading]     = useState(true)
  const [selected,    setSelected]    = useState(null)
  const [search,      setSearch]      = useState("")
  const [filter,      setFilter]      = useState("all")
  const [noteText,    setNoteText]    = useState("")
  const [savingNote,  setSavingNote]  = useState(false)

  useEffect(() => { fetchAll() }, [])

  const fetchAll = async () => {
    setLoading(true)
    const { data } = await supabase
      .from("internship_submissions")
      .select("*")
      .order("submitted_at", { ascending: false })
    setSubmissions(data || [])
    setLoading(false)
  }

  const updateStatus = async (id, status) => {
    await supabase
      .from("internship_submissions")
      .update({ status })
      .eq("id", id)
    setSubmissions(s => s.map(x => x.id === id ? { ...x, status } : x))
    if (selected?.id === id) setSelected(s => ({ ...s, status }))
  }

  const saveNote = async () => {
    if (!selected) return
    setSavingNote(true)
    await supabase
      .from("internship_submissions")
      .update({ admin_notes: noteText })
      .eq("id", selected.id)
    setSubmissions(s => s.map(x => x.id === selected.id
      ? { ...x, admin_notes: noteText } : x))
    setSelected(s => ({ ...s, admin_notes: noteText }))
    setSavingNote(false)
  }

  const openDetail = (sub) => {
    setSelected(sub)
    setNoteText(sub.admin_notes || "")
  }

  // Export to Excel
  const exportExcel = () => {
    const rows = filtered.map(s => ({
      "Name":                 s.name || "",
      "Roll Number":          s.roll_number || "",
      "Batch":                s.batch || "",
      "Email":                s.email || "",
      "Phone":                s.phone || "",
      "LinkedIn":             s.linkedin_url || "",
      "Bio":                  s.bio || "",
      "Available From":       s.availability_from || "",
      "Available To":         s.availability_to || "",
      "Preferred Location":   s.preferred_location || "",
      "Willing to Relocate":  s.willing_to_relocate || "",
      "Internship Types":     (s.internship_type || []).join(", "),
      "Preferred Domains":    (s.preferred_domains || []).join(", "),
      "1st Org Preference":   s.org_preference_1 || "",
      "2nd Org Preference":   s.org_preference_2 || "",
      "3rd Org Preference":   s.org_preference_3 || "",
      "Skills":               (s.skills || []).join(", "),
      "Tools":                (s.tools || []).join(", "),
      "Languages":            (s.languages || []).join(", "),
      "Extra Info":           s.extra_info || "",
      "CV URL":               s.cv_url || "",
      "Photo URL":            s.photo_url || "",
      "Status":               s.status || "",
      "Admin Notes":          s.admin_notes || "",
      "Submitted At":         s.submitted_at
        ? new Date(s.submitted_at).toLocaleString("en-IN") : "",
    }))

    const ws = XLSX.utils.json_to_sheet(rows)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Internship Profiles")

    // Auto column widths
    const cols = Object.keys(rows[0] || {}).map(k => ({
      wch: Math.max(k.length, 15)
    }))
    ws["!cols"] = cols

    XLSX.writeFile(wb, `DRTC_Internship_Profiles_${new Date().toISOString().slice(0,10)}.xlsx`)
  }

  const filtered = submissions.filter(s => {
    const matchSearch = search === "" ||
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.email?.toLowerCase().includes(search.toLowerCase()) ||
      s.roll_number?.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === "all" || s.status === filter
    return matchSearch && matchFilter
  })

  const inp = {
    padding: "9px 14px",
    border: "1.5px solid rgba(29,158,117,0.2)",
    borderRadius: "10px", fontSize: "13px", outline: "none",
    fontFamily: "'Plus Jakarta Sans',sans-serif", color: "#0D1A16",
    background: "#fff",
  }

  return (
    <div style={{
      fontFamily: "'Plus Jakarta Sans',sans-serif",
      background: "#F5F7F6", minHeight: "100vh",
    }}>

      {/* ── HEADER ── */}
      <div style={{
        background: "linear-gradient(160deg,#0D1A16,#1A302A)",
        padding: "clamp(28px,4vw,40px) clamp(16px,4vw,32px)",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <button onClick={goBack} style={{
            background: "none", border: "none", cursor: "pointer",
            color: "rgba(255,255,255,0.5)", fontSize: "13px",
            fontWeight: "500", marginBottom: "16px", padding: 0,
          }}>← Back to Admin</button>

          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "flex-end", flexWrap: "wrap", gap: "16px",
          }}>
            <div>
              <h1 style={{
                fontFamily: "'Lora',serif",
                fontSize: "clamp(22px,3vw,32px)",
                fontWeight: "600", color: "#fff", marginBottom: "6px",
              }}>Placement Dashboard</h1>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)" }}>
                {submissions.length} total submissions ·{" "}
                {submissions.filter(s => s.status === "submitted").length} pending review
              </p>
            </div>

            <button onClick={exportExcel} style={{
              display: "flex", alignItems: "center", gap: "8px",
              background: "linear-gradient(135deg,#1D9E75,#0F6E56)",
              color: "#fff", border: "none", borderRadius: "100px",
              padding: "10px 22px", fontSize: "13px", fontWeight: "600",
              cursor: "pointer",
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="#fff" strokeWidth="2">
                <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
              Export to Excel
            </button>
          </div>

          {/* Stats row */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(100px,1fr))",
            gap: "10px", marginTop: "20px",
          }}>
            {Object.entries(STATUS_COLORS).map(([key, val]) => (
              <div key={key} style={{
                background: "rgba(255,255,255,0.06)",
                borderRadius: "12px", padding: "12px 16px", textAlign: "center",
                cursor: "pointer",
                border: filter === key
                  ? "1.5px solid #1D9E75"
                  : "1.5px solid transparent",
              }} onClick={() => setFilter(filter === key ? "all" : key)}>
                <div style={{
                  fontSize: "22px", fontWeight: "700",
                  color: "#fff", marginBottom: "2px",
                }}>
                  {submissions.filter(s => s.status === key).length}
                </div>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)",
                  fontWeight: "600", textTransform: "uppercase",
                  letterSpacing: "0.06em" }}>
                  {val.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        maxWidth: "1200px", margin: "0 auto",
        padding: "clamp(20px,3vw,32px) clamp(16px,4vw,32px)",
        display: "flex", gap: "20px", flexWrap: "wrap",
        alignItems: "flex-start",
      }}>

        {/* ── LEFT: LIST ── */}
        <div style={{ flex: "1 1 320px", minWidth: "280px" }}>

          {/* Search + filter */}
          <div style={{ display: "flex", gap: "10px",
            marginBottom: "16px", flexWrap: "wrap" }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search name, roll, email..."
              style={{ ...inp, flex: 1, minWidth: "160px" }}
            />
            <select value={filter} onChange={e => setFilter(e.target.value)}
              style={{ ...inp }}>
              <option value="all">All Statuses</option>
              {Object.entries(STATUS_COLORS).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 0",
              color: "#1D9E75", fontSize: "14px" }}>Loading...</div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <p style={{ color: "#5A7A6E" }}>No submissions found.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {filtered.map(sub => {
                const st = STATUS_COLORS[sub.status] || STATUS_COLORS.submitted
                const isSelected = selected?.id === sub.id
                return (
                  <div key={sub.id} onClick={() => openDetail(sub)}
                    style={{
                      background: "#fff",
                      border: `1.5px solid ${isSelected
                        ? "#1D9E75"
                        : "rgba(29,158,117,0.12)"}`,
                      borderRadius: "14px", padding: "14px 16px",
                      cursor: "pointer", transition: "all 0.15s",
                    }}>
                    <div style={{ display: "flex", alignItems: "center",
                      gap: "10px" }}>
                      <Avatar url={sub.photo_url} name={sub.name} size={38} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontSize: "14px", fontWeight: "600",
                          color: "#0D1A16", marginBottom: "2px",
                          whiteSpace: "nowrap", overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}>{sub.name || "—"}</div>
                        <div style={{ fontSize: "11px", color: "#5A7A6E" }}>
                          {sub.roll_number} · {sub.batch}
                        </div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column",
                        alignItems: "flex-end", gap: "4px", flexShrink: 0 }}>
                        <span style={{
                          padding: "2px 8px", borderRadius: "100px",
                          fontSize: "10px", fontWeight: "700",
                          background: st.bg, color: st.color,
                        }}>{st.label}</span>
                        <span style={{ fontSize: "10px", color: "#8FA89E" }}>
                          {timeAgo(sub.submitted_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* ── RIGHT: DETAIL ── */}
        {selected ? (
          <div style={{
            flex: "2 1 400px", minWidth: "300px",
            background: "#fff",
            border: "1.5px solid rgba(29,158,117,0.12)",
            borderRadius: "20px", padding: "clamp(20px,3vw,28px)",
            position: "sticky", top: "80px",
            maxHeight: "calc(100vh - 100px)", overflowY: "auto",
          }}>

            {/* Top row */}
            <div style={{ display: "flex", alignItems: "center",
              justifyContent: "space-between", marginBottom: "20px",
              flexWrap: "wrap", gap: "10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <Avatar url={selected.photo_url} name={selected.name} size={52} />
                <div>
                  <div style={{ fontFamily: "'Lora',serif", fontSize: "18px",
                    fontWeight: "600", color: "#0D1A16" }}>
                    {selected.name}
                  </div>
                  <div style={{ fontSize: "12px", color: "#5A7A6E" }}>
                    {selected.roll_number} · {selected.batch}
                  </div>
                </div>
              </div>
              <button onClick={() => setSelected(null)} style={{
                background: "none", border: "none", cursor: "pointer",
                color: "#8FA89E", fontSize: "18px", padding: "4px",
              }}>✕</button>
            </div>

            {/* Status buttons */}
            <div style={{ marginBottom: "20px" }}>
              <div style={{ fontSize: "11px", fontWeight: "700",
                color: "#1D9E75", textTransform: "uppercase",
                letterSpacing: "0.1em", marginBottom: "8px" }}>
                Update Status
              </div>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {Object.entries(STATUS_COLORS).map(([key, val]) => (
                  <button key={key}
                    onClick={() => updateStatus(selected.id, key)}
                    style={{
                      padding: "5px 12px", borderRadius: "100px",
                      border: "none", fontSize: "11px", fontWeight: "600",
                      cursor: "pointer", transition: "all 0.15s",
                      background: selected.status === key ? val.color : val.bg,
                      color: selected.status === key ? "#fff" : val.color,
                    }}>{val.label}</button>
                ))}
              </div>
            </div>

            {/* Info sections */}
            <InfoSection label="Contact">
              <InfoRow k="Email" v={selected.email} link={`mailto:${selected.email}`} />
              <InfoRow k="Phone" v={selected.phone} link={`tel:${selected.phone}`} />
              <InfoRow k="LinkedIn" v={selected.linkedin_url}
                link={selected.linkedin_url} />
            </InfoSection>

            {selected.bio && (
              <InfoSection label="Bio">
                <p style={{ fontSize: "13px", color: "#2E4F44",
                  lineHeight: "1.6" }}>{selected.bio}</p>
              </InfoSection>
            )}

            <InfoSection label="Availability">
              <InfoRow k="From" v={selected.availability_from} />
              <InfoRow k="To" v={selected.availability_to} />
              <InfoRow k="Preferred Location" v={selected.preferred_location} />
              <InfoRow k="Relocate?" v={selected.willing_to_relocate} />
            </InfoSection>

            <InfoSection label="Organisation Preferences">
              <InfoRow k="1st" v={selected.org_preference_1} />
              <InfoRow k="2nd" v={selected.org_preference_2} />
              <InfoRow k="3rd" v={selected.org_preference_3} />
            </InfoSection>

            <TagSection label="Internship Types"
              tags={selected.internship_type} />
            <TagSection label="Preferred Domains"
              tags={selected.preferred_domains} />
            <TagSection label="Skills" tags={selected.skills} />
            <TagSection label="Tools" tags={selected.tools} />
            <TagSection label="Languages" tags={selected.languages} />

            {selected.extra_info && (
              <InfoSection label="Additional Info">
                <p style={{ fontSize: "13px", color: "#2E4F44",
                  lineHeight: "1.6" }}>{selected.extra_info}</p>
              </InfoSection>
            )}

            {/* Documents */}
            <InfoSection label="Documents">
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {selected.cv_url ? (
                  <a href={selected.cv_url} target="_blank" rel="noreferrer"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "6px",
                      background: "#FCEBEB", color: "#A32D2D",
                      padding: "8px 14px", borderRadius: "100px",
                      fontSize: "12px", fontWeight: "600",
                      textDecoration: "none",
                    }}>
                    📄 View CV ↗
                  </a>
                ) : (
                  <span style={{ fontSize: "12px", color: "#8FA89E" }}>
                    No CV uploaded
                  </span>
                )}
              </div>
            </InfoSection>

            {/* Admin notes */}
            <InfoSection label="Admin Notes">
              <textarea
                value={noteText}
                onChange={e => setNoteText(e.target.value)}
                placeholder="Add private notes about this student..."
                rows={3}
                style={{
                  width: "100%", padding: "10px 12px",
                  border: "1.5px solid rgba(29,158,117,0.2)",
                  borderRadius: "10px", fontSize: "13px", outline: "none",
                  resize: "vertical",
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  color: "#0D1A16", marginBottom: "8px",
                }}
              />
              <button onClick={saveNote} disabled={savingNote} style={{
                background: "linear-gradient(135deg,#1D9E75,#0F6E56)",
                color: "#fff", border: "none", borderRadius: "100px",
                padding: "8px 18px", fontSize: "12px", fontWeight: "600",
                cursor: "pointer", opacity: savingNote ? 0.6 : 1,
              }}>
                {savingNote ? "Saving..." : "Save Note"}
              </button>
            </InfoSection>

          </div>
        ) : (
          <div style={{
            flex: "2 1 400px",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "80px 20px", color: "#8FA89E", fontSize: "14px",
            textAlign: "center",
          }}>
            <div>
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>👈</div>
              Select a student to view their full profile
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function InfoSection({ label, children }) {
  return (
    <div style={{ marginBottom: "18px" }}>
      <div style={{ fontSize: "10px", fontWeight: "700", color: "#1D9E75",
        textTransform: "uppercase", letterSpacing: "0.12em",
        marginBottom: "8px" }}>{label}</div>
      <div style={{
        background: "#F5F7F6", borderRadius: "12px", padding: "12px 14px",
      }}>{children}</div>
    </div>
  )
}

function InfoRow({ k, v, link }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between",
      alignItems: "center", padding: "4px 0",
      borderBottom: "1px solid rgba(29,158,117,0.06)", flexWrap: "wrap",
      gap: "6px" }}>
      <span style={{ fontSize: "11px", color: "#8FA89E",
        fontWeight: "600", flexShrink: 0 }}>{k}</span>
      {link && v ? (
        <a href={link} target="_blank" rel="noreferrer"
          style={{ fontSize: "12px", color: "#1D9E75",
            fontWeight: "500", textDecoration: "none",
            textAlign: "right", wordBreak: "break-all" }}>
          {v} ↗
        </a>
      ) : (
        <span style={{ fontSize: "12px", color: v ? "#0D1A16" : "#C8D4CE",
          textAlign: "right" }}>{v || "—"}</span>
      )}
    </div>
  )
}

function TagSection({ label, tags }) {
  if (!tags?.length) return null
  return (
    <div style={{ marginBottom: "18px" }}>
      <div style={{ fontSize: "10px", fontWeight: "700", color: "#1D9E75",
        textTransform: "uppercase", letterSpacing: "0.12em",
        marginBottom: "8px" }}>{label}</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {tags.map(t => (
          <span key={t} style={{
            padding: "3px 10px", borderRadius: "100px",
            fontSize: "11px", fontWeight: "600",
            background: "#E1F5EE", color: "#085041",
          }}>{t}</span>
        ))}
      </div>
    </div>
  )
}