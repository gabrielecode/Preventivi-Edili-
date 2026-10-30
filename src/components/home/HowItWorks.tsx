import React from "react";
import { Globe, Hammer, Ruler, SlidersHorizontal } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export const HowItWorks: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    {
      num: "01",
      icon: Globe,
      title: t.howItWorksStep1Title,
      desc: t.howItWorksStep1Desc,
    },
    {
      num: "02",
      icon: Hammer,
      title: t.howItWorksStep2Title,
      desc: t.howItWorksStep2Desc,
    },
    {
      num: "03",
      icon: Ruler,
      title: t.howItWorksStep3Title,
      desc: t.howItWorksStep3Desc,
    },
    {
      num: "04",
      icon: SlidersHorizontal,
      title: t.howItWorksStep4Title,
      desc: t.howItWorksStep4Desc,
    },
  ];

  return (
    <section
      id="come-funziona"
      className="py-16 sm:py-20 px-4 sm:px-6 bg-white border-t border-slate-200/80"
    >
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mb-3">
            {t.howItWorksTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {t.howItWorksSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between transition-all hover:border-slate-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100/80">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="font-mono text-xs font-semibold text-slate-400 tabular-nums">
                      {step.num}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.desc}
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
