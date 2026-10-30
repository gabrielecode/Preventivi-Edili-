import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Calculator, Receipt, ShieldCheck, CheckCircle2, Info, AlertTriangle } from "lucide-react";
import { SeoHead } from "../../components/SeoHead";

export const GuidaCostiRistrutturazione: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <SeoHead
        page="guide-costi-ristrutturazione"
        title="Quanto costa ristrutturare casa? Guida tecnica ai costi e al budget"
        description="Analisi tecnica dettagliata dei costi di ristrutturazione casa. Dalle voci di spesa principali alla gestione del budget e agli imprevisti: guida pratica per non avere sorprese."
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Homepage
        </Link>
        <article className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 sm:p-12 prose prose-slate max-w-none">
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-4">
            Quanto costa ristrutturare casa? Guida tecnica ai costi e al budget
          </h1>
          <p className="lead text-lg text-slate-600 mb-8">
            Pianificare il budget per la ristrutturazione di un immobile è un'operazione che richiede rigore, conoscenza del mercato e, soprattutto, la capacità di prevedere l'imprevedibile. Molte ristrutturazioni falliscono o subiscono enormi ritardi a causa di una sotto-stima dei costi iniziali o di una carente pianificazione delle opere. In questa guida tecnica, analizzeremo la struttura dei costi di cantiere, le variabili che determinano il prezzo finale e le strategie per mantenere il controllo economico dall'inizio alla fine.
          </p>

          <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-8">
            <h3 className="flex items-center gap-2 font-bold text-emerald-900 mb-2">
              <CheckCircle2 className="w-5 h-5" /> Principali punti della guida
            </h3>
            <ul className="list-disc list-inside text-emerald-800 text-sm space-y-1">
              <li>Struttura del preventivo: voci tecniche e oneri di cantiere.</li>
              <li>Il fondo di riserva: perché è obbligatorio per gli imprevisti.</li>
              <li>Impatto degli impianti e delle finiture sul budget finale.</li>
              <li>Fiscalità e incentivi: come massimizzare il ritorno sull'investimento.</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. La scomposizione del preventivo tecnico</h2>
          <p>
            Un preventivo professionale non è un prezzo "a corpo", ma la somma analitica di diverse componenti. Capire cosa paghi è il primo passo per ottimizzare la spesa.
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 mb-8">
            <li><strong>Oneri preliminari:</strong> Progettazione, pratiche burocratiche (CILA/SCIA), costi di sicurezza in cantiere.</li>
            <li><strong>Demolizioni e macerie:</strong> Spesso sottovalutati, includono la manodopera di demolizione e il costo di trasporto/smaltimento in discarica autorizzata (onere ambientale obbligatorio).</li>
            <li><strong>Opere impiantistiche:</strong> Rifacimento completo dell'impianto elettrico, idrico-sanitario e di riscaldamento/condizionamento. Sono interventi a norma, necessari e costosi.</li>
            <li><strong>Opere edili e finiture:</strong> Massetti, intonaci, posa di pavimenti e rivestimenti, rasature, pitture.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Il calcolo dell'imprevisto</h2>
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl my-6">
            <h3 className="flex items-center gap-2 font-bold text-amber-900 mb-2">
              <AlertTriangle className="w-5 h-5" /> Regola d'oro: Il Fondo Imprevisti
            </h3>
            <p className="text-amber-900 text-sm">
              In una ristrutturazione, l'imprevisto è la norma, non l'eccezione. Dalle tubazioni corrose trovate aprendo un muro a infiltrazioni non visibili, il rischio è sempre presente. <strong>Devi sempre calcolare un fondo imprevisti tra il 10% e il 15% del valore totale del preventivo.</strong> Se non lo usi, sarà risparmio; se non lo hai, sarà un debito improvviso.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Variabili chiave che influenzano il prezzo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-slate-100 rounded-xl">
              <h4 className="font-bold mb-2 flex items-center gap-2"><Info className="w-4 h-4" /> Qualità delle Finiture</h4>
              <p className="text-sm text-slate-700">Le piastrelle possono costare 15€/mq o 150€/mq. La posa di un parquet pregiato richiede manodopera più qualificata e costosa rispetto a un laminato flottante.</p>
            </div>
            <div className="p-4 bg-slate-100 rounded-xl">
              <h4 className="font-bold mb-2 flex items-center gap-2"><Info className="w-4 h-4" /> Complessità Impiantistica</h4>
              <p className="text-sm text-slate-700">Un sistema domotico, il riscaldamento a pavimento o la climatizzazione canalizzata aumentano significativamente il costo finale rispetto a impianti tradizionali.</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Come confrontare i preventivi</h2>
          <p>
            Per confrontare correttamente due ditte, richiedi il <strong>computo metrico estimativo</strong>. È l'unico documento tecnico che permette una comparazione "mele con mele". Se una ditta è troppo economica, verifica sempre:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700">
            <li>La qualità dei materiali proposti (spesso celata da marche non specificate).</li>
            <li>Se i costi di smaltimento macerie sono inclusi.</li>
            <li>La conformità alla sicurezza (Durc in regola).</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">5. Quando chiamare un professionista</h2>
          <p>
            Non tentare il fai-da-te su strutture o impianti certificati. Chiama un professionista (geometra, architetto o ditta abilitata) se:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700">
            <li>Intervieni su elementi strutturali (pilastri, travi, muri portanti).</li>
            <li>Devi ottenere certificazioni di conformità per impianti elettrici, gas o idraulici.</li>
            <li>Il tuo immobile è in una zona vincolata o richiede permessi particolari per il decoro architettonico.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">FAQ - Domande frequenti</h2>
          <div className="space-y-4 mb-8">
            <div>
              <h3 className="font-bold text-slate-900">Perché i prezzi variano tanto da ditta a ditta?</h3>
              <p className="text-sm text-slate-600">Le variabili sono infinite: tipo di contratto, attrezzature utilizzate, professionalità degli operai, gestione degli scarti e standard qualitativi dei materiali.</p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Gli incentivi fiscali sono garantiti?</h3>
              <p className="text-sm text-slate-600">Dipendono dalla legge in vigore al momento dei lavori e dai requisiti specifici dell'intervento. Verifica sempre con un commercialista prima di iniziare.</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl mt-10">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5" /> Analizza i costi in anticipo
            </h3>
            <p className="text-blue-800 mb-6">
              Non brancolare nel buio. EdilFree ti aiuta a comprendere i costi reali e a pianificare il tuo budget con consapevolezza, minimizzando il rischio di sorprese.
            </p>
            <Link
              to="/stima"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md"
            >
              Calcola la tua stima ora <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-xs text-slate-400 mt-8 text-center italic">
            Nota: I costi indicati nel preventivatore sono indicativi e possono variare in base alla zona geografica e allo stato dell'immobile. Per interventi tecnici specifici, si raccomanda sempre la verifica con un tecnico abilitato e la redazione di un contratto scritto dettagliato.
          </p>
        </article>
      </main>
    </div>
  );
};
