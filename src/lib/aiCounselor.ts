import type { JournalEntry, ChatMessage } from './types';

// Get random response from array to add variety
function randomResponse(options: string[]): string {
  return options[Math.floor(Math.random() * options.length)];
}

// Analyze ONLY the current user message for immediate context
function analyzeCurrentMessage(message: string) {
  const msg = message.toLowerCase().trim();
  
  return {
    // Specific people mentioned
    mentionsSister: /\bsister\b/i.test(msg),
    mentionsBrother: /\bbrother\b/i.test(msg),
    mentionsMom: /\bmom\b|\bmother\b/i.test(msg),
    mentionsDad: /\bdad\b|\bfather\b/i.test(msg),
    mentionsPartner: /partner|boyfriend|girlfriend|husband|wife|spouse|bae|significant other|s\.?o\.?/i.test(msg),
    mentionsFriend: /\bfriend\b|\bbestie\b|\bbff\b/i.test(msg),
    mentionsEx: /\bex\b|\bformer\b|broke up|split up/i.test(msg),
    mentionsCoworker: /coworker|colleague|boss|manager|work/i.test(msg),
    
    // Communication issues
    isCommunicationIssue: /communication|talk|listen|hear|understand|express|conversation|won't.*talk|don't.*talk|never.*talks|doesn't.*listen|ignores.*me|won't.*hear/i.test(msg),
    
    // Specific behaviors in THIS message
    mentionsLying: /\blie\b|\blies\b|\blied\b|\blying\b|dishonest|deceiv|untruth|fabricat/i.test(msg),
    mentionsCheating: /\bcheat|\baffair\b|unfaithful|seeing.*someone|another.*person|texting.*other|sleeping.*with/i.test(msg),
    mentionsYelling: /\byell|\bshout|\bscream|raise.*voice|screaming.*at|hollering/i.test(msg),
    mentionsManipulation: /manipulat|guilt.*trip|control|twist|plays.*with|messes.*with|uses.*me|exploit/i.test(msg),
    mentionsGaslighting: /gaslight|crazy|imagining|overreact|sensitive|dramatic|making.*it.*up|in.*your.*head|didn't.*happen|never.*said/i.test(msg),
    mentionsDisrespect: /disrespect|respect|rude|dismissive|condescending|talks.*down|treats.*like.*shit|mean|cruel/i.test(msg),
    mentionsJealousy: /jealous|possessive|paranoid|accuses.*me/i.test(msg),
    mentionsSilentTreatment: /silent.*treatment|ignor|won't.*talk.*to.*me|cold.*shoulder|shutting.*me.*out|freezing.*me.*out/i.test(msg),
    mentionsPhysical: /\bhit\b|\bpush|\bshove|physical|violence|hurt.*me|\bslap|grab|choke|threw/i.test(msg),
    mentionsControl: /control|won't.*let|forbid|not.*allowed|permission|tells.*me.*what/i.test(msg),
    mentionsCriticism: /criticize|critical|put.*down|insult|belittle|mock|makes.*fun|nothing.*right|never.*good.*enough/i.test(msg),
    mentionsBlaming: /blame|fault|always.*my.*fault|never.*their.*fault|makes.*me.*feel.*guilty/i.test(msg),
    mentionsIsolation: /isolat|keep.*me.*away|won't.*let.*me.*see|control.*who.*i.*see|separated.*from/i.test(msg),
    mentionsThreats: /threat|threaten|or.*else|leave.*you|hurt.*you|harm|kill|destroy/i.test(msg),
    mentionsFinancial: /money|financial|control.*money|won't.*let.*work|takes.*money|access.*to.*account/i.test(msg),
    mentionsStalking: /stalk|follow|shows.*up|watches.*me|tracking|gps|location/i.test(msg),
    mentionsLoveBombing: /perfect.*at.*first|amazing.*then.*changed|intense.*beginning|suddenly.*different/i.test(msg),
    mentionsBoundaries: /boundary|boundaries|said.*no|told.*them.*no|doesn't.*respect|crosses.*line/i.test(msg),
    
    // Emotions in THIS message
    expressesAnger: /\bangry\b|\bmad\b|furious|pissed|frustrated|annoyed|rage|fuck.*them|shit|hate.*them/i.test(msg),
    expressesSadness: /\bsad\b|depressed|cry|crying|unhappy|miserable|heartbroken|devastated/i.test(msg),
    expressesTiredness: /tired|exhausted|drained|worn.*out|can't.*anymore|burnt.*out|depleted|done/i.test(msg),
    expressesFear: /scared|afraid|fear|terrified|anxious|worried|nervous|panic/i.test(msg),
    expressesConfusion: /confused|don't.*know|not.*sure|unclear|lost|don't.*understand|mixed.*signals/i.test(msg),
    expressesWorthlessness: /worthless|not.*good.*enough|hate.*myself|unlovable|failure|useless|stupid|pathetic/i.test(msg),
    expressesTrapped: /trapped|stuck|no.*way.*out|can't.*leave|prisoner|cage|suffocating/i.test(msg),
    expressesLoneliness: /lonely|alone|isolated|no.*one|nobody|by.*myself/i.test(msg),
    expressesGuilt: /guilty|shame|my.*fault|bad.*person/i.test(msg),
    expressesRelief: /relief|relieved|glad|weight.*off|better|good/i.test(msg),
    expressesHope: /hope|maybe|trying|working.*on|getting.*better|improving/i.test(msg),
    expressesBetrayal: /betray|trust|backstab|used.*me|lied.*to/i.test(msg),
    
    // Actions/questions in THIS message
    askingIfShouldLeave: /should.*i.*leave|should.*i.*stay|break.*up|divorce|end.*it|worth.*staying/i.test(msg),
    askingIfNormal: /\bis.*this.*normal|am.*i.*crazy|am.*i.*overreacting|is.*this.*ok|too.*sensitive/i.test(msg),
    sayingTheyTried: /\bi.*tried|i've.*tried|tried.*to.*talk|made.*effort|attempted|keep.*trying/i.test(msg),
    sayingTheyreLeaving: /\bi'm.*leaving|i'm.*done|that's.*it|enough|breaking.*up|left.*them/i.test(msg),
    sayingTheyStayed: /stayed|staying|gave.*another.*chance|trying.*to.*work/i.test(msg),
    sayingTheyLoveThem: /\bi.*love|\bstill.*love|care.*about|feelings.*for/i.test(msg),
    askingForHelp: /help|what.*do.*i.*do|advice|suggest|tell.*me/i.test(msg),
    sharingSpecificIncident: msg.length > 100 && (/he|she|they/.test(msg)),
    
    // Tone indicators
    isVenting: /fuck|shit|hate|can't.*believe|so.*done|ridiculous|stupid/i.test(msg) && msg.length > 40,
    isQuestioning: /\?/.test(msg) || /should|could|would|can|am.*i|is.*this/i.test(msg),
    isMinimizing: /not.*that.*bad|could.*be.*worse|at.*least|just|only/i.test(msg),
    isDefensive: /but|however|to.*be.*fair|sometimes.*they're|not.*always/i.test(msg),
    isOpeningUp: msg.length > 80 && !(/\?/.test(msg)),
    
    // Message characteristics
    isShortAnswer: msg.length < 20,
    isMediumAnswer: msg.length >= 20 && msg.length < 80,
    isLongAnswer: msg.length >= 80,
    hasMultipleSentences: (msg.match(/\.|!|\?/g) || []).length > 1,
    
    // Actual message
    rawMessage: msg,
    messageLength: msg.length
  };
}

