import React from 'react';
import { Heart, TrendingUp, AlertCircle } from 'lucide-react';

interface Props {
  timeRange: '7d' | '30d' | '90d' | '1y';
}

export default function SkinAnalytics({ timeRange }: Props) {
  const skinData = {
    overview: {
      score: 72,
      change: 15,
      trend: 'improving'
    },
    metrics: [
      { name: 'Acne Severity', value: 'Mild', change: -30 },
      { name: 'Inflammation', value: 'Low', change: -25 },
      { name: 'Recovery Time', value: '2 days', change: -40 }
    ],
    correlations: [
      {
        factor: 'Gut Health',
        correlation: 0.85,
        impact: 'Strong positive correlation with skin clarity'
      },
      {
        factor: 'Diet',
        correlation: 0.75,
        impact: 'Reduced dairy intake improved skin by 35%'
      },
      {
        factor: 'Sleep',
        correlation: 0.70,
        impact: 'Better sleep reduced inflammation by 28%'
      }
    ]
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Skin Health Analysis</h2>
          <p className="text-sm text-gray-600">Gut-skin connection insights</p>
        </div>
        <div className="p-2 bg-pink-50 rounded-lg">
          <Heart className="h-5 w-5 text-pink-500" />
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {skinData.metrics.map((metric, index) => (
          <div key={index} className="p-4 bg-pink-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-pink-600">{metric.name}</p>
                <p className="text-2xl font-bold text-pink-700">{metric.value}</p>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className={`h-5 w-5 ${
                  metric.change < 0 ? 'text-green-500 transform rotate-180' : 'text-red-500'
                }`} />
                <span className="text-sm font-medium">
                  {Math.abs(metric.change)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Correlations */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900">Gut-Skin Correlations</h3>
        {skinData.correlations.map((correlation, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">{correlation.factor}</h4>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-blue-600">
                  {correlation.correlation * 100}% correlation
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-600">{correlation.impact}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-900">Key Insight</h4>
            <p className="text-sm text-blue-700 mt-1">
              Your skin health shows strong improvement when gut inflammation is low. Continue focusing on anti-inflammatory foods and stress management.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}