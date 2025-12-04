import React from 'react';
import { Sparkles, LayoutTemplate } from 'lucide-react';

export function Generator({ topic, setTopic, onGenerate, isLoading, selectedTemplate }) {
    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                </div>
                <h2 className="text-xl font-semibold text-white">Educational Content Generator</h2>
            </div>

            <div className="space-y-5">
                {/* Selected Template Badge */}
                {selectedTemplate && (
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-500/20 rounded-lg">
                                <LayoutTemplate className="w-4 h-4 text-blue-400" />
                            </div>
                            <div>
                                <p className="text-xs text-blue-300 font-medium">Using Template</p>
                                <p className="text-sm text-white font-semibold">{selectedTemplate.title}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Topic Input */}
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                        What topic do you want to teach about?
                    </label>
                    <textarea
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g., Why learning AI tools is essential for 2025"
                        className="w-full h-32 bg-slate-950 border border-slate-800 rounded-xl p-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none"
                    />
                </div>

                {/* Generate Button */}
                <button
                    onClick={onGenerate}
                    disabled={isLoading || !topic.trim()}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-medium py-4 rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Generating Educational Content...
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-5 h-5" />
                            Generate Educational Thread
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
