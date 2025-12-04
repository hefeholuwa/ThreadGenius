import React, { useState } from 'react';
import { Sparkles, Image as ImageIcon, Copy, Check, TrendingUp, Palette, Wand2 } from 'lucide-react';

export function ViralImages() {
    const [topic, setTopic] = useState('');
    const [imageStyle, setImageStyle] = useState('photorealistic');
    const [prompts, setPrompts] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);

    const styles = [
        { id: 'photorealistic', label: 'Photorealistic', emoji: '📸' },
        { id: 'illustration', label: 'Illustration', emoji: '🎨' },
        { id: 'infographic', label: 'Infographic', emoji: '📊' },
        { id: 'meme', label: 'Meme Template', emoji: '😂' },
        { id: 'quote', label: 'Quote Card', emoji: '💬' },
        { id: 'motivational', label: 'Motivational', emoji: '🔥' },
    ];

    const handleGenerate = async () => {
        if (!topic.trim()) {
            alert('Please enter a topic first!');
            return;
        }

        setIsGenerating(true);
        setPrompts([]);

        try {
            const systemPrompt = `You are an expert at creating viral social media image prompts for AI image generators (MidJourney, DALL-E, Stable Diffusion).

Generate simple, clean image prompts that can be directly used in image generation tools.

Format as JSON array:
[
  {
    "title": "Brief descriptive title",
    "prompt": "Clean image generation prompt (max 100 words)",
    "viralityScore": 95,
    "whyViral": "One sentence why this works",
    "tips": ["engagement tip 1", "engagement tip 2"]
  }
]

Style guidelines for ${imageStyle}:
${imageStyle === 'photorealistic' ? '- Photorealistic, professional photography style\n- Use terms like "high quality photo", "professional photography", "realistic"' :
                    imageStyle === 'illustration' ? '- Colorful digital illustration style\n- Use terms like "flat design", "vector art", "bright colors"' :
                        imageStyle === 'infographic' ? '- Clean infographic design\n- Use terms like "minimalist infographic", "data visualization", "clean layout"' :
                            imageStyle === 'meme' ? '- Relatable meme format\n- Use terms like "meme template", "bold text overlay", "humorous"' :
                                imageStyle === 'quote' ? '- Inspirational quote design\n- Use terms like "typography", "motivational quote", "clean background"' :
                                    '- Motivational visual style\n- Use terms like "inspiring", "uplifting", "professional design"'}

Return ONLY valid JSON array with 3 concepts. No markdown, no explanations, just the JSON.`;

            const userPrompt = `Topic: ${topic}\n\nGenerate 3 ${imageStyle} image prompts.`;

            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "meta-llama/llama-3.3-70b-instruct:free",
                    messages: [
                        { role: "system", content: systemPrompt },
                        { role: "user", content: userPrompt }
                    ]
                })
            });

            const data = await response.json();

            if (data && data.choices && data.choices[0] && data.choices[0].message) {
                // Try to parse JSON from response
                const content = data.choices[0].message.content;
                const jsonMatch = content.match(/\[[\s\S]*\]/);
                if (jsonMatch) {
                    const parsedPrompts = JSON.parse(jsonMatch[0]);
                    setPrompts(parsedPrompts);
                } else {
                    alert('Could not parse prompts. Check console.');
                    console.log('Raw response:', content);
                }
            }
        } catch (error) {
            console.error('Generation failed:', error);
            alert('Failed to generate prompts. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-500/20 rounded-xl">
                        <ImageIcon className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-white mb-2">AI Image Prompt Generator</h2>
                        <p className="text-slate-300 text-sm">
                            Generate viral image prompts for MidJourney, DALL-E, or Stable Diffusion.
                            Each prompt includes a virality score and engagement tips.
                        </p>
                    </div>
                </div>
            </div>

            {/* Input Section */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                <div className="space-y-4">
                    {/* Topic Input */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Image Topic
                        </label>
                        <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="e.g., Morning routine success, Startup growth, Mental health awareness"
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                        />
                    </div>

                    {/* Style Selector */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-3">
                            <Palette className="w-4 h-4 inline mr-2" />
                            Image Style
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {styles.map((style) => (
                                <button
                                    key={style.id}
                                    onClick={() => setImageStyle(style.id)}
                                    className={`p-3 rounded-xl border transition-all ${imageStyle === style.id
                                        ? 'bg-purple-500/20 border-purple-500/40 text-purple-300'
                                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-600'
                                        }`}
                                >
                                    <div className="text-2xl mb-1">{style.emoji}</div>
                                    <div className="text-sm font-medium">{style.label}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Generate Button */}
                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating || !topic.trim()}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-slate-700 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-medium py-4 rounded-xl transition-all shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2"
                    >
                        {isGenerating ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Generating Prompts...
                            </>
                        ) : (
                            <>
                                <Wand2 className="w-5 h-5" />
                                Generate Image Prompts
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Generated Prompts */}
            {prompts.length > 0 && (
                <div className="space-y-4">
                    {prompts.map((promptData, idx) => (
                        <PromptCard key={idx} promptData={promptData} index={idx} />
                    ))}
                </div>
            )}
        </div>
    );
}

function PromptCard({ promptData, index }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptData.prompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const getScoreColor = (score) => {
        if (score >= 90) return 'text-green-400 bg-green-500/10 border-green-500/20';
        if (score >= 80) return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
        if (score >= 70) return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
        return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
    };

    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="px-2 py-1 bg-purple-500/20 border border-purple-500/30 rounded text-xs font-medium text-purple-300">
                            Prompt {index + 1}
                        </span>
                        <h3 className="text-lg font-semibold text-white">{promptData.title}</h3>
                    </div>
                </div>

                {/* Virality Score */}
                <div className={`border rounded-xl px-4 py-2 ${getScoreColor(promptData.viralityScore)}`}>
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-2xl font-bold">{promptData.viralityScore}</span>
                    </div>
                    <div className="text-xs opacity-75">Viral Score</div>
                </div>
            </div>

            {/* Image Prompt */}
            <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-slate-400">Image Generation Prompt</label>
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
                                Copy Prompt
                            </>
                        )}
                    </button>
                </div>
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4">
                    <p className="text-slate-200 text-sm leading-relaxed font-mono">
                        {promptData.prompt}
                    </p>
                </div>
            </div>

            {/* Why Viral */}
            <div className="mb-4 p-3 bg-green-500/5 border border-green-500/20 rounded-lg">
                <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                    <div>
                        <div className="text-xs font-medium text-green-400 mb-1">Why This Will Go Viral</div>
                        <p className="text-sm text-slate-300">{promptData.whyViral}</p>
                    </div>
                </div>
            </div>

            {/* Tips */}
            <div>
                <div className="text-xs font-medium text-slate-400 mb-2">📌 Platform Tips</div>
                <div className="space-y-1">
                    {promptData.tips.map((tip, tipIdx) => (
                        <div key={tipIdx} className="flex items-start gap-2">
                            <span className="text-purple-400 mt-1">•</span>
                            <span className="text-sm text-slate-300">{tip}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
