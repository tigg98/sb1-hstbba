import React from 'react';
import { Heart, TrendingUp, AlertCircle, Plus, Camera, Calendar } from 'lucide-react';

interface Props {
  onLogAcne: () => void;
}

export default function SkinHealthWidget({ onLogAcne }: Props) {
  const skinData = {
    score: 85,
    trend: 'improving',
    change: '+15%',
    lastUpdated: '2 hours ago',
    symptoms: [
      { name: 'Inflammation', level: 'low', change: -20 },
      { name: 'Dryness', level: 'moderate', change: -5 },
      { name: 'Sensitivity', level: 'low', change: -15 },
      { name: 'Acne', level: 'low', change: -25 }
    ],
    recentTriggers: [
      { name: 'Dairy', timestamp: '2 days ago', impact: 'high' },
      { name: 'Stress', timestamp: '1 day ago', impact: 'moderate' }
    ],
    streak: {
      days: 5,
      description: 'Clear skin days'
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onLogAcne();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Skin Health</h3>
          <p className="text-sm text-gray-600">Current status</p>
        </div>
        <div className="flex items-center space-x-1">
          <button 
            onClick={onLogAcne}
            onKeyPress={handleKeyPress}
            className="p-1.5 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
            aria-label="Take photo"
          >
            <Camera className="h-4 w-4" />
          </button>
          <button 
            onClick={onLogAcne}
            onKeyPress={handleKeyPress}
            className="p-1.5 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
            aria-label="Log skin condition"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 bg-pink-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <Heart className="h-4 w-4 text-pink-500" />
            <div className="flex items-center space-x-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-xs text-green-600">{skinData.change}</span>
            </div>
          </div>
          <div className="text-xl font-bold text-gray-900">{skinData.score}</div>
          <p className="text-xs text-gray-600">Overall Score</p>
        </div>

        <div className="p-3 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <Calendar className="h-4 w-4 text-green-500" />
            <span className="text-xs text-green-600">Streak</span>
          </div>
          <div className="text-xl font-bold text-gray-900">{skinData.streak.days}</div>
          <p className="text-xs text-gray-600">{skinData.streak.description}</p>
        </div>
      </div>

      <div className="space-y-2 mb-3">
        <h4 className="text-xs font-medium text-gray-900 mb-1">Current Symptoms</h4>
        {skinData.symptoms.map((symptom, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-xs text-gray-600">{symptom.name}</span>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-green-600">{symptom.change}%</span>
              <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                symptom.level === 'low'
                  ? 'bg-green-100 text-green-700'
                  : symptom.level === 'moderate'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {symptom.level}
              </span>
            </div>
          </div>
        ))}
      </div>

      {skinData.recentTriggers.length > 0 && (
        <div className="border-t border-gray-100 pt-3">
          <h4 className="text-xs font-medium text-gray-900 mb-2">Recent Triggers</h4>
          <div className="space-y-1.5">
            {skinData.recentTriggers.map((trigger, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  <AlertCircle className="h-3 w-3 text-orange-500" />
                  <span className="text-xs text-gray-600">{trigger.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">{trigger.timestamp}</span>
                  <span className={`px-1.5 py-0.5 rounded-full text-xs ${
                    trigger.impact === 'high'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {trigger.impact}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}