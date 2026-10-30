import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="mt-auto py-6 border-t border-slate-200/60 bg-white/50 text-slate-400 text-xs text-center">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-slate-400">
          © {new Date().getFullYear()} {t.appName}
        </p>
        <div className="flex items-center gap-4">
          <Link
            to="/privacy"
            className="text-slate-500 hover:text-slate-800 transition-colors"
          >
            {t.navPrivacy}
          </Link>
        </div>
      </div>
    </footer>
  );
};
