import { 
  Activity, 
  Utensils, 
  Pill, 
  Droplet, 
  Heart, 
  Wine 
} from 'lucide-react';
import type { ActivityType } from '../types/activity';

export function getActivityIcon(type: ActivityType) {
  switch (type) {
    case 'meals':
      return Utensils;
    case 'exercise':
      return Activity;
    case 'supplements':
      return Pill;
    case 'water':
      return Droplet;
    case 'skin':
      return Heart;
    case 'alcohol':
      return Wine;
    default:
      return Activity;
  }
}