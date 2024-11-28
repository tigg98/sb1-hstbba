import React, { useState } from 'react';
import { X, Activity, Clock, Heart, Filter, Search, ArrowRight } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface Workout {
  id: string;
  name: string;
  type: string;
  duration: number;
  intensity: 'Low' | 'Moderate' | 'High';
  impact: string;
  benefits: string[];
  recommendedTime: string;
  caloriesBurn: number;
}

export default function ViewAllWorkoutsModal({ isOpen, onClose }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIntensity, setSelectedIntensity] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string[]>([]);

  const workouts: Workout[] = [
    {
      id: '1',
      name: 'Morning Walk',
      type: 'Cardio',
      duration: 30,
      intensity: 'Low',
      impact: 'Minimal stress on digestive system',
      benefits: ['Improves circulation', 'Reduces morning stiffness', 'Aids digestion'],
      recommendedTime: 'Morning',
      caloriesBurn: 150
    },
    {
      id: '2',
      name: 'Gentle Yoga Flow',
      type: 'Flexibility',
      duration: 20,
      intensity: 'Low',
      impact: 'Promotes gut motility',
      benefits: ['Reduces stress', 'Improves flexibility', 'Enhances mindfulness'],
      recommendedTime: 'Evening',
      caloriesBurn: 100
    },
    {
      id: '3',
      name: 'Swimming',
      type: 'Cardio',
      duration: 45,
      intensity: 'Moderate',
      impact: 'Low joint impact',
      benefits: ['Full body workout', 'Improves cardiovascular health', 'Gentle on joints'],
      recommendedTime: 'Afternoon',
      caloriesBurn: 300
    }
  ];

  const intensityOptions = ['Low', 'Moderate', 'High'];
  const typeOptions = ['Cardio', 'Strength', 'Flexibility', 'Balance'];

  const toggleIntensity = (intensity: string) => {
    setSelectedIntensity(prev => 
      prev.includes(intensity)
        ? prev.filter(i => i !== intensity)
        : [...prev, intensity]
    );
  };

  const toggleType = (type: string) => {
    setSelectedType(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const filteredWorkouts = workouts.filter(workout => {
    const matchesSearch = workout.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         workout.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIntensity = selectedIntensity.length === 0 || selectedIntensity.includes(workout.intensity);
    const matchesType = selectedType.length === 0 || selectedType.includes(workout.type);
    return matchesSearch && matchesIntensity && matchesType;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-25">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-4xl">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-blue-500" />
              <h2 className="text-xl font-semibold text-gray-900">Recommended Workouts</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          <div className="p-6">
            {/* Search and Filters */}
            <div className="flex space-x-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search workouts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-600">Filters</span>
              </div>
            </div>

            {/* Filter Options */}
            <div className="mb-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Intensity</h3>
                  <div className="flex space-x-2">
                    {intensityOptions.map(intensity => (
                      <button
                        key={intensity}
                        onClick={() => toggleIntensity(intensity)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${
                          selectedIntensity.includes(intensity)
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {intensity}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Type</h3>
                  <div className="flex space-x-2">
                    {typeOptions.map(type => (
                      <button
                        key={type}
                        onClick={() => toggleType(type)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${
                          selectedType.includes(type)
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Workouts List */}
            <div className="space-y-4">
              {filteredWorkouts.map(workout => (
                <div
                  key={workout.id}
                  className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{workout.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      workout.intensity === 'Low' ? 'bg-green-100 text-green-700' :
                      workout.intensity === 'Moderate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {workout.intensity} Intensity
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{workout.duration} min</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Activity className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{workout.type}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Heart className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{workout.caloriesBurn} cal</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {workout.benefits.map((benefit, index) => (
                      <span
                        key={index}
                        className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
                      >
                        {benefit}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Best time: {workout.recommendedTime}</span>
                    <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700">
                      <span>Start Workout</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}