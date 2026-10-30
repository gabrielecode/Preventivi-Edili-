import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers, getAllEstimates } from "../lib/firebase";
import { useEstimate } from "../context/EstimateContext";
import { 
  Users, 
  FileText, 
  Mail, 
  Calendar, 
  Shield, 
  ExternalLink,
  Search,
  Filter,
  Loader2,
  TrendingUp,
  UserCheck
} from "lucide-react";
import { motion } from "framer-motion";

export const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    setQuoteResult, 
    setCurrentStep, 
    setMode, 
    setSelectedCountryId, 
    setSelectedSectorId,
    setWorkDescription,
    setAreaMq,
    setLengthMl,
    setQuantityCad,
    setQuality,
    setSkillLevel,
    setSiteDifficulty
  } = useEstimate();
  
  const [users, setUsers] = useState<any[]>([]);
  const [estimates, setEstimates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'users' | 'estimates'>('users');
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [u, e] = await Promise.all([getAllUsers(), getAllEstimates()]);
        setUsers(u || []);
        setEstimates(e || []);
      } catch (error) {
        console.error("Admin fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleViewEstimate = (est: any) => {
    const d = est.data;
    setQuoteResult(d);
    if (d.mode) setMode(d.mode);
    if (d.countryCode) setSelectedCountryId(d.countryCode);
    if (est.sector) setSelectedSectorId(est.sector);
    if (d.workDescription) setWorkDescription(d.workDescription);
    if (d.quality) setQuality(d.quality);
    if (d.skillLevel) setSkillLevel(d.skillLevel);
    if (d.siteDifficulty) setSiteDifficulty(d.siteDifficulty);
    if (d.dimensions?.SUPERFICIE_MQ) setAreaMq(d.dimensions.SUPERFICIE_MQ);
    if (d.dimensions?.LUNGHEZZA_ML) setLengthMl(d.dimensions.LUNGHEZZA_ML);
    if (d.dimensions?.ELEMENTI_CAD) setQuantityCad(d.dimensions.ELEMENTI_CAD);

    setCurrentStep(5);
    navigate("/stima");
  };

  const filteredUsers = users.filter(u => 
    u.email?.toLowerCase().includes(search.toLowerCase()) || 
    u.displayName?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredEstimates = estimates.filter(e => 
    e.name?.toLowerCase().includes(search.toLowerCase()) || 
    e.userId?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center py-24">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Pannello Amministrativo</h1>
        <p className="text-slate-500">Monitora gli utenti registrati e i preventivi generati per il follow-up.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Utenti Totali", value: users.length, icon: Users, color: "blue" },
          { label: "Preventivi Salvati", value: estimates.length, icon: FileText, color: "indigo" },
          { label: "Nuovi Lead (Redis)", value: "Vedi Log", icon: TrendingUp, color: "emerald" },
          { label: "Admin Attivi", value: users.filter(u => u.role === 'admin').length, icon: Shield, color: "amber" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
              <p className="text-2xl font-black text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs & Search */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 p-4 gap-4">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setTab('users')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${tab === 'users' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Users className="w-4 h-4" />
              Utenti
            </button>
            <button
              onClick={() => setTab('estimates')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${tab === 'estimates' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <FileText className="w-4 h-4" />
              Preventivi
            </button>
          </div>
          
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder={`Cerca ${tab === 'users' ? 'per email o nome...' : 'per nome preventivo...'}`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          {tab === 'users' ? (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <th className="px-6 py-4 font-black">Utente</th>
                  <th className="px-6 py-4 font-black">Email</th>
                  <th className="px-6 py-4 font-black">Data Iscrizione</th>
                  <th className="px-6 py-4 font-black">Ruolo</th>
                  <th className="px-6 py-4 font-black">Azioni</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredUsers.map((u) => (
                  <tr key={u.uid} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {u.photoURL ? (
                          <img src={u.photoURL} className="w-8 h-8 rounded-full border border-slate-100" />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                            <Users className="w-4 h-4" />
                          </div>
                        )}
                        <span className="text-sm font-bold text-slate-900">{u.displayName || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        {u.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {u.createdAt?.toDate().toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${u.role === 'admin' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-xs font-bold text-blue-600 hover:underline">Vedi Profilo</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <th className="px-6 py-4 font-black">Preventivo</th>
                  <th className="px-6 py-4 font-black">Settore</th>
                  <th className="px-6 py-4 font-black">Totale (Pro)</th>
                  <th className="px-6 py-4 font-black">Data</th>
                  <th className="px-6 py-4 font-black">Azioni</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredEstimates.map((e) => (
                  <tr key={e.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-slate-900">{e.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono truncate max-w-[150px]">{e.userId}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 capitalize">
                      {e.sector}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-black text-slate-900">
                        €{(e.data.economicSummary?.professionalTotal || e.data.professionalEstimate?.totalIncl)?.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {e.createdAt?.toDate().toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => handleViewEstimate(e)}
                        className="text-xs font-bold text-blue-600 hover:underline"
                      >
                        Dettagli
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
};
