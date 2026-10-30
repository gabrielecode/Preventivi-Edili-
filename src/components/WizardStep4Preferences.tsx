import React from "react";
import { TranslationDict } from "../data/translations";

interface Props {
  mode: "diy" | "pro" | "compare";
  setMode: (mode: "diy" | "pro" | "compare") => void;
  quality: "base" | "standard" | "premium";
  setQuality: (q: "base" | "standard" | "premium") => void;
  skillLevel: "beginner" | "handy" | "expert";
  setSkillLevel: (s: "beginner" | "handy" | "expert") => void;
  siteDifficulty: "low" | "medium" | "high";
  setSiteDifficulty: (d: "low" | "medium" | "high") => void;
  t: TranslationDict;
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
  t,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-1">{t.step4Title}</h2>
        <p className="text-sm text-slate-500">{t.step4Desc}</p>
      </div>

      {/* Modalità */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">{t.modeSelectLabel}</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: "compare", label: t.modeCompareLabel, desc: t.modeCompareDesc },
            { id: "pro", label: t.modeProLabel, desc: t.modeProDesc },
            { id: "diy", label: t.modeDiyLabel, desc: t.modeDiyDesc },
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
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">{t.qualitySelectLabel}</label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: "base", label: t.qualityBaseLabel, desc: t.qualityBaseDesc },
            { id: "standard", label: t.qualityStandardLabel, desc: t.qualityStandardDesc },
            { id: "premium", label: t.qualityPremiumLabel, desc: t.qualityPremiumDesc },
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
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">{t.skillSelectLabel}</label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: "beginner", label: t.skillBeginnerLabel, desc: t.skillBeginnerDesc },
            { id: "handy", label: t.skillHandyLabel, desc: t.skillHandyDesc },
            { id: "expert", label: t.skillExpertLabel, desc: t.skillExpertDesc },
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
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">{t.difficultySelectLabel}</label>
        <div className="grid grid-cols-3 gap-3">
          {[
            { id: "low", label: t.difficultyLowLabel, desc: t.difficultyLowDesc },
            { id: "medium", label: t.difficultyMediumLabel, desc: t.difficultyMediumDesc },
            { id: "high", label: t.difficultyHighLabel, desc: t.difficultyHighDesc },
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
