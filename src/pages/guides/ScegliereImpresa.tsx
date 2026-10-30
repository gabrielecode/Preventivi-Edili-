import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Users, ShieldCheck, CheckCircle2, Info, AlertTriangle, Hammer, Wrench, Calendar } from "lucide-react";
import { SeoHead } from "../../components/SeoHead";

export const GuidaScegliereImpresa: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <SeoHead
        page="guide-scegliere-impresa"
        title="Come scegliere l'impresa edile: Guida tecnica alla selezione e tutela"
        description="Guida tecnica alla scelta dell'impresa edile: verifica documentale (DURC, visure), valutazione dei preventivi (CME), contratti e gestione professionale dei rapporti in cantiere."
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 sm:p-12 prose prose-slate max-w-none">
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-4">
            Come scegliere l'impresa edile: Guida tecnica alla selezione e tutela
          </h1>
          <p className="lead text-lg text-slate-600 mb-8">
            Scegliere l'impresa edile è la decisione che determina il successo o il fallimento della tua ristrutturazione. Un'impresa non è solo un fornitore di manodopera, ma un partner tecnico responsabile della qualità esecutiva e, soprattutto, della sicurezza in cantiere. Questa guida tecnica ti insegna come effettuare una "due diligence" corretta, come analizzare i preventivi in modo critico e come strutturare il rapporto contrattuale per evitare contenziosi.
          </p>

          <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-8">
            <h3 className="flex items-center gap-2 font-bold text-emerald-900 mb-2">
              <CheckCircle2 className="w-5 h-5" /> Principali punti della guida
            </h3>
            <ul className="list-disc list-inside text-emerald-800 text-sm space-y-1">
              <li>Due diligence: verifica della regolarità documentale.</li>
              <li>Analisi tecnica del preventivo: perché il prezzo più basso è un segnale d'allarme.</li>
              <li>Strutturazione del contratto: penali, SAL, garanzie.</li>
              <li>Gestione del cantiere: importanza della Direzione Lavori.</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Due Diligence: Verifica Documentale</h2>
          <p>
            Prima di firmare qualsiasi impegno, richiedi obbligatoriamente i seguenti documenti:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 mb-8">
            <li><strong>Visura Camerale aggiornata:</strong> Per verificare che l'oggetto sociale comprenda le attività edilizie e che l'impresa sia attiva.</li>
            <li><strong>DURC (Documento Unico di Regolarità Contributiva):</strong> Fondamentale. Senza DURC, il committente (tu) può essere chiamato a rispondere solidalmente per i contributi non versati dall'impresa.</li>
            <li><strong>Assicurazione RC:</strong> Verifica l'esistenza di una polizza assicurativa che copra danni a terzi e a cose causati durante i lavori.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Analisi tecnica del preventivo</h2>
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl my-6">
            <h3 className="flex items-center gap-2 font-bold text-amber-900 mb-2">
              <AlertTriangle className="w-5 h-5" /> Attenzione ai preventivi "a corpo"
            </h3>
            <p className="text-amber-900 text-sm">
              Un preventivo che recita "ristrutturazione bagno: 4.000€" è un rischio altissimo. Esigi sempre un <strong>Computo Metrico Estimativo (CME)</strong>: deve elencare le voci (es. "demolizione pavimenti mq X", "posa nuova tubazione metri Y"), le quantità e i prezzi unitari. Solo così potrai confrontare i preventivi di diverse imprese sulla stessa base di lavoro.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Strutturare il contratto</h2>
          <p>
            Il contratto d'appalto non è solo un accordo economico. Deve contenere clausole di tutela:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 mb-8">
            <li><strong>Tempi:</strong> Data di inizio e data di fine lavori.</li>
            <li><strong>Penali:</strong> Penali pecuniarie giornaliere in caso di ritardo ingiustificato.</li>
            <li><strong>Pagamenti (SAL):</strong> Pagamenti legati esclusivamente a Stati di Avanzamento Lavori (SAL) certificati dal Direttore Lavori.</li>
            <li><strong>Garanzie:</strong> Clausole sulla garanzia post-lavori (di solito 2 anni sui difetti occulti).</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Fai-da-te vs Professionista</h2>
          <p>
            Il coordinamento di un cantiere non è un lavoro per dilettanti. Se la complessità è alta (impianti, strutture), l'impresa deve essere supportata da un <strong>Direttore Lavori</strong> di tua fiducia. Non delegare mai la direzione tecnica all'impresa stessa: il Direttore Lavori deve essere il tuo garante, non quello di chi esegue i lavori.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">FAQ</h2>
          <div className="space-y-4 mb-8">
            <div>
              <h3 className="font-bold text-slate-900">Il preventivo più basso è sempre il migliore?</h3>
              <p className="text-sm text-slate-600">Assolutamente no. Spesso è sintomo di scarsa qualità dei materiali, sottovalutazione delle lavorazioni o assenza di corrette coperture contributive.</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl mt-10">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5" /> Scegli con consapevolezza
            </h3>
            <p className="text-blue-800 mb-6">
              EdilFree ti fornisce gli strumenti e la conoscenza tecnica per valutare le imprese e analizzare i preventivi, minimizzando il rischio di brutte sorprese.
            </p>
            <Link
              to="/stima"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md"
            >
              Ottieni stima tecnica <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-xs text-slate-400 mt-8 text-center italic">
            Nota: La scelta dell'impresa edile comporta responsabilità legali e di sicurezza. Questa guida ha scopo informativo; per la contrattualizzazione dei lavori, rivolgiti sempre a legali o tecnici professionisti.
          </p>
        </article>
      </main>
    </div>
  );
};
