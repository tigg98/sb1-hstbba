import React, { useState } from 'react';
import { Wine, Clock, AlertCircle, Droplet } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function AlcoholForm({ onClose }: Props) {
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

    // Handle the alcohol log data
    console.log('Logged alcohol:', data);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              placeholder="Amount"
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

      <button
        type="submit"
        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
      >
        Save Alcohol Log
      </button>
    </form>
  );
}