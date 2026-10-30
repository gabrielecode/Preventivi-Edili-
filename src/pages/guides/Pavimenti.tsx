import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Grid3X3 } from "lucide-react";
import { SeoHead } from "../../components/SeoHead";

export const GuidaPavimenti: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <SeoHead
        page="guide-pavimenti"
        title="Come scegliere il pavimento: Gres, Parquet o SPC?"
        description="Guida alla scelta del pavimento ideale: gres porcellanato, parquet o SPC? Scopri vantaggi e usi per ogni stanza della casa."
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 sm:p-12 prose prose-slate max-w-none">
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-6">
            Come scegliere il pavimento
          </h1>
          
          <p className="lead text-lg text-slate-600 mb-8">
            La scelta del pavimento definisce lo stile di casa e ne condiziona la manutenzione futura. Ecco come orientarsi tra le opzioni più diffuse.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Le tipologie principali</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-700">
            <li><strong>Gres porcellanato:</strong> Estremamente resistente, versatile (effetto legno, marmo, cemento), perfetto per cucina e bagno.</li>
            <li><strong>Parquet:</strong> Caldo, accogliente e di pregio. Richiede più cura rispetto al gres.</li>
            <li><strong>SPC (Rigid Vinyl):</strong> Ottima alternativa al parquet, resistente all'acqua, facile da posare (incastro).</li>
          </ul>

          <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl mt-10">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Grid3X3 className="w-5 h-5" /> Scegli il pavimento giusto
            </h3>
            <p className="text-blue-800 mb-6">
              EdilFree ti supporta nella pianificazione dei costi per il rinnovo dei pavimenti, considerando materiali e posa in opera.
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
