import React, { useState } from 'react';
import { Plus, Star, AlertCircle, Check } from 'lucide-react';

interface Product {
  name: string;
  type: string;
  ingredients: string[];
  rating: number;
  notes: string;
  gutFriendly: boolean;
}

export default function SkincareRoutine() {
  const [products, setProducts] = useState<Product[]>([
    {
      name: 'Probiotic Cleanser',
      type: 'Cleanser',
      ingredients: ['Probiotics', 'Green Tea', 'Aloe Vera'],
      rating: 4,
      notes: 'Gentle, helps balance skin microbiome',
      gutFriendly: true
    },
    {
      name: 'Barrier Repair Moisturizer',
      type: 'Moisturizer',
      ingredients: ['Ceramides', 'Hyaluronic Acid', 'Niacinamide'],
      rating: 5,
      notes: 'Great for sensitive skin',
      gutFriendly: true
    }
  ]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Skincare Routine</h2>
          <p className="text-sm text-gray-600">Gut-friendly products</p>
        </div>
        <button className="flex items-center space-x-2 px-3 py-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Add Product</span>
        </button>
      </div>

      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={index} className="p-4 border border-gray-100 rounded-lg">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.type}</p>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium text-gray-700">
                  {product.rating}/5
                </span>
              </div>
            </div>

            <div className="mt-2 flex flex-wrap gap-2">
              {product.ingredients.map((ingredient, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                >
                  {ingredient}
                </span>
              ))}
            </div>

            {product.gutFriendly && (
              <div className="mt-3 flex items-center space-x-2">
                <div className="p-1 bg-green-100 rounded-full">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <span className="text-sm text-green-700">Gut-friendly formula</span>
              </div>
            )}

            <p className="mt-2 text-sm text-gray-600">{product.notes}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-yellow-900">Product Tips</h4>
            <p className="text-sm text-yellow-700 mt-1">
              Look for products with probiotics and anti-inflammatory ingredients to support both skin and gut health.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}