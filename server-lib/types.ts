export type SectorId = "imbianchino" | "serramentista" | "piastrellista" | "idraulico" | "elettricista";

export interface LeadRecord {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone?: string;
  location: string;
  notes?: string;
  privacyConsent: boolean;
  estimateSummary: {
    sector: string;
    description: string;
    professionalCostMin: number;
    professionalCostMax: number;
    diyCostMin: number;
    diyCostMax: number;
    country: string;
    language: string;
  };
}

export interface LeadStore {
  save(lead: LeadRecord): Promise<void>;
  getAll(): Promise<LeadRecord[]>;
}
