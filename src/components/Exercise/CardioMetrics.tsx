import React from 'react';
import { Heart, TrendingUp, Activity, Clock } from 'lucide-react';

export default function CardioMetrics() {
  const cardioData = {
    sessions: [
      {
        type: 'Walking',
        duration: 30,
        heartRate: { avg: 115, max: 125 },
        intensity: 'Low',
        impact: 'Minimal digestive stress'
      },
      {
        type: 'Swimming',
        duration: 25,
        heartRate: { avg: 135, max: 145 },
        intensity: 'Moderate',
        impact: 'Low-impact, full body'
      },
      {
        type: 'Cycling',
        duration: 20,
        heartRate: { avg: 125, max: 140 },
        intensity: 'Low-Moderate',
        impact: 'Gentle on digestive system'
      }
    ],
    improvements: [
      {
        metric: 'Endurance',
        increase: 25,
        details: 'Longer sessions with stable heart rate'
      },
      {
        metric: 'Recovery',
        increase: 35,
        details: 'Faster heart rate recovery'
      },
      {
        metric: 'Symptom Impact',
        increase: 40,
        details: 'Reduced exercise-related discomfort'
      }
    ]
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Cardiovascular Training</h2>
          <p className="text-sm text-gray-600">Monitor your cardio activities</p>
        </div>
        <div className="p-2 bg-red-50 rounded-lg">
          <Heart className="h-5 w-5 text-red-500" />
        </div>
      </div>

      <div className="space-y-6">
        {cardioData.sessions.map((session, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900">{session.type}</h3>
              <span className={`text-xs px-2 py-1 rounded-full ${
                session.intensity === 'Low'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {session.intensity} Intensity
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{session.duration} min</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {session.heartRate.avg} bpm avg
                </span>
              </div>
            </div>

            <p className="text-sm text-blue-600">{session.impact}</p>
          </div>
        ))}

        <div className="border-t border-gray-100 pt-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Improvements</h3>
          <div className="space-y-4">
            {cardioData.improvements.map((improvement, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{improvement.metric}</p>
                  <p className="text-sm text-gray-600">{improvement.details}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium text-green-600">
                    +{improvement.increase}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}