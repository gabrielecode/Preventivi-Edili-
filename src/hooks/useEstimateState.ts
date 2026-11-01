import { useState, useEffect, useRef } from "react";
import { sectorPriceLists, PriceItem } from "../data/priceLists";
import { countriesList } from "../data/countries";
import { translations } from "../data/translations";

export interface SelectedPrivateItem {
  id: string;
  name: string;
  unit: string;
  quantity: number;
}

// Client timeout must be > TOTAL_BUDGET_MS (250s). We use 270s as required by Task 11c.
export const CLIENT_TIMEOUT_MS = 270000;

export function useEstimateState(
  externalLanguage?: string,
  onLanguageChange?: (lang: string) => void
) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedCountryId, setSelectedCountryId] = useState<string>("IT");
  const [internalLanguage, setInternalLanguage] = useState<string>("it");

  const selectedLanguage = externalLanguage ?? internalLanguage;
  const setSelectedLanguage = (lang: string) => {
    setInternalLanguage(lang);
    if (onLanguageChange) {
      onLanguageChange(lang);
    }
  };
  
  const [selectedSectorId, setSelectedSectorId] = useState<string>("imbianchino");
  const [selectedItems, setSelectedItems] = useState<SelectedPrivateItem[]>([]);
  
  // Dimensions & Description
  const [areaMq, setAreaMq] = useState<number>(0);
  const [lengthMl, setLengthMl] = useState<number>(0);
  const [quantityCad, setQuantityCad] = useState<number>(0);
  const [workDescription, setWorkDescription] = useState<string>("");

  // Photos & Analysis State
  const [photos, setPhotos] = useState<Array<{ id: string; dataUrl: string; name: string }>>([]);
  const [photoAnalysisResult, setPhotoAnalysisResult] = useState<any | null>(null);
  const [analyzingPhotos, setAnalyzingPhotos] = useState<boolean>(false);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [photoElapsedSeconds, setPhotoElapsedSeconds] = useState<number>(0);
  const [photoAnalysisUnavailable, setPhotoAnalysisUnavailable] = useState<boolean>(false);

  // How you want to do it / preferences
  const [mode, setMode] = useState<"diy" | "pro" | "compare">("compare");
  const [quality, setQuality] = useState<"base" | "standard" | "premium">("standard");
  const [skillLevel, setSkillLevel] = useState<"beginner" | "handy" | "expert">("handy");
  const [siteDifficulty, setSiteDifficulty] = useState<"low" | "medium" | "high">("medium");

  // API result & loading
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [quoteResult, setQuoteResult] = useState<any | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  // Refs for AbortControllers, timeouts and intervals
  const estimateAbortControllerRef = useRef<AbortController | null>(null);
  const estimateTimeoutIdRef = useRef<any>(null);
  const estimateIntervalIdRef = useRef<any>(null);
  const isEstimateUserCancelledRef = useRef<boolean>(false);

  const photoAbortControllerRef = useRef<AbortController | null>(null);
  const photoTimeoutIdRef = useRef<any>(null);
  const photoIntervalIdRef = useRef<any>(null);
  const isPhotoUserCancelledRef = useRef<boolean>(false);

  const activeCountry = countriesList.find((c) => c.id === selectedCountryId) || countriesList[0];
  const activeSector = sectorPriceLists.find((s) => s.id === selectedSectorId) || sectorPriceLists[0];
  const t = translations[selectedLanguage] || translations.it;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (estimateTimeoutIdRef.current) clearTimeout(estimateTimeoutIdRef.current);
      if (estimateIntervalIdRef.current) clearInterval(estimateIntervalIdRef.current);
      if (estimateAbortControllerRef.current) estimateAbortControllerRef.current.abort();
      if (photoTimeoutIdRef.current) clearTimeout(photoTimeoutIdRef.current);
      if (photoIntervalIdRef.current) clearInterval(photoIntervalIdRef.current);
      if (photoAbortControllerRef.current) photoAbortControllerRef.current.abort();
    };
  }, []);

  const resizeAndCompressImage = (file: File, maxDimension = 1280, quality = 0.7): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;
          if (width > height) {
            if (width > maxDimension) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            }
          } else {
            if (height > maxDimension) {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("Canvas context non disponibile"));
            return;
          }
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL("image/jpeg", quality);
          resolve(dataUrl);
        };
        img.onerror = (err) => reject(err);
        img.src = e.target?.result as string;
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });
  };

  const handleAddPhotos = async (files: FileList | File[]) => {
    setPhotoError(null);
    setPhotoAnalysisUnavailable(false);
    const fileArray = Array.from(files);
    const newPhotos = [...photos];
    const errors: string[] = [];

    for (const file of fileArray) {
      if (newPhotos.length >= 3) {
        errors.push(t.photoErrorMaxCount || "Massimo 3 foto consentite.");
        break;
      }
      if (file.size > 10 * 1024 * 1024) {
        errors.push(`${file.name}: ${t.photoErrorMax10M || "Supera i 10MB all'origine."}`);
        continue;
      }
      if (!file.type.startsWith("image/")) {
        errors.push(`${file.name}: ${t.photoErrorInvalid || "File non valido."}`);
        continue;
      }

      try {
        const compressedDataUrl = await resizeAndCompressImage(file, 1280, 0.7);
        newPhotos.push({
          id: Math.random().toString(36).substring(2, 9),
          dataUrl: compressedDataUrl,
          name: file.name
        });
      } catch (err) {
        errors.push(`${file.name}: Errore di compressione.`);
      }
    }

    setPhotos(newPhotos);
    if (errors.length > 0) {
      setPhotoError(errors.join(" "));
    }
  };

  const handleRemovePhoto = (id: string) => {
    setPhotos(photos.filter(p => p.id !== id));
    if (photos.length <= 1) {
      setPhotoAnalysisResult(null);
      setPhotoAnalysisUnavailable(false);
    }
  };

  const cancelAnalyzePhotos = () => {
    if (photoAbortControllerRef.current) {
      isPhotoUserCancelledRef.current = true;
      photoAbortControllerRef.current.abort();
      photoAbortControllerRef.current = null;
    }
    if (photoTimeoutIdRef.current) {
      clearTimeout(photoTimeoutIdRef.current);
      photoTimeoutIdRef.current = null;
    }
    if (photoIntervalIdRef.current) {
      clearInterval(photoIntervalIdRef.current);
      photoIntervalIdRef.current = null;
    }
    setAnalyzingPhotos(false);
    setPhotoAnalysisUnavailable(true);
    setPhotoError(t.requestCancelled);
  };

  const analyzePhotos = async () => {
    // Anti double-click
    if (analyzingPhotos) return;
    if (photos.length === 0) return;

    // Reset previous cancellation & interval
    if (photoTimeoutIdRef.current) clearTimeout(photoTimeoutIdRef.current);
    if (photoIntervalIdRef.current) clearInterval(photoIntervalIdRef.current);

    isPhotoUserCancelledRef.current = false;
    setAnalyzingPhotos(true);
    setPhotoError(null);
    setPhotoElapsedSeconds(0);

    const controller = new AbortController();
    photoAbortControllerRef.current = controller;

    // Client timeout of 270s
    photoTimeoutIdRef.current = setTimeout(() => {
      if (photoAbortControllerRef.current === controller) {
        controller.abort("TIMEOUT");
      }
    }, CLIENT_TIMEOUT_MS);

    // Track elapsed seconds
    photoIntervalIdRef.current = setInterval(() => {
      setPhotoElapsedSeconds(prev => prev + 1);
    }, 1000);

    try {
      const response = await fetch("/api/analyze-photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          photos: photos.map(p => p.dataUrl),
          sectorId: selectedSectorId,
          workDescription,
          language: selectedLanguage
        })
      });

      const responseText = await response.text();
      let data: any;
      try {
        data = JSON.parse(responseText);
      } catch (parseErr) {
        throw new Error(t.apiErrorGeneric);
      }

      if (!response.ok) {
        // Handle standardized error format { error: { message } } or old { error: string }
        const errMsg = typeof data.error === "object" ? data.error.message : data.error;
        throw new Error(errMsg || t.apiErrorGeneric);
      }

      const analysis = data.analysis;
      setPhotoAnalysisResult(analysis);
      
      // Check if photo analysis was degraded or unavailable
      const conf = String(analysis?.confidence || "").toLowerCase();
      if (
        data.meta?.degraded ||
        conf.includes("non disponibile") ||
        conf.includes("nicht verfügbar") ||
        conf.includes("not available") ||
        conf.includes("non disponible")
      ) {
        setPhotoAnalysisUnavailable(true);
      } else {
        setPhotoAnalysisUnavailable(false);
      }

      if (analysis.suggestedDimensions) {
        if (analysis.suggestedDimensions.areaMq > 0) {
          setAreaMq(analysis.suggestedDimensions.areaMq);
        }
        if (analysis.suggestedDimensions.lengthMl > 0) {
          setLengthMl(analysis.suggestedDimensions.lengthMl);
        }
        if (analysis.suggestedDimensions.quantityCad > 0) {
          setQuantityCad(analysis.suggestedDimensions.quantityCad);
        }
      }
    } catch (err: any) {
      console.error("AnalyzePhotos Error:", err);
      setPhotoAnalysisUnavailable(true);
      if (err.name === "AbortError" || controller.signal.aborted) {
        if (isPhotoUserCancelledRef.current) {
          setPhotoError(t.requestCancelled);
        } else {
          setPhotoError(t.requestTimeout);
        }
      } else {
        setPhotoError(err.message || t.apiErrorGeneric);
      }
    } finally {
      if (photoTimeoutIdRef.current) {
        clearTimeout(photoTimeoutIdRef.current);
        photoTimeoutIdRef.current = null;
      }
      if (photoIntervalIdRef.current) {
        clearInterval(photoIntervalIdRef.current);
        photoIntervalIdRef.current = null;
      }
      if (photoAbortControllerRef.current === controller) {
        photoAbortControllerRef.current = null;
      }
      setAnalyzingPhotos(false);
    }
  };

  // Reset selected items when sector changes
  useEffect(() => {
    setSelectedItems([]);
    setAreaMq(0);
    setLengthMl(0);
    setQuantityCad(0);
  }, [selectedSectorId]);

  const handleToggleItem = (item: PriceItem) => {
    const exists = selectedItems.find((i) => i.id === item.id);
    if (exists) {
      setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
    } else {
      let defaultQty = 1;
      if (item.unit === "mq" && areaMq > 0) defaultQty = areaMq;
      else if (item.unit === "ml" && lengthMl > 0) defaultQty = lengthMl;
      else if (item.unit === "cad" && quantityCad > 0) defaultQty = quantityCad;

      setSelectedItems([
        ...selectedItems,
        {
          id: item.id,
          name: item.name,
          unit: item.unit,
          quantity: defaultQty,
        },
      ]);
    }
  };

  const handleUpdateQuantity = (id: string, qty: number) => {
    setSelectedItems(
      selectedItems.map((i) => (i.id === id ? { ...i, quantity: Math.max(0, qty) } : i))
    );
  };

  const cancelEstimate = () => {
    if (estimateAbortControllerRef.current) {
      isEstimateUserCancelledRef.current = true;
      estimateAbortControllerRef.current.abort();
      estimateAbortControllerRef.current = null;
    }
    if (estimateTimeoutIdRef.current) {
      clearTimeout(estimateTimeoutIdRef.current);
      estimateTimeoutIdRef.current = null;
    }
    if (estimateIntervalIdRef.current) {
      clearInterval(estimateIntervalIdRef.current);
      estimateIntervalIdRef.current = null;
    }
    setLoading(false);
    setErrorMsg(t.requestCancelled);
  };

  const generateEstimate = async () => {
    // Anti double-click
    if (loading) return;

    if (!workDescription.trim()) {
      setErrorMsg("Per favore, inserisci una breve descrizione del lavoro.");
      return;
    }

    if (estimateTimeoutIdRef.current) clearTimeout(estimateTimeoutIdRef.current);
    if (estimateIntervalIdRef.current) clearInterval(estimateIntervalIdRef.current);

    isEstimateUserCancelledRef.current = false;
    setLoading(true);
    setErrorMsg(null);
    setElapsedSeconds(0);

    const controller = new AbortController();
    estimateAbortControllerRef.current = controller;

    // Timeout: 270 seconds
    estimateTimeoutIdRef.current = setTimeout(() => {
      if (estimateAbortControllerRef.current === controller) {
        controller.abort("TIMEOUT");
      }
    }, CLIENT_TIMEOUT_MS);

    // Track elapsed time every second
    estimateIntervalIdRef.current = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);

    const payload = {
      countryCode: selectedCountryId,
      language: selectedLanguage,
      sectorId: selectedSectorId,
      workDescription,
      dimensions: {
        SUPERFICIE_MQ: areaMq > 0 ? areaMq : undefined,
        LUNGHEZZA_ML: lengthMl > 0 ? lengthMl : undefined,
        ELEMENTI_CAD: quantityCad > 0 ? quantityCad : undefined,
      },
      selectedItems: selectedItems.map(i => ({
        id: i.id,
        quantity: i.quantity,
        customPrice: 0
      })),
      quality,
      skillLevel,
      mode,
      siteDifficulty
    };

    try {
      const response = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify(payload),
      });

      const responseText = await response.text();
      let data: any;
      try {
        data = JSON.parse(responseText);
      } catch (parseErr) {
        throw new Error(t.apiErrorGeneric);
      }

      if (!response.ok) {
        const errMsg = typeof data.error === "object" ? data.error.message : data.error;
        throw new Error(errMsg || t.apiErrorGeneric);
      }

      setQuoteResult(data);
      setCurrentStep(5);
    } catch (err: any) {
      console.error("GenerateEstimate Error:", err);
      if (err.name === "AbortError" || controller.signal.aborted) {
        if (isEstimateUserCancelledRef.current) {
          setErrorMsg(t.requestCancelled);
        } else {
          setErrorMsg(t.requestTimeout);
        }
      } else {
        setErrorMsg(err.message || t.apiErrorGeneric);
      }
    } finally {
      if (estimateTimeoutIdRef.current) {
        clearTimeout(estimateTimeoutIdRef.current);
        estimateTimeoutIdRef.current = null;
      }
      if (estimateIntervalIdRef.current) {
        clearInterval(estimateIntervalIdRef.current);
        estimateIntervalIdRef.current = null;
      }
      if (estimateAbortControllerRef.current === controller) {
        estimateAbortControllerRef.current = null;
      }
      setLoading(false);
    }
  };

  return {
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
    setQuoteResult,
    activeCountry,
    activeSector,
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
    setPhotoAnalysisUnavailable,
    setSelectedItems,
  };
}
