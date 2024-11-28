import React, { useState } from 'react';
import { 
  Lightbulb, 
  ArrowRight, 
  Brain, 
  Heart, 
  Apple, 
  Moon, 
  Coffee,
  Clock,
  X,
  Info
} from 'lucide-react';

interface Tip {
  category: string;
  icon: any;
  tip: string;
  impact: string;
  priority: 'high' | 'medium';
  timeOfDay: string;
  details: {
    explanation: string;
    actionItems: string[];
    research: string;
    timeline: string;
  };
}

export default function DailyTips() {
  const [selectedTip, setSelectedTip] = useState<Tip | null>(null);

  const tips: Tip[] = [
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
    {
      category: 'Sleep',
      icon: Moon,
      tip: 'Your sleep pattern shows disruption. Aim for bed by 10 PM tonight.',
      impact: 'Better sleep reduces inflammation by 25%',
      priority: 'medium',
      timeOfDay: 'Evening',
      details: {
        explanation: 'Consistent sleep timing helps regulate your circadian rhythm, which directly impacts gut health and inflammation levels.',
        actionItems: [
          'Set a bedtime alarm for 9:30 PM',
          'Dim lights 2 hours before bedtime',
          'Stop caffeine intake after 2 PM',
          'Create a relaxing bedtime routine'
        ],
        research: 'Studies indicate that irregular sleep patterns can increase inflammatory markers by up to 40%.',
        timeline: 'Sleep quality improvements can be noticed within 3-4 days of maintaining a consistent schedule.'
      }
    },
    {
      category: 'Stress',
      icon: Brain,
      tip: 'High stress detected. Take 3 deep breathing breaks today.',
      impact: 'Reduces cortisol levels by 20%',
      priority: 'high',
      timeOfDay: 'Throughout day',
      details: {
        explanation: 'Stress management through deep breathing activates the parasympathetic nervous system, reducing inflammation and improving gut function.',
        actionItems: [
          'Practice 4-7-8 breathing technique',
          'Set reminders for breathing breaks',
          'Use a meditation app for guidance',
          'Take short walks during breaks'
        ],
        research: 'Clinical studies show that regular deep breathing exercises can lower cortisol levels by up to 20% within a single session.',
        timeline: 'Immediate benefits can be felt after each session, with cumulative effects noticed within a week.'
      }
    },
    {
      category: 'Hydration',
      icon: Coffee,
      tip: 'Increase water intake. Recent caffeine consumption is higher than usual.',
      impact: 'Helps reduce dehydration symptoms',
      priority: 'medium',
      timeOfDay: 'Afternoon',
      details: {
        explanation: 'High caffeine intake can lead to dehydration and impact gut motility. Balancing with adequate water intake helps maintain optimal digestion.',
        actionItems: [
          'Drink one glass of water for each caffeinated beverage',
          'Set hourly water intake reminders',
          'Keep a water bottle visible at your desk',
          'Track water intake in your log'
        ],
        research: 'Research shows that maintaining proper hydration can improve digestion efficiency by up to 30%.',
        timeline: 'Hydration improvements can be felt within hours of increasing water intake.'
      }
    }
  ];

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-50 rounded-lg">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Daily Health Tips</h2>
              <p className="text-sm text-gray-600">Personalized recommendations based on your data</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tips.map((tip, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-l-4 ${
                tip.priority === 'high'
                  ? 'border-red-500 bg-red-50'
                  : 'border-yellow-500 bg-yellow-50'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${
                  tip.priority === 'high'
                    ? 'bg-red-100'
                    : 'bg-yellow-100'
                }`}>
                  <tip.icon className={`h-5 w-5 ${
                    tip.priority === 'high'
                      ? 'text-red-500'
                      : 'text-yellow-500'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${
                      tip.priority === 'high'
                        ? 'text-red-800'
                        : 'text-yellow-800'
                    }`}>
                      {tip.category}
                    </span>
                    <div className="flex items-center space-x-1 text-xs">
                      <Clock className="h-3 w-3" />
                      <span>{tip.timeOfDay}</span>
                    </div>
                  </div>
                  <p className={`mt-1 text-sm ${
                    tip.priority === 'high'
                      ? 'text-red-700'
                      : 'text-yellow-700'
                  }`}>
                    {tip.tip}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className={`text-xs ${
                      tip.priority === 'high'
                        ? 'text-red-600'
                        : 'text-yellow-600'
                    }`}>
                      {tip.impact}
                    </span>
                    <button 
                      onClick={() => setSelectedTip(tip)}
                      className={`flex items-center space-x-1 text-xs font-medium ${
                        tip.priority === 'high'
                          ? 'text-red-700 hover:text-red-800'
                          : 'text-yellow-700 hover:text-yellow-800'
                      }`}
                    >
                      <span>Learn more</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start space-x-3">
            <Heart className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-900">Wellness Score Impact</h4>
              <p className="text-sm text-blue-700 mt-1">
                Following these recommendations could improve your wellness score by up to 15%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tip Details Modal */}
      {selectedTip && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-25">
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg">
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <div className="flex items-center space-x-2">
                  <selectedTip.icon className={`h-5 w-5 ${
                    selectedTip.priority === 'high' ? 'text-red-500' : 'text-yellow-500'
                  }`} />
                  <h2 className="text-xl font-semibold text-gray-900">{selectedTip.category} Tip</h2>
                </div>
                <button 
                  onClick={() => setSelectedTip(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Why This Matters</h3>
                    <p className="text-sm text-gray-700">{selectedTip.details.explanation}</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Action Items</h3>
                    <div className="space-y-2">
                      {selectedTip.details.actionItems.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Info className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-blue-900">Research Insight</h4>
                        <p className="text-sm text-blue-700 mt-1">{selectedTip.details.research}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="text-sm font-medium text-green-900">Expected Timeline</h4>
                    <p className="text-sm text-green-700 mt-1">{selectedTip.details.timeline}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end p-6 border-t border-gray-100">
                <button
                  onClick={() => setSelectedTip(null)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}