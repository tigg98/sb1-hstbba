import React from 'react';
import { AlertCircle, Calendar, Coffee, Utensils } from 'lucide-react';

export default function AcneTriggerAnalysis() {
  const triggers = [
    {
      category: 'Diet',
      items: [
        { name: 'Dairy', impact: 85, frequency: '3-4x week' },
        { name: 'Sugar', impact: 75, frequency: '2-3x week' },
        { name: 'Processed Foods', impact: 70, frequency: '2x week' }
      ]
    },
    {
      category: 'Lifestyle',
      items: [
        { name: 'Poor Sleep', impact: 80, frequency: '2-3x week' },
        { name: 'High Stress', impact: 78, frequency: '3-4x week' },
        { name: 'Dehydration', impact: 65, frequency: '1-2x week' }
      ]
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Trigger Analysis</h2>
          <p className="text-sm text-gray-600">Common factors affecting skin health</p>
        </div>
        <Calendar className="h-5 w-5 text-gray-500" />
      </div>

      <div className="space-y-6">
        {triggers.map((category, index) => (
          <div key={index}>
            <h3 className="text-sm font-medium text-gray-900 mb-4">{category.category}</h3>
            <div className="space-y-4">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {category.category === 'Diet' ? (
                        <Utensils className="h-4 w-4 text-orange-500" />
                      ) : (
                        <Coffee className="h-4 w-4 text-blue-500" />
                      )}
                      <span className="font-medium text-gray-900">{item.name}</span>
                    </div>
                    <span className="text-sm text-gray-600">{item.frequency}</span>
                  </div>

                  <div className="relative pt-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-xs font-semibold inline-block text-orange-600">
                          Impact Score: {item.impact}%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                      <div
                        style={{ width: `${item.impact}%` }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-900">Recommendation</h4>
            <p className="text-sm text-blue-700 mt-1">
              Consider keeping a detailed food and lifestyle journal to better track these triggers and their impact on your skin health.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}