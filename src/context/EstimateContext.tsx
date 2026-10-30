import React, { createContext, useContext } from "react";
import { useEstimateState } from "../hooks/useEstimateState";
import { useLanguage, LanguageCode } from "./LanguageContext";

type EstimateContextType = ReturnType<typeof useEstimateState>;

const EstimateContext = createContext<EstimateContextType | undefined>(undefined);

export const EstimateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language, setLanguage } = useLanguage();
  const estimateState = useEstimateState(language, (l) => setLanguage(l as LanguageCode));

  return (
    <EstimateContext.Provider value={estimateState}>
      {children}
    </EstimateContext.Provider>
  );
};

export const useEstimate = (): EstimateContextType => {
  const context = useContext(EstimateContext);
  if (!context) {
    throw new Error("useEstimate must be used within an EstimateProvider");
  }
  return context;
};
