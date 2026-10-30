import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Home, AlertTriangle, CheckCircle2, ShieldCheck, Info, Hammer, Wrench, Calendar } from "lucide-react";
import { SeoHead } from "../../components/SeoHead";

export const GuidaRistrutturazioneCasa: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <SeoHead
        page="guide-ristrutturazione-casa"
        title="Guida Tecnica alla Ristrutturazione Casa: Pianificazione e Gestione"
        description="Guida tecnica completa alla ristrutturazione: fasi del progetto, gestione del budget, burocrazia edilizia, gestione dell'impresa e prevenzione dei rischi cantiere."
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Homepage
        </Link>
        <article className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 sm:p-12 prose prose-slate max-w-none">
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-4">
            Guida Tecnica alla Ristrutturazione Casa: Pianificazione e Gestione
          </h1>
          <p className="lead text-lg text-slate-600 mb-8">
            Ristrutturare casa è un'operazione complessa che trasforma un immobile, ma che, se non gestita con metodo, può trasformarsi in un incubo finanziario e gestionale. Il successo di un intervento edilizio non dipende dalla sola qualità delle finiture, ma dalla solidità della fase di pianificazione, dalla chiarezza del contratto d'appalto e dal controllo costante del cantiere. Questa guida tecnica delinea il percorso professionale per affrontare i lavori con consapevolezza, minimizzando rischi e incertezze.
          </p>

          <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-8">
            <h3 className="flex items-center gap-2 font-bold text-emerald-900 mb-2">
              <CheckCircle2 className="w-5 h-5" /> Principali punti della guida
            </h3>
            <ul className="list-disc list-inside text-emerald-800 text-sm space-y-1">
              <li>Le fasi del processo edilizio: dal rilievo al collaudo.</li>
              <li>La burocrazia: CILA, SCIA e le responsabilità tecniche.</li>
              <li>Il Capitolato: come blindare il contratto d'appalto.</li>
              <li>Gestione del budget e accantonamento per imprevisti.</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Il Processo Edilizio: Le fasi tecniche</h2>
          <ol className="list-decimal list-inside space-y-4 mb-8 text-slate-700">
            <li><strong>Fattibilità e Rilievo:</strong> Non si progetta senza un rilievo geometrico accurato. Verifica la conformità catastale e urbanistica (fondamentale per accedere a bonus fiscali).</li>
            <li><strong>Progettazione e Pratiche:</strong> Redazione del progetto tecnico. Presentazione della pratica edilizia (CILA, SCIA) al Comune.</li>
            <li><strong>Appalto (Scelta Impresa):</strong> Confronto basato sul Computo Metrico Estimativo (CME). <strong>Attenzione:</strong> Il CME deve essere analizzato voce per voce.</li>
            <li><strong>Esecuzione (Cantiere):</strong> Gestione della sicurezza (DVR/POS), controllo dei materiali, verifica delle tempistiche e della qualità.</li>
            <li><strong>Chiusura Lavori:</strong> Fine lavori, aggiornamento catastale e consegna delle certificazioni di conformità degli impianti.</li>
          </ol>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Il Capitolato: La protezione principale</h2>
          <p>
            Un preventivo generico ("ristrutturazione bagno: 5000€") è una minaccia. Il capitolato tecnico deve includere:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 mb-8">
            <li><strong>Specifiche Materiali:</strong> Marca, modello e tipologia (es. " Gres Porcellanato spessore 10mm, PEI 4").</li>
            <li><strong>Lavorazioni:</strong> Descrizione tecnica delle fasi di posa.</li>
            <li><strong>Esclusioni:</strong> Cosa non è compreso (es. smaltimento macerie, nuove prese, tinteggiature).</li>
            <li><strong>Penali:</strong> Penali giornaliere per ritardi ingiustificati nella consegna.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Gestione del budget e rischi</h2>
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl my-6">
            <h3 className="flex items-center gap-2 font-bold text-amber-900 mb-2">
              <AlertTriangle className="w-5 h-5" /> Regole del budget
            </h3>
            <ul className="list-disc list-inside text-amber-900 text-sm space-y-1">
              <li><strong>Fondo Imprevisti:</strong> Accantona sempre il 15% del costo totale preventivato per far fronte a emergenze strutturali o modifiche necessarie.</li>
              <li><strong>Pagamenti:</strong> Mai pagare l'intero importo all'inizio. Il pagamento deve essere legato agli stati di avanzamento (SAL) verificati in cantiere.</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Chi sono le figure chiave?</h2>
          <div className="space-y-4 mb-8">
            <p><strong>Direttore Lavori (DL):</strong> Deve essere un tecnico abilitato e indipendente dall'impresa. È il tuo unico referente tecnico che verifica che i materiali e le tecniche di posa siano quelli pattuiti.</p>
            <p><strong>Coordinatore Sicurezza (CSE):</strong> Figura obbligatoria in cantieri con più ditte; garantisce che gli operai lavorino in sicurezza (evitando responsabilità penali al committente).</p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">FAQ - Domande frequenti</h2>
          <div className="space-y-4 mb-8">
            <div>
              <h3 className="font-bold text-slate-900">Come gestire le varianti in corso d'opera?</h3>
              <p className="text-sm text-slate-600">Richiedi sempre un preventivo scritto per ogni modifica al progetto iniziale prima che la lavorazione venga eseguita.</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl mt-10">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" /> Pianifica con EdilFree
            </h3>
            <p className="text-blue-800 mb-6">
              EdilFree ti supporta nella pianificazione tecnica e nella stima dei costi, garantendoti gli strumenti per affrontare la ristrutturazione senza brutte sorprese.
            </p>
            <Link
              to="/stima"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md"
            >
              Avvia la stima tecnica <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-xs text-slate-400 mt-8 text-center italic">
            Nota: La ristrutturazione edilizia richiede il rispetto rigoroso di norme tecniche e burocratiche. Questa guida ha scopo informativo; avvaliti sempre di tecnici professionisti abilitati per gestire il tuo progetto.
          </p>
        </article>
      </main>
    </div>
  );
};
