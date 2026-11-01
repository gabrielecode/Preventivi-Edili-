import { SectorId } from '../../server-lib/types';

export const COUNTRY_PRICES_META = {
  version: "1.0",
  generatedAt: "2026-11-01",
  baseCountry: "IT",
  note: "IT usa il listino base invariato (verificato su money.it/cronoshare per imbiancatura: 5-15 EUR/mq). Valori netti IVA, unita' come nel listino. CH in CHF, gli altri in EUR.",
  method: "basis=ricerca: valore ancorato a fonti web consultate il 2026-11-01. basis=derivato: prezzo base IT x (quota materiali x indiceMateriali + quota manodopera x (tariffaOrariaPaese/tariffaOrariaIT)^0.75). Gli indici materiali sono stime non verificate.",
  disclaimer: "Valori indicativi per stime preliminari, non sono offerte vincolanti. Fonti prevalentemente portali di comparazione/aggregatori, non prezzari ufficiali (CRB/NPK, BKI, Batiprix, CYPE). Sostituire con offerte reali dove possibile."
};

export const COUNTRY_PRICES_DISCLAIMER = COUNTRY_PRICES_META.disclaimer;

export const SUGGESTED_COUNTRY_CONFIG: Record<string, { standardHourlyLaborRate: number; standardTravelCost?: number }> = {
  CH: { standardHourlyLaborRate: 105, standardTravelCost: 70 },
  DE: { standardHourlyLaborRate: 62, standardTravelCost: 35 },
  FR: { standardHourlyLaborRate: 48 },
  ES: { standardHourlyLaborRate: 25 },
  IT: { standardHourlyLaborRate: 30 }
};

interface CountryData {
  currency: string;
  hourlyRates: Record<string, number>;
  hourlyRatesConfidence: string;
  materialIndex: number;
  sources: string[];
}

export interface ItemCountryPrice {
  min: number;
  max: number;
  basis: "ricerca" | "derivato";
  confidence: "bassa" | "media" | "alta";
  source: string;
}

const COUNTRIES_DATA: Record<string, CountryData> = {
  CH: {
    currency: "CHF",
    hourlyRates: { imbianchino: 95, serramentista: 105, piastrellista: 100, idraulico: 112, elettricista: 117 },
    hourlyRatesConfidence: "media",
    materialIndex: 1.25,
    sources: [
      "https://baunex.ch/blog/stundenlohn-handwerker-schweiz-uebersicht",
      "https://www.handwerker-kosten.ch/stundensatz-index/",
      "https://www.handwerker-kosten.ch/elektriker/",
      "https://www.handwerker-kosten.ch/sanitaer/",
      "https://www.comparis.ch/handwerker/maler/zuerich",
      "https://www.raiffeisen.ch/rch/de/wissen/wohnen/kostenbeispiel-waermepumpe.html"
    ]
  },
  DE: {
    currency: "EUR",
    hourlyRates: { imbianchino: 52, serramentista: 60, piastrellista: 55, idraulico: 75, elettricista: 70 },
    hourlyRatesConfidence: "media",
    materialIndex: 1.1,
    sources: [
      "https://www.clean-invoice.com/maler/kosten-und-kalkulation-maler",
      "https://trustlocal.de/kosten/maler-kosten/",
      "https://www.aroundhome.de/fliesenlegen/preise-kosten",
      "https://www.clean-invoice.com/fliesen-verlegen-kosten",
      "https://www.clean-invoice.com/lexikon/handwerkerpreise",
      "https://www.aroundhome.de/heizung/waermepumpe/preise-kosten",
      "https://utopia.de/ratgeber/genau-hinsehen-so-riesig-sind-die-kosten-unterschiede-bei-waermepumpen_825967/"
    ]
  },
  FR: {
    currency: "EUR",
    hourlyRates: { imbianchino: 45, serramentista: 45, piastrellista: 45, idraulico: 50, elettricista: 50 },
    hourlyRatesConfidence: "bassa",
    materialIndex: 1.1,
    sources: [
      "https://www.travaux.com/peinture/guide-des-prix/peinture-tva",
      "https://www.habitatpresto.com/mag/revetement/mur/prix-travaux-peinture-m2",
      "https://abby.fr/guide/micro-entreprise/tarif-horaire-peintre-auto-entrepreneur"
    ]
  },
  ES: {
    currency: "EUR",
    hourlyRates: { imbianchino: 20, serramentista: 22, piastrellista: 22, idraulico: 25, elettricista: 25 },
    hourlyRatesConfidence: "bassa",
    materialIndex: 0.92,
    sources: [
      "https://trustlocal.es/coste/pintor-coste/",
      "https://www.cronoshare.com/cuanto-cuesta/pintar-piso"
    ]
  }
};

