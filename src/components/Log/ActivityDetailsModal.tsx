import React from 'react';
import { X, Activity, Clock, Heart, Flame, AlertCircle } from 'lucide-react';
import type { Activity as ActivityType } from '../../types/activity';
import { getActivityIcon } from '../../utils/icons';

interface Props {
  activity: ActivityType | null;
  onClose: () => void;
}

export default function ActivityDetailsModal({ activity, onClose }: Props) {
  if (!activity) return null;

  const Icon = getActivityIcon(activity.type);
  const color = activity.type === 'meals' ? 'emerald' : 
                activity.type === 'exercise' ? 'blue' :
                activity.type === 'supplements' ? 'purple' :
                activity.type === 'water' ? 'blue' :
                activity.type === 'skin' ? 'pink' : 'red';

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-25"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className={`p-2 bg-${color}-100 rounded-lg`}>
                <Icon className={`h-5 w-5 text-${color}-600`} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{activity.title}</h2>
                <time className="text-sm text-gray-600">{activity.time}</time>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Status */}
            {activity.status && (
              <div className={`p-4 rounded-lg ${
                activity.status.type === 'success' ? 'bg-green-50' :
                activity.status.type === 'warning' ? 'bg-yellow-50' :
                activity.status.type === 'alert' ? 'bg-red-50' :
                'bg-blue-50'
              }`}>
                <div className="flex items-start space-x-3">
                  <AlertCircle className={`h-5 w-5 ${
                    activity.status.type === 'success' ? 'text-green-500' :
                    activity.status.type === 'warning' ? 'text-yellow-500' :
                    activity.status.type === 'alert' ? 'text-red-500' :
                    'text-blue-500'
                  }`} />
                  <div>
                    <h3 className="text-sm font-medium">{activity.status.label}</h3>
                    <p className="text-sm mt-1">{activity.status.message}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Details */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Details</h3>
                <p className="text-sm text-gray-600">{activity.details}</p>
              </div>

              {/* Metrics */}
              {activity.metrics && (
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Metrics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(activity.metrics).map(([key, value]) => (
                      <div key={key} className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">{key}</p>
                        <p className="text-sm font-medium text-gray-900">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Information */}
              {activity.additionalInfo && (
                <div className="space-y-4">
                  {activity.additionalInfo.notes && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Notes</h3>
                      <p className="text-sm text-gray-600">{activity.additionalInfo.notes}</p>
                    </div>
                  )}

                  {activity.additionalInfo.recommendations && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Recommendations</h3>
                      <ul className="space-y-2">
                        {activity.additionalInfo.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary-500 mt-1.5" />
                            <span className="text-sm text-gray-600">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end p-6 border-t border-gray-100">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}