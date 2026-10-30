import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, PaintBucket, ShieldCheck, CheckCircle2, Info, AlertTriangle, Hammer, Wrench } from "lucide-react";
import { SeoHead } from "../../components/SeoHead";

export const GuidaSceltaPittura: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <SeoHead
        page="guide-scelta-pittura"
        title="Come scegliere la pittura per interni: Guida tecnica alle finiture"
        description="Guida tecnica alla scelta della pittura: analisi delle tipologie (lavabile, traspirante, idropittura), finiture (opaco, satinato), preparazione del fondo e consigli per contrastare muffa e condensa."
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 sm:p-12 prose prose-slate max-w-none">
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-4">
            Come scegliere la pittura per interni: Guida tecnica alle finiture
          </h1>
          <p className="lead text-lg text-slate-600 mb-8">
            La scelta della pittura per interni non è solo un atto estetico, ma una decisione tecnica che influisce sulla durabilità delle pareti, sulla qualità dell'aria interna e sulla facilità di manutenzione. Non esiste la "pittura perfetta", ma quella corretta per ogni specifica stanza e supporto. In questa guida tecnica, esploreremo le tipologie di pitture, come preparare il fondo per un risultato a regola d'arte e come affrontare problematiche specifiche come muffe o umidità.
          </p>

          <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-8">
            <h3 className="flex items-center gap-2 font-bold text-emerald-900 mb-2">
              <CheckCircle2 className="w-5 h-5" /> Principali punti della guida
            </h3>
            <ul className="list-disc list-inside text-emerald-800 text-sm space-y-1">
              <li>Classificazione: Lavabili, traspiranti e bio-pitture.</li>
              <li>Finitura ed estetica: Opaco vs Satinato (pro e contro).</li>
              <li>Preparazione del fondo: L'importanza del fissativo.</li>
              <li>Soluzioni tecniche per muffa e condensa.</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Tipologie di Pittura</h2>
          <ul className="space-y-4 text-slate-700 mb-8">
            <li>
              <strong>Pittura Traspirante:</strong> Formulazione ad alta permeabilità al vapore acqueo. È la scelta obbligatoria per bagni, cucine e locali lavanderia dove l'umidità è costante, per prevenire la condensa.
            </li>
            <li>
              <strong>Pittura Lavabile (Idropittura):</strong> Contiene resine acriliche o viniliche che creano un film resistente all'abrasione umida. Ideale per soggiorno, corridoi e camere da letto dove la pulizia è necessaria.
            </li>
            <li>
              <strong>Pitture Termiche/Anticondensa:</strong> Contengono microsfere di ceramica o vetro cavo che creano un isolamento termico superficiale, riducendo lo shock termico tra aria calda e parete fredda (principale causa di condensa).
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Il ruolo della preparazione (Fissativo)</h2>
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl my-6">
            <h3 className="flex items-center gap-2 font-bold text-amber-900 mb-2">
              <AlertTriangle className="w-5 h-5" /> Mai saltare il Fissativo
            </h3>
            <p className="text-amber-900 text-sm">
              Il fissativo (o primer) non è facoltativo. Serve a uniformare l'assorbimento della parete: senza di esso, la pittura verrebbe assorbita in modo irregolare, causando macchie di colore diverso, scrostamenti o la necessità di dare 4-5 mani anziché due.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Finitura: Opaco o Satinato?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-slate-100 rounded-xl">
              <h4 className="font-bold mb-2 flex items-center gap-2"><Info className="w-4 h-4" /> Opaco</h4>
              <p className="text-sm text-slate-700">Nasconde perfettamente le imperfezioni del muro (crepe, rasature non perfette). Ottimo per soffitti e stanze poco illuminate.</p>
            </div>
            <div className="p-4 bg-slate-100 rounded-xl">
              <h4 className="font-bold mb-2 flex items-center gap-2"><Info className="w-4 h-4" /> Satinato/Lucido</h4>
              <p className="text-sm text-slate-700">Più resistente e luminoso, ma "parla". Evidenzia ogni minima irregolarità della parete. Richiede pareti rasate a specchio.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Problemi specifici</h2>
          <p>
            Se hai muffa, la pittura non basta. Devi prima rimuovere le spore con prodotti specifici, trattare il muro e poi, eventualmente, utilizzare una pittura termica o anticondensa. Tinteggiare sopra la muffa significa vederla riemergere in poche settimane.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">FAQ - Domande frequenti</h2>
          <div className="space-y-4 mb-8">
            <div>
              <h3 className="font-bold text-slate-900">Quanta pittura serve?</h3>
              <p className="text-sm text-slate-600">Dipende dalla resa riportata sulla confezione (solitamente mq/litro per mano). Calcola sempre un 10% in più per gli sprechi e i ritocchi.</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl mt-10">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" /> Scegli la qualità
            </h3>
            <p className="text-blue-800 mb-6">
              EdilFree ti supporta nella valutazione tecnica e dei costi per i materiali di tinteggiatura, garantendoti consapevolezza nella scelta del prodotto ideale per la tua casa.
            </p>
            <Link
              to="/stima"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md"
            >
              Richiedi stima tecnica <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-xs text-slate-400 mt-8 text-center italic">
            Nota: La tinteggiatura richiede una corretta preparazione del fondo per essere duratura. Questa guida ha scopo informativo; per interventi di grande portata, avvaliti sempre di professionisti qualificati.
          </p>
        </article>
      </main>
    </div>
  );
};
