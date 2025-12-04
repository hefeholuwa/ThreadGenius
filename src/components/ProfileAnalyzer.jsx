import React, { useState } from 'react';
import { Sparkles, TrendingUp, Target, Users, MessageSquare, Copy, Check } from 'lucide-react';

export function ProfileAnalyzer() {
    const [samplePosts, setSamplePosts] = useState('');
    const [analysis, setAnalysis] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleAnalyze = async () => {
        if (!samplePosts.trim()) {
            alert('Please paste some sample posts first!');
            return;
        }

        setIsAnalyzing(true);
        setAnalysis(null);

        try {
            const prompt = `Analyze these Facebook posts and provide a detailed profile analysis:

${samplePosts}

Based on the content above, provide a JSON response with this structure:
{
  "niche": "Primary niche/topic",
  "subNiches": ["sub-niche 1", "sub-niche 2"],
  "audienceType": "Description of target audience",
  "contentStyle": "Description of writing style",
  "whatWorks": ["thing 1 that's working", "thing 2", "thing 3"],
  "recommendedTemplates": ["template name 1", "template name 2", "template name 3"],
  "topicSuggestions": ["topic idea 1", "topic idea 2", "topic idea 3", "topic idea 4", "topic idea 5"],
  "toneRecommendation": "story or educational or controversial or funny",
  "viralPotential": "score from 1-100 with brief reason"
}

Be specific and actionable. Base everything on the actual content patterns you see.`;

            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "meta-llama/llama-3.3-70b-instruct:free",
                    messages: [
                        {
                            role: "user",
                            content: prompt
                        }
                    ]
                })
            });

            const data = await response.json();

            if (data && data.choices && data.choices[0] && data.choices[0].message) {
                // Try to parse JSON from the response
                const content = data.choices[0].message.content;
                const jsonMatch = content.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    const parsedAnalysis = JSON.parse(jsonMatch[0]);
                    setAnalysis(parsedAnalysis);
                } else {
                    // Fallback: show raw result
                    alert('Could not parse analysis. Check console for raw result.');
                    console.log('Raw AI response:', content);
                }
            }
        } catch (error) {
            console.error('Analysis failed:', error);
            alert('Analysis failed. Please try again.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-500/20 rounded-xl">
                        <Sparkles className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-white mb-2">AI Profile Analyzer</h2>
                        <p className="text-slate-300 text-sm">
                            Paste 3-5 sample posts from a Facebook profile, and our AI will identify the niche,
                            audience, and recommend what content will work best.
                        </p>
                    </div>
                </div>
            </div>

            {/* Input Section */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                <label className="block text-white font-medium mb-3">
                    Sample Posts (3-5 recent posts)
                </label>
                <textarea
                    value={samplePosts}
                    onChange={(e) => setSamplePosts(e.target.value)}
                    placeholder="Paste 3-5 recent Facebook posts here...

Example:
---
Post 1: I used to struggle with anxiety every morning...
---
Post 2: Here are 5 books that changed my life...
---
Post 3: Why most people fail at building habits..."
                    className="w-full h-64 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                />

                <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !samplePosts.trim()}
                    className="mt-4 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isAnalyzing ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Analyzing Profile...
                        </>
                    ) : (
                        <>
                            <Sparkles className="w-5 h-5" />
                            Analyze Profile
                        </>
                    )}
                </button>
            </div>

            {/* Analysis Results */}
            {analysis && (
                <div className="space-y-4">
                    {/* Niche & Audience */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Target className="w-5 h-5 text-blue-400" />
                                <h3 className="font-semibold text-white">Niche Identified</h3>
                            </div>
                            <p className="text-2xl font-bold text-blue-400 mb-2">{analysis.niche}</p>
                            <div className="flex flex-wrap gap-2">
                                {analysis.subNiches?.map((subNiche, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm text-blue-300">
                                        {subNiche}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Users className="w-5 h-5 text-green-400" />
                                <h3 className="font-semibold text-white">Target Audience</h3>
                            </div>
                            <p className="text-slate-300">{analysis.audienceType}</p>
                        </div>
                    </div>

                    {/* Content Style */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <MessageSquare className="w-5 h-5 text-purple-400" />
                            <h3 className="font-semibold text-white">Content Style</h3>
                        </div>
                        <p className="text-slate-300">{analysis.contentStyle}</p>
                    </div>

                    {/* What's Working */}
                    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <TrendingUp className="w-5 h-5 text-green-400" />
                            <h3 className="font-semibold text-white">What's Working</h3>
                        </div>
                        <ul className="space-y-2">
                            {analysis.whatWorks?.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                    <span className="text-green-400 mt-1">✓</span>
                                    <span className="text-slate-300">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Recommendations */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                            <h3 className="font-semibold text-white mb-4">Recommended Templates</h3>
                            <div className="space-y-2">
                                {analysis.recommendedTemplates?.map((template, idx) => (
                                    <div key={idx} className="px-3 py-2 bg-blue-500/10 border border-blue-500/20 rounded-lg text-sm text-blue-300">
                                        {template}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                            <h3 className="font-semibold text-white mb-4">Content Topic Ideas</h3>
                            <div className="space-y-2">
                                {analysis.topicSuggestions?.map((topic, idx) => (
                                    <div key={idx} className="px-3 py-2 bg-purple-500/10 border border-purple-500/20 rounded-lg text-sm text-purple-300">
                                        {topic}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Tone & Viral Potential */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                            <h3 className="font-semibold text-white mb-3">Recommended Tone</h3>
                            <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg text-purple-300 font-medium capitalize">
                                {analysis.toneRecommendation}
                            </span>
                        </div>

                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                            <h3 className="font-semibold text-white mb-3">Viral Potential</h3>
                            <p className="text-slate-300 text-sm">{analysis.viralPotential}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
