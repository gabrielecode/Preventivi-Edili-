import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Home, Calendar, ShieldCheck } from "lucide-react";
import { SeoHead } from "../../components/SeoHead";

export const GuidaRistrutturazioneCasa: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <SeoHead
        page="guide-ristrutturazione-casa"
        title="Ristrutturazione casa: Guida completa alla pianificazione e ai costi"
        description="Pianificare una ristrutturazione casa richiede metodo. Scopri i passaggi fondamentali, come gestire il budget e perché un preventivo dettagliato fa la differenza."
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 sm:p-12 prose prose-slate max-w-none">
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-6">
            Ristrutturazione casa: Guida completa alla pianificazione
          </h1>
          
          <p className="lead text-lg text-slate-600 mb-8">
            La ristrutturazione di una casa è un progetto emozionante ma complesso. Che si tratti di un restyling leggero o di un intervento strutturale, la chiave del successo risiede in una pianificazione rigorosa e nella scelta corretta dei professionisti. In questa guida, analizziamo i passi fondamentali per affrontare i lavori senza spiacevoli sorprese.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Definizione dell'obiettivo e del budget</h2>
          <p>Prima ancora di contattare un'impresa, è essenziale definire chiaramente cosa si vuole ottenere. Si tratta di un miglioramento dell'efficienza energetica, di una nuova disposizione degli spazi o di un semplice rinnovamento estetico? Una volta chiaro l'obiettivo, il budget deve essere realistico, includendo sempre una riserva di emergenza del 10-15% per imprevisti tecnici, sempre possibili in interventi su edifici esistenti.</p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Progettazione e Permessi</h2>
          <p>Non sottovalutare l'aspetto burocratico. Per interventi che modificano la struttura o la distribuzione interna, è necessario affidarsi a un tecnico abilitato (architetto, geometra o ingegnere) per presentare le pratiche necessarie (CILA, SCIA, a seconda della normativa locale). Per approfondimenti sulle normative in Canton Ticino, ti suggeriamo di consultare <a href="https://sititicino.ch" target="_blank" rel="noopener noreferrer" className="underline font-semibold">sititicino.ch</a>.</p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Selezione dell'impresa</h2>
          <p>La scelta dell'impresa edile è la decisione più importante. Non basarti esclusivamente sul prezzo più basso. Richiedi sempre preventivi dettagliati (computi metrici) per poter confrontare offerte omogenee. Un preventivo "a corpo" troppo generico è spesso fonte di futuri contenziosi o varianti in corso d'opera.</p>

          <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl mt-10">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Home className="w-5 h-5" /> Inizia con una stima chiara
            </h3>
            <p className="text-blue-800 mb-6">
              EdilFree ti aiuta a comprendere i costi reali del tuo progetto, offrendoti una visione chiara e strutturata prima ancora di iniziare. Evita errori di valutazione e pianifica il tuo budget con consapevolezza.
            </p>
            <Link
              to="/stima"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md"
            >
              Avvia la tua stima professionale <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
};
