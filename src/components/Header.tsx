import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Calculator, ChevronDown, Sparkles, LogIn, LogOut, LayoutDashboard, Settings, User, Menu, X, BookOpen } from "lucide-react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const handleGuideClick = (e: React.MouseEvent) => {
    if (location.pathname === "/") {
      e.preventDefault();
      const el = document.getElementById("guide-utili");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMobileMenuOpen(false);
  };

  const NavLinks = () => (
    <>
      <Link
        to="/#guide-utili"
        onClick={handleGuideClick}
        className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
      >
        <BookOpen className="w-4 h-4" />
        Guide
      </Link>
    </>
  );

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs backdrop-blur-md bg-white/95">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group transition-transform active:scale-98"
          title={t.appName}
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 transition-all">
            <Calculator className="w-5 h-5" />
          </div>
          <span className="font-bold text-slate-900 text-sm tracking-tight group-hover:text-blue-600 transition-colors">
            {t.appName}
          </span>
        </Link>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-3">
          <NavLinks />
          <PWAInstallButton />
          
          {/* Language Selector */}
          <div className="relative" ref={langMenuRef}>
            <button
              type="button"
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-xl transition-all border border-slate-200/60"
            >
              <span>{currentLang.flag}</span>
              <span className="uppercase font-bold text-slate-800 tracking-wider">
                {currentLang.code}
              </span>
            </button>
            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50">
                {languages.map((item) => (
                  <button
                    key={item.code}
                    onClick={() => { setLanguage(item.code); setLangMenuOpen(false); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left ${language === item.code ? "bg-blue-50 text-blue-700 font-bold" : "text-slate-700"}`}
                  >
                    <span>{item.flag}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Auth */}
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-1.5 p-1 rounded-full border border-slate-200"
              >
                {user.photoURL ? (
                  <img src={user.photoURL} className="w-8 h-8 rounded-full" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50">
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
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-xl border border-blue-200"
            >
              <LogIn className="w-3.5 h-3.5" />
              Accedi
            </button>
          )}

          {location.pathname !== "/stima" && (
            <Link
              to="/stima"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {t.navCalculateBtn}
            </Link>
          )}
        </div>

        {/* Hamburger Menu Button */}
        <button
          className="md:hidden p-2 text-slate-700"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white p-4 flex flex-col gap-4">
          <NavLinks />
          <div className="flex items-center justify-between gap-2">
            <PWAInstallButton />
            <button
              onClick={handleLogin}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-blue-600 bg-blue-50 rounded-xl"
            >
              <LogIn className="w-3.5 h-3.5" />
              Accedi
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
