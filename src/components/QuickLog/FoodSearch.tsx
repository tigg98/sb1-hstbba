import React, { useState } from 'react';
import { Search, Plus, X } from 'lucide-react';

interface ServingSize {
  size: string;
  grams: number;
  calories: number;
}

interface Food {
  id: number;
  name: string;
  brand: string;
  calories: number;
  defaultServing: string;
  servingSizes: ServingSize[];
}

interface Props {
  onFoodLogged?: (foodData: any) => void;
}

const mockFoods = [
  { 
    id: 1, 
    name: "Quaker Oatmeal", 
    brand: "Quaker", 
    calories: 150, 
    defaultServing: "1 packet (43g)",
    servingSizes: [
      { size: "1 packet", grams: 43, calories: 150 },
      { size: "1/2 cup dry", grams: 40, calories: 140 },
      { size: "1 cup cooked", grams: 234, calories: 145 }
    ]
  },
  { 
    id: 2, 
    name: "Greek Yogurt", 
    brand: "Chobani", 
    calories: 120, 
    defaultServing: "1 container (150g)",
    servingSizes: [
      { size: "1 container", grams: 150, calories: 120 },
      { size: "1/2 cup", grams: 113, calories: 90 },
      { size: "1 cup", grams: 225, calories: 180 }
    ]
  },
  { 
    id: 3, 
    name: "Protein Bar", 
    brand: "KIND", 
    calories: 180, 
    defaultServing: "1 bar (40g)",
    servingSizes: [
      { size: "1 bar", grams: 40, calories: 180 },
      { size: "1/2 bar", grams: 20, calories: 90 }
    ]
  }
];

export default function FoodSearch({ onFoodLogged }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(mockFoods);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [selectedServing, setSelectedServing] = useState<ServingSize | null>(null);
  const [customAmount, setCustomAmount] = useState<number>(1);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    const filtered = mockFoods.filter(food => 
      food.name.toLowerCase().includes(value.toLowerCase()) ||
      food.brand.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filtered);
  };

  const handleFoodSelect = (food: Food) => {
    setSelectedFood(food);
    setSelectedServing(food.servingSizes[0]);
    setCustomAmount(1);
  };

  const getTotalCalories = () => {
    if (!selectedServing) return 0;
    return Math.round(selectedServing.calories * customAmount);
  };

  const handleAddFood = () => {
    if (!selectedFood || !selectedServing) return;

    const foodData = {
      id: selectedFood.id,
      name: selectedFood.name,
      brand: selectedFood.brand,
      calories: getTotalCalories(),
      serving: {
        size: selectedServing.size,
        amount: customAmount,
        unit: 'serving'
      }
    };

    onFoodLogged?.(foodData);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search foods..."
          value={query}
          onChange={handleSearch}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        />
      </div>

      <div className="space-y-2">
        {!selectedFood ? (
          results.map(food => (
            <button
              key={food.id}
              onClick={() => handleFoodSelect(food)}
              className="w-full flex items-start p-4 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200"
            >
              <div className="flex-1">
                <p className="font-medium text-gray-900">{food.name}</p>
                <p className="text-sm text-gray-600">{food.brand}</p>
                <div className="flex items-center space-x-2 mt-1 text-sm text-gray-500">
                  <span>{food.calories} cal</span>
                  <span>•</span>
                  <span>{food.defaultServing}</span>
                </div>
              </div>
            </button>
          ))
        ) : (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-medium text-gray-900">{selectedFood.name}</h3>
                <p className="text-sm text-gray-600">{selectedFood.brand}</p>
              </div>
              <button
                onClick={() => setSelectedFood(null)}
                className="p-2 text-gray-400 hover:text-gray-500 rounded-lg"
                aria-label="Clear selection"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Serving Size
                </label>
                <select
                  value={selectedServing?.size}
                  onChange={(e) => {
                    const serving = selectedFood.servingSizes.find(s => s.size === e.target.value);
                    if (serving) setSelectedServing(serving);
                  }}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  {selectedFood.servingSizes.map((serving, index) => (
                    <option key={index} value={serving.size}>
                      {serving.size} ({serving.grams}g)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Servings
                </label>
                <input
                  type="number"
                  min="0.25"
                  step="0.25"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(Number(e.target.value))}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="text-sm font-medium text-gray-900">Total Calories:</span>
                <span className="text-lg font-bold text-emerald-600">{getTotalCalories()} cal</span>
              </div>

              <button
                type="button"
                onClick={handleAddFood}
                className="w-full p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                aria-label="Add food to log"
              >
                <Plus className="h-5 w-5 mx-auto" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}