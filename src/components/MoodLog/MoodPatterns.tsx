import React from 'react';
import { Brain, Clock, Calendar, AlertCircle } from 'lucide-react';

interface Pattern {
  type: string;
  description: string;
  frequency: string;
  impact: string;
  recommendation: string;
}

interface Props {
  patterns: Pattern[];
}

export default function MoodPatterns({ patterns }: Props) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Identified Patterns</h3>
      {patterns.map((pattern, index) => (
        <div key={index} className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900">{pattern.type}</h4>
            <span className="text-sm text-gray-600">{pattern.frequency}</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{pattern.description}</p>
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-purple-600">Impact:</span>
            <span className="text-gray-600">{pattern.impact}</span>
          </div>
          <div className="mt-2 p-2 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5" />
              <p className="text-sm text-blue-700">{pattern.recommendation}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}