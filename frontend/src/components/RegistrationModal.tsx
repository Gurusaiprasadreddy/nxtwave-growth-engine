import React, { useState, useEffect } from 'react';
import { X, Sparkles, CheckCircle2, AlertCircle, ArrowRight, UserCheck } from 'lucide-react';
import { api } from '../services/api';
import { RegistrationSuccessResponse } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: RegistrationSuccessResponse) => void;
  initialReferralCode?: string;
  activeVariant?: string;
}

export const RegistrationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSuccess,
  initialReferralCode = '',
  activeVariant = 'Variant A',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: '',
    branch: 'Computer Science & Engineering',
    graduation_year: 2025,
    preferred_channel: 'WhatsApp',
    referral_code: initialReferralCode,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialReferralCode) {
      setFormData((prev) => ({ ...prev, referral_code: initialReferralCode }));
    }
  }, [initialReferralCode]);

  useEffect(() => {
    if (isOpen) {
      api.recordEvent('form_start', formData.preferred_channel);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.college.trim()) {
      setError('Please fill out all required fields.');
      setIsLoading(false);
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setError('Please provide a valid college or personal email address.');
      setIsLoading(false);
      return;
    }

    if (formData.phone.replace(/\D/g, '').length < 10) {
      setError('Please provide a valid 10-digit phone number for WhatsApp workshop updates.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await api.registerStudent({
        ...formData,
        phone: formData.phone.trim(),
        email: formData.email.trim(),
      });
      onSuccess(res);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please check your details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-lg p-6 md:p-8 rounded-2xl glass-panel-glow border border-slate-700/60 shadow-2xl text-left my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            100% Free • Final-Year Cohort Seat
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Reserve Your Workshop Seat
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Build your first AI Project in 60 minutes. Live project files + GitHub starter pack included.
          </p>
          {formData.referral_code && (
            <div className="mt-3 p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center gap-2 text-xs text-indigo-300">
              <UserCheck className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>
                Referred by classmate code: <strong className="font-mono text-indigo-200">{formData.referral_code}</strong> (Peer bonus applied)
              </span>
            </div>
          )}
        </div>

        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-300">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Rahul Sharma"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="student@college.edu or gmail"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                WhatsApp Phone *
              </label>
              <input
                type="tel"
                required
                placeholder="10-digit mobile"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Engineering College *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. JNTUH / CBIT / SRM"
                value={formData.college}
                onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Branch / Discipline *
              </label>
              <select
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm"
              >
                <option value="Computer Science & Engineering">Computer Science (CSE)</option>
                <option value="Information Technology">Information Tech (IT)</option>
                <option value="Artificial Intelligence & Data Science">AI & Data Science (AI/DS)</option>
                <option value="Electronics & Communication">Electronics & Comm (ECE)</option>
                <option value="Electrical & Electronics">Electrical & Electronics (EEE)</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Other Engineering Branch">Other Engineering Branch</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Grad Year *
              </label>
              <select
                value={formData.graduation_year}
                onChange={(e) => setFormData({ ...formData, graduation_year: parseInt(e.target.value) })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 text-sm"
              >
                <option value={2025}>2025 (Final Year)</option>
                <option value={2026}>2026 (Pre-Final Year)</option>
                <option value={2024}>2024 (Recent Grad)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Found Us Via
              </label>
              <select
                value={formData.preferred_channel}
                onChange={(e) => setFormData({ ...formData, preferred_channel: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white focus:outline-none focus:border-indigo-500 text-sm"
              >
                <option value="WhatsApp">WhatsApp Group</option>
                <option value="College Clubs">College Club</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Email">Email Invite</option>
                <option value="Referral">Peer Referral</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Referral Code
              </label>
              <input
                type="text"
                placeholder="Optional (e.g. AARA101)"
                value={formData.referral_code}
                onChange={(e) => setFormData({ ...formData, referral_code: e.target.value.toUpperCase() })}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 text-sm font-mono"
              />
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 active:scale-[0.99] transition shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Confirming Seat...</span>
                </>
              ) : (
                <>
                  <span>Complete Free Registration</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
            <p className="text-center text-[11px] text-slate-400 mt-2.5">
              Instant calendar invite & WhatsApp joining link sent automatically. No spam ever.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
