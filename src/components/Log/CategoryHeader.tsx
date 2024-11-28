import React from 'react';
import { Info, Plus } from 'lucide-react';
import DateFilter from './DateFilter';
import type { CategoryInfo } from '../../types/activity';

interface Props {
  category: string;
  info: CategoryInfo;
  onLogActivity: (type: string) => void;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  view: 'day' | 'week' | 'month';
  onViewChange: (view: 'day' | 'week' | 'month') => void;
}

export default function CategoryHeader({ 
  category, 
  info, 
  onLogActivity,
  selectedDate,
  onDateChange,
  view,
  onViewChange
}: Props) {
  const { icon: IconComponent } = info;

  const getTipsForView = () => {
    switch (view) {
      case 'day':
        return {
          meals: [
            'Log meals within 30 minutes of eating',
            'Note immediate reactions or symptoms',
            'Track portion sizes and timing',
            'Record hunger and fullness levels'
          ],
          exercise: [
            'Monitor energy levels before/after',
            'Track heart rate during activity',
            'Note any digestive impacts',
            'Record recovery time needed'
          ],
          supplements: [
            'Log exact timing of each dose',
            'Note if taken with/without food',
            'Track immediate effects',
            'Monitor any interactions'
          ],
          water: [
            'Record water temperature',
            'Track timing with meals',
            'Note immediate effects',
            'Monitor hydration signs'
          ],
          skin: [
            'Take progress photos',
            'Note any new spots/changes',
            'Track daily products used',
            'Record environmental factors'
          ],
          alcohol: [
            'Log type and amount consumed',
            'Note if taken with food',
            'Track immediate reactions',
            'Monitor sleep quality'
          ]
        };

      case 'week':
        return {
          meals: [
            'Identify meal timing patterns',
            'Track weekly variety in diet',
            'Monitor weekly trigger foods',
            'Note best/worst meal times'
          ],
          exercise: [
            'Balance workout intensity',
            'Track weekly recovery patterns',
            'Monitor weekly progress',
            'Note best workout days'
          ],
          supplements: [
            'Check weekly compliance',
            'Monitor cumulative effects',
            'Track supplement rotation',
            'Note weekly effectiveness'
          ],
          water: [
            'Review weekly hydration goals',
            'Track weekly water quality',
            'Monitor weekly patterns',
            'Note best hydration days'
          ],
          skin: [
            'Compare weekly photos',
            'Track healing patterns',
            'Monitor weekly triggers',
            'Note treatment effectiveness'
          ],
          alcohol: [
            'Track weekly consumption',
            'Monitor drinking patterns',
            'Note recovery periods',
            'Track weekly impacts'
          ]
        };

      case 'month':
        return {
          meals: [
            'Analyze monthly diet trends',
            'Track seasonal food impacts',
            'Monitor long-term patterns',
            'Review dietary changes'
          ],
          exercise: [
            'Review monthly progress',
            'Track fitness improvements',
            'Monitor endurance changes',
            'Analyze recovery trends'
          ],
          supplements: [
            'Evaluate supplement efficacy',
            'Track long-term benefits',
            'Monitor side effects',
            'Plan supplement changes'
          ],
          water: [
            'Analyze hydration patterns',
            'Track seasonal changes',
            'Monitor water quality',
            'Review mineral intake'
          ],
          skin: [
            'Compare monthly progress',
            'Track seasonal impacts',
            'Monitor treatment results',
            'Review trigger patterns'
          ],
          alcohol: [
            'Review monthly consumption',
            'Track tolerance changes',
            'Monitor health impacts',
            'Analyze trigger patterns'
          ]
        };
    }
  };

  const tips = getTipsForView()[category as keyof ReturnType<typeof getTipsForView>] || info.tips;

  return (
    <div className={`bg-${info.color}-50 rounded-xl shadow-sm p-6`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className={`p-3 bg-${info.color}-100 rounded-lg`}>
            <IconComponent className={`h-6 w-6 text-${info.color}-500`} />
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-900">{info.title}</h2>
            <p className="text-gray-600 mt-1">{info.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <DateFilter
            selectedDate={selectedDate}
            onDateChange={onDateChange}
            view={view}
            onViewChange={onViewChange}
          />
          <button
            onClick={() => onLogActivity(category)}
            className={`p-2 text-white rounded-lg shadow-sm bg-${info.bgColor} hover:bg-${info.hoverColor} transition-all duration-200`}
            aria-label={`Add ${info.title}`}
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {tips.map((tip, index) => (
          <div key={index} className="flex items-start space-x-2">
            <Info className={`h-4 w-4 text-${info.color}-500 mt-1`} />
            <span className="text-sm text-gray-600">{tip}</span>
          </div>
        ))}
      </div>
    </div>
  );
}