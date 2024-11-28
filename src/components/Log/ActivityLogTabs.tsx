import React from 'react';
import { Activity, Utensils, Pill, Droplet, Heart, Wine, Brain } from 'lucide-react';
import type { ActivityType } from '../../types/activity';

interface Props {
  activeTab: ActivityType;
  onTabChange: (tab: ActivityType) => void;
}

export default function ActivityLogTabs({ activeTab, onTabChange }: Props) {
  const tabs = [
    { id: 'all', label: 'All Activities', Icon: Activity },
    { id: 'meals', label: 'Meals', Icon: Utensils },
    { id: 'exercise', label: 'Exercise', Icon: Activity },
    { id: 'supplements', label: 'Supplements', Icon: Pill },
    { id: 'water', label: 'Water', Icon: Droplet },
    { id: 'skin', label: 'Skin Health', Icon: Heart },
    { id: 'alcohol', label: 'Alcohol', Icon: Wine },
    { id: 'mood', label: 'Mood', Icon: Brain }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="flex p-1 overflow-x-auto">
        {tabs.map((tab) => {
          const TabIcon = tab.Icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id as ActivityType)}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <TabIcon className="h-4 w-4 mr-2" />
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}