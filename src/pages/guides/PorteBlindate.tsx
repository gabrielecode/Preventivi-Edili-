import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { SeoHead } from "../../components/SeoHead";

export const GuidaPorteBlindate: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <SeoHead
        page="guide-porte-blindate"
        title="Come scegliere la porta blindata: Classi antieffrazione"
        description="Guida alla scelta della porta blindata: scopri le classi RC2, RC3 e RC4 e come proteggere la tua casa con la serratura giusta."
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 sm:p-12 prose prose-slate max-w-none">
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-6">
            Come scegliere la porta blindata
          </h1>
          
          <p className="lead text-lg text-slate-600 mb-8">
            Una porta blindata non è solo un elemento d'arredo, ma il primo baluardo di sicurezza della tua casa. Ecco come orientarsi tra classi e componenti.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Le Classi Antieffrazione (RC)</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-700">
            <li><strong>RC2:</strong> Minimo decente per appartamenti, resiste a cacciaviti e leve corte (3 minuti).</li>
            <li><strong>RC3:</strong> Consigliata per villette o piani terra, resiste a leve lunghe e mazzetta (5 minuti).</li>
            <li><strong>RC4:</strong> Per zone ad alto rischio, resiste a seghe e scalpelli (10 minuti).</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Serratura e struttura</h2>
          <p>La serratura è il cuore della sicurezza. Assicurati che sia dotata di cilindro europeo a prova di manipolazione (anti-bumping) e protezione antitrapano.</p>

          <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl mt-10">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" /> Scegli la sicurezza giusta
            </h3>
            <p className="text-blue-800 mb-6">
              EdilFree ti aiuta a pianificare l'investimento per una porta blindata adatta alle tue esigenze di sicurezza.
            </p>
            <Link
              to="/stima"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md"
            >
              Richiedi la tua stima <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
};
