import React from 'react';
import { Activity, Clock, Heart, Utensils, Pill, AlertCircle } from 'lucide-react';

export default function ActivityLogDetails() {
  const activities = [
    {
      id: '1',
      type: 'meal',
      name: 'Breakfast',
      time: '8:00 AM',
      details: 'Oatmeal with berries and almond butter',
      metrics: {
        calories: '350 kcal',
        protein: '12g',
        fiber: '8g'
      },
      impact: 'positive',
      notes: 'Felt energized and satiated until lunch'
    },
    {
      id: '2',
      type: 'exercise',
      name: 'Morning Walk',
      time: '9:30 AM',
      details: 'Low intensity, good energy levels',
      metrics: {
        duration: '30 min',
        steps: '4,000',
        calories: '150 kcal'
      },
      impact: 'positive',
      notes: 'Perfect for morning routine'
    },
    {
      id: '3',
      type: 'supplement',
      name: 'Morning Supplements',
      time: '8:30 AM',
      details: 'Daily essential supplements',
      metrics: {
        'Vitamin D': '5000 IU',
        'Probiotics': '50 billion CFU',
        'Magnesium': '200mg'
      },
      impact: 'neutral',
      notes: 'Taken with breakfast for better absorption'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'meal':
        return <Utensils className="h-5 w-5 text-emerald-500" />;
      case 'exercise':
        return <Activity className="h-5 w-5 text-blue-500" />;
      case 'supplement':
        return <Pill className="h-5 w-5 text-purple-500" />;
      default:
        return null;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive':
        return 'bg-green-100 text-green-700';
      case 'negative':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {activities.map((activity) => (
        <div key={activity.id} className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium text-gray-900">{activity.name}</h3>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(activity.impact)}`}>
                    {activity.impact}
                  </span>
                  <div className="flex items-center text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">{activity.time}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{activity.details}</p>

              <div className="grid grid-cols-3 gap-4 mb-4">
                {Object.entries(activity.metrics).map(([key, value], index) => (
                  <div key={index} className="p-3 bg-white rounded-lg shadow-sm">
                    <p className="text-sm text-gray-500">{key}</p>
                    <p className="text-lg font-medium text-gray-900">{value}</p>
                  </div>
                ))}
              </div>

              {activity.notes && (
                <div className="flex items-start space-x-2 text-sm text-gray-600">
                  <AlertCircle className="h-4 w-4 text-blue-500 mt-1" />
                  <p>{activity.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}