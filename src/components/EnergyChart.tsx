import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function EnergyChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 tracking-tight">Energy Levels</h3>
          <p className="text-gray-600 text-sm">Today's energy fluctuations</p>
        </div>
        <div className="p-2 bg-accent-50 rounded-lg">
          <TrendingUp className="h-5 w-5 text-accent-400" />
        </div>
      </div>

      <div className="h-48 flex items-end space-x-2">
        {[40, 65, 85, 70, 55, 60, 75].map((height, i) => (
          <div key={i} className="relative group">
            <div
              className="flex-1 min-w-[2rem] bg-accent-100 rounded-t-lg relative group-hover:bg-accent-200 transition-colors"
              style={{ height: `${height}%` }}
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                  {height}% Energy
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-4 text-sm font-medium text-gray-500">
        <span>6 AM</span>
        <span>9 AM</span>
        <span>12 PM</span>
        <span>3 PM</span>
        <span>6 PM</span>
        <span>9 PM</span>
        <span>Now</span>
      </div>
    </div>
  );
}