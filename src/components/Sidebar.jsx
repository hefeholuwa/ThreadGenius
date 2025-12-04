import React from 'react';
import { Sparkles } from 'lucide-react';

export function Sidebar({ activeTab, onTabChange, tabs }) {
    return (
        <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen fixed left-0 top-0">
            <div className="p-6 flex items-center gap-3 border-b border-slate-800">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                    ThreadGenius EDU
                </span>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {tabs.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => onTabChange(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20'
                                : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-4">
                    <p className="text-xs font-semibold text-blue-300 mb-2">🎓 Educational Mode Active</p>
                    <p className="text-xs text-slate-400">Target: 90+ Virality Score</p>
                </div>
            </div>
        </div>
    );
}
