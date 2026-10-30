import React from "react";
import { Info, Camera, X, Sparkles, AlertTriangle, ShieldAlert } from "lucide-react";
import { TranslationDict } from "../data/translations";

interface PhotoItem {
  id: string;
  dataUrl: string;
  name: string;
}

interface Props {
  areaMq: number;
  setAreaMq: (val: number) => void;
  lengthMl: number;
  setLengthMl: (val: number) => void;
  quantityCad: number;
  setQuantityCad: (val: number) => void;
  workDescription: string;
  setWorkDescription: (val: string) => void;
  photos: PhotoItem[];
  handleAddPhotos: (files: FileList | File[]) => void;
  handleRemovePhoto: (id: string) => void;
  photoAnalysisResult: any | null;
  analyzingPhotos: boolean;
  photoError: string | null;
  analyzePhotos: () => void;
  cancelAnalyzePhotos?: () => void;
  photoElapsedSeconds?: number;
  photoAnalysisUnavailable?: boolean;
  t: TranslationDict;
}

export const WizardStep3Measurements: React.FC<Props> = ({
  areaMq,
  setAreaMq,
  lengthMl,
  setLengthMl,
  quantityCad,
  setQuantityCad,
  workDescription,
  setWorkDescription,
  photos,
  handleAddPhotos,
  handleRemovePhoto,
  photoAnalysisResult,
  analyzingPhotos,
  photoError,
  analyzePhotos,
  cancelAnalyzePhotos,
  photoElapsedSeconds = 0,
  photoAnalysisUnavailable = false,
  t,
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleAddPhotos(e.target.files);
      e.target.value = "";
    }
  };

  const isPhotoAlternativeActive = photoElapsedSeconds >= 25;
  const photoWaitMessage = isPhotoAlternativeActive
    ? t.photoAnalyzingAlternative
    : t.photoAnalyzingWait;

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-1">{t.step3Title}</h2>
        <p className="text-sm text-slate-500">{t.step3Desc}</p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-xs text-amber-900">
        <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold mb-0.5">{t.measureTipTitle}</p>
          <p className="text-amber-800">{t.measureTipDesc}</p>
        </div>
      </div>

      {/* Photo Upload Section */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 mb-0.5">{t.photoSectionTitle}</h3>
          <p className="text-xs text-slate-500">{t.photoSectionDesc}</p>
        </div>

        {/* Notice if photo analysis is unavailable (Task 11c) */}
        {photoAnalysisUnavailable && (
          <div className="p-4 bg-amber-50/90 border border-amber-200 rounded-xl flex items-start gap-3 text-xs text-amber-900 shadow-xs">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-amber-950">{t.photoAnalysisUnavailableTitle}</p>
              <p className="text-amber-800 leading-relaxed">{t.photoAnalysisUnavailableNotice}</p>
              <p className="text-blue-700 font-semibold pt-0.5">↓ {t.continueWithManualMeasures}</p>
            </div>
          </div>
        )}

        {photoError && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{photoError}</span>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          {photos.map((photo) => (
            <div key={photo.id} className="relative w-24 h-24 rounded-xl overflow-hidden border border-slate-300 shadow-sm bg-white group">
              <img src={photo.dataUrl} alt={photo.name} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => handleRemovePhoto(photo.id)}
                disabled={analyzingPhotos}
                className="absolute top-1 right-1 bg-slate-900/70 hover:bg-red-600 text-white p-1 rounded-full transition-colors cursor-pointer disabled:opacity-40"
                title="Rimuovi foto"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {photos.length < 3 && (
            <label className={`border-2 border-dashed border-slate-300 bg-white rounded-xl w-24 h-24 flex flex-col items-center justify-center transition-all text-slate-500 ${
              analyzingPhotos ? "opacity-50 cursor-not-allowed" : "hover:border-blue-500 hover:bg-blue-50/50 hover:text-blue-600 cursor-pointer"
            }`}>
              <Camera className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-semibold text-center px-1">Aggiungi foto</span>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                multiple
                disabled={analyzingPhotos}
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          )}
        </div>

        <p className="text-[11px] text-slate-400 italic">
          {t.photoPrivacyNotice}
        </p>

        {/* Photo Analysis Action & Waiting State */}
        {photos.length > 0 && (
          <div className="pt-2 space-y-3">
            {!analyzingPhotos ? (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={analyzePhotos}
                  disabled={analyzingPhotos}
                  className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-100 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles className="w-4 h-4" /> {t.photoAnalyzeBtn}
                </button>
              </div>
            ) : (
              /* Photo waiting progress with indeterminate bar, 25s alternative message, timer and cancel button */
              <div className="p-4 bg-white border border-indigo-200 rounded-2xl shadow-sm space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 font-semibold text-indigo-950">
                    <Sparkles className="w-4 h-4 text-indigo-600 animate-spin" />
                    <span>{photoWaitMessage}</span>
                  </div>
                  <span className="font-mono text-slate-500 text-[11px]">{formatTime(photoElapsedSeconds)}</span>
                </div>

                {/* Indeterminate progress bar */}
                <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden relative border border-slate-200">
                  <div
                    className={`h-full rounded-full animate-indeterminate ${
                      isPhotoAlternativeActive
                        ? "bg-gradient-to-r from-amber-500 via-indigo-600 to-blue-600"
                        : "bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-600"
                    }`}
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-400">{t.dataPreservedNotice}</span>
                  {cancelAnalyzePhotos && (
                    <button
                      type="button"
                      onClick={cancelAnalyzePhotos}
                      className="px-3 py-1 bg-slate-100 hover:bg-red-50 hover:text-red-700 text-slate-700 rounded-lg text-xs font-semibold border border-slate-200 transition-all cursor-pointer"
                    >
                      {t.cancelBtn}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>


      {/* Photo Analysis Results Card */}
      {photoAnalysisResult && (
        <div className="bg-indigo-50/70 border border-indigo-200 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-indigo-900 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Analisi IA delle foto completata</span>
            </div>
            <span className="bg-indigo-100 text-indigo-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
              {t.confidenceLabel} {photoAnalysisResult.confidence}
            </span>
          </div>

          <p className="text-xs text-indigo-950 leading-relaxed">
            <strong className="font-semibold">{t.visibleStateTitle}:</strong> {photoAnalysisResult.visibleState}
          </p>

          {photoAnalysisResult.detectedIssues && photoAnalysisResult.detectedIssues.length > 0 && (
            <div>
              <p className="text-xs font-bold text-indigo-950 mb-1">{t.detectedIssuesTitle}:</p>
              <ul className="list-disc list-inside text-xs text-indigo-900 space-y-0.5">
                {photoAnalysisResult.detectedIssues.map((issue: string, idx: number) => (
                  <li key={idx}>{issue}</li>
                ))}
              </ul>
            </div>
          )}

          {photoAnalysisResult.recommendations && photoAnalysisResult.recommendations.length > 0 && (
            <div>
              <p className="text-xs font-bold text-indigo-950 mb-1">{t.recommendationsTitle}:</p>
              <ul className="list-disc list-inside text-xs text-indigo-900 space-y-0.5">
                {photoAnalysisResult.recommendations.map((rec: string, idx: number) => (
                  <li key={idx}>{rec}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-white/80 border border-indigo-100 rounded-xl p-3 flex gap-2 text-xs text-indigo-900">
            <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="font-medium">{t.photoMeasureWarning}</p>
          </div>
        </div>
      )}

      {/* Dimensions inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">{t.areaMqLabel}</label>
          <input
            type="number"
            min="0"
            value={areaMq || ""}
            onChange={(e) => setAreaMq(Number(e.target.value))}
            placeholder={t.areaMqPlaceholder}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">{t.lengthMlLabel}</label>
          <input
            type="number"
            min="0"
            value={lengthMl || ""}
            onChange={(e) => setLengthMl(Number(e.target.value))}
            placeholder={t.lengthMlPlaceholder}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">{t.quantityCadLabel}</label>
          <input
            type="number"
            min="0"
            value={quantityCad || ""}
            onChange={(e) => setQuantityCad(Number(e.target.value))}
            placeholder={t.quantityCadPlaceholder}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5">
          {t.workDescriptionLabel}
        </label>
        <textarea
          rows={4}
          value={workDescription}
          onChange={(e) => setWorkDescription(e.target.value)}
          placeholder={t.workDescriptionPlaceholder}
          className="w-full px-3.5 py-3 bg-white border border-slate-300 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
        />
      </div>
    </div>
  );
};
