import React from 'react';
import { Brain, Activity, Heart } from 'lucide-react';

interface Correlation {
  factor: string;
  correlation: number;
  description: string;
  impact: 'positive' | 'negative' | 'neutral';
}

interface Props {
  correlations: Correlation[];
}

export default function MoodCorrelations({ correlations }: Props) {
  const getCorrelationColor = (impact: string) => {
    switch (impact) {
      case 'positive':
        return 'bg-green-100 text-green-700';
      case 'negative':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Mood Correlations</h3>
      {correlations.map((correlation, index) => (
        <div key={index} className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-900">{correlation.factor}</span>
            <span className={`px-2 py-1 rounded-full text-xs ${getCorrelationColor(correlation.impact)}`}>
              {Math.abs(correlation.correlation)}% correlation
            </span>
          </div>
          <p className="text-sm text-gray-600">{correlation.description}</p>
        </div>
      ))}
    </div>
  );
}