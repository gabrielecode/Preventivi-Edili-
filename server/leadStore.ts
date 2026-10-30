import fs from "fs";
import path from "path";

export interface LeadRecord {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone?: string;
  location: string; // CAP / città
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
}

export class LocalFileLeadStore implements LeadStore {
  private filePath: string;

  constructor(filePath: string = path.join(process.cwd(), "leads.json")) {
    this.filePath = filePath;
  }

  async save(lead: LeadRecord): Promise<void> {
    let leads: LeadRecord[] = [];
    try {
      if (fs.existsSync(this.filePath)) {
        const fileContent = fs.readFileSync(this.filePath, "utf-8");
        leads = JSON.parse(fileContent);
      }
    } catch (err) {
      console.error("Error reading leads.json:", err);
      leads = [];
    }

    leads.push(lead);

    try {
      fs.writeFileSync(this.filePath, JSON.stringify(leads, null, 2), "utf-8");
    } catch (err) {
      console.error("Error writing leads.json:", err);
      throw new Error("Impossibile salvare la richiesta nel file system locale.");
    }
  }
}
