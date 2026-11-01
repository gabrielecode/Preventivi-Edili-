export interface CountryConfig {
  id: string;
  name: string;
  flag: string;
  currency: string;
  currencySymbol: string;
  defaultVat: number;
  vatOptions: Array<{ label: string; value: number }>;
  regulatoryContext: string;
  standardHourlyLaborRate: number;
  standardTravelCost: number;
  materialVatRate: number;
  materialIndex: number;
  priceBaseNote: string;
}

export const countriesList: CountryConfig[] = [
  {
    id: "IT",
    name: "Italia",
    flag: "🇮🇹",
    currency: "EUR",
    currencySymbol: "€",
    defaultVat: 10,
    vatOptions: [
      { label: "4% (Agevolata Prima Casa)", value: 4 },
      { label: "10% (Ristrutturazioni / Manutenzioni)", value: 10 },
      { label: "22% (Ordinaria / Fornitura beni)", value: 22 }
    ],
    regulatoryContext: "Conformità alle leggi italiane (es. D.M. 37/08 per impianti, asseverazioni ENEA, rispetto norme UNI 11493 per piastrelle e UNI 11673 per serramenti, smaltimento ecologico con codice CER e Formulario Identificazione Rifiuti - F.I.R.).",
    standardHourlyLaborRate: 30,
    standardTravelCost: 80,
    materialVatRate: 22,
    materialIndex: 1.00,
    priceBaseNote: "Valori indicativi da validare con prezzari ufficiali"
  },
  {
    id: "CH",
    name: "Svizzera",
    flag: "🇨🇭",
    currency: "CHF",
    currencySymbol: "CHF",
    defaultVat: 8.1,
    vatOptions: [
      { label: "2.6% (Aliquota ridotta)", value: 2.6 },
      { label: "8.1% (Aliquota normale - in vigore dal 2024)", value: 8.1 }
    ],
    regulatoryContext: "Normative tecniche svizzere SIA (Società Svizzera degli Ingegneri e degli Architetti), in particolare SIA 118 (Condizioni generali per l'esecuzione di lavori di costruzione) e SIA 248 (Lavori di pittura e gessatura). Garanzie e asseverazioni a norma svizzera cantonale.",
    standardHourlyLaborRate: 105,
    standardTravelCost: 70,
    materialVatRate: 8.1,
    materialIndex: 1.25,
    priceBaseNote: "Valori indicativi da validare con prezzari ufficiali"
  },
  {
    id: "DE",
    name: "Germania",
    flag: "🇩🇪",
    currency: "EUR",
    currencySymbol: "€",
    defaultVat: 19,
    vatOptions: [
      { label: "7% (Satz ermäßigt)", value: 7 },
      { label: "19% (Regelsatz USt)", value: 19 }
    ],
    regulatoryContext: "Normative tecniche tedesche DIN (Deutsches Institut für Normung), conformità alle VOB/B (Vergabe- und Vertragsordnung für Bauleistungen), regolamenti antincendio federali e smaltimento rifiuti certificato tedesco (Abfallrecht/Kreislaufwirtschaftsgesetz).",
    standardHourlyLaborRate: 62,
    standardTravelCost: 35,
    materialVatRate: 19,
    materialIndex: 1.10,
    priceBaseNote: "Valori indicativi da validare con prezzari ufficiali"
  },
  {
    id: "FR",
    name: "Francia",
    flag: "🇫🇷",
    currency: "EUR",
    currencySymbol: "€",
    defaultVat: 10,
    vatOptions: [
      { label: "5.5% (TVA réduite - Rénovation Énergétique)", value: 5.5 },
      { label: "10% (TVA intermédiaire - Travaux Rénovation)", value: 10 },
      { label: "20% (TVA normale)", value: 20 }
    ],
    regulatoryContext: "Rispetto dei documenti tecnici NF DTU (Documents Techniques Uniques), certificazione di garanzia decennale obbligatoria (Assurance Décennale), requisiti ambientali RE2020 e rispetto norme di sicurezza RGE (Reconnu Garant de l'Environnement) per incentivi.",
    standardHourlyLaborRate: 48,
    standardTravelCost: 90,
    materialVatRate: 20,
    materialIndex: 1.10,
    priceBaseNote: "Valori indicativi da validare con prezzari ufficiali"
  },
  {
    id: "ES",
    name: "Spagna",
    flag: "🇪🇸",
    currency: "EUR",
    currencySymbol: "€",
    defaultVat: 10,
    vatOptions: [
      { label: "10% (IVA reducido - Obras de renovación)", value: 10 },
      { label: "21% (IVA general)", value: 21 }
    ],
    regulatoryContext: "Cumplimiento del Código Técnico de la Edificación (CTE) de España, normativa de prevención de riesgos laborales (Ley 31/1995) y acreditación RERA para sectores específicos de demolición o aislamiento.",
    standardHourlyLaborRate: 25,
    standardTravelCost: 70,
    materialVatRate: 21,
    materialIndex: 0.92,
    priceBaseNote: "Valori indicativi da validare con prezzari ufficiali"
  }
];
