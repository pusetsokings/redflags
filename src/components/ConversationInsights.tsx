/**
 * Conversation Insights & Reports Component
 * Displays comprehensive analytics, patterns, and insights from conversations
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, BarChart3, Target, Award, Activity, AlertTriangle, Lightbulb, Users, FileText, TrendingUp as TrendUp } from 'lucide-react';
import { conversationAnalytics, type CampaignData, type StudyInsights } from '../lib/conversationTree';
import { gamification } from '../lib/gamification';
import { psychometricAssessment, type PsychometricResult } from '../lib/psychometricAssessment';
import { getJournalEntries } from '../lib/storage';
import type { JournalEntry } from '../lib/types';

export function ConversationInsights() {
  const [analytics, setAnalytics] = useState(conversationAnalytics.getAnalytics());
  const [progress, setProgress] = useState(gamification.getProgress());
  const [psychometricResult, setPsychometricResult] = useState<PsychometricResult | null>(null);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [campaignData, setCampaignData] = useState<CampaignData | undefined>(undefined);
  const [studyInsights, setStudyInsights] = useState<StudyInsights | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const entries = await getJournalEntries();
      setJournalEntries(entries);
      
      // Get updated analytics
      const updatedAnalytics = conversationAnalytics.getAnalytics();
      setAnalytics(updatedAnalytics);
      
      // Get campaign and study data
      const campaign = conversationAnalytics.getCampaignData();
      const study = conversationAnalytics.getStudyInsights();
      setCampaignData(campaign);
      setStudyInsights(study);
      
      // Get psychometric assessment
      if (entries.length > 0) {
        const assessment = psychometricAssessment.assessFromJournal(entries);
        setPsychometricResult(assessment);
      }
      
      // Update progress
      setProgress(gamification.getProgress());
      
      setLoading(false);
    } catch (error) {
      console.error('Failed to load insights:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">Loading insights...</div>
      </div>
    );
  }

  const topEmotion = Object.entries(analytics.mostCommonEmotions)
    .sort((a, b) => b[1] - a[1])[0];
  const topBehavior = Object.entries(analytics.mostCommonBehaviors)
    .sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#6C5CE7] to-[#4ECDC4] rounded-3xl p-6 border-4 border-[#1A1A2E] shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-2">📊 Your Insights & Reports</h2>
        <p className="text-white/90">Comprehensive analysis of your conversations, patterns, and progress</p>
      </div>

      {/* Gamification Progress */}
      <div className="bg-white rounded-3xl p-6 border-4 border-[#1A1A2E] shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <Award className="w-6 h-6 text-[#6C5CE7]" />
          <h3 className="text-xl font-bold text-[#1A1A2E]">Your Progress</h3>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="bg-[#F8F9FA] rounded-2xl p-4 border-3 border-[#1A1A2E]">
            <div className="text-2xl font-bold text-[#6C5CE7]">{progress.level}</div>
            <div className="text-sm text-[#495057]">Level</div>
          </div>
          <div className="bg-[#F8F9FA] rounded-2xl p-4 border-3 border-[#1A1A2E]">
            <div className="text-2xl font-bold text-[#4ECDC4]">{progress.streakDays}</div>
            <div className="text-sm text-[#495057]">Day Streak</div>
          </div>
          <div className="bg-[#F8F9FA] rounded-2xl p-4 border-3 border-[#1A1A2E]">
            <div className="text-2xl font-bold text-[#FF6B6B]">{progress.totalConversations}</div>
            <div className="text-sm text-[#495057]">Conversations</div>
          </div>
          <div className="bg-[#F8F9FA] rounded-2xl p-4 border-3 border-[#1A1A2E]">
            <div className="text-2xl font-bold text-[#FFD93D]">{progress.totalJournalEntries}</div>
            <div className="text-sm text-[#495057]">Journal Entries</div>
          </div>
        </div>

        {/* XP Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-bold text-[#1A1A2E]">Experience Points</span>
            <span className="text-[#495057]">{progress.experience} / {progress.nextLevelXP} XP</span>
          </div>
          <div className="w-full bg-[#F8F9FA] rounded-full h-4 border-2 border-[#1A1A2E] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(progress.experience / progress.nextLevelXP) * 100}%` }}
              className="h-full bg-gradient-to-r from-[#6C5CE7] to-[#4ECDC4]"
            />
          </div>
        </div>

        {/* Achievements */}
        {progress.achievements.filter(a => a.unlockedAt).length > 0 && (
          <div>
            <h4 className="font-bold text-[#1A1A2E] mb-3">🏆 Unlocked Achievements</h4>
            <div className="flex flex-wrap gap-2">
              {progress.achievements
                .filter(a => a.unlockedAt)
                .map(achievement => (
                  <div
                    key={achievement.id}
                    className="px-4 py-2 bg-[#FFD93D] rounded-xl border-3 border-[#1A1A2E] flex items-center gap-2"
                  >
                    <span className="text-xl">{achievement.icon}</span>
                    <div>
                      <div className="font-bold text-sm text-[#1A1A2E]">{achievement.name}</div>
                      <div className="text-xs text-[#495057]">{achievement.description}</div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Conversation Analytics */}
      <div className="bg-white rounded-3xl p-6 border-4 border-[#1A1A2E] shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <BarChart3 className="w-6 h-6 text-[#6C5CE7]" />
          <h3 className="text-xl font-bold text-[#1A1A2E]">Conversation Analytics</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#F8F9FA] rounded-2xl p-4 border-3 border-[#1A1A2E]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-[#495057]">Total Sessions</span>
              <Activity className="w-4 h-4 text-[#6C5CE7]" />
            </div>
            <div className="text-3xl font-bold text-[#1A1A2E]">{analytics.totalSessions}</div>
          </div>

          <div className="bg-[#F8F9FA] rounded-2xl p-4 border-3 border-[#1A1A2E]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-[#495057]">Average Depth</span>
              <TrendingUp className="w-4 h-4 text-[#4ECDC4]" />
            </div>
            <div className="text-3xl font-bold text-[#1A1A2E]">
              {analytics.averageDepth.toFixed(1)}
            </div>
          </div>

          <div className="bg-[#F8F9FA] rounded-2xl p-4 border-3 border-[#1A1A2E]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-[#495057]">Completion Rate</span>
              <Target className="w-4 h-4 text-[#FFD93D]" />
            </div>
            <div className="text-3xl font-bold text-[#1A1A2E]">
              {(analytics.completionRate * 100).toFixed(0)}%
            </div>
          </div>

          <div className="bg-[#F8F9FA] rounded-2xl p-4 border-3 border-[#1A1A2E]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-[#495057">Most Common Emotion</span>
              <TrendingDown className="w-4 h-4 text-[#FF6B6B]" />
            </div>
            <div className="text-xl font-bold text-[#1A1A2E] capitalize">
              {topEmotion ? topEmotion[0] : 'N/A'}
            </div>
            <div className="text-sm text-[#495057]">
              {topEmotion ? `${topEmotion[1]} times` : ''}
            </div>
          </div>
        </div>

        {/* Top Behaviors */}
        {Object.keys(analytics.mostCommonBehaviors).length > 0 && (
          <div className="mt-4">
            <h4 className="font-bold text-[#1A1A2E] mb-3">Most Discussed Issues</h4>
            <div className="space-y-2">
              {Object.entries(analytics.mostCommonBehaviors)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5)
                .map(([behavior, count]) => (
                  <div key={behavior} className="flex items-center justify-between bg-[#F8F9FA] rounded-xl p-3 border-2 border-[#1A1A2E]">
                    <span className="font-bold text-[#1A1A2E] capitalize">
                      {behavior.replace(/_/g, ' ')}
                    </span>
                    <span className="text-sm text-[#495057]">{count} times</span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Psychometric Assessment */}
      {psychometricResult && (
        <div className="bg-white rounded-3xl p-6 border-4 border-[#1A1A2E] shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-[#6C5CE7]" />
            <h3 className="text-xl font-bold text-[#1A1A2E]">Relationship Health Assessment</h3>
          </div>

          {/* Overall Score */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-[#1A1A2E]">Overall Score</span>
              <span className={`text-2xl font-bold ${
                psychometricResult.overallScore >= 70 ? 'text-[#4ECDC4]' :
                psychometricResult.overallScore >= 50 ? 'text-[#FFD93D]' :
                psychometricResult.overallScore >= 30 ? 'text-[#FF6B6B]' :
                'text-[#FF0000]'
              }`}>
                {psychometricResult.overallScore}/100
              </span>
            </div>
            <div className="w-full bg-[#F8F9FA] rounded-full h-6 border-3 border-[#1A1A2E] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${psychometricResult.overallScore}%` }}
                className={`h-full ${
                  psychometricResult.overallScore >= 70 ? 'bg-[#4ECDC4]' :
                  psychometricResult.overallScore >= 50 ? 'bg-[#FFD93D]' :
                  psychometricResult.overallScore >= 30 ? 'bg-[#FF6B6B]' :
                  'bg-[#FF0000]'
                }`}
              />
            </div>
            <div className={`mt-2 px-3 py-2 rounded-xl border-3 border-[#1A1A2E] font-bold text-center ${
              psychometricResult.riskLevel === 'critical' ? 'bg-[#FF6B6B] text-white' :
              psychometricResult.riskLevel === 'high' ? 'bg-[#FFD93D] text-[#1A1A2E]' :
              psychometricResult.riskLevel === 'moderate' ? 'bg-[#4ECDC4] text-[#1A1A2E]' :
              'bg-[#4ECDC4] text-[#1A1A2E]'
            }`}>
              Risk Level: {psychometricResult.riskLevel.toUpperCase()}
            </div>
          </div>

          {/* Dimensions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {psychometricResult.dimensions.map(dimension => (
              <div key={dimension.id} className="bg-[#F8F9FA] rounded-2xl p-4 border-3 border-[#1A1A2E]">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-[#1A1A2E] capitalize">
                    {dimension.name.replace(/_/g, ' ')}
                  </span>
                  <span className={`text-lg font-bold ${
                    dimension.score >= 70 ? 'text-[#4ECDC4]' :
                    dimension.score >= 50 ? 'text-[#FFD93D]' :
                    dimension.score >= 30 ? 'text-[#FF6B6B]' :
                    'text-[#FF0000]'
                  }`}>
                    {dimension.score}
                  </span>
                </div>
                <div className="w-full bg-white rounded-full h-3 border-2 border-[#1A1A2E] overflow-hidden mb-2">
                  <div
                    className={`h-full ${
                      dimension.score >= 70 ? 'bg-[#4ECDC4]' :
                      dimension.score >= 50 ? 'bg-[#FFD93D]' :
                      dimension.score >= 30 ? 'bg-[#FF6B6B]' :
                      'bg-[#FF0000]'
                    }`}
                    style={{ width: `${dimension.score}%` }}
                  />
                </div>
                {dimension.indicators.length > 0 && (
                  <div className="text-xs text-[#495057]">
                    {dimension.indicators.slice(0, 2).join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Insights */}
          {psychometricResult.insights.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-[#FFD93D]" />
                <h4 className="font-bold text-[#1A1A2E]">Key Insights</h4>
              </div>
              <div className="space-y-2">
                {psychometricResult.insights.map((insight, index) => (
                  <div key={index} className="bg-[#FFD93D] rounded-xl p-3 border-3 border-[#1A1A2E]">
                    <p className="text-sm font-bold text-[#1A1A2E]">{insight}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          {psychometricResult.recommendations.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Target className="w-5 h-5 text-[#6C5CE7]" />
                <h4 className="font-bold text-[#1A1A2E]">Recommendations</h4>
              </div>
              <div className="space-y-2">
                {psychometricResult.recommendations.map((rec, index) => (
                  <div key={index} className="bg-[#4ECDC4] rounded-xl p-3 border-3 border-[#1A1A2E]">
                    <p className="text-sm font-bold text-[#1A1A2E]">• {rec}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next Steps */}
          {psychometricResult.nextSteps.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-[#FF6B6B]" />
                <h4 className="font-bold text-[#1A1A2E]">Next Steps</h4>
              </div>
              <div className="space-y-2">
                {psychometricResult.nextSteps.map((step, index) => (
                  <div key={index} className="bg-[#6C5CE7] rounded-xl p-3 border-3 border-[#1A1A2E]">
                    <p className="text-sm font-bold text-white">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Campaign & Study Data */}
      {(campaignData || studyInsights) && (
        <div className="bg-white rounded-3xl p-6 border-4 border-[#1A1A2E] shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-[#6C5CE7]" />
            <h3 className="text-xl font-bold text-[#1A1A2E]">Research & Study Insights</h3>
          </div>

          {campaignData && (
            <div className="mb-6">
              <h4 className="font-bold text-[#1A1A2E] mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Campaign Participation
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-[#F8F9FA] rounded-xl p-3 border-3 border-[#1A1A2E]">
                  <div className="text-xs text-[#495057] mb-1">Sessions</div>
                  <div className="text-xl font-bold text-[#1A1A2E]">{campaignData.sessions}</div>
                </div>
                <div className="bg-[#F8F9FA] rounded-xl p-3 border-3 border-[#1A1A2E]">
                  <div className="text-xs text-[#495057] mb-1">Patterns</div>
                  <div className="text-xl font-bold text-[#1A1A2E]">{campaignData.patterns.length}</div>
                </div>
                <div className="bg-[#F8F9FA] rounded-xl p-3 border-3 border-[#1A1A2E]">
                  <div className="text-xs text-[#495057] mb-1">Outcomes</div>
                  <div className="text-xl font-bold text-[#1A1A2E]">{campaignData.outcomes.length}</div>
                </div>
                <div className="bg-[#F8F9FA] rounded-xl p-3 border-3 border-[#1A1A2E]">
                  <div className="text-xs text-[#495057] mb-1">Participant ID</div>
                  <div className="text-xs font-mono text-[#6C5CE7] truncate">{campaignData.participantId}</div>
                </div>
              </div>
              
              {campaignData.patterns.length > 0 && (
                <div className="mt-4">
                  <div className="text-sm font-bold text-[#495057] mb-2">Detected Patterns:</div>
                  <div className="flex flex-wrap gap-2">
                    {campaignData.patterns.map((pattern, idx) => (
                      <span key={idx} className="px-3 py-1 bg-[#FFD93D] rounded-lg border-2 border-[#1A1A2E] text-sm font-bold text-[#1A1A2E]">
                        {pattern.replace(/_/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {studyInsights && (
            <div>
              <h4 className="font-bold text-[#1A1A2E] mb-3 flex items-center gap-2">
                <TrendUp className="w-5 h-5" />
                Study Insights
              </h4>

              {studyInsights.patterns.length > 0 && (
                <div className="mb-4">
                  <div className="text-sm font-bold text-[#495057] mb-2">Pattern Analysis:</div>
                  <div className="space-y-2">
                    {studyInsights.patterns.slice(0, 5).map((pattern, idx) => (
                      <div key={idx} className="bg-[#F8F9FA] rounded-xl p-3 border-3 border-[#1A1A2E]">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-[#1A1A2E]">{pattern.pattern.replace(/_/g, ' ')}</span>
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            pattern.severity === 'critical' ? 'bg-[#FF6B6B] text-white' :
                            pattern.severity === 'high' ? 'bg-[#FFD93D] text-[#1A1A2E]' :
                            'bg-[#4ECDC4] text-[#1A1A2E]'
                          }`}>
                            {pattern.severity}
                          </span>
                        </div>
                        <div className="text-xs text-[#495057]">
                          Frequency: {pattern.frequency} | First: {new Date(pattern.firstDetected).toLocaleDateString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {studyInsights.correlations.length > 0 && (
                <div className="mb-4">
                  <div className="text-sm font-bold text-[#495057] mb-2">Correlations Found:</div>
                  <div className="space-y-2">
                    {studyInsights.correlations.slice(0, 3).map((corr, idx) => (
                      <div key={idx} className="bg-[#4ECDC4] rounded-xl p-3 border-3 border-[#1A1A2E]">
                        <div className="font-bold text-[#1A1A2E] text-sm">
                          {corr.factor1} ↔ {corr.factor2}
                        </div>
                        <div className="text-xs text-[#1A1A2E] mt-1">
                          Strength: {(corr.strength * 100).toFixed(0)}% | {corr.significance} significance
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {studyInsights.trends.length > 0 && (
                <div className="mb-4">
                  <div className="text-sm font-bold text-[#495057] mb-2">Trends:</div>
                  <div className="space-y-2">
                    {studyInsights.trends.map((trend, idx) => (
                      <div key={idx} className="bg-[#6C5CE7] rounded-xl p-3 border-3 border-[#1A1A2E]">
                        <div className="flex items-center gap-2 mb-1">
                          {trend.direction === 'increasing' ? (
                            <TrendingUp className="w-4 h-4 text-white" />
                          ) : trend.direction === 'decreasing' ? (
                            <TrendingDown className="w-4 h-4 text-white" />
                          ) : (
                            <Activity className="w-4 h-4 text-white" />
                          )}
                          <span className="font-bold text-white text-sm">{trend.metric.replace(/_/g, ' ')}</span>
                        </div>
                        <div className="text-xs text-white/80">
                          {trend.direction} trend | Rate: {trend.rate.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {studyInsights.recommendations.length > 0 && (
                <div>
                  <div className="text-sm font-bold text-[#495057] mb-2 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />
                    Personalized Recommendations:
                  </div>
                  <div className="space-y-2">
                    {studyInsights.recommendations.map((rec, idx) => (
                      <div key={idx} className="bg-[#FFD93D] rounded-xl p-3 border-3 border-[#1A1A2E]">
                        <p className="text-sm font-bold text-[#1A1A2E]">• {rec}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
