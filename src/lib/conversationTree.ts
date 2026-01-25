/**
 * Enhanced Dynamic Conversation Tree System
 * Uses keywords/verbatims to guide users through personalized conversation paths
 * Includes gamification, psychometric assessment, comprehensive analytics, and campaign tracking
 * Features dynamic variation for non-predictable, psychometric feel
 */

import type { ChatMessage, JournalEntry } from './types';

export interface ConversationNode {
  id: string;
  keywords: string[]; // Keywords that trigger this node
  emotion?: string; // Associated emotion
  question: string;
  options?: ConversationOption[]; // Interactive followup options
  response?: string; // AI response when this node is reached
  nextNodes?: string[]; // Possible next nodes
  depth: number; // How deep in the conversation tree
  category: 'emotion' | 'behavior' | 'relationship' | 'decision' | 'support';
  psychometricWeight?: number; // For assessment scoring
  conclusion?: string; // Final CTA or conclusion
  analyticsTag?: string; // For tracking
}

export interface ConversationOption {
  id: string;
  text: string;
  keywords: string[]; // Keywords this option represents
  nextNodeId: string; // Which node to go to next
  emoji?: string;
  color?: string;
  psychometricValue?: number;
}

export interface ConversationPath {
  nodes: string[]; // Sequence of node IDs user has taken
  startTime: string;
  endTime?: string;
  conclusion?: string;
  insights?: string[];
  score?: number; // Psychometric score
}

export interface ConversationAnalytics {
  totalSessions: number;
  paths: ConversationPath[];
  mostCommonEmotions: Record<string, number>;
  mostCommonBehaviors: Record<string, number>;
  averageDepth: number;
  completionRate: number;
  commonConclusions: Record<string, number>;
  campaignData?: CampaignData;
  studyInsights?: StudyInsights;
}

export interface CampaignData {
  campaignId?: string;
  campaignName?: string;
  participantId: string;
  sessions: number;
  startDate: string;
  lastActivity: string;
  patterns: string[];
  outcomes: string[];
}

export interface StudyInsights {
  patterns: PatternInsight[];
  correlations: Correlation[];
  trends: Trend[];
  recommendations: string[];
}

export interface PatternInsight {
  pattern: string;
  frequency: number;
  severity: 'low' | 'moderate' | 'high' | 'critical';
  context: string;
  firstDetected: string;
  lastDetected: string;
}

export interface Correlation {
  factor1: string;
  factor2: string;
  strength: number; // 0-1
  significance: 'low' | 'moderate' | 'high';
}

export interface Trend {
  metric: string;
  direction: 'increasing' | 'decreasing' | 'stable';
  rate: number;
  period: string;
}

// ===== CONVERSATION TREE DEFINITIONS =====

