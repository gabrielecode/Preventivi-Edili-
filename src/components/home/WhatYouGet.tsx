import React from "react";
import {
  Wrench,
  Briefcase,
  TrendingDown,
  ClipboardList,
  Package,
  ShieldAlert,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export const WhatYouGet: React.FC = () => {
  const { t } = useLanguage();

  const cards = [
    {
      icon: Wrench,
      title: t.cardDiyCostTitle,
      desc: t.cardDiyCostDesc,
      iconColor: "text-blue-700 bg-blue-50 border-blue-100/80",
    },
    {
      icon: Briefcase,
      title: t.cardProCostTitle,
      desc: t.cardProCostDesc,
      iconColor: "text-indigo-700 bg-indigo-50 border-indigo-100/80",
    },
    {
      icon: TrendingDown,
      title: t.cardSavingsTitle,
      desc: t.cardSavingsDesc,
      iconColor: "text-emerald-700 bg-emerald-50 border-emerald-100/80",
    },
    {
      icon: ClipboardList,
      title: t.cardShoppingListTitle,
      desc: t.cardShoppingListDesc,
      iconColor: "text-amber-700 bg-amber-50 border-amber-100/80",
    },
    {
      icon: Package,
      title: t.cardToolsTitle,
      desc: t.cardToolsDesc,
      iconColor: "text-purple-700 bg-purple-50 border-purple-100/80",
    },
    {
      icon: ShieldAlert,
      title: t.cardSafetyPermitsTitle,
      desc: t.cardSafetyPermitsDesc,
      iconColor: "text-rose-700 bg-rose-50 border-rose-100/80",
    },
  ];

  return (
    <section
      id="cosa-ottieni"
      className="py-16 sm:py-20 px-4 sm:px-6 bg-slate-50/70 border-t border-slate-200/80"
    >
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mb-3">
            {t.whatYouGetTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {t.whatYouGetSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 flex flex-col justify-between transition-all hover:border-slate-300"
              >
                <div>
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center border mb-5 ${card.iconColor}`}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
