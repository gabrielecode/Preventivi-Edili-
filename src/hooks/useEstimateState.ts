import { useState, useEffect } from "react";
import { sectorPriceLists, PriceItem } from "../data/priceLists";
import { countriesList } from "../data/countries";
import { translations } from "../data/translations";

export interface SelectedPrivateItem {
  id: string;
  name: string;
  unit: string;
  quantity: number;
}

export function useEstimateState() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedCountryId, setSelectedCountryId] = useState<string>("IT");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("it");
  
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
    }
  };

  const analyzePhotos = async () => {
    if (photos.length === 0) return;

    setAnalyzingPhotos(true);
    setPhotoError(null);

    try {
      const response = await fetch("/api/analyze-photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          photos: photos.map(p => p.dataUrl),
          sectorId: selectedSectorId,
          workDescription,
          language: selectedLanguage
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Errore durante l'analisi delle foto.");
      }

      const data = await response.json();
      const analysis = data.analysis;
      setPhotoAnalysisResult(analysis);

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
      console.error(err);
      setPhotoError(err.message || "Errore durante l'analisi delle foto.");
    } finally {
      setAnalyzingPhotos(false);
    }
  };

  // How you want to do it / preferences
  const [mode, setMode] = useState<"diy" | "pro" | "compare">("compare");
  const [quality, setQuality] = useState<"base" | "standard" | "premium">("standard");
  const [skillLevel, setSkillLevel] = useState<"beginner" | "handy" | "expert">("handy");
  const [siteDifficulty, setSiteDifficulty] = useState<"low" | "medium" | "high">("medium");

  // API result & loading
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [quoteResult, setQuoteResult] = useState<any | null>(null);

  const activeCountry = countriesList.find((c) => c.id === selectedCountryId) || countriesList[0];
  const activeSector = sectorPriceLists.find((s) => s.id === selectedSectorId) || sectorPriceLists[0];
  const t = translations[selectedLanguage] || translations.it;

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

  const generateEstimate = async () => {
    if (!workDescription.trim()) {
      setErrorMsg("Per favore, inserisci una breve descrizione del lavoro.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setQuoteResult(null);

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
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Errore durante la generazione della stima.");
      }

      const data = await response.json();
      setQuoteResult(data);
      setCurrentStep(5);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Errore sconosciuto durante la chiamata API.");
    } finally {
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
    activeCountry,
    activeSector,
    t,
    generateEstimate,
    photos,
    handleAddPhotos,
    handleRemovePhoto,
    photoAnalysisResult,
    analyzingPhotos,
    photoError,
    analyzePhotos,
  };
}
