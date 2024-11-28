import { useState, useEffect } from 'react';
import type { ExerciseData } from '../components/ExerciseLog/ExerciseLogForm';

interface ExerciseStats {
  totalMinutes: number;
  totalCalories: number;
  averageHeartRate: number;
  weeklyGoalProgress: number;
}

interface ExerciseImpact {
  gutHealth: 'positive' | 'neutral' | 'negative';
  energyLevel: 'increased' | 'decreased' | 'unchanged';
  symptoms: string[];
  recommendations: string[];
}

export function useExerciseTracking() {
  const [exerciseHistory, setExerciseHistory] = useState<ExerciseData[]>([]);
  const [stats, setStats] = useState<ExerciseStats>({
    totalMinutes: 0,
    totalCalories: 0,
    averageHeartRate: 0,
    weeklyGoalProgress: 0
  });
  const [impact, setImpact] = useState<ExerciseImpact>({
    gutHealth: 'neutral',
    energyLevel: 'unchanged',
    symptoms: [],
    recommendations: []
  });

  const addExercise = (exercise: ExerciseData) => {
    setExerciseHistory(prev => [...prev, exercise]);
    updateStats([...exerciseHistory, exercise]);
    analyzeImpact([...exerciseHistory, exercise]);
  };

  const updateStats = (exercises: ExerciseData[]) => {
    const weeklyExercises = exercises.filter(e => {
      const exerciseDate = new Date(e.time);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return exerciseDate >= weekAgo;
    });

    setStats({
      totalMinutes: weeklyExercises.reduce((sum, e) => sum + e.duration, 0),
      totalCalories: weeklyExercises.reduce((sum, e) => sum + (e.caloriesBurned || 0), 0),
      averageHeartRate: weeklyExercises.reduce((sum, e) => sum + (e.heartRate || 0), 0) / weeklyExercises.length || 0,
      weeklyGoalProgress: (weeklyExercises.length / 5) * 100 // Assuming 5 workouts per week goal
    });
  };

  const analyzeImpact = (exercises: ExerciseData[]) => {
    // Analyze impact on gut health and overall well-being
    // Implementation details...
  };

  const getExerciseRecommendations = () => {
    // Generate personalized exercise recommendations
    // Implementation details...
  };

  return {
    exerciseHistory,
    stats,
    impact,
    addExercise,
    getExerciseRecommendations
  };
}