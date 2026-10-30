import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Users } from "lucide-react";
import { SeoHead } from "../../components/SeoHead";

export const GuidaScegliereImpresa: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <SeoHead
        page="guide-scegliere-impresa"
        title="Come scegliere l'impresa edile: Guida alla selezione"
        description="Non sai quale impresa edile scegliere? Scopri come valutare preventivi, referenze e professionalità per la tua ristrutturazione."
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 sm:p-12 prose prose-slate max-w-none">
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-6">
            Come scegliere l'impresa edile
          </h1>
          
          <p className="lead text-lg text-slate-600 mb-8">
            La scelta dell'impresa edile è probabilmente la decisione più importante che prenderai durante la ristrutturazione della tua casa. Un partner affidabile non solo garantisce la qualità dei lavori, ma ti solleva da gran parte dello stress legato alla gestione tecnica del cantiere.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Cosa valutare</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-700">
            <li><strong>Esperienza e referenze:</strong> Chiedi di visitare lavori già conclusi e parla con i precedenti clienti.</li>
            <li><strong>Capacità tecnica:</strong> L'impresa ha le competenze per gestire il tuo tipo di progetto?</li>
            <li><strong>Trasparenza nei preventivi:</strong> Un preventivo chiaro e dettagliato è sintomo di professionalità.</li>
            <li><strong>Solidità economica e assicurativa:</strong> Verifica che l'impresa sia regolarmente iscritta e assicurata.</li>
          </ul>

          <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl mt-10">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" /> Inizia con una solida base di conoscenza
            </h3>
            <p className="text-blue-800 mb-6">
              EdilFree ti fornisce gli strumenti per confrontare le tue esigenze con i costi di mercato, permettendoti di approcciare le imprese edili con consapevolezza e solidità.
            </p>
            <Link
              to="/stima"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md"
            >
              Ottieni una stima iniziale <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
};
