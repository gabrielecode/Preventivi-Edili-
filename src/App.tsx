import React, { useState, useEffect } from "react";
import {
  Paintbrush,
  DoorOpen,
  Grid,
  Droplets,
  Zap,
  Calculator,
  Award,
  FileText,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  PlusCircle, Plus, ChevronLeft, ChevronRight,
  Sparkles,
  Euro,
  Copy,
  Check,
  FileDown,
  Info,
  Calendar,
  AlertCircle,
  RefreshCw,
  Home,
  User,
  Hammer,
  Mail,
  Send,
  X,
  Loader2,
  Clock,
  Truck,
  Building2,
  UploadCloud,
  Trash2
} from "lucide-react";
import { Sector, PriceItem, sectorPriceLists } from "./data/priceLists";
import { countriesList, CountryConfig } from "./data/countries";
import { jsPDF } from "jspdf";
import { translations } from "./data/translations";

interface SelectedItem {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  customPrice: number;
  originalMin: number;
  originalMax: number;
  isCustom?: boolean;
}

interface GeneratedQuote {
  feasibility: {
    rating: string;
    analysis: string;
    risks: string[];
    recommendations: string[];
  };
  costsBreakdown: Array<{
    item: string;
    quantity: number;
    unit: string;
    unitPrice: number;
    total: number;
    source: "listino" | "stimato";
  }>;
  estimatedTime: string;
  certifications: Array<{
    title: string;
    description: string;
    lawReference: string;
    mandatory: boolean;
  }>;
  customLetter: string;
  totalAmount: number;
}

