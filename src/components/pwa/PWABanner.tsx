import React, { useState } from 'react';
import { X, Download, Apple, Info } from 'lucide-react';
import { usePWA } from '../../context/PWAContext';
import { useLanguage } from '../../context/LanguageContext';

export const PWABanner: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, isBannerDismissed, install, dismissBanner } = usePWA();
  const { t } = useLanguage();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // Conditions to hide the banner
  if (isInstalled || isBannerDismissed) {
    return null;
  }

  // Hide if not installable and not iOS (e.g. desktop non-chromium)
  if (!isInstallable && !isIOS) {
    return null;
  }

  return (
    <div className="mx-4 sm:mx-6 mt-4">
      <div className="max-w-6xl mx-auto bg-blue-600 rounded-2xl p-4 sm:p-5 shadow-lg shadow-blue-500/20 relative overflow-hidden group">
        {/* Background decorative elements */}
        <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/15 transition-all duration-700" />
        <div className="absolute -left-8 -bottom-8 w-24 h-24 bg-white/5 rounded-full blur-xl" />
        
        <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 shadow-inner">
              {isIOS ? <Apple className="w-6 h-6" /> : <Download className="w-6 h-6" />}
            </div>
            <div className="flex flex-col">
              <h3 className="text-white font-bold text-sm sm:text-base leading-tight">
                {t.pwaBannerTitle}
              </h3>
              <p className="text-blue-100 text-xs sm:text-sm mt-0.5 max-w-lg">
                {t.pwaBannerDesc}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={isIOS ? () => setShowIOSGuide(true) : install}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-blue-700 hover:bg-blue-50 rounded-xl text-sm font-bold transition-all active:scale-95 shadow-sm"
            >
              {t.pwaBannerInstall}
            </button>
            <button
              onClick={dismissBanner}
              className="p-2.5 text-blue-200 hover:text-white hover:bg-white/10 rounded-xl transition-all"
              aria-label={t.pwaBannerClose}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* iOS Guide Modal */}
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
                <span>{t.iosInstallGuideStep1.replace(/\*\*/g, '')}</span>
              </li>
              <li className="flex gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-500 font-bold shrink-0 text-xs">2</span>
                <span>{t.iosInstallGuideStep2.replace(/\*\*/g, '')}</span>
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
    </div>
  );
};
