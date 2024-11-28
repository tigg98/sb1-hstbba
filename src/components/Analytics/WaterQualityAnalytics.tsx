import React from 'react';
import { Droplet, TrendingUp, AlertCircle } from 'lucide-react';

export default function WaterQualityAnalytics() {
  const waterData = {
    sources: [
      { type: 'Filtered', percentage: 60, quality: 'good', impact: 'positive' },
      { type: 'Tap', percentage: 30, quality: 'moderate', impact: 'neutral' },
      { type: 'Bottled', percentage: 10, quality: 'good', impact: 'positive' }
    ],
    insights: [
      {
        text: 'Filtered water correlates with 25% fewer digestive symptoms',
        type: 'positive'
      },
      {
        text: 'Higher mineral content may improve gut health',
        type: 'info'
      },
      {
        text: 'Consider reducing tap water intake due to chlorine content',
        type: 'warning'
      }
    ],
    qualityTrends: {
      ph: { value: 7.2, trend: 'stable' },
      minerals: { value: 'Optimal', trend: 'improving' },
      chlorine: { value: 'Low', trend: 'improving' }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Water Quality Analysis</h2>
          <p className="text-sm text-gray-600">Impact on gut and skin health</p>
        </div>
        <div className="p-2 bg-blue-50 rounded-lg">
          <Droplet className="h-5 w-5 text-blue-500" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {Object.entries(waterData.qualityTrends).map(([key, data]) => (
          <div key={key} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 capitalize">{key}</p>
                <p className="text-lg font-semibold text-gray-900">{data.value}</p>
              </div>
              <TrendingUp className={`h-5 w-5 ${
                data.trend === 'improving' ? 'text-green-500' : 'text-blue-500'
              }`} />
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4 mb-6">
        <h3 className="text-sm font-medium text-gray-900">Water Sources</h3>
        {waterData.sources.map((source, index) => (
          <div key={index} className="flex items-center">
            <span className="w-24 text-sm text-gray-600">{source.type}</span>
            <div className="flex-1 ml-4">
              <div className="h-2 bg-gray-100 rounded-full">
                <div
                  className={`h-full rounded-full ${
                    source.quality === 'good' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}
                  style={{ width: `${source.percentage}%` }}
                />
              </div>
            </div>
            <span className="ml-4 text-sm text-gray-600">{source.percentage}%</span>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {waterData.insights.map((insight, index) => (
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
      </div>
    </div>
  );
}