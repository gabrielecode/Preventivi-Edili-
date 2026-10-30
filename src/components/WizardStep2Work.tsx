import React, { useState } from "react";
import { sectorPriceLists, PriceItem } from "../data/priceLists";
import { Paintbrush, DoorOpen, Grid, Droplets, Zap, Check, Hammer } from "lucide-react";
import { SelectedPrivateItem } from "../hooks/useEstimateState";
import { TranslationDict } from "../data/translations";

interface Props {
  selectedSectorId: string;
  setSelectedSectorId: (id: string) => void;
  selectedItems: SelectedPrivateItem[];
  handleToggleItem: (item: PriceItem) => void;
  handleUpdateQuantity: (id: string, qty: number) => void;
  t: TranslationDict;
}

export const WizardStep2Work: React.FC<Props> = ({
  selectedSectorId,
  setSelectedSectorId,
  selectedItems,
  handleToggleItem,
  handleUpdateQuantity,
  t,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const activeSector = sectorPriceLists.find((s) => s.id === selectedSectorId) || sectorPriceLists[0];

  const getSectorIcon = (id: string) => {
    switch (id) {
      case "imbianchino": return <Paintbrush className="w-5 h-5" />;
      case "piastrellista": return <Grid className="w-5 h-5" />;
      case "serramentista": return <DoorOpen className="w-5 h-5" />;
      case "idraulico": return <Droplets className="w-5 h-5" />;
      case "elettricista": return <Zap className="w-5 h-5" />;
      default: return <Hammer className="w-5 h-5" />;
    }
  };

  const filteredItems = activeCategory === "all"
    ? activeSector.items
    : activeSector.items.filter((item) => item.category === activeCategory);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-1">{t.step2Title}</h2>
        <p className="text-sm text-slate-500">{t.step2Desc}</p>
      </div>

      {/* Settori con icone */}
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">{t.sectorSelectLabel}</label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {sectorPriceLists.map((sec) => {
            const isSelected = selectedSectorId === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setSelectedSectorId(sec.id)}
                className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? "border-blue-600 bg-blue-50/80 text-blue-800 ring-2 ring-blue-100 font-semibold shadow-sm"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
                type="button"
              >
                <div className={`p-2.5 rounded-xl mb-2 ${isSelected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-600"}`}>
                  {getSectorIcon(sec.id)}
                </div>
                <span className="text-xs font-bold leading-tight">{sec.name.split("/")[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Categorie filtro */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {activeSector.categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === cat.id
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
            type="button"
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Voci del listino */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">{t.availableWorksLabel}</label>
          <span className="text-xs text-slate-500 font-medium">{selectedItems.length} {t.selectedCountLabel}</span>
        </div>

        <div className="grid grid-cols-1 gap-2.5 max-h-80 overflow-y-auto pr-1">
          {filteredItems.length === 0 ? (
            <p className="text-sm text-slate-400 py-6 text-center">{t.noItemsFound}</p>
          ) : (
            filteredItems.map((item) => {
              const selectedObj = selectedItems.find((i) => i.id === item.id);
              const isSelected = !!selectedObj;

              return (
                <div
                  key={item.id}
                  className={`p-3.5 rounded-xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                    isSelected
                      ? "border-blue-600 bg-blue-50/40 ring-1 ring-blue-200"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-start gap-3 flex-1">
                    <button
                      onClick={() => handleToggleItem(item)}
                      className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center border transition-all shrink-0 cursor-pointer ${
                        isSelected
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "border-slate-300 bg-white hover:border-slate-400"
                      }`}
                      type="button"
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                      <span className="inline-block mt-1 text-[11px] font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                        {t.quantityLabel} ({item.unit})
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                      <span className="text-xs text-slate-500 font-medium">{t.quantityLabel} ({item.unit}):</span>
                      <input
                        type="number"
                        min="1"
                        value={selectedObj.quantity}
                        onChange={(e) => handleUpdateQuantity(item.id, Number(e.target.value))}
                        className="w-20 px-2.5 py-1 text-sm bg-white border border-slate-300 rounded-lg text-center font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
