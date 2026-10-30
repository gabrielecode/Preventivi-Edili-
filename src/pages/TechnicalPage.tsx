import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Cpu, ShieldCheck, Wrench, FileText } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { SeoHead } from "../components/SeoHead";

export const TechnicalPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <main className="flex-1 bg-slate-50 py-10 sm:py-16 px-4 sm:px-6">
      <SeoHead
        page="technical"
        title="Dettagli Tecnici & Metodologia"
        description="Approfondimento tecnico sul funzionamento del nostro preventivatore AI."
      />
      
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.privacyBackToHome}</span>
          </Link>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-8 sm:p-12 space-y-8">
          <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight">Dettagli Tecnici & Metodologia</h1>
          
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
              <Cpu className="w-6 h-6 text-blue-600" /> Il Motore di Calcolo
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Il Preventivatore Edile AI non si affida all'intelligenza artificiale per i calcoli economici. 
              Tutti i totali, le quantità (inclusa la percentuale di sfrido) e gli intervalli di prezzo 
              sono determinati da <strong>algoritmi deterministici</strong> basati su listini prezzi 
              pre-configurati e verificati. L'IA viene utilizzata esclusivamente per l'analisi 
              qualitativa dei testi, la generazione di consigli tecnici, l'identificazione dei rischi 
              e la redazione delle descrizioni dei passaggi operativi.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
              <Wrench className="w-6 h-6 text-indigo-600" /> Analisi delle Lavorazioni
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Ogni lavorazione selezionata attinge a una distinta base tecnica che definisce 
              automaticamente i materiali necessari e le attrezzature richieste. Le quantità 
              sono calcolate applicando un fattore di sfrido variabile (generalmente tra 10% e 15%) 
              per coprire i tagli, gli scarti e le inevitabili inefficienze in cantiere.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-600" /> Sicurezza e Normative
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              L'applicazione integra un sistema di regole che contrassegna automaticamente le lavorazioni 
              soggette a normative di sicurezza stringenti. Le lavorazioni che richiedono certificazioni 
              (es. DM 37/08 in Italia) vengono identificate e segnalate all'utente, raccomandando 
              espressamente l'intervento di ditte abilitate.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};
