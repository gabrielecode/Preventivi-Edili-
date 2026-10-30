import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, CheckCircle2, AlertTriangle, Lock, Info, Wrench } from "lucide-react";
import { SeoHead } from "../../components/SeoHead";

export const GuidaPorteBlindate: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <SeoHead
        page="guide-porte-blindate"
        title="Come scegliere la porta blindata: Guida tecnica a classi e sicurezza"
        description="Guida tecnica alla scelta della porta blindata: analisi delle classi antieffrazione RC, anatomia della serratura (cilindro europeo, defender), controtelaio e installazione sicura."
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 sm:p-12 prose prose-slate max-w-none">
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-4">
            Come scegliere la porta blindata: Guida tecnica a classi e sicurezza
          </h1>
          <p className="lead text-lg text-slate-600 mb-8">
            La porta blindata è il punto critico della sicurezza domestica. Non è sufficiente che sia "pesante" o "robusta" all'apparenza; la sua capacità di difesa deve essere certificata secondo standard internazionali basati su test di resistenza a tentativi di scasso reali. In questa guida tecnica, analizzeremo non solo le classi antieffrazione, ma anche l'anatomia dei componenti di sicurezza che rendono una porta davvero invalicabile.
          </p>

          <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-8">
            <h3 className="flex items-center gap-2 font-bold text-emerald-900 mb-2">
              <CheckCircle2 className="w-5 h-5" /> Principali punti della guida
            </h3>
            <ul className="list-disc list-inside text-emerald-800 text-sm space-y-1">
              <li>Interpretazione delle classi RC (Resistenza all'Effrazione).</li>
              <li>Anatomia: telaio, controtelaio e defender.</li>
              <li>La serratura: cilindro europeo e protezione anti-bumping.</li>
              <li>L'importanza cruciale della posa del controtelaio.</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Classi Antieffrazione (Normativa EN 1627)</h2>
          <p>
            Le porte blindate sono classificate in base al tempo e agli strumenti utilizzati per superarle nei test di laboratorio.
          </p>
          <ul className="list-disc list-inside space-y-3 text-slate-700 mb-8">
            <li><strong>RC2 (Resistenza Base):</strong> Adatta a ingressi di condomini con basso rischio. Resiste a scassinatori occasionali che usano attrezzi semplici (cacciaviti, pinze).</li>
            <li><strong>RC3 (Standard Residenziale):</strong> La scelta minima consigliata per appartamenti o villette. Resiste a scassinatori più esperti che utilizzano piede di porco o cacciaviti grandi.</li>
            <li><strong>RC4 (Alta Sicurezza):</strong> Necessaria per case isolate o alto rischio. Resiste a scassinatori esperti che utilizzano attrezzi elettrici (seghe, trapani) per almeno 10 minuti.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Anatomia di una porta blindata</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-slate-100 rounded-xl">
              <h4 className="font-bold mb-2 flex items-center gap-2"><Lock className="w-4 h-4" /> Componenti Blindati</h4>
              <ul className="text-sm text-slate-700 list-disc list-inside">
                <li><strong>Controtelaio:</strong> Fissato alla muratura. Deve essere murato con zanche profonde per non essere divelto.</li>
                <li><strong>Telaio:</strong> La cornice che ospita la porta, anch'essa blindata.</li>
                <li><strong>Defender:</strong> Protezione in acciaio temprato posta davanti al cilindro della serratura per impedire trapani e strappi.</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-100 rounded-xl">
              <h4 className="font-bold mb-2 flex items-center gap-2"><Wrench className="w-4 h-4" /> La Serratura</h4>
              <ul className="text-sm text-slate-700 list-disc list-inside">
                <li><strong>Cilindro Europeo:</strong> Attualmente il sistema più affidabile.</li>
                <li><strong>Protezione Anti-Bumping:</strong> Fondamentale per evitare l'apertura tramite la tecnica del "bumping" (chiave maestra).</li>
                <li><strong>Scheda di Proprietà:</strong> Fondamentale per duplicare le chiavi, che deve avvenire solo presso centri autorizzati.</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. L'installazione: il punto debole</h2>
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl my-6">
            <h3 className="flex items-center gap-2 font-bold text-amber-900 mb-2">
              <AlertTriangle className="w-5 h-5" /> Posa certificata
            </h3>
            <p className="text-amber-900 text-sm">
              Una porta blindata RC4 installata con un controtelaio fissato male alla muratura perde la sua efficacia in pochi secondi. Il controtelaio deve essere tassellato e murato con cemento a presa rapida o resine specifiche. Assicurati che l'installazione sia eseguita da personale qualificato del produttore o da rivenditori certificati.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">FAQ - Domande frequenti</h2>
          <div className="space-y-4 mb-8">
            <div>
              <h3 className="font-bold text-slate-900">È necessario sostituire anche il controtelaio?</h3>
              <p className="text-sm text-slate-600">Se il controtelaio vecchio non è robusto o fissato male, sì. È la base della sicurezza.</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Come proteggere ulteriormente la casa?</h3>
              <p className="text-sm text-slate-600">Integra la porta con sistemi di allarme, contatti magnetici sull'infisso e, se possibile, telecamere di videosorveglianza.</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl mt-10">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" /> Scegli la sicurezza garantita
            </h3>
            <p className="text-blue-800 mb-6">
              EdilFree ti supporta nella valutazione tecnica e dei costi per l'installazione di una porta blindata certificata, adatta alle reali esigenze di protezione della tua casa.
            </p>
            <Link
              to="/stima"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md"
            >
              Richiedi stima tecnica <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-xs text-slate-400 mt-8 text-center italic">
            Nota: La sicurezza è un sistema integrato. Questa guida ha scopo informativo; per la protezione della tua casa, rivolgiti sempre a produttori o rivenditori specializzati in sistemi di sicurezza antieffrazione certificati.
          </p>
        </article>
      </main>
    </div>
  );
};