export default function App() {
  // Country & Localization States
  const [selectedCountryId, setSelectedCountryId] = useState<string>("IT");
  
  // Sector and Client States
  const [selectedSectorId, setSelectedSectorId] = useState<string>("imbianchino");
  const [customerName, setCustomerName] = useState("");
  const [projectName, setProjectName] = useState("");
  const [workDescription, setWorkDescription] = useState("");
  const [siteDifficulty, setSiteDifficulty] = useState<"low" | "medium" | "high">("medium");
  const [materialsProvidedByCustomer, setMaterialsProvidedByCustomer] = useState(false);

  // Measurements/Dimensions depending on sector
  const [areaMq, setAreaMq] = useState<number>(0);
  const [lengthMl, setLengthMl] = useState<number>(0);
  const [quantityCad, setQuantityCad] = useState<number>(0);

  // Sector Price Items modification state
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  // System UI status
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [quoteResult, setQuoteResult] = useState<GeneratedQuote | null>(null);
  const [copied, setCopied] = useState(false);
  const [infoTab, setInfoTab] = useState<"preview" | "certifications" | "feasibility">("preview");

  // Email sending states
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailRecipient, setEmailRecipient] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState<null | "success" | "error">(null);
  const [emailStatusMsg, setEmailStatusMsg] = useState("");
  const [emailTestUrl, setEmailTestUrl] = useState<null | string>(null);

  // Client additional options
  const [ivaRate, setIvaRate] = useState<number>(10); // Managed via standard country default
  const [discountAmount, setDiscountAmount] = useState<number>(0);

  // Active Category filter (menu a tendina per sfogliare le lavorazioni estese)
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Custom Operations states
  const [priceListTab, setPriceListTab] = useState<"standard" | "custom">("standard");
  const [customItemName, setCustomItemName] = useState("");
  const [customItemUnit, setCustomItemUnit] = useState("mq");
  const [customItemPrice, setCustomItemPrice] = useState<string>("");
  const [customItemQty, setCustomItemQty] = useState<string>("");

  // Selected Language (it, de, fr, en)
  const [selectedLanguage, setSelectedLanguage] = useState<string>("it");

  // Dati dell'Impresa/Ditta Emittente (Tua Azienda)
  const [companyName, setCompanyName] = useState<string>("EdilArtigiana S.r.l.");
  const [companyVat, setCompanyVat] = useState<string>("IT12345678901");
  const [companyAddress, setCompanyAddress] = useState<string>("Via dell'Artigianato, 12 - 00100 Roma");
  const [companyPhone, setCompanyPhone] = useState<string>("+39 06 1234567");
  const [companyEmail, setCompanyEmail] = useState<string>("info@edilartigiana.it");
  const [companyWebsite, setCompanyWebsite] = useState<string>("www.edilartigiana.it");
  const [companyLogo, setCompanyLogo] = useState<string>(""); // Base64 della ditta emittente

  // Configurazione dei costi di manodopera/trasferta
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [includeExplicitLabor, setIncludeExplicitLabor] = useState(true);
  const [laborHourlyRate, setLaborHourlyRate] = useState<number>(30);
  const [laborHours, setLaborHours] = useState<number>(16);
  const [travelCosts, setTravelCosts] = useState<number>(80);
  const [setupOverheadCosts, setSetupOverheadCosts] = useState<number>(120);

  // Load selected country details
  const activeCountry = countriesList.find((c) => c.id === selectedCountryId) || countriesList[0];

  // Load current industry price list for the selected sector
  const activeSector = sectorPriceLists.find((s) => s.id === selectedSectorId) || sectorPriceLists[0];

  // Resolve current language translations
  const t = translations[selectedLanguage] || translations.it;

  // Reset selected items and inputs when sector changes to keep things intuitive and consistent
  useEffect(() => {
    // Select default items or clear
    setSelectedItems([]);
    setAreaMq(0);
    setLengthMl(0);
    setQuantityCad(0);
    setActiveCategory("all");
    setQuoteResult(null);
    setErrorMsg(null);
  }, [selectedSectorId]);

  // Sync default country tax settings when the chosen country changes
  useEffect(() => {
    setIvaRate(activeCountry.defaultVat);
    setLaborHourlyRate(activeCountry.standardHourlyLaborRate || 30);
    setTravelCosts(activeCountry.standardTravelCost || 80);
    setQuoteResult(null);
    setErrorMsg(null);
  }, [selectedCountryId, activeCountry]);

  // Handle toggling of price list items
  const handleToggleItem = (priceItem: PriceItem) => {
    const isSelected = selectedItems.find((it) => it.id === priceItem.id);
    if (isSelected) {
      setSelectedItems(selectedItems.filter((it) => it.id !== priceItem.id));
    } else {
      // Auto-suggest a default quantity based on metric or 1
      let defaultQty = 1;
      if (priceItem.unit === "mq" && areaMq > 0) defaultQty = areaMq;
      else if (priceItem.unit === "ml" && lengthMl > 0) defaultQty = lengthMl;
      else if (priceItem.unit === "cad" && quantityCad > 0) defaultQty = quantityCad;

      setSelectedItems([
        ...selectedItems,
        {
          id: priceItem.id,
          name: priceItem.name,
          unit: priceItem.unit,
          quantity: defaultQty,
          customPrice: Math.round((priceItem.minPrice + priceItem.maxPrice) / 2),
          originalMin: priceItem.minPrice,
          originalMax: priceItem.maxPrice,
        },
      ]);
    }
  };

  const handleUpdateItemQuantity = (id: string, qty: number) => {
    setSelectedItems(
      selectedItems.map((it) => (it.id === id ? { ...it, quantity: Math.max(0, qty) } : it))
    );
  };

  const handleUpdateItemPrice = (id: string, price: number) => {
    setSelectedItems(
      selectedItems.map((it) => (it.id === id ? { ...it, customPrice: Math.max(0, price) } : it))
    );
  };

  const handleRemoveItem = (id: string) => {
    setSelectedItems(selectedItems.filter((it) => it.id !== id));
  };

  const handleAddCustomItem = () => {
    if (!customItemName.trim()) return;
    const priceVal = Number(customItemPrice) || 0;
    const qtyVal = Number(customItemQty) || 1;
    
    const newItem: SelectedItem = {
      id: `custom_${Date.now()}`,
      name: customItemName.trim(),
      unit: customItemUnit,
      quantity: qtyVal,
      customPrice: priceVal,
      originalMin: priceVal,
      originalMax: priceVal,
      isCustom: true
    };

    setSelectedItems([...selectedItems, newItem]);
    
    // Reset fields
    setCustomItemName("");
    setCustomItemPrice("");
    setCustomItemQty("");
  };

  // Pre-fill metrics shortcut
  const applyMetricsToItems = () => {
    setSelectedItems(
      selectedItems.map((it) => {
        let qty = it.quantity;
        if (it.unit === "mq" && areaMq > 0) qty = areaMq;
        if (it.unit === "ml" && lengthMl > 0) qty = lengthMl;
        if (it.unit === "cad" && quantityCad > 0) qty = quantityCad;
        return { ...it, quantity: qty };
      })
    );
  };

  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      processLogoFile(file);
    }
  };

  const handleLogoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      processLogoFile(file);
    }
  };

  const processLogoFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Carica solo immagini (PNG, JPG, JPEG, SVG/WebP)");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setCompanyLogo(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    setCompanyLogo("");
  };

  // Submit form payload to our fullstack node server
  const handleGenerateQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workDescription.trim()) {
      setErrorMsg("Per favore, inserisci una breve descrizione del lavoro.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setQuoteResult(null);

    const payload = {
      workerSector: selectedSectorId,
      customerName: customerName || "Gentile Cliente",
      projectName: projectName || `Preventivo ${activeSector.name}`,
      workDescription,
      dimensions: {
        SUPERFICIE_MQ: areaMq > 0 ? areaMq : undefined,
        LUNGHEZZA_ML: lengthMl > 0 ? lengthMl : undefined,
        ELEMENTI_CAD: quantityCad > 0 ? quantityCad : undefined,
      },
      selectedItems,
      additionalNotes: `Cantiere con difficoltà ${siteDifficulty}. Materiali forniti dal cliente: ${materialsProvidedByCustomer ? "Sì" : "No"}`,
      siteDifficulty,
      materialsProvidedByCustomer,
      countryCode: selectedCountryId,
      laborConfig: includeExplicitLabor ? {
        hourlyRate: laborHourlyRate,
        estimatedHours: laborHours,
        travelCosts: travelCosts,
        setupOverheadCosts: setupOverheadCosts,
      } : undefined,
      language: selectedLanguage,
    };

    try {
      const response = await fetch("/api/generate-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Errore nel caricamento del preventivo.");
      }

      const data: GeneratedQuote = await response.json();
      setQuoteResult(data);
      setInfoTab("preview");
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Errore sconosciuto durante la connessione con l'AI.");
    } finally {
      setLoading(false);
    }
  };

  const calculateSubtotalList = () => {
    return selectedItems.reduce((acc, item) => acc + item.customPrice * item.quantity, 0);
  };

  const copyToClipboard = () => {
    if (!quoteResult) return;
    const textToCopy = `
========================================
${quoteResult.customLetter}

----------------------------------------
SOPRALLUOGO E FEASIBILITY DI CANTIERE (${activeCountry.name} ${activeCountry.flag}):
Stato: ${quoteResult.feasibility.rating}
Analisi Tecnica: ${quoteResult.feasibility.analysis}

FATTIBILITÀ & RISCHI INDIVIDUATI:
${quoteResult.feasibility.risks.map((r) => `- [!] ${r}`).join("\n")}

RACCOMANDAZIONI PROFESSIONALI:
${quoteResult.feasibility.recommendations.map((rec) => `- ${rec}`).join("\n")}

----------------------------------------
DETTAGLIO COSTI (Valuta: ${activeCountry.currencySymbol}):
${quoteResult.costsBreakdown
  .map(
    (c) =>
      `- ${c.item}: Qta: ${c.quantity} ${c.unit} | Prezzo unitario: ${c.unitPrice} ${activeCountry.currencySymbol} | Totale parziale: ${c.total} ${activeCountry.currencySymbol} (${
        c.source === "listino" ? "Da listino di settore" : "Fascia stimata AI"
      })`
  )
  .join("\n")}

Detrazioni & Ritenute applicate:
- Sconto ditta: -${discountAmount} ${activeCountry.currencySymbol}
- Aliquota d'Imposta (IVA): ${ivaRate}%

IMPONIBILE CONSUNTIVATO: ${(quoteResult.totalAmount - discountAmount).toFixed(2)} ${activeCountry.currencySymbol}
TOTALE COMPLESSIVO (IVA inclusa): ${(
      (quoteResult.totalAmount - discountAmount) *
      (1 + ivaRate / 100)
    ).toFixed(2)} ${activeCountry.currencySymbol}

DURATA INTERVENTO STIMATA: ${quoteResult.estimatedTime}

----------------------------------------
CERTIFICAZIONI & REQUISITI LEGALI APPLICABILI (${activeCountry.name}):
${quoteResult.certifications
  .map(
    (c) =>
      `- ${c.title} [Rif: ${c.lawReference}] ${c.mandatory ? "(OBBLIGATORIA)" : "(Raccomandata)"}\n  Info: ${c.description}`
  )
  .join("\n")}
========================================
`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const buildPDFDocument = (): jsPDF | null => {
    if (!quoteResult) return null;

    // Initialise PDF
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    const pageHeight = 297;
    const pageWidth = 210;
    const margin = 18;
    const contentWidth = pageWidth - (margin * 2);
    let y = 15;

    const drawHeaderBackground = () => {
      // Draw top header accent
      doc.setFillColor(30, 41, 59); // Slate 800
      doc.rect(0, 0, pageWidth, 8, "F");
    };

    const drawFooter = () => {
      const pageCount = (doc as any).internal.getNumberOfPages();
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184); // slate-400
      doc.text(
        `Preventivatore Edile AI - Generato in ${activeCountry.name} (${activeCountry.flag}) | Pagina ${pageCount}`,
        margin,
        pageHeight - 8
      );
      doc.text(
        `Lettera e computo metrico con valore legale locale. Riserva d'opera.`,
        pageWidth - margin,
        pageHeight - 8,
        { align: "right" }
      );
    };

    const checkSpace = (needed: number) => {
      if (y + needed > pageHeight - 15) {
        doc.addPage();
        drawFooter();
        drawHeaderBackground();
        y = 25; // Reset y for new page
      }
    };

    // Draw background header accent for initial page
    drawHeaderBackground();

    // 1. Header Information Grid (Con supporto per logo azienda emittente)
    let headerLogoHeight = 0;
    if (companyLogo) {
      try {
        let format = "PNG";
        if (companyLogo.includes("image/jpeg") || companyLogo.includes("image/jpg")) {
          format = "JPEG";
        } else if (companyLogo.includes("image/gif")) {
          format = "GIF";
        } else if (companyLogo.includes("image/webp")) {
          format = "WEBP";
        }
        
        // Disegna il logo posizionato in alto a sinistra (larghezza 32mm, altezza 16mm max)
        doc.addImage(companyLogo, format, margin, y + 1, 32, 16);
        headerLogoHeight = 18;
      } catch (err) {
        console.error("Errore aggiunta logo ditta nel PDF:", err);
      }
    }

    // Titolo preventivo a destra dello spazio (se c'è logo) o interamente a sinistra
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(30, 41, 59); // slate-800
    
    const titleX = companyLogo ? margin + 38 : margin;
    doc.text("PREVENTIVO PROFESSIONALE", titleX, y + 7);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139); // slate-500
    doc.text(`Identificativo: RIS-2026-${Math.floor(1000 + Math.random() * 9000)}`, titleX, y + 12);
    doc.text(`Data Emissione: ${new Date().toLocaleDateString("it-IT")}`, pageWidth - margin, y + 7, { align: "right" });

    y += Math.max(16, headerLogoHeight) + 4;

    // Separator line
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.setLineWidth(0.5);
    doc.line(margin, y, pageWidth - margin, y);
    y += 6;

    // Double-column soggetti: EMITTENTE vs COMMITTENTE
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(71, 85, 105); // slate-600
    doc.text("EMITTENTE (PRESTATORE D'OPERA):", margin, y + 3);
    doc.text("COMMITTENTE & SITO OPERA:", 110, y + 3);
    y += 8;

    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);

    // Dati Mittente (Sinistra)
    doc.setFont("helvetica", "bold");
    doc.text(companyName || "Professionista Edile", margin, y);
    
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139); // slate-500
    let vatText = `P.IVA/CF: ${companyVat || "Non specificata"}`;
    doc.text(vatText, margin, y + 4.5);
    
    let addrLines = doc.splitTextToSize(companyAddress || "Sede non indicata", 80);
    doc.text(addrLines, margin, y + 9);
    
    let contactLinesText = `Tel: ${companyPhone || "Non indicato"}\nEmail: ${companyEmail || "Non indicata"}`;
    if (companyWebsite) {
      contactLinesText += `\nSito Web: ${companyWebsite}`;
    }
    const contactLines = doc.splitTextToSize(contactLinesText, 80);
    doc.text(contactLines, margin, y + 9 + (addrLines.length * 4.5));

    // Dati Committente (Destra)
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30, 41, 59);
    doc.text("CLIENTE:", 110, y);
    doc.setFont("helvetica", "normal");
    doc.text(customerName || "Gentile Cliente", 132, y);

    doc.setFont("helvetica", "bold");
    doc.text("PROGETTO:", 110, y + 4.5);
    doc.setFont("helvetica", "normal");
    const projLines = doc.splitTextToSize(projectName || "Intervento Generale", 62);
    doc.text(projLines, 132, y + 4.5);

    const clientOffsetY = Math.max(9, 4.5 + projLines.length * 4.5);

    doc.setFont("helvetica", "bold");
    doc.text("SETTORE:", 110, y + clientOffsetY);
    doc.setFont("helvetica", "normal");
    doc.text(activeSector.name.toUpperCase(), 132, y + clientOffsetY);

    doc.setFont("helvetica", "bold");
    doc.text("PAESE:", 110, y + clientOffsetY + 4.5);
    doc.setFont("helvetica", "normal");
    doc.text(`${activeCountry.name} ${activeCountry.flag}`, 132, y + clientOffsetY + 4.5);

    doc.setFont("helvetica", "bold");
    doc.text("REGIME IVA:", 110, y + clientOffsetY + 9);
    doc.setFont("helvetica", "normal");
    doc.text(`${ivaRate}% (${activeCountry.currency})`, 132, y + clientOffsetY + 9);

    // Calcoliamo la y finale basandoci sul blocco più lungo tra sinistra e destra
    const leftBlockHeight = 9 + (addrLines.length * 4.5) + (contactLines.length * 4.5);
    const rightBlockHeight = clientOffsetY + 13.5;
    y += Math.max(leftBlockHeight, rightBlockHeight) + 4;

    // Boxed Section: Technical description of work
    doc.setFillColor(248, 250, 252); // slate-50 background
    doc.rect(margin, y, contentWidth, 22, "F");
    doc.setDrawColor(241, 245, 249); // slate-100
    doc.rect(margin, y, contentWidth, 22, "D");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(148, 163, 184); // slate-400
    doc.text("DESCRIZIONE DEI LAVORI RICHIESTI", margin + 4, y + 5);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85); // slate-700
    const descLines = doc.splitTextToSize(
      workDescription || "Descrizione d'opera non specificata.",
      contentWidth - 8
    );
    doc.text(descLines.slice(0, 3), margin + 4, y + 10); // Display max 3 wrap lines in header box to prevent overflow
    y += 26;

    // 2. Accompanying Custom Letter from Artisan
    checkSpace(35);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(71, 85, 105);
    doc.text("LETTERA DI PRESENTAZIONE ED OFFERTA", margin, y);
    y += 4;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    doc.setTextColor(51, 65, 85);
    const letterLines = doc.splitTextToSize(quoteResult.customLetter, contentWidth);
    
    // Draw background light tint for letter quote box
    const letterBoxHeight = letterLines.length * 4.5 + 8;
    checkSpace(letterBoxHeight + 10);
    doc.setFillColor(240, 249, 255); // light blue sky-50
    doc.rect(margin, y, contentWidth, letterBoxHeight, "F");
    // left-side blue border
    doc.setFillColor(37, 99, 235); // blue-650
    doc.rect(margin, y, 1.5, letterBoxHeight, "F");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42); // slate-900
    doc.text(letterLines, margin + 4, y + 6);
    y += letterBoxHeight + 8;

    // 3. COMPUTO METRICO ESTIMATIVO TABLE
    checkSpace(40);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(71, 85, 105);
    doc.text("COMPUTO METRICO ED ANAGRAFICA COSTI", margin, y);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text(`Tempo totale stimato per l'esecuzione: ${quoteResult.estimatedTime}`, pageWidth - margin, y, { align: "right" });
    y += 5;

    // Draw Column Headers
    doc.setFillColor(30, 41, 59); // dark slate for table header
    doc.rect(margin, y, contentWidth, 7, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text("DESCRIZIONE LAVORAZIONE / VOCE DI COSTO", margin + 2, y + 4.5);
    doc.text("QUANTITÀ", margin + 98, y + 4.5, { align: "right" });
    doc.text(`PREZZO (${activeCountry.currencySymbol})`, margin + 128, y + 4.5, { align: "right" });
    doc.text(`TOTALE (${activeCountry.currencySymbol})`, margin + 152, y + 4.5, { align: "right" });
    doc.text("FONTE", margin + 172, y + 4.5, { align: "right" });
    y += 7;

    // Table rows
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    
    quoteResult.costsBreakdown.forEach((row, index) => {
      const itemDescLines = doc.splitTextToSize(row.item, 85);
      const rowHeight = Math.max(itemDescLines.length * 4.2 + 2, 7);
      
      checkSpace(rowHeight + 10);

      // Zebra striping background
      if (index % 2 === 1) {
        doc.setFillColor(248, 250, 252);
        doc.rect(margin, y, contentWidth, rowHeight, "F");
      }
      // Light bottom line separator
      doc.setDrawColor(241, 245, 249);
      doc.setLineWidth(0.3);
      doc.line(margin, y + rowHeight, pageWidth - margin, y + rowHeight);

      doc.setTextColor(30, 41, 59);
      doc.text(itemDescLines, margin + 2, y + 4);

      doc.setTextColor(51, 65, 85);
      doc.text(`${row.quantity} ${row.unit}`, margin + 98, y + 4, { align: "right" });
      doc.text(`${row.unitPrice.toFixed(2)}`, margin + 128, y + 4, { align: "right" });
      doc.setFont("helvetica", "bold");
      doc.text(`${row.total.toFixed(2)}`, margin + 152, y + 4, { align: "right" });
      doc.setFont("helvetica", "normal");
      
      const srcText = row.source === "listino" ? "Listino" : "AI Stima";
      doc.setTextColor(100, 116, 139);
      doc.text(srcText, margin + 172, y + 4, { align: "right" });

      y += rowHeight;
    });

    // 4. FINANCIAL SUMMARY
    const summaryNeeded = 35;
    checkSpace(summaryNeeded);
    
    // Draw subtotal block
    y += 4;
    const summaryBoxX = pageWidth - margin - 75;
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.5);
    doc.line(summaryBoxX, y, pageWidth - margin, y);
    y += 4;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text("Lavorazioni Subtotale:", summaryBoxX, y);
    doc.setFont("helvetica", "bold");
    doc.text(`${quoteResult.totalAmount.toFixed(2)} ${activeCountry.currencySymbol}`, pageWidth - margin, y, { align: "right" });
    y += 4.5;

    doc.setFont("helvetica", "normal");
    doc.text(`Sconto Applicato ditta:`, summaryBoxX, y);
    doc.setFont("helvetica", "bold");
    doc.text(`-${discountAmount.toFixed(2)} ${activeCountry.currencySymbol}`, pageWidth - margin, y, { align: "right" });
    y += 4.5;

    const baseImponibile = quoteResult.totalAmount - discountAmount;
    doc.setFont("helvetica", "normal");
    doc.text("Base Imponibile Lorda:", summaryBoxX, y);
    doc.setFont("helvetica", "bold");
    doc.text(`${baseImponibile.toFixed(2)} ${activeCountry.currencySymbol}`, pageWidth - margin, y, { align: "right" });
    y += 4.5;

    const taxAmount = baseImponibile * (ivaRate / 100);
    doc.setFont("helvetica", "normal");
    doc.text(`Imposta Valore Aggiunto (IVA ${ivaRate}%):`, summaryBoxX, y);
    doc.setFont("helvetica", "bold");
    doc.text(`${taxAmount.toFixed(2)} ${activeCountry.currencySymbol}`, pageWidth - margin, y, { align: "right" });
    y += 6;

    // High fidelity green outline box for Total
    const finalTotal = baseImponibile + taxAmount;
    doc.setFillColor(240, 253, 250); // green-50
    doc.rect(summaryBoxX - 2, y - 4, 75 + 2, 8.5, "F");
    doc.setDrawColor(20, 184, 166); // teal-500
    doc.rect(summaryBoxX - 2, y - 4, 75 + 2, 8.5, "D");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(13, 148, 136); // teal-600
    doc.text("TOTALE FINALE (IVA Incl.):", summaryBoxX + 1, y + 1.5);
    doc.text(`${finalTotal.toFixed(2)} ${activeCountry.currencySymbol}`, pageWidth - margin, y + 1.5, { align: "right" });
    y += 11;

    // 5. FEASIBILITY ANALYSIS & CANTIERE RISK
    checkSpace(35);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(71, 85, 105);
    doc.text("VERIFICA FATTIBILITÀ & RISCHI DI CANTIERE", margin, y);
    y += 4.5;

    // Rating Badge colored
    let ratingColor = [100, 116, 139]; // Gray
    if (quoteResult.feasibility.rating.toLowerCase().includes("non racco")) {
      ratingColor = [220, 38, 38]; // Red
    } else if (quoteResult.feasibility.rating.toLowerCase().includes("riserv")) {
      ratingColor = [217, 119, 6]; // Amber
    } else if (quoteResult.feasibility.rating.toLowerCase().includes("fattibil")) {
      ratingColor = [5, 150, 105]; // Green
    }

    doc.setFillColor(ratingColor[0], ratingColor[1], ratingColor[2]);
    doc.rect(margin, y, 42, 6, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text(quoteResult.feasibility.rating.toUpperCase(), margin + 21, y + 4.2, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text(`Analisi condotta per un livello di difficoltà: ${siteDifficulty.toUpperCase()}`, margin + 45, y + 4.2);
    y += 9;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    const analysisLines = doc.splitTextToSize(quoteResult.feasibility.analysis, contentWidth);
    doc.text(analysisLines, margin, y);
    y += analysisLines.length * 4 + 4;

    // Draw Risks / Criticita
    checkSpace(20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    doc.text("Criticità ed elementi di attenzione rilevati:", margin, y);
    y += 4;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(120, 113, 108); // slate-500
    
    quoteResult.feasibility.risks.forEach((risk) => {
      const riskLines = doc.splitTextToSize(`• ${risk}`, contentWidth - 4);
      checkSpace(riskLines.length * 4 + 2);
      doc.text(riskLines, margin + 2, y);
      y += riskLines.length * 4 + 1.5;
    });

    // Draw Recommendations
    y += 3;
    checkSpace(20);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(30, 41, 59);
    doc.text("Raccomandazioni operative e mitigazioni suggerite:", margin, y);
    y += 4;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);

    quoteResult.feasibility.recommendations.forEach((rec) => {
      const recLines = doc.splitTextToSize(`• ${rec}`, contentWidth - 4);
      checkSpace(recLines.length * 4 + 4);
      doc.text(recLines, margin + 2, y);
      y += recLines.length * 4 + 1.5;
    });

    // 6. LOCAL REGULATORY COMPLIANCE / CERTIFICATIONS
    y += 4;
    checkSpace(35);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(71, 85, 105);
    doc.text("ADEMPIMENTI NORMATIVI E CERTIFICAZIONI OBBLIGATORIE", margin, y);
    y += 5;

    quoteResult.certifications.forEach((cert) => {
      const certTitle = `${cert.title.toUpperCase()} [${cert.lawReference}]`;
      const certDesc = cert.description;
      const wrapTitle = doc.splitTextToSize(certTitle, contentWidth - 30);
      const wrapDesc = doc.splitTextToSize(certDesc, contentWidth - 10);
      
      const blockHeight = wrapTitle.length * 4.2 + wrapDesc.length * 4 + 6;
      checkSpace(blockHeight);

      // Light outline for certification block
      doc.setFillColor(248, 250, 252);
      doc.rect(margin, y, contentWidth, blockHeight, "F");
      doc.setDrawColor(226, 232, 240);
      doc.rect(margin, y, contentWidth, blockHeight, "D");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(30, 41, 59);
      doc.text(wrapTitle, margin + 4, y + 5);

      // Badge for mandatory
      const badgeText = cert.mandatory ? "OBBLIGATORIO" : "RACCOMANDATO";
      const badgeColor = cert.mandatory ? [220, 38, 38] : [59, 130, 246];
      doc.setFillColor(badgeColor[0], badgeColor[1], badgeColor[2]);
      doc.rect(pageWidth - margin - 32, y + 2, 28, 5, "F");
      
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(255, 255, 255);
      doc.text(badgeText, pageWidth - margin - 18, y + 5.5, { align: "center" });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(71, 85, 105);
      doc.text(wrapDesc, margin + 4, y + 6 + wrapTitle.length * 4.2);

      y += blockHeight + 3;
    });

    // 7. Signature area at the bottom
    checkSpace(30);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text("Per accettazione dell'offerta commerciale e delle note sul cantiere:", margin, y);
    
    y += 12;
    doc.setDrawColor(186, 195, 201);
    doc.setLineWidth(0.3);
    doc.line(margin, y, margin + 60, y);
    doc.line(pageWidth - margin - 60, y, pageWidth - margin, y);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(`Firma del Committente per approvazione (${customerName || "Cliente"})`, margin, y + 4);
    doc.text(`Sottoscrizione per ${companyName || "Ditta esecutrice"}`, pageWidth - margin - 60, y + 4);

    // Finalize footers for all pages
    const totalPages = (doc as any).internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      drawFooter();
    }

    return doc;
  };

  const exportToPDF = () => {
    const doc = buildPDFDocument();
    if (!doc) return;
    const safeProjectName = (projectName || "preventivo_edilizia")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "_");
    doc.save(`preventivo_${safeProjectName}.pdf`);
  };

  const getPDFBase64 = (): { base64: string; fileName: string } | null => {
    const doc = buildPDFDocument();
    if (!doc) return null;
    const safeProjectName = (projectName || "preventivo_edilizia")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "_");
    const fileName = `preventivo_${safeProjectName}.pdf`;
    const dataUri = doc.output("datauristring");
    const base64 = dataUri.split(",")[1];
    return { base64, fileName };
  };

  const handleOpenEmailModal = () => {
    if (!quoteResult) return;
    
    setEmailRecipient("");
    setEmailSubject(`Preventivo di Lavoro - Progetto: ${projectName || "Intervento di manutenzione"}`);
    
    // Format descriptive body in Italian
    const finalTotal = (quoteResult.totalAmount - discountAmount) * (1 + ivaRate / 100);
    setEmailBody(
`Gentile ${customerName || "Cliente"},

In allegato alla presente email, desideriamo trasmetterLe il preventivo formale di spesa ed il computo metrico dettagliato per le opere di tipo "${activeSector.name}" relative al progetto "${projectName || "intervento edile"}".

Riepilogo dell'Offerta Commerciale:
• Professionista incaricato: Specialista in ${activeSector.name}
• Contesto Geografico: ${activeCountry.name} (${activeCountry.flag})
• Durata dell'intervento stimata: ${quoteResult.estimatedTime}
• Sconto operato dalla ditta: -${discountAmount} ${activeCountry.currencySymbol}
• Base Imponibile Lorda: ${(quoteResult.totalAmount - discountAmount).toFixed(2)} ${activeCountry.currencySymbol}
• Aliquota d'Imposta (IVA) applicata: ${ivaRate}%
• TOTALE COMPLESSIVO CHIAVI IN MANO: ${finalTotal.toFixed(2)} ${activeCountry.currencySymbol}

Il file PDF allegato contiene l'analisi completa di fattibilità tecnica, i dettagli dei rischi/mitigazioni di cantiere e la lista di certificazioni/obblighi di legge locale per garantire la piena conformità delle opere eseguite.

Restando a Sua completa e prioritaria disposizione per un sopralluogo definitivo o per concordare la data di avvio dei lavori, Le porgiamo i nostri più cordiali saluti.

Dipartimento Tecnico / ${companyName || "Ditta esecutrice"}`
    );
    setEmailStatus(null);
    setEmailStatusMsg("");
    setEmailTestUrl(null);
    setIsEmailModalOpen(true);
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailRecipient) {
      setEmailStatus("error");
      setEmailStatusMsg("Inserire un indirizzo email valido.");
      return;
    }

    setSendingEmail(true);
    setEmailStatus(null);
    setEmailStatusMsg("");

    const pdfData = getPDFBase64();
    if (!pdfData) {
      setEmailStatus("error");
      setEmailStatusMsg("Impossibile generare l'allegato PDF. Genera prima il preventivo.");
      setSendingEmail(false);
      return;
    }

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: emailRecipient,
          subject: emailSubject,
          body: emailBody,
          fileName: pdfData.fileName,
          pdfBase64: pdfData.base64,
        }),
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.error || "Errore sconosciuto durante l'invio.");
      }

      setEmailStatus("success");
      setEmailStatusMsg(resData.message || "Email inviata con successo!");
      if (resData.testUrl) {
        setEmailTestUrl(resData.testUrl);
      }
    } catch (error: any) {
      setEmailStatus("error");
      setEmailStatusMsg(error.message || "Impossibile inviare l'email. Riprova più tardi.");
    } finally {
      setSendingEmail(false);
    }
  };

  // Helper mapping sector id to specific icon component
  const getSectorIcon = (iconName: string) => {
    switch (iconName) {
      case "Paintbrush":
        return <Paintbrush className="w-5 h-5" />;
      case "DoorOpen":
        return <DoorOpen className="w-5 h-5" />;
      case "Grid":
        return <Grid className="w-5 h-5" />;
      case "Droplets":
        return <Droplets className="w-5 h-5" />;
      case "Zap":
        return <Zap className="w-5 h-5" />;
      default:
        return <Hammer className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans" id="app_root">
      {/* Elegante Header Top Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm px-6 py-4" id="app_header">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white p-2.5 rounded-xl shadow-md shadow-blue-200">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-950 flex items-center gap-2">
                {t.appName} <span className="bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded-full text-xs">{activeCountry.name} {activeCountry.flag} 2026</span>
              </h1>
              <p className="text-xs text-slate-500">
                {t.appSubtitle}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200/40">
              {[
                { code: "it", flag: "🇮🇹", label: "IT" },
                { code: "de", flag: "🇩🇪", label: "DE" },
                { code: "fr", flag: "🇫🇷", label: "FR" },
                { code: "en", flag: "🇬🇧", label: "EN" }
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all whitespace-nowrap cursor-pointer ${
                    selectedLanguage === lang.code
                      ? "bg-white text-blue-600 shadow-sm border border-slate-200/50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50/50"
                  }`}
                  title={t[`${lang.code}Language`] || lang.label}
                  type="button"
                >
                  <span className="text-sm leading-none">{lang.flag}</span>
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main workspace fluid grid */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6" id="app_main">
        
        {/* Left column: Setup Panel / Inputs - Occupies 7 cols on lg */}
        <section className="lg:col-span-7 flex flex-col gap-6" id="input_zone">

          {/* LOCALIZATION & COUNTRY SELECTION */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 transition hover:shadow-md" id="card_country_selection">
            <h2 className="text-sm font-semibold tracking-wider text-slate-400 uppercase mb-3 flex items-center gap-2">
              🌍 {t.section1Title}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2" id="country_pickers_grid">
              {countriesList.map((country) => (
                <button
                  key={country.id}
                  onClick={() => setSelectedCountryId(country.id)}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all ${
                    selectedCountryId === country.id
                      ? "border-blue-600 bg-blue-50 text-blue-750 ring-2 ring-blue-100 font-medium"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:border-slate-300"
                  }`}
                  id={`btn_country_${country.id}`}
                  type="button"
                >
                  <span className="text-2xl mb-1">{country.flag}</span>
                  <span className="text-xs font-semibold">{country.name}</span>
                  <span className="text-[10px] text-slate-400">{country.currency} ({country.currencySymbol})</span>
                </button>
              ))}
            </div>
            
            <div className="mt-3 bg-blue-50/60 p-3 rounded-xl border border-blue-100 flex gap-2 text-xs text-blue-900">
              <span className="text-base">📌</span>
              <div>
                <p className="font-semibold mb-0.5">{selectedLanguage === "it" ? "Normativa Applicata & Fisco:" : selectedLanguage === "de" ? "Angewandtes Recht & Steuern:" : selectedLanguage === "fr" ? "Réglementation & Fiscalité :" : "Regulatory & Taxation:"}</p>
                <p className="text-slate-600 leading-relaxed text-[11px]">{activeCountry.regulatoryContext}</p>
                <p className="mt-1 font-semibold text-blue-800">{selectedLanguage === "it" ? "IVA Predefinita per il settore:" : selectedLanguage === "de" ? "Standard-MwSt. für den Bereich:" : selectedLanguage === "fr" ? "TVA par défaut pour le secteur :" : "Default VAT for sector:"} {activeCountry.defaultVat}% ({selectedLanguage === "it" ? "Regolabile nel modulo di calcolo" : selectedLanguage === "de" ? "Im Berechnungsmodul anpassbar" : selectedLanguage === "fr" ? "Ajustable dans le module" : "Adjustable in calculation form"})</p>
              </div>
            </div>
          </div>
          
          {/* SECTOR PICKER CARD */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 transition hover:shadow-md" id="card_sector_selection">
            <h2 className="text-sm font-semibold tracking-wider text-slate-400 uppercase mb-3 flex items-center gap-2">
              <Hammer className="w-4 h-4 text-slate-400" /> {t.section2Title}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2" id="sector_pickers_grid">
              {sectorPriceLists.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => setSelectedSectorId(sec.id)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                    selectedSectorId === sec.id
                      ? "border-blue-600 bg-blue-50/70 text-blue-700 ring-2 ring-blue-100 font-medium"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:border-slate-300"
                  }`}
                  id={`btn_sector_${sec.id}`}
                  type="button"
                >
                  <div className={`p-2 rounded-lg mb-1.5 ${selectedSectorId === sec.id ? "bg-blue-100 text-blue-600" : "bg-white text-slate-500 shadow-sm"}`}>
                    {getSectorIcon(sec.icon)}
                  </div>
                  <span className="text-xs line-clamp-1 break-words">{sec.name.split("/")[0].trim()}</span>
                </button>
              ))}
            </div>
            
            <p className="mt-3 text-xs text-slate-500 italic bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <strong>Info:</strong> {activeSector.description}
            </p>
          </div>

          {/* PROJECT INFO FORM */}
          <form onSubmit={handleGenerateQuote} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col gap-4" id="form_quote_data">
            <h2 className="text-sm font-semibold tracking-wider text-slate-400 uppercase mb-1 flex items-center gap-2">
              <User className="w-4 h-4 text-slate-400" /> {t.section3Title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1" htmlFor="input_customer">
                  {t.customerNameLabel}
                </label>
                <input
                  id="input_customer"
                  type="text"
                  placeholder={t.customerNamePlaceholder}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1" htmlFor="input_project">
                  {t.projectNameLabel}
                </label>
                <input
                  id="input_project"
                  type="text"
                  placeholder={t.projectNamePlaceholder}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>
            </div>

            {/* COMPOSITE EMISSION DITTA SENDER INFO & LOGO WIDGET */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col gap-4 text-left" id="company_profile_block">
              <h2 className="text-sm font-semibold tracking-wider text-slate-700 uppercase flex items-center gap-2">
                <Building2 className="w-4 h-4 text-slate-500" /> {t.section4Title}
              </h2>
              <p className="text-[11px] text-slate-500 -mt-2">
                {t.section4Desc}
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* File upload widget for the Logo */}
                <div className="lg:col-span-1 flex flex-col justify-between">
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">
                      {t.companyLogoLabel}
                    </span>
                    <div
                      className={`relative border-2 border-dashed rounded-xl p-3 flex flex-col items-center justify-center transition text-center min-h-[145px] cursor-pointer bg-white ${
                        dragActive ? "border-blue-500 bg-blue-50/20" : "border-slate-300 hover:border-blue-450"
                      }`}
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => document.getElementById("logo_file_input")?.click()}
                    >
                      <input
                        type="file"
                        id="logo_file_input"
                        className="hidden"
                        accept="image/*"
                        onChange={handleLogoFileChange}
                      />

                      {companyLogo ? (
                        <div className="flex flex-col items-center gap-2 w-full">
                          <div className="w-24 h-16 p-1 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden border border-slate-200">
                            <img
                              src={companyLogo}
                              alt="Logo preview"
                              referrerPolicy="no-referrer"
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeLogo();
                            }}
                            className="bg-rose-50 text-rose-600 hover:bg-rose-100 px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1 transition"
                            id="btn_remove_logo"
                          >
                            <Trash2 className="w-3 h-3" /> {t.removeLogoBtn}
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center p-2 text-slate-400">
                          <UploadCloud className="w-6 h-6 text-slate-400 mb-1" />
                          <span className="text-[10px] font-bold text-slate-600">{t.dragLogoText}</span>
                          <span className="text-[9px] text-slate-400 mt-0.5">{t.orSelectText}</span>
                          <span className="text-[8px] text-slate-400 mt-1 uppercase tracking-wider font-semibold">PNG, JPG, SVG</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Company details form inputs */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5" htmlFor="input_comp_name">
                      {t.companyNameLabel}
                    </label>
                    <input
                      id="input_comp_name"
                      type="text"
                      className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs font-semibold focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      placeholder={t.companyNamePlaceholder}
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5" htmlFor="input_comp_vat">
                      {t.companyVatLabel}
                    </label>
                    <input
                      id="input_comp_vat"
                      type="text"
                      className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs font-semibold focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      placeholder="VAT ID"
                      value={companyVat}
                      onChange={(e) => setCompanyVat(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5" htmlFor="input_comp_email">
                      {t.companyEmailLabel}
                    </label>
                    <input
                      id="input_comp_email"
                      type="email"
                      className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      placeholder="info@email.com"
                      value={companyEmail}
                      onChange={(e) => setCompanyEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5" htmlFor="input_comp_phone">
                      {t.companyPhoneLabel}
                    </label>
                    <input
                      id="input_comp_phone"
                      type="text"
                      className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      placeholder="+39 06"
                      value={companyPhone}
                      onChange={(e) => setCompanyPhone(e.target.value)}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5" htmlFor="input_comp_address">
                      {t.companyAddressLabel}
                    </label>
                    <input
                      id="input_comp_address"
                      type="text"
                      className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      placeholder={t.companyAddressPlaceholder}
                      value={companyAddress}
                      onChange={(e) => setCompanyAddress(e.target.value)}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[10px] uppercase font-bold text-slate-400 mb-0.5" htmlFor="input_comp_web">
                      {t.companyWebsiteLabel}
                    </label>
                    <input
                      id="input_comp_web"
                      type="text"
                      className="w-full px-2.5 py-1.5 border border-slate-250 rounded-lg text-xs focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      placeholder="www.company.com"
                      value={companyWebsite}
                      onChange={(e) => setCompanyWebsite(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* DYNAMIC SHORCUT METRICS PANEL */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3.5">
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-slate-500" /> {selectedLanguage === "it" ? "Dimensioni di Riferimento Rapide (Opzionali)" : selectedLanguage === "de" ? "Schnelle Referenzabmessungen (Optional)" : selectedLanguage === "fr" ? "Dimensions de référence (Optionnel)" : "Quick Reference Dimensions (Optional)"}
                </span>
                <button
                  type="button"
                  onClick={applyMetricsToItems}
                  disabled={selectedItems.length === 0}
                  className="text-[11px] font-semibold text-blue-600 bg-white border border-blue-200 hover:bg-blue-50 px-2 py-1 rounded-md shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  title="Applica alle lavorazioni selezionate"
                  id="btn_apply_metrics"
                >
                  {selectedLanguage === "it" ? "Applica a selezione" : selectedLanguage === "de" ? "Auf Auswahl anwenden" : selectedLanguage === "fr" ? "Appliquer" : "Apply to selected"}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-semibold text-slate-500 mb-1" htmlFor="metric_mq">
                    {selectedLanguage === "it" ? "Superficie (mq)" : selectedLanguage === "de" ? "Fläche (m²)" : selectedLanguage === "fr" ? "Surface (m²)" : "Area (sqm)"}
                  </label>
                  <div className="relative">
                    <input
                      id="metric_mq"
                      type="number"
                      min="0"
                      className="w-full bg-white pl-2 pr-7 py-1.5 border border-slate-200 rounded-lg text-xs font-medium focus:ring-1 focus:ring-blue-500"
                      value={areaMq || ""}
                      onChange={(e) => setAreaMq(Number(e.target.value))}
                      placeholder="e.g. 45"
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-bold">m²</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-semibold text-slate-500 mb-1" htmlFor="metric_ml">
                    {selectedLanguage === "it" ? "Lunghezza (ml)" : selectedLanguage === "de" ? "Länge (m)" : selectedLanguage === "fr" ? "Longueur (m)" : "Length (m)"}
                  </label>
                  <div className="relative">
                    <input
                      id="metric_ml"
                      type="number"
                      min="0"
                      className="w-full bg-white pl-2 pr-7 py-1.5 border border-slate-200 rounded-lg text-xs font-medium focus:ring-1 focus:ring-blue-500"
                      value={lengthMl || ""}
                      onChange={(e) => setLengthMl(Number(e.target.value))}
                      placeholder="e.g. 15"
                    />
                    <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-bold">m</span>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-semibold text-slate-500 mb-1" htmlFor="metric_cad">
                    {selectedLanguage === "it" ? "Numero Pezzi (cad / pz)" : selectedLanguage === "de" ? "Stückzahl" : selectedLanguage === "fr" ? "Quantité (pcs)" : "Quantity (pcs)"}
                  </label>
                  <div className="relative">
                    <input
                      id="metric_cad"
                      type="number"
                      min="0"
                      className="w-full bg-white pl-2 pr-7 py-1.5 border border-slate-200 rounded-lg text-xs font-medium focus:ring-1 focus:ring-blue-500"
                      value={quantityCad || ""}
                      onChange={(e) => setQuantityCad(Number(e.target.value))}
                      placeholder="e.g. 5"
                    />
                    <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[10px] text-slate-400 font-bold">pcs</span>
                  </div>
                </div>
              </div>
            </div>

            {/* DETAILED WORK DESCRIPTION */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase mb-1" htmlFor="text_description">
                {t.workDescriptionLabel}
              </label>
              <textarea
                id="text_description"
                rows={3}
                placeholder={t.workDescriptionPlaceholder}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-slate-400 font-sans"
                value={workDescription}
                onChange={(e) => setWorkDescription(e.target.value)}
                required
              />
              <div className="mt-1 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (selectedSectorId === "imbianchino") {
                      setWorkDescription("Tinteggiatura completa del soggiorno di circa 40 mq con rimozione di muffa di condensa negli angoli alti della parete nord, livellamento delle crepe e finitura in colore bianco lavabile di alta qualità.");
                    } else if (selectedSectorId === "serramentista") {
                      setWorkDescription("Rimozione di 4 vecchi infissi in legno logorato e installazione di nuovi serramenti in PVC ad alto isolamento acustico e termico con trasmittanza certificata. Inclusa zanzariera a rullo per camera matrimoniale.");
                    } else if (selectedSectorId === "piastrellista") {
                      setWorkDescription("Demolizione e smantellamento pavimento in ceramica scheggiata del bagno (circa 8 mq), realizzazione di nuovo massetto autolivellante idoneo, posa di piastrelle gres porcellanato effetto legno formato 30x120 con fuga minima e battiscopa abbinato.");
                    } else if (selectedSectorId === "idraulico") {
                      setWorkDescription("Rifacimento impianto idrico del bagno con sostituzione della vecchia caldaia non a condensazione con una nuova caldaia a risparmio energetico Classe A, lavaggio chimico dell'impianto radiante e prova di conformità.");
                    } else if (selectedSectorId === "elettricista") {
                      setWorkDescription("Rifacimento quadro elettrico generale con installazione di interruttore differenziale salvavita da 30mA, messa a terra e passaggio di nuove linee corrugate con cablaggi antifiamma a zone differenziate.");
                    }
                  }}
                  className="text-[10px] text-blue-600 font-medium hover:underline flex items-center gap-1 cursor-pointer"
                  id="btn_prefill_example"
                >
                  <Sparkles className="w-3 h-3" /> {selectedLanguage === "it" ? "Precompila esempio consigliato" : selectedLanguage === "de" ? "Beispiel vorab ausfüllen" : selectedLanguage === "fr" ? "Préremplir l'exemple conseillé" : "Prefill recommended example"}
                </button>
              </div>
            </div>

            {/* SETTING EXTRA SPECIFICS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
                  {selectedLanguage === "it" ? "Grado Difficoltà del Cantiere" : selectedLanguage === "de" ? "Schwierigkeitsgrad Baustelle" : selectedLanguage === "fr" ? "Difficulté du chantier" : "Site Difficulty Level"}
                </label>
                <div className="grid grid-cols-3 gap-1.5" id="difficulty_picker">
                  {[
                    { id: "low", label: selectedLanguage === "it" ? "Basso" : selectedLanguage === "de" ? "Niedrig" : selectedLanguage === "fr" ? "Faible" : "Low", color: "hover:bg-emerald-100 border-slate-200 active-em", activeBg: "bg-emerald-600 text-white border-emerald-600" },
                    { id: "medium", label: selectedLanguage === "it" ? "Medio" : selectedLanguage === "de" ? "Mittel" : selectedLanguage === "fr" ? "Moyen" : "Medium", color: "hover:bg-amber-100 border-slate-200 active-am", activeBg: "bg-amber-500 text-white border-amber-500" },
                    { id: "high", label: selectedLanguage === "it" ? "Alto (Rischioso)" : selectedLanguage === "de" ? "Hoch" : selectedLanguage === "fr" ? "Élevé" : "High (Risky)", color: "hover:bg-rose-100 border-slate-200 active-ro", activeBg: "bg-rose-600 text-white border-rose-600" }
                  ].map((diff) => (
                    <button
                      key={diff.id}
                      type="button"
                      onClick={() => setSiteDifficulty(diff.id as any)}
                      className={`py-1.5 text-xs rounded-lg border text-center transition font-medium cursor-pointer ${
                        siteDifficulty === diff.id ? diff.activeBg : `${diff.color} bg-white text-slate-600`
                      }`}
                      id={`btn_diff_${diff.id}`}
                    >
                      {diff.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <label className="flex items-center gap-2.5 cursor-pointer py-1" htmlFor="check_materials">
                  <input
                    id="check_materials"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 cursor-pointer"
                    checked={materialsProvidedByCustomer}
                    onChange={(e) => setMaterialsProvidedByCustomer(e.target.checked)}
                  />
                  <div>
                    <span className="block text-xs font-semibold text-slate-700">{selectedLanguage === "it" ? "Materiali forniti dal Cliente" : selectedLanguage === "de" ? "Materialien vom Kunden gestellt" : selectedLanguage === "fr" ? "Matériaux fournis par le client" : "Materials provided by Customer"}</span>
                    <span className="block text-[10px] text-slate-400">{selectedLanguage === "it" ? "Se spuntato, l'IA ridurrà la stima dei materiali concentrandosi sulla sola manodopera" : selectedLanguage === "de" ? "Wenn aktiviert, wird die Materialschätzung reduziert und die reine Arbeitskraft fokussiert" : selectedLanguage === "fr" ? "Si coché, l'IA réduira l'estimation des matériaux pour se concentrer sur la main d'œuvre" : "If checked, AI will reduce material estimate to focus on labor only"}</span>
                  </div>
                </label>
              </div>
            </div>

            {/* COMPREREHENSIVE LABOR & ASSOCIATED COSTS CONFIGURATION WIDGET */}
            <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-3" id="labor_cost_manager">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <div className="text-left font-sans">
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-tight">
                      {selectedLanguage === "it" ? "Computo Mano d'Opera & Costi Associati" : selectedLanguage === "de" ? "Arbeitskraft & Nebenkosten" : selectedLanguage === "fr" ? "Main d'œuvre & Frais associés" : "Labor & Associated Costs"}
                    </h3>
                    <p className="text-[10px] text-slate-450">
                      {selectedLanguage === "it" ? "Gestisci tariffe orarie e spese logistiche di cantiere" : selectedLanguage === "de" ? "Stundensätze und Baustellenlogistik verwalten" : selectedLanguage === "fr" ? "Gérer les taux horaires et la logistique" : "Manage hourly rates and site logistics"}
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer" htmlFor="toggle_explicit_labor">
                  <input
                    type="checkbox"
                    id="toggle_explicit_labor"
                    className="sr-only peer"
                    checked={includeExplicitLabor}
                    onChange={(e) => setIncludeExplicitLabor(e.target.checked)}
                  />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                  <span className="ml-1.5 text-[11px] font-semibold text-slate-500">{selectedLanguage === "it" ? "Attivo" : selectedLanguage === "de" ? "Aktiv" : selectedLanguage === "fr" ? "Actif" : "Active"}</span>
                </label>
              </div>

              {includeExplicitLabor ? (
                <div className="space-y-3" id="labor_fields_block">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                    {/* Hourly rate input */}
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1" htmlFor="labor_hourly_rate">
                        {selectedLanguage === "it" ? "Tariffa Oraria (Mano d'opera)" : selectedLanguage === "de" ? "Stundensatz (Arbeitskraft)" : selectedLanguage === "fr" ? "Taux horaire (main d'œuvre)" : "Hourly Rate (Labor)"}
                      </label>
                      <div className="relative rounded-md shadow-2xs">
                        <input
                          type="number"
                          id="labor_hourly_rate"
                          className="w-full text-xs pl-2 pr-12 py-1.5 border border-slate-250 rounded-lg font-mono font-medium focus:ring-1 focus:ring-blue-400 bg-white"
                          value={laborHourlyRate}
                          onChange={(e) => setLaborHourlyRate(Number(e.target.value))}
                        />
                        <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-[10px] font-bold text-slate-400">
                          {activeCountry.currencySymbol}/h
                        </div>
                      </div>
                      <span className="text-[9px] text-slate-400 block mt-0.5">{selectedLanguage === "it" ? "Media locale:" : selectedLanguage === "de" ? "Lokaler Durchschnitt:" : selectedLanguage === "fr" ? "Moyenne locale :" : "Local average:"} ~{activeCountry.standardHourlyLaborRate} {activeCountry.currencySymbol}/h</span>
                    </div>

                    {/* Total hours */}
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1" htmlFor="labor_hours">
                        {selectedLanguage === "it" ? "Ore di Lavoro Evaluate" : selectedLanguage === "de" ? "Geschätzte Arbeitsstunden" : selectedLanguage === "fr" ? "Heures de travail estimées" : "Estimated Labor Hours"}
                      </label>
                      <div className="relative rounded-md shadow-2xs">
                        <input
                          type="number"
                          id="labor_hours"
                          className="w-full text-xs pl-2 pr-12 py-1.5 border border-slate-250 rounded-lg font-mono font-medium focus:ring-1 focus:ring-blue-400 bg-white"
                          value={laborHours}
                          onChange={(e) => setLaborHours(Number(e.target.value))}
                        />
                        <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-[10px] font-bold text-slate-400">
                          {selectedLanguage === "it" ? "ore tot." : selectedLanguage === "de" ? "Std. insg." : selectedLanguage === "fr" ? "heures tot." : "total hrs"}
                        </div>
                      </div>
                      <span className="text-[9px] text-slate-400 block mt-0.5">{selectedLanguage === "it" ? "Es. 2 operai × 1 giorno = 16h" : selectedLanguage === "de" ? "z.B. 2 Arbeiter × 1 Tag = 16h" : selectedLanguage === "fr" ? "Ex. 2 ouvriers × 1 jour = 16h" : "e.g. 2 workers × 1 day = 16h"}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-left">
                    {/* Travel and Transit costs */}
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1" htmlFor="travel_costs">
                        {selectedLanguage === "it" ? "Spese Trasferta & Logistica" : selectedLanguage === "de" ? "Reise- & Logistikkosten" : selectedLanguage === "fr" ? "Frais de déplacement & logistique" : "Travel & Logistics Costs"}
                      </label>
                      <div className="relative rounded-md shadow-2xs">
                        <input
                          type="number"
                          id="travel_costs"
                          className="w-full text-xs pl-2 pr-8 py-1.5 border border-slate-250 rounded-lg font-mono font-medium focus:ring-1 focus:ring-blue-400 bg-white"
                          value={travelCosts}
                          onChange={(e) => setTravelCosts(Number(e.target.value))}
                        />
                        <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-[10px] font-bold text-slate-400">
                          {activeCountry.currencySymbol}
                        </div>
                      </div>
                      <span className="text-[9px] text-slate-400 block mt-0.5">{selectedLanguage === "it" ? "Viaggi, carburante e pedaggi standard" : selectedLanguage === "de" ? "Fahrten, Kraftstoff und Standardgebühren" : selectedLanguage === "fr" ? "Trajets, carburant et péages standards" : "Trips, fuel and standard tolls"}</span>
                    </div>

                    {/* Setup / Overhead / Scaffoldings and safety */}
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1" htmlFor="safety_overhead">
                        {selectedLanguage === "it" ? "Oneri Sicurezza & Allestimento" : selectedLanguage === "de" ? "Sicherheits- & Rüstkosten" : selectedLanguage === "fr" ? "Frais de sécurité & installation" : "Safety & Setup Overhead"}
                      </label>
                      <div className="relative rounded-md shadow-2xs">
                        <input
                          type="number"
                          id="safety_overhead"
                          className="w-full text-xs pl-2 pr-8 py-1.5 border border-slate-250 rounded-lg font-mono font-medium focus:ring-1 focus:ring-blue-400 bg-white"
                          value={setupOverheadCosts}
                          onChange={(e) => setSetupOverheadCosts(Number(e.target.value))}
                        />
                        <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-[10px] font-bold text-slate-400">
                          {activeCountry.currencySymbol}
                        </div>
                      </div>
                      <span className="text-[9px] text-slate-400 block mt-0.5">{selectedLanguage === "it" ? "Oneri e dispositivi sicurezza, allestimento prefabbricati" : selectedLanguage === "de" ? "PSA, Rüstung, Baustellensicherung" : selectedLanguage === "fr" ? "Sécurité, installation d'échafaudages" : "Safety gear, site setup overhead"}</span>
                    </div>
                  </div>

                  <div className="bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100 flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span className="flex items-center gap-1"><Truck className="w-3.5 h-3.5 text-emerald-650" /> {selectedLanguage === "it" ? "Costo Stimativo Mano d'opera & Logistica:" : selectedLanguage === "de" ? "Geschätzte Arbeits- und Logistikkosten:" : selectedLanguage === "fr" ? "Coût estimé main d'œuvre & logistique :" : "Estimated Labor & Logistics Cost:"}</span>
                    <span className="font-mono text-emerald-800 font-bold">
                      {(laborHourlyRate * laborHours + travelCosts + setupOverheadCosts).toFixed(0)} {activeCountry.currencySymbol}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200 text-center text-xs text-amber-800" id="labor_inactive_notice">
                  {selectedLanguage === "it" ? "Lavorazioni calcolate su base forfettaria incluse nel listino di base, senza esplicitare costi orari o logistiche." : selectedLanguage === "de" ? "Pauschal berechnete Arbeiten inbegriffen, ohne gesonderte Aufschlüsselung von Arbeitszeiten und Logistik." : selectedLanguage === "fr" ? "Travaux calculés sur une base forfaitaire inclus, sans détailler individuellement la main d'œuvre et la logistique." : "Flat-rate operations included by default in the list, without showing explicit breakdown of travel and working hours."}
                </div>
              )}
            </div>

            {/* INTERACTIVE COMPREHENSIVE PRICE LIST */}
            <div className="border border-slate-200 rounded-xl p-4 bg-white" id="price_list_manager">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                <div>
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-tight flex items-center gap-1.5">
                    <Grid className="w-3.5 h-3.5 text-blue-600" /> {selectedLanguage === "it" ? "Listino Prezzi di Settore" : selectedLanguage === "de" ? "Branchenpreisliste" : selectedLanguage === "fr" ? "Liste des prix du secteur" : "Sector Price List"} ({activeSector.name})
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {selectedLanguage === "it" ? "Seleziona le lavorazioni di base. Potrai cambiare prezzi e quantità." : selectedLanguage === "de" ? "Wählen Sie Standardarbeiten aus. Sie können Preise und Mengen ändern." : selectedLanguage === "fr" ? "Sélectionnez les travaux de base. Vous pouvez modifier les prix et les quantités." : "Select basic operations. You will be able to edit prices and quantities."}
                  </p>
                </div>
                <div className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full font-mono">
                  {selectedLanguage === "it" ? "Selezionati" : selectedLanguage === "de" ? "Ausgewählt" : selectedLanguage === "fr" ? "Sélectionné" : "Selected"}: {selectedItems.length} {selectedLanguage === "it" ? "voci" : selectedLanguage === "de" ? "Posten" : selectedLanguage === "fr" ? "lignes" : "items"}
                </div>
              </div>

              {/* TABS SELECTOR FOR BASE VS CUSTOM WORK */}
              <div className="grid grid-cols-2 gap-2 mb-4 bg-slate-100 p-1 rounded-xl border border-slate-200/50">
                <button
                  type="button"
                  onClick={() => setPriceListTab("standard")}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    priceListTab === "standard"
                      ? "bg-white text-blue-650 shadow-xs border border-slate-200/55 font-bold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  }`}
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span>{selectedLanguage === "it" ? "1. Scegli da Listino" : selectedLanguage === "de" ? "Standardpreisliste" : selectedLanguage === "fr" ? "Tarif Standard" : "Standard List"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPriceListTab("custom")}
                  className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    priceListTab === "custom"
                      ? "bg-white text-blue-650 shadow-xs border border-slate-200/55 font-bold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  }`}
                  id="tab_custom_operations"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>{selectedLanguage === "it" ? "2. Aggiungi Custom ➕" : selectedLanguage === "de" ? "Anderer Posten" : selectedLanguage === "fr" ? "Travail Personnalisé" : "Custom Operation"}</span>
                </button>
              </div>

              {priceListTab === "standard" ? (
                <>
                  {/* CATEGORY FILTER SELECT / DROPDOWN MENU */}
                  {activeSector.categories && activeSector.categories.length > 0 && (
                    <div className="mb-4 bg-slate-50 border border-slate-200/80 p-3 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-3 text-left">
                      <div className="flex-1">
                        <label htmlFor="category_filter" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">
                          {selectedLanguage === "it" ? "Filtra per Categoria" : selectedLanguage === "de" ? "Nach Spezialisierung filtern" : selectedLanguage === "fr" ? "Filtrer par spécialisation" : "Filter by Specialization"}
                        </label>
                        <p className="text-[10px] text-slate-450 leading-normal">
                          {selectedLanguage === "it" ? "Sfoglia il catalogo delle lavorazioni pre-caricate nel sistema per questo mestiere." : selectedLanguage === "de" ? "Durchsuchen Sie den Katalog der vorgeladenen Arbeiten." : selectedLanguage === "fr" ? "Parcourez le catalogue des travaux préchargés." : "Browse the catalog of preloaded construction operations."}
                        </p>
                      </div>
                      <div className="w-full md:w-64">
                        <select
                          id="category_filter"
                          className="w-full text-xs font-semibold px-2.5 py-1.5 bg-white border border-slate-250 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-slate-700 cursor-pointer shadow-2xs"
                          value={activeCategory}
                          onChange={(e) => setActiveCategory(e.target.value)}
                        >
                          {activeSector.categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  {/* LIST OF AVAILABLE ITEMS IN SECTOR */}
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1 mb-1 shadow-inner p-1 bg-slate-50/50 rounded-lg" id="list_items_sector_container">
                    {activeSector.items
                      .filter((item) => activeCategory === "all" || item.category === activeCategory)
                      .map((item) => {
                        const isChecked = selectedItems.find((it) => it.id === item.id);
                        return (
                          <div
                            key={item.id}
                            onClick={() => handleToggleItem(item)}
                            className={`p-3 rounded-lg border text-left cursor-pointer transition flex items-start gap-3 ${
                              isChecked
                                ? "border-blue-400 bg-blue-50/60 shadow-xs"
                                : "border-slate-150 hover:bg-slate-50/80 bg-white"
                            }`}
                            id={`price_item_row_${item.id}`}
                          >
                            <input
                              type="checkbox"
                              checked={!!isChecked}
                              onChange={() => {}} // toggling taken care of by div onClick for best hit-rate
                              className="w-4 h-4 text-blue-600 rounded border-slate-300 mt-0.5 cursor-pointer"
                              id={`check_item_${item.id}`}
                            />
                            <div className="flex-1">
                              <div className="flex justify-between items-start gap-2">
                                <span className="text-xs font-semibold text-slate-800">{item.name}</span>
                                <span className="text-xs font-mono text-slate-900 font-bold bg-white border border-slate-200/80 px-2 py-0.5 rounded shadow-3xs whitespace-nowrap">
                                  {item.minPrice}-{item.maxPrice} {activeCountry.currencySymbol}/{item.unit}
                                </span>
                              </div>
                              <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">{item.description}</p>
                            </div>
                          </div>
                        );
                      })}

                    {activeSector.items.filter((item) => activeCategory === "all" || item.category === activeCategory).length === 0 && (
                      <div className="p-6 text-center text-xs text-slate-400 bg-slate-50/50 border border-dashed border-slate-200 rounded-lg">
                        Nessuna lavorazione trovata per questa categoria selezionata.
                      </div>
                    )}
                  </div>
                </>
              ) : (
                /* CUSTOM ITEM FORM FOR USER PRECISE CREATION */
                <div className="bg-slate-50 border border-slate-200/85 p-4 rounded-xl text-left space-y-3" id="custom_item_form">
                  <div className="bg-blue-50 text-blue-900 p-3 rounded-lg border border-blue-100 text-xs leading-relaxed">
                    💡 <strong>{selectedLanguage === "it" ? "Sei tu l'esperto!" : "You are the pro!"}</strong> {selectedLanguage === "it" 
                      ? "Se hai lavorazioni speciali, particolari o fuori listino, puoi digitarle qui sotto a mano libera. Saranno incluse nel calcolo e nel PDF." 
                      : "If you have special operations not lists under standard categories, type them freely here to include them in costs."}
                  </div>
                  
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1" htmlFor="custom_item_name_input">
                      {selectedLanguage === "it" ? "Mestiere o Descrizione del Lavoro da inserire" : "Job Name / Custom work description"} <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      id="custom_item_name_input"
                      type="text"
                      className="w-full text-xs px-3 py-2 bg-white border border-slate-250 rounded-lg focus:ring-1 focus:ring-blue-500 font-semibold text-slate-800 shadow-2xs"
                      placeholder={selectedLanguage === "it" ? "Es: Sabbiatura soffitto antico, Pulizia post-cantiere profonda, ecc." : "e.g. Vintage brick blasting, Deep post-construction clean"}
                      value={customItemName}
                      onChange={(e) => setCustomItemName(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1" htmlFor="custom_item_price_input">
                        {selectedLanguage === "it" ? "Prezzo Deciso" : "Your Unit Price"} ({activeCountry.currencySymbol})
                      </label>
                      <div className="relative">
                        <input
                          id="custom_item_price_input"
                          type="number"
                          className="w-full text-xs pl-3 pr-10 py-2 bg-white border border-slate-250 rounded-lg focus:ring-1 focus:ring-blue-500 font-mono font-bold text-slate-800 shadow-2xs"
                          placeholder="e.g. 120"
                          value={customItemPrice}
                          onChange={(e) => setCustomItemPrice(e.target.value)}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400">{activeCountry.currencySymbol}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1" htmlFor="custom_item_qty_input">
                        {selectedLanguage === "it" ? "Quantità / Misure" : "Total Quantity"}
                      </label>
                      <input
                        id="custom_item_qty_input"
                        type="number"
                        className="w-full text-xs px-3 py-2 bg-white border border-slate-250 rounded-lg focus:ring-1 focus:ring-blue-500 font-mono font-bold text-slate-800 shadow-2xs"
                        placeholder="e.g. 5"
                        value={customItemQty}
                        onChange={(e) => setCustomItemQty(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1.5 block">
                      {selectedLanguage === "it" ? "Unità di Misura (Clicca quella giusta)" : "Choose Unit"}
                    </label>
                    <div className="flex flex-wrap gap-1.5" id="custom_unit_selector">
                      {[
                        { id: "mq", label: selectedLanguage === "it" ? "mq (metri quadri)" : "sqm" },
                        { id: "ml", label: selectedLanguage === "it" ? "ml (metri lineari)" : "linear m" },
                        { id: "cad", label: selectedLanguage === "it" ? "cad (a pezzo)" : "pcs" },
                        { id: "ore", label: selectedLanguage === "it" ? "ore (tempo)" : "hours" },
                        { id: "lotto", label: selectedLanguage === "it" ? "a corpo (lotto)" : "fixed lump" }
                      ].map((u) => (
                        <button
                          key={u.id}
                          type="button"
                          onClick={() => setCustomItemUnit(u.id)}
                          className={`px-3 py-1.5 rounded-lg border font-bold text-xs transition cursor-pointer flex-1 text-center whitespace-nowrap shadow-3xs ${
                            customItemUnit === u.id
                              ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                              : "bg-white text-slate-700 border-slate-250 hover:bg-slate-100"
                          }`}
                        >
                          {u.id.toUpperCase()} <span className="text-[9px] opacity-80 font-normal font-sans block">{u.label.split(" (")[0]}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 text-right">
                    <button
                      type="button"
                      disabled={!customItemName.trim()}
                      onClick={handleAddCustomItem}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
                      id="btn_add_custom_item"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{selectedLanguage === "it" ? "Aggiungi al Preventivo" : "Add custom operation"}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* SELECTED ITEMS MODIFIER FORM */}
              {selectedItems.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-150 bg-slate-50/60 p-3 rounded-xl" id="customizer_block">
                  <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-tight mb-2.5 flex items-center gap-1">
                    <Paintbrush className="w-3.5 h-3.5 text-blue-500" /> Configura Quantità e Prezzi Personalizzati:
                  </h4>
                  <div className="space-y-3">
                    {selectedItems.map((sItem) => (
                      <div
                        key={sItem.id}
                        className="bg-white p-2.5 rounded-lg border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-3"
                        id={`modifier_row_${sItem.id}`}
                      >
                        <div className="flex-1 min-w-0">
                          <span className="block text-xs font-semibold text-slate-900 truncate">
                            {sItem.name}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            Prezzo standard consigliato: {sItem.originalMin}-{sItem.originalMax} {activeCountry.currencySymbol}/{sItem.unit}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 self-end md:self-auto">
                          {/* Unit price input */}
                          <div className="w-24">
                            <label className="block text-[9px] uppercase font-bold text-slate-400 mb-0.5">Prezzo Un. ({activeCountry.currencySymbol})</label>
                            <div className="relative">
                              <input
                                type="number"
                                className="w-full pl-1.5 pr-5 py-1 border border-slate-200 rounded text-xs font-mono font-medium focus:ring-1 focus:ring-blue-400"
                                value={sItem.customPrice}
                                onChange={(e) => handleUpdateItemPrice(sItem.id, Number(e.target.value))}
                              />
                              <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[9px] text-slate-400 font-bold">{activeCountry.currencySymbol}</span>
                            </div>
                          </div>

                          {/* Quantity inputs */}
                          <div className="w-20">
                            <label className="block text-[9px] uppercase font-bold text-slate-400 mb-0.5">Q.tà</label>
                            <div className="relative">
                              <input
                                type="number"
                                className="w-full pl-1.5 pr-7 py-1 border border-slate-200 rounded text-xs font-mono font-medium focus:ring-1 focus:ring-blue-400"
                                value={sItem.quantity}
                                onChange={(e) => handleUpdateItemQuantity(sItem.id, Number(e.target.value))}
                              />
                              <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[9px] text-slate-400 font-semibold">{sItem.unit}</span>
                            </div>
                          </div>

                          {/* Subtotal review for that item */}
                          <div className="w-20 text-right pr-1">
                            <label className="block text-[9px] uppercase font-bold text-slate-400 mb-0.5">Totale</label>
                            <span className="text-xs font-mono font-semibold text-slate-800">
                              {(sItem.customPrice * sItem.quantity).toFixed(0)} {activeCountry.currencySymbol}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 flex justify-between items-center bg-blue-50/70 p-2.5 rounded-lg border border-blue-100">
                    <span className="text-xs text-blue-850 font-bold">{selectedLanguage === "it" ? "Subtotale Lavorazioni di Base Selezionate:" : selectedLanguage === "de" ? "Zwischensumme der ausgewählten Posten:" : selectedLanguage === "fr" ? "Sous-total des travaux de base sélectionnés :" : "Subtotal of Selected Base Items:"}</span>
                    <span className="text-sm font-mono font-bold text-blue-900">{calculateSubtotalList()} {activeCountry.currencySymbol}</span>
                  </div>
                </div>
              )}
            </div>

            {/* REQUISITE SUBMISSION AND LOADER */}
            <div className="mt-2" id="submit_zone">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-md shadow-blue-200 hover:shadow-lg disabled:opacity-75 disabled:cursor-wait cursor-pointer"
                id="btn_submit_payload"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>{t.generatingBtnText || "Elaborazione AI del Preventivo in corso..."}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>{t.generateBtnText || "Calcola e Genera Preventivo con AI"}</span>
                  </>
                )}
              </button>
              <p className="text-[10px] text-slate-400 text-center mt-2 font-medium">
                {selectedLanguage === "it" ? "*L'intelligenza artificiale verificherà la fattibilità del cantiere, integrerà i listini attualizzati ed elencherà asseverazioni ed obblighi normativi." : selectedLanguage === "de" ? "*Die künstliche Intelligenz prüft die Machbarkeit des Projekts, integriert aktualisierte Preislisten und listet Zertifizierungen und gesetzliche Verpflichtungen auf." : selectedLanguage === "fr" ? "*L'intelligence artificielle vérifiera la faisabilité du chantier, intégrera les tarifs mis à jour et listera les obligations réglementaires." : "*Artificial intelligence will check execution feasibility, compile updated lists and list regulatory and certification obligations."}
              </p>
            </div>
          </form>

          {/* DYNAMIC SAFETY ERROR NOTIFICATIONS */}
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl flex items-start gap-3 shadow-2xs" id="error_alert_block">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-bold">{selectedLanguage === "it" ? "Attenzione! Errore di Calcolo o Connessione" : selectedLanguage === "de" ? "Achtung! Berechnungs- oder Verbindungsfehler" : selectedLanguage === "fr" ? "Attention ! Erreur de calcul ou de connexion" : "Warning! Calculation or Connection Error"}</h4>
                <p className="text-xs text-red-700 mt-1">{errorMsg}</p>
                <p className="text-[10px] text-red-500 mt-2">
                  {selectedLanguage === "it" ? "Assicurati che la chiave GEMINI_API_KEY sia inserita correttamente nei segreti." : selectedLanguage === "de" ? "Stellen Sie sicher, dass der GEMINI_API_KEY korrekt in den Secrets eingetragen ist." : selectedLanguage === "fr" ? "Assurez-vous que la clé GEMINI_API_KEY est correctement configurée dans les secrets." : "Please make sure the GEMINI_API_KEY environment variable is correctly defined."}
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Right column: AI Output & Professional Document Panel - Occupies 5 cols on lg */}
        <section className="lg:col-span-5" id="output_zone">
          <div className="bg-slate-900 border border-slate-950 text-slate-100 rounded-3xl shadow-xl p-5 min-h-[500px] flex flex-col sticky top-24" id="ai_results_card">
            
            {/* If no quote is generated yet - empty pristine screen to welcome user */}
            {!quoteResult && !loading && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6" id="welcome_pannel">
                <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-blue-400 mb-4 animate-bounce">
                  <Calculator className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{selectedLanguage === "it" ? "Pronto per la Generazione AI" : selectedLanguage === "de" ? "Bereit für KI-Generierung" : selectedLanguage === "fr" ? "Prêt pour la génération IA" : "Ready for AI Generation"}</h3>
                <p className="text-xs text-slate-400 max-w-sm mb-6 leading-relaxed">
                  {selectedLanguage === "it" ? "Completa i dati del committente, descrivi i dettagli tecnici dell'opera ed attiva le lavorazioni standard dal listino. L'AI analizzerà i rischi di cantiere, preparerà la lettera formale ed applicherà le certificazioni." : selectedLanguage === "de" ? "Tragen Sie die Kundendaten ein, beschreiben Sie die Arbeiten und aktivieren Sie Standardposten. Die KI analysiert Baurisiken, bereitet den formellen Brief vor und wendet Kennzeichnungen an." : selectedLanguage === "fr" ? "Complétez les informations du client, décrivez votre projet et activez les travaux du tarif. L'IA évaluera les chantiers, rédigera l'offre et listera les assurances." : "Complete customer details, describe technical details and select standard operations from the price list. AI will verify site logistics, compile standard rates and lay down requirements."}
                </p>
                <div className="border border-dashed border-slate-800 rounded-2xl p-4 w-full text-left bg-slate-950/40">
                  <span className="block text-[11px] font-bold text-slate-400 tracking-widest mb-2 flex items-center gap-1.5 uppercase">
                    <Award className="w-3.5 h-3.5 text-blue-400" /> {selectedLanguage === "it" ? "Standard di Posa Garantito" : selectedLanguage === "de" ? "Garantierte Verlegestandards" : selectedLanguage === "fr" ? "Normes de pose garanties" : "Guaranteed Standards"}
                  </span>
                  <ul className="space-y-1.5 text-[11px] text-slate-400">
                    <li className="flex items-center gap-1.5">✔️ D.M. 37/2008 & DiCo / {selectedLanguage === "it" ? "Abilitato" : selectedLanguage === "de" ? "Gültig" : selectedLanguage === "fr" ? "Conformité" : "Certified"}</li>
                    <li className="flex items-center gap-1.5">✔️ {selectedLanguage === "it" ? "Integrazione conformità UNI 11493-1 per piastrelle" : selectedLanguage === "de" ? "Ausrichtung UNI 11493-1 Fliesenstandards" : selectedLanguage === "fr" ? "Respect de la norme UNI 11493-1 carrelage" : "Sector and layout certification ready"}</li>
                    <li className="flex items-center gap-1.5">✔️ {selectedLanguage === "it" ? "Capitolato e trasmittanza termica serramenti" : selectedLanguage === "de" ? "Wärmedämmung & Spezifikationen der Fenster" : selectedLanguage === "fr" ? "Transmission thermique menuiseries" : "Materials compliance and safety codes"}</li>
                    <li className="flex items-center gap-1.5">✔️ {selectedLanguage === "it" ? "Standard VOC emissioni vernici" : selectedLanguage === "de" ? "VOC-Emissionsgrenzen für Farben" : selectedLanguage === "fr" ? "Teneur COV réglementée pour peintures" : "Low VOC paint emission standards"}</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Active calculation loading state */}
            {loading && (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6" id="active_ai_loader">
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full border-4 border-slate-800 border-t-blue-500 animate-spin"></div>
                  <Sparkles className="w-8 h-8 text-blue-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1.5">{selectedLanguage === "it" ? "Generazione in Corso..." : selectedLanguage === "de" ? "Generierung läuft..." : selectedLanguage === "fr" ? "Génération en cours..." : "Generating quote..."}</h3>
                <p className="text-xs text-slate-400 max-w-xs leading-relaxed animate-pulse">
                  {selectedLanguage === "it" ? "Unione dei listini nazionali, calcolo del tempo stimativo di opera, estrazione normative e asseverazioni edili." : selectedLanguage === "de" ? "Abgleich lokaler Preisdaten, Projektzeit-Schätzung sowie Zusammenstellung behördlicher Vorgaben." : selectedLanguage === "fr" ? "Extraction des réglementations, calcul des taux, intégration des devis locaux et logistiques." : "Evaluating regional cost variables, standard working timelines, applicable building rules and safety guidelines."}
                </p>
                <div className="mt-8 space-y-2 w-full text-left text-[10px] bg-slate-950/60 p-3 rounded-lg border border-slate-800 font-mono text-slate-500">
                  <div>▸ {selectedLanguage === "it" ? "Inizializzazione prompt @google/genai..." : selectedLanguage === "de" ? "Prompt-Initialisierung @google/genai..." : selectedLanguage === "fr" ? "Initialisation du prompt @google/genai..." : "Initializing prompt @google/genai..."}</div>
                  <div className="animate-pulse">▸ {selectedLanguage === "it" ? "Analisi conformità cantiere edili..." : selectedLanguage === "de" ? "Baustellenanalyse und länderspezifische Regeln..." : selectedLanguage === "fr" ? "Analyse de conformité du chantier et des normes..." : "Analyzing safety regulations and compliant codes..."}</div>
                  <div className="opacity-60">▸ {selectedLanguage === "it" ? "Generazione lettera cliente personalizzata..." : selectedLanguage === "de" ? "Erstellung personalisiertes Angebotsschreiben..." : selectedLanguage === "fr" ? "Génération lettre d'offre client personnalisée..." : "Drafting professional business proposal letter..."}</div>
                </div>
              </div>
            )}

            {/* Generated results rendering */}
            {quoteResult && !loading && (
              <div className="flex-1 flex flex-col" id="preview_content_wrapper">
                
                {/* Header overview controls: Responsive wrap support */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800 pb-4 mb-4" id="preview_meta_controls">
                  <div>
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">{selectedLanguage === "it" ? "PREVENTIVO GENERATO" : selectedLanguage === "de" ? "ANGEBOT ERSTELLT" : selectedLanguage === "fr" ? "DEVIS GÉNÉRÉ" : "GENERATED QUOTE"}</span>
                    <h3 className="text-sm font-bold text-white truncate max-w-[200px]">
                      {projectName || `Ditta ${activeSector.name}`}
                    </h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
                    <button
                      onClick={copyToClipboard}
                      className="px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-705 text-white border border-slate-700 hover:border-slate-600 rounded-lg shadow-sm transition flex items-center gap-1.5 cursor-pointer"
                      title={selectedLanguage === "it" ? "Copia tutto il preventivo e la lettera" : selectedLanguage === "de" ? "Alles kopieren" : selectedLanguage === "fr" ? "Copier le devis entier" : "Copy full quote and accompanying letter"}
                      id="btn_copy_to_clip"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">{selectedLanguage === "it" ? "Copiato" : selectedLanguage === "de" ? "Kopiert" : selectedLanguage === "fr" ? "Copié" : "Copied"}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>{selectedLanguage === "it" ? "Copia" : selectedLanguage === "de" ? "Kopieren" : selectedLanguage === "fr" ? "Copier" : "Copy"}</span>
                        </>
                      )}
                    </button>
                    
                    <button
                      onClick={exportToPDF}
                      className="px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-750 text-white rounded-lg shadow-sm transition flex items-center gap-1.5 cursor-pointer"
                      id="btn_download_pdf"
                      title={selectedLanguage === "it" ? "Salva come documento PDF professionale" : selectedLanguage === "de" ? "Als PDF herunterladen" : selectedLanguage === "fr" ? "Télécharger le fichier PDF" : "Download professional PDF document"}
                    >
                      <FileDown className="w-3.5 h-3.5" />
                      <span>{selectedLanguage === "it" ? "Scarica PDF" : selectedLanguage === "de" ? "PDF herunterladen" : selectedLanguage === "fr" ? "Télécharger PDF" : "Download PDF"}</span>
                    </button>

                    <button
                      onClick={handleOpenEmailModal}
                      className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-750 text-white rounded-lg shadow-sm transition flex items-center gap-1.5 cursor-pointer"
                      id="btn_send_email"
                      title={selectedLanguage === "it" ? "Invia il preventivo come allegato PDF via email" : selectedLanguage === "de" ? "PDF als E-Mail-Anhang senden" : selectedLanguage === "fr" ? "Envoyer le devis par e-mail en pièce jointe" : "Send quote PDF as email attachment"}
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{selectedLanguage === "it" ? "Invia per Email" : selectedLanguage === "de" ? "Per E-Mail" : selectedLanguage === "fr" ? "Par e-mail" : "Email PDF"}</span>
                    </button>

                    <button
                      onClick={() => {
                        window.print();
                      }}
                      className="px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition flex items-center gap-1.5 cursor-pointer"
                      id="btn_print_quote"
                    >
                      <span>{selectedLanguage === "it" ? "Stampa" : selectedLanguage === "de" ? "Drucken" : selectedLanguage === "fr" ? "Imprimer" : "Print"}</span>
                    </button>
                  </div>
                </div>

                {/* Tab layout selector */}
                <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-xl mb-4 text-xs font-medium" id="tab_preview_selectors">
                  <button
                    onClick={() => setInfoTab("preview")}
                    className={`py-2 px-1.5 rounded-lg text-center transition cursor-pointer ${
                      infoTab === "preview" ? "bg-slate-800 text-white font-semibold" : "text-slate-400 hover:text-white"
                    }`}
                    id="tab_opt_preview"
                  >
                    {selectedLanguage === "it" ? "Offerta Commerciale" : selectedLanguage === "de" ? "Angebot" : selectedLanguage === "fr" ? "Offre commerciale" : "Commercial Offer"}
                  </button>
                  <button
                    onClick={() => setInfoTab("certifications")}
                    className={`py-2 px-1.5 rounded-lg text-center transition cursor-pointer ${
                      infoTab === "certifications" ? "bg-slate-800 text-emerald-400 font-semibold" : "text-slate-400 hover:text-white"
                    }`}
                    id="tab_opt_cert"
                  >
                    {selectedLanguage === "it" ? "Normative e Certificati" : selectedLanguage === "de" ? "Normen & Zeugnisse" : selectedLanguage === "fr" ? "Normes & Certificats" : "Standards & Certif."}
                  </button>
                  <button
                    onClick={() => setInfoTab("feasibility")}
                    className={`py-2 px-1.5 rounded-lg text-center transition cursor-pointer ${
                      infoTab === "feasibility" ? "bg-slate-800 text-amber-400 font-semibold" : "text-slate-400 hover:text-white"
                    }`}
                    id="tab_opt_feasibility"
                  >
                    {selectedLanguage === "it" ? "Fattibilità & Rischi" : selectedLanguage === "de" ? "Machbarkeit & Risiken" : selectedLanguage === "fr" ? "Faisabilité & Risques" : "Feasibility & Risks"}
                  </button>
                </div>

                {/* TAB 1: COMMERCIAL QUOTE & LETTER PREVIEW */}
                {infoTab === "preview" && (
                  <div className="flex-1 flex flex-col gap-4 overflow-y-auto max-h-[500px] pr-1" id="tab_commercial_quote">
                    
                    {/* INTESTAZIONE DELLA PROPRIA AZIENDA (MITTENTE) NELLA PREVIEW */}
                    <div className="bg-slate-900 rounded-xl p-4 border border-slate-800/80 flex flex-col sm:flex-row justify-between items-start gap-4">
                      <div className="flex items-start gap-3">
                        {companyLogo ? (
                          <div className="w-14 h-14 bg-white rounded-lg p-1 flex items-center justify-center border border-slate-750 flex-shrink-0 overflow-hidden shadow-xs">
                            <img src={companyLogo} alt="Logo" referrerPolicy="no-referrer" className="max-w-full max-h-full object-contain" />
                          </div>
                        ) : (
                          <div className="w-14 h-14 bg-slate-800 rounded-lg flex flex-col items-center justify-center border border-slate-700 flex-shrink-0 text-slate-400">
                            <Building2 className="w-5 h-5 mb-0.5 text-slate-500" />
                            <span className="text-[7px] uppercase tracking-wider font-bold">{selectedLanguage === "it" ? "Senza Logo" : selectedLanguage === "de" ? "Kein Logo" : selectedLanguage === "fr" ? "Sans Logo" : "No Logo"}</span>
                          </div>
                        )}
                        <div className="text-left font-sans">
                          <h4 className="text-xs font-bold text-white leading-snug">{companyName || (selectedLanguage === "it" ? "Professionista Edile" : selectedLanguage === "de" ? "Baufachmann" : selectedLanguage === "fr" ? "Artisan du Bâtiment" : "Construction Specialist")}</h4>
                          <p className="text-[9px] text-slate-400 font-mono mt-0.5">P.IVA / VAT: {companyVat || "N/A"}</p>
                          <p className="text-[9px] text-slate-400 mt-0.5 truncate max-w-[180px] sm:max-w-xs">{companyAddress || (selectedLanguage === "it" ? "Sede non dichiarata" : selectedLanguage === "de" ? "Adresse nicht angegeben" : selectedLanguage === "fr" ? "Aucune adresse indiquée" : "Address N/A")}</p>
                        </div>
                      </div>
                      <div className="text-left sm:text-right text-[9.5px] text-slate-420 font-sans space-y-0.5 border-t sm:border-t-0 border-slate-800/60 pt-2 sm:pt-0 w-full sm:w-auto">
                        <p className="font-bold text-slate-450 uppercase tracking-widest text-[8px]">{selectedLanguage === 'it' ? 'EMITTENTE / DIRETTORE TECNICO' : selectedLanguage === 'de' ? 'AUSSTELLER / TECHNISCHER LEITER' : selectedLanguage === 'fr' ? 'ÉMETTEUR / DIRECTEUR TECHNIQUE' : 'ISSUER / TECHNICAL RESPONSIBLE'}</p>
                        <p>{companyPhone || "Tel. N/A"}</p>
                        <p>{companyEmail || "Email N/A"}</p>
                        {companyWebsite && <p className="text-blue-400 hover:underline cursor-pointer">{companyWebsite}</p>}
                      </div>
                    </div>

                    {/* CUSTOM LETTER (ARTISAN PRESENTATION) */}
                    <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-800">
                      <div className="text-[11px] font-bold text-slate-400 uppercase mb-2 tracking-wide flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5 text-blue-400" /> {selectedLanguage === "it" ? "Lettera di Accompagnamento Client-Facing" : selectedLanguage === "de" ? "Begleitschreiben für Kunden" : selectedLanguage === "fr" ? "Lettre de présentation client" : "Client-Facing Presentation Letter"}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed italic whitespace-pre-line font-serif pl-3 border-l-2 border-blue-500 text-left">
                        "{quoteResult.customLetter}"
                      </p>
                    </div>

                    {/* TABLE BREAKDOWN - REAL COST ITEMS */}
                    <div className="bg-slate-950 rounded-xl p-4 border border-slate-900">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">{selectedLanguage === "it" ? "Computo Metrico Estimativo" : selectedLanguage === "de" ? "Detaillierte Massenberechnung" : selectedLanguage === "fr" ? "Métré de l'ouvrage" : "Estimated Quantities and Items"}</span>
                        <span className="text-[10px] text-slate-500">{selectedLanguage === "it" ? "Tempo stimato: " : selectedLanguage === "de" ? "Veranschlagte Zeit: " : selectedLanguage === "fr" ? "Temps estimé : " : "Estimated duration: "}<strong className="text-white">{quoteResult.estimatedTime}</strong></span>
                      </div>

                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {quoteResult.costsBreakdown.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-start gap-4 py-2 border-b border-slate-800/60 text-xs">
                            <div className="min-w-0 flex-1">
                              <span className="block text-slate-200 font-medium truncate text-left">{item.item}</span>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="text-[10px] text-slate-400 font-mono">
                                  {item.quantity} {item.unit} × {item.unitPrice} {activeCountry.currencySymbol}
                                </span>
                                <span className={`text-[9px] px-1.5 rounded-full font-bold uppercase ${
                                  item.source === "listino" ? "bg-blue-900/40 text-blue-300" : "bg-purple-900/40 text-purple-300"
                                }`}>
                                  {item.source === "listino" ? (selectedLanguage === "it" ? "listino" : selectedLanguage === "de" ? "preisliste" : selectedLanguage === "fr" ? "tarif" : "price list") : (selectedLanguage === "it" ? "stimatore " : selectedLanguage === "de" ? "ki schätzer" : selectedLanguage === "fr" ? "ia" : "ai estimation")}
                                </span>
                              </div>
                            </div>
                            <span className="font-mono text-slate-100 font-bold ml-2">
                              {item.total.toFixed(0)} {activeCountry.currencySymbol}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* VAT, DISCOUNTS AND TOTAL FORM KEYBOARD */}
                      <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-400 text-left">
                        <div className="flex justify-between items-center">
                          <span>{selectedLanguage === "it" ? "Subtotale Lavorazioni:" : selectedLanguage === "de" ? "Zwischensumme Arbeiten:" : selectedLanguage === "fr" ? "Sous-total travaux :" : "Subtotal Operations:"}</span>
                          <span className="font-mono text-slate-300 font-semibold">{quoteResult.totalAmount.toFixed(0)} {activeCountry.currencySymbol}</span>
                        </div>

                        {/* Interactive discount */}
                        <div className="flex justify-between items-center">
                          <label className="flex items-center gap-1" htmlFor="discount_input_number">
                            <span>{selectedLanguage === "it" ? "Sconto ditta applicato" : selectedLanguage === "de" ? "Rabatt angewendet" : selectedLanguage === "fr" ? "Remise appliquée" : "Company discount applied"} ({activeCountry.currencySymbol}):</span>
                          </label>
                          <input
                            id="discount_input_number"
                            type="number"
                            className="bg-slate-900 border border-slate-800 rounded font-mono text-xs w-16 text-right px-1 text-white py-0.5"
                            value={discountAmount}
                            onChange={(e) => setDiscountAmount(Number(e.target.value))}
                          />
                        </div>

                        {/* Interactive VAT based on country */}
                        <div className="flex justify-between items-center">
                          <label className="flex items-center gap-1 text-xs" htmlFor="select_iva_rate">
                            <span>{selectedLanguage === "it" ? "Aliquota d'Imposta (IVA)" : selectedLanguage === "de" ? "Steuersatz (MwSt.)" : selectedLanguage === "fr" ? "Taux d'imposition (TVA)" : "Tax Rate (VAT)"} {activeCountry.name}:</span>
                          </label>
                          <select
                            id="select_iva_rate"
                            className="bg-slate-900 border border-slate-800 rounded text-xs px-1 text-white py-0.5 font-mono"
                            value={ivaRate}
                            onChange={(e) => setIvaRate(Number(e.target.value))}
                          >
                            {activeCountry.vatOptions.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* FINAL CONSOLIDATED AMOUNTS */}
                        <div className="pt-3 border-t border-slate-800/80">
                          <div className="flex justify-between items-center font-bold text-sm text-slate-300">
                            <span>{selectedLanguage === "it" ? "Imponibile Lordo:" : selectedLanguage === "de" ? "Steuerbarer Betrag:" : selectedLanguage === "fr" ? "Montant imposable :" : "Taxable Subtotal:"}</span>
                            <span className="font-mono">{(quoteResult.totalAmount - discountAmount).toFixed(0)} {activeCountry.currencySymbol}</span>
                          </div>
                          <div className="flex justify-between items-center font-bold text-lg text-emerald-400 mt-1">
                            <span>{selectedLanguage === "it" ? "Totale Finale (IVA incl.):" : selectedLanguage === "de" ? "Endbetrag (inkl. MwSt.):" : selectedLanguage === "fr" ? "Total général (TVA incl.) :" : "Grand Total (VAT incl.):"}</span>
                            <span className="font-mono">
                              {((quoteResult.totalAmount - discountAmount) * (1 + ivaRate / 100)).toFixed(2)} {activeCountry.currencySymbol}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 2: CERTIFICATIONS & MANDATORY LAWS */}
                {infoTab === "certifications" && (
                  <div className="flex-1 flex flex-col gap-4 overflow-y-auto max-h-[500px] pr-1" id="tab_certifications_section">
                    <div className="text-xs bg-slate-950 p-3 rounded-lg border border-slate-800 mb-2 text-slate-400 text-left">
                      {selectedLanguage === "it" ? `I preventivi per lavori professionali eseguiti a norma in ${activeCountry.name} necessitano della verifica di determinati adempimenti normativi per evitare sanzioni.` : selectedLanguage === "de" ? `Angebote für fachgerecht ausgeführte Arbeiten in ${activeCountry.name} erfordern die Überprüfung bestimmter gesetzlicher Auflagen zur Vermeidung von Bußgeldern.` : selectedLanguage === "fr" ? `Les devis de travaux professionnels conformes aux normes en ${activeCountry.name} requièrent la vérification d'obligations réglementaires pour éviter les sanctions.` : `Estimates for professional works executed under standards in ${activeCountry.name} require verifying specific regulatory steps to avoid fines.`}
                    </div>

                    <div className="space-y-3" id="certs_stack">
                      {quoteResult.certifications.map((cert, index) => (
                        <div key={index} className="bg-slate-850 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition" id={`cert_block_${index}`}>
                          <div className="flex justify-between items-start gap-2 mb-2">
                            <h4 className="text-xs font-bold text-white flex items-center gap-1.5 leading-tight text-left">
                              <Award className="w-4 h-4 text-emerald-400 flex-shrink-0" /> {cert.title}
                            </h4>
                            <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                              cert.mandatory ? "bg-red-950 text-red-400 border border-red-800" : "bg-slate-900 text-slate-400 border border-slate-800"
                            }`}>
                              {cert.mandatory ? (selectedLanguage === "it" ? "Obbligatorio" : selectedLanguage === "de" ? "Pflicht" : selectedLanguage === "fr" ? "Obligatoire" : "Mandatory") : (selectedLanguage === "it" ? "Consigliato" : selectedLanguage === "de" ? "Empfohlen" : selectedLanguage === "fr" ? "Conseillé" : "Recommended")}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed mb-3 text-left">
                            {cert.description}
                          </p>
                          <div className="bg-slate-900/60 p-2 rounded text-[10px] font-mono text-slate-400 flex items-center justify-between border border-slate-800">
                            <span>{selectedLanguage === "it" ? "Riferimento di Legge:" : selectedLanguage === "de" ? "Gesetzesgrundlage:" : selectedLanguage === "fr" ? "Référence légale :" : "Legal Reference:"}</span>
                            <span className="text-emerald-400 font-semibold">{cert.lawReference}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Standard localized safety guidelines */}
                    <div className="mt-2 bg-blue-950/40 p-3.5 rounded-xl border border-blue-900/40 text-xs text-left">
                      <div className="flex items-center gap-2 text-blue-400 font-bold mb-1">
                        <Info className="w-4 h-4" /> {selectedLanguage === "it" ? "Agevolazioni & Detrazioni Fiscali" : selectedLanguage === "de" ? "Steuerabzüge & Förderungen" : selectedLanguage === "fr" ? "Éligibilité aux déductions fiscales" : "Tax Deductions & Subsidies"} ({activeCountry.name}):
                      </div>
                      <p className="text-[11px] text-blue-300/90 leading-relaxed">
                        {selectedCountryId === "IT" && (
                          <span>Per usufruire di bonus casa, ecobonus o ristrutturazione energetica (ENEA) in Italia, i pagamenti devono essere effettuati tassativamente con <strong>bonifico parlante</strong> indicando la norma corretta e le ritenute d'acconto.</span>
                        )}
                        {selectedCountryId === "CH" && (
                          <span>In Svizzera, verificare i programmi di incentivi cantonali d'efficienza energetica e le detrazioni fiscali per lavori approvati secondo lo standard costruttivo SIA.</span>
                        )}
                        {selectedCountryId === "DE" && (
                          <span>In Deutschland können Handwerkerleistungen steuerlich abgesetzt werden (§ 35a EStG - Arbeitskosten direkt abziehbar bei Instandhaltungen).</span>
                        )}
                        {selectedCountryId === "FR" && (
                          <span>En France, pour bénéficier des aides de l'État (MaPrimeRénov') ou de la TVA réduite à 5.5%, il faut faire appel à un artisan certifié RGE.</span>
                        )}
                        {selectedCountryId === "ES" && (
                          <span>En España, compruebe las deducciones del IRPF por obras de mejora térmicas de la vivienda habitual y el CTE aplicable.</span>
                        )}
                      </p>
                    </div>
                  </div>
                )}

                {/* TAB 3: FEASIBILITY AND RISK ASSESSMENT */}
                {infoTab === "feasibility" && (
                  <div className="flex-1 flex flex-col gap-4 overflow-y-auto max-h-[500px] pr-1" id="tab_feasibility_insights">
                    
                    {/* FEASIBILITY SCORE CARD */}
                    <div className="bg-slate-950 rounded-xl p-4 border border-slate-900 flex items-center justify-between gap-4">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-0.5 text-left">{selectedLanguage === "it" ? "ESITO ANALISI FATTIBILITÀ" : selectedLanguage === "de" ? "ERGEBNIS DER MACHBARKEITSPRÜFUNG" : selectedLanguage === "fr" ? "RÉSULTAT DE L'ANALYSE DE FAISABILITÉ" : "FEASIBILITY ANALYSIS OUTCOME"}</span>
                        <h4 className={`text-base font-bold text-left ${
                          quoteResult.feasibility.rating.toLowerCase().includes("riserve") ? "text-amber-400" : "text-emerald-400"
                        }`}>
                          {quoteResult.feasibility.rating}
                        </h4>
                      </div>
                      <div className={`p-2.5 rounded-xl bg-slate-900 border ${
                        quoteResult.feasibility.rating.toLowerCase().includes("riserve") ? "border-amber-500 text-amber-400" : "border-emerald-500 text-emerald-400"
                      }`}>
                        {quoteResult.feasibility.rating.toLowerCase().includes("riserve") ? (
                          <AlertTriangle className="w-6 h-6 animate-pulse" />
                        ) : (
                          <CheckCircle2 className="w-6 h-6" />
                        )}
                      </div>
                    </div>

                    {/* AI SUMMARY ANALYSIS */}
                    <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-4 text-left">
                      <h4 className="text-xs font-bold text-white mb-1.5 flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5 text-blue-400" /> {selectedLanguage === "it" ? "Analisi Tecnica Ambientale" : selectedLanguage === "de" ? "Technische Umweltanalyse" : selectedLanguage === "fr" ? "Analyse technique et environnementale" : "Technical & Site Environmental Analysis"}
                      </h4>
                      <p className="text-xs text-slate-350 leading-relaxed">
                        {quoteResult.feasibility.analysis}
                      </p>
                    </div>

                    {/* HAZARDS / RISK PILES */}
                    <div className="space-y-3 text-left" id="hazards_piles">
                      <div>
                        <span className="block text-[11px] font-bold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 text-red-400" /> {selectedLanguage === "it" ? "Fattori di Rischio Individuati" : selectedLanguage === "de" ? "Identifizierte Risikofaktoren" : selectedLanguage === "fr" ? "Facteurs de risques identifiés" : "Identified Risk Factors"} ({quoteResult.feasibility.risks.length})
                        </span>
                        <div className="space-y-1.5">
                          {quoteResult.feasibility.risks.map((risk, index) => (
                            <div key={index} className="bg-red-950/20 text-red-300 border border-red-900/40 p-2.5 rounded-lg text-xs leading-relaxed flex items-start gap-2">
                              <span className="font-bold text-red-500 mt-0.5">⚠️</span>
                              <span>{risk}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* ACTIONABLE RECOMMENDATIONS */}
                      <div>
                        <span className="block text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {selectedLanguage === "it" ? "Raccomandazioni Operative" : selectedLanguage === "de" ? "Operative Empfehlungen" : selectedLanguage === "fr" ? "Recommandations opérationnelles" : "Actionable Recommendations"} ({quoteResult.feasibility.recommendations.length})
                        </span>
                        <div className="space-y-1.5">
                          {quoteResult.feasibility.recommendations.map((rec, index) => (
                            <div key={index} className="bg-slate-900 text-slate-300 border border-slate-800 p-2.5 rounded-lg text-xs leading-relaxed flex items-start gap-2">
                              <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                              <span>{rec}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                )}

              </div>
            )}

          </div>
        </section>

      </main>

      {/* Craftsmanship footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto px-6 py-6" id="app_footer">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div className="text-center md:text-left">
            {selectedLanguage === "it" ? (
              <span><strong>Preventivatore Edile AI © 2026</strong> — Generatore professionale conforme al preziario edilizia edili. Calcolo istantaneo delle certificazioni e idoneità tecnico-professionale.</span>
            ) : selectedLanguage === "de" ? (
              <span><strong>KI Bauangebot-Generator © 2026</strong> — Professionelle Arbeitsmappen nach länderspezifischen Richtlinien. Sofortige Berechnung von Nachweisen.</span>
            ) : selectedLanguage === "fr" ? (
              <span><strong>Devis Bâtiment IA © 2026</strong> — Générateur professionnel conforme aux spécificités territoriales. Calcul immédiat des obligations et conformité.</span>
            ) : (
              <span><strong>AI Construction Estimator © 2026</strong> — Professional quote generator compliant with standard local rates. Instantly check regional laws & safety certifications.</span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-blue-600 transition cursor-pointer">{selectedLanguage === "it" ? "Note Legali" : selectedLanguage === "de" ? "Impressum" : selectedLanguage === "fr" ? "Mentions Légales" : "Legal Notice"}</span>
            <span className="hover:text-blue-600 transition cursor-pointer">{selectedLanguage === "it" ? "Supporto Tecnico" : selectedLanguage === "de" ? "Support" : selectedLanguage === "fr" ? "Support Technique" : "Support"}</span>
            <span className="hover:text-blue-600 transition cursor-pointer">{selectedLanguage === "it" ? "Feedback" : selectedLanguage === "de" ? "Feedback" : selectedLanguage === "fr" ? "Avis" : "Feedback"}</span>
          </div>
        </div>
      </footer>

      {/* EMAIL COMPOSITION MODAL */}
      {isEmailModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fade-in" id="email_modal_overlay">
          <div className="bg-white rounded-2xl w-full max-w-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] animate-scale-up" id="email_modal_container">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-4 flex justify-between items-center mr-0">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-indigo-400" />
                <div className="text-left">
                  <h3 className="text-sm font-bold">{selectedLanguage === "it" ? "Invia Preventivo via Email" : selectedLanguage === "de" ? "Angebot per E-Mail senden" : selectedLanguage === "fr" ? "Envoyer le devis par e-mail" : "Send Quote via Email"}</h3>
                  <p className="text-[10px] text-slate-400">{selectedLanguage === "it" ? "Invia l'offerta con il PDF professionale in allegato" : selectedLanguage === "de" ? "Senden Sie das Angebot mit dem professionellen PDF im Anhang" : selectedLanguage === "fr" ? "Envoyez l'offre commerciale avec le PDF professionnel joint" : "Send the commercial offer with the professional PDF attached"}</p>
                </div>
              </div>
              <button 
                onClick={() => setIsEmailModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSendEmail} className="p-5 flex-1 overflow-y-auto space-y-4">
              
              {/* Recipient Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 text-left">
                  {selectedLanguage === "it" ? "Email Destinatario (Cliente)" : selectedLanguage === "de" ? "Empfänger E-Mail (Kunde)" : selectedLanguage === "fr" ? "E-mail du destinataire (Client)" : "Recipient's Email Address (Client)"} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="esempio@cliente.com"
                  value={emailRecipient}
                  onChange={(e) => setEmailRecipient(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-800 text-left bg-white"
                  id="input_email_recipient"
                />
              </div>

              {/* Email Subject */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 text-left">
                  {selectedLanguage === "it" ? "Oggetto del Messaggio" : selectedLanguage === "de" ? "Betreff der Nachricht" : selectedLanguage === "fr" ? "Objet du Message" : "Message Subject"} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={selectedLanguage === "it" ? "Oggetto dell'email" : selectedLanguage === "de" ? "E-Mail-Betreff" : selectedLanguage === "fr" ? "Objet du mail" : "Email subject line"}
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-semibold text-slate-800 text-left bg-white"
                  id="input_email_subject"
                />
              </div>

              {/* Email Body / Content */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 text-left">
                  {selectedLanguage === "it" ? "Corpo del Messaggio" : selectedLanguage === "de" ? "Nachrichtentext" : selectedLanguage === "fr" ? "Corps du Message" : "Email Message Body"} <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={8}
                  required
                  placeholder={selectedLanguage === "it" ? "Scrivi qui il corpo del messaggio per accompagnare l'offerta..." : selectedLanguage === "de" ? "Schreiben Sie hier den Begleittext für das Angebot..." : selectedLanguage === "fr" ? "Saisissez ici le texte du message pour accompagner l'offre..." : "Write your custom message to accompany the professional construction offer..."}
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-700 leading-relaxed font-sans text-left bg-white"
                  id="textarea_email_body"
                />
              </div>

              {/* Attached Document Preview Indicator */}
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-red-500" />
                  <div className="text-left font-sans">
                    <span className="block text-xs font-bold text-slate-800">preventivo_edilizia.pdf</span>
                    <span className="text-[10px] text-slate-400 font-mono">{selectedLanguage === "it" ? "Documento PDF firmato e generato" : selectedLanguage === "de" ? "Generierte und signierte PDF-Datei" : selectedLanguage === "fr" ? "Document PDF généré et signé" : "Signed and generated PDF document"}</span>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200 font-medium">
                  {selectedLanguage === "it" ? "Allegato pronto" : selectedLanguage === "de" ? "Anhang bereit" : selectedLanguage === "fr" ? "Pièce jointe prête" : "Attachment ready"}
                </span>
              </div>

              {/* Status and feedback messages */}
              {emailStatus && (
                <div className={`p-4 rounded-xl border text-xs leading-relaxed text-left font-sans ${
                  emailStatus === "success" 
                    ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
                    : "bg-red-50 border-red-200 text-red-800"
                }`}>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-sm leading-none">{emailStatus === "success" ? "✓" : "⚠️"}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-left">{emailStatusMsg}</p>
                      
                      {/* Ethereal test inbox link */}
                      {emailStatus === "success" && emailTestUrl && (
                        <div className="mt-2.5 pt-2.5 border-t border-emerald-200/50">
                          <p className="text-[11px] text-emerald-700 leading-snug mb-2 font-normal text-left">
                            {selectedLanguage === "it" ? "Piattaforma in ambiente sandbox di sviluppo. Puoi visualizzare l'email inviata e scaricare il PDF recapitato direttamente dalla inbox di prova temporanea:" : selectedLanguage === "de" ? "Entwicklungs-Sandboxumgebung. Sie können die gesendete E-Mail anzeigen und das empfangene PDF direkt im temporären Posteingang herunterladen:" : selectedLanguage === "fr" ? "Environnement de développement sandbox. Vous pouvez voir l'e-mail envoyé et télécharger le PDF livré directement depuis la boîte de réception d'essai temporaire :" : "Development sandbox platform. You can view the sent email and download the delivered PDF directly from the temporary test inbox:"}
                          </p>
                          <div className="text-left">
                            <a
                              href={emailTestUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 font-bold text-indigo-700 hover:text-indigo-900 underline"
                            >
                              <span>{selectedLanguage === "it" ? "Apri Inbox di Test ↗" : selectedLanguage === "de" ? "Test-Inbox öffnen ↗" : selectedLanguage === "fr" ? "Ouvrir la boîte de test ↗" : "Open Test Inbox ↗"}</span>
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Actions */}
              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEmailModalOpen(false)}
                  disabled={sendingEmail}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg transition disabled:opacity-50 cursor-pointer"
                >
                  {selectedLanguage === "it" ? "Chiudi" : selectedLanguage === "de" ? "Schließen" : selectedLanguage === "fr" ? "Fermer" : "Close"}
                </button>
                <button
                  type="submit"
                  disabled={sendingEmail}
                  className="px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-750 text-white rounded-lg shadow-md transition flex items-center gap-1.5 disabled:opacity-75 focus:outline-none cursor-pointer"
                  id="btn_submit_email"
                >
                  {sendingEmail ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>{selectedLanguage === "it" ? "Invio in corso..." : selectedLanguage === "de" ? "Wird gesendet..." : selectedLanguage === "fr" ? "Envoi en cours..." : "Sending email..."}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>{selectedLanguage === "it" ? "Invia Email" : selectedLanguage === "de" ? "E-Mail senden" : selectedLanguage === "fr" ? "Envoyer le mail" : "Send Email"}</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