// Extract conversation history context (for patterns over time)
function extractConversationHistory(chatHistory: ChatMessage[]) {
  const allText = chatHistory.map(m => m.content.toLowerCase()).join(' ');
  const userMessages = chatHistory.filter(m => m.role === 'user').map(m => m.content.toLowerCase());
  const lastAIMessage = chatHistory.filter(m => m.role === 'assistant').slice(-1)[0]?.content || '';
  const last3UserMessages = userMessages.slice(-3).join(' ');
  
  return {
    messageCount: userMessages.length,
    totalUserWords: userMessages.join(' ').split(' ').length,
    averageMessageLength: userMessages.length > 0 
      ? userMessages.reduce((sum, msg) => sum + msg.length, 0) / userMessages.length 
      : 0,
    lastAIAskedQuestion: lastAIMessage.includes('?'),
    aiJustAskedAboutWho: /who|which|family|partner|friend/.test(lastAIMessage.toLowerCase()),
    aiJustAskedAboutWhat: /what|how|tell.*me|describe|example/.test(lastAIMessage.toLowerCase()),
    aiJustAskedAboutFeelings: /feel|feeling|emotion|affect|impact/.test(lastAIMessage.toLowerCase()),
    
    // WHO has been identified in conversation
    personIdentified: 
      /\bsister\b/i.test(allText) ? 'sister' :
      /\bbrother\b/i.test(allText) ? 'brother' :
      /\bmom\b|\bmother\b/i.test(allText) ? 'mom' :
      /\bdad\b|\bfather\b/i.test(allText) ? 'dad' :
      /boyfriend/i.test(allText) ? 'boyfriend' :
      /girlfriend/i.test(allText) ? 'girlfriend' :
      /husband/i.test(allText) ? 'husband' :
      /wife/i.test(allText) ? 'wife' :
      /partner/i.test(allText) ? 'partner' :
      /\bfriend\b/i.test(allText) ? 'friend' :
      /boss|coworker|colleague/i.test(allText) ? 'coworker' :
      /\bex\b/i.test(allText) ? 'ex' : '',
    
    relationshipType:
      /partner|boyfriend|girlfriend|husband|wife|spouse/i.test(allText) ? 'romantic' :
      /mom|dad|mother|father|sister|brother|family/i.test(allText) ? 'family' :
      /\bfriend\b/i.test(allText) ? 'friendship' :
      /boss|coworker|colleague/i.test(allText) ? 'work' :
      /\bex\b/i.test(allText) ? 'ex' : '',
    
    // WHAT issues have been discussed (cumulative)
    issuesDiscussed: {
      communication: /communication|talk|listen/i.test(allText),
      manipulation: /manipulat/i.test(allText),
      gaslighting: /gaslight/i.test(allText),
      lying: /\blie|\blying|\blied/i.test(allText),
      cheating: /\bcheat|affair/i.test(allText),
      yelling: /yell|shout|scream/i.test(allText),
      disrespect: /disrespect|respect/i.test(allText),
      control: /control|won't.*let/i.test(allText),
      jealousy: /jealous|possessive/i.test(allText),
      silent: /silent.*treatment|ignor/i.test(allText),
      physical: /\bhit|\bpush|violence/i.test(allText),
    },
    
    // What's been covered in conversation
    hasSharedSpecificExample: userMessages.some(m => m.length > 100),
    hasExpressedEmotions: /feel|feeling|makes.*me|i.*am|i'm/.test(allText),
    hasMentionedDuration: /always|years|months|weeks|days|recently|lately|started|since|long time/i.test(allText),
    hasMentionedPreviousAttempts: /tried|talked|said|told|asked|begged|explained|confronted/i.test(allText),
    hasMentionedApologies: /sorry|apologize|promise|swear|never.*again|won't.*do.*it|last.*time/i.test(allText),
    hasMentionedChildren: /kid|child|children|son|daughter|baby|pregnant/i.test(allText),
    hasMentionedFinances: /money|rent|lease|house|married|bills|job|depend/i.test(allText),
    hasMentionedSupport: /friend|family|mom|dad|sister|therapist|anyone|nobody|no.*one|alone/i.test(allText),
    
    // Conversation depth indicators
    hasGivenDetailedStory: userMessages.some(m => m.length > 150),
    userGettingMoreOpen: userMessages.length >= 3 && 
      userMessages[userMessages.length - 1].length > userMessages[0].length,
    userGettingMoreClosed: userMessages.length >= 3 &&
      userMessages.slice(-2).every(m => m.length < 30),
    
    // Safety flags
    physicalDangerMentioned: /\bhit|\bpush|\bshove|violence|physical|hurt.*me/i.test(allText),
    suicidalThoughtsMentioned: /kill.*myself|suicide|want.*to.*die|end.*my.*life/i.test(allText),
    stalkingMentioned: /stalk|follow|won't.*leave|tracking|gps/i.test(allText),
    threatsMentioned: /threaten|kill|hurt|harm|or.*else/i.test(allText),
    
    allUserMessages: userMessages,
    conversationDepth: userMessages.length > 10 ? 'deep' : userMessages.length > 5 ? 'medium' : 'beginning'
  };
}

// Generate empathy statement based on current message emotion
function getEmpathyForCurrent(current: any): string {
  if (current.expressesAnger && current.isVenting) {
    return randomResponse([
      "I can hear how angry you are, and that's completely valid.",
      "Your anger is telling you something important - this isn't okay.",
      "You have every right to be furious about this.",
      "That anger? It's your self-respect fighting back.",
      "Anger is healthy when someone's crossed a line. And they have."
    ]);
  }
  
  if (current.expressesAnger) {
    return randomResponse([
      "That frustration makes complete sense.",
      "I hear that anger. It's valid.",
      "You're right to be upset about this.",
      "That would make anyone angry.",
      "Your anger is information - it's telling you this matters."
    ]);
  }
  
  if (current.expressesTiredness) {
    return randomResponse([
      "I can hear the exhaustion in your words. That bone-deep tired is real.",
      "Emotional exhaustion is just as real as physical exhaustion.",
      "That tiredness tells me you've been carrying this for too long.",
      "Being worn down like this is a sign something needs to change.",
      "You sound depleted. That kind of drained doesn't come from nowhere."
    ]);
  }
  
  if (current.expressesSadness) {
    return randomResponse([
      "I'm really sorry you're hurting like this.",
      "That sadness is heavy. I can hear it.",
      "Pain like that is hard to carry alone.",
      "I hear how much this is affecting you.",
      "It's okay to feel sad about this. Your feelings are valid."
    ]);
  }
  
  if (current.expressesConfusion) {
    return randomResponse([
      "Confusion like that is often a sign someone's sending mixed signals.",
      "That unclear feeling makes sense when things don't add up.",
      "Being confused is uncomfortable. Let's try to sort through it.",
      "When you're constantly confused, it usually means something's not right.",
      "That foggy feeling isn't your fault - it's hard to think clearly in situations like this."
    ]);
  }
  
  if (current.expressesFear) {
    return randomResponse([
      "Fear is your body's alarm system. It's important to listen to it.",
      "That fear is telling you something. Don't ignore it.",
      "Being scared is a sign that something doesn't feel safe.",
      "Your fear is valid and important.",
      "Fear means your instincts are picking up on something."
    ]);
  }
  
  if (current.expressesWorthlessness) {
    return randomResponse([
      "Those feelings of worthlessness often come from how others treat us, not who we actually are.",
      "You are not worthless. But someone's been treating you like you are.",
      "When we're constantly put down, we start to believe it. But it's not true.",
      "Your worth isn't determined by someone else's inability to see it.",
      "Feeling worthless is painful. And it usually reflects someone else's behavior, not your value."
    ]);
  }
  
  if (current.expressesTrapped) {
    return randomResponse([
      "Feeling trapped is one of the worst feelings. Like the walls are closing in.",
      "That suffocating feeling of being stuck is real.",
      "When you feel like there's no way out, it's overwhelming.",
      "Being trapped - whether real or just feeling that way - is exhausting.",
      "That caged feeling tells me you're not free to be yourself."
    ]);
  }
  
  if (current.expressesLoneliness) {
    return randomResponse([
      "Loneliness, especially when you're not physically alone, is really painful.",
      "Feeling lonely in a relationship is worse than being alone sometimes.",
      "That kind of lonely - where you're surrounded but still isolated - cuts deep.",
      "Emotional loneliness is real, even if you're not physically alone.",
      "Being lonely around people who should make you feel connected is heartbreaking."
    ]);
  }
  
  if (current.expressesGuilt) {
    return randomResponse([
      "Guilt is heavy. But let me ask: is this really your fault?",
      "That guilty feeling - is it because you did something wrong, or because someone made you feel wrong?",
      "Sometimes we carry guilt that isn't ours to carry.",
      "Guilt can be appropriate, but it can also be manipulated.",
      "You feel guilty. But do you think you should?"
    ]);
  }
  
  if (current.expressesBetrayal) {
    return randomResponse([
      "Betrayal shatters trust. I'm sorry you're dealing with that.",
      "Being betrayed by someone you trusted is one of the deepest pains.",
      "That sense of betrayal - it changes how you see everything.",
      "When trust breaks, it's really hard to repair.",
      "Betrayal cuts deep because it comes from someone who mattered."
    ]);
  }
  
  if (current.expressesRelief || current.expressesHope) {
    return randomResponse([
      "I'm glad you're feeling a bit of hope.",
      "Relief is good. Hold onto that feeling.",
      "That's a good sign - even small hope matters.",
      "I hear a bit of lightness in your words.",
      "Feeling a bit better is progress."
    ]);
  }
  
  // Default empathy
  return randomResponse([
    "I hear you.",
    "I'm listening.",
    "That sounds really difficult.",
    "I understand.",
    "That's a lot to carry.",
    "I'm here with you.",
    "Thank you for sharing that."
  ]);
}

