import React from 'react';
import { AlertCircle, TrendingUp, Calendar, Activity } from 'lucide-react';

export default function InflammationAnalytics() {
  const inflammationData = {
    overview: {
      current: 42,
      change: -15,
      trend: 'decreasing'
    },
    triggers: [
      { name: 'Dairy Products', impact: 85, frequency: '3-4x week' },
      { name: 'Processed Foods', impact: 75, frequency: '2-3x week' },
      { name: 'Stress', impact: 70, frequency: '4-5x week' }
    ],
    improvements: [
      'Overall inflammation reduced by 15% this month',
      'Recovery time decreased by 2 days on average',
      'Symptom-free days increased by 35%'
    ],
    correlations: [
      {
        factor: 'Exercise',
        impact: 'Reduces inflammation by 25% within 24 hours',
        confidence: 85
      },
      {
        factor: 'Sleep Quality',
        impact: 'Poor sleep increases inflammation by 40%',
        confidence: 78
      },
      {
        factor: 'Diet',
        impact: 'Clean eating reduces markers by 30%',
        confidence: 92
      }
    ]
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Inflammation Analysis</h2>
          <p className="text-sm text-gray-600">Tracking inflammatory responses</p>
        </div>
        <div className="p-2 bg-red-50 rounded-lg">
          <AlertCircle className="h-5 w-5 text-red-500" />
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-red-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600">Current Level</p>
              <p className="text-2xl font-bold text-red-700">{inflammationData.overview.current}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-red-500 opacity-75" />
          </div>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">Monthly Change</p>
              <p className="text-2xl font-bold text-green-700">{inflammationData.overview.change}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500 opacity-75" />
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600">Recovery Rate</p>
              <p className="text-2xl font-bold text-blue-700">2.5 days</p>
            </div>
            <Activity className="h-8 w-8 text-blue-500 opacity-75" />
          </div>
        </div>
      </div>

      {/* Triggers Analysis */}
      <div className="space-y-4 mb-6">
        <h3 className="text-sm font-medium text-gray-900">Common Triggers</h3>
        {inflammationData.triggers.map((trigger, index) => (
          <div key={index} className="flex items-center">
            <span className="w-32 text-sm text-gray-600">{trigger.name}</span>
            <div className="flex-1 ml-4">
              <div className="h-2 bg-gray-100 rounded-full">
                <div
                  className="h-full bg-red-500 rounded-full"
                  style={{ width: `${trigger.impact}%` }}
                />
              </div>
            </div>
            <span className="ml-4 text-sm text-gray-600">{trigger.impact}% Impact</span>
            <span className="ml-4 text-xs text-gray-500">{trigger.frequency}</span>
          </div>
        ))}
      </div>

      {/* Correlations */}
      <div className="space-y-4 mb-6">
        <h3 className="text-sm font-medium text-gray-900">Key Correlations</h3>
        {inflammationData.correlations.map((correlation, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">{correlation.factor}</h4>
              <span className="text-sm text-blue-600">{correlation.confidence}% confidence</span>
            </div>
            <p className="text-sm text-gray-600">{correlation.impact}</p>
          </div>
        ))}
      </div>

      {/* Improvements */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-900">Recent Improvements</h3>
        {inflammationData.improvements.map((improvement, index) => (
          <div key={index} className="flex items-start space-x-2">
            <div className="p-1 bg-green-100 rounded-full mt-0.5">
              <TrendingUp className="h-4 w-4 text-green-500" />
            </div>
            <p className="text-sm text-gray-600">{improvement}</p>
          </div>
        ))}
      </div>
    </div>
  );
}