import React, { useState } from 'react';
import { X, Brain, Heart, AlertCircle, Plus, Info } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onMoodLogged?: (mood: any) => void;
}

const moodOptions = [
  { value: 'great', label: 'Great', color: 'green' },
  { value: 'good', label: 'Good', color: 'blue' },
  { value: 'okay', label: 'Okay', color: 'yellow' },
  { value: 'poor', label: 'Poor', color: 'orange' },
  { value: 'bad', label: 'Bad', color: 'red' }
];

const energyLevels = [
  { value: 'high', label: 'High', color: 'green' },
  { value: 'moderate', label: 'Moderate', color: 'blue' },
  { value: 'low', label: 'Low', color: 'yellow' }
];

const commonFactors = [
  'Stress',
  'Sleep Quality',
  'Exercise',
  'Diet',
  'Social Interaction',
  'Work',
  'Weather',
  'Physical Health'
];

export default function MoodLogModal({ isOpen, onClose, onMoodLogged }: Props) {
  const [mood, setMood] = useState('');
  const [energy, setEnergy] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedFactors, setSelectedFactors] = useState<string[]>([]);
  const [time, setTime] = useState(
    new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const moodData = {
      mood,
      energy,
      notes,
      factors: selectedFactors,
      time,
      timestamp: new Date().toISOString()
    };
    onMoodLogged?.(moodData);
    onClose();
  };

  const toggleFactor = (factor: string) => {
    setSelectedFactors(prev => 
      prev.includes(factor)
        ? prev.filter(f => f !== factor)
        : [...prev, factor]
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-25">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-purple-500" />
              <h2 className="text-xl font-semibold text-gray-900">Log Mood</h2>
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
                How are you feeling?
              </label>
              <div className="grid grid-cols-5 gap-2">
                {moodOptions.map(option => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setMood(option.value)}
                    className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                      mood === option.value
                        ? `bg-${option.color}-100 text-${option.color}-700`
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Energy Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {energyLevels.map(level => (
                  <button
                    key={level.value}
                    type="button"
                    onClick={() => setEnergy(level.value)}
                    className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                      energy === level.value
                        ? `bg-${level.color}-100 text-${level.color}-700`
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contributing Factors
              </label>
              <div className="grid grid-cols-2 gap-2">
                {commonFactors.map(factor => (
                  <button
                    key={factor}
                    type="button"
                    onClick={() => toggleFactor(factor)}
                    className={`p-2 rounded-lg text-sm font-medium text-left transition-colors ${
                      selectedFactors.includes(factor)
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {factor}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                rows={3}
                placeholder="Add any additional notes..."
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-blue-900">Tracking Tips</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Regular mood tracking helps identify patterns and triggers that affect your gut health.
                  </p>
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
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                Save Mood
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}