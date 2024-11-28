import React, { useState } from 'react';
import { X, Plus, Filter, Target, Calendar, Star } from 'lucide-react';
import NewGoalModal from './NewGoalModal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type TimePeriod = 'daily' | 'weekly' | 'monthly' | 'yearly';

interface Goal {
  id: string;
  name: string;
  period: TimePeriod;
  category: string;
  progress: number;
  target: number;
  unit: string;
  dueDate?: string;
}

export default function ViewAllGoalsModal({ isOpen, onClose }: Props) {
  const [selectedPeriods, setSelectedPeriods] = useState<Set<TimePeriod>>(new Set(['daily', 'weekly', 'monthly', 'yearly']));
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isNewGoalModalOpen, setIsNewGoalModalOpen] = useState(false);

  const goals: Goal[] = [
    {
      id: '1',
      name: 'Daily Water Intake',
      period: 'daily',
      category: 'hydration',
      progress: 1500,
      target: 2000,
      unit: 'ml'
    },
    {
      id: '2',
      name: 'Weekly Exercise',
      period: 'weekly',
      category: 'exercise',
      progress: 3,
      target: 5,
      unit: 'sessions'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'hydration', name: 'Hydration' },
    { id: 'exercise', name: 'Exercise' },
    { id: 'nutrition', name: 'Nutrition' },
    { id: 'sleep', name: 'Sleep' }
  ];

  const timePeriods: TimePeriod[] = ['daily', 'weekly', 'monthly', 'yearly'];

  const togglePeriod = (period: TimePeriod) => {
    const newPeriods = new Set(selectedPeriods);
    if (newPeriods.has(period)) {
      newPeriods.delete(period);
    } else {
      newPeriods.add(period);
    }
    setSelectedPeriods(newPeriods);
  };

  const toggleAllPeriods = () => {
    if (selectedPeriods.size === timePeriods.length) {
      setSelectedPeriods(new Set());
    } else {
      setSelectedPeriods(new Set(timePeriods));
    }
  };

  const filteredGoals = goals.filter(goal => {
    if (selectedPeriods.size > 0 && !selectedPeriods.has(goal.period)) return false;
    if (selectedCategory !== 'all' && goal.category !== selectedCategory) return false;
    return true;
  });

  const handleGoalCreated = (newGoal: Goal) => {
    // Handle new goal creation
    setIsNewGoalModalOpen(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-25">
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-4xl">
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-primary-500" />
                <h2 className="text-xl font-semibold text-gray-900">All Goals</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            <div className="p-6">
              {/* Time Period Filter */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <Filter className="h-5 w-5 text-gray-400" />
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={toggleAllPeriods}
                      className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors hover:bg-gray-50"
                    >
                      <div className={`h-4 w-4 rounded transition-colors ${
                        selectedPeriods.size === timePeriods.length
                          ? 'bg-primary-500'
                          : 'border-2 border-gray-300'
                      }`} />
                      <span className="text-gray-700">All Periods</span>
                    </button>
                    <div className="h-4 w-px bg-gray-200" />
                    <div className="flex items-center space-x-4">
                      {timePeriods.map((period) => (
                        <button
                          key={period}
                          onClick={() => togglePeriod(period)}
                          className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors hover:bg-gray-50"
                        >
                          <div className={`h-4 w-4 rounded transition-colors ${
                            selectedPeriods.has(period)
                              ? 'bg-primary-500'
                              : 'border-2 border-gray-300'
                          }`} />
                          <span className="text-gray-700 capitalize">{period}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsNewGoalModalOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>New Goal</span>
                </button>
              </div>

              {/* Category Filter */}
              <div className="flex space-x-2 mb-6">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              {/* Goals Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredGoals.map(goal => (
                  <div
                    key={goal.id}
                    className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{goal.name}</h3>
                      <span className="text-xs bg-primary-50 text-primary-600 px-2 py-1 rounded-full capitalize">
                        {goal.period}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                      <span>{goal.progress} / {goal.target} {goal.unit}</span>
                      <span>{Math.round((goal.progress / goal.target) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-500 rounded-full transition-all"
                        style={{ width: `${(goal.progress / goal.target) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <NewGoalModal
        isOpen={isNewGoalModalOpen}
        onClose={() => setIsNewGoalModalOpen(false)}
        onGoalCreated={handleGoalCreated}
      />
    </>
  );
}