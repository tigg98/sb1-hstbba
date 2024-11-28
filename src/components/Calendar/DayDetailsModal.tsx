import React, { useRef } from 'react';
import { X, TrendingUp, TrendingDown, Minus, Utensils, Activity, Pill } from 'lucide-react';

interface DayDetails {
  date: Date;
  meals: number;
  exercise: {
    minutes: number;
    calories: number;
  };
  supplements: number;
  energyLevel: number;
  symptoms: {
    count: number;
    severity: 'low' | 'medium' | 'high';
  };
}

interface Props {
  selectedDate: Date;
  onClose: () => void;
  isOpen: boolean;
}

export default function DayDetailsModal({ selectedDate, onClose, isOpen }: Props) {
  const modalRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Mock data - in a real app, this would come from your data store
  const selectedDayDetails: DayDetails = {
    date: selectedDate,
    meals: 3,
    exercise: {
      minutes: 45,
      calories: 320,
    },
    supplements: 2,
    energyLevel: 75,
    symptoms: {
      count: 1,
      severity: 'low',
    },
  };

  const currentDayDetails: DayDetails = {
    date: new Date(),
    meals: 2,
    exercise: {
      minutes: 30,
      calories: 250,
    },
    supplements: 2,
    energyLevel: 80,
    symptoms: {
      count: 0,
      severity: 'low',
    },
  };

  const getComparisonIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="h-4 w-4 text-emerald-500" />;
    if (current < previous) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Minus className="h-4 w-4 text-gray-400" />;
  };

  const ComparisonRow = ({ 
    icon, 
    label, 
    selectedValue, 
    currentValue,
    unit = '',
  }: { 
    icon: React.ReactNode;
    label: string;
    selectedValue: number;
    currentValue: number;
    unit?: string;
  }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gray-50 rounded-lg">
          {icon}
        </div>
        <span className="text-gray-700">{label}</span>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="text-sm text-gray-600">Selected</p>
          <p className="font-medium">{selectedValue}{unit}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Today</p>
          <div className="flex items-center space-x-1">
            <p className="font-medium">{currentValue}{unit}</p>
            {getComparisonIcon(currentValue, selectedValue)}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-25" onClick={handleBackdropClick}>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div 
          ref={modalRef}
          className="relative bg-white rounded-xl shadow-xl w-full max-w-lg p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric'
                })}
              </h2>
              <p className="text-gray-600">Daily summary and comparison</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          <div className="space-y-1">
            <ComparisonRow
              icon={<Utensils className="h-5 w-5 text-emerald-500" />}
              label="Meals Logged"
              selectedValue={selectedDayDetails.meals}
              currentValue={currentDayDetails.meals}
            />
            
            <ComparisonRow
              icon={<Activity className="h-5 w-5 text-blue-500" />}
              label="Exercise Duration"
              selectedValue={selectedDayDetails.exercise.minutes}
              currentValue={currentDayDetails.exercise.minutes}
              unit="min"
            />
            
            <ComparisonRow
              icon={<Activity className="h-5 w-5 text-blue-500" />}
              label="Calories Burned"
              selectedValue={selectedDayDetails.exercise.calories}
              currentValue={currentDayDetails.exercise.calories}
              unit="cal"
            />
            
            <ComparisonRow
              icon={<Pill className="h-5 w-5 text-purple-500" />}
              label="Supplements Taken"
              selectedValue={selectedDayDetails.supplements}
              currentValue={currentDayDetails.supplements}
            />
            
            <ComparisonRow
              icon={<TrendingUp className="h-5 w-5 text-orange-500" />}
              label="Energy Level"
              selectedValue={selectedDayDetails.energyLevel}
              currentValue={currentDayDetails.energyLevel}
              unit="%"
            />
          </div>

          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Symptoms</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  selectedDayDetails.symptoms.count === 0
                    ? 'bg-emerald-50 text-emerald-600'
                    : 'bg-red-50 text-red-600'
                }`}>
                  {selectedDayDetails.symptoms.count} reported
                </span>
              </div>
              <button className="text-emerald-600 text-sm font-medium hover:text-emerald-700">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}