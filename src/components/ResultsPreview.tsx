import React from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

interface Props {
  quoteResult: any;
  onReset: () => void;
}

export const ResultsPreview: React.FC<Props> = ({ quoteResult, onReset }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" /> Risultato Stima (Provvisorio - Task 4)
          </h2>
          <p className="text-sm text-slate-500">Ecco i dati restituiti dal server API. La pagina dei risultati completa arriverà nel Task 5.</p>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition-all cursor-pointer"
          type="button"
        >
          <ArrowLeft className="w-4 h-4" /> Nuova Stima
        </button>
      </div>

      <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl overflow-x-auto shadow-inner">
        <pre className="text-xs font-mono leading-relaxed text-emerald-400">
          {JSON.stringify(quoteResult, null, 2)}
        </pre>
      </div>
    </div>
  );
};
