import React from 'react';
import { Sparkles, LayoutTemplate, Library, Zap, Image, Clock, Settings, Target } from 'lucide-react';
import { Sidebar } from './Sidebar';

export function Layout({ children, activeTab, onTabChange }) {
    const tabs = [
        { id: 'generator', label: 'Generator', icon: Sparkles },
        { id: 'templates', label: 'Templates', icon: LayoutTemplate },
        { id: 'library', label: 'Topic Library', icon: Library },
        { id: 'hooks', label: 'Viral Hooks', icon: Zap },
        { id: 'analyze', label: 'Analyze', icon: Target },
        { id: 'images', label: 'AI Images', icon: Image },
        { id: 'history', label: 'History', icon: Clock },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];


    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30 flex">
            <Sidebar activeTab={activeTab} onTabChange={onTabChange} tabs={tabs} />
            <div className="flex-1 ml-64">
                <div className="max-w-7xl mx-auto px-8 py-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
