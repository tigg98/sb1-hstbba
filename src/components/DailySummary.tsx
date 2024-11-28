import React from 'react';
import { Activity, TrendingUp, Utensils, Pill } from 'lucide-react';

export default function DailySummary() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <SummaryCard
        icon={<Utensils className="h-6 w-6 text-primary-500" />}
        title="Meals Logged"
        value="3/5"
        subtitle="2 remaining today"
        color="primary"
      />
      <SummaryCard
        icon={<Activity className="h-6 w-6 text-secondary-500" />}
        title="Exercise"
        value="45 min"
        subtitle="320 calories burned"
        color="secondary"
      />
      <SummaryCard
        icon={<Pill className="h-6 w-6 text-purple-500" />}
        title="Supplements"
        value="2/3"
        subtitle="1 remaining today"
        color="purple"
      />
      <SummaryCard
        icon={<TrendingUp className="h-6 w-6 text-accent-400" />}
        title="Energy Level"
        value="Good"
        subtitle="15% above average"
        color="accent"
      />
    </div>
  );
}

function SummaryCard({
  icon,
  title,
  value,
  subtitle,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  color: 'primary' | 'secondary' | 'accent' | 'purple';
}) {
  const colorClasses = {
    primary: 'bg-primary-50 group-hover:bg-primary-100',
    secondary: 'bg-secondary-50 group-hover:bg-secondary-100',
    accent: 'bg-accent-50 group-hover:bg-accent-100',
    purple: 'bg-purple-50 group-hover:bg-purple-100',
  };

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6">
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-lg transition-colors ${colorClasses[color]}`}>
          {icon}
        </div>
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 tracking-tight">{value}</p>
          <p className="text-gray-500 text-sm">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}