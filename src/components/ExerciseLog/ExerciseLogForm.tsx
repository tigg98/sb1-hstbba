import React, { useState } from 'react';
import { Activity, Clock, Heart, AlertCircle } from 'lucide-react';

interface Props {
  onSubmit: (data: ExerciseData) => void;
  onCancel: () => void;
}

export interface ExerciseData {
  type: string;
  duration: number;
  intensity: 'Low' | 'Moderate' | 'High';
  heartRate?: number;
  caloriesBurned?: number;
  notes?: string;
  time: string;
  gutImpact?: 'Positive' | 'Neutral' | 'Negative';
  symptoms?: string[];
}

const exerciseTypes = [
  { id: 'walking', name: 'Walking', impact: 'Low impact, good for digestion' },
  { id: 'yoga', name: 'Yoga', impact: 'Gentle on digestive system' },
  { id: 'swimming', name: 'Swimming', impact: 'Low impact, full body workout' },
  { id: 'cycling', name: 'Cycling', impact: 'Low impact cardio' },
  { id: 'strength', name: 'Strength Training', impact: 'Builds core stability' }
];

const commonSymptoms = [
  'Bloating',
  'Cramping',
  'Fatigue',
  'Nausea',
  'Improved Digestion',
  'Reduced Stress'
];

export default function ExerciseLogForm({ onSubmit, onCancel }: Props) {
  const [formData, setFormData] = useState<ExerciseData>({
    type: '',
    duration: 30,
    intensity: 'Low',
    time: new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    }),
    symptoms: []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const toggleSymptom = (symptom: string) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms?.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...(prev.symptoms || []), symptom]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Exercise Type
        </label>
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        >
          <option value="">Select type</option>
          {exerciseTypes.map(type => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
        {formData.type && (
          <p className="mt-1 text-sm text-blue-600">
            {exerciseTypes.find(t => t.id === formData.type)?.impact}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Duration (minutes)
          </label>
          <input
            type="number"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
            min="5"
            max="180"
            step="5"
            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time
          </label>
          <input
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Intensity
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['Low', 'Moderate', 'High'] as const).map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setFormData({ ...formData, intensity: level })}
              className={`p-2 rounded-lg text-sm font-medium ${
                formData.intensity === level
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Heart Rate (optional)
        </label>
        <input
          type="number"
          value={formData.heartRate || ''}
          onChange={(e) => setFormData({ ...formData, heartRate: parseInt(e.target.value) })}
          placeholder="Average BPM"
          className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Symptoms & Effects
        </label>
        <div className="grid grid-cols-2 gap-2">
          {commonSymptoms.map(symptom => (
            <button
              key={symptom}
              type="button"
              onClick={() => toggleSymptom(symptom)}
              className={`p-2 rounded-lg text-sm font-medium text-left ${
                formData.symptoms?.includes(symptom)
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {symptom}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Notes
        </label>
        <textarea
          value={formData.notes || ''}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
          placeholder="Add any additional notes..."
        />
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-900">Exercise Tips</h4>
            <ul className="mt-1 space-y-1 text-sm text-blue-700">
              <li>• Exercise 2-3 hours after meals</li>
              <li>• Start with low intensity and gradually increase</li>
              <li>• Stay hydrated before and during exercise</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Save Exercise
        </button>
      </div>
    </form>
  );
}