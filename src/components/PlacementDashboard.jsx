import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const PLACEMENT_EMAILS = ["madhu@drtc.isibang.ac.in", "amisha@drtc.isibang.ac.in"];

export default function PlacementDashboard({ goBack }) {
  const { user } = useAuth();
  const [entries, setEntries] = useState([]);
  const [search, setSearch] = useState("");

  const isPlacement = user && PLACEMENT_EMAILS.includes(user.email);

  useEffect(() => {
    if (!isPlacement) return;
    const ref = collection(db, "internships");
    const unsub = onSnapshot(ref, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setEntries(data);
    });
    return () => unsub();
  }, [isPlacement]);

  /* ---------- SEARCH & FILTER LOGIC ---------- */
  const filteredEntries = entries.filter(e => {
    const searchTerm = search.toLowerCase();
    return (
      e.name?.toLowerCase().includes(searchTerm) ||
      e.roll?.toLowerCase().includes(searchTerm) ||
      e.skills?.some(s => s.toLowerCase().includes(searchTerm)) ||
      e.sector?.some(s => s.toLowerCase().includes(searchTerm)) ||
      e.tools?.some(t => t.toLowerCase().includes(searchTerm))
    );
  });

  /* ---------- EXCEL EXPORT ---------- */
  const exportToExcel = () => {
    const formatted = entries.map((e) => ({
      Name: e.name,
      Roll: e.roll,
      Email: e.email,
      Phone: e.phone || "",
      Bio: e.bio || "",
      Availability: e.availability || "",
      Sectors: e.sector?.join(", "),
      Skills: e.skills?.join(", "),
      Tools: e.tools?.join(", "),
      Location: e.location,
      Relocation: e.relocate,
      LinkedIn: e.linkedin || "",
      CV_Link: e.cvLink || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(formatted);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Candidates");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const file = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(file, `Placement_Report_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  if (!isPlacement) return <div className="p-20 text-center text-slate-500 font-mono tracking-widest">ERROR: UNAUTHORIZED_ACCESS</div>;

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 pb-20 selection:bg-indigo-500/30">
      
      {/* HEADER & SEARCH BAR */}
      <header className="sticky top-0 z-40 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <button onClick={goBack} className="p-2.5 hover:bg-slate-800 rounded-2xl transition-all text-slate-400">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <div>
              <h1 className="text-xl font-black text-white uppercase tracking-tighter">Placement Console</h1>
              <p className="text-[10px] text-indigo-500 font-bold tracking-[0.3em] uppercase">Librandhana 2026</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-96">
              <input 
                type="text" 
                placeholder="Search by name, skill, or sector..." 
                className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-12 py-3 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-600"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <svg className="absolute left-4 top-3.5 text-slate-500" width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
            </div>
            <button onClick={exportToExcel} className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-2xl text-xs font-black transition-all shadow-xl shadow-indigo-600/10 active:scale-95 uppercase tracking-widest">
              Export Excel
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pt-12">
        
        {/* STATS HUD */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <HudCard label="Total Candidates" value={entries.length} sub="Applications received" />
          <HudCard label="Mobile Ready" value={entries.filter(e => e.relocate === 'Yes').length} sub="Willing to relocate" />
          <HudCard label="Digital CVs" value={entries.filter(e => e.cvLink).length} sub="PDFs attached" />
          <HudCard label="Corporate Interest" value={entries.filter(e => e.sector?.includes('Corporate / KM')).length} sub="KM specialists" />
        </div>

        {/* CANDIDATE FEED */}
        <div className="space-y-8">
          {filteredEntries.length > 0 ? (
            filteredEntries.map((e) => (
              <div key={e.id} className="bg-[#0f172a]/30 border border-slate-800 rounded-[2.5rem] overflow-hidden hover:border-indigo-500/40 transition-all duration-500 group">
                <div className="flex flex-col lg:flex-row">
                  
                  {/* LEFT: IDENTITY COLUMN */}
                  <div className="lg:w-80 p-10 bg-slate-900/40 border-r border-slate-800 flex flex-col items-center">
                    <img 
                      src={e.cvPhoto || `https://ui-avatars.com/api/?name=${e.name}&background=1e293b&color=6366f1`} 
                      className="w-36 h-36 rounded-[3rem] object-cover mb-6 ring-4 ring-slate-800 group-hover:ring-indigo-500/20 transition-all duration-700 shadow-2xl" 
                      alt="" 
                    />
                    <h2 className="text-center font-black text-white text-xl leading-tight px-2">{e.name}</h2>
                    <p className="text-indigo-400 font-mono text-xs tracking-widest mt-2 uppercase">{e.roll}</p>
                    
                    <div className="flex flex-col gap-3 mt-8 w-full">
                      {e.cvLink && (
                        <a href={e.cvLink} target="_blank" rel="noreferrer" className="w-full bg-indigo-600 text-white py-3 rounded-2xl text-[10px] font-black text-center transition-all uppercase tracking-[0.2em] shadow-lg shadow-indigo-600/20">View Resume</a>
                      )}
                      {e.linkedin && (
                        <a href={e.linkedin} target="_blank" rel="noreferrer" className="w-full bg-slate-800 hover:bg-[#0077b5] py-3 rounded-2xl text-[10px] font-black text-center transition-all uppercase tracking-[0.2em] text-slate-300 hover:text-white border border-slate-700">LinkedIn</a>
                      )}
                    </div>
                  </div>

                  {/* RIGHT: DATA COLUMN */}
                  <div className="flex-1 p-10">
                    {/* PROFESSIONAL BIO */}
                    {e.bio && (
                      <div className="mb-10">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                          Professional Summary <div className="h-[1px] bg-slate-800 flex-1"></div>
                        </p>
                        <p className="text-sm text-slate-300 leading-relaxed italic font-medium">"{e.bio}"</p>
                      </div>
                    )}

                    {/* CORE INFO GRID */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-6 mb-12">
                      <DataBlock label="Availability" value={e.availability} />
                      <DataBlock label="Location" value={e.location} />
                      <DataBlock label="Mobility" value={e.relocate} />
                      <DataBlock label="Contact Email" value={e.email} />
                      <DataBlock label="Contact Phone" value={e.phone} />
                      <DataBlock label="Specialization" value={e.corporateRole || e.libraryType || "Generalist"} />
                    </div>

                    {/* TAGS SECTION */}
                    <div className="space-y-8 pt-8 border-t border-slate-800/50">
                      <div>
                        <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-4">Sectors of Interest</p>
                        <div className="flex flex-wrap gap-2">
                          {e.sector?.map(s => <span key={s} className="px-4 py-1.5 bg-indigo-500/5 text-indigo-300 border border-indigo-500/20 rounded-xl text-[10px] font-black uppercase">{s}</span>)}
                        </div>
                      </div>

                      <div>
                        <p className="text-[10px] font-black text-cyan-500 uppercase tracking-widest mb-4">Technical Stack & Tools</p>
                        <div className="flex flex-wrap gap-2">
                          {e.skills?.map(s => <span key={s} className="px-4 py-1.5 bg-cyan-500/5 text-cyan-300 border border-cyan-500/20 rounded-xl text-[10px] font-black uppercase">{s}</span>)}
                          {e.tools?.map(t => <span key={t} className="px-4 py-1.5 bg-slate-800/50 text-slate-400 border border-slate-700 rounded-xl text-[10px] font-black uppercase">{t}</span>)}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            ))
          ) : (
            <div className="py-32 text-center border-2 border-dashed border-slate-800 rounded-[3rem]">
              <p className="text-slate-500 font-bold uppercase tracking-widest">No candidates found matching your search</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

/* ---------- HELPER COMPONENTS ---------- */

function HudCard({ label, value, sub }) {
  return (
    <div className="bg-[#0f172a] border border-slate-800 p-8 rounded-[2rem] shadow-sm relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <svg width="48" height="48" fill="white" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
      </div>
      <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{label}</p>
      <p className="text-4xl font-black text-white mb-1 tracking-tighter">{value}</p>
      <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">{sub}</p>
    </div>
  );
}

function DataBlock({ label, value }) {
  return (
    <div className="group">
      <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] mb-2 group-hover:text-indigo-400 transition-colors">{label}</p>
      <p className="text-[13px] text-slate-200 font-bold leading-tight">{value || "—"}</p>
    </div>
  );
}