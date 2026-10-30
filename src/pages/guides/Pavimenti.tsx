import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Grid3X3, ShieldCheck, CheckCircle2, Info, AlertTriangle, Hammer, Wrench } from "lucide-react";
import { SeoHead } from "../../components/SeoHead";

export const GuidaPavimenti: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <SeoHead
        page="guide-pavimenti"
        title="Come scegliere il pavimento: Guida tecnica a materiali e posa"
        description="Guida tecnica alla scelta del pavimento: gres, parquet, SPC. Analisi dei parametri di resistenza, tipologie di posa (incollata vs flottante) e preparazione del massetto."
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 sm:p-12 prose prose-slate max-w-none">
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-4">
            Come scegliere il pavimento: Guida tecnica a materiali e posa
          </h1>
          <p className="lead text-lg text-slate-600 mb-8">
            La scelta del pavimento è un impegno a lungo termine. Oltre al fattore estetico, il pavimento deve rispondere a esigenze strutturali: resistenza al calpestio, all'umidità, agli agenti chimici e facilità di manutenzione. Un pavimento di alta qualità posato su un massetto non adeguatamente preparato è un investimento sprecato. Questa guida tecnica analizza le caratteristiche dei materiali più comuni e le procedure necessarie per una posa a regola d'arte.
          </p>

          <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-8">
            <h3 className="flex items-center gap-2 font-bold text-emerald-900 mb-2">
              <CheckCircle2 className="w-5 h-5" /> Principali punti della guida
            </h3>
            <ul className="list-disc list-inside text-emerald-800 text-sm space-y-1">
              <li>Parametri tecnici: PEI (gres), resistenza all'abrasione.</li>
              <li>Tipologie di posa: colla vs flottante.</li>
              <li>Preparazione del supporto: massetto e livellina.</li>
              <li>Considerazioni room-by-room (bagno/cucina vs camere).</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Parametri tecnici di valutazione</h2>
          <p>
            Prima di acquistare, chiedi sempre la scheda tecnica del prodotto.
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6">
            <li><strong>PEI (per il Gres):</strong> Scala da 0 a 5 che misura la resistenza all'abrasione superficiale. PEI 3 è idoneo per case, PEI 4-5 per zone ad alto traffico.</li>
            <li><strong>Porosità (per il Parquet):</strong> La porosità determina quanto il materiale assorbirà liquidi e macchie. Il legno richiede finiture (vernice o olio) che lo sigillino.</li>
            <li><strong>Spessore:</strong> Un pavimento sottile (es. SPC) è ottimo per sovrapposizioni su esistente, ma richiede un supporto perfettamente planare.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Materiali a confronto</h2>
          <div className="space-y-6 mb-8">
            <div>
              <h4 className="font-bold flex items-center gap-2"><Info className="w-4 h-4" /> Gres Porcellanato</h4>
              <p className="text-sm text-slate-700">Indistruttibile. Disponibile in infiniti formati ed effetti. Ideale in ambienti umidi. <strong>Tecnica:</strong> La posa incollata su massetto è lo standard per evitare "vuoti" sotto la piastrella che potrebbero causare rotture.</p>
            </div>
            <div>
              <h4 className="font-bold flex items-center gap-2"><Info className="w-4 h-4" /> Parquet (Legno)</h4>
              <p className="text-sm text-slate-700">Prestigioso, caldo, isolante. Richiede una posa accurata e controllo dell'umidità del massetto (inferiore al 2%). <strong>Avvertenza:</strong> Attenzione agli sbalzi termici (riscaldamento a pavimento).</p>
            </div>
            <div>
              <h4 className="font-bold flex items-center gap-2"><Info className="w-4 h-4" /> SPC / LVT (Vinyl)</h4>
              <p className="text-sm text-slate-700">Moderno, impermeabile, sottile. Si posa spesso "flottante" (appoggiato su tappetino isolante). Ottimo per ristrutturazioni veloci senza demolizioni.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. L'importanza del supporto: Massetto e Livellina</h2>
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl my-6">
            <h3 className="flex items-center gap-2 font-bold text-amber-900 mb-2">
              <AlertTriangle className="w-5 h-5" /> Il massetto è tutto
            </h3>
            <p className="text-amber-900 text-sm">
              La planarità del supporto è cruciale. Se il massetto non è perfettamente piano, il pavimento (specie se di grande formato o SPC) si imbarcherà o si romperà. Spesso è necessario applicare una "livellina" (autolivellante) per correggere le irregolarità prima della posa. Non saltare questo passaggio per risparmiare: il rischio di rifare tutto è altissimo.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Posa: DIY vs Professionista</h2>
          <p>
            La posa fai-da-te è possibile solo per sistemi a incastro (laminati, SPC) in ambienti semplici. Chiedi l'intervento di un posatore professionista se:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700">
            <li>Posi gres di grande formato (es. 60x120 o superiori), che richiede tecniche di spalmatura doppia della colla.</li>
            <li>Posi parquet massello o in ambienti con riscaldamento a pavimento.</li>
            <li>Necessiti di tagli complessi per bordi o risvolti.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">FAQ - Domande frequenti</h2>
          <div className="space-y-4 mb-8">
            <div>
              <h3 className="font-bold text-slate-900">Quanto costa la posa?</h3>
              <p className="text-sm text-slate-600">Il costo varia in base al tipo di materiale, formato e tecnica. I grandi formati costano più dei formati piccoli perché richiedono più maestria.</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Perché si vedono le "denti" tra le piastrelle?</h3>
              <p className="text-sm text-slate-600">Sono causati da una posa non corretta o dall'uso di distanziatori inadeguati (a cuneo) per livellare le piastrelle grandi.</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl mt-10">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" /> Ottieni un pavimento perfetto
            </h3>
            <p className="text-blue-800 mb-6">
              EdilFree ti supporta nella valutazione tecnica e dei costi per il rinnovo dei pavimenti, garantendoti la scelta del materiale e della posa più adatti alla tua casa.
            </p>
            <Link
              to="/stima"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md"
            >
              Richiedi stima tecnica <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-xs text-slate-400 mt-8 text-center italic">
            Nota: La posa di un pavimento è un'operazione tecnica definitiva. Questa guida ha scopo informativo; per la realizzazione, affidati sempre a posatori qualificati che rilascino garanzia sul lavoro eseguito.
          </p>
        </article>
      </main>
    </div>
  );
};
