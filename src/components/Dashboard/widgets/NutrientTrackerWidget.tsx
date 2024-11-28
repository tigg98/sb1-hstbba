import React, { useState } from 'react';
import { Apple, Circle, AlertCircle, Info } from 'lucide-react';

interface NutrientProgress {
  id: string;
  name: string;
  current: number;
  target: number;
  unit: string;
  category: 'vitamin' | 'mineral' | 'macro';
  importance: 'essential' | 'important' | 'optional';
}

export default function NutrientTrackerWidget() {
  const [expandedNutrient, setExpandedNutrient] = useState<string | null>(null);

  const nutrients: NutrientProgress[] = [
    { 
      id: 'n1',
      name: 'Protein', 
      current: 45, 
      target: 56, 
      unit: 'g',
      category: 'macro',
      importance: 'essential'
    },
    { 
      id: 'n2',
      name: 'Fiber', 
      current: 18, 
      target: 25, 
      unit: 'g',
      category: 'macro',
      importance: 'essential'
    },
    { 
      id: 'n3',
      name: 'Vitamin D', 
      current: 400, 
      target: 600, 
      unit: 'IU',
      category: 'vitamin',
      importance: 'essential'
    }
  ];

  const handleNutrientClick = (id: string) => {
    setExpandedNutrient(expandedNutrient === id ? null : id);
  };

  const handleKeyPress = (event: React.KeyboardEvent, id: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleNutrientClick(id);
    }
  };

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
    <section 
      className="bg-white rounded-xl shadow-sm p-4 transition-all duration-300 hover:shadow-md"
      aria-labelledby="nutrient-tracker-title"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 id="nutrient-tracker-title" className="text-lg font-semibold text-gray-900">
            Nutrient Tracking
          </h2>
          <p className="text-sm text-gray-600">Daily essentials</p>
        </div>
        <div 
          className="p-2 bg-green-50 rounded-lg transition-all duration-300 hover:bg-green-100"
          aria-hidden="true"
        >
          <Apple className="h-5 w-5 text-green-500" />
        </div>
      </div>

      {deficientNutrients.length > 0 && (
        <div 
          className="mb-4 p-3 bg-yellow-50 rounded-lg transition-all duration-300"
          role="alert"
        >
          <div className="flex items-start space-x-2">
            <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-xs text-yellow-800">
                Low in: {deficientNutrients.map(n => n.name).join(', ')}
              </p>
            </div>
          </div>
        </div>
      )}

      <div 
        className="space-y-3"
        role="list"
        aria-label="Nutrient progress"
      >
        {nutrients.map((nutrient) => (
          <div 
            key={nutrient.id}
            className="space-y-1"
            role="listitem"
          >
            <button
              onClick={() => handleNutrientClick(nutrient.id)}
              onKeyPress={(e) => handleKeyPress(e, nutrient.id)}
              className="w-full text-left focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg p-1 -m-1"
              aria-expanded={expandedNutrient === nutrient.id}
              aria-controls={`nutrient-details-${nutrient.id}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Circle className={`h-2 w-2 ${
                    nutrient.category === 'vitamin' ? 'text-purple-500' :
                    nutrient.category === 'mineral' ? 'text-blue-500' :
                    'text-green-500'
                  }`} aria-hidden="true" />
                  <span className="text-sm font-medium text-gray-900">{nutrient.name}</span>
                </div>
                <div 
                  className="text-xs text-gray-600"
                  aria-label={`${nutrient.current} out of ${nutrient.target} ${nutrient.unit}`}
                >
                  {nutrient.current}/{nutrient.target} {nutrient.unit}
                </div>
              </div>
            </button>

            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${getProgressColor(nutrient.current, nutrient.target, nutrient.importance)} transition-all duration-500 ease-in-out`}
                style={{ width: `${Math.min((nutrient.current / nutrient.target) * 100, 100)}%` }}
                role="progressbar"
                aria-valuenow={(nutrient.current / nutrient.target) * 100}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>

            {expandedNutrient === nutrient.id && (
              <div 
                id={`nutrient-details-${nutrient.id}`}
                className="mt-2 p-2 bg-gray-50 rounded-lg text-sm text-gray-600 transition-all duration-300"
              >
                <p>Recommended daily intake: {nutrient.target} {nutrient.unit}</p>
                <p>Category: {nutrient.category}</p>
                <p>Priority: {nutrient.importance}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div 
        className="mt-4 p-3 bg-blue-50 rounded-lg transition-all duration-300 hover:bg-blue-100"
        role="complementary"
      >
        <div className="flex items-start space-x-2">
          <Info className="h-4 w-4 text-blue-500 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-xs text-blue-900">Recommendations</p>
            <ul className="mt-1 space-y-1 text-xs text-blue-700">
              <li>• Add leafy greens for iron</li>
              <li>• Consider vitamin D supplementation</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}