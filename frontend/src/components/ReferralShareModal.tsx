import React, { useState } from 'react';
import { Check, Copy, Share2, Sparkles, MessageCircle, Trophy, X, ArrowRight } from 'lucide-react';
import { RegistrationSuccessResponse } from '../types';

const LinkedInIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
  </svg>
);

interface Props {
  data: RegistrationSuccessResponse | null;
  isOpen: boolean;
  onClose: () => void;
  onViewDashboard?: () => void;
}

export const ReferralShareModal: React.FC<Props> = ({
  data,
  isOpen,
  onClose,
  onViewDashboard,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !data) return null;

  const origin = window.location.origin;
  const fullReferralUrl = `${origin}/?ref=${data.referral_code}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullReferralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappText = encodeURIComponent(
    `Hey! I just registered for the free NxtWave hands-on workshop: "Build Your First AI Project in 60 Minutes". It's specifically for final-year engineering students to build an AI project for placements.\n\nUse my invite link to claim your free seat: ${fullReferralUrl}`
  );

  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    fullReferralUrl
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg p-6 md:p-8 rounded-3xl glass-panel-glow border border-indigo-500/30 shadow-2xl text-center">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration Header */}
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-emerald-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <Sparkles className="w-8 h-8 text-white" />
        </div>

        <h3 className="text-2xl font-black text-white tracking-tight">
          🎉 Seat Reserved, {data.student.name.split(' ')[0]}!
        </h3>
        <p className="text-sm text-slate-300 mt-1 max-w-sm mx-auto">
          We've logged your registration for the 60-Minute AI Workshop. Your workshop access link is ready.
        </p>

        {/* Referral Card */}
        <div className="my-6 p-5 rounded-2xl bg-slate-900/90 border border-indigo-500/30 text-left">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Your Unique Referral Code
            </span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              +1 Referral Point per Join
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 mb-3">
            <span className="text-xl font-mono font-extrabold text-white tracking-wider">
              {data.referral_code}
            </span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>

          <div className="text-xs text-slate-400 truncate font-mono bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
            {fullReferralUrl}
          </div>

          {/* Social Share Buttons */}
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <a
              href={`https://api.whatsapp.com/send?text=${whatsappText}`}
              target="_blank"
              rel="noreferrer"
              className="py-2.5 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center justify-center gap-2 transition"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Share on WhatsApp</span>
            </a>
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="py-2.5 px-3 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 border border-sky-500/30 text-sky-400 text-xs font-bold flex items-center justify-center gap-2 transition"
            >
              <LinkedInIcon className="w-4 h-4 text-sky-400" />
              <span>Share on LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Milestone Incentive Callout */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-left flex items-start gap-3 mb-6">
          <Trophy className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <div className="font-bold text-amber-200">
              Campus Referral Reward
            </div>
            <div className="text-amber-300/80 mt-0.5">
              Invite <strong>3 engineering batchmates</strong> to unlock the <em>AI Project GitHub Starter Template + ATS Resume Bullet Points</em>.
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition cursor-pointer"
          >
            Back to Workshop Details
          </button>
          {onViewDashboard && (
            <button
              onClick={() => {
                onClose();
                onViewDashboard();
              }}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-lg shadow-indigo-600/20"
            >
              <span>View Live Growth Engine</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
