// ============================================
// THREADGENIUS EDUCATIONAL 90+ SCORING SYSTEM
// ============================================

/**
 * Comprehensive scoring system for educational threads
 * Total: 100 points
 * Viral threshold: 90+
 */

export function calculateEducationalScore(content, templateId = 'default') {
    const scores = {
        hookStrength: 0,           // 0-20 points
        structureAlignment: 0,     // 0-20 points
        clarity: 0,                // 0-15 points
        educationalValue: 0,       // 0-20 points
        specificity: 0,            // 0-10 points
        globalTone: 0,             // 0-5 points
        flow: 0,                   // 0-5 points
        ctaStrength: 0,            // 0-5 points
        total: 0,
        breakdown: {},
        feedback: [],
        isViralReady: false
    };

    if (!content || content.length < 100) {
        return { ...scores, total: 0, feedback: ['Content too short'] };
    }

    // 1. HOOK STRENGTH (0-20 points)
    scores.hookStrength = scoreHook(content);
    scores.breakdown.hookStrength = scores.hookStrength;

    // 2. STRUCTURE & TEMPLATE ALIGNMENT (0-20 points)
    scores.structureAlignment = scoreStructure(content, templateId);
    scores.breakdown.structureAlignment = scores.structureAlignment;

    // 3. CLARITY & READABILITY (0-15 points)
    scores.clarity = scoreClarity(content);
    scores.breakdown.clarity = scores.clarity;

    // 4. EDUCATIONAL VALUE DEPTH (0-20 points)
    scores.educationalValue = scoreEducationalValue(content);
    scores.breakdown.educationalValue = scores.educationalValue;

    // 5. SPECIFICITY & EXAMPLES (0-10 points)
    scores.specificity = scoreSpecificity(content);
    scores.breakdown.specificity = scores.specificity;

    // 6. GLOBAL TONE & NEUTRALITY (0-5 points)
    scores.globalTone = scoreGlobalTone(content);
    scores.breakdown.globalTone = scores.globalTone;

    // 7. FLOW & LOGICAL PROGRESSION (0-5 points)
    scores.flow = scoreFlow(content);
    scores.breakdown.flow = scores.flow;

    // 8. CTA STRENGTH (0-5 points)
    scores.ctaStrength = scoreCTA(content);
    scores.breakdown.ctaStrength = scores.ctaStrength;

    // Calculate total
    scores.total = Math.round(
        scores.hookStrength +
        scores.structureAlignment +
        scores.clarity +
        scores.educationalValue +
        scores.specificity +
        scores.globalTone +
        scores.flow +
        scores.ctaStrength
    );

    // Determine if viral-ready
    scores.isViralReady = scores.total >= 90;

    // Generate feedback
    scores.feedback = generateFeedback(scores);

    return scores;
}

// ============================================
// 1. HOOK STRENGTH (0-20 points)
// ============================================
function scoreHook(content) {
    const firstSection = content.split('\n\n')[0] || content.substring(0, 200);
    let score = 10; // Base score

    // Check for hook patterns
    const hookPatterns = [
        /most people/i,
        /you've been taught/i,
        /here's (what|why|the truth)/i,
        /the (real )?reason/i,
        /the biggest (lie|mistake|myth)/i,
        /everyone gets this wrong/i,
        /if you (want|understand)/i,
        /once you understand/i,
        /this one (idea|thing|mistake)/i
    ];

    const hasStrongHook = hookPatterns.some(pattern => pattern.test(firstSection));
    if (hasStrongHook) score += 5;

    // Check for question or curiosity trigger
    if (firstSection.includes('?') || /why|how|what/i.test(firstSection)) {
        score += 3;
    }

    // Check for problem/misconception
    if (/wrong|mistake|misunderstand|fail/i.test(firstSection)) {
        score += 2;
    }

    return Math.min(score, 20);
}

// ============================================
// 2. STRUCTURE & FLOW (0-20 points)
// ============================================
function scoreStructure(content, templateId) {
    let score = 0;

    // Check for paragraphs (double line breaks or emojis creating breaks)
    const paragraphs = content.split(/\n\n+|(?=[✅💰🌡️📊🎯🔥💡⚡🚀📈])/g)
        .map(p => p.trim())
        .filter(p => p.length > 0);

    const paragraphCount = paragraphs.length;

    // Reward 8-12 distinct paragraphs/sections (good structure)
    if (paragraphCount >= 8 && paragraphCount <= 12) {
        score += 15; // Excellent structure
    } else if (paragraphCount >= 6 && paragraphCount <= 15) {
        score += 12; // Good structure
    } else if (paragraphCount >= 4) {
        score += 8; // Moderate structure
    } else {
        score += 4; // Need more structure
    }

    // Check paragraph length (should be 1-3 sentences each)
    const shortParagraphs = paragraphs.filter(p => {
        const sentences = p.split(/[.!?]+/).filter(s => s.trim().length > 0);
        return sentences.length >= 1 && sentences.length <= 3;
    });

    if (shortParagraphs.length / paragraphCount > 0.8) {
        score += 5; // Most paragraphs are concise
    } else if (shortParagraphs.length / paragraphCount > 0.6) {
        score += 3; // Good conciseness
    }

    // Penalize if numbered sections are still present (we want flowing posts)
    const hasNumberedSections = /\d+\//.test(content);
    if (hasNumberedSections) {
        score = Math.max(0, score - 10); // Penalty for using old format
    }

    return Math.min(20, score);
}

