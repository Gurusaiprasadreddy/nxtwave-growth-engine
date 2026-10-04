import React, { useState } from 'react';
import { LeaderboardEntry } from '../types';
import { 
  Trophy, 
  Share2, 
  Sparkles, 
  Medal, 
  ArrowRight, 
  UserCheck, 
  TrendingUp, 
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { api } from '../services/api';

interface Props {
  leaderboard: LeaderboardEntry[];
  onRefresh: () => void;
  onOpenRegisterWithRef?: (code: string) => void;
}

export const ReferralsTab: React.FC<Props> = ({
  leaderboard,
  onRefresh,
  onOpenRegisterWithRef,
}) => {
  const [testCode, setTestCode] = useState('');
  const [simulating, setSimulating] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const totalReferrals = leaderboard.reduce((acc, l) => acc + l.registrations_generated, 0);

  const handleSimulateReferral = async (codeToUse: string) => {
    setSimulating(true);
    setSuccessMsg(null);
    try {
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      await api.registerStudent({
        name: `Campus Peer ${randomSuffix}`,
        email: `peer.${randomSuffix}@test.demo.edu`,
        phone: `98765${randomSuffix}`,
        college: 'JNTU Hyderabad',
        branch: 'Computer Science & Engineering',
        graduation_year: 2025,
        preferred_channel: 'Referral',
        referral_code: codeToUse,
      });
      setSuccessMsg(`Simulated registration credited to referral code "${codeToUse}"!`);
      onRefresh();
    } catch (err: any) {
      setSuccessMsg(`Error: ${err.message}`);
    } finally {
      setSimulating(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-pink-500/10 text-pink-400 border border-pink-500/20 mb-2">
            <Share2 className="w-3.5 h-3.5" />
            <span>Peer Viral Loop Engine</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Student Referral Leaderboard & Viral Mechanics
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Every registered student receives a custom code like <code className="text-pink-300">AARA101</code>. When peers register via <code className="text-indigo-300">?ref=CODE</code>, attribution is logged instantly.
          </p>
        </div>

        {/* Viral Summary Pill */}
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-4 text-xs font-mono">
          <div>
            <div className="text-slate-400 text-[10px] uppercase">Total Referred</div>
            <div className="text-xl font-black text-pink-400">{totalReferrals}</div>
          </div>
          <div className="border-l border-slate-800 pl-4">
            <div className="text-slate-400 text-[10px] uppercase">Viral K-Factor</div>
            <div className="text-xl font-black text-emerald-400">0.31</div>
          </div>
        </div>
      </div>

      {/* TOP 3 PODIUM */}
      {leaderboard.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Rank 2 */}
          <div className="order-2 md:order-1 p-5 rounded-2xl glass-panel border border-slate-800 text-center flex flex-col items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-slate-700/60 text-slate-300 flex items-center justify-center font-bold text-sm mb-2 border border-slate-600">
              #2
            </div>
            <div>
              <h4 className="font-bold text-white text-base">{leaderboard[1].student_name}</h4>
              <p className="text-xs text-slate-400 font-mono mt-0.5">{leaderboard[1].referral_code}</p>
              <div className="text-xs text-slate-400 mt-1">{leaderboard[1].college}</div>
            </div>
            <div className="mt-4 p-2.5 rounded-xl bg-slate-900 w-full font-mono text-sm font-black text-slate-200">
              {leaderboard[1].registrations_generated} Registrations
            </div>
          </div>

          {/* Rank 1 (Winner) */}
          <div className="order-1 md:order-2 p-6 rounded-2xl glass-panel-glow border border-amber-500/40 text-center flex flex-col items-center justify-between relative">
            <div className="absolute -top-3 px-3 py-0.5 rounded-full bg-amber-500 text-slate-950 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-lg">
              <Trophy className="w-3 h-3" />
              <span>Campus Lead</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-lg mb-2 border border-amber-500/40 mt-1">
              👑
            </div>
            <div>
              <h4 className="font-extrabold text-white text-lg">{leaderboard[0].student_name}</h4>
              <p className="text-xs text-amber-300 font-mono mt-0.5 font-bold">{leaderboard[0].referral_code}</p>
              <div className="text-xs text-slate-400 mt-1">{leaderboard[0].college}</div>
            </div>
            <div className="mt-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 w-full font-mono text-lg font-black text-amber-400">
              {leaderboard[0].registrations_generated} Registrations
            </div>
          </div>

          {/* Rank 3 */}
          <div className="order-3 md:order-3 p-5 rounded-2xl glass-panel border border-slate-800 text-center flex flex-col items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-amber-900/30 text-amber-500 flex items-center justify-center font-bold text-sm mb-2 border border-amber-800/40">
              #3
            </div>
            <div>
              <h4 className="font-bold text-white text-base">{leaderboard[2].student_name}</h4>
              <p className="text-xs text-slate-400 font-mono mt-0.5">{leaderboard[2].referral_code}</p>
              <div className="text-xs text-slate-400 mt-1">{leaderboard[2].college}</div>
            </div>
            <div className="mt-4 p-2.5 rounded-xl bg-slate-900 w-full font-mono text-sm font-black text-slate-200">
              {leaderboard[2].registrations_generated} Registrations
            </div>
          </div>
        </div>
      )}

      {/* FULL LEADERBOARD TABLE */}
      <div className="rounded-2xl glass-panel border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          <h4 className="text-sm font-bold text-white">Full Campus Ambassador Leaderboard</h4>
          <span className="text-xs text-slate-400">Top advocates driving peer adoption</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider text-[10px] font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Referral Code</th>
                <th className="py-3 px-4">College</th>
                <th className="py-3 px-4">Acquisition Channel</th>
                <th className="py-3 px-4 text-right">Registrations Generated</th>
                <th className="py-3 px-4 text-center">Test Live</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {leaderboard.map((entry) => (
                <tr key={entry.referral_code} className="hover:bg-slate-800/30 transition">
                  <td className="py-3.5 px-4 font-bold text-white">
                    {entry.rank === 1 ? '🥇 1' : entry.rank === 2 ? '🥈 2' : entry.rank === 3 ? '🥉 3' : `#${entry.rank}`}
                  </td>
                  <td className="py-3.5 px-4 font-sans font-semibold text-slate-200">
                    {entry.student_name}
                  </td>
                  <td className="py-3.5 px-4 text-pink-400 font-bold">
                    {entry.referral_code}
                  </td>
                  <td className="py-3.5 px-4 font-sans text-slate-400">
                    {entry.college}
                  </td>
                  <td className="py-3.5 px-4 font-sans text-slate-400">
                    {entry.channel}
                  </td>
                  <td className="py-3.5 px-4 text-right font-black text-white text-sm">
                    {entry.registrations_generated}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => handleSimulateReferral(entry.referral_code)}
                      disabled={simulating}
                      className="px-2.5 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 font-sans font-semibold text-[11px] border border-indigo-500/30 transition cursor-pointer disabled:opacity-50"
                      title="Simulate a new peer registering through this code"
                    >
                      +1 Peer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {successMsg && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between">
          <span>{successMsg}</span>
          <button onClick={() => setSuccessMsg(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* REFERRAL SIMULATION BOX */}
      <div className="p-6 rounded-2xl glass-panel-glow border border-indigo-500/20">
        <h4 className="text-sm font-bold text-white mb-1">
          Interactive Referral Code Attribution Tester
        </h4>
        <p className="text-xs text-slate-400 mb-4">
          Test how a new student registering via URL query parameter <code className="text-indigo-300">/register?ref=YOUR_CODE</code> automatically credits the referrer and updates rankings in real-time.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Enter any referral code (e.g. AARA101)"
            value={testCode}
            onChange={(e) => setTestCode(e.target.value.toUpperCase())}
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={() => handleSimulateReferral(testCode || 'AARA101')}
            disabled={simulating}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-indigo-600 hover:from-pink-500 hover:to-indigo-500 text-white font-bold text-xs transition cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <span>Simulate Peer Registration</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
