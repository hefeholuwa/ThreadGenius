# ThreadGenius EDU 🎓

AI-powered educational content generator for Facebook. Create high-quality, engaging educational posts with 90+ virality scores.

## ✨ Features

- **🤖 AI Content Generator** - Generates flowing educational posts using Llama 3.3 70B
- **📚 12 Educational Templates** - Breakdown, Principles, Mistakes, Steps, Frameworks, and more
- **📖 120 Topic Library** - Pre-loaded topics organized by category
- **🎯 50 Viral Hooks** - Copy-paste ready engagement hooks
- **📊 Profile Analyzer** - Analyze any Facebook profile to discover what works
- **🎨 AI Image Prompts** - Generate viral image concepts for MidJourney/DALL-E
- **📈 Educational Scoring** - 8-metric scoring system (Hook, Structure, Clarity, Educational Value, etc.)

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ installed
- OpenRouter API key (free at [openrouter.ai](https://openrouter.ai/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/ThreadGenius.git
   cd ThreadGenius
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and add your OpenRouter API key:
   ```
   VITE_OPENROUTER_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI Model**: Llama 3.3 70B Instruct (via OpenRouter)
- **API**: OpenRouter (free tier)

## 📖 Usage

### Generate Educational Content

1. Go to **Generator** tab
2. Select a template (e.g., "Breakdown", "Principles")
3. Enter your topic
4. Click **Generate**
5. Get a 90+ scored educational post!

### Analyze Profiles

1. Go to **Analyze** tab
2. Paste 3-5 sample Facebook posts
3. Click **Analyze Profile**
4. Get insights on niche, audience, and recommendations

### Generate Image Prompts

1. Go to **AI Images** tab
2. Enter your topic
3. Select style (Photorealistic, Illustration, Infographic, etc.)
4. Click **Generate Prompts**
5. Use prompts in MidJourney, DALL-E, or Stable Diffusion

## 🎯 Educational Scoring System

Content is scored on 8 metrics (100 points total):

- **Hook Strength** (20 pts) - Curiosity-driven, under 15 words
- **Structure & Flow** (20 pts) - Natural paragraphs, good pacing
- **Clarity** (15 pts) - Simple language, short sentences
- **Educational Value** (20 pts) - Principles, depth, connections
- **Examples** (10 pts) - Real, specific, relatable
- **Global Tone** (5 pts) - Neutral English, no slang
- **Flow** (5 pts) - Smooth transitions
- **CTA Strength** (5 pts) - Warm + engagement question

**Target: 90+ points for viral-ready content**

## 🔐 Security

- API keys are stored in `.env` (not committed to Git)
- `.env` is in `.gitignore` to prevent accidental exposure
- Use `.env.example` as a template

## 📝 License

MIT License - feel free to use for personal or commercial projects

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a pull request.

## ⚡ Pro Tips

- Start with the **Topic Library** for inspiration
- Use **Viral Hooks** for instant engagement
- Analyze successful profiles to understand what works
- Aim for 90+ scores before posting
- Test image prompts in MidJourney for best results

## 🙏 Acknowledgements

- Built with [Llama 3.3 70B](https://ai.meta.com/llama/) via [OpenRouter](https://openrouter.ai/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)

---

**Made with ❤️ for educators and content creators**
