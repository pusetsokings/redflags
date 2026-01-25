import type { JournalEntry, AnalysisResult, RedFlag, AssessmentResult } from './types';

// Red flag detection patterns
const RED_FLAG_PATTERNS = {
  gaslighting: {
    keywords: [
      'you\'re too sensitive', 'you\'re overreacting', 'that never happened',
      'you\'re imagining things', 'you\'re crazy', 'i never said that',
      'you\'re being dramatic', 'you\'re making things up', 'you always do this'
    ],
    category: 'emotional-manipulation',
    severity: 'severe' as const
  },
  isolation: {
    keywords: [
      'don\'t talk to', 'i don\'t want you seeing', 'your friends are bad',
      'choose between', 'it\'s me or them', 'you spend too much time with',
      'they\'re trying to break us up', 'i don\'t like when you', 'stop seeing'
    ],
    category: 'control',
    severity: 'severe' as const
  },
  loveBombing: {
    keywords: [
      'i can\'t live without you', 'you\'re my everything', 'we\'re soulmates',
      'i\'ve never felt this way', 'marry me', 'move in together', 'perfect',
      'obsessed with you', 'think about you constantly'
    ],
    category: 'manipulation',
    severity: 'moderate' as const
  },
  jealousy: {
    keywords: [
      'who were you talking to', 'who texted you', 'let me see your phone',
      'why are you dressed like that', 'were you flirting', 'suspicious',
      'don\'t trust you', 'checking up on you', 'where were you', 'prove it'
    ],
    category: 'control',
    severity: 'moderate' as const
  },
  financialControl: {
    keywords: [
      'give me your money', 'you can\'t afford', 'i control the finances',
      'you don\'t need money', 'quit your job', 'you owe me', 'pay for everything',
      'access to your account', 'you can\'t buy', 'budget for you'
    ],
    category: 'financial-abuse',
    severity: 'severe' as const
  },
  threats: {
    keywords: [
      'i\'ll hurt', 'you\'ll regret', 'i\'ll make you', 'or else', 'watch out',
      'you don\'t know what i\'m capable of', 'threaten', 'i\'ll kill', 'destroy you',
      'ruin your life', 'nobody will believe you'
    ],
    category: 'safety',
    severity: 'severe' as const
  },
  boundaryViolation: {
    keywords: [
      'you have to', 'you should', 'you need to', 'going through my phone',
      'reading my messages', 'following me', 'showing up unannounced',
      'won\'t take no', 'you belong to me', 'property', 'obligation'
    ],
    category: 'boundaries',
    severity: 'moderate' as const
  },
  publicHumiliation: {
    keywords: [
      'in front of everyone', 'embarrassed me', 'made fun of', 'humiliated',
      'laughed at me', 'mocked me', 'put me down', 'belittled me',
      'insulted me publicly', 'called me names'
    ],
    category: 'emotional-abuse',
    severity: 'moderate' as const
  },
  blameShifting: {
    keywords: [
      'it\'s your fault', 'you made me', 'because of you', 'you caused this',
      'if you hadn\'t', 'you\'re responsible for', 'blame you', 'your problem',
      'wouldn\'t have to if', 'forced me to'
    ],
    category: 'emotional-manipulation',
    severity: 'moderate' as const
  },
  inconsistency: {
    keywords: [
      'hot and cold', 'one minute', 'then suddenly', 'mood swings',
      'unpredictable', 'never know', 'changes so fast', 'dr jekyll mr hyde',
      'loving then distant', 'push and pull'
    ],
    category: 'emotional-manipulation',
    severity: 'mild' as const
  }
};

// Workplace-specific patterns
const WORKPLACE_PATTERNS = {
  micromanagement: {
    keywords: [
      'controls everything', 'watches constantly', 'questions every decision',
      'won\'t let me', 'hovering', 'micromanaging', 'no autonomy', 'no trust'
    ],
    category: 'workplace-control',
    severity: 'moderate' as const
  },
  bullying: {
    keywords: [
      'yells at me', 'screams', 'aggressive', 'intimidating', 'hostile environment',
      'picks on me', 'targets me', 'singled out', 'belittles my work'
    ],
    category: 'workplace-abuse',
    severity: 'severe' as const
  },
  boundary: {
    keywords: [
      'texts after hours', 'weekends', 'vacation', 'always available',
      'no work-life balance', 'expected to respond', 'guilt about leaving'
    ],
    category: 'workplace-boundaries',
    severity: 'moderate' as const
  }
};

export function analyzeJournalEntry(entry: JournalEntry): AnalysisResult {
  const content = entry.content.toLowerCase();
  const flags: RedFlag[] = [];
  const concerns: string[] = [];
  const suggestions: string[] = [];

  // Detect red flags based on patterns
  const allPatterns = entry.context === 'workplace' 
    ? { ...RED_FLAG_PATTERNS, ...WORKPLACE_PATTERNS }
    : RED_FLAG_PATTERNS;

  for (const [flagType, pattern] of Object.entries(allPatterns)) {
    const matches = pattern.keywords.filter(keyword => 
      content.includes(keyword.toLowerCase())
    );

    if (matches.length > 0) {
      flags.push({
        type: flagType,
        category: pattern.category,
        confidence: Math.min(0.95, 0.6 + (matches.length * 0.1)),
        evidence: matches,
        description: getRedFlagDescription(flagType),
        severity: pattern.severity
      });
    }
  }

  // Sentiment analysis (basic)
  const sentiment = analyzeSentiment(content);

  // Determine overall severity
  let severity: 'low' | 'moderate' | 'high' | 'critical' = 'low';
  const severeFlags = flags.filter(f => f.severity === 'severe');
  const moderateFlags = flags.filter(f => f.severity === 'moderate');

  if (severeFlags.length >= 2 || flags.length >= 5) {
    severity = 'critical';
  } else if (severeFlags.length >= 1 || flags.length >= 3) {
    severity = 'high';
  } else if (moderateFlags.length >= 2 || flags.length >= 2) {
    severity = 'moderate';
  }

  // Generate concerns and suggestions
  if (flags.length > 0) {
    concerns.push(`Detected ${flags.length} warning sign${flags.length > 1 ? 's' : ''} in this entry`);
    
    if (severeFlags.length > 0) {
      concerns.push('Some behaviors detected are potentially serious');
    }
    
    if (flags.some(f => f.category === 'safety')) {
      concerns.push('Safety-related concerns identified');
      suggestions.push('Consider reaching out to a trusted friend or professional');
      suggestions.push('Review safety planning resources in the Library');
    }
    
    if (flags.some(f => f.category === 'emotional-manipulation')) {
      suggestions.push('Learn more about manipulation tactics in the Library');
      suggestions.push('Keep documenting these incidents for pattern analysis');
    }
    
    if (flags.some(f => f.category === 'control')) {
      suggestions.push('Consider setting or reinforcing personal boundaries');
      suggestions.push('Reflect on your autonomy and independence');
    }
  } else {
    if (sentiment < -0.3) {
      concerns.push('This entry reflects negative emotions');
      suggestions.push('Practice self-care and reach out for support if needed');
    } else if (sentiment > 0.3) {
      suggestions.push('Positive moments matter - keep noting what goes well');
    }
  }

  return {
    flags,
    sentiment,
    concerns,
    suggestions,
    severity
  };
}

