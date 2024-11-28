import React, { useState } from 'react';
import { Brain, TrendingUp, Plus, AlertCircle, Clock } from 'lucide-react';

interface Props {
  onLogMood: () => void;
  onExpand: () => void;
  isExpanded: boolean;
}

export default function MoodTrackerWidget({ onLogMood, onExpand, isExpanded }: Props) {
  const [expandedFactor, setExpandedFactor] = useState<string | null>(null);

  const moodData = {
    current: 'Good',
    score: 75,
    trend: 'improving',
    change: '+15%',
    factors: [
      { id: 'f1', name: 'Sleep', impact: 'positive', details: 'Good sleep quality last night' },
      { id: 'f2', name: 'Stress', impact: 'negative', details: 'Higher work stress today' },
      { id: 'f3', name: 'Exercise', impact: 'positive', details: 'Morning workout completed' }
    ],
    lastUpdated: '2 hours ago'
  };

  const handleFactorClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setExpandedFactor(expandedFactor === id ? null : id);
  };

  const handleKeyPress = (event: React.KeyboardEvent, id: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setExpandedFactor(expandedFactor === id ? null : id);
    }
  };

  return (
    <section 
      className="bg-white rounded-xl shadow-sm p-4 transition-all duration-300 hover:shadow-md cursor-pointer"
      aria-labelledby="mood-tracker-title"
      onClick={onExpand}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 id="mood-tracker-title" className="text-lg font-semibold text-gray-900">
            Mood Tracker
          </h2>
          <p className="text-sm text-gray-600">Current state</p>
        </div>
        <div 
          className="p-2 bg-blue-50 rounded-lg transition-all duration-300 hover:bg-blue-100"
          aria-hidden="true"
        >
          <Brain className="h-5 w-5 text-blue-500" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4" role="list" aria-label="Mood statistics">
        <div 
          className="p-3 bg-blue-50 rounded-lg transition-all duration-300 hover:bg-blue-100"
          role="listitem"
        >
          <div className="flex items-center justify-between mb-1">
            <Brain className="h-4 w-4 text-blue-500" aria-hidden="true" />
            <TrendingUp className="h-4 w-4 text-green-500" aria-hidden="true" />
          </div>
          <div 
            className="text-xl font-bold text-gray-900"
            aria-label={`Mood score: ${moodData.score}`}
          >
            {moodData.score}
          </div>
          <p className="text-xs text-gray-600">Mood Score</p>
        </div>

        <div 
          className="p-3 bg-green-50 rounded-lg transition-all duration-300 hover:bg-green-100"
          role="listitem"
        >
          <div className="flex items-center justify-between mb-1">
            <AlertCircle className="h-4 w-4 text-green-500" aria-hidden="true" />
            <span 
              className="text-xs text-green-600"
              aria-label={`${moodData.change} improvement`}
            >
              {moodData.change}
            </span>
          </div>
          <div 
            className="text-xl font-bold text-gray-900"
            aria-label={`Current mood: ${moodData.current}`}
          >
            {moodData.current}
          </div>
          <p 
            className="text-xs text-gray-600"
            aria-label={`Trend: ${moodData.trend}`}
          >
            {moodData.trend}
          </p>
        </div>
      </div>

      <div 
        className="space-y-2"
        role="list"
        aria-label="Mood influencing factors"
      >
        {moodData.factors.map((factor) => (
          <div 
            key={factor.id}
            className="transition-all duration-300"
            role="listitem"
          >
            <button
              onClick={(e) => handleFactorClick(e, factor.id)}
              onKeyPress={(e) => handleKeyPress(e, factor.id)}
              className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-all duration-300"
              aria-expanded={expandedFactor === factor.id}
            >
              <span className="text-sm text-gray-600">{factor.name}</span>
              <span 
                className={`px-1.5 py-0.5 rounded-full text-xs transition-all duration-300 ${
                  factor.impact === 'positive'
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                }`}
                aria-label={`${factor.name} has ${factor.impact} impact`}
              >
                {factor.impact}
              </span>
            </button>

            {expandedFactor === factor.id && (
              <div className="mt-2 ml-2 p-2 text-xs text-gray-600 bg-gray-50 rounded-lg">
                {factor.details}
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        className="w-full mt-4 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg transition-all duration-300 hover:bg-blue-100 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={(e) => {
          e.stopPropagation();
          onLogMood();
        }}
        aria-label="Log current mood"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
        <span>Log Mood</span>
      </button>

      <div className="mt-2 flex items-center justify-center space-x-1 text-xs text-gray-500">
        <Clock className="h-3 w-3" aria-hidden="true" />
        <span>Last updated: {moodData.lastUpdated}</span>
      </div>
    </section>
  );
}