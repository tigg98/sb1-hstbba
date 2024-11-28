import React from 'react';
import { Activity, TrendingUp, Utensils, Pill } from 'lucide-react';

interface Props {
  onQuickLog: () => void;
}

export default function DailySummaryWidget({ onQuickLog }: Props) {
  return (
    <section 
      className="grid grid-cols-1 md:grid-cols-4 gap-6"
      aria-label="Daily health summary"
    >
      <SummaryCard
        icon={<Utensils className="h-6 w-6 text-primary-500" aria-hidden="true" />}
        title="Meals Logged"
        value="3/5"
        subtitle="2 remaining today"
        color="primary"
        trend={{
          value: 60,
          label: 'completion rate'
        }}
        onClick={onQuickLog}
      />
      <SummaryCard
        icon={<Activity className="h-6 w-6 text-secondary-500" aria-hidden="true" />}
        title="Exercise"
        value="45 min"
        subtitle="320 calories burned"
        color="secondary"
        trend={{
          value: 85,
          label: 'of daily goal'
        }}
        onClick={onQuickLog}
      />
      <SummaryCard
        icon={<Pill className="h-6 w-6 text-purple-500" aria-hidden="true" />}
        title="Supplements"
        value="2/3"
        subtitle="1 remaining today"
        color="purple"
        trend={{
          value: 67,
          label: 'completion rate'
        }}
        onClick={onQuickLog}
      />
      <SummaryCard
        icon={<TrendingUp className="h-6 w-6 text-accent-400" aria-hidden="true" />}
        title="Energy Level"
        value="Good"
        subtitle="15% above average"
        color="accent"
        trend={{
          value: 15,
          label: 'increase from yesterday',
          isPositive: true
        }}
        onClick={onQuickLog}
      />
    </section>
  );
}

interface SummaryCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  color: 'primary' | 'secondary' | 'accent' | 'purple';
  trend: {
    value: number;
    label: string;
    isPositive?: boolean;
  };
  onClick: () => void;
}

function SummaryCard({
  icon,
  title,
  value,
  subtitle,
  color,
  trend,
  onClick
}: SummaryCardProps) {
  const colorClasses = {
    primary: 'bg-primary-50 group-hover:bg-primary-100',
    secondary: 'bg-secondary-50 group-hover:bg-secondary-100',
    accent: 'bg-accent-50 group-hover:bg-accent-100',
    purple: 'bg-purple-50 group-hover:bg-purple-100',
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <article 
      className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 cursor-pointer"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyPress={handleKeyPress}
      aria-label={`${title} summary - Click to log`}
    >
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-lg transition-colors ${colorClasses[color]}`}>
          {icon}
        </div>
        <div>
          <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
          <div className="flex items-baseline space-x-2">
            <p 
              className="text-2xl font-bold text-gray-900 tracking-tight"
              aria-label={`${value} ${title.toLowerCase()}`}
            >
              {value}
            </p>
            {trend && (
              <span 
                className={`text-sm ${trend.isPositive ? 'text-green-600' : 'text-gray-500'}`}
                aria-label={`${trend.value}% ${trend.label}`}
              >
                {trend.isPositive && '+'}{trend.value}%
              </span>
            )}
          </div>
          <p 
            className="text-gray-500 text-sm"
            aria-label={subtitle}
          >
            {subtitle}
          </p>
        </div>
      </div>
    </article>
  );
}