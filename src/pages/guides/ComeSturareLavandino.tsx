import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, AlertTriangle, Wrench, ShieldCheck } from "lucide-react";
import { SeoHead } from "../../components/SeoHead";

export const GuidaLavandino: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <SeoHead
        page="guide-lavandino"
        title="Come sturare il lavandino: Guida definitiva Fai-da-te"
        description="Il lavandino è intasato? Scopri i metodi più efficaci per sturarlo in sicurezza. Quando intervenire da soli e quando chiamare un idraulico professionista."
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 sm:p-12 prose prose-slate max-w-none">
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-6">
            Come sturare il lavandino: Guida definitiva Fai-da-te
          </h1>
          
          <p className="lead text-lg text-slate-600 mb-8">
            Un lavandino che non scarica è uno degli inconvenienti domestici più comuni e frustranti. Prima di arrenderti e chiamare un professionista, esistono diverse tecniche efficaci che puoi provare. In questa guida, vedremo come affrontare il problema in totale sicurezza.
          </p>

          <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl mb-8">
            <h3 className="flex items-center gap-2 font-bold text-amber-900 mb-2">
              <AlertTriangle className="w-5 h-5" /> Importante
            </h3>
            <p className="text-sm text-amber-800">
              Se hai già provato prodotti chimici aggressivi (come la soda caustica), indossa sempre guanti e occhiali protettivi. Se il problema persiste, non forzare: potresti danneggiare le guarnizioni dei tubi. In caso di dubbi sulla tenuta dell'impianto, consulta le normative locali su <a href="https://sititicino.ch" target="_blank" rel="noopener noreferrer" className="underline font-semibold">sititicino.ch</a>.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Le cause principali dell'ostruzione</h2>
          <p>La maggior parte delle ostruzioni è causata da un accumulo di residui organici, sapone, capelli o piccoli oggetti caduti accidentalmente nello scarico. Con il tempo, questi elementi formano un "tappo" che impedisce il deflusso regolare dell'acqua.</p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Metodi efficaci per sturare il lavandino</h2>
          
          <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">1. Lo sturalavandini a ventosa</h3>
          <p>Il metodo più classico e spesso il più efficace. Assicurati di coprire il foro del troppo pieno (il buco secondario) con un panno umido per creare un sottovuoto efficace. Pompa vigorosamente per alcuni secondi.</p>

          <h3 className="text-xl font-bold text-slate-900 mt-6 mb-3">2. Smontaggio del sifone</h3>
          <p>Se la ventosa non basta, il problema risiede probabilmente nel sifone. Metti un secchio sotto il lavandino, svita manualmente le ghiere di bloccaggio e pulisci accuratamente il tubo a "U".</p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Quando chiamare un professionista?</h2>
          <p>Se dopo aver pulito il sifone l'acqua continua a non defluire, l'ostruzione potrebbe essere più profonda, nel tubo a muro. In questo caso, l'intervento di un idraulico è indispensabile per evitare allagamenti o rotture dei condotti.</p>

          <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl mt-10">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" /> Stai ristrutturando o l'impianto è vecchio?
            </h3>
            <p className="text-blue-800 mb-6">
              Se le ostruzioni sono frequenti, potrebbe essere il segnale che il tuo impianto idraulico necessita di un ammodernamento. Non rischiare riparazioni fai-da-te su impianti compromessi.
            </p>
            <Link
              to="/stima"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md"
            >
              Richiedi una stima professionale su EdilFree <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
};
