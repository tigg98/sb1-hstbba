import React, { useState } from 'react';
import { X, Target, Droplet, Activity } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function WaterGoalsModal({ isOpen, onClose }: Props) {
  const [dailyGoal, setDailyGoal] = useState('2500');
  const [qualityGoal, setQualityGoal] = useState('filtered');
  const [reminders, setReminders] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle saving goals
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-25">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-500" />
              <h2 className="text-xl font-semibold text-gray-900">Set Hydration Goals</h2>
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
                Daily Water Intake Goal (ml)
              </label>
              <div className="relative">
                <Droplet className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={dailyGoal}
                  onChange={(e) => setDailyGoal(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="2500"
                  min="500"
                  max="5000"
                  step="100"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Water Quality Goal
              </label>
              <select
                value={qualityGoal}
                onChange={(e) => setQualityGoal(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="filtered">Filtered Water</option>
                <option value="mineral">Mineral Water</option>
                <option value="spring">Spring Water</option>
                <option value="alkaline">Alkaline Water</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="reminders"
                checked={reminders}
                onChange={(e) => setReminders(e.target.checked)}
                className="rounded border-gray-300 text-green-500 focus:ring-green-500"
              />
              <label htmlFor="reminders" className="text-sm text-gray-700">
                Enable hydration reminders
              </label>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Recommendations</h4>
              <ul className="space-y-2 text-sm text-blue-700">
                <li className="flex items-center space-x-2">
                  <Activity className="h-4 w-4" />
                  <span>Adjust intake based on activity level</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Droplet className="h-4 w-4" />
                  <span>Consider mineral content for gut health</span>
                </li>
              </ul>
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
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Save Goals
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}