import React, { useState } from 'react';
import { LayoutTemplate, BookOpen, AlertCircle, Target, ListChecks, XCircle, Brain, TrendingUp, Lightbulb, Minimize2, ShieldOff, Map, Gem } from 'lucide-react';

export function Templates({ onSelectTemplate }) {
    const templates = [
        // ⭐ 1. Educational Breakdown
        {
            id: 'edu_breakdown',
            title: 'Educational Breakdown',
            description: 'Break down complex topics with 3 clear principles and examples.',
            structure: 'Hook → Why Misunderstood → 3 Principles + Examples → Steps → Outcome → Takeaway → CTA',
            tags: ['Explainer', 'Principles', '12 Sections'],
            score: 95,
            icon: BookOpen,
            color: 'from-blue-500 to-cyan-500'
        },
        // ⭐ 2. 3-Principle Teaching
        {
            id: 'edu_principles',
            title: '3-Principle Teaching',
            description: 'Teach core principles with clear examples and applications.',
            structure: 'Hook → Why It Matters → Principle 1-3 + Examples → Application → Result → CTA',
            tags: ['Principles', 'Teaching', '11 Sections'],
            score: 93,
            icon: Target,
            color: 'from-purple-500 to-pink-500'
        },
        // ⭐ 3. Mistake → Correction
        {
            id: 'edu_mistakes',
            title: 'Mistake → Correction',
            description: 'Identify common mistakes and teach the correct approach.',
            structure: 'Hook → Why Mistake → Consequence → Correct Approach → 3 Lessons → Example → CTA',
            tags: ['Mistakes', 'Correction', '11 Sections'],
            score: 94,
            icon: AlertCircle,
            color: 'from-orange-500 to-red-500'
        },
        // ⭐ 4. Step-by-Step Guide
        {
            id: 'edu_steps',
            title: 'Step-by-Step Guide',
            description: 'Provide clear, actionable steps to learn or achieve something.',
            structure: 'Hook → Why Struggle → Step 1-5 → Common Mistake → Result → Takeaway → CTA',
            tags: ['Steps', 'Actionable', '11 Sections'],
            score: 96,
            icon: ListChecks,
            color: 'from-green-500 to-emerald-500'
        },
        // ⭐ 5. What People Get Wrong
        {
            id: 'edu_wrong',
            title: 'What People Get Wrong',
            description: 'Bust misconceptions and teach the real truth.',
            structure: 'Hook → Why Believed → Truth → How It Works → Examples → Perspective Shift → CTA',
            tags: ['Misconceptions', 'Truth', '11 Sections'],
            score: 92,
            icon: XCircle,
            color: 'from-red-500 to-rose-500'
        },
        // ⭐ 6 Framework / Mental Model
        {
            id: 'edu_framework',
            title: 'Framework / Mental Model',
            description: 'Explain a powerful framework or mental model step-by-step.',
            structure: 'Hook → Why Matters → 3 Components → Example → Common Mistake → Benefits → CTA',
            tags: ['Framework', 'Model', '11 Sections'],
            score: 94,
            icon: Brain,
            color: 'from-indigo-500 to-purple-500'
        },
        // ⭐ 7. Before → After Transformation
        {
            id: 'edu_transformation',
            title: 'Before → After Transformation',
            description: 'Show how principles create transformation.',
            structure: 'Before Problem → Why → Insight → 3 Principles → After State → Why It Works → CTA',
            tags: ['Transformation', 'Growth', '11 Sections'],
            score: 93,
            icon: TrendingUp,
            color: 'from-teal-500 to-cyan-500'
        },
        // ⭐ 8. Things I Wish I Knew Earlier
        {
            id: 'edu_lessons',
            title: 'Lessons I Wish I Knew Earlier',
            description: 'Share valuable hindsight lessons.',
            structure: 'Hook → Why Matters → 4 Lessons → Example → How They Help → Insight → CTA',
            tags: ['Lessons', 'Wisdom', '10 Sections'],
            score: 91,
            icon: Lightbulb,
            color: 'from-yellow-500 to-amber-500'
        },
        // ⭐ 9. Concept Simplification
        {
            id: 'edu_simplify',
            title: 'Concept Simplification',
            description: 'Make complex concepts simple and accessible.',
            structure: 'Hook → Complicated Version → Simple Explanation → 2 Analogies → Mistakes → CTA',
            tags: ['Simplify', 'Accessible', '11 Sections'],
            score: 93,
            icon: Minimize2,
            color: 'from-lime-500 to-green-500'
        },
        // ⭐ 10. Myth-Busting
        {
            id: 'edu_myth',
            title: 'Myth-Busting',
            description: 'Debunk myths with evidence and clarity.',
            structure: 'Myth → Why Exists → Truth → Evidence → How Myth Misleads → Correct Thinking → CTA',
            tags: ['Myths', 'Evidence', '10 Sections'],
            score: 94,
            icon: ShieldOff,
            color: 'from-pink-500 to-rose-500'
        },
        // ⭐ 11. Skills Roadmap
        {
            id: 'edu_roadmap',
            title: 'Skills Development Roadmap',
            description: 'Provide a clear roadmap for learning a skill.',
            structure: 'Why Matters → What Wrong → Foundational → Important → Advanced → Mastery → CTA',
            tags: ['Skills', 'Roadmap', '11 Sections'],
            score: 95,
            icon: Map,
            color: 'from-sky-500 to-blue-500'
        },
        // ⭐ 12. 5 Truths You Need to Know
        {
            id: 'edu_truths',
            title: '5 Truths You Need to Know',
            description: 'Share 5 impactful truths people need to understand.',
            structure: 'Hook → Truth 1-5 → Why They Matter → How to Apply → Takeaway → CTA',
            tags: ['Truths', 'Impactful', '10 Sections'],
            score: 92,
            icon: Gem,
            color: 'from-violet-500 to-purple-500'
        },
    ];

    const [selectedId, setSelectedId] = useState(null);

    const handleSelect = (template) => {
        setSelectedId(template.id);
        onSelectTemplate(template);
    };

    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                    <LayoutTemplate className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-white">Educational Templates</h2>
                    <p className="text-sm text-slate-400">12 proven templates for viral educational content</p>
                </div>
            </div>

            <div className="grid gap-4">
                {templates.map((template) => {
                    const Icon = template.icon;
                    const isSelected = selectedId === template.id;

                    return (
                        <button
                            key={template.id}
                            onClick={() => handleSelect(template)}
                            className={`group relative bg-slate-950 border ${isSelected ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-800'
                                } rounded-xl p-4 text-left transition-all hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10`}
                        >
                            {/* Score Badge */}
                            <div className="absolute top-4 right-4">
                                <div className={`px-3 py-1 rounded-full text-xs font-bold ${template.score >= 90 ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                                    }`}>
                                    {template.score}+ Score
                                </div>
                            </div>

                            <div className="flex items-start gap-4 pr-24">
                                {/* Icon */}
                                <div className={`p-3 bg-gradient-to-br ${template.color} rounded-lg`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-white mb-1">
                                        {template.title}
                                    </h3>
                                    <p className="text-sm text-slate-400 mb-3">
                                        {template.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {template.tags.map((tag, idx) => (
                                            <span
                                                key={idx}
                                                className="px-2 py-1 bg-slate-800/50 text-xs text-slate-300 rounded-md"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Structure */}
                                    <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-3">
                                        <p className="text-xs text-slate-400 mb-1 font-medium">STRUCTURE:</p>
                                        <p className="text-xs text-slate-300 leading-relaxed">
                                            {template.structure}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Selection Indicator */}
                            {isSelected && (
                                <div className="absolute top-4 left-4">
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                        <svg
                                            className="w-4 h-4 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={3}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Stats Footer */}
            <div className="mt-6 p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <p className="text-2xl font-bold text-blue-400">12</p>
                        <p className="text-xs text-slate-400">Templates</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-purple-400">GPT-4</p>
                        <p className="text-xs text-slate-400">Optimized</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-green-400">90+</p>
                        <p className="text-xs text-slate-400">Target Score</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
