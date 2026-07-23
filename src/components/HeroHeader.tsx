import React from 'react';
import { Sparkles, Bot, ShieldCheck } from 'lucide-react';

export const HeroHeader: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl glass-panel p-6 md:p-8 border border-white/10 mb-8 bg-gradient-to-r from-purple-900/20 via-[#171A23] to-indigo-900/20">
      {/* Decorative Glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#7C3AED]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#A855F7] font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Powered SaaS Platform</span>
            <span className="w-1 h-1 rounded-full bg-white/40" />
            <span className="text-white/80">v2.4.0</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            👋 Personalized <span className="gradient-text">Networking Assistant</span>
          </h1>

          <p className="text-base md:text-lg text-[#B8B8B8] font-normal leading-relaxed">
            Generate intelligent networking conversations, extract themes, and verify industry claims powered by AI.
          </p>
        </div>

        <div className="flex flex-wrap md:flex-col gap-2.5 shrink-0">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-medium text-white/90">
            <Bot className="w-4 h-4 text-[#7C3AED]" />
            <span>Gemini 3.6 & Multi-Model Engine</span>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-medium text-white/90">
            <ShieldCheck className="w-4 h-4 text-[#22C55E]" />
            <span>Real-time Wiki Fact Verification</span>
          </div>
        </div>
      </div>
    </div>
  );
};
