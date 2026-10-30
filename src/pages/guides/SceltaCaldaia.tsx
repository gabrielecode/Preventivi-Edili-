import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Flame, ShieldCheck, CheckCircle2, Info, AlertTriangle, Hammer, Wrench } from "lucide-react";
import { SeoHead } from "../../components/SeoHead";

export const GuidaCaldaia: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <SeoHead
        page="guide-scelta-caldaia"
        title="Come scegliere la caldaia: Guida tecnica a sistemi e potenze"
        description="Guida tecnica alla scelta della caldaia: condensazione, pompa di calore, sistemi ibridi. Sizing corretto (kW), normative scarico fumi, efficienza energetica e manutenzione."
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 sm:p-12 prose prose-slate max-w-none">
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-4">
            Come scegliere la caldaia: Guida tecnica a sistemi e potenze
          </h1>
          <p className="lead text-lg text-slate-600 mb-8">
            La caldaia è il "cuore" energetico dell'abitazione. Sostituire un apparecchio obsoleto con uno moderno a condensazione o un sistema ibrido non è solo un obbligo per il rispetto delle normative sull'efficienza, ma il modo più diretto per abbattere la spesa in bolletta e migliorare il comfort. Questa guida tecnica esplora le tecnologie attualmente sul mercato, i criteri per il dimensionamento corretto e gli obblighi normativi che regolano l'installazione e la sicurezza.
          </p>

          <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-8">
            <h3 className="flex items-center gap-2 font-bold text-emerald-900 mb-2">
              <CheckCircle2 className="w-5 h-5" /> Principali punti della guida
            </h3>
            <ul className="list-disc list-inside text-emerald-800 text-sm space-y-1">
              <li>Confronto tecnologico: Condensazione vs Pompa di Calore.</li>
              <li>Dimensionamento: kW per riscaldamento e ACS.</li>
              <li>Installazione: scarico fumi e ventilazione obbligatoria.</li>
              <li>Manutenzione: obblighi di legge (libretto, bollino).</li>
            </ul>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Analisi tecnologica</h2>
          <ul className="space-y-4 text-slate-700 mb-8">
            <li><strong>Caldaia a Condensazione:</strong> Recupera il calore latente contenuto nei fumi di combustione. Obbligatoria per legge in sostituzione di caldaie tradizionali (salvo impossibilità tecnica documentata).</li>
            <li><strong>Pompa di Calore (PdC):</strong> Ideale per case ad alta efficienza energetica (cappotto termico, infissi performanti). Funziona al meglio con impianti a bassa temperatura (pavimento radiante).</li>
            <li><strong>Sistemi Ibridi:</strong> Combinano caldaia a condensazione e pompa di calore. La scelta migliore per chi vuole passare all'elettrico ma vuole una sicurezza in caso di temperature esterne rigidissime.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Dimensionamento (kW)</h2>
          <p>
            Non scegliere la caldaia "ad occhio". La potenza in kW deve rispondere a due esigenze separate:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 mb-6">
            <li><strong>Potenza per Riscaldamento:</strong> Basata sul fabbisogno termico dell'appartamento (calcolato tramite diagnosi energetica).</li>
            <li><strong>Potenza per Acqua Calda (ACS):</strong> Fondamentale per il comfort. Se hai più bagni o una vasca, potresti aver bisogno di una potenza maggiore (es. 28-32 kW) anche se per il riscaldamento ne basterebbero meno.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Sicurezza e Normative</h2>
          <div className="bg-red-50 border border-red-100 p-6 rounded-2xl my-6">
            <h3 className="flex items-center gap-2 font-bold text-red-900 mb-2">
              <AlertTriangle className="w-5 h-5" /> Scarico fumi: la normativa
            </h3>
            <p className="text-red-800 text-sm">
              In Italia, lo scarico dei fumi deve avvenire obbligatoriamente a tetto (canna fumaria). Lo scarico a parete è permesso solo in casi specifici (sostituzione in condominio senza canna fumaria o vincoli estetici) e deve essere certificato da un tecnico. Ignorare questa norma comporta pesanti sanzioni.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Manutenzione: Obblighi di legge</h2>
          <p>
            La manutenzione non è un consiglio, è un obbligo di legge.
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-700 mb-8">
            <li><strong>Libretto d'impianto:</strong> Obbligatorio e deve essere aggiornato ad ogni intervento.</li>
            <li><strong>Bollino (Controllo Fumi):</strong> Verifica periodica dell'efficienza energetica, obbligatoria con scadenze variabili (di norma ogni 2 o 4 anni a seconda della potenza e tipo di combustibile).</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">FAQ - Domande frequenti</h2>
          <div className="space-y-4 mb-8">
            <div>
              <h3 className="font-bold text-slate-900">Perché la bolletta è alta con la caldaia nuova?</h3>
              <p className="text-sm text-slate-600">Spesso è dovuto a una curva climatica non impostata correttamente o all'assenza di un termostato modulante che non fa "lavorare" la caldaia a condensazione al meglio.</p>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl mt-10">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Flame className="w-5 h-5" /> Scegli la caldaia giusta
            </h3>
            <p className="text-blue-800 mb-6">
              EdilFree ti supporta nella valutazione tecnica e dei costi per l'installazione della tua nuova caldaia, garantendoti la massima efficienza.
            </p>
            <Link
              to="/stima"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md"
            >
              Richiedi stima tecnica <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-xs text-slate-400 mt-8 text-center italic">
            Nota: Gli impianti a gas e gli scarichi fumi sono soggetti a norme stringenti. Questa guida ha scopo informativo; per l'installazione, avvaliti sempre di ditte specializzate che rilascino le dovute dichiarazioni di conformità.
          </p>
        </article>
      </main>
    </div>
  );
};