// Main AI Response Generator - MASSIVELY IMPROVED
export function generateAIResponse(
  userMessage: string, 
  journalContext: JournalEntry[],
  chatHistory: ChatMessage[] = []
): string {
  // Analyze CURRENT message separately from history
  const current = analyzeCurrentMessage(userMessage);
  const history = extractConversationHistory(chatHistory);
  
  // Journal analysis for personalization
  const recentEntries = journalContext.slice(0, 10);
  const recentFlags = recentEntries.flatMap(e => e.analysis?.flags || []);
  const avgMood = recentEntries.length > 0 
    ? recentEntries.reduce((sum, e) => sum + e.mood, 0) / recentEntries.length
    : 3;
  const totalEntries = journalContext.length;
  const severeFlags = recentFlags.filter(f => f.severity === 'severe');
  const flagTypes = [...new Set(recentFlags.map(f => f.type))];
  const latestEntry = journalContext[0];
  
  // Build empathy statement
  const empathy = getEmpathyForCurrent(current);
  
  // ===== CRITICAL SAFETY FIRST =====
  
  if (current.mentionsPhysical || history.physicalDangerMentioned) {
    if (current.rawMessage.includes('right now') || current.rawMessage.includes('happening now')) {
      return `🚨 **I'm very concerned about your immediate safety.**\n\nAre you in danger RIGHT NOW?\n\n**If yes:**\n• Call 911 immediately\n• Get to a safe place if you can\n• Tell someone you trust what's happening\n\n**National Domestic Violence Hotline:** 1-800-799-7233 (24/7)\nText START to 88788\n\nAre you safe to talk?`;
    }
    return `${empathy}\n\n⚠️ **Physical violence is never okay.** No one has the right to hurt you.\n\nAre you safe right now? If you're in danger:\n• National Domestic Violence Hotline: 1-800-799-7233\n• Text START to 88788\n\nDo you have a safe place to go if you need to leave quickly?`;
  }
  
  if (history.suicidalThoughtsMentioned || current.rawMessage.includes('kill myself') || current.rawMessage.includes('suicide') || current.rawMessage.includes('want to die')) {
    return `🚨 **I'm really worried about you right now.**\n\nYour life has value, even when it doesn't feel like it. Please reach out for immediate help:\n\n**Call or text 988** (Suicide & Crisis Lifeline) - Available 24/7\nOr chat at 988lifeline.org\n\nThey're trained, they care, and they can help.\n\nAre you safe? Will you reach out to them?`;
  }
  
  if (current.mentionsStalking || history.stalkingMentioned) {
    return `${empathy}\n\n⚠️ **Stalking is a crime and it's serious.** This is not just annoying - it's dangerous.\n\n**Please consider:**\n• Document everything (screenshots, dates, times, locations)\n• Tell someone you trust\n• Contact police if you feel unsafe\n• Look into restraining orders\n\nAre you safe? Do they know where you live/work? Do you have somewhere safe to stay?`;
  }
  
  if (current.mentionsThreats || history.threatsMentioned) {
    return `${empathy}\n\n⚠️ **Threats are a form of abuse and control.** They're meant to scare you into compliance.\n\nThreats of violence should always be taken seriously. Have you:\n• Documented what they said?\n• Told anyone you trust?\n• Considered involving police?\n\nDo you feel safe right now?`;
  }
  
  // ===== CONVERSATION FLOW BASED ON STAGE =====
  
  const person = history.personIdentified;
  const relType = history.relationshipType;
  
  // ===== STAGE 1: Opening / Who is it? (Messages 0-2) =====
  
  if (history.messageCount === 0) {
    // Very first message - warm welcome with journal context
    let welcome = randomResponse([
      `Hi there. I'm here to listen without judgment and help you process what you're going through.`,
      `Hello. This is a safe space to talk about what's on your mind. I'm here to listen.`,
      `Hey. I'm here to support you and help you make sense of what you're dealing with.`,
      `Hi. Whatever you're going through, you don't have to figure it out alone. I'm here.`
    ]);
    
    // Add journal context if exists
    if (totalEntries > 5) {
      const moodDescription = avgMood < 2.5 ? 'consistently low - which tells me you\'ve been struggling' :
                              avgMood < 3.5 ? 'moderate - there are good and hard days' :
                              'relatively positive overall';
      
      welcome += `\n\nI can see you've logged ${totalEntries} moments. Your recent mood has been ${moodDescription}.`;
      
      if (severeFlags.length > 0) {
        welcome += ` I've also noticed some concerning patterns in your entries.`;
      }
      
      if (flagTypes.length > 3) {
        welcome += ` It looks like you're dealing with multiple issues.`;
      }
    }
    
    welcome += `\n\n**What's on your mind today?** What brought you here?`;
    
    return welcome;
  }
  
  // User's first message - understand what they're dealing with
  if (history.messageCount === 1) {
    
    // They immediately shared a specific behavior - acknowledge and ask WHO
    if (current.mentionsLying || current.mentionsCheating || current.mentionsYelling || 
        current.mentionsManipulation || current.mentionsGaslighting || current.mentionsDisrespect ||
        current.mentionsControl || current.isCommunicationIssue || current.mentionsSilentTreatment) {
      
      const issue = current.mentionsLying ? 'lying' :
                    current.mentionsCheating ? 'infidelity' :
                    current.mentionsYelling ? 'yelling' :
                    current.mentionsManipulation ? 'manipulation' :
                    current.mentionsGaslighting ? 'gaslighting' :
                    current.mentionsDisrespect ? 'disrespect' :
                    current.mentionsControl ? 'controlling behavior' :
                    current.isCommunicationIssue ? 'communication issues' :
                    current.mentionsSilentTreatment ? 'the silent treatment' : 'this';
      
      return `${empathy} ${issue.charAt(0).toUpperCase() + issue.slice(1)} can really damage a relationship.\n\n**Who's doing this to you?** Partner, family member, friend, someone else?`;
    }
    
    // They shared an emotion - validate and explore
    if (current.expressesAnger || current.expressesSadness || current.expressesTiredness || 
        current.expressesFear || current.expressesWorthlessness || current.expressesTrapped) {
      
      return `${empathy}\n\n**What's been happening?** What's making you feel this way?`;
    }
    
    // They asked a direct question - answer thoughtfully
    if (current.askingIfShouldLeave) {
      const journalNote = totalEntries > 5 && avgMood < 3 
        ? ` Looking at your ${totalEntries} logged moments, you've been struggling with this for a while.`
        : '';
        
      return `That's one of the hardest questions to answer.${journalNote}\n\n**Before we explore that together:** Who is this about? And what's the main thing making you consider leaving?`;
    }
    
    if (current.askingIfNormal) {
      return `If you're questioning whether something's normal or healthy, that itself is often a sign that something's not right.\n\n**Tell me what's happening.** What's making you doubt yourself or your perceptions?`;
    }
    
    // They mentioned a specific person - ask what's happening
    if (person) {
      return `${empathy}\n\n**What's been happening with your ${person}?** What's the issue that brought you here today?`;
    }
    
    // Generic but warm opening
    return randomResponse([
      `${empathy}\n\n**Can you tell me more?** Who is this about, and what's been going on?`,
      `${empathy}\n\n**I want to understand better.** What's the situation? Who's involved?`,
      `${empathy}\n\n**Help me understand.** What's been happening? Who are we talking about?`
    ]);
  }
  
  // ===== STAGE 2: Short answer - likely answering "who?" =====
  
  if (history.messageCount === 2 && current.isShortAnswer && history.aiJustAskedAboutWho) {
    
    // They just identified WHO
    if (person) {
      
      // We know the issue from message 1, ask for specifics
      if (history.issuesDiscussed.manipulation) {
        return randomResponse([
          `Okay, your ${person}. ${empathy}\n\n**What does the manipulation look like specifically?** Like guilt-tripping, twisting your words, making you feel responsible for their emotions? Give me a concrete example.`,
          `Got it, your ${person}.\n\n**How do they manipulate you?** What tactics do they use? Walk me through a recent situation.`,
          `Your ${person}. ${empathy}\n\n**What specific things do they do** that feel manipulative? I want to understand the pattern.`
        ]);
      }
      
      if (history.issuesDiscussed.gaslighting) {
        return randomResponse([
          `Your ${person}. ${empathy}\n\n**What do they say that makes you question yourself?** Like "that never happened" or "you're too sensitive" or "you're remembering it wrong"? Give me an example.`,
          `Okay, your ${person}.\n\n**When they gaslight you, what does that sound like?** What exact words or phrases do they use?`,
          `Got it. ${empathy}\n\n**Tell me about a specific time** they made you doubt your own reality. What happened?`
        ]);
      }
      
      if (history.issuesDiscussed.lying || history.issuesDiscussed.cheating) {
        return randomResponse([
          `Your ${person}. ${empathy}\n\n**What did they lie about?** And how did you discover the truth?`,
          `Okay. Betrayal like that shakes everything.\n\n**What was the lie?** How did you find out they weren't being honest?`,
          `${empathy} Your ${person}.\n\n**Tell me what happened.** What did they lie about, and how did the truth come out?`
        ]);
      }
      
      if (history.issuesDiscussed.yelling) {
        return randomResponse([
          `Your ${person}. ${empathy}\n\n**How often does the yelling happen?** Is it daily, weekly, or when specific things trigger it? And what usually sets it off?`,
          `Okay, your ${person}.\n\n**Is the yelling constant or situational?** What tends to trigger it? Stress, drinking, specific topics?`,
          `${empathy}\n\n**Paint me a picture of what the yelling looks like.** How often, what triggers it, how intense does it get?`
        ]);
      }
      
      if (history.issuesDiscussed.communication) {
        return randomResponse([
          `Okay, your ${person}. ${empathy}\n\n**What does the communication problem look like?** Do they shut down, not listen, get defensive, dismiss you, or something else?`,
          `Your ${person}. Communication issues are so frustrating.\n\n**When you try to talk to them, what happens?** Do they listen at all, or do they tune you out?`,
          `${empathy}\n\n**Help me understand the communication breakdown.** Is it that they don't talk, don't listen, or both?`
        ]);
      }
      
      if (history.issuesDiscussed.disrespect) {
        return randomResponse([
          `Your ${person}. ${empathy}\n\n**How do they show disrespect?** What do they say or do that makes you feel disrespected?`,
          `Okay. ${relType === 'romantic' ? 'Partners' : relType === 'family' ? 'Family' : 'People'} should treat you with respect.\n\n**What does their disrespect look like?** Give me specific examples.`,
          `${empathy} Your ${person}.\n\n**What do they do or say** that crosses the line of basic respect?`
        ]);
      }
      
      if (history.issuesDiscussed.control) {
        return randomResponse([
          `Your ${person}. ${empathy}\n\n**What do they try to control?** Your choices, who you see, how you spend money, what you wear, where you go?`,
          `Okay, your ${person}.\n\n**How does the controlling behavior show up?** What parts of your life do they try to manage or dictate?`,
          `${empathy}\n\n**Tell me about the control.** What are they trying to control, and how do they do it?`
        ]);
      }
      
      // We don't know the issue yet - ask what's happening
      return randomResponse([
        `Alright, your ${person}. ${empathy}\n\n**What's been happening with them?** What's the problem that's bothering you?`,
        `Okay, your ${person}.\n\n**What's going on between you two?** What's the issue?`,
        `${empathy} Your ${person}.\n\n**What have they been doing** that brought you here today?`
      ]);
    }
    
    // Short answer but didn't identify person clearly
    return `${empathy}\n\n**Can you tell me a bit more about that?** I want to make sure I understand.`;
  }
  
  // ===== STAGE 3: They're giving details (medium/long messages) =====
  
  if (current.isMediumAnswer || current.isLongAnswer || current.hasMultipleSentences) {
    
    // DEEPER CONVERSATION (5+ messages)
    if (history.messageCount >= 5) {
      
      // They're saying they tried to fix it - ask about response
      if (current.sayingTheyTried || history.hasMentionedPreviousAttempts) {
        
        if (current.rawMessage.includes('nothing') || current.rawMessage.includes('didn\'t') || 
            current.rawMessage.includes('worse') || current.rawMessage.includes('same')) {
          return randomResponse([
            `${empathy} So you've tried, and nothing's changed.\n\n**That tells you something important:** They're choosing not to change. They know it bothers you, and they're still doing it.\n\nHow does that make you feel? Hopeless, angry, defeated?`,
            `You've done your part. You've communicated. You've tried.\n\n**The fact that nothing's changed means they're not willing to do their part.**\n\nAt what point do you think you'll be done trying?`,
            `${empathy}\n\n**When effort only comes from one side, that's not a partnership.** That's you carrying the entire relationship.\n\nHow long are you willing to keep carrying it alone?`
          ]);
        }
        
        if (current.rawMessage.includes('promise') || current.rawMessage.includes('sorry') || 
            current.rawMessage.includes('won\'t') || history.hasMentionedApologies) {
          return randomResponse([
            `${empathy} Here's the hard truth: **apologies mean nothing without changed behavior.**\n\nHow many times has your ${person} apologized for the same thing? And then turned around and done it again?`,
            `Words are easy. Anyone can say "I'm sorry" or "I won't do it again."\n\n**What matters is action.** Do their apologies come with actual change, or just more broken promises?`,
            `${empathy}\n\n**Apologies can be another form of manipulation** if the behavior doesn't change. The apology becomes a tool to get you to stay quiet.\n\nIs that what's happening here?`
          ]);
        }
        
        return randomResponse([
          `${empathy}\n\n**Are they actually hearing you?** Or are they just waiting for you to stop talking so they can go back to how things were?`,
          `It takes courage to speak up. You've done that.\n\n**But are they making real changes, or just enough to get you off their back?**`,
          `${empathy}\n\n**Words versus actions - which one matches up** with what your ${person} is doing?`
        ]);
      }
      
      // They're saying they're leaving - support and practical
      if (current.sayingTheyreLeaving) {
        return randomResponse([
          `${empathy} It sounds like you've reached your limit.\n\n**What was the final straw?** Was it a specific incident, or have you just had enough?`,
          `Deciding to leave takes incredible strength.\n\n**Do you have a plan?** A safe place to go, people who can support you, resources you need?`,
          `${empathy}\n\n**You're choosing yourself.** That's not selfish - it's self-preservation.\n\nWhat's your biggest concern about leaving?`
        ]);
      }
      
      // They're saying they're staying - explore why
      if (current.sayingTheyStayed || (current.sayingTheyLoveThem && !current.askingIfShouldLeave)) {
        
        const reason = history.hasMentionedChildren ? 'the kids' :
                       history.hasMentionedFinances ? 'finances' :
                       current.sayingTheyLoveThem ? 'love' :
                       'hope they\'ll change';
        
        return randomResponse([
          `${empathy} I hear that you're staying because of ${reason}.\n\n**But here's the question:** Is ${reason} enough to make living like this worth it? For how long?`,
          `${reason.charAt(0).toUpperCase() + reason.slice(1)} - that's a real thing to consider.\n\n**But you also matter.** Your happiness, your mental health, your peace - those matter too.\n\nHow long can you keep sacrificing yourself?`,
          `${empathy}\n\n**I understand why you're staying.** But let me ask: if things don't change, can you see yourself living like this for another year? Five years?`
        ]);
      }
      
      // Ask about emotional impact if not yet covered
      if (!history.hasExpressedEmotions) {
        return randomResponse([
          `${empathy}\n\n**How is this affecting you emotionally?** Your self-esteem, your mental health, your sense of who you are?`,
          `${empathy} That's heavy to deal with.\n\n**How do you feel day-to-day living with this?** Anxious, sad, numb, angry, exhausted?`,
          `${empathy}\n\n**What's this doing to you internally?** How are you holding up?`
        ]);
      }
      
      // Ask about duration if not mentioned
      if (!history.hasMentionedDuration) {
        return randomResponse([
          `${empathy}\n\n**How long have you been dealing with this?** Is this recent or has it been going on for a while?`,
          `You're carrying a lot.\n\n**Has it always been like this, or did things change at some point?** What was your relationship like in the beginning?`,
          `${empathy}\n\n**When did you first start noticing these problems?** Was there a specific turning point?`
        ]);
      }
      
      // Ask about support system
      if (!history.hasMentionedSupport) {
        return randomResponse([
          `${empathy}\n\n**Do you have people in your life who know what's going on?** Friends, family, anyone you trust?`,
          `This must feel really isolating.\n\n**Is there anyone supporting you through this?** Or does it feel like you're dealing with it alone?`,
          `${empathy}\n\n**Have you told anyone else about this?** Or are you keeping it private?`
        ]);
      }
      
      // Deeper existential question
      const journalInsight = totalEntries > 5 && avgMood < 3 
        ? ` Looking at your ${totalEntries} logged moments, your mood has been consistently low.`
        : '';
      
      return randomResponse([
        `${empathy}${journalInsight}\n\n**Let me ask you something:** When was the last time you felt genuinely happy in this ${relType || 'relationship'}? Not just "okay" or "not fighting" - actually at peace?`,
        `${empathy}${journalInsight}\n\n**If nothing changes, what does your life look like in five years?** Can you live with that?`,
        `${empathy}\n\n**What does your gut tell you?** Not your head with all its logic and reasons - your gut. Deep down, what's it saying?`
      ]);
    }
    
    // MID CONVERSATION (3-4 messages)
    if (history.messageCount >= 3 && history.messageCount <= 4) {
      
      // They described a behavior - ask about emotional impact
      if (history.aiJustAskedAboutWhat && !history.hasExpressedEmotions) {
        
        if (history.issuesDiscussed.manipulation) {
          return randomResponse([
            `${empathy} That's textbook manipulation.\n\n**How does it make you feel when they do that?** Guilty? Confused? Like you're walking on eggshells? Responsible for their emotions?`,
            `Yeah, that's manipulation. Classic guilt-tripping.\n\n**What goes through your head when this happens?** Do you end up feeling bad even when you didn't do anything wrong?`,
            `${empathy} That manipulation is designed to make you second-guess yourself.\n\n**How does your body react when they start?** Tense, anxious, that pit in your stomach?`
          ]);
        }
        
        if (history.issuesDiscussed.gaslighting) {
          return randomResponse([
            `${empathy} That's gaslighting - they're making you doubt your own reality.\n\n**Do you find yourself questioning your memory even when you know what happened?** Do you feel like maybe you really are "too sensitive"?`,
            `Yeah, that's classic gaslighting. It's designed to make you doubt yourself.\n\n**Has it gotten to the point where you second-guess yourself even when they're not around?** Like you can't trust your own perceptions anymore?`,
            `${empathy} That's gaslighting.\n\n**Do you ever feel like you're going crazy?** Or like your grip on reality is slipping?`
          ]);
        }
        
        if (history.issuesDiscussed.yelling) {
          return randomResponse([
            `${empathy} Being yelled at is jarring and hurtful, especially by someone you're supposed to feel safe with.\n\n**How do you feel when it's happening?** Scared, angry, numb, small, defeated?`,
            `Nobody deserves to be yelled at like that.\n\n**What happens to you physically when they start yelling?** Do you freeze, fight back, shut down, dissociate?`,
            `${empathy}\n\n**Does the yelling make you feel small?** Or does it make you angry? How does your body respond?`
          ]);
        }
        
        if (history.issuesDiscussed.communication) {
          return randomResponse([
            `${empathy} Communication problems create so much frustration and loneliness.\n\n**How does it make you feel** when you can't get through to them? Invisible, unimportant, alone?`,
            `Not being heard is incredibly painful.\n\n**Do you feel like you're talking to a wall?** Like no matter what you say, it doesn't matter?`,
            `${empathy}\n\n**Does the lack of communication make you feel alone** even when you're together?`
          ]);
        }
        
        if (history.issuesDiscussed.lying) {
          return randomResponse([
            `${empathy} Lies destroy the foundation of trust.\n\n**How does it feel knowing you can't trust them?** Do you find yourself questioning everything they say now? Always looking for proof?`,
            `When trust breaks, it's really hard to rebuild.\n\n**Do you constantly feel suspicious?** Like you have to detective everything?`,
            `${empathy}\n\n**Is the lying making you feel paranoid?** Or just... sad that it's come to this?`
          ]);
        }
        
        // Generic emotional impact question
        return randomResponse([
          `${empathy}\n\n**How does this affect you?** Your confidence, your peace of mind, your sense of self?`,
          `${empathy} That sounds exhausting.\n\n**What's this doing to you emotionally?** How are you holding up day to day?`,
          `${empathy}\n\n**I want to understand the impact on you.** How do you feel living with this?`
        ]);
      }
      
      // They shared emotions - ask about duration or patterns
      if (history.hasExpressedEmotions && !history.hasMentionedDuration) {
        return randomResponse([
          `${empathy} Those feelings are completely valid.\n\n**How long have you been feeling this way?** Is it recent or has it been building for a while?`,
          `You're not wrong for feeling that way.\n\n**Has it always been like this, or did things change at some point?** Was there a honeymoon period that ended?`,
          `${empathy}\n\n**When did you start noticing these feelings?** Was there a specific moment or has it been gradual?`
        ]);
      }
      
      // Ask about patterns/cycles
      if (history.hasMentionedDuration && !history.hasMentionedPreviousAttempts) {
        return randomResponse([
          `That's a long time to endure this.\n\n**Does it happen in cycles?** Like they're awful, then apologize and are sweet, then awful again? Or is it consistently bad?`,
          `${empathy}\n\n**Is there a pattern?** Do things escalate at certain times - when they're stressed, drinking, around specific triggers?`,
          `Dealing with this for that long takes a toll.\n\n**Does it ever get better, or is it pretty consistently like this?**`
        ]);
      }
      
      // Default mid-conversation question
      return randomResponse([
        `${empathy}\n\n**Have you talked to your ${person} about how this affects you?** What happened when you tried?`,
        `${empathy}\n\n**What happens when you bring this up with them?** Do they listen, deflect, get angry, make excuses?`,
        `You're dealing with a lot.\n\n**Have you tried to address this with your ${person}?** How did they respond?`
      ]);
    }
    
    // EARLY CONVERSATION (2-3 messages) - still gathering info
    if (history.messageCount === 2 || history.messageCount === 3) {
      
      // They just gave details about behavior - acknowledge and ask follow-up
      return randomResponse([
        `${empathy}\n\n**That must be really hard to deal with.** Can you tell me more about how often this happens?`,
        `${empathy} I'm getting a clearer picture.\n\n**Is this a constant thing, or does it come and go?**`,
        `${empathy}\n\n**Help me understand the frequency.** Is this daily, weekly, or sporadic?`
      ]);
    }
  }
  
  // ===== VERY DEEP CONVERSATION (10+ messages) - Decision support & practical help =====
  
  if (history.messageCount >= 10) {
    
    const journalInsight = totalEntries > 5 && avgMood < 3 
      ? ` Looking at your ${totalEntries} logged moments, this has been weighing on you.`
      : '';
    
    // Acknowledge their journey through conversation
    if (history.messageCount === 10) {
      return randomResponse([
        `${empathy}\n\nWe've been talking for a bit now, and I want you to know: **the fact that you're here, being this honest and vulnerable, takes real courage.**\n\nYou're not weak. You're not stupid. You're human, and you're trying to figure out something really hard.${journalInsight}\n\nWhat's the main thing you're struggling with right now?`,
        `${empathy}${journalInsight}\n\n**You've shared a lot with me, and I appreciate your openness.** I know this isn't easy to talk about.\n\nAs you think about everything we've discussed, what feels like the most important thing to address?`,
        `${empathy}\n\nWe've covered a lot of ground together.${journalInsight} **You're processing something really complex, and that takes strength.**\n\nWhat do you need most right now? Clarity, support, validation, practical advice?`
      ]);
    }
    
    // Practical next steps
    if (!history.hasMentionedSupport) {
      return randomResponse([
        `${empathy}${journalInsight}\n\n**Have you thought about talking to a therapist?** Not for couples counseling - for YOU. To process all of this and figure out what you want.\n\nSometimes an outside professional perspective helps cut through the fog.`,
        `${empathy}\n\n**Do you have a support system?** Friends, family, a therapist? Someone offline you can talk to about this?\n\nYou're using this app to track patterns, which is smart. But human connection matters too.`,
        `${empathy}${journalInsight}\n\n**Who in your life knows about this?** Is there anyone you trust enough to be honest with?\n\nCarrying this alone is heavy.`
      ]);
    }
    
    // Decision-making support
    if (current.isQuestioning || history.userGettingMoreOpen) {
      return randomResponse([
        `${empathy}${journalInsight}\n\n**Let me ask you something:** If a friend was going through exactly what you're going through - everything you just told me - what would you tell them to do?`,
        `${empathy}\n\nYou've been really thoughtful about all of this.${journalInsight}\n\n**What would need to change for you to feel okay staying?** Be specific. And be honest about whether those changes are realistic.`,
        `${empathy}${journalInsight}\n\n**Imagine two futures:**\n\nFuture A: You stay and nothing changes. Five years from now, it's still like this.\nFuture B: You leave. It's hard at first, but you're free.\n\n**Which future can you live with?**`
      ]);
    }
    
    // General deep support
    return randomResponse([
      `${empathy}${journalInsight}\n\n**Whatever you decide to do, make sure you're choosing yourself too.** Not just what's easiest, or what keeps the peace, or what other people want.\n\nWhat do YOU need to be okay?`,
      `${empathy}\n\nYou deserve a ${relType || 'relationship'} where you feel safe, respected, heard, and valued. **Not just in words, but in actions.**${journalInsight}\n\nIs that what you have?`,
      `${empathy}${journalInsight}\n\n**You're not alone in this,** even though it might feel like it sometimes. What you're going through matters, and you deserve support.\n\nWhat's the next step you think you need to take?`
    ]);
  }
  
  // ===== INITIAL MESSAGE RESPONSES (User's first message) =====
  
  // SPECIFIC BEHAVIORS mentioned in first message
  
  if (current.isCommunicationIssue) {
    if (person) {
      return randomResponse([
        `${empathy} Communication issues are the root of so much frustration and disconnection.\n\n**What does the communication problem with your ${person} look like specifically?** Do they not listen, shut down when you try to talk, dismiss your feelings, interrupt you, or something else?`,
        `Communication is literally the foundation of any relationship. Without it, everything crumbles.\n\n**When you try to talk to your ${person}, what happens?** Are they defensive, avoidant, dismissive? Do they actually hear you?`,
        `${empathy} Not being able to communicate in a ${relType || 'relationship'} is incredibly isolating.\n\n**Help me understand what the breakdown looks like.** Is it that they won't talk, won't listen, or both?`
      ]);
    }
    return randomResponse([
      `${empathy} Communication is the foundation. When that breaks down, everything else suffers.\n\n**Who are you having communication problems with?** And what does it look like - do they not listen, shut down, dismiss you?`,
      `Communication issues create so much frustration and loneliness.\n\n**Tell me more.** Who is this about, and what's happening when you try to communicate?`
    ]);
  }
  
  if (current.mentionsManipulation) {
    if (person) {
      return randomResponse([
        `${empathy} Manipulation in a ${relType || 'relationship'} is exhausting because you start questioning yourself constantly.\n\n**What kind of manipulation is your ${person} doing?** Guilt-tripping, twisting words, playing victim, making you feel responsible for their emotions? Give me a specific example.`,
        `${relType ? relType.charAt(0).toUpperCase() + relType.slice(1) : 'Relationship'} manipulation hits different because there's so much emotion and history involved.\n\n**How does your ${person} manipulate you?** What tactics do they use?`,
        `${empathy} Manipulation makes you doubt yourself and your reality.\n\n**What does your ${person} do that feels manipulative?** Walk me through a typical situation.`
      ]);
    }
    return randomResponse([
      `${empathy} Feeling manipulated is disorienting and frustrating. You start doubting yourself.\n\n**Who's doing this to you?** Partner, family member, friend? And what do they do that feels manipulative?`,
      `Manipulation messes with your head because you can't tell what's real anymore.\n\n**Who's manipulating you?** Tell me about them and what they do.`
    ]);
  }
  
  if (current.mentionsGaslighting || (current.askingIfNormal && current.rawMessage.includes('crazy'))) {
    if (current.askingIfNormal) {
      return randomResponse([
        `If you're questioning whether you're "crazy" or "too sensitive," that itself is often a sign of gaslighting. **Healthy relationships don't make you doubt your sanity.**\n\nWhat are they saying or doing that makes you question yourself? Give me specific examples.`,
        `When someone makes you feel like you're losing your mind or being "dramatic," that's gaslighting.\n\n**What's happening?** What do they say that makes you doubt your own perceptions?`,
        `The fact that you're asking this question suggests something's not right. **Trust your gut.**\n\nWhat specifically are they doing or saying that makes you feel crazy or like you're overreacting?`
      ]);
    }
    return randomResponse([
      `${empathy} Gaslighting is psychological manipulation designed to make you doubt your own perceptions, memory, and sanity.\n\n**Who's doing this to you?** And what do they say - "that never happened," "you're too sensitive," "you're remembering wrong"?`,
      `That's gaslighting - when someone rewrites reality to make you the problem.\n\n**What's happening?** Who's doing this, and what do they say to make you question yourself?`
    ]);
  }
  
  if (current.mentionsLying) {
    return randomResponse([
      `${empathy} Trust is everything in a relationship. When someone lies, especially repeatedly, it breaks that foundation.\n\n**Who lied to you?** And is this a pattern, or was it one incident? What did they lie about?`,
      `Lying destroys trust, and without trust, what do you really have?\n\n**Tell me what happened.** Who lied, what was it about, and how did you find out the truth?`,
      `${empathy} Being lied to makes you question everything.\n\n**Who lied?** What was the lie, and is this the first time or part of a pattern?`
    ]);
  }
  
  if (current.mentionsCheating) {
    return randomResponse([
      `I'm really sorry. Discovering infidelity is one of the most painful betrayals you can experience.\n\n**How did you find out?** And have you confronted them yet, or are you still processing?`,
      `${empathy} That kind of betrayal cuts deep. It shatters trust completely.\n\n**What happened?** How did you discover it? And where are you at with it now?`,
      `Infidelity is devastating. I'm sorry you're going through this.\n\n**Tell me what happened.** How did you find out, and what's the situation now?`
    ]);
  }
  
  if (current.mentionsYelling) {
    const relType2 = relType || 'any relationship';
    return randomResponse([
      `${empathy} Being yelled at is hurtful and can feel scary, especially in ${relType2 === 'romantic' ? 'a relationship' : relType2}.\n\n**Who yells at you?** And how often does this happen - is it constant or situational?`,
      `Nobody deserves to be yelled at. It's aggressive, disrespectful, and meant to intimidate.\n\n**Who's doing this?** How often, and what usually triggers it?`,
      `${empathy} Yelling is a form of verbal aggression. It's designed to control through intimidation.\n\n**Who yells at you?** Is it when they're angry, drinking, stressed? What sets it off?`
    ]);
  }
  
  if (current.mentionsDisrespect) {
    return randomResponse([
      `${empathy} Everyone deserves respect. That's non-negotiable in any relationship.\n\n**Who's disrespecting you?** And how do they show it - what do they say or do?`,
      `Respect is foundational. Without it, you don't have a healthy relationship.\n\n**Who treats you disrespectfully?** What does it look like?`,
      `${empathy} You deserve to be treated with respect. Always.\n\n**Who's being disrespectful?** Give me an example of what they do or say.`
    ]);
  }
  
  if (current.mentionsSilentTreatment) {
    return randomResponse([
      `${empathy} The silent treatment is emotional manipulation and a form of abuse - it's punishment through withdrawal of connection.\n\n**Who does this to you?** How long do they typically ice you out, and what usually triggers it?`,
      `Being frozen out like that is cruel. It's designed to make you desperate for their attention and willing to do anything to get it back.\n\n**Who gives you the silent treatment?** What's the pattern?`,
      `${empathy} The silent treatment is toxic. It's controlling, punishing, and manipulative.\n\n**Who does this?** And how does it usually play out?`
    ]);
  }
  
  if (current.mentionsJealousy) {
    return randomResponse([
      `${empathy} A little jealousy is human. **Excessive jealousy is about control disguised as caring.**\n\nWho's jealous? What are they jealous about, and how does it show up - accusations, checking your phone, controlling who you see?`,
      `Jealousy that controls your behavior isn't love - it's possession.\n\n**What's happening?** Who's jealous, and what do they do about it?`,
      `${empathy} Healthy relationships include trust. Excessive jealousy means there's no trust.\n\n**Who's jealous?** What triggers it, and how do they act on it?`
    ]);
  }
  
  if (current.mentionsControl) {
    return randomResponse([
      `${empathy} Control in a relationship is about power, not love. **You're not a possession.**\n\nWho's trying to control you? What do they try to control - your choices, your friends, your money, your time?`,
      `Being controlled takes away your autonomy and sense of self.\n\n**What aspects of your life are they trying to control?** Who is this?`,
      `${empathy} Control masquerades as care sometimes - "I just worry about you" - but it's really about power.\n\n**Who's controlling?** How does it show up?`
    ]);
  }
  
  if (current.mentionsCriticism) {
    return randomResponse([
      `${empathy} Constant criticism chips away at your self-worth bit by bit.\n\n**Who criticizes you?** What do they criticize - everything you do, or specific things? How often?`,
      `Criticism can be constructive, but **constant criticism is just tearing you down.**\n\nWho does this? What's their favorite thing to criticize? Is it your appearance, your choices, your personality?`,
      `${empathy} Nobody should make you feel like you're never good enough.\n\n**Who criticizes you constantly?** What do they say, and how does it make you feel?`
    ]);
  }
  
  if (current.mentionsBlaming) {
    return randomResponse([
      `${empathy} When someone makes everything your fault and takes no responsibility themselves, that's manipulation.\n\n**Who does this?** Do they ever admit when they're wrong, or is it always somehow on you?`,
      `Constant blame is exhausting. It makes you feel like you can't do anything right.\n\n**Who blames you for everything?** Even when it's clearly not your fault?`,
      `${empathy} Taking responsibility is healthy. **Making everything someone else's fault is not.**\n\nWho refuses to take accountability? Is it always your fault in their eyes?`
    ]);
  }
  
  if (current.mentionsIsolation) {
    return randomResponse([
      `${empathy} **Isolating you from friends and family is a major red flag.** It's about cutting off your support system so you're dependent on them.\n\nWho's doing this? Who have you lost touch with because of them?`,
      `Isolation is a classic abuse tactic. It makes you vulnerable and alone.\n\n**Who's isolating you?** From whom - friends, family? How do they do it?`,
      `${empathy} When someone separates you from your support system, **that's control, not love.**\n\nWho's doing this to you? What do they say or do to keep you away from others?`
    ]);
  }
  
  if (current.mentionsBoundaries) {
    return randomResponse([
      `${empathy} Boundaries are essential. When someone doesn't respect your "no," that's a serious problem.\n\n**Who's crossing your boundaries?** What boundaries have you set, and how do they violate them?`,
      `The fact that you've had to set boundaries means someone's been crossing lines.\n\n**Tell me about it.** Who doesn't respect your boundaries, and what happens when you try to enforce them?`,
      `${empathy} **"No" is a complete sentence.** If someone can't accept that, they don't respect you.\n\nWho's not respecting your boundaries? What do they do?`
    ]);
  }
  
  // EMOTIONAL STATES (when no specific behavior mentioned)
  
  if (current.expressesTiredness) {
    const relTypeHint = latestEntry?.relationshipType ? `your ${latestEntry.relationshipType} relationship` : 'work, a relationship, family, something else';
    return randomResponse([
      `${empathy} That kind of emotional exhaustion is as real as physical tiredness. You can't just "push through" it.\n\n**What's draining you?** Is it ${relTypeHint}?`,
      `I hear the depletion in your words. **Emotional burnout is real.**\n\nWhat's wearing you down? What's taking all your energy?`,
      `${empathy} That tiredness you're feeling - **it's your body and mind saying something needs to change.**\n\nWhat's exhausting you?`
    ]);
  }
  
  if (current.expressesAnger) {
    return randomResponse([
      `${empathy} **Anger is your internal alarm telling you something's wrong.** It's information.\n\nWho or what are you angry about? What happened?`,
      `Anger gets a bad rap, but it's actually healthy when it's telling you your boundaries are being violated.\n\n**What's making you angry?** What happened?`,
      `${empathy} **That frustration and anger - it's telling you something important.**\n\nWhat happened? Who are you angry at, and why?`
    ]);
  }
  
  if (current.expressesSadness) {
    if (severeFlags.length > 0) {
      return `${empathy} That sadness is heavy.\n\n⚠️ **If you're thinking about harming yourself, please call 988 (Suicide & Crisis Lifeline) right now.**\n\nWhat's making you feel this way? I'm here.`;
    }
    return randomResponse([
      `${empathy} That kind of sadness weighs heavy on your heart.\n\n**What's been happening?** What's making you feel so down?`,
      `I hear the pain in your words. **That's a lot to carry.**\n\nTell me what's going on. What's weighing on you?`,
      `${empathy} Sadness like that doesn't come from nowhere. Something's hurting you.\n\n**What's happening?**`
    ]);
  }
  
  if (current.expressesWorthlessness) {
    return randomResponse([
      `${empathy} **Those feelings of worthlessness often come from how others have treated us, not from who we actually are.**\n\nHas someone been making you feel this way? Who?`,
      `You are not worthless. But someone has probably been treating you like you are.\n\n**Who's making you feel like you're not good enough?** What are they saying or doing?`,
      `${empathy} **Feeling worthless is painful.** And it's usually a reflection of someone else's behavior, not your actual value.\n\nWho's been tearing you down?`
    ]);
  }
  
  if (current.expressesTrapped) {
    if (severeFlags.length > 0) {
      return `${empathy} Feeling trapped is suffocating.\n\n⚠️ **If you're in danger, please reach out:**\nNational Domestic Violence Hotline: 1-800-799-7233\n\nWhat situation has you feeling trapped? Are you safe?`;
    }
    return randomResponse([
      `${empathy} Feeling trapped is one of the worst feelings. Like there's no way out, no air to breathe.\n\n**What situation has you feeling stuck?** What's keeping you there?`,
      `That trapped feeling is claustrophobic and overwhelming.\n\n**Tell me what's going on.** What's making you feel like you can't leave or change things?`,
      `${empathy} **Being trapped - whether it's real or just feels that way - is suffocating.**\n\nWhat's the situation? Why do you feel stuck?`
    ]);
  }
  
  if (current.expressesConfusion) {
    return randomResponse([
      `${empathy} **Confusion in relationships is often a sign that something isn't right.** Healthy relationships feel clearer.\n\nWhat are you confused about? Let's untangle it together.`,
      `When you're constantly confused, it's usually because someone's giving you mixed signals or gaslighting you.\n\n**What's confusing you?** What doesn't add up?`,
      `${empathy} Confusion is uncomfortable. **Let's see if we can make sense of it.**\n\nWhat's got you feeling confused? What's unclear?`
    ]);
  }
  
  if (current.expressesFear) {
    return randomResponse([
      `${empathy} **Fear is your body's alarm system.** It's important to listen to it, not dismiss it.\n\nWhat are you scared of? A person, a situation, what might happen?`,
      `That fear is telling you something. **Don't ignore it.**\n\nWhat are you afraid of? Who or what?`,
      `${empathy} **Fear means your nervous system is picking up on danger,** even if you can't fully articulate why.\n\nWhat scares you?`
    ]);
  }
  
  if (current.expressesLoneliness) {
    return randomResponse([
      `${empathy} **Feeling lonely, especially when you're in a relationship or surrounded by family, is really painful.**\n\nAre you physically alone, or do you feel alone even around people?`,
      `Loneliness in connection is worse than being alone sometimes.\n\n**What's making you feel lonely?** Is it isolation, or emotional distance from people who are physically present?`,
      `${empathy} That loneliness - **is it because you're actually alone, or because the people around you aren't really seeing you?**\n\nTell me about it.`
    ]);
  }
  
  if (current.expressesGuilt) {
    return randomResponse([
      `${empathy} Guilt is heavy. But let me ask: **is this really your fault, or has someone made you feel like it is?**\n\nWhat are you feeling guilty about?`,
      `That guilty feeling - **is it because you did something wrong, or because someone manipulated you into feeling wrong?**\n\nTell me what's going on.`,
      `${empathy} Sometimes we carry guilt that isn't ours to carry.\n\n**What are you feeling guilty about?** And who's involved?`
    ]);
  }
  
  if (current.expressesBetrayal) {
    return randomResponse([
      `${empathy} Betrayal shatters trust. **I'm sorry you're dealing with that.**\n\nWho betrayed you? What happened?`,
      `Being betrayed by someone you trusted is one of the deepest pains.\n\n**Tell me what happened.** Who was it, and what did they do?`,
      `${empathy} **That sense of betrayal - it changes how you see everything.**\n\nWhat happened? Who betrayed your trust?`
    ]);
  }
  
  // DECISIONS / QUESTIONS
  
  if (current.askingIfShouldLeave) {
    const journalNote = totalEntries > 5 && avgMood < 3 
      ? ` Looking at your ${totalEntries} logged moments, you've been struggling with this for a while.`
      : '';
    
    return randomResponse([
      `That's one of the hardest questions to answer, and **only you can ultimately make that decision.**${journalNote}\n\n**But let's explore it together:** What's making you consider leaving? And what's holding you back?`,
      `Only you can answer that question.${journalNote} **But I can help you think it through.**\n\nWhat's the main thing pushing you toward leaving? What's the main thing making you want to stay?`,
      `That's the question that keeps you up at night, isn't it?${journalNote}\n\n**Let's start here:** What would need to change for you to feel okay staying? Be honest - is that change realistic?`
    ]);
  }
  
  if (current.askingIfNormal && !current.mentionsGaslighting) {
    return randomResponse([
      `If you're questioning whether something's "normal" or "okay," **that itself is often a sign that something's not right.**\n\nHealthy relationships don't make you constantly question reality. What's happening that's making you doubt yourself?`,
      `The fact that you're asking suggests your gut already knows something's off.\n\n**Tell me what's happening.** What's making you question what's normal?`,
      `${empathy} **Trust your instincts.** If something feels wrong, it probably is.\n\nWhat's going on that's making you ask this question?`
    ]);
  }
  
  if (current.sayingTheyLoveThem && (current.isMinimizing || current.isDefensive)) {
    return randomResponse([
      `${empathy} **You can love someone and still need to leave.** Love isn't always enough.\n\nWho do you love? And what comes after the "but"? Because I hear a "but" in there.`,
      `"I love them but..." - **that "but" is important.** It's the part that matters.\n\n**What comes after the "but"?** What's the conflict?`,
      `Love makes everything more complicated. **Loving someone doesn't automatically mean the relationship is healthy or good for you.**\n\nWho do you love? And what's the problem?`
    ]);
  }
  
  if (current.askingForHelp) {
    return randomResponse([
      `I'm here to help you think through this, but **I need to understand the situation first.**\n\nWhat's going on? Who is this about, and what's the problem?`,
      `I want to support you. **Let's start with the basics.**\n\nTell me what's happening. Who's involved, and what's the issue?`,
      `${empathy} I'm here for you.\n\n**Help me understand what you're dealing with.** What's the situation?`
    ]);
  }
  
  // RELATIONSHIP TYPE SPECIFIC (if mentioned but no specific issue)
  
  if (relType === 'romantic' && !person && history.messageCount <= 1) {
    return randomResponse([
      `Relationship struggles are tough, and **you're not alone in dealing with this.**\n\nWhat's been happening with your partner? What's the main issue that brought you here?`,
      `Romantic relationships can be wonderful or really painful, sometimes both at once.\n\n**What's going on with your partner?** What's bothering you?`,
      `${empathy} Relationship problems affect everything - your mood, your sleep, your sense of self.\n\n**What's been happening?** What's the issue with your partner?`
    ]);
  }
  
  if (relType === 'family' && !person && history.messageCount <= 1) {
    return randomResponse([
      `Family relationships are complicated - **there's history, obligation, guilt, expectation.** It's layered.\n\nWhich family member is this about? Mom, dad, sibling, someone else? And what's been happening?`,
      `Family stuff is hard because you can't just walk away easily. There's so much baggage.\n\n**Who in your family is this about?** What's going on?`,
      `${empathy} Family dynamics are some of the most complex. **You didn't choose them, but you're stuck with them.**\n\nWhich family member? What's the problem?`
    ]);
  }
  
  if (relType === 'friendship' && history.messageCount <= 1) {
    return randomResponse([
      `Friendships matter deeply. **When a friend hurts you, it's a unique kind of pain.**\n\nWhat's going on with your friend? What happened?`,
      `Friend issues can be just as painful as romantic ones. **Sometimes more, because you don't expect it.**\n\nWhat's happening with your friend?`,
      `${empathy} Friendship betrayal or problems hit different. You trusted them.\n\n**Tell me what's going on.**`
    ]);
  }
  
  if (relType === 'ex' && history.messageCount <= 1) {
    return randomResponse([
      `Ex drama is exhausting. **You broke up for a reason, but they're still affecting you.**\n\nWhat's happening with your ex? Are they contacting you, or are you struggling to move on?`,
      `Dealing with an ex can be really draining, especially if they won't let go or you haven't fully processed it.\n\n**What's going on?**`,
      `${empathy} Ex situations can be toxic, especially if they're trying to stay in your life inappropriately.\n\n**What's happening with your ex?**`
    ]);
  }
  
  // DEFAULT - WARM, OPEN, PERSONALIZED WELCOME
  
  const hasJournalData = totalEntries > 0;
  const journalNote = totalEntries > 10
    ? ` I can see you've logged ${totalEntries} moments - that shows real self-awareness and courage.`
    : totalEntries > 3
    ? ` I see you've logged ${totalEntries} moments.`
    : '';
  
  const moodContext = avgMood < 2.5 && totalEntries > 3
    ? ' Your recent mood has been pretty low, which tells me you\'ve been struggling.'
    : avgMood > 4 && totalEntries > 3
    ? ' Your recent mood has been relatively positive.'
    : '';
  
  const flagContext = recentFlags.length > 5 && hasJournalData
    ? ' I noticed some concerning patterns in your recent entries.'
    : '';
  
  return randomResponse([
    `Hey there. I'm here to listen, support you, and help you make sense of what you're going through. This is a safe space.${journalNote}${moodContext}${flagContext}\n\n**What's on your mind?** What brought you here today?`,
    `Hi. I'm here for you - no judgment, just support and understanding.${journalNote}${moodContext}${flagContext}\n\n**What's been bothering you?** What do you want to talk about?`,
    `Hello. Whatever you're dealing with, you don't have to figure it out alone. I'm here.${journalNote}${moodContext}${flagContext}\n\n**What's weighing on you?** What's happening?`,
    `Hey. This is a safe place to process what you're going through.${journalNote}${moodContext}${flagContext}\n\n**What's on your heart?** What do you need to talk about?`
  ]);
}
