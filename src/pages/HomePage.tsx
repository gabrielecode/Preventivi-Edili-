import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Scale,
  Receipt,
  ShieldCheck,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { usePWA } from "../context/PWAContext";
import { PWABanner } from "../components/pwa/PWABanner";
import { HowItWorks } from "../components/home/HowItWorks";
import { WhatYouGet } from "../components/home/WhatYouGet";
import { SupportedSectors } from "../components/home/SupportedSectors";
import { EstimateSample } from "../components/home/EstimateSample";
import { FaqAccordion } from "../components/home/FaqAccordion";
import { GuidesSection } from "../components/home/GuidesSection";
import { FinalCta } from "../components/home/FinalCta";
import { SeoHead } from "../components/SeoHead";

export const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const { isInstalled } = usePWA();

  const handleScrollToHowItWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("come-funziona");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <SeoHead
        page="home"
        title={t.seoHomeTitle}
        description={t.seoHomeDesc}
      />
      
      <PWABanner />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20 px-4 sm:px-6">
        {/* Background Image Overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: "url('/assets/aistudio/Homeowner_viewing_renovation_hol__a732fd58_3f905c84.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(2px)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/60 z-0 pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Copy & Actions */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Unboxed category / brand kicker */}
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 mb-5">
                <Sparkles className="w-4 h-4 text-blue-600" aria-hidden="true" />
                <span>AI Cost Estimator</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-500 font-normal">2026</span>
              </div>

              {/* Titolo con la promessa */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.15] mb-4 text-balance">
                {isInstalled ? t.standaloneHomeCta : t.heroTitle}
              </h1>

              {/* Sottotitolo */}
              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-8 max-w-2xl">
                {isInstalled ? t.standaloneHomeSubtitle : t.heroSubtitle}
              </p>

              {/* CTA + Link Come Funziona */}
              <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
                <Link
                  to="/stima"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-base font-bold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/35 transition-all cursor-pointer active:scale-98"
                >
                  <span>{isInstalled ? t.newEstimateBtn : t.heroCtaBtn}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
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
                    <Scale className="w-4 h-4" aria-hidden="true" />
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
                    <Receipt className="w-4 h-4" aria-hidden="true" />
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
                    <ShieldCheck className="w-4 h-4" aria-hidden="true" />
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

            {/* Right Column: Contextual Image */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              <div className="relative group">
                {/* Decorative glow */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 rounded-[3rem] blur-2xl group-hover:opacity-75 transition-opacity" />
                
                <img 
                  src="/assets/aistudio/Homeowner_viewing_renovation_hol__a732fd58_3f905c84.jpg" 
                  alt="AI Renovation Cost Estimation"
                  className="relative w-full max-w-md lg:max-w-none rounded-[2.5rem] shadow-2xl border border-white/20 opacity-90 group-hover:opacity-100 transition-opacity"
                />
                
                {/* Floating Badge on Image */}
                <div className="absolute -bottom-4 -left-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200/50 hidden md:block">
                  <div className="flex items-center gap-3 text-blue-600 font-bold text-sm">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span>Analisi Real-Time</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* (1) Come funziona in 4 passi con icone */}
      <HowItWorks />

      {/* (2) Cosa ottieni in 6 card */}
      <WhatYouGet />

      {/* (3) Per quali lavori con nota onesta su elettrico/idraulico */}
      <SupportedSectors />

      {/* (4) Esempio di stima statico etichettato "Esempio indicativo" con cifre coerenti */}
      <EstimateSample />

      {/* (5) FAQ accordion accessibile */}
      <FaqAccordion />
      
      {/* Guide */}
      <GuidesSection />

      {/* (6) CTA finale verso /stima */}
      <FinalCta />
    </div>
  );
};
