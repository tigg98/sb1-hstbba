import React from 'react';
import { Droplet, Plus, Info } from 'lucide-react';

interface Props {
  onLogWater?: () => void;
}

export default function WaterIntakeWidget({ onLogWater }: Props) {
  const dailyGoal = 2000; // in ml
  const currentIntake = 1500; // in ml
  const progress = (currentIntake / dailyGoal) * 100;

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onLogWater?.();
    }
  };

  return (
    <section 
      className="bg-white rounded-xl shadow-sm p-4"
      aria-labelledby="water-intake-title"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 id="water-intake-title" className="text-lg font-semibold text-gray-900">
            Water Intake
          </h2>
          <p className="text-sm text-gray-600">Daily hydration tracking</p>
        </div>
        <button 
          onClick={onLogWater}
          onKeyPress={handleKeyPress}
          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          aria-label="Log water intake"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="flex items-center space-x-6 mb-6">
        <div className="relative h-24 w-24" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="absolute inset-0 bg-blue-50 rounded-full transition-all duration-300" />
          <div
            className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-b-full transition-all duration-500 ease-in-out"
            style={{ height: `${progress}%` }}
          />
          <Droplet 
            className="absolute inset-0 m-auto h-12 w-12 text-blue-600 transform transition-transform duration-300 hover:scale-110" 
            style={{ transform: 'translateY(-2px)' }}
            aria-hidden="true"
          />
        </div>
        <div>
          <div className="text-3xl font-bold text-gray-900">
            <span aria-label={`${currentIntake} milliliters consumed`}>
              {currentIntake}
            </span>
            <span className="text-sm text-gray-600 ml-1">ml</span>
          </div>
          <p className="text-sm text-gray-600">
            of <span aria-label={`${dailyGoal} milliliters daily goal`}>{dailyGoal}ml</span> daily goal
          </p>
          <p 
            className="text-sm font-medium text-blue-600 mt-1"
            aria-label={`${Math.round(progress)}% of daily goal completed`}
          >
            {Math.round(progress)}% completed
          </p>
        </div>
      </div>

      <div 
        className="mt-4 p-3 bg-blue-50 rounded-lg transition-all duration-300 hover:bg-blue-100"
        role="complementary"
      >
        <div className="flex items-start space-x-2">
          <Info className="h-4 w-4 text-blue-500 mt-0.5" aria-hidden="true" />
          <p className="text-sm text-blue-700">
            Staying hydrated can help reduce digestive symptoms and improve overall gut health.
          </p>
        </div>
      </div>
    </section>
  );
}