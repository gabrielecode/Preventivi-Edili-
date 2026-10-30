import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Calculator, ExternalLink, Info, Globe, Download } from "lucide-react";
import { useLanguage, LanguageCode } from "../context/LanguageContext";

const availableLanguages: { code: LanguageCode; flag: string; label: string }[] = [
  { code: "it", flag: "🇮🇹", label: "Italiano" },
  { code: "de", flag: "🇩🇪", label: "Deutsch" },
  { code: "fr", flag: "🇫🇷", label: "Français" },
  { code: "en", flag: "🇬🇧", label: "English" },
];

export const Footer: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();

  const handleFaqClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === "/") {
      e.preventDefault();
      const el = document.getElementById("faq");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="mt-auto bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Upper Main Footer Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Col 1: Brand & Short Description (5 cols) */}
          <div className="md:col-span-5 flex flex-col items-start">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 mb-3 group"
              title={t.appName}
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Calculator className="w-5 h-5" />
              </div>
              <span className="text-lg font-extrabold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                {t.appName}
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm mb-4">
              {t.footerShortDesc}
            </p>

            {/* Disclaimer box: "Le stime sono indicative e non vincolanti" */}
            <div className="inline-flex items-start gap-2.5 p-3 rounded-xl bg-slate-800/80 border border-slate-700/70 text-amber-300/90 text-xs leading-snug">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{t.footerDisclaimer}</span>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="md:col-span-3 flex flex-col">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Navigazione
            </h4>
            <nav className="flex flex-col gap-2.5 text-xs sm:text-sm font-medium">
              <Link
                to="/"
                className="text-slate-300 hover:text-white transition-colors"
              >
                {t.navHome}
              </Link>
              <Link
                to="/stima"
                className="text-slate-300 hover:text-white transition-colors"
              >
                {t.navEstimate}
              </Link>
              <Link
                to="/privacy"
                className="text-slate-300 hover:text-white transition-colors"
              >
                {t.navPrivacy}
              </Link>
              <a
                href="/#faq"
                onClick={handleFaqClick}
                className="text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                {t.navFaq}
              </a>
              <a
                href="/#install-faq"
                onClick={(e) => {
                  if (location.pathname === "/") {
                    e.preventDefault();
                    const el = document.getElementById("install-faq");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Download className="w-3 h-3" />
                <span>{t.installAppBtn}</span>
              </a>
            </nav>
          </div>

          {/* Col 3: Language Selector (4 cols) */}
          <div className="md:col-span-4 flex flex-col">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>{t.footerLanguage}</span>
            </div>
            
            <p className="text-xs text-slate-400 mb-3">
              Seleziona la lingua per l'interfaccia e i report:
            </p>

            <div className="grid grid-cols-2 gap-2 max-w-xs">
              {availableLanguages.map((item) => {
                const isActive = language === item.code;
                return (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => setLanguage(item.code)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
                      isActive
                        ? "bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/30 font-bold"
                        : "bg-slate-800 text-slate-300 border-slate-700/80 hover:bg-slate-700/80 hover:text-white hover:border-slate-600"
                    }`}
                  >
                    <span className="text-sm leading-none">{item.flag}</span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Developer Credit Link (ben visibile, link verso https://sititicino.ch/sviluppo-app con target="_blank" rel="noopener") */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="text-xs text-slate-500 text-center sm:text-left">
            © {new Date().getFullYear()} {t.appName}. {t.footerRights}
          </div>

          {/* Developer Link: Highly prominent card/badge */}
          <a
            href="https://sititicino.ch/sviluppo-app"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-950/80 via-slate-800 to-indigo-950/80 border border-blue-500/40 hover:border-blue-400 text-blue-300 hover:text-white text-xs sm:text-sm font-bold shadow-md shadow-blue-950/50 hover:shadow-lg hover:shadow-blue-900/40 transition-all cursor-pointer group active:scale-98"
            title={t.developerCredit}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="tracking-tight">{t.developerCredit}</span>
            <ExternalLink className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

        </div>
      </div>
    </footer>
  );
};
