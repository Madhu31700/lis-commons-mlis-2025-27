import { useState, useEffect, useRef } from "react"
import { supabase } from "../supabase"
import { useAuth } from "../context/AuthContext"

const BATCHES = ["MLIS 2024-2026", "MLIS 2025-2027"]

const INTERNSHIP_TYPES = [
  "Academic Library",
  "Public Library",
  "Special / Corporate Library",
  "Archives & Records Management",
  "Knowledge Management",
  "Digital Library / Digitisation",
  "Publishing & Editorial",
  "Data Analytics / Bibliometrics",
  "Information Technology",
]

const DOMAIN_OPTIONS = [
  "Library Cataloguing & Classification",
  "Metadata & Dublin Core",
  "Digital Preservation",
  "Information Retrieval",
  "Knowledge Organisation",
  "Bibliometrics & Scientometrics",
  "Library Automation",
  "Content Management",
  "Research Support",
  "User Services & Outreach",
]

const SKILL_OPTIONS = [
  "Cataloguing (DDC)", "MARC21 / RDA",
  "OPAC Management", "Literature Search",
  "Reference Services", "Collection Development",
  "Digitisation", "Metadata Creation",
  "Research Assistance", "Report Writing",
]

const TOOL_OPTIONS = [
  "Koha", "DSpace", "EPrints",
  "Zotero", "Mendeley", "EndNote",
  "MS Excel", "MS Word", "PowerPoint",
  "Python", "OpenRefine", "VOSviewer",
  "Canva", "Dataverse", "INFLIBNET Tools",
]

const LANG_OPTIONS = [
  "English", "Hindi", "Kannada",
  "Tamil", "Malayalam", "Telugu",
  "Bengali", "Marathi", "Other",
]

const STEPS = [
  "Personal Info",
  "Preferences",
  "Skills & Tools",
  "Documents",
  "Review & Submit",
]

function Avatar({ url, name, size = 100 }) {
  return url ? (
    <img src={url} alt={name}
      style={{ width: size, height: size, borderRadius: '50%',
        objectFit: 'cover', border: '3px solid #1D9E75' }} />
  ) : (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: 'linear-gradient(135deg,#1D9E75,#5DCAA5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontSize: size * 0.4, fontWeight: '700',
      border: '3px solid #1D9E75',
    }}>
      {name?.charAt(0)?.toUpperCase() || 'S'}
    </div>
  )
}

function FieldLabel({ children, required }) {
  return (
    <label style={{
      display: 'block', fontSize: '11px', fontWeight: '700',
      color: '#1D9E75', textTransform: 'uppercase',
      letterSpacing: '0.1em', marginBottom: '6px',
    }}>
      {children}
      {required && <span style={{ color: '#E24B4A', marginLeft: '3px' }}>*</span>}
    </label>
  )
}

function TextInput({ label, value, onChange, placeholder, required, type = 'text', disabled }) {
  return (
    <div>
      <FieldLabel required={required}>{label}</FieldLabel>
      <input
        type={type} value={value || ''} disabled={disabled}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%', padding: '10px 14px',
          border: '1.5px solid rgba(29,158,117,0.2)',
          borderRadius: '10px', fontSize: '13px', outline: 'none',
          fontFamily: "'Plus Jakarta Sans',sans-serif",
          color: '#0D1A16', background: disabled ? '#F5F7F6' : '#fff',
          opacity: disabled ? 0.7 : 1,
        }}
      />
    </div>
  )
}

