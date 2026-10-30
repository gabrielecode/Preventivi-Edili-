import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Bath, ShieldCheck, CheckCircle2, Info, AlertTriangle, Hammer, Wrench } from "lucide-react";
import { SeoHead } from "../../components/SeoHead";

export const GuidaRistrutturazioneBagno: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <SeoHead
        page="guide-ristrutturazione-bagno"
        title="Ristrutturazione bagno: Guida tecnica completa"
        description="Guida tecnica alla ristrutturazione del bagno: impermeabilizzazione, impianti, scelta dei materiali, normative di sicurezza elettrica e progettazione ergonomica."
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 sm:p-12 prose prose-slate max-w-none">
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-4">
            Ristrutturazione bagno: Guida tecnica completa
          </h1>
          <p className="lead text-lg text-slate-600 mb-8">
            La ristrutturazione del bagno è l'intervento più tecnico e oneroso per metro quadrato di tutta la casa. Non si tratta solo di scegliere esteticamente il rivestimento; il cuore del progetto risiede nella corretta gestione dell'umidità, delle pendenze degli scarichi, dell'impiantistica a norma e dell'impermeabilizzazione dei supporti. Un bagno ristrutturato male diventerà presto fonte di problemi strutturali, muffe e costi di riparazione ingenti.
          </p>

          <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-8">
            <h3 className="flex items-center gap-2 font-bold text-emerald-900 mb-2">
              <CheckCircle2 className="w-5 h-5" /> Principali punti della guida
            </h3>
            <ul className="list-disc list-inside text-emerald-800 text-sm space-y-1">
              <li>Impermeabilizzazione: il passaggio fondamentale prima della posa.</li>
              <li>Impiantistica: norme di sicurezza (zone del bagno).</li>
              <li>Pendenze e scarichi: errori di progettazione comuni.</li>
              <li>Materiali: gres porcellanato e sanitari sospesi.</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. La fase critica: Impermeabilizzazione</h2>
          <p>
            Prima di posare le piastrelle, è obbligatorio applicare un sistema di impermeabilizzazione (guaina liquida o cementizia) nelle zone umide, specialmente all'interno del box doccia e intorno al lavabo.
          </p>
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl my-6">
            <h3 className="flex items-center gap-2 font-bold text-amber-900 mb-2">
              <AlertTriangle className="w-5 h-5" /> Attenzione alla muffa
            </h3>
            <p className="text-amber-900 text-sm">
              L'umidità deve essere gestita. Se non c'è una finestra, installa un sistema di ventilazione meccanica (aspiratore) collegato all'interruttore della luce o con sensore di umidità. Una cattiva aerazione annulla qualsiasi beneficio di una bella ristrutturazione.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Impiantistica e Sicurezza</h2>
          <p>
            Il bagno è diviso in "zone" di pericolosità (norma CEI 64-8) che determinano quale tipo di illuminazione e prese elettriche puoi installare:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 mb-8">
            <li><strong>Zona 0, 1, 2:</strong> Vicinanza a vasca/doccia. Qui le regole per gli apparecchi elettrici sono estremamente restrittive (grado IP minimo richiesto).</li>
            <li><strong>Pendenze scarichi:</strong> Gli scarichi devono avere una pendenza minima del 1-2% per evitare ristagni che portano cattivi odori.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Scelte tecniche di arredo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-slate-100 rounded-xl">
              <h4 className="font-bold mb-2 flex items-center gap-2"><Hammer className="w-4 h-4" /> Sanitari</h4>
              <p className="text-sm text-slate-700">I sospesi sono eccellenti per la pulizia, ma richiedono una parete portante o un controtelaio robusto in muratura per reggere il carico.</p>
            </div>
            <div className="p-4 bg-slate-100 rounded-xl">
              <h4 className="font-bold mb-2 flex items-center gap-2"><Wrench className="w-4 h-4" /> Rivestimenti</h4>
              <p className="text-sm text-slate-700">Il gres porcellanato è il re. Scegli grandi formati per ridurre il numero di fughe, che sono il punto più vulnerabile alla sporcizia e muffa.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. DIY vs Professionista</h2>
          <p>
            Non rischiare su impianti e impermeabilizzazione. Chiama un professionista per:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700">
            <li>Rifacimento impianti idrico/elettrico (necessaria certificazione di conformità).</li>
            <li>Posa di impermeabilizzazioni e piastrelle, dove la maestria del posatore fa la differenza tra un bagno durevole e uno che perde.</li>
            <li>Spostamento di tubazioni di scarico (richiede calcoli precisi sulle pendenze).</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">FAQ - Domande frequenti</h2>
          <div className="space-y-4 mb-8">
            <div>
              <h3 className="font-bold text-slate-900">Perché si scollano le piastrelle?</h3>
              <p className="text-sm text-slate-600">Solitamente per uso di colla non idonea, mancata applicazione di primer o eccessiva umidità nel massetto al momento della posa.</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl mt-10">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" /> Ristruttura senza rischi
            </h3>
            <p className="text-blue-800 mb-6">
              EdilFree ti supporta nella valutazione tecnica e dei costi per il tuo nuovo bagno, garantendoti la massima consapevolezza prima di aprire il cantiere.
            </p>
            <Link
              to="/stima"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md"
            >
              Richiedi stima tecnica <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-xs text-slate-400 mt-8 text-center italic">
            Nota: La ristrutturazione del bagno deve rispettare norme di sicurezza elettrica e idraulica molto stringenti. Questa guida ha scopo informativo; per la realizzazione, affidati sempre a ditte specializzate che rilascino le dovute certificazioni.
          </p>
        </article>
      </main>
    </div>
  );
};
