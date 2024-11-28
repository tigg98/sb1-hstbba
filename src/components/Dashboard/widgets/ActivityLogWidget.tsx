import React from 'react';
import { Activity, Calendar, Clock, Heart, Utensils, Pill, Plus } from 'lucide-react';

interface Props {
  onPageChange: (page: string) => void;
  onQuickLog: () => void;
}

interface ActivityItem {
  id: string;
  type: 'meal' | 'exercise' | 'supplement';
  name: string;
  time: string;
  details: string;
  icon: React.ElementType;
  status?: 'positive' | 'neutral' | 'negative';
}

export default function ActivityLogWidget({ onPageChange, onQuickLog }: Props) {
  const activities: ActivityItem[] = [
    {
      id: 'act-1',
      type: 'meal',
      name: 'Breakfast',
      time: '8:00 AM',
      details: 'Oatmeal with berries',
      icon: Utensils,
      status: 'positive'
    },
    {
      id: 'act-2',
      type: 'exercise',
      name: 'Morning Walk',
      time: '9:30 AM',
      details: '30 minutes, 2.5km',
      icon: Activity,
      status: 'positive'
    },
    {
      id: 'act-3',
      type: 'supplement',
      name: 'Daily Vitamins',
      time: '10:00 AM',
      details: 'Multivitamin, Vitamin D',
      icon: Pill,
      status: 'neutral'
    }
  ];

  const activityTypes = [
    { type: 'meal', label: 'Meal', icon: Utensils, color: 'emerald', bgColor: 'emerald-600', hoverColor: 'emerald-700' },
    { type: 'exercise', label: 'Exercise', icon: Activity, color: 'blue', bgColor: 'blue-600', hoverColor: 'blue-700' },
    { type: 'supplement', label: 'Supplement', icon: Pill, color: 'purple', bgColor: 'purple-600', hoverColor: 'purple-700' }
  ];

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onPageChange('log');
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'positive':
        return 'bg-green-100 text-green-700';
      case 'negative':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <section 
      className="bg-white rounded-xl shadow-sm p-4"
      aria-labelledby="activity-log-title"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 id="activity-log-title" className="text-lg font-semibold text-gray-900">
            Recent Activity
          </h2>
          <p className="text-sm text-gray-600">Today's logs</p>
        </div>
        <div className="flex items-center space-x-2">
          {activityTypes.map((type) => (
            <button
              key={type.type}
              onClick={onQuickLog}
              className={`p-2 bg-${type.bgColor} text-white rounded-lg hover:bg-${type.hoverColor} transition-colors`}
              aria-label={`Log ${type.label.toLowerCase()}`}
            >
              <Plus className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>

      <div 
        className="space-y-3"
        role="list"
        aria-label="Recent activities"
      >
        {activities.map((activity) => (
          <article 
            key={activity.id}
            className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200"
            role="listitem"
          >
            <div 
              className={`p-2 bg-${activity.type === 'meal' ? 'emerald' : activity.type === 'exercise' ? 'blue' : 'purple'}-100 rounded-lg`}
              aria-hidden="true"
            >
              <activity.icon className={`h-5 w-5 text-${activity.type === 'meal' ? 'emerald' : activity.type === 'exercise' ? 'blue' : 'purple'}-600`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900 truncate">
                  <span className="sr-only">{activity.type}: </span>
                  {activity.name}
                </h3>
                <div className="flex items-center space-x-2">
                  {activity.status && (
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                      {activity.status}
                    </span>
                  )}
                  <time 
                    dateTime={activity.time}
                    className="flex items-center text-sm text-gray-500"
                  >
                    <Clock className="h-4 w-4 mr-1" />
                    {activity.time}
                  </time>
                </div>
              </div>
              <p 
                className="mt-1 text-sm text-gray-600 truncate"
                aria-label={`Details: ${activity.details}`}
              >
                {activity.details}
              </p>
            </div>
          </article>
        ))}
      </div>

      <button
        onClick={() => onPageChange('log')}
        onKeyPress={handleKeyPress}
        className="w-full mt-4 flex items-center justify-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        aria-label="View all activities"
      >
        <Calendar className="h-4 w-4 mr-2" />
        <span>View All Activities</span>
      </button>
    </section>
  );
}