export interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  college: string;
  branch: string;
  graduation_year: number;
  channel: string;
  referral_code: string;
  referred_by: string | null;
  created_at: string;
}

export interface StudentRegistrationInput {
  name: string;
  email: string;
  phone: string;
  college: string;
  branch: string;
  graduation_year: number;
  preferred_channel: string;
  referral_code?: string;
}

export interface RegistrationSuccessResponse {
  student: Student;
  referral_code: string;
  referral_url: string;
  message: string;
  referrals_count: number;
  rank: number | null;
}

export interface OverviewKPIs {
  registration_target: number;
  current_registrations: number;
  target_achievement_pct: number;
  conversion_rate_pct: number;
  referral_registrations: number;
  total_campaign_spend: number;
  cost_per_registration: number;
  best_performing_channel: string;
  best_channel_registrations: number;
  is_simulation: boolean;
}

export interface ChannelAnalyticsItem {
  channel: string;
  budget: number;
  impressions: number;
  clicks: number;
  registrations: number;
  ctr_pct: number;
  conversion_rate_pct: number;
  cost_per_registration: number;
  contribution_pct: number;
}

export interface FunnelStage {
  stage: string;
  count: number;
  conversion_from_previous_pct: number;
  drop_off_pct: number;
  overall_conversion_pct: number;
}

export interface FunnelAnalyticsResponse {
  reach: number;
  visitors: number;
  forms_started: number;
  registrations_completed: number;
  overall_visitor_to_reg_pct: number;
  stages: FunnelStage[];
  is_simulation: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  student_name: string;
  referral_code: string;
  referrals_count: number;
  registrations_generated: number;
  college: string;
  channel: string;
}

export interface BudgetAnalyticsResponse {
  total_budget: number;
  total_spent: number;
  budget_remaining: number;
  overall_cost_per_registration: number;
  channels: ChannelAnalyticsItem[];
  is_simulation: boolean;
}

export interface Experiment {
  id: number;
  name: string;
  variant_a: string;
  variant_b: string;
  impressions_a: number;
  impressions_b: number;
  clicks_a: number;
  clicks_b: number;
  registrations_a: number;
  registrations_b: number;
  ctr_a_pct: number;
  ctr_b_pct: number;
  conversion_a_pct: number;
  conversion_b_pct: number;
  winner: string;
  winner_reasoning: string;
  status: string;
}

export interface AIInsightItem {
  category: string;
  title: string;
  observation: string;
  recommendation: string;
  action_type: 'SCALE' | 'MAINTAIN' | 'TEST' | 'REDUCE';
  metric_evidence: string;
}

export interface GrowthDecision {
  channel: string;
  action: 'SCALE' | 'MAINTAIN' | 'TEST' | 'REDUCE';
  metric: string;
  reason: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface AIInsightsResponse {
  badge: string;
  insights: AIInsightItem[];
  decisions: GrowthDecision[];
  generated_at: string;
}
