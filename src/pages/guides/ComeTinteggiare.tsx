import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, PaintBucket, AlertTriangle, CheckCircle2, ShieldCheck, Wrench, Hammer, Info } from "lucide-react";
import { SeoHead } from "../../components/SeoHead";

export const HowToTinteggiare: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <SeoHead
        page="guide-tinteggiare"
        title="Come tinteggiare le pareti: Guida tecnica professionale"
        description="Scopri la guida tecnica completa per tinteggiare le pareti di casa. Dalla preparazione del fondo alla scelta della vernice, fino ai consigli degli esperti per un risultato impeccabile."
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Homepage
        </Link>
        <article className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 sm:p-12 prose prose-slate max-w-none">
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-4">
            Come tinteggiare le pareti: Guida tecnica professionale
          </h1>
          <p className="lead text-lg text-slate-600 mb-8">
            Tinteggiare le pareti non è un semplice atto estetico, ma un'operazione tecnica che richiede competenza, pazienza e la giusta preparazione del supporto. Un risultato professionale, privo di sbavature e duraturo, dipende al 70% dalla fase di preparazione del fondo. In questa guida tecnica, esploreremo come approcciarsi alla tinteggiatura domestica con criteri professionali, evitando gli errori comuni che compromettono la resa finale.
          </p>

          <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-8">
            <h3 className="flex items-center gap-2 font-bold text-emerald-900 mb-2">
              <CheckCircle2 className="w-5 h-5" /> Principali punti della guida
            </h3>
            <ul className="list-disc list-inside text-emerald-800 text-sm space-y-1">
              <li>Preparazione del supporto: il segreto della durata.</li>
              <li>Scelta dei materiali: pittura traspirante, lavabile, idropitture.</li>
              <li>Tecnica di applicazione: rullo, pennello e diluizione corretta.</li>
              <li>Prevenzione di muffa e umidità.</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Analisi preliminare e sicurezza</h2>
          <p>
            Prima di acquistare qualsiasi prodotto, ispeziona accuratamente le pareti. Cerca crepe, fori, segni di umidità o distacchi di intonaco.
          </p>
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl my-6">
            <h3 className="flex items-center gap-2 font-bold text-amber-900 mb-2">
              <AlertTriangle className="w-5 h-5" /> Dispositivi di Protezione Individuale (DPI)
            </h3>
            <ul className="list-disc list-inside text-amber-900 text-sm space-y-1">
              <li><strong>Mascherina (FFP2):</strong> Fondamentale durante la levigatura per evitare di inalare polvere sottile.</li>
              <li><strong>Occhiali di protezione:</strong> Necessari per proteggere gli occhi durante i lavori a soffitto.</li>
              <li><strong>Ventilazione:</strong> Assicura un ricambio d'aria costante nella stanza durante l'applicazione e l'asciugatura.</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Scelta dei materiali e attrezzi</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-slate-100 rounded-xl">
              <h4 className="font-bold mb-2 flex items-center gap-2"><Hammer className="w-4 h-4" /> Attrezzi indispensabili</h4>
              <ul className="text-sm text-slate-700 list-disc list-inside">
                <li>Rullo (pelo corto per pareti lisce, pelo lungo per ruvide)</li>
                <li>Pennello a strozzatura (per angoli e rifiniture)</li>
                <li>Raschietto e carta abrasiva (grane 80 e 150)</li>
                <li>Nastro carta di alta qualità (non lascia residui)</li>
              </ul>
            </div>
            <div className="p-4 bg-slate-100 rounded-xl">
              <h4 className="font-bold mb-2 flex items-center gap-2"><PaintBucket className="w-4 h-4" /> Materiali</h4>
              <ul className="text-sm text-slate-700 list-disc list-inside">
                <li>Idropittura (traspirante per bagni/cucine, lavabile per corridoi/camere)</li>
                <li>Fissativo acrilico (primer isolante)</li>
                <li>Stucco in pasta (per riempimento piccoli fori)</li>
              </ul>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. La tecnica: processo in 5 step</h2>

          <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-2">3.1. Preparazione del supporto</h3>
          <p>
            Rimuovi vecchie scrostature con il raschietto. Stuccare buchi e crepe. Una volta asciutto, leviga accuratamente con carta abrasiva fine. <strong>Cruciale:</strong> Rimuovi ogni traccia di polvere con una spugna umida o un aspirapolvere. Se la polvere resta, la pittura si staccherà in pochi mesi.
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-2">3.2. Applicazione del Fissativo (Primer)</h3>
          <p>
            Non saltare questo passaggio. Il fissativo uniforma l'assorbimento della parete e garantisce che la pittura successiva si aggrappi perfettamente, evitando macchie o distacchi. Diluiscilo secondo le istruzioni del produttore.
          </p>

          <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-2">3.3. Tinteggiatura professionale</h3>
          <ol className="list-decimal list-inside space-y-2 mb-4 text-slate-700">
            <li><strong>Ritaglio (Cutting-in):</strong> Con il pennello a strozzatura, dipingi gli angoli, le cornici delle porte e le zone vicino al soffitto dove il rullo non arriva.</li>
            <li><strong>Applicazione a Rullo:</strong> Immergi il rullo nella vaschetta, passalo sulla griglia per eliminare l'eccesso. Applica la pittura formando una 'W' o una 'M' sulla parete, poi stendila uniformemente.</li>
            <li><strong>Non sovraccaricare:</strong> Lavora per sezioni di circa 1 metro quadrato alla volta per evitare che i bordi asciughino prima di raccordarli.</li>
          </ol>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Gestione di problemi comuni</h2>
          <div className="bg-red-50 border border-red-100 p-6 rounded-2xl my-6">
            <h3 className="flex items-center gap-2 font-bold text-red-900 mb-2">
              <AlertTriangle className="w-5 h-5" /> Errori fatali da evitare
            </h3>
            <ul className="text-red-800 text-sm list-disc list-inside space-y-1">
              <li><strong>Diluizione errata:</strong> Troppa acqua diluisce i leganti e la pittura perderà potere coprente e lavabilità.</li>
              <li><strong>Ritaglio troppo anticipato:</strong> Se gli angoli sono troppo asciutti quando passi il rullo, vedrai la differenza di texture (effetto cornice).</li>
              <li><strong>Asciugatura forzata:</strong> Mai usare termosifoni o ventilatori puntati direttamente sulla parete appena tinteggiata; l'asciugatura deve essere graduale.</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">5. Quando chiamare un professionista</h2>
          <p>
            Alcune situazioni richiedono l'intervento di un tinteggiatore esperto:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700">
            <li><strong>Muffa estesa:</strong> La muffa è un fungo. Se è diffusa, richiede trattamenti sanitizzanti (biocidi) e, spesso, l'applicazione di pitture termiche o anticondensa, non una semplice copertura estetica.</li>
            <li><strong>Rasature totali:</strong> Se le pareti sono molto irregolari, serve una rasatura completa a gesso o malta prima della tinteggiatura.</li>
            <li><strong>Altezze e soffitti:</strong> Lavorare a oltre 3 metri di altezza in sicurezza richiede attrezzature (trabattelli) e competenze che vanno oltre il fai-da-te.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">FAQ - Domande frequenti</h2>
          <div className="space-y-4 mb-8">
            <div>
              <h3 className="font-bold text-slate-900">Quanto tempo aspettare tra due mani?</h3>
              <p className="text-sm text-slate-600">Almeno 4-6 ore, a seconda dell'umidità e della temperatura ambiente. Consulta sempre la scheda tecnica del prodotto.</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Perché si vedono le strisce dopo l'asciugatura?</h3>
              <p className="text-sm text-slate-600">Probabilmente hai esercitato troppa pressione sul rullo o hai sovrapposto le passate quando la pittura era già parzialmente asciutta.</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl mt-10">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" /> Risultato impeccabile o stima professionale?
            </h3>
            <p className="text-blue-800 mb-6">
              Tinteggiare è faticoso. EdilFree ti aiuta a stimare i costi per tinteggiare casa tua, confrontando il fai-da-te con il preventivo di un professionista qualificato.
            </p>
            <Link
              to="/stima"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md"
            >
              Richiedi una stima professionale <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-xs text-slate-400 mt-8 text-center italic">
            Nota: Questa guida ha scopo informativo. Per interventi complessi o dubbi sull'integrità dell'impianto o sulla natura di macchie e muffe, consulta sempre un professionista abilitato.
          </p>
        </article>
      </main>
    </div>
  );
};
