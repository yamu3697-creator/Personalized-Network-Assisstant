import React, { useState } from 'react';
import { 
  SearchCheck, 
  ExternalLink, 
  ShieldCheck, 
  AlertTriangle, 
  BookOpen, 
  Loader2, 
  Sparkles,
  Search,
  Globe
} from 'lucide-react';
import { FactCheckResult } from '../types';

interface FactCheckerProps {
  onCheck: (query: string) => Promise<FactCheckResult | null>;
  initialResult?: FactCheckResult | null;
}

export const FactChecker: React.FC<FactCheckerProps> = ({ onCheck, initialResult }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<FactCheckResult | null>(initialResult || null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    const res = await onCheck(query);
    setResult(res);
    setIsLoading(false);
  };

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 border border-white/10 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED]/30 flex items-center justify-center text-[#A855F7]">
            <SearchCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              Wikipedia & AI Fact Checker
              <Sparkles className="w-4 h-4 text-[#A855F7]" />
            </h2>
            <p className="text-xs text-[#B8B8B8]">Verify technical claims, frameworks, or facts before speaking</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/80">
          Section 5
        </span>
      </div>

      {/* Input Box & Check Button */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#B8B8B8] absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter tech claim or topic (e.g., 'BART MNLI model architecture' or 'Transformer attention mechanisms')..."
            className="glass-input w-full pl-10 pr-4 py-3 rounded-xl text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !query.trim()}
          className="gradient-button px-6 py-3 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 disabled:opacity-50 shrink-0"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Verifying...</span>
            </>
          ) : (
            <>
              <BookOpen className="w-4 h-4" />
              <span>Fact Check</span>
            </>
          )}
        </button>
      </form>

      {/* Wikipedia Result Card */}
      {result && (
        <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              {result.verified ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/40">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Fact
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/40">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Unverified / Needs Context
                </span>
              )}
              <span className="text-xs text-[#B8B8B8] font-mono">
                Query: "{result.query}"
              </span>
            </div>

            <div className="text-xs text-[#B8B8B8] flex items-center gap-1">
              <span>Confidence:</span>
              <span className="font-semibold text-white">{(result.confidenceScore * 100).toFixed(0)}%</span>
            </div>
          </div>

          <p className="text-sm text-white/90 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/5">
            {result.summary}
          </p>

          {/* Sources and Link */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs text-[#B8B8B8]">
              <Globe className="w-3.5 h-3.5 text-[#A855F7]" />
              <span>Grounding Sources ({result.sources.length})</span>
            </div>

            <a
              href={result.wikiUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-white hover:bg-white/10 hover:border-[#7C3AED]/50 transition-all"
            >
              <span>Wikipedia Result</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#A855F7]" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
