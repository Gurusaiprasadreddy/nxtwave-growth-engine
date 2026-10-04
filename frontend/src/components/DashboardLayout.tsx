import React, { useState } from 'react';
import { 
  OverviewKPIs, 
  ChannelAnalyticsItem, 
  FunnelAnalyticsResponse, 
  LeaderboardEntry, 
  BudgetAnalyticsResponse, 
  Experiment, 
  AIInsightsResponse 
} from '../types';
import { OverviewTab } from './OverviewTab';
import { FunnelTab } from './FunnelTab';
import { ChannelAnalyticsTab } from './ChannelAnalyticsTab';
import { ReferralsTab } from './ReferralsTab';
import { ExperimentsTab } from './ExperimentsTab';
import { BudgetTab } from './BudgetTab';
import { AIInsightsTab } from './AIInsightsTab';
import { RegistrationsTableTab } from './RegistrationsTableTab';
import { GrowthPlanTab } from './GrowthPlanTab';
import { 
  LayoutDashboard, 
  GitFork, 
  Radio, 
  Share2, 
  FlaskConical, 
  IndianRupee, 
  Bot, 
  Users, 
  BookOpen,
  RefreshCw
} from 'lucide-react';

interface Props {
  kpis: OverviewKPIs | null;
  channels: ChannelAnalyticsItem[];
  funnel: FunnelAnalyticsResponse | null;
  leaderboard: LeaderboardEntry[];
  budget: BudgetAnalyticsResponse | null;
  experiments: Experiment[];
  insights: AIInsightsResponse | null;
  onRefreshAll: () => void;
  isRefreshing: boolean;
}

export const DashboardLayout: React.FC<Props> = ({
  kpis,
  channels,
  funnel,
  leaderboard,
  budget,
  experiments,
  insights,
  onRefreshAll,
  isRefreshing,
}) => {
  const [activeTab, setActiveTab] = useState<string>('overview');

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'channels', label: 'Channels', icon: Radio },
    { id: 'funnel', label: 'Funnel', icon: GitFork },
    { id: 'referrals', label: 'Referrals', icon: Share2 },
    { id: 'experiments', label: 'Experiments', icon: FlaskConical },
    { id: 'budget', label: 'Budget', icon: IndianRupee },
    { id: 'insights', label: 'AI Insights', icon: Bot },
    { id: 'registrations', label: 'Registrations', icon: Users },
    { id: 'growth-plan', label: 'Growth Plan', icon: BookOpen },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Dashboard Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black text-white tracking-tight">
              Growth Intelligence Dashboard
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              Live Engine
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time analytics for the "Build Your First AI Project in 60 Minutes" workshop campaign.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRefreshAll}
            disabled={isRefreshing}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-2 transition cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh Metrics'}</span>
          </button>
        </div>
      </div>

      {/* Nav Tabs Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800/80 scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Content */}
      <div className="min-h-[500px]">
        {activeTab === 'overview' && (
          <OverviewTab
            kpis={kpis}
            channels={channels}
            funnel={funnel}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'channels' && (
          <ChannelAnalyticsTab channels={channels} />
        )}

        {activeTab === 'funnel' && (
          <FunnelTab funnel={funnel} />
        )}

        {activeTab === 'referrals' && (
          <ReferralsTab
            leaderboard={leaderboard}
            onRefresh={onRefreshAll}
          />
        )}

        {activeTab === 'experiments' && (
          <ExperimentsTab
            experiments={experiments}
            onRefresh={onRefreshAll}
          />
        )}

        {activeTab === 'budget' && (
          <BudgetTab budget={budget} />
        )}

        {activeTab === 'insights' && (
          <AIInsightsTab insightsData={insights} />
        )}

        {activeTab === 'registrations' && (
          <RegistrationsTableTab />
        )}

        {activeTab === 'growth-plan' && (
          <GrowthPlanTab />
        )}
      </div>
    </div>
  );
};
