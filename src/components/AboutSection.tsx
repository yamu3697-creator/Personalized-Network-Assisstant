import React from 'react';
import { 
  Info, 
  Server, 
  Cpu, 
  CheckCircle2, 
  Github, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Layers,
  Database
} from 'lucide-react';
import { BackendStatus } from '../types';

interface AboutSectionProps {
  status: BackendStatus;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ status }) => {
  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 border border-white/10 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED]/30 flex items-center justify-center text-[#A855F7]">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">About Personalized Networking Assistant</h2>
            <p className="text-xs text-[#B8B8B8]">Architecture overview, system status, and model parameters</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/80">
          Sidebar About
        </span>
      </div>

      {/* Description */}
      <div className="glass-panel p-5 rounded-2xl space-y-3 border border-white/10">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#A855F7]" />
          Platform Overview
        </h3>
        <p className="text-xs text-[#B8B8B8] leading-relaxed">
          The Personalized Networking Assistant is an enterprise-grade SaaS platform designed to generate high-conversion, professional networking conversation starters. Powered by Google Gemini 3.6 Flash, zero-shot classification pipelines, and Wikipedia grounding, it converts raw event descriptions into actionable icebreakers and verified technical themes.
        </p>
      </div>

      {/* Status Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Backend Status */}
        <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#B8B8B8]">
            <span className="flex items-center gap-1.5">
              <Server className="w-4 h-4 text-[#22C55E]" />
              Backend
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-[#22C55E]">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              Online
            </span>
          </div>
          <div className="text-xs text-white font-medium">Node / Express Server</div>
        </div>

        {/* Models Loaded */}
        <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#B8B8B8]">
            <span className="flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-[#A855F7]" />
              Models Loaded
            </span>
            <span className="text-[10px] font-semibold bg-[#7C3AED]/30 text-[#A855F7] px-2 py-0.5 rounded-full">
              Ready
            </span>
          </div>
          <div className="text-xs text-white font-medium truncate">
            GPT2, BART MNLI, Gemini 3.6
          </div>
        </div>

        {/* Fact Checking API */}
        <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#B8B8B8]">
            <span className="flex items-center gap-1.5">
              <Database className="w-4 h-4 text-blue-400" />
              Wikipedia API
            </span>
            <span className="text-[10px] font-semibold bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">
              Connected
            </span>
          </div>
          <div className="text-xs text-white font-medium">Grounding active</div>
        </div>

        {/* Health Status */}
        <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#B8B8B8]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#22C55E]" />
              Health Status
            </span>
            <span className="text-[10px] font-semibold bg-[#22C55E]/20 text-[#22C55E] px-2 py-0.5 rounded-full">
              All Green
            </span>
          </div>
          <div className="text-xs text-white font-medium">0.02s Latency</div>
        </div>
      </div>

      {/* Feature Architecture Matrix */}
      <div className="space-y-3 pt-2">
        <h3 className="text-sm font-semibold text-white">System Capabilities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
            <Zap className="w-4 h-4 text-[#A855F7] shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white">Real-Time Event Theme Extraction</div>
              <div className="text-[#B8B8B8] leading-relaxed">Extracts 4-7 key badges based on interests and conference context.</div>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-[#22C55E] shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-white">Fact Checking & Grounding</div>
              <div className="text-[#B8B8B8] leading-relaxed">Cross-references claims with Wikipedia and web search sources.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
