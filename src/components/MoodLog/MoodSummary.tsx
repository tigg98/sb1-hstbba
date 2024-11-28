import React from 'react';
import { Brain, TrendingUp, AlertCircle } from 'lucide-react';

interface Props {
  averageMood: number;
  moodTrend: 'improving' | 'stable' | 'declining';
  stressLevel: number;
  energyLevel: number;
  dominantFactors: string[];
}

export default function MoodSummary({ 
  averageMood, 
  moodTrend, 
  stressLevel, 
  energyLevel,
  dominantFactors 
}: Props) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <Brain className="h-5 w-5 text-purple-500" />
            <TrendingUp className={`h-4 w-4 ${
              moodTrend === 'improving' ? 'text-green-500' : 
              moodTrend === 'declining' ? 'text-red-500' : 
              'text-blue-500'
            }`} />
          </div>
          <p className="text-2xl font-bold text-gray-900">{averageMood}%</p>
          <p className="text-sm text-gray-600">Average Mood</p>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Energy Level</h3>
          <div className="flex items-center space-x-2">
            <div className="flex-1 h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-blue-500 rounded-full"
                style={{ width: `${energyLevel}%` }}
              />
            </div>
            <span className="text-sm text-gray-600">{energyLevel}%</span>
          </div>
        </div>

        <div className="p-4 bg-red-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Stress Level</h3>
          <div className="flex items-center space-x-2">
            <div className="flex-1 h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-red-500 rounded-full"
                style={{ width: `${stressLevel}%` }}
              />
            </div>
            <span className="text-sm text-gray-600">{stressLevel}%</span>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Dominant Factors</h3>
        <div className="flex flex-wrap gap-2">
          {dominantFactors.map((factor, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-white text-gray-700 rounded-full text-sm shadow-sm"
            >
              {factor}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-900">Insights</h4>
            <p className="text-sm text-blue-700 mt-1">
              Your mood patterns show a strong correlation with sleep quality and exercise routine.
              Consider maintaining consistent sleep schedule and morning exercise routine.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}