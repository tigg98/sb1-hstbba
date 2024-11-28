import React, { useState } from 'react';
import { X, Camera, Map, AlertCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAcneLogged?: (data: AcneLogData) => void;
}

export interface AcneLogData {
  severity: 'mild' | 'moderate' | 'severe';
  areas: string[];
  notes: string;
  photos?: string[];
  date: string;
  skincare: string[];
  triggers?: string[];
}

export default function AcneLogModal({ isOpen, onClose, onAcneLogged }: Props) {
  const [logData, setLogData] = useState<AcneLogData>({
    severity: 'mild',
    areas: [],
    notes: '',
    skincare: [],
    date: new Date().toISOString().split('T')[0],
    triggers: []
  });

  const areas = [
    'Face - Forehead',
    'Face - Cheeks',
    'Face - Chin',
    'Face - Jawline',
    'Back',
    'Chest',
    'Shoulders'
  ];

  const commonTriggers = [
    'Dairy',
    'Sugar',
    'Stress',
    'Poor Sleep',
    'Hormonal Changes',
    'New Product'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAcneLogged?.(logData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-25">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <h2 className="text-xl font-semibold text-gray-900">Log Acne Activity</h2>
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
                Severity
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['mild', 'moderate', 'severe'].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setLogData({ ...logData, severity: level as any })}
                    className={`p-2 rounded-lg text-sm font-medium capitalize ${
                      logData.severity === level
                        ? 'bg-red-100 text-red-700'
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
                Affected Areas
              </label>
              <div className="grid grid-cols-2 gap-2">
                {areas.map((area) => (
                  <button
                    key={area}
                    type="button"
                    onClick={() => setLogData({
                      ...logData,
                      areas: logData.areas.includes(area)
                        ? logData.areas.filter(a => a !== area)
                        : [...logData.areas, area]
                    })}
                    className={`p-2 rounded-lg text-sm font-medium text-left ${
                      logData.areas.includes(area)
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Potential Triggers
              </label>
              <div className="grid grid-cols-2 gap-2">
                {commonTriggers.map((trigger) => (
                  <button
                    key={trigger}
                    type="button"
                    onClick={() => setLogData({
                      ...logData,
                      triggers: logData.triggers?.includes(trigger)
                        ? logData.triggers.filter(t => t !== trigger)
                        : [...(logData.triggers || []), trigger]
                    })}
                    className={`p-2 rounded-lg text-sm font-medium text-left ${
                      logData.triggers?.includes(trigger)
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {trigger}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                value={logData.notes}
                onChange={(e) => setLogData({ ...logData, notes: e.target.value })}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                rows={3}
                placeholder="Add any additional observations..."
              />
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
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Save Log
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}