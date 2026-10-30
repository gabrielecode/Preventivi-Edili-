import React from "react";

interface Props {
  mode: "diy" | "pro" | "compare";
  setMode: (mode: "diy" | "pro" | "compare") => void;
  quality: "base" | "standard" | "premium";
  setQuality: (q: "base" | "standard" | "premium") => void;
  skillLevel: "beginner" | "handy" | "expert";
  setSkillLevel: (s: "beginner" | "handy" | "expert") => void;
  siteDifficulty: "low" | "medium" | "high";
  setSiteDifficulty: (d: "low" | "medium" | "high") => void;
}

export const WizardStep4Preferences: React.FC<Props> = ({
  mode,
  setMode,
  quality,
  setQuality,
  skillLevel,
  setSkillLevel,
  siteDifficulty,
  setSiteDifficulty,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-1">Come vuoi affrontare il lavoro?</h2>
        <p className="text-sm text-slate-500">Definisci le modalità di esecuzione, la qualità dei materiali e le tue competenze.</p>
      </div>

      {/* Modalità */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">Modalità di stima</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: "compare", label: "Confronta entrambi", desc: "Valuta Fai da Te vs Professionista" },
            { id: "pro", label: "Con professionista", desc: "Preventivo affidato a ditta" },
            { id: "diy", label: "Solo Fai da Te", desc: "Calcolo materiali, attrezzi e ore" },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id as any)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                mode === m.id
                  ? "border-blue-600 bg-blue-50/80 text-blue-900 ring-2 ring-blue-100 font-semibold shadow-sm"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
              type="button"
            >
              <p className="text-sm font-bold">{m.label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{m.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Qualità materiali */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">Qualità dei materiali</label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: "base", label: "Base", desc: "Economica / Standard" },
            { id: "standard", label: "Standard", desc: "Ottimo rapporto qualità" },
            { id: "premium", label: "Premium", desc: "Alta gamma e design" },
          ].map((q) => (
            <button
              key={q.id}
              onClick={() => setQuality(q.id as any)}
              className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                quality === q.id
                  ? "border-blue-600 bg-blue-50/80 text-blue-900 ring-2 ring-blue-100 font-semibold shadow-sm"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
              type="button"
            >
              <p className="text-sm font-bold">{q.label}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{q.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Tua esperienza */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">Tua esperienza nel fai da te</label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: "beginner", label: "Principiante", desc: "Primo lavoro manuale" },
            { id: "handy", label: "So arrangiarmi", desc: "Buona manualità hobbista" },
            { id: "expert", label: "Esperto", desc: "Competenze avanzate" },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setSkillLevel(s.id as any)}
              className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                skillLevel === s.id
                  ? "border-blue-600 bg-blue-50/80 text-blue-900 ring-2 ring-blue-100 font-semibold shadow-sm"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
              type="button"
            >
              <p className="text-sm font-bold">{s.label}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{s.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Difficoltà del cantiere */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">Difficoltà del cantiere</label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: "low", label: "Bassa", desc: "Locale sgombro, piano terra" },
            { id: "medium", label: "Media", desc: "Accesso standard" },
            { id: "high", label: "Alta", desc: "Altezze, spazi ristretti" },
          ].map((d) => (
            <button
              key={d.id}
              onClick={() => setSiteDifficulty(d.id as any)}
              className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                siteDifficulty === d.id
                  ? "border-blue-600 bg-blue-50/80 text-blue-900 ring-2 ring-blue-100 font-semibold shadow-sm"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
              type="button"
            >
              <p className="text-sm font-bold">{d.label}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{d.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
