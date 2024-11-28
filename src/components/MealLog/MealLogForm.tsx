import React, { useState } from 'react';
import { Utensils, Clock, AlertCircle, Camera, Plus, Scale, Heart } from 'lucide-react';

interface Props {
  onSubmit: (data: MealLogData) => void;
  onCancel: () => void;
}

export interface MealLogData {
  type: string;
  foods: Food[];
  time: string;
  hunger: number;
  fullness: number;
  mood: string;
  symptoms: string[];
  notes?: string;
  photos?: string[];
  location?: string;
}

interface Food {
  name: string;
  portion: string;
  calories: number;
  category: string;
  ingredients?: string[];
  isProcessed?: boolean;
  isGutFriendly?: boolean;
}

export default function MealLogForm({ onSubmit, onCancel }: Props) {
  const [mealData, setMealData] = useState<MealLogData>({
    type: '',
    foods: [],
    time: new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    }),
    hunger: 5,
    fullness: 5,
    mood: 'neutral',
    symptoms: [],
    notes: ''
  });

  const [currentFood, setCurrentFood] = useState<Food>({
    name: '',
    portion: '',
    calories: 0,
    category: ''
  });

  const mealTypes = [
    'Breakfast',
    'Morning Snack',
    'Lunch',
    'Afternoon Snack',
    'Dinner',
    'Evening Snack'
  ];

  const foodCategories = [
    'Proteins',
    'Vegetables',
    'Fruits',
    'Grains',
    'Dairy',
    'Fats',
    'Beverages'
  ];

  const commonSymptoms = [
    'Bloating',
    'Gas',
    'Nausea',
    'Heartburn',
    'Cramping',
    'None'
  ];

  const moodOptions = [
    'energized',
    'satisfied',
    'neutral',
    'uncomfortable',
    'sluggish'
  ];

  const handleAddFood = () => {
    if (currentFood.name && currentFood.portion) {
      setMealData({
        ...mealData,
        foods: [...mealData.foods, currentFood]
      });
      setCurrentFood({
        name: '',
        portion: '',
        calories: 0,
        category: ''
      });
    }
  };

  const handleRemoveFood = (index: number) => {
    setMealData({
      ...mealData,
      foods: mealData.foods.filter((_, i) => i !== index)
    });
  };

  const handleSymptomToggle = (symptom: string) => {
    setMealData({
      ...mealData,
      symptoms: mealData.symptoms.includes(symptom)
        ? mealData.symptoms.filter(s => s !== symptom)
        : [...mealData.symptoms, symptom]
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(mealData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Meal Type & Time */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Meal Type
          </label>
          <select
            value={mealData.type}
            onChange={(e) => setMealData({ ...mealData, type: e.target.value })}
            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            required
          >
            <option value="">Select type</option>
            {mealTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="time"
              value={mealData.time}
              onChange={(e) => setMealData({ ...mealData, time: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              required
            />
          </div>
        </div>
      </div>

      {/* Food Items */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-gray-900">Food Items</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            value={currentFood.name}
            onChange={(e) => setCurrentFood({ ...currentFood, name: e.target.value })}
            placeholder="Food name"
            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
          
          <input
            type="text"
            value={currentFood.portion}
            onChange={(e) => setCurrentFood({ ...currentFood, portion: e.target.value })}
            placeholder="Portion size"
            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <select
            value={currentFood.category}
            onChange={(e) => setCurrentFood({ ...currentFood, category: e.target.value })}
            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="">Select category</option>
            {foodCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <button
            type="button"
            onClick={handleAddFood}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Food</span>
          </button>
        </div>

        {/* Food List */}
        <div className="space-y-2">
          {mealData.foods.map((food, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div>
                <p className="font-medium text-gray-900">{food.name}</p>
                <p className="text-sm text-gray-600">{food.portion} - {food.category}</p>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveFood(index)}
                className="p-1 text-red-500 hover:bg-red-50 rounded-full transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Hunger & Fullness Scales */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hunger Level (1-10)
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={mealData.hunger}
            onChange={(e) => setMealData({ ...mealData, hunger: parseInt(e.target.value) })}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Not Hungry</span>
            <span>Very Hungry</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fullness Level (1-10)
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={mealData.fullness}
            onChange={(e) => setMealData({ ...mealData, fullness: parseInt(e.target.value) })}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Not Full</span>
            <span>Very Full</span>
          </div>
        </div>
      </div>

      {/* Mood Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mood After Eating
        </label>
        <div className="flex space-x-2">
          {moodOptions.map(mood => (
            <button
              key={mood}
              type="button"
              onClick={() => setMealData({ ...mealData, mood })}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                mealData.mood === mood
                  ? 'bg-primary-100 text-primary-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {mood}
            </button>
          ))}
        </div>
      </div>

      {/* Symptoms */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Symptoms (if any)
        </label>
        <div className="grid grid-cols-2 gap-2">
          {commonSymptoms.map(symptom => (
            <button
              key={symptom}
              type="button"
              onClick={() => handleSymptomToggle(symptom)}
              className={`p-2 rounded-lg text-sm font-medium text-left ${
                mealData.symptoms.includes(symptom)
                  ? 'bg-red-100 text-red-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {symptom}
            </button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Notes
        </label>
        <textarea
          value={mealData.notes}
          onChange={(e) => setMealData({ ...mealData, notes: e.target.value })}
          placeholder="Add any additional notes..."
          className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          rows={3}
        />
      </div>

      {/* Photo Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Add Photos
        </label>
        <div className="flex items-center justify-center w-full">
          <label className="w-full flex flex-col items-center px-4 py-6 bg-white text-emerald-500 rounded-lg tracking-wide border border-emerald-500 border-dashed cursor-pointer hover:bg-emerald-50 transition-colors">
            <Camera className="h-8 w-8" />
            <span className="mt-2 text-sm">Upload meal photos</span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              onChange={(e) => {
                // Handle photo upload
              }}
            />
          </label>
        </div>
      </div>

      {/* Submit Buttons */}
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
          className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
        >
          Save Meal Log
        </button>
      </div>
    </form>
  );
}