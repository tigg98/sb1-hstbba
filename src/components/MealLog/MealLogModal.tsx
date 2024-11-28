import React from 'react';
import { X, Utensils } from 'lucide-react';
import MealLogForm, { MealLogData } from './MealLogForm';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onMealLogged?: (meal: MealLogData) => void;
}

export default function MealLogModal({ isOpen, onClose, onMealLogged }: Props) {
  if (!isOpen) return null;

  const handleSubmit = (data: MealLogData) => {
    onMealLogged?.(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-25">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <Utensils className="h-5 w-5 text-emerald-500" />
              <h2 className="text-xl font-semibold text-gray-900">Log Meal</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          <div className="p-6">
            <MealLogForm onSubmit={handleSubmit} onCancel={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
}