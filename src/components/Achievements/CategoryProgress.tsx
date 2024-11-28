import React from 'react';
import { Trophy } from 'lucide-react';

interface Category {
  name: string;
  progress: number;
  total: number;
  completed: number;
}

interface Props {
  categories: Category[];
}

export default function CategoryProgress({ categories }: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Achievement Categories</h2>
        <Trophy className="h-5 w-5 text-yellow-500" />
      </div>

      <div className="space-y-6">
        {categories.map((category, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-medium text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-600">
                  {category.completed} of {category.total} completed
                </p>
              </div>
              <span className="text-sm font-medium text-primary-600">
                {category.progress}%
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-500 rounded-full transition-all duration-500"
                style={{ width: `${category.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}