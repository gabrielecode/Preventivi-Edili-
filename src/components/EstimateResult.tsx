import React, { useState } from "react";
import { 
  AlertTriangle, 
  Clock, 
  Wrench, 
  ShoppingCart, 
  ShieldCheck, 
  ArrowLeft, 
  Calendar, 
  AlertCircle, 
  Check, 
  Building2, 
  UserCheck, 
  Sparkles,
  Download,
  Copy,
  Share2
} from "lucide-react";
import { sectorPriceLists, toolsCatalog, ToolItem } from "../data/priceLists";
import { TranslationDict } from "../data/translations";
import { jsPDF } from "jspdf";
import { LeadRequestModal } from "./LeadRequestModal";

interface Props {
  quoteResult: any;
  selectedItems: Array<{ id: string; name: string; unit: string; quantity: number }>;
  mode: "diy" | "pro" | "compare";
  activeCountry: any;
  onReset: () => void;
  t: TranslationDict;
}

export const EstimateResult: React.FC<Props> = ({
  quoteResult,
  selectedItems,
  mode,
  activeCountry,
  onReset,
  t,
}) => {
  const [ownedTools, setOwnedTools] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);

  const toggleToolOwned = (toolId: string) => {
    setOwnedTools(prev => ({ ...prev, [toolId]: !prev[toolId] }));
  };

  const sectorInfo = sectorPriceLists.find(s => s.name === quoteResult.sector) || sectorPriceLists[0];

  const toolsMap = new Map<string, ToolItem>();
  const estimatedDays = quoteResult.diyEstimate?.estimatedDays || 3;
  const estimatedHours = quoteResult.diyEstimate?.estimatedHours || 12;

  selectedItems.forEach(sel => {
    const itemDef = sectorInfo.items.find(it => it.id === sel.id || it.name === sel.name);
    if (itemDef && itemDef.tools) {
      itemDef.tools.forEach(tId => {
        const toolObj = toolsCatalog.find(t => t.id === tId);
        if (toolObj && !toolsMap.has(tId)) {
          toolsMap.set(tId, toolObj);
        }
      });
    }
  });

  const toolsList = Array.from(toolsMap.values());

  let toolsCostTotal = 0;
  const toolCalculated = toolsList.map(tool => {
    const rentCost = tool.rentPricePerDay * estimatedDays;
    const bestCost = Math.min(tool.buyPrice, rentCost);
    const isOwned = !!ownedTools[tool.id];
    const effectiveCost = isOwned ? 0 : bestCost;
    toolsCostTotal += effectiveCost;
    return {
      ...tool,
      bestCost,
      isOwned,
      effectiveCost,
      isRentCheaper: rentCost < tool.buyPrice
    };
  });

  const baseDiyTotal = quoteResult.diyEstimate?.totalIncl || 0;
  const originalToolsTotal = toolCalculated.reduce((acc, t) => acc + t.bestCost, 0);
  const adjustedDiyTotal = Math.max(0, baseDiyTotal - originalToolsTotal + toolsCostTotal);
  const adjustedDiyMin = adjustedDiyTotal * 0.9;
  const adjustedDiyMax = adjustedDiyTotal * 1.1;

  const proTotal = quoteResult.professionalEstimate?.totalIncl || 0;
  const currentSavings = Math.max(0, proTotal - adjustedDiyTotal);

  const ratingText = quoteResult.feasibility?.rating || "Fattibile";
  const ratingLower = ratingText.toLowerCase();
  let ratingColor = "bg-emerald-50 text-emerald-800 border-emerald-200";
  let ratingDot = "bg-emerald-500";
  if (ratingLower.includes("sconsigliat") || ratingLower.includes("riserv") || ratingLower.includes("abraten") || ratingLower.includes("déconseillé")) {
    ratingColor = "bg-amber-50 text-amber-800 border-amber-200";
    ratingDot = "bg-amber-500";
  }
  if (ratingLower.includes("pericolos") || ratingLower.includes("vietat") || ratingLower.includes("gefährlich") || ratingLower.includes("dangereux")) {
    ratingColor = "bg-red-50 text-red-800 border-red-200";
    ratingDot = "bg-red-500";
  }

  const shoppingList = (quoteResult.listinoBreakdown || []).map((item: any) => {
    const itemDef = sectorInfo.items.find(it => it.name === item.name || it.id === item.itemId);
    const wastePct = itemDef?.wastePct ?? 0.10;
    const qtyWithWaste = item.quantity * (1 + wastePct);
    const materialCostEst = item.total * (itemDef?.materialPct ?? 0.40) * (1 + wastePct);
    return {
      ...item,
      wastePct: Math.round(wastePct * 100),
      qtyWithWaste: Math.round(qtyWithWaste * 10) / 10,
      materialCostEst: Math.round(materialCostEst * 100) / 100
    };
  });

  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    const d = doc as any;
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 20;

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Riepilogo Stima Lavori", 15, y);
    y += 7;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text(`Settore: ${quoteResult.sector} | Data: ${new Date().toLocaleDateString()} | Paese: ${activeCountry.name}`, 15, y);
    y += 8;

    d.setLineWidth(0.4);
    d.setLineColor(200);
    d.line(15, y, pageWidth - 15, y);
    y += 8;

    // Costs
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.text("1. Intervalli di Costo Stimati (IVA inclusa)", 15, y);
    y += 6;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(`- Fai da Te: ${Math.round(adjustedDiyMin)} - ${Math.round(adjustedDiyMax)} ${activeCountry.currencySymbol} (${estimatedDays} giorni / ${estimatedHours} ore)`, 18, y);
    y += 5;
    doc.text(`- Professionista: ${Math.round(quoteResult.professionalEstimate?.minIncl || 0)} - ${Math.round(quoteResult.professionalEstimate?.maxIncl || 0)} ${activeCountry.currencySymbol}`, 18, y);
    y += 8;

    // Shopping List
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("2. Lista della Spesa & Materiali (con Sfrido)", 15, y);
    y += 6;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    shoppingList.forEach((item: any) => {
      if (y > 270) { doc.addPage(); y = 20; }
      doc.text(`• ${item.item || item.name}: ${item.qtyWithWaste} ${item.unit} (~${item.materialCostEst} ${activeCountry.currencySymbol})`, 18, y);
      y += 5;
    });
    y += 5;

    // Tools
    if (toolsList.length > 0) {
      if (y > 260) { doc.addPage(); y = 20; }
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("3. Attrezzatura & Utensili", 15, y);
      y += 6;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      toolCalculated.forEach((tool: any) => {
        if (y > 270) { doc.addPage(); y = 20; }
        const statusStr = tool.isOwned ? "Ce l'ho già (0 €)" : `${Math.round(tool.bestCost)} ${activeCountry.currencySymbol} (${tool.isRentCheaper ? 'Noleggio' : 'Acquisto'})`;
        doc.text(`• ${tool.name}: ${statusStr}`, 18, y);
        y += 5;
      });
      y += 5;
    }

    // Pro mandatory
    if (quoteResult.daAffidareAProfessionista && quoteResult.daAffidareAProfessionista.length > 0) {
      if (y > 260) { doc.addPage(); y = 20; }
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(180, 50, 50);
      doc.text("4. Lavori da Affidare Obbligatoriamente a Professionisti", 15, y);
      y += 6;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(0);
      quoteResult.daAffidareAProfessionista.forEach((item: any) => {
        if (y > 270) { doc.addPage(); y = 20; }
        doc.text(`• ${item.name}: ${item.reason}`, 18, y);
        y += 5;
      });
      y += 5;
    }

    // Disclaimer
    if (y > 230) { doc.addPage(); y = 20; }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Avvertenza Importante", 15, y);
    y += 4;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100);
    const splitDisclaimer = doc.splitTextToSize(t.disclaimerText, pageWidth - 30);
    doc.text(splitDisclaimer, 15, y);

    doc.save("riepilogo-stima-lavori.pdf");
  };

  const handleCopySummary = () => {
    const summaryText = `
RIEPILOGO STIMA LAVORI - ${quoteResult.sector} (${activeCountry.name})
Data: ${new Date().toLocaleDateString()}

1. INTERVALLI DI COSTO ESTIMATI (IVA inclusa):
- Fai da Te: ${Math.round(adjustedDiyMin)} - ${Math.round(adjustedDiyMax)} ${activeCountry.currencySymbol} (~${estimatedDays} giorni / ${estimatedHours} ore)
- Professionista: ${Math.round(quoteResult.professionalEstimate?.minIncl || 0)} - ${Math.round(quoteResult.professionalEstimate?.maxIncl || 0)} ${activeCountry.currencySymbol}

2. FATTIBILITÀ: ${ratingText}
${quoteResult.feasibility?.analysis || ""}

3. LISTA DELLA SPESA (con sfrido):
${shoppingList.map((i: any) => `- ${i.item || i.name}: ${i.qtyWithWaste} ${i.unit} (~${i.materialCostEst} ${activeCountry.currencySymbol})`).join("\n")}

4. ATTREZZATURA:
${toolCalculated.map((t: any) => `- ${t.name}: ${t.isOwned ? "Già posseduto" : Math.round(t.bestCost) + " " + activeCountry.currencySymbol}`).join("\n")}

${quoteResult.daAffidareAProfessionista && quoteResult.daAffidareAProfessionista.length > 0 ? "\n5. LAVORI OBBLIGATORI PROFESSIONISTA:\n" + quoteResult.daAffidareAProfessionista.map((p: any) => `- ${p.name}: ${p.reason}`).join("\n") : ""}

AVVERTENZA:
${t.disclaimerText}
    `.trim();

    navigator.clipboard.writeText(summaryText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Riepilogo Stima Lavori",
          text: `Stima ${quoteResult.sector} (${activeCountry.name}): Fai da Te ~${Math.round(adjustedDiyMin)}-${Math.round(adjustedDiyMax)} ${activeCountry.currencySymbol}, Professionista ~${Math.round(proTotal)} ${activeCountry.currencySymbol}.`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Condivisione annullata", err);
      }
    }
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Top bar with back button & export actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">{t.resultsTitle}</h2>
          <p className="text-sm text-slate-500 mt-0.5">{t.resultsSubtitle.replace("{country}", activeCountry.name)} ({activeCountry.flag})</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowLeadModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
            type="button"
          >
            <Building2 className="w-4 h-4" /> {t.requestProBtn}
          </button>

          <button
            onClick={handleDownloadPdf}
            className="flex items-center gap-2 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all cursor-pointer"
            type="button"
          >
            <Download className="w-4 h-4" /> {t.downloadPdfBtn}
          </button>

          <button
            onClick={handleCopySummary}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all cursor-pointer"
            type="button"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            {copied ? t.copiedSummarySuccess : t.copySummaryBtn}
          </button>

          {typeof navigator !== "undefined" && navigator.share && (
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-semibold transition-all cursor-pointer"
              type="button"
            >
              <Share2 className="w-4 h-4" /> {t.shareBtn}
            </button>
          )}

          <button
            onClick={onReset}
            className="flex items-center gap-2 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all cursor-pointer"
            type="button"
          >
            <ArrowLeft className="w-4 h-4" /> {t.newEstimateBtn}
          </button>
        </div>
      </div>

      {/* 1. Riepilogo in alto */}
      <div className={`grid grid-cols-1 ${mode === "compare" ? "md:grid-cols-2" : "max-w-xl mx-auto"} gap-5`}>
        {(mode === "compare" || mode === "diy") && (
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50/40 border border-emerald-200/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{t.diyCardTitle}</span>
                <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {t.diyCardTime.replace("{days}", String(estimatedDays)).replace("{hours}", String(estimatedHours))}
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-1">{t.diyCardDesc}</p>
              <div className="text-3xl font-extrabold text-emerald-900">
                {Math.round(adjustedDiyMin)} - {Math.round(adjustedDiyMax)} <span className="text-lg font-bold">{activeCountry.currencySymbol}</span>
              </div>
            </div>

            {mode === "compare" && currentSavings > 0 && (
              <div className="mt-6 pt-4 border-t border-emerald-200/60 flex items-center gap-2 text-emerald-800 text-xs font-bold">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>{t.diySavingsLabel.replace("{amount}", String(Math.round(currentSavings))).replace("{currency}", activeCountry.currencySymbol)}</span>
              </div>
            )}
          </div>
        )}

        {(mode === "compare" || mode === "pro") && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50/40 border border-blue-200/80 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{t.proCardTitle}</span>
                <span className="text-xs font-semibold text-blue-700 flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5" /> {t.proCardKey}
                </span>
              </div>
              <p className="text-xs text-slate-500 mb-1">{t.proCardDesc}</p>
              <div className="text-3xl font-extrabold text-blue-900">
                {Math.round(quoteResult.professionalEstimate?.minIncl || proTotal * 0.9)} - {Math.round(quoteResult.professionalEstimate?.maxIncl || proTotal * 1.1)} <span className="text-lg font-bold">{activeCountry.currencySymbol}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-blue-200/60 text-xs text-blue-800 font-medium">
              {t.proCardFeature}
            </div>
          </div>
        )}
      </div>

      {/* 2. Semaforo di fattibilità fai da te */}
      <div className={`p-6 rounded-3xl border ${ratingColor} shadow-sm space-y-3`}>
        <div className="flex items-center gap-3">
          <div className={`w-4 h-4 rounded-full ${ratingDot} animate-pulse`} />
          <h3 className="text-base font-bold uppercase tracking-wide">{t.feasibilityTitle.replace("{rating}", ratingText)}</h3>
        </div>
        <p className="text-sm leading-relaxed text-slate-700">
          {quoteResult.feasibility?.analysis || quoteResult.diySummaryNote}
        </p>
      </div>

      {/* 3. Lista della spesa (Materiali con sfrido) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-100 text-blue-700 rounded-xl">
            <ShoppingCart className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">{t.shoppingListTitle}</h3>
            <p className="text-xs text-slate-500">{t.shoppingListDesc}</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs text-slate-400 uppercase tracking-wider">
                <th className="pb-3 font-semibold">{t.itemHeader}</th>
                <th className="pb-3 font-semibold text-right">{t.netQtyHeader}</th>
                <th className="pb-3 font-semibold text-right">{t.wasteQtyHeader}</th>
                <th className="pb-3 font-semibold text-right">{t.estCostHeader}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {shoppingList.map((item: any, idx: number) => (
                <tr key={idx} className="hover:bg-slate-50/50">
                  <td className="py-3 font-medium text-slate-900">{item.item || item.name}</td>
                  <td className="py-3 text-right text-slate-600">{item.quantity} {item.unit}</td>
                  <td className="py-3 text-right font-semibold text-blue-700">{item.qtyWithWaste} {item.unit} <span className="text-[10px] text-slate-400 font-normal">(+{item.wastePct}%)</span></td>
                  <td className="py-3 text-right font-bold text-slate-900">{item.materialCostEst || Math.round(item.total * 0.4)} {activeCountry.currencySymbol}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Attrezzi (Acquisto vs Noleggio + Ce l'ho già) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-100 text-indigo-700 rounded-xl">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">{t.toolsTitle}</h3>
              <p className="text-xs text-slate-500">{t.toolsDesc}</p>
            </div>
          </div>
          <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-xl border border-indigo-100">
            {t.toolsTotal}: {Math.round(toolsCostTotal)} {activeCountry.currencySymbol}
          </span>
        </div>

        {toolsList.length === 0 ? (
          <p className="text-sm text-slate-400 py-4 text-center">{t.noToolsText}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {toolCalculated.map((tool) => (
              <div
                key={tool.id}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  tool.isOwned
                    ? "bg-slate-50 border-slate-200 opacity-75"
                    : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                }`}
              >
                <div className="flex items-start gap-3 flex-1">
                  <button
                    onClick={() => toggleToolOwned(tool.id)}
                    className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center border transition-all shrink-0 cursor-pointer ${
                      tool.isOwned
                        ? "bg-emerald-600 border-emerald-600 text-white"
                        : "border-slate-300 bg-white hover:border-slate-400"
                    }`}
                    type="button"
                  >
                    {tool.isOwned && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </button>
                  <div>
                    <p className={`text-sm font-semibold ${tool.isOwned ? "line-through text-slate-500" : "text-slate-900"}`}>
                      {tool.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {tool.isRentCheaper ? t.rentBetter : t.buyBetter} ({tool.isRentCheaper ? `${tool.rentPricePerDay} ${activeCountry.currencySymbol}/giorno` : `Acquisto: ${tool.buyPrice} ${activeCountry.currencySymbol}`})
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className={`text-sm font-bold ${tool.isOwned ? "text-emerald-700" : "text-slate-900"}`}>
                    {tool.isOwned ? t.alreadyOwned : `${Math.round(tool.bestCost)} ${activeCountry.currencySymbol}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. Lavori da affidare a un professionista */}
      {quoteResult.daAffidareAProfessionista && quoteResult.daAffidareAProfessionista.length > 0 && (
        <div className="bg-amber-50/60 rounded-3xl border border-amber-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-100 text-amber-800 rounded-xl">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-amber-900">{t.proMandatoryTitle}</h3>
              <p className="text-xs text-amber-700">{t.proMandatoryDesc}</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {quoteResult.daAffidareAProfessionista.map((item: any, idx: number) => (
              <div key={idx} className="p-4 bg-white rounded-2xl border border-amber-200 shadow-sm flex flex-col sm:flex-row justify-between gap-2">
                <span className="text-sm font-bold text-slate-900">{item.name}</span>
                <span className="text-xs text-amber-800 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200/60 self-start sm:self-auto">
                  {item.reason}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Passi principali, tempi, rischi e sicurezza */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-100 text-purple-700 rounded-xl">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">{t.stepsTitle}</h3>
              <p className="text-xs text-slate-500">{t.stepsDesc}</p>
            </div>
          </div>

          <div className="bg-purple-50/50 p-4 rounded-2xl border border-purple-100 mb-3">
            <p className="text-xs font-semibold text-purple-900">{t.diyTimeTotal}</p>
            <p className="text-sm font-bold text-purple-950 mt-0.5">
              {estimatedHours} ore complessive (circa {estimatedDays} giorni / {Math.ceil(estimatedDays / 2)} weekend)
            </p>
          </div>

          <ol className="space-y-2.5 pl-4 list-decimal text-sm text-slate-700">
            {(quoteResult.mainSteps || []).map((step: string, idx: number) => (
              <li key={idx} className="leading-relaxed">{step}</li>
            ))}
          </ol>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-red-100 text-red-700 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">{t.safetyTitle}</h3>
              <p className="text-xs text-slate-500">{t.safetyDesc}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{t.mainRisks}</p>
              <ul className="space-y-1.5 text-sm text-slate-700">
                {(quoteResult.feasibility?.risks || []).map((risk: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">•</span> {risk}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">{t.safetyRecs}</p>
              <ul className="space-y-1.5 text-sm text-slate-700">
                {(quoteResult.feasibility?.recommendations || []).map((rec: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span> {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Permessi e pratiche nel paese scelto */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-teal-100 text-teal-700 rounded-xl">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">{t.permitsTitle.replace("{country}", activeCountry.name)}</h3>
            <p className="text-xs text-slate-500">{t.permitsDesc}</p>
          </div>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {(quoteResult.feasibility?.permitsAndRules || []).map((rule: string, idx: number) => (
            <li key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 text-sm text-slate-700 flex items-start gap-2.5">
              <span className="text-teal-600 font-bold text-base leading-none">⚖️</span>
              <span className="leading-snug">{rule}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 8. Avvertenza fissa, ben visibile */}
      <div className="bg-slate-900 text-slate-100 p-6 rounded-3xl border border-slate-800 shadow-md space-y-2">
        <div className="flex items-center gap-2.5 text-amber-400 font-bold text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{t.disclaimerTitle}</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          {t.disclaimerText}
        </p>
      </div>

      {showLeadModal && (
        <LeadRequestModal
          quoteResult={quoteResult}
          activeCountry={activeCountry}
          adjustedDiyMin={adjustedDiyMin}
          adjustedDiyMax={adjustedDiyMax}
          onClose={() => setShowLeadModal(false)}
          t={t}
        />
      )}

    </div>
  );
};
