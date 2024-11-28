import React, { useState } from 'react';
import { 
  Activity, 
  TrendingUp, 
  Calendar, 
  AlertCircle, 
  Utensils, 
  Brain,
  Heart,
  Moon,
  Flame,
  ArrowRight,
  BarChart3,
  Filter,
  Wine,
  Droplet,
  Lightbulb
} from 'lucide-react';
import TimeRangeSelector from '../components/Analytics/TimeRangeSelector';
import FilterModal from '../components/Analytics/FilterModal';
import MetricCard from '../components/Analytics/MetricCard';
import InflammationAnalytics from '../components/Analytics/InflammationAnalytics';
import SleepAnalytics from '../components/Analytics/SleepAnalytics';
import StressAnalytics from '../components/Analytics/StressAnalytics';
import DietAnalytics from '../components/Analytics/DietAnalytics';
import ExerciseAnalytics from '../components/Analytics/ExerciseAnalytics';
import SkinAnalytics from '../components/Analytics/SkinAnalytics';
import WaterAnalytics from '../components/Analytics/WaterAnalytics';
import RecommendationsPanel from '../components/Analytics/RecommendationsPanel';
import RecommendationsSummary from '../components/Analytics/RecommendationsSummary';

type TimeRange = '7d' | '30d' | '90d' | '1y';
type MetricType = 'recommendations' | 'inflammation' | 'sleep' | 'stress' | 'diet' | 'exercise' | 'skin' | 'water';

export default function Analytics() {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [selectedMetric, setSelectedMetric] = useState<MetricType>('recommendations');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    symptoms: [],
    inflammationLevel: [],
    activities: [],
    mealTypes: []
  });

  const metrics = [
    {
      id: 'recommendations',
      name: 'Recommendations',
      icon: Lightbulb,
      color: 'yellow',
      value: 7,
      change: 3,
      trend: 'improving'
    },
    { 
      id: 'inflammation',
      name: 'Inflammation Score',
      icon: AlertCircle,
      color: 'red',
      value: 42,
      change: -15,
      trend: 'decreasing'
    },
    {
      id: 'sleep',
      name: 'Sleep Quality',
      icon: Moon,
      color: 'purple',
      value: 85,
      change: 8,
      trend: 'improving'
    },
    {
      id: 'stress',
      name: 'Stress Level',
      icon: Brain,
      color: 'orange',
      value: 38,
      change: -12,
      trend: 'decreasing'
    },
    {
      id: 'diet',
      name: 'Diet Score',
      icon: Utensils,
      color: 'green',
      value: 78,
      change: 5,
      trend: 'improving'
    },
    {
      id: 'exercise',
      name: 'Exercise Impact',
      icon: Activity,
      color: 'blue',
      value: 65,
      change: 10,
      trend: 'improving'
    },
    {
      id: 'skin',
      name: 'Skin Health',
      icon: Heart,
      color: 'pink',
      value: 72,
      change: 15,
      trend: 'improving'
    },
    {
      id: 'water',
      name: 'Water Quality',
      icon: Droplet,
      color: 'blue',
      value: 88,
      change: 5,
      trend: 'improving'
    }
  ];

  const timeRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '1y', label: '1 Year' }
  ];

  const handleApplyFilters = (filters: any) => {
    setActiveFilters(filters);
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).reduce((count, filters) => count + filters.length, 0);
  };

  const renderAnalytics = () => {
    switch (selectedMetric) {
      case 'recommendations':
        return <RecommendationsSummary />;
      case 'inflammation':
        return <InflammationAnalytics />;
      case 'sleep':
        return <SleepAnalytics />;
      case 'stress':
        return <StressAnalytics />;
      case 'diet':
        return <DietAnalytics />;
      case 'exercise':
        return <ExerciseAnalytics />;
      case 'skin':
        return <SkinAnalytics timeRange={timeRange} />;
      case 'water':
        return <WaterAnalytics timeRange={timeRange} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Health Insights</h1>
          <p className="text-gray-600">Advanced analysis and correlations</p>
        </div>
        <div className="flex items-center space-x-4">
          <TimeRangeSelector
            timeRanges={timeRanges}
            selectedRange={timeRange}
            onRangeChange={(range) => setTimeRange(range as TimeRange)}
          />
          <button 
            onClick={() => setIsFilterModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-white text-gray-600 rounded-lg shadow-sm hover:bg-gray-50 relative"
          >
            <Filter className="h-4 w-4" />
            <span>Filter</span>
            {getActiveFilterCount() > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary-500 text-white text-xs flex items-center justify-center rounded-full">
                {getActiveFilterCount()}
              </span>
            )}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => (
          <MetricCard
            key={metric.id}
            {...metric}
            isSelected={selectedMetric === metric.id}
            onClick={() => setSelectedMetric(metric.id as MetricType)}
          />
        ))}
      </div>

      <div className={`grid gap-6 ${
        selectedMetric === 'recommendations' 
          ? 'grid-cols-1' 
          : 'grid-cols-1 lg:grid-cols-3'
      }`}>
        <div className={selectedMetric === 'recommendations' ? 'w-full' : 'lg:col-span-2'}>
          {renderAnalytics()}
        </div>
        {selectedMetric !== 'recommendations' && (
          <div>
            <RecommendationsPanel metric={selectedMetric} />
          </div>
        )}
      </div>

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={handleApplyFilters}
      />
    </div>
  );
}