export function analyzeOverallHealth(entries: JournalEntry[]): { score: number; trend: string } {
  if (entries.length === 0) return { score: 75, trend: 'neutral' };

  const recentEntries = entries.slice(0, 30); // Last 30 entries
  let totalScore = 100;

  // Deduct based on red flags
  const totalFlags = recentEntries.reduce((sum, e) => 
    sum + (e.analysis?.flags?.length || 0), 0
  );
  totalScore -= totalFlags * 3;

  // Deduct based on severity
  const severeFlags = recentEntries.reduce((sum, e) => 
    sum + (e.analysis?.flags?.filter(f => f.severity === 'severe').length || 0), 0
  );
  totalScore -= severeFlags * 5;

  // Adjust based on mood
  const avgMood = recentEntries.reduce((sum, e) => sum + e.mood, 0) / recentEntries.length;
  totalScore += (avgMood - 3) * 5; // Mood is 1-5, 3 is neutral

  // Ensure score is between 0-100
  const score = Math.max(0, Math.min(100, totalScore));

  // Determine trend
  let trend = 'neutral';
  if (recentEntries.length >= 10) {
    const firstHalf = recentEntries.slice(5, 10);
    const secondHalf = recentEntries.slice(0, 5);
    
    const firstFlags = firstHalf.reduce((sum, e) => sum + (e.analysis?.flags?.length || 0), 0);
    const secondFlags = secondHalf.reduce((sum, e) => sum + (e.analysis?.flags?.length || 0), 0);
    
    if (secondFlags < firstFlags - 2) trend = 'improving';
    else if (secondFlags > firstFlags + 2) trend = 'declining';
  }

  return { score, trend };
}

export function assessRelationship(answers: Record<string, number>): AssessmentResult {
  // Calculate dimension scores (0-100)
  const dimensions = {
    trust: calculateDimensionScore(answers, ['trust1', 'trust2', 'trust3']),
    communication: calculateDimensionScore(answers, ['comm1', 'comm2', 'comm3']),
    respect: calculateDimensionScore(answers, ['respect1', 'respect2', 'respect3']),
    independence: calculateDimensionScore(answers, ['indep1', 'indep2', 'indep3']),
    safety: calculateDimensionScore(answers, ['safety1', 'safety2', 'safety3']),
    emotional: calculateDimensionScore(answers, ['emotion1', 'emotion2', 'emotion3'])
  };

  const overallScore = Object.values(dimensions).reduce((a, b) => a + b, 0) / 6;

  // Identify top concerns
  const topConcerns: string[] = [];
  const recommendations: string[] = [];

  if (dimensions.safety < 50) {
    topConcerns.push('Safety & Security');
    recommendations.push('Your safety is paramount. Consider creating a safety plan.');
  }
  if (dimensions.respect < 50) {
    topConcerns.push('Respect & Dignity');
    recommendations.push('Everyone deserves respect. Review healthy relationship standards.');
  }
  if (dimensions.trust < 50) {
    topConcerns.push('Trust Issues');
    recommendations.push('Trust is foundational. Reflect on what is eroding trust.');
  }
  if (dimensions.independence < 50) {
    topConcerns.push('Independence & Autonomy');
    recommendations.push('Healthy relationships allow personal growth and independence.');
  }
  if (dimensions.communication < 50) {
    topConcerns.push('Communication Breakdown');
    recommendations.push('Open, honest communication is essential. Consider couples counseling.');
  }

  if (recommendations.length === 0) {
    recommendations.push('Overall, your relationship shows healthy signs.');
    recommendations.push('Continue monitoring and maintaining open communication.');
  }

  return {
    overallScore,
    dimensions,
    topConcerns,
    recommendations
  };
}

// Helper functions
function analyzeSentiment(text: string): number {
  const positiveWords = ['happy', 'joy', 'love', 'wonderful', 'great', 'good', 'better', 'calm', 'peace', 'safe', 'comfort', 'grateful'];
  const negativeWords = ['sad', 'angry', 'hurt', 'pain', 'afraid', 'scared', 'worried', 'anxious', 'upset', 'frustrated', 'terrible', 'horrible', 'hate', 'crying', 'lonely'];

  const words = text.toLowerCase().split(/\s+/);
  let score = 0;

  words.forEach(word => {
    if (positiveWords.includes(word)) score += 0.1;
    if (negativeWords.includes(word)) score -= 0.1;
  });

  return Math.max(-1, Math.min(1, score));
}

function getRedFlagDescription(flagType: string): string {
  const descriptions: Record<string, string> = {
    gaslighting: 'Manipulation tactic making you question your reality or memory',
    isolation: 'Attempts to cut you off from friends, family, or support systems',
    loveBombing: 'Excessive affection and attention early on, often to manipulate',
    jealousy: 'Extreme possessiveness and controlling behavior disguised as love',
    financialControl: 'Controlling access to money or financial independence',
    threats: 'Using intimidation or threats to control behavior',
    boundaryViolation: 'Repeatedly ignoring or disrespecting personal boundaries',
    publicHumiliation: 'Deliberately embarrassing or belittling you in front of others',
    blameShifting: 'Refusing to take responsibility and blaming you instead',
    inconsistency: 'Unpredictable behavior creating confusion and instability',
    micromanagement: 'Excessive control over work tasks and decisions',
    bullying: 'Aggressive, hostile, or intimidating workplace behavior',
    boundary: 'Violating work-life boundaries and personal time'
  };
  
  return descriptions[flagType] || 'Concerning behavioral pattern detected';
}

