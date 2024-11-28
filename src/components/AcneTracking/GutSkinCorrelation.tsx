import React from 'react';
import { Brain, Utensils, Activity, AlertCircle } from 'lucide-react';

export default function GutSkinCorrelation() {
  const correlations = [
    {
      factor: 'Diet',
      impact: 0.85,
      description: 'Strong correlation with dairy and refined sugar intake',
      recommendations: [
        'Consider reducing dairy consumption',
        'Limit processed sugars'
      ]
    },
    {
      factor: 'Gut Health',
      impact: 0.78,
      description: 'Inflammation levels directly affect skin health',
      recommendations: [
        'Focus on anti-inflammatory foods',
        'Maintain regular probiotic intake'
      ]
    },
    {
      factor: 'Exercise',
      impact: 0.65,
      description: 'Moderate exercise improves both gut and skin health',
      recommendations: [
        'Aim for 30 minutes daily',
        'Prefer low-impact activities'
      ]
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Gut-Skin Connection</h2>
          <p className="text-sm text-gray-600">Understanding your triggers</p>
        </div>
        <div className="p-2 bg-purple-50 rounded-lg">
          <Brain className="h-5 w-5 text-purple-500" />
        </div>
      </div>

      <div className="space-y-6">
        {correlations.map((correlation, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900">{correlation.factor}</h3>
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium ${
                  correlation.impact > 0.7
                    ? 'text-red-600'
                    : correlation.impact > 0.5
                    ? 'text-yellow-600'
                    : 'text-green-600'
                }`}>
                  {Math.round(correlation.impact * 100)}% Impact
                </span>
                <div className="w-16 h-2 bg-gray-200 rounded-full">
                  <div
                    className={`h-full rounded-full ${
                      correlation.impact > 0.7
                        ? 'bg-red-500'
                        : correlation.impact > 0.5
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${correlation.impact * 100}%` }}
                  />
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-3">{correlation.description}</p>
            <div className="space-y-2">
              {correlation.recommendations.map((rec, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                  <span className="text-sm text-gray-700">{rec}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-900">Pro Tip</h4>
            <p className="text-sm text-blue-700 mt-1">
              Track your diet and gut health symptoms consistently to identify personal triggers and patterns.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}