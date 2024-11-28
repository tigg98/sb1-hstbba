import React from 'react';
import { TrendingUp } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  id: string;
  name: string;
  icon: LucideIcon;
  color: string;
  value: number;
  change: number;
  isSelected: boolean;
  onClick: () => void;
}

export default function MetricCard({
  id,
  name,
  icon: Icon,
  color,
  value,
  change,
  isSelected,
  onClick
}: MetricCardProps) {
  return (
    <button
      onClick={onClick}
      className={`bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all ${
        isSelected ? `ring-2 ring-${color}-500` : ''
      }`}
    >
      <div className={`p-2 bg-${color}-50 rounded-lg w-fit mb-4`}>
        <Icon className={`h-5 w-5 text-${color}-500`} />
      </div>
      <h3 className="text-sm text-gray-600">{name}</h3>
      <div className="mt-1 flex items-center justify-between">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        <div className={`flex items-center space-x-1 text-${color}-600`}>
          <TrendingUp className={`h-4 w-4 ${
            change < 0 ? 'transform rotate-180' : ''
          }`} />
          <span className="text-sm font-medium">{Math.abs(change)}%</span>
        </div>
      </div>
    </button>
  );
}