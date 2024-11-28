import React, { useState } from 'react';
import { Trophy, Star, Calendar, Medal } from 'lucide-react';
import ViewAllAchievementsModal from './ViewAllAchievementsModal';

interface Props {
  timeFrame: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export default function AchievementsList({ timeFrame }: Props) {
  const [isViewAllModalOpen, setIsViewAllModalOpen] = useState(false);

  const achievements = [
    {
      title: 'Consistency Champion',
      description: 'Logged meals for 7 consecutive days',
      date: '2024-03-15',
      type: 'streak',
      rarity: 'common',
      points: 100
    },
    {
      title: 'Exercise Master',
      description: 'Completed all weekly exercise goals',
      date: '2024-03-14',
      type: 'milestone',
      rarity: 'rare',
      points: 250
    },
    {
      title: 'Symptom Navigator',
      description: 'Maintained low symptoms for 5 days straight',
      date: '2024-03-13',
      type: 'health',
      rarity: 'epic',
      points: 500
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
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Recent Achievements</h2>
            <p className="text-sm text-gray-600">Your latest accomplishments</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              <span className="text-lg font-semibold text-gray-900">850</span>
              <span className="text-sm text-gray-600">points</span>
            </div>
            <button
              onClick={() => setIsViewAllModalOpen(true)}
              className="text-primary-600 text-sm font-medium hover:text-primary-700"
            >
              View All
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-yellow-50 rounded-lg">
                  <Trophy className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">{achievement.title}</h3>
                    <span className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium text-gray-600">
                        {achievement.points} pts
                      </span>
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        {new Date(achievement.date).toLocaleDateString()}
                      </span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full capitalize ${getRarityColor(achievement.rarity)}`}>
                      {achievement.rarity}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ViewAllAchievementsModal
        isOpen={isViewAllModalOpen}
        onClose={() => setIsViewAllModalOpen(false)}
      />
    </>
  );
}