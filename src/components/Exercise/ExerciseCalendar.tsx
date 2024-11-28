import React, { useState } from 'react';
import { Calendar, Clock, Activity, TrendingUp, Plus } from 'lucide-react';
import ViewCalendarModal from './ViewCalendarModal';
import ScheduleWorkoutModal from './ScheduleWorkoutModal';

export default function ExerciseCalendar() {
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const upcomingWorkouts = [
    {
      date: 'Today',
      time: '10:00 AM',
      name: 'Morning Walk',
      duration: '30 min',
      intensity: 'Low'
    },
    {
      date: 'Tomorrow',
      time: '9:30 AM',
      name: 'Yoga Flow',
      duration: '20 min',
      intensity: 'Low'
    },
    {
      date: 'Wed, Mar 20',
      time: '11:00 AM',
      name: 'Swimming',
      duration: '25 min',
      intensity: 'Moderate'
    }
  ];

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Exercise Schedule</h2>
            <p className="text-sm text-gray-600">Upcoming workouts</p>
          </div>
          <button 
            onClick={() => setIsCalendarModalOpen(true)}
            className="text-blue-600 text-sm font-medium hover:text-blue-700"
          >
            View Calendar
          </button>
        </div>

        <div className="space-y-4">
          {upcomingWorkouts.map((workout, index) => (
            <div
              key={index}
              className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">{workout.date}</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{workout.time}</span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  workout.intensity === 'Low'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {workout.intensity}
                </span>
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-900">{workout.name}</span>
                </div>
                <span className="text-sm text-gray-600">{workout.duration}</span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setIsScheduleModalOpen(true)}
          className="w-full mt-6 py-2 text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors"
        >
          Schedule New Workout
        </button>
      </div>

      <ViewCalendarModal
        isOpen={isCalendarModalOpen}
        onClose={() => setIsCalendarModalOpen(false)}
      />

      <ScheduleWorkoutModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
      />
    </>
  );
}