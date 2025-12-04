import React, { useState } from 'react';
import { Copy, Check, Star, Sparkles } from 'lucide-react';
import { calculateEducationalScore, getScoreColor } from '../utils/scoring';

export function Preview({ content, viralityScore, isLoading, isRewriting, onAutoRewrite, selectedTemplate }) {
    const [copied, setCopied] = useState(false);
    const [showFullContent, setShowFullContent] = useState(false);


    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (isLoading) {
        return (
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 h-full">
                <div className="flex flex-col items-center justify-center h-64">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-slate-400 animate-pulse">Crafting your viral Facebook thread...</p>
                </div>
            </div>
        );
    }

    if (!content) {
        return (
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 h-full">
                <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                    <Star className="w-12 h-12 mb-4 opacity-50" />
                    <p>Your preview will appear here...</p>
                </div>
            </div>
        );
    }

    // Get detailed educational scoring
    const scoreDetails = calculateEducationalScore(content);

    const scoreColor = getScoreColor(viralityScore || scoreDetails.total);

    const getMetricColor = (current, max) => {
        const percentage = (current / max) * 100;
        if (percentage >= 90) return 'text-green-400';
        if (percentage >= 75) return 'text-blue-400';
        if (percentage >= 60) return 'text-yellow-400';
        return 'text-red-400';
    };


    return (
        <div className="space-y-4">
            {/* Educational Score Card */}
            <div className={`border rounded-xl p-5 ${scoreColor?.bg} ${scoreColor?.border}`}>
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-sm font-medium text-slate-400 mb-1">Educational Quality Score</h3>
                        <div className="flex items-center gap-2">
                            <p className={`text-xs font-medium ${scoreColor?.text}`}>
                                {scoreDetails.isViralReady ? '🔥 VIRAL READY' : '⭐ HIGH POTENTIAL'}
                            </p>
                            <Star className="w-3 h-3 text-yellow-400" />
                        </div>
                    </div>
                    <div className="text-right">
                        <div className={`text-5xl font-bold ${scoreColor?.text}`}>
                            {viralityScore || scoreDetails.total}
                        </div>
                        <div className="text-xs text-slate-500">/ 100</div>
                    </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-4 gap-3 mb-3">
                    <div className="text-center">
                        <div className="text-xs text-slate-400 mb-1">🎯 Hook</div>
                        <div className={`text-lg font-bold ${getMetricColor(scoreDetails.breakdown.hookStrength, 20)}`}>
                            {scoreDetails.breakdown.hookStrength}/20
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="text-xs text-slate-400 mb-1">📋 Structure</div>
                        <div className={`text-lg font-bold ${getMetricColor(scoreDetails.breakdown.structureAlignment, 20)}`}>
                            {scoreDetails.breakdown.structureAlignment}/20
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="text-xs text-slate-400 mb-1">✍️ Clarity</div>
                        <div className={`text-lg font-bold ${getMetricColor(scoreDetails.breakdown.clarity, 15)}`}>
                            {scoreDetails.breakdown.clarity}/15
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="text-xs text-slate-400 mb-1">📚 Educational</div>
                        <div className={`text-lg font-bold ${getMetricColor(scoreDetails.breakdown.educationalValue, 20)}`}>
                            {scoreDetails.breakdown.educationalValue}/20
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-3 mb-3">
                    <div className="text-center">
                        <div className="text-xs text-slate-400 mb-1">📊 Examples</div>
                        <div className={`text-lg font-bold ${getMetricColor(scoreDetails.breakdown.specificity, 10)}`}>
                            {scoreDetails.breakdown.specificity}/10
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="text-xs text-slate-400 mb-1">🌍 Global</div>
                        <div className={`text-lg font-bold ${getMetricColor(scoreDetails.breakdown.globalTone, 5)}`}>
                            {scoreDetails.breakdown.globalTone}/5
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="text-xs text-slate-400 mb-1">➡️ Flow</div>
                        <div className={`text-lg font-bold ${getMetricColor(scoreDetails.breakdown.flow, 5)}`}>
                            {scoreDetails.breakdown.flow}/5
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="text-xs text-slate-400 mb-1">💬 CTA</div>
                        <div className={`text-lg font-bold ${getMetricColor(scoreDetails.breakdown.ctaStrength, 5)}`}>
                            {scoreDetails.breakdown.ctaStrength}/5
                        </div>
                    </div>
                </div>

                {/* Stats - Inline */}
                <div className="flex gap-3 text-xs text-slate-400 pt-3 border-t border-slate-700">
                    <span>{scoreDetails.length} chars</span>
                    <span>•</span>
                    <span>{scoreDetails.wordCount} words</span>
                    <span>•</span>
                    <span>{scoreDetails.sectionCount} sections</span>
                </div>
            </div>

            {/* Educational Feedback */}
            {scoreDetails.feedback && scoreDetails.feedback.length > 0 && (
                <div className={`${scoreDetails.isViralReady ? 'bg-green-500/5 border-green-500/20' : 'bg-yellow-500/5 border-yellow-500/20'} border rounded-xl p-4`}>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg">{scoreDetails.isViralReady ? '🔥' : '🎯'}</span>
                        <h3 className={`font-medium text-sm ${scoreDetails.isViralReady ? 'text-green-400' : 'text-yellow-400'}`}>
                            {scoreDetails.isViralReady ? 'Viral Ready!' : `${90 - (viralityScore || scoreDetails.total)} points to 90+ score`}
                        </h3>
                    </div>
                    <div className="space-y-2">
                        {scoreDetails.feedback.map((item, idx) => (
                            <div key={idx} className="flex gap-2 items-start text-sm text-slate-300">
                                <span className="shrink-0">{item.startsWith('🔥') || item.startsWith('✓') ? '✓' : '•'}</span>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}


            {/* Content Preview */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-white text-sm">Generated Thread</h3>
                    <div className="flex items-center gap-2">
                        {/* Auto-Improve temporarily disabled - GPT-5-mini doesn't follow complex instructions well */}
                        {/* {viralityScore && viralityScore < 90 && !isRewriting && (
                            <button
                                onClick={onAutoRewrite}
                                className="flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border border-purple-500/20 text-purple-400 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                            >
                                <Sparkles className="w-3 h-3" />
                                <span>✨ Auto-Improve to 90+</span>
                            </button>
                        )} */}
                        {isRewriting && (
                            <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 px-3 py-1.5 rounded-lg text-xs font-medium">
                                <div className="w-3 h-3 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                                <span>Improving...</span>
                            </div>
                        )}
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-3 h-3" />
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <Copy className="w-3 h-3" />
                                    Copy
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4 max-h-96 overflow-y-auto">
                    <div className="whitespace-pre-wrap text-slate-200 text-sm leading-relaxed">
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
}
