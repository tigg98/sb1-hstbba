import React from 'react';
import { X, Move, Eye, EyeOff } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  activeWidgets: string[];
  onUpdateWidgets: (widgets: string[]) => void;
}

export default function WidgetManagerModal({ isOpen, onClose, activeWidgets, onUpdateWidgets }: Props) {
  const allWidgets = [
    { id: 'dailyTips', name: 'Daily Tips', description: 'Personalized health recommendations' },
    { id: 'dailySummary', name: 'Daily Summary', description: 'Overview of your daily metrics' },
    { id: 'activityLog', name: 'Activity Log', description: 'Recent activities and logs' },
    { id: 'exercise', name: 'Exercise', description: 'Exercise tracking and insights' },
    { id: 'energyChart', name: 'Energy Levels', description: 'Daily energy level tracking' },
    { id: 'waterIntake', name: 'Water Intake', description: 'Water consumption tracking' },
    { id: 'skinHealth', name: 'Skin Health', description: 'Skin condition monitoring' },
    { id: 'gutSkinCorrelation', name: 'Gut-Skin Connection', description: 'Correlation analysis' }
  ];

  const toggleWidget = (widgetId: string) => {
    if (activeWidgets.includes(widgetId)) {
      onUpdateWidgets(activeWidgets.filter(id => id !== widgetId));
    } else {
      onUpdateWidgets([...activeWidgets, widgetId]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-25">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Customize Dashboard</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            {allWidgets.map((widget) => (
              <div
                key={widget.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <Move className="h-5 w-5 text-gray-400 cursor-move" />
                  <div>
                    <h3 className="font-medium text-gray-900">{widget.name}</h3>
                    <p className="text-sm text-gray-600">{widget.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => toggleWidget(widget.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    activeWidgets.includes(widget.id)
                      ? 'bg-primary-50 text-primary-600 hover:bg-primary-100'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {activeWidgets.includes(widget.id) ? (
                    <Eye className="h-5 w-5" />
                  ) : (
                    <EyeOff className="h-5 w-5" />
                  )}
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-end p-6 border-t border-gray-100">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}