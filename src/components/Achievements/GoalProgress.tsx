import React, { useState } from 'react';
import { Target, TrendingUp, Award, X, Filter, Calendar, Clock } from 'lucide-react';
import ViewAllGoalsModal from './ViewAllGoalsModal';

interface Goal {
  name: string;
  current: number;
  target: number;
  unit: string;
  category: string;
  streak: number;
  progress: number;
  startDate: string;
  endDate: string;
  frequency: string;
  status: 'on track' | 'at risk' | 'behind';
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

interface Props {
  timeFrame: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export default function GoalProgress({ timeFrame }: Props) {
  const [isViewAllModalOpen, setIsViewAllModalOpen] = useState(false);

  const goals: Goal[] = [
    {
      name: 'Exercise Minutes',
      current: 150,
      target: 200,
      unit: 'minutes',
      category: 'exercise',
      streak: 5,
      progress: 75,
      startDate: '2024-03-01',
      endDate: '2024-03-31',
      frequency: 'daily',
      status: 'on track',
      period: 'weekly'
    },
    {
      name: 'Symptom-Free Days',
      current: 4,
      target: 5,
      unit: 'days',
      category: 'health',
      streak: 3,
      progress: 80,
      startDate: '2024-03-01',
      endDate: '2024-03-31',
      frequency: 'daily',
      status: 'on track',
      period: 'weekly'
    },
    {
      name: 'Meal Logging',
      current: 18,
      target: 21,
      unit: 'meals',
      category: 'nutrition',
      streak: 6,
      progress: 85,
      startDate: '2024-03-01',
      endDate: '2024-03-31',
      frequency: 'daily',
      status: 'on track',
      period: 'weekly'
    }
  ];

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Active Goals</h2>
            <p className="text-sm text-gray-600">Track your progress</p>
          </div>
          <button 
            onClick={() => setIsViewAllModalOpen(true)}
            className="text-primary-600 text-sm font-medium hover:text-primary-700"
          >
            View All Goals
          </button>
        </div>

        <div className="space-y-6">
          {goals.map((goal, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Target className="h-5 w-5 text-primary-500" />
                  <div>
                    <h3 className="font-medium text-gray-900">{goal.name}</h3>
                    <p className="text-sm text-gray-600">
                      {goal.current} of {goal.target} {goal.unit}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Award className="h-4 w-4 text-orange-500" />
                    <span className="text-sm text-gray-600">{goal.streak} day streak</span>
                  </div>
                  <span className="text-sm font-medium text-primary-600">
                    {goal.progress}%
                  </span>
                </div>
              </div>

              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary-500 rounded-full transition-all duration-500"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{goal.frequency}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{goal.period}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ViewAllGoalsModal 
        isOpen={isViewAllModalOpen}
        onClose={() => setIsViewAllModalOpen(false)}
      />
    </>
  );
}