import React from 'react';
import { Brain, TrendingDown, Heart, AlertCircle } from 'lucide-react';

export default function StressLevelsDetails() {
  const stressData = {
    current: {
      level: 38,
      change: -12,
      trend: 'decreasing',
      heartRate: {
        current: 72,
        baseline: 68
      }
    },
    factors: [
      { 
        name: 'Work',
        impact: 'high',
        score: 75,
        details: 'Increased workload this week',
        recommendations: ['Take regular breaks', 'Practice time management']
      },
      { 
        name: 'Sleep',
        impact: 'low',
        score: 35,
        details: 'Sleep quality has improved',
        recommendations: ['Maintain current sleep schedule']
      },
      {
        name: 'Exercise',
        impact: 'positive',
        score: 45,
        details: 'Regular exercise helping manage stress',
        recommendations: ['Continue morning workout routine']
      }
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
    ],
    correlations: [
      {
        factor: 'Gut Health',
        correlation: -0.75,
        insight: 'Lower stress correlates with 35% fewer gut symptoms'
      },
      {
        factor: 'Sleep Quality',
        correlation: -0.80,
        insight: 'Better sleep reduces next-day stress by 40%'
      },
      {
        factor: 'Exercise',
        correlation: -0.70,
        insight: 'Regular exercise decreases baseline stress by 30%'
      }
    ]
  };

  return (
    <div className="space-y-8">
      {/* Current Status */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-orange-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <Brain className="h-5 w-5 text-orange-500" />
            <TrendingDown className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stressData.current.level}</p>
          <p className="text-sm text-gray-600">Stress Level</p>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <TrendingDown className="h-5 w-5 text-green-500" />
            <span className="text-sm text-green-600">{stressData.current.change}%</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stressData.current.trend}</p>
          <p className="text-sm text-gray-600">Weekly Trend</p>
        </div>

        <div className="p-4 bg-red-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <Heart className="h-5 w-5 text-red-500" />
            <span className="text-sm text-red-600">+{stressData.current.heartRate.current - stressData.current.heartRate.baseline}</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stressData.current.heartRate.current}</p>
          <p className="text-sm text-gray-600">Heart Rate</p>
        </div>
      </div>

      {/* Stress Factors */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Contributing Factors</h3>
        {stressData.factors.map((factor, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">{factor.name}</h4>
              <span className={`px-2 py-1 rounded-full text-xs ${
                factor.impact === 'high'
                  ? 'bg-red-100 text-red-700'
                  : factor.impact === 'low'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {factor.impact} impact
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{factor.details}</p>
            <div className="relative pt-1 mb-3">
              <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                <div
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                    factor.impact === 'high' ? 'bg-red-500' :
                    factor.impact === 'low' ? 'bg-green-500' :
                    'bg-yellow-500'
                  }`}
                  style={{ width: `${factor.score}%` }}
                />
              </div>
            </div>
            <div className="space-y-1">
              {factor.recommendations.map((rec, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  <span className="text-sm text-blue-600">{rec}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Symptoms Impact */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Symptom Impact</h3>
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
            <div className="flex flex-wrap gap-2">
              {category.symptoms.map((symptom, i) => (
                <span key={i} className="text-sm bg-white px-2 py-1 rounded-lg text-gray-600">
                  {symptom}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Management Techniques */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Management Techniques</h3>
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
      </section>

      {/* Correlations */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Health Correlations</h3>
        {stressData.correlations.map((correlation, index) => (
          <div key={index} className="p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-purple-900">{correlation.factor}</h4>
              <span className="text-sm text-purple-700">
                {Math.abs(correlation.correlation * 100)}% correlation
              </span>
            </div>
            <p className="text-sm text-purple-700">{correlation.insight}</p>
          </div>
        ))}
      </section>
    </div>
  );
}