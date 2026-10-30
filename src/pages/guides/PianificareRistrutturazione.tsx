import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, CheckCircle2, ShieldCheck, Info, AlertTriangle, Hammer, Wrench } from "lucide-react";
import { SeoHead } from "../../components/SeoHead";

export const GuidaPianificazione: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <SeoHead
        page="guide-pianificazione"
        title="Come pianificare una ristrutturazione casa: Guida tecnica al progetto"
        description="Guida tecnica alla pianificazione della ristrutturazione: fasi del progetto, gestione del budget, aspetti contrattuali e gestione del cantiere per evitare stress."
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 sm:p-12 prose prose-slate max-w-none">
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-4">
            Come pianificare una ristrutturazione casa: Guida tecnica al progetto
          </h1>
          <p className="lead text-lg text-slate-600 mb-8">
            Una ristrutturazione riuscita non è frutto del caso, ma di un processo tecnico rigoroso. La differenza tra un cantiere che si trascina per mesi tra ritardi e costi extra e uno che si chiude rispettando tempi e budget risiede interamente nella fase di pianificazione. In questa guida tecnica, analizzeremo le fasi essenziali del processo edilizio, i documenti necessari e le strategie contrattuali per tutelare i tuoi interessi.
          </p>

          <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-8">
            <h3 className="flex items-center gap-2 font-bold text-emerald-900 mb-2">
              <CheckCircle2 className="w-5 h-5" /> Principali punti della guida
            </h3>
            <ul className="list-disc list-inside text-emerald-800 text-sm space-y-1">
              <li>Le 5 fasi tecniche di un progetto edilizio.</li>
              <li>Il Capitolato d'appalto: l'arma di difesa principale.</li>
              <li>Gestione del budget e accantonamento per imprevisti.</li>
              <li>Ruolo delle figure tecniche (Architetto, Direttore Lavori).</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Le fasi tecniche del processo</h2>
          <ol className="list-decimal list-inside space-y-4 mb-8 text-slate-700">
            <li><strong>Fattibilità e Rilievo:</strong> Analisi dello stato di fatto, rilievo geometrico e verifica della conformità urbanistica e catastale.</li>
            <li><strong>Progettazione e Permessi:</strong> Definizione del progetto, redazione del computo metrico e presentazione della pratica edilizia (CILA/SCIA).</li>
            <li><strong>Appalto:</strong> Selezione dell'impresa tramite confronto di computi metrici dettagliati.</li>
            <li><strong>Esecuzione e Direzione Lavori:</strong> Fase operativa con monitoraggio costante della qualità e dei tempi da parte del Direttore Lavori.</li>
            <li><strong>Collaudo e Chiusura:</strong> Verifica finale, aggiornamento catastale (fine lavori) e consegna documentazione finale.</li>
          </ol>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Il Capitolato d'appalto: il contratto</h2>
          <p>
            Il capitolato non è un optional. Deve definire con precisione chirurgica:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 mb-8">
            <li>L'esatto ambito di intervento (cosa è incluso, cosa è escluso).</li>
            <li>Le specifiche tecniche dei materiali (es. non solo "piastrelle", ma "gres porcellanato 60x60 marca X, posa dritta, fuga 2mm").</li>
            <li>I tempi di esecuzione e le penali per ritardo ingiustificato.</li>
            <li>Le modalità di pagamento (legate ad avanzamenti lavori certificati, mai pagare l'intero importo in anticipo!).</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Gestione del rischio e imprevisti</h2>
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl my-6">
            <h3 className="flex items-center gap-2 font-bold text-amber-900 mb-2">
              <AlertTriangle className="w-5 h-5" /> Strategia Anti-Stress
            </h3>
            <p className="text-amber-900 text-sm">
              Non accettare varianti in corso d'opera verbali. Ogni modifica deve essere autorizzata per iscritto con il relativo costo aggiuntivo (o di risparmio) firmato da entrambe le parti. Questo evita contenziosi finali e mantiene il budget sotto controllo.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Chi sono le figure chiave?</h2>
          <ul className="space-y-4 text-slate-700 mb-8">
            <li><strong>Direttore Lavori (DL):</strong> Il tuo garante in cantiere. Deve essere un tecnico abilitato (Architetto/Ingegnere/Geometra) che controlla che l'impresa lavori secondo il progetto e le norme tecniche.</li>
            <li><strong>Coordinatore Sicurezza (CSP/CSE):</strong> Obbligatorio per legge nei cantieri dove operano più ditte, garantisce la sicurezza dei lavoratori.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">FAQ - Domande frequenti</h2>
          <div className="space-y-4 mb-8">
            <div>
              <h3 className="font-bold text-slate-900">Perché i tempi si allungano?</h3>
              <p className="text-sm text-slate-600">Ritardi nella consegna materiali, condizioni meteo avverse o modifiche progettuali in corso d'opera.</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Qual è la fase più critica?</h3>
              <p className="text-sm text-slate-600">La fase di progettazione e appalto: più tempo investi qui, meno problemi avrai in cantiere.</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl mt-10">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5" /> Pianifica il tuo successo
            </h3>
            <p className="text-blue-800 mb-6">
              Una ristrutturazione consapevole parte da una stima tecnica realistica. EdilFree ti aiuta a mettere a fuoco i costi e la struttura dei lavori.
            </p>
            <Link
              to="/stima"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md"
            >
              Pianifica la tua stima <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-xs text-slate-400 mt-8 text-center italic">
            Nota: La ristrutturazione edilizia è un processo regolato da normative severe. Questa guida ha scopo informativo; per l'esecuzione dei lavori, avvaliti sempre di tecnici professionisti abilitati.
          </p>
        </article>
      </main>
    </div>
  );
};
