import React from 'react';
import { X, Maximize2 } from 'lucide-react';
import MoodTrackerDetails from './widgetDetails/MoodTrackerDetails';
import StressLevelsDetails from './widgetDetails/StressLevelsDetails';
import DailyTipsDetails from './widgetDetails/DailyTipsDetails';
import DailySummaryDetails from './widgetDetails/DailySummaryDetails';
import ActivityLogDetails from './widgetDetails/ActivityLogDetails';
import ExerciseDetails from './widgetDetails/ExerciseDetails';
import EnergyChartDetails from './widgetDetails/EnergyChartDetails';
import WaterIntakeDetails from './widgetDetails/WaterIntakeDetails';
import SkinHealthDetails from './widgetDetails/SkinHealthDetails';
import SleepQualityDetails from './widgetDetails/SleepQualityDetails';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  widgetType: string | null;
}

export default function WidgetDetailsModal({ isOpen, onClose, widgetType }: Props) {
  if (!isOpen || !widgetType) return null;

  const getWidgetDetails = () => {
    switch (widgetType) {
      case 'moodTracker':
        return <MoodTrackerDetails />;
      case 'stressLevels':
        return <StressLevelsDetails />;
      case 'dailyTips':
        return <DailyTipsDetails />;
      case 'dailySummary':
        return <DailySummaryDetails />;
      case 'activityLog':
        return <ActivityLogDetails />;
      case 'exercise':
        return <ExerciseDetails />;
      case 'energyChart':
        return <EnergyChartDetails />;
      case 'waterIntake':
        return <WaterIntakeDetails />;
      case 'skinHealth':
        return <SkinHealthDetails />;
      case 'sleepQuality':
        return <SleepQualityDetails />;
      default:
        return null;
    }
  };

  const getWidgetTitle = () => {
    const titles: Record<string, string> = {
      moodTracker: 'Mood Analysis',
      stressLevels: 'Stress Level Analysis',
      dailyTips: 'Daily Health Tips',
      dailySummary: 'Daily Summary',
      activityLog: 'Activity Log',
      exercise: 'Exercise Details',
      energyChart: 'Energy Level Analysis',
      waterIntake: 'Water Intake Analysis',
      skinHealth: 'Skin Health Analysis',
      sleepQuality: 'Sleep Quality Analysis'
    };
    return titles[widgetType] || 'Widget Details';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-25">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-4xl">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <Maximize2 className="h-5 w-5 text-primary-500" />
              <h2 className="text-xl font-semibold text-gray-900">{getWidgetTitle()}</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            {getWidgetDetails()}
          </div>

          <div className="flex justify-end p-6 border-t border-gray-100">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}