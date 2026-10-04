import React from 'react';
import { 
  Rocket, 
  BarChart3, 
  RotateCcw, 
  Database, 
  Sparkles, 
  Eye, 
  FlaskConical,
  ExternalLink 
} from 'lucide-react';

interface Props {
  currentView: 'landing' | 'dashboard';
  setCurrentView: (view: 'landing' | 'dashboard') => void;
  activeVariant: 'Variant A' | 'Variant B';
  setActiveVariant: (v: 'Variant A' | 'Variant B') => void;
  onLoadDemo: () => void;
  onResetDemo: () => void;
  isLoading: boolean;
  registrationCount: number;
}

export const Navbar: React.FC<Props> = ({
  currentView,
  setCurrentView,
  activeVariant,
  setActiveVariant,
  onLoadDemo,
  onResetDemo,
  isLoading,
  registrationCount,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo & Product Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white">
                AI Workshop Growth Engine
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                NxtWave Challenge
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden md:block">
              500 Final-Year Engineering Students • 7-Day Campaign • ₹2,000 Budget
            </p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => setCurrentView('landing')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              currentView === 'landing'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Public</span> Landing Page
          </button>
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              currentView === 'dashboard'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Growth Analytics
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-slate-800 text-indigo-300 font-mono">
              {registrationCount}
            </span>
          </button>
        </div>

        {/* Controls: A/B Variant + Simulation controls */}
        <div className="flex items-center gap-2">
          {currentView === 'landing' && (
            <div className="hidden lg:flex items-center gap-1 bg-slate-900/90 border border-slate-800 p-1 rounded-xl text-xs">
              <FlaskConical className="w-3.5 h-3.5 text-purple-400 ml-1.5" />
              <span className="text-[11px] text-slate-400 font-medium mr-1">A/B Test:</span>
              <button
                onClick={() => setActiveVariant('Variant A')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition cursor-pointer ${
                  activeVariant === 'Variant A'
                    ? 'bg-purple-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Headline: Build Your First AI Project in 60 Minutes"
              >
                Var A
              </button>
              <button
                onClick={() => setActiveVariant('Variant B')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition cursor-pointer ${
                  activeVariant === 'Variant B'
                    ? 'bg-purple-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Headline: Final-Year Students: Build an AI Project Before Your Next Interview"
              >
                Var B
              </button>
            </div>
          )}

          {/* Simulation Mode Pill */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber-400 badge-pulse" />
            <span>Simulation</span>
          </div>

          {/* Demo Data Buttons */}
          <button
            onClick={onLoadDemo}
            disabled={isLoading}
            className="p-2 sm:px-2.5 sm:py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1.5 transition cursor-pointer disabled:opacity-50"
            title="Load 500-student realistic campaign simulation"
          >
            <Database className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Load Demo (500)</span>
          </button>

          <button
            onClick={onResetDemo}
            disabled={isLoading}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-rose-400 transition cursor-pointer disabled:opacity-50"
            title="Reset to minimal baseline data"
            aria-label="Reset demo data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
