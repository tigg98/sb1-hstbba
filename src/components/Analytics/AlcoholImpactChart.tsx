import React from 'react';
import { Wine, TrendingUp, AlertCircle } from 'lucide-react';

export default function AlcoholImpactChart() {
  const alcoholImpact = {
    weeklyConsumption: 3,
    inflammationScore: 65,
    riskLevel: 'moderate',
    trends: [
      {
        day: 'Mon',
        drinks: 1,
        inflammation: 45
      },
      {
        day: 'Wed',
        drinks: 2,
        inflammation: 72
      },
      {
        day: 'Sat',
        drinks: 1,
        inflammation: 58
      }
    ],
    insights: [
      {
        type: 'warning',
        text: 'Inflammation increased by 35% within 24 hours of alcohol consumption'
      },
      {
        type: 'info',
        text: 'Drinking with meals showed 20% less inflammation impact'
      }
    ]
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Alcohol Impact</h2>
          <p className="text-sm text-gray-600">Inflammation correlation analysis</p>
        </div>
        <div className="p-2 bg-red-50 rounded-lg">
          <Wine className="h-5 w-5 text-red-500" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Weekly Consumption</p>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-gray-900">
              {alcoholImpact.weeklyConsumption}
            </span>
            <span className="text-sm text-gray-600">drinks</span>
          </div>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Inflammation Score</p>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-gray-900">
              {alcoholImpact.inflammationScore}
            </span>
            <span className="text-sm text-gray-600">/ 100</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {alcoholImpact.insights.map((insight, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              insight.type === 'warning' ? 'bg-red-50' : 'bg-blue-50'
            }`}
          >
            <div className="flex items-start space-x-3">
              {insight.type === 'warning' ? (
                <AlertCircle className="h-5 w-5 text-red-500" />
              ) : (
                <TrendingUp className="h-5 w-5 text-blue-500" />
              )}
              <p className={`text-sm ${
                insight.type === 'warning' ? 'text-red-700' : 'text-blue-700'
              }`}>
                {insight.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-900 mb-4">Recommendations</h3>
        <ul className="space-y-3">
          <li className="flex items-start space-x-3">
            <div className="p-1 bg-gray-100 rounded-full">
              <Wine className="h-4 w-4 text-gray-600" />
            </div>
            <p className="text-sm text-gray-600">
              Consider limiting alcohol intake to reduce inflammation triggers
            </p>
          </li>
          <li className="flex items-start space-x-3">
            <div className="p-1 bg-gray-100 rounded-full">
              <AlertCircle className="h-4 w-4 text-gray-600" />
            </div>
            <p className="text-sm text-gray-600">
              Always consume alcohol with food to minimize gut irritation
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}