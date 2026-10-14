export type StarRating = 1 | 2 | 3 | 4 | 5;

export interface Task {
  id: string;
  text: string;
  rating: StarRating;
  completed: boolean;
  createdAt: number;
  completedAt?: number;
}

export const RATING_LABELS: Record<StarRating, string> = {
  5: 'Extremely important',
  4: 'Very important',
  3: 'Moderately important',
  2: 'Low importance',
  1: 'Least important',
};

export const RATING_DESCRIPTIONS: Record<StarRating, string> = {
  5: '★★★★★ — Extremely important',
  4: '★★★★☆ — Very important',
  3: '★★★☆☆ — Moderately important',
  2: '★★☆☆☆ — Low importance',
  1: '★☆☆☆☆ — Least important',
};
