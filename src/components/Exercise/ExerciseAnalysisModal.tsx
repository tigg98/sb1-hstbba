import React from 'react';
import { X, Activity, Heart, TrendingUp, Clock, Brain, AlertCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  exercises: any[];
  dailyStats: {
    totalCalories: number;
    totalMinutes: number;
    avgHeartRate: number;
    steps: number;
  };
  insights: {
    icon: React.ReactNode;
    text: string;
  }[];
}

export default function ExerciseAnalysisModal({ isOpen, onClose, exercises, dailyStats, insights }: Props) {
  if (!isOpen) return null;

  const analysisData = {
    trends: [
      {
        metric: 'Exercise Duration',
        value: '+15%',
        description: 'Increased from last week',
        impact: 'Positive impact on gut motility'
      },
      {
        metric: 'Recovery Time',
        value: '-20%',
        description: 'Faster recovery between sessions',
        impact: 'Reduced inflammation response'
      },
      {
        metric: 'Exercise Intensity',
        value: 'Optimal',
        description: 'Maintaining moderate levels',
        impact: 'Balanced stress on digestive system'
      }
    ],
    recommendations: [
      {
        title: 'Timing Optimization',
        description: 'Schedule workouts 2-3 hours after meals',
        reason: 'Reduces digestive stress',
        priority: 'high'
      },
      {
        title: 'Intensity Management',
        description: 'Keep heart rate between 120-140 BPM',
        reason: 'Optimal for gut health',
        priority: 'medium'
      },
      {
        title: 'Recovery Protocol',
        description: 'Add 10-minute cool-down walks',
        reason: 'Helps reduce inflammation',
        priority: 'medium'
      }
    ],
    correlations: [
      {
        factor: 'Gut Health',
        correlation: 0.75,
        insight: 'Morning exercises show 30% better gut response'
      },
      {
        factor: 'Inflammation',
        correlation: -0.65,
        insight: 'Low-intensity workouts reduce inflammation by 25%'
      },
      {
        factor: 'Energy Levels',
        correlation: 0.80,
        insight: 'Exercise improves energy levels for 6-8 hours'
      }
    ]
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-25">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-4xl">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900">Exercise Analysis</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Overview Stats */}
            <div className="grid grid-cols-4 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{dailyStats.totalMinutes}</p>
                <p className="text-sm text-gray-600">Minutes</p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <Activity className="h-5 w-5 text-green-500" />
                  <TrendingUp className="h-4 w-4 text-green-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{dailyStats.totalCalories}</p>
                <p className="text-sm text-gray-600">Calories</p>
              </div>

              <div className="p-4 bg-red-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span className="text-xs text-red-600">Avg</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{dailyStats.avgHeartRate}</p>
                <p className="text-sm text-gray-600">BPM</p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <Brain className="h-5 w-5 text-purple-500" />
                  <span className="text-xs text-purple-600">Impact</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">Low</p>
                <p className="text-sm text-gray-600">Stress</p>
              </div>
            </div>

            {/* Trends Analysis */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Trends Analysis</h3>
              <div className="grid grid-cols-3 gap-4">
                {analysisData.trends.map((trend, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{trend.metric}</h4>
                      <span className="text-sm font-medium text-green-600">{trend.value}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{trend.description}</p>
                    <p className="text-sm text-blue-600">{trend.impact}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Correlations */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Health Correlations</h3>
              <div className="grid grid-cols-3 gap-4">
                {analysisData.correlations.map((correlation, index) => (
                  <div key={index} className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-blue-900">{correlation.factor}</h4>
                      <span className="text-sm font-medium text-blue-700">
                        {Math.abs(correlation.correlation * 100)}%
                      </span>
                    </div>
                    <p className="text-sm text-blue-700">{correlation.insight}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recommendations</h3>
              <div className="space-y-4">
                {analysisData.recommendations.map((rec, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className={`h-5 w-5 mt-0.5 ${
                        rec.priority === 'high' ? 'text-red-500' : 'text-yellow-500'
                      }`} />
                      <div>
                        <h4 className="font-medium text-gray-900">{rec.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                        <p className="text-sm text-blue-600 mt-1">{rec.reason}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Insights */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Insights</h3>
              <div className="space-y-3">
                {insights.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="p-1 bg-gray-50 rounded-full">
                      {insight.icon}
                    </div>
                    <p className="text-sm text-gray-600">{insight.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end p-6 border-t border-gray-100">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Close Analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}