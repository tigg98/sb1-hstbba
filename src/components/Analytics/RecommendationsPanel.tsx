import React from 'react';
import { Lightbulb, Brain, ArrowRight } from 'lucide-react';

interface Recommendation {
  title: string;
  description: string;
  impact: string;
  actionable: string;
  priority: 'high' | 'medium' | 'low';
}

interface Props {
  metric: 'inflammation' | 'sleep' | 'stress' | 'diet' | 'exercise' | 'skin' | 'water';
}

export default function RecommendationsPanel({ metric }: Props) {
  const getRecommendations = (metric: string): Recommendation[] => {
    switch (metric) {
      case 'inflammation':
        return [
          {
            title: 'Increase Anti-inflammatory Foods',
            description: 'Your diet shows room for more anti-inflammatory foods',
            impact: 'Could reduce inflammation markers by 30%',
            actionable: 'Add turmeric, ginger, and leafy greens to daily meals',
            priority: 'high'
          },
          {
            title: 'Optimize Exercise Timing',
            description: 'Morning exercise shows better inflammation response',
            impact: 'May reduce inflammatory markers by 25%',
            actionable: 'Schedule workouts between 7-9 AM',
            priority: 'medium'
          }
        ];
      case 'sleep':
        return [
          {
            title: 'Improve Sleep Environment',
            description: 'Room temperature affects sleep quality',
            impact: 'Better sleep reduces inflammation by 35%',
            actionable: 'Keep bedroom temperature between 65-68°F',
            priority: 'high'
          },
          {
            title: 'Consistent Sleep Schedule',
            description: 'Variable sleep times affect gut health',
            impact: 'Regular sleep reduces symptoms by 40%',
            actionable: 'Maintain same sleep/wake times within 30 minutes',
            priority: 'medium'
          }
        ];
      case 'stress':
        return [
          {
            title: 'Implement Stress Breaks',
            description: 'High cortisol levels affect gut health',
            impact: 'Regular breaks reduce stress by 45%',
            actionable: 'Take 5-minute breathing breaks every 2 hours',
            priority: 'high'
          },
          {
            title: 'Mindfulness Practice',
            description: 'Meditation improves stress resilience',
            impact: 'Daily practice reduces anxiety by 30%',
            actionable: 'Start with 10 minutes guided meditation daily',
            priority: 'medium'
          }
        ];
      case 'diet':
        return [
          {
            title: 'Reduce Seed Oil Intake',
            description: 'High omega-6 intake from seed oils increases inflammation',
            impact: 'Reducing intake improves gut health by 40%',
            actionable: 'Switch to olive oil, avocado oil, or coconut oil',
            priority: 'high'
          },
          {
            title: 'Increase Fiber Diversity',
            description: 'Limited fiber sources in current diet',
            impact: 'Diverse fiber improves microbiome health by 35%',
            actionable: 'Add 2-3 new fiber sources weekly',
            priority: 'medium'
          }
        ];
      case 'exercise':
        return [
          {
            title: 'Optimize Exercise Intensity',
            description: 'Current intensity may be too high',
            impact: 'Moderate intensity improves gut health by 30%',
            actionable: 'Keep heart rate between 120-140 BPM',
            priority: 'high'
          },
          {
            title: 'Post-Exercise Recovery',
            description: 'Recovery protocol needs improvement',
            impact: 'Better recovery reduces inflammation by 25%',
            actionable: 'Add 10-minute cool-down walks after workouts',
            priority: 'medium'
          }
        ];
      case 'skin':
        return [
          {
            title: 'Gut-Skin Connection',
            description: 'Skin issues correlate with gut inflammation',
            impact: 'Improving gut health reduces acne by 45%',
            actionable: 'Focus on probiotic-rich foods daily',
            priority: 'high'
          },
          {
            title: 'Hydration Quality',
            description: 'Water quality affects skin health',
            impact: 'Better water quality improves skin by 30%',
            actionable: 'Switch to filtered water with minerals',
            priority: 'medium'
          }
        ];
      case 'water':
        return [
          {
            title: 'Mineral Balance',
            description: 'Current water lacks essential minerals',
            impact: 'Proper mineralization improves hydration by 40%',
            actionable: 'Add trace mineral drops to filtered water',
            priority: 'high'
          },
          {
            title: 'Timing Optimization',
            description: 'Water intake timing needs adjustment',
            impact: 'Better timing improves absorption by 25%',
            actionable: 'Drink 500ml water 30 minutes before meals',
            priority: 'medium'
          }
        ];
      default:
        return [];
    }
  };

  const recommendations = getRecommendations(metric);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          <h2 className="text-lg font-semibold text-gray-900">Personalized Recommendations</h2>
        </div>
        <Brain className="h-5 w-5 text-purple-500" />
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              rec.priority === 'high'
                ? 'bg-red-50'
                : rec.priority === 'medium'
                ? 'bg-yellow-50'
                : 'bg-blue-50'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className={`font-medium ${
                  rec.priority === 'high'
                    ? 'text-red-900'
                    : rec.priority === 'medium'
                    ? 'text-yellow-900'
                    : 'text-blue-900'
                }`}>
                  {rec.title}
                </h3>
                <p className={`text-sm mt-1 ${
                  rec.priority === 'high'
                    ? 'text-red-700'
                    : rec.priority === 'medium'
                    ? 'text-yellow-700'
                    : 'text-blue-700'
                }`}>
                  {rec.description}
                </p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                rec.priority === 'high'
                  ? 'bg-red-100 text-red-700'
                  : rec.priority === 'medium'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {rec.priority} priority
              </span>
            </div>

            <div className="mt-3 space-y-2">
              <div className={`flex items-center space-x-2 text-sm ${
                rec.priority === 'high'
                  ? 'text-red-700'
                  : rec.priority === 'medium'
                  ? 'text-yellow-700'
                  : 'text-blue-700'
              }`}>
                <span className="font-medium">Impact:</span>
                <span>{rec.impact}</span>
              </div>
              <div className={`flex items-center justify-between text-sm ${
                rec.priority === 'high'
                  ? 'text-red-700'
                  : rec.priority === 'medium'
                  ? 'text-yellow-700'
                  : 'text-blue-700'
              }`}>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">Action:</span>
                  <span>{rec.actionable}</span>
                </div>
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}