import React, { useState, useRef } from 'react';
import { X, Clock, Pill } from 'lucide-react';

const commonSupplements = [
  'Vitamin D',
  'Vitamin B12',
  'Magnesium',
  'Iron',
  'Calcium',
  'Zinc',
  'Probiotics',
  'Fish Oil',
  'Multivitamin',
  'Other'
];

const dosageUnits = ['mg', 'mcg', 'g', 'IU', 'capsule(s)', 'tablet(s)', 'serving(s)'];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSupplementLogged?: (supplement: any) => void;
}

export default function SupplementLogModal({ isOpen, onClose, onSupplementLogged }: Props) {
  const [name, setName] = useState('');
  const [customName, setCustomName] = useState('');
  const [dosage, setDosage] = useState('');
  const [unit, setUnit] = useState('mg');
  const [time, setTime] = useState(
    new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
  );
  const [withFood, setWithFood] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const supplement = {
      name: name === 'Other' ? customName : name,
      dosage: `${dosage} ${unit}`,
      time,
      withFood,
    };
    onSupplementLogged?.(supplement);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-25" onClick={handleBackdropClick}>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div 
          ref={modalRef}
          className="relative bg-white rounded-xl shadow-xl w-full max-w-md"
        >
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <Pill className="h-5 w-5 text-purple-500" />
              <h2 className="text-xl font-semibold text-gray-900">Log Supplement</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Supplement Name
              </label>
              <select
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              >
                <option value="">Select supplement</option>
                {commonSupplements.map(supplement => (
                  <option key={supplement} value={supplement}>{supplement}</option>
                ))}
              </select>
            </div>

            {name === 'Other' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Custom Supplement Name
                </label>
                <input
                  type="text"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="Enter supplement name"
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dosage
                </label>
                <div className="relative">
                  <Pill className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    placeholder="Amount"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Unit
                </label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {dosageUnits.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Time Taken
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="withFood"
                checked={withFood}
                onChange={(e) => setWithFood(e.target.checked)}
                className="rounded border-gray-300 text-purple-500 focus:ring-purple-500"
              />
              <label htmlFor="withFood" className="text-sm text-gray-700">
                Taken with food
              </label>
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Save Supplement
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}