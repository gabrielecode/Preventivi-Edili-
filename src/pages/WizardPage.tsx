import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Loader2, Sparkles, ArrowLeft } from "lucide-react";
import { useEstimate } from "../context/EstimateContext";
import { WizardStep1Location } from "../components/WizardStep1Location";
import { WizardStep2Work } from "../components/WizardStep2Work";
import { WizardStep3Measurements } from "../components/WizardStep3Measurements";
import { WizardStep4Preferences } from "../components/WizardStep4Preferences";
import { EstimateResult } from "../components/EstimateResult";
import { WaitingProgress } from "../components/WaitingProgress";

export const WizardPage: React.FC = () => {
  const {
    currentStep,
    setCurrentStep,
    selectedCountryId,
    setSelectedCountryId,
    selectedLanguage,
    setSelectedLanguage,
    selectedSectorId,
    setSelectedSectorId,
    selectedItems,
    handleToggleItem,
    handleUpdateQuantity,
    areaMq,
    setAreaMq,
    lengthMl,
    setLengthMl,
    quantityCad,
    setQuantityCad,
    workDescription,
    setWorkDescription,
    mode,
    setMode,
    quality,
    setQuality,
    skillLevel,
    setSkillLevel,
    siteDifficulty,
    setSiteDifficulty,
    loading,
    errorMsg,
    quoteResult,
    activeCountry,
    t,
    generateEstimate,
    cancelEstimate,
    elapsedSeconds,
    photos,
    handleAddPhotos,
    handleRemovePhoto,
    photoAnalysisResult,
    analyzingPhotos,
    photoError,
    analyzePhotos,
    cancelAnalyzePhotos,
    photoElapsedSeconds,
    photoAnalysisUnavailable,
  } = useEstimate();

  return (
    <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8 flex flex-col justify-center">
      {/* Breadcrumb back to Home */}
      <div className="mb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t.navHome}</span>
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8">
        {/* Step Indicator (hidden during loading to focus on progress steps) */}
        {currentStep < 5 && !loading && (
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    currentStep === step
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                      : currentStep > step
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {t.stepIndicator.replace("{currentStep}", String(currentStep))}
              </span>
              <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                {activeCountry.name} {activeCountry.flag}
              </span>
            </div>
          </div>
        )}

        {errorMsg && !loading && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm flex items-center justify-between gap-3">
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Wizard Content or Waiting Screen */}
        <div className="mb-8">
          {loading ? (
            <WaitingProgress
              elapsedSeconds={elapsedSeconds}
              onCancel={cancelEstimate}
              t={t}
            />
          ) : (
            <>
              {currentStep === 1 && (
                <WizardStep1Location
                  selectedCountryId={selectedCountryId}
                  setSelectedCountryId={setSelectedCountryId}
                  selectedLanguage={selectedLanguage}
                  setSelectedLanguage={setSelectedLanguage}
                  t={t}
                />
              )}

              {currentStep === 2 && (
                <WizardStep2Work
                  selectedSectorId={selectedSectorId}
                  setSelectedSectorId={setSelectedSectorId}
                  selectedItems={selectedItems}
                  handleToggleItem={handleToggleItem}
                  handleUpdateQuantity={handleUpdateQuantity}
                  t={t}
                />
              )}

              {currentStep === 3 && (
                <WizardStep3Measurements
                  areaMq={areaMq}
                  setAreaMq={setAreaMq}
                  lengthMl={lengthMl}
                  setLengthMl={setLengthMl}
                  quantityCad={quantityCad}
                  setQuantityCad={setQuantityCad}
                  workDescription={workDescription}
                  setWorkDescription={setWorkDescription}
                  photos={photos}
                  handleAddPhotos={handleAddPhotos}
                  handleRemovePhoto={handleRemovePhoto}
                  photoAnalysisResult={photoAnalysisResult}
                  analyzingPhotos={analyzingPhotos}
                  photoError={photoError}
                  analyzePhotos={analyzePhotos}
                  cancelAnalyzePhotos={cancelAnalyzePhotos}
                  photoElapsedSeconds={photoElapsedSeconds}
                  photoAnalysisUnavailable={photoAnalysisUnavailable}
                  t={t}
                />
              )}

              {currentStep === 4 && (
                <WizardStep4Preferences
                  mode={mode}
                  setMode={setMode}
                  quality={quality}
                  setQuality={setQuality}
                  skillLevel={skillLevel}
                  setSkillLevel={setSkillLevel}
                  siteDifficulty={siteDifficulty}
                  setSiteDifficulty={setSiteDifficulty}
                  t={t}
                />
              )}

              {currentStep === 5 && quoteResult && (
                <EstimateResult
                  quoteResult={quoteResult}
                  selectedItems={selectedItems}
                  mode={mode}
                  activeCountry={activeCountry}
                  onReset={() => setCurrentStep(1)}
                  onRetry={generateEstimate}
                  loading={loading}
                  t={t}
                />
              )}
            </>
          )}
        </div>

        {/* Navigation Controls (active only when not loading) */}
        {!loading && currentStep < 5 && (
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1 || loading}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                currentStep === 1
                  ? "opacity-40 cursor-not-allowed bg-slate-100 text-slate-400"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
              type="button"
            >
              <ChevronLeft className="w-4 h-4" /> {t.backBtn}
            </button>

            {currentStep < 4 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-md shadow-blue-200 transition-all cursor-pointer"
                type="button"
              >
                {t.nextBtn} <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={generateEstimate}
                disabled={loading}
                className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                type="button"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> {t.generatingBtn}
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> {t.generateBtn}
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  );
};
