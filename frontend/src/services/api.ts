import {
  OverviewKPIs,
  ChannelAnalyticsItem,
  FunnelAnalyticsResponse,
  LeaderboardEntry,
  BudgetAnalyticsResponse,
  Experiment,
  AIInsightsResponse,
  Student,
  StudentRegistrationInput,
  RegistrationSuccessResponse
} from '../types';

const API_BASE = import.meta.env.VITE_API_URL || '';

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    let errorMsg = `API Error: ${res.statusText}`;
    try {
      const errorJson = await res.json();
      if (errorJson.detail) {
        errorMsg = typeof errorJson.detail === 'string' 
          ? errorJson.detail 
          : JSON.stringify(errorJson.detail);
      }
    } catch {
      // fallback
    }
    throw new Error(errorMsg);
  }

  return res.json();
}

export const api = {
  getOverview: () => fetchJson<OverviewKPIs>('/api/analytics/overview'),
  getChannels: () => fetchJson<ChannelAnalyticsItem[]>('/api/analytics/channels'),
  getFunnel: () => fetchJson<FunnelAnalyticsResponse>('/api/analytics/funnel'),
  getReferrals: () => fetchJson<LeaderboardEntry[]>('/api/analytics/referrals'),
  getBudget: () => fetchJson<BudgetAnalyticsResponse>('/api/analytics/budget'),
  getExperiments: () => fetchJson<Experiment[]>('/api/experiments'),
  getInsights: () => fetchJson<AIInsightsResponse>('/api/insights'),
  
  getRegistrations: (limit = 100, offset = 0, channel?: string) => {
    let url = `/api/registrations?limit=${limit}&offset=${offset}`;
    if (channel) url += `&channel=${encodeURIComponent(channel)}`;
    return fetchJson<Student[]>(url);
  },

  registerStudent: (data: StudentRegistrationInput) =>
    fetchJson<RegistrationSuccessResponse>('/api/registrations', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  loadDemoCampaign: () =>
    fetchJson<{ status: string; message: string; registrations: number }>('/api/demo/load', {
      method: 'POST',
    }),

  resetDemoData: () =>
    fetchJson<{ status: string; message: string; registrations: number }>('/api/demo/reset', {
      method: 'POST',
    }),

  recordEvent: (eventType: string, channel = 'Direct') =>
    fetchJson<{ status: string }>('/api/events', {
      method: 'POST',
      body: JSON.stringify({ event_type: eventType, channel }),
    }).catch(() => {
      // Non-blocking fire-and-forget
    }),
};
