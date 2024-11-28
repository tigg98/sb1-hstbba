import React, { useState } from 'react';
import { Brain, TrendingDown, Heart, AlertCircle, Info } from 'lucide-react';

interface Props {
  onExpand: () => void;
  isExpanded: boolean;
}

export default function StressLevelsWidget({ onExpand, isExpanded }: Props) {
  const [expandedTrigger, setExpandedTrigger] = useState<string | null>(null);

  const stressData = {
    level: 38,
    change: -12,
    trend: 'decreasing',
    heartRate: {
      current: 72,
      baseline: 68
    },
    triggers: [
      { 
        id: 't1',
        name: 'Work',
        impact: 'high',
        details: 'Consider stress management techniques during work hours'
      },
      { 
        id: 't2',
        name: 'Sleep',
        impact: 'low',
        details: 'Sleep quality has improved, maintaining good sleep hygiene'
      }
    ],
    recommendation: 'Try a 5-minute breathing exercise to reduce current stress levels'
  };

  const handleTriggerClick = (e: React.MouseEvent, triggerId: string) => {
    e.stopPropagation();
    setExpandedTrigger(expandedTrigger === triggerId ? null : triggerId);
  };

  const handleKeyPress = (event: React.KeyboardEvent, triggerId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setExpandedTrigger(expandedTrigger === triggerId ? null : triggerId);
    }
  };

  return (
    <section 
      className="bg-white rounded-xl shadow-sm p-4 transition-all duration-300 hover:shadow-md cursor-pointer"
      aria-labelledby="stress-levels-title"
      onClick={onExpand}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 id="stress-levels-title" className="text-lg font-semibold text-gray-900">
            Stress Levels
          </h2>
          <p className="text-sm text-gray-600">Current status</p>
        </div>
        <div 
          className="p-2 bg-orange-50 rounded-lg transition-all duration-300 hover:bg-orange-100"
          aria-hidden="true"
        >
          <Brain className="h-5 w-5 text-orange-500" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4" role="list" aria-label="Stress metrics">
        <div 
          className="p-3 bg-orange-50 rounded-lg transition-all duration-300 hover:bg-orange-100"
          role="listitem"
        >
          <div className="flex items-center justify-between mb-1">
            <Brain className="h-4 w-4 text-orange-500" aria-hidden="true" />
            <TrendingDown className="h-4 w-4 text-green-500" aria-hidden="true" />
          </div>
          <div 
            className="text-xl font-bold text-gray-900"
            aria-label={`Stress level: ${stressData.level}`}
          >
            {stressData.level}
          </div>
          <p className="text-xs text-gray-600">
            <span className="sr-only">Stress Score - </span>
            {stressData.change < 0 ? 'Decreased by' : 'Increased by'} {Math.abs(stressData.change)}%
          </p>
        </div>

        <div 
          className="p-3 bg-red-50 rounded-lg transition-all duration-300 hover:bg-red-100"
          role="listitem"
        >
          <div className="flex items-center justify-between mb-1">
            <Heart className="h-4 w-4 text-red-500" aria-hidden="true" />
            <span 
              className="text-xs text-gray-600"
              aria-label={`${stressData.heartRate.current - stressData.heartRate.baseline} BPM above baseline`}
            >
              +{stressData.heartRate.current - stressData.heartRate.baseline}
            </span>
          </div>
          <div 
            className="text-xl font-bold text-gray-900"
            aria-label={`Heart rate: ${stressData.heartRate.current} beats per minute`}
          >
            {stressData.heartRate.current}
          </div>
          <p className="text-xs text-gray-600">Heart Rate</p>
        </div>
      </div>

      <div 
        className="space-y-2"
        role="list"
        aria-label="Stress triggers"
      >
        {stressData.triggers.map((trigger) => (
          <div 
            key={trigger.id}
            className="transition-all duration-300"
            role="listitem"
          >
            <button
              onClick={(e) => handleTriggerClick(e, trigger.id)}
              onKeyPress={(e) => handleKeyPress(e, trigger.id)}
              className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-all duration-300"
              aria-expanded={expandedTrigger === trigger.id}
            >
              <span className="text-sm text-gray-600">{trigger.name}</span>
              <span 
                className={`px-1.5 py-0.5 rounded-full text-xs ${
                  trigger.impact === 'high'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                {trigger.impact}
              </span>
            </button>

            {expandedTrigger === trigger.id && (
              <div className="mt-2 ml-2 p-2 text-xs text-gray-600 bg-gray-50 rounded-lg">
                {trigger.details}
              </div>
            )}
          </div>
        ))}
      </div>

      {stressData.recommendation && (
        <div 
          className="mt-4 p-3 bg-blue-50 rounded-lg transition-all duration-300 hover:bg-blue-100"
          role="alert"
        >
          <div className="flex items-start space-x-2">
            <Info className="h-4 w-4 text-blue-500 mt-0.5" aria-hidden="true" />
            <p className="text-xs text-blue-700">
              {stressData.recommendation}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}