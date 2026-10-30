import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookie, X, ShieldCheck } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

export const CookieBanner: React.FC = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent_accepted");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent_accepted", "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-6 md:max-w-md"
        >
          <div className="bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700 p-5 md:p-6 backdrop-blur-lg bg-slate-900/95">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-2.5 bg-blue-600/20 text-blue-400 rounded-xl shrink-0">
                <Cookie className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold mb-1 flex items-center gap-1.5">
                  {t.cookiePolicyTitle}
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-widest font-black">
                    LPD & GDPR
                  </span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Utilizziamo solo cookie tecnici e storage locale per garantire il funzionamento del preventivatore e salvare le tue preferenze. Nessun dato viene ceduto a terzi.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={acceptCookies}
                className="w-full sm:w-auto flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all active:scale-95 shadow-lg shadow-blue-600/20"
              >
                Accetta e chiudi
              </button>
              <Link
                to="/privacy"
                onClick={() => setIsVisible(false)}
                className="w-full sm:w-auto px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Leggi Informativa
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
