import React, { useState } from 'react';
import { 
  Activity, 
  Clock, 
  X, 
  Coffee, 
  Utensils, 
  Pill, 
  Droplet, 
  Heart, 
  Wine,
  Plus,
  AlertCircle
} from 'lucide-react';
import QuickLogModal from './QuickLog/QuickLogModal';

interface ActivityItem {
  id: string;
  type: 'meal' | 'exercise' | 'supplement' | 'water' | 'skin' | 'alcohol';
  name: string;
  time: string;
  details: string;
  impact?: 'positive' | 'neutral' | 'negative';
  metrics?: Record<string, string | number>;
  serving?: {
    amount: number;
    unit: string;
    size: string;
  };
  notes?: string;
  recommendations?: string[];
}

interface Props {
  activeTab?: string;
}

export default function ActivityLog({ activeTab = 'all' }: Props) {
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);

  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'meal',
      name: 'Breakfast',
      time: '8:00 AM',
      details: 'Overnight oats with berries, chia seeds, and almond butter',
      impact: 'positive',
      metrics: {
        calories: '350 kcal',
        protein: '12g',
        fiber: '8g',
        carbs: '45g',
        fat: '6g'
      },
      serving: {
        amount: 1,
        unit: 'bowl',
        size: '240g'
      },
      notes: 'Felt energized and satiated until lunch',
      recommendations: [
        'Continue with fiber-rich breakfast options',
        'Consider adding nuts for healthy fats'
      ]
    },
    {
      id: '2',
      type: 'meal',
      name: 'Lunch',
      time: '12:30 PM',
      details: 'Mediterranean bowl with grilled chicken, quinoa, and roasted vegetables',
      impact: 'positive',
      metrics: {
        calories: '450 kcal',
        protein: '35g',
        fiber: '12g',
        carbs: '15g',
        fat: '28g'
      },
      serving: {
        amount: 1,
        unit: 'bowl',
        size: '350g'
      },
      notes: 'Good energy levels throughout afternoon',
      recommendations: [
        'Maintain protein-rich lunch choices',
        'Keep portion size consistent'
      ]
    },
    {
      id: '3',
      type: 'exercise',
      name: 'Morning Walk',
      time: '9:30 AM',
      details: 'Low intensity, good energy levels',
      impact: 'positive',
      metrics: {
        duration: '30 min',
        steps: '4,000',
        calories: '150 kcal',
        'avg heart rate': '115 bpm',
        'max heart rate': '125 bpm',
        intensity: 'Low'
      },
      notes: 'Perfect for morning routine',
      recommendations: [
        'Maintain morning walk schedule',
        'Consider gradually increasing duration'
      ]
    },
    {
      id: '4',
      type: 'supplement',
      name: 'Morning Supplements',
      time: '8:30 AM',
      details: 'Daily essential supplements',
      impact: 'positive',
      metrics: {
        'Vitamin D3': '5000 IU',
        'Probiotics': '50 billion CFU',
        'Omega-3': '1000mg',
        'Magnesium': '200mg',
        'With Food': 'Yes',
        'Timing': 'Optimal'
      },
      notes: 'Taken with breakfast for better absorption',
      recommendations: [
        'Continue taking with breakfast',
        'Monitor vitamin D levels quarterly'
      ]
    },
    {
      id: '5',
      type: 'water',
      name: 'Morning Hydration',
      time: '9:00 AM',
      details: 'Filtered water with minerals',
      impact: 'positive',
      metrics: {
        amount: '500ml',
        type: 'Filtered',
        quality: 'Good',
        minerals: 'Added',
        temperature: 'Room temp'
      },
      notes: 'Added mineral drops for electrolytes',
      recommendations: [
        'Continue mineral supplementation',
        'Maintain room temperature preference'
      ]
    },
    {
      id: '6',
      type: 'skin',
      name: 'Morning Assessment',
      time: '7:00 AM',
      details: 'Daily skin check and documentation',
      impact: 'positive',
      metrics: {
        condition: 'Clear',
        hydration: 'Good',
        inflammation: 'Low',
        redness: 'Minimal',
        texture: 'Smooth'
      },
      notes: 'Skin appears calmer after dietary changes',
      recommendations: [
        'Continue current skincare routine',
        'Maintain food diary correlation'
      ]
    },
    {
      id: '7',
      type: 'alcohol',
      name: 'Evening Wine',
      time: '7:00 PM',
      details: 'Red wine with dinner',
      impact: 'neutral',
      metrics: {
        type: 'Red Wine',
        amount: '5 oz',
        withFood: 'Yes',
        timing: 'With dinner',
        hydration: 'Well hydrated'
      },
      notes: 'Moderate consumption with meal',
      recommendations: [
        'Continue drinking with meals only',
        'Maintain water intake'
      ]
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
      case 'water':
        return <Droplet className="h-5 w-5 text-cyan-500" />;
      case 'skin':
        return <Heart className="h-5 w-5 text-pink-500" />;
      case 'alcohol':
        return <Wine className="h-5 w-5 text-red-500" />;
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

  const filteredActivities = activities.filter(activity => 
    activeTab === 'all' || activity.type === activeTab
  );

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 space-y-4">
        {filteredActivities.map((activity) => (
          <div
            key={activity.id}
            className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-all duration-300"
          >
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-gray-900">{activity.name}</h3>
                  <div className="flex items-center space-x-2">
                    {activity.impact && (
                      <span className={`text-xs px-2 py-1 rounded-full ${getImpactColor(activity.impact)}`}>
                        {activity.impact}
                      </span>
                    )}
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span className="text-sm">{activity.time}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{activity.details}</p>
                {activity.metrics && (
                  <div className="flex flex-wrap gap-3">
                    {Object.entries(activity.metrics).map(([key, value], i) => (
                      <span key={i} className="px-3 py-1.5 bg-white text-gray-700 rounded-full text-sm shadow-sm">
                        {key}: {value}
                      </span>
                    ))}
                  </div>
                )}
                {activity.serving && (
                  <div className="mt-2 text-sm text-gray-600">
                    Serving: {activity.serving.amount} {activity.serving.unit} ({activity.serving.size})
                  </div>
                )}
                {activity.notes && (
                  <p className="mt-3 text-sm text-gray-600">
                    Note: {activity.notes}
                  </p>
                )}
                {activity.recommendations && activity.recommendations.length > 0 && (
                  <div className="mt-3 space-y-1">
                    {activity.recommendations.map((rec, index) => (
                      <p key={index} className="text-sm text-blue-600">
                        • {rec}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <QuickLogModal 
        isOpen={isLogModalOpen} 
        onClose={() => setIsLogModalOpen(false)}
      />
    </div>
  );
}