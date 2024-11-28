import React from 'react';
import { Brain, Sparkles, TrendingUp } from 'lucide-react';

export default function GutSkinCorrelationChart() {
  const correlations = [
    {
      gutSymptom: 'Inflammation',
      skinImpact: 85,
      description: 'Strong correlation with acne severity',
      trend: 'improving'
    },
    {
      gutSymptom: 'Bloating',
      skinImpact: 72,
      description: 'Moderate correlation with skin redness',
      trend: 'stable'
    },
    {
      gutSymptom: 'Digestive Issues',
      skinImpact: 68,
      description: 'Affects overall skin health',
      trend: 'improving'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Gut-Skin Correlation</h2>
          <p className="text-sm text-gray-600">Impact of gut health on skin condition</p>
        </div>
        <div className="flex items-center space-x-2">
          <Brain className="h-5 w-5 text-purple-500" />
          <Sparkles className="h-5 w-5 text-blue-500" />
        </div>
      </div>

      <div className="space-y-6">
        {correlations.map((correlation, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900">{correlation.gutSymptom}</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-purple-600">
                  {correlation.skinImpact}% Impact
                </span>
                <TrendingUp className={`h-4 w-4 ${
                  correlation.trend === 'improving' ? 'text-green-500' : 'text-blue-500'
                }`} />
              </div>
            </div>
            
            <div className="mb-3">
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className={`h-full rounded-full ${
                    correlation.skinImpact > 80 ? 'bg-red-500' :
                    correlation.skinImpact > 70 ? 'bg-orange-500' :
                    'bg-yellow-500'
                  }`}
                  style={{ width: `${correlation.skinImpact}%` }}
                />
              </div>
            </div>

            <p className="text-sm text-gray-600">{correlation.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-purple-50 rounded-lg">
        <div className="flex items-start space-x-3">
          <Brain className="h-5 w-5 text-purple-500 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-purple-900">Key Insight</h4>
            <p className="text-sm text-purple-700 mt-1">
              Reducing gut inflammation shows a direct positive impact on skin health within 7-14 days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}