function calculateDimensionScore(answers: Record<string, number>, keys: string[]): number {
  const relevantAnswers = keys.map(k => answers[k]).filter(v => v !== undefined);
  if (relevantAnswers.length === 0) return 50;
  
  const avg = relevantAnswers.reduce((a, b) => a + b, 0) / relevantAnswers.length;
  return avg * 20; // Convert 1-5 scale to 0-100
}

// AI Chatbot responses
export function generateAIResponse(userMessage: string, context: JournalEntry[]): string {
  const message = userMessage.toLowerCase();
  
  // Analyze user's recent patterns from journal entries
  const recentFlags = context.slice(0, 10).flatMap(e => e.analysis?.flags || []);
  const flagTypes = new Set(recentFlags.map(f => f.type));
  const relationshipTypes = new Set(context.slice(0, 5).map(e => e.relationshipType));
  const avgMood = context.length > 0 
    ? context.slice(0, 10).reduce((sum, e) => sum + e.mood, 0) / Math.min(10, context.length)
    : 3;
  const totalEntries = context.length;
  const severeFlags = recentFlags.filter(f => f.severity === 'severe');
  
  // Get most recent entry details for context
  const latestEntry = context[0];
  const latestRelType = latestEntry?.relationshipType;
  
  // MANIPULATION - catch all manipulation-related queries
  if (message.includes('manipulat') || message.includes('controlling me') || message.includes('twist') ||
      message.includes('guilt trip') || message.includes('playing games')) {
    const hasManipulationPattern = flagTypes.has('gaslighting') || flagTypes.has('blameShifting') || flagTypes.has('loveBombing');
    const relationshipContext = latestRelType ? ` in your ${latestRelType} relationship` : '';
    
    let response = `I hear you, and I want to validate what you're feeling - if you think you're being manipulated${relationshipContext}, that instinct is worth paying attention to. Your gut is often picking up on things your conscious mind is still processing.\n\n`;
    
    if (hasManipulationPattern && totalEntries > 3) {
      response += `I've been looking at your logged moments, and honestly, I'm seeing some patterns that support what you're feeling. You've documented behaviors that fit classic manipulation tactics. `;
      if (flagTypes.has('gaslighting')) response += `Especially gaslighting - making you doubt your own perception of reality. `;
      if (flagTypes.has('blameShifting')) response += `And blame-shifting - turning things around so you feel responsible for their behavior. `;
      response += `\n\nThe fact that you're questioning yourself? That's actually common when someone's been manipulated. They've trained you to doubt your own judgment.\n\n`;
    } else {
      response += `Manipulation can be hard to identify because it's subtle and gradual. `;
    }
    
    response += `Here's what manipulation often looks like:\n\n`;
    response += `• **They twist your words** - you say one thing, they claim you meant something else\n`;
    response += `• **Guilt is their weapon** - "After all I've done for you..." "You're so selfish..."\n`;
    response += `• **Moving goalposts** - you meet their demands, but it's never enough\n`;
    response += `• **They play victim** - somehow YOU end up apologizing when THEY hurt you\n`;
    response += `• **Hot and cold** - keeping you off-balance, never knowing which version of them you'll get\n\n`;
    
    response += `Can you give me a specific example of something that happened recently that made you feel manipulated? Sometimes talking through a concrete situation helps clarify what's really going on.`;
    
    return response;
  }
  
  // GASLIGHTING - more conversational and validating
  if (message.includes('gaslighting') || message.includes('crazy') || message.includes('imagining') || 
      message.includes('overreacting') || message.includes('sensitive') || message.includes('deny') ||
      message.includes('didn\'t happen') || message.includes('never said')) {
    const hasGaslightingPattern = flagTypes.has('gaslighting');
    
    let response = `Okay, so gaslighting is one of the most insidious forms of manipulation because it attacks your sense of reality itself. `;
    
    if (message.includes('am i')) {
      response = `First - the fact that you're asking "am I being gaslighted?" is often a sign that you ARE. People in healthy relationships don't constantly question their own sanity or memory.\n\n`;
    }
    
    if (hasGaslightingPattern && totalEntries > 2) {
      response += `I've reviewed your logged moments, and I'm concerned. You've documented multiple instances where someone made you doubt yourself, denied things they said, or called you "too sensitive." That's a pattern, not a coincidence.\n\n`;
      response += `Here's the thing about gaslighting: it's designed to make you question whether it's even happening. That's the whole point. So if you're thinking "maybe I AM overreacting, maybe it's not that bad" - that's actually evidence of how well it's working.\n\n`;
    } else {
      response += `Let me be clear about what gaslighting looks like:\n\n`;
    }
    
    response += `**Common gaslighting phrases:**\n`;
    response += `• "That never happened" (when it definitely did)\n`;
    response += `• "You're too sensitive" (invalidating your emotions)\n`;
    response += `• "You're imagining things" (denying your reality)\n`;
    response += `• "I never said that" (when you clearly remember it)\n`;
    response += `• "You're crazy/paranoid" (making you doubt your sanity)\n`;
    response += `• "Everyone thinks you're..." (isolation tactic)\n\n`;
    
    response += `**What makes it so damaging:** It's not just disagreement. It's systematic denial of your reality to gain power over you. Over time, you stop trusting yourself and become dependent on them to tell you what's "real."\n\n`;
    
    if (totalEntries > 0) {
      response += `Your journal is actually your best defense - it's a record of reality that can't be gaslit away. Keep writing everything down, with dates. `;
    }
    
    response += `What specific things have they said or done that made you feel this way?`;
    
    return response;
  }
  
  // Safety concerns - HIGHEST PRIORITY - more urgent and direct
  if (message.includes('hurt me') || message.includes('scared') || message.includes('afraid') || 
      message.includes('danger') || message.includes('hit') || message.includes('violence') || 
      message.includes('physical') || message.includes('threaten')) {
    
    let response = `I need you to hear this: **your safety comes first, above everything else.** `;
    
    if (message.includes('hit') || message.includes('hurt me') || message.includes('violence')) {
      response += `Physical violence is NEVER okay. Not once. Not "just this time." Not "because I provoked them." Never.\n\n`;
    }
    
    if (severeFlags.length > 0 && totalEntries > 3) {
      response += `Looking at your logged moments, I'm genuinely worried about you. I see severe warning signs, and I need you to take this seriously. `;
    }
    
    response += `If you're in immediate danger RIGHT NOW:\n`;
    response += `• **Call 911** - get to safety first\n`;
    response += `• Go to a public place\n`;
    response += `• Tell someone you trust what's happening\n\n`;
    
    response += `**National Resources (available 24/7):**\n`;
    response += `• Domestic Violence Hotline: **1-800-799-7233**\n`;
    response += `• Text "START" to **88788**\n`;
    response += `• Online chat: thehotline.org\n\n`;
    
    response += `I know leaving or getting help feels impossibly hard. You might be thinking about reasons to stay, or that it's not "bad enough yet." But abuse escalates. It doesn't get better on its own.\n\n`;
    
    response += `Would you like help creating a safety plan? It's a practical set of steps to prepare - where to go, what to bring, who to call. Even if you're not ready to leave now, having a plan means you're ready when you are.`;
    
    return response;
  }
  
  // Isolation concerns - more empathetic and practical
  if (message.includes('friends') || message.includes('family') || message.includes('alone') || 
      message.includes('isolated') || message.includes('don\'t talk') || message.includes('no one')) {
    
    let response = '';
    
    if (message.includes('alone') || message.includes('isolated') || message.includes('no one')) {
      response = `Feeling alone and cut off is one of the most painful parts of being in an unhealthy relationship. And I want you to know - it's not an accident. Isolation is a deliberate tactic.\n\n`;
    }
    
    const relationshipContext = relationshipTypes.size > 0 
      ? `I see you're dealing with this across ${Array.from(relationshipTypes).join(' and ')} relationships. `
      : '';
    
    response += `${relationshipContext}Here's what's happening: **Abusers isolate their targets because it increases control and reduces accountability.** When you don't have friends or family to talk to, you can't reality-check what's happening. You can't hear "that's not normal" or "you deserve better."\n\n`;
    
    response += `**How isolation happens:**\n`;
    response += `• Starting fights before you're supposed to see friends\n`;
    response += `• "Your friends don't really care about you like I do"\n`;
    response += `• Making you choose: "It's them or me"\n`;
    response += `• Criticizing people you're close to\n`;
    response += `• Checking your phone, questioning who you talk to\n`;
    response += `• Pouting or giving silent treatment when you make plans\n`;
    response += `• Slowly, gradually, making it "not worth the drama" to see anyone\n\n`;
    
    if (flagTypes.has('isolation')) {
      response += `I can see in your moments that you've logged isolation tactics. This is serious. Your support system isn't just nice to have - it's essential for your safety and wellbeing.\n\n`;
    }
    
    response += `**What you can do:**\n`;
    response += `• Reach out to ONE person you trust, even if it's been a while\n`;
    response += `• Be honest: "I've been pulled away, but I need connection"\n`;
    response += `• Don't give up on relationships, even when it's hard\n`;
    response += `• If you can't see people in person, text, call, video chat\n\n`;
    
    response += `Who in your life do you miss? Or who made you feel safe before this relationship took over?`;
    
    return response;
  }
  
  // Should I leave? - deeply personalized
  if (message.includes('should i leave') || message.includes('should i stay') || 
      message.includes('break up') || message.includes('end it') || message.includes('divorce')) {
    
    let response = `This is probably the hardest question you're facing right now, and I wish I could give you a simple answer. But the truth is, only you can make this decision. What I can do is help you think through it clearly.\n\n`;
    
    // Mood-based insight
    if (avgMood < 2.5 && totalEntries > 5) {
      response += `Looking at your mood patterns over your ${totalEntries} logged moments - you're consistently reporting low moods. This relationship is draining you. That matters.\n\n`;
    }
    
    // Flag-based insight
    if (recentFlags.length > 5) {
      response += `In your last 10 moments alone, you've documented ${recentFlags.length} red flag behaviors. `;
      if (severeFlags.length > 0) {
        response += `${severeFlags.length} of those are severe - meaning they're potential safety concerns. `;
      }
      response += `When you step back and look at that objectively, what does that tell you?\n\n`;
    }
    
    response += `**Questions to sit with honestly:**\n\n`;
    response += `1. **If your best friend described this relationship to you, what would you tell them?** (We're often clearer about others' situations than our own)\n\n`;
    response += `2. **What would have to change for you to feel safe/happy?** Then ask: Is that realistic? Has it changed before, and did it last?\n\n`;
    response += `3. **Are you staying because of love, or because of fear?** (Fear of being alone, fear of their reaction, fear of change - those aren't reasons to stay)\n\n`;
    response += `4. **Can you imagine your life in 5 years if nothing changes?** How does that feel?\n\n`;
    response += `5. **Do you feel like yourself in this relationship?** Or like you're constantly walking on eggshells?\n\n`;
    
    response += `**Hard truths:**\n`;
    response += `• "They'll change" - people can change, but they have to want to, consistently, with professional help. Words aren't enough.\n`;
    response += `• "I love them" - love isn't enough if you're not safe, respected, and free to be yourself\n`;
    response += `• "But the good times" - the pattern matters more than the peaks\n`;
    response += `• "I've invested so much" - sunk cost fallacy. Your future matters more than your past.\n\n`;
    
    response += `You don't have to decide everything today. But please know: wanting to leave is valid. Being unsure is normal. And leaving is possible, even when it feels impossible.\n\n`;
    
    response += `What's making this decision feel most complicated for you right now?`;
    
    return response;
  }
  
  // Boundaries - actionable and empowering
  if (message.includes('boundary') || message.includes('boundaries') || message.includes('say no') ||
      message.includes('respect') || message.includes('stand up')) {
    
    let response = `Boundaries are basically the rules for how you allow people to treat you. And here's what's crucial to understand: **you have the absolute right to set them, and healthy people will respect them.**\n\n`;
    
    if (flagTypes.has('boundaryViolation')) {
      response += `I can see from your moments that you've experienced boundary violations. That tells me you're dealing with someone who either doesn't understand boundaries or, more likely, doesn't care about yours. That's a red flag in itself.\n\n`;
    }
    
    response += `**You are allowed to:**\n`;
    response += `• Say no without explaining why\n`;
    response += `• Have privacy (phone, space, time alone)\n`;
    response += `• Make decisions about your own body, money, time\n`;
    response += `• Have friendships and interests outside the relationship\n`;
    response += `• Change your mind\n`;
    response += `• End conversations that feel disrespectful\n\n`;
    
    response += `**How to set a boundary (template):**\n`;
    response += `"When you [specific behavior], I feel [emotion]. I need [what you want]. If that continues, I will [consequence]."\n\n`;
    response += `Example: "When you raise your voice at me, I feel disrespected. I need you to speak calmly. If you continue yelling, I will leave the room."\n\n`;
    
    response += `**Then - and this is critical - follow through.** A boundary without enforcement is just a suggestion.\n\n`;
    
    response += `**Warning signs the relationship is unhealthy:**\n`;
    response += `If setting boundaries leads to:\n`;
    response += `• Anger, rage, punishment\n`;
    response += `• You being called "controlling," "demanding," or "difficult"\n`;
    response += `• Guilt trips ("I guess I can't do anything right")\n`;
    response += `• Immediate violation of the boundary to test you\n`;
    response += `• Escalation or retaliation\n\n`;
    
    response += `...then you're not dealing with someone who respects you. You're dealing with someone who wants control.\n\n`;
    
    response += `What boundary do you most need to set right now? Let's work through exactly how to communicate it.`;
    
    return response;
  }
  
  // Pattern recognition - with data insights
  if (message.includes('pattern') || message.includes('happens again') || message.includes('always') ||
      message.includes('cycle') || message.includes('repeated')) {
    const topFlags = recentFlags.slice(0, 5);
    const patternInsight = topFlags.length > 0
      ? `\n\n📈 Looking at your recent moments, I see patterns of: ${Array.from(new Set(topFlags.map(f => f.type))).join(', ')}. This repetition is significant - it's not random or coincidental.`
      : "";
    return `Recognizing patterns is a crucial breakthrough. Single incidents can be mistakes; repeated patterns reveal character and true intentions.${patternInsight}\n\n🔄 Common toxic patterns:\n\n**The Cycle of Abuse:**\n1. Tension building\n2. Incident (blow-up)\n3. Reconciliation ("I'm sorry")\n4. Calm period (honeymoon phase)\n...then it repeats, often escalating\n\n**Why patterns matter:**\n• They predict future behavior better than promises\n• They show what someone does when comfortable\n• They reveal whether change is real or temporary\n\n💡 If you've had the "same fight" multiple times, or heard "I'll change" repeatedly without lasting change, that IS the pattern.\n\nYour journal is helping you see these patterns clearly. What pattern concerns you most?`;
  }
  
  // Confusion and doubt
  if (message.includes('confused') || message.includes('don\'t know') || message.includes('not sure') ||
      message.includes('doubt') || message.includes('unclear')) {
    let response = `Confusion is actually a really common response to being in an unhealthy dynamic. When someone's manipulating you, keeping you confused is part of the strategy - it makes you easier to control.\n\n`;
    
    if (totalEntries > 5) {
      response += `You've logged ${totalEntries} moments, which shows you're trying to make sense of what's happening. That's good - you're gathering data. `;
      
      if (avgMood < 3) {
        response += `Your mood scores suggest this is taking a real toll on you. `;
      }
    }
    
    response += `\nSome questions that might help clarify:\n\n`;
    response += `• When you imagine telling a trusted friend about this situation, what do you think they'd say?\n`;
    response += `• Are you confused because the situation is complex, or because someone is giving you contradictory information?\n`;
    response += `• Do you feel confused about what happened, or confused about whether your reaction is valid?\n`;
    response += `• Does this confusion go away when you're not around this person?\n\n`;
    
    response += `Sometimes "confusion" is actually **clarity that we're not ready to accept yet.** Your gut might already know the answer, but your heart isn't ready to hear it. And that's okay - healing isn't linear.\n\n`;
    
    response += `What specifically are you feeling most confused about?`;
    
    return response;
  }
  
  // Narcissism and personality disorders
  if (message.includes('narcis') || message.includes('sociopath') || message.includes('psychopath') ||
      message.includes('personality disorder')) {
    let response = `I can't diagnose anyone - that requires a trained professional. But I can tell you about narcissistic behaviors and why they're so damaging.\n\n`;
    
    response += `**Common narcissistic traits in relationships:**\n`;
    response += `• Lack of empathy for your feelings\n`;
    response += `• Everything revolves around them\n`;
    response += `• They're never genuinely wrong (or apologies are superficial)\n`;
    response += `• Gaslighting and reality distortion\n`;
    response += `• You're either idealized (love-bombing) or devalued\n`;
    response += `• They need constant admiration\n`;
    response += `• Exploitative - use people as tools\n`;
    response += `• Jealous and controlling\n\n`;
    
    response += `**Here's what matters more than a label:** How do they make you feel? Do you feel:\n`;
    response += `• Like you're walking on eggshells?\n`;
    response += `• Constantly second-guessing yourself?\n`;
    response += `• Drained, anxious, or depressed?\n`;
    response += `• Like nothing you do is ever good enough?\n\n`;
    
    if (flagTypes.has('gaslighting') || flagTypes.has('blameShifting')) {
      response += `I see gaslighting and blame-shifting in your logged moments - both are hallmark narcissistic tactics. `;
    }
    
    response += `\n**Important reality check:** Whether or not they have NPD, if the relationship is harming you, that's what matters. You can't fix, change, or love someone into being healthy. Narcissists rarely change because they don't believe anything is wrong with them.\n\n`;
    
    response += `What behaviors are you seeing that made you think about narcissism?`;
    
    return response;
  }
  
  // Emotional abuse
  if (message.includes('emotional abuse') || message.includes('emotionally abusive') || 
      message.includes('verbal abuse') || message.includes('psychological')) {
    let response = `Emotional abuse is just as damaging as physical abuse - sometimes more so, because it's invisible and people minimize it. You don't need bruises for it to be real abuse.\n\n`;
    
    if (totalEntries > 3 && (flagTypes.has('gaslighting') || flagTypes.has('publicHumiliation') || flagTypes.has('blameShifting'))) {
      response += `Looking at what you've logged, I want to be direct with you: I see signs of emotional abuse. Gaslighting, humiliation, blame-shifting - these aren't "communication problems." They're abuse tactics.\n\n`;
    }
    
    response += `**Forms of emotional abuse:**\n`;
    response += `• **Gaslighting** - making you doubt reality\n`;
    response += `• **Verbal attacks** - insults, name-calling, cruel "jokes"\n`;
    response += `• **Isolation** - cutting you off from support\n`;
    response += `• **Humiliation** - public or private\n`;
    response += `• **Control** - over your choices, appearance, relationships\n`;
    response += `• **Blame-shifting** - nothing is ever their fault\n`;
    response += `• **Withholding** - affection, communication, resources\n`;
    response += `• **Intimidation** - threats, aggressive behavior\n\n`;
    
    response += `**Why it's so confusing:** Abusers aren't abusive 24/7. There are good moments, apologies, promises. That's the cycle. The good times keep you hooked; the bad times erode your self-worth until you believe you can't do better.\n\n`;
    
    response += `**You might be experiencing emotional abuse if:**\n`;
    response += `• You're anxious about their reactions\n`;
    response += `• You modify your behavior to avoid setting them off\n`;
    response += `• You feel like you can't do anything right\n`;
    response += `• Your self-esteem has tanked\n`;
    response += `• You're isolated from friends/family\n`;
    response += `• You make excuses for their behavior\n\n`;
    
    response += `This isn't your fault. Abuse is a choice the abuser makes. You can't fix them or love them into changing.\n\n`;
    
    response += `How long has this been going on?`;
    
    return response;
  }
  
  // Love and hope (conflicted feelings)
  if (message.includes('but i love') || message.includes('still love') || message.includes('care about')) {
    let response = `I hear you. Love makes this so much harder. If you didn't love them, you'd have left already, right? But here's something important to understand:\n\n`;
    
    response += `**Love is not enough.**\n\n`;
    
    response += `You also need:\n`;
    response += `• Safety (physical and emotional)\n`;
    response += `• Respect\n`;
    response += `• Trust\n`;
    response += `• Reciprocity (they love you back in healthy ways)\n`;
    response += `• The freedom to be yourself\n`;
    response += `• Growth, not diminishment\n\n`;
    
    response += `Loving someone who hurts you is one of the most painful experiences. But your love for them doesn't obligate you to accept mistreatment. **You can love someone and still leave.**\n\n`;
    
    if (totalEntries > 5 && avgMood < 3) {
      response += `I've been looking at your moments. Despite your love for them, you're not happy. Your mood scores show it. Love shouldn't cost you your peace, safety, or sense of self.\n\n`;
    }
    
    response += `**Ask yourself:**\n`;
    response += `• Does this person love YOU, or the version of you that serves them?\n`;
    response += `• Would you want someone you love to stay in a relationship like this?\n`;
    response += `• Are you holding onto who they were, or who they are now?\n`;
    response += `• Is your love for them greater than your love for yourself?\n\n`;
    
    response += `You can honor your love for them while also honoring your need for a healthy, safe life. Those things aren't mutually exclusive.\n\n`;
    
    response += `What would need to change for you to feel loved back in the way you deserve?`;
    
    return response;
  }
  
  // Fear of leaving or being alone
  if (message.includes('what if i can\'t') || message.includes('afraid to leave') || 
      message.includes('can\'t do it') || message.includes('too scared')) {
    let response = `Fear is completely normal. Leaving is terrifying - it's the unknown. What you have now might be painful, but it's familiar. Our brains prefer familiar pain over uncertain change.\n\n`;
    
    response += `**Common fears about leaving:**\n\n`;
    response += `• **"I'll be alone forever"** - Being alone is better than being with someone who hurts you. And you won't be alone forever. You'll heal, and you'll be available for a healthy relationship.\n\n`;
    response += `• **"I can't survive without them"** - Yes, you can. You're stronger than you know. People leave impossible situations every day and not only survive, but thrive.\n\n`;
    response += `• **"What if I'm making a mistake?"** - Staying with someone who mistreats you is the mistake. Trust yourself.\n\n`;
    response += `• **"What if they change after I leave?"** - If they were capable of real change, they'd do it while you're together. Don't sacrifice your wellbeing for a hypothetical.\n\n`;
    response += `• **"No one else will want me"** - This is what they want you to believe. It's not true. Your worth isn't determined by whether they value you.\n\n`;
    
    response += `**Here's what I know:** The fear before leaving is worse than the reality after. Ask anyone who's left an unhealthy relationship - they'll tell you their only regret is not doing it sooner.\n\n`;
    
    if (totalEntries > 5) {
      response += `You've logged ${totalEntries} moments. You're already building evidence, documenting patterns. Some part of you knows this isn't sustainable. Trust that part.\n\n`;
    }
    
    response += `You don't have to do everything at once. Start with one small step. Maybe that's talking to one friend, or calling a hotline, or just acknowledging to yourself that you deserve better.\n\n`;
    
    response += `What feels like the biggest obstacle to leaving right now?`;
    
    return response;
  }
  
  // EXHAUSTION & TIREDNESS - emotional fatigue
  if (message.includes('tired') || message.includes('exhausted') || message.includes('drained') ||
      message.includes('worn out') || message.includes('can\'t anymore') || message.includes('giving up')) {
    let response = `I hear the exhaustion in your words. Being in a difficult relationship is emotionally draining - it's like running a marathon every single day with no finish line in sight.\n\n`;
    
    if (avgMood < 3 && totalEntries > 3) {
      response += `Your mood scores reflect this exhaustion. You've been carrying this weight for a while now. `;
    }
    
    response += `**What relationship exhaustion feels like:**\n`;
    response += `• Constantly walking on eggshells\n`;
    response += `• Never being able to fully relax\n`;
    response += `• Everything feels like a negotiation or battle\n`;
    response += `• You're depleted but keep trying to "fix" things\n`;
    response += `• Even good days feel temporary\n\n`;
    
    response += `**This tiredness is telling you something.** Your body and mind are signaling that this situation is unsustainable. That's not weakness - it's wisdom.\n\n`;
    
    if (flagTypes.size > 0) {
      response += `Looking at your moments, you're dealing with ${Array.from(flagTypes).slice(0, 3).join(', ')}. No wonder you're exhausted - you're constantly managing toxic behavior. That's not a relationship; that's emotional labor.\n\n`;
    }
    
    response += `It's okay to be tired. It's okay to not have energy to fight anymore. And it's okay if "tired" is what finally makes you prioritize yourself.\n\n`;
    
    response += `What would rest look like for you right now? Not just sleep, but real peace?`;
    
    return response;
  }
  
  // BETRAYAL & FEELING CHEATED/LIED TO
  if (message.includes('cheat') || message.includes('lied') || message.includes('betray') ||
      message.includes('deceiv') || message.includes('unfaithful') || message.includes('lie to me') || message.includes('dishon')) {
    let response = `Betrayal cuts deep because it shatters the foundation of trust. Whether it's infidelity, lies, or broken promises, the pain is real and valid.\n\n`;
    
    if (flagTypes.has('gaslighting')) {
      response += `I notice you've logged gaslighting behaviors. Sometimes the betrayal isn't just what they did - it's how they lie about it afterward, making you doubt your own reality. That's a double betrayal.\n\n`;
    }
    
    response += `**What makes betrayal so painful:**\n`;
    response += `• It's not just about the action - it's about what it represents\n`;
    response += `• Your reality doesn't match what you were told\n`;
    response += `• You question everything: past, present, future\n`;
    response += `• The person who hurt you was supposed to be safe\n`;
    response += `• You might blame yourself (you shouldn't)\n\n`;
    
    response += `**Hard questions to consider:**\n`;
    response += `• Is this the first time, or part of a pattern?\n`;
    response += `• Are they genuinely remorseful, or sorry they got caught?\n`;
    response += `• Can you realistically rebuild trust with this person?\n`;
    response += `• Are you trying to forgive because you want to, or because you feel you should?\n\n`;
    
    response += `Trust, once broken, can be repaired - but it requires consistent, transparent action from the person who broke it. Words and apologies aren't enough.\n\n`;
    
    response += `How did you find out? And how have they responded since?`;
    
    return response;
  }
  
  // FRUSTRATION & ANGER
  if (message.includes('frustrat') || message.includes('angry') || message.includes('mad') ||
      message.includes('furious') || message.includes('rage') || message.includes('annoyed') ||
      message.includes('irritated') || message.includes('pissed')) {
    let response = `Anger is a valid and often healthy response to mistreatment. Sometimes frustration is your internal alarm system telling you something is wrong.\n\n`;
    
    if (flagTypes.has('blameShifting')) {
      response += `I see you've logged blame-shifting behaviors. That's incredibly frustrating - when someone refuses to take accountability and turns it back on you. Your anger about that is completely justified.\n\n`;
    }
    
    response += `**What your anger might be telling you:**\n`;
    response += `• Your boundaries are being violated\n`;
    response += `• You're being treated unfairly\n`;
    response += `• You're tired of the same patterns repeating\n`;
    response += `• You feel unheard or dismissed\n`;
    response += `• Your needs aren't being met\n\n`;
    
    response += `Here's what's important: **Chronic frustration in a relationship means something needs to change.** Either the relationship dynamics change, or you change your situation.\n\n`;
    
    if (totalEntries > 5) {
      response += `You've documented ${totalEntries} moments. That's ${totalEntries} times you've felt something was wrong enough to write it down. Your frustration is data.\n\n`;
    }
    
    response += `What are you most frustrated about right now? Let's break it down.`;
    
    return response;
  }
  
  // FEELING WORTHLESS/UNLOVABLE
  if (message.includes('worthless') || message.includes('unlovable') || message.includes('not good enough') ||
      message.includes('not enough') || message.includes('don\'t deserve') || message.includes('hate myself') ||
      message.includes('self-esteem') || message.includes('confidence')) {
    let response = `I need you to hear this: **What you're feeling is a result of how you've been treated, not a reflection of your worth.**\n\n`;
    
    if (flagTypes.has('publicHumiliation') || flagTypes.has('blameShifting')) {
      response += `You've logged moments of humiliation and blame-shifting. These tactics are specifically designed to erode your self-worth. They want you to feel "not good enough" because it keeps you trying to earn love you should get freely.\n\n`;
    }
    
    response += `**How toxic relationships destroy self-worth:**\n`;
    response += `• Constant criticism makes you doubt yourself\n`;
    response += `• Moving goalposts - you're never "enough"\n`;
    response += `• They take credit for your successes, blame you for failures\n`;
    response += `• Isolating you from people who remind you of your value\n`;
    response += `• "Joking" put-downs that chip away at you\n\n`;
    
    response += `**Reality check:**\n`;
    response += `• Healthy partners build you up, not tear you down\n`;
    response += `• Your worth is inherent - it's not earned or conditional\n`;
    response += `• Feeling "not good enough" often means you're with the wrong person\n`;
    response += `• You are lovable - you're just not being loved well\n\n`;
    
    if (totalEntries > 3 && avgMood < 3) {
      response += `I can see from your moments that you've been hurting. Your self-esteem has taken hit after hit. But here's the truth: removing the source of criticism is often the first step to healing.\n\n`;
    }
    
    response += `What specifically makes you feel not good enough? Let's examine whether that's true or something you've been conditioned to believe.`;
    
    return response;
  }
  
  // HOPELESSNESS & DESPAIR
  if (message.includes('hopeless') || message.includes('no point') || message.includes('give up') ||
      message.includes('nothing will change') || message.includes('stuck') || message.includes('trapped')) {
    let response = `Feeling hopeless is one of the hardest, most painful places to be. When you're in it, it feels permanent - like things will never get better. But that feeling is not the same as reality.\n\n`;
    
    if (severeFlags.length > 0) {
      response += `⚠️ I see severe warning signs in your moments. If you're feeling hopeless to the point of considering harming yourself, please call 988 (Suicide & Crisis Lifeline) right now. Your life has value, even when it doesn't feel like it.\n\n`;
    }
    
    response += `**Why hopelessness happens:**\n`;
    response += `• You've tried to fix things and nothing works\n`;
    response += `• The same patterns repeat no matter what you do\n`;
    response += `• You feel powerless to change your situation\n`;
    response += `• Isolation has cut you off from outside perspective\n`;
    response += `• Exhaustion has depleted your resilience\n\n`;
    
    response += `**But here's what I know:**\n`;
    response += `• Feeling stuck doesn't mean you ARE stuck\n`;
    response += `• You have more options than you can see right now\n`;
    response += `• Thousands of people in "impossible" situations have left and rebuilt\n`;
    response += `• This person wants you to feel hopeless - it keeps you compliant\n\n`;
    
    if (totalEntries > 5) {
      response += `You've logged ${totalEntries} moments. You're documenting, seeking understanding, reaching out for support. Those aren't the actions of someone who's given up. Part of you is still fighting.\n\n`;
    }
    
    response += `**One thing you can do today:**\n`;
    response += `• Tell ONE person what's really happening\n`;
    response += `• Research one local resource (shelter, counselor, hotline)\n`;
    response += `• Make a list of places you could go if you needed to leave\n`;
    response += `• Just sit with the possibility that change IS possible\n\n`;
    
    response += `What would need to happen for you to feel even 1% less stuck?`;
    
    return response;
  }
  
  // Self-care and coping
  if (message.includes('overwhelmed') || message.includes('anxious') || message.includes('stressed') ||
      message.includes('cope') || message.includes('help myself')) {
    return `It's completely understandable to feel overwhelmed when dealing with difficult relationships. Your wellbeing matters.\n\n🧘 Immediate coping strategies:\n\n**Grounding (5-4-3-2-1):**\n• 5 things you see\n• 4 things you can touch\n• 3 things you hear\n• 2 things you smell\n• 1 thing you taste\n\n**Quick calm-down:**\n• Box breathing: In-4, Hold-4, Out-4, Hold-4\n• Cold water on wrists/face\n• Step outside for fresh air\n• Text a trusted friend\n\n**Self-care essentials:**\n• Sleep (prioritize rest)\n• Nutrition (even small meals)\n• Movement (walk, stretch)\n• Connection (reach out)\n• Boundaries (say no to extra demands)\n\n🎯 Remember: Taking care of yourself isn't selfish - it's necessary. You can't pour from an empty cup.\n\nWhat feels most overwhelming right now?`;
  }
  
  // Progress and hope
  if (message.includes('better') || message.includes('improving') || message.includes('hopeful') ||
      message.includes('progress')) {
    const recentMoodTrend = avgMood > 3.5 ? "positive" : avgMood > 2.5 ? "mixed" : "challenging";
    return `I'm glad you're seeing some positive movement! Recognizing progress, even small steps, is important.\n\n🌱 Your recent mood trend appears ${recentMoodTrend}. Keep tracking these moments - they help you see what's working.\n\n✨ Signs of genuine progress:\n• You feel more clarity about what you need\n• Boundaries are being respected more often\n• You feel safer expressing yourself\n• The relationship adds to your life rather than draining it\n• Changes are consistent, not just temporary "good behavior"\n\n⚠️ Be cautious of:\n• Short-lived improvement after a big fight\n• Change only after threats to leave\n• "Good behavior" that doesn't last\n• Progress that requires you to shrink yourself\n\nReal change is sustained, consistent, and comes with genuine accountability. What improvements have you noticed?`;
  }
  
  // Understanding red flags (general education)
  if (message.includes('red flag') || message.includes('warning sign') || message.includes('toxic')) {
    return `Red flags are warning signs that a relationship may be unhealthy or potentially dangerous. FlagSense tracks 15+ key patterns:\n\n🚩 **Severe Red Flags** (Safety risks):\n• Gaslighting (making you doubt reality)\n• Isolation (cutting you off from support)\n• Financial control\n• Physical intimidation or threats\n• Boundary violations\n\n⚠️ **Moderate Red Flags** (Concerning patterns):\n• Jealousy and possessiveness\n• Blame-shifting\n• Public humiliation\n• Hot/cold behavior (inconsistency)\n• Love-bombing (too much, too fast)\n\n💡 **Key principle**: One red flag might be a mistake. Multiple red flags form a pattern. Patterns predict the future.\n\n📊 Your Insights tab shows which flags appear most in your relationships. The Library has detailed guides on each pattern.\n\nWhich red flag would you like to understand better?`;
  }
  
  // Default response - now more contextual
  const contextualOpening = context.length > 5
    ? `Thank you for sharing. I can see you've been actively tracking your relationship experiences - that takes courage and self-awareness.`
    : context.length > 0
    ? `Thank you for sharing. I'm here to support you as you navigate these relationship challenges.`
    : `Thank you for reaching out. I'm here to listen and provide support.`;
  
  const concernNote = recentFlags.length > 3
    ? `\n\n📊 I notice you've logged several concerning moments recently. Would you like to talk about any patterns you're seeing?`
    : avgMood < 2.5
    ? `\n\n💙 I can see this has been weighing on you. Remember, your feelings are valid.`
    : "";
  
  return `${contextualOpening}${concernNote}\n\n🗣️ I'm here to help with:\n• Understanding red flags and toxic patterns\n• Processing difficult emotions\n• Exploring your options\n• Setting boundaries\n• Safety planning\n• Recognizing manipulation tactics\n\n💭 Remember: Your feelings and experiences are valid. While I provide information and support, I'm not a substitute for professional counseling. For ongoing concerns, consider reaching out to a therapist specializing in relationship issues.\n\nWhat would be most helpful to discuss right now?`;
}