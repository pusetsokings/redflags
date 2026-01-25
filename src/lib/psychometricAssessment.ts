/**
 * Psychometric Assessment System
 * Dynamic, non-predictable assessment paths based on user responses
 * Provides personalized insights and recommendations
 */

import type { JournalEntry } from './types';
import { conversationTree } from './conversationTree';

export interface PsychometricDimension {
  id: string;
  name: string;
  score: number; // 0-100
  weight: number; // Importance weight
  indicators: string[];
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
}

export interface PsychometricResult {
  overallScore: number; // 0-100
  dimensions: PsychometricDimension[];
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  insights: string[];
  recommendations: string[];
  patterns: string[];
  nextSteps: string[];
  timestamp: string;
}

export interface AssessmentPath {
  pathId: string;
  nodes: string[];
  responses: Record<string, any>;
  score: number;
  completed: boolean;
}

class PsychometricAssessment {
  private dimensions: PsychometricDimension[] = [
    {
      id: 'safety',
      name: 'Safety',
      score: 50,
      weight: 1.0,
      indicators: [],
      riskLevel: 'moderate'
    },
    {
      id: 'trust',
      name: 'Trust',
      score: 50,
      weight: 0.9,
      indicators: [],
      riskLevel: 'moderate'
    },
    {
      id: 'respect',
      name: 'Respect',
      score: 50,
      weight: 0.8,
      indicators: [],
      riskLevel: 'moderate'
    },
    {
      id: 'communication',
      name: 'Communication',
      score: 50,
      weight: 0.7,
      indicators: [],
      riskLevel: 'moderate'
    },
    {
      id: 'independence',
      name: 'Independence',
      score: 50,
      weight: 0.7,
      indicators: [],
      riskLevel: 'moderate'
    },
    {
      id: 'emotional_health',
      name: 'Emotional Health',
      score: 50,
      weight: 0.8,
      indicators: [],
      riskLevel: 'moderate'
    }
  ];

