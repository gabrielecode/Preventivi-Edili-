import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Bath, Sparkles } from "lucide-react";
import { SeoHead } from "../../components/SeoHead";

export const GuidaRistrutturazioneBagno: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 min-h-screen">
      <SeoHead
        page="guide-ristrutturazione-bagno"
        title="Ristrutturazione bagno: Idee, consigli e come evitare errori"
        description="Il bagno è l'ambiente più delicato da ristrutturare. Scopri come progettare uno spazio funzionale, scegliere i materiali giusti e gestire i lavori."
      />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <article className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-8 sm:p-12 prose prose-slate max-w-none">
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mb-6">
            Ristrutturazione bagno: Idee e consigli
          </h1>
          
          <p className="lead text-lg text-slate-600 mb-8">
            Ristrutturare il bagno è un intervento che unisce estetica e funzionalità tecnica. Essendo l'ambiente con la maggiore densità di impianti (idraulici ed elettrici), richiede una progettazione impeccabile.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Ottimizzare gli spazi</h2>
          <p>Anche in bagni di piccole dimensioni, una disposizione intelligente dei sanitari può fare la differenza. L'uso di sanitari sospesi, ad esempio, non solo facilita la pulizia del pavimento ma dona una sensazione di maggiore ampiezza visiva. Per box doccia e piatti doccia, prediligi soluzioni filo pavimento per un look moderno e senza barriere architettoniche.</p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Materiali e Rivestimenti</h2>
          <p>La scelta del gres porcellanato rimane la soluzione più performante per pavimenti e rivestimenti, grazie alla sua resistenza all'umidità e facilità di manutenzione. Assicurati sempre che il pavimento scelto abbia un coefficiente antiscivolo adeguato.</p>

          <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl mt-10">
            <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Bath className="w-5 h-5" /> Progetta il bagno dei tuoi sogni
            </h3>
            <p className="text-blue-800 mb-6">
              Scopri quali materiali e soluzioni tecniche si adattano meglio al tuo spazio. Con EdilFree puoi simulare diversi scenari di spesa e pianificare il rinnovo del tuo bagno con precisione.
            </p>
            <Link
              to="/stima"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md"
            >
              Richiedi la tua stima ora <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
};
