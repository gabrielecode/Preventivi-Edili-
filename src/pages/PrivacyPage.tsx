import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  Lock,
  EyeOff,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Cpu,
  Image as ImageIcon,
  Users,
  Server,
  Scale,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { SeoHead } from "../components/SeoHead";

export const PrivacyPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="flex-1 bg-slate-50 py-10 sm:py-16 px-4 sm:px-6">
      {/* Dynamic SEO Head with canonical, hreflang, OpenGraph and WebApplication schema */}
      <SeoHead
        page="privacy"
        title={t.seoPrivacyTitle}
        description={t.seoPrivacyDesc}
      />

      <div className="max-w-3xl mx-auto">
        {/* Navigation Breadcrumb / Back button */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.privacyBackToHome}</span>
          </Link>
        </div>

        {/* Warning Callout: "Bozza da verificare" */}
        <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200/90 shadow-xs flex items-start gap-3.5 text-amber-900">
          <div className="p-2 rounded-xl bg-amber-100 text-amber-700 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-200/80 text-amber-900 text-xs font-extrabold tracking-wide uppercase">
                {t.privacyDraftBadge}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-amber-800 leading-relaxed font-medium">
              {t.privacyDraftNotice}
            </p>
          </div>
        </div>

        {/* Header Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-10 mb-8">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-indigo-50 text-indigo-600 mb-4">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mb-3">
            {t.privacyPageTitle}
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            {t.privacyPageSubtitle}
          </p>

          {/* Trust Badges */}
          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-3 text-xs text-emerald-700">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 font-semibold border border-emerald-100">
              <CheckCircle2 className="w-3.5 h-3.5" /> {t.privacyBadgeGDPR}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-100">
              <ShieldCheck className="w-3.5 h-3.5" /> {t.privacyBadgeLPD}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-100">
              <EyeOff className="w-3.5 h-3.5" /> Zero Cookie di profilazione
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 font-semibold border border-amber-100">
              <Lock className="w-3.5 h-3.5" /> Nessun account obbligatorio
            </span>
          </div>

          {/* Placeholders Card: Titolare del Trattamento [DA COMPILARE] */}
          <div className="mt-6 p-4.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              {t.privacyControllerTitle}
            </h3>
            <div className="space-y-1.5 text-xs text-slate-700 font-mono">
              <p className="bg-white px-3 py-1.5 rounded-lg border border-slate-200/60">
                {t.privacyControllerName}
              </p>
              <p className="bg-white px-3 py-1.5 rounded-lg border border-slate-200/60">
                {t.privacyControllerAddress}
              </p>
              <p className="bg-white px-3 py-1.5 rounded-lg border border-slate-200/60">
                {t.privacyControllerEmail}
              </p>
            </div>
          </div>
        </div>

        {/* Content Sections: Based 100% on what the app really does */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-10 space-y-8">
          
          {/* Section 1: Dati del modulo e preventivatore senza registrazione */}
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              {t.privacySection1Title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t.privacySection1Text}
            </p>
          </section>

          <hr className="border-slate-100" />

          {/* Section LPD: Svizzera */}
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              {t.lpdSectionTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t.lpdSectionText}
            </p>
          </section>

          <hr className="border-slate-100" />

          {/* Section: Cookies */}
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <EyeOff className="w-4 h-4 text-violet-600" />
              {t.cookiePolicyTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t.cookiePolicyText}
            </p>
          </section>

          <hr className="border-slate-100" />

          {/* Section 2: OpenRouter e modelli di intelligenza artificiale */}
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-600" />
              {t.privacySection2Title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t.privacySection2Text}
            </p>
          </section>

          <hr className="border-slate-100" />

          {/* Section 3: Foto del locale in sola memoria RAM volatile */}
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-emerald-600" />
              {t.privacySection3Title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t.privacySection3Text}
            </p>
          </section>

          <hr className="border-slate-100" />

          {/* Section 4: Modulo preventivi professionisti (Lead) e retention 90 giorni su Upstash Redis */}
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-600" />
              {t.privacySection4Title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t.privacySection4Text}
            </p>
          </section>

          <hr className="border-slate-100" />

          {/* Section 6: Hosting su Vercel e sicurezza */}
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Server className="w-4 h-4 text-slate-700" />
              {t.privacySection6Title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t.privacySection6Text}
            </p>
          </section>

          <hr className="border-slate-100" />

          {/* Section 7: Diritti dell'interessato (GDPR Artt. 15-22) */}
          <section className="space-y-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-blue-600" />
              {t.privacySection7Title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t.privacySection7Text}
            </p>
          </section>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to="/"
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              {t.privacyBackToHome}
            </Link>

            <Link
              to="/stima"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer active:scale-98"
            >
              <span>{t.privacyStartEstimate}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};
