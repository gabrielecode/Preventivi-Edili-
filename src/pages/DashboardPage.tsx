import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEstimate } from "../context/EstimateContext";
import { getUserEstimates, deleteEstimate } from "../lib/firebase";
import { useLanguage } from "../context/LanguageContext";
import { 
  Calculator, 
  Trash2, 
  ExternalLink, 
  Calendar, 
  MapPin, 
  Construction, 
  ChevronRight,
  Plus,
  Loader2,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { 
    setQuoteResult, 
    setCurrentStep, 
    setMode, 
    setSelectedCountryId, 
    setSelectedSectorId,
    setWorkDescription,
    setSelectedItems,
    setAreaMq,
    setLengthMl,
    setQuantityCad,
    setQuality,
    setSkillLevel,
    setSiteDifficulty
  } = useEstimate();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [estimates, setEstimates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEstimates = async () => {
    if (!user) return;
    try {
      const data = await getUserEstimates(user.uid);
      setEstimates(data || []);
    } catch (error) {
      console.error("Error fetching estimates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEstimates();
  }, [user]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Sei sicuro di voler eliminare questo preventivo?")) return;
    try {
      await deleteEstimate(id);
      setEstimates(estimates.filter(e => e.id !== id));
    } catch (error) {
      console.error("Error deleting estimate:", error);
    }
  };

  const handleViewDetails = (est: any) => {
    // Populate context with saved data
    const d = est.data;
    setQuoteResult(d);
    
    // Restore all parameters if they exist in the saved payload
    if (d.mode) setMode(d.mode);
    if (d.countryCode) setSelectedCountryId(d.countryCode);
    if (est.sector) setSelectedSectorId(est.sector);
    if (d.workDescription) setWorkDescription(d.workDescription);
    if (d.quality) setQuality(d.quality);
    if (d.skillLevel) setSkillLevel(d.skillLevel);
    if (d.siteDifficulty) setSiteDifficulty(d.siteDifficulty);
    
    // Restore dimensions
    if (d.dimensions?.SUPERFICIE_MQ) setAreaMq(d.dimensions.SUPERFICIE_MQ);
    if (d.dimensions?.LUNGHEZZA_ML) setLengthMl(d.dimensions.LUNGHEZZA_ML);
    if (d.dimensions?.ELEMENTI_CAD) setQuantityCad(d.dimensions.ELEMENTI_CAD);
    
    // Restore selected items
    if (d.selectedItems) {
      // Note: we might need to map them back to SelectedPrivateItem format
      // In the save logic we only saved {id, quantity, customPrice}
      // But EstimateResult also needs name and unit for display
      // For now, let's just use what we have or accept some loss in detailed item display if not re-fetched
    }

    setCurrentStep(5);
    navigate("/stima");
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center py-24">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <main className="flex-1 max-w-6xl w-full mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">I miei preventivi</h1>
          <p className="text-slate-500">Gestisci i tuoi progetti di ristrutturazione salvati.</p>
        </div>
        <Link 
          to="/stima"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/25 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Nuovo preventivo
        </Link>
      </div>

      {estimates.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-50 text-slate-300 flex items-center justify-center mb-4">
            <Calculator className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Ancora nessun preventivo</h2>
          <p className="text-slate-500 max-w-sm mb-8">
            Inizia a calcolare i costi per la tua prossima ristrutturazione e salvali qui per confrontarli.
          </p>
          <Link 
            to="/stima"
            className="text-blue-600 font-bold hover:underline inline-flex items-center gap-1"
          >
            Inizia ora <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {estimates.map((est, idx) => (
              <motion.div
                key={est.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => handleViewDetails(est)}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col group overflow-hidden cursor-pointer active:scale-[0.98]"
              >
                {/* Header card */}
                <div className="p-5 border-b border-slate-50 bg-slate-50/50 group-hover:bg-blue-50/30 transition-colors">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1">
                      {est.name}
                    </h3>
                    <div className="flex gap-1 shrink-0">
                      <button 
                        onClick={(e) => handleDelete(est.id, e)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Elimina"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-medium text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Construction className="w-3.5 h-3.5" />
                      <span className="capitalize">{est.sector}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{est.city}, {est.country}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{est.createdAt?.toDate().toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Body card */}
                <div className="p-5 flex-1">
                   <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Professionista</p>
                        <p className="text-lg font-black text-slate-900">
                          €{est.data.economicSummary?.professionalTotal?.toLocaleString() || est.data.professionalEstimate?.totalIncl?.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Fai da te</p>
                        <p className="text-lg font-black text-blue-600">
                          €{est.data.economicSummary?.diyTotal?.toLocaleString() || est.data.diyEstimate?.totalIncl?.toLocaleString()}
                        </p>
                      </div>
                   </div>

                   <div className="bg-slate-50 rounded-xl p-3 mb-4">
                      <p className="text-[10px] text-slate-400 font-bold mb-1">RISPARMIO POTENZIALE</p>
                      <p className="text-sm font-bold text-emerald-600">
                        €{((est.data.economicSummary?.professionalTotal || 0) - (est.data.economicSummary?.diyTotal || 0)).toLocaleString()} 
                        <span className="text-slate-400 font-normal ml-1">con il DIY</span>
                      </p>
                   </div>
                </div>

                {/* Footer card */}
                <div className="px-5 py-4 bg-slate-50/50 border-t border-slate-100 mt-auto">
                   <div className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-white border border-slate-200 text-slate-700 rounded-xl text-xs font-bold group-hover:border-blue-300 group-hover:text-blue-600 transition-all shadow-xs">
                     <FileText className="w-4 h-4" />
                     Vedi dettagli
                   </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </main>
  );
};
