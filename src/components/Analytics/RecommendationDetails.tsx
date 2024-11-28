import React, { useState } from 'react';
import { X, Brain, TrendingUp, AlertCircle, ArrowRight, ChevronDown, ChevronUp, Clock, Target } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  category: {
    icon: any;
    title: string;
    color: string;
    recommendations: string[];
    impact: string;
  };
}

interface DetailedRecommendation {
  title: string;
  description: string;
  steps: string[];
  timeline: string;
  difficulty: 'easy' | 'moderate' | 'challenging';
  impact: string;
  tips: string[];
}

export default function RecommendationDetails({ isOpen, onClose, category }: Props) {
  const [expandedRecs, setExpandedRecs] = useState<Set<string>>(new Set());

  if (!isOpen) return null;

  const getDetailedRecommendations = (categoryTitle: string): DetailedRecommendation[] => {
    switch (categoryTitle) {
      case 'Inflammation':
        return [
          {
            title: 'Increase anti-inflammatory foods',
            description: 'Focus on incorporating foods known to reduce inflammation while eliminating inflammatory triggers.',
            steps: [
              'Start with leafy greens (spinach, kale) daily',
              'Add fatty fish 2-3 times per week',
              'Include berries in your breakfast',
              'Use turmeric and ginger in cooking',
              'Replace vegetable oils with olive oil'
            ],
            timeline: '2-3 weeks for initial results',
            difficulty: 'moderate',
            impact: 'Can reduce inflammation markers by 30%',
            tips: [
              'Prep anti-inflammatory foods in advance',
              'Start with one meal modification at a time',
              'Keep a food-symptom diary'
            ]
          },
          {
            title: 'Optimize exercise timing',
            description: "Align exercise schedule with your body's natural rhythm to minimize inflammation.",
            steps: [
              'Exercise 2-3 hours after meals',
              'Start with morning walks',
              'Gradually increase intensity',
              'Monitor post-exercise inflammation',
              'Include recovery days'
            ],
            timeline: '1-2 weeks to establish routine',
            difficulty: 'easy',
            impact: 'Can improve exercise tolerance by 40%',
            tips: [
              'Use a timer app for meal-exercise spacing',
              'Start with 10-minute sessions',
              'Listen to your body\'s signals'
            ]
          }
        ];
      case 'Sleep':
        return [
          {
            title: 'Consistent sleep schedule',
            description: 'Maintain regular sleep and wake times to optimize your circadian rhythm.',
            steps: [
              'Set fixed bedtime and wake time',
              'Create a 30-minute wind-down routine',
              'Dim lights 2 hours before bed',
              'Remove electronics from bedroom',
              'Keep room temperature at 65-68°F'
            ],
            timeline: '1-2 weeks to adjust',
            difficulty: 'moderate',
            impact: 'Can improve sleep quality by 45%',
            tips: [
              'Use a sleep tracking app',
              'Gradually adjust bedtime by 15 minutes',
              'Create a relaxing bedroom environment'
            ]
          }
        ];
      case 'Diet':
        return [
          {
            title: 'Increase fiber diversity',
            description: 'Incorporate various fiber sources to support gut microbiome health.',
            steps: [
              'Add one new fiber source daily',
              'Include both soluble and insoluble fiber',
              'Start with small portions',
              'Drink plenty of water',
              'Track fiber intake'
            ],
            timeline: '2-4 weeks for gut adaptation',
            difficulty: 'moderate',
            impact: 'Can improve gut health by 35%',
            tips: [
              'Keep a fiber-rich snack readily available',
              'Combine different fiber sources in meals',
              'Increase intake gradually to minimize discomfort'
            ]
          }
        ];
      default:
        return [];
    }
  };

  const toggleRecommendation = (title: string) => {
    setExpandedRecs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(title)) {
        newSet.delete(title);
      } else {
        newSet.add(title);
      }
      return newSet;
    });
  };

  const detailedRecs = getDetailedRecommendations(category.title);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-25">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-3xl">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className={`p-2 bg-${category.color}-100 rounded-lg`}>
                <category.icon className={`h-5 w-5 text-${category.color}-500`} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">{category.title} Recommendations</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {detailedRecs.map((rec, index) => (
              <div key={index} className="border border-gray-100 rounded-lg">
                <button
                  onClick={() => toggleRecommendation(rec.title)}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Target className={`h-5 w-5 text-${category.color}-500`} />
                    <div className="text-left">
                      <h3 className="font-medium text-gray-900">{rec.title}</h3>
                      <p className="text-sm text-gray-600">{rec.description}</p>
                    </div>
                  </div>
                  {expandedRecs.has(rec.title) ? (
                    <ChevronUp className="h-5 w-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </button>

                {expandedRecs.has(rec.title) && (
                  <div className="p-4 border-t border-gray-100 space-y-4">
                    {/* Implementation Steps */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Implementation Steps</h4>
                      <div className="space-y-2">
                        {rec.steps.map((step, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <div className={`h-6 w-6 rounded-full bg-${category.color}-100 flex items-center justify-center`}>
                              <span className={`text-sm font-medium text-${category.color}-700`}>{i + 1}</span>
                            </div>
                            <span className="text-sm text-gray-700">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Timeline and Impact */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className={`p-3 bg-${category.color}-50 rounded-lg`}>
                        <div className="flex items-center space-x-2 mb-1">
                          <Clock className={`h-4 w-4 text-${category.color}-500`} />
                          <span className="text-sm font-medium text-gray-900">Timeline</span>
                        </div>
                        <p className="text-sm text-gray-600">{rec.timeline}</p>
                      </div>
                      <div className={`p-3 bg-${category.color}-50 rounded-lg`}>
                        <div className="flex items-center space-x-2 mb-1">
                          <TrendingUp className={`h-4 w-4 text-${category.color}-500`} />
                          <span className="text-sm font-medium text-gray-900">Impact</span>
                        </div>
                        <p className="text-sm text-gray-600">{rec.impact}</p>
                      </div>
                    </div>

                    {/* Tips */}
                    <div className={`p-4 bg-${category.color}-50 rounded-lg`}>
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Pro Tips</h4>
                      <ul className="space-y-2">
                        {rec.tips.map((tip, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <div className={`h-1.5 w-1.5 rounded-full bg-${category.color}-500 mt-1.5`} />
                            <span className="text-sm text-gray-700">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Difficulty Level */}
                    <div className="flex items-center justify-end">
                      <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                        rec.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                        rec.difficulty === 'moderate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {rec.difficulty} difficulty
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end p-6 border-t border-gray-100 bg-gray-50 rounded-b-xl">
            <button
              onClick={onClose}
              className={`px-4 py-2 bg-${category.color}-500 text-white rounded-lg hover:bg-${category.color}-600 transition-colors`}
            >
              Close Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}