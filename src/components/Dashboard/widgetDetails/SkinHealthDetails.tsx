import React from 'react';
import { Heart, TrendingUp, AlertCircle, Camera } from 'lucide-react';

export default function SkinHealthDetails() {
  const skinData = {
    overview: {
      score: 85,
      trend: 'improving',
      change: '+15%',
      lastUpdated: '2 hours ago'
    },
    symptoms: [
      { name: 'Inflammation', level: 'low', change: -20 },
      { name: 'Dryness', level: 'moderate', change: -5 },
      { name: 'Sensitivity', level: 'low', change: -15 },
      { name: 'Acne', level: 'low', change: -25 }
    ],
    triggers: [
      { name: 'Dairy', timestamp: '2 days ago', impact: 'high', details: 'Increased inflammation within 24 hours' },
      { name: 'Stress', timestamp: '1 day ago', impact: 'moderate', details: 'Mild flare-up during high stress period' }
    ],
    gutCorrelations: [
      {
        factor: 'Inflammation',
        correlation: 0.85,
        details: 'Strong correlation between gut inflammation and skin health'
      },
      {
        factor: 'Diet',
        correlation: 0.75,
        details: 'Dietary choices significantly impact skin condition'
      }
    ],
    recommendations: [
      {
        type: 'diet',
        text: 'Consider reducing dairy intake',
        impact: 'May improve skin clarity by 30%'
      },
      {
        type: 'lifestyle',
        text: 'Maintain consistent sleep schedule',
        impact: 'Can reduce inflammation by 25%'
      }
    ]
  };

  return (
    <div className="space-y-8">
      {/* Overview */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-pink-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <Heart className="h-5 w-5 text-pink-500" />
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{skinData.overview.score}</p>
          <p className="text-sm text-gray-600">Overall Score</p>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-green-600">Trend</span>
            <span className="text-sm text-green-600">{skinData.overview.change}</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{skinData.overview.trend}</p>
          <p className="text-sm text-gray-600">Monthly Change</p>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <Camera className="h-5 w-5 text-blue-500" />
            <span className="text-sm text-blue-600">Last Update</span>
          </div>
          <p className="text-lg font-bold text-gray-900">{skinData.overview.lastUpdated}</p>
          <p className="text-sm text-gray-600">Time Since Update</p>
        </div>
      </div>

      {/* Symptoms */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Current Symptoms</h3>
        <div className="grid grid-cols-2 gap-4">
          {skinData.symptoms.map((symptom, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{symptom.name}</h4>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  symptom.level === 'low'
                    ? 'bg-green-100 text-green-700'
                    : symptom.level === 'moderate'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {symptom.level}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className={`h-4 w-4 ${symptom.change < 0 ? 'text-green-500' : 'text-red-500'}`} />
                <span className="text-sm text-gray-600">{Math.abs(symptom.change)}% change</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Triggers */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Triggers</h3>
        {skinData.triggers.map((trigger, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">{trigger.name}</h4>
              <span className={`px-2 py-1 rounded-full text-xs ${
                trigger.impact === 'high'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {trigger.impact} impact
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{trigger.details}</p>
            <p className="text-xs text-gray-500">{trigger.timestamp}</p>
          </div>
        ))}
      </section>

      {/* Gut-Skin Correlations */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Gut-Skin Connection</h3>
        {skinData.gutCorrelations.map((correlation, index) => (
          <div key={index} className="p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-purple-900">{correlation.factor}</h4>
              <span className="text-sm text-purple-700">{correlation.correlation * 100}% correlation</span>
            </div>
            <p className="text-sm text-purple-700">{correlation.details}</p>
          </div>
        ))}
      </section>

      {/* Recommendations */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Recommendations</h3>
        {skinData.recommendations.map((rec, index) => (
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