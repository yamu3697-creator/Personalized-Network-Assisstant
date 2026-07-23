import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  Copy, 
  Check, 
  RefreshCw, 
  ThumbsUp, 
  ThumbsDown, 
  Lightbulb, 
  Share2,
  Sparkles
} from 'lucide-react';
import { ConversationStarter } from '../types';

interface ConversationStartersProps {
  starters: ConversationStarter[];
  onFeedback: (starterId: string, starterText: string, sentiment: 'like' | 'dislike') => void;
  onRegenerateSingle?: (starterId: string) => void;
  onRegenerateAll?: () => void;
  isLoading?: boolean;
}

export const ConversationStarters: React.FC<ConversationStartersProps> = ({
  starters,
  onFeedback,
  onRegenerateSingle,
  onRegenerateAll,
  isLoading
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (starters.length === 0 && !isLoading) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#7C3AED]/20 border border-[#7C3AED]/30 flex items-center justify-center text-[#A855F7]">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              Generated Conversation Starters
              <Sparkles className="w-4 h-4 text-[#A855F7]" />
            </h3>
            <p className="text-xs text-[#B8B8B8]">Ready-to-use high impact networking icebreakers</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onRegenerateAll && (
            <button
              onClick={onRegenerateAll}
              disabled={isLoading}
              className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-[#B8B8B8] hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Regenerate All</span>
            </button>
          )}
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/80">
            Section 4
          </span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence>
          {starters.map((starter, index) => {
            const isCopied = copiedId === starter.id;
            return (
              <motion.div
                key={starter.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col justify-between space-y-4 relative group"
              >
                {/* Top badges */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#7C3AED]/20 border border-[#7C3AED]/30 text-[#A855F7]">
                      {starter.category}
                    </span>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#B8B8B8]">
                      {starter.icebreakerType}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#B8B8B8]/60">#{index + 1}</span>
                </div>

                {/* Main Starter Text */}
                <p className="text-sm font-medium text-white leading-relaxed pt-1">
                  "{starter.text}"
                </p>

                {/* Rationale disclosure */}
                {starter.rationale && (
                  <div className="flex items-start gap-2 text-xs text-[#B8B8B8] bg-black/30 p-2.5 rounded-xl border border-white/5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span className="leading-tight">{starter.rationale}</span>
                  </div>
                )}

                {/* Card Action Toolbar */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {/* Copy button */}
                    <button
                      onClick={() => handleCopy(starter.id, starter.text)}
                      className={`
                        px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 border
                        ${isCopied 
                          ? 'bg-[#22C55E]/20 border-[#22C55E]/40 text-[#22C55E]' 
                          : 'bg-white/5 border-white/10 text-[#B8B8B8] hover:text-white hover:bg-white/10'
                        }
                      `}
                      title="Copy conversation starter"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                    </button>

                    {/* Regenerate single button */}
                    {onRegenerateSingle && (
                      <button
                        onClick={() => onRegenerateSingle(starter.id)}
                        className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-[#B8B8B8] hover:text-white hover:bg-white/10 transition-all"
                        title="Regenerate this item"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Like / Dislike Feedback buttons */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onFeedback(starter.id, starter.text, 'like')}
                      className={`
                        p-1.5 rounded-lg transition-all border
                        ${starter.liked === true 
                          ? 'bg-[#22C55E]/20 border-[#22C55E]/40 text-[#22C55E]' 
                          : 'bg-white/5 border-white/10 text-[#B8B8B8] hover:text-[#22C55E] hover:bg-white/10'
                        }
                      `}
                      title="Like starter"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onFeedback(starter.id, starter.text, 'dislike')}
                      className={`
                        p-1.5 rounded-lg transition-all border
                        ${starter.liked === false 
                          ? 'bg-[#EF4444]/20 border-[#EF4444]/40 text-[#EF4444]' 
                          : 'bg-white/5 border-white/10 text-[#B8B8B8] hover:text-[#EF4444] hover:bg-white/10'
                        }
                      `}
                      title="Dislike starter"
                    >
                      <ThumbsDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
