import React from 'react';
import { MessageSquareHeart, ThumbsUp, ThumbsDown, Clock, ShieldAlert } from 'lucide-react';
import { FeedbackItem } from '../types';

interface FeedbackTableProps {
  feedback: FeedbackItem[];
}

export const FeedbackTable: React.FC<FeedbackTableProps> = ({ feedback }) => {
  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 border border-white/10 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED]/30 flex items-center justify-center text-[#A855F7]">
            <MessageSquareHeart className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">User Feedback Audit Log</h2>
            <p className="text-xs text-[#B8B8B8]">Ratings and sentiment telemetry on conversation starters</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/80">
          Section 7
        </span>
      </div>

      {/* Table */}
      {feedback.length === 0 ? (
        <div className="p-8 text-center border border-white/10 rounded-xl bg-black/20 space-y-2">
          <MessageSquareHeart className="w-8 h-8 text-[#B8B8B8] mx-auto opacity-50" />
          <p className="text-sm font-medium text-white">No Feedback Recorded Yet</p>
          <p className="text-xs text-[#B8B8B8]">Rate conversation starters with Like or Dislike to populate this log.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-black/50 text-[#B8B8B8] uppercase tracking-wider font-semibold border-b border-white/10">
                <th className="p-3.5">Sentiment</th>
                <th className="p-3.5">Conversation Starter</th>
                <th className="p-3.5">Event Context</th>
                <th className="p-3.5">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-white/90">
              {feedback.map((item) => {
                const formattedTime = new Date(item.timestamp).toLocaleString(undefined, {
                  dateStyle: 'short',
                  timeStyle: 'medium'
                });

                return (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Sentiment Badge */}
                    <td className="p-3.5 whitespace-nowrap">
                      {item.sentiment === 'like' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/30">
                          <ThumbsUp className="w-3 h-3" />
                          Liked
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/30">
                          <ThumbsDown className="w-3 h-3" />
                          Disliked
                        </span>
                      )}
                    </td>

                    {/* Starter Text */}
                    <td className="p-3.5 max-w-md font-medium leading-relaxed">
                      "{item.starterText}"
                    </td>

                    {/* Event Context */}
                    <td className="p-3.5 text-[#B8B8B8] max-w-xs truncate">
                      {item.eventContext || 'Networking Event'}
                    </td>

                    {/* Timestamp */}
                    <td className="p-3.5 whitespace-nowrap text-[#B8B8B8] font-mono text-[11px]">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#A855F7]" />
                        {formattedTime}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