// EMOTION NODES (Entry points)
const EMOTION_NODES: ConversationNode[] = [
  {
    id: 'emotion_anger',
    keywords: ['angry', 'mad', 'furious', 'pissed', 'frustrated', 'rage', 'irritated', 'annoyed', 'livid', 'fuming', 'upset', 'bothered', 'irked', 'vexed', 'resentful', 'bitter'],
    emotion: 'anger',
    question: "I hear that anger. It's telling you something important.",
    options: [
      {
        id: 'anger_source',
        text: 'Angered by someone',
        keywords: ['someone', 'person', 'they', 'them'],
        nextNodeId: 'anger_by_someone',
        emoji: '😠',
        color: '#FF6B6B',
        psychometricValue: 0.7
      },
      {
        id: 'anger_woke',
        text: 'Woke up grumpy',
        keywords: ['woke', 'morning', 'grumpy', 'mood'],
        nextNodeId: 'anger_general',
        emoji: '😤',
        color: '#FFD93D',
        psychometricValue: 0.3
      },
      {
        id: 'anger_situation',
        text: 'Frustrated with a situation',
        keywords: ['situation', 'circumstance', 'event'],
        nextNodeId: 'anger_situation',
        emoji: '😡',
        color: '#FF6B6B',
        psychometricValue: 0.5
      },
      {
        id: 'anger_self',
        text: 'Angry at myself',
        keywords: ['myself', 'self', 'me'],
        nextNodeId: 'anger_self',
        emoji: '😔',
        color: '#6C5CE7',
        psychometricValue: 0.6
      }
    ],
    depth: 1,
    category: 'emotion',
    analyticsTag: 'emotion_anger'
  },
  {
    id: 'emotion_sad',
    keywords: ['sad', 'depressed', 'cry', 'crying', 'unhappy', 'miserable', 'heartbroken', 'down', 'blue', 'melancholy', 'gloomy', 'sorrowful', 'tearful', 'weepy', 'dejected', 'despondent', 'hopeless'],
    emotion: 'sadness',
    question: "That sadness is heavy. I'm here with you.",
    options: [
      {
        id: 'sad_loss',
        text: 'Feeling loss or grief',
        keywords: ['loss', 'grief', 'miss', 'gone'],
        nextNodeId: 'sad_loss',
        emoji: '💔',
        color: '#4ECDC4',
        psychometricValue: 0.8
      },
      {
        id: 'sad_relationship',
        text: 'Sad about a relationship',
        keywords: ['relationship', 'partner', 'friend', 'family'],
        nextNodeId: 'sad_relationship',
        emoji: '😢',
        color: '#6C5CE7',
        psychometricValue: 0.9
      },
      {
        id: 'sad_life',
        text: 'Just feeling down about life',
        keywords: ['life', 'everything', 'general', 'overall'],
        nextNodeId: 'sad_general',
        emoji: '😞',
        color: '#4ECDC4',
        psychometricValue: 0.5
      },
      {
        id: 'sad_worthless',
        text: 'Feeling worthless or hopeless',
        keywords: ['worthless', 'hopeless', 'nothing', 'pointless'],
        nextNodeId: 'sad_worthless',
        emoji: '😰',
        color: '#FF6B6B',
        psychometricValue: 1.0
      }
    ],
    depth: 1,
    category: 'emotion',
    analyticsTag: 'emotion_sad'
  },
  {
    id: 'emotion_tired',
    keywords: ['tired', 'exhausted', 'drained', 'worn out', 'burnt out', 'depleted', 'done', 'weary', 'spent', 'fatigued', 'worn', 'beat', 'wiped', 'zoned', 'empty', 'running on empty'],
    emotion: 'tiredness',
    question: "That exhaustion is real. Emotional tiredness is just as valid as physical.",
    options: [
      {
        id: 'tired_relationship',
        text: 'Exhausted by a relationship',
        keywords: ['relationship', 'partner', 'person'],
        nextNodeId: 'tired_relationship',
        emoji: '😴',
        color: '#6C5CE7',
        psychometricValue: 0.9
      },
      {
        id: 'tired_work',
        text: 'Tired from work or responsibilities',
        keywords: ['work', 'job', 'responsibilities', 'duties'],
        nextNodeId: 'tired_work',
        emoji: '💼',
        color: '#FFD93D',
        psychometricValue: 0.4
      },
      {
        id: 'tired_life',
        text: 'Just generally exhausted',
        keywords: ['life', 'everything', 'always'],
        nextNodeId: 'tired_general',
        emoji: '😩',
        color: '#4ECDC4',
        psychometricValue: 0.6
      }
    ],
    depth: 1,
    category: 'emotion',
    analyticsTag: 'emotion_tired'
  },
  {
    id: 'emotion_fear',
    keywords: ['scared', 'afraid', 'fear', 'terrified', 'anxious', 'worried', 'nervous', 'panic', 'frightened', 'alarmed', 'uneasy', 'apprehensive', 'tense', 'on edge', 'jittery', 'fearful', 'intimidated'],
    emotion: 'fear',
    question: "Fear is your body's alarm system. It's important to listen to it.",
    options: [
      {
        id: 'fear_person',
        text: 'Afraid of someone',
        keywords: ['someone', 'person', 'they', 'them'],
        nextNodeId: 'fear_person',
        emoji: '😨',
        color: '#FF6B6B',
        psychometricValue: 1.0
      },
      {
        id: 'fear_situation',
        text: 'Afraid of a situation',
        keywords: ['situation', 'future', 'what if', 'might'],
        nextNodeId: 'fear_situation',
        emoji: '😰',
        color: '#6C5CE7',
        psychometricValue: 0.7
      },
      {
        id: 'fear_general',
        text: 'General anxiety',
        keywords: ['anxiety', 'worried', 'nervous', 'general'],
        nextNodeId: 'fear_general',
        emoji: '😟',
        color: '#4ECDC4',
        psychometricValue: 0.5
      }
    ],
    depth: 1,
    category: 'emotion',
    analyticsTag: 'emotion_fear'
  },
  {
    id: 'emotion_confused',
    keywords: ['confused', "don't know", 'not sure', 'unclear', 'lost', "don't understand", 'mixed signals', 'bewildered', 'perplexed', 'puzzled', 'baffled', 'disoriented', 'uncertain', 'ambiguous', 'contradictory'],
    emotion: 'confusion',
    question: "Confusion in relationships often means something isn't right. Let's untangle it.",
    options: [
      {
        id: 'confused_mixed',
        text: 'Getting mixed signals',
        keywords: ['mixed', 'signals', 'contradictory', 'says one thing'],
        nextNodeId: 'confused_mixed',
        emoji: '😕',
        color: '#FFD93D',
        psychometricValue: 0.8
      },
      {
        id: 'confused_behavior',
        text: "Don't understand their behavior",
        keywords: ['behavior', 'actions', 'why', 'doesn\'t make sense'],
        nextNodeId: 'confused_behavior',
        emoji: '🤔',
        color: '#6C5CE7',
        psychometricValue: 0.7
      },
      {
        id: 'confused_decision',
        text: "Not sure what to do",
        keywords: ['what to do', 'decision', 'should', 'choice'],
        nextNodeId: 'confused_decision',
        emoji: '😖',
        color: '#4ECDC4',
        psychometricValue: 0.6
      }
    ],
    depth: 1,
    category: 'emotion',
    analyticsTag: 'emotion_confused'
  }
];

