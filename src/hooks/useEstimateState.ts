import { useState, useEffect } from "react";
import { sectorPriceLists, PriceItem } from "../data/priceLists";
import { countriesList } from "../data/countries";

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
        customPrice: 0 // Server will compute unit price based on quality
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
      setCurrentStep(5); // Step 5: provisional JSON results page
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
    generateEstimate,
  };
}
