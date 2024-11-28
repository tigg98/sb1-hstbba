import React from 'react';
import { 
  Leaf, 
  Circle, 
  AlertCircle, 
  TrendingUp, 
  Apple,
  Info
} from 'lucide-react';

interface NutrientProgress {
  name: string;
  current: number;
  target: number;
  unit: string;
  category: 'vitamin' | 'mineral' | 'macro';
  importance: 'essential' | 'important' | 'optional';
}

export default function NutrientTracker() {
  const nutrients: NutrientProgress[] = [
    { 
      name: 'Protein', 
      current: 45, 
      target: 56, 
      unit: 'g',
      category: 'macro',
      importance: 'essential'
    },
    { 
      name: 'Fiber', 
      current: 18, 
      target: 25, 
      unit: 'g',
      category: 'macro',
      importance: 'essential'
    },
    { 
      name: 'Vitamin D', 
      current: 400, 
      target: 600, 
      unit: 'IU',
      category: 'vitamin',
      importance: 'essential'
    },
    { 
      name: 'Iron', 
      current: 12, 
      target: 18, 
      unit: 'mg',
      category: 'mineral',
      importance: 'essential'
    },
    { 
      name: 'Calcium', 
      current: 800, 
      target: 1000, 
      unit: 'mg',
      category: 'mineral',
      importance: 'essential'
    }
  ];

  const getProgressColor = (current: number, target: number, importance: string) => {
    const percentage = (current / target) * 100;
    if (importance === 'essential') {
      if (percentage < 50) return 'bg-red-500';
      if (percentage < 80) return 'bg-yellow-500';
      return 'bg-green-500';
    }
    if (percentage < 50) return 'bg-yellow-500';
    return 'bg-blue-500';
  };

  const getDeficientNutrients = () => {
    return nutrients.filter(n => (n.current / n.target) < 0.8 && n.importance === 'essential');
  };

  const deficientNutrients = getDeficientNutrients();

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Nutrient Tracking</h2>
          <p className="text-sm text-gray-600">Daily essential nutrients progress</p>
        </div>
        <Leaf className="h-5 w-5 text-green-500" />
      </div>

      {deficientNutrients.length > 0 && (
        <div className="mb-6 p-4 bg-yellow-50 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-yellow-800">Nutrient Deficiency Alert</h3>
              <p className="text-sm text-yellow-700 mt-1">
                You're not meeting the recommended intake for:
                {deficientNutrients.map(n => n.name).join(', ')}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {nutrients.map((nutrient, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Circle className={`h-2 w-2 ${
                  nutrient.category === 'vitamin' ? 'text-purple-500' :
                  nutrient.category === 'mineral' ? 'text-blue-500' :
                  'text-green-500'
                }`} />
                <span className="text-sm font-medium text-gray-900">{nutrient.name}</span>
              </div>
              <div className="text-sm text-gray-600">
                {nutrient.current}/{nutrient.target} {nutrient.unit}
              </div>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${getProgressColor(nutrient.current, nutrient.target, nutrient.importance)} transition-all`}
                style={{ width: `${Math.min((nutrient.current / nutrient.target) * 100, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start space-x-3">
          <Info className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-900">Recommendations</h4>
            <ul className="mt-1 space-y-1">
              <li className="text-sm text-blue-700">
                • Add leafy greens to increase iron intake
              </li>
              <li className="text-sm text-blue-700">
                • Consider vitamin D supplementation
              </li>
              <li className="text-sm text-blue-700">
                • Include calcium-rich foods in your next meal
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}