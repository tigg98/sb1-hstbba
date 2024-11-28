import React, { useState } from 'react';
import { Activity, Clock, Calendar, Filter, AlertCircle, Brain } from 'lucide-react';
import ActivityDetailsModal from './ActivityDetailsModal';

interface TimelineActivity {
  id: string;
  type: 'meals' | 'exercise' | 'supplements' | 'water' | 'skin' | 'alcohol' | 'mood';
  title: string;
  time: string;
  details: string;
  metrics: Record<string, string | number>;
  status: {
    type: 'success' | 'warning' | 'error' | 'info';
    label: string;
    message: string;
  };
  additionalInfo?: {
    notes?: string;
    recommendations?: string[];
  };
}

interface Props {
  activeTab?: string;
}

export default function ActivityTimeline({ activeTab = 'all' }: Props) {
  const [selectedActivity, setSelectedActivity] = useState<TimelineActivity | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const activities: TimelineActivity[] = [
    // Mood Activities
    {
      id: 'mood1',
      type: 'mood',
      title: 'Morning Mood Check',
      time: '8:00 AM',
      details: 'Feeling energized and positive after meditation',
      metrics: {
        mood: 'Great',
        energy: 'High',
        stress: 'Low'
      },
      status: {
        type: 'success',
        label: 'Positive',
        message: 'Good mood correlates with stable gut health'
      },
      additionalInfo: {
        notes: 'Morning meditation session was very effective',
        recommendations: [
          'Continue morning meditation practice',
          'Maintain regular sleep schedule'
        ]
      }
    },
    {
      id: 'mood2',
      type: 'mood',
      title: 'Afternoon Check-in',
      time: '2:30 PM',
      details: 'Slight dip in energy after lunch',
      metrics: {
        mood: 'Good',
        energy: 'Moderate',
        stress: 'Moderate'
      },
      status: {
        type: 'info',
        label: 'Stable',
        message: 'Normal post-lunch energy fluctuation'
      },
      additionalInfo: {
        notes: 'Consider adjusting lunch portions',
        recommendations: [
          'Try smaller, more frequent meals',
          'Take a short walk after lunch'
        ]
      }
    },
    // Exercise Activities
    {
      id: 'exercise1',
      type: 'exercise',
      title: 'Morning Walk',
      time: '7:30 AM',
      details: 'Low-intensity cardio, good energy levels',
      metrics: {
        duration: '30 min',
        intensity: 'Low',
        steps: '4,000',
        heartRate: '115 bpm'
      },
      status: {
        type: 'success',
        label: 'Optimal',
        message: 'Perfect timing and intensity for gut health'
      }
    },
    {
      id: 'exercise2',
      type: 'exercise',
      title: 'Yoga Session',
      time: '5:00 PM',
      details: 'Gentle flow focusing on digestion',
      metrics: {
        duration: '20 min',
        intensity: 'Low',
        type: 'Flexibility',
        focus: 'Core'
      },
      status: {
        type: 'success',
        label: 'Beneficial',
        message: 'Improved digestion and reduced bloating'
      }
    },
    // Meal Activities
    {
      id: 'meal1',
      type: 'meals',
      title: 'Breakfast',
      time: '8:30 AM',
      details: 'Overnight oats with berries and almond butter',
      metrics: {
        calories: '350',
        protein: '12g',
        fiber: '8g',
        water: '240ml'
      },
      status: {
        type: 'success',
        label: 'Well Tolerated',
        message: 'Good energy and digestion'
      }
    },
    {
      id: 'meal2',
      type: 'meals',
      title: 'Lunch',
      time: '12:30 PM',
      details: 'Grilled chicken salad with quinoa',
      metrics: {
        calories: '450',
        protein: '35g',
        fiber: '12g',
        water: '500ml'
      },
      status: {
        type: 'info',
        label: 'Monitoring',
        message: 'New recipe - tracking response'
      }
    },
    // Water Activities
    {
      id: 'water1',
      type: 'water',
      title: 'Morning Hydration',
      time: '7:00 AM',
      details: 'Filtered water with minerals',
      metrics: {
        amount: '500ml',
        type: 'Filtered',
        minerals: 'Added',
        temperature: 'Room'
      },
      status: {
        type: 'success',
        label: 'Optimal',
        message: 'Good mineral content and timing'
      }
    },
    {
      id: 'water2',
      type: 'water',
      title: 'Mid-morning Water',
      time: '10:30 AM',
      details: 'Spring water',
      metrics: {
        amount: '400ml',
        type: 'Spring',
        minerals: 'Natural',
        temperature: 'Cold'
      },
      status: {
        type: 'info',
        label: 'Good',
        message: 'Consider room temperature'
      }
    },
    // Supplement Activities
    {
      id: 'supp1',
      type: 'supplements',
      title: 'Morning Supplements',
      time: '8:00 AM',
      details: 'Daily essentials with breakfast',
      metrics: {
        'Vitamin D': '5000 IU',
        'Probiotics': '50B CFU',
        'Magnesium': '400mg'
      },
      status: {
        type: 'success',
        label: 'On Schedule',
        message: 'Taken with food as recommended'
      }
    },
    {
      id: 'supp2',
      type: 'supplements',
      title: 'Evening Supplements',
      time: '6:00 PM',
      details: 'Evening minerals and herbs',
      metrics: {
        'Zinc': '15mg',
        'Fish Oil': '1000mg',
        'Turmeric': '500mg'
      },
      status: {
        type: 'success',
        label: 'Complete',
        message: 'Good absorption with dinner'
      }
    },
    // Skin Activities
    {
      id: 'skin1',
      type: 'skin',
      title: 'Morning Assessment',
      time: '7:15 AM',
      details: 'Daily skin check and documentation',
      metrics: {
        inflammation: 'Low',
        hydration: 'Good',
        newSpots: '0'
      },
      status: {
        type: 'success',
        label: 'Improving',
        message: 'Reduced inflammation noted'
      }
    },
    {
      id: 'skin2',
      type: 'skin',
      title: 'Evening Check',
      time: '9:00 PM',
      details: 'End of day skin assessment',
      metrics: {
        inflammation: 'Low',
        hydration: 'Moderate',
        irritation: 'None'
      },
      status: {
        type: 'success',
        label: 'Stable',
        message: 'Maintained good condition'
      }
    },
    // Alcohol Activities
    {
      id: 'alc1',
      type: 'alcohol',
      title: 'Social Event',
      time: '7:00 PM',
      details: 'Red wine with dinner',
      metrics: {
        type: 'Red Wine',
        amount: '5 oz',
        duration: '1 hour',
        withFood: 'Yes'
      },
      status: {
        type: 'info',
        label: 'Moderate',
        message: 'Within recommended limits'
      }
    }
  ];

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-700';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700';
      case 'error':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  const filteredActivities = activities.filter(activity => 
    activeTab === 'all' || activity.type === activeTab
  ).sort((a, b) => {
    const timeA = new Date(`1970/01/01 ${a.time}`).getTime();
    const timeB = new Date(`1970/01/01 ${b.time}`).getTime();
    return timeA - timeB;
  });

  return (
    <div className="space-y-4">
      {/* Date Selection */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <input
            type="date"
            value={selectedDate.toISOString().split('T')[0]}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className="p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      {/* Activity List */}
      <div className="space-y-4">
        {filteredActivities.map((activity) => (
          <button
            key={activity.id}
            onClick={() => setSelectedActivity(activity)}
            className="w-full text-left bg-white rounded-lg shadow-sm p-6 hover:bg-gray-50 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">{activity.time}</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status.type)}`}>
                {activity.status.label}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium text-gray-900">{activity.title}</h3>
              <p className="text-sm text-gray-600">{activity.details}</p>

              <div className="flex flex-wrap gap-2 mt-2">
                {Object.entries(activity.metrics).map(([key, value], i) => (
                  <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                    {key}: {value}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Activity Details Modal */}
      {selectedActivity && (
        <ActivityDetailsModal
          activity={selectedActivity}
          isOpen={!!selectedActivity}
          onClose={() => setSelectedActivity(null)}
        />
      )}
    </div>
  );
}