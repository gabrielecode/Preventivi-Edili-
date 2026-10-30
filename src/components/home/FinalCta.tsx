import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export const FinalCta: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-4 max-w-2xl text-balance">
          {t.finalCtaTitle}
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mb-8 leading-relaxed">
          {t.finalCtaSubtitle}
        </p>

        <div className="mb-8">
          <Link
            to="/stima"
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl text-base font-bold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 transition-all cursor-pointer active:scale-98"
          >
            <span>{t.finalCtaBtn}</span>
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </div>

        {/* 3 Trust Signals */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            <span>{t.finalCtaFeature1}</span>
          </div>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            <span>{t.finalCtaFeature2}</span>
          </div>
          <span className="hidden sm:inline" aria-hidden="true">·</span>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
            <span>{t.finalCtaFeature3}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
