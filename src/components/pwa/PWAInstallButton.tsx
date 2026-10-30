import React, { useState } from 'react';
import { Download, Apple, X, Info } from 'lucide-react';
import { usePWA } from '../../context/PWAContext';
import { useLanguage } from '../../context/LanguageContext';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWA();
  const { t } = useLanguage();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-[11px] sm:text-xs font-bold transition-all border border-blue-100 active:scale-95 shadow-xs"
      >
        <Download className="w-3.5 h-3.5" />
        <span>{t.installAppBtn}</span>
      </button>
    );
  }

  // iOS Safari flow (beforeinstallprompt is not supported by WebKit)
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 text-slate-700 hover:bg-slate-100 rounded-xl text-[11px] sm:text-xs font-bold transition-all border border-slate-200/60 active:scale-95 shadow-xs"
        >
          <Apple className="w-3.5 h-3.5" />
          <span>{t.installAppBtn}</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600">
                  <Apple className="w-6 h-6" />
                </div>
                <button 
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 hover:bg-slate-100 rounded-lg text-slate-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <h3 className="text-lg font-bold text-slate-900">{t.iosInstallGuideTitle}</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                {t.pwaBannerDesc}
              </p>
              
              <ol className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="flex gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-500 font-bold shrink-0 text-xs">1</span>
                  <span>{t.iosInstallGuideStep1.replace('**', '').replace('**', '')}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-500 font-bold shrink-0 text-xs">2</span>
                  <span>{t.iosInstallGuideStep2.replace('**', '').replace('**', '')}</span>
                </li>
              </ol>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-6 w-full py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold shadow-lg shadow-slate-900/20 active:scale-98 transition-all"
              >
                {t.iosInstallGuideGotIt}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
