import React from 'react';
import { 
  Sparkles, 
  Wand2, 
  SearchCheck, 
  History, 
  MessageSquareHeart, 
  Info, 
  Github, 
  Server, 
  Cpu, 
  CheckCircle2, 
  Settings,
  ChevronRight,
  Zap
} from 'lucide-react';
import { ActiveTab, BackendStatus } from '../types';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  status: BackendStatus;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  status,
  mobileOpen,
  setMobileOpen,
}) => {
  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'generate', label: 'Generate', icon: <Wand2 className="w-4 h-4" /> },
    { id: 'factcheck', label: 'Fact Checker', icon: <SearchCheck className="w-4 h-4" />, badge: 'Wiki' },
    { id: 'history', label: 'History', icon: <History className="w-4 h-4" /> },
    { id: 'feedback', label: 'Feedback', icon: <MessageSquareHeart className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <Info className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#171A23] border-r border-white/10 flex flex-col justify-between p-4 transition-transform duration-300 ease-in-out
        lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Upper Brand & Navigation */}
        <div className="space-y-6">
          {/* Logo & Header */}
          <div className="flex items-center gap-3 px-2 pt-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#A855F7] flex items-center justify-center shadow-lg shadow-[#7C3AED]/30 ring-1 ring-white/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-white tracking-wide text-sm">Networking AI</span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-[#7C3AED]/30 text-[#A855F7] border border-[#7C3AED]/40">
                  SaaS
                </span>
              </div>
              <p className="text-xs text-[#B8B8B8] truncate max-w-[170px]">
                Personalized Assistant
              </p>
            </div>
          </div>

          {/* Nav List */}
          <nav className="space-y-1">
            <div className="px-3 pb-1 text-[11px] font-semibold text-[#B8B8B8]/60 uppercase tracking-wider">
              Navigation
            </div>
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileOpen(false);
                  }}
                  className={`
                    w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group
                    ${isActive 
                      ? 'bg-[#7C3AED] text-white shadow-md shadow-[#7C3AED]/25 ring-1 ring-white/20' 
                      : 'text-[#B8B8B8] hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {item.badge && (
                      <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-[#B8B8B8]'}`}>
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className={`w-3.5 h-3.5 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 ${isActive ? 'opacity-100 translate-x-0' : ''}`} />
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Middle / About Brief */}
        <div className="my-3 px-3 py-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-white">
            <Zap className="w-3.5 h-3.5 text-[#A855F7]" />
            <span>AI Architecture</span>
          </div>
          <p className="text-[11px] text-[#B8B8B8] leading-relaxed">
            Generating contextual conversations & topic verification with real-time semantic grounding.
          </p>
        </div>

        {/* Lower Backend Status & Footer */}
        <div className="space-y-3 pt-3 border-t border-white/10">
          {/* Status Panel */}
          <div className="px-3 py-2.5 rounded-xl bg-black/40 border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#B8B8B8] flex items-center gap-1.5">
                <Server className="w-3 h-3 text-[#22C55E]" />
                Backend
              </span>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-[#22C55E]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                Online
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-[#B8B8B8] flex items-center gap-1.5">
                <Cpu className="w-3 h-3 text-[#A855F7]" />
                Models Loaded
              </span>
              <span className="text-[10px] font-medium text-white/80 bg-white/10 px-1.5 py-0.5 rounded">
                GPT2 / BART / Wiki
              </span>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-white/5">
              <span className="text-[#B8B8B8]">Health Status</span>
              <span className="flex items-center gap-1 text-[11px] font-medium text-[#22C55E]">
                <CheckCircle2 className="w-3 h-3" />
                All Systems Green
              </span>
            </div>
          </div>

          {/* Github & Version */}
          <div className="flex items-center justify-between px-1 text-xs text-[#B8B8B8]">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Github</span>
            </a>
            <span className="font-mono text-[11px] opacity-70">v2.4.0</span>
          </div>
        </div>
      </aside>
    </>
  );
};
