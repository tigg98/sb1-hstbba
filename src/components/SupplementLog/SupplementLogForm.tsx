import React, { useState } from 'react';
import { Clock, Pill, AlertCircle } from 'lucide-react';

interface Props {
  onSubmit: (data: SupplementLogData) => void;
  onCancel: () => void;
}

export interface SupplementLogData {
  name: string;
  dosage: string;
  unit: string;
  time: string;
  withFood: boolean;
  brand?: string;
  notes?: string;
  batch?: string;
  expiryDate?: string;
}

export default function SupplementLogForm({ onSubmit, onCancel }: Props) {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [unit, setUnit] = useState('mg');
  const [time, setTime] = useState(
    new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
  );
  const [withFood, setWithFood] = useState(false);
  const [brand, setBrand] = useState('');
  const [notes, setNotes] = useState('');
  const [batch, setBatch] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: SupplementLogData = {
      name,
      dosage,
      unit,
      time,
      withFood,
      brand: brand || undefined,
      notes: notes || undefined,
      batch: batch || undefined,
      expiryDate: expiryDate || undefined
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Custom Supplement Name
          </label>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Enter supplement name"
            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            required
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
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
        <label className="block text-sm font-medium text-gray-700 mb-2">
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

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="showAdvanced"
          checked={showAdvanced}
          onChange={(e) => setShowAdvanced(e.target.checked)}
          className="rounded border-gray-300 text-purple-500 focus:ring-purple-500"
        />
        <label htmlFor="showAdvanced" className="text-sm text-gray-700">
          Show advanced options
        </label>
      </div>

      {showAdvanced && (
        <div className="space-y-4 p-4 bg-purple-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brand (Optional)
            </label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Enter brand name"
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Batch Number (Optional)
            </label>
            <input
              type="text"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              placeholder="Enter batch number"
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiry Date (Optional)
            </label>
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Notes (Optional)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add any additional notes..."
          className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          rows={3}
        />
      </div>

      <div className="bg-purple-50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-purple-500 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-purple-900">Supplement Tips</h4>
            <ul className="mt-1 space-y-1 text-sm text-purple-700">
              <li>• Take fat-soluble vitamins with meals</li>
              <li>• Space mineral supplements 2 hours apart</li>
              <li>• Consider timing for optimal absorption</li>
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
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          Save
        </button>
      </div>
    </form>
  );
}