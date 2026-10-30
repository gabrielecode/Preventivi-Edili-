import React from "react";
import {
  Paintbrush,
  Layers,
  DoorOpen,
  Droplets,
  Zap,
  AlertCircle,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export const SupportedSectors: React.FC = () => {
  const { t } = useLanguage();

  const sectors = [
    {
      id: "imbianchino",
      icon: Paintbrush,
      title: t.sectorPainterTitle,
      desc: t.sectorPainterDesc,
      iconColor: "text-blue-700 bg-blue-50 border-blue-100/80",
    },
    {
      id: "piastrellista",
      icon: Layers,
      title: t.sectorTilerTitle,
      desc: t.sectorTilerDesc,
      iconColor: "text-amber-700 bg-amber-50 border-amber-100/80",
    },
    {
      id: "serramentista",
      icon: DoorOpen,
      title: t.sectorWindowsTitle,
      desc: t.sectorWindowsDesc,
      iconColor: "text-purple-700 bg-purple-50 border-purple-100/80",
    },
    {
      id: "idraulico",
      icon: Droplets,
      title: t.sectorPlumberTitle,
      desc: t.sectorPlumberDesc,
      iconColor: "text-cyan-700 bg-cyan-50 border-cyan-100/80",
    },
    {
      id: "elettricista",
      icon: Zap,
      title: t.sectorElectricianTitle,
      desc: t.sectorElectricianDesc,
      iconColor: "text-amber-600 bg-amber-50 border-amber-100/80",
    },
  ];

  return (
    <section
      id="settori"
      className="py-16 sm:py-20 px-4 sm:px-6 bg-white border-t border-slate-200/80"
    >
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight mb-3">
            {t.sectorsSectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {t.sectorsSectionSubtitle}
          </p>
        </div>

        {/* 5 Sectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {sectors.map((sector) => {
            const Icon = sector.icon;
            return (
              <div
                key={sector.id}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between transition-all hover:border-slate-300"
              >
                <div>
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center border mb-5 ${sector.iconColor}`}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">
                    {sector.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {sector.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Honest Transparency Note on Electrical & Plumbing */}
        <div className="p-6 sm:p-7 rounded-2xl bg-amber-50/70 border border-amber-200/90 text-amber-950 flex flex-col sm:flex-row items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 border border-amber-200">
            <AlertCircle className="w-5 h-5" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm sm:text-base font-bold text-amber-950 mb-1.5">
              {t.tradeHonestyTitle}
            </h3>
            <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
              {t.tradeHonestyDesc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
