import React from 'react';
import { Brain, TrendingUp, AlertCircle } from 'lucide-react';

interface MoodMetric {
  category: string;
  value: number;
  trend: 'improving' | 'stable' | 'declining';
  impact: string;
}

interface Props {
  metrics: MoodMetric[];
}

export default function MoodMetrics({ metrics }: Props) {
  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'improving':
        return 'text-green-500';
      case 'declining':
        return 'text-red-500';
      default:
        return 'text-blue-500';
    }
  };

  return (
    <div className="space-y-4">
      {metrics.map((metric, index) => (
        <div key={index} className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-gray-900">{metric.category}</h3>
            <div className="flex items-center space-x-2">
              <TrendingUp className={`h-4 w-4 ${getTrendColor(metric.trend)}`} />
              <span className="text-sm font-medium">{metric.value}%</span>
            </div>
          </div>
          <p className="text-sm text-gray-600">{metric.impact}</p>
        </div>
      ))}
    </div>
  );
}