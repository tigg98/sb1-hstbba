import React, { useState } from 'react';
import { X, Target, Calendar, Clock, Plus, Info } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onGoalCreated?: (goal: any) => void;
}

export default function NewGoalModal({ isOpen, onClose, onGoalCreated }: Props) {
  const [goalData, setGoalData] = useState({
    name: '',
    target: '',
    unit: '',
    category: '',
    period: 'daily',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    frequency: 'daily'
  });

  const categories = [
    { value: 'health', label: 'Health' },
    { value: 'exercise', label: 'Exercise' },
    { value: 'nutrition', label: 'Nutrition' },
    { value: 'sleep', label: 'Sleep' },
    { value: 'stress', label: 'Stress Management' }
  ];

  const periods = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' }
  ];

  const commonUnits = {
    health: ['points', 'occurrences', 'symptoms'],
    exercise: ['minutes', 'sessions', 'steps', 'miles'],
    nutrition: ['meals', 'servings', 'glasses', 'grams'],
    sleep: ['hours', 'quality score'],
    stress: ['meditation minutes', 'stress score', 'relaxation sessions']
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newGoal = {
      ...goalData,
      current: 0,
      progress: 0,
      streak: 0,
      status: 'on track'
    };
    onGoalCreated?.(newGoal);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-25">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-primary-500" />
              <h2 className="text-xl font-semibold text-gray-900">Create New Goal</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Goal Name
              </label>
              <input
                type="text"
                value={goalData.name}
                onChange={(e) => setGoalData({ ...goalData, name: e.target.value })}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="e.g., Daily Water Intake"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={goalData.category}
                  onChange={(e) => setGoalData({ ...goalData, category: e.target.value })}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Period
                </label>
                <select
                  value={goalData.period}
                  onChange={(e) => setGoalData({ ...goalData, period: e.target.value })}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                >
                  {periods.map(period => (
                    <option key={period.value} value={period.value}>{period.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Value
                </label>
                <input
                  type="number"
                  value={goalData.target}
                  onChange={(e) => setGoalData({ ...goalData, target: e.target.value })}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., 8"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit
                </label>
                <select
                  value={goalData.unit}
                  onChange={(e) => setGoalData({ ...goalData, unit: e.target.value })}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                >
                  <option value="">Select unit</option>
                  {goalData.category && commonUnits[goalData.category as keyof typeof commonUnits].map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={goalData.startDate}
                  onChange={(e) => setGoalData({ ...goalData, startDate: e.target.value })}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={goalData.endDate}
                  onChange={(e) => setGoalData({ ...goalData, endDate: e.target.value })}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                  min={goalData.startDate}
                />
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-900">Goal Setting Tips</h4>
                  <ul className="mt-1 space-y-1 text-sm text-blue-700">
                    <li>• Make your goal specific and measurable</li>
                    <li>• Set realistic timeframes</li>
                    <li>• Break long-term goals into smaller milestones</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                Create Goal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}