// SECOND-LEVEL NODES (After emotion selection)
const BEHAVIOR_NODES: ConversationNode[] = [
  {
    id: 'anger_by_someone',
    keywords: ['someone', 'person', 'they', 'them', 'partner', 'friend', 'family'],
    question: "Who is making you angry? And what did they do?",
    options: [
      {
        id: 'anger_partner',
        text: 'My partner',
        keywords: ['partner', 'boyfriend', 'girlfriend', 'husband', 'wife'],
        nextNodeId: 'anger_partner_what',
        emoji: '💔',
        color: '#FF6B6B',
        psychometricValue: 0.9
      },
      {
        id: 'anger_family',
        text: 'Family member',
        keywords: ['family', 'mom', 'dad', 'sister', 'brother'],
        nextNodeId: 'anger_family_what',
        emoji: '👨‍👩‍👧',
        color: '#6C5CE7',
        psychometricValue: 0.8
      },
      {
        id: 'anger_friend',
        text: 'A friend',
        keywords: ['friend', 'bestie', 'bff'],
        nextNodeId: 'anger_friend_what',
        emoji: '🤝',
        color: '#4ECDC4',
        psychometricValue: 0.7
      },
      {
        id: 'anger_work',
        text: 'Someone at work',
        keywords: ['work', 'boss', 'coworker', 'colleague'],
        nextNodeId: 'anger_work_what',
        emoji: '💼',
        color: '#FFD93D',
        psychometricValue: 0.6
      }
    ],
    depth: 2,
    category: 'relationship',
    analyticsTag: 'anger_source_identified'
  },
  {
    id: 'anger_partner_what',
    keywords: ['partner', 'boyfriend', 'girlfriend', 'husband', 'wife'],
    question: "What did your partner do that made you angry?",
    options: [
      {
        id: 'partner_lied',
        text: 'They lied to me',
        keywords: ['lied', 'lie', 'lying', 'dishonest'],
        nextNodeId: 'conclusion_lying',
        emoji: '🎭',
        color: '#FF6B6B',
        psychometricValue: 0.9
      },
      {
        id: 'partner_yelled',
        text: 'They yelled at me',
        keywords: ['yelled', 'shout', 'scream', 'raised voice'],
        nextNodeId: 'conclusion_yelling',
        emoji: '📢',
        color: '#FF6B6B',
        psychometricValue: 0.9
      },
      {
        id: 'partner_disrespected',
        text: 'They disrespected me',
        keywords: ['disrespect', 'rude', 'mean', 'dismissive'],
        nextNodeId: 'conclusion_disrespect',
        emoji: '😤',
        color: '#FF6B6B',
        psychometricValue: 0.9
      },
      {
        id: 'partner_ignored',
        text: 'They ignored me',
        keywords: ['ignored', 'silent treatment', 'won\'t talk'],
        nextNodeId: 'conclusion_silent',
        emoji: '😶',
        color: '#6C5CE7',
        psychometricValue: 0.8
      }
    ],
    depth: 3,
    category: 'behavior',
    analyticsTag: 'partner_behavior_identified'
  },
  {
    id: 'sad_relationship',
    keywords: ['relationship', 'partner', 'friend', 'family'],
    question: "What's happening in the relationship that's making you sad?",
    options: [
      {
        id: 'sad_ending',
        text: 'Relationship is ending',
        keywords: ['ending', 'breaking up', 'over', 'done'],
        nextNodeId: 'conclusion_ending',
        emoji: '💔',
        color: '#FF6B6B',
        psychometricValue: 0.9
      },
      {
        id: 'sad_treated',
        text: 'Being treated badly',
        keywords: ['treated', 'bad', 'wrong', 'hurt'],
        nextNodeId: 'conclusion_abuse',
        emoji: '😢',
        color: '#FF6B6B',
        psychometricValue: 1.0
      },
      {
        id: 'sad_distant',
        text: 'Feeling distant from them',
        keywords: ['distant', 'disconnected', 'not close', 'drifted'],
        nextNodeId: 'conclusion_distance',
        emoji: '😞',
        color: '#6C5CE7',
        psychometricValue: 0.7
      },
      {
        id: 'sad_miss',
        text: 'Missing them',
        keywords: ['miss', 'missing', 'want', 'wish'],
        nextNodeId: 'conclusion_missing',
        emoji: '💭',
        color: '#4ECDC4',
        psychometricValue: 0.5
      }
    ],
    depth: 2,
    category: 'relationship',
    analyticsTag: 'sad_relationship_identified'
  },
  {
    id: 'tired_relationship',
    keywords: ['relationship', 'partner', 'person'],
    question: "What about the relationship is exhausting you?",
    options: [
      {
        id: 'tired_walking',
        text: 'Walking on eggshells',
        keywords: ['eggshells', 'careful', 'afraid', 'tense'],
        nextNodeId: 'conclusion_toxic',
        emoji: '🥚',
        color: '#FF6B6B',
        psychometricValue: 1.0
      },
      {
        id: 'tired_effort',
        text: 'Doing all the work',
        keywords: ['all the work', 'only me', 'one sided', 'effort'],
        nextNodeId: 'conclusion_one_sided',
        emoji: '😤',
        color: '#FF6B6B',
        psychometricValue: 0.9
      },
      {
        id: 'tired_drama',
        text: 'Constant drama or conflict',
        keywords: ['drama', 'conflict', 'fighting', 'arguing'],
        nextNodeId: 'conclusion_conflict',
        emoji: '⚔️',
        color: '#6C5CE7',
        psychometricValue: 0.8
      },
      {
        id: 'tired_unsupported',
        text: 'Not feeling supported',
        keywords: ['unsupported', 'alone', 'no help', 'not there'],
        nextNodeId: 'conclusion_unsupported',
        emoji: '😔',
        color: '#4ECDC4',
        psychometricValue: 0.7
      }
    ],
    depth: 2,
    category: 'relationship',
    analyticsTag: 'tired_relationship_identified'
  },
  {
    id: 'fear_person',
    keywords: ['someone', 'person', 'they', 'them'],
    question: "Who are you afraid of? And why?",
    options: [
      {
        id: 'fear_violence',
        text: 'Afraid they might hurt me',
        keywords: ['hurt', 'violence', 'physical', 'harm'],
        nextNodeId: 'conclusion_danger',
        emoji: '🚨',
        color: '#FF6B6B',
        psychometricValue: 1.0
      },
      {
        id: 'fear_control',
        text: 'Afraid of their control',
        keywords: ['control', 'controlling', 'power', 'dominate'],
        nextNodeId: 'conclusion_control',
        emoji: '🎮',
        color: '#FF6B6B',
        psychometricValue: 0.9
      },
      {
        id: 'fear_reaction',
        text: 'Afraid of their reaction',
        keywords: ['reaction', 'response', 'what they\'ll do', 'how they\'ll react'],
        nextNodeId: 'conclusion_fear_reaction',
        emoji: '😰',
        color: '#6C5CE7',
        psychometricValue: 0.8
      },
      {
        id: 'fear_leaving',
        text: 'Afraid to leave',
        keywords: ['leave', 'leaving', 'can\'t leave', 'stuck'],
        nextNodeId: 'conclusion_trapped',
        emoji: '🔒',
        color: '#FF6B6B',
        psychometricValue: 0.9
      }
    ],
    depth: 2,
    category: 'relationship',
    analyticsTag: 'fear_person_identified'
  }
];

