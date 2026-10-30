import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { EstimateProvider } from "./context/EstimateContext";
import { PWAProvider } from "./context/PWAContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ScrollToTop } from "./components/ScrollToTop";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Loader2 } from "lucide-react";
import { ReloadPrompt } from "./components/pwa/ReloadPrompt";
import { CookieBanner } from "./components/pwa/CookieBanner";

// Lazy Pages
const LazyWizardPage = lazy(() => import("./pages/WizardPage").then(m => ({ default: m.WizardPage })));
const LazyDashboardPage = lazy(() => import("./pages/DashboardPage").then(m => ({ default: m.DashboardPage })));
const LazyAdminPage = lazy(() => import("./pages/AdminPage").then(m => ({ default: m.AdminPage })));
const LazyTechnicalPage = lazy(() => import("./pages/TechnicalPage").then(m => ({ default: m.TechnicalPage })));

const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({ children, adminOnly }) => {
  const { user, loading, isAdmin } = useAuth();
  
  if (loading) return <WizardLoadingFallback />;
  if (!user) return <Navigate to="/" replace />;
  if (adminOnly && !isAdmin) return <Navigate to="/dashboard" replace />;
  
  return <>{children}</>;
};

const WizardLoadingFallback: React.FC = () => (
  <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:p-8 flex flex-col justify-center items-center py-24">
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-8 max-w-md w-full flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
      </div>
      <h2 className="text-base font-bold text-slate-900 mb-1">
        Caricamento in corso...
      </h2>
      <p className="text-xs text-slate-500">
        Inizializzazione della tua sessione sicura.
      </p>
    </div>
  </main>
);

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
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
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Suspense fallback={<WizardLoadingFallback />}>
                          <LazyDashboardPage />
                        </Suspense>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin"
                    element={
                      <ProtectedRoute adminOnly>
                        <Suspense fallback={<WizardLoadingFallback />}>
                          <LazyAdminPage />
                        </Suspense>
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/tecnica" element={<Suspense fallback={<WizardLoadingFallback />}><LazyTechnicalPage /></Suspense>} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
                <Footer />
              </div>
              <ReloadPrompt />
              <CookieBanner />
            </EstimateProvider>
          </PWAProvider>
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
