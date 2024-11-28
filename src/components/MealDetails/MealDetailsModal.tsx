import React, { useRef } from 'react';
import { Activity, Clock, X, Coffee } from 'lucide-react';

interface InflammationInsight {
  type: 'positive' | 'negative' | 'neutral';
  text: string;
}

interface Ingredient {
  name: string;
  amount: string;
  calories: number;
  caffeine?: number;
  triggers?: boolean;
  inflammationImpact?: 'anti' | 'pro' | 'neutral';
  benefits?: string[];
}

interface Meal {
  id: string;
  name: string;
  time: string;
  ingredients: Ingredient[];
  notes?: string;
  totalCaffeine?: number;
}

interface Props {
  meal: Meal;
  isOpen: boolean;
  onClose: () => void;
}

const DAILY_CAFFEINE_LIMIT = 400; // mg, based on FDA recommendations
const IBS_CAFFEINE_WARNING = 200; // mg, lower threshold for IBS patients

export default function MealDetailsModal({ meal, isOpen, onClose }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getInflammationInsights = (ingredients: Ingredient[]): InflammationInsight[] => {
    const insights: InflammationInsight[] = [];
    
    const antiInflammatory = ingredients.filter(i => i.inflammationImpact === 'anti');
    const proInflammatory = ingredients.filter(i => i.inflammationImpact === 'pro');
    const totalCaffeine = ingredients.reduce((sum, i) => sum + (i.caffeine || 0), 0);
    
    if (antiInflammatory.length > 0) {
      insights.push({
        type: 'positive',
        text: `Contains ${antiInflammatory.length} anti-inflammatory ingredients: ${antiInflammatory.map(i => i.name).join(', ')}`
      });
    }
    
    if (proInflammatory.length > 0) {
      insights.push({
        type: 'negative',
        text: `Contains ${proInflammatory.length} pro-inflammatory ingredients to monitor: ${proInflammatory.map(i => i.name).join(', ')}`
      });
    }

    if (totalCaffeine > 0) {
      if (totalCaffeine > IBS_CAFFEINE_WARNING) {
        insights.push({
          type: 'negative',
          text: `High caffeine content (${totalCaffeine}mg) may trigger IBS symptoms`
        });
      } else {
        insights.push({
          type: 'neutral',
          text: `Moderate caffeine content (${totalCaffeine}mg) - monitor your response`
        });
      }
    }

    return insights;
  };

  const getTotalCaffeine = (ingredients: Ingredient[]): number => {
    return ingredients.reduce((sum, i) => sum + (i.caffeine || 0), 0);
  };

  const getCaffeineStatus = (amount: number): {
    color: string;
    text: string;
  } => {
    if (amount === 0) return { color: 'gray', text: 'No caffeine' };
    if (amount <= IBS_CAFFEINE_WARNING / 2) return { color: 'green', text: 'Low caffeine' };
    if (amount <= IBS_CAFFEINE_WARNING) return { color: 'yellow', text: 'Moderate caffeine' };
    return { color: 'red', text: 'High caffeine' };
  };

  const inflammationInsights = getInflammationInsights(meal.ingredients);
  const totalCaffeine = getTotalCaffeine(meal.ingredients);
  const caffeineStatus = getCaffeineStatus(totalCaffeine);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-25" onClick={handleBackdropClick}>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div ref={modalRef} className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">{meal.name}</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          {totalCaffeine > 0 && (
            <div className={`mb-6 p-4 rounded-lg bg-${caffeineStatus.color}-50 flex items-center justify-between`}>
              <div className="flex items-center space-x-3">
                <Coffee className={`h-5 w-5 text-${caffeineStatus.color}-500`} />
                <div>
                  <p className={`text-${caffeineStatus.color}-700 font-medium`}>{caffeineStatus.text}</p>
                  <p className={`text-${caffeineStatus.color}-600 text-sm`}>{totalCaffeine}mg caffeine</p>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Daily Limit: {totalCaffeine}/{DAILY_CAFFEINE_LIMIT}mg
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Ingredients</h3>
              <ul className="space-y-2">
                {meal.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center justify-between">
                    <span>• {ingredient.name} ({ingredient.amount}) - {ingredient.calories} cal</span>
                    {ingredient.caffeine && ingredient.caffeine > 0 && (
                      <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                        {ingredient.caffeine}mg caffeine
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            {meal.notes && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">Notes</h3>
                <p className="text-sm text-gray-600">{meal.notes}</p>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-gray-100">
            <div className="flex items-center space-x-2 mb-4">
              <Activity className="h-5 w-5 text-purple-500" />
              <h3 className="text-lg font-medium text-gray-900">Analysis</h3>
            </div>
            
            <div className="space-y-3">
              {inflammationInsights.map((insight, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    insight.type === 'positive'
                      ? 'bg-green-50'
                      : insight.type === 'negative'
                      ? 'bg-red-50'
                      : 'bg-gray-50'
                  }`}
                >
                  <p className={`text-sm ${
                    insight.type === 'positive'
                      ? 'text-green-700'
                      : insight.type === 'negative'
                      ? 'text-red-700'
                      : 'text-gray-700'
                  }`}>
                    {insight.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Recommendations</h4>
              <ul className="space-y-2">
                {totalCaffeine > IBS_CAFFEINE_WARNING && (
                  <li className="flex items-start space-x-2">
                    <div className="p-1 bg-blue-100 rounded-full mt-0.5">
                      <Coffee className="h-4 w-4 text-blue-700" />
                    </div>
                    <p className="text-sm text-blue-700">
                      Consider reducing caffeine intake or spreading it throughout the day to minimize IBS symptoms
                    </p>
                  </li>
                )}
                <li className="flex items-start space-x-2">
                  <div className="p-1 bg-blue-100 rounded-full mt-0.5">
                    <Clock className="h-4 w-4 text-blue-700" />
                  </div>
                  <p className="text-sm text-blue-700">
                    Consider eating this meal earlier in the day to optimize digestion and reduce inflammation
                  </p>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="p-1 bg-blue-100 rounded-full mt-0.5">
                    <Activity className="h-4 w-4 text-blue-700" />
                  </div>
                  <p className="text-sm text-blue-700">
                    Light exercise 30 minutes after this meal can help reduce inflammatory response
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}