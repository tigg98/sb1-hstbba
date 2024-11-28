import React from 'react';

interface TimeRange {
  value: '7d' | '30d' | '90d' | '1y';
  label: string;
}

interface TimeRangeSelectorProps {
  timeRanges: TimeRange[];
  selectedRange: string;
  onRangeChange: (range: TimeRange['value']) => void;
}

export default function TimeRangeSelector({
  timeRanges,
  selectedRange,
  onRangeChange
}: TimeRangeSelectorProps) {
  return (
    <div className="flex items-center space-x-2 bg-white rounded-lg shadow-sm p-1">
      {timeRanges.map(range => (
        <button
          key={range.value}
          onClick={() => onRangeChange(range.value)}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            selectedRange === range.value
              ? 'bg-primary-500 text-white'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
}