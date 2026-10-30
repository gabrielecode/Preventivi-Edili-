import React from "react";
import { Loader2, Sparkles, XCircle, Clock, CheckCircle2, ArrowRightCircle } from "lucide-react";
import { TranslationDict } from "../data/translations";

interface Props {
  elapsedSeconds: number;
  onCancel: () => void;
  t: TranslationDict;
}

export const WaitingProgress: React.FC<Props> = ({ elapsedSeconds, onCancel, t }) => {
  // Step message resolution based on elapsed seconds
  // Requirement: "Il messaggio sull'alternativa compare dopo 25 secondi di attesa."
  let currentStepMessage = t.loadingStepAnalyzing;
  let activeStepIndex = 1;

  if (elapsedSeconds >= 55) {
    currentStepMessage = t.loadingStepFinalizing;
    activeStepIndex = 4;
  } else if (elapsedSeconds >= 25) {
    currentStepMessage = t.loadingStepAlternative;
    activeStepIndex = 3;
  } else if (elapsedSeconds >= 12) {
    currentStepMessage = t.loadingStepCalculating;
    activeStepIndex = 2;
  }

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const isAlternativeActive = elapsedSeconds >= 25;

  return (
    <div className="py-8 px-4 sm:px-6 max-w-xl mx-auto space-y-6 text-center animate-fadeIn">
      {/* Top Icon and Title */}
      <div className="flex flex-col items-center">
        <div className="relative mb-3">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-200">
            {isAlternativeActive ? (
              <Sparkles className="w-8 h-8 animate-pulse text-amber-200" />
            ) : (
              <Loader2 className="w-8 h-8 animate-spin" />
            )}
          </div>
          <span className="absolute -bottom-1 -right-1 bg-white border border-slate-200 rounded-full p-1 shadow-xs text-slate-600">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 tracking-tight">
          {t.loadingTitle}
        </h3>
        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5 font-mono">
          <span>{t.elapsedTimeLabel}</span>
          <span className="font-semibold text-slate-800">{formatTime(elapsedSeconds)}</span>
        </p>
      </div>

      {/* Indeterminate Animated Progress Bar */}
      <div className="space-y-1.5">
        <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden relative border border-slate-200/80 shadow-inner">
          <div
            className={`h-full rounded-full animate-indeterminate ${
              isAlternativeActive
                ? "bg-gradient-to-r from-amber-500 via-indigo-600 to-blue-600"
                : "bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-600"
            }`}
          />
        </div>
      </div>

      {/* Current Step Status Card */}
      <div
        className={`p-4 rounded-2xl border text-sm font-medium transition-all duration-300 flex items-center justify-center gap-3 ${
          isAlternativeActive
            ? "bg-amber-50/90 border-amber-200 text-amber-900 shadow-xs"
            : "bg-blue-50/90 border-blue-200 text-blue-900 shadow-xs"
        }`}
      >
        {isAlternativeActive ? (
          <ArrowRightCircle className="w-5 h-5 text-amber-600 shrink-0 animate-pulse" />
        ) : (
          <Loader2 className="w-5 h-5 text-blue-600 shrink-0 animate-spin" />
        )}
        <span className="tracking-tight text-center">{currentStepMessage}</span>
      </div>

      {/* 4-Step Indicator Dots/Labels */}
      <div className="grid grid-cols-4 gap-2 pt-2 text-[11px] font-semibold text-slate-400">
        <div className={`flex flex-col items-center gap-1 ${activeStepIndex >= 1 ? "text-blue-600" : ""}`}>
          <div className={`w-2 h-2 rounded-full ${activeStepIndex >= 1 ? "bg-blue-600" : "bg-slate-200"}`} />
          <span className="truncate max-w-full">1. {t.loadingStepAnalyzing.replace("...", "")}</span>
        </div>
        <div className={`flex flex-col items-center gap-1 ${activeStepIndex >= 2 ? "text-blue-600" : ""}`}>
          <div className={`w-2 h-2 rounded-full ${activeStepIndex >= 2 ? "bg-blue-600" : "bg-slate-200"}`} />
          <span className="truncate max-w-full">2. {t.loadingStepCalculating.split(" ")[0]}</span>
        </div>
        <div className={`flex flex-col items-center gap-1 ${activeStepIndex >= 3 ? "text-amber-600" : ""}`}>
          <div className={`w-2 h-2 rounded-full ${activeStepIndex >= 3 ? "bg-amber-500 animate-pulse" : "bg-slate-200"}`} />
          <span className="truncate max-w-full">3. AI Engine</span>
        </div>
        <div className={`flex flex-col items-center gap-1 ${activeStepIndex >= 4 ? "text-emerald-600" : ""}`}>
          <div className={`w-2 h-2 rounded-full ${activeStepIndex >= 4 ? "bg-emerald-600" : "bg-slate-200"}`} />
          <span className="truncate max-w-full">4. {t.loadingStepFinalizing.replace("...", "")}</span>
        </div>
      </div>

      {/* Safety message and Cancel Action */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-slate-500 text-left">
          {t.dataPreservedNotice}
        </p>

        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-700 rounded-xl text-xs font-semibold border border-slate-200 hover:border-red-200 transition-all cursor-pointer shadow-xs shrink-0"
        >
          <XCircle className="w-4 h-4 text-slate-500 group-hover:text-red-600" />
          <span>{t.cancelBtn}</span>
        </button>
      </div>
    </div>
  );
};
