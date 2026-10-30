import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Droplets } from "lucide-react";
import { SeoHead } from "../../components/SeoHead";

export const GuidaScaldabagno: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <SeoHead
        page="guide-scaldabagno"
        title="Scaldabagno: Elettrico o a Gas? Guida alla scelta"
        description="Scopri quale scaldabagno scegliere: elettrico o a gas? Analisi dei consumi, efficienza e consigli per l'installazione."
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 sm:p-12 prose prose-slate max-w-none">
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-6">
            Scaldabagno: Elettrico o a Gas?
          </h1>
          
          <p className="lead text-lg text-slate-600 mb-8">
            La scelta dello scaldabagno influisce direttamente sui consumi energetici domestici. Ecco una panoramica per fare la scelta più efficiente.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Elettrico vs Gas</h2>
          <p>Lo scaldabagno a <strong>gas</strong> (istantaneo) è generalmente più economico nel funzionamento quotidiano e ideale per famiglie numerose. Lo scaldabagno <strong>elettrico</strong> è più semplice da installare, ma i costi in bolletta possono essere elevati se non utilizzato con cautela.</p>

          <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl mt-10">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Droplets className="w-5 h-5" /> Scegli l'efficienza
            </h3>
            <p className="text-blue-800 mb-6">
              EdilFree ti supporta nella valutazione dei costi e dell'efficienza per il tuo nuovo scaldabagno.
            </p>
            <Link
              to="/stima"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md"
            >
              Ottieni stima <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
};
