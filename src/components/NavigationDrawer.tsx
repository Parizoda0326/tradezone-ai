import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ArrowUpRight, 
  ArrowDownRight, 
  Compass,
  Calculator, 
  Code2, 
  UserCheck, 
  Settings, 
  Info, 
  ChevronRight, 
  Globe2, 
  Sparkles,
  ShieldCheck,
  Zap,
  Layers,
  Sliders
} from 'lucide-react';
import { NavSection, UserProfile } from '../types/trade';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: NavSection;
  onSelectSection: (section: NavSection) => void;
  onOpenCalculator: () => void;
  onOpenArchitecture: () => void;
  onOpenProfile: () => void;
  onOpenSettings: () => void;
  onOpenAbout: () => void;
  user: UserProfile;
  redZoneCount: number;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  activeSection,
  onSelectSection,
  onOpenCalculator,
  onOpenArchitecture,
  onOpenProfile,
  onOpenSettings,
  onOpenAbout,
  user,
  redZoneCount,
}) => {
  if (!isOpen) return null;

  const sections = [
    {
      id: 'export' as NavSection,
      title: '1-Bo\'lim: Eksport Katalogi',
      subtitle: 'TIF TN kodlari, GSP+ Yevropa 0% bojxona preferensiyasi va tashqi bozorlar',
      icon: ArrowUpRight,
      accent: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
      badge: 'GSP+ 6200+',
      action: () => onSelectSection('export'),
    },
    {
      id: 'logistics' as NavSection,
      title: 'Eksport ⟷ Import Yo\'l Xaritasi & Masofalari',
      subtitle: 'Toshkentdan Frankfurt (5,420 km), Xitoy (4,850 km), Moskva (3,360 km) va dengiz portlarigacha xalqaro koridorlar',
      icon: Compass,
      accent: 'border-sky-500/50 text-sky-400 bg-sky-500/10',
      badge: 'Yo\'l xaritasi & Masofalar',
      action: () => onSelectSection('logistics'),
    },
    {
      id: 'import' as NavSection,
      title: '2-Bo\'lim: Import Tahlili & "Qizil Hudud"',
      subtitle: 'Keskin oshgan tovarlar signallari, yuqori texnologiyalar va mahalliylashtirish',
      icon: ArrowDownRight,
      accent: 'border-rose-500/40 text-rose-400 bg-rose-500/10',
      badge: `${redZoneCount} Qizil Hudud`,
      action: () => onSelectSection('import'),
    },
  ];

  const toolsAndInfo = [
    {
      id: 'calc',
      title: 'Moliyaviy Savdo Kalkulyatori',
      subtitle: 'Transport, bojxona, qadoqlash xarajatlari va sof foyda hisobi',
      icon: Calculator,
      accent: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
      badge: 'Hisoblash',
      action: onOpenCalculator,
    },
    {
      id: 'arch',
      title: 'Loyiha Arxitekturasi (4-Qadam Rejasi)',
      subtitle: 'Papka strukturasi, Prisma sxemasi va Gemini AI API kodi',
      icon: Code2,
      accent: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      badge: 'Tizim',
      action: onOpenArchitecture,
    },
    {
      id: 'settings',
      title: 'Platforma Sozlamalari',
      subtitle: 'Tizim tili, valyuta ko\'rinishi, signallar va AI konsaltant parametrlari',
      icon: Settings,
      accent: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      badge: 'Sozlamalar',
      action: onOpenSettings,
    },
    {
      id: 'about',
      title: 'Sayt Haqida & Ma\'lumotlar',
      subtitle: 'TradeZone AI missiyasi, GSP+ registri, rasmiy manbalar va versiya ma\'lumotlari',
      icon: Info,
      accent: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
      badge: 'v2.4.0',
      action: onOpenAbout,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Background click to dismiss */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Drawer content sliding from right */}
      <motion.div 
        initial={{ x: '100%', opacity: 0.5 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        className="relative z-10 w-full max-w-md bg-slate-950/95 border-l border-cyan-500/30 text-white h-full shadow-2xl flex flex-col justify-between overflow-hidden backdrop-blur-2xl"
      >
        {/* Header with User's Circular Logo Badge */}
        <div className="p-5 border-b border-slate-800/90 flex items-center justify-between bg-linear-to-r from-slate-950 via-slate-900 to-cyan-950/30 shrink-0">
          <div className="flex items-center gap-3">
            {/* Transparent Circular TradeZone AI Logo */}
            <div className="relative flex items-center justify-center">
              <img
                src="/assets/tradezone_logo.png"
                alt="TradeZone AI Logo"
                className="w-15 h-15 object-contain"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950"></span>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-base font-black text-white tracking-tight">
                  Trade<span className="text-cyan-400">Zone</span> AI
                </h2>
                <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 uppercase">
                  Menu
                </span>
              </div>
              <p className="text-[11px] text-amber-300/90 font-medium">
                Eksport, Import & Texnologiyalar Ekotizimi
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-150 active:scale-95 cursor-pointer border border-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Sections with Side Stagger Animation */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          
          {/* Main Sections */}
          <div>
            <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block mb-2.5 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Asosiy Savdo Bo'limlari</span>
            </span>

            <div className="space-y-2.5">
              {sections.map((sec, idx) => {
                const Icon = sec.icon;
                const isSelected = activeSection === sec.id;
                return (
                  <motion.div
                    key={sec.id}
                    initial={{ opacity: 0, x: 45 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + idx * 0.07, duration: 0.32, ease: 'easeOut' }}
                    onClick={() => {
                      sec.action();
                      onClose();
                    }}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-150 active:scale-[0.98] flex items-start gap-3.5 group ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-500/15 shadow-lg shadow-cyan-500/15 ring-1 ring-cyan-400/40'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl border ${sec.accent} shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition">
                          {sec.title}
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-slate-800 border border-slate-700 text-slate-300 whitespace-nowrap">
                          {sec.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed line-clamp-2">
                        {sec.subtitle}
                      </p>

                      {sec.id === 'logistics' && (
                        <div className="mt-2.5 pt-2 border-t border-sky-500/20 grid grid-cols-2 gap-1.5 text-[10px] font-mono">
                          <div className="flex items-center justify-between bg-slate-950/70 px-2 py-1 rounded border border-slate-800">
                            <span className="text-slate-400">🇪🇺 Frankfurt:</span>
                            <span className="text-emerald-400 font-bold">5,420 km</span>
                          </div>
                          <div className="flex items-center justify-between bg-slate-950/70 px-2 py-1 rounded border border-slate-800">
                            <span className="text-slate-400">🇨🇳 Xitoy (Silk):</span>
                            <span className="text-amber-400 font-bold">4,850 km</span>
                          </div>
                          <div className="flex items-center justify-between bg-slate-950/70 px-2 py-1 rounded border border-slate-800">
                            <span className="text-slate-400">🇷🇺 Moskva:</span>
                            <span className="text-sky-400 font-bold">3,360 km</span>
                          </div>
                          <div className="flex items-center justify-between bg-slate-950/70 px-2 py-1 rounded border border-slate-800">
                            <span className="text-slate-400">🇮🇷 Dengiz port:</span>
                            <span className="text-cyan-400 font-bold">2,650 km</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Tools, Settings and About Sections with Side Stagger */}
          <div>
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Asboblar, Sozlamalar & Ma'lumot</span>
            </span>

            <div className="space-y-2">
              {toolsAndInfo.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 45 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.18 + idx * 0.06, duration: 0.32, ease: 'easeOut' }}
                    onClick={() => {
                      onClose();
                      item.action();
                    }}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/60 hover:bg-slate-850 border border-slate-800 hover:border-cyan-500/40 transition-all duration-150 active:scale-[0.98] cursor-pointer text-left group shadow-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`p-2 rounded-xl border ${item.accent} shrink-0`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition truncate">
                            {item.title}
                          </span>
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-slate-800 border border-slate-700 text-slate-400 shrink-0">
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition shrink-0" />
                  </motion.button>
                );
              })}
            </div>
          </div>

        </div>

        {/* User Profile Card at Bottom */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.3 }}
          className="p-4 border-t border-slate-800/80 bg-slate-900/90 space-y-2 shrink-0"
        >
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold px-1">
            <span>Foydalanuvchi Profili</span>
            <span className="text-cyan-400">Faol Rol</span>
          </div>

          <div 
            onClick={() => {
              onClose();
              onOpenProfile();
            }}
            className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all duration-150 active:scale-95 group shadow-md"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 border ${
                user.role === 'TADBIRKOR'
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                  : user.role === 'FERMER'
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                  : 'bg-sky-500/20 text-sky-400 border-sky-500/30'
              }`}>
                <UserCheck className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-sm font-bold text-white block group-hover:text-cyan-300 transition truncate">
                  {user.fullName}
                </span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className={`text-[10px] font-bold px-2 py-0.2 rounded-md border ${
                    user.role === 'TADBIRKOR'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : user.role === 'FERMER'
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                  }`}>
                    {user.role === 'TADBIRKOR' ? 'Tadbirkor' : user.role === 'FERMER' ? 'Fermer / Agro' : 'Logistika'}
                  </span>
                  <span className="text-[10px] text-slate-400 truncate">
                    {user.companyName}
                  </span>
                </div>
              </div>
            </div>
            <span className="text-xs text-cyan-400 font-bold bg-cyan-500/15 hover:bg-cyan-500 hover:text-slate-950 px-2.5 py-1.5 rounded-lg border border-cyan-500/30 shrink-0 transition">
              Tahrirlash
            </span>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};
