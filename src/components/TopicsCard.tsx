import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Tag, Sparkles, Layers } from 'lucide-react';

interface TopicsCardProps {
  topics: string[];
  summary?: string;
  isLoading?: boolean;
}

export const TopicsCard: React.FC<TopicsCardProps> = ({ topics, summary, isLoading }) => {
  if (topics.length === 0 && !isLoading) {
    return null;
  }

  return (
    <div className="glass-card rounded-2xl p-6 border border-white/10 shadow-xl space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#7C3AED]/20 border border-[#7C3AED]/30 flex items-center justify-center text-[#A855F7]">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              Extracted Themes & Topics
              <Sparkles className="w-3.5 h-3.5 text-[#A855F7]" />
            </h3>
            <p className="text-xs text-[#B8B8B8]">AI identified discussion vectors for networking</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/80">
          Section 3
        </span>
      </div>

      {summary && (
        <p className="text-xs text-[#B8B8B8] bg-white/[0.02] p-3 rounded-xl border border-white/5">
          {summary}
        </p>
      )}

      {/* Badges Container */}
      <div className="flex flex-wrap gap-2.5 pt-1">
        <AnimatePresence>
          {topics.map((topic, index) => (
            <motion.div
              key={topic + index}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
              className="group relative"
            >
              <div className="
                inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold
                bg-gradient-to-r from-purple-900/40 via-[#171A23] to-indigo-900/40
                border border-[#7C3AED]/40 text-white shadow-md
                hover:border-[#8B5CF6] hover:scale-105 transition-all duration-200 cursor-default
              ">
                <Tag className="w-3.5 h-3.5 text-[#A855F7]" />
                <span>{topic}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
