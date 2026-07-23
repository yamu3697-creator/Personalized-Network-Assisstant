import React, { useState } from 'react';
import { Briefcase, FileText, Plus, X, Loader2, Sparkles, Wand2 } from 'lucide-react';

interface EventDetailsCardProps {
  interests: string[];
  setInterests: (interests: string[]) => void;
  eventDescription: string;
  setEventDescription: (desc: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const PRESET_INTERESTS = [
  'AI',
  'Machine Learning',
  'Cloud',
  'Cyber Security',
  'Business',
  'Fintech',
  'DevOps',
  'Web3',
  'Data Engineering',
  'Product Strategy'
];

export const EventDetailsCard: React.FC<EventDetailsCardProps> = ({
  interests,
  setInterests,
  eventDescription,
  setEventDescription,
  onGenerate,
  isLoading
}) => {
  const [customInterest, setCustomInterest] = useState('');
  const maxChars = 1000;

  const toggleInterest = (tag: string) => {
    if (interests.includes(tag)) {
      setInterests(interests.filter((i) => i !== tag));
    } else {
      setInterests([...interests, tag]);
    }
  };

  const addCustomTag = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customInterest.trim();
    if (trimmed && !interests.includes(trimmed)) {
      setInterests([...interests, trimmed]);
      setCustomInterest('');
    }
  };

  const removeTag = (tag: string) => {
    setInterests(interests.filter((i) => i !== tag));
  };

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 space-y-6 border border-white/10 shadow-xl relative overflow-hidden">
      {/* Card Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED]/30 flex items-center justify-center text-[#A855F7]">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Event Details & Parameters</h2>
            <p className="text-xs text-[#B8B8B8]">Specify professional domain & networking context</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/80">
          Section 2
        </span>
      </div>

      {/* Professional Interests Multiselect */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-white flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#A855F7]" />
            Professional Interests
          </span>
          <span className="text-xs text-[#B8B8B8] font-normal">
            {interests.length} selected
          </span>
        </label>

        {/* Selected Chips */}
        {interests.length > 0 && (
          <div className="flex flex-wrap gap-2 p-3 rounded-xl bg-black/30 border border-white/10">
            {interests.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#7C3AED]/30 border border-[#7C3AED]/50 text-white shadow-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="hover:text-red-400 transition-colors p-0.5 rounded-full hover:bg-white/10"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}

        {/* Preset Chips Selector */}
        <div className="flex flex-wrap gap-2">
          {PRESET_INTERESTS.map((tag) => {
            const selected = interests.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleInterest(tag)}
                className={`
                  px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 border
                  ${selected 
                    ? 'bg-[#7C3AED] border-[#7C3AED] text-white shadow-md shadow-[#7C3AED]/20' 
                    : 'bg-white/5 border-white/10 text-[#B8B8B8] hover:text-white hover:bg-white/10'
                  }
                `}
              >
                {selected ? '✓ ' : '+ '}{tag}
              </button>
            );
          })}
        </div>

        {/* Add custom interest form */}
        <form onSubmit={addCustomTag} className="flex gap-2 pt-1">
          <input
            type="text"
            value={customInterest}
            onChange={(e) => setCustomInterest(e.target.value)}
            placeholder="Add custom interest (e.g., Quantum Computing)..."
            className="glass-input flex-1 px-3.5 py-2 rounded-xl text-xs"
          />
          <button
            type="submit"
            disabled={!customInterest.trim()}
            className="px-4 py-2 rounded-xl bg-white/10 border border-white/15 text-xs font-medium text-white hover:bg-white/20 disabled:opacity-40 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </form>
      </div>

      {/* Event Description Text Area */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-semibold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#A855F7]" />
            Event Description
          </label>
          <span className={`text-xs font-mono ${eventDescription.length > maxChars * 0.9 ? 'text-amber-400' : 'text-[#B8B8B8]'}`}>
            {eventDescription.length} / {maxChars}
          </span>
        </div>

        <textarea
          rows={4}
          maxLength={maxChars}
          value={eventDescription}
          onChange={(e) => setEventDescription(e.target.value)}
          placeholder="Describe the networking event, conference, panel topic, or target participant profile (e.g., AI Summit 2026 discussing LLM scalability, GPU clusters, and enterprise deployment)..."
          className="glass-input w-full p-4 rounded-xl text-sm leading-relaxed resize-y focus:ring-1 focus:ring-[#7C3AED]"
        />
      </div>

      {/* Generate Action Button */}
      <div className="pt-2 flex justify-end">
        <button
          type="button"
          onClick={onGenerate}
          disabled={isLoading || (!eventDescription.trim() && interests.length === 0)}
          className="gradient-button px-8 py-3.5 rounded-xl font-semibold text-sm text-white flex items-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Analyzing & Generating...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              <span>Generate Conversation Starters</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
