import React, { useState } from 'react';
import { Zap, ChevronDown, ChevronRight, Sparkles } from 'lucide-react';

export function HookLibrary({ onSelectHook }) {
    const [expandedCategory, setExpandedCategory] = useState(null);

    const hookCategories = [
        {
            id: 'misconceptions',
            name: '🎯 Misconceptions & Surprising Truths',
            color: 'from-red-500 to-orange-500',
            hooks: [
                'Most people misunderstand this — and it\'s costing them years of progress.',
                'You\'ve been taught the wrong thing about this your entire life.',
                'Here\'s the truth nobody explains clearly.',
                'What people *think* happens vs what actually happens.',
                'This simple concept is widely misunderstood.',
                'The biggest lie people still believe about this topic.',
                'The real reason most people fail at this.',
                'Everyone gets this wrong — until they learn this one principle.',
                'This isn\'t complicated — people just overthink it.',
                'If you understand this correctly, everything changes.'
            ]
        },
        {
            id: 'problem_curiosity',
            name: '💡 Problem → Curiosity Hooks',
            color: 'from-blue-500 to-cyan-500',
            hooks: [
                'The reason you\'re struggling with this is simpler than you think.',
                'If this confuses you, it\'s not your fault — here\'s why.',
                'Most people fail here, not because they\'re lazy, but because they misunderstand the process.',
                'You\'re doing this wrong — and here\'s the correct way.',
                'This one mistake is stopping your progress.',
                'You\'re focusing on the wrong thing — here\'s what actually matters.',
                'This is why your results haven\'t improved yet.',
                'There\'s a simple explanation for why this feels difficult.',
                'Here\'s what nobody tells beginners about this.',
                'Your understanding of this needs an upgrade — here\'s how.'
            ]
        },
        {
            id: 'big_insight',
            name: '🔥 Big Insight Hooks',
            color: 'from-purple-500 to-pink-500',
            hooks: [
                'Once you understand this, your entire approach changes.',
                'This one idea will save you years of trial and error.',
                'Everything becomes easier once you grasp this principle.',
                'You don\'t need more effort — you need better understanding.',
                'This is the foundation of mastering any skill.',
                'There\'s a smarter way to approach this — let me explain.',
                'Most people skip this first step — and that\'s why they fail.',
                'Understanding this concept puts you ahead of 90% of people.',
                'If you learn only one thing today, let it be this.',
                'This perspective will transform how you see everything.'
            ]
        },
        {
            id: 'framework',
            name: '🧠 Framework/Model Hooks',
            color: 'from-indigo-500 to-purple-500',
            hooks: [
                'Here\'s the simple framework that explains everything.',
                'This mental model will completely change your thinking.',
                'The rule everyone should apply — but almost nobody does.',
                'A clear breakdown of the concept most people overcomplicate.',
                'This is the structure experts use that beginners don\'t know about.',
                'Let me simplify this powerful idea for you.'
            ]
        },
        {
            id: 'skill_learning',
            name: '📚 Skill-Building & Learning Hooks',
            color: 'from-green-500 to-emerald-500',
            hooks: [
                'If you want to learn faster, start with this.',
                'The fastest way to master any skill — explained simply.',
                'Here\'s what people get wrong when trying to improve.',
                'Learning becomes easier when you understand this principle.',
                'Most people sabotage their own learning without realizing it.',
                'There\'s a right way to build skills — and this is it.',
                'You don\'t need talent — you need this process.',
                'Here\'s the blueprint for learning anything effectively.'
            ]
        },
        {
            id: 'success',
            name: '🎯 "If You Want to Succeed..." Hooks',
            color: 'from-yellow-500 to-amber-500',
            hooks: [
                'If you want to succeed in 2026 and beyond, understand this first.',
                'If you want to stay relevant, learn this principle.',
                'If you want better results, change how you think about this.',
                'Success in this area comes down to a single idea.',
                'To get ahead, you must understand how this really works.',
                'The people who succeed at this do one thing differently.'
            ]
        }
    ];

    const toggleCategory = (categoryId) => {
        setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    };

    const handleHookClick = (hook) => {
        onSelectHook(hook);
    };

    const totalHooks = hookCategories.reduce((sum, cat) => sum + cat.hooks.length, 0);

    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                    <Zap className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-white">Viral Hook Library</h2>
                    <p className="text-sm text-slate-400">{totalHooks} scroll-stopping hooks across 6 categories</p>
                </div>
            </div>

            {/* Info Banner */}
            <div className="mb-6 p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl">
                <p className="text-sm text-orange-200">
                    <span className="font-semibold">💡 How to use:</span> Click any hook → it auto-fills your topic field → choose a template → generate!
                </p>
            </div>

            {/* Categories */}
            <div className="space-y-3">
                {hookCategories.map((category) => {
                    const isExpanded = expandedCategory === category.id;

                    return (
                        <div key={category.id} className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                            {/* Category Header */}
                            <button
                                onClick={() => toggleCategory(category.id)}
                                className="w-full flex items-center justify-between p-4 hover:bg-slate-900/50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 bg-gradient-to-br ${category.color} rounded-lg`}>
                                        {isExpanded ? (
                                            <ChevronDown className="w-4 h-4 text-white" />
                                        ) : (
                                            <ChevronRight className="w-4 h-4 text-white" />
                                        )}
                                    </div>
                                    <div className="text-left">
                                        <h3 className="text-base font-semibold text-white">{category.name}</h3>
                                        <p className="text-xs text-slate-400">{category.hooks.length} hooks</p>
                                    </div>
                                </div>
                            </button>

                            {/* Hooks List */}
                            {isExpanded && (
                                <div className="border-t border-slate-800 p-3 space-y-2 max-h-96 overflow-y-auto">
                                    {category.hooks.map((hook, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleHookClick(hook)}
                                            className="w-full text-left px-4 py-3 rounded-lg bg-slate-900/50 hover:bg-slate-800 border border-slate-800 hover:border-orange-500/50 transition-all group"
                                        >
                                            <div className="flex items-start gap-3">
                                                <Sparkles className="w-4 h-4 text-slate-500 group-hover:text-orange-400 transition-colors mt-0.5 flex-shrink-0" />
                                                <span className="text-sm text-slate-300 group-hover:text-white transition-colors leading-relaxed">
                                                    {hook}
                                                </span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Stats Footer */}
            <div className="mt-6 p-4 bg-slate-950 border border-slate-800 rounded-xl">
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <p className="text-2xl font-bold text-orange-400">{totalHooks}</p>
                        <p className="text-xs text-slate-400">Total Hooks</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-purple-400">6</p>
                        <p className="text-xs text-slate-400">Categories</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-green-400">🔥</p>
                        <p className="text-xs text-slate-400">Scroll-Stoppers</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
