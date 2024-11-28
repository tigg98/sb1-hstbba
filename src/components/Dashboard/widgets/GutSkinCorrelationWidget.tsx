import React, { useState } from 'react';
import { Brain, TrendingUp, AlertCircle, ArrowRight, Info } from 'lucide-react';

interface Correlation {
  id: string;
  factor: string;
  correlation: number;
  trend: 'improving' | 'stable' | 'declining';
  impact: string;
  details: {
    gutSymptom: string;
    skinSymptom: string;
    timelag: string;
  };
}

interface Insight {
  id: string;
  title: string;
  description: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
}

export default function GutSkinCorrelationWidget() {
  const [expandedCorrelation, setExpandedCorrelation] = useState<string | null>(null);
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null);

  const correlations: Correlation[] = [
    {
      id: 'corr1',
      factor: 'Inflammation',
      correlation: 0.85,
      trend: 'improving',
      impact: 'Strong correlation with gut health',
      details: {
        gutSymptom: 'Bloating',
        skinSymptom: 'Acne',
        timelag: '24-48h'
      }
    },
    {
      id: 'corr2',
      factor: 'Diet',
      correlation: 0.72,
      trend: 'stable',
      impact: 'Moderate impact on skin condition',
      details: {
        gutSymptom: 'Digestion',
        skinSymptom: 'Inflammation',
        timelag: '12-24h'
      }
    }
  ];

  const insights: Insight[] = [
    {
      id: 'ins1',
      title: 'Dietary Pattern',
      description: 'Anti-inflammatory foods showing 30% improvement in both gut and skin health',
      action: 'Continue current diet plan',
      priority: 'high'
    },
    {
      id: 'ins2',
      title: 'Sleep Quality',
      description: 'Better sleep correlates with reduced skin inflammation',
      action: 'Maintain 7-8 hour sleep schedule',
      priority: 'medium'
    }
  ];

  const handleCorrelationClick = (id: string) => {
    setExpandedCorrelation(expandedCorrelation === id ? null : id);
  };

  const handleInsightClick = (id: string) => {
    setExpandedInsight(expandedInsight === id ? null : id);
  };

  const handleKeyPress = (event: React.KeyboardEvent, id: string, type: 'correlation' | 'insight') => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (type === 'correlation') {
        handleCorrelationClick(id);
      } else {
        handleInsightClick(id);
      }
    }
  };

  return (
    <section 
      className="bg-white rounded-xl shadow-sm p-4 transition-all duration-300 hover:shadow-md"
      aria-labelledby="gut-skin-title"
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 id="gut-skin-title" className="text-lg font-semibold text-gray-900">
            Gut-Skin Connection
          </h2>
          <p className="text-xs text-gray-600">Correlation analysis</p>
        </div>
        <div 
          className="p-1.5 bg-purple-50 rounded-lg transition-all duration-300 hover:bg-purple-100"
          aria-hidden="true"
        >
          <Brain className="h-4 w-4 text-purple-500" />
        </div>
      </div>

      <div 
        className="space-y-2 mb-3"
        role="list"
        aria-label="Correlations"
      >
        {correlations.map((item) => (
          <article
            key={item.id}
            className="p-3 bg-gray-50 rounded-lg transition-all duration-300 hover:bg-gray-100"
            role="listitem"
          >
            <button
              onClick={() => handleCorrelationClick(item.id)}
              onKeyPress={(e) => handleKeyPress(e, item.id, 'correlation')}
              className="w-full text-left focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg"
              aria-expanded={expandedCorrelation === item.id}
              aria-controls={`correlation-details-${item.id}`}
            >
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-sm font-medium text-gray-900">{item.factor}</h3>
                <div className="flex items-center space-x-1">
                  <TrendingUp className={`h-3 w-3 ${
                    item.trend === 'improving' ? 'text-green-500' : 'text-blue-500'
                  }`} aria-hidden="true" />
                  <span 
                    className="text-xs text-gray-600"
                    aria-label={`${Math.round(item.correlation * 100)}% correlation`}
                  >
                    {Math.round(item.correlation * 100)}%
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-600 mb-1">{item.impact}</p>
            </button>

            {expandedCorrelation === item.id && (
              <div
                id={`correlation-details-${item.id}`}
                className="p-1.5 bg-white rounded-lg mt-2 transition-all duration-300"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-purple-600">{item.details.gutSymptom}</span>
                  <ArrowRight className="h-3 w-3 text-gray-400" aria-hidden="true" />
                  <span className="text-pink-600">{item.details.skinSymptom}</span>
                  <span className="text-gray-500">{item.details.timelag}</span>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>

      <div 
        className="space-y-2"
        role="list"
        aria-label="Health insights"
      >
        {insights.map((insight) => (
          <article
            key={insight.id}
            className="p-3 bg-purple-50 rounded-lg transition-all duration-300 hover:bg-purple-100"
            role="listitem"
          >
            <button
              onClick={() => handleInsightClick(insight.id)}
              onKeyPress={(e) => handleKeyPress(e, insight.id, 'insight')}
              className="w-full text-left focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg"
              aria-expanded={expandedInsight === insight.id}
              aria-controls={`insight-details-${insight.id}`}
            >
              <div className="flex items-start space-x-2">
                <Info className="h-4 w-4 text-purple-500 mt-0.5" aria-hidden="true" />
                <div>
                  <h3 className="text-xs font-medium text-purple-900">{insight.title}</h3>
                  <p className="text-xs text-purple-700 mt-0.5">{insight.description}</p>
                </div>
              </div>
            </button>

            {expandedInsight === insight.id && (
              <div
                id={`insight-details-${insight.id}`}
                className="mt-2 pl-6 transition-all duration-300"
              >
                <div className="flex items-center space-x-1 text-xs text-purple-600">
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  <span>Recommended Action: {insight.action}</span>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}