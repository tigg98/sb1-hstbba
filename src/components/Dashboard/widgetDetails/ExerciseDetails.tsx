import React from 'react';
import { Activity, Heart, Clock, TrendingUp, AlertCircle } from 'lucide-react';

export default function ExerciseDetails() {
  const exerciseData = {
    summary: {
      totalMinutes: 75,
      caloriesBurned: 450,
      averageHeartRate: 125,
      steps: 8500
    },
    activities: [
      {
        type: 'Morning Walk',
        duration: 30,
        time: '7:30 AM',
        intensity: 'Low',
        heartRate: { avg: 115, max: 125 },
        calories: 150,
        steps: 4000,
        impact: 'Minimal digestive stress'
      },
      {
        type: 'Yoga',
        duration: 25,
        time: '12:15 PM',
        intensity: 'Low',
        heartRate: { avg: 95, max: 105 },
        calories: 120,
        impact: 'Improved digestion and reduced bloating'
      },
      {
        type: 'Evening Stretch',
        duration: 20,
        time: '6:00 PM',
        intensity: 'Low',
        heartRate: { avg: 85, max: 95 },
        calories: 80,
        impact: 'Relaxation and stress reduction'
      }
    ],
    insights: [
      {
        type: 'positive',
        text: 'Low-intensity morning exercises reduce inflammation by 25%'
      },
      {
        type: 'info',
        text: 'Heart rate recovery improved 12% this week'
      },
      {
        type: 'success',
        text: 'Consistent exercise pattern detected - maintaining this schedule helps reduce IBS symptoms'
      }
    ]
  };

  return (
    <div className="space-y-8">
      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <Clock className="h-5 w-5 text-blue-500" />
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{exerciseData.summary.totalMinutes}</p>
          <p className="text-sm text-gray-600">Total Minutes</p>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <Activity className="h-5 w-5 text-green-500" />
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{exerciseData.summary.caloriesBurned}</p>
          <p className="text-sm text-gray-600">Calories Burned</p>
        </div>

        <div className="p-4 bg-red-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <Heart className="h-5 w-5 text-red-500" />
            <span className="text-sm text-red-600">Avg</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{exerciseData.summary.averageHeartRate}</p>
          <p className="text-sm text-gray-600">Heart Rate</p>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <Activity className="h-5 w-5 text-purple-500" />
            <span className="text-sm text-purple-600">Total</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{exerciseData.summary.steps}</p>
          <p className="text-sm text-gray-600">Steps</p>
        </div>
      </div>

      {/* Activities */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Today's Activities</h3>
        {exerciseData.activities.map((activity, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-medium text-gray-900">{activity.type}</h4>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{activity.time}</span>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                activity.intensity === 'Low' 
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {activity.intensity} Intensity
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-3">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{activity.duration} min</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{activity.heartRate.avg} bpm avg</span>
              </div>
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">{activity.calories} cal</span>
              </div>
            </div>

            <p className="text-sm text-blue-600">{activity.impact}</p>
          </div>
        ))}
      </section>

      {/* Insights */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Exercise Insights</h3>
        {exerciseData.insights.map((insight, index) => (
          <div 
            key={index}
            className={`p-4 rounded-lg ${
              insight.type === 'positive'
                ? 'bg-green-50'
                : insight.type === 'info'
                ? 'bg-blue-50'
                : 'bg-yellow-50'
            }`}
          >
            <div className="flex items-start space-x-3">
              <AlertCircle className={`h-5 w-5 ${
                insight.type === 'positive'
                  ? 'text-green-500'
                  : insight.type === 'info'
                  ? 'text-blue-500'
                  : 'text-yellow-500'
              }`} />
              <p className={`text-sm ${
                insight.type === 'positive'
                  ? 'text-green-700'
                  : insight.type === 'info'
                  ? 'text-blue-700'
                  : 'text-yellow-700'
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