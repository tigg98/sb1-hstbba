import React, { useState } from 'react';
import { Bell, Mail, Phone, Clock } from 'lucide-react';

export default function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    email: {
      dailyDigest: true,
      weeklyReport: true,
      medicationReminders: true,
      appointmentReminders: true,
      healthAlerts: true
    },
    push: {
      mealReminders: true,
      medicationReminders: true,
      exerciseReminders: true,
      symptomTracking: true,
      healthAlerts: true
    },
    sms: {
      appointmentReminders: false,
      medicationReminders: false,
      healthAlerts: true
    },
    quietHours: {
      enabled: true,
      start: '22:00',
      end: '07:00'
    }
  });

  const handleToggle = (category: keyof typeof notifications, setting: string) => {
    setNotifications({
      ...notifications,
      [category]: {
        ...notifications[category as keyof typeof notifications],
        [setting]: !notifications[category as keyof typeof notifications][setting as keyof typeof notifications[keyof typeof notifications]]
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Mail className="h-5 w-5 text-gray-500" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Email Notifications</h2>
            <p className="text-sm text-gray-600">Manage your email preferences</p>
          </div>
        </div>

        <div className="space-y-4">
          {Object.entries(notifications.email).map(([key, value]) => (
            <label key={key} className="flex items-center justify-between">
              <span className="text-gray-700">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handleToggle('email', key)}
                  className="switch-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out"
                />
                <label
                  className={`switch-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                    value ? 'bg-primary-500' : 'bg-gray-300'
                  }`}
                />
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Push Notifications */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Bell className="h-5 w-5 text-gray-500" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Push Notifications</h2>
            <p className="text-sm text-gray-600">Manage app notifications</p>
          </div>
        </div>

        <div className="space-y-4">
          {Object.entries(notifications.push).map(([key, value]) => (
            <label key={key} className="flex items-center justify-between">
              <span className="text-gray-700">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handleToggle('push', key)}
                  className="switch-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out"
                />
                <label
                  className={`switch-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                    value ? 'bg-primary-500' : 'bg-gray-300'
                  }`}
                />
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* SMS Notifications */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Phone className="h-5 w-5 text-gray-500" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">SMS Notifications</h2>
            <p className="text-sm text-gray-600">Manage text message alerts</p>
          </div>
        </div>

        <div className="space-y-4">
          {Object.entries(notifications.sms).map(([key, value]) => (
            <label key={key} className="flex items-center justify-between">
              <span className="text-gray-700">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
              <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handleToggle('sms', key)}
                  className="switch-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out"
                />
                <label
                  className={`switch-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                    value ? 'bg-primary-500' : 'bg-gray-300'
                  }`}
                />
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Quiet Hours */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Clock className="h-5 w-5 text-gray-500" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Quiet Hours</h2>
            <p className="text-sm text-gray-600">Set times when notifications are muted</p>
          </div>
        </div>

        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <span className="text-gray-700">Enable Quiet Hours</span>
            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out">
              <input
                type="checkbox"
                checked={notifications.quietHours.enabled}
                onChange={() => setNotifications({
                  ...notifications,
                  quietHours: {
                    ...notifications.quietHours,
                    enabled: !notifications.quietHours.enabled
                  }
                })}
                className="switch-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-transform duration-200 ease-in-out"
              />
              <label
                className={`switch-label block overflow-hidden h-6 rounded-full cursor-pointer ${
                  notifications.quietHours.enabled ? 'bg-primary-500' : 'bg-gray-300'
                }`}
              />
            </div>
          </label>

          {notifications.quietHours.enabled && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  value={notifications.quietHours.start}
                  onChange={(e) => setNotifications({
                    ...notifications,
                    quietHours: {
                      ...notifications.quietHours,
                      start: e.target.value
                    }
                  })}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  value={notifications.quietHours.end}
                  onChange={(e) => setNotifications({
                    ...notifications,
                    quietHours: {
                      ...notifications.quietHours,
                      end: e.target.value
                    }
                  })}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}