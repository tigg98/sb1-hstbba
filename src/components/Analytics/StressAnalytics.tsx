import React from 'react';
import { Brain, TrendingUp, Heart, AlertCircle } from 'lucide-react';

export default function StressAnalytics() {
  const stressData = {
    overview: {
      currentLevel: 38,
      change: -12,
      trend: 'decreasing'
    },
    factors: [
      { name: 'Work', impact: 75, frequency: 'High' },
      { name: 'Sleep Quality', impact: 65, frequency: 'Moderate' },
      { name: 'Exercise', impact: -45, frequency: 'Moderate' },
      { name: 'Meditation', impact: -55, frequency: 'Low' }
    ],
    symptoms: [
      {
        type: 'Physical',
        symptoms: ['Increased gut sensitivity', 'Muscle tension', 'Fatigue'],
        severity: 'moderate'
      },
      {
        type: 'Mental',
        symptoms: ['Anxiety', 'Poor concentration', 'Sleep disruption'],
        severity: 'mild'
      }
    ],
    management: [
      {
        technique: 'Deep Breathing',
        effectiveness: 85,
        usage: '3x daily',
        impact: 'Reduces acute stress by 30%'
      },
      {
        technique: 'Exercise',
        effectiveness: 75,
        usage: '4x weekly',
        impact: 'Lowers baseline stress by 25%'
      },
      {
        technique: 'Meditation',
        effectiveness: 70,
        usage: '2x weekly',
        impact: 'Improves stress resilience'
      }
    ]
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Stress Analysis</h2>
          <p className="text-sm text-gray-600">Stress levels and management</p>
        </div>
        <div className="p-2 bg-orange-50 rounded-lg">
          <Brain className="h-5 w-5 text-orange-500" />
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-orange-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600">Stress Level</p>
              <p className="text-2xl font-bold text-orange-700">{stressData.overview.currentLevel}</p>
            </div>
            <Brain className="h-8 w-8 text-orange-500 opacity-75" />
          </div>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">Monthly Change</p>
              <p className="text-2xl font-bold text-green-700">{stressData.overview.change}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500 opacity-75" />
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600">Heart Rate</p>
              <p className="text-2xl font-bold text-blue-700">72 bpm</p>
            </div>
            <Heart className="h-8 w-8 text-blue-500 opacity-75" />
          </div>
        </div>
      </div>

      {/* Stress Factors */}
      <div className="space-y-4 mb-6">
        <h3 className="text-sm font-medium text-gray-900">Stress Factors</h3>
        {stressData.factors.map((factor, index) => (
          <div key={index} className="flex items-center">
            <span className="w-32 text-sm text-gray-600">{factor.name}</span>
            <div className="flex-1 ml-4">
              <div className="h-2 bg-gray-100 rounded-full">
                <div
                  className={`h-full rounded-full ${
                    factor.impact > 0 ? 'bg-red-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${Math.abs(factor.impact)}%` }}
                />
              </div>
            </div>
            <span className="ml-4 text-sm text-gray-600">{Math.abs(factor.impact)}% Impact</span>
            <span className="ml-4 text-xs text-gray-500">{factor.frequency}</span>
          </div>
        ))}
      </div>

      {/* Symptoms Impact */}
      <div className="space-y-4 mb-6">
        <h3 className="text-sm font-medium text-gray-900">Symptom Impact</h3>
        {stressData.symptoms.map((category, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">{category.type} Symptoms</h4>
              <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                category.severity === 'mild' ? 'bg-green-100 text-green-700' :
                category.severity === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {category.severity}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {category.symptoms.map((symptom, i) => (
                <span key={i} className="text-sm bg-white px-2 py-1 rounded-lg text-gray-600">
                  {symptom}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Management Techniques */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900">Management Techniques</h3>
        {stressData.management.map((technique, index) => (
          <div key={index} className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-blue-900">{technique.technique}</h4>
              <span className="text-sm text-blue-700">{technique.effectiveness}% effective</span>
            </div>
            <p className="text-sm text-blue-600">Usage: {technique.usage}</p>
            <p className="text-sm text-blue-700 mt-1">{technique.impact}</p>
          </div>
        ))}
      </div>
    </div>
  );
}