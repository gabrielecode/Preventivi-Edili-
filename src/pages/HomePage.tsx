import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Scale,
  Receipt,
  ShieldCheck,
  CheckCircle2,
  Hammer,
  Camera,
  FileSpreadsheet,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { HeroIllustration } from "../components/HeroIllustration";

export const HomePage: React.FC = () => {
  const { t } = useLanguage();

  const handleScrollToHowItWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("come-funziona");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Copy & Actions */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Pill badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold mb-5 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>AI Cost Estimator • 2026</span>
              </div>

              {/* Titolo con la promessa */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.15] mb-4">
                {t.heroTitle}
              </h1>

              {/* Sottotitolo di una riga */}
              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-8 max-w-2xl">
                {t.heroSubtitle}
              </p>

              {/* CTA + Link Come Funziona */}
              <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
                <Link
                  to="/stima"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-base font-bold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 transition-all cursor-pointer active:scale-98"
                >
                  <span>{t.heroCtaBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#come-funziona"
                  onClick={handleScrollToHowItWorks}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100/80 rounded-2xl text-sm font-semibold border border-slate-200 transition-all cursor-pointer"
                >
                  {t.heroHowItWorksLink}
                </a>
              </div>

              {/* 3 Punti Fiducia */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-200/80">
                {/* Punto 1: Confronto fai da te / professionista */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/70 border border-slate-200/60 shadow-xs">
                  <div className="p-2 rounded-lg bg-amber-50 text-amber-600 shrink-0">
                    <Scale className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 leading-snug">
                      {t.trustPoint1Title}
                    </h3>
                    <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                      {t.trustPoint1Desc}
                    </p>
                  </div>
                </div>

                {/* Punto 2: Intervalli con IVA */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/70 border border-slate-200/60 shadow-xs">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600 shrink-0">
                    <Receipt className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 leading-snug">
                      {t.trustPoint2Title}
                    </h3>
                    <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                      {t.trustPoint2Desc}
                    </p>
                  </div>
                </div>

                {/* Punto 3: Nessuna registrazione */}
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/70 border border-slate-200/60 shadow-xs">
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 leading-snug">
                      {t.trustPoint3Title}
                    </h3>
                    <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                      {t.trustPoint3Desc}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Inline SVG Illustration */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <HeroIllustration className="w-full max-w-md lg:max-w-none" />
            </div>

          </div>
        </div>
      </section>

      {/* "Come funziona" Section */}
      <section id="come-funziona" className="py-14 sm:py-20 px-4 sm:px-6 bg-white border-t border-slate-200/60">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mb-3">
              {t.howItWorksTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-500">
              {t.appSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Step 1 */}
            <div className="relative p-6 sm:p-7 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-blue-200 transition-all flex flex-col items-start group">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Hammer className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                {t.howItWorksStep1Title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t.howItWorksStep1Desc}
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative p-6 sm:p-7 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-blue-200 transition-all flex flex-col items-start group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                {t.howItWorksStep2Title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t.howItWorksStep2Desc}
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative p-6 sm:p-7 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-blue-200 transition-all flex flex-col items-start group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                {t.howItWorksStep3Title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t.howItWorksStep3Desc}
              </p>
            </div>
          </div>

          {/* Quick CTA banner at bottom of Come Funziona */}
          <div className="mt-12 sm:mt-16 text-center">
            <Link
              to="/stima"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-sm font-bold shadow-md transition-all active:scale-98"
            >
              <span>{t.navCalculateBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
