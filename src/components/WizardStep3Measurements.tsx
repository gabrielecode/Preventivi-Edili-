import React from "react";
import { Info } from "lucide-react";

interface Props {
  areaMq: number;
  setAreaMq: (val: number) => void;
  lengthMl: number;
  setLengthMl: (val: number) => void;
  quantityCad: number;
  setQuantityCad: (val: number) => void;
  workDescription: string;
  setWorkDescription: (val: string) => void;
}

export const WizardStep3Measurements: React.FC<Props> = ({
  areaMq,
  setAreaMq,
  lengthMl,
  setLengthMl,
  quantityCad,
  setQuantityCad,
  workDescription,
  setWorkDescription,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-1">Misure e descrizione del lavoro</h2>
        <p className="text-sm text-slate-500">Inserisci le dimensioni approssimative del cantiere e descrivi cosa desideri realizzare.</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-xs text-amber-900">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold mb-0.5">Suggerimento utile per le misure:</p>
          <p className="text-amber-800">Misura larghezza × altezza delle pareti per calcolare i metri quadrati (mq). Per elementi lineari (battiscopa, tubi) misura lo sviluppo in metri lineari (ml).</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Superficie (mq)</label>
          <input
            type="number"
            min="0"
            value={areaMq || ""}
            onChange={(e) => setAreaMq(Number(e.target.value))}
            placeholder="Es. 45"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Sviluppo lineare (ml)</label>
          <input
            type="number"
            min="0"
            value={lengthMl || ""}
            onChange={(e) => setLengthMl(Number(e.target.value))}
            placeholder="Es. 12"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">Numero elementi (cad)</label>
          <input
            type="number"
            min="0"
            value={quantityCad || ""}
            onChange={(e) => setQuantityCad(Number(e.target.value))}
            placeholder="Es. 4"
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
          Descrizione libera dei lavori *
        </label>
        <textarea
          rows={4}
          value={workDescription}
          onChange={(e) => setWorkDescription(e.target.value)}
          placeholder="Descrivi dettagliatamente cosa deve essere fatto (es. imbiancare soggiorno con presenza di lieve umidità angolare, stuccatura crepe e rifinitura con due mani di idropittura lavabile)..."
          className="w-full px-3.5 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
        />
      </div>
    </div>
  );
};
