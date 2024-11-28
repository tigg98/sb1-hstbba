import React, { useState } from 'react';
import { Trophy, Target, Calendar, Star, TrendingUp, Plus } from 'lucide-react';
import AchievementsList from '../components/Achievements/AchievementsList';
import GoalProgress from '../components/Achievements/GoalProgress';
import SuggestedGoals from '../components/Achievements/SuggestedGoals';
import NewGoalModal from '../components/Achievements/NewGoalModal';
import AchievementStreaks from '../components/Achievements/AchievementStreaks';
import CategoryProgress from '../components/Achievements/CategoryProgress';

type TimeFrame = 'daily' | 'weekly' | 'monthly' | 'yearly';

export default function Achievements() {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<TimeFrame>('weekly');
  const [isNewGoalModalOpen, setIsNewGoalModalOpen] = useState(false);

  const timeFrames: { value: TimeFrame; label: string }[] = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' }
  ];

  const categories = [
    { name: 'Gut Health', progress: 75, total: 20, completed: 15 },
    { name: 'Exercise', progress: 60, total: 15, completed: 9 },
    { name: 'Nutrition', progress: 80, total: 25, completed: 20 },
    { name: 'Skin Health', progress: 65, total: 12, completed: 8 },
    { name: 'Water Quality', progress: 90, total: 10, completed: 9 },
    { name: 'Stress Management', progress: 70, total: 15, completed: 11 }
  ];

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Achievements & Goals</h1>
          <p className="text-sm text-gray-600">Track your progress and set new goals</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-white rounded-lg shadow-sm p-1">
            {timeFrames.map(timeFrame => (
              <button
                key={timeFrame.value}
                onClick={() => setSelectedTimeFrame(timeFrame.value)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  selectedTimeFrame === timeFrame.value
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {timeFrame.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setIsNewGoalModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>New Goal</span>
          </button>
        </div>
      </header>

      {/* Achievement Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Total Score</h2>
            <Trophy className="h-6 w-6 text-yellow-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">2,450</div>
          <div className="flex items-center text-green-600">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span className="text-sm">+125 this {selectedTimeFrame}</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Current Level</h2>
            <Star className="h-6 w-6 text-yellow-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">Level 15</div>
          <div className="text-sm text-gray-600">385 XP to next level</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Active Goals</h2>
            <Target className="h-6 w-6 text-blue-500" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">8</div>
          <div className="text-sm text-gray-600">5 on track, 3 need attention</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <GoalProgress timeFrame={selectedTimeFrame} />
          <AchievementStreaks />
          <CategoryProgress categories={categories} />
          <AchievementsList timeFrame={selectedTimeFrame} />
        </div>
        <div className="lg:col-span-1">
          <SuggestedGoals />
        </div>
      </div>

      <NewGoalModal
        isOpen={isNewGoalModalOpen}
        onClose={() => setIsNewGoalModalOpen(false)}
      />
    </div>
  );
}