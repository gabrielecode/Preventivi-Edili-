import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, PaintBucket, Scale } from "lucide-react";
import { SeoHead } from "../../components/SeoHead";

export const GuidaSceltaRullo: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <SeoHead
        page="guide-scelta-rullo"
        title="Quale rullo scegliere per tinteggiare: Guida completa"
        description="Pelo corto, medio o lungo? Scopri come scegliere il rullo giusto in base alla superficie e alla pittura per un lavoro di tinteggiatura impeccabile."
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 sm:p-12 prose prose-slate max-w-none">
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-6">
            Quale rullo scegliere per tinteggiare: Guida completa
          </h1>
          
          <p className="lead text-lg text-slate-600 mb-8">
            La scelta del rullo corretto è fondamentale quanto la qualità della pittura stessa. Un rullo inadatto può causare striature, accumuli di colore o un consumo eccessivo di materiale. Ecco una guida pratica per non sbagliare.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">La regola del "pelo"</h2>
          <p>La caratteristica principale da considerare è la lunghezza del pelo, che determina la capacità di carico e la finitura:</p>
          <ul className="list-disc list-inside space-y-2 text-slate-700">
            <li><strong>Pelo corto (4–8 mm):</strong> Ideale per superfici lisce come cartongesso, intonaco fine o verniciature di precisione (smalti).</li>
            <li><strong>Pelo medio (10–13 mm):</strong> Il standard per pareti interne normali. Offre il miglior equilibrio tra copertura e finitura.</li>
            <li><strong>Pelo lungo (oltre 15 mm):</strong> Indicato per superfici ruvide, intonaci grezzi o pareti esterne.</li>
          </ul>

          <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl mt-10">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Scale className="w-5 h-5" /> Ottieni risultati professionali
            </h3>
            <p className="text-blue-800 mb-6">
              Oltre all'attrezzo giusto, una corretta stima dei materiali ti farà risparmiare tempo e denaro. EdilFree ti guida nel calcolo delle quantità necessarie per il tuo progetto di tinteggiatura.
            </p>
            <Link
              to="/stima"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md"
            >
              Calcola il tuo preventivo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
};
