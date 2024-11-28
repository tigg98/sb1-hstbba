import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import CalendarPicker from './CalendarPicker';

interface Props {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  view: 'day' | 'week' | 'month';
  onViewChange: (view: 'day' | 'week' | 'month') => void;
}

export default function DateFilter({ selectedDate, onDateChange, view, onViewChange }: Props) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const views = [
    { id: 'day', label: 'Day' },
    { id: 'week', label: 'Week' },
    { id: 'month', label: 'Month' }
  ];

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    switch (view) {
      case 'day':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
        break;
      case 'week':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
        break;
    }
    onDateChange(newDate);
  };

  const formatDate = () => {
    switch (view) {
      case 'day':
        return selectedDate.toLocaleDateString('en-US', { 
          weekday: 'short',
          month: 'short', 
          day: 'numeric' 
        });
      case 'week':
        const weekStart = new Date(selectedDate);
        weekStart.setDate(weekStart.getDate() - weekStart.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekEnd.getDate() + 6);
        return `${weekStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${
          weekEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        }`;
      case 'month':
        return selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2 bg-white rounded-lg shadow-sm p-1">
        {views.map((v) => (
          <button
            key={v.id}
            onClick={() => onViewChange(v.id as 'day' | 'week' | 'month')}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              view === v.id
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => navigateDate('prev')}
          className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={() => setIsCalendarOpen(true)}
          className="flex items-center space-x-2 px-3 py-1.5 bg-white rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
        >
          <CalendarIcon className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-900">{formatDate()}</span>
        </button>
        <button
          onClick={() => navigateDate('next')}
          className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <CalendarPicker
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        selectedDate={selectedDate}
        onDateSelect={(date) => {
          onDateChange(date);
          setIsCalendarOpen(false);
        }}
        view={view}
      />
    </div>
  );
}