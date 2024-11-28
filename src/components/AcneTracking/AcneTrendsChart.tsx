import React from 'react';
import { Calendar, TrendingUp, AlertCircle } from 'lucide-react';

export default function AcneTrendsChart() {
  const monthlyData = [
    { week: 'Week 1', severity: 3, triggers: ['Dairy', 'Stress'] },
    { week: 'Week 2', severity: 2, triggers: ['Sugar'] },
    { week: 'Week 3', severity: 1, triggers: [] },
    { week: 'Week 4', severity: 1, triggers: ['Poor Sleep'] },
  ];

  const getBarHeight = (severity: number) => {
    return `${(severity / 3) * 100}%`;
  };

  const getSeverityColor = (severity: number) => {
    switch (severity) {
      case 1: return 'bg-green-400';
      case 2: return 'bg-yellow-400';
      case 3: return 'bg-red-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Monthly Trends</h2>
          <p className="text-sm text-gray-600">Acne severity and triggers</p>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-600">March 2024</span>
        </div>
      </div>

      <div className="h-64 flex items-end justify-between space-x-6 mb-6">
        {monthlyData.map((data, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div className="w-full h-48 bg-gray-100 rounded-lg relative">
              <div
                className={`absolute bottom-0 left-0 right-0 rounded-lg transition-all duration-500 ${getSeverityColor(data.severity)}`}
                style={{ height: getBarHeight(data.severity) }}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  Severity: {data.severity}
                </div>
              </div>
            </div>
            <span className="mt-2 text-sm text-gray-600">{data.week}</span>
            {data.triggers.length > 0 && (
              <div className="mt-1 flex flex-wrap gap-1">
                {data.triggers.map((trigger, i) => (
                  <span
                    key={i}
                    className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full"
                  >
                    {trigger}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="border-t border-gray-100 pt-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-gray-600">Overall trend: Improving</span>
          </div>
          <button className="text-primary-600 font-medium hover:text-primary-700">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}