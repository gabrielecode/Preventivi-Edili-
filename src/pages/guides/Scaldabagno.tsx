import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Droplets, CheckCircle2, ShieldCheck, Info, AlertTriangle, Hammer, Wrench } from "lucide-react";
import { SeoHead } from "../../components/SeoHead";

export const GuidaScaldabagno: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <SeoHead
        page="guide-scaldabagno"
        title="Scaldabagno: Guida tecnica alla scelta, efficienza e sicurezza"
        description="Guida tecnica alla scelta dello scaldabagno: confronto tra sistemi a gas, elettrici e a pompa di calore. Sizing corretto, normative di sicurezza per lo scarico fumi e manutenzione."
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 sm:p-12 prose prose-slate max-w-none">
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-4">
            Scaldabagno: Guida tecnica alla scelta, efficienza e sicurezza
          </h1>
          <p className="lead text-lg text-slate-600 mb-8">
            La produzione di acqua calda sanitaria (ACS) è una delle voci di consumo energetico più rilevanti in un'abitazione. Scegliere lo scaldabagno corretto significa bilanciare l'efficienza energetica, la capacità di soddisfare i picchi di richiesta e i vincoli normativi legati alla sicurezza (scarico fumi, ventilazione). Questa guida analizza le tecnologie disponibili e le precauzioni tecniche necessarie per un'installazione sicura e a norma.
          </p>

          <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-8">
            <h3 className="flex items-center gap-2 font-bold text-emerald-900 mb-2">
              <CheckCircle2 className="w-5 h-5" /> Principali punti della guida
            </h3>
            <ul className="list-disc list-inside text-emerald-800 text-sm space-y-1">
              <li>Confronto tecnologie: gas istantaneo, elettrico accumulo, pompa di calore.</li>
              <li>Dimensionamento: come scegliere il litraggio o la potenza corretta.</li>
              <li>Sicurezza: normativa scarico fumi e ventilazione.</li>
              <li>Manutenzione: prevenzione calcare e controllo anodo.</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Tecnologie a confronto</h2>
          <ul className="space-y-4 text-slate-700 mb-8">
            <li><strong>Scaldabagno a Gas (Istantaneo):</strong> Riscalda l'acqua solo quando apri il rubinetto. Elevata efficienza, ideale per famiglie con più punti di prelievo. Richiede una canna fumaria o uno scarico a parete a norma (camera stagna).</li>
            <li><strong>Scaldabagno Elettrico (Accumulo):</strong> Mantiene un volume d'acqua sempre caldo. Molto semplice da installare, ma alto consumo energetico. Ideale per bassi consumi.</li>
            <li><strong>Scaldabagno a Pompa di Calore:</strong> Estrae calore dall'aria. Massima efficienza energetica (classe A+), ma richiede spazio (unità esterna o locale tecnico) e ha un costo iniziale superiore.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Dimensionamento corretto</h2>
          <p>Non sovradimensionare, né sottodimensionare. Un boiler troppo grande spreca energia per mantenere caldo un volume d'acqua non utilizzato; uno troppo piccolo ti lascerà senza acqua calda durante una doccia.</p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 mb-8">
            <li><strong>Singola persona:</strong> 30-50 litri (elettrico) o 11-13 litri/min (gas).</li>
            <li><strong>Famiglia (3-4 persone):</strong> 80-100 litri (elettrico) o 14-17 litri/min (gas).</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Sicurezza e Normative</h2>
          <div className="bg-red-50 border border-red-100 p-6 rounded-2xl my-6">
            <h3 className="flex items-center gap-2 font-bold text-red-900 mb-2">
              <AlertTriangle className="w-5 h-5" /> Sicurezza Gas e Fumi
            </h3>
            <p className="text-red-800 text-sm">
              Gli scaldabagni a gas devono essere installati in ambienti dotati di ventilazione permanente. Lo scarico dei fumi deve essere obbligatoriamente a norma (canna fumaria dedicata o scarico certificato). Installazioni fai-da-te su impianti a gas sono un reato e un rischio mortale. La dichiarazione di conformità rilasciata dal tecnico è obbligatoria.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Manutenzione e Calcare</h2>
          <p>
            Il calcare è il nemico numero uno. Si accumula sulla resistenza (elettrico) o sullo scambiatore (gas), riducendo l'efficienza e aumentando i consumi.
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 mb-8">
            <li><strong>Anodo di magnesio (Elettrico):</strong> Va controllato ogni 1-2 anni e sostituito quando corroso per evitare la corrosione della caldaia interna.</li>
            <li><strong>Pulizia scambiatore (Gas):</strong> Da eseguire periodicamente da un tecnico.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">FAQ</h2>
          <div className="space-y-4 mb-8">
            <div>
              <h3 className="font-bold text-slate-900">Come ridurre il consumo dello scaldabagno elettrico?</h3>
              <p className="text-sm text-slate-600">Installa un timer per accenderlo solo poche ore al giorno o regola il termostato a una temperatura moderata (50-55°C) per evitare sprechi.</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl mt-10">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" /> Scegli l'efficienza certificata
            </h3>
            <p className="text-blue-800 mb-6">
              EdilFree ti supporta nella valutazione tecnica e dei costi per l'installazione del tuo nuovo scaldabagno, garantendoti la scelta migliore per le tue esigenze e i consumi domestici.
            </p>
            <Link
              to="/stima"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md"
            >
              Richiedi stima tecnica <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-xs text-slate-400 mt-8 text-center italic">
            Nota: Gli impianti a gas richiedono certificazioni di conformità rilasciate da professionisti abilitati. Questa guida ha scopo informativo; per l'installazione, avvaliti sempre di tecnici qualificati.
          </p>
        </article>
      </main>
    </div>
  );
};
