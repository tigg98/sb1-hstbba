import React, { useState } from 'react';
import { X, Clock, Calendar, Activity, AlertCircle, Heart } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSchedule?: (workout: WorkoutSchedule) => void;
}

interface WorkoutSchedule {
  type: string;
  date: string;
  time: string;
  duration: number;
  intensity: 'Low' | 'Moderate' | 'High';
  notes: string;
}

export default function ScheduleWorkoutModal({ isOpen, onClose, onSchedule }: Props) {
  const [workout, setWorkout] = useState<WorkoutSchedule>({
    type: '',
    date: new Date().toISOString().split('T')[0],
    time: '09:00',
    duration: 30,
    intensity: 'Low',
    notes: ''
  });

  const workoutTypes = [
    { id: 'walking', name: 'Walking', impact: 'Low impact, good for digestion' },
    { id: 'swimming', name: 'Swimming', impact: 'Low impact, full body workout' },
    { id: 'yoga', name: 'Yoga', impact: 'Gentle on digestive system' },
    { id: 'cycling', name: 'Cycling', impact: 'Low impact cardio' },
    { id: 'strength', name: 'Strength Training', impact: 'Builds core stability' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSchedule?.(workout);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-25">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900">Schedule Workout</h2>
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
                Workout Type
              </label>
              <select
                value={workout.type}
                onChange={(e) => setWorkout({ ...workout, type: e.target.value })}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select type</option>
                {workoutTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
              {workout.type && (
                <p className="mt-1 text-sm text-blue-600">
                  {workoutTypes.find(t => t.id === workout.type)?.impact}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="date"
                    value={workout.date}
                    onChange={(e) => setWorkout({ ...workout, date: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="time"
                    value={workout.time}
                    onChange={(e) => setWorkout({ ...workout, time: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (minutes)
                </label>
                <div className="relative">
                  <Activity className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    value={workout.duration}
                    onChange={(e) => setWorkout({ ...workout, duration: parseInt(e.target.value) })}
                    min="5"
                    max="180"
                    step="5"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Intensity
                </label>
                <select
                  value={workout.intensity}
                  onChange={(e) => setWorkout({ ...workout, intensity: e.target.value as WorkoutSchedule['intensity'] })}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="Low">Low</option>
                  <option value="Moderate">Moderate</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                value={workout.notes}
                onChange={(e) => setWorkout({ ...workout, notes: e.target.value })}
                placeholder="Add any special instructions or reminders..."
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-900">Workout Tips</h4>
                  <ul className="mt-1 text-sm text-blue-700 space-y-1">
                    <li>• Schedule workouts 2-3 hours after meals</li>
                    <li>• Start with low intensity and gradually increase</li>
                    <li>• Stay hydrated before and during exercise</li>
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
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Schedule Workout
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}