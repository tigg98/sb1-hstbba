import React from 'react';
import { Droplet, Plus, AlertCircle, Info } from 'lucide-react';

interface Props {
  onLogWater: () => void;
}

export default function WaterIntakeWidget({ onLogWater }: Props) {
  const dailyGoal = 2000; // in ml
  const currentIntake = 1500; // in ml
  const progress = (currentIntake / dailyGoal) * 100;

  const waterSources = [
    { type: 'Filtered', amount: 1000, quality: 'good' },
    { type: 'Tap', amount: 500, quality: 'moderate' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Water Intake</h2>
          <p className="text-sm text-gray-600">Track your hydration</p>
        </div>
        <button
          onClick={onLogWater}
          className="flex items-center space-x-2 px-3 py-1.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Log Water</span>
        </button>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 bg-blue-50 rounded-full" />
            <div
              className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-b-full transition-all duration-500"
              style={{ height: `${progress}%` }}
            />
            <Droplet 
              className="absolute inset-0 m-auto h-8 w-8 text-blue-600" 
              style={{ transform: 'translateY(-2px)' }}
            />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900">
              {currentIntake}
              <span className="text-sm text-gray-600 ml-1">ml</span>
            </div>
            <p className="text-sm text-gray-600">of {dailyGoal}ml daily goal</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-gray-900">
            {Math.round(progress)}%
          </div>
          <p className="text-sm text-gray-600">Progress</p>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-900">Today's Sources</h3>
        {waterSources.map((source, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className={`p-1.5 rounded-full ${
                source.quality === 'good' ? 'bg-green-100' : 'bg-yellow-100'
              }`}>
                <Droplet className={`h-4 w-4 ${
                  source.quality === 'good' ? 'text-green-500' : 'text-yellow-500'
                }`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{source.type}</p>
                <p className="text-xs text-gray-600">{source.amount}ml</p>
              </div>
            </div>
            <div className={`text-xs px-2 py-1 rounded-full ${
              source.quality === 'good'
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              {source.quality}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-start space-x-3">
          <Info className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-900">Water Quality Alert</h4>
            <p className="text-sm text-blue-700 mt-1">
              Consider using filtered water to reduce chlorine exposure, which may help improve gut health.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}