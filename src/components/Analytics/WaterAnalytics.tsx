import React, { useState } from 'react';
import { Droplet, TrendingUp, AlertCircle, Calendar } from 'lucide-react';
import WaterQualityReportModal from '../WaterTracking/WaterQualityReportModal';
import WaterGoalsModal from '../WaterTracking/WaterGoalsModal';
import WaterLogModal from '../WaterTracking/WaterLogModal';

interface Props {
  timeRange: string;
}

export default function WaterAnalytics({ timeRange }: Props) {
  const [isQualityReportOpen, setIsQualityReportOpen] = useState(false);
  const [isGoalsModalOpen, setIsGoalsModalOpen] = useState(false);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

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
    },
    weeklyIntake: [
      { date: 'Mon', amount: 2500, goal: 2500, sources: { filtered: 60, tap: 30, bottled: 10 } },
      { date: 'Tue', amount: 2300, goal: 2500, sources: { filtered: 70, tap: 20, bottled: 10 } },
      { date: 'Wed', amount: 2700, goal: 2500, sources: { filtered: 80, tap: 10, bottled: 10 } },
      { date: 'Thu', amount: 2400, goal: 2500, sources: { filtered: 65, tap: 25, bottled: 10 } },
      { date: 'Fri', amount: 2600, goal: 2500, sources: { filtered: 75, tap: 15, bottled: 10 } },
      { date: 'Sat', amount: 2200, goal: 2500, sources: { filtered: 55, tap: 35, bottled: 10 } },
      { date: 'Sun', amount: 2500, goal: 2500, sources: { filtered: 70, tap: 20, bottled: 10 } }
    ]
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Water Quality Analysis</h2>
            <p className="text-sm text-gray-600">Impact on gut and skin health</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsQualityReportOpen(true)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View Report
            </button>
            <div className="p-2 bg-blue-50 rounded-lg">
              <Droplet className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Quality Metrics */}
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

        {/* Water Sources Bar Chart */}
        <div className="space-y-4 mb-6">
          <h3 className="text-sm font-medium text-gray-900">Water Sources</h3>
          <div className="h-10 bg-gray-100 rounded-lg overflow-hidden flex">
            {waterData.sources.map((source, index) => (
              <div
                key={index}
                className={`h-full ${
                  source.quality === 'good' ? 'bg-green-500' : 'bg-yellow-500'
                }`}
                style={{ width: `${source.percentage}%` }}
              >
                <div className="h-full w-full hover:bg-black hover:bg-opacity-10 transition-colors cursor-pointer group relative">
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs font-medium">
                      {source.type} ({source.percentage}%)
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Filtered (60%)</span>
            <span>Tap (30%)</span>
            <span>Bottled (10%)</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setIsGoalsModalOpen(true)}
            className="flex-1 px-3 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors text-sm font-medium"
          >
            Set Goals
          </button>
          <button
            onClick={() => setIsLogModalOpen(true)}
            className="flex-1 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm font-medium"
          >
            Log Water
          </button>
        </div>

        {/* Water Intake Calendar */}
        <div className="border-t border-gray-100 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-900">Weekly Water Intake</h3>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">This Week</span>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {waterData.weeklyIntake.map((day, index) => (
              <div key={index} className="space-y-2">
                <div className="text-center">
                  <span className="text-sm font-medium text-gray-900">{day.date}</span>
                </div>
                <div className="relative h-32 bg-gray-100 rounded-lg overflow-hidden">
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-blue-500 transition-all"
                    style={{ height: `${(day.amount / day.goal) * 100}%` }}
                  >
                    <div className="absolute inset-0 flex flex-col">
                      {Object.entries(day.sources).map(([source, percentage], i) => (
                        <div
                          key={source}
                          className={`${
                            source === 'filtered' ? 'bg-green-500' :
                            source === 'tap' ? 'bg-yellow-500' :
                            'bg-blue-500'
                          }`}
                          style={{ height: `${percentage}%` }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="absolute top-2 left-0 right-0 text-center">
                    <span className="text-xs font-medium text-gray-600">
                      {Math.round((day.amount / day.goal) * 100)}%
                    </span>
                  </div>
                </div>
                <div className="text-center">
                  <span className="text-xs text-gray-600">{day.amount}ml</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="space-y-3 mt-6">
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

      {/* Modals */}
      <WaterQualityReportModal
        isOpen={isQualityReportOpen}
        onClose={() => setIsQualityReportOpen(false)}
      />

      <WaterGoalsModal
        isOpen={isGoalsModalOpen}
        onClose={() => setIsGoalsModalOpen(false)}
      />

      <WaterLogModal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
      />
    </>
  );
}