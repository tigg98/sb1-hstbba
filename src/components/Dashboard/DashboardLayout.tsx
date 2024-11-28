import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import DailyTipsWidget from './widgets/DailyTipsWidget';
import DailySummaryWidget from './widgets/DailySummaryWidget';
import ActivityLogWidget from './widgets/ActivityLogWidget';
import ExerciseWidget from './widgets/ExerciseWidget';
import EnergyChartWidget from './widgets/EnergyChartWidget';
import WaterIntakeWidget from './widgets/WaterIntakeWidget';
import SkinHealthWidget from './widgets/SkinHealthWidget';
import GutSkinCorrelationWidget from './widgets/GutSkinCorrelationWidget';
import NutrientTrackerWidget from './widgets/NutrientTrackerWidget';
import SleepQualityWidget from './widgets/SleepQualityWidget';
import StressLevelsWidget from './widgets/StressLevelsWidget';
import SymptomTimelineWidget from './widgets/SymptomTimelineWidget';
import MedicationScheduleWidget from './widgets/MedicationScheduleWidget';
import MoodTrackerWidget from './widgets/MoodTrackerWidget';
import WidgetManager from './WidgetManager';
import QuickLogModal from '../QuickLog/QuickLogModal';
import WaterLogModal from '../WaterTracking/WaterLogModal';
import MoodLogModal from '../MoodLog/MoodLogModal';
import AcneLogModal from '../AcneTracking/AcneLogModal';
import WidgetDetailsModal from './WidgetDetailsModal';

interface Props {
  onPageChange: (page: string) => void;
}

type WidgetType = 'dailyTips' | 'dailySummary' | 'activityLog' | 'exercise' | 'energyChart' | 
                  'waterIntake' | 'skinHealth' | 'gutSkinCorrelation' | 'nutrientTracker' | 
                  'sleepQuality' | 'stressLevels' | 'symptomTimeline' | 'medicationSchedule' | 
                  'moodTracker';

