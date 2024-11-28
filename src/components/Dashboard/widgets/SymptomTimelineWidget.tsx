import React, { useState } from 'react';
import { Activity, AlertCircle, Clock, Calendar, Info } from 'lucide-react';

interface Props {
  onQuickLog: () => void;
}

interface Symptom {
  id: string;
  time: string;
  type: string;
  severity: 'mild' | 'moderate' | 'severe';
  trigger: string;
  duration: string;
  details?: string;
}

export default function SymptomTimelineWidget({ onQuickLog }: Props) {
  const [expandedSymptom, setExpandedSymptom] = useState<string | null>(null);

  const symptoms: Symptom[] = [
    {
      id: 's1',
      time: '8:00 AM',
      type: 'Bloating',
      severity: 'mild',
      trigger: 'Morning coffee',
      duration: '30 min',
      details: 'Mild discomfort after morning coffee. Consider switching to tea or delaying coffee until after breakfast.'
    },
    {
      id: 's2',
      time: '2:30 PM',
      type: 'Discomfort',
      severity: 'moderate',
      trigger: 'Lunch',
      duration: '45 min',
      details: 'Post-lunch digestive discomfort. May be related to portion size or eating speed.'
    }
  ];

  const handleSymptomClick = (id: string) => {
    setExpandedSymptom(expandedSymptom === id ? null : id);
  };

  const handleKeyPress = (event: React.KeyboardEvent, id: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSymptomClick(id);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild':
        return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200';
      case 'moderate':
        return 'bg-orange-100 text-orange-700 hover:bg-orange-200';
      case 'severe':
        return 'bg-red-100 text-red-700 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
    }
  };

  return (
    <section 
      className="bg-white rounded-xl shadow-sm p-4 transition-all duration-300 hover:shadow-md"
      aria-labelledby="symptom-timeline-title"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 id="symptom-timeline-title" className="text-lg font-semibold text-gray-900">
            Symptom Timeline
          </h2>
          <p className="text-sm text-gray-600">Today's symptoms</p>
        </div>
        <div 
          className="p-2 bg-red-50 rounded-lg transition-all duration-300 hover:bg-red-100"
          aria-hidden="true"
        >
          <Activity className="h-5 w-5 text-red-500" />
        </div>
      </div>

      <div 
        className="space-y-3"
        role="list"
        aria-label="Symptom timeline"
      >
        {symptoms.map((symptom) => (
          <article
            key={symptom.id}
            className="p-3 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100"
            role="listitem"
          >
            <button
              onClick={() => handleSymptomClick(symptom.id)}
              onKeyPress={(e) => handleKeyPress(e, symptom.id)}
              className="w-full text-left focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg"
              aria-expanded={expandedSymptom === symptom.id}
              aria-controls={`symptom-details-${symptom.id}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" aria-hidden="true" />
                  <time 
                    dateTime={symptom.time}
                    className="text-sm text-gray-900"
                  >
                    {symptom.time}
                  </time>
                </div>
                <span 
                  className={`px-2 py-1 rounded-full text-xs transition-all duration-300 ${getSeverityColor(symptom.severity)}`}
                  aria-label={`Severity: ${symptom.severity}`}
                >
                  {symptom.severity}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{symptom.type}</h3>
                  <p 
                    className="text-xs text-gray-600"
                    aria-label={`Trigger: ${symptom.trigger}`}
                  >
                    Trigger: {symptom.trigger}
                  </p>
                </div>
                <span 
                  className="text-xs text-gray-500"
                  aria-label={`Duration: ${symptom.duration}`}
                >
                  {symptom.duration}
                </span>
              </div>
            </button>

            {expandedSymptom === symptom.id && symptom.details && (
              <div
                id={`symptom-details-${symptom.id}`}
                className="mt-3 pt-3 border-t border-gray-200 transition-all duration-300"
              >
                <div className="flex items-start space-x-2">
                  <Info className="h-4 w-4 text-blue-500 mt-0.5" aria-hidden="true" />
                  <p className="text-sm text-gray-600">{symptom.details}</p>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>

      <button
        className="w-full mt-4 flex items-center justify-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg transition-all duration-300 hover:bg-red-100 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        onClick={onQuickLog}
        aria-label="Log new symptom"
      >
        <AlertCircle className="h-4 w-4" aria-hidden="true" />
        <span>Log Symptom</span>
      </button>

      <div 
        className="mt-4 p-3 bg-blue-50 rounded-lg transition-all duration-300 hover:bg-blue-100"
        role="complementary"
      >
        <div className="flex items-start space-x-2">
          <Info className="h-4 w-4 text-blue-500 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-sm font-medium text-blue-900">Tracking Tips</p>
            <ul className="mt-1 space-y-1 text-sm text-blue-700">
              <li>• Log symptoms as they occur for better accuracy</li>
              <li>• Note potential triggers and duration</li>
              <li>• Track severity changes throughout the day</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}