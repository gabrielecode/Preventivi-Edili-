import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Flame, Zap } from "lucide-react";
import { SeoHead } from "../../components/SeoHead";

export const GuidaCaldaia: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <SeoHead
        page="guide-scelta-caldaia"
        title="Come scegliere la caldaia: Condensazione o Pompa di Calore?"
        description="Guida alla scelta della caldaia ideale: condensazione vs pompa di calore, potenze in kW e consigli per l'efficienza energetica."
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 sm:p-12 prose prose-slate max-w-none">
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-6">
            Come scegliere la caldaia: Condensazione o Pompa di Calore?
          </h1>
          
          <p className="lead text-lg text-slate-600 mb-8">
            La sostituzione della caldaia è un passo cruciale per l'efficienza energetica della tua casa. Il primo bivio è tra caldaia a condensazione e pompa di calore.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Condensazione o Pompa di Calore?</h2>
          <p>La <strong>caldaia a condensazione</strong> è ideale per sostituire vecchi impianti a gas in abitazioni esistenti, sfruttando l'alta temperatura. La <strong>pompa di calore</strong> è la scelta vincente per nuove costruzioni o case ad alta efficienza, operando al meglio con impianti a bassa temperatura (riscaldamento a pavimento).</p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Potenza e fabbisogno</h2>
          <p>La potenza (kW) della caldaia va dimensionata in base al fabbisogno termico dell'edificio e alla produzione di acqua calda sanitaria. Un sovradimensionamento porta sprechi, un sottodimensionamento comfort ridotto.</p>

          <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl mt-10">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Flame className="w-5 h-5" /> Scegli con EdilFree
            </h3>
            <p className="text-blue-800 mb-6">
              Hai dubbi sulla soluzione migliore? EdilFree ti aiuta a orientarti tra le opzioni e a stimare l'investimento necessario per un impianto efficiente.
            </p>
            <Link
              to="/stima"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md"
            >
              Avvia la stima <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
};
