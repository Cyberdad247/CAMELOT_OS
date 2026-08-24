import React from 'react';
import { Shield, Terminal, HardDrive, Network, Sparkles, RefreshCw, Lock, CheckCircle2, Flame, Sun, Moon } from 'lucide-react';
import { ActiveTab, ThemeMode } from '../types';

interface HeaderHUDProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onKineticTrigger: (trigger: string) => void;
  vfsFileCount: number;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

export const HeaderHUD: React.FC<HeaderHUDProps> = ({
  activeTab,
  setActiveTab,
  onKineticTrigger,
  vfsFileCount,
  theme,
  setTheme,
}) => {
  const isDark = theme === 'dark';

  return (
    <header className={`${isDark ? 'bg-neutral-950 border-neutral-800 text-neutral-100' : 'bg-slate-100 border-slate-300 text-slate-900'} border-b select-none transition-colors duration-200`}>
      {/* Top Telemetry Ticker Bar */}
      <div className={`px-6 py-2 ${isDark ? 'bg-neutral-900 border-neutral-800/80' : 'bg-slate-200/90 border-slate-300'} border-b flex flex-wrap items-center justify-between text-xs font-mono tracking-wide gap-3 transition-colors`}>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 text-amber-500 dark:text-amber-400 font-semibold">
            <Flame className="w-3.5 h-3.5 animate-pulse text-amber-500" />
            <span>[CPU: 120% OMNI_EXEC]</span>
          </div>
          <div className="flex items-center space-x-1.5 text-emerald-600 dark:text-emerald-400">
            <HardDrive className="w-3.5 h-3.5 text-emerald-500" />
            <span>[RAM: 7.4GB / 8.0GB]</span>
          </div>
          <div className="hidden md:flex items-center space-x-1.5 text-sky-600 dark:text-sky-400">
            <Network className="w-3.5 h-3.5 text-sky-500" />
            <span>[LATTICE: 24D LEECH]</span>
          </div>
          <div className="hidden lg:flex items-center space-x-1.5 text-purple-600 dark:text-purple-400">
            <Lock className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />
            <span>[BIFROST: KYBER-768 mTLS]</span>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <span className={`${isDark ? 'text-neutral-400' : 'text-slate-600'} hidden sm:inline`}>
            NODE: <span className={`${isDark ? 'text-neutral-200' : 'text-slate-900'} font-medium`}>Cleveland, OH (Vizion)</span>
          </span>
          <span className={`${isDark ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60' : 'bg-emerald-100 text-emerald-800 border-emerald-300'} border px-2 py-0.5 rounded text-[11px] font-semibold tracking-wider uppercase flex items-center gap-1`}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
            APEX_ONLINE
          </span>
        </div>
      </div>

      {/* Main Navigation & System Brand Header */}
      <div className="px-6 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Brand & Mandate */}
        <div className="flex items-center space-x-3.5">
          <div className={`w-10 h-10 rounded-xl ${isDark ? 'bg-neutral-900 border-neutral-700' : 'bg-white border-slate-300 shadow-sm'} border flex items-center justify-center relative group`}>
            <Shield className="w-6 h-6 text-amber-500 dark:text-amber-400 group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-neutral-950 animate-pulse"></div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className={`text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-slate-950'} font-sans uppercase`}>
                CAMELOT-OS <span className={`font-mono text-xs font-normal px-1.5 py-0.5 rounded ${isDark ? 'text-amber-400 bg-amber-950/60 border-amber-800/40' : 'text-amber-700 bg-amber-100 border-amber-300'} border`}>vMAX.54</span>
              </h1>
              <span className={`text-xs ${isDark ? 'text-neutral-500' : 'text-slate-500'} font-mono hidden sm:inline`}>| DGM-H ENGINE</span>
            </div>
            <p className={`text-xs ${isDark ? 'text-neutral-400' : 'text-slate-600'} font-sans italic tracking-wide`}>
              "dreams don't come true visions do" — <span className={`${isDark ? 'text-neutral-300' : 'text-slate-900'} font-medium not-italic`}>Operator: VaShawn O. Head (Vizion)</span>
            </p>
          </div>
        </div>

        {/* Right Section: Kinetic Triggers + Light/Dark Toggle */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          {/* Light / Dark Mode Switcher */}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`px-3 py-1.5 ${isDark ? 'bg-neutral-800 hover:bg-neutral-700 text-yellow-300 border-neutral-700 shadow-[0_0_10px_rgba(234,179,8,0.1)]' : 'bg-white hover:bg-slate-200 text-slate-800 border-slate-300 shadow-sm'} border rounded-lg transition-all flex items-center space-x-1.5 active:scale-95`}
            title={`Switch to ${isDark ? 'Light (Solar Matrix)' : 'Dark (Obsidian Void)'} mode`}
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
                <span className="font-semibold text-[11px]">LIGHT</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-purple-600" />
                <span className="font-semibold text-[11px]">DARK</span>
              </>
            )}
          </button>

          <button
            onClick={() => onKineticTrigger('//boot')}
            className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30 rounded-lg transition-all flex items-center space-x-1.5 active:scale-95 shadow-sm"
            title="Awaken Camelot-OS Sovereign Kernel"
          >
            <span>⚡</span>
            <span className="font-semibold">//boot</span>
          </button>

          <button
            onClick={() => onKineticTrigger('//nano-swarm expand')}
            className="px-3 py-1.5 bg-sky-500/10 hover:bg-sky-500/20 text-sky-600 dark:text-sky-300 border border-sky-500/30 rounded-lg transition-all flex items-center space-x-1.5 active:scale-95 shadow-sm"
            title="Hydrate full 20-file VFS ecosystem"
          >
            <Sparkles className="w-3.5 h-3.5 text-sky-500 dark:text-sky-400" />
            <span className="font-semibold">//nano-swarm expand</span>
          </button>

          <button
            onClick={() => onKineticTrigger('//sync')}
            className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 rounded-lg transition-all flex items-center space-x-1.5 active:scale-95 shadow-sm"
            title="Bidirectional CRDT sync with Worldtree Cloudbrain"
          >
            <RefreshCw className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="font-semibold">//sync</span>
          </button>

          <button
            onClick={() => onKineticTrigger('//shield')}
            className="px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/30 rounded-lg transition-all flex items-center space-x-1.5 active:scale-95 shadow-sm"
            title="Activate Aegis Zero-Trust isolation perimeter"
          >
            <Shield className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span className="font-semibold">//shield</span>
          </button>
        </div>
      </div>

      {/* Primary Tab Navigation */}
      <nav className={`px-6 flex space-x-1 border-t ${isDark ? 'border-neutral-800/80' : 'border-slate-300 bg-slate-200/50'} overflow-x-auto scrollbar-none font-medium text-sm transition-colors`}>
        <button
          onClick={() => setActiveTab('command-center')}
          className={`px-4 py-2.5 border-b-2 flex items-center space-x-2 transition-all whitespace-nowrap ${
            activeTab === 'command-center'
              ? isDark 
                ? 'border-cyan-400 text-cyan-300 bg-cyan-950/60 font-bold shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                : 'border-cyan-600 text-cyan-800 bg-cyan-100 font-bold'
              : isDark
                ? 'border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/30'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-300/40'
          }`}
        >
          <span className="text-cyan-400 font-bold">★</span>
          <span>Command Center</span>
          <span className={`ml-1 px-1.5 py-0.2 ${isDark ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-cyan-200 text-cyan-900 border-cyan-300'} text-[10px] rounded font-mono font-bold border`}>
            ThreeUI+Voice
          </span>
        </button>

        <button
          onClick={() => setActiveTab('cartridge-matrix')}
          className={`px-4 py-2.5 border-b-2 flex items-center space-x-2 transition-all whitespace-nowrap ${
            activeTab === 'cartridge-matrix'
              ? isDark 
                ? 'border-pink-400 text-pink-300 bg-pink-950/60 font-bold shadow-[0_0_15px_rgba(255,0,127,0.2)]'
                : 'border-pink-600 text-pink-800 bg-pink-100 font-bold'
              : isDark
                ? 'border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/30'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-300/40'
          }`}
        >
          <span className="text-pink-400">⚡</span>
          <span>Cartridge Matrix</span>
          <span className={`ml-1 px-1.5 py-0.2 ${isDark ? 'bg-pink-500/20 text-pink-300 border-pink-500/40' : 'bg-pink-200 text-pink-900 border-pink-300'} text-[10px] rounded font-mono font-bold border`}>
            HOT-SWAP
          </span>
        </button>

        <button
          onClick={() => setActiveTab('digital-factory')}
          className={`px-4 py-2.5 border-b-2 flex items-center space-x-2 transition-all whitespace-nowrap ${
            activeTab === 'digital-factory'
              ? isDark 
                ? 'border-amber-400 text-amber-300 bg-amber-950/50 font-bold shadow-[0_0_15px_rgba(229,184,66,0.2)]'
                : 'border-amber-600 text-amber-800 bg-amber-100 font-bold'
              : isDark
                ? 'border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/30'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-300/40'
          }`}
        >
          <span className="text-amber-400">⚙️</span>
          <span>Digital Factory</span>
          <span className={`ml-1 px-1.5 py-0.2 ${isDark ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-amber-200 text-amber-900 border-amber-300'} text-[10px] rounded font-mono font-bold border`}>
            BLAST V4
          </span>
        </button>

        <button
          onClick={() => setActiveTab('multivoice')}
          className={`px-4 py-2.5 border-b-2 flex items-center space-x-2 transition-all whitespace-nowrap ${
            activeTab === 'multivoice'
              ? isDark 
                ? 'border-purple-400 text-purple-300 bg-purple-950/60 font-bold shadow-[0_0_15px_rgba(157,78,221,0.2)]'
                : 'border-purple-600 text-purple-800 bg-purple-100 font-bold'
              : isDark
                ? 'border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/30'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-300/40'
          }`}
        >
          <span className="text-purple-400">🎙️</span>
          <span>Multi-Voice Router</span>
          <span className={`ml-1 px-1.5 py-0.2 ${isDark ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' : 'bg-purple-200 text-purple-900 border-purple-300'} text-[10px] rounded font-mono font-bold border`}>
            ROUTER
          </span>
        </button>

        <button
          onClick={() => setActiveTab('spatial-hud')}
          className={`px-4 py-2.5 border-b-2 flex items-center space-x-2 transition-all whitespace-nowrap ${
            activeTab === 'spatial-hud'
              ? isDark 
                ? 'border-cyan-400 text-cyan-300 bg-cyan-950/50 font-bold shadow-[0_0_15px_rgba(0,229,255,0.15)]'
                : 'border-cyan-600 text-cyan-800 bg-cyan-100 font-bold'
              : isDark
                ? 'border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/30'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-300/40'
          }`}
        >
          <Sparkles className="w-4 h-4 text-cyan-500 dark:text-cyan-400 animate-pulse" />
          <span>Holographic Spatial HUD</span>
          <span className={`ml-1 px-1.5 py-0.2 ${isDark ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' : 'bg-cyan-200 text-cyan-900 border-cyan-300'} text-[10px] rounded font-mono font-bold border`}>
            3D AVATAR
          </span>
        </button>

        <button
          onClick={() => setActiveTab('htmx')}
          className={`px-4 py-2.5 border-b-2 flex items-center space-x-2 transition-all whitespace-nowrap ${
            activeTab === 'htmx'
              ? isDark 
                ? 'border-amber-400 text-amber-300 bg-purple-950/40 font-semibold'
                : 'border-amber-600 text-amber-900 bg-amber-100 font-semibold'
              : isDark
                ? 'border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/30'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-300/40'
          }`}
        >
          <span className="text-amber-500">⚜️</span>
          <span>HTMX Command Center</span>
          <span className={`ml-1 px-1.5 py-0.2 ${isDark ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-amber-200 text-amber-900 border-amber-300'} text-[10px] rounded font-mono font-bold border`}>
            Go+SSE
          </span>
        </button>

        <button
          onClick={() => setActiveTab('lattice')}
          className={`px-4 py-2.5 border-b-2 flex items-center space-x-2 transition-all whitespace-nowrap ${
            activeTab === 'lattice'
              ? isDark
                ? 'border-sky-400 text-sky-300 bg-sky-950/40 font-semibold'
                : 'border-sky-600 text-sky-900 bg-sky-100 font-semibold'
              : isDark
                ? 'border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/30'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-300/40'
          }`}
        >
          <Network className="w-4 h-4 text-sky-500 dark:text-sky-400" />
          <span>24D Swarm Lattice</span>
        </button>

        <button
          onClick={() => setActiveTab('vfs')}
          className={`px-4 py-2.5 border-b-2 flex items-center space-x-2 transition-all whitespace-nowrap ${
            activeTab === 'vfs'
              ? isDark
                ? 'border-amber-400 text-white bg-neutral-900/80 font-semibold'
                : 'border-amber-600 text-slate-950 bg-white font-semibold'
              : isDark
                ? 'border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/30'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-300/40'
          }`}
        >
          <span>📁</span>
          <span>VFS Master Matrix</span>
          <span className={`ml-1 px-1.5 py-0.2 ${isDark ? 'bg-neutral-800 text-neutral-300' : 'bg-slate-300 text-slate-800'} text-xs rounded-full font-mono`}>
            {vfsFileCount}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('terminal')}
          className={`px-4 py-2.5 border-b-2 flex items-center space-x-2 transition-all whitespace-nowrap ${
            activeTab === 'terminal'
              ? isDark
                ? 'border-emerald-400 text-emerald-300 bg-emerald-950/40 font-semibold'
                : 'border-emerald-600 text-emerald-900 bg-emerald-100 font-semibold'
              : isDark
                ? 'border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/30'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-300/40'
          }`}
        >
          <Terminal className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
          <span>HiveIDE Living Terminal</span>
        </button>

        <button
          onClick={() => setActiveTab('knights')}
          className={`px-4 py-2.5 border-b-2 flex items-center space-x-2 transition-all whitespace-nowrap ${
            activeTab === 'knights'
              ? isDark
                ? 'border-amber-400 text-white bg-neutral-900/80 font-semibold'
                : 'border-amber-600 text-slate-950 bg-white font-semibold'
              : isDark
                ? 'border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/30'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-300/40'
          }`}
        >
          <span>⚔️</span>
          <span>25-Knight Roster</span>
          <span className={`ml-1 px-1.5 py-0.2 ${isDark ? 'bg-neutral-800 text-neutral-300' : 'bg-slate-300 text-slate-800'} text-xs rounded-full font-mono`}>25</span>
        </button>

        <button
          onClick={() => setActiveTab('contracts')}
          className={`px-4 py-2.5 border-b-2 flex items-center space-x-2 transition-all whitespace-nowrap ${
            activeTab === 'contracts'
              ? isDark
                ? 'border-amber-400 text-white bg-neutral-900/80 font-semibold'
                : 'border-amber-600 text-slate-950 bg-white font-semibold'
              : isDark
                ? 'border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/30'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-300/40'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
          <span>Contracts & Harness Vault</span>
        </button>

        <button
          onClick={() => setActiveTab('constitution')}
          className={`px-4 py-2.5 border-b-2 flex items-center space-x-2 transition-all whitespace-nowrap ${
            activeTab === 'constitution'
              ? isDark
                ? 'border-amber-400 text-white bg-neutral-900/80 font-semibold'
                : 'border-amber-600 text-slate-950 bg-white font-semibold'
              : isDark
                ? 'border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/30'
                : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-300/40'
          }`}
        >
          <Shield className="w-4 h-4 text-amber-500 dark:text-amber-400" />
          <span>Constitutional Laws</span>
        </button>
      </nav>
    </header>
  );
};

