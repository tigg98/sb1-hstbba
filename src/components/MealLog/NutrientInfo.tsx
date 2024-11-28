import React from 'react';
import { Circle } from 'lucide-react';

interface Props {
  selectedFoods: any[];
}

export default function NutrientInfo({ selectedFoods }: Props) {
  const calculateNutrients = () => {
    // This would normally calculate based on a food database
    // Showing example calculation
    return {
      protein: { amount: 15, unit: 'g', daily: 25 },
      fiber: { amount: 8, unit: 'g', daily: 32 },
      vitaminD: { amount: 120, unit: 'IU', daily: 20 },
      iron: { amount: 3.5, unit: 'mg', daily: 19 },
      calcium: { amount: 250, unit: 'mg', daily: 25 }
    };
  };

  const nutrients = calculateNutrients();

  return (
    <div className="space-y-4">
      <h4 className="font-medium text-gray-900">Nutrient Content</h4>
      
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(nutrients).map(([name, data]) => (
          <div key={name} className="flex items-center space-x-2">
            <Circle className="h-2 w-2 text-primary-500" />
            <div>
              <p className="text-sm font-medium text-gray-900 capitalize">
                {name.replace(/([A-Z])/g, ' $1').trim()}
              </p>
              <p className="text-sm text-gray-600">
                {data.amount}{data.unit} ({data.daily}% daily value)
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}