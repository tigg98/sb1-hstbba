import React from 'react';
import { X, Activity } from 'lucide-react';
import ExerciseLogForm, { ExerciseData } from './ExerciseLogForm';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onExerciseLogged?: (exercise: ExerciseData) => void;
}

export default function ExerciseLogModal({ isOpen, onClose, onExerciseLogged }: Props) {
  if (!isOpen) return null;

  const handleSubmit = (data: ExerciseData) => {
    onExerciseLogged?.(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-25">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900">Log Exercise</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          <div className="p-6">
            <ExerciseLogForm onSubmit={handleSubmit} onCancel={onClose} />
          </div>
        </div>
      </div>
    </div>
  );
}