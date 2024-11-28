import React from 'react';
import { Moon, TrendingUp, Clock, Brain } from 'lucide-react';

export default function SleepAnalytics() {
  const sleepData = {
    overview: {
      averageHours: 7.5,
      quality: 85,
      trend: 'improving'
    },
    patterns: [
      { day: 'Mon', hours: 7.5, quality: 82 },
      { day: 'Tue', hours: 8, quality: 88 },
      { day: 'Wed', hours: 7, quality: 75 },
      { day: 'Thu', hours: 7.8, quality: 85 },
      { day: 'Fri', hours: 6.5, quality: 70 },
      { day: 'Sat', hours: 8.5, quality: 90 },
      { day: 'Sun', hours: 8, quality: 87 }
    ],
    impacts: [
      {
        metric: 'Gut Health',
        correlation: 'Strong positive',
        impact: 'Better sleep reduces inflammation by 35%'
      },
      {
        metric: 'Symptom Severity',
        correlation: 'Strong negative',
        impact: 'Poor sleep increases symptoms by 45%'
      },
      {
        metric: 'Recovery Time',
        correlation: 'Moderate positive',
        impact: 'Quality sleep reduces recovery time by 25%'
      }
    ]
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Sleep Analysis</h2>
          <p className="text-sm text-gray-600">Sleep quality and patterns</p>
        </div>
        <div className="p-2 bg-purple-50 rounded-lg">
          <Moon className="h-5 w-5 text-purple-500" />
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600">Average Sleep</p>
              <p className="text-2xl font-bold text-purple-700">{sleepData.overview.averageHours}h</p>
            </div>
            <Clock className="h-8 w-8 text-purple-500 opacity-75" />
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600">Sleep Quality</p>
              <p className="text-2xl font-bold text-blue-700">{sleepData.overview.quality}%</p>
            </div>
            <Brain className="h-8 w-8 text-blue-500 opacity-75" />
          </div>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">Trend</p>
              <p className="text-2xl font-bold text-green-700">Improving</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500 opacity-75" />
          </div>
        </div>
      </div>

      {/* Sleep Pattern Chart */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Weekly Sleep Pattern</h3>
        <div className="h-48 flex items-end space-x-2">
          {sleepData.patterns.map((day, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="relative w-full">
                <div
                  className="w-full bg-purple-200 rounded-t-lg transition-all"
                  style={{ height: `${(day.hours / 12) * 100}%` }}
                >
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-purple-500 rounded-t-lg transition-all"
                    style={{ height: `${day.quality}%` }}
                  />
                </div>
              </div>
              <span className="mt-2 text-xs text-gray-600">{day.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Impact Analysis */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900">Health Impacts</h3>
        {sleepData.impacts.map((impact, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">{impact.metric}</h4>
              <span className="text-sm text-purple-600">{impact.correlation}</span>
            </div>
            <p className="text-sm text-gray-600">{impact.impact}</p>
          </div>
        ))}
      </div>
    </div>
  );
}