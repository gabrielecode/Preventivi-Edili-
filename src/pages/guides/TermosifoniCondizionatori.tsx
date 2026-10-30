import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Thermometer, Wind } from "lucide-react";
import { SeoHead } from "../../components/SeoHead";

export const GuidaTermosifoniCondizionatori: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <SeoHead
        page="guide-termosifoni-climatizzatori"
        title="Termosifoni e Condizionatori: Guida alla scelta"
        description="Come scegliere termosifoni e condizionatori efficienti per il massimo comfort abitativo in ogni stagione."
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 sm:p-12 prose prose-slate max-w-none">
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-6">
            Termosifoni e Condizionatori: Guida alla scelta
          </h1>
          
          <p className="lead text-lg text-slate-600 mb-8">
            Il comfort climatico è fondamentale. Dalla scelta del materiale dei radiatori alla potenza dei condizionatori, ecco cosa sapere per un impianto efficiente.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Termosifoni</h2>
          <p>I materiali più comuni sono alluminio (bassa inerzia, si scaldano velocemente) e ghisa (alta inerzia, mantengono il calore più a lungo). La scelta dipende dal tipo di caldaia e dal tempo di utilizzo delle stanze.</p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Condizionatori</h2>
          <p>Per la camera da letto, la priorità è la silenziosità e la capacità di deumidificazione. Verifica sempre la classe energetica e la tecnologia inverter per ottimizzare i consumi.</p>

          <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl mt-10">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Thermometer className="w-5 h-5" /> Ottimizza il comfort
            </h3>
            <p className="text-blue-800 mb-6">
              EdilFree ti supporta nella valutazione dei costi per l'installazione o sostituzione di impianti di riscaldamento e raffrescamento.
            </p>
            <Link
              to="/stima"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md"
            >
              Ottieni stima professionale <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
};
