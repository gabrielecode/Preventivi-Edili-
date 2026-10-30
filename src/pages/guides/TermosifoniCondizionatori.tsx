import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Thermometer, ShieldCheck, CheckCircle2, Info, AlertTriangle, Hammer, Wrench, Wind } from "lucide-react";
import { SeoHead } from "../../components/SeoHead";

export const GuidaTermosifoniCondizionatori: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <SeoHead
        page="guide-termosifoni-climatizzatori"
        title="Termosifoni e Condizionatori: Guida tecnica a comfort ed efficienza"
        description="Guida tecnica al riscaldamento e raffrescamento: materiali per radiatori, valvole termostatiche, tecnologia inverter per condizionatori, SEER/SCOP e corretto dimensionamento termico."
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 sm:p-12 prose prose-slate max-w-none">
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-4">
            Termosifoni e Condizionatori: Guida tecnica a comfort ed efficienza
          </h1>
          <p className="lead text-lg text-slate-600 mb-8">
            Il comfort termico di una casa non è un lusso, ma un requisito fondamentale per la salute e il benessere. La scelta tra diverse tecnologie di riscaldamento e raffrescamento impatta direttamente sull'efficienza energetica dell'intero edificio. Questa guida esplora le opzioni tecniche per i terminali di emissione (radiatori) e i sistemi di condizionamento, fornendo gli strumenti necessari per fare scelte basate sulle prestazioni reali, non solo sull'estetica.
          </p>

          <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-8">
            <h3 className="flex items-center gap-2 font-bold text-emerald-900 mb-2">
              <CheckCircle2 className="w-5 h-5" /> Principali punti della guida
            </h3>
            <ul className="list-disc list-inside text-emerald-800 text-sm space-y-1">
              <li>Radiatori: alluminio (bassa inerzia) vs ghisa (alta inerzia) vs acciaio (design).</li>
              <li>Valvole termostatiche: obbligatorie per il risparmio energetico.</li>
              <li>Condizionatori: importanza dell'inverter e dei coefficienti SEER/SCOP.</li>
              <li>Dimensionamento: calcolo del carico termico.</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Terminali di riscaldamento (Radiatori)</h2>
          <p>La scelta del materiale del radiatore definisce come la casa si scalda:</p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6">
            <li><strong>Alluminio:</strong> Si riscalda molto velocemente. Ottimo se usi il riscaldamento in modo discontinuo (accendi/spegni spesso).</li>
            <li><strong>Ghisa:</strong> Ha un'elevata inerzia termica; accumula calore e lo rilascia lentamente anche dopo che la caldaia è spenta. Ideale per case abitate tutto il giorno.</li>
            <li><strong>Acciaio/Design:</strong> Offre le migliori possibilità estetiche, con design moderni, sottili e performanti. Richiede impianti ben filtrati per evitare corrosioni.</li>
          </ul>
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl my-6">
            <h3 className="flex items-center gap-2 font-bold text-amber-900 mb-2">
              <Info className="w-5 h-5" /> Valvole termostatiche
            </h3>
            <p className="text-amber-900 text-sm">
              Sono obbligatorie per legge in impianti centralizzati e caldamente consigliate anche in quelli autonomi. Permettono di regolare la temperatura di ogni singola stanza, ottimizzando i consumi: inutile scaldare a 22°C una stanza che usi raramente.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Condizionamento e pompa di calore</h2>
          <p>
            Il condizionatore moderno è in realtà una pompa di calore. Per valutarne l'efficienza, non guardare solo il prezzo, ma le classi energetiche stagionali (SEER per il raffrescamento, SCOP per il riscaldamento).
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 mb-8">
            <li><strong>Tecnologia Inverter:</strong> Fondamentale. Modula la potenza del compressore in base alla reale necessità, evitando i continui cicli di avvio/arresto che consumano energia.</li>
            <li><strong>Rumorosità:</strong> Se installi lo split in camera da letto, verifica i decibel (dB) alla velocità minima (punta a valori &lt; 20 dB).</li>
            <li><strong>Filtrazione:</strong> Considera modelli con filtri avanzati per la purificazione dell'aria (polveri, pollini, batteri), essenziali in città.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Dimensionamento (Calcolo Carico Termico)</h2>
          <p>
            Un dimensionamento sbagliato significa costi alti e scarso comfort. Un radiatore troppo piccolo non scalderà mai la stanza; uno troppo grande comporterà un consumo inutile. Il tecnico deve calcolare il carico termico basandosi su: volume della stanza, esposizione (nord/sud), tipologia di infissi (doppio/triplo vetro) e isolamento delle pareti (cappotto termico).
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">FAQ - Domande frequenti</h2>
          <div className="space-y-4 mb-8">
            <div>
              <h3 className="font-bold text-slate-900">Perché si sente aria nel termosifone?</h3>
              <p className="text-sm text-slate-600">È necessario fare lo "spurgo" (sfiato) tramite l'apposita valvola per permettere all'acqua di circolare correttamente.</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl mt-10">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Wind className="w-5 h-5" /> Ottimizza il tuo comfort climatico
            </h3>
            <p className="text-blue-800 mb-6">
              EdilFree ti supporta nella valutazione tecnica e dei costi per l'installazione o sostituzione del tuo impianto di riscaldamento e raffrescamento, garantendo efficienza.
            </p>
            <Link
              to="/stima"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md"
            >
              Richiedi stima tecnica <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-xs text-slate-400 mt-8 text-center italic">
            Nota: La progettazione di impianti termici richiede calcoli di carico termico certificati. Questa guida ha scopo informativo; per la realizzazione, affidati sempre a professionisti che rilascino le dovute dichiarazioni di conformità.
          </p>
        </article>
      </main>
    </div>
  );
};