// ============================================
// 3. CLARITY & READABILITY (0-15 points)
// ============================================
function scoreClarity(content) {
    let score = 10; // Base score

    // Check average sentence length
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const avgWordsPerSentence = content.split(/\s+/).length / sentences.length;

    if (avgWordsPerSentence < 20) {
        score += 3;
    } else if (avgWordsPerSentence > 30) {
        score -= 3;
    }

    // Check for jargon or complex words
    const complexWords = /synergize|utilize|paradigm|leverage|optimize|utilize/gi;
    if (!complexWords.test(content)) {
        score += 2;
    }

    return Math.max(0, Math.min(score, 15));
}

// ============================================
// 4. EDUCATIONAL VALUE DEPTH (0-20 points)
// ============================================
function scoreEducationalValue(content) {
    let score = 10; // Base score

    // Check for teaching keywords
    const teachingKeywords = [
        /principle/i,
        /lesson/i,
        /step/i,
        /understand/i,
        /learn/i,
        /truth/i,
        /key (is|to)/i,
        /insight/i,
        /framework/i
    ];

    const teachingCount = teachingKeywords.filter(pattern => pattern.test(content)).length;
    score += Math.min(teachingCount * 2, 10);

    return Math.min(score, 20);
}

// ============================================
// 5. SPECIFICITY & EXAMPLES (0-10 points)
// ============================================
function scoreSpecificity(content) {
    let score = 0;

    // Check for examples
    const examplePatterns = [
        /for example/i,
        /like (when|how)/i,
        /imagine/i,
        /think of/i,
        /let's say/i,
        /picture this/i
    ];

    const hasExample = examplePatterns.some(pattern => pattern.test(content));
    if (hasExample) score += 5;

    // Check for analogy markers
    if (/similar to|just like|think of it as/i.test(content)) {
        score += 3;
    }

    // Check for specific numbers or data
    if (/\d+%|\d+ (people|years|times)/.test(content)) {
        score += 2;
    }

    return Math.min(score, 10);
}

// ============================================
// 6. GLOBAL TONE & NEUTRALITY (0-5 points)
// ============================================
function scoreGlobalTone(content) {
    let score = 5; // Start with perfect score

    // Deduct for slang or regional terms
    const slangPatterns = [
        /gonna|wanna|gotta/i,
        /y'all|folks/i,
        /tbh|imho|fyi/i
    ];

    if (slangPatterns.some(pattern => pattern.test(content))) {
        score -= 2;
    }

    // Check for personal pronouns (should avoid "I", "my" in educational mode)
    const personalPronouns = content.match(/\b(I|my|me)\b/g);
    if (personalPronouns && personalPronouns.length > 3) {
        score -= 1;
    }

    return Math.max(0, score);
}

// ============================================
// 7. FLOW & LOGICAL PROGRESSION (0-5 points)
// ============================================
function scoreFlow(content) {
    let score = 3; // Base score

    // Check for transition words
    const transitionWords = [
        /first|second|third|finally/i,
        /however|but|yet/i,
        /therefore|thus|so/i,
        /next|then|after/i
    ];

    if (transitionWords.some(pattern => pattern.test(content))) {
        score += 2;
    }

    return Math.min(score, 5);
}

// ============================================
// 8. CTA STRENGTH (0-5 points)
// ============================================
function scoreCTA(content) {
    let score = 0;

    // Check for CTA presence
    const ctaPatterns = [
        /follow (me )?for/i,
        /share (your|this)/i,
        /what (do you|are your)/i,
        /let me know/i,
        /comment below/i,
        /save this/i
    ];

    if (ctaPatterns.some(pattern => pattern.test(content))) {
        score += 3;
    }

    // Check for question at the end
    if (content.trim().endsWith('?')) {
        score += 2;
    }

    return Math.min(score, 5);
}

// ============================================
// FEEDBACK GENERATION
// ============================================
function generateFeedback(scores) {
    const feedback = [];

    if (scores.hookStrength < 15) {
        feedback.push('🎯 Strengthen your hook - make it more curiosity-driven');
    }

    if (scores.structureAlignment < 15) {
        feedback.push('📋 Align closer to the template structure');
    }

    if (scores.clarity < 12) {
        feedback.push('✍️ Simplify language - use shorter sentences');
    }

    if (scores.educationalValue < 15) {
        feedback.push('📚 Add more educational depth and insights');
    }

    if (scores.specificity < 7) {
        feedback.push('📊 Include more examples and specific scenarios');
    }

    if (scores.globalTone < 4) {
        feedback.push('🌍 Use more neutral, global-friendly language');
    }

    if (scores.flow < 4) {
        feedback.push('➡️ Improve flow with better transitions');
    }

    if (scores.ctaStrength < 3) {
        feedback.push('💬 Add a stronger CTA with an engagement question');
    }

    if (scores.total >= 90) {
        feedback.push('🔥 Viral-ready! This thread meets all quality standards.');
    } else {
        feedback.push(`⚠️ Score: ${scores.total}/100 - Needs improvement to reach 90+`);
    }

    return feedback;
}

// ============================================
// SCORE COLOR HELPER
// ============================================
export function getScoreColor(score) {
    if (score >= 90) return { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20' };
    if (score >= 80) return { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20' };
    if (score >= 70) return { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' };
    return { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' };
}

// ============================================
// LEGACY SUPPORT (for backward compatibility)
// ============================================
export function scoreVirality(content) {
    return calculateEducationalScore(content);
}

// ============================================
// EXPORT
// ============================================
export default calculateEducationalScore;
