import React, { useState } from 'react';
import { Settings, Sliders, Key, Moon, Bell, Check, Save, RefreshCw } from 'lucide-react';

export const SettingsSection: React.FC = () => {
  const [tone, setTone] = useState<'executive' | 'casual' | 'technical'>('executive');
  const [startersCount, setStartersCount] = useState<number>(4);
  const [autoFactCheck, setAutoFactCheck] = useState<boolean>(true);
  const [saved, setSaved] = useState<boolean>(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 border border-white/10 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#7C3AED]/20 border border-[#7C3AED]/30 flex items-center justify-center text-[#A855F7]">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Application Settings & Preferences</h2>
            <p className="text-xs text-[#B8B8B8]">Customize AI output tone, layout, and defaults</p>
          </div>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/80">
          Settings
        </span>
      </div>

      <div className="space-y-6 max-w-2xl">
        {/* Tone Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-white">Default Conversation Tone</label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'executive', label: 'Executive' },
              { id: 'technical', label: 'Deep Technical' },
              { id: 'casual', label: 'Casual Tech' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTone(item.id as any)}
                className={`
                  p-3 rounded-xl text-xs font-semibold border text-center transition-all
                  ${tone === item.id 
                    ? 'bg-[#7C3AED] border-[#7C3AED] text-white shadow-md shadow-[#7C3AED]/20' 
                    : 'bg-white/5 border-white/10 text-[#B8B8B8] hover:text-white'
                  }
                `}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Number of Starters */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-white">
            Starters Per Generation: <span className="text-[#A855F7] font-bold">{startersCount}</span>
          </label>
          <input
            type="range"
            min={2}
            max={6}
            value={startersCount}
            onChange={(e) => setStartersCount(Number(e.target.value))}
            className="w-full accent-[#7C3AED]"
          />
          <div className="flex justify-between text-[10px] text-[#B8B8B8] font-mono">
            <span>2 Starters</span>
            <span>4 Starters</span>
            <span>6 Starters</span>
          </div>
        </div>

        {/* Auto Fact Check Toggle */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/10">
          <div>
            <div className="text-sm font-semibold text-white">Auto-Verify Technical Topics</div>
            <div className="text-xs text-[#B8B8B8]">Automatically fetch Wikipedia summaries for extracted themes.</div>
          </div>
          <button
            type="button"
            onClick={() => setAutoFactCheck(!autoFactCheck)}
            className={`w-12 h-6 rounded-full transition-colors relative p-1 ${autoFactCheck ? 'bg-[#7C3AED]' : 'bg-white/20'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${autoFactCheck ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
        </div>

        {/* Save button */}
        <div className="pt-4 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="gradient-button px-6 py-2.5 rounded-xl text-xs font-semibold text-white flex items-center gap-2 shadow-lg"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4 text-green-300" />
                <span>Preferences Saved</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Preferences</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
