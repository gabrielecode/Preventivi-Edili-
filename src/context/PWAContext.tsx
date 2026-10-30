import React, { createContext, useContext, useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

interface PWAContextType {
  deferredPrompt: BeforeInstallPromptEvent | null;
  isInstallable: boolean;
  isInstalled: boolean;
  isIOS: boolean;
  isBannerDismissed: boolean;
  install: () => Promise<void>;
  dismissBanner: () => void;
}

const PWAContext = createContext<PWAContextType | undefined>(undefined);

export const PWAProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isBannerDismissed, setIsBannerDismissed] = useState(false);

  useEffect(() => {
    // Check if running in standalone mode
    const checkStandalone = () => {
      const isStandalone = 
        window.matchMedia('(display-mode: standalone)').matches || 
        (window.navigator as any).standalone === true;
      setIsInstalled(isStandalone);
    };

    checkStandalone();

    // Check for iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));

    // Check banner dismissal from localStorage
    try {
      const dismissedUntil = localStorage.getItem('pwa_banner_dismissed_until');
      if (dismissedUntil && new Date().getTime() < parseInt(dismissedUntil)) {
        setIsBannerDismissed(true);
      }
    } catch (e) {
      console.warn('Failed to read from localStorage', e);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const install = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  const dismissBanner = () => {
    setIsBannerDismissed(true);
    try {
      // 14 days in milliseconds
      const fourteenDays = 14 * 24 * 60 * 60 * 1000;
      const until = new Date().getTime() + fourteenDays;
      localStorage.setItem('pwa_banner_dismissed_until', until.toString());
    } catch (e) {
      console.warn('Failed to write to localStorage', e);
    }
  };

  return (
    <PWAContext.Provider
      value={{
        deferredPrompt,
        isInstallable: !!deferredPrompt,
        isInstalled,
        isIOS,
        isBannerDismissed,
        install,
        dismissBanner,
      }}
    >
      {children}
    </PWAContext.Provider>
  );
};

export const usePWA = () => {
  const context = useContext(PWAContext);
  if (context === undefined) {
    throw new Error('usePWA must be used within a PWAProvider');
  }
  return context;
};
