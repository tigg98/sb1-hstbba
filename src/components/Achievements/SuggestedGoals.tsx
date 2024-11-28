import React from 'react';
import { Target, TrendingUp, Plus } from 'lucide-react';

export default function SuggestedGoals() {
  const suggestions = [
    {
      title: 'Increase Daily Steps',
      description: 'Aim for 8,000 steps daily to improve gut motility',
      difficulty: 'easy',
      category: 'exercise',
      impact: 'high'
    },
    {
      title: 'Meal Timing Consistency',
      description: 'Eat meals within the same 2-hour window each day',
      difficulty: 'medium',
      category: 'nutrition',
      impact: 'high'
    },
    {
      title: 'Stress Management',
      description: 'Practice 10 minutes of mindfulness daily',
      difficulty: 'easy',
      category: 'wellness',
      impact: 'medium'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'hard':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Suggested Goals</h2>
          <p className="text-sm text-gray-600">Based on your progress</p>
        </div>
      </div>

      <div className="space-y-4">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-primary-50 rounded-lg">
                <Target className="h-5 w-5 text-primary-500" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">{suggestion.title}</h3>
                  <button className="p-1 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-1">{suggestion.description}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className={`text-xs px-2 py-1 rounded-full capitalize ${getDifficultyColor(suggestion.difficulty)}`}>
                    {suggestion.difficulty}
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full capitalize">
                    {suggestion.impact} impact
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-900 mb-2">Goal Setting Tips</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li>• Start with achievable goals to build momentum</li>
          <li>• Focus on consistency over perfection</li>
          <li>• Track your progress daily for better results</li>
        </ul>
      </div>
    </div>
  );
}