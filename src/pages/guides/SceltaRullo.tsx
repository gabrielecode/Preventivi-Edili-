import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, PaintBucket, Scale, CheckCircle2, ShieldCheck, Info, AlertTriangle, Hammer, Wrench } from "lucide-react";
import { SeoHead } from "../../components/SeoHead";

export const GuidaSceltaRullo: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <SeoHead
        page="guide-scelta-rullo"
        title="Quale rullo scegliere per tinteggiare: Guida tecnica all'attrezzatura"
        description="Guida tecnica alla scelta del rullo per tinteggiare: materiali (microfibra, nylon), lunghezza del pelo in base al supporto, tecniche di applicazione professionale e manutenzione degli attrezzi."
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 sm:p-12 prose prose-slate max-w-none">
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-4">
            Quale rullo scegliere per tinteggiare: Guida tecnica all'attrezzatura
          </h1>
          <p className="lead text-lg text-slate-600 mb-8">
            La qualità del rullo è spesso sottovalutata nel fai-da-te. Un rullo economico, o scelto impropriamente per il tipo di parete, può rovinare il lavoro anche con la pittura più costosa sul mercato. La capacità di carico, la distribuzione del colore e la finitura superficiale dipendono interamente dal materiale del rullo e dalla lunghezza del suo pelo. Questa guida ti accompagna nella scelta tecnica dell'attrezzo corretto per garantire una finitura omogenea e professionale.
          </p>

          <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-8">
            <h3 className="flex items-center gap-2 font-bold text-emerald-900 mb-2">
              <CheckCircle2 className="w-5 h-5" /> Principali punti della guida
            </h3>
            <ul className="list-disc list-inside text-emerald-800 text-sm space-y-1">
              <li>Lunghezza del pelo: come si abbina alla porosità della parete.</li>
              <li>Materiali del rullo: Microfibra, Poliestere, Nylon.</li>
              <li>Attrezzatura complementare: l'importanza della griglia di sgocciolamento.</li>
              <li>Manutenzione: come conservare i rulli per riutilizzarli.</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Lunghezza del pelo: Regola tecnica</h2>
          <p>La lunghezza del pelo determina quanto rullo "sprofonda" nelle irregolarità della parete.</p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 mb-8">
            <li><strong>Pelo Corto (5–8 mm):</strong> Per superfici lisce e vernici smaltate/satinate. Evita l'effetto "buccia d'arancia".</li>
            <li><strong>Pelo Medio (10–13 mm):</strong> Lo standard per pareti civili tinteggiate a idropittura. Bilancia capacità di carico e finitura.</li>
            <li><strong>Pelo Lungo (15–22 mm):</strong> Indispensabile per intonaci grezzi, cemento a vista o pareti molto irregolari.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Materiali del rullo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-slate-100 rounded-xl">
              <h4 className="font-bold mb-2 flex items-center gap-2"><Info className="w-4 h-4" /> Microfibra</h4>
              <p className="text-sm text-slate-700">Il top per le finiture di pregio. Rilascia pochissimi pelucchi, ha un'eccellente capacità di carico e stesura. Ideale con idropitture lavabili.</p>
            </div>
            <div className="p-4 bg-slate-100 rounded-xl">
              <h4 className="font-bold mb-2 flex items-center gap-2"><Info className="w-4 h-4" /> Nylon / Poliestere</h4>
              <p className="text-sm text-slate-700">Molto resistenti, ideali per idropitture traspiranti o lavori pesanti su intonaci grezzi. Più economici, ma finitura leggermente meno precisa.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Tecnica di applicazione: Il segreto dello sgocciolamento</h2>
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl my-6">
            <h3 className="flex items-center gap-2 font-bold text-amber-900 mb-2">
              <AlertTriangle className="w-5 h-5" /> Regola fondamentale
            </h3>
            <p className="text-amber-900 text-sm">
              Non intingere il rullo direttamente nel secchio di pittura. Usa sempre una vaschetta con <strong>griglia di sgocciolamento</strong>. Intingi il rullo, caricalo di colore e passalo energicamente sulla griglia più volte. Il rullo deve essere uniformemente impregnato, non gocciolante. Un rullo troppo carico causa accumuli, bolle e colature difficili da rimuovere.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Manutenzione</h2>
          <p>
            Un rullo di qualità, se curato, dura per decine di stanze.
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 mb-8">
            <li><strong>Dopo l'uso:</strong> Lavalo immediatamente sotto acqua corrente tiepida (per idropitture) finché l'acqua non risulta limpida.</li>
            <li><strong>Asciugatura:</strong> Non lasciarlo mai appoggiato sul pelo, altrimenti si deformerà. Appendilo per l'apposito foro o lascialo in verticale.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">FAQ - Domande frequenti</h2>
          <div className="space-y-4 mb-8">
            <div>
              <h3 className="font-bold text-slate-900">Il rullo perde pelucchi durante la posa!</h3>
              <p className="text-sm text-slate-600">È tipico dei rulli nuovi. Prima di usarlo, passalo su un pezzo di nastro carta o lavalo e fallo asciugare completamente per rimuovere le fibre non fissate.</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl mt-10">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Scale className="w-5 h-5" /> Ottieni risultati professionali
            </h3>
            <p className="text-blue-800 mb-6">
              EdilFree ti supporta nella pianificazione tecnica, aiutandoti a selezionare l'attrezzatura corretta per la tua tinteggiatura e garantendo risparmio di tempo e materiali.
            </p>
            <Link
              to="/stima"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md"
            >
              Avvia la stima <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-xs text-slate-400 mt-8 text-center italic">
            Nota: L'attrezzatura professionale è fondamentale per un buon risultato. Questa guida ha scopo informativo; per la scelta dei prodotti specifici, confrontati sempre con un colorificio professionale.
          </p>
        </article>
      </main>
    </div>
  );
};
