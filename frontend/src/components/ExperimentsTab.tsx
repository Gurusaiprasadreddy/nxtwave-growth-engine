import React, { useState } from 'react';
import { Experiment } from '../types';
import { FlaskConical, Trophy, Sparkles, TrendingUp, CheckCircle, ArrowRight, HelpCircle } from 'lucide-react';
import { api } from '../services/api';

interface Props {
  experiments: Experiment[];
  onRefresh: () => void;
}

export const ExperimentsTab: React.FC<Props> = ({ experiments, onRefresh }) => {
  const [showNewModal, setShowNewModal] = useState(false);
  const [newExp, setNewExp] = useState({
    name: 'Landing Page Subheading Urgency Test',
    variant_a: 'Join 500+ final-year peers in building a working AI project.',
    variant_b: 'Only 48 hours left to secure your free live seat.',
  });
  const [creating, setCreating] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      await fetch('/api/experiments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newExp),
      });
      setShowNewModal(false);
      onRefresh();
    } catch (err) {
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-2">
            <FlaskConical className="w-3.5 h-3.5" />
            <span>Growth Experimentation Matrix</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            A/B Hypothesis Testing & Automated Winner Selection
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Running controlled split tests to optimize click-through rate (CTR) and click-to-registration conversion.
          </p>
        </div>

        <button
          onClick={() => setShowNewModal(true)}
          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 transition cursor-pointer self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>Launch New Test</span>
        </button>
      </div>

      {/* EXPERIMENTS LIST */}
      <div className="space-y-6">
        {experiments.map((exp) => (
          <div
            key={exp.id}
            className="p-6 md:p-8 rounded-3xl glass-panel border border-slate-800 space-y-6 relative overflow-hidden"
          >
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono uppercase text-purple-400 font-bold tracking-wider">
                  Experiment #{exp.id} • {exp.status}
                </span>
                <h4 className="text-lg font-extrabold text-white mt-0.5">{exp.name}</h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5" />
                  <span>WINNER: {exp.winner}</span>
                </span>
              </div>
            </div>

            {/* Side-by-side Variants */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Variant A */}
              <div
                className={`p-5 rounded-2xl border transition ${
                  exp.winner === 'Variant A'
                    ? 'bg-emerald-950/20 border-emerald-500/40 shadow-lg shadow-emerald-500/10'
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Variant A (Control)
                  </span>
                  {exp.winner === 'Variant A' && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950">
                      Winner
                    </span>
                  )}
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-sm font-semibold text-white mb-4">
                  "{exp.variant_a}"
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase">Impressions</div>
                    <div className="text-base font-bold text-white mt-0.5">
                      {exp.impressions_a.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase">Clicks / CTR</div>
                    <div className="text-base font-bold text-white mt-0.5">
                      {exp.clicks_a} <span className="text-xs font-normal text-indigo-300">({exp.ctr_a_pct}%)</span>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 col-span-2">
                    <div className="text-[10px] text-slate-400 uppercase">Registrations & Conversion</div>
                    <div className="text-base font-bold text-emerald-400 mt-0.5">
                      {exp.registrations_a} Registrations •{' '}
                      <span className="text-purple-300">{exp.conversion_a_pct}% Conv</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Variant B */}
              <div
                className={`p-5 rounded-2xl border transition ${
                  exp.winner === 'Variant B'
                    ? 'bg-emerald-950/20 border-emerald-500/40 shadow-lg shadow-emerald-500/10'
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Variant B (Test Variant)
                  </span>
                  {exp.winner === 'Variant B' && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950">
                      Winner
                    </span>
                  )}
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-sm font-semibold text-white mb-4">
                  "{exp.variant_b}"
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase">Impressions</div>
                    <div className="text-base font-bold text-white mt-0.5">
                      {exp.impressions_b.toLocaleString()}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase">Clicks / CTR</div>
                    <div className="text-base font-bold text-white mt-0.5">
                      {exp.clicks_b} <span className="text-xs font-normal text-indigo-300">({exp.ctr_b_pct}%)</span>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 col-span-2">
                    <div className="text-[10px] text-slate-400 uppercase">Registrations & Conversion</div>
                    <div className="text-base font-bold text-emerald-400 mt-0.5">
                      {exp.registrations_b} Registrations •{' '}
                      <span className="text-purple-300">{exp.conversion_b_pct}% Conv</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Statistical Reasoning Box */}
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 text-xs text-indigo-200">
              <div className="font-bold flex items-center gap-1.5 text-white mb-1">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Automated Winner Decision & Data Reasoning:</span>
              </div>
              <p className="leading-relaxed text-indigo-200/90">{exp.winner_reasoning}</p>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL TO LAUNCH NEW EXPERIMENT */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg p-6 rounded-2xl glass-panel-glow border border-purple-500/30 text-left">
            <h3 className="text-lg font-bold text-white mb-1">Create A/B Experiment</h3>
            <p className="text-xs text-slate-400 mb-4">
              Define two copy or creative variants to run live split attribution.
            </p>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Experiment Name / Hypothesis
                </label>
                <input
                  type="text"
                  required
                  value={newExp.name}
                  onChange={(e) => setNewExp({ ...newExp, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Variant A (Control Copy)
                </label>
                <textarea
                  rows={2}
                  required
                  value={newExp.variant_a}
                  onChange={(e) => setNewExp({ ...newExp, variant_a: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Variant B (Challenger Copy)
                </label>
                <textarea
                  rows={2}
                  required
                  value={newExp.variant_b}
                  onChange={(e) => setNewExp({ ...newExp, variant_b: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition cursor-pointer disabled:opacity-50"
                >
                  {creating ? 'Launching...' : 'Deploy Split Test'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
