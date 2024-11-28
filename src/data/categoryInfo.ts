import { 
  Activity, 
  Heart, 
  Utensils, 
  Pill, 
  Wine, 
  Droplet,
  Brain 
} from 'lucide-react';
import MealLogModal from '../components/MealLog/MealLogModal';
import ExerciseLogModal from '../components/ExerciseLog/ExerciseLogModal';
import SupplementLogModal from '../components/SupplementLog/SupplementLogModal';
import AlcoholLogModal from '../components/QuickLog/AlcoholLogModal';
import WaterLogModal from '../components/WaterTracking/WaterLogModal';
import AcneLogModal from '../components/AcneTracking/AcneLogModal';
import MoodLogModal from '../components/MoodLog/MoodLogModal';
import type { CategoryInfo } from '../types/activity';

export const categoryInfo: Record<string, CategoryInfo> = {
  meals: {
    title: 'Meal Tracking',
    description: 'Monitor your nutrition and its impact on gut health',
    icon: Utensils,
    color: 'emerald',
    bgColor: 'emerald-600',
    hoverColor: 'emerald-700',
    Modal: MealLogModal,
    tips: [
      'Eat slowly and chew thoroughly to improve digestion',
      'Keep meals 3-4 hours apart to allow proper digestion',
      'Include fiber-rich foods in each meal for gut health',
      'Track symptoms 2-3 hours after eating to identify triggers'
    ]
  },
  exercise: {
    title: 'Exercise Log',
    description: 'Track workouts and their effect on symptoms',
    icon: Activity,
    color: 'blue',
    bgColor: 'blue-600',
    hoverColor: 'blue-700',
    Modal: ExerciseLogModal,
    tips: [
      'Exercise 2-3 hours after meals to avoid digestive stress',
      'Start with 10-15 minutes and gradually increase duration',
      'Keep heart rate between 120-140 BPM for optimal benefits',
      'Include recovery days between intense workouts'
    ]
  },
  supplements: {
    title: 'Supplement Tracker',
    description: 'Record supplements and their effectiveness',
    icon: Pill,
    color: 'purple',
    bgColor: 'purple-600',
    hoverColor: 'purple-700',
    Modal: SupplementLogModal,
    tips: [
      'Take probiotics on empty stomach for best absorption',
      'Space mineral supplements 2 hours apart from each other',
      'Track effectiveness over 4-6 weeks minimum',
      'Note any interactions with medications or foods'
    ]
  },
  water: {
    title: 'Water Quality',
    description: 'Monitor hydration and water quality',
    icon: Droplet,
    color: 'blue',
    bgColor: 'blue-600',
    hoverColor: 'blue-700',
    Modal: WaterLogModal,
    tips: [
      'Aim for 2-3L of filtered water daily',
      'Add mineral drops to improve electrolyte balance',
      'Drink room temperature water to aid digestion',
      'Avoid water 30 minutes before/after meals'
    ]
  },
  skin: {
    title: 'Skin Health',
    description: 'Track skin conditions and gut-skin connection',
    icon: Heart,
    color: 'pink',
    bgColor: 'pink-600',
    hoverColor: 'pink-700',
    Modal: AcneLogModal,
    tips: [
      'Document skin changes within 24-48h of dietary changes',
      'Track inflammation patterns with gut symptoms',
      'Note seasonal impacts on skin-gut connection',
      'Monitor healing time after flare-ups'
    ]
  },
  alcohol: {
    title: 'Alcohol Consumption',
    description: 'Monitor alcohol intake and its effects',
    icon: Wine,
    color: 'red',
    bgColor: 'red-600',
    hoverColor: 'red-700',
    Modal: AlcoholLogModal,
    tips: [
      'Limit to 1-2 drinks and always with food',
      'Choose lower histamine options (clear spirits)',
      'Stay hydrated (1 glass water per drink)',
      'Allow 3 days between drinking sessions'
    ]
  },
  mood: {
    title: 'Mood Tracking',
    description: 'Monitor emotional well-being and stress levels',
    icon: Brain,
    color: 'purple',
    bgColor: 'purple-600',
    hoverColor: 'purple-700',
    Modal: MoodLogModal,
    tips: [
      'Track mood changes in relation to symptoms',
      'Note stress levels and their impact on gut health',
      'Monitor sleep quality correlation with mood',
      'Document emotional triggers and coping strategies'
    ]
  }
};