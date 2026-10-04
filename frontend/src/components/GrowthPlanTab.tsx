import React, { useState } from 'react';
import { 
  FileText, 
  Lightbulb, 
  Target, 
  Calendar, 
  BrainCircuit, 
  AlertCircle, 
  Clock, 
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Share2,
  IndianRupee
} from 'lucide-react';

export const GrowthPlanTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'strategy' | 'reflection'>('strategy');

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Sub-navigation */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            NxtWave Growth Intern: Strategy & Reflection Dossier
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Product growth thinking, student psychology, 7-day tactical execution, and AI decision-making notes.
          </p>
        </div>

        <div className="flex p-1 rounded-xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => setActiveSubTab('strategy')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeSubTab === 'strategy'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            5-Slide Growth Plan
          </button>
          <button
            onClick={() => setActiveSubTab('reflection')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              activeSubTab === 'reflection'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Critical Thinking & AI Notes
          </button>
        </div>
      </div>

      {activeSubTab === 'strategy' ? (
        <div className="space-y-8">
          {/* SLIDE 1: TARGET STUDENT PERSONA & VALUE PROPOSITION */}
          <div className="p-6 md:p-8 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 font-mono font-bold text-xs flex items-center justify-center">
                1
              </span>
              <span className="text-xs uppercase font-bold tracking-wider text-indigo-400">
                Slide 1: Student Persona & Core Value Proposition
              </span>
            </div>
            <h4 className="text-2xl font-black text-white">
              Who is the Target Student and Why Will They Register?
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="font-bold text-white text-sm mb-1">Target Profile</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Final-year engineering undergraduates (Class of 2025 across CSE, IT, ECE, AI/DS) facing placement drives. They have theoretical coursework but lack a modern, deployed AI project on GitHub to talk about in interviews.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="font-bold text-white text-sm mb-1">Why They Care</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Campus recruiters are filtering candidates with generic tutorial projects. An applied AI project deployed to a public URL is an instant conversation starter that proves applied skills.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="font-bold text-white text-sm mb-1">Why They Register</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The promise is concrete: "60 minutes, beginner friendly, zero setup, live deployed project." No 4-week commitment; immediate high-yield return on their time before campus drives.
                </p>
              </div>
            </div>
          </div>

          {/* SLIDE 2: CHANNEL SELECTION & THE 500-REGISTRATION WATERFALL */}
          <div className="p-6 md:p-8 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-400 font-mono font-bold text-xs flex items-center justify-center">
                2
              </span>
              <span className="text-xs uppercase font-bold tracking-wider text-purple-400">
                Slide 2: Prioritized Channels & The 500-Registration Waterfall
              </span>
            </div>
            <h4 className="text-2xl font-black text-white">
              How the 500 Registrations Come In (No 20-Idea Fluff)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-emerald-400 font-bold font-sans">1. WhatsApp Groups</div>
                <div className="text-lg font-black text-white">130 Regs</div>
                <p className="text-[11px] font-sans text-slate-400">
                  Targeted batch & placement coordinator groups. High open rates, zero friction.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-purple-400 font-bold font-sans">2. College Clubs</div>
                <div className="text-lg font-black text-white">100 Regs</div>
                <p className="text-[11px] font-sans text-slate-400">
                  Official coding club announcements and computer society partnerships across 8 campuses.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-pink-400 font-bold font-sans">3. Student Referrals</div>
                <div className="text-lg font-black text-white">120 Regs</div>
                <p className="text-[11px] font-sans text-slate-400">
                  Built-in referral loops: "Invite 3 classmates to unlock the AI Interview Starter Repo".
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-sky-400 font-bold font-sans">4. LinkedIn</div>
                <div className="text-lg font-black text-white">80 Regs</div>
                <p className="text-[11px] font-sans text-slate-400">
                  Interview-preparation carousels targeting tier-2/3 final-year engineering students.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-amber-400 font-bold font-sans">5. Email Outreach</div>
                <div className="text-lg font-black text-white">70 Regs</div>
                <p className="text-[11px] font-sans text-slate-400">
                  Department alumni and T&P email distribution lists for high institutional trust.
                </p>
              </div>
            </div>
          </div>

          {/* SLIDE 3: ₹2,000 BUDGET ALLOCATION */}
          <div className="p-6 md:p-8 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 font-mono font-bold text-xs flex items-center justify-center">
                3
              </span>
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
                Slide 3: ₹2,000 Strategic Budget Allocation (₹4.00 CAC)
              </span>
            </div>
            <h4 className="text-2xl font-black text-white">
              Surgical Deployment of the ₹2,000 Micro-Budget
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <span><strong>WhatsApp Channel Rep Micro-Stipends:</strong> 4 student reps × ₹100</span>
                  <span className="font-mono font-bold text-white">₹400 (130 regs)</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <span><strong>College Club Partnership Sponsorships:</strong> 2 clubs × ₹200</span>
                  <span className="font-mono font-bold text-white">₹400 (100 regs)</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <span><strong>Referral Milestone Rewards Pool:</strong> Book/voucher incentives</span>
                  <span className="font-mono font-bold text-white">₹500 (120 regs)</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <span><strong>LinkedIn Hyper-targeted Micro-Ads:</strong> Final years in Hyd/Blr</span>
                  <span className="font-mono font-bold text-white">₹400 (80 regs)</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center">
                  <span><strong>Email Service & SMS Validation credits:</strong> Transactional</span>
                  <span className="font-mono font-bold text-white">₹300 (70 regs)</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-slate-300 space-y-2">
                <div className="font-bold text-white text-sm">CAC Math & Unit Economics:</div>
                <p>
                  Total Spend: <strong className="font-mono text-emerald-400">₹2,000</strong>
                </p>
                <p>
                  Total Acquired Students: <strong className="font-mono text-emerald-400">500</strong>
                </p>
                <p>
                  Blended Cost Per Registration: <strong className="font-mono text-emerald-400">₹4.00</strong>
                </p>
                <p className="pt-2 text-slate-400">
                  EdTech benchmark CAC for student registrations is typically ₹25–₹50. By leveraging peer referral mechanics and campus tech club partnerships, we drive CAC down to ₹4.00.
                </p>
              </div>
            </div>
          </div>

          {/* SLIDE 4: 7-DAY LAUNCH & MEASUREMENT TIMELINE */}
          <div className="p-6 md:p-8 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-pink-500/20 text-pink-400 font-mono font-bold text-xs flex items-center justify-center">
                4
              </span>
              <span className="text-xs uppercase font-bold tracking-wider text-pink-400">
                Slide 4: 7-Day Campaign Execution Sprint
              </span>
            </div>
            <h4 className="text-2xl font-black text-white">
              Idea → Build → Launch → Measure → Learn → Scale
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 pt-2 text-xs">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="font-bold text-indigo-400 mb-1">Days 1–2: Launch & Seed</div>
                <p className="text-slate-400">
                  Deploy landing page with referral tracking. Seed 10 campus ambassadors to generate first 100 registrations.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="font-bold text-purple-400 mb-1">Days 3–4: A/B Split Test</div>
                <p className="text-slate-400">
                  Measure Variant A ("60 Mins") vs Variant B ("Interview Project"). Declare winner and route 100% traffic to Variant B.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="font-bold text-pink-400 mb-1">Days 5–6: Viral Referral Push</div>
                <p className="text-slate-400">
                  Trigger WhatsApp nudge to registrants: "Invite 2 peers to get workshop starter repo". Referral registrations surge to 120.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="font-bold text-emerald-400 mb-1">Day 7: Final Sprint & Retrospective</div>
                <p className="text-slate-400">
                  Urgency blast ("Only 48 hours left"). Cross 500 registration target at ₹4.00 CAC. Run AI Growth Insights.
                </p>
              </div>
            </div>
          </div>

          {/* SLIDE 5: LONG-TERM SCALE & VIRALITY */}
          <div className="p-6 md:p-8 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 font-mono font-bold text-xs flex items-center justify-center">
                5
              </span>
              <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
                Slide 5: Post-Workshop Scalability & Conversion Loop
              </span>
            </div>
            <h4 className="text-2xl font-black text-white">
              Turning 500 Attendees into Full-Funnel NxtWave Enrollees
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="font-bold text-white text-sm mb-1">In-Workshop Aha Moment</div>
                <p className="text-slate-300">
                  At minute 45, students run their AI app on a public URL. The sudden realization that they can build software builds immense trust with NxtWave.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="font-bold text-white text-sm mb-1">Automated Project Review</div>
                <p className="text-slate-300">
                  Students submit their GitHub link at the end for automated AI code evaluation and personalized placement roadmap recommendations.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                <div className="font-bold text-white text-sm mb-1">Repeatable Campus Playbook</div>
                <p className="text-slate-300">
                  Package this exact 7-day playbook into an automated monthly cycle targeting 50 colleges and 5,000+ registrations per month.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* REFLECTION & AI LEARNING NOTES */
        <div className="space-y-6">
          {/* Question 1 */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Evaluation Question 1
            </div>
            <h4 className="text-lg font-bold text-white">
              What changed between your first idea and final solution?
            </h4>
            <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
              <p>
                <strong>Initial Idea:</strong> Build a standard event landing page with a Google Form / email capture and rely heavily on general LinkedIn and Instagram ads.
              </p>
              <p>
                <strong>What Changed:</strong> Realizing the tight constraint (₹2,000 budget for 500 registrations = ₹4.00 per registration), paid ads on LinkedIn/Instagram would exhaust the budget within 40 clicks without hitting even 50 registrations.
              </p>
              <p>
                <strong>Final Solution:</strong> Shifted to a <strong>product-led growth engine</strong> with peer referral mechanics (<code className="text-pink-300">?ref=CODE</code>) and campus club micro-incentives. Built an integrated growth intelligence dashboard featuring real-time funnel drop-off analysis, an automated A/B test winner calculator, and deterministic AI insights so the growth team can iterate live.
              </p>
            </div>
          </div>

          {/* Question 2 */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-purple-400">
              Evaluation Question 2
            </div>
            <h4 className="text-lg font-bold text-white">
              If you had another 24 hours, what would you improve?
            </h4>
            <div className="text-xs text-slate-300 space-y-2 leading-relaxed">
              <p>
                1. <strong>Direct WhatsApp Chatbot Flow:</strong> Build an interactive WhatsApp webhook (via Twilio/Gupshup) enabling students to register with a single message ("Hi NXTWAVE"), reducing mobile drop-off by removing the web form step.
              </p>
              <p>
                2. <strong>AI Automated GitHub Project Reviewer:</strong> Add an interactive module where students paste their GitHub repo link after the workshop and an AI analyzer checks their commit history, code structure, and suggests placement resume bullet points.
              </p>
              <p>
                3. <strong>Predictive Churn & Show-up Predictor:</strong> Train a regression model on registration timestamp, channel, and college to predict which registrants are at risk of missing the live session, triggering targeted WhatsApp reminders.
              </p>
            </div>
          </div>

          {/* Question 3: What did AI suggest that you rejected and why */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Evaluation Question 3 (Crucial Judgment Test)
            </div>
            <h4 className="text-lg font-bold text-white">
              What did AI suggest to you while building this that you deliberately rejected and why?
            </h4>
            <div className="space-y-4 pt-2 text-xs text-slate-300">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="font-bold text-rose-300">
                  Example 1: AI Suggested Running Meta / Instagram Ads
                </div>
                <div className="text-slate-400 mt-1">
                  <strong>AI Suggestion:</strong> "Spend ₹1,500 on Instagram Carousel ads targeting 21-23 year olds interested in Python and AI."
                </div>
                <div className="text-slate-200 mt-1">
                  <strong>My Decision:</strong> <span className="text-rose-400 font-bold">REJECTED</span>.
                </div>
                <div className="text-slate-300 mt-1">
                  <strong>Why:</strong> In India, Instagram ad CPC for engineering demographics is around ₹10–₹15. With ₹1,500, we would get only 100–150 clicks. Even at an optimistic 20% landing page conversion rate, that yields only 20–30 registrations at ₹50–₹75 CAC—completely blowing the ₹4.00 budget constraint. Peer WhatsApp distribution and college clubs deliver 10x higher volume at zero ad cost.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="font-bold text-rose-300">
                  Example 2: AI Suggested Giving "Guaranteed Placement Certificates"
                </div>
                <div className="text-slate-400 mt-1">
                  <strong>AI Suggestion:</strong> "Promise free verified certificates and guaranteed interview shortlists on the landing page to increase conversion rate to 40%."
                </div>
                <div className="text-slate-200 mt-1">
                  <strong>My Decision:</strong> <span className="text-rose-400 font-bold">REJECTED</span>.
                </div>
                <div className="text-slate-300 mt-1">
                  <strong>Why:</strong> The challenge explicitly forbids unsupported claims about certificates or placement guarantees. More importantly, deceptive marketing attracts low-intent freebie seekers who don't show up. Positioning the real, tangible benefit—building a live portfolio project in 60 minutes—attracts serious engineering students who convert into long-term NxtWave CCBP learners.
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="font-bold text-rose-300">
                  Example 3: AI Suggested 15-Field Detailed Student Intake Form
                </div>
                <div className="text-slate-400 mt-1">
                  <strong>AI Suggestion:</strong> "Collect 10th marks, 12th marks, current CGPA, backlog count, target companies, and resume PDF on the registration form."
                </div>
                <div className="text-slate-200 mt-1">
                  <strong>My Decision:</strong> <span className="text-rose-400 font-bold">REJECTED</span>.
                </div>
                <div className="text-slate-300 mt-1">
                  <strong>Why:</strong> Heavy forms cause 70%+ drop-off on mobile devices. For a top-of-funnel free workshop, registration friction must be minimal (Name, Email, Phone, College, Branch, Grad Year). Deeper diagnostic profile data can be collected post-registration or during the workshop project submission.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
