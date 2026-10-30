import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, DoorOpen } from "lucide-react";
import { SeoHead } from "../../components/SeoHead";

export const GuidaInfissi: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <SeoHead
        page="guide-infissi"
        title="Come scegliere gli infissi: Doppio o Triplo Vetro?"
        description="Guida alla scelta degli infissi: scopri i vantaggi di doppio e triplo vetro, materiali come PVC, alluminio e legno per l'efficienza energetica."
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 sm:p-12 prose prose-slate max-w-none">
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-6">
            Come scegliere gli infissi: Guida completa
          </h1>
          
          <p className="lead text-lg text-slate-600 mb-8">
            Gli infissi sono fondamentali per l'isolamento termico e acustico della casa. La scelta tra materiali e tipologie di vetro incide sul comfort e sui consumi energetici.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Doppio o Triplo Vetro?</h2>
          <p>Il <strong>doppio vetro</strong> è lo standard per climi temperati e ristrutturazioni classiche. Il <strong>triplo vetro</strong> è la scelta obbligata per zone molto fredde, case passive o nuove costruzioni ad alta efficienza energetica, garantendo un isolamento superiore.</p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Materiali</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-700">
            <li><strong>PVC:</strong> Ottimo rapporto qualità-prezzo, isolamento elevato e bassa manutenzione.</li>
            <li><strong>Alluminio:</strong> Design moderno, duraturo, ideale per grandi vetrate, richiede taglio termico.</li>
            <li><strong>Legno:</strong> Estetica intramontabile, isolamento naturale eccellente, richiede manutenzione periodica.</li>
          </ul>

          <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl mt-10">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5" /> Investi nell'efficienza
            </h3>
            <p className="text-blue-800 mb-6">
              EdilFree ti aiuta a valutare l'impatto economico della sostituzione degli infissi, guidandoti verso la scelta più efficiente per la tua casa.
            </p>
            <Link
              to="/stima"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md"
            >
              Calcola la tua stima <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
};
