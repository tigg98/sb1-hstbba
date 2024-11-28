import React, { useState } from 'react';
import { 
  Brain, 
  Heart, 
  Moon, 
  Activity, 
  Utensils, 
  Droplet, 
  AlertCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Clock,
  TrendingUp
} from 'lucide-react';
import RecommendationDetails from './RecommendationDetails';

interface CategoryRecommendation {
  icon: any;
  title: string;
  color: string;
  recommendations: string[];
  impact: string;
  timeline: {
    shortTerm: string;
    mediumTerm: string;
  };
  scientificBasis: string;
  implementation: string[];
}

export default function RecommendationsSummary() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryRecommendation | null>(null);
  // Initialize with all categories expanded
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set([
    'Inflammation',
    'Sleep',
    'Stress',
    'Diet'
  ]));

  const categories: CategoryRecommendation[] = [
    {
      icon: AlertCircle,
      title: 'Inflammation',
      color: 'red',
      recommendations: [
        'Increase anti-inflammatory foods',
        'Optimize exercise timing',
        'Reduce seed oil consumption',
        'Monitor inflammatory triggers',
        'Implement stress reduction',
        'Maintain sleep schedule'
      ],
      impact: 'Could reduce inflammation by 35%',
      timeline: {
        shortTerm: 'Initial improvements in 1-2 weeks',
        mediumTerm: 'Significant reduction in 4-6 weeks'
      },
      scientificBasis: 'Clinical studies show 35% reduction in inflammatory markers',
      implementation: [
        'Start with dietary changes',
        'Add stress management',
        'Optimize sleep quality'
      ]
    },
    {
      icon: Moon,
      title: 'Sleep',
      color: 'purple',
      recommendations: [
        'Consistent sleep schedule',
        'Optimize room temperature',
        'Reduce blue light exposure',
        'Create bedtime routine',
        'Monitor caffeine intake',
        'Practice relaxation'
      ],
      impact: 'May improve sleep quality by 40%',
      timeline: {
        shortTerm: 'Better sleep within 3-5 days',
        mediumTerm: 'Normalized patterns in 2-3 weeks'
      },
      scientificBasis: 'Research shows strong correlation with gut health improvement',
      implementation: [
        'Set fixed sleep/wake times',
        'Create optimal sleep environment',
        'Develop pre-sleep routine'
      ]
    },
    {
      icon: Brain,
      title: 'Stress',
      color: 'orange',
      recommendations: [
        'Regular meditation',
        'Implement stress breaks',
        'Deep breathing exercises',
        'Time management',
        'Exercise routine',
        'Mindfulness practices'
      ],
      impact: 'Could reduce stress levels by 45%',
      timeline: {
        shortTerm: 'Reduced anxiety in 1-2 weeks',
        mediumTerm: 'Improved resilience in 4-6 weeks'
      },
      scientificBasis: 'Studies show 45% reduction in cortisol levels',
      implementation: [
        'Start with 5-minute meditation',
        'Add breathing exercises',
        'Build mindfulness habit'
      ]
    },
    {
      icon: Utensils,
      title: 'Diet',
      color: 'green',
      recommendations: [
        'Increase fiber diversity',
        'Reduce processed foods',
        'Add probiotic foods',
        'Monitor portions',
        'Track meal timing',
        'Implement food rotation'
      ],
      impact: 'May improve gut health by 50%',
      timeline: {
        shortTerm: 'Digestive changes in 3-5 days',
        mediumTerm: 'Significant improvement in 3-4 weeks'
      },
      scientificBasis: 'Meta-analysis shows 50% improvement in gut health markers',
      implementation: [
        'Start food logging',
        'Introduce new foods gradually',
        'Monitor reactions'
      ]
    }
  ];

  const toggleCategory = (title: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(title)) {
        newSet.delete(title);
      } else {
        newSet.add(title);
      }
      return newSet;
    });
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Recommendations Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="w-full">
              <button
                onClick={() => toggleCategory(category.title)}
                className={`w-full p-4 bg-${category.color}-50 rounded-lg hover:bg-${category.color}-100 transition-colors`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 bg-${category.color}-100 rounded-lg`}>
                      <category.icon className={`h-5 w-5 text-${category.color}-500`} />
                    </div>
                    <h3 className={`font-medium text-${category.color}-900`}>{category.title}</h3>
                  </div>
                  {expandedCategories.has(category.title) ? (
                    <ChevronUp className={`h-5 w-5 text-${category.color}-500`} />
                  ) : (
                    <ChevronDown className={`h-5 w-5 text-${category.color}-500`} />
                  )}
                </div>
              </button>

              {expandedCategories.has(category.title) && (
                <div className={`mt-2 p-4 bg-${category.color}-50 rounded-lg border border-${category.color}-100`}>
                  <div className="space-y-4">
                    {/* Impact & Timeline */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className={`p-3 bg-${category.color}-100 bg-opacity-50 rounded-lg`}>
                        <div className="flex items-center space-x-2 mb-2">
                          <TrendingUp className={`h-4 w-4 text-${category.color}-700`} />
                          <span className={`text-sm font-medium text-${category.color}-700`}>Impact</span>
                        </div>
                        <p className={`text-sm text-${category.color}-800`}>{category.impact}</p>
                      </div>
                      <div className={`p-3 bg-${category.color}-100 bg-opacity-50 rounded-lg`}>
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock className={`h-4 w-4 text-${category.color}-700`} />
                          <span className={`text-sm font-medium text-${category.color}-700`}>Timeline</span>
                        </div>
                        <p className={`text-sm text-${category.color}-800`}>{category.timeline.shortTerm}</p>
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div>
                      <h4 className={`text-sm font-medium text-${category.color}-900 mb-2`}>Key Actions</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {category.recommendations.map((rec, i) => (
                          <div key={i} className="flex items-start space-x-2">
                            <div className={`h-1.5 w-1.5 rounded-full bg-${category.color}-500 mt-1.5`} />
                            <span className={`text-sm text-${category.color}-700`}>{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Implementation */}
                    <div>
                      <h4 className={`text-sm font-medium text-${category.color}-900 mb-2`}>Implementation</h4>
                      <div className="space-y-2">
                        {category.implementation.map((step, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <ArrowRight className={`h-4 w-4 text-${category.color}-500`} />
                            <span className={`text-sm text-${category.color}-700`}>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* View Details Button */}
                    <button
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full flex items-center justify-between p-3 bg-${category.color}-100 text-${category.color}-700 rounded-lg hover:bg-${category.color}-200 transition-colors mt-2`}
                    >
                      <span>View Complete Analysis</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedCategory && (
        <RecommendationDetails
          isOpen={true}
          onClose={() => setSelectedCategory(null)}
          category={selectedCategory}
        />
      )}
    </>
  );
}