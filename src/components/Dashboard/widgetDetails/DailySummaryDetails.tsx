import React from 'react';
import { Activity, TrendingUp, Utensils, Pill } from 'lucide-react';

export default function DailySummaryDetails() {
  const summaryData = {
    meals: {
      completed: 3,
      total: 5,
      calories: 1450,
      nextMeal: '12:30 PM',
      recentMeals: [
        { time: '8:00 AM', name: 'Breakfast', details: 'Oatmeal with berries' },
        { time: '10:30 AM', name: 'Snack', details: 'Apple and almonds' }
      ]
    },
    exercise: {
      minutes: 45,
      caloriesBurned: 320,
      steps: 6500,
      activities: [
        { time: '7:30 AM', type: 'Walking', duration: '30 min', intensity: 'Low' },
        { time: '9:00 AM', type: 'Yoga', duration: '15 min', intensity: 'Low' }
      ]
    },
    supplements: {
      taken: 2,
      remaining: 1,
      schedule: [
        { time: '8:00 AM', name: 'Multivitamin', status: 'taken' },
        { time: '8:00 AM', name: 'Probiotic', status: 'taken' },
        { time: '8:00 PM', name: 'Magnesium', status: 'pending' }
      ]
    },
    energy: {
      current: 'Good',
      trend: '+15%',
      hourlyLevels: [
        { time: '6 AM', level: 65 },
        { time: '8 AM', level: 80 },
        { time: '10 AM', level: 85 },
        { time: '12 PM', level: 75 }
      ]
    }
  };

  return (
    <div className="space-y-8">
      {/* Meals Section */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <Utensils className="h-5 w-5 text-primary-500" />
          <span>Meals & Nutrition</span>
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-primary-50 rounded-lg">
            <p className="text-sm text-gray-600">Meals Completed</p>
            <p className="text-2xl font-bold text-gray-900">{summaryData.meals.completed}/{summaryData.meals.total}</p>
            <p className="text-sm text-gray-600">Next meal at {summaryData.meals.nextMeal}</p>
          </div>
          <div className="p-4 bg-primary-50 rounded-lg">
            <p className="text-sm text-gray-600">Total Calories</p>
            <p className="text-2xl font-bold text-gray-900">{summaryData.meals.calories}</p>
            <p className="text-sm text-gray-600">Daily Goal: 2000</p>
          </div>
        </div>
        <div className="space-y-2">
          {summaryData.meals.recentMeals.map((meal, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{meal.name}</p>
                <p className="text-sm text-gray-600">{meal.details}</p>
              </div>
              <span className="text-sm text-gray-500">{meal.time}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Exercise Section */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <Activity className="h-5 w-5 text-secondary-500" />
          <span>Exercise & Activity</span>
        </h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-secondary-50 rounded-lg">
            <p className="text-sm text-gray-600">Duration</p>
            <p className="text-2xl font-bold text-gray-900">{summaryData.exercise.minutes}min</p>
          </div>
          <div className="p-4 bg-secondary-50 rounded-lg">
            <p className="text-sm text-gray-600">Calories</p>
            <p className="text-2xl font-bold text-gray-900">{summaryData.exercise.caloriesBurned}</p>
          </div>
          <div className="p-4 bg-secondary-50 rounded-lg">
            <p className="text-sm text-gray-600">Steps</p>
            <p className="text-2xl font-bold text-gray-900">{summaryData.exercise.steps}</p>
          </div>
        </div>
        <div className="space-y-2">
          {summaryData.exercise.activities.map((activity, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{activity.type}</p>
                <p className="text-sm text-gray-600">{activity.duration}</p>
              </div>
              <div className="text-right">
                <span className="text-sm text-gray-500">{activity.time}</span>
                <p className="text-xs text-gray-600">{activity.intensity} Intensity</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Supplements Section */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <Pill className="h-5 w-5 text-purple-500" />
          <span>Supplements</span>
        </h3>
        <div className="space-y-2">
          {summaryData.supplements.schedule.map((supplement, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{supplement.name}</p>
                <p className="text-sm text-gray-600">{supplement.time}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                supplement.status === 'taken'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {supplement.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Energy Levels Section */}
      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-accent-400" />
          <span>Energy Levels</span>
        </h3>
        <div className="p-4 bg-accent-50 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600">Current Level</p>
              <p className="text-2xl font-bold text-gray-900">{summaryData.energy.current}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Trend</p>
              <p className="text-lg font-medium text-green-600">{summaryData.energy.trend}</p>
            </div>
          </div>
          <div className="h-32 flex items-end space-x-2">
            {summaryData.energy.hourlyLevels.map((hour, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-accent-200 rounded-t-lg transition-all duration-300"
                  style={{ height: `${hour.level}%` }}
                />
                <span className="text-xs text-gray-600 mt-1">{hour.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}