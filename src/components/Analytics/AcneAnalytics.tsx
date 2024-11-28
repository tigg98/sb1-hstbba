import React from 'react';
import { TrendingUp, Calendar, AlertCircle } from 'lucide-react';

interface Props {
  timeRange: '7d' | '30d' | '90d' | '1y';
}

export default function AcneAnalytics({ timeRange }: Props) {
  const acneData = {
    severity: [3, 2, 2, 1, 1, 1, 0], // Last 7 days
    triggers: [
      { name: 'Dairy', frequency: 85 },
      { name: 'Stress', frequency: 65 },
      { name: 'Sugar', frequency: 45 },
      { name: 'Lack of Sleep', frequency: 35 }
    ],
    improvements: [
      'Inflammation reduced by 45% since starting gut health protocol',
      'Clear skin streaks increased by 3 days on average',
      'Recovery time from breakouts decreased by 2 days'
    ]
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Acne Analysis</h2>
          <p className="text-sm text-gray-600">Severity trends and patterns</p>
        </div>
        <div className="p-2 bg-purple-50 rounded-lg">
          <TrendingUp className="h-5 w-5 text-purple-500" />
        </div>
      </div>

      {/* Severity Chart */}
      <div className="h-48 flex items-end space-x-2 mb-6">
        {acneData.severity.map((level, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div className="relative w-full">
              <div
                className={`w-full rounded-t-lg transition-all ${
                  level === 0 ? 'bg-green-200 h-4' :
                  level === 1 ? 'bg-yellow-200 h-16' :
                  level === 2 ? 'bg-orange-200 h-32' :
                  'bg-red-200 h-48'
                }`}
              />
            </div>
            <span className="mt-2 text-xs text-gray-600">
              {new Date(Date.now() - (6 - index) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
            </span>
          </div>
        ))}
      </div>

      {/* Triggers Analysis */}
      <div className="space-y-4 mb-6">
        <h3 className="text-sm font-medium text-gray-900">Common Triggers</h3>
        {acneData.triggers.map((trigger, index) => (
          <div key={index} className="flex items-center">
            <span className="w-24 text-sm text-gray-600">{trigger.name}</span>
            <div className="flex-1 ml-4">
              <div className="h-2 bg-gray-100 rounded-full">
                <div
                  className="h-full bg-purple-500 rounded-full"
                  style={{ width: `${trigger.frequency}%` }}
                />
              </div>
            </div>
            <span className="ml-4 text-sm text-gray-600">{trigger.frequency}%</span>
          </div>
        ))}
      </div>

      {/* Improvements */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-900">Recent Improvements</h3>
        {acneData.improvements.map((improvement, index) => (
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