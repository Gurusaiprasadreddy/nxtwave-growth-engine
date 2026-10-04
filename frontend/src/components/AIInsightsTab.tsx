import React from 'react';
import { AIInsightsResponse } from '../types';
import { 
  Bot, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Flame, 
  Zap,
  Target
} from 'lucide-react';

interface Props {
  insightsData: AIInsightsResponse | null;
}

const ACTION_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  SCALE: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  MAINTAIN: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30' },
  TEST: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
  REDUCE: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/30' },
};

export const AIInsightsTab: React.FC<Props> = ({ insightsData }) => {
  if (!insightsData) {
    return (
      <div className="p-12 text-center text-slate-400">
        <p className="text-sm">Synthesizing AI growth insights...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header with LLM Architecture Callout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl glass-panel-glow border border-indigo-500/30">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <Bot className="w-3.5 h-3.5 text-indigo-400" />
            <span>{insightsData.badge}</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            AI Growth Intelligence & Decision Engine
          </h3>
          <p className="text-xs text-slate-300 max-w-2xl">
            Analyzes live campaign conversion funnels, channel unit economics, and virality metrics to generate mathematically-grounded growth recommendations without hallucinated claims.
          </p>
        </div>

        <div className="text-left sm:text-right shrink-0 text-xs text-slate-400">
          <div>Engine Status: <strong className="text-emerald-400 font-mono">Active</strong></div>
          <div className="mt-0.5">LLM Adapter: <span className="text-indigo-300 font-mono">Plug-and-Play Ready</span></div>
        </div>
      </div>

      {/* SECTION 1: WHAT SHOULD WE DO NEXT? (GROWTH DECISION ENGINE) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>What Should We Do Next? (Action Framework)</span>
            </h4>
            <p className="text-xs text-slate-400">
              Clear channel actions categorized into SCALE, MAINTAIN, TEST, or REDUCE.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {insightsData.decisions.map((d) => {
            const colors = ACTION_COLORS[d.action] || ACTION_COLORS.MAINTAIN;

            return (
              <div
                key={d.channel}
                className="p-5 rounded-2xl glass-panel border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-white text-sm">{d.channel}</span>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-black tracking-wider uppercase border ${colors.bg} ${colors.text} ${colors.border}`}
                    >
                      {d.action}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 text-[11px] font-mono text-indigo-300 mb-3">
                    Metric Evidence: {d.metric}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{d.reason}</p>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Priority: <strong className="text-white">{d.priority}</strong></span>
                  <span className="text-indigo-400 font-semibold cursor-pointer hover:underline">
                    Action Plan →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: DEEP DIVE AI INSIGHTS */}
      <div>
        <div className="mb-4">
          <h4 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Diagnostic Growth Insights</span>
          </h4>
          <p className="text-xs text-slate-400">
            Observations grounded directly in live cohort metrics.
          </p>
        </div>

        <div className="space-y-4">
          {insightsData.insights.map((insight, idx) => {
            const actionStyle = ACTION_COLORS[insight.action_type] || ACTION_COLORS.MAINTAIN;

            return (
              <div
                key={idx}
                className="p-6 rounded-2xl glass-panel border border-slate-800 hover:border-slate-700 transition space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {insight.category}
                    </span>
                    <h5 className="font-extrabold text-white text-sm">{insight.title}</h5>
                  </div>
                  <span
                    className={`self-start sm:self-auto px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${actionStyle.bg} ${actionStyle.text} ${actionStyle.border}`}
                  >
                    Recommend: {insight.action_type}
                  </span>
                </div>

                <div className="text-xs text-slate-300 leading-relaxed">
                  <strong>Observation:</strong> {insight.observation}
                </div>

                <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-indigo-200 leading-relaxed">
                  <strong className="text-white">Growth Recommendation:</strong> {insight.recommendation}
                </div>

                <div className="text-[11px] text-slate-400 font-mono">
                  Grounding Data: <span className="text-slate-300">{insight.metric_evidence}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
