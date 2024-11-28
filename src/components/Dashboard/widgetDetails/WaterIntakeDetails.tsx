import React from 'react';
import { Droplet, TrendingUp, AlertCircle, Info } from 'lucide-react';

export default function WaterIntakeDetails() {
  const waterData = {
    daily: {
      current: 1500,
      goal: 2000,
      progress: 75,
      lastDrink: '30 minutes ago'
    },
    sources: [
      { type: 'Filtered', amount: 1000, quality: 'good', time: '8:00 AM' },
      { type: 'Tap', amount: 500, quality: 'moderate', time: '11:00 AM' }
    ],
    hourlyIntake: [
      { hour: '6 AM', amount: 250 },
      { hour: '9 AM', amount: 500 },
      { hour: '12 PM', amount: 400 },
      { hour: '3 PM', amount: 350 }
    ],
    quality: {
      ph: 7.2,
      minerals: 'Optimal',
      chlorine: 'Low'
    },
    insights: [
      {
        type: 'positive',
        text: 'Filtered water correlates with 25% fewer digestive symptoms'
      },
      {
        type: 'info',
        text: 'Higher mineral content may improve gut health'
      },
      {
        type: 'warning',
        text: 'Consider reducing tap water intake due to chlorine content'
      }
    ]
  };

  return (
    <div className="space-y-8">
      {/* Current Status */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <Droplet className="h-5 w-5 text-blue-500" />
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{waterData.daily.current}ml</p>
          <p className="text-sm text-gray-600">Current Intake</p>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-blue-600">Goal</span>
            <span className="text-sm text-blue-600">{waterData.daily.progress}%</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{waterData.daily.goal}ml</p>
          <p className="text-sm text-gray-600">Daily Target</p>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <Info className="h-5 w-5 text-blue-500" />
            <span className="text-sm text-blue-600">Last Drink</span>
          </div>
          <p className="text-lg font-bold text-gray-900">{waterData.daily.lastDrink}</p>
          <p className="text-sm text-gray-600">Time Since Last</p>
        </div>
      </div>

      {/* Water Sources */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Water Sources</h3>
        {waterData.sources.map((source, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">{source.type} Water</h4>
              <span className={`px-2 py-1 rounded-full text-xs ${
                source.quality === 'good'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {source.quality} quality
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{source.amount}ml</span>
              <span>{source.time}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Hourly Intake */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Hourly Intake</h3>
        <div className="bg-white p-4 rounded-lg">
          <div className="h-48 flex items-end space-x-2">
            {waterData.hourlyIntake.map((hour, index) => (
              <div key={index} className="flex-1 relative group">
                <div
                  className="w-full bg-blue-100 rounded-t-lg transition-all duration-300 group-hover:bg-blue-200"
                  style={{ height: `${(hour.amount / 500) * 100}%` }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                      {hour.amount}ml
                    </div>
                  </div>
                </div>
                <span className="absolute bottom-0 left-0 right-0 text-center text-xs text-gray-600 mt-2">
                  {hour.hour}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Water Quality */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Water Quality Analysis</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900">pH Level</h4>
            <p className="text-2xl font-bold text-gray-900">{waterData.quality.ph}</p>
            <p className="text-sm text-gray-600">Optimal Range: 7.0-7.5</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900">Minerals</h4>
            <p className="text-2xl font-bold text-gray-900">{waterData.quality.minerals}</p>
            <p className="text-sm text-gray-600">Good mineral content</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900">Chlorine</h4>
            <p className="text-2xl font-bold text-gray-900">{waterData.quality.chlorine}</p>
            <p className="text-sm text-gray-600">Below threshold</p>
          </div>
        </div>
      </section>

      {/* Insights */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Water Insights</h3>
        {waterData.insights.map((insight, index) => (
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