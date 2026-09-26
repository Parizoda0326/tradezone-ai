import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Sparkles, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  FileText, 
  Globe2, 
  Calculator, 
  TrendingUp, 
  Cpu, 
  CheckCircle2,
  Clock,
  Loader2,
  Zap
} from 'lucide-react';
import { AISearchResult } from '../types/trade';

interface AISmartSearchBarProps {
  onSelectProductForChat: (prompt: string) => void;
  onFilterCatalog?: (query: string) => void;
}

export const AISmartSearchBar: React.FC<AISmartSearchBarProps> = ({
  onSelectProductForChat,
  onFilterCatalog,
}) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AISearchResult | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Suggested prompt chips
  const suggestions = [
    'iPhone / Smartfon',
    'Toshkent — Frankfurt (5,420 km)',
    'Mikroprotsessor / Chip',
    'Gilos (0809.29)',
    'Lianyungang — Toshkent (Xitoy)',
    'Paxta ipi (GSP+)',
    'Bandar-Abbos (Dengiz yo\'li)',
  ];

  const performAISearch = async (searchQuery: string) => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) {
      setResult(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/ai-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery }),
      });

      if (response.ok) {
        const data: AISearchResult = await response.json();
        setResult(data);
        setIsOpen(true);
      }
    } catch {
      // Graceful fallback
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (val: string) => {
    setQuery(val);
    if (onFilterCatalog) onFilterCatalog(val);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (val.trim().length >= 2) {
      setLoading(true);
      debounceRef.current = setTimeout(() => {
        performAISearch(val);
      }, 500);
    } else {
      setResult(null);
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuery('');
    setResult(null);
    setIsOpen(false);
    if (onFilterCatalog) onFilterCatalog('');
  };

  const handleSuggestionClick = (sug: string) => {
    const clean = sug.split('(')[0].replace('/', ' ').trim();
    setQuery(clean);
    performAISearch(clean);
    if (onFilterCatalog) onFilterCatalog(clean);
  };

  const handleAskAIInDepth = () => {
    if (!result) return;
    const prompt = `"${result.productName}" (TIF TN: ${result.hsCode}) bo'yicha to'liq tashqi savdo tahlili, boj stavkalari, sertifikatlar va 10 tonna / 1000 dona uchun kutilayotgan moliyaviy hisob-kitobni qilib bering.`;
    onSelectProductForChat(prompt);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto z-30">
      
      {/* Search Input Box with Background Aesthetic & Fast Hover */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-linear-to-r from-amber-500/40 via-emerald-500/30 to-indigo-500/40 rounded-2xl blur-sm opacity-70 group-hover:opacity-100 transition duration-200"></div>
        
        <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-amber-500/30 p-2 sm:p-2.5 flex items-center gap-3 shadow-2xl">
          <div className="p-2 sm:p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin text-amber-400" />
            ) : (
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <input
              type="text"
              value={query}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Ixtiyoriy mahsulot yoki tovar yozing (AI avtomatik TIF TN, boj stavkalari va bozorini chiqaradi)..."
              className="w-full bg-transparent text-white text-xs sm:text-sm font-medium placeholder-slate-400 focus:outline-none focus:ring-0 border-none"
            />
          </div>

          {query && (
            <button
              onClick={handleClear}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all duration-150 active:scale-95 cursor-pointer shrink-0"
              title="Tozalash"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => performAISearch(query)}
            disabled={!query.trim() || loading}
            className="flex items-center gap-1.5 px-4 py-2 sm:py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs sm:text-sm rounded-xl transition-all duration-150 active:scale-95 hover:scale-[1.03] hover:shadow-lg hover:shadow-amber-500/30 cursor-pointer disabled:opacity-40 shrink-0"
          >
            <Search className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden sm:inline">AI Qidiruv</span>
          </button>
        </div>
      </div>

      {/* Suggested Quick Search Chips */}
      <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
        <span className="text-amber-400/80 font-bold shrink-0 flex items-center gap-1">
          <Zap className="w-3 h-3" />
          Tezkor AI qidiruv:
        </span>
        {suggestions.map((sug, i) => (
          <button
            key={i}
            onClick={() => handleSuggestionClick(sug)}
            className="px-2.5 py-1 rounded-full bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-slate-300 text-[11px] font-semibold border border-amber-500/20 whitespace-nowrap transition-all duration-150 active:scale-95 hover:scale-[1.02] cursor-pointer"
          >
            {sug}
          </button>
        ))}
      </div>

      {/* AI Live Intelligence Result Drawer / Card */}
      {result && isOpen && (
        <div className="mt-3 bg-slate-900/95 backdrop-blur-2xl rounded-2xl border-2 border-amber-500/40 p-4 sm:p-5 shadow-2xl shadow-black/80 animate-in fade-in slide-in-from-top-2 duration-200 text-white space-y-4">
          
          {/* Card Top Title & TIF TN */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-amber-500 text-slate-950 rounded-lg">
                <Sparkles className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                  TradeZona AI Tahlilnomasi (Avtomatik Aniqlangan):
                </span>
                <h3 className="text-base sm:text-lg font-black text-white">
                  {result.productName}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-lg">
                TIF TN: {result.hsCode}
              </span>
              <span className="text-xs font-bold bg-slate-800 text-slate-200 px-2.5 py-1 rounded-lg border border-slate-700">
                {result.tradeType}
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded-md transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            
            {/* Duty rate in Uzbekistan */}
            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 block font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                O'zbekiston Bojxona Boji:
              </span>
              <span className="text-xs font-bold text-emerald-300 block">
                {result.dutyRateUzbekistan}
              </span>
            </div>

            {/* GSP+ and Trade Preference */}
            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 block font-semibold flex items-center gap-1">
                <Globe2 className="w-3.5 h-3.5 text-blue-400" />
                GSP+ / MDH Imtiyozi:
              </span>
              <span className="text-xs font-bold text-blue-300 block">
                {result.gspPlusBenefit}
              </span>
            </div>

            {/* Certificates */}
            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 space-y-1 sm:col-span-2 lg:col-span-1">
              <span className="text-[10px] text-slate-400 block font-semibold flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                Talab Etiladigan Hujjatlar:
              </span>
              <div className="flex flex-wrap gap-1">
                {result.keyCertificates.map((cert, idx) => (
                  <span key={idx} className="bg-slate-800 text-amber-200 text-[10px] px-1.5 py-0.5 rounded">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Market Outlook & Recommendation */}
          <div className="bg-amber-500/10 p-3.5 rounded-xl border border-amber-500/20 text-xs space-y-1.5">
            <span className="text-amber-400 font-bold block">
              📊 Bozor Kon'yunkturasi & Tavsiya:
            </span>
            <p className="text-slate-200 leading-relaxed">
              {result.marketOutlook}
            </p>
            <p className="text-amber-200 font-semibold pt-1 border-t border-amber-500/20">
              💡 {result.recommendedAction}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <span className="text-[11px] text-slate-400">
              Ushbu tovar bo'yicha to'liq transport, bojxona va sof foyda hisobi kerakmi?
            </span>

            <button
              onClick={handleAskAIInDepth}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all duration-150 active:scale-95 hover:scale-[1.02] cursor-pointer"
            >
              <Sparkles className="w-4 h-4 stroke-[2.5]" />
              <span>Smart AI Chatda To'liq Hisoblash</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
