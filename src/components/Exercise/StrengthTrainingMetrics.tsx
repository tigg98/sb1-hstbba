import React from 'react';
import { Dumbbell, TrendingUp, Target } from 'lucide-react';

export default function StrengthTrainingMetrics() {
  const strengthData = {
    exercises: [
      {
        name: 'Bodyweight Squats',
        sets: 3,
        reps: 12,
        progress: 15,
        impact: 'Low stress on digestive system'
      },
      {
        name: 'Push-ups',
        sets: 3,
        reps: 10,
        progress: 20,
        impact: 'Improves core stability'
      },
      {
        name: 'Resistance Band Rows',
        sets: 3,
        reps: 15,
        progress: 25,
        impact: 'Minimal gut pressure'
      }
    ],
    progressions: [
      {
        metric: 'Form Quality',
        improvement: 35,
        notes: 'Better core engagement'
      },
      {
        metric: 'Endurance',
        improvement: 28,
        notes: 'Increased work capacity'
      },
      {
        metric: 'Recovery Time',
        improvement: 40,
        notes: 'Faster between-set recovery'
      }
    ]
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Strength Training Progress</h2>
          <p className="text-sm text-gray-600">Track your resistance training</p>
        </div>
        <div className="p-2 bg-purple-50 rounded-lg">
          <Dumbbell className="h-5 w-5 text-purple-500" />
        </div>
      </div>

      <div className="space-y-6">
        {strengthData.exercises.map((exercise, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900">{exercise.name}</h3>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-600">+{exercise.progress}%</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
              <span>{exercise.sets} sets</span>
              <span>•</span>
              <span>{exercise.reps} reps</span>
            </div>
            <p className="text-sm text-blue-600">{exercise.impact}</p>
          </div>
        ))}

        <div className="border-t border-gray-100 pt-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Progress Metrics</h3>
          <div className="space-y-4">
            {strengthData.progressions.map((progression, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{progression.metric}</p>
                  <p className="text-sm text-gray-600">{progression.notes}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium text-green-600">
                    +{progression.improvement}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}