// CONCLUSION NODES (Final CTAs and insights)
const CONCLUSION_NODES: ConversationNode[] = [
  {
    id: 'conclusion_lying',
    keywords: ['lied', 'lie', 'lying', 'dishonest'],
    question: "Lying destroys trust. Without trust, what do you really have?",
    response: "**Lying is a major red flag.** When someone lies to you, especially repeatedly, it breaks the foundation of your relationship.\n\n**What you can do:**\n• Document the lies (write them down)\n• Set clear boundaries about honesty\n• Consider if this is a pattern\n• Trust your instincts - if you feel you can't trust them, you probably can't\n\n**Log this moment** in your journal so you can track patterns over time.",
    conclusion: "Would you like to log this moment in your journal? Tracking patterns helps you see the bigger picture.",
    depth: 4,
    category: 'decision',
    psychometricWeight: 0.9,
    analyticsTag: 'conclusion_lying'
  },
  {
    id: 'conclusion_yelling',
    keywords: ['yelled', 'shout', 'scream'],
    question: "Yelling is verbal aggression. It's meant to intimidate and control.",
    response: "**Yelling is not okay.** It's a form of verbal abuse designed to make you feel small and scared.\n\n**This is serious because:**\n• It's meant to control you through fear\n• It can escalate to physical violence\n• You deserve to feel safe, not scared\n\n**What you can do:**\n• Set a boundary: \"I won't engage when you're yelling\"\n• Remove yourself from the situation if possible\n• Document incidents in your journal\n• Consider your safety - if you're afraid, reach out for help\n\n**National Domestic Violence Hotline:** 1-800-799-7233",
    conclusion: "Your safety matters. Would you like to log this incident and explore safety planning?",
    depth: 4,
    category: 'decision',
    psychometricWeight: 1.0,
    analyticsTag: 'conclusion_yelling'
  },
  {
    id: 'conclusion_toxic',
    keywords: ['eggshells', 'toxic', 'walking'],
    question: "Walking on eggshells means you're living in fear. That's not a relationship - that's survival.",
    response: "**If you're constantly walking on eggshells, this relationship is toxic.**\n\n**Signs you're in a toxic relationship:**\n• You feel anxious around them\n• You can't be yourself\n• You're always trying to avoid conflict\n• You feel like you're the problem\n\n**You deserve:**\n• To feel safe and comfortable\n• To be yourself without fear\n• Peace and stability\n• A relationship that adds to your life, not drains it\n\n**Consider:** Is this relationship worth your mental health?",
    conclusion: "Would you like to take our relationship assessment to see the full picture?",
    depth: 4,
    category: 'decision',
    psychometricWeight: 1.0,
    analyticsTag: 'conclusion_toxic'
  },
  {
    id: 'conclusion_danger',
    keywords: ['hurt', 'violence', 'physical', 'harm', 'danger'],
    question: "🚨 Your safety is the most important thing right now.",
    response: "**If you're afraid someone might hurt you, this is serious.**\n\n**If you're in immediate danger:**\n• Call 911\n• Get to a safe place\n• Tell someone you trust\n\n**Resources:**\n• National Domestic Violence Hotline: 1-800-799-7233\n• Text START to 88788\n• Available 24/7\n\n**Safety planning:**\n• Have a safe place to go\n• Keep important documents accessible\n• Tell someone you trust\n• Document incidents\n\n**You are not alone. Help is available.**",
    conclusion: "Are you safe right now? Would you like help creating a safety plan?",
    depth: 4,
    category: 'support',
    psychometricWeight: 1.0,
    analyticsTag: 'conclusion_danger'
  },
  {
    id: 'conclusion_one_sided',
    keywords: ['one sided', 'all the work', 'only me'],
    question: "When you're doing all the work, that's not a partnership - that's you carrying the entire relationship.",
    response: "**One-sided relationships are exhausting and unfair.**\n\n**Signs it's one-sided:**\n• You're always the one trying\n• They don't put in effort\n• You feel like you're carrying everything\n• Your needs aren't being met\n\n**The hard truth:** If they're not willing to put in effort, they're not invested in the relationship.\n\n**You deserve:**\n• Someone who matches your effort\n• A partner, not a project\n• Reciprocity and balance\n\n**Ask yourself:** How long can you keep carrying this alone?",
    conclusion: "Would you like to log this pattern and track how often you feel this way?",
    depth: 4,
    category: 'decision',
    psychometricWeight: 0.8,
    analyticsTag: 'conclusion_one_sided'
  },
  {
    id: 'conclusion_disrespect',
    keywords: ['disrespect', 'rude', 'mean', 'dismissive'],
    question: "Disrespect is never okay. You deserve to be treated with dignity.",
    response: "**Disrespectful behavior is a red flag.** When someone consistently treats you poorly, it shows they don't value you.\n\n**What disrespect looks like:**\n• Talking down to you\n• Dismissing your feelings\n• Making you feel small\n• Ignoring your boundaries\n• Belittling your opinions\n\n**This matters because:**\n• Respect is the foundation of any healthy relationship\n• You deserve to be treated with dignity\n• Disrespect often escalates\n• It erodes your self-worth over time\n\n**What you can do:**\n• Call it out: \"That was disrespectful\"\n• Set clear boundaries\n• Don't accept excuses\n• Document patterns\n• Consider if this relationship serves you",
    conclusion: "Would you like to track these incidents to see if it's a pattern?",
    depth: 4,
    category: 'decision',
    psychometricWeight: 0.9,
    analyticsTag: 'conclusion_disrespect'
  },
  {
    id: 'conclusion_silent',
    keywords: ['ignored', 'silent treatment', 'won\'t talk'],
    question: "The silent treatment is emotional manipulation. It's designed to punish and control.",
    response: "**The silent treatment is a form of emotional abuse.** It's not healthy communication - it's punishment.\n\n**Why it's harmful:**\n• It's meant to make you feel guilty\n• It's a control tactic\n• It prevents resolution\n• It creates anxiety and uncertainty\n• It's emotionally manipulative\n\n**Healthy relationships:**\n• Communicate even when upset\n• Take space but communicate about it\n• Work through conflicts together\n• Don't use silence as a weapon\n\n**What you can do:**\n• Don't chase or beg for communication\n• Set a boundary: \"I'm here when you're ready to talk\"\n• Don't accept this as normal\n• Document how often this happens\n• Consider if this is the relationship you want",
    conclusion: "Would you like to log this incident and explore communication patterns?",
    depth: 4,
    category: 'decision',
    psychometricWeight: 0.8,
    analyticsTag: 'conclusion_silent'
  },
  {
    id: 'conclusion_ending',
    keywords: ['ending', 'breaking up', 'over', 'done'],
    question: "Endings are hard, even when they're necessary. Your feelings are valid.",
    response: "**Ending a relationship is one of the hardest things we do.** Your pain is real and valid.\n\n**It's okay to feel:**\n• Sad, even if you ended it\n• Relieved, even if you're sad\n• Confused about your feelings\n• Scared about what's next\n• All of the above at once\n\n**What can help:**\n• Give yourself time to grieve\n• Talk to trusted friends or a therapist\n• Journal about your feelings\n• Focus on self-care\n• Remember why you made this choice\n\n**Moving forward:**\n• Healing takes time - be patient with yourself\n• It's okay to miss them and still know it was right\n• You're stronger than you think\n• Better days are ahead",
    conclusion: "Would you like to journal about this ending to process your feelings?",
    depth: 4,
    category: 'support',
    psychometricWeight: 0.7,
    analyticsTag: 'conclusion_ending'
  },
  {
    id: 'conclusion_abuse',
    keywords: ['treated', 'bad', 'wrong', 'hurt', 'abuse'],
    question: "Being treated badly is never your fault. Abuse is always the abuser's choice.",
    response: "**If you're being treated badly, this is serious.** Abuse is never your fault, no matter what they say.\n\n**Types of abuse:**\n• Physical: hitting, pushing, restraining\n• Emotional: insults, threats, manipulation\n• Verbal: yelling, name-calling, put-downs\n• Financial: controlling money, preventing work\n• Sexual: coercion, unwanted advances\n\n**Important:**\n• It's not your fault\n• You don't deserve this\n• You can't fix them\n• Leaving is not giving up - it's survival\n\n**If you're in danger:**\n• National Domestic Violence Hotline: 1-800-799-7233\n• Text START to 88788\n• Call 911 if immediate danger\n• Create a safety plan\n\n**You deserve safety and respect.**",
    conclusion: "Are you safe right now? Would you like help creating a safety plan?",
    depth: 4,
    category: 'support',
    psychometricWeight: 1.0,
    analyticsTag: 'conclusion_abuse'
  },
  {
    id: 'conclusion_distance',
    keywords: ['distant', 'disconnected', 'not close', 'drifted'],
    question: "Distance in relationships can happen for many reasons. Let's explore what's going on.",
    response: "**Feeling distant from someone you care about is painful.** It's important to understand why.\n\n**Possible reasons for distance:**\n• They're pulling away\n• You're protecting yourself\n• Life circumstances changed\n• Unresolved conflicts\n• Different needs or values\n\n**Questions to consider:**\n• Is this temporary or ongoing?\n• Do you want to reconnect?\n• Are they willing to work on it?\n• Is this relationship still serving you?\n\n**What you can do:**\n• Have an honest conversation about the distance\n• Express your feelings without blame\n• Ask what they need\n• Consider couples counseling if appropriate\n• Accept that some relationships naturally end\n\n**Remember:** Not all relationships are meant to last forever, and that's okay.",
    conclusion: "Would you like to explore this distance further or take our relationship assessment?",
    depth: 4,
    category: 'decision',
    psychometricWeight: 0.6,
    analyticsTag: 'conclusion_distance'
  },
  {
    id: 'conclusion_missing',
    keywords: ['miss', 'missing', 'want', 'wish'],
    question: "Missing someone is natural, even when the relationship wasn't healthy.",
    response: "**Missing someone is a normal human emotion.** It doesn't mean you made the wrong choice.\n\n**It's normal to miss:**\n• The good times you had\n• The person you thought they were\n• The comfort of familiarity\n• The future you imagined\n• Even when you know it wasn't healthy\n\n**Missing vs. wanting back:**\n• Missing is about grief and loss\n• Wanting back is about the relationship\n• You can miss someone and still know it's over\n• Nostalgia can make the past seem better than it was\n\n**What can help:**\n• Journal about what you miss vs. what you don't\n• Remember why it ended\n• Focus on the present and future\n• Give yourself time to heal\n• Talk to a therapist if the pain is overwhelming",
    conclusion: "Would you like to journal about what you're feeling to process this?",
    depth: 4,
    category: 'support',
    psychometricWeight: 0.5,
    analyticsTag: 'conclusion_missing'
  },
  {
    id: 'conclusion_conflict',
    keywords: ['drama', 'conflict', 'fighting', 'arguing'],
    question: "Constant conflict is exhausting. Healthy relationships have disagreements, not constant battles.",
    response: "**Constant conflict is a sign of deeper problems.** Healthy relationships have disagreements, not constant battles.\n\n**Red flags in conflict:**\n• Every conversation turns into a fight\n• You can't discuss anything without drama\n• Conflicts never get resolved\n• You're always walking on eggshells\n• Small things become big fights\n\n**Healthy conflict looks like:**\n• Disagreements are resolved\n• Both people can express feelings\n• You can disagree without disrespect\n• You work together to find solutions\n• You feel heard and understood\n\n**If it's constant conflict:**\n• This may not be a healthy relationship\n• Consider if the issues are fixable\n• Think about what you're getting from this\n• You deserve peace, not constant drama",
    conclusion: "Would you like to track these conflicts to see patterns?",
    depth: 4,
    category: 'decision',
    psychometricWeight: 0.8,
    analyticsTag: 'conclusion_conflict'
  },
  {
    id: 'conclusion_unsupported',
    keywords: ['unsupported', 'alone', 'no help', 'not there'],
    question: "Feeling unsupported in a relationship is lonely. You deserve someone who has your back.",
    response: "**Feeling unsupported is isolating and painful.** In healthy relationships, partners support each other.\n\n**Signs you're unsupported:**\n• They're not there when you need them\n• They minimize your struggles\n• They don't celebrate your wins\n• You feel alone even when together\n• They don't have your back\n\n**You deserve:**\n• Someone who shows up for you\n• Emotional support when you need it\n• Someone who celebrates your successes\n• A partner who has your back\n• To feel supported, not alone\n\n**What you can do:**\n• Express your need for support\n• Give specific examples of when you felt unsupported\n• See if they're willing to change\n• Consider if this is a pattern\n• Remember: you can't make someone supportive",
    conclusion: "Would you like to log these moments to see if it's a pattern?",
    depth: 4,
    category: 'decision',
    psychometricWeight: 0.7,
    analyticsTag: 'conclusion_unsupported'
  },
  {
    id: 'conclusion_control',
    keywords: ['control', 'controlling', 'power', 'dominate'],
    question: "Control is about power, not love. Healthy relationships are partnerships, not power struggles.",
    response: "**Controlling behavior is a major red flag.** It's about power and dominance, not care.\n\n**Signs of control:**\n• They tell you what to do\n• They isolate you from others\n• They monitor your activities\n• They make decisions for you\n• They get angry when you disagree\n• They use threats or intimidation\n\n**This is serious because:**\n• Control often escalates\n• It can lead to abuse\n• It erodes your autonomy\n• It's not love - it's possession\n• You deserve freedom and autonomy\n\n**What you can do:**\n• Set clear boundaries\n• Don't justify or explain your choices\n• Maintain your independence\n• Reach out to trusted friends/family\n• Consider your safety - control can escalate\n\n**If you're afraid:**\n• National Domestic Violence Hotline: 1-800-799-7233",
    conclusion: "Would you like to document these incidents and explore safety planning?",
    depth: 4,
    category: 'support',
    psychometricWeight: 1.0,
    analyticsTag: 'conclusion_control'
  },
  {
    id: 'conclusion_fear_reaction',
    keywords: ['reaction', 'response', 'what they\'ll do', 'how they\'ll react'],
    question: "If you're afraid of their reaction, that's a sign something is very wrong.",
    response: "**Being afraid of someone's reaction is a serious red flag.** In healthy relationships, you shouldn't fear your partner.\n\n**This suggests:**\n• They've reacted badly before\n• You're walking on eggshells\n• You're modifying your behavior to avoid conflict\n• This is not a safe relationship\n\n**Healthy relationships:**\n• You can express yourself without fear\n• Disagreements don't lead to explosions\n• You feel safe to be yourself\n• They respect your feelings even when they disagree\n\n**If you're afraid of their reaction:**\n• This is not normal or healthy\n• Consider your safety\n• Document incidents\n• Reach out for support\n• You deserve to feel safe",
    conclusion: "Would you like to explore safety planning or take our relationship assessment?",
    depth: 4,
    category: 'support',
    psychometricWeight: 0.9,
    analyticsTag: 'conclusion_fear_reaction'
  },
  {
    id: 'conclusion_trapped',
    keywords: ['leave', 'leaving', 'can\'t leave', 'stuck'],
    question: "Feeling trapped is overwhelming. But you have options, even when it doesn't feel like it.",
    response: "**Feeling trapped is one of the hardest places to be.** But you have more options than you think.\n\n**Why you might feel trapped:**\n• Financial dependence\n• Fear of being alone\n• Fear of their reaction\n• Children or shared responsibilities\n• Low self-worth\n• Hope they'll change\n\n**The truth:**\n• You always have options\n• There are resources to help\n• You're stronger than you think\n• Staying doesn't make it better\n• You deserve freedom\n\n**Resources that can help:**\n• National Domestic Violence Hotline: 1-800-799-7233\n• Local shelters and support services\n• Financial assistance programs\n• Legal aid services\n• Therapy and counseling\n\n**You can leave. You deserve to leave. Help is available.**",
    conclusion: "Would you like help finding resources or creating an exit plan?",
    depth: 4,
    category: 'support',
    psychometricWeight: 1.0,
    analyticsTag: 'conclusion_trapped'
  }
];

