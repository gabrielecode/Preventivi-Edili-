import React from "react";

export const HeroIllustration: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Decorative ambient background glows */}
      <div className="absolute -top-6 -left-6 w-56 h-56 bg-blue-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-6 -right-6 w-56 h-56 bg-indigo-400/15 rounded-full blur-3xl pointer-events-none" />

      <svg
        viewBox="0 0 540 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-w-lg drop-shadow-md select-none"
        aria-label="Illustrazione preventivo casa e fai da te"
        role="img"
      >
        <defs>
          <linearGradient id="wallGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EEF2FF" />
            <stop offset="100%" stopColor="#E0E7FF" />
          </linearGradient>
          <linearGradient id="roofGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F8FAFC" />
          </linearGradient>
          <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="diyBadgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="125%" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#0F172A" floodOpacity="0.08" />
          </filter>
        </defs>

        {/* Blueprint Grid Background Pattern */}
        <g opacity="0.35">
          <line x1="40" y1="60" x2="500" y2="60" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="40" y1="120" x2="500" y2="120" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="40" y1="180" x2="500" y2="180" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="40" y1="240" x2="500" y2="240" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="40" y1="300" x2="500" y2="300" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="40" y1="360" x2="500" y2="360" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 4" />

          <line x1="100" y1="40" x2="100" y2="380" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="180" y1="40" x2="180" y2="380" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="260" y1="40" x2="260" y2="380" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="340" y1="40" x2="340" y2="380" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 4" />
          <line x1="420" y1="40" x2="420" y2="380" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 4" />
        </g>

        {/* Central House Frame (Architectural isometric / 2D perspective) */}
        {/* House Ground Shadow */}
        <ellipse cx="270" cy="350" rx="190" ry="24" fill="#CBD5E1" opacity="0.4" />

        {/* House Body */}
        <rect x="150" y="150" width="240" height="180" rx="16" fill="url(#wallGrad)" stroke="#CBD5E1" strokeWidth="2" />

        {/* Modern Slanted Roof */}
        <polygon points="130,155 270,65 410,155" fill="url(#roofGrad)" />
        <polygon points="270,65 410,155 425,150 270,55" fill="#1E40AF" />

        {/* Window with Divider */}
        <rect x="180" y="180" width="70" height="70" rx="8" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="2" />
        <line x1="215" y1="180" x2="215" y2="250" stroke="#93C5FD" strokeWidth="2" />
        <line x1="180" y1="215" x2="250" y2="215" stroke="#93C5FD" strokeWidth="2" />
        {/* Light reflections in window */}
        <polygon points="186,186 200,186 186,200" fill="#DBEAFE" />
        <polygon points="221,186 240,186 221,205" fill="#DBEAFE" />

        {/* Entrance Door */}
        <rect x="290" y="210" width="65" height="120" rx="6" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
        <circle cx="340" cy="270" r="4" fill="#F8FAFC" />
        <rect x="302" y="222" width="41" height="40" rx="4" fill="#60A5FA" opacity="0.6" />

        {/* Paint Roller & Fresh Painted Stripe on Wall */}
        <rect x="150" y="270" width="95" height="25" rx="4" fill="#38BDF8" opacity="0.35" />
        <g transform="translate(195, 255) rotate(-20)">
          {/* Roller cylinder */}
          <rect x="-18" y="-7" width="36" height="14" rx="4" fill="#0284C7" stroke="#0369A1" strokeWidth="1.5" />
          {/* Metal arm */}
          <path d="M18,0 L26,0 L26,20 L22,25" fill="none" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
          {/* Wooden handle */}
          <rect x="19" y="25" width="6" height="24" rx="2" fill="#D97706" />
        </g>

        {/* Paint Bucket with Spill */}
        <g transform="translate(120, 290)">
          <path d="M0,15 L6,48 L34,48 L40,15 Z" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="2" />
          <ellipse cx="20" cy="15" rx="20" ry="6" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
          <ellipse cx="20" cy="16" rx="16" ry="4" fill="#0284C7" />
          {/* Paint splash */}
          <ellipse cx="44" cy="46" rx="8" ry="3" fill="#0284C7" opacity="0.7" />
        </g>

        {/* Measuring Tape / Ruler at the bottom */}
        <g transform="translate(260, 318)">
          <rect x="0" y="0" width="130" height="14" rx="3" fill="#FCD34D" stroke="#D97706" strokeWidth="1.5" />
          <line x1="15" y1="0" x2="15" y2="6" stroke="#78350F" strokeWidth="1.5" />
          <line x1="30" y1="0" x2="30" y2="10" stroke="#78350F" strokeWidth="1.5" />
          <line x1="45" y1="0" x2="45" y2="6" stroke="#78350F" strokeWidth="1.5" />
          <line x1="60" y1="0" x2="60" y2="10" stroke="#78350F" strokeWidth="1.5" />
          <line x1="75" y1="0" x2="75" y2="6" stroke="#78350F" strokeWidth="1.5" />
          <line x1="90" y1="0" x2="90" y2="10" stroke="#78350F" strokeWidth="1.5" />
          <line x1="105" y1="0" x2="105" y2="6" stroke="#78350F" strokeWidth="1.5" />
          <line x1="120" y1="0" x2="120" y2="10" stroke="#78350F" strokeWidth="1.5" />
        </g>

        {/* Floating AI Cost Calculation Card (Top Left) */}
        <g transform="translate(45, 95)" filter="url(#cardShadow)">
          <rect x="0" y="0" width="165" height="92" rx="14" fill="url(#cardGrad)" stroke="#E2E8F0" strokeWidth="1.5" />
          {/* Header icon badge */}
          <circle cx="24" cy="24" r="12" fill="#DBEAFE" />
          <path d="M19,24 L22,27 L29,20" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <text x="44" y="22" fill="#0F172A" fontSize="12" fontWeight="700" fontFamily="sans-serif">
            Preventivo IA
          </text>
          <text x="44" y="34" fill="#64748B" fontSize="9" fontWeight="500" fontFamily="sans-serif">
            Listini con IVA
          </text>

          {/* Mini Price Row */}
          <line x1="14" y1="46" x2="151" y2="46" stroke="#F1F5F9" strokeWidth="1.5" />
          <text x="16" y="62" fill="#64748B" fontSize="10" fontFamily="sans-serif">
            Intervallo stimato:
          </text>
          <text x="16" y="78" fill="#1E293B" fontSize="14" fontWeight="800" fontFamily="sans-serif">
            1.250 € - 1.800 €
          </text>
        </g>

        {/* Floating DIY vs Pro Comparison Badge (Top Right) */}
        <g transform="translate(345, 75)" filter="url(#cardShadow)">
          <rect x="0" y="0" width="160" height="96" rx="14" fill="url(#cardGrad)" stroke="#E2E8F0" strokeWidth="1.5" />
          <rect x="12" y="12" width="62" height="20" rx="6" fill="#FEF3C7" />
          <text x="21" y="26" fill="#92400E" fontSize="9" fontWeight="700" fontFamily="sans-serif">
            FAI DA TE
          </text>

          <rect x="80" y="12" width="68" height="20" rx="6" fill="#EFF6FF" />
          <text x="89" y="26" fill="#1E40AF" fontSize="9" fontWeight="700" fontFamily="sans-serif">
            PRO ditta
          </text>

          <line x1="12" y1="40" x2="148" y2="40" stroke="#F1F5F9" strokeWidth="1.5" />

          {/* Savings Highlight */}
          <text x="14" y="56" fill="#64748B" fontSize="9" fontFamily="sans-serif">
            Risparmio stimato:
          </text>
          <g transform="translate(14, 62)">
            <rect x="0" y="0" width="132" height="24" rx="6" fill="url(#accentGrad)" />
            <text x="12" y="16" fill="#FFFFFF" fontSize="11" fontWeight="700" fontFamily="sans-serif">
              Fino a -60% DIY
            </text>
          </g>
        </g>

        {/* Floating Mini Badge: No Registration (Bottom Left) */}
        <g transform="translate(50, 255)" filter="url(#cardShadow)">
          <rect x="0" y="0" width="138" height="42" rx="10" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.2" />
          <circle cx="20" cy="21" r="9" fill="#DCFCE7" />
          <path d="M16,21 L19,24 L25,17" stroke="#16A34A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <text x="36" y="19" fill="#0F172A" fontSize="10" fontWeight="700" fontFamily="sans-serif">
            100% Gratuito
          </text>
          <text x="36" y="31" fill="#64748B" fontSize="8.5" fontFamily="sans-serif">
            Senza registrazione
          </text>
        </g>

        {/* Sparkle details */}
        <path d="M305,50 L308,40 L311,50 L321,53 L311,56 L308,66 L305,56 L295,53 Z" fill="#FBBF24" />
        <path d="M110,50 L112,44 L114,50 L120,52 L114,54 L112,60 L110,54 L104,52 Z" fill="#60A5FA" />
        <path d="M470,220 L472,214 L474,220 L480,222 L474,224 L472,230 L470,224 L464,222 Z" fill="#F59E0B" />
      </svg>
    </div>
  );
};
