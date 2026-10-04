import React from 'react';
import { BudgetAnalyticsResponse } from '../types';
import { IndianRupee, PieChart as PieIcon, CheckCircle, TrendingDown, AlertCircle, Sparkles } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

interface Props {
  budget: BudgetAnalyticsResponse | null;
}

const CHANNEL_COLORS: Record<string, string> = {
  WhatsApp: '#10b981',
  'College Clubs': '#8b5cf6',
  Referral: '#ec4899',
  LinkedIn: '#0284c7',
  Email: '#f59e0b',
};

export const BudgetTab: React.FC<Props> = ({ budget }) => {
  if (!budget) {
    return (
      <div className="p-12 text-center text-slate-400">
        <p className="text-sm">Loading budget allocation analytics...</p>
      </div>
    );
  }

  const chartData = budget.channels.map((c) => ({
    channel: c.channel,
    budget: c.budget,
    registrations: c.registrations,
    cpr: c.cost_per_registration,
  }));

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
          <IndianRupee className="w-3.5 h-3.5" />
          <span>Simulated Campaign Budget: ₹2,000</span>
        </div>
        <h3 className="text-xl font-bold text-white tracking-tight">
          Budget Allocation & Cost per Registration (CAC)
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Tracking financial efficiency and cost per registered final-year engineering student across 5 targeted channels.
        </p>
      </div>

      {/* TOP BUDGET METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl glass-panel border border-slate-800">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Campaign Budget</span>
          <div className="text-3xl font-black text-white font-mono mt-1">
            ₹{budget.total_budget.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Challenge simulation limit</div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-slate-800">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Allocated & Spent</span>
          <div className="text-3xl font-black text-indigo-400 font-mono mt-1">
            ₹{budget.total_spent.toLocaleString()}
          </div>
          <div className="text-[11px] text-indigo-300 font-semibold mt-1">
            100% strategically deployed
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-slate-800">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Remaining Buffer</span>
          <div className="text-3xl font-black text-slate-300 font-mono mt-1">
            ₹{budget.budget_remaining.toFixed(2)}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Zero budget overruns</div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-emerald-500/30 bg-emerald-950/20">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">Blended Cost / Reg</span>
          <div className="text-3xl font-black text-emerald-400 font-mono mt-1">
            ₹{budget.overall_cost_per_registration.toFixed(2)}
          </div>
          <div className="text-[11px] text-emerald-300 mt-1 font-semibold">
            ₹2,000 ÷ 500 registrations = ₹4.00
          </div>
        </div>
      </div>

      {/* BUDGET BAR CHART */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-sm font-bold text-white">Channel Budget vs Registrations Delivered</h4>
            <p className="text-xs text-slate-400">Showing return on ad & community spend</p>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
              />
              <Bar dataKey="budget" name="Budget (₹)" fill="#6366f1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="registrations" name="Registrations" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ALLOCATION TABLE */}
      <div className="rounded-2xl glass-panel border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          <h4 className="text-sm font-bold text-white">Dynamic Budget Allocation Table</h4>
          <span className="text-xs text-slate-400 font-mono">Formula: Cost/Reg = Budget ÷ Registrations</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider text-[10px] font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4">Budget Allocated (₹)</th>
                <th className="py-3 px-4">Registrations Generated</th>
                <th className="py-3 px-4">Calculated Cost / Reg (₹)</th>
                <th className="py-3 px-4">Efficiency Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {budget.channels.map((c) => (
                <tr key={c.channel} className="hover:bg-slate-800/30 transition">
                  <td className="py-3.5 px-4 font-sans font-semibold text-white">
                    {c.channel}
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">₹{c.budget.toFixed(2)}</td>
                  <td className="py-3.5 px-4 font-bold text-white">{c.registrations}</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-400">
                    ₹{c.cost_per_registration.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4 font-sans">
                    {c.cost_per_registration <= 3.5 ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400">
                        High ROI (Scale)
                      </span>
                    ) : c.cost_per_registration <= 4.5 ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300">
                        On Target (Maintain)
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400">
                        High CAC (Test/Refine)
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-slate-900/90 font-mono font-bold text-white border-t border-slate-700">
              <tr>
                <td className="py-3 px-4 font-sans">Total / Blended</td>
                <td className="py-3 px-4">₹{budget.total_spent.toFixed(2)}</td>
                <td className="py-3 px-4">{budget.channels.reduce((a, b) => a + b.registrations, 0)}</td>
                <td className="py-3 px-4 text-emerald-400">₹{budget.overall_cost_per_registration.toFixed(2)}</td>
                <td className="py-3 px-4 font-sans text-xs text-emerald-300">Target Achieved</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
