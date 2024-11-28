import React from 'react';
import { Activity, TrendingUp, Heart, Clock } from 'lucide-react';

export default function ExerciseAnalytics() {
  const exerciseData = {
    overview: {
      weeklyMinutes: 185,
      intensityScore: 65,
      recoveryRate: 'Good'
    },
    activities: [
      { type: 'Walking', minutes: 90, impact: 'Low', benefit: 'Improved digestion' },
      { type: 'Yoga', minutes: 45, impact: 'Low', benefit: 'Reduced stress' },
      { type: 'Swimming', minutes: 30, impact: 'Moderate', benefit: 'Cardiovascular health' },
      { type: 'Strength', minutes: 20, impact: 'Moderate', benefit: 'Muscle tone' }
    ],
    benefits: [
      {
        area: 'Gut Health',
        improvement: 35,
        details: 'Reduced bloating and improved motility'
      },
      {
        area: 'Stress Levels',
        improvement: 45,
        details: 'Lower cortisol levels post-exercise'
      },
      {
        area: 'Sleep Quality',
        improvement: 40,
        details: 'Better sleep onset and duration'
      }
    ],
    recommendations: [
      {
        type: 'Low-impact cardio',
        frequency: '3-4x week',
        duration: '30 minutes',
        reason: 'Optimal for gut health'
      },
      {
        type: 'Yoga/Stretching',
        frequency: '2-3x week',
        duration: '20 minutes',
        reason: 'Reduces stress and inflammation'
      }
    ]
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Exercise Analysis</h2>
          <p className="text-sm text-gray-600">Activity impact and patterns</p>
        </div>
        <div className="p-2 bg-blue-50 rounded-lg">
          <Activity className="h-5 w-5 text-blue-500" />
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600">Weekly Activity</p>
              <p className="text-2xl font-bold text-blue-700">{exerciseData.overview.weeklyMinutes}m</p>
            </div>
            <Clock className="h-8 w-8 text-blue-500 opacity-75" />
          </div>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">Intensity Score</p>
              <p className="text-2xl font-bold text-green-700">{exerciseData.overview.intensityScore}</p>
            </div>
            <Activity className="h-8 w-8 text-green-500 opacity-75" />
          </div>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600">Recovery Rate</p>
              <p className="text-2xl font-bold text-purple-700">{exerciseData.overview.recoveryRate}</p>
            </div>
            <Heart className="h-8 w-8 text-purple-500 opacity-75" />
          </div>
        </div>
      </div>

      {/* Activity Distribution */}
      <div className="space-y-4 mb-6">
        <h3 className="text-sm font-medium text-gray-900">Activity Distribution</h3>
        {exerciseData.activities.map((activity, index) => (
          <div key={index} className="flex items-center">
            <span className="w-24 text-sm text-gray-600">{activity.type}</span>
            <div className="flex-1 ml-4">
              <div className="h-2 bg-gray-100 rounded-full">
                <div
                  className={`h-full rounded-full ${
                    activity.impact === 'Low' ? 'bg-green-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${(activity.minutes / exerciseData.overview.weeklyMinutes) * 100}%` }}
                />
              </div>
            </div>
            <span className="ml-4 text-sm text-gray-600">{activity.minutes}m</span>
            <span className="ml-4 text-xs text-gray-500">{activity.benefit}</span>
          </div>
        ))}
      </div>

      {/* Health Benefits */}
      <div className="space-y-4 mb-6">
        <h3 className="text-sm font-medium text-gray-900">Health Benefits</h3>
        {exerciseData.benefits.map((benefit, index) => (
          <div key={index} className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-green-900">{benefit.area}</h4>
              <span className="text-sm text-green-700">{benefit.improvement}% improvement</span>
            </div>
            <p className="text-sm text-green-600">{benefit.details}</p>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900">Personalized Recommendations</h3>
        {exerciseData.recommendations.map((rec, index) => (
          <div key={index} className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-blue-900">{rec.type}</h4>
              <span className="text-sm text-blue-700">{rec.frequency}</span>
            </div>
            <p className="text-sm text-blue-600">Duration: {rec.duration}</p>
            <p className="text-sm text-blue-700 mt-1">{rec.reason}</p>
          </div>
        ))}
      </div>
    </div>
  );
}