// Combine all nodes
const ALL_NODES: ConversationNode[] = [
  ...EMOTION_NODES,
  ...BEHAVIOR_NODES,
  ...CONCLUSION_NODES
];

// ===== CONVERSATION TREE ENGINE =====

export class ConversationTreeEngine {
  private currentNode: ConversationNode | null = null;
  private path: ConversationPath;
  private nodes: Map<string, ConversationNode>;
  private variationSeed: number; // For dynamic variation

  constructor() {
    this.nodes = new Map();
    ALL_NODES.forEach(node => this.nodes.set(node.id, node));
    this.path = {
      nodes: [],
      startTime: new Date().toISOString()
    };
    this.variationSeed = Math.random() * 1000; // Random seed for variation
  }

  /**
   * Enhanced keyword matching with verbatim detection and fuzzy matching
   */
  private matchKeywords(message: string, keywords: string[]): number {
    const msg = message.toLowerCase().trim();
    let score = 0;
    
    // Exact matches get highest score
    keywords.forEach(kw => {
      const keyword = kw.toLowerCase();
      if (msg === keyword) {
        score += 10; // Exact verbatim match
      } else if (msg.includes(keyword)) {
        score += 5; // Contains keyword
      } else if (keyword.split(' ').some(word => msg.includes(word))) {
        score += 2; // Partial word match
      }
    });
    
    // Check for common variations and synonyms
    const variations: Record<string, string[]> = {
      'angry': ['mad', 'furious', 'pissed', 'irritated', 'annoyed'],
      'sad': ['depressed', 'down', 'unhappy', 'miserable', 'blue'],
      'tired': ['exhausted', 'drained', 'worn out', 'burnt out', 'weary'],
      'scared': ['afraid', 'fear', 'terrified', 'anxious', 'worried'],
      'confused': ["don't know", 'not sure', 'unclear', 'lost', 'bewildered']
    };
    
    Object.entries(variations).forEach(([key, syns]) => {
      if (keywords.includes(key)) {
        syns.forEach(syn => {
          if (msg.includes(syn)) {
            score += 3;
          }
        });
      }
    });
    
    return score;
  }

