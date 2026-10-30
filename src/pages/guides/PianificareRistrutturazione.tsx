import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, CheckCircle } from "lucide-react";
import { SeoHead } from "../../components/SeoHead";

export const GuidaPianificazione: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <SeoHead
        page="guide-pianificazione"
        title="Come ristrutturare casa senza stress: 5 consigli"
        description="Scopri come pianificare una ristrutturazione casa senza stress. Consigli pratici per gestire tempi, imprese e budget in modo organizzato."
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 sm:p-12 prose prose-slate max-w-none">
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-6">
            Come ristrutturare casa senza stress
          </h1>
          
          <p className="lead text-lg text-slate-600 mb-8">
            La ristrutturazione di casa è spesso vista come un periodo di forte stress. Tuttavia, con la giusta preparazione, è possibile gestire il processo in modo ordinato e sereno. Ecco 5 consigli pratici per pianificare i tuoi lavori come un professionista.
          </p>

          <ol className="list-decimal list-inside space-y-4 text-slate-700">
            <li><strong>Pianifica con largo anticipo:</strong> Definisci l'ambito dei lavori almeno 3-6 mesi prima.</li>
            <li><strong>Definisci un budget realistico:</strong> Includi sempre una voce per gli imprevisti.</li>
            <li><strong>Affidati a professionisti referenziati:</strong> La qualità del lavoro dipende da chi lo esegue.</li>
            <li><strong>Richiedi contratti chiari:</strong> Tutto ciò che è concordato deve essere messo per iscritto.</li>
            <li><strong>Mantieni una comunicazione costante:</strong> Verifica periodicamente l'avanzamento dei lavori.</li>
          </ol>

          <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl mt-10">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" /> Pianifica il tuo progetto con EdilFree
            </h3>
            <p className="text-blue-800 mb-6">
              Organizzare una ristrutturazione inizia con la consapevolezza dei costi. EdilFree ti supporta in questa fase critica offrendoti chiarezza e strumenti per gestire il tuo budget.
            </p>
            <Link
              to="/stima"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md"
            >
              Pianifica la tua stima <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
};
