import React from 'react';
import { Activity, TrendingDown, TrendingUp, AlertCircle } from 'lucide-react';

export default function ExerciseImpact() {
  const impacts = [
    {
      type: 'positive',
      title: 'Symptom Reduction',
      description: 'Morning walks reduce bloating by 45% within 2 hours',
      metric: '45%',
      trend: 'improving'
    },
    {
      type: 'insight',
      title: 'Optimal Timing',
      description: 'Exercise 3-4 hours after meals shows best results',
      recommendation: 'Schedule workouts between 10am-11am'
    },
    {
      type: 'warning',
      title: 'High Intensity Warning',
      description: 'High intensity workouts may trigger symptoms',
      recommendation: 'Stick to low-moderate intensity'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Exercise Impact Analysis</h2>
          <p className="text-sm text-gray-600">How exercise affects your symptoms</p>
        </div>
      </div>

      <div className="space-y-4">
        {impacts.map((impact, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              impact.type === 'positive'
                ? 'bg-green-50'
                : impact.type === 'warning'
                ? 'bg-red-50'
                : 'bg-blue-50'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${
                impact.type === 'positive'
                  ? 'bg-green-100'
                  : impact.type === 'warning'
                  ? 'bg-red-100'
                  : 'bg-blue-100'
              }`}>
                {impact.type === 'positive' ? (
                  <TrendingUp className={`h-5 w-5 ${
                    impact.type === 'positive'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`} />
                ) : impact.type === 'warning' ? (
                  <AlertCircle className="h-5 w-5 text-red-600" />
                ) : (
                  <Activity className="h-5 w-5 text-blue-600" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className={`font-medium ${
                    impact.type === 'positive'
                      ? 'text-green-900'
                      : impact.type === 'warning'
                      ? 'text-red-900'
                      : 'text-blue-900'
                  }`}>
                    {impact.title}
                  </h3>
                  {impact.metric && (
                    <span className="font-medium text-green-600">{impact.metric}</span>
                  )}
                </div>
                <p className={`text-sm mt-1 ${
                  impact.type === 'positive'
                    ? 'text-green-700'
                    : impact.type === 'warning'
                    ? 'text-red-700'
                    : 'text-blue-700'
                }`}>
                  {impact.description}
                </p>
                {impact.recommendation && (
                  <p className={`text-sm mt-2 font-medium ${
                    impact.type === 'warning'
                      ? 'text-red-700'
                      : 'text-blue-700'
                  }`}>
                    Recommendation: {impact.recommendation}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}