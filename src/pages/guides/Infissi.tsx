import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, ShieldCheck, CheckCircle2, Info, AlertTriangle, Thermometer, Volume2 } from "lucide-react";
import { SeoHead } from "../../components/SeoHead";

export const GuidaInfissi: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <SeoHead
        page="guide-infissi"
        title="Come scegliere gli infissi: Guida tecnica a prestazioni e materiali"
        description="Guida tecnica alla scelta degli infissi: isolamento termico (Uw), acustico (Rw), materiali (PVC, Alluminio, Legno) e importanza di una posa a regola d'arte."
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 sm:p-12 prose prose-slate max-w-none">
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-4">
            Come scegliere gli infissi: Guida tecnica a prestazioni e materiali
          </h1>
          <p className="lead text-lg text-slate-600 mb-8">
            La scelta degli infissi è uno degli investimenti più critici per l'efficienza energetica e il comfort di un'abitazione. Un infisso di alta qualità è in grado di ridurre drasticamente le dispersioni termiche, eliminare spifferi e abbattere il rumore ambientale. Tuttavia, la performance di una finestra non dipende solo dai materiali (telaio e vetro), ma in misura decisiva dalla corretta progettazione del nodo di posa. In questa guida tecnica, analizzeremo i parametri fondamentali per valutare la qualità degli infissi e capire come muoversi nel mercato attuale.
          </p>

          <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-8">
            <h3 className="flex items-center gap-2 font-bold text-emerald-900 mb-2">
              <CheckCircle2 className="w-5 h-5" /> Principali punti della guida
            </h3>
            <ul className="list-disc list-inside text-emerald-800 text-sm space-y-1">
              <li>Parametri tecnici: Uw (termico) e Rw (acustico).</li>
              <li>Analisi dei materiali: vantaggi e limiti di PVC, Alluminio e Legno.</li>
              <li>Posa in opera: il nodo cruciale per evitare ponti termici.</li>
              <li>Vetrocamera: Gas Argon, canaline calde e triplo vetro.</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Comprendere le prestazioni: Uw e Rw</h2>
          <p>
            Non lasciarti abbagliare solo dall'estetica. Per valutare un infisso, devi guardare i numeri certificati:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-slate-100 rounded-xl">
              <h4 className="font-bold mb-2 flex items-center gap-2"><Thermometer className="w-4 h-4" /> Isolamento Termico (Uw)</h4>
              <p className="text-sm text-slate-700">Il valore Uw indica la trasmittanza termica. <strong>Più basso è il valore, migliore è l'isolamento.</strong> Una finestra performante dovrebbe avere un Uw ≤ 1.3 W/m²K (anche a seconda della zona climatica).</p>
            </div>
            <div className="p-4 bg-slate-100 rounded-xl">
              <h4 className="font-bold mb-2 flex items-center gap-2"><Volume2 className="w-4 h-4" /> Isolamento Acustico (Rw)</h4>
              <p className="text-sm text-slate-700">Il valore Rw misura il potere fonoisolante. <strong>Più alto è il valore, maggiore è l'abbattimento del rumore.</strong> Un ottimo infisso parte da almeno 38-40 dB di abbattimento.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Materiali a confronto: Pro e Contro</h2>
          <ul className="space-y-4 text-slate-700 mb-8">
            <li>
              <strong>PVC (Policloruro di Vinile):</strong> Eccellente isolante naturale. È la scelta più diffusa per ristrutturazioni standard grazie al rapporto qualità-prezzo. <strong>Nota:</strong> I telai sono più spessi rispetto all'alluminio.
            </li>
            <li>
              <strong>Alluminio a Taglio Termico:</strong> Estetica minimale, grande resistenza strutturale, adatto a vetrate di grandi dimensioni. È fondamentale assicurarsi che sia a "taglio termico" per evitare condensa superficiale.
            </li>
            <li>
              <strong>Legno:</strong> Il miglior materiale naturale per l'isolamento. Richiede manutenzione periodica (verniciatura) per resistere alle intemperie. Esteticamente insuperabile per case di pregio.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Vetrocamera e componenti tecnologici</h2>
          <p>Il vetro non è solo una lastra. Oggi, la vetrocamera è composta da:</p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6">
            <li><strong>Gas Argon:</strong> Riempie l'intercapedine tra i vetri per migliorare l'isolamento termico.</li>
            <li><strong>Canaline "Warm Edge":</strong> Profili distanziatori che riducono il ponte termico sul bordo del vetro, riducendo drasticamente il rischio di condensa interna.</li>
            <li><strong>Triplo vetro:</strong> Necessario in climi molto rigidi. Aumenta il peso dell'anta, richiedendo ferramenta (cerniere) di alta qualità.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. La posa in opera: Il fattore determinante</h2>
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl my-6">
            <h3 className="flex items-center gap-2 font-bold text-amber-900 mb-2">
              <AlertTriangle className="w-5 h-5" /> Attenzione alla posa!
            </h3>
            <p className="text-amber-900 text-sm">
              Puoi acquistare l'infisso più costoso sul mercato, ma se viene installato male, otterrai spifferi, condensa e muffe. La posa deve avvenire "a regola d'arte" (norma UNI 11673), utilizzando nastri termo-espandenti o sigillanti specifici che garantiscono la tenuta all'aria e all'acqua tra il telaio della finestra e la muratura. Chiedi sempre una posa certificata.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">FAQ - Domande frequenti</h2>
          <div className="space-y-4 mb-8">
            <div>
              <h3 className="font-bold text-slate-900">Perché si forma condensa sui vetri?</h3>
              <p className="text-sm text-slate-600">La condensa interna al vetro (tra le lastre) indica una rottura del sigillo. La condensa superficiale interna è invece dovuta a eccessiva umidità nella stanza e scarsa ventilazione.</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Come capisco se l'installazione è corretta?</h3>
              <p className="text-sm text-slate-600">L'anta deve aprirsi e chiudersi senza sforzo, rimanendo ferma in ogni posizione. Non devono esserci correnti d'aria evidenti al tatto sui bordi del telaio.</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl mt-10">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" /> Vuoi una casa efficiente?
            </h3>
            <p className="text-blue-800 mb-6">
              EdilFree ti supporta nella valutazione tecnica e dei costi per la sostituzione dei tuoi infissi, garantendoti consapevolezza nella scelta.
            </p>
            <Link
              to="/stima"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md"
            >
              Richiedi stima tecnica <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-xs text-slate-400 mt-8 text-center italic">
            Nota: La scelta e la posa degli infissi richiedono competenze specifiche. Questa guida ha scopo informativo; per la realizzazione, affidati sempre ad aziende certificate che garantiscano una posa a regola d'arte.
          </p>
        </article>
      </main>
    </div>
  );
};
