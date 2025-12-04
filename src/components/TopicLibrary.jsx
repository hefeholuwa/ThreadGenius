import React, { useState } from 'react';
import { Library, ChevronDown, ChevronRight, Sparkles } from 'lucide-react';

export function TopicLibrary({ onSelectTopic }) {
    const [expandedCategory, setExpandedCategory] = useState(null);

    const topicCategories = [
        {
            id: 'ai_future',
            name: '🤖 AI & The Future of Work',
            color: 'from-blue-500 to-cyan-500',
            topics: [
                'Why AI literacy is the new baseline skill',
                'How AI is transforming everyday jobs',
                'The mindset required to thrive alongside AI',
                'Why AI won\'t replace humans — but humans using AI will',
                'The fastest-growing AI tools to learn now',
                'How to use AI for research and brainstorming',
                'Why soft skills matter more in the age of AI',
                'How to use AI to automate daily tasks',
                'AI myths people still believe',
                'How AI improves decision-making',
                'Why learning AI early gives you career advantage',
                'The impact of AI on creativity',
                'How to build your first AI-assisted workflow',
                'Predicting the AI skills needed by 2030',
                'How companies are hiring differently because of AI',
                'AI safety: what everyone should know',
                'Intro to prompt engineering for beginners',
                'How AI helps non-tech people',
                'AI tools for small businesses',
                'How to stay relevant in an AI-driven world'
            ]
        },
        {
            id: 'productivity',
            name: '⚡ Productivity & Learning',
            color: 'from-purple-500 to-pink-500',
            topics: [
                'Why most people learn inefficiently',
                'How to build a daily learning habit',
                'The science of focus',
                'Breaking tasks into learning chunks',
                'The Pomodoro technique — how it works',
                'How to remove distractions effectively',
                'Why multitasking kills productivity',
                'How to learn faster with active recall',
                'Why consistency beats intensity',
                'How to design a personal learning system',
                'How habits shape your future',
                'How to avoid burnout while learning',
                'Building a morning routine for clarity',
                'How to take effective notes',
                'Why repetition is the mother of mastery',
                'How to build discipline slowly',
                'Why 30-day challenges work',
                'How to track progress properly',
                'How to build momentum from zero',
                'How environment influences productivity'
            ]
        },
        {
            id: 'mindset',
            name: '🧠 Self-Improvement & Mindset',
            color: 'from-green-500 to-emerald-500',
            topics: [
                'Why most people struggle with consistency',
                'How to build confidence slowly',
                'What to do when you feel stuck',
                'Why comfort zones destroy growth',
                'How small improvements change your identity',
                'The mindset that top performers share',
                'Why fear holds people back',
                'How to break limiting beliefs',
                'The difference between growth and fixed mindset',
                'How to stop comparing yourself to others',
                'How to build internal discipline',
                'Why failure is a teacher',
                'How to build resilience step by step',
                'How to overcome self-doubt',
                'Why purpose matters in learning',
                'How to think long-term',
                'How to get back on track after setbacks',
                'How to break bad habits',
                'How to stay consistent even when unmotivated',
                'How your identity shifts with consistent action'
            ]
        },
        {
            id: 'career',
            name: '💼 Career & Skills Development',
            color: 'from-orange-500 to-red-500',
            topics: [
                'Why lifelong learning is the new job security',
                'The skills employers value most in 2026',
                'How to future-proof your career path',
                'Why communication skills matter more than ever',
                'How to switch careers smoothly',
                'The difference between hard and soft skills',
                'What makes someone highly employable',
                'How to build a personal brand professionally',
                'Why career stagnation happens',
                'How to study market trends effectively',
                'How to build a portfolio',
                'Why writing is a superpower skill',
                'The skills that compound over time',
                'How to get better at problem-solving',
                'Why adaptability matters more than experience'
            ]
        },
        {
            id: 'digital',
            name: '💻 Digital Skills & Online Education',
            color: 'from-indigo-500 to-purple-500',
            topics: [
                'Why digital skills give you global opportunities',
                'How to learn coding as a beginner',
                'The most valuable digital skills today',
                'What freelancing actually requires',
                'Why content creation is a future-proof skill',
                'How to use YouTube to self-educate',
                'Why online courses fail most learners',
                'How to build your first digital project',
                'Why writing online creates career leverage',
                'How to learn design (UI/UX basics)',
                'Intro to data literacy',
                'Why community-based learning is powerful',
                'How to build your first online portfolio',
                'The future of remote work',
                'How to choose the right online course'
            ]
        },
        {
            id: 'finance',
            name: '💰 Finance & Personal Development',
            color: 'from-yellow-500 to-amber-500',
            topics: [
                'Why financial literacy matters',
                'The basics of budgeting',
                'How to develop saving habits',
                'Why impulsive spending destroys growth',
                'How to create multiple income streams',
                'How to invest in your education wisely',
                'Why financial discipline is tied to life discipline',
                'The difference between assets and liabilities',
                'How to create a simple financial plan',
                'How to avoid common money mistakes',
                'Why people stay broke',
                'How small money habits change your future',
                'How to think long-term with money',
                'Why learning new skills is the best investment',
                'How to make better financial decisions'
            ]
        },
        {
            id: 'mental_models',
            name: '🎯 Mental Models & Decision-Making',
            color: 'from-rose-500 to-pink-500',
            topics: [
                'The 80/20 rule explained',
                'First-principles thinking',
                'Why most people make poor decisions',
                'Mental models for better life outcomes',
                'The concept of compounding',
                'How to think clearly under pressure',
                'The difference between urgent and important',
                'Opportunity cost',
                'The power of delayed gratification',
                'Why clarity drives progress',
                'Frameworks top thinkers use',
                'How to simplify complex problems',
                'Why people overestimate short-term benefits',
                'How to use feedback loops',
                'The psychology of long-term results'
            ]
        }
    ];

    const toggleCategory = (categoryId) => {
        setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    };

    const handleTopicClick = (topic) => {
        onSelectTopic(topic);
    };

    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-amber-500/10 rounded-lg">
                    <Library className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-white">Educational Topic Library</h2>
                    <p className="text-sm text-slate-400">120 high-performing topics across 7 categories</p>
                </div>
            </div>

            {/* Categories */}
            <div className="space-y-3">
                {topicCategories.map((category) => {
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
                                        <p className="text-xs text-slate-400">{category.topics.length} topics</p>
                                    </div>
                                </div>
                            </button>

                            {/* Topics List */}
                            {isExpanded && (
                                <div className="border-t border-slate-800 p-3 space-y-2 max-h-96 overflow-y-auto">
                                    {category.topics.map((topic, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleTopicClick(topic)}
                                            className="w-full text-left px-3 py-2 rounded-lg bg-slate-900/50 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/50 transition-all group"
                                        >
                                            <div className="flex items-center gap-2">
                                                <Sparkles className="w-3 h-3 text-slate-500 group-hover:text-blue-400 transition-colors" />
                                                <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                                                    {topic}
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
                        <p className="text-2xl font-bold text-blue-400">120</p>
                        <p className="text-xs text-slate-400">Total Topics</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-purple-400">7</p>
                        <p className="text-xs text-slate-400">Categories</p>
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