function SelectInput({ label, value, onChange, options, required }) {
  return (
    <div>
      <FieldLabel required={required}>{label}</FieldLabel>
      <select value={value || ''} onChange={e => onChange(e.target.value)}
        style={{
          width: '100%', padding: '10px 14px',
          border: '1.5px solid rgba(29,158,117,0.2)',
          borderRadius: '10px', fontSize: '13px', outline: 'none',
          fontFamily: "'Plus Jakarta Sans',sans-serif",
          color: '#0D1A16', background: '#fff',
        }}>
        <option value="">Select...</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}

function TagPill({ label, active, onClick }) {
  return (
    <button type="button" onClick={onClick} style={{
      padding: '6px 14px', borderRadius: '100px',
      fontSize: '12px', fontWeight: '600', cursor: 'pointer',
      border: 'none', transition: 'all 0.15s',
      background: active ? '#1D9E75' : 'rgba(29,158,117,0.08)',
      color: active ? '#fff' : '#085041',
    }}>{label}</button>
  )
}

function SectionCard({ title, subtitle, children }) {
  return (
    <div style={{
      background: '#fff',
      border: '1.5px solid rgba(29,158,117,0.12)',
      borderRadius: '20px', padding: 'clamp(20px,4vw,32px)',
      marginBottom: '20px',
    }}>
      {title && (
        <div style={{ marginBottom: '20px' }}>
          <h3 style={{
            fontFamily: "'Lora',serif", fontSize: '18px',
            fontWeight: '600', color: '#0D1A16', marginBottom: '4px',
          }}>{title}</h3>
          {subtitle && (
            <p style={{ fontSize: '13px', color: '#5A7A6E' }}>{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </div>
  )
}

export default function InternshipForm({ goBack }) {
  const { user } = useAuth()
  const photoRef = useRef()
  const cvRef    = useRef()

  const [step,        setStep]        = useState(0)
  const [saving,      setSaving]      = useState(false)
  const [submitted,   setSubmitted]   = useState(false)
  const [uploading,   setUploading]   = useState({ photo: false, cv: false })
  const [errors,      setErrors]      = useState({})
  const [loadingData, setLoadingData] = useState(true)

  const [form, setForm] = useState({
    name:               user?.displayName || '',
    email:              user?.email || '',
    roll_number:        '',
    batch:              'MLIS 2025-2027',
    phone:              '',
    linkedin_url:       '',
    photo_url:          user?.photoURL || '',
    cv_url:             '',
    bio:                '',
    availability_from:  '',
    availability_to:    '',
    preferred_location: '',
    willing_to_relocate:'',
    internship_type:    [],
    preferred_domains:  [],
    org_preference_1:   '',
    org_preference_2:   '',
    org_preference_3:   '',
    skills:             [],
    tools:              [],
    languages:          [],
    extra_info:         '',
    consent:            false,
  })

  // Load existing submission
  useEffect(() => {
    if (!user) return
    const load = async () => {
      const { data } = await supabase
        .from('internship_submissions')
        .select('*')
        .eq('email', user.email)
        .maybeSingle()
      if (data) setForm(f => ({ ...f, ...data }))
      setLoadingData(false)
    }
    load()
  }, [user])

  const toggle = (field, value) => {
    setForm(f => ({
      ...f,
      [field]: f[field].includes(value)
        ? f[field].filter(v => v !== value)
        : [...f[field], value],
    }))
  }

  const uploadPhoto = async (file) => {
    if (!file) return
    setUploading(u => ({ ...u, photo: true }))
    try {
      const ext  = file.name.split('.').pop()
      const path = `${user.uid}-photo.${ext}`
      const { error } = await supabase.storage
        .from('profile-photos')
        .upload(path, file, { upsert: true })
      if (error) throw error
      const { data } = supabase.storage.from('profile-photos').getPublicUrl(path)
      setForm(f => ({ ...f, photo_url: data.publicUrl + '?t=' + Date.now() }))
    } catch (e) { alert('Photo upload failed: ' + e.message) }
    setUploading(u => ({ ...u, photo: false }))
  }

  const uploadCV = async (file) => {
    if (!file) return
    if (file.type !== 'application/pdf') { alert('Please upload a PDF file.'); return }
    if (file.size > 5 * 1024 * 1024) { alert('File too large. Max 5MB.'); return }
    setUploading(u => ({ ...u, cv: true }))
    try {
      const path = `${user.uid}-cv.pdf`
      const { error } = await supabase.storage
        .from('cv-files')
        .upload(path, file, { upsert: true })
      if (error) throw error
      const { data } = supabase.storage.from('cv-files').getPublicUrl(path)
      setForm(f => ({ ...f, cv_url: data.publicUrl }))
    } catch (e) { alert('CV upload failed: ' + e.message) }
    setUploading(u => ({ ...u, cv: false }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim())        e.name = 'Required'
    if (!form.roll_number.trim()) e.roll_number = 'Required'
    if (!form.phone.trim())       e.phone = 'Required'
    if (!form.consent)            e.consent = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) { setStep(0); return }
    setSaving(true)
    try {
      const payload = {
        ...form,
        user_id:      user.uid,
        email:        user.email,
        updated_at:   new Date().toISOString(),
        submitted_at: new Date().toISOString(),
      }
      const { error } = await supabase
        .from('internship_submissions')
        .upsert(payload, { onConflict: 'email' })
      if (error) throw error
      setSubmitted(true)
    } catch (e) { alert('Submission failed: ' + e.message) }
    setSaving(false)
  }

  if (loadingData) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
      <p style={{ color: '#1D9E75' }}>Loading your profile...</p>
    </div>
  )

  if (submitted) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '20px',
      fontFamily: "'Plus Jakarta Sans',sans-serif", background: '#fff' }}>
      <div style={{ textAlign: 'center', maxWidth: '480px' }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</div>
        <h2 style={{ fontFamily: "'Lora',serif", fontSize: '28px',
          fontWeight: '600', color: '#0D1A16', marginBottom: '10px' }}>
          Profile Submitted!
        </h2>
        <p style={{ fontSize: '14px', color: '#5A7A6E', lineHeight: '1.7',
          marginBottom: '24px' }}>
          Your internship profile has been submitted to the DRTC Placement Cell.
          They'll review it and reach out with opportunities matching your preferences.
        </p>
        <button onClick={goBack} style={{
          background: 'linear-gradient(135deg,#1D9E75,#0F6E56)',
          color: '#fff', border: 'none', borderRadius: '100px',
          padding: '12px 28px', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
        }}>← Back to Hub</button>
      </div>
    </div>
  )

  const inp = { ...form }

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif",
      background: '#F5F7F6', minHeight: '100vh' }}>

      {/* ── HEADER ── */}
      <div style={{
        background: 'linear-gradient(160deg,#0D1A16,#1A302A)',
        padding: 'clamp(28px,4vw,40px) clamp(16px,4vw,32px)',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <button onClick={goBack} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.5)', fontSize: '13px',
            fontWeight: '500', marginBottom: '16px', padding: 0,
          }}>← Back to Hub</button>
          <div style={{ display: 'flex', alignItems: 'center',
            gap: '16px', flexWrap: 'wrap' }}>
            <Avatar url={form.photo_url} name={form.name} size={64} />
            <div>
              <h1 style={{ fontFamily: "'Lora',serif",
                fontSize: 'clamp(20px,3vw,28px)', fontWeight: '600',
                color: '#fff', marginBottom: '4px' }}>
                Internship Profile
              </h1>
              <p style={{ fontSize: '13px',
                color: 'rgba(255,255,255,0.45)' }}>
                {user?.email} · {form.batch}
              </p>
            </div>
          </div>

          {/* Step indicator */}
          <div style={{ display: 'flex', gap: '6px',
            marginTop: '24px', flexWrap: 'wrap' }}>
            {STEPS.map((s, i) => (
              <button key={s} onClick={() => setStep(i)} style={{
                padding: '6px 14px', borderRadius: '100px', border: 'none',
                fontSize: '11px', fontWeight: '600', cursor: 'pointer',
                background: step === i
                  ? '#1D9E75'
                  : i < step
                    ? 'rgba(29,158,117,0.3)'
                    : 'rgba(255,255,255,0.1)',
                color: step === i ? '#fff'
                  : i < step ? '#9FE1CB'
                  : 'rgba(255,255,255,0.5)',
                transition: 'all 0.15s',
              }}>{i + 1}. {s}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto',
        padding: 'clamp(24px,4vw,40px) clamp(16px,4vw,32px)' }}>

        {/* ── STEP 0: PERSONAL INFO ── */}
        {step === 0 && (
          <>
            <SectionCard title="Personal Details"
              subtitle="Basic information for your placement profile.">
              <div style={{ display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
                gap: '16px' }}>
                <TextInput label="Full Name" required
                  value={form.name}
                  onChange={v => setForm(f => ({ ...f, name: v }))}
                  placeholder="As on university records" />
                <TextInput label="Roll Number" required
                  value={form.roll_number}
                  onChange={v => setForm(f => ({ ...f, roll_number: v }))}
                  placeholder="e.g. MLIS2025001" />
                <TextInput label="Email" disabled
                  value={form.email} onChange={() => {}} />
                <SelectInput label="Batch" required
                  value={form.batch}
                  onChange={v => setForm(f => ({ ...f, batch: v }))}
                  options={BATCHES} />
                <TextInput label="Phone Number" required
                  value={form.phone} type="tel"
                  onChange={v => setForm(f => ({ ...f, phone: v }))}
                  placeholder="+91 XXXXX XXXXX" />
                <TextInput label="LinkedIn Profile URL"
                  value={form.linkedin_url}
                  onChange={v => setForm(f => ({ ...f, linkedin_url: v }))}
                  placeholder="linkedin.com/in/yourname" />
              </div>
            </SectionCard>

            <SectionCard title="Professional Bio"
              subtitle="A short summary about yourself and your career interests.">
              <textarea
                value={form.bio}
                onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                placeholder="E.g. Aspiring Digital Librarian with interest in metadata and knowledge organisation..."
                maxLength={300}
                rows={4}
                style={{
                  width: '100%', padding: '12px 14px',
                  border: '1.5px solid rgba(29,158,117,0.2)',
                  borderRadius: '12px', fontSize: '13px', outline: 'none',
                  resize: 'vertical',
                  fontFamily: "'Plus Jakarta Sans',sans-serif",
                  color: '#0D1A16',
                }}
              />
              <div style={{ fontSize: '11px', color: '#8FA89E',
                textAlign: 'right', marginTop: '4px' }}>
                {(form.bio || '').length}/300
              </div>
            </SectionCard>
          </>
        )}

        {/* ── STEP 1: PREFERENCES ── */}
        {step === 1 && (
          <>
            <SectionCard title="Availability"
              subtitle="When are you available for an internship?">
              <div style={{ display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
                gap: '16px' }}>
                <TextInput label="Available From" type="date"
                  value={form.availability_from}
                  onChange={v => setForm(f => ({ ...f, availability_from: v }))} />
                <TextInput label="Available To" type="date"
                  value={form.availability_to}
                  onChange={v => setForm(f => ({ ...f, availability_to: v }))} />
                <TextInput label="Preferred City / Location"
                  value={form.preferred_location}
                  onChange={v => setForm(f => ({ ...f, preferred_location: v }))}
                  placeholder="e.g. Bangalore, Delhi" />
                <SelectInput label="Willing to Relocate?"
                  value={form.willing_to_relocate}
                  onChange={v => setForm(f => ({ ...f, willing_to_relocate: v }))}
                  options={['Yes', 'No', 'Depends on opportunity']} />
              </div>
            </SectionCard>

            <SectionCard title="Internship Type Preferences"
              subtitle="Select all types you are interested in.">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {INTERNSHIP_TYPES.map(t => (
                  <TagPill key={t} label={t}
                    active={form.internship_type.includes(t)}
                    onClick={() => toggle('internship_type', t)} />
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Domain Preferences"
              subtitle="Which domains interest you most?">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {DOMAIN_OPTIONS.map(d => (
                  <TagPill key={d} label={d}
                    active={form.preferred_domains.includes(d)}
                    onClick={() => toggle('preferred_domains', d)} />
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Organisation Preferences"
              subtitle="Name up to 3 specific organisations you'd like to intern at.">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <TextInput label="1st Preference"
                  value={form.org_preference_1}
                  onChange={v => setForm(f => ({ ...f, org_preference_1: v }))}
                  placeholder="e.g. ISRO Library, Bangalore" />
                <TextInput label="2nd Preference"
                  value={form.org_preference_2}
                  onChange={v => setForm(f => ({ ...f, org_preference_2: v }))}
                  placeholder="e.g. National Library of India, Kolkata" />
                <TextInput label="3rd Preference"
                  value={form.org_preference_3}
                  onChange={v => setForm(f => ({ ...f, org_preference_3: v }))}
                  placeholder="e.g. INFLIBNET Centre, Gandhinagar" />
              </div>
            </SectionCard>
          </>
        )}

        {/* ── STEP 2: SKILLS & TOOLS ── */}
        {step === 2 && (
          <>
            <SectionCard title="LIS Skills"
              subtitle="Select skills you are comfortable with.">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {SKILL_OPTIONS.map(s => (
                  <TagPill key={s} label={s}
                    active={form.skills.includes(s)}
                    onClick={() => toggle('skills', s)} />
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Software & Tools"
              subtitle="Tools you have worked with or are learning.">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {TOOL_OPTIONS.map(t => (
                  <TagPill key={t} label={t}
                    active={form.tools.includes(t)}
                    onClick={() => toggle('tools', t)} />
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Languages Known"
              subtitle="Languages you can read, write, or speak professionally.">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {LANG_OPTIONS.map(l => (
                  <TagPill key={l} label={l}
                    active={form.languages.includes(l)}
                    onClick={() => toggle('languages', l)} />
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Anything else?"
              subtitle="Any other information relevant to your placement.">
              <textarea
                value={form.extra_info}
                onChange={e => setForm(f => ({ ...f, extra_info: e.target.value }))}
                placeholder="e.g. I have completed a digitisation project at DRTC. I am also learning Python for library data analysis..."
                rows={4}
                style={{
                  width: '100%', padding: '12px 14px',
                  border: '1.5px solid rgba(29,158,117,0.2)',
                  borderRadius: '12px', fontSize: '13px', outline: 'none',
                  resize: 'vertical',
                  fontFamily: "'Plus Jakarta Sans',sans-serif", color: '#0D1A16',
                }}
              />
            </SectionCard>
          </>
        )}

        {/* ── STEP 3: DOCUMENTS ── */}
        {step === 3 && (
          <>
            <SectionCard title="Profile Photo"
              subtitle="A professional photo for your placement profile.">
              <div style={{ display: 'flex', alignItems: 'center',
                gap: '20px', flexWrap: 'wrap' }}>
                <Avatar url={form.photo_url} name={form.name} size={80} />
                <div>
                  <button onClick={() => photoRef.current?.click()}
                    disabled={uploading.photo}
                    style={{
                      background: 'linear-gradient(135deg,#1D9E75,#0F6E56)',
                      color: '#fff', border: 'none', borderRadius: '100px',
                      padding: '10px 22px', fontSize: '13px',
                      fontWeight: '600', cursor: 'pointer',
                      opacity: uploading.photo ? 0.6 : 1,
                    }}>
                    {uploading.photo ? 'Uploading...' : '📷 Upload Photo'}
                  </button>
                  <input ref={photoRef} type="file" accept="image/*"
                    style={{ display: 'none' }}
                    onChange={e => uploadPhoto(e.target.files[0])} />
                  <p style={{ fontSize: '11px', color: '#8FA89E', marginTop: '6px' }}>
                    JPG or PNG. Max 2MB. Square preferred.
                  </p>
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Curriculum Vitae (CV)"
              subtitle="Upload your CV as a PDF. Max 5MB.">
              <div style={{ display: 'flex', alignItems: 'center',
                justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '12px',
                    background: '#FCEBEB',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                      stroke="#E24B4A" strokeWidth="1.8">
                      <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '600',
                      color: '#0D1A16', marginBottom: '3px' }}>
                      {form.cv_url ? 'CV Uploaded ✓' : 'No CV uploaded yet'}
                    </div>
                    {form.cv_url && (
                      <a href={form.cv_url} target="_blank" rel="noreferrer"
                        style={{ fontSize: '12px', color: '#1D9E75',
                          fontWeight: '600', textDecoration: 'none' }}>
                        View uploaded CV ↗
                      </a>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => cvRef.current?.click()}
                    disabled={uploading.cv}
                    style={{
                      background: form.cv_url
                        ? 'rgba(29,158,117,0.08)'
                        : 'linear-gradient(135deg,#1D9E75,#0F6E56)',
                      color: form.cv_url ? '#085041' : '#fff',
                      border: form.cv_url
                        ? '1.5px solid rgba(29,158,117,0.2)'
                        : 'none',
                      borderRadius: '100px',
                      padding: '10px 22px', fontSize: '13px',
                      fontWeight: '600', cursor: 'pointer',
                      opacity: uploading.cv ? 0.6 : 1,
                    }}>
                    {uploading.cv ? 'Uploading...' : form.cv_url ? '↑ Replace CV' : '↑ Upload CV'}
                  </button>
                  <input ref={cvRef} type="file" accept=".pdf"
                    style={{ display: 'none' }}
                    onChange={e => uploadCV(e.target.files[0])} />
                </div>
              </div>
            </SectionCard>
          </>
        )}

        {/* ── STEP 4: REVIEW & SUBMIT ── */}
        {step === 4 && (
          <>
            <SectionCard title="Review Your Profile"
              subtitle="Check everything before submitting.">

              {/* Summary grid */}
              <div style={{ display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
                gap: '12px', marginBottom: '20px' }}>
                {[
                  { label: 'Name', value: form.name },
                  { label: 'Roll Number', value: form.roll_number },
                  { label: 'Batch', value: form.batch },
                  { label: 'Phone', value: form.phone },
                  { label: 'Available From', value: form.availability_from },
                  { label: 'Available To', value: form.availability_to },
                  { label: 'Preferred Location', value: form.preferred_location },
                  { label: 'Willing to Relocate', value: form.willing_to_relocate },
                  { label: '1st Org Preference', value: form.org_preference_1 },
                  { label: '2nd Org Preference', value: form.org_preference_2 },
                  { label: 'CV Uploaded', value: form.cv_url ? '✓ Yes' : '✗ No' },
                  { label: 'Photo Uploaded', value: form.photo_url ? '✓ Yes' : '✗ No' },
                ].map(r => (
                  <div key={r.label} style={{
                    background: '#F5F7F6', borderRadius: '10px', padding: '10px 14px',
                  }}>
                    <div style={{ fontSize: '10px', fontWeight: '700',
                      color: '#1D9E75', textTransform: 'uppercase',
                      letterSpacing: '0.08em', marginBottom: '3px' }}>
                      {r.label}
                    </div>
                    <div style={{ fontSize: '13px', color: r.value ? '#0D1A16' : '#8FA89E' }}>
                      {r.value || 'Not filled'}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tag summaries */}
              {[
                { label: 'Internship Types', values: form.internship_type },
                { label: 'Domains', values: form.preferred_domains },
                { label: 'Skills', values: form.skills },
                { label: 'Tools', values: form.tools },
                { label: 'Languages', values: form.languages },
              ].map(s => s.values.length > 0 && (
                <div key={s.label} style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '10px', fontWeight: '700',
                    color: '#1D9E75', textTransform: 'uppercase',
                    letterSpacing: '0.08em', marginBottom: '6px' }}>
                    {s.label}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {s.values.map(v => (
                      <span key={v} style={{
                        padding: '3px 10px', borderRadius: '100px',
                        fontSize: '11px', background: '#E1F5EE', color: '#085041',
                        fontWeight: '600',
                      }}>{v}</span>
                    ))}
                  </div>
                </div>
              ))}
            </SectionCard>

            {/* Consent */}
            <SectionCard>
              <label style={{
                display: 'flex', alignItems: 'flex-start', gap: '12px',
                cursor: 'pointer',
              }}>
                <div onClick={() => setForm(f => ({ ...f, consent: !f.consent }))}
                  style={{
                    width: '20px', height: '20px', borderRadius: '5px',
                    border: `2px solid ${form.consent ? '#1D9E75' : 'rgba(29,158,117,0.3)'}`,
                    background: form.consent ? '#1D9E75' : '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, cursor: 'pointer', transition: 'all 0.15s',
                  }}>
                  {form.consent && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                      stroke="#fff" strokeWidth="3">
                      <path d="M5 13l4 4L19 7"/>
                    </svg>
                  )}
                </div>
                <span style={{ fontSize: '13px', color: '#2E4F44', lineHeight: '1.6' }}>
                  I consent to sharing this information with the DRTC Placement Cell for internship coordination. I understand this data will be used only for academic and placement purposes.
                </span>
              </label>
              {errors.consent && (
                <div style={{ fontSize: '12px', color: '#E24B4A', marginTop: '8px' }}>
                  You must give consent to submit.
                </div>
              )}
            </SectionCard>

            {/* Submit button */}
            <button onClick={handleSubmit} disabled={saving}
              style={{
                width: '100%', padding: '16px',
                background: 'linear-gradient(135deg,#1D9E75,#0F6E56)',
                color: '#fff', border: 'none', borderRadius: '14px',
                fontSize: '15px', fontWeight: '700', cursor: 'pointer',
                opacity: saving ? 0.6 : 1, letterSpacing: '0.05em',
              }}>
              {saving ? 'Submitting...' : '✓ Submit Internship Profile'}
            </button>
          </>
        )}

        {/* ── NAVIGATION ── */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginTop: '24px', flexWrap: 'wrap', gap: '10px',
        }}>
          <button onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
            style={{
              background: 'transparent', color: '#5A7A6E',
              border: '1.5px solid rgba(29,158,117,0.2)',
              borderRadius: '100px', padding: '10px 22px',
              fontSize: '13px', fontWeight: '600', cursor: 'pointer',
              opacity: step === 0 ? 0.3 : 1,
            }}>← Previous</button>

          <span style={{ fontSize: '12px', color: '#8FA89E' }}>
            Step {step + 1} of {STEPS.length}
          </span>

          {step < STEPS.length - 1 ? (
            <button onClick={() => setStep(s => Math.min(STEPS.length - 1, s + 1))}
              style={{
                background: 'linear-gradient(135deg,#1D9E75,#0F6E56)',
                color: '#fff', border: 'none', borderRadius: '100px',
                padding: '10px 22px', fontSize: '13px',
                fontWeight: '600', cursor: 'pointer',
              }}>Next →</button>
          ) : (
            <span />
          )}
        </div>
      </div>
    </div>
  )
}