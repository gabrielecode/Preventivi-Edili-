import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, PaintBucket, CheckCircle2, AlertTriangle, Scale } from "lucide-react";
import { SeoHead } from "../../components/SeoHead";

export const HowToTinteggiare: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <SeoHead
        page="guide-tinteggiare"
        title="Come Tinteggiare una Stanza: Guida Completa Fai-da-Te vs Professionista"
        description="Scopri come tinteggiare una stanza a regola d'arte. Analisi costi, attrezzi necessari e quando conviene rivolgersi a un professionista con EdilFree."
      />

      <main className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        <article className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 sm:p-12">
          
          <div className="mb-8">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
              Guida EdilFree
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-4">
              Come Tinteggiare una Stanza: Guida Completa Fai-da-Te vs Professionista
            </h1>
            <p className="text-lg text-slate-600">
              Tinteggiare le pareti è uno dei modi più efficaci per rinnovare casa, ma la scelta tra fare da soli o affidarsi a un professionista può cambiare drasticamente il risultato e il budget.
            </p>
          </div>

          <div className="prose prose-slate max-w-none mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Perché è importante una buona preparazione</h2>
            <p>La riuscita di un lavoro di tinteggiatura dipende al 70% dalla preparazione della superficie. Crepe, umidità o pareti sporche devono essere trattate prima di applicare il colore, altrimenti il risultato sarà deludente e poco duraturo.</p>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                <h3 className="flex items-center gap-2 font-bold text-emerald-900 mb-2">
                  <CheckCircle2 className="w-5 h-5" /> Fai-da-Te
                </h3>
                <ul className="text-sm text-emerald-800 space-y-2 list-disc list-inside">
                  <li>Risparmio economico notevole</li>
                  <li>Soddisfazione personale</li>
                  <li>Gestione dei tempi flessibile</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <h3 className="flex items-center gap-2 font-bold text-blue-900 mb-2">
                  <Scale className="w-5 h-5" /> Professionista
                </h3>
                <ul className="text-sm text-blue-800 space-y-2 list-disc list-inside">
                  <li>Risultato garantito e uniforme</li>
                  <li>Attrezzature professionali (spruzzatori)</li>
                  <li>Velocità di esecuzione</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">I passaggi fondamentali</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li><strong>Protezione:</strong> Spostare i mobili e proteggere pavimenti e battiscopa con nastro carta e teli.</li>
              <li><strong>Stuccatura e Levigatura:</strong> Riempire i fori e levigare le imperfezioni.</li>
              <li><strong>Fissativo:</strong> Applicare una mano di primer per migliorare l'adesione del colore.</li>
              <li><strong>Pittura:</strong> Applicare almeno due mani di idropittura, rispettando i tempi di asciugatura.</li>
            </ol>

            <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl mt-8">
              <h3 className="flex items-center gap-2 font-bold text-amber-900 mb-2">
                <AlertTriangle className="w-5 h-5" /> Nota bene
              </h3>
              <p className="text-sm text-amber-800">
                Se la stanza presenta segni di muffa o umidità di risalita, non limitarti a coprire con il colore. È fondamentale rimuovere la causa del problema prima di tinteggiare per evitare che si ripresenti dopo poche settimane.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-8 border-t border-slate-100">
            <p className="text-slate-600">Pronto a scoprire quanto costerebbe il tuo lavoro?</p>
            <Link
              to="/stima"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all"
            >
              Calcola ora la stima <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
};