  /**
   * Get dynamic variation for responses (makes it feel non-predictable)
   */
  private getVariation(options: ConversationOption[]): ConversationOption[] {
    if (options.length <= 1) return options;
    
    // Shuffle options based on variation seed (but keep same options)
    const shuffled = [...options];
    const seed = this.variationSeed;
    
    // Simple shuffle based on seed
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor((seed + i) % (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    return shuffled;
  }

  /**
   * Find the best matching node based on user message with enhanced matching
   */
  findMatchingNode(message: string, chatHistory: ChatMessage[]): ConversationNode | null {
    const msg = message.toLowerCase().trim();
    
    // Check if we're continuing a path
    if (this.currentNode && this.currentNode.options) {
      // Enhanced option matching
      let bestOption: ConversationOption | null = null;
      let bestScore = 0;
      
      for (const option of this.currentNode.options) {
        const score = this.matchKeywords(msg, option.keywords);
        if (score > bestScore) {
          bestScore = score;
          bestOption = option;
        }
      }
      
      if (bestOption && bestScore > 0) {
        const nextNode = this.nodes.get(bestOption.nextNodeId);
        if (nextNode) {
          this.currentNode = nextNode;
          this.path.nodes.push(nextNode.id);
          return nextNode;
        }
      }
    }

    // Find entry point based on enhanced keyword matching
    let bestMatch: ConversationNode | null = null;
    let bestScore = 0;

    for (const node of ALL_NODES) {
      if (node.depth === 1) { // Only check entry nodes
        const score = this.matchKeywords(msg, node.keywords);
        
        if (score > bestScore) {
          bestScore = score;
          bestMatch = node;
        }
      }
    }

    // Also check conclusion nodes if message seems to match
    if (bestScore < 3) {
      for (const node of ALL_NODES) {
        if (node.depth >= 4 && node.conclusion) {
          const score = this.matchKeywords(msg, node.keywords);
          if (score > bestScore) {
            bestScore = score;
            bestMatch = node;
          }
        }
      }
    }

    if (bestMatch && bestScore > 0) {
      this.currentNode = bestMatch;
      if (!this.path.nodes.includes(bestMatch.id)) {
        this.path.nodes.push(bestMatch.id);
      }
    }

    return bestMatch;
  }

  /**
   * Get options for current node with dynamic variation
   */
  getCurrentOptions(): ConversationOption[] {
    const options = this.currentNode?.options || [];
    // Apply variation to make it feel non-predictable
    return this.getVariation(options);
  }

  /**
   * Get current node
   */
  getCurrentNode(): ConversationNode | null {
    return this.currentNode;
  }

  /**
   * Move to next node
   */
  moveToNode(nodeId: string): ConversationNode | null {
    const node = this.nodes.get(nodeId);
    if (node) {
      this.currentNode = node;
      this.path.nodes.push(nodeId);
    }
    return node;
  }

  /**
   * Check if we've reached a conclusion
   */
  hasReachedConclusion(): boolean {
    return this.currentNode?.conclusion !== undefined;
  }

  /**
   * Get conclusion
   */
  getConclusion(): string | null {
    return this.currentNode?.conclusion || null;
  }

  /**
   * Get current path
   */
  getPath(): ConversationPath {
    return this.path;
  }

  /**
   * Complete the path
   */
  completePath(insights?: string[], score?: number): ConversationPath {
    this.path.endTime = new Date().toISOString();
    this.path.conclusion = this.currentNode?.conclusion || null;
    this.path.insights = insights;
    this.path.score = score;
    return this.path;
  }

  /**
   * Reset the conversation tree with new variation seed
   */
  reset(): void {
    this.currentNode = null;
    this.path = {
      nodes: [],
      startTime: new Date().toISOString()
    };
    this.variationSeed = Math.random() * 1000; // New seed for variation
  }

  /**
   * Calculate psychometric score from path
   */
  calculateScore(): number {
    let totalScore = 0;
    let weightSum = 0;

    this.path.nodes.forEach(nodeId => {
      const node = this.nodes.get(nodeId);
      if (node?.psychometricWeight) {
        totalScore += node.psychometricWeight;
        weightSum += 1;
      }
    });

    return weightSum > 0 ? totalScore / weightSum : 0;
  }
}

// ===== ANALYTICS =====

export class ConversationAnalytics {
  private analytics: {
    totalSessions: number;
    paths: ConversationPath[];
    mostCommonEmotions: Record<string, number>;
    mostCommonBehaviors: Record<string, number>;
    averageDepth: number;
    completionRate: number;
    commonConclusions: Record<string, number>;
    campaignData?: CampaignData;
    studyInsights?: StudyInsights;
  };
  private participantId: string;

  constructor() {
    this.participantId = this.getOrCreateParticipantId();
    this.analytics = {
      totalSessions: 0,
      paths: [],
      mostCommonEmotions: {},
      mostCommonBehaviors: {},
      averageDepth: 0,
      completionRate: 0,
      commonConclusions: {},
      campaignData: {
        participantId: this.participantId,
        sessions: 0,
        startDate: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
        patterns: [],
        outcomes: []
      },
      studyInsights: {
        patterns: [],
        correlations: [],
        trends: [],
        recommendations: []
      }
    };
    this.loadAnalytics();
  }

  /**
   * Get or create unique participant ID for campaign/study tracking
   */
  private getOrCreateParticipantId(): string {
    let id = localStorage.getItem('participant_id');
    if (!id) {
      id = `participant_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('participant_id', id);
    }
    return id;
  }

  /**
   * Track a conversation path with enhanced analytics
   */
  trackPath(path: ConversationPath): void {
    this.analytics.paths.push(path);
    this.analytics.totalSessions++;
    
    // Update campaign data
    if (this.analytics.campaignData) {
      this.analytics.campaignData.sessions++;
      this.analytics.campaignData.lastActivity = new Date().toISOString();
    }

    // Track emotions and behaviors
    const emotionsInPath: string[] = [];
    const behaviorsInPath: string[] = [];
    
    path.nodes.forEach(nodeId => {
      const node = ALL_NODES.find(n => n.id === nodeId);
      if (node?.emotion) {
        emotionsInPath.push(node.emotion);
        this.analytics.mostCommonEmotions[node.emotion] = 
          (this.analytics.mostCommonEmotions[node.emotion] || 0) + 1;
      }
      if (node?.category === 'behavior') {
        const tag = node.analyticsTag || node.id;
        behaviorsInPath.push(tag);
        this.analytics.mostCommonBehaviors[tag] = 
          (this.analytics.mostCommonBehaviors[tag] || 0) + 1;
      }
    });

    // Update conclusion counts
    if (path.conclusion) {
      this.analytics.commonConclusions[path.conclusion] = 
        (this.analytics.commonConclusions[path.conclusion] || 0) + 1;
      
      // Track outcomes in campaign data
      if (this.analytics.campaignData && !this.analytics.campaignData.outcomes.includes(path.conclusion)) {
        this.analytics.campaignData.outcomes.push(path.conclusion);
      }
    }

    // Update patterns in campaign data
    if (this.analytics.campaignData) {
      behaviorsInPath.forEach(behavior => {
        if (!this.analytics.campaignData!.patterns.includes(behavior)) {
          this.analytics.campaignData!.patterns.push(behavior);
        }
      });
    }

    // Calculate metrics
    const depths = this.analytics.paths.map(p => p.nodes.length);
    this.analytics.averageDepth = depths.length > 0 
      ? depths.reduce((a, b) => a + b, 0) / depths.length 
      : 0;

    const completed = this.analytics.paths.filter(p => p.endTime).length;
    this.analytics.completionRate = this.analytics.totalSessions > 0
      ? completed / this.analytics.totalSessions
      : 0;

    // Generate study insights
    this.updateStudyInsights();

    this.saveAnalytics();
  }

  /**
   * Get analytics summary
   */
  getAnalytics(): ConversationAnalytics {
    return this.analytics;
  }

  /**
   * Update study insights based on collected data
   */
  private updateStudyInsights(): void {
    if (!this.analytics.studyInsights) return;

    // Identify patterns
    const behaviorCounts = Object.entries(this.analytics.mostCommonBehaviors);
    this.analytics.studyInsights.patterns = behaviorCounts
      .filter(([_, count]) => count >= 2)
      .map(([behavior, count]) => {
        const firstPath = this.analytics.paths.find(p => 
          p.nodes.some(n => ALL_NODES.find(node => (node.analyticsTag || node.id) === behavior))
        );
        const lastPath = [...this.analytics.paths].reverse().find(p =>
          p.nodes.some(n => ALL_NODES.find(node => (node.analyticsTag || node.id) === behavior))
        );
        
        return {
          pattern: behavior,
          frequency: count,
          severity: count >= 5 ? 'high' : count >= 3 ? 'moderate' : 'low',
          context: 'conversation',
          firstDetected: firstPath?.startTime || new Date().toISOString(),
          lastDetected: lastPath?.endTime || new Date().toISOString()
        };
      });

    // Find correlations
    const emotionBehaviorPairs: Array<{emotion: string, behavior: string}> = [];
    this.analytics.paths.forEach(path => {
      const emotions = path.nodes
        .map(id => ALL_NODES.find(n => n.id === id)?.emotion)
        .filter(Boolean) as string[];
      const behaviors = path.nodes
        .map(id => {
          const node = ALL_NODES.find(n => n.id === id);
          return node?.category === 'behavior' ? (node.analyticsTag || node.id) : null;
        })
        .filter(Boolean) as string[];
      
      emotions.forEach(emotion => {
        behaviors.forEach(behavior => {
          emotionBehaviorPairs.push({ emotion, behavior });
        });
      });
    });

    // Calculate correlations
    const correlationMap = new Map<string, number>();
    emotionBehaviorPairs.forEach(pair => {
      const key = `${pair.emotion}-${pair.behavior}`;
      correlationMap.set(key, (correlationMap.get(key) || 0) + 1);
    });

    this.analytics.studyInsights.correlations = Array.from(correlationMap.entries())
      .filter(([_, count]) => count >= 2)
      .map(([key, count]) => {
        const [emotion, behavior] = key.split('-');
        const total = this.analytics.paths.length;
        const strength = count / total;
        
        return {
          factor1: emotion,
          factor2: behavior,
          strength: Math.min(1, strength),
          significance: strength > 0.5 ? 'high' : strength > 0.3 ? 'moderate' : 'low'
        };
      });

    // Generate trends
    if (this.analytics.paths.length >= 3) {
      const recentPaths = this.analytics.paths.slice(-5);
      const olderPaths = this.analytics.paths.slice(-10, -5);
      
      if (olderPaths.length > 0) {
        const recentAvgDepth = recentPaths.reduce((sum, p) => sum + p.nodes.length, 0) / recentPaths.length;
        const olderAvgDepth = olderPaths.reduce((sum, p) => sum + p.nodes.length, 0) / olderPaths.length;
        
        this.analytics.studyInsights.trends = [{
          metric: 'conversation_depth',
          direction: recentAvgDepth > olderAvgDepth ? 'increasing' : recentAvgDepth < olderAvgDepth ? 'decreasing' : 'stable',
          rate: Math.abs(recentAvgDepth - olderAvgDepth),
          period: 'recent'
        }];
      }
    }

    // Generate recommendations
    this.analytics.studyInsights.recommendations = this.generateRecommendations();
  }

  /**
   * Generate personalized recommendations based on analytics
   */
  private generateRecommendations(): string[] {
    const recommendations: string[] = [];
    
    const topEmotion = Object.entries(this.analytics.mostCommonEmotions)
      .sort((a, b) => b[1] - a[1])[0];
    
    if (topEmotion && topEmotion[1] >= 3) {
      recommendations.push(`You frequently experience ${topEmotion[0]}. Consider exploring this pattern in your journal.`);
    }

    const criticalPatterns = this.analytics.studyInsights?.patterns.filter(p => p.severity === 'critical') || [];
    if (criticalPatterns.length > 0) {
      recommendations.push(`Critical patterns detected: ${criticalPatterns.map(p => p.pattern).join(', ')}. These need immediate attention.`);
    }

    if (this.analytics.completionRate < 0.5) {
      recommendations.push('Consider completing conversations to get full insights and recommendations.');
    }

    return recommendations;
  }

  /**
   * Get insights from analytics
   */
  getInsights(): string[] {
    const insights: string[] = [];
    
    // Most common emotion
    const topEmotion = Object.entries(this.analytics.mostCommonEmotions)
      .sort((a, b) => b[1] - a[1])[0];
    if (topEmotion) {
      insights.push(`You most commonly feel ${topEmotion[0]} in your conversations (${topEmotion[1]} times).`);
    }

    // Most common behavior
    const topBehavior = Object.entries(this.analytics.mostCommonBehaviors)
      .sort((a, b) => b[1] - a[1])[0];
    if (topBehavior) {
      insights.push(`The most common issue you discuss is ${topBehavior[0].replace(/_/g, ' ')} (${topBehavior[1]} times).`);
    }

    // Average depth
    if (this.analytics.averageDepth > 3) {
      insights.push(`You tend to have deep conversations (average ${this.analytics.averageDepth.toFixed(1)} steps).`);
    }

    // Add study insights
    if (this.analytics.studyInsights?.recommendations.length) {
      insights.push(...this.analytics.studyInsights.recommendations);
    }

    return insights;
  }

  /**
   * Get campaign data for research/study purposes
   */
  getCampaignData(): CampaignData | undefined {
    return this.analytics.campaignData;
  }

  /**
   * Get study insights
   */
  getStudyInsights(): StudyInsights | undefined {
    return this.analytics.studyInsights;
  }

  /**
   * Load analytics from storage
   */
  private loadAnalytics(): void {
    try {
      const stored = localStorage.getItem('conversation_analytics');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge with defaults to ensure all fields exist
        this.analytics = {
          ...this.analytics,
          ...parsed,
          campaignData: parsed.campaignData || this.analytics.campaignData,
          studyInsights: parsed.studyInsights || this.analytics.studyInsights
        };
        // Ensure participant ID is set
        if (this.analytics.campaignData) {
          this.analytics.campaignData.participantId = this.participantId;
        }
      }
    } catch (error) {
      console.error('Failed to load analytics:', error);
    }
  }

  /**
   * Save analytics to storage
   */
  private saveAnalytics(): void {
    try {
      localStorage.setItem('conversation_analytics', JSON.stringify(this.analytics));
    } catch (error) {
      console.error('Failed to save analytics:', error);
    }
  }
}

// Export singleton
export const conversationTree = new ConversationTreeEngine();
export const conversationAnalytics = new ConversationAnalytics();
