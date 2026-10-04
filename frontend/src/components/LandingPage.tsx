import React, { useState } from 'react';
import { 
  Sparkles, 
  Clock, 
  Code2, 
  Terminal, 
  Users, 
  CheckCircle, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Laptop, 
  Cpu, 
  Layers, 
  FileCode, 
  Share2, 
  HelpCircle 
} from 'lucide-react';

interface Props {
  onOpenRegister: () => void;
  activeVariant: 'Variant A' | 'Variant B';
  referralCode?: string;
}

export const LandingPage: React.FC<Props> = ({
  onOpenRegister,
  activeVariant,
  referralCode,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Is this workshop genuinely 100% free?",
      a: "Yes, this workshop is completely free. There are no credit card details required and no hidden charges. All live code files and starter templates are freely provided to registered attendees.",
    },
    {
      q: "I have only basic Python / JavaScript knowledge. Can I build this?",
      a: "Absolutely. The workshop is designed to be beginner-friendly. We walk through every step from mental model to API calls, so you can follow along easily even if you have never built an AI project before.",
    },
    {
      q: "How will this help my engineering placement or resume?",
      a: "Tech recruiters increasingly expect engineering graduates to demonstrate practical AI literacy beyond textbook algorithms. You will deploy a working AI application with a live URL and clean GitHub repository that you can showcase during technical interviews.",
    },
    {
      q: "What prerequisites or tools do I need installed before joining?",
      a: "All you need is a laptop, an internet connection, a modern web browser, and a free GitHub account. We provide interactive cloud environments so you do not have to struggle with local environment setup.",
    },
    {
      q: "Will the session recording be provided if I miss a part?",
      a: "Yes, access to the workshop recording, GitHub repository, and architecture walkthrough will be shared with all registered students via email and WhatsApp.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Simulation Banner Notice */}
      <div className="bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-slate-900 border-b border-indigo-500/20 py-2 px-4 text-center">
        <p className="text-xs text-indigo-300 font-medium flex items-center justify-center gap-1.5 flex-wrap">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>NxtWave Growth Challenge Submission • Simulated Cohort Campaign for 500 Final-Year Students</span>
          {referralCode && (
            <span className="ml-2 px-2 py-0.5 rounded-full bg-indigo-500/30 text-white font-mono text-[11px] font-bold">
              Active Referral: {referralCode}
            </span>
          )}
        </p>
      </div>

      {/* SECTION 1: HERO */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
        {/* Glow Background Elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Audience Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-xs font-semibold mb-6">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Exclusively for Final-Year Engineering Students (Class of 2025)</span>
          </div>

          {/* Headline (A/B Test Dynamic) */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.15] text-white max-w-4xl mx-auto">
            {activeVariant === 'Variant A' ? (
              <>
                Build Your First <span className="gradient-text">AI Project</span> in{' '}
                <span className="text-indigo-400">60 Minutes</span>
              </>
            ) : (
              <>
                Final-Year Students: Build an{' '}
                <span className="gradient-text">AI Project</span> Before Your Next Interview
              </>
            )}
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            A free, live hands-on masterclass designed for engineering students. Turn raw code into a real, deployed AI application you can proudly add to your portfolio and discuss with tech interviewers.
          </p>

          {/* Value Props Row */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-slate-300">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>60-Minute Fast-Paced Format</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <span>100% Beginner-Friendly Code</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <Laptop className="w-4 h-4 text-sky-400" />
              <span>Zero Local Setup Required</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-purple-400" />
              <span>Free Live Masterclass</span>
            </div>
          </div>

          {/* Primary CTA */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenRegister}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-[0.99] transition cursor-pointer flex items-center justify-center gap-2.5"
            >
              <span>Register Free for Workshop</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Cohort filling fast • Limited live slots</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHY ATTEND? */}
      <section className="py-16 bg-slate-950/60 border-y border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              The Engineering Problem
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-2">
              Why Final-Year Students Need More Than Just Textbook Theory
            </h2>
            <p className="text-sm text-slate-400 mt-3">
              Campus placement rounds are increasingly filtering out candidates whose resumes only have basic CRUD apps or clone tutorials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl glass-panel border border-slate-800 hover:border-indigo-500/40 transition">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-4">
                <FileCode className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Resume Standout</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Replace generic todo lists and banking apps with an actual applied AI project that recruiters can test live from your resume link.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-slate-800 hover:border-purple-500/40 transition">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center mb-4">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Real AI API Architecture</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Understand how modern AI applications connect frontends to Large Language Model endpoints, prompt templates, and streaming responses.
              </p>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-slate-800 hover:border-emerald-500/40 transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                <Share2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Interview Confidence</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Learn how to clearly explain system architecture, token latency, prompt engineering, and deployment trade-offs in technical interviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHAT YOU WILL BUILD */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/25 mb-4">
                <Code2 className="w-3.5 h-3.5" />
                <span>Hands-on Project Blueprint</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-snug">
                The Project: <br />
                <span className="gradient-text">Smart Tech Resume & Job Matcher</span>
              </h2>
              <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                During this live 60-minute session, you will write code to connect a clean web interface to an AI engine that scans engineering job descriptions, parses resume skills, and generates customized match analysis.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                  <span className="text-xs text-slate-300">
                    <strong>LLM Integration:</strong> Connect to state-of-the-art AI API with secure prompt engineering.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                  <span className="text-xs text-slate-300">
                    <strong>Real-Time Processing:</strong> Parse user resume input and deliver structured skill match scores.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                  <span className="text-xs text-slate-300">
                    <strong>Free GitHub Repo & Deployment:</strong> Commit your project and deploy it to a live public URL.
                  </span>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={onOpenRegister}
                  className="px-6 py-3 rounded-xl font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/20 cursor-pointer"
                >
                  Reserve Your Seat & Starter Kit →
                </button>
              </div>
            </div>

            {/* Interactive Terminal / Code Mockup */}
            <div className="rounded-2xl glass-panel-glow border border-slate-700/80 p-5 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400 font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 text-slate-300 font-medium">ai_project_60m.py</span>
                </div>
                <span>Python 3.12 + FastAPI + AI API</span>
              </div>

              <div className="mt-4 font-mono text-xs text-slate-300 space-y-2 leading-relaxed bg-slate-950/80 p-4 rounded-xl border border-slate-800/80">
                <p className="text-slate-500"># Step 1: Initialize modern AI client</p>
                <p className="text-purple-400">from <span className="text-indigo-300">fastapi</span> import FastAPI, Request</p>
                <p className="text-purple-400">from <span className="text-indigo-300">ai_engine</span> import analyze_engineering_match</p>
                <p className="text-emerald-400">app = FastAPI(title="AI Resume Matcher")</p>
                <p className="text-slate-500 pt-1"># Step 2: Live evaluation endpoint</p>
                <p className="text-indigo-400">@app.post("/api/analyze")</p>
                <p className="text-blue-300">async def evaluate(resume: str, role: str):</p>
                <p className="pl-4 text-emerald-300">result = await analyze_engineering_match(resume, role)</p>
                <p className="pl-4 text-sky-300">return &#123;"match_score": result.score, "project_url": "github.com/..."&#125;</p>
              </div>

              <div className="mt-4 p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-between text-xs">
                <span className="text-indigo-300 font-medium">Outcome: Live project deployed in 60 mins</span>
                <span className="font-mono text-indigo-400 font-bold">100% Free</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHO SHOULD ATTEND */}
      <section className="py-16 bg-slate-950/60 border-y border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Target Audience
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-2">
            Who Is This Workshop Built For?
          </h2>
          <p className="text-sm text-slate-400 mt-3 max-w-xl mx-auto">
            Curated specifically for engineering undergraduates navigating final-year project submissions and campus hiring.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="font-bold text-white text-sm">CSE & IT Final Years</div>
              <p className="text-xs text-slate-400 mt-1.5">
                Students wanting to add an applied AI project to their technical resume before placement drives.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="font-bold text-white text-sm">ECE & EEE Students</div>
              <p className="text-xs text-slate-400 mt-1.5">
                Circuit branch students aiming to transition into software and AI roles with proof of work.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="font-bold text-white text-sm">AI/DS Undergrads</div>
              <p className="text-xs text-slate-400 mt-1.5">
                Students wanting practical hands-on experience building end-to-end full-stack AI applications.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="font-bold text-white text-sm">College Club Leads</div>
              <p className="text-xs text-slate-400 mt-1.5">
                Tech club members and campus ambassadors looking to learn with peers and share insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: WORKSHOP FLOW */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Minute-by-Minute Breakdown
            </span>
            <h2 className="text-3xl font-extrabold text-white mt-2">
              The 60-Minute Hands-On Flow
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Every minute is structured for maximum learning, live code, and zero wasted time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 relative">
              <div className="text-2xl font-black text-indigo-400 mb-2 font-mono">00–10m</div>
              <div className="text-sm font-bold text-white mb-1">Architecture & Mental Model</div>
              <p className="text-xs text-slate-400">
                Understanding how AI models, tokens, system prompts, and REST APIs connect in production.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 relative">
              <div className="text-2xl font-black text-purple-400 mb-2 font-mono">10–30m</div>
              <div className="text-sm font-bold text-white mb-1">Connecting the AI API</div>
              <p className="text-xs text-slate-400">
                Writing the core backend logic, structuring prompt engineering, and parsing AI responses safely.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 relative">
              <div className="text-2xl font-black text-pink-400 mb-2 font-mono">30–50m</div>
              <div className="text-sm font-bold text-white mb-1">Building the Interface</div>
              <p className="text-xs text-slate-400">
                Creating a clean, modern user interface to interact with your AI project in real-time.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 relative">
              <div className="text-2xl font-black text-emerald-400 mb-2 font-mono">50–60m</div>
              <div className="text-sm font-bold text-white mb-1">Deploy & Resume Add</div>
              <p className="text-xs text-slate-400">
                Pushing code to GitHub, deploying to a public URL, and crafting the exact resume bullet points.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: REGISTRATION CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl glass-panel-glow border border-indigo-500/40 p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-3xl pointer-events-none" />
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Ready to Build Your First AI Project?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
              Join fellow final-year engineering students for 60 minutes of intensive, hands-on building. 100% free live session.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenRegister}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-base text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 shadow-xl shadow-indigo-600/30 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Register Free Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <p className="mt-4 text-xs text-slate-400">
              Instant registration • Unique referral link generated immediately
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7: FAQ */}
      <section className="py-16 bg-slate-950/60 border-t border-slate-800/80">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Got Questions?
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-slate-900/70 border border-slate-800 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between text-sm font-semibold text-white hover:text-indigo-300 transition cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="w-4 h-4 text-indigo-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: FOOTER */}
      <footer className="py-10 border-t border-slate-800/80 bg-slate-950 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-slate-400">AI Workshop Growth Engine</span>
            <span className="mx-2">•</span>
            <span>NxtWave Growth Intern Assignment Simulation</span>
          </div>
          <p className="text-center sm:text-right">
            Simulation Project for NxtWave Growth Challenge • Target: 500 Students • ₹2,000 Budget
          </p>
        </div>
      </footer>
    </div>
  );
};
