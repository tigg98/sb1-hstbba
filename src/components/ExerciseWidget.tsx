import React, { useState } from 'react';
import { 
  TrendingUp, 
  Heart, 
  Activity, 
  Clock, 
  Flame,
  Timer,
  Waves,
  Footprints,
  ArrowRight
} from 'lucide-react';
import ExerciseAnalysisModal from './Exercise/ExerciseAnalysisModal';

interface Exercise {
  type: string;
  duration: number;
  calories: number;
  heartRate: {
    avg: number;
    max: number;
  };
  time: string;
  intensity: 'Low' | 'Moderate' | 'High';
}

export default function ExerciseWidget() {
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);

  const exercises: Exercise[] = [
    {
      type: "Morning Walk",
      duration: 32,
      calories: 145,
      heartRate: {
        avg: 98,
        max: 115
      },
      time: "7:30 AM",
      intensity: "Low"
    },
    {
      type: "Yoga",
      duration: 25,
      calories: 95,
      heartRate: {
        avg: 85,
        max: 100
      },
      time: "12:15 PM",
      intensity: "Low"
    }
  ];

  const dailyStats = {
    totalCalories: 240,
    totalMinutes: 57,
    avgHeartRate: 92,
    steps: 6543
  };

  const inflammationInsights = [
    {
      icon: <TrendingUp className="h-4 w-4 text-green-600" />,
      text: "Low-intensity morning exercises reduce inflammation by 25%"
    },
    {
      icon: <Heart className="h-4 w-4 text-blue-600" />,
      text: "Heart rate recovery improved 12% this week"
    },
    {
      icon: <Activity className="h-4 w-4 text-purple-600" />,
      text: "Consistent exercise pattern detected - maintaining this schedule helps reduce IBS symptoms"
    }
  ];

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Exercise</h3>
            <p className="text-gray-600 text-sm">Today's activities</p>
          </div>
          <Activity className="h-5 w-5 text-blue-500" />
        </div>

        {/* Daily Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Move</p>
                <p className="text-2xl font-bold text-blue-700">{dailyStats.totalCalories}</p>
                <p className="text-xs text-blue-600">CALORIES</p>
              </div>
              <Flame className="h-8 w-8 text-blue-500 opacity-75" />
            </div>
          </div>
          
          <div className="bg-green-50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Exercise</p>
                <p className="text-2xl font-bold text-green-700">{dailyStats.totalMinutes}</p>
                <p className="text-xs text-green-600">MINUTES</p>
              </div>
              <Timer className="h-8 w-8 text-green-500 opacity-75" />
            </div>
          </div>
        </div>

        {/* Exercise List */}
        <div className="space-y-4 mb-6">
          {exercises.map((exercise, index) => (
            <div key={index} className="border border-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{exercise.type}</h4>
                <span className="text-sm text-gray-500">{exercise.time}</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Timer className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{exercise.duration} min</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Flame className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{exercise.calories} cal</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Heart className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{exercise.heartRate.avg} bpm</span>
                </div>
              </div>

              <div className="mt-2">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  exercise.intensity === 'Low' 
                    ? 'bg-green-100 text-green-700'
                    : exercise.intensity === 'Moderate'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
                }`}>
                  {exercise.intensity} Intensity
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Inflammation Insights */}
        <div className="border-t border-gray-100 pt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Exercise Insights</h4>
          <div className="space-y-3">
            {inflammationInsights.map((insight, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="p-1 bg-gray-50 rounded-full">
                  {insight.icon}
                </div>
                <p className="text-sm text-gray-600">{insight.text}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setIsAnalysisModalOpen(true)}
          className="w-full mt-6 py-2 text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <span>View Detailed Analysis</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <ExerciseAnalysisModal
        isOpen={isAnalysisModalOpen}
        onClose={() => setIsAnalysisModalOpen(false)}
        exercises={exercises}
        dailyStats={dailyStats}
        insights={inflammationInsights}
      />
    </>
  );
}