import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, User, Send, Trash2, AlertCircle, Sparkles, Wifi, WifiOff } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { toast } from 'sonner';
import { getChatHistory, saveChatMessage, clearChatHistory, getChatHistorySync, getJournalEntriesSync, getSettingSync } from '../lib/storage';
import { getHybridAIResponse } from '../lib/hybridAICounselor';
import type { ChatMessage } from '../lib/types';
import { logger } from '../lib/logger';
import { conversationTree, conversationAnalytics, type ConversationOption } from '../lib/conversationTree';
import { gamification } from '../lib/gamification';

export function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [aiSource, setAiSource] = useState<'rule-based' | 'cohere'>('rule-based');
  const [conversationOptions, setConversationOptions] = useState<ConversationOption[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadMessages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const loadMessages = async () => {
    try {
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise<ChatMessage[]>((_, reject) => {
        setTimeout(() => reject(new Error('Load timeout')), 3000);
      });
      
      const history = await Promise.race([
        getChatHistory(),
        timeoutPromise
      ]);
      
      if (history.length === 0) {
        // Welcome message - load entries in background, don't block
        try {
          const entries = await Promise.race([
            getJournalEntries(),
            new Promise<JournalEntry[]>((_, reject) => setTimeout(() => reject(new Error('Timeout')), 2000))
          ]);
          loadWelcomeMessage(entries);
        } catch {
          // Fallback to sync, but don't block
          try {
            const entries = getJournalEntriesSync();
            loadWelcomeMessage(entries);
          } catch {
            // Show basic welcome if all fails
            loadWelcomeMessage([]);
          }
        }
      } else {
        setMessages(history);
      }
    } catch {
      // Fallback to sync
      try {
        const history = getChatHistorySync();
        if (history.length === 0) {
          try {
            const entries = getJournalEntriesSync();
            loadWelcomeMessage(entries);
          } catch {
            loadWelcomeMessage([]);
          }
        } else {
          setMessages(history);
        }
      } catch {
        // Show basic welcome if all fails
        loadWelcomeMessage([]);
      }
    }
  };

  const loadWelcomeMessage = (entries: any[]) => {
      const recentFlags = entries.slice(0, 5).flatMap(e => e.analysis?.flags || []);
      
      let welcomeContent = "Hello! I'm your FlagSense AI counselor. I'm here to listen, support you, and provide information about relationship patterns. Everything you share is private and stays on your device.";
      
      if (entries.length > 5) {
        welcomeContent += `\n\n📊 I can see you've logged ${entries.length} moments. That shows real self-awareness and courage.`;
        if (recentFlags.length > 3) {
          welcomeContent += ` I've noticed some patterns in your recent entries - would you like to explore those together?`;
        }
      }
      
      welcomeContent += "\n\nHow are you feeling today? What's on your mind?";
      
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        role: 'assistant',
        content: welcomeContent,
        timestamp: new Date().toISOString()
      };
      setMessages([welcomeMessage]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    };

    await saveChatMessage(userMessage);
    setMessages(prev => [...prev, userMessage]);
    const userInput = input;
    setInput('');
    setIsTyping(true);
    setShowOptions(false);
    setConversationOptions([]);

    // Check conversation tree for matching node
    const matchingNode = conversationTree.findMatchingNode(userInput, messages);
    
    try {
      let entries;
      try {
        entries = await getJournalEntries();
      } catch {
        entries = getJournalEntriesSync();
      }
      
      let aiResponse;
      let responseContent = '';
      
      // If we found a matching conversation tree node
      if (matchingNode) {
        // Use conversation tree response if available
        if (matchingNode.response) {
          responseContent = matchingNode.response;
        } else if (matchingNode.question) {
          responseContent = matchingNode.question;
        } else {
          // Fall back to hybrid AI
          const hybridResponse = await getHybridAIResponse(userInput, entries, messages);
          responseContent = hybridResponse.content;
          setAiSource(hybridResponse.source);
        }
        
        // Get options for this node
        const options = conversationTree.getCurrentOptions();
        if (options.length > 0) {
          setConversationOptions(options);
          setShowOptions(true);
        }
        
        // Check if we reached a conclusion
        if (conversationTree.hasReachedConclusion()) {
          const conclusion = conversationTree.getConclusion();
          if (conclusion) {
            responseContent += `\n\n${conclusion}`;
          }
          
          // Complete path and track analytics
          const score = conversationTree.calculateScore();
          const path = conversationTree.completePath([], score);
          conversationAnalytics.trackPath(path);
          
          // Track gamification
          gamification.trackConversation(path.nodes.length);
          
          // Generate psychometric assessment if we have enough data
          try {
            const { psychometricAssessment } = await import('../lib/psychometricAssessment');
            const assessment = psychometricAssessment.assessFromConversation(path);
            if (assessment.riskLevel === 'critical' || assessment.riskLevel === 'high') {
              responseContent += `\n\n**⚠️ Relationship Health Assessment:**\nYour conversation indicates ${assessment.riskLevel} risk level. Consider reviewing your insights dashboard for detailed analysis.`;
            }
          } catch (error) {
            // Psychometric assessment optional
          }
          
          // Show insights if available
          const insights = conversationAnalytics.getInsights();
          if (insights.length > 0) {
            responseContent += `\n\n**💡 Insights from your patterns:**\n${insights.slice(0, 3).map(i => `• ${i}`).join('\n')}`;
          }
        }
      } else {
        // No matching node, use hybrid AI
        aiResponse = await getHybridAIResponse(userInput, entries, messages);
        responseContent = aiResponse.content;
        setAiSource(aiResponse.source);
        
        // Check if hybrid AI response triggers a conversation tree node
        const followupNode = conversationTree.findMatchingNode(userInput, [...messages, userMessage]);
        if (followupNode) {
          const options = conversationTree.getCurrentOptions();
          if (options.length > 0) {
            setConversationOptions(options);
            setShowOptions(true);
          }
        }
      }
      
      // Show error toast if enhanced AI failed but we're using fallback
      if (aiResponse?.error) {
        let enhancedAI = false;
        try {
          enhancedAI = await getSetting('enhancedAI', false);
        } catch {
          enhancedAI = getSettingSync('enhancedAI', false);
        }
        
        if (enhancedAI) {
          toast.error(aiResponse.error, {
            duration: 4000
          });
        }
      }

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date().toISOString()
      };

      await saveChatMessage(assistantMessage);
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    } catch (error) {
      logger.logError(error instanceof Error ? error : new Error('Error getting AI response'), {
        context: 'Chat',
        action: 'handleSend'
      });
      
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm having trouble responding right now. Please try again.",
        timestamp: new Date().toISOString()
      };
      
      await saveChatMessage(errorMessage);
      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
    }
  };

  const handleOptionClick = async (option: ConversationOption) => {
    // Set input to option text and send
    setInput(option.text);
    
    // Move conversation tree to next node
    const nextNode = conversationTree.moveToNode(option.nextNodeId);
    
    if (nextNode) {
      // Create a user message with the option
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: option.text,
        timestamp: new Date().toISOString()
      };
      
      await saveChatMessage(userMessage);
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      setIsTyping(true);
      setShowOptions(false);
      setConversationOptions([]);
      
      // Get response for this node
      let responseContent = '';
      if (nextNode.response) {
        responseContent = nextNode.response;
      } else if (nextNode.question) {
        responseContent = nextNode.question;
      }
      
      // Get next options
      const options = conversationTree.getCurrentOptions();
      if (options.length > 0) {
        setConversationOptions(options);
        setShowOptions(true);
      }
      
      // Check for conclusion
      if (conversationTree.hasReachedConclusion()) {
        const conclusion = conversationTree.getConclusion();
        if (conclusion) {
          responseContent += `\n\n${conclusion}`;
        }
        
        // Complete and track
        const score = conversationTree.calculateScore();
        const path = conversationTree.completePath([], score);
        conversationAnalytics.trackPath(path);
        
        // Track gamification
        gamification.trackConversation(path.nodes.length);
        
        // Generate psychometric assessment
        try {
          const { psychometricAssessment } = await import('../lib/psychometricAssessment');
          const assessment = psychometricAssessment.assessFromConversation(path);
          if (assessment.riskLevel === 'critical' || assessment.riskLevel === 'high') {
            responseContent += `\n\n**⚠️ Assessment:** ${assessment.riskLevel} risk level detected. Check your insights for details.`;
          }
        } catch (error) {
          // Optional
        }
      }
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date().toISOString()
      };
      
      await saveChatMessage(assistantMessage);
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }
  };

  const handleClearHistory = async () => {
    if (confirm('Are you sure you want to clear all chat history? This cannot be undone.')) {
      await clearChatHistory();
      await loadMessages();
      toast.success('Chat history cleared');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100dvh-200px)] h-[calc(100vh-200px)] flex flex-col">
      {/* Header */}
      <div className="bg-white rounded-t-3xl p-4 shadow-lg border-4 border-[#1A1A2E] border-b-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#6C5CE7] rounded-2xl border-3 border-[#1A1A2E] relative">
              <Bot className="w-6 h-6 text-white" strokeWidth={3} />
              {aiSource === 'cohere' && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#4ECDC4] rounded-full border-2 border-white flex items-center justify-center">
                  <Sparkles className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-[#1A1A2E]">AI Counselor</h3>
                {aiSource === 'cohere' && (
                  <span className="px-2 py-0.5 bg-[#4ECDC4] text-white text-xs rounded-full border-2 border-[#1A1A2E] font-bold">
                    Enhanced
                  </span>
                )}
              </div>
              <p className="text-xs text-[#495057]">
                {aiSource === 'cohere' ? 'Powered by Cohere AI' : 'Always here to listen'}
              </p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleClearHistory}
            className="hover:bg-[#FF6B6B] text-[#FF6B6B] hover:text-white border-2 border-[#FF6B6B] rounded-xl"
            aria-label="Clear chat history"
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" />
          </Button>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-[#FFD93D] border-x-4 border-[#1A1A2E] p-3">
        <div className="flex items-start gap-2">
          <div className="w-6 h-6 bg-white rounded-lg border-2 border-[#1A1A2E] flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-4 h-4 text-[#1A1A2E]" strokeWidth={3} />
          </div>
          <p className="text-xs text-[#1A1A2E]">
            This AI provides information and support, but is not a substitute for professional therapy. 
            If you're in crisis, please call 988 (Suicide & Crisis Lifeline) or 1-800-799-7233 (Domestic Violence Hotline).
          </p>
        </div>
      </div>

      {/* Messages */}
      <div 
        className="flex-1 bg-[#F8F9FA] border-x-4 border-[#1A1A2E] overflow-y-auto p-4 space-y-4"
        role="log"
        aria-label="Chat messages"
        aria-live="polite"
        aria-atomic="false"
      >
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div 
                className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border-3 border-[#1A1A2E] ${
                  message.role === 'user'
                    ? 'bg-[#4ECDC4]'
                    : 'bg-[#6C5CE7]'
                }`}
                aria-label={message.role === 'user' ? 'Your message' : 'AI counselor response'}
              >
                {message.role === 'user' ? (
                  <User className="w-5 h-5 text-white" strokeWidth={3} aria-hidden="true" />
                ) : (
                  <Bot className="w-5 h-5 text-white" strokeWidth={3} aria-hidden="true" />
                )}
              </div>
              <div className={`flex-1 max-w-[80%] ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`rounded-2xl p-4 border-3 border-[#1A1A2E] ${
                  message.role === 'user'
                    ? 'bg-[#4ECDC4] text-[#1A1A2E]'
                    : 'bg-white text-[#1A1A2E]'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                <p className="text-xs text-[#495057] mt-1 px-2">
                  {new Date(message.timestamp).toLocaleTimeString('en-US', {
                    hour: 'numeric',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#6C5CE7] border-3 border-[#1A1A2E] flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" strokeWidth={3} />
            </div>
            <div className="bg-white rounded-2xl p-4 border-3 border-[#1A1A2E]">
              <div className="flex gap-1">
                <motion.div
                  className="w-2 h-2 bg-[#6C5CE7] rounded-full"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="w-2 h-2 bg-[#6C5CE7] rounded-full"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div
                  className="w-2 h-2 bg-[#6C5CE7] rounded-full"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Interactive Conversation Options */}
      {showOptions && conversationOptions.length > 0 && (
        <div className="bg-[#F8F9FA] border-x-4 border-[#1A1A2E] border-t-4 border-[#1A1A2E] p-4">
          <p className="text-sm text-[#495057] mb-3 font-bold">💬 Choose what resonates:</p>
          <div className="flex flex-wrap gap-2">
            <AnimatePresence>
              {conversationOptions.map((option) => (
                <motion.button
                  key={option.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => handleOptionClick(option)}
                  className="px-4 py-2.5 bg-white border-3 border-[#1A1A2E] rounded-2xl text-sm hover:scale-105 transition-all font-bold shadow-md hover:shadow-lg"
                  style={{
                    backgroundColor: option.color || '#FFFFFF',
                    color: '#1A1A2E'
                  }}
                >
                  {option.emoji && <span className="mr-2">{option.emoji}</span>}
                  {option.text}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="bg-white rounded-b-3xl border-4 border-[#1A1A2E] border-t-0 p-4 shadow-lg">
        <div className="flex gap-3">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
            className="resize-none bg-[#F8F9FA] border-3 border-[#1A1A2E] rounded-xl"
            rows={2}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="self-end bg-[#6C5CE7] hover:bg-[#5B4BC6] border-4 border-[#1A1A2E] rounded-xl font-bold"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" strokeWidth={3} aria-hidden="true" />
          </Button>
        </div>
      </div>

      {/* Quick Prompts */}
      {messages.length <= 1 && (
        <div className="mt-4 flex flex-wrap gap-2">
          <p className="w-full text-sm text-[#495057] mb-2 font-bold">💬 Try asking about:</p>
          {[
            'I think I\'m being manipulated',
            'I feel so tired and drained',
            'They lied to me',
            'I\'m frustrated and angry',
            'Am I being gaslighted?',
            'I feel worthless',
            'Should I leave?',
            'How do I set boundaries?',
            'Feeling isolated from friends',
            'I still love them but...'
          ].map((prompt) => (
            <button
              key={prompt}
              onClick={() => setInput(prompt)}
              className="px-4 py-2 bg-white border-3 border-[#1A1A2E] rounded-2xl text-sm hover:bg-[#6C5CE7] hover:text-white transition-colors font-bold"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}