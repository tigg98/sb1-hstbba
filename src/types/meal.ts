export interface MealLogData {
  type: string;
  foods: Food[];
  time: string;
  hunger: number;
  fullness: number;
  mood: string;
  symptoms: string[];
  notes?: string;
  photos?: string[];
  location?: string;
}

export interface Food {
  name: string;
  portion: string;
  calories: number;
  category: string;
  ingredients?: string[];
  isProcessed?: boolean;
  isGutFriendly?: boolean;
}

export interface MealSummary {
  id: string;
  type: string;
  time: string;
  totalCalories: number;
  foodCount: number;
  symptoms: string[];
  mood: string;
  impact: 'positive' | 'neutral' | 'negative';
}

export interface NutrientInfo {
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
}