export default function DashboardLayout({ onPageChange }: Props) {
  const [isWidgetManagerOpen, setIsWidgetManagerOpen] = useState(false);
  const [isQuickLogOpen, setIsQuickLogOpen] = useState(false);
  const [isWaterLogOpen, setIsWaterLogOpen] = useState(false);
  const [isMoodLogOpen, setIsMoodLogOpen] = useState(false);
  const [isAcneLogOpen, setIsAcneLogOpen] = useState(false);
  const [expandedWidget, setExpandedWidget] = useState<WidgetType | null>(null);

  const [activeWidgets, setActiveWidgets] = useState([
    'dailyTips',
    'dailySummary',
    'activityLog',
    'exercise',
    'energyChart',
    'waterIntake',
    'skinHealth',
    'gutSkinCorrelation',
    'nutrientTracker',
    'sleepQuality',
    'stressLevels',
    'symptomTimeline',
    'medicationSchedule',
    'moodTracker'
  ]);

  const handleWaterLog = () => {
    setIsWaterLogOpen(true);
  };

  const handleMoodLog = () => {
    setIsMoodLogOpen(true);
  };

  const handleAcneLog = () => {
    setIsAcneLogOpen(true);
  };

  const handleQuickLog = () => {
    setIsQuickLogOpen(true);
  };

  const handleExpandWidget = (widgetId: WidgetType) => {
    setExpandedWidget(widgetId);
  };

  const renderWidget = (widgetId: string) => {
    const props = {
      onExpand: () => handleExpandWidget(widgetId as WidgetType),
      isExpanded: expandedWidget === widgetId
    };

    switch (widgetId) {
      case 'dailyTips':
        return <DailyTipsWidget {...props} />;
      case 'dailySummary':
        return <DailySummaryWidget onQuickLog={handleQuickLog} {...props} />;
      case 'activityLog':
        return <ActivityLogWidget onPageChange={onPageChange} onQuickLog={handleQuickLog} {...props} />;
      case 'exercise':
        return <ExerciseWidget onPageChange={onPageChange} {...props} />;
      case 'energyChart':
        return <EnergyChartWidget {...props} />;
      case 'waterIntake':
        return <WaterIntakeWidget onLogWater={handleWaterLog} {...props} />;
      case 'skinHealth':
        return <SkinHealthWidget onLogAcne={handleAcneLog} {...props} />;
      case 'gutSkinCorrelation':
        return <GutSkinCorrelationWidget {...props} />;
      case 'nutrientTracker':
        return <NutrientTrackerWidget {...props} />;
      case 'sleepQuality':
        return <SleepQualityWidget {...props} />;
      case 'stressLevels':
        return <StressLevelsWidget {...props} />;
      case 'symptomTimeline':
        return <SymptomTimelineWidget onQuickLog={handleQuickLog} {...props} />;
      case 'medicationSchedule':
        return <MedicationScheduleWidget {...props} />;
      case 'moodTracker':
        return <MoodTrackerWidget onLogMood={handleMoodLog} {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-gray-900">Health Dashboard</h1>
            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
              Medically Reviewed
            </span>
          </div>
          <p className="text-gray-600">Track your symptoms, meals, and wellness journey</p>
        </div>
        <button
          onClick={() => setIsWidgetManagerOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          <Settings className="h-5 w-5" />
          <span>Customize Dashboard</span>
        </button>
      </header>

      {/* Critical Health Information */}
      <div className="space-y-6">
        {activeWidgets.includes('dailyTips') && (
          <div className="w-full">{renderWidget('dailyTips')}</div>
        )}
        {activeWidgets.includes('dailySummary') && (
          <div className="w-full">{renderWidget('dailySummary')}</div>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Activity & Exercise */}
        <div className="lg:col-span-2 space-y-6">
          {activeWidgets.includes('activityLog') && renderWidget('activityLog')}
          {activeWidgets.includes('exercise') && renderWidget('exercise')}
          {activeWidgets.includes('symptomTimeline') && renderWidget('symptomTimeline')}
        </div>

        {/* Right Column - Quick Stats */}
        <div className="space-y-6">
          {activeWidgets.includes('moodTracker') && renderWidget('moodTracker')}
          {activeWidgets.includes('stressLevels') && renderWidget('stressLevels')}
          {activeWidgets.includes('medicationSchedule') && renderWidget('medicationSchedule')}
        </div>
      </div>

      {/* Monitoring Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {activeWidgets.includes('energyChart') && (
          <div className="lg:col-span-2">{renderWidget('energyChart')}</div>
        )}
        {activeWidgets.includes('waterIntake') && (
          <div className="lg:col-span-1">{renderWidget('waterIntake')}</div>
        )}
        {activeWidgets.includes('nutrientTracker') && (
          <div className="lg:col-span-1">{renderWidget('nutrientTracker')}</div>
        )}
      </div>

      {/* Health Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {activeWidgets.includes('sleepQuality') && (
          <div className="lg:col-span-1">{renderWidget('sleepQuality')}</div>
        )}
        {activeWidgets.includes('skinHealth') && (
          <div className="lg:col-span-1">{renderWidget('skinHealth')}</div>
        )}
        {activeWidgets.includes('gutSkinCorrelation') && (
          <div className="lg:col-span-2">{renderWidget('gutSkinCorrelation')}</div>
        )}
      </div>

      {/* Modals */}
      <WidgetManager
        isOpen={isWidgetManagerOpen}
        onClose={() => setIsWidgetManagerOpen(false)}
        widgets={activeWidgets}
        onWidgetToggle={(widgetId) => {
          setActiveWidgets(prev => 
            prev.includes(widgetId) 
              ? prev.filter(id => id !== widgetId)
              : [...prev, widgetId]
          );
        }}
        onWidgetReorder={setActiveWidgets}
      />

      <QuickLogModal
        isOpen={isQuickLogOpen}
        onClose={() => setIsQuickLogOpen(false)}
      />

      <WaterLogModal
        isOpen={isWaterLogOpen}
        onClose={() => setIsWaterLogOpen(false)}
      />

      <MoodLogModal
        isOpen={isMoodLogOpen}
        onClose={() => setIsMoodLogOpen(false)}
      />

      <AcneLogModal
        isOpen={isAcneLogOpen}
        onClose={() => setIsAcneLogOpen(false)}
      />

      <WidgetDetailsModal
        isOpen={!!expandedWidget}
        onClose={() => setExpandedWidget(null)}
        widgetType={expandedWidget}
      />
    </div>
  );
}