import React, { useState } from 'react';
import { Activity, Clock, Flame, ArrowRight } from 'lucide-react';
import ViewAllWorkoutsModal from './ViewAllWorkoutsModal';

export default function RecommendedWorkouts() {
  const [isViewAllModalOpen, setIsViewAllModalOpen] = useState(false);

  const workouts = [
    {
      name: 'Low-Impact Walking',
      duration: '30 min',
      intensity: 'Low',
      benefits: ['Reduces bloating', 'Improves digestion'],
      calories: 150,
      bestTime: 'Morning',
      inflammationImpact: 'minimal'
    },
    {
      name: 'Gentle Yoga Flow',
      duration: '20 min',
      intensity: 'Low',
      benefits: ['Reduces stress', 'Improves gut motility'],
      calories: 100,
      bestTime: 'Evening',
      inflammationImpact: 'reducing'
    },
    {
      name: 'Swimming',
      duration: '25 min',
      intensity: 'Moderate',
      benefits: ['Low joint impact', 'Full body workout'],
      calories: 200,
      bestTime: 'Afternoon',
      inflammationImpact: 'minimal'
    }
  ];

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Recommended Workouts</h2>
            <p className="text-sm text-gray-600">Based on your symptom patterns</p>
          </div>
          <button 
            onClick={() => setIsViewAllModalOpen(true)}
            className="text-blue-600 text-sm font-medium hover:text-blue-700"
          >
            View All
          </button>
        </div>

        <div className="space-y-4">
          {workouts.map((workout, index) => (
            <div
              key={index}
              className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">{workout.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  workout.intensity === 'Low'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {workout.intensity} Intensity
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-3">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{workout.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Flame className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{workout.calories} cal</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{workout.bestTime}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {workout.benefits.map((benefit, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                  >
                    {benefit}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  Inflammation impact: {workout.inflammationImpact}
                </span>
                <button className="flex items-center space-x-1 text-blue-600 text-sm font-medium hover:text-blue-700">
                  <span>Start Workout</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ViewAllWorkoutsModal
        isOpen={isViewAllModalOpen}
        onClose={() => setIsViewAllModalOpen(false)}
      />
    </>
  );
}