import type { ChatMessage, JournalEntry } from './types';
import { generateAIResponse as generateRuleBasedResponse } from './aiCounselor';
import { getCohereResponse } from './cohereService';
import { getSetting } from './storage';
import { logger } from './logger';

export interface AIResponse {
  content: string;
  source: 'rule-based' | 'cohere';
  error?: string;
  tokensUsed?: number;
}

/**
 * Hybrid AI Counselor
 * - Tries Cohere AI first if enabled and API key is set
 * - Falls back to rule-based system if Cohere fails or is disabled
 * - Always ensures user gets a response
 */
export async function getHybridAIResponse(
  userMessage: string,
  journalEntries: JournalEntry[],
  chatHistory: ChatMessage[]
): Promise<AIResponse> {
  
  // Check if enhanced AI is enabled
  const enhancedAIEnabled = getSetting('enhancedAI', false);
  const cohereApiKey = getSetting('cohereApiKey', '');
  
  // If enhanced AI is enabled and API key exists, try Cohere
  if (enhancedAIEnabled && cohereApiKey && cohereApiKey.trim() !== '') {
    try {
      const cohereResponse = await getCohereResponse(
        userMessage,
        chatHistory,
        journalEntries,
        { apiKey: cohereApiKey }
      );
      
      if (cohereResponse.success && cohereResponse.message) {
        return {
          content: cohereResponse.message,
          source: 'cohere',
          tokensUsed: cohereResponse.tokensUsed
        };
      }
      
      // Cohere failed, fall back to rule-based
      logger.warn('Cohere failed, falling back to rule-based:', cohereResponse.error);
      
      const ruleBasedResponse = generateRuleBasedResponse(
        userMessage,
        journalEntries,
        chatHistory
      );
      
      return {
        content: ruleBasedResponse,
        source: 'rule-based',
        error: `Enhanced AI unavailable: ${cohereResponse.error}. Using offline mode.`
      };
      
    } catch (error) {
      logger.logError(error instanceof Error ? error : new Error('Error calling Cohere'), {
        context: 'hybridAICounselor',
        action: 'getHybridAIResponse'
      });
      
      // Fall back to rule-based
      const ruleBasedResponse = generateRuleBasedResponse(
        userMessage,
        journalEntries,
        chatHistory
      );
      
      return {
        content: ruleBasedResponse,
        source: 'rule-based',
        error: 'Enhanced AI unavailable. Using offline mode.'
      };
    }
  }
  
  // Enhanced AI disabled or no API key - use rule-based
  const ruleBasedResponse = generateRuleBasedResponse(
    userMessage,
    journalEntries,
    chatHistory
  );
  
  return {
    content: ruleBasedResponse,
    source: 'rule-based'
  };
}
