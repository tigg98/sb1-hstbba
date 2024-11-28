import React from 'react';
import { Activity, Heart, TrendingUp, Clock } from 'lucide-react';

interface Props {
  onPageChange: (page: string) => void;
}

interface Exercise {
  id: string;
  name: string;
  duration: string;
  intensity: 'Low' | 'Moderate' | 'High';
  time: string;
}

export default function ExerciseWidget({ onPageChange }: Props) {
  const exerciseData = {
    todayStats: {
      minutes: 45,
      calories: 320,
      heartRate: 128
    },
    recentWorkouts: [
      {
        id: 'w1',
        name: 'Morning Walk',
        duration: '30 min',
        intensity: 'Low',
        time: '8:00 AM'
      },
      {
        id: 'w2',
        name: 'Yoga',
        duration: '15 min',
        intensity: 'Low',
        time: '5:00 PM'
      }
    ] as Exercise[]
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onPageChange('exercise');
    }
  };

  return (
    <section 
      className="bg-white rounded-xl shadow-sm p-6 transition-all duration-300 hover:shadow-md"
      aria-labelledby="exercise-widget-title"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 id="exercise-widget-title" className="text-lg font-semibold text-gray-900">
            Exercise
          </h2>
          <p className="text-sm text-gray-600">Today's activity</p>
        </div>
        <button 
          onClick={() => onPageChange('exercise')}
          onKeyPress={handleKeyPress}
          className="text-primary-600 text-sm font-medium hover:text-primary-700 transition-colors duration-300"
          aria-label="View exercise details"
        >
          View Details
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6" role="list" aria-label="Exercise statistics">
        <div 
          className="p-4 bg-blue-50 rounded-lg transition-all duration-300 hover:bg-blue-100"
          role="listitem"
        >
          <div className="flex items-center justify-between">
            <Clock className="h-5 w-5 text-blue-500" aria-hidden="true" />
            <span className="text-sm text-blue-600">Duration</span>
          </div>
          <p className="text-2xl font-bold text-blue-700 mt-2" aria-label={`${exerciseData.todayStats.minutes} minutes of exercise`}>
            {exerciseData.todayStats.minutes}
            <span className="text-sm font-normal ml-1">min</span>
          </p>
        </div>

        <div 
          className="p-4 bg-green-50 rounded-lg transition-all duration-300 hover:bg-green-100"
          role="listitem"
        >
          <div className="flex items-center justify-between">
            <Activity className="h-5 w-5 text-green-500" aria-hidden="true" />
            <span className="text-sm text-green-600">Calories</span>
          </div>
          <p className="text-2xl font-bold text-green-700 mt-2" aria-label={`${exerciseData.todayStats.calories} calories burned`}>
            {exerciseData.todayStats.calories}
            <span className="text-sm font-normal ml-1">cal</span>
          </p>
        </div>

        <div 
          className="p-4 bg-red-50 rounded-lg transition-all duration-300 hover:bg-red-100"
          role="listitem"
        >
          <div className="flex items-center justify-between">
            <Heart className="h-5 w-5 text-red-500" aria-hidden="true" />
            <span className="text-sm text-red-600">Avg HR</span>
          </div>
          <p className="text-2xl font-bold text-red-700 mt-2" aria-label={`Average heart rate ${exerciseData.todayStats.heartRate} beats per minute`}>
            {exerciseData.todayStats.heartRate}
            <span className="text-sm font-normal ml-1">bpm</span>
          </p>
        </div>
      </div>

      <div 
        className="space-y-4"
        role="list"
        aria-label="Recent workouts"
      >
        {exerciseData.recentWorkouts.map((workout) => (
          <article
            key={workout.id}
            className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-300"
            role="listitem"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-gray-900">{workout.name}</h3>
              <time 
                dateTime={workout.time}
                className="text-sm text-gray-500"
                aria-label={`Workout at ${workout.time}`}
              >
                {workout.time}
              </time>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span aria-label={`Duration: ${workout.duration}`}>{workout.duration}</span>
              <span 
                className={`px-2 py-1 rounded-full text-xs ${
                  workout.intensity === 'Low' 
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                } transition-colors duration-300`}
                aria-label={`${workout.intensity} intensity`}
              >
                {workout.intensity} Intensity
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}