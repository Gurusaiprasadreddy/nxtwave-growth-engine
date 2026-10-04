import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { api } from './services/api';
import { 
  OverviewKPIs, 
  ChannelAnalyticsItem, 
  FunnelAnalyticsResponse, 
  LeaderboardEntry, 
  BudgetAnalyticsResponse, 
  Experiment, 
  AIInsightsResponse, 
  RegistrationSuccessResponse 
} from './types';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { DashboardLayout } from './components/DashboardLayout';
import { RegistrationModal } from './components/RegistrationModal';
import { ReferralShareModal } from './components/ReferralShareModal';

export function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing');
  const [activeVariant, setActiveVariant] = useState<'Variant A' | 'Variant B'>('Variant A');
  const [urlReferralCode, setUrlReferralCode] = useState<string>('');

  // Modals
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const [latestRegistration, setLatestRegistration] = useState<RegistrationSuccessResponse | null>(null);

  // Growth Analytics State
  const [kpis, setKpis] = useState<OverviewKPIs | null>(null);
  const [channels, setChannels] = useState<ChannelAnalyticsItem[]>([]);
  const [funnel, setFunnel] = useState<FunnelAnalyticsResponse | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [budget, setBudget] = useState<BudgetAnalyticsResponse | null>(null);
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [insights, setInsights] = useState<AIInsightsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Check URL query parameter ?ref=CODE
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref) {
      setUrlReferralCode(ref.toUpperCase());
      api.recordEvent('referral_link_opened', 'Referral');
    } else {
      api.recordEvent('page_view', 'Direct');
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const fetchAllData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [
        overviewRes,
        channelsRes,
        funnelRes,
        referralsRes,
        budgetRes,
        experimentsRes,
        insightsRes,
      ] = await Promise.all([
        api.getOverview().catch(() => null),
        api.getChannels().catch(() => []),
        api.getFunnel().catch(() => null),
        api.getReferrals().catch(() => []),
        api.getBudget().catch(() => null),
        api.getExperiments().catch(() => []),
        api.getInsights().catch(() => null),
      ]);

      if (overviewRes) setKpis(overviewRes);
      if (channelsRes) setChannels(channelsRes);
      if (funnelRes) setFunnel(funnelRes);
      if (referralsRes) setLeaderboard(referralsRes);
      if (budgetRes) setBudget(budgetRes);
      if (experimentsRes) setExperiments(experimentsRes);
      if (insightsRes) setInsights(insightsRes);
    } catch (err) {
      console.error('Failed to load growth metrics:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Load Demo Data (500 registrations)
  const handleLoadDemo = async () => {
    setIsLoading(true);
    try {
      const res = await api.loadDemoCampaign();
      showToast('Loaded 500-student realistic campaign simulation data!');
      await fetchAllData();
    } catch (err: any) {
      showToast(`Demo load error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset Demo Data
  const handleResetDemo = async () => {
    setIsLoading(true);
    try {
      await api.resetDemoData();
      showToast('Simulation reset to baseline clean state.');
      await fetchAllData();
    } catch (err: any) {
      showToast(`Reset error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // On student registration success
  const handleRegistrationSuccess = (data: RegistrationSuccessResponse) => {
    // Trigger confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // safe fallback
    }

    setLatestRegistration(data);
    setIsReferralModalOpen(true);
    showToast(`Welcome, ${data.student.name}! Your referral code is ${data.referral_code}`);
    fetchAllData();
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 p-4 rounded-2xl bg-indigo-950 border border-indigo-500/40 text-white text-xs font-semibold shadow-2xl flex items-center gap-3 animate-slideUp">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        activeVariant={activeVariant}
        setActiveVariant={setActiveVariant}
        onLoadDemo={handleLoadDemo}
        onResetDemo={handleResetDemo}
        isLoading={isLoading}
        registrationCount={kpis?.current_registrations || 0}
      />

      {/* Main View: Landing Page OR Growth Analytics Dashboard */}
      <main className="flex-1">
        {currentView === 'landing' ? (
          <LandingPage
            onOpenRegister={() => setIsRegisterOpen(true)}
            activeVariant={activeVariant}
            referralCode={urlReferralCode}
          />
        ) : (
          <DashboardLayout
            kpis={kpis}
            channels={channels}
            funnel={funnel}
            leaderboard={leaderboard}
            budget={budget}
            experiments={experiments}
            insights={insights}
            onRefreshAll={fetchAllData}
            isRefreshing={isLoading}
          />
        )}
      </main>

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSuccess={handleRegistrationSuccess}
        initialReferralCode={urlReferralCode}
        activeVariant={activeVariant}
      />

      {/* Referral Share Modal */}
      <ReferralShareModal
        isOpen={isReferralModalOpen}
        onClose={() => setIsReferralModalOpen(false)}
        data={latestRegistration}
        onViewDashboard={() => setCurrentView('dashboard')}
      />
    </div>
  );
}

export default App;
