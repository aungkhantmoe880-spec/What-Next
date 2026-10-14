import { useState } from 'react';
import { Task, StarRating } from '../types';
import TaskItem from './TaskItem';
import { ChevronDown, ChevronUp, CheckCheck, Trash2 } from 'lucide-react';

interface CompletedTaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onEditTask: (id: string, text: string, rating: StarRating) => void;
  onDeleteTask: (id: string) => void;
  onRestoreTask: (id: string) => void;
  onClearCompleted: () => void;
}

export default function CompletedTaskList({
  tasks,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
  onRestoreTask,
  onClearCompleted,
}: CompletedTaskListProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  if (tasks.length === 0) return null;

  return (
    <section aria-labelledby="completed-tasks-heading" className="space-y-3 pt-4 border-t border-neutral-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 rounded-md"
            aria-expanded={isExpanded}
          >
            <div className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <CheckCheck className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <h2
              id="completed-tasks-heading"
              className="text-base font-semibold text-neutral-800 tracking-tight"
            >
              Completed
            </h2>
            <span className="text-xs font-semibold text-neutral-500 tabular-nums">
              ({tasks.length})
            </span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-blue-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-blue-600" />
            )}
          </button>
        </div>

        {tasks.length > 0 && isExpanded && (
          <button
            type="button"
            onClick={onClearCompleted}
            className="inline-flex items-center gap-1 text-xs text-neutral-500 hover:text-rose-600 transition-colors p-1 rounded-md"
            title="Clear all completed tasks"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Completed</span>
          </button>
        )}
      </div>

      {isExpanded && (
        <div className="space-y-2">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onEditTask={onEditTask}
              onDeleteTask={onDeleteTask}
              onRestoreTask={onRestoreTask}
            />
          ))}
        </div>
      )}
    </section>
  );
}
