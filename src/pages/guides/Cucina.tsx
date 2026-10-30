import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Utensils, CheckCircle2, ShieldCheck, Info, AlertTriangle, Hammer, Wrench } from "lucide-react";
import { SeoHead } from "../../components/SeoHead";

export const GuidaCucina: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <SeoHead
        page="guide-cucina"
        title="Come progettare la cucina perfetta: Guida tecnica e materiali"
        description="Guida tecnica alla progettazione della cucina: ergonomia (triangolo d'oro), scelta dei materiali per top e mobili, impianti e ottimizzazione degli spazi."
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 sm:p-12 prose prose-slate max-w-none">
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-4">
            Come progettare la cucina perfetta: Guida tecnica e materiali
          </h1>
          <p className="lead text-lg text-slate-600 mb-8">
            La cucina non è solo lo spazio dedicato alla preparazione dei pasti, ma il fulcro funzionale della casa. Una progettazione corretta deve coniugare ergonomia, resistenza dei materiali e una gestione rigorosa degli impianti (idrico, gas ed elettrico). Sbagliare la disposizione degli elementi in questa fase significa condannarsi a anni di inefficienza e movimenti inutili. Questa guida analizza i pilastri tecnici per costruire una cucina durevole e ottimizzata.
          </p>

          <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-8">
            <h3 className="flex items-center gap-2 font-bold text-emerald-900 mb-2">
              <CheckCircle2 className="w-5 h-5" /> Principali punti della guida
            </h3>
            <ul className="list-disc list-inside text-emerald-800 text-sm space-y-1">
              <li>Ergonomia operativa: il Triangolo d'Oro.</li>
              <li>Materiali per il top: analisi tecnica di resistenza e manutenzione.</li>
              <li>Impiantistica: posizionamento corretto di prese e carichi.</li>
              <li>Scelte progettuali: isola, penisola o lineare?</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Ergonomia: Il Triangolo d'Oro</h2>
          <p>
            Il concetto fondamentale della progettazione cucina è il "Triangolo d'Oro", ovvero il percorso ottimale che collega le tre zone operative principali:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6">
            <li><strong>Zona conservazione:</strong> Il frigorifero.</li>
            <li><strong>Zona lavaggio:</strong> Il lavello e la lavastoviglie.</li>
            <li><strong>Zona cottura:</strong> Il piano cottura e il forno.</li>
          </ul>
          <p>La somma dei lati di questo triangolo deve essere minimizzata. Se i tre punti sono troppo distanti, aumentano i tempi e la fatica; se sono troppo vicini, si perde spazio di lavoro.</p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Scelta dei materiali: Il Piano di Lavoro (Top)</h2>
          <div className="space-y-6 mb-8">
            <div>
              <h4 className="font-bold flex items-center gap-2"><Info className="w-4 h-4" /> Laminato</h4>
              <p className="text-sm text-slate-700">Economico, versatile. <strong>Contro:</strong> Sensibile al calore diretto (non appoggiare pentole bollenti) e ai tagli diretti. Se l'acqua penetra nelle giunture, il truciolare sottostante si gonfia.</p>
            </div>
            <div>
              <h4 className="font-bold flex items-center gap-2"><Info className="w-4 h-4" /> Gres Porcellanato</h4>
              <p className="text-sm text-slate-700">Altissima resistenza al calore, graffi e macchie. Materiale igienico e non poroso. <strong>Contro:</strong> Costo elevato e fragilità agli urti violenti sui bordi.</p>
            </div>
            <div>
              <h4 className="font-bold flex items-center gap-2"><Info className="w-4 h-4" /> Quarzo (Agglomerato)</h4>
              <p className="text-sm text-slate-700">Estetica uniforme, buona resistenza. <strong>Contro:</strong> Non è resistente al calore estremo quanto il gres; le resine contenute nel materiale possono subire shock termici.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Impiantistica: Gli errori tecnici da non fare</h2>
          <div className="bg-red-50 border border-red-100 p-6 rounded-2xl my-6">
            <h3 className="flex items-center gap-2 font-bold text-red-900 mb-2">
              <AlertTriangle className="w-5 h-5" /> Avvertenze Impianti
            </h3>
            <ul className="list-disc list-inside text-red-800 text-sm space-y-1">
              <li><strong>Presa Elettrica:</strong> Non posizionare mai le prese direttamente dietro il piano cottura o il lavello.</li>
              <li><strong>Gas:</strong> Il tubo del gas deve essere sempre ispezionabile e rispettare le norme UNI di aerazione del locale.</li>
              <li><strong>Carico Elettrico:</strong> Forno, lavastoviglie e piano cottura a induzione richiedono linee dedicate nel quadro elettrico per evitare blackout.</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. DIY vs Professionista</h2>
          <p>
            Puoi gestire il montaggio di mensole o l'installazione di una cucina componibile semplice (fai-da-te). Tuttavia, chiama un professionista per:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700">
            <li>Il collegamento dell'impianto gas (obbligatorio per la certificazione di conformità).</li>
            <li>Il rifacimento degli impianti idrici, per evitare perdite nascoste che danneggerebbero i mobili in tempi brevi.</li>
            <li>La modifica di cartongessi o contropareti per l'incasso di cappe aspiranti professionali.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">FAQ - Domande frequenti</h2>
          <div className="space-y-4 mb-8">
            <div>
              <h3 className="font-bold text-slate-900">È meglio il piano a induzione o gas?</h3>
              <p className="text-sm text-slate-600">L'induzione è più efficiente, sicura e facile da pulire, ma richiede una potenza elettrica adeguata (3-6 kW).</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Isola o lineare?</h3>
              <p className="text-sm text-slate-600">Dipende dalla metratura. L'isola richiede almeno 100-120 cm di spazio di passaggio attorno.</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl mt-10">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" /> Progetta la tua cucina su misura
            </h3>
            <p className="text-blue-800 mb-6">
              EdilFree ti supporta nella valutazione dei costi e nella pianificazione tecnica per realizzare la cucina che hai sempre desiderato, evitando errori progettuali.
            </p>
            <Link
              to="/stima"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md"
            >
              Richiedi stima tecnica <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-xs text-slate-400 mt-8 text-center italic">
            Nota: La progettazione della cucina è un'attività complessa che richiede sopralluoghi tecnici. Questa guida ha scopo informativo; per la realizzazione, affidati sempre a progettisti o mobilifici qualificati.
          </p>
        </article>
      </main>
    </div>
  );
};
