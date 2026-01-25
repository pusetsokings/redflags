import type { ChatMessage, JournalEntry } from './types';
import { logger } from './logger';

const COHERE_API_URL = 'https://api.cohere.ai/v1/chat';

// System prompt for Cohere AI
const SYSTEM_PROMPT = `You are a compassionate, non-judgmental AI counselor for FlagSense, an app that helps people identify toxic relationship patterns. Your role is to:

1. **Listen actively and empathetically** - Validate feelings without dismissing them
2. **Ask thoughtful questions** - Help users explore their situation rather than lecturing
3. **Recognize red flags** - Identify patterns like manipulation, gaslighting, abuse, control, disrespect
4. **Prioritize safety** - Always escalate if there's danger (physical abuse, suicidal thoughts, stalking)
5. **Be conversational** - Speak like a supportive friend, not a textbook
6. **Avoid assumptions** - Ask clarifying questions instead of jumping to conclusions
7. **Respect autonomy** - Users make their own decisions; guide, don't command

**CRITICAL SAFETY RULES:**
- If user mentions physical violence, suicidal thoughts, or immediate danger → Provide crisis resources immediately (988 for suicide, 1-800-799-7233 for domestic violence, 911 for immediate danger)
- Never minimize abuse or make excuses for abusers
- Trust the user's perception of their reality

**CONVERSATION STYLE:**
- Use "I hear you" and "That makes sense" instead of clinical language
- Ask ONE focused question at a time
- Keep responses concise (2-4 sentences usually)
- Use empathy statements that match their emotion (angry, sad, confused, tired)
- When they describe behavior, ask: "How does that make you feel?"
- When they express emotion, ask: "What's happening that makes you feel this way?"
- Progression: WHO → WHAT they do → HOW it affects you → HOW LONG → WHAT you've tried → WHAT keeps you there

**RED FLAGS TO RECOGNIZE:**
Manipulation, gaslighting, lying, cheating, yelling, disrespect, isolation, jealousy, silent treatment, criticism, threats, controlling behavior, financial abuse, physical violence, stalking

**NEVER:**
- Tell them what to do ("You should leave")
- Minimize ("It's not that bad")
- Blame them ("Why did you stay?")
- Give generic advice
- Use therapy jargon`;

export interface CohereConfig {
  apiKey: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface CohereResponse {
  success: boolean;
  message?: string;
  error?: string;
  tokensUsed?: number;
}

// Build context from journal entries
function buildJournalContext(entries: JournalEntry[]): string {
  if (entries.length === 0) return '';
  
  const recentEntries = entries.slice(0, 5);
  const flagCounts = new Map<string, number>();
  let totalMood = 0;
  
  recentEntries.forEach(entry => {
    totalMood += entry.mood;
    entry.analysis?.flags?.forEach(flag => {
      flagCounts.set(flag.type, (flagCounts.get(flag.type) || 0) + 1);
    });
  });
  
  const avgMood = totalMood / recentEntries.length;
  const topFlags = Array.from(flagCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([type]) => type);
  
  let context = `\n\n**USER'S JOURNAL CONTEXT:**\n`;
  context += `- Total moments logged: ${entries.length}\n`;
  context += `- Recent average mood: ${avgMood.toFixed(1)}/5 ${avgMood < 2.5 ? '(concerning - low mood)' : avgMood < 3.5 ? '(moderate)' : '(relatively positive)'}\n`;
  
  if (topFlags.length > 0) {
    context += `- Most common red flags: ${topFlags.join(', ')}\n`;
  }
  
  if (recentEntries.length > 0) {
    const latestEntry = recentEntries[0];
    context += `- Latest entry (${new Date(latestEntry.date).toLocaleDateString()}): ${latestEntry.relationshipType} relationship, mood ${latestEntry.mood}/5\n`;
  }
  
  return context;
}

// Call Cohere API
export async function getCohereResponse(
  userMessage: string,
  chatHistory: ChatMessage[],
  journalEntries: JournalEntry[],
  config: CohereConfig
): Promise<CohereResponse> {
  try {
    // Validate API key
    if (!config.apiKey || config.apiKey.trim() === '') {
      return {
        success: false,
        error: 'API key is required'
      };
    }

    // Build conversation history for Cohere
    const journalContext = buildJournalContext(journalEntries);
    const conversationHistory = chatHistory
      .filter(msg => msg.id !== 'welcome') // Exclude welcome message
      .slice(-10) // Last 10 messages for context
      .map(msg => ({
        role: msg.role === 'user' ? 'USER' : 'CHATBOT',
        message: msg.content
      }));

    // Make API call
    const response = await fetch(COHERE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        message: userMessage,
        model: config.model || 'command-r', // Free tier model
        preamble: SYSTEM_PROMPT + journalContext,
        chat_history: conversationHistory,
        temperature: config.temperature || 0.7,
        max_tokens: config.maxTokens || 500,
        connectors: [] // Disable web search for privacy
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // Handle specific errors
      if (response.status === 401) {
        return {
          success: false,
          error: 'Invalid API key. Please check your Cohere API key in settings.'
        };
      }
      
      if (response.status === 429) {
        return {
          success: false,
          error: 'Rate limit exceeded. You\'ve used your free monthly quota. Falling back to offline mode.'
        };
      }
      
      return {
        success: false,
        error: errorData.message || `API error: ${response.status}`
      };
    }

    const data = await response.json();
    
    return {
      success: true,
      message: data.text || data.message,
      tokensUsed: data.meta?.tokens?.total_tokens
    };
    
  } catch (error) {
    logger.logError(error instanceof Error ? error : new Error('Cohere API error'), {
      context: 'cohereService',
      action: 'getCohereResponse'
    });
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error. Please check your connection.'
    };
  }
}

// Test API key validity
export async function testCohereApiKey(apiKey: string): Promise<boolean> {
  try {
    const response = await fetch(COHERE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'test',
        model: 'command-r'
      })
    });
    
    return response.ok || response.status === 429; // 429 means key works but quota exceeded
  } catch {
    return false;
  }
}
