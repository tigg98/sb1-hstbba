import React from 'react';
import { TrendingUp, Clock, Brain, AlertCircle } from 'lucide-react';

export default function EnergyChartDetails() {
  const energyData = {
    current: {
      level: 75,
      trend: '+15%',
      status: 'Good'
    },
    hourlyLevels: [
      { time: '6 AM', level: 40, note: 'Waking up' },
      { time: '9 AM', level: 65, note: 'After breakfast' },
      { time: '12 PM', level: 85, note: 'Peak energy' },
      { time: '3 PM', level: 70, note: 'Post-lunch dip' },
      { time: '6 PM', level: 55, note: 'Evening fatigue' },
      { time: '9 PM', level: 60, note: 'Second wind' },
      { time: 'Now', level: 75, note: 'Current' }
    ],
    factors: [
      { name: 'Sleep Quality', impact: 'high', score: 85 },
      { name: 'Nutrition', impact: 'medium', score: 75 },
      { name: 'Exercise', impact: 'medium', score: 70 },
      { name: 'Stress Level', impact: 'high', score: 65 }
    ],
    insights: [
      {
        type: 'positive',
        text: 'Energy levels peak 2-3 hours after breakfast'
      },
      {
        type: 'info',
        text: 'Afternoon dip is less pronounced on exercise days'
      },
      {
        type: 'warning',
        text: 'Consider reducing screen time before bed to improve morning energy'
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
          <p className="text-2xl font-bold text-gray-900">{energyData.current.level}</p>
          <p className="text-sm text-gray-600">Current Level</p>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <span className="text-sm text-green-600">{energyData.current.trend}</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{energyData.current.status}</p>
          <p className="text-sm text-gray-600">Status</p>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <Clock className="h-5 w-5 text-purple-500" />
            <span className="text-sm text-purple-600">24h</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">7/7</p>
          <p className="text-sm text-gray-600">Tracking Streak</p>
        </div>
      </div>

      {/* Energy Chart */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Daily Energy Pattern</h3>
        <div className="bg-white p-4 rounded-lg">
          <div className="h-64 flex items-end space-x-2">
            {energyData.hourlyLevels.map((hour, i) => (
              <div key={i} className="flex-1 relative group">
                <div
                  className="w-full bg-blue-100 rounded-t-lg transition-all duration-300 group-hover:bg-blue-200"
                  style={{ height: `${hour.level}%` }}
                >
                  <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    <p>{hour.level}% Energy</p>
                    <p>{hour.note}</p>
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

      {/* Contributing Factors */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Contributing Factors</h3>
        <div className="grid grid-cols-2 gap-4">
          {energyData.factors.map((factor, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{factor.name}</h4>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  factor.impact === 'high'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {factor.impact} impact
                </span>
              </div>
              <div className="relative pt-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-gray-600">{factor.score}%</span>
                </div>
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                  <div
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
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
        <h3 className="text-lg font-semibold text-gray-900">Energy Insights</h3>
        {energyData.insights.map((insight, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              insight.type === 'positive'
                ? 'bg-green-50'
                : insight.type === 'warning'
                ? 'bg-yellow-50'
                : 'bg-blue-50'
            }`}
          >
            <div className="flex items-start space-x-3">
              <AlertCircle className={`h-5 w-5 ${
                insight.type === 'positive'
                  ? 'text-green-500'
                  : insight.type === 'warning'
                  ? 'text-yellow-500'
                  : 'text-blue-500'
              }`} />
              <p className={`text-sm ${
                insight.type === 'positive'
                  ? 'text-green-700'
                  : insight.type === 'warning'
                  ? 'text-yellow-700'
                  : 'text-blue-700'
              }`}>
                {insight.text}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}