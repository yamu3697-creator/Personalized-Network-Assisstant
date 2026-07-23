import React from 'react';
import { History, Calendar, Clock, MessageSquare, Tag, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import { HistoryItem } from '../types';

interface HistoryTimelineProps {
  history: HistoryItem[];
  onSelectHistory?: (item: HistoryItem) => void;
}

export const HistoryTimeline: React.FC<HistoryTimelineProps> = ({ history, onSelectHistory }) => {
  const [expandedId, setExpandedId] = React.useState<string | null>(history[0]?.id || null);
  const [copiedText, setCopiedText] = React.useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const copyStarter = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  if (!history || history.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-8 text-center border border-white/10 space-y-3">
        <History className="w-8 h-8 text-[#B8B8B8] mx-auto" />
        <h3 className="text-lg font-bold text-white">No History Recorded</h3>
        <p className="text-xs text-[#B8B8B8]">Your generated networking conversations will appear here in chronological timeline.</p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 border border-white/10 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED]/30 flex items-center justify-center text-[#A855F7]">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Generation History Timeline</h2>
            <p className="text-xs text-[#B8B8B8]">Latest sessions, events, topics, and saved starters</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/80">
          Section 6
        </span>
      </div>

      {/* Timeline List */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
        {history.map((item, idx) => {
          const isExpanded = expandedId === item.id;
          const formattedDate = new Date(item.timestamp).toLocaleString(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short'
          });

          return (
            <div key={item.id} className="relative group">
              {/* Timeline dot */}
              <div className={`
                absolute -left-[23px] top-1.5 w-3.5 h-3.5 rounded-full border-2 transition-all
                ${idx === 0 
                  ? 'bg-[#7C3AED] border-white shadow-md shadow-[#7C3AED]/50 scale-110' 
                  : 'bg-[#171A23] border-white/30 group-hover:border-[#7C3AED]'
                }
              `} />

              {/* Card item */}
              <div className="glass-panel rounded-xl p-5 border border-white/10 space-y-3 transition-all hover:border-white/20">
                <div 
                  className="flex items-center justify-between cursor-pointer select-none"
                  onClick={() => toggleExpand(item.id)}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-[#B8B8B8]">
                      <Calendar className="w-3.5 h-3.5 text-[#A855F7]" />
                      <span>{formattedDate}</span>
                      <span className="w-1 h-1 rounded-full bg-white/30" />
                      <span className="text-white/80 font-mono text-[11px]">{item.starters.length} Starters</span>
                    </div>

                    <h4 className="text-base font-semibold text-white line-clamp-1">
                      {item.eventDescription}
                    </h4>
                  </div>

                  <div className="flex items-center gap-2">
                    {onSelectHistory && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectHistory(item);
                        }}
                        className="px-3 py-1 rounded-lg bg-[#7C3AED]/20 border border-[#7C3AED]/40 text-xs font-medium text-white hover:bg-[#7C3AED] transition-all"
                      >
                        Load Session
                      </button>
                    )}
                    <button className="p-1 rounded-lg hover:bg-white/10 text-[#B8B8B8] hover:text-white transition-all">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Topics & Interests tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.interests.map((int) => (
                    <span key={int} className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-white/5 border border-white/10 text-[#B8B8B8]">
                      {int}
                    </span>
                  ))}
                  {item.topics.slice(0, 3).map((top) => (
                    <span key={top} className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#7C3AED]/20 border border-[#7C3AED]/30 text-[#A855F7]">
                      #{top}
                    </span>
                  ))}
                </div>

                {/* Expanded Starters */}
                {isExpanded && (
                  <div className="pt-3 border-t border-white/10 space-y-2">
                    <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-[#A855F7]" />
                      <span>Generated Starters</span>
                    </div>

                    <div className="space-y-2">
                      {item.starters.map((st) => (
                        <div key={st.id} className="p-3 rounded-lg bg-black/40 border border-white/5 flex items-start justify-between gap-3 text-xs">
                          <p className="text-white/90 leading-relaxed font-normal">
                            "{st.text}"
                          </p>
                          <button
                            onClick={() => copyStarter(st.text)}
                            className="p-1 rounded hover:bg-white/10 text-[#B8B8B8] hover:text-white shrink-0"
                            title="Copy text"
                          >
                            {copiedText === st.text ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
