import React from 'react';
import { Filter, Plus } from 'lucide-react';
import type { CategoryInfo } from '../../types/activity';

interface Props {
  categoryInfo: Record<string, CategoryInfo>;
  onLogActivity: (type: string) => void;
}

export default function ActivityLogHeader({ categoryInfo, onLogActivity }: Props) {
  return (
    <header className="flex items-center justify-between">
      <button
        className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
        aria-label="Filter activities"
      >
        <Filter className="h-5 w-5" />
      </button>
      <div className="flex space-x-2 bg-white rounded-xl shadow-sm p-2">
        {Object.entries(categoryInfo).map(([key, info]) => (
          <button
            key={key}
            onClick={() => onLogActivity(key)}
            className={`p-2 text-white rounded-lg bg-${info.bgColor} hover:bg-${info.hoverColor} transition-colors`}
            aria-label={`Add ${info.title}`}
          >
            <Plus className="h-4 w-4" />
          </button>
        ))}
      </div>
    </header>
  );
}