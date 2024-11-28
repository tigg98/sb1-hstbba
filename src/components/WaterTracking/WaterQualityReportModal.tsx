import React from 'react';
import { X, Droplet, AlertCircle, FileText } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function WaterQualityReportModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  const waterQualityData = {
    overall: { score: 88, grade: 'A-' },
    metrics: [
      { name: 'pH Level', value: '7.2', status: 'optimal', recommendation: 'Maintain current levels' },
      { name: 'Mineral Content', value: '180 TDS', status: 'good', recommendation: 'Consider mineral supplements' },
      { name: 'Chlorine', value: '0.5 mg/L', status: 'acceptable', recommendation: 'Use carbon filter' }
    ],
    recommendations: [
      'Continue using water filtration system',
      'Test water quality monthly',
      'Monitor mineral content regularly'
    ]
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-25">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900">Water Quality Report</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Overall Score */}
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div>
                <h3 className="text-lg font-semibold text-blue-900">Overall Quality Score</h3>
                <p className="text-sm text-blue-700">Based on latest measurements</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-700">{waterQualityData.overall.score}</p>
                <p className="text-sm text-blue-600">Grade: {waterQualityData.overall.grade}</p>
              </div>
            </div>

            {/* Detailed Metrics */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Detailed Analysis</h3>
              {waterQualityData.metrics.map((metric, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{metric.name}</h4>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      metric.status === 'optimal' ? 'bg-green-100 text-green-700' :
                      metric.status === 'good' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {metric.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Current Value: {metric.value}</p>
                  <p className="text-sm text-blue-600">{metric.recommendation}</p>
                </div>
              ))}
            </div>

            {/* Recommendations */}
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-3">Recommendations</h3>
              <div className="space-y-2">
                {waterQualityData.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-1.5" />
                    <p className="text-sm text-green-700">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end p-6 border-t border-gray-100 bg-gray-50 rounded-b-xl">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Close Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}