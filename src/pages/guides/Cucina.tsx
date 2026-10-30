import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Utensils } from "lucide-react";
import { SeoHead } from "../../components/SeoHead";

export const GuidaCucina: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <SeoHead
        page="guide-cucina"
        title="Come scegliere la cucina: Guida pratica"
        description="Pianifica la tua cucina ideale: scelta dei materiali, piano di lavoro e disposizione degli elettrodomestici per una cucina funzionale."
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 sm:p-12 prose prose-slate max-w-none">
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-6">
            Come scegliere la cucina
          </h1>
          
          <p className="lead text-lg text-slate-600 mb-8">
            La cucina è il cuore della casa. La sua progettazione richiede un equilibrio perfetto tra estetica, funzionalità e gestione degli spazi.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Elementi chiave</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-700">
            <li><strong>Piano di lavoro:</strong> Laminato (economico), gres (resistente al calore), quarzo (estetico e robusto).</li>
            <li><strong>Disposizione:</strong> Rispetta il "triangolo d'oro" (frigo - lavello - piano cottura) per massimizzare l'efficienza.</li>
          </ul>

          <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl mt-10">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Utensils className="w-5 h-5" /> Inizia la tua progettazione
            </h3>
            <p className="text-blue-800 mb-6">
              EdilFree ti supporta nella valutazione dei costi per la realizzazione della tua nuova cucina.
            </p>
            <Link
              to="/stima"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md"
            >
              Richiedi stima <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
};
