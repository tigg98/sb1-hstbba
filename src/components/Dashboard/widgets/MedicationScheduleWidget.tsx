import React, { useState } from 'react';
import { Pill, Clock, Check, AlertCircle } from 'lucide-react';

interface Medication {
  id: string;
  name: string;
  time: string;
  taken: boolean;
  withFood: boolean;
  dosage: string;
  instructions?: string;
}

export default function MedicationScheduleWidget() {
  const [expandedMed, setExpandedMed] = useState<string | null>(null);

  const medications: Medication[] = [
    {
      id: 'med1',
      name: 'Probiotic',
      time: '8:00 AM',
      taken: true,
      withFood: true,
      dosage: '1 capsule',
      instructions: 'Take with breakfast for optimal absorption'
    },
    {
      id: 'med2',
      name: 'Vitamin D',
      time: '2:00 PM',
      taken: false,
      withFood: true,
      dosage: '2000 IU',
      instructions: 'Take with a meal containing healthy fats'
    }
  ];

  const handleMedClick = (id: string) => {
    setExpandedMed(expandedMed === id ? null : id);
  };

  const handleKeyPress = (event: React.KeyboardEvent, id: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleMedClick(id);
    }
  };

  return (
    <section 
      className="bg-white rounded-xl shadow-sm p-4 transition-all duration-300 hover:shadow-md"
      aria-labelledby="medication-schedule-title"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 id="medication-schedule-title" className="text-lg font-semibold text-gray-900">
            Medications
          </h2>
          <p className="text-sm text-gray-600">Today's schedule</p>
        </div>
        <div 
          className="p-2 bg-purple-50 rounded-lg transition-all duration-300 hover:bg-purple-100"
          aria-hidden="true"
        >
          <Pill className="h-5 w-5 text-purple-500" />
        </div>
      </div>

      <div 
        className="space-y-3"
        role="list"
        aria-label="Medication schedule"
      >
        {medications.map((med) => (
          <article
            key={med.id}
            className="p-3 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100"
            role="listitem"
          >
            <button
              onClick={() => handleMedClick(med.id)}
              onKeyPress={(e) => handleKeyPress(e, med.id)}
              className="w-full text-left focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg"
              aria-expanded={expandedMed === med.id}
              aria-controls={`med-details-${med.id}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" aria-hidden="true" />
                  <time 
                    dateTime={med.time}
                    className="text-sm text-gray-900"
                  >
                    {med.time}
                  </time>
                </div>
                {med.taken ? (
                  <span 
                    className="flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs transition-all duration-300 hover:bg-green-200"
                    role="status"
                  >
                    <Check className="h-3 w-3" aria-hidden="true" />
                    <span>Taken</span>
                  </span>
                ) : (
                  <span 
                    className="flex items-center space-x-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs transition-all duration-300 hover:bg-yellow-200"
                    role="status"
                  >
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    <span>Due</span>
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{med.name}</h3>
                  <p className="text-xs text-gray-600">{med.dosage}</p>
                </div>
                {med.withFood && (
                  <span 
                    className="text-xs text-gray-500"
                    aria-label="Take with food"
                  >
                    With food
                  </span>
                )}
              </div>
            </button>

            {expandedMed === med.id && (
              <div
                id={`med-details-${med.id}`}
                className="mt-3 pt-3 border-t border-gray-200 transition-all duration-300"
              >
                <p className="text-sm text-gray-600">{med.instructions}</p>
              </div>
            )}
          </article>
        ))}
      </div>

      <div 
        className="mt-4 p-3 bg-purple-50 rounded-lg transition-all duration-300 hover:bg-purple-100"
        role="alert"
      >
        <div className="flex items-start space-x-2">
          <AlertCircle className="h-4 w-4 text-purple-500 mt-0.5" aria-hidden="true" />
          <p className="text-xs text-purple-700">
            Next dose in 2 hours. Remember to take with food.
          </p>
        </div>
      </div>
    </section>
  );
}