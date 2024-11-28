import React, { useState } from 'react';
import { X, Trophy, Filter, Star, Calendar, Target, Lock, Activity, Heart, Brain, Utensils } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
  earnedDate?: string;
  progress?: {
    current: number;
    total: number;
  };
  icon: any;
  status: 'earned' | 'in-progress' | 'locked';
  unlockCondition?: string;
}

export default function ViewAllAchievementsModal({ isOpen, onClose }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'health', name: 'Health' },
    { id: 'exercise', name: 'Exercise' },
    { id: 'nutrition', name: 'Nutrition' },
    { id: 'consistency', name: 'Consistency' },
    { id: 'gut', name: 'Gut Health' }
  ];

  const rarities = [
    { id: 'all', name: 'All Rarities' },
    { id: 'common', name: 'Common' },
    { id: 'rare', name: 'Rare' },
    { id: 'epic', name: 'Epic' },
    { id: 'legendary', name: 'Legendary' }
  ];

  const statuses = [
    { id: 'all', name: 'All Status' },
    { id: 'earned', name: 'Earned' },
    { id: 'in-progress', name: 'In Progress' },
    { id: 'locked', name: 'Locked' }
  ];

  const achievements: Achievement[] = [
    // Earned Achievements
    {
      id: '1',
      title: 'Consistency Champion',
      description: 'Log meals for 7 consecutive days',
      category: 'consistency',
      rarity: 'common',
      points: 100,
      earnedDate: '2024-03-15',
      progress: { current: 7, total: 7 },
      icon: Calendar,
      status: 'earned'
    },
    {
      id: '2',
      title: 'Exercise Master',
      description: 'Complete all weekly exercise goals',
      category: 'exercise',
      rarity: 'rare',
      points: 250,
      earnedDate: '2024-03-14',
      progress: { current: 5, total: 5 },
      icon: Activity,
      status: 'earned'
    },
    // In Progress Achievements
    {
      id: '3',
      title: 'Gut Health Guru',
      description: 'Maintain optimal gut health for 30 days',
      category: 'gut',
      rarity: 'epic',
      points: 500,
      progress: { current: 15, total: 30 },
      icon: Heart,
      status: 'in-progress'
    },
    {
      id: '4',
      title: 'Mindful Eating Master',
      description: 'Log mood and symptoms for 20 meals',
      category: 'nutrition',
      rarity: 'rare',
      points: 300,
      progress: { current: 8, total: 20 },
      icon: Brain,
      status: 'in-progress'
    },
    // Locked Achievements
    {
      id: '5',
      title: 'Nutrition Expert',
      description: 'Maintain balanced macros for 14 days',
      category: 'nutrition',
      rarity: 'legendary',
      points: 1000,
      icon: Utensils,
      status: 'locked',
      unlockCondition: 'Complete "Mindful Eating Master" first'
    },
    {
      id: '6',
      title: 'Ultimate Wellness',
      description: 'Achieve all health metrics targets for 30 days',
      category: 'health',
      rarity: 'legendary',
      points: 2000,
      icon: Star,
      status: 'locked',
      unlockCondition: 'Earn 10 other achievements first'
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'bg-blue-100 text-blue-700';
      case 'rare':
        return 'bg-purple-100 text-purple-700';
      case 'epic':
        return 'bg-orange-100 text-orange-700';
      case 'legendary':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'earned':
        return 'bg-green-100 text-green-700';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700';
      case 'locked':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredAchievements = achievements.filter(achievement => {
    if (selectedCategory !== 'all' && achievement.category !== selectedCategory) return false;
    if (selectedRarity !== 'all' && achievement.rarity !== selectedRarity) return false;
    if (selectedStatus !== 'all' && achievement.status !== selectedStatus) return false;
    return true;
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-25">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-xl w-full max-w-4xl">
          <div className="flex justify-between items-center p-6 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <h2 className="text-xl font-semibold text-gray-900">All Achievements</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          <div className="p-6">
            {/* Filters */}
            <div className="flex items-center space-x-4 mb-6">
              <Filter className="h-5 w-5 text-gray-400" />
              <div className="flex space-x-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedRarity}
                  onChange={(e) => setSelectedRarity(e.target.value)}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {rarities.map(rarity => (
                    <option key={rarity.id} value={rarity.id}>
                      {rarity.name}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  {statuses.map(status => (
                    <option key={status.id} value={status.id}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAchievements.map(achievement => (
                <div
                  key={achievement.id}
                  className={`p-4 border border-gray-100 rounded-lg transition-colors ${
                    achievement.status === 'locked' ? 'opacity-75' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${
                      achievement.status === 'locked' ? 'bg-gray-50' : 'bg-yellow-50'
                    }`}>
                      {achievement.status === 'locked' ? (
                        <Lock className="h-6 w-6 text-gray-400" />
                      ) : (
                        <achievement.icon className="h-6 w-6 text-yellow-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">{achievement.title}</h3>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <span className={`text-xs px-2 py-1 rounded-full capitalize ${getRarityColor(achievement.rarity)}`}>
                            {achievement.rarity}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full capitalize ${getStatusStyle(achievement.status)}`}>
                            {achievement.status}
                          </span>
                        </div>
                      </div>
                      
                      {achievement.progress && achievement.status !== 'locked' && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{achievement.progress.current}/{achievement.progress.total}</span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                achievement.status === 'earned' ? 'bg-green-500' : 'bg-blue-500'
                              }`}
                              style={{ width: `${(achievement.progress.current / achievement.progress.total) * 100}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {achievement.unlockCondition && (
                        <div className="mt-3 flex items-center space-x-2 text-sm text-gray-500">
                          <Lock className="h-4 w-4" />
                          <span>{achievement.unlockCondition}</span>
                        </div>
                      )}

                      <div className="mt-3 flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1">
                          <Trophy className="h-4 w-4 text-yellow-500" />
                          <span className="font-medium text-gray-900">{achievement.points} points</span>
                        </div>
                        {achievement.earnedDate && (
                          <span className="text-gray-500">
                            Earned {new Date(achievement.earnedDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
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