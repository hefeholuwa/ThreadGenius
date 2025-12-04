import { useState } from 'react';
import { Layout } from './components/Layout';
import { Generator } from './components/Generator';
import { Preview } from './components/Preview';
import { Templates } from './components/Templates';
import { TopicLibrary } from './components/TopicLibrary';
import { HookLibrary } from './components/HookLibrary';
import { ViralImages } from './components/ViralImages';
import { ProfileAnalyzer } from './components/ProfileAnalyzer';
import { buildPrompt, buildRewritePrompt } from './utils/prompts';
import { calculateEducationalScore } from './utils/scoring';


// OpenRouter API (using free Llama 3.3 70B model)
// Get your free API key from: https://openrouter.ai/
// Then add it to .env file as: VITE_OPENROUTER_API_KEY=your_key_here
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;


function App() {
  const [activeTab, setActiveTab] = useState('generator');

  const [topic, setTopic] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [viralityScore, setViralityScore] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRewriting, setIsRewriting] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);


  const handleGenerate = async () => {
    setIsLoading(true);
    setGeneratedContent('');
    setViralityScore(null);

    try {
      // Always use educational tone
      const prompt = buildPrompt(topic, selectedTemplate?.id || 'default', 'facebook', 'educational');

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
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
        const content = data.choices[0].message.content;

        // Calculate Educational Score using comprehensive 90+ system
        const scoreResult = calculateEducationalScore(content, selectedTemplate?.id || 'default');
        setViralityScore(scoreResult.total);

        setGeneratedContent(content);
      } else if (data && data.message) {
        // RapidAPI error response
        setGeneratedContent(`API Error: ${data.message} `);
        console.error("RapidAPI Error Message:", data.message);
      } else {
        setGeneratedContent("Error: No content generated. Check console for details.");
        console.error("API Error - Full Response:", data);
      }
    } catch (error) {
      console.error("Generation failed - Error Details:", error);
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      setGeneratedContent(`Error: ${error.message}. Check console for details.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setActiveTab('generator');
  };

  const handleTopicSelect = (selectedTopic) => {
    setTopic(selectedTopic);
    setActiveTab('generator');
  };

  const handleHookSelect = (selectedHook) => {
    setTopic(selectedHook);
    setActiveTab('generator');
  };

  const handleAutoRewrite = async () => {
    if (!generatedContent) return;
    setIsRewriting(true);
    try {
      const currentScore = calculateEducationalScore(generatedContent, selectedTemplate?.id || 'default');
      const rewritePrompt = buildRewritePrompt(generatedContent, currentScore, selectedTemplate?.id || 'default');
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.3-70b-instruct:free",
          messages: [
            {
              role: "user",
              content: rewritePrompt
            }
          ]
        })
      });
      const data = await response.json();
      if (data && data.choices && data.choices[0] && data.choices[0].message) {
        const improvedContent = data.choices[0].message.content;
        const newScore = calculateEducationalScore(improvedContent, selectedTemplate?.id || 'default');
        setViralityScore(newScore.total);
        setGeneratedContent(improvedContent);
      }
    } catch (error) {
      console.error("Auto-rewrite error:", error);
    } finally {
      setIsRewriting(false);
    }
  };


  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {activeTab === 'generator' && 'Create New Content'}
          {activeTab === 'templates' && 'Template Library'}
          {activeTab === 'analyze' && 'Profile Analyzer'}
          {activeTab === 'images' && 'Viral Image Library'}
          {activeTab === 'history' && 'Your History'}
          {activeTab === 'settings' && 'Settings'}
        </h1>
        <p className="text-slate-400">
          {activeTab === 'generator' && 'Turn your ideas into viral threads in seconds.'}
          {activeTab === 'templates' && 'Choose from our high-performing structures.'}
          {activeTab === 'analyze' && 'Discover what content works for any Facebook profile.'}
          {activeTab === 'images' && 'Browse high-engagement visuals and prompts.'}
        </p>
      </div>

      {activeTab === 'generator' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Generator */}
          <div>
            <Generator
              topic={topic}
              setTopic={setTopic}
              onGenerate={handleGenerate}
              isLoading={isLoading}
              selectedTemplate={selectedTemplate}
            />
          </div>

          {/* Right: Preview */}
          <div className="lg:sticky lg:top-6 lg:self-start">
            <Preview
              content={generatedContent}
              viralityScore={viralityScore}
              isLoading={isLoading}
              isRewriting={isRewriting}
              onAutoRewrite={handleAutoRewrite}
              selectedTemplate={selectedTemplate}
            />
          </div>
        </div>
      )}

      {activeTab === 'templates' && (
        <Templates onSelectTemplate={handleTemplateSelect} />
      )}

      {activeTab === 'library' && (
        <TopicLibrary onSelectTopic={handleTopicSelect} />
      )}

      {activeTab === 'hooks' && (
        <HookLibrary onSelectHook={handleHookSelect} />
      )}

      {activeTab === 'images' && (
        <ViralImages />
      )}

      {activeTab === 'analyze' && (
        <ProfileAnalyzer />
      )}

      {(activeTab !== 'generator' && activeTab !== 'templates' && activeTab !== 'library' && activeTab !== 'hooks' && activeTab !== 'images' && activeTab !== 'analyze') && (
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center">
          <p className="text-slate-500">This section is under construction.</p>
        </div>
      )}
    </Layout>
  );
}

export default App;
