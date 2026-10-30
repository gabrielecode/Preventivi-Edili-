import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Receipt, Calculator } from "lucide-react";
import { SeoHead } from "../../components/SeoHead";

export const GuidaCostiRistrutturazione: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <SeoHead
        page="guide-costi-ristrutturazione"
        title="Quanto costa ristrutturare casa? Guida ai prezzi medi"
        description="Scopri quali sono le principali voci di spesa in una ristrutturazione. Analisi dei costi medi e come gestire il budget in modo intelligente con EdilFree."
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 sm:p-12 prose prose-slate max-w-none">
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-6">
            Quanto costa ristrutturare casa? Guida ai prezzi medi
          </h1>
          
          <p className="lead text-lg text-slate-600 mb-8">
            La domanda "quanto costa ristrutturare casa" non ha una risposta univoca, ma esistono dei parametri di riferimento che possono aiutarti a formulare un budget realistico. In questa guida, esploriamo le principali variabili che influenzano i costi e come ottenere una stima precisa.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Le voci di spesa principali</h2>
          <p>Un progetto di ristrutturazione si compone di diverse fasi, ognuna con costi differenti:</p>
          <ul className="list-disc list-inside space-y-2 text-slate-700">
            <li><strong>Demolizioni e smaltimento:</strong> Costi legati alla rimozione di tramezzi, pavimenti e impianti esistenti.</li>
            <li><strong>Impiantistica:</strong> Rifacimento di impianti idraulici ed elettrici (spesso la voce più costosa in termini di manodopera tecnica).</li>
            <li><strong>Opere murarie e finiture:</strong> Nuovi intonaci, massetti, posa pavimenti e rivestimenti.</li>
            <li><strong>Serramenti e impianti di climatizzazione:</strong> Investimenti che impattano sull'efficienza energetica.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">La gestione del budget</h2>
          <p>Il rischio maggiore in una ristrutturazione è lo sforamento del budget iniziale. Per evitarlo, è fondamentale avere in mano un computo metrico estimativo redatto da un tecnico, che dettagli ogni singola lavorazione, quantità e prezzo unitario. Confronta sempre i preventivi su basi omogenee.</p>

          <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl mt-10">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5" /> Analizza i costi in anticipo
            </h3>
            <p className="text-blue-800 mb-6">
              Con EdilFree puoi ottenere una stima realistica dei costi basata sulle tue esigenze specifiche. Gestisci il tuo budget con serenità e pianifica ogni euro del tuo investimento.
            </p>
            <Link
              to="/stima"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md"
            >
              Calcola la tua stima ora <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
};
