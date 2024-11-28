import React, { useState } from 'react';
import { X, Wine, Clock, AlertCircle, Droplet } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAlcoholLogged?: (data: any) => void;
}

export default function AlcoholLogModal({ isOpen, onClose, onAlcoholLogged }: Props) {
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('oz');
  const [time, setTime] = useState(
    new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
  );
  const [withFood, setWithFood] = useState(false);

  const alcoholTypes = [
    { id: 'wine-red', name: 'Red Wine', abv: 13.5, inflammationRisk: 'moderate' },
    { id: 'wine-white', name: 'White Wine', abv: 12.5, inflammationRisk: 'moderate' },
    { id: 'beer', name: 'Beer', abv: 5, inflammationRisk: 'high' },
    { id: 'spirits', name: 'Spirits', abv: 40, inflammationRisk: 'high' },
    { id: 'cider', name: 'Cider', abv: 4.5, inflammationRisk: 'high' },
    { id: 'sake', name: 'Sake', abv: 15, inflammationRisk: 'moderate' }
  ];

  const units = [
    { value: 'oz', label: 'fl oz' },
    { value: 'ml', label: 'ml' },
    { value: 'glass', label: 'glass' }
  ];

  const getInflammationRisk = (alcoholType: string) => {
    const selected = alcoholTypes.find(t => t.id === alcoholType);
    return selected?.inflammationRisk || 'unknown';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedType = alcoholTypes.find(t => t.id === type);
    
    const data = {
      type,
      name: selectedType?.name,
      amount: Number(amount),
      unit,
      time,
      withFood,
      abv: selectedType?.abv,
      inflammationRisk: selectedType?.inflammationRisk
    };

    onAlcoholLogged?.(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-25">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <Wine className="h-5 w-5 text-red-500" />
              <h2 className="text-xl font-semibold text-gray-900">Log Alcohol</h2>
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
                Type of Alcohol
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              >
                <option value="">Select type</option>
                {alcoholTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name} ({type.abv}% ABV)
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount
                </label>
                <div className="relative">
                  <Droplet className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  {units.map(unit => (
                    <option key={unit.value} value={unit.value}>{unit.label}</option>
                  ))}
                </select>
              </div>
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
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                className="rounded border-gray-300 text-red-500 focus:ring-red-500"
              />
              <label htmlFor="withFood" className="text-sm text-gray-700">
                Consumed with food
              </label>
            </div>

            {type && (
              <div className={`p-4 rounded-lg ${
                getInflammationRisk(type) === 'high'
                  ? 'bg-red-50'
                  : 'bg-yellow-50'
              }`}>
                <div className="flex items-start space-x-3">
                  <AlertCircle className={`h-5 w-5 ${
                    getInflammationRisk(type) === 'high'
                      ? 'text-red-500'
                      : 'text-yellow-500'
                  }`} />
                  <div>
                    <h4 className={`text-sm font-medium ${
                      getInflammationRisk(type) === 'high'
                        ? 'text-red-800'
                        : 'text-yellow-800'
                    }`}>
                      Inflammation Risk: {getInflammationRisk(type)}
                    </h4>
                    <p className={`text-sm mt-1 ${
                      getInflammationRisk(type) === 'high'
                        ? 'text-red-700'
                        : 'text-yellow-700'
                    }`}>
                      {getInflammationRisk(type) === 'high'
                        ? 'May significantly increase inflammation. Consider limiting intake.'
                        : 'Moderate consumption may have less impact on inflammation when consumed with food.'}
                    </p>
                  </div>
                </div>
              </div>
            )}

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
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}