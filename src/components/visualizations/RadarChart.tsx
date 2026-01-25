import { Radar, RadarChart as RechartsRadar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import type { JournalEntry } from '../../lib/types';

interface RadarChartProps {
  entries: JournalEntry[];
}

export function RadarChart({ entries }: RadarChartProps) {
  // Calculate health scores for each dimension based on entries
  const calculateDimensionScore = (dimension: string): number => {
    if (entries.length === 0) return 50;

    let score = 100;
    
    entries.forEach(entry => {
      const flags = entry.analysis?.flags || [];
      
      flags.forEach(flag => {
        const deduction = flag.severity === 'severe' ? 8 : flag.severity === 'moderate' ? 4 : 2;
        
        switch (dimension) {
          case 'Safety':
            if (flag.category === 'safety' || flag.type === 'threats') score -= deduction * 2;
            break;
          case 'Trust':
            if (flag.type === 'gaslighting' || flag.type === 'blameShifting') score -= deduction;
            break;
          case 'Respect':
            if (flag.type === 'publicHumiliation' || flag.type === 'bullying') score -= deduction;
            break;
          case 'Independence':
            if (flag.type === 'isolation' || flag.type === 'financialControl') score -= deduction;
            break;
          case 'Communication':
            if (flag.type === 'gaslighting' || flag.type === 'inconsistency') score -= deduction * 0.7;
            break;
          case 'Boundaries':
            if (flag.type === 'boundaryViolation' || flag.type === 'jealousy') score -= deduction;
            break;
        }
      });
      
      // Positive mood contributes
      if (entry.mood >= 4) score += 1;
      else if (entry.mood <= 2) score -= 1;
    });

    return Math.max(0, Math.min(100, score));
  };

  const data = [
    {
      dimension: 'Safety',
      score: calculateDimensionScore('Safety'),
      fullMark: 100
    },
    {
      dimension: 'Trust',
      score: calculateDimensionScore('Trust'),
      fullMark: 100
    },
    {
      dimension: 'Respect',
      score: calculateDimensionScore('Respect'),
      fullMark: 100
    },
    {
      dimension: 'Independence',
      score: calculateDimensionScore('Independence'),
      fullMark: 100
    },
    {
      dimension: 'Communication',
      score: calculateDimensionScore('Communication'),
      fullMark: 100
    },
    {
      dimension: 'Boundaries',
      score: calculateDimensionScore('Boundaries'),
      fullMark: 100
    }
  ];

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RechartsRadar data={data}>
        <PolarGrid stroke="#e5e7eb" />
        <PolarAngleAxis 
          dataKey="dimension" 
          style={{ fontSize: '14px', fontWeight: '500' }}
        />
        <PolarRadiusAxis 
          angle={90} 
          domain={[0, 100]} 
          style={{ fontSize: '12px' }}
        />
        <Radar 
          name="Health Score" 
          dataKey="score" 
          stroke="#3b82f6" 
          fill="#3b82f6" 
          fillOpacity={0.4}
          strokeWidth={2}
        />
      </RechartsRadar>
    </ResponsiveContainer>
  );
}
