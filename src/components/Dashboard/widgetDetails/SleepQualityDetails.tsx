import React from 'react';
import { Moon, Clock, Brain, TrendingUp, AlertCircle } from 'lucide-react';

export default function SleepQualityDetails() {
  const sleepData = {
    overview: {
      score: 85,
      hours: 7.5,
      quality: 'Good',
      trend: 'improving',
      deepSleep: '2h 15m',
      remSleep: '1h 45m',
      lightSleep: '3h 30m',
      lastUpdated: '2 hours ago'
    },
    cycles: [
      {
        type: 'Deep Sleep',
        duration: '2h 15m',
        percentage: 30,
        quality: 'Excellent',
        benefits: [
          'Physical recovery',
          'Immune system support',
          'Tissue repair'
        ],
        details: 'Achieved optimal deep sleep duration. This phase is crucial for physical recovery and immune function.'
      },
      {
        type: 'REM Sleep',
        duration: '1h 45m',
        percentage: 23,
        quality: 'Good',
        benefits: [
          'Memory consolidation',
          'Emotional processing',
          'Learning enhancement'
        ],
        details: 'Good REM sleep achieved. This phase is important for cognitive function and emotional processing.'
      },
      {
        type: 'Light Sleep',
        duration: '3h 30m',
        percentage: 47,
        quality: 'Normal',
        benefits: [
          'Mental recovery',
          'Memory formation',
          'Maintaining sleep continuity'
        ],
        details: 'Normal light sleep duration. This transitional phase helps maintain sleep continuity.'
      }
    ],
    factors: [
      {
        name: 'Exercise',
        impact: 'positive',
        details: 'Morning exercise improved sleep quality',
        score: 85
      },
      {
        name: 'Screen Time',
        impact: 'neutral',
        details: 'Reduced evening screen exposure',
        score: 70
      },
      {
        name: 'Caffeine',
        impact: 'positive',
        details: 'No caffeine after 2 PM',
        score: 90
      },
      {
        name: 'Stress',
        impact: 'negative',
        details: 'Higher work stress may affect sleep',
        score: 60
      }
    ],
    insights: [
      {
        type: 'positive',
        text: 'Deep sleep duration increased by 15% this week'
      },
      {
        type: 'info',
        text: 'Consistent bedtime improving sleep efficiency'
      },
      {
        type: 'warning',
        text: 'Higher stress levels may affect sleep quality'
      }
    ],
    recommendations: [
      {
        title: 'Maintain Exercise Routine',
        description: 'Continue morning workouts for optimal sleep',
        impact: 'Can improve deep sleep by 20%'
      },
      {
        title: 'Stress Management',
        description: 'Consider evening meditation',
        impact: 'May reduce sleep onset time by 15 minutes'
      },
      {
        title: 'Sleep Schedule',
        description: 'Keep consistent sleep/wake times',
        impact: 'Improves overall sleep quality by 25%'
      }
    ]
  };

  return (
    <div className="space-y-8">
      {/* Overview Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <Moon className="h-5 w-5 text-purple-500" />
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{sleepData.overview.hours}h</p>
          <p className="text-sm text-gray-600">Total Sleep</p>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <Brain className="h-5 w-5 text-blue-500" />
            <span className="text-sm text-blue-600">{sleepData.overview.trend}</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{sleepData.overview.score}</p>
          <p className="text-sm text-gray-600">Sleep Score</p>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <Clock className="h-5 w-5 text-green-500" />
            <span className="text-sm text-green-600">Efficiency</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">92%</p>
          <p className="text-sm text-gray-600">Sleep Quality</p>
        </div>

        <div className="p-4 bg-orange-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <AlertCircle className="h-5 w-5 text-orange-500" />
            <span className="text-sm text-orange-600">Cycles</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">5</p>
          <p className="text-sm text-gray-600">Complete Cycles</p>
        </div>
      </div>

      {/* Sleep Cycles */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Sleep Cycles</h3>
        {sleepData.cycles.map((cycle, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">{cycle.type}</h4>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{cycle.duration}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  cycle.quality === 'Excellent' ? 'bg-green-100 text-green-700' :
                  cycle.quality === 'Good' ? 'bg-blue-100 text-blue-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {cycle.quality}
                </span>
              </div>
            </div>
            
            <div className="mb-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600">Percentage of Total Sleep</span>
                <span className="text-sm font-medium text-gray-900">{cycle.percentage}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className={`h-full rounded-full ${
                    cycle.quality === 'Excellent' ? 'bg-green-500' :
                    cycle.quality === 'Good' ? 'bg-blue-500' :
                    'bg-yellow-500'
                  }`}
                  style={{ width: `${cycle.percentage}%` }}
                />
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-3">{cycle.details}</p>

            <div className="space-y-1">
              {cycle.benefits.map((benefit, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                  <span className="text-sm text-gray-600">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Contributing Factors */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Contributing Factors</h3>
        <div className="grid grid-cols-2 gap-4">
          {sleepData.factors.map((factor, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{factor.name}</h4>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  factor.impact === 'positive' ? 'bg-green-100 text-green-700' :
                  factor.impact === 'negative' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {factor.impact}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{factor.details}</p>
              <div className="relative pt-1">
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                  <div
                    className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                      factor.impact === 'positive' ? 'bg-green-500' :
                      factor.impact === 'negative' ? 'bg-red-500' :
                      'bg-yellow-500'
                    }`}
                    style={{ width: `${factor.score}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Insights */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Sleep Insights</h3>
        {sleepData.insights.map((insight, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              insight.type === 'positive' ? 'bg-green-50' :
              insight.type === 'warning' ? 'bg-yellow-50' :
              'bg-blue-50'
            }`}
          >
            <div className="flex items-start space-x-3">
              <AlertCircle className={`h-5 w-5 ${
                insight.type === 'positive' ? 'text-green-500' :
                insight.type === 'warning' ? 'text-yellow-500' :
                'text-blue-500'
              }`} />
              <p className={`text-sm ${
                insight.type === 'positive' ? 'text-green-700' :
                insight.type === 'warning' ? 'text-yellow-700' :
                'text-blue-700'
              }`}>
                {insight.text}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Recommendations */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Recommendations</h3>
        {sleepData.recommendations.map((rec, index) => (
          <div key={index} className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-medium text-purple-900 mb-1">{rec.title}</h4>
            <p className="text-sm text-purple-700">{rec.description}</p>
            <p className="text-sm font-medium text-purple-900 mt-2">{rec.impact}</p>
          </div>
        ))}
      </section>
    </div>
  );
}