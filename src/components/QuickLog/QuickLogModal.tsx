import React, { useState } from 'react';
import { X, Utensils, Activity, Scan, Pill, Wine } from 'lucide-react';
import FoodSearch from './FoodSearch';
import ExerciseForm from './ExerciseForm';
import BarcodeScanner from './BarcodeScanner';
import SupplementForm from './SupplementForm';
import AlcoholForm from './AlcoholForm';

type LogType = 'meal' | 'exercise' | 'supplement' | 'alcohol';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onMealLogged?: (meal: any) => void;
  initialTab?: LogType;
}

export default function QuickLogModal({ isOpen, onClose, initialTab = 'meal', onMealLogged }: Props) {
  const [logType, setLogType] = useState<LogType>(initialTab);
  const [showScanner, setShowScanner] = useState(false);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleMealLogged = (mealData: any) => {
    onMealLogged?.(mealData);
    onClose();
  };

  const tabs = [
    { id: 'meal' as LogType, icon: Utensils, label: 'Meal', color: 'emerald' },
    { id: 'exercise' as LogType, icon: Activity, label: 'Exercise', color: 'blue' },
    { id: 'supplement' as LogType, icon: Pill, label: 'Supplement', color: 'purple' },
    { id: 'alcohol' as LogType, icon: Wine, label: 'Alcohol', color: 'red' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-25" onClick={handleBackdropClick}>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md">
          <div className="flex justify-end p-2">
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          <div className="px-6 pb-6">
            <div className="grid grid-cols-4 gap-2 mb-6">
              {tabs.map(tab => {
                const Icon = tab.icon;
                const isActive = logType === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setLogType(tab.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? `bg-${tab.color}-50 text-${tab.color}-600 ring-2 ring-${tab.color}-500`
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className={`h-5 w-5 mb-1 ${isActive ? `text-${tab.color}-500` : ''}`} />
                    <span className="text-xs font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="space-y-6">
              {logType === 'meal' && !showScanner && (
                <>
                  <FoodSearch onFoodLogged={handleMealLogged} />
                  <button
                    onClick={() => setShowScanner(true)}
                    className="w-full p-2 text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label="Scan barcode"
                  >
                    <Scan className="h-5 w-5 mx-auto" />
                  </button>
                </>
              )}

              {logType === 'meal' && showScanner && (
                <BarcodeScanner onClose={() => setShowScanner(false)} />
              )}

              {logType === 'exercise' && <ExerciseForm onClose={onClose} />}
              
              {logType === 'supplement' && <SupplementForm onClose={onClose} />}

              {logType === 'alcohol' && <AlcoholForm onClose={onClose} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}