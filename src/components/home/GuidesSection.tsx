import React from "react";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

const guides = [
  { title: "Come tinteggiare una stanza", path: "/guida/come-tinteggiare" },
  { title: "Come sturare il lavandino", path: "/guida/sturare-lavandino" },
  { title: "Ristrutturazione casa: Guida", path: "/guida/ristrutturazione-casa" },
  { title: "Quanto costa ristrutturare", path: "/guida/costi-ristrutturazione" },
  { title: "Ristrutturazione bagno", path: "/guida/ristrutturazione-bagno" },
  { title: "Pianificare senza stress", path: "/guida/pianificare-ristrutturazione" },
  { title: "Scegliere l'impresa edile", path: "/guida/scegliere-impresa" },
  { title: "Guida alla scelta del rullo", path: "/guida/scelta-rullo" },
  { title: "Quale pittura scegliere?", path: "/guida/scelta-pittura" },
];

export const GuidesSection: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="w-8 h-8 text-blue-600" />
          <h2 className="text-3xl font-extrabold text-slate-950">Guide Utili EdilFree</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {guides.map((guide) => (
            <Link
              key={guide.path}
              to={guide.path}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all group"
            >
              <h3 className="font-semibold text-slate-900 group-hover:text-blue-700">{guide.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
