import React, { useState } from 'react';
import { Lightbulb, ArrowRight, Brain, Heart, Apple, Moon, Coffee, Clock } from 'lucide-react';

interface Props {
  onExpand: () => void;
  isExpanded: boolean;
}

export default function DailyTipsWidget({ onExpand, isExpanded }: Props) {
  const [expandedTip, setExpandedTip] = useState<string | null>(null);

  const tips = [
    {
      id: 'tip-1',
      category: 'Nutrition',
      icon: Apple,
      tip: 'Try eating fermented foods today. Your gut bacteria diversity is lower than usual.',
      impact: 'May reduce bloating by 30%',
      priority: 'high',
      timeOfDay: 'Morning'
    },
    {
      id: 'tip-2',
      category: 'Sleep',
      icon: Moon,
      tip: 'Your sleep pattern shows disruption. Aim for bed by 10 PM tonight.',
      impact: 'Better sleep reduces inflammation by 25%',
      priority: 'medium',
      timeOfDay: 'Evening'
    }
  ];

  const handleTipClick = (e: React.MouseEvent, tipId: string) => {
    e.stopPropagation();
    setExpandedTip(expandedTip === tipId ? null : tipId);
  };

  const handleKeyPress = (event: React.KeyboardEvent, tipId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setExpandedTip(expandedTip === tipId ? null : tipId);
    }
  };

  return (
    <section 
      className="bg-white rounded-xl shadow-sm p-6 cursor-pointer transition-all duration-300 hover:shadow-md"
      aria-labelledby="daily-tips-title"
      onClick={onExpand}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-yellow-50 rounded-lg" aria-hidden="true">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
          </div>
          <div>
            <h2 id="daily-tips-title" className="text-lg font-semibold text-gray-900">
              Daily Health Tips
            </h2>
            <p className="text-sm text-gray-600">
              Personalized recommendations based on your data
            </p>
          </div>
        </div>
      </div>

      <div 
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        role="list"
        aria-label="Health tips"
      >
        {tips.map((tip) => (
          <article
            key={tip.id}
            className={`p-4 rounded-lg border-l-4 ${
              tip.priority === 'high'
                ? 'border-red-500 bg-red-50'
                : 'border-yellow-500 bg-yellow-50'
            }`}
            role="listitem"
            onClick={(e) => handleTipClick(e, tip.id)}
            onKeyPress={(e) => handleKeyPress(e, tip.id)}
            tabIndex={0}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${
                tip.priority === 'high'
                  ? 'bg-red-100'
                  : 'bg-yellow-100'
              }`} aria-hidden="true">
                <tip.icon className={`h-5 w-5 ${
                  tip.priority === 'high'
                    ? 'text-red-500'
                    : 'text-yellow-500'
                }`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${
                    tip.priority === 'high'
                      ? 'text-red-800'
                      : 'text-yellow-800'
                  }`}>
                    {tip.category}
                  </span>
                  <div className="flex items-center space-x-1 text-xs">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    <span>{tip.timeOfDay}</span>
                  </div>
                </div>
                <p className={`mt-1 text-sm ${
                  tip.priority === 'high'
                    ? 'text-red-700'
                    : 'text-yellow-700'
                }`}>
                  {tip.tip}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className={`text-xs ${
                    tip.priority === 'high'
                      ? 'text-red-600'
                      : 'text-yellow-600'
                  }`}>
                    {tip.impact}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onExpand();
                    }}
                    className={`flex items-center space-x-1 text-xs font-medium ${
                      tip.priority === 'high'
                        ? 'text-red-700 hover:text-red-800'
                        : 'text-yellow-700 hover:text-yellow-800'
                    }`}
                    aria-label={`View details for ${tip.category} tip`}
                  >
                    <span>View Details</span>
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}