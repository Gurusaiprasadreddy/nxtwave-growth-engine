import React from 'react';
import { ChannelAnalyticsItem } from '../types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  LineChart,
  Line,
  CartesianGrid
} from 'recharts';
import { 
  MessageSquare, 
  Users, 
  Share2, 
  Mail, 
  ArrowUpRight, 
  IndianRupee, 
  Percent, 
  CheckCircle, 
  AlertTriangle 
} from 'lucide-react';

const LinkedInIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
  </svg>
);

interface Props {
  channels: ChannelAnalyticsItem[];
}

const CHANNEL_ICONS: Record<string, React.ReactNode> = {
  WhatsApp: <MessageSquare className="w-4 h-4 text-emerald-400" />,
  'College Clubs': <Users className="w-4 h-4 text-purple-400" />,
  Referral: <Share2 className="w-4 h-4 text-pink-400" />,
  LinkedIn: <LinkedInIcon className="w-4 h-4 text-sky-400" />,
  Email: <Mail className="w-4 h-4 text-amber-400" />,
};

const CHANNEL_COLORS: Record<string, string> = {
  WhatsApp: '#10b981',
  'College Clubs': '#8b5cf6',
  Referral: '#ec4899',
  LinkedIn: '#0284c7',
  Email: '#f59e0b',
};

export const ChannelAnalyticsTab: React.FC<Props> = ({ channels }) => {
  const totalRegistrations = channels.reduce((acc, c) => acc + c.registrations, 0);
  const totalSpend = channels.reduce((acc, c) => acc + c.budget, 0);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <h3 className="text-xl font-bold text-white tracking-tight">
          Channel & Acquisition Performance
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Detailed metrics across WhatsApp, College Clubs, Student Referral, LinkedIn, and Email channels.
        </p>
      </div>

      {/* CHANNEL CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {channels.map((c) => (
          <div
            key={c.channel}
            className="p-5 rounded-2xl glass-panel border border-slate-800 hover:border-slate-700 transition space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                {CHANNEL_ICONS[c.channel]}
                <span>{c.channel}</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                {c.contribution_pct}% share
              </span>
            </div>

            <div>
              <div className="text-2xl font-black text-white font-mono">
                {c.registrations}
              </div>
              <div className="text-[11px] text-slate-400">Registrations</div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 space-y-1.5 text-[11px]">
              <div className="flex justify-between text-slate-400">
                <span>Budget Spent:</span>
                <span className="font-mono text-slate-200">₹{c.budget.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Cost / Reg:</span>
                <span className="font-mono text-emerald-400 font-bold">₹{c.cost_per_registration.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>CTR:</span>
                <span className="font-mono text-slate-200">{c.ctr_pct}%</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Click-to-Reg Conv:</span>
                <span className="font-mono text-indigo-300 font-bold">{c.conversion_rate_pct}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DUAL COMPARATIVE CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Conversion Rate vs CTR by Channel */}
        <div className="p-5 rounded-2xl glass-panel border border-slate-800">
          <div className="mb-4">
            <h4 className="text-sm font-bold text-white">Click-to-Registration Conversion % by Channel</h4>
            <p className="text-xs text-slate-400">Higher conversion indicates stronger student intent</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channels} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="channel" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} unit="%" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                  formatter={(value: any) => [`${value}%`, 'Conversion Rate']}
                />
                <Bar dataKey="conversion_rate_pct" radius={[6, 6, 0, 0]}>
                  {channels.map((entry, index) => (
                    <Cell
                      key={`conv-${index}`}
                      fill={CHANNEL_COLORS[entry.channel] || '#6366f1'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Cost Per Registration (CAC) Comparison */}
        <div className="p-5 rounded-2xl glass-panel border border-slate-800">
          <div className="mb-4">
            <h4 className="text-sm font-bold text-white">Cost per Registration (₹) by Channel</h4>
            <p className="text-xs text-slate-400">Lower CAC demonstrates superior acquisition efficiency</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channels} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="channel" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} unit="₹" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                  formatter={(value: any) => [`₹${Number(value).toFixed(2)}`, 'Cost/Reg']}
                />
                <Bar dataKey="cost_per_registration" fill="#38bdf8" radius={[6, 6, 0, 0]}>
                  {channels.map((entry, index) => (
                    <Cell
                      key={`cpr-${index}`}
                      fill={entry.cost_per_registration <= 4.0 ? '#10b981' : '#f59e0b'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* FULL CHANNEL METRICS TABLE */}
      <div className="rounded-2xl glass-panel border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          <h4 className="text-sm font-bold text-white">Channel Analytics Matrix</h4>
          <span className="text-xs text-slate-400 font-mono">
            Total: {totalRegistrations} Registrations • ₹{totalSpend.toFixed(0)} Budget
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider text-[10px] font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4">Budget (₹)</th>
                <th className="py-3 px-4">Impressions</th>
                <th className="py-3 px-4">Clicks</th>
                <th className="py-3 px-4">CTR %</th>
                <th className="py-3 px-4">Registrations</th>
                <th className="py-3 px-4">Conv. Rate %</th>
                <th className="py-3 px-4">Cost / Reg (₹)</th>
                <th className="py-3 px-4">Share %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {channels.map((c) => (
                <tr key={c.channel} className="hover:bg-slate-800/30 transition">
                  <td className="py-3.5 px-4 font-sans font-semibold text-white flex items-center gap-2">
                    {CHANNEL_ICONS[c.channel]}
                    <span>{c.channel}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">₹{c.budget.toFixed(0)}</td>
                  <td className="py-3.5 px-4 text-slate-400">{c.impressions.toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-slate-300">{c.clicks.toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-indigo-300">{c.ctr_pct}%</td>
                  <td className="py-3.5 px-4 font-bold text-white">{c.registrations}</td>
                  <td className="py-3.5 px-4 text-purple-300">{c.conversion_rate_pct}%</td>
                  <td className="py-3.5 px-4 font-bold text-emerald-400">₹{c.cost_per_registration.toFixed(2)}</td>
                  <td className="py-3.5 px-4 text-slate-300">{c.contribution_pct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
