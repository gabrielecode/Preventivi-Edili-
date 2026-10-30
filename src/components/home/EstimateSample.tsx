import React from "react";
import {
  CheckCircle2,
  Clock,
  TrendingDown,
  ShoppingBag,
  Wrench,
  ShieldCheck,
  Building2,
  User,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export const EstimateSample: React.FC = () => {
  const { t } = useLanguage();

  const shoppingItems = [
    t.sampleShoppingItem1,
    t.sampleShoppingItem2,
    t.sampleShoppingItem3,
    t.sampleShoppingItem4,
  ];

  return (
    <section
      id="esempio"
      className="py-16 sm:py-20 px-4 sm:px-6 bg-slate-50/70 border-t border-slate-200/80"
    >
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mb-3">
            {t.sampleSectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {t.sampleSectionSubtitle}
          </p>
        </div>

        {/* Card Container */}
        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xs overflow-hidden">
          {/* Card Header with Indicative Example Label */}
          <div className="p-6 sm:p-8 border-b border-slate-200/80 bg-gradient-to-r from-slate-50 via-white to-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-blue-700 tracking-wide uppercase">
                <span>{t.sampleBadge}</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-500 font-normal normal-case">
                  {t.sampleLocation}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {t.sampleJobTitle}
              </h3>
            </div>

            <div className="inline-flex items-center gap-2 self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold">
              <TrendingDown className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
              <span>{t.sampleSavingsValue}</span>
            </div>
          </div>

          {/* Pricing Comparison Grid */}
          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-slate-200/80">
            {/* Pro Card */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-3 text-slate-700 font-bold text-sm">
                  <Building2 className="w-4 h-4 text-slate-500" aria-hidden="true" />
                  <span>{t.sampleProTitle}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-950 font-mono tabular-nums mb-3">
                  {t.sampleProValue}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {t.sampleProSubtitle}
                </p>
              </div>
            </div>

            {/* DIY Card */}
            <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-3 text-blue-900 font-bold text-sm">
                  <User className="w-4 h-4 text-blue-600" aria-hidden="true" />
                  <span>{t.sampleDiyTitle}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-900 font-mono tabular-nums mb-3">
                  {t.sampleDiyValue}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {t.sampleDiySubtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Key Metrics Strip */}
          <div className="px-6 py-4 sm:px-8 bg-slate-50/50 border-b border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
              <span className="font-semibold text-slate-900">{t.sampleFeasibilityLabel}</span>
              <span className="text-slate-600">{t.sampleFeasibilityValue}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <Clock className="w-4 h-4 text-blue-600 shrink-0" aria-hidden="true" />
              <span className="font-semibold text-slate-900">{t.sampleTimeLabel}</span>
              <span className="text-slate-600 font-mono tabular-nums">{t.sampleTimeValue}</span>
            </div>
          </div>

          {/* Details & Shopping List Preview */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h4 className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                <ShoppingBag className="w-4 h-4 text-slate-500" aria-hidden="true" />
                <span>{t.sampleShoppingHeading}</span>
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                {shoppingItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 py-1">
                    <span className="text-blue-500 font-bold shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <Wrench className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{t.sampleToolsNote}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{t.sampleSafetyNote}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
