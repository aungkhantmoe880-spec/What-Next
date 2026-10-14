import { Task, StarRating } from '../types';
import TaskItem from './TaskItem';
import { Sparkles, Inbox } from 'lucide-react';

interface ActiveTaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onEditTask: (id: string, text: string, rating: StarRating) => void;
  onDeleteTask: (id: string) => void;
  onLoadSamples?: () => void;
}

export default function ActiveTaskList({
  tasks,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
  onLoadSamples,
}: ActiveTaskListProps) {
  return (
    <section aria-labelledby="active-tasks-heading" className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2
            id="active-tasks-heading"
            className="text-lg font-bold text-neutral-900 tracking-tight"
          >
            Your Tasks
          </h2>
          <span className="text-xs font-semibold text-neutral-500 tabular-nums">
            ({tasks.length})
          </span>
        </div>

        {tasks.length > 0 && (
          <span className="text-xs text-neutral-400">
            Sorted by importance (5★ → 1★)
          </span>
        )}
      </div>

      {tasks.length === 0 ? (
        <div className="bg-white rounded-xl border border-dashed border-neutral-300 p-8 text-center flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <Inbox className="w-6 h-6 stroke-[1.5] text-blue-600" />
          </div>
          <div className="space-y-1">
            <p className="text-base font-semibold text-neutral-800">
              Nothing planned yet. What’s next?
            </p>
            <p className="text-xs text-neutral-500 max-w-sm">
              Add the first task you want to tackle today using the input box above.
            </p>
          </div>
          {onLoadSamples && (
            <button
              type="button"
              onClick={onLoadSamples}
              className="mt-2 inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Load Starter Tasks</span>
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-2.5">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onEditTask={onEditTask}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </div>
      )}
    </section>
  );
}
