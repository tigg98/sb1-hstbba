import React from 'react';
import { 
  Utensils, 
  TrendingUp, 
  AlertCircle, 
  Apple, 
  Oil,
  Target,
  Scale,
  User,
  Activity,
  Brain,
  Flame
} from 'lucide-react';

interface NutrientTarget {
  name: string;
  current: number;
  target: number;
  unit: string;
  category: string;
}

export default function DietAnalytics() {
  const dietData = {
    overview: {
      score: 78,
      change: 5,
      trend: 'improving'
    },
    macros: {
      protein: { target: 25, actual: 22 },
      carbs: { target: 50, actual: 48 },
      fat: { target: 25, actual: 30 }
    },
    nutrientTargets: [
      { name: 'Protein', current: 65, target: 80, unit: 'g', category: 'macro' },
      { name: 'Fiber', current: 22, target: 30, unit: 'g', category: 'macro' },
      { name: 'Vitamin D', current: 600, target: 800, unit: 'IU', category: 'vitamin' },
      { name: 'Iron', current: 14, target: 18, unit: 'mg', category: 'mineral' },
      { name: 'Calcium', current: 800, target: 1000, unit: 'mg', category: 'mineral' },
      { name: 'Omega-3', current: 1.2, target: 2.0, unit: 'g', category: 'fat' }
    ],
    inflammationData: {
      score: 65,
      trend: 'improving',
      triggers: [
        { name: 'Seed Oils', impact: 85, frequency: 'high', status: 'reducing' },
        { name: 'Processed Foods', impact: 75, frequency: 'moderate', status: 'stable' },
        { name: 'Dairy', impact: 70, frequency: 'low', status: 'improving' }
      ],
      antiInflammatory: [
        { name: 'Omega-3', level: 'optimal', source: 'Fish oil supplements' },
        { name: 'Polyphenols', level: 'moderate', source: 'Berries, green tea' },
        { name: 'Fiber', level: 'low', source: 'Needs improvement' }
      ],
      recommendations: [
        'Replace vegetable oils with olive oil or avocado oil',
        'Increase fatty fish intake to 2-3 times per week',
        'Add more colorful vegetables and berries',
        'Consider reducing dairy consumption'
      ]
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Diet Analysis</h2>
          <p className="text-sm text-gray-600">Nutrition and gut health impact</p>
        </div>
        <div className="p-2 bg-green-50 rounded-lg">
          <Utensils className="h-5 w-5 text-green-500" />
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">Diet Score</p>
              <p className="text-2xl font-bold text-green-700">{dietData.overview.score}</p>
            </div>
            <Apple className="h-8 w-8 text-green-500 opacity-75" />
          </div>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600">Monthly Change</p>
              <p className="text-2xl font-bold text-blue-700">+{dietData.overview.change}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-500 opacity-75" />
          </div>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600">Gut Health</p>
              <p className="text-2xl font-bold text-purple-700">Good</p>
            </div>
            <AlertCircle className="h-8 w-8 text-purple-500 opacity-75" />
          </div>
        </div>
      </div>

      {/* Nutrient Targets */}
      <div className="space-y-4 mb-6">
        <h3 className="text-sm font-medium text-gray-900">Daily Nutrient Targets</h3>
        {dietData.nutrientTargets.map((nutrient, index) => (
          <div key={index} className="flex items-center">
            <span className="w-32 text-sm text-gray-600">{nutrient.name}</span>
            <div className="flex-1 ml-4">
              <div className="h-2 bg-gray-100 rounded-full">
                <div
                  className={`h-full rounded-full ${
                    (nutrient.current / nutrient.target) >= 0.9 ? 'bg-green-500' :
                    (nutrient.current / nutrient.target) >= 0.7 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${(nutrient.current / nutrient.target) * 100}%` }}
                />
              </div>
            </div>
            <span className="ml-4 text-sm text-gray-600">
              {nutrient.current}/{nutrient.target} {nutrient.unit}
            </span>
          </div>
        ))}
      </div>

      {/* Inflammation Analysis */}
      <div className="mt-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Inflammation Analysis</h3>
          <div className="p-2 bg-red-50 rounded-lg">
            <Flame className="h-5 w-5 text-red-500" />
          </div>
        </div>

        {/* Inflammation Score */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-red-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600">Inflammation Score</p>
                <p className="text-2xl font-bold text-red-700">{dietData.inflammationData.score}/100</p>
                <p className="text-sm text-red-600 capitalize">{dietData.inflammationData.trend}</p>
              </div>
              <Flame className="h-8 w-8 text-red-500 opacity-75" />
            </div>
          </div>

          {/* Trigger Analysis */}
          <div className="md:col-span-2 p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Top Inflammatory Triggers</h4>
            <div className="space-y-3">
              {dietData.inflammationData.triggers.map((trigger, index) => (
                <div key={index} className="flex items-center">
                  <span className="w-32 text-sm text-gray-600">{trigger.name}</span>
                  <div className="flex-1 ml-4">
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div
                        className={`h-full rounded-full ${
                          trigger.impact > 80 ? 'bg-red-500' :
                          trigger.impact > 70 ? 'bg-orange-500' :
                          'bg-yellow-500'
                        }`}
                        style={{ width: `${trigger.impact}%` }}
                      />
                    </div>
                  </div>
                  <span className={`ml-4 text-xs px-2 py-1 rounded-full capitalize ${
                    trigger.status === 'improving' ? 'bg-green-100 text-green-700' :
                    trigger.status === 'stable' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {trigger.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Anti-inflammatory Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dietData.inflammationData.antiInflammatory.map((item, index) => (
            <div key={index} className="p-4 bg-green-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-2">{item.name}</h4>
              <div className="flex items-center justify-between">
                <span className={`text-sm px-2 py-1 rounded-full capitalize ${
                  item.level === 'optimal' ? 'bg-green-100 text-green-700' :
                  item.level === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {item.level}
                </span>
                <span className="text-sm text-gray-600">{item.source}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-900">Anti-inflammatory Recommendations</h4>
              <ul className="mt-2 space-y-2">
                {dietData.inflammationData.recommendations.map((rec, index) => (
                  <li key={index} className="text-sm text-blue-700">• {rec}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}