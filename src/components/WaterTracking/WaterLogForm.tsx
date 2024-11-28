import React, { useState } from 'react';
import { Droplet, Clock, AlertCircle, MapPin } from 'lucide-react';

interface Props {
  onSubmit: (data: WaterLogData) => void;
  onCancel: () => void;
}

export interface WaterLogData {
  amount: number;
  source: string;
  time: string;
  location?: string;
  notes?: string;
  quality?: {
    ph?: number;
    minerals?: string;
    chlorine?: string;
  };
}

export default function WaterLogForm({ onSubmit, onCancel }: Props) {
  const [amount, setAmount] = useState('');
  const [source, setSource] = useState('');
  const [time, setTime] = useState(
    new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
  );
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [showQualityMetrics, setShowQualityMetrics] = useState(false);
  const [ph, setPh] = useState('');
  const [minerals, setMinerals] = useState('');
  const [chlorine, setChlorine] = useState('');

  const waterSources = [
    'Tap Water',
    'Filtered Water',
    'Bottled Water',
    'Spring Water',
    'Mineral Water',
    'Alkaline Water',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: WaterLogData = {
      amount: parseInt(amount),
      source,
      time,
      location: location || undefined,
      notes: notes || undefined,
      quality: showQualityMetrics ? {
        ph: ph ? parseFloat(ph) : undefined,
        minerals: minerals || undefined,
        chlorine: chlorine || undefined
      } : undefined
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Amount (ml)
        </label>
        <div className="relative">
          <Droplet className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="250"
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            min="0"
            step="50"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Water Source
        </label>
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        >
          <option value="">Select source</option>
          {waterSources.map(source => (
            <option key={source} value={source}>{source}</option>
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
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location (Optional)
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Home, Office, etc."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Notes (Optional)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add any additional notes..."
          className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={3}
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="qualityMetrics"
          checked={showQualityMetrics}
          onChange={(e) => setShowQualityMetrics(e.target.checked)}
          className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
        />
        <label htmlFor="qualityMetrics" className="text-sm text-gray-700">
          Add water quality metrics
        </label>
      </div>

      {showQualityMetrics && (
        <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              pH Level
            </label>
            <input
              type="number"
              value={ph}
              onChange={(e) => setPh(e.target.value)}
              placeholder="7.0"
              step="0.1"
              min="0"
              max="14"
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mineral Content
            </label>
            <input
              type="text"
              value={minerals}
              onChange={(e) => setMinerals(e.target.value)}
              placeholder="e.g., 150 TDS"
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Chlorine Level
            </label>
            <input
              type="text"
              value={chlorine}
              onChange={(e) => setChlorine(e.target.value)}
              placeholder="e.g., 0.5 mg/L"
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-900">Water Quality Tips</h4>
            <p className="text-sm text-blue-700 mt-1">
              Different water sources can affect gut health. Track your water source to identify potential correlations with symptoms.
            </p>
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
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Save
        </button>
      </div>
    </form>
  );
}