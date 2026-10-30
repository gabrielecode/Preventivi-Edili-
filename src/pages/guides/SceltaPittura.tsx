import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, PaintBucket } from "lucide-react";
import { SeoHead } from "../../components/SeoHead";

export const GuidaSceltaPittura: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <SeoHead
        page="guide-scelta-pittura"
        title="Come scegliere la pittura per interni: Lavabile o Traspirante?"
        description="Non tutte le pitture sono uguali. Scopri le differenze tra pittura lavabile e traspirante per fare la scelta giusta per ogni stanza della tua casa."
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 sm:p-12 prose prose-slate max-w-none">
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-6">
            Come scegliere la pittura per interni: Lavabile o Traspirante?
          </h1>
          
          <p className="lead text-lg text-slate-600 mb-8">
            La scelta della pittura corretta è fondamentale per la salute delle pareti e la vivibilità degli ambienti. Lavabile o traspirante? Opaca o satinata? Analizziamo le differenze per orientare il tuo acquisto.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Le tipologie principali</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-700">
            <li><strong>Pittura traspirante:</strong> Ideale per ambienti soggetti a vapore come bagno e cucina. Permette al muro di "respirare", riducendo il rischio di condensa e muffa.</li>
            <li><strong>Pittura lavabile:</strong> Perfetta per zone ad alto passaggio come corridoi, camerette e soggiorno. È più resistente e facile da pulire con un panno umido.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Finitura: Opaca o Satinata?</h2>
          <p>L'opaco nasconde meglio le piccole imperfezioni della parete, mentre il satinato offre una superficie più brillante, resistente e facile da pulire, ma richiede una base perfettamente levigata.</p>

          <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl mt-10">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <PaintBucket className="w-5 h-5" /> Decidi con consapevolezza
            </h3>
            <p className="text-blue-800 mb-6">
              EdilFree ti supporta nella scelta, aiutandoti a comprendere le implicazioni tecniche ed economiche delle diverse tipologie di pittura.
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
