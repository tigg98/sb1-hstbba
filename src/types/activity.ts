export type ActivityType = 'all' | 'meals' | 'exercise' | 'supplements' | 'water' | 'skin' | 'alcohol' | 'mood';

export interface ActivityStatus {
  label: string;
  type: 'success' | 'warning' | 'alert' | 'info';
  message: string;
}

export interface ActivityMetrics {
  [key: string]: string | number;
}

export interface ActivityDetails {
  notes?: string;
  recommendations?: string[];
  nextSteps?: string[];
}

export interface Activity {
  id: string;
  type: ActivityType;
  time: string;
  title: string;
  details: string;
  status?: ActivityStatus;
  metrics?: ActivityMetrics;
  additionalInfo?: ActivityDetails;
}

export interface CategoryInfo {
  title: string;
  description: string;
  icon: any;
  color: string;
  bgColor: string;
  hoverColor: string;
  Modal: React.ComponentType<any>;
  tips: string[];
}