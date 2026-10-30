import React from "react";
import { countriesList } from "../data/countries";
import { TranslationDict } from "../data/translations";

interface Props {
  selectedCountryId: string;
  setSelectedCountryId: (id: string) => void;
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  t: TranslationDict;
}

export const WizardStep1Location: React.FC<Props> = ({
  selectedCountryId,
  setSelectedCountryId,
  selectedLanguage,
  setSelectedLanguage,
  t,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-1">{t.step1Title}</h2>
        <p className="text-sm text-slate-500">{t.step1Desc}</p>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">{t.countrySelectLabel}</label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {countriesList.map((country) => (
            <button
              key={country.id}
              onClick={() => setSelectedCountryId(country.id)}
              className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                selectedCountryId === country.id
                  ? "border-blue-600 bg-blue-50/80 text-blue-800 ring-2 ring-blue-100 font-semibold shadow-sm"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300"
              }`}
              type="button"
            >
              <span className="text-3xl mb-1.5">{country.flag}</span>
              <span className="text-xs font-bold">{country.name}</span>
              <span className="text-[11px] text-slate-400 mt-0.5">{country.currency}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">{t.languageSelectLabel}</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { code: "it", flag: "🇮🇹", label: t.langIt },
            { code: "de", flag: "🇩🇪", label: t.langDe },
            { code: "fr", flag: "🇫🇷", label: t.langFr },
            { code: "en", flag: "🇬🇧", label: t.langEn },
          ].map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLanguage(lang.code)}
              className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                selectedLanguage === lang.code
                  ? "border-blue-600 bg-blue-50/80 text-blue-800 ring-2 ring-blue-100 font-semibold shadow-sm"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
              type="button"
            >
              <span className="text-xl">{lang.flag}</span>
              <span className="text-sm font-medium">{lang.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
