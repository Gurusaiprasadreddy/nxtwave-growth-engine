import React from 'react';
import { FunnelAnalyticsResponse } from '../types';
import { ArrowDown, AlertCircle, CheckCircle, TrendingDown, Users, Sparkles } from 'lucide-react';

interface Props {
  funnel: FunnelAnalyticsResponse | null;
}

export const FunnelTab: React.FC<Props> = ({ funnel }) => {
  if (!funnel) {
    return (
      <div className="p-12 text-center text-slate-400">
        <p className="text-sm">Loading funnel analytics...</p>
      </div>
    );
  }

  // Width progression for the funnel bars
  const widthClasses = ['w-full', 'w-[82%]', 'w-[58%]', 'w-[42%]'];
  const gradientClasses = [
    'from-blue-600 to-indigo-600',
    'from-indigo-600 to-purple-600',
    'from-purple-600 to-pink-600',
    'from-emerald-500 to-teal-500',
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>4-Stage Growth Funnel</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Registration Conversion & Drop-off Funnel
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Tracking student journey from initial campaign touchpoint to confirmed registration.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          <div className="text-slate-400 font-medium">Overall Visitor → Registration Conversion:</div>
          <div className="text-xl font-black text-emerald-400 font-mono mt-0.5">
            {funnel.overall_visitor_to_reg_pct}%
          </div>
        </div>
      </div>

      {/* VISUAL FUNNEL FLOW */}
      <div className="p-6 md:p-8 rounded-3xl glass-panel border border-slate-800 space-y-6">
        {funnel.stages.map((stage, idx) => {
          const isLast = idx === funnel.stages.length - 1;
          const isFirst = idx === 0;

          return (
            <div key={stage.stage} className="space-y-3">
              {/* Stage Card & Horizontal Visual Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-mono font-bold text-xs text-indigo-400">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{stage.stage}</h4>
                    <span className="text-xs text-slate-400 font-mono">
                      {stage.overall_conversion_pct}% of total reach
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  {!isFirst && (
                    <div className="text-right">
                      <div className="text-[10px] uppercase font-semibold text-slate-400">Step Conversion</div>
                      <div className="text-xs font-mono font-bold text-indigo-300">
                        {stage.conversion_from_previous_pct}%
                      </div>
                    </div>
                  )}

                  {!isFirst && stage.drop_off_pct > 0 && (
                    <div className="text-right">
                      <div className="text-[10px] uppercase font-semibold text-rose-400">Drop-off</div>
                      <div className="text-xs font-mono font-bold text-rose-400">
                        -{stage.drop_off_pct}%
                      </div>
                    </div>
                  )}

                  <div className="text-right min-w-[90px]">
                    <div className="text-[10px] uppercase font-semibold text-slate-400">Students</div>
                    <div className="text-lg font-black text-white font-mono">
                      {stage.count.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Graphical Funnel Bar */}
              <div className="flex justify-center">
                <div
                  className={`h-4 rounded-full bg-gradient-to-r ${gradientClasses[idx]} transition-all duration-700 shadow-md ${widthClasses[idx]}`}
                />
              </div>

              {/* Arrow Connector */}
              {!isLast && (
                <div className="flex justify-center py-1">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-400 font-mono">
                    <ArrowDown className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Drop-off to next stage: {funnel.stages[idx + 1].drop_off_pct}%</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* DETAILED DROP-OFF ANALYSIS & OPTIMIZATION PLAN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl glass-panel border border-slate-800">
          <div className="flex items-center gap-2 text-amber-400 mb-3">
            <AlertCircle className="w-5 h-5" />
            <h4 className="text-sm font-bold text-white">Drop-Off Diagnosis</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            <strong>Stage 3 Drop-Off (Form Starts → Completions):</strong> 800 students opened the registration form, but 500 completed it (37.5% drop-off at modal submission).
          </p>
          <div className="mt-4 space-y-2 text-xs text-slate-400">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              • <strong>Friction point:</strong> Students on mobile hesitate when asked for 10-digit phone numbers unless clear WhatsApp-only workshop link delivery is promised.
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              • <strong>College dropdown fatigue:</strong> Manual typing causes abandonment on touchscreens. Auto-fill from college club links reduces drop-off by ~14%.
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-slate-800">
          <div className="flex items-center gap-2 text-emerald-400 mb-3">
            <CheckCircle className="w-5 h-5" />
            <h4 className="text-sm font-bold text-white">Growth Engineering Interventions</h4>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Interventions to improve stage conversion from <strong>62.5%</strong> to <strong>75%+</strong>:
          </p>
          <div className="mt-4 space-y-2 text-xs text-slate-400">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              1. <strong>Pre-fill College & Branch</strong> via UTM tags passed by campus club heads (e.g. <code className="text-indigo-300">?club=cbit_cse</code>).
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              2. <strong>One-Tap WhatsApp Registration</strong>: Allow students to text "REGISTER" to an automated WhatsApp flow, bypassing web forms entirely.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
