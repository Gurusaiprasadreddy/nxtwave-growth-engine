import React from 'react';
import { 
  Users, 
  Target, 
  Percent, 
  TrendingUp, 
  Share2, 
  IndianRupee, 
  Award, 
  Sparkles, 
  ArrowUpRight, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { OverviewKPIs, ChannelAnalyticsItem, FunnelAnalyticsResponse } from '../types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  PieChart, 
  Pie 
} from 'recharts';

interface Props {
  kpis: OverviewKPIs | null;
  channels: ChannelAnalyticsItem[];
  funnel: FunnelAnalyticsResponse | null;
  onNavigateTab: (tab: string) => void;
}

const CHANNEL_COLORS: Record<string, string> = {
  WhatsApp: '#10b981',
  'College Clubs': '#8b5cf6',
  Referral: '#ec4899',
  LinkedIn: '#0284c7',
  Email: '#f59e0b',
};

export const OverviewTab: React.FC<Props> = ({
  kpis,
  channels,
  funnel,
  onNavigateTab,
}) => {
  if (!kpis) {
    return (
      <div className="p-12 text-center text-slate-400">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm">Loading growth metrics...</p>
      </div>
    );
  }

  const pieData = channels.map((c) => ({
    name: c.channel,
    value: c.registrations,
    color: CHANNEL_COLORS[c.channel] || '#6366f1',
  }));

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Simulation Disclaimer Bar */}
      <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-indigo-300">
          <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
          <span>
            <strong>Simulated Campaign Mode:</strong> Metrics reflect a 7-day growth sprint targeting 500 final-year engineering students on a ₹2,000 budget.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold font-mono">
            {kpis.current_registrations} / {kpis.registration_target} Registrations
          </span>
        </div>
      </div>

      {/* TOP 8 KPI CARDS */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-white tracking-tight">
            Key Performance Indicators (KPIs)
          </h3>
          <span className="text-xs text-slate-400">
            Dynamically calculated from database records
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Registration Target */}
          <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-slate-800 hover:border-slate-700 transition">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Cohort Target</span>
              <Target className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              {kpis.registration_target}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Final-year engineering students
            </div>
          </div>

          {/* Card 2: Current Registrations */}
          <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-indigo-500/30 bg-indigo-950/20">
            <div className="flex items-center justify-between text-indigo-300 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Current Registrations</span>
              <Users className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              {kpis.current_registrations}
            </div>
            <div className="text-[11px] text-emerald-400 font-semibold mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Target Achieved: {kpis.target_achievement_pct}%</span>
            </div>
          </div>

          {/* Card 3: Conversion Rate */}
          <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-slate-800 hover:border-slate-700 transition">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Visitor Conversion</span>
              <Percent className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              {kpis.conversion_rate_pct}%
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Total Registrations ÷ Visitors
            </div>
          </div>

          {/* Card 4: Referral Registrations */}
          <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-slate-800 hover:border-slate-700 transition">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Referral Volume</span>
              <Share2 className="w-4 h-4 text-pink-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              {kpis.referral_registrations}
            </div>
            <div className="text-[11px] text-pink-400 font-medium mt-1">
              {kpis.current_registrations > 0
                ? `${Math.round((kpis.referral_registrations / kpis.current_registrations) * 100)}% viral contribution`
                : '0% contribution'}
            </div>
          </div>

          {/* Card 5: Total Campaign Spend */}
          <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-slate-800 hover:border-slate-700 transition">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Campaign Spend</span>
              <IndianRupee className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              ₹{kpis.total_campaign_spend.toLocaleString()}
            </div>
            <div className="text-[11px] text-amber-300/80 mt-1">
              Simulated 7-day budget limit
            </div>
          </div>

          {/* Card 6: Cost Per Registration (CAC) */}
          <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-slate-800 hover:border-slate-700 transition">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Cost / Registration</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              ₹{kpis.cost_per_registration.toFixed(2)}
            </div>
            <div className="text-[11px] text-emerald-400 mt-1 font-medium">
              Target benchmark: ₹4.00 / reg
            </div>
          </div>

          {/* Card 7: Best Performing Channel */}
          <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-slate-800 hover:border-slate-700 transition">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Top Channel</span>
              <Award className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-white truncate">
              {kpis.best_performing_channel}
            </div>
            <div className="text-[11px] text-indigo-300 font-mono mt-1">
              {kpis.best_channel_registrations} registrations
            </div>
          </div>

          {/* Card 8: Target Achievement % */}
          <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-slate-800 hover:border-slate-700 transition">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Achievement</span>
              <Target className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
              {kpis.target_achievement_pct}%
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, kpis.target_achievement_pct)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Registrations By Channel Bar Chart */}
        <div className="lg:col-span-2 p-5 rounded-2xl glass-panel border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-bold text-white">Registrations by Channel</h4>
              <p className="text-xs text-slate-400">Total volume across 5 marketing channels</p>
            </div>
            <button
              onClick={() => onNavigateTab('channels')}
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold cursor-pointer"
            >
              <span>Channel Details</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channels} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="channel" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                  formatter={(value: any) => [`${value} registrations`, 'Registrations']}
                />
                <Bar dataKey="registrations" radius={[6, 6, 0, 0]}>
                  {channels.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CHANNEL_COLORS[entry.channel] || '#6366f1'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Channel Share Pie Chart */}
        <div className="p-5 rounded-2xl glass-panel border border-slate-800 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-white">Channel Contribution Share</h4>
            <p className="text-xs text-slate-400">Breakdown of student acquisition sources</p>
          </div>

          <div className="h-48 w-full my-auto">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`slice-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                  formatter={(value: any) => [`${value} regs`, 'Count']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800/80">
            {channels.map((c) => (
              <div key={c.channel} className="flex items-center gap-1.5 truncate">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: CHANNEL_COLORS[c.channel] || '#6366f1' }}
                />
                <span className="text-slate-300 truncate">{c.channel}:</span>
                <span className="font-mono text-slate-400 font-semibold">{c.contribution_pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* QUICK FUNNEL & DECISION CALLOUT */}
      {funnel && (
        <div className="p-5 rounded-2xl glass-panel-glow border border-indigo-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                Funnel Health
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {funnel.reach.toLocaleString()} Reached → {funnel.visitors.toLocaleString()} Visitors → {funnel.registrations_completed} Registered
              </span>
            </div>
            <h4 className="text-base font-bold text-white">
              End-to-End Visitor-to-Registration Rate: {funnel.overall_visitor_to_reg_pct}%
            </h4>
            <p className="text-xs text-slate-300 max-w-2xl">
              High intent from peer WhatsApp shares and tech clubs is maintaining conversion above typical ed-tech benchmarks (15-18%).
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('funnel')}
            className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer shrink-0"
          >
            <span>Inspect Visual Funnel</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
