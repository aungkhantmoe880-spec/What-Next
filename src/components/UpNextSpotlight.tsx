import { Task } from '../types';
import StarRatingDisplay from './StarRatingDisplay';
import { Check, ArrowRight } from 'lucide-react';

interface UpNextSpotlightProps {
  task: Task | null;
  onToggleComplete: (id: string) => void;
  onSelectForFocus?: (id: string) => void;
}

export default function UpNextSpotlight({
  task,
  onToggleComplete,
}: UpNextSpotlightProps) {
  if (!task) return null;

  return (
    <div className="bg-neutral-900 text-white rounded-xl p-4 sm:p-5 shadow-sm relative overflow-hidden transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400 uppercase">
            <span className="flex h-2 w-2 rounded-full bg-amber-400" />
            <span>Up Next — Highest Priority</span>
            <span className="text-neutral-500">·</span>
            <StarRatingDisplay rating={task.rating} size="sm" />
          </div>

          <h2 className="text-lg sm:text-xl font-semibold text-white tracking-tight break-words">
            {task.text}
          </h2>

          <p className="text-xs text-neutral-400">
            Tackle this first to make meaningful progress today.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 pt-1 sm:pt-0">
          <button
            type="button"
            onClick={() => onToggleComplete(task.id)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white text-neutral-900 text-sm font-semibold hover:bg-neutral-100 active:bg-neutral-200 transition-colors shadow-xs"
          >
            <Check className="w-4 h-4 stroke-[2.5] text-blue-600" />
            <span>Complete This First</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-600 hidden sm:inline" />
          </button>
        </div>
      </div>
    </div>
  );
}
