import React from 'react';
import { ArrowRight } from 'lucide-react';

interface QuickAction {
  label: string;
  color: string;
  onClick: () => void;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

export default function QuickActions({ actions }: QuickActionsProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="space-y-3">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`w-full flex items-center justify-between p-3 text-left bg-${action.color}-50 text-${action.color}-700 rounded-lg hover:bg-${action.color}-100 transition-colors`}
          >
            <span>{action.label}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        ))}
      </div>
    </div>
  );
}