const ITEM_PRICES: Record<string, Record<string, ItemCountryPrice>> = {
  imb_dip_idro: {
    CH: { min: 17.5, max: 33, basis: "derivato", confidence: "media", source: "listino base x indice 2.21 (tariffa oraria 95 CHF/h, indice materiali 1.25)" },
    DE: { min: 10, max: 20, basis: "ricerca", confidence: "alta", source: "trustlocal.de 8-16 EUR/mq manodopera + 2-5 materiale; clean-invoice 8-15 incl. materiale" },
    FR: { min: 17, max: 30, basis: "ricerca", confidence: "media", source: "travaux.com/habitatpresto: 20-35 TTC con forniture, 8-18 HT solo manodopera" },
    ES: { min: 6, max: 12, basis: "ricerca", confidence: "media", source: "trustlocal.es 8-12 EUR/mq; cronoshare 5.5-12" }
  },
  imb_dip_lav: {
    CH: { min: 26, max: 43, basis: "derivato", confidence: "media", source: "listino base x indice 2.13 (tariffa oraria 95 CHF/h, indice materiali 1.25)" },
    DE: { min: 18.0, max: 30, basis: "derivato", confidence: "media", source: "listino base x indice 1.48 (tariffa oraria 52 EUR/h, indice materiali 1.1)" },
    FR: { min: 16.5, max: 27, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.37 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 10.5, max: 17.5, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.88 (tariffa oraria 20 EUR/h, indice materiali 0.92)" }
  },
  imb_dip_est_sil: {
    CH: { min: 37, max: 62, basis: "derivato", confidence: "media", source: "listino base x indice 2.06 (tariffa oraria 95 CHF/h, indice materiali 1.25)" },
    DE: { min: 22, max: 48, basis: "ricerca", confidence: "media", source: "trustlocal.de/clean-invoice: facciata 18-50 EUR/mq" },
    FR: { min: 35, max: 70, basis: "ricerca", confidence: "media", source: "habitatpresto: facciata 30-90 HT; travaux.com 50-75 TTC" },
    ES: { min: 16.0, max: 26, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.88 (tariffa oraria 20 EUR/h, indice materiali 0.92)" }
  },
  imb_dip_est_acr: {
    CH: { min: 32, max: 60, basis: "derivato", confidence: "media", source: "listino base x indice 2.13 (tariffa oraria 95 CHF/h, indice materiali 1.25)" },
    DE: { min: 20, max: 42, basis: "ricerca", confidence: "media", source: "trustlocal.de/clean-invoice: facciata 18-50 EUR/mq" },
    FR: { min: 30, max: 65, basis: "ricerca", confidence: "media", source: "habitatpresto: facciata 30-90 HT; travaux.com 50-75 TTC" },
    ES: { min: 13.0, max: 25, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.88 (tariffa oraria 20 EUR/h, indice materiali 0.92)" }
  },
  imb_ras_ges: {
    CH: { min: 35, max: 59, basis: "derivato", confidence: "media", source: "listino base x indice 2.35 (tariffa oraria 95 CHF/h, indice materiali 1.25)" },
    DE: { min: 24, max: 39, basis: "derivato", confidence: "media", source: "listino base x indice 1.57 (tariffa oraria 52 EUR/h, indice materiali 1.1)" },
    FR: { min: 22, max: 36, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.44 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 13.0, max: 22, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.86 (tariffa oraria 20 EUR/h, indice materiali 0.92)" }
  },
  imb_tra_ant: {
    CH: { min: 10.0, max: 20.0, basis: "derivato", confidence: "media", source: "listino base x indice 1.99 (tariffa oraria 95 CHF/h, indice materiali 1.25)" },
    DE: { min: 7.0, max: 14.0, basis: "derivato", confidence: "media", source: "listino base x indice 1.42 (tariffa oraria 52 EUR/h, indice materiali 1.1)" },
    FR: { min: 6.5, max: 13.5, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.33 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 4.5, max: 9.0, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.88 (tariffa oraria 20 EUR/h, indice materiali 0.92)" }
  },
  imb_rim_pap: {
    CH: { min: 12.0, max: 29, basis: "derivato", confidence: "media", source: "listino base x indice 2.43 (tariffa oraria 95 CHF/h, indice materiali 1.25)" },
    DE: { min: 8.0, max: 19.5, basis: "derivato", confidence: "media", source: "listino base x indice 1.61 (tariffa oraria 52 EUR/h, indice materiali 1.1)" },
    FR: { min: 7.5, max: 17.5, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.46 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 4.5, max: 10.5, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.86 (tariffa oraria 20 EUR/h, indice materiali 0.92)" }
  },
  imb_pos_pap: {
    CH: { min: 28, max: 55, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.84 (tariffa oraria 95 CHF/h, indice materiali 1.25)" },
    DE: { min: 18, max: 35, basis: "ricerca", confidence: "media", source: "clean-invoice: tappezzeria 15-35 EUR/mq" },
    FR: { min: 19.0, max: 38, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.28 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 13.5, max: 27, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.89 (tariffa oraria 20 EUR/h, indice materiali 0.92)" }
  },
  imb_dec_ven: {
    CH: { min: 82, max: 155, basis: "derivato", confidence: "media", source: "listino base x indice 2.06 (tariffa oraria 95 CHF/h, indice materiali 1.25)" },
    DE: { min: 58, max: 110, basis: "derivato", confidence: "media", source: "listino base x indice 1.45 (tariffa oraria 52 EUR/h, indice materiali 1.1)" },
    FR: { min: 54, max: 100, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.35 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 35, max: 66, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.88 (tariffa oraria 20 EUR/h, indice materiali 0.92)" }
  },
  imb_dec_vel: {
    CH: { min: 32, max: 60, basis: "derivato", confidence: "media", source: "listino base x indice 2.13 (tariffa oraria 95 CHF/h, indice materiali 1.25)" },
    DE: { min: 22, max: 41, basis: "derivato", confidence: "media", source: "listino base x indice 1.48 (tariffa oraria 52 EUR/h, indice materiali 1.1)" },
    FR: { min: 21, max: 38, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.37 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 13.0, max: 25, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.88 (tariffa oraria 20 EUR/h, indice materiali 0.92)" }
  },
  imb_dec_ter: {
    CH: { min: 41, max: 78, basis: "derivato", confidence: "media", source: "listino base x indice 2.06 (tariffa oraria 95 CHF/h, indice materiali 1.25)" },
    DE: { min: 29, max: 55, basis: "derivato", confidence: "media", source: "listino base x indice 1.45 (tariffa oraria 52 EUR/h, indice materiali 1.1)" },
    FR: { min: 27, max: 51, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.35 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 17.5, max: 33, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.88 (tariffa oraria 20 EUR/h, indice materiali 0.92)" }
  },
  imb_ver_ter: {
    CH: { min: 91, max: 180, basis: "derivato", confidence: "media", source: "listino base x indice 2.28 (tariffa oraria 95 CHF/h, indice materiali 1.25)" },
    DE: { min: 62, max: 125, basis: "derivato", confidence: "media", source: "listino base x indice 1.54 (tariffa oraria 52 EUR/h, indice materiali 1.1)" },
    FR: { min: 57, max: 115, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.42 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 35, max: 69, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.87 (tariffa oraria 20 EUR/h, indice materiali 0.92)" }
  },
  imb_ver_inf: {
    CH: { min: 130, max: 265, basis: "derivato", confidence: "media", source: "listino base x indice 2.21 (tariffa oraria 95 CHF/h, indice materiali 1.25)" },
    DE: { min: 91, max: 180, basis: "derivato", confidence: "media", source: "listino base x indice 1.51 (tariffa oraria 52 EUR/h, indice materiali 1.1)" },
    FR: { min: 84, max: 165, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.40 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 52, max: 105, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.87 (tariffa oraria 20 EUR/h, indice materiali 0.92)" }
  },
  imb_car_con: {
    CH: { min: 55, max: 83, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.84 (tariffa oraria 95 CHF/h, indice materiali 1.25)" },
    DE: { min: 41, max: 61, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.35 (tariffa oraria 52 EUR/h, indice materiali 1.1)" },
    FR: { min: 38, max: 58, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.28 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 27, max: 40, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.89 (tariffa oraria 20 EUR/h, indice materiali 0.92)" }
  },
  imb_car_con_idro: {
    CH: { min: 64, max: 92, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.84 (tariffa oraria 95 CHF/h, indice materiali 1.25)" },
    DE: { min: 47, max: 68, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.35 (tariffa oraria 52 EUR/h, indice materiali 1.1)" },
    FR: { min: 45, max: 64, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.28 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 31, max: 45, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.89 (tariffa oraria 20 EUR/h, indice materiali 0.92)" }
  },
  imb_car_con_isol: {
    CH: { min: 71, max: 115, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.77 (tariffa oraria 95 CHF/h, indice materiali 1.25)" },
    DE: { min: 53, max: 86, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.32 (tariffa oraria 52 EUR/h, indice materiali 1.1)" },
    FR: { min: 50, max: 82, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.26 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 36, max: 58, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.89 (tariffa oraria 20 EUR/h, indice materiali 0.92)" }
  },
  ser_pvc_std: {
    CH: { min: 785, max: 1300, basis: "derivato", confidence: "media", source: "listino base x indice 1.96 (tariffa oraria 105 CHF/h, indice materiali 1.25)" },
    DE: { min: 560, max: 910, basis: "derivato", confidence: "media", source: "listino base x indice 1.40 (tariffa oraria 60 EUR/h, indice materiali 1.1)" },
    FR: { min: 485, max: 790, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.21 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 330, max: 535, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.82 (tariffa oraria 22 EUR/h, indice materiali 0.92)" }
  },
  ser_pvc_2an: {
    CH: { min: 1200, max: 1850, basis: "derivato", confidence: "media", source: "listino base x indice 1.96 (tariffa oraria 105 CHF/h, indice materiali 1.25)" },
    DE: { min: 840, max: 1350, basis: "derivato", confidence: "media", source: "listino base x indice 1.40 (tariffa oraria 60 EUR/h, indice materiali 1.1)" },
    FR: { min: 730, max: 1150, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.21 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 495, max: 780, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.82 (tariffa oraria 22 EUR/h, indice materiali 0.92)" }
  },
  ser_alu_tag: {
    CH: { min: 1200, max: 1850, basis: "derivato", confidence: "media", source: "listino base x indice 1.96 (tariffa oraria 105 CHF/h, indice materiali 1.25)" },
    DE: { min: 840, max: 1350, basis: "derivato", confidence: "media", source: "listino base x indice 1.40 (tariffa oraria 60 EUR/h, indice materiali 1.1)" },
    FR: { min: 730, max: 1150, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.21 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 495, max: 780, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.82 (tariffa oraria 22 EUR/h, indice materiali 0.92)" }
  },
  ser_leg_all: {
    CH: { min: 1750, max: 2950, basis: "derivato", confidence: "media", source: "listino base x indice 1.96 (tariffa oraria 105 CHF/h, indice materiali 1.25)" },
    DE: { min: 1250, max: 2100, basis: "derivato", confidence: "media", source: "listino base x indice 1.40 (tariffa oraria 60 EUR/h, indice materiali 1.1)" },
    FR: { min: 1100, max: 1800, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.21 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 740, max: 1250, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.82 (tariffa oraria 22 EUR/h, indice materiali 0.92)" }
  },
  ser_por_bli: {
    CH: { min: 2350, max: 4300, basis: "derivato", confidence: "media", source: "listino base x indice 1.96 (tariffa oraria 105 CHF/h, indice materiali 1.25)" },
    DE: { min: 1700, max: 3100, basis: "derivato", confidence: "media", source: "listino base x indice 1.40 (tariffa oraria 60 EUR/h, indice materiali 1.1)" },
    FR: { min: 1450, max: 2650, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.21 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 985, max: 1800, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.82 (tariffa oraria 22 EUR/h, indice materiali 0.92)" }
  },
  ser_por_int: {
    CH: { min: 395, max: 885, basis: "derivato", confidence: "media", source: "listino base x indice 1.96 (tariffa oraria 105 CHF/h, indice materiali 1.25)" },
    DE: { min: 280, max: 630, basis: "derivato", confidence: "media", source: "listino base x indice 1.40 (tariffa oraria 60 EUR/h, indice materiali 1.1)" },
    FR: { min: 245, max: 545, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.21 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 165, max: 370, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.82 (tariffa oraria 22 EUR/h, indice materiali 0.92)" }
  },
  ser_por_scr: {
    CH: { min: 685, max: 1200, basis: "derivato", confidence: "media", source: "listino base x indice 1.96 (tariffa oraria 105 CHF/h, indice materiali 1.25)" },
    DE: { min: 490, max: 840, basis: "derivato", confidence: "media", source: "listino base x indice 1.40 (tariffa oraria 60 EUR/h, indice materiali 1.1)" },
    FR: { min: 425, max: 730, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.21 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 285, max: 495, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.82 (tariffa oraria 22 EUR/h, indice materiali 0.92)" }
  },
  ser_zan_rul: {
    CH: { min: 155, max: 295, basis: "derivato", confidence: "media", source: "listino base x indice 1.96 (tariffa oraria 105 CHF/h, indice materiali 1.25)" },
    DE: { min: 110, max: 210, basis: "derivato", confidence: "media", source: "listino base x indice 1.40 (tariffa oraria 60 EUR/h, indice materiali 1.1)" },
    FR: { min: 97, max: 180, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.21 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 66, max: 125, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.82 (tariffa oraria 22 EUR/h, indice materiali 0.92)" }
  },
  ser_zan_pli: {
    CH: { min: 295, max: 490, basis: "derivato", confidence: "media", source: "listino base x indice 1.96 (tariffa oraria 105 CHF/h, indice materiali 1.25)" },
    DE: { min: 210, max: 350, basis: "derivato", confidence: "media", source: "listino base x indice 1.40 (tariffa oraria 60 EUR/h, indice materiali 1.1)" },
    FR: { min: 180, max: 305, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.21 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 125, max: 205, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.82 (tariffa oraria 22 EUR/h, indice materiali 0.92)" }
  },
  ser_sos_avv: {
    CH: { min: 295, max: 590, basis: "derivato", confidence: "media", source: "listino base x indice 1.96 (tariffa oraria 105 CHF/h, indice materiali 1.25)" },
    DE: { min: 210, max: 420, basis: "derivato", confidence: "media", source: "listino base x indice 1.40 (tariffa oraria 60 EUR/h, indice materiali 1.1)" },
    FR: { min: 180, max: 365, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.21 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 125, max: 245, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.82 (tariffa oraria 22 EUR/h, indice materiali 0.92)" }
  },
  ser_mot_avv: {
    CH: { min: 235, max: 430, basis: "derivato", confidence: "media", source: "listino base x indice 1.96 (tariffa oraria 105 CHF/h, indice materiali 1.25)" },
    DE: { min: 170, max: 310, basis: "derivato", confidence: "media", source: "listino base x indice 1.40 (tariffa oraria 60 EUR/h, indice materiali 1.1)" },
    FR: { min: 145, max: 265, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.21 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 99, max: 180, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.82 (tariffa oraria 22 EUR/h, indice materiali 0.92)" }
  },
  ser_coi_cas: {
    CH: { min: 155, max: 315, basis: "derivato", confidence: "media", source: "listino base x indice 1.96 (tariffa oraria 105 CHF/h, indice materiali 1.25)" },
    DE: { min: 110, max: 225, basis: "derivato", confidence: "media", source: "listino base x indice 1.40 (tariffa oraria 60 EUR/h, indice materiali 1.1)" },
    FR: { min: 97, max: 195, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.21 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 66, max: 130, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.82 (tariffa oraria 22 EUR/h, indice materiali 0.92)" }
  },
  ser_gra_sic: {
    CH: { min: 685, max: 1300, basis: "derivato", confidence: "media", source: "listino base x indice 1.96 (tariffa oraria 105 CHF/h, indice materiali 1.25)" },
    DE: { min: 490, max: 910, basis: "derivato", confidence: "media", source: "listino base x indice 1.40 (tariffa oraria 60 EUR/h, indice materiali 1.1)" },
    FR: { min: 425, max: 790, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.21 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 285, max: 535, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.82 (tariffa oraria 22 EUR/h, indice materiali 0.92)" }
  },
  ser_per_all: {
    CH: { min: 885, max: 1550, basis: "derivato", confidence: "media", source: "listino base x indice 1.96 (tariffa oraria 105 CHF/h, indice materiali 1.25)" },
    DE: { min: 630, max: 1100, basis: "derivato", confidence: "media", source: "listino base x indice 1.40 (tariffa oraria 60 EUR/h, indice materiali 1.1)" },
    FR: { min: 545, max: 970, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.21 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 370, max: 655, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.82 (tariffa oraria 22 EUR/h, indice materiali 0.92)" }
  },
  pia_pos_gre: {
    CH: { min: 48, max: 86, basis: "derivato", confidence: "media", source: "listino base x indice 1.91 (tariffa oraria 100 CHF/h, indice materiali 1.25)" },
    DE: { min: 40, max: 75, basis: "ricerca", confidence: "media", source: "aroundhome.de 50-80 EUR/mq; clean-invoice 35-50 posa" },
    FR: { min: 30, max: 55, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.21 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 21, max: 37, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.82 (tariffa oraria 22 EUR/h, indice materiali 0.92)" }
  },
  pia_pos_gre_gnd: {
    CH: { min: 76, max: 135, basis: "derivato", confidence: "media", source: "listino base x indice 1.91 (tariffa oraria 100 CHF/h, indice materiali 1.25)" },
    DE: { min: 54, max: 94, basis: "derivato", confidence: "media", source: "listino base x indice 1.34 (tariffa oraria 55 EUR/h, indice materiali 1.1)" },
    FR: { min: 49, max: 85, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.21 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 33, max: 57, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.82 (tariffa oraria 22 EUR/h, indice materiali 0.92)" }
  },
  pia_pos_par: {
    CH: { min: 57, max: 96, basis: "derivato", confidence: "media", source: "listino base x indice 1.91 (tariffa oraria 100 CHF/h, indice materiali 1.25)" },
    DE: { min: 40, max: 67, basis: "derivato", confidence: "media", source: "listino base x indice 1.34 (tariffa oraria 55 EUR/h, indice materiali 1.1)" },
    FR: { min: 36, max: 61, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.21 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 25, max: 41, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.82 (tariffa oraria 22 EUR/h, indice materiali 0.92)" }
  },
  pia_pos_lam: {
    CH: { min: 34, max: 57, basis: "derivato", confidence: "media", source: "listino base x indice 1.91 (tariffa oraria 100 CHF/h, indice materiali 1.25)" },
    DE: { min: 24, max: 40, basis: "derivato", confidence: "media", source: "listino base x indice 1.34 (tariffa oraria 55 EUR/h, indice materiali 1.1)" },
    FR: { min: 22, max: 36, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.21 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 15.0, max: 25, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.82 (tariffa oraria 22 EUR/h, indice materiali 0.92)" }
  },
  pia_pos_riv: {
    CH: { min: 57, max: 96, basis: "derivato", confidence: "media", source: "listino base x indice 1.91 (tariffa oraria 100 CHF/h, indice materiali 1.25)" },
    DE: { min: 40, max: 67, basis: "derivato", confidence: "media", source: "listino base x indice 1.34 (tariffa oraria 55 EUR/h, indice materiali 1.1)" },
    FR: { min: 36, max: 61, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.21 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 25, max: 41, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.82 (tariffa oraria 22 EUR/h, indice materiali 0.92)" }
  },
  pia_pos_mos: {
    CH: { min: 96, max: 170, basis: "derivato", confidence: "media", source: "listino base x indice 1.91 (tariffa oraria 100 CHF/h, indice materiali 1.25)" },
    DE: { min: 67, max: 120, basis: "derivato", confidence: "media", source: "listino base x indice 1.34 (tariffa oraria 55 EUR/h, indice materiali 1.1)" },
    FR: { min: 61, max: 110, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.21 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 41, max: 74, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.82 (tariffa oraria 22 EUR/h, indice materiali 0.92)" }
  },
  pia_pos_bat: {
    CH: { min: 11.5, max: 23, basis: "derivato", confidence: "media", source: "listino base x indice 1.91 (tariffa oraria 100 CHF/h, indice materiali 1.25)" },
    DE: { min: 8.0, max: 16.0, basis: "derivato", confidence: "media", source: "listino base x indice 1.34 (tariffa oraria 55 EUR/h, indice materiali 1.1)" },
    FR: { min: 7.5, max: 14.5, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.21 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 5.0, max: 10.0, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.82 (tariffa oraria 22 EUR/h, indice materiali 0.92)" }
  },
  pia_pos_bat_leg: {
    CH: { min: 9.5, max: 19.0, basis: "derivato", confidence: "media", source: "listino base x indice 1.91 (tariffa oraria 100 CHF/h, indice materiali 1.25)" },
    DE: { min: 6.5, max: 13.5, basis: "derivato", confidence: "media", source: "listino base x indice 1.34 (tariffa oraria 55 EUR/h, indice materiali 1.1)" },
    FR: { min: 6.0, max: 12.0, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.21 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 4.0, max: 8.0, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.82 (tariffa oraria 22 EUR/h, indice materiali 0.92)" }
  },
  pia_rim_pav: {
    CH: { min: 38, max: 67, basis: "derivato", confidence: "media", source: "listino base x indice 1.91 (tariffa oraria 100 CHF/h, indice materiali 1.25)" },
    DE: { min: 18, max: 32, basis: "ricerca", confidence: "media", source: "aroundhome.de/clean-invoice: rimozione piastrelle 15-30 EUR/mq" },
    FR: { min: 24, max: 43, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.21 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 16.5, max: 29, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.82 (tariffa oraria 22 EUR/h, indice materiali 0.92)" }
  },
  pia_rea_mas: {
    CH: { min: 34, max: 57, basis: "derivato", confidence: "media", source: "listino base x indice 1.91 (tariffa oraria 100 CHF/h, indice materiali 1.25)" },
    DE: { min: 24, max: 40, basis: "derivato", confidence: "media", source: "listino base x indice 1.34 (tariffa oraria 55 EUR/h, indice materiali 1.1)" },
    FR: { min: 22, max: 36, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.21 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 15.0, max: 25, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.82 (tariffa oraria 22 EUR/h, indice materiali 0.92)" }
  },
  pia_liv_aut: {
    CH: { min: 19.0, max: 34, basis: "derivato", confidence: "media", source: "listino base x indice 1.91 (tariffa oraria 100 CHF/h, indice materiali 1.25)" },
    DE: { min: 13.5, max: 24, basis: "derivato", confidence: "media", source: "listino base x indice 1.34 (tariffa oraria 55 EUR/h, indice materiali 1.1)" },
    FR: { min: 12.0, max: 22, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.21 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 8.0, max: 15.0, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.82 (tariffa oraria 22 EUR/h, indice materiali 0.92)" }
  },
  pia_imp_doc: {
    CH: { min: 230, max: 480, basis: "derivato", confidence: "media", source: "listino base x indice 1.91 (tariffa oraria 100 CHF/h, indice materiali 1.25)" },
    DE: { min: 160, max: 335, basis: "derivato", confidence: "media", source: "listino base x indice 1.34 (tariffa oraria 55 EUR/h, indice materiali 1.1)" },
    FR: { min: 145, max: 305, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.21 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 99, max: 205, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.82 (tariffa oraria 22 EUR/h, indice materiali 0.92)" }
  },
  pia_imp_bal: {
    CH: { min: 48, max: 86, basis: "derivato", confidence: "media", source: "listino base x indice 1.91 (tariffa oraria 100 CHF/h, indice materiali 1.25)" },
    DE: { min: 34, max: 60, basis: "derivato", confidence: "media", source: "listino base x indice 1.34 (tariffa oraria 55 EUR/h, indice materiali 1.1)" },
    FR: { min: 30, max: 55, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.21 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 21, max: 37, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.82 (tariffa oraria 22 EUR/h, indice materiali 0.92)" }
  },
  pia_luc_mar: {
    CH: { min: 57, max: 105, basis: "derivato", confidence: "media", source: "listino base x indice 1.91 (tariffa oraria 100 CHF/h, indice materiali 1.25)" },
    DE: { min: 40, max: 74, basis: "derivato", confidence: "media", source: "listino base x indice 1.34 (tariffa oraria 55 EUR/h, indice materiali 1.1)" },
    FR: { min: 36, max: 67, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.21 (tariffa oraria 45 EUR/h, indice materiali 1.1)" },
    ES: { min: 25, max: 45, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.82 (tariffa oraria 22 EUR/h, indice materiali 0.92)" }
  },
  idr_rif_bag: {
    CH: { min: 5800, max: 10650, basis: "derivato", confidence: "media", source: "listino base x indice 1.94 (tariffa oraria 112 CHF/h, indice materiali 1.25)" },
    DE: { min: 4500, max: 8250, basis: "derivato", confidence: "media", source: "listino base x indice 1.50 (tariffa oraria 75 EUR/h, indice materiali 1.1)" },
    FR: { min: 3650, max: 6750, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.22 (tariffa oraria 50 EUR/h, indice materiali 1.1)" },
    ES: { min: 2500, max: 4600, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.83 (tariffa oraria 25 EUR/h, indice materiali 0.92)" }
  },
  idr_pon_idr: {
    CH: { min: 350, max: 675, basis: "derivato", confidence: "media", source: "listino base x indice 1.94 (tariffa oraria 112 CHF/h, indice materiali 1.25)" },
    DE: { min: 270, max: 525, basis: "derivato", confidence: "media", source: "listino base x indice 1.50 (tariffa oraria 75 EUR/h, indice materiali 1.1)" },
    FR: { min: 220, max: 430, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.22 (tariffa oraria 50 EUR/h, indice materiali 1.1)" },
    ES: { min: 150, max: 290, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.83 (tariffa oraria 25 EUR/h, indice materiali 0.92)" }
  },
  idr_sos_cal: {
    CH: { min: 2900, max: 5400, basis: "derivato", confidence: "media", source: "listino base x indice 1.94 (tariffa oraria 112 CHF/h, indice materiali 1.25)" },
    DE: { min: 2250, max: 4200, basis: "derivato", confidence: "media", source: "listino base x indice 1.50 (tariffa oraria 75 EUR/h, indice materiali 1.1)" },
    FR: { min: 1850, max: 3450, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.22 (tariffa oraria 50 EUR/h, indice materiali 1.1)" },
    ES: { min: 1250, max: 2350, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.83 (tariffa oraria 25 EUR/h, indice materiali 0.92)" }
  },
  idr_ins_pomp: {
    CH: { min: 24000, max: 42000, basis: "ricerca", confidence: "media", source: "Raiffeisen.ch: pompa di calore aria-acqua CHF 32200 (fornitura+posa, casa 200 mq)" },
    DE: { min: 18000, max: 40000, basis: "ricerca", confidence: "media", source: "utopia.de: 160 offerte 21-54k EUR (media 36k); aroundhome 22-35k" },
    FR: { min: 15000, max: 34000, basis: "ricerca", confidence: "bassa", source: "derivato da DE x0.85, nessuna fonte FR consultata" },
    ES: { min: 13500, max: 30000, basis: "ricerca", confidence: "bassa", source: "derivato da DE x0.75, nessuna fonte ES consultata" },
    IT: { min: 11000, max: 24000, basis: "ricerca", confidence: "bassa", source: "derivato da DE x0.6: il listino base IT 3500-6500 copre solo la posa, non la fornitura" }
  },
  idr_ris_pav: {
    CH: { min: 87, max: 145, basis: "derivato", confidence: "media", source: "listino base x indice 1.94 (tariffa oraria 112 CHF/h, indice materiali 1.25)" },
    DE: { min: 68, max: 115, basis: "derivato", confidence: "media", source: "listino base x indice 1.50 (tariffa oraria 75 EUR/h, indice materiali 1.1)" },
    FR: { min: 55, max: 92, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.22 (tariffa oraria 50 EUR/h, indice materiali 1.1)" },
    ES: { min: 38, max: 63, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.83 (tariffa oraria 25 EUR/h, indice materiali 0.92)" }
  },
  idr_def_ter: {
    CH: { min: 485, max: 870, basis: "derivato", confidence: "media", source: "listino base x indice 1.94 (tariffa oraria 112 CHF/h, indice materiali 1.25)" },
    DE: { min: 375, max: 675, basis: "derivato", confidence: "media", source: "listino base x indice 1.50 (tariffa oraria 75 EUR/h, indice materiali 1.1)" },
    FR: { min: 305, max: 550, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.22 (tariffa oraria 50 EUR/h, indice materiali 1.1)" },
    ES: { min: 210, max: 375, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.83 (tariffa oraria 25 EUR/h, indice materiali 0.92)" }
  },
  idr_ins_con: {
    CH: { min: 675, max: 1150, basis: "derivato", confidence: "media", source: "listino base x indice 1.94 (tariffa oraria 112 CHF/h, indice materiali 1.25)" },
    DE: { min: 525, max: 900, basis: "derivato", confidence: "media", source: "listino base x indice 1.50 (tariffa oraria 75 EUR/h, indice materiali 1.1)" },
    FR: { min: 430, max: 735, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.22 (tariffa oraria 50 EUR/h, indice materiali 1.1)" },
    ES: { min: 290, max: 500, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.83 (tariffa oraria 25 EUR/h, indice materiali 0.92)" }
  },
  idr_ins_con_mul: {
    CH: { min: 1250, max: 2150, basis: "derivato", confidence: "media", source: "listino base x indice 1.94 (tariffa oraria 112 CHF/h, indice materiali 1.25)" },
    DE: { min: 975, max: 1650, basis: "derivato", confidence: "media", source: "listino base x indice 1.50 (tariffa oraria 75 EUR/h, indice materiali 1.1)" },
    FR: { min: 795, max: 1350, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.22 (tariffa oraria 50 EUR/h, indice materiali 1.1)" },
    ES: { min: 540, max: 920, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.83 (tariffa oraria 25 EUR/h, indice materiali 0.92)" }
  },
  idr_sos_mis: {
    CH: { min: 115, max: 230, basis: "derivato", confidence: "media", source: "listino base x indice 1.94 (tariffa oraria 112 CHF/h, indice materiali 1.25)" },
    DE: { min: 90, max: 180, basis: "derivato", confidence: "media", source: "listino base x indice 1.50 (tariffa oraria 75 EUR/h, indice materiali 1.1)" },
    FR: { min: 73, max: 145, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.22 (tariffa oraria 50 EUR/h, indice materiali 1.1)" },
    ES: { min: 50, max: 100, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.83 (tariffa oraria 25 EUR/h, indice materiali 0.92)" }
  },
  idr_mon_wc: {
    CH: { min: 290, max: 540, basis: "derivato", confidence: "media", source: "listino base x indice 1.94 (tariffa oraria 112 CHF/h, indice materiali 1.25)" },
    DE: { min: 225, max: 420, basis: "derivato", confidence: "media", source: "listino base x indice 1.50 (tariffa oraria 75 EUR/h, indice materiali 1.1)" },
    FR: { min: 185, max: 345, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.22 (tariffa oraria 50 EUR/h, indice materiali 1.1)" },
    ES: { min: 125, max: 235, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.83 (tariffa oraria 25 EUR/h, indice materiali 0.92)" }
  },
  idr_ins_box: {
    CH: { min: 350, max: 675, basis: "derivato", confidence: "media", source: "listino base x indice 1.94 (tariffa oraria 112 CHF/h, indice materiali 1.25)" },
    DE: { min: 270, max: 525, basis: "derivato", confidence: "media", source: "listino base x indice 1.50 (tariffa oraria 75 EUR/h, indice materiali 1.1)" },
    FR: { min: 220, max: 430, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.22 (tariffa oraria 50 EUR/h, indice materiali 1.1)" },
    ES: { min: 150, max: 290, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.83 (tariffa oraria 25 EUR/h, indice materiali 0.92)" }
  },
  idr_sos_sca: {
    CH: { min: 485, max: 870, basis: "derivato", confidence: "media", source: "listino base x indice 1.94 (tariffa oraria 112 CHF/h, indice materiali 1.25)" },
    DE: { min: 375, max: 675, basis: "derivato", confidence: "media", source: "listino base x indice 1.50 (tariffa oraria 75 EUR/h, indice materiali 1.1)" },
    FR: { min: 305, max: 550, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.22 (tariffa oraria 50 EUR/h, indice materiali 1.1)" },
    ES: { min: 210, max: 375, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.83 (tariffa oraria 25 EUR/h, indice materiali 0.92)" }
  },
  idr_ins_add: {
    CH: { min: 1550, max: 2900, basis: "derivato", confidence: "media", source: "listino base x indice 1.94 (tariffa oraria 112 CHF/h, indice materiali 1.25)" },
    DE: { min: 1200, max: 2250, basis: "derivato", confidence: "media", source: "listino base x indice 1.50 (tariffa oraria 75 EUR/h, indice materiali 1.1)" },
    FR: { min: 980, max: 1850, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.22 (tariffa oraria 50 EUR/h, indice materiali 1.1)" },
    ES: { min: 665, max: 1250, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.83 (tariffa oraria 25 EUR/h, indice materiali 0.92)" }
  },
  ele_rif_imp: {
    CH: { min: 99, max: 170, basis: "derivato", confidence: "media", source: "listino base x indice 1.98 (tariffa oraria 117 CHF/h, indice materiali 1.25)" },
    DE: { min: 72, max: 125, basis: "derivato", confidence: "media", source: "listino base x indice 1.45 (tariffa oraria 70 EUR/h, indice materiali 1.1)" },
    FR: { min: 61, max: 105, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.22 (tariffa oraria 50 EUR/h, indice materiali 1.1)" },
    ES: { min: 42, max: 71, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.83 (tariffa oraria 25 EUR/h, indice materiali 0.92)" }
  },
  ele_tag_tru: {
    CH: { min: 30, max: 56, basis: "derivato", confidence: "media", source: "listino base x indice 1.98 (tariffa oraria 117 CHF/h, indice materiali 1.25)" },
    DE: { min: 22, max: 41, basis: "derivato", confidence: "media", source: "listino base x indice 1.45 (tariffa oraria 70 EUR/h, indice materiali 1.1)" },
    FR: { min: 18.5, max: 34, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.22 (tariffa oraria 50 EUR/h, indice materiali 1.1)" },
    ES: { min: 12.5, max: 23, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.83 (tariffa oraria 25 EUR/h, indice materiali 0.92)" }
  },
  ele_ins_qua: {
    CH: { min: 1200, max: 3800, basis: "ricerca", confidence: "media", source: "handwerker-kosten.ch/elektriker: sostituzione quadro CHF 1200-5000 (media 2500)" },
    DE: { min: 505, max: 870, basis: "derivato", confidence: "media", source: "listino base x indice 1.45 (tariffa oraria 70 EUR/h, indice materiali 1.1)" },
    FR: { min: 430, max: 735, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.22 (tariffa oraria 50 EUR/h, indice materiali 1.1)" },
    ES: { min: 290, max: 500, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.83 (tariffa oraria 25 EUR/h, indice materiali 0.92)" }
  },
  ele_sos_sal: {
    CH: { min: 160, max: 300, basis: "derivato", confidence: "media", source: "listino base x indice 1.98 (tariffa oraria 117 CHF/h, indice materiali 1.25)" },
    DE: { min: 115, max: 215, basis: "derivato", confidence: "media", source: "listino base x indice 1.45 (tariffa oraria 70 EUR/h, indice materiali 1.1)" },
    FR: { min: 98, max: 185, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.22 (tariffa oraria 50 EUR/h, indice materiali 1.1)" },
    ES: { min: 67, max: 125, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.83 (tariffa oraria 25 EUR/h, indice materiali 0.92)" }
  },
  ele_ins_cit: {
    CH: { min: 495, max: 990, basis: "derivato", confidence: "media", source: "listino base x indice 1.98 (tariffa oraria 117 CHF/h, indice materiali 1.25)" },
    DE: { min: 360, max: 725, basis: "derivato", confidence: "media", source: "listino base x indice 1.45 (tariffa oraria 70 EUR/h, indice materiali 1.1)" },
    FR: { min: 305, max: 610, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.22 (tariffa oraria 50 EUR/h, indice materiali 1.1)" },
    ES: { min: 210, max: 415, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.83 (tariffa oraria 25 EUR/h, indice materiali 0.92)" }
  },
  ele_ins_all: {
    CH: { min: 1600, max: 3000, basis: "derivato", confidence: "media", source: "listino base x indice 1.98 (tariffa oraria 117 CHF/h, indice materiali 1.25)" },
    DE: { min: 1150, max: 2150, basis: "derivato", confidence: "media", source: "listino base x indice 1.45 (tariffa oraria 70 EUR/h, indice materiali 1.1)" },
    FR: { min: 980, max: 1850, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.22 (tariffa oraria 50 EUR/h, indice materiali 1.1)" },
    ES: { min: 665, max: 1250, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.83 (tariffa oraria 25 EUR/h, indice materiali 0.92)" }
  },
  ele_ins_vid: {
    CH: { min: 1800, max: 3550, basis: "derivato", confidence: "media", source: "listino base x indice 1.98 (tariffa oraria 117 CHF/h, indice materiali 1.25)" },
    DE: { min: 1300, max: 2600, basis: "derivato", confidence: "media", source: "listino base x indice 1.45 (tariffa oraria 70 EUR/h, indice materiali 1.1)" },
    FR: { min: 1100, max: 2200, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.22 (tariffa oraria 50 EUR/h, indice materiali 1.1)" },
    ES: { min: 750, max: 1500, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.83 (tariffa oraria 25 EUR/h, indice materiali 0.92)" }
  },
  ele_mon_pla: {
    CH: { min: 120, max: 350, basis: "ricerca", confidence: "media", source: "handwerker-kosten.ch/elektriker: montaggio lampada CHF 150-400" },
    DE: { min: 36, max: 65, basis: "derivato", confidence: "media", source: "listino base x indice 1.45 (tariffa oraria 70 EUR/h, indice materiali 1.1)" },
    FR: { min: 31, max: 55, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.22 (tariffa oraria 50 EUR/h, indice materiali 1.1)" },
    ES: { min: 21, max: 38, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.83 (tariffa oraria 25 EUR/h, indice materiali 0.92)" }
  },
  ele_pos_led: {
    CH: { min: 36, max: 69, basis: "derivato", confidence: "media", source: "listino base x indice 1.98 (tariffa oraria 117 CHF/h, indice materiali 1.25)" },
    DE: { min: 26, max: 51, basis: "derivato", confidence: "media", source: "listino base x indice 1.45 (tariffa oraria 70 EUR/h, indice materiali 1.1)" },
    FR: { min: 22, max: 43, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.22 (tariffa oraria 50 EUR/h, indice materiali 1.1)" },
    ES: { min: 15.0, max: 29, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.83 (tariffa oraria 25 EUR/h, indice materiali 0.92)" }
  },
  ele_ins_wall: {
    CH: { min: 795, max: 1600, basis: "derivato", confidence: "media", source: "listino base x indice 1.98 (tariffa oraria 117 CHF/h, indice materiali 1.25)" },
    DE: { min: 580, max: 1150, basis: "derivato", confidence: "media", source: "listino base x indice 1.45 (tariffa oraria 70 EUR/h, indice materiali 1.1)" },
    FR: { min: 490, max: 980, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.22 (tariffa oraria 50 EUR/h, indice materiali 1.1)" },
    ES: { min: 335, max: 665, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.83 (tariffa oraria 25 EUR/h, indice materiali 0.92)" }
  },
  ele_dom_bas: {
    CH: { min: 120, max: 240, basis: "derivato", confidence: "media", source: "listino base x indice 1.98 (tariffa oraria 117 CHF/h, indice materiali 1.25)" },
    DE: { min: 87, max: 175, basis: "derivato", confidence: "media", source: "listino base x indice 1.45 (tariffa oraria 70 EUR/h, indice materiali 1.1)" },
    FR: { min: 73, max: 145, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.22 (tariffa oraria 50 EUR/h, indice materiali 1.1)" },
    ES: { min: 50, max: 100, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.83 (tariffa oraria 25 EUR/h, indice materiali 0.92)" }
  },
  ele_imp_ter: {
    CH: { min: 300, max: 595, basis: "derivato", confidence: "media", source: "listino base x indice 1.98 (tariffa oraria 117 CHF/h, indice materiali 1.25)" },
    DE: { min: 215, max: 435, basis: "derivato", confidence: "media", source: "listino base x indice 1.45 (tariffa oraria 70 EUR/h, indice materiali 1.1)" },
    FR: { min: 185, max: 365, basis: "derivato", confidence: "bassa", source: "listino base x indice 1.22 (tariffa oraria 50 EUR/h, indice materiali 1.1)" },
    ES: { min: 125, max: 250, basis: "derivato", confidence: "bassa", source: "listino base x indice 0.83 (tariffa oraria 25 EUR/h, indice materiali 0.92)" }
  }
};

export function getCountryPrice(itemId: string, countryId: string): ItemCountryPrice | null {
  return ITEM_PRICES[itemId]?.[countryId] || null;
}

export function getMaterialIndex(countryId: string): number {
  return COUNTRIES_DATA[countryId]?.materialIndex ?? 1.0;
}

export function getHourlyRate(countryId: string, sectorId: SectorId): number | null {
  return COUNTRIES_DATA[countryId]?.hourlyRates[sectorId] ?? null;
}
