import React, { useState } from 'react';
import { Clock, Pill } from 'lucide-react';

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

export default function SupplementForm({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('');
  const [customName, setCustomName] = useState('');
  const [dosage, setDosage] = useState('');
  const [unit, setUnit] = useState('mg');
  const [time, setTime] = useState(
    new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle supplement submission
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Supplement Name
        </label>
        <select
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors"
      >
        Save Supplement
      </button>
    </form>
  );
}