import React from 'react';
import { Calendar, Star, Activity, Droplet } from 'lucide-react';

export default function AchievementStreaks() {
  const streaks = [
    {
      name: 'Perfect Water Quality',
      current: 7,
      best: 14,
      icon: Droplet,
      color: 'blue'
    },
    {
      name: 'Exercise Streak',
      current: 5,
      best: 21,
      icon: Activity,
      color: 'green'
    },
    {
      name: 'Clear Skin Days',
      current: 12,
      best: 30,
      icon: Star,
      color: 'purple'
    },
    {
      name: 'Symptom-Free Days',
      current: 4,
      best: 15,
      icon: Calendar,
      color: 'orange'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Streaks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {streaks.map((streak, index) => (
          <div key={index} className={`p-4 bg-${streak.color}-50 rounded-lg`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <streak.icon className={`h-5 w-5 text-${streak.color}-500`} />
                <h3 className={`font-medium text-${streak.color}-900`}>{streak.name}</h3>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className={`text-2xl font-bold text-${streak.color}-700`}>
                  {streak.current} days
                </p>
                <p className={`text-sm text-${streak.color}-600`}>
                  Best: {streak.best} days
                </p>
              </div>
              <div className="h-8 w-8 flex items-center justify-center">
                {streak.current >= streak.best && (
                  <Star className={`h-6 w-6 text-${streak.color}-500`} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}