  /**
   * Assess based on conversation tree path
   */
  assessFromConversation(path: { nodes: string[] }): PsychometricResult {
    // Reset dimensions
    this.dimensions.forEach(dim => {
      dim.score = 50;
      dim.indicators = [];
      dim.riskLevel = 'moderate';
    });

    // Analyze path nodes
    path.nodes.forEach(nodeId => {
      this.analyzeNode(nodeId);
    });

    // Calculate overall score
    const overallScore = this.calculateOverallScore();
    const riskLevel = this.determineRiskLevel(overallScore);

    // Generate insights
    const insights = this.generateInsights();
    const recommendations = this.generateRecommendations(riskLevel);
    const patterns = this.identifyPatterns();
    const nextSteps = this.suggestNextSteps(riskLevel);

    return {
      overallScore,
      dimensions: [...this.dimensions],
      riskLevel,
      insights,
      recommendations,
      patterns,
      nextSteps,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Assess based on journal entries
   */
  assessFromJournal(entries: JournalEntry[]): PsychometricResult {
    // Reset dimensions
    this.dimensions.forEach(dim => {
      dim.score = 50;
      dim.indicators = [];
      dim.riskLevel = 'moderate';
    });

    // Analyze entries
    entries.forEach(entry => {
      this.analyzeEntry(entry);
    });

    // Calculate overall score
    const overallScore = this.calculateOverallScore();
    const riskLevel = this.determineRiskLevel(overallScore);

    // Generate insights
    const insights = this.generateInsights();
    const recommendations = this.generateRecommendations(riskLevel);
    const patterns = this.identifyPatterns();
    const nextSteps = this.suggestNextSteps(riskLevel);

    return {
      overallScore,
      dimensions: [...this.dimensions],
      riskLevel,
      insights,
      recommendations,
      patterns,
      nextSteps,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Analyze a conversation tree node
   */
  private analyzeNode(nodeId: string): void {
    // Safety indicators
    if (nodeId.includes('danger') || nodeId.includes('violence') || nodeId.includes('fear_person')) {
      this.updateDimension('safety', -20, 'Physical danger mentioned');
      this.updateDimension('emotional_health', -15, 'Fear for safety');
    }

    if (nodeId.includes('yelling') || nodeId.includes('threat')) {
      this.updateDimension('safety', -15, 'Verbal aggression detected');
      this.updateDimension('respect', -20, 'Disrespectful behavior');
    }

    // Trust indicators
    if (nodeId.includes('lying') || nodeId.includes('cheating') || nodeId.includes('betrayal')) {
      this.updateDimension('trust', -25, 'Trust violation');
      this.updateDimension('emotional_health', -15, 'Betrayal impact');
    }

    // Respect indicators
    if (nodeId.includes('disrespect') || nodeId.includes('criticism') || nodeId.includes('blame')) {
      this.updateDimension('respect', -20, 'Lack of respect');
      this.updateDimension('emotional_health', -10, 'Emotional impact');
    }

    // Communication indicators
    if (nodeId.includes('communication') || nodeId.includes('silent') || nodeId.includes('ignored')) {
      this.updateDimension('communication', -20, 'Communication breakdown');
      this.updateDimension('emotional_health', -10, 'Isolation feeling');
    }

    // Independence indicators
    if (nodeId.includes('control') || nodeId.includes('isolat') || nodeId.includes('trapped')) {
      this.updateDimension('independence', -25, 'Control/Isolation');
      this.updateDimension('safety', -10, 'Control concerns');
    }

    // Positive indicators
    if (nodeId.includes('positive') || nodeId.includes('hope') || nodeId.includes('relief')) {
      this.updateDimension('emotional_health', +10, 'Positive emotion');
    }
  }

  /**
   * Analyze a journal entry
   */
  private analyzeEntry(entry: JournalEntry): void {
    // Mood impact
    const moodScore = (entry.mood - 3) * 10; // -20 to +20
    this.updateDimension('emotional_health', moodScore, `Mood: ${entry.mood}/5`);

    // Red flags impact
    if (entry.analysis?.flags) {
      entry.analysis.flags.forEach(flag => {
        const severityWeight = flag.severity === 'severe' ? -15 : flag.severity === 'moderate' ? -10 : -5;
        
        if (flag.type.includes('Gaslighting')) {
          this.updateDimension('trust', severityWeight, 'Gaslighting detected');
          this.updateDimension('emotional_health', severityWeight * 0.5, 'Gaslighting impact');
        }
        
        if (flag.type.includes('Control') || flag.type.includes('Isolation')) {
          this.updateDimension('independence', severityWeight, 'Control/Isolation');
        }
        
        if (flag.type.includes('Disrespect') || flag.type.includes('Criticism')) {
          this.updateDimension('respect', severityWeight, 'Disrespect');
        }
        
        if (flag.type.includes('Communication')) {
          this.updateDimension('communication', severityWeight, 'Communication issues');
        }
      });
    }

    // Context impact
    if (entry.context === 'romantic' && entry.mood < 3) {
      this.updateDimension('trust', -5, 'Romantic relationship strain');
    }
  }

  /**
   * Update a dimension score
   */
  private updateDimension(dimensionId: string, delta: number, indicator: string): void {
    const dimension = this.dimensions.find(d => d.id === dimensionId);
    if (dimension) {
      dimension.score = Math.max(0, Math.min(100, dimension.score + delta));
      if (indicator && !dimension.indicators.includes(indicator)) {
        dimension.indicators.push(indicator);
      }
      dimension.riskLevel = this.determineRiskLevel(dimension.score);
    }
  }

  /**
   * Calculate overall score
   */
  private calculateOverallScore(): number {
    let weightedSum = 0;
    let totalWeight = 0;

    this.dimensions.forEach(dim => {
      weightedSum += dim.score * dim.weight;
      totalWeight += dim.weight;
    });

    return totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 50;
  }

  /**
   * Determine risk level
   */
  private determineRiskLevel(score: number): 'low' | 'moderate' | 'high' | 'critical' {
    if (score >= 70) return 'low';
    if (score >= 50) return 'moderate';
    if (score >= 30) return 'high';
    return 'critical';
  }

  /**
   * Generate insights
   */
  private generateInsights(): string[] {
    const insights: string[] = [];
    const lowDimensions = this.dimensions.filter(d => d.score < 40);
    const highDimensions = this.dimensions.filter(d => d.score > 70);

    if (lowDimensions.length > 0) {
      insights.push(`Your ${lowDimensions.map(d => d.name.toLowerCase()).join(', ')} ${lowDimensions.length === 1 ? 'is' : 'are'} significantly impacted.`);
    }

    if (highDimensions.length > 0) {
      insights.push(`Your ${highDimensions.map(d => d.name.toLowerCase()).join(', ')} ${highDimensions.length === 1 ? 'is' : 'are'} relatively strong.`);
    }

    const criticalDimension = this.dimensions.find(d => d.riskLevel === 'critical');
    if (criticalDimension) {
      insights.push(`⚠️ ${criticalDimension.name} is at a critical level and needs immediate attention.`);
    }

    return insights;
  }

  /**
   * Generate recommendations
   */
  private generateRecommendations(riskLevel: string): string[] {
    const recommendations: string[] = [];

    if (riskLevel === 'critical' || riskLevel === 'high') {
      recommendations.push('Consider reaching out to a professional therapist or counselor.');
      recommendations.push('Document incidents and patterns in your journal.');
      recommendations.push('Reach out to trusted friends or family for support.');
    }

    const safetyDim = this.dimensions.find(d => d.id === 'safety');
    if (safetyDim && safetyDim.score < 40) {
      recommendations.push('Create a safety plan if you feel in danger.');
      recommendations.push('Keep emergency contacts easily accessible.');
    }

    const trustDim = this.dimensions.find(d => d.id === 'trust');
    if (trustDim && trustDim.score < 40) {
      recommendations.push('Consider having an honest conversation about trust issues.');
      recommendations.push('Set clear boundaries around honesty and transparency.');
    }

    const communicationDim = this.dimensions.find(d => d.id === 'communication');
    if (communicationDim && communicationDim.score < 40) {
      recommendations.push('Try using "I" statements when expressing concerns.');
      recommendations.push('Consider couples or relationship counseling if applicable.');
    }

    return recommendations;
  }

  /**
   * Identify patterns
   */
  private identifyPatterns(): string[] {
    const patterns: string[] = [];
    
    // Check for recurring issues
    const lowDimensions = this.dimensions.filter(d => d.score < 40);
    if (lowDimensions.length >= 3) {
      patterns.push('Multiple relationship dimensions are significantly impacted.');
    }

    if (this.dimensions.every(d => d.score < 50)) {
      patterns.push('Overall relationship health is below average across all dimensions.');
    }

    return patterns;
  }

  /**
   * Suggest next steps
   */
  private suggestNextSteps(riskLevel: string): string[] {
    const steps: string[] = [];

    if (riskLevel === 'critical') {
      steps.push('🚨 Prioritize your safety - reach out for help immediately if needed.');
      steps.push('Document everything in your journal.');
      steps.push('Consider professional support.');
    } else if (riskLevel === 'high') {
      steps.push('Continue tracking patterns in your journal.');
      steps.push('Have a conversation about your concerns.');
      steps.push('Set clear boundaries.');
    } else {
      steps.push('Keep monitoring your relationship health.');
      steps.push('Continue using the app to track patterns.');
      steps.push('Focus on maintaining healthy communication.');
    }

    return steps;
  }
}

// Export singleton
export const psychometricAssessment = new PsychometricAssessment();
