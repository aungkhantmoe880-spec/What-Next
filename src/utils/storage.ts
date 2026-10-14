import { Task, StarRating } from '../types';

const STORAGE_KEY = 'what_next_tasks_v1';

export const INITIAL_SAMPLE_TASKS: Omit<Task, 'id' | 'createdAt'>[] = [
  {
    text: 'Finalize client presentation for quarterly review',
    rating: 5,
    completed: false,
  },
  {
    text: 'Submit project expense report before 5 PM',
    rating: 4,
    completed: false,
  },
  {
    text: 'Draft summary notes from team retrospective',
    rating: 3,
    completed: false,
  },
  {
    text: 'Organize workspace desktop and clear inbox',
    rating: 2,
    completed: false,
  },
  {
    text: 'Check supply inventory for printer paper',
    rating: 1,
    completed: false,
  },
];

export function loadTasksFromStorage(): Task[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    // Validate and sanitize records
    return parsed.filter((item): item is Task => {
      return (
        item &&
        typeof item === 'object' &&
        typeof item.id === 'string' &&
        typeof item.text === 'string' &&
        item.text.trim().length > 0 &&
        typeof item.rating === 'number' &&
        item.rating >= 1 &&
        item.rating <= 5 &&
        typeof item.completed === 'boolean' &&
        typeof item.createdAt === 'number'
      );
    });
  } catch (error) {
    console.error('Failed to parse tasks from localStorage:', error);
    return [];
  }
}

export function saveTasksToStorage(tasks: Task[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks to localStorage:', error);
  }
}

export function createSampleTasks(): Task[] {
  const now = Date.now();
  return INITIAL_SAMPLE_TASKS.map((item, index) => ({
    id: `sample-${now}-${index}`,
    text: item.text,
    rating: item.rating as StarRating,
    completed: false,
    createdAt: now - (INITIAL_SAMPLE_TASKS.length - index) * 60000,
  }));
}
