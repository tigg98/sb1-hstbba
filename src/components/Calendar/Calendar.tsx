import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import DayDetailsModal from './DayDetailsModal';

type ViewType = 'week' | 'month';

export default function Calendar() {
  const [viewType, setViewType] = useState<ViewType>('week');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (viewType === 'week') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    // Add padding days from previous month
    for (let i = 0; i < firstDay.getDay(); i++) {
      const prevDate = new Date(year, month, -i);
      days.unshift({ date: prevDate, isCurrentMonth: false });
    }
    
    // Add days of current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }
    
    // Add padding days from next month
    const remainingDays = 42 - days.length; // 6 rows × 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }
    
    return days;
  };

  const getWeekDays = (date: Date) => {
    const days = [];
    const current = new Date(date);
    current.setDate(current.getDate() - current.getDay()); // Start from Sunday
    
    for (let i = 0; i < 7; i++) {
      days.push({ date: new Date(current), isCurrentMonth: true });
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  };

  const days = viewType === 'month' ? getDaysInMonth(currentDate) : getWeekDays(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Calendar</h3>
            <p className="text-gray-600 text-sm">Track your daily logs</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewType('week')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                viewType === 'week'
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setViewType('month')}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                viewType === 'month'
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Month
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h4 className="font-medium text-gray-900">
            {currentDate.toLocaleDateString('en-US', { 
              month: 'long',
              year: 'numeric',
              ...(viewType === 'week' && { day: 'numeric' })
            })}
          </h4>
          <div className="flex space-x-2">
            <button
              onClick={() => navigateDate('prev')}
              className="p-1 rounded-lg hover:bg-gray-100"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={() => navigateDate('next')}
              className="p-1 rounded-lg hover:bg-gray-100"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {weekDays.map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
              {day}
            </div>
          ))}
          
          {days.map(({ date, isCurrentMonth }, index) => {
            const isToday = date.toDateString() === new Date().toDateString();
            const hasEntries = Math.random() > 0.7; // Simulate days with entries
            
            return (
              <button
                key={index}
                onClick={() => setSelectedDate(date)}
                className={`aspect-square p-1 rounded-lg relative ${
                  isCurrentMonth ? 'hover:bg-gray-50' : 'opacity-50'
                }`}
              >
                <span className={`
                  inline-flex items-center justify-center w-8 h-8 rounded-full text-sm
                  ${isToday ? 'bg-emerald-500 text-white' : 'text-gray-900'}
                `}>
                  {date.getDate()}
                </span>
                {hasEntries && (
                  <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-emerald-500 rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <DayDetailsModal
          selectedDate={selectedDate}
          isOpen={true}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </>
  );
}