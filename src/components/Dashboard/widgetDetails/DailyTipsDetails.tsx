import React from 'react';
import { Lightbulb, Brain, Heart, Apple, Moon, Coffee, Clock, Info } from 'lucide-react';

export default function DailyTipsDetails() {
  const tips = [
    {
      category: 'Nutrition',
      icon: Apple,
      tip: 'Try eating fermented foods today. Your gut bacteria diversity is lower than usual.',
      impact: 'May reduce bloating by 30%',
      priority: 'high',
      timeOfDay: 'Morning',
      details: {
        explanation: 'Fermented foods contain beneficial probiotics that can help improve gut bacteria diversity and reduce inflammation.',
        actionItems: [
          'Add kimchi or sauerkraut to your lunch',
          'Try kombucha as an afternoon drink',
          'Include yogurt with live cultures in your breakfast',
          'Consider adding miso soup to your diet'
        ],
        research: 'Recent studies show that regular consumption of fermented foods can increase gut microbiome diversity by up to 40% within 6 weeks.',
        timeline: 'Expect initial improvements in digestion within 3-5 days of regular consumption.'
      }
    },
    // Add more detailed tips here...
  ];

  return (
    <div className="space-y-6">
      {tips.map((tip, index) => (
        <div
          key={index}
          className={`p-6 rounded-lg ${
            tip.priority === 'high'
              ? 'bg-red-50'
              : 'bg-yellow-50'
          }`}
        >
          <div className="flex items-start space-x-4">
            <div className={`p-3 rounded-lg ${
              tip.priority === 'high'
                ? 'bg-red-100'
                : 'bg-yellow-100'
            }`}>
              <tip.icon className={`h-6 w-6 ${
                tip.priority === 'high'
                  ? 'text-red-500'
                  : 'text-yellow-500'
              }`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">{tip.category}</h3>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{tip.timeOfDay}</span>
                </div>
              </div>
              <p className="mt-2 text-gray-700">{tip.tip}</p>
              <p className="mt-1 text-sm font-medium text-gray-600">{tip.impact}</p>

              <div className="mt-4 space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">Why This Matters</h4>
                  <p className="mt-1 text-gray-600">{tip.details.explanation}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">Action Items</h4>
                  <ul className="mt-2 space-y-2">
                    {tip.details.actionItems.map((item, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                        <span className="text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">Research Insight</h4>
                      <p className="mt-1 text-blue-700">{tip.details.research}</p>
                      <p className="mt-2 text-blue-700">{tip.details.timeline}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}