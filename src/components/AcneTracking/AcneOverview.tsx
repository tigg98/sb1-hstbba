import React from 'react';
import { AlertCircle, TrendingDown, Calendar, Brain } from 'lucide-react';

export default function AcneOverview() {
  const insights = [
    {
      title: 'Gut-Skin Connection',
      description: 'Recent studies show 70% improvement in acne when gut health improves',
      type: 'info'
    },
    {
      title: 'Trigger Alert',
      description: 'Dairy consumption correlates with increased breakouts in your logs',
      type: 'warning'
    },
    {
      title: 'Progress',
      description: 'Acne severity reduced by 30% since starting gut-health protocol',
      type: 'success'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Skin Health Overview</h2>
          <p className="text-sm text-gray-600">Tracking your gut-skin connection</p>
        </div>
        <div className="p-2 bg-red-50 rounded-lg">
          <AlertCircle className="h-5 w-5 text-red-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-red-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 font-medium">Current Status</p>
              <p className="text-2xl font-bold text-red-700">Mild</p>
            </div>
            <AlertCircle className="h-8 w-8 text-red-500 opacity-75" />
          </div>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Trend</p>
              <p className="text-2xl font-bold text-green-700">Improving</p>
            </div>
            <TrendingDown className="h-8 w-8 text-green-500 opacity-75" />
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Clear Days</p>
              <p className="text-2xl font-bold text-blue-700">5</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-500 opacity-75" />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              insight.type === 'warning'
                ? 'bg-yellow-50'
                : insight.type === 'success'
                ? 'bg-green-50'
                : 'bg-blue-50'
            }`}
          >
            <div className="flex items-start space-x-3">
              <Brain className={`h-5 w-5 ${
                insight.type === 'warning'
                  ? 'text-yellow-500'
                  : insight.type === 'success'
                  ? 'text-green-500'
                  : 'text-blue-500'
              }`} />
              <div>
                <h3 className={`text-sm font-medium ${
                  insight.type === 'warning'
                    ? 'text-yellow-800'
                    : insight.type === 'success'
                    ? 'text-green-800'
                    : 'text-blue-800'
                }`}>
                  {insight.title}
                </h3>
                <p className={`text-sm mt-1 ${
                  insight.type === 'warning'
                    ? 'text-yellow-700'
                    : insight.type === 'success'
                    ? 'text-green-700'
                    : 'text-blue-700'
                }`}>
                  {insight.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}