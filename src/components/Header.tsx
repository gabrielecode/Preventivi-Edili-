import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Calculator, ChevronDown, Sparkles, LogIn, LogOut, LayoutDashboard, Settings, User } from "lucide-react";
import { useLanguage, LanguageCode } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { auth, googleProvider, signOut, signInWithPopup } from "../lib/firebase";
import { PWAInstallButton } from "./pwa/PWAInstallButton";

const languages: { code: LanguageCode; flag: string; label: string }[] = [
  { code: "it", flag: "🇮🇹", label: "Italiano" },
  { code: "de", flag: "🇩🇪", label: "Deutsch" },
  { code: "fr", flag: "🇫🇷", label: "Français" },
  { code: "en", flag: "🇬🇧", label: "English" },
];

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { user, isAdmin } = useAuth();
  const location = useLocation();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUserMenuOpen(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs backdrop-blur-md bg-white/95">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group transition-transform active:scale-98"
          title={t.appName}
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/30 transition-all">
            <Calculator className="w-5 h-5 sm:w-5.5 sm:h-5.5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 text-sm sm:text-base tracking-tight leading-tight group-hover:text-blue-600 transition-colors">
              {t.appName}
            </span>
            <span className="text-[11px] text-slate-400 font-medium hidden sm:inline leading-tight">
              AI Home & DIY Cost Estimator
            </span>
          </div>
        </Link>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <PWAInstallButton />
          
          {/* Language Selector */}
          <div className="relative" ref={langMenuRef}>
            <button
              type="button"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-2 py-1.5 sm:px-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-all cursor-pointer border border-slate-200/60"
            >
              <span className="text-sm leading-none">{currentLang.flag}</span>
              <span className="uppercase text-[10px] sm:text-[11px] font-bold text-slate-800 tracking-wider">
                {currentLang.code}
              </span>
              <ChevronDown className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 transition-transform ${langMenuOpen ? "rotate-180" : ""}`} />
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-38 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                {languages.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => {
                      setLanguage(item.code);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-left transition-colors cursor-pointer ${
                      language === item.code
                        ? "bg-blue-50 text-blue-700 font-bold"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="text-base">{item.flag}</span>
                    <span className="flex-1">{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Auth / Profile */}
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-1.5 p-1 rounded-full border border-slate-200 hover:border-blue-300 transition-all cursor-pointer overflow-hidden"
              >
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || ""} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full" />
                ) : (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <p className="text-xs font-bold text-slate-900 truncate">{user.displayName || 'Utente'}</p>
                    <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4 text-slate-400" />
                    I miei preventivi
                  </Link>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <Settings className="w-4 h-4 text-slate-400" />
                      Pannello Admin
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-xl transition-all border border-blue-200 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Accedi</span>
            </button>
          )}

          {/* Calcola il costo */}
          {location.pathname !== "/stima" && (
            <Link
              to="/stima"
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-sm shadow-blue-500/25 hover:shadow-md hover:shadow-blue-500/30 transition-all cursor-pointer active:scale-98 ml-1"
            >
              <Sparkles className="w-3.5 h-3.5 hidden sm:inline" />
              <span>{t.navCalculateBtn}</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
