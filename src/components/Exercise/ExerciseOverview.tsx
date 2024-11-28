import React from 'react';
import { Activity, Heart, Flame, Clock, TrendingUp, ArrowRight } from 'lucide-react';

export default function ExerciseOverview() {
  const metrics = [
    {
      name: 'Weekly Active Minutes',
      value: '185',
      target: '200',
      icon: Clock,
      color: 'blue',
      progress: 85
    },
    {
      name: 'Avg Heart Rate',
      value: '128',
      unit: 'bpm',
      icon: Heart,
      color: 'red',
      change: -5
    },
    {
      name: 'Calories Burned',
      value: '1,250',
      target: '1,500',
      icon: Flame,
      color: 'orange',
      progress: 75
    },
    {
      name: 'Symptom Impact',
      value: 'Low',
      trend: 'improving',
      icon: Activity,
      color: 'green',
      change: 15
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`p-2 bg-${metric.color}-50 rounded-lg`}>
              <metric.icon className={`h-5 w-5 text-${metric.color}-500`} />
            </div>
            {metric.change && (
              <div className={`flex items-center text-sm ${
                metric.change > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp className={`h-4 w-4 ${
                  metric.change > 0 ? '' : 'transform rotate-180'
                }`} />
                <span>{Math.abs(metric.change)}%</span>
              </div>
            )}
          </div>

          <h3 className="text-sm text-gray-600">{metric.name}</h3>
          <div className="mt-1 flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
            {metric.unit && <span className="text-gray-600">{metric.unit}</span>}
          </div>

          {metric.progress && (
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium text-gray-900">{metric.progress}%</span>
              </div>
              <div className="mt-2 h-2 bg-gray-100 rounded-full">
                <div
                  className={`h-full bg-${metric.color}-500 rounded-full`}
                  style={{ width: `${metric.progress}%` }}
                />
              </div>
            </div>
          )}

          {metric.target && (
            <p className="mt-2 text-sm text-gray-600">
              Target: {metric.target}
            </p>
          )}

          {metric.trend && (
            <p className={`mt-2 text-sm capitalize ${
              metric.trend === 'improving' ? 'text-green-600' : 'text-red-600'
            }`}>
              {metric.trend}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}