import React from "react";
import { Calculator, ChevronLeft, ChevronRight, Loader2, Sparkles } from "lucide-react";
import { useEstimateState } from "./hooks/useEstimateState";
import { WizardStep1Location } from "./components/WizardStep1Location";
import { WizardStep2Work } from "./components/WizardStep2Work";
import { WizardStep3Measurements } from "./components/WizardStep3Measurements";
import { WizardStep4Preferences } from "./components/WizardStep4Preferences";
import { EstimateResult } from "./components/EstimateResult";

export default function App() {
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
    photos,
    handleAddPhotos,
    handleRemovePhoto,
    photoAnalysisResult,
    analyzingPhotos,
    photoError,
    analyzePhotos,
  } = useEstimateState();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm px-6 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white p-2.5 rounded-xl shadow-md shadow-blue-200">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-slate-950 flex items-center gap-2">
                {t.appName} <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-semibold">{activeCountry.name} {activeCountry.flag}</span>
              </h1>
              <p className="text-xs text-slate-500">
                {t.appSubtitle}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Wizard Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8 flex flex-col justify-center">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8">
          
          {/* Step Indicator */}
          {currentStep < 5 && (
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
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {t.stepIndicator.replace("{currentStep}", String(currentStep))}
              </span>
            </div>
          )}

          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm">
              {errorMsg}
            </div>
          )}

          {/* Wizard Content */}
          <div className="mb-8">
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
                t={t}
              />
            )}
          </div>

          {/* Navigation Controls */}
          {currentStep < 5 && (
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
                  className="flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-200 transition-all cursor-pointer disabled:opacity-50"
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
    </div>
  );
}
