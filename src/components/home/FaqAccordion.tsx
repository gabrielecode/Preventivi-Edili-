import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export const FaqAccordion: React.FC = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const faqItems = [
    { q: t.faqQ1, a: t.faqA1 },
    { q: t.faqQ2, a: t.faqA2 },
    { q: t.faqQ3, a: t.faqA3 },
    { q: t.faqQ4, a: t.faqA4 },
    { q: t.faqQ5, a: t.faqA5 },
    { q: t.faqQ6, a: t.faqA6 },
    { q: t.faqQ7, a: t.faqA7 },
    { q: t.faqQ8, a: t.faqA8 },
    { q: t.faqQ9, a: t.faqA9 },
    { q: t.faqQ10, a: t.faqA10 },
  ];

  return (
    <section
      id="faq"
      className="py-16 sm:py-20 px-4 sm:px-6 bg-white border-t border-slate-200/80"
    >
      <div className="max-w-4xl mx-auto">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mb-3">
            {t.faqSectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {t.faqSectionSubtitle}
          </p>
        </div>

        <div className="space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const triggerId = `faq-trigger-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <div
                key={index}
                id={index === 9 ? "install-faq" : undefined}
                className="rounded-2xl border border-slate-200/80 bg-slate-50/50 transition-colors hover:border-slate-300"
              >
                <h3>
                  <button
                    type="button"
                    id={triggerId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(index)}
                    className="w-full py-4.5 px-5 sm:px-6 flex items-center justify-between gap-4 text-left font-bold text-slate-900 text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded-2xl cursor-pointer"
                  >
                    <span className="leading-snug">{item.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-blue-600" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </h3>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/40 pt-3.5"
                  >
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
