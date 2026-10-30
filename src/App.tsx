import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { EstimateProvider } from "./context/EstimateContext";
import { PWAProvider } from "./context/PWAContext";
import { ScrollToTop } from "./components/ScrollToTop";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Loader2 } from "lucide-react";
import { ReloadPrompt } from "./components/pwa/ReloadPrompt";

// Wizard in lazy load su /stima
const LazyWizardPage = lazy(() =>
  import("./pages/WizardPage").then((module) => ({
    default: module.WizardPage,
  }))
);

const WizardLoadingFallback: React.FC = () => (
  <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8 flex flex-col justify-center items-center py-24">
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-8 max-w-md w-full flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
      </div>
      <h2 className="text-base font-bold text-slate-900 mb-1">
        Caricamento configuratore...
      </h2>
      <p className="text-xs text-slate-500">
        Inizializzazione dei listini e delle opzioni di stima.
      </p>
      <div className="w-full bg-slate-100 rounded-full h-1.5 mt-5 overflow-hidden">
        <div className="bg-blue-600 h-1.5 rounded-full w-2/3 animate-pulse" />
      </div>
    </div>
  </main>
);

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <PWAProvider>
          <EstimateProvider>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-blue-100 selection:text-blue-900">
              <Header />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route
                  path="/stima"
                  element={
                    <Suspense fallback={<WizardLoadingFallback />}>
                      <LazyWizardPage />
                    </Suspense>
                  }
                />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
              <Footer />
            </div>
            <ReloadPrompt />
          </EstimateProvider>
        </PWAProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
