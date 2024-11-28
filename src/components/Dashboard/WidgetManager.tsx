import React from 'react';
import { Settings, X, GripVertical } from 'lucide-react';

interface Widget {
  id: string;
  name: string;
  description: string;
  category: 'health' | 'exercise' | 'nutrition' | 'tracking' | 'insights';
  enabled: boolean;
  size: 'small' | 'medium' | 'large' | 'full';
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  widgets: Widget[];
  onWidgetToggle: (widgetId: string) => void;
  onWidgetReorder: (widgets: Widget[]) => void;
}

export default function WidgetManager({ isOpen, onClose, widgets, onWidgetToggle, onWidgetReorder }: Props) {
  const allWidgets: Widget[] = [
    // Health Metrics
    {
      id: 'dailyTips',
      name: 'Daily Health Tips',
      description: 'Personalized health recommendations based on your data',
      category: 'health',
      enabled: true,
      size: 'full'
    },
    {
      id: 'dailySummary',
      name: 'Daily Summary',
      description: 'Overview of your daily health metrics',
      category: 'health',
      enabled: true,
      size: 'full'
    },
    {
      id: 'symptomTimeline',
      name: 'Symptom Timeline',
      description: "Track today's symptoms and their triggers",
      category: 'health',
      enabled: true,
      size: 'large'
    },

    // Exercise
    {
      id: 'exercise',
      name: 'Exercise Tracking',
      description: "Monitor today's activities and workouts",
      category: 'exercise',
      enabled: true,
      size: 'large'
    },
    {
      id: 'energyChart',
      name: 'Energy Levels',
      description: 'Track daily energy fluctuations',
      category: 'exercise',
      enabled: true,
      size: 'medium'
    },

    // Nutrition
    {
      id: 'nutrientTracker',
      name: 'Nutrient Tracking',
      description: 'Monitor essential daily nutrients',
      category: 'nutrition',
      enabled: true,
      size: 'medium'
    },
    {
      id: 'waterIntake',
      name: 'Water Intake',
      description: 'Track daily hydration levels',
      category: 'nutrition',
      enabled: true,
      size: 'medium'
    },
    {
      id: 'activityLog',
      name: 'Activity Log',
      description: 'Recent meals and activities',
      category: 'nutrition',
      enabled: true,
      size: 'large'
    },

    // Tracking
    {
      id: 'skinHealth',
      name: 'Skin Health',
      description: 'Monitor skin conditions and triggers',
      category: 'tracking',
      enabled: true,
      size: 'medium'
    },
    {
      id: 'gutSkinCorrelation',
      name: 'Gut-Skin Connection',
      description: 'Analyze gut-skin health correlations',
      category: 'tracking',
      enabled: true,
      size: 'medium'
    },
    {
      id: 'sleepQuality',
      name: 'Sleep Quality',
      description: "Track last night's sleep metrics",
      category: 'tracking',
      enabled: true,
      size: 'medium'
    },
    {
      id: 'stressLevels',
      name: 'Stress Levels',
      description: 'Monitor stress and its impacts',
      category: 'tracking',
      enabled: true,
      size: 'medium'
    },

    // Insights
    {
      id: 'medicationSchedule',
      name: 'Medication Schedule',
      description: "Today's medication reminders",
      category: 'insights',
      enabled: true,
      size: 'medium'
    },
    {
      id: 'moodTracker',
      name: 'Mood Tracker',
      description: 'Track mood changes and correlations',
      category: 'insights',
      enabled: true,
      size: 'medium'
    }
  ];

  const categories = [
    { id: 'health', name: 'Health Metrics' },
    { id: 'exercise', name: 'Exercise' },
    { id: 'nutrition', name: 'Nutrition' },
    { id: 'tracking', name: 'Tracking' },
    { id: 'insights', name: 'Insights' }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-25">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-4xl">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-gray-500" />
              <h2 className="text-xl font-semibold text-gray-900">Customize Dashboard</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          <div className="p-6">
            {categories.map(category => (
              <div key={category.id} className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">{category.name}</h3>
                <div className="space-y-3">
                  {allWidgets
                    .filter(widget => widget.category === category.id)
                    .map(widget => (
                      <div
                        key={widget.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
                          <div>
                            <h4 className="font-medium text-gray-900">{widget.name}</h4>
                            <p className="text-sm text-gray-600">{widget.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <select
                            value={widget.size}
                            onChange={(e) => {
                              const updatedWidgets = widgets.map(w => 
                                w.id === widget.id ? { ...w, size: e.target.value as Widget['size'] } : w
                              );
                              onWidgetReorder(updatedWidgets);
                            }}
                            className="text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500"
                          >
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                            <option value="full">Full Width</option>
                          </select>
                          <div className="relative inline-block w-12 h-6">
                            <input
                              type="checkbox"
                              checked={widget.enabled}
                              onChange={() => onWidgetToggle(widget.id)}
                              className="switch-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                            />
                            <label
                              className={`switch-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                                widget.enabled ? 'bg-primary-500' : 'bg-gray-300'
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end p-6 border-t border-gray-100">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Save Layout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}