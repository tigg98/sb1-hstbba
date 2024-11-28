import React from 'react';
import { TrendingUp, Calendar, Brain } from 'lucide-react';

interface MoodTrend {
  date: string;
  mood: number;
  energy: number;
  stress: number;
}

interface Props {
  trends: MoodTrend[];
  timeframe: 'week' | 'month' | 'year';
}

export default function MoodTrends({ trends, timeframe }: Props) {
  const maxValue = 100;
  const getHeight = (value: number) => `${(value / maxValue) * 100}%`;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Mood Trends</h3>
        <span className="text-sm text-gray-600 capitalize">{timeframe}ly view</span>
      </div>

      <div className="h-64 flex items-end space-x-2">
        {trends.map((trend, index) => (
          <div key={index} className="flex-1 flex flex-col space-y-1">
            <div className="relative flex-1">
              <div
                className="absolute bottom-0 left-0 right-0 bg-purple-200 rounded-t-lg transition-all"
                style={{ height: getHeight(trend.mood) }}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100">
                  Mood: {trend.mood}%
                </div>
              </div>
            </div>
            <span className="text-xs text-gray-600 text-center">
              {new Date(trend.date).toLocaleDateString('en-US', { weekday: 'short' })}
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-purple-200 rounded-full"></div>
          <span>Mood</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-200 rounded-full"></div>
          <span>Energy</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-200 rounded-full"></div>
          <span>Stress</span>
        </div>
      </div>
    </div>
  );
}