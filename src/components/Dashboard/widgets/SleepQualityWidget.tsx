import React, { useState } from 'react';
import { Moon, Clock, TrendingUp, Brain } from 'lucide-react';

interface Props {
  onExpand: () => void;
  isExpanded: boolean;
}

export default function SleepQualityWidget({ onExpand, isExpanded }: Props) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const sleepData = {
    score: 85,
    hours: 7.5,
    quality: 'Good',
    trend: 'improving',
    deepSleep: '2h 15m',
    remSleep: '1h 45m',
    lightSleep: '3h 30m',
    lastUpdated: '2 hours ago'
  };

  const handleSectionClick = (e: React.MouseEvent, section: string) => {
    e.stopPropagation();
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleKeyPress = (event: React.KeyboardEvent, section: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setExpandedSection(expandedSection === section ? null : section);
    }
  };

  const getSleepQualityColor = (quality: string) => {
    switch (quality) {
      case 'Excellent': return 'text-green-700';
      case 'Good': return 'text-blue-700';
      case 'Fair': return 'text-yellow-700';
      default: return 'text-red-700';
    }
  };

  return (
    <section 
      className="bg-white rounded-xl shadow-sm p-4 transition-all duration-300 hover:shadow-md cursor-pointer"
      onClick={onExpand}
      role="button"
      tabIndex={0}
      aria-label="Sleep quality summary"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Sleep Quality</h2>
          <p className="text-sm text-gray-600">Last night's sleep</p>
        </div>
        <div 
          className="p-2 bg-purple-50 rounded-lg transition-all duration-300 hover:bg-purple-100"
          aria-hidden="true"
        >
          <Moon className="h-5 w-5 text-purple-500" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <button
          onClick={(e) => handleSectionClick(e, 'duration')}
          onKeyPress={(e) => handleKeyPress(e, 'duration')}
          className="p-3 bg-purple-50 rounded-lg transition-all duration-300 hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <div className="flex items-center justify-between mb-1">
            <Clock className="h-4 w-4 text-purple-500" />
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <div className="text-xl font-bold text-gray-900">{sleepData.hours}h</div>
          <p className="text-xs text-gray-600">Total Sleep</p>
          {expandedSection === 'duration' && (
            <div className="mt-2 pt-2 border-t border-purple-100">
              <p className="text-xs text-purple-700">
                Optimal sleep duration achieved. Consistent with your target range.
              </p>
            </div>
          )}
        </button>

        <button
          onClick={(e) => handleSectionClick(e, 'quality')}
          onKeyPress={(e) => handleKeyPress(e, 'quality')}
          className="p-3 bg-blue-50 rounded-lg transition-all duration-300 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <div className="flex items-center justify-between mb-1">
            <Brain className="h-4 w-4 text-blue-500" />
            <span className="text-xs text-blue-600">{sleepData.trend}</span>
          </div>
          <div className="text-xl font-bold text-gray-900">{sleepData.score}</div>
          <p className="text-xs text-gray-600">Sleep Score</p>
          {expandedSection === 'quality' && (
            <div className="mt-2 pt-2 border-t border-blue-100">
              <p className="text-xs text-blue-700">
                Sleep quality score is above average. Good sleep efficiency detected.
              </p>
            </div>
          )}
        </button>
      </div>

      <div className="space-y-2">
        <button
          onClick={(e) => handleSectionClick(e, 'deep')}
          onKeyPress={(e) => handleKeyPress(e, 'deep')}
          className="w-full text-left p-2 rounded-lg hover:bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">Deep Sleep</span>
            <div className="flex items-center space-x-2">
              <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 transition-all duration-300" style={{ width: '75%' }} />
              </div>
              <span className="text-xs font-medium text-purple-600">{sleepData.deepSleep}</span>
            </div>
          </div>
          {expandedSection === 'deep' && (
            <div className="mt-2 text-xs text-gray-600">
              Excellent deep sleep duration. This phase is crucial for physical recovery and immune function.
            </div>
          )}
        </button>

        <button
          onClick={(e) => handleSectionClick(e, 'rem')}
          onKeyPress={(e) => handleKeyPress(e, 'rem')}
          className="w-full text-left p-2 rounded-lg hover:bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">REM Sleep</span>
            <div className="flex items-center space-x-2">
              <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: '60%' }} />
              </div>
              <span className="text-xs font-medium text-blue-600">{sleepData.remSleep}</span>
            </div>
          </div>
          {expandedSection === 'rem' && (
            <div className="mt-2 text-xs text-gray-600">
              Good REM sleep achieved. This phase is important for cognitive function and emotional processing.
            </div>
          )}
        </button>

        <button
          onClick={(e) => handleSectionClick(e, 'light')}
          onKeyPress={(e) => handleKeyPress(e, 'light')}
          className="w-full text-left p-2 rounded-lg hover:bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">Light Sleep</span>
            <div className="flex items-center space-x-2">
              <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 transition-all duration-300" style={{ width: '85%' }} />
              </div>
              <span className="text-xs font-medium text-green-600">{sleepData.lightSleep}</span>
            </div>
          </div>
          {expandedSection === 'light' && (
            <div className="mt-2 text-xs text-gray-600">
              Normal light sleep duration. This transitional phase helps maintain sleep continuity.
            </div>
          )}
        </button>
      </div>

      <div className="mt-4 p-3 bg-purple-50 rounded-lg">
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium ${getSleepQualityColor(sleepData.quality)}`}>
            {sleepData.quality} Quality Sleep
          </span>
          <time className="text-xs text-gray-500">
            Updated {sleepData.lastUpdated}
          </time>
        </div>
      </div>
    </section>
  );
}