import React, { useState } from 'react';
import { Activity, Calendar, Filter, Heart, Dumbbell, Timer } from 'lucide-react';
import ExerciseOverview from '../components/Exercise/ExerciseOverview';
import ExerciseCalendar from '../components/Exercise/ExerciseCalendar';
import RecommendedWorkouts from '../components/Exercise/RecommendedWorkouts';
import ExerciseImpact from '../components/Exercise/ExerciseImpact';
import ExerciseLogModal from '../components/ExerciseLog/ExerciseLogModal';
import StrengthTrainingMetrics from '../components/Exercise/StrengthTrainingMetrics';
import CardioMetrics from '../components/Exercise/CardioMetrics';

type ExerciseView = 'all' | 'cardio' | 'strength';

export default function Exercise() {
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [activeView, setActiveView] = useState<ExerciseView>('all');

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Exercise Tracking</h1>
          <p className="text-gray-600">Monitor activity impact on symptoms</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-white rounded-lg shadow-sm p-1">
            {[
              { id: 'all', label: 'All Exercises', icon: Activity },
              { id: 'cardio', label: 'Cardio', icon: Heart },
              { id: 'strength', label: 'Strength', icon: Dumbbell }
            ].map(view => (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id as ExerciseView)}
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeView === view.id
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <view.icon className="h-4 w-4" />
                <span>{view.label}</span>
              </button>
            ))}
          </div>
          <button
            onClick={() => setIsLogModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            + Log Exercise
          </button>
        </div>
      </header>

      <ExerciseOverview activeView={activeView} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {activeView === 'strength' ? (
            <StrengthTrainingMetrics />
          ) : activeView === 'cardio' ? (
            <CardioMetrics />
          ) : (
            <RecommendedWorkouts />
          )}
          <ExerciseImpact />
        </div>
        <div className="lg:col-span-1">
          <ExerciseCalendar />
        </div>
      </div>

      <ExerciseLogModal 
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
      />
    </div>
  );
}