import React, { useState } from 'react';
import { X, Check, Filter } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  symptoms: string[];
  inflammationLevel: string[];
  activities: string[];
  mealTypes: string[];
}

export default function FilterModal({ isOpen, onClose, onApplyFilters }: Props) {
  const [selectedFilters, setSelectedFilters] = useState<FilterOptions>({
    symptoms: [],
    inflammationLevel: [],
    activities: [],
    mealTypes: []
  });

  const filterCategories = {
    symptoms: [
      'Bloating',
      'Abdominal Pain',
      'Nausea',
      'Fatigue',
      'Headache'
    ],
    inflammationLevel: [
      'Low',
      'Moderate',
      'High',
      'Severe'
    ],
    activities: [
      'Exercise',
      'Sleep',
      'Meditation',
      'Walking'
    ],
    mealTypes: [
      'Breakfast',
      'Lunch',
      'Dinner',
      'Snacks'
    ]
  };

  const toggleFilter = (category: keyof FilterOptions, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(v => v !== value)
        : [...prev[category], value]
    }));
  };

  const handleApply = () => {
    onApplyFilters(selectedFilters);
    onClose();
  };

  const clearFilters = () => {
    setSelectedFilters({
      symptoms: [],
      inflammationLevel: [],
      activities: [],
      mealTypes: []
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-25">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <h2 className="text-xl font-semibold text-gray-900">Filter Analytics</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {(Object.entries(filterCategories) as [keyof FilterOptions, string[]][]).map(([category, values]) => (
              <div key={category}>
                <h3 className="text-sm font-medium text-gray-900 mb-3 capitalize">
                  {category.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {values.map(value => (
                    <button
                      key={value}
                      onClick={() => toggleFilter(category, value)}
                      className={`flex items-center justify-between p-3 rounded-lg text-sm transition-colors ${
                        selectedFilters[category].includes(value)
                          ? 'bg-primary-50 text-primary-700 font-medium'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span>{value}</span>
                      {selectedFilters[category].includes(value) && (
                        <Check className="h-4 w-4 text-primary-500" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center p-6 border-t border-gray-100 bg-gray-50 rounded-b-xl">
            <button
              onClick={clearFilters}
              className="text-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              Clear All
            </button>
            <div className="flex items-center space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}