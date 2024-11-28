import React from 'react';
import { Brain, TrendingUp, AlertCircle, Clock, Heart } from 'lucide-react';

export default function MoodTrackerDetails() {
  const moodData = {
    current: {
      mood: 'Good',
      score: 75,
      trend: 'improving',
      change: '+15%',
      lastUpdated: '2 hours ago'
    },
    factors: [
      { 
        name: 'Sleep',
        impact: 'positive',
        details: 'Good sleep quality last night - 7.5 hours',
        score: 85
      },
      { 
        name: 'Stress',
        impact: 'negative',
        details: 'Higher work stress today',
        score: 65
      },
      { 
        name: 'Exercise',
        impact: 'positive',
        details: 'Morning workout completed',
        score: 80
      },
      { 
        name: 'Diet',
        impact: 'positive',
        details: 'Regular, balanced meals',
        score: 75
      }
    ],
    hourlyMood: [
      { time: '6 AM', level: 60, note: 'Waking up' },
      { time: '9 AM', level: 75, note: 'After exercise' },
      { time: '12 PM', level: 80, note: 'Productive morning' },
      { time: '3 PM', level: 70, note: 'Afternoon lull' },
      { time: '6 PM', level: 75, note: 'Evening recovery' }
    ],
    correlations: [
      {
        factor: 'Exercise',
        strength: 0.85,
        insight: 'Morning exercise improves mood by 35%'
      },
      {
        factor: 'Sleep',
        strength: 0.78,
        insight: 'Quality sleep increases next-day mood by 40%'
      },
      {
        factor: 'Diet',
        strength: 0.72,
        insight: 'Regular meals stabilize mood patterns'
      }
    ],
    recommendations: [
      {
        type: 'exercise',
        text: 'Maintain morning exercise routine',
        impact: 'Helps maintain positive mood throughout day'
      },
      {
        type: 'sleep',
        text: 'Continue consistent sleep schedule',
        impact: 'Supports emotional resilience'
      },
      {
        type: 'stress',
        text: 'Consider afternoon meditation',
        impact: 'May help with work-related stress'
      }
    ]
  };

  return (
    <div className="space-y-8">
      {/* Current Status */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <Brain className="h-5 w-5 text-blue-500" />
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{moodData.current.score}</p>
          <p className="text-sm text-gray-600">Mood Score</p>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <Heart className="h-5 w-5 text-green-500" />
            <span className="text-sm text-green-600">{moodData.current.change}</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{moodData.current.mood}</p>
          <p className="text-sm text-gray-600">{moodData.current.trend}</p>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <Clock className="h-5 w-5 text-purple-500" />
            <span className="text-sm text-purple-600">Last Update</span>
          </div>
          <p className="text-lg font-bold text-gray-900">{moodData.current.lastUpdated}</p>
          <p className="text-sm text-gray-600">Time Since Update</p>
        </div>
      </div>

      {/* Contributing Factors */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Contributing Factors</h3>
        <div className="grid grid-cols-2 gap-4">
          {moodData.factors.map((factor, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{factor.name}</h4>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  factor.impact === 'positive'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {factor.impact}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{factor.details}</p>
              <div className="relative pt-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-gray-600">{factor.score}%</span>
                </div>
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                  <div
                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                      factor.impact === 'positive' ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${factor.score}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mood Pattern */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Daily Mood Pattern</h3>
        <div className="bg-white p-4 rounded-lg">
          <div className="h-48 flex items-end space-x-2">
            {moodData.hourlyMood.map((hour, index) => (
              <div key={index} className="flex-1 relative group">
                <div
                  className="w-full bg-blue-100 rounded-t-lg transition-all duration-300 group-hover:bg-blue-200"
                  style={{ height: `${hour.level}%` }}
                >
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                      <p>{hour.level}% Mood</p>
                      <p>{hour.note}</p>
                    </div>
                  </div>
                </div>
                <span className="absolute bottom-0 left-0 right-0 text-center text-xs text-gray-600 mt-2">
                  {hour.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Correlations */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Key Correlations</h3>
        {moodData.correlations.map((correlation, index) => (
          <div key={index} className="p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-purple-900">{correlation.factor}</h4>
              <span className="text-sm text-purple-700">
                {Math.round(correlation.strength * 100)}% correlation
              </span>
            </div>
            <p className="text-sm text-purple-700">{correlation.insight}</p>
          </div>
        ))}
      </section>

      {/* Recommendations */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Recommendations</h3>
        {moodData.recommendations.map((rec, index) => (
          <div key={index} className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">{rec.text}</p>
                <p className="text-sm text-blue-700 mt-1">{rec.impact}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}