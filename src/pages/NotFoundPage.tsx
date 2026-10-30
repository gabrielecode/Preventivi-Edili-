import React from "react";
import { Link } from "react-router-dom";
import { Home, AlertTriangle } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export const NotFoundPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-sm p-8 text-center space-y-5">
        <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
            Error 404
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-3 mb-2">
            {t.notFoundTitle}
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            {t.notFoundDesc}
          </p>
        </div>

        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-md shadow-blue-500/20 transition-all cursor-pointer active:scale-98"
          >
            <Home className="w-4 h-4" />
            <span>{t.notFoundBtn}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
