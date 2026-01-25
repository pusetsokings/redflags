export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood: number; // 1-5 scale
  emotions: string[];
  context: string; // romantic, workplace, family, friendship
  analysis?: AnalysisResult;
}

export interface AnalysisResult {
  flags: RedFlag[];
  sentiment: number; // -1 to 1
  concerns: string[];
  suggestions: string[];
  severity: 'low' | 'moderate' | 'high' | 'critical';
}

export interface RedFlag {
  type: string;
  category: string;
  confidence: number;
  evidence: string[];
  description: string;
  severity: 'mild' | 'moderate' | 'severe';
}

export interface AssessmentResult {
  overallScore: number;
  dimensions: {
    trust: number;
    communication: number;
    respect: number;
    independence: number;
    safety: number;
    emotional: number;
  };
  topConcerns: string[];
  recommendations: string[];
}

export interface RedFlagDefinition {
  id: string;
  name: string;
  category: string;
  description: string;
  examples: string[];
  severity: 'mild' | 'moderate' | 'severe';
  whatToDo: string[];
  howToCounter: {
    recognizeIt: string[];
    responseStrategies: string[];
    scriptExamples?: string[];
    boundariesToSet: string[];
    whenToLeave: string[];
  };
  resources: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface PsychometricResult {
  overallScore: number; // 0-100
  dimensions: {
    id: string;
    name: string;
    score: number;
    weight: number;
    indicators: string[];
    riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  }[];
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  insights: string[];
  recommendations: string[];
  patterns: string[];
  nextSteps: string[];
  timestamp: string;
}