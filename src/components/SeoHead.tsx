import React, { useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

export interface SeoHeadProps {
  page: "home" | "estimate" | "privacy";
  title: string;
  description: string;
}

export const SeoHead: React.FC<SeoHeadProps> = ({ page, title, description }) => {
  const { language, t } = useLanguage();

  useEffect(() => {
    // 1. Set document title
    document.title = title;

    // 2. Set <html> lang attribute
    document.documentElement.lang = language;

    // Helper to create or update a <meta> tag
    const setMetaTag = (selector: string, attrName: string, attrVal: string, content: string) => {
      let meta = document.querySelector<HTMLMetaElement>(selector);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attrName, attrVal);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Helper to create or update a <link> tag
    const setLinkTag = (rel: string, href: string, extraAttrs: Record<string, string> = {}) => {
      let selector = `link[rel="${rel}"]`;
      if (extraAttrs.hreflang) {
        selector += `[hreflang="${extraAttrs.hreflang}"]`;
      }
      let link = document.querySelector<HTMLLinkElement>(selector);
      if (!link) {
        link = document.createElement("link");
        link.rel = rel;
        document.head.appendChild(link);
      }
      link.href = href;
      Object.entries(extraAttrs).forEach(([k, v]) => {
        link!.setAttribute(k, v);
      });
    };

    // Base URL resolution
    const baseUrl = (
      (import.meta.env.VITE_APP_URL as string) ||
      (typeof window !== "undefined" ? window.location.origin : "https://preventivocasa.app")
    ).replace(/\/$/, "");

    const pathname = page === "home" ? "/" : `/${page === "estimate" ? "stima" : page}`;
    const canonicalUrl = `${baseUrl}${pathname}`;

    // Meta Description
    setMetaTag('meta[name="description"]', "name", "description", description);

    // Canonical link
    setLinkTag("canonical", canonicalUrl);

    // Hreflang alternate links (it, de, fr, en and x-default)
    const cleanPath = pathname === "/" ? "" : pathname;
    setLinkTag("alternate", `${baseUrl}${cleanPath}?lang=it`, { hreflang: "it" });
    setLinkTag("alternate", `${baseUrl}${cleanPath}?lang=de`, { hreflang: "de" });
    setLinkTag("alternate", `${baseUrl}${cleanPath}?lang=fr`, { hreflang: "fr" });
    setLinkTag("alternate", `${baseUrl}${cleanPath}?lang=en`, { hreflang: "en" });
    setLinkTag("alternate", `${baseUrl}${cleanPath}`, { hreflang: "x-default" });

    // OpenGraph tags
    const ogLocale =
      language === "it" ? "it_IT" : language === "de" ? "de_DE" : language === "fr" ? "fr_FR" : "en_US";
    const ogImage = `${baseUrl}/og-image.png`;

    setMetaTag('meta[property="og:site_name"]', "property", "og:site_name", t.appName);
    setMetaTag('meta[property="og:type"]', "property", "og:type", "website");
    setMetaTag('meta[property="og:title"]', "property", "og:title", title);
    setMetaTag('meta[property="og:description"]', "property", "og:description", description);
    setMetaTag('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    setMetaTag('meta[property="og:locale"]', "property", "og:locale", ogLocale);
    setMetaTag('meta[property="og:image"]', "property", "og:image", ogImage);
    setMetaTag('meta[property="og:image:width"]', "property", "og:image:width", "1200");
    setMetaTag('meta[property="og:image:height"]', "property", "og:image:height", "630");
    setMetaTag('meta[property="og:image:alt"]', "property", "og:image:alt", `${t.appName} - AI Estimator`);

    // Twitter Card tags
    setMetaTag('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setMetaTag('meta[name="twitter:title"]', "name", "twitter:title", title);
    setMetaTag('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMetaTag('meta[name="twitter:image"]', "name", "twitter:image", ogImage);

    // 3. Schema.org JSON-LD Structured Data
    const webAppSchema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": t.appName,
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "All",
      "url": canonicalUrl,
      "description": t.appSubtitle,
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "EUR",
      },
      "inLanguage": ["it", "de", "fr", "en"],
      "browserRequirements": "Requires JavaScript. Requires HTML5.",
    };

    let structuredData: any = webAppSchema;

    if (page === "home") {
      const faqItems = [
        { q: t.faqQ1, a: t.faqA1 },
        { q: t.faqQ2, a: t.faqA2 },
        { q: t.faqQ3, a: t.faqA3 },
        { q: t.faqQ4, a: t.faqA4 },
        { q: t.faqQ5, a: t.faqA5 },
        { q: t.faqQ6, a: t.faqA6 },
        { q: t.faqQ7, a: t.faqA7 },
        { q: t.faqQ8, a: t.faqA8 },
        { q: t.faqQ9, a: t.faqA9 },
        { q: t.faqQ10, a: t.faqA10 },
      ];

      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems.map((item) => ({
          "@type": "Question",
          "name": item.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.a,
          },
        })),
      };

      structuredData = {
        "@context": "https://schema.org",
        "@graph": [webAppSchema, faqSchema],
      };
    }

    let scriptTag = document.getElementById("applet-seo-jsonld") as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = "applet-seo-jsonld";
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData, null, 2);
  }, [page, title, description, language, t]);

  return null;
};
