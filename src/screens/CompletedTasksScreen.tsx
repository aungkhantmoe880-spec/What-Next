import { Task, StarRating } from '../types';
import ProgressCircle from '../components/ProgressCircle';
import TaskItem from '../components/TaskItem';
import {
  CheckCheck,
  RotateCcw,
  Trash2,
  ArrowLeft,
  Plus,
  Trophy,
} from 'lucide-react';

interface CompletedTasksScreenProps {
  completedTasks: Task[];
  activeCount: number;
  totalCount: number;
  onToggleComplete: (id: string) => void;
  onEditTask: (id: string, text: string, rating: StarRating) => void;
  onDeleteTask: (id: string) => void;
  onRestoreTask: (id: string) => void;
  onRestoreAllTasks: () => void;
  onClearCompleted: () => void;
  onNavigateToTodoList: () => void;
  onNavigateToInput: () => void;
}

export default function CompletedTasksScreen({
  completedTasks,
  activeCount,
  totalCount,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
  onRestoreTask,
  onRestoreAllTasks,
  onClearCompleted,
  onNavigateToTodoList,
  onNavigateToInput,
}: CompletedTasksScreenProps) {
  const percentage =
    totalCount > 0 ? Math.round((completedTasks.length / totalCount) * 100) : 0;
  const isAllDone = totalCount > 0 && activeCount === 0;

  return (
    <div className="space-y-6">
      {/* Screen Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
            Completed Tasks
          </h2>
          <p className="text-sm text-neutral-600">
            Review your finished tasks, restore items to your active queue, or celebrate your achievements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onNavigateToTodoList}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-700 bg-white border border-neutral-200 hover:bg-neutral-50 rounded-lg transition-colors shadow-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-blue-600" />
            <span>To-Do List</span>
          </button>
          <button
            type="button"
            onClick={onNavigateToInput}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-blue-400" />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Progress & Milestone Overview Card */}
      <section
        aria-labelledby="completed-progress-heading"
        className="bg-white rounded-2xl border border-neutral-200/90 p-5 sm:p-6 shadow-xs"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <ProgressCircle
            completedCount={completedTasks.length}
            totalCount={totalCount}
          />

          <div className="grid grid-cols-2 gap-4 w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-neutral-200/80 pt-4 sm:pt-0 sm:pl-6 text-center sm:text-left">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-600 block">
                Completion Rate
              </span>
              <span className="text-2xl font-bold text-neutral-900 tabular-nums">
                {percentage}%
              </span>
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-600 block">
                Finished Today
              </span>
              <span className="text-2xl font-bold text-blue-600 tabular-nums">
                {completedTasks.length}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Congratulatory Banner when all done */}
      {isAllDone && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex items-center gap-4 text-neutral-900">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
            <Trophy className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-neutral-900">100% Completed!</h3>
            <p className="text-xs text-neutral-600 mt-0.5">
              You tackled every prioritized item for today. Take a well-deserved breather or add tomorrow's goals.
            </p>
          </div>
        </div>
      )}

      {/* Completed Tasks List Section */}
      <section aria-labelledby="completed-list-heading" className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3
              id="completed-list-heading"
              className="text-lg font-bold text-neutral-900 tracking-tight"
            >
              Finished Items
            </h3>
            <span className="text-xs font-semibold text-neutral-500 tabular-nums">
              ({completedTasks.length})
            </span>
          </div>

          {completedTasks.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onRestoreAllTasks}
                className="inline-flex items-center gap-1 text-xs text-neutral-600 hover:text-neutral-900 transition-colors"
                title="Restore all completed tasks to the active list"
              >
                <RotateCcw className="w-3.5 h-3.5 text-blue-600" />
                <span>Restore All</span>
              </button>
              <button
                type="button"
                onClick={onClearCompleted}
                className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 transition-colors"
                title="Permanently remove all completed tasks"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </div>
          )}
        </div>

        {completedTasks.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-neutral-300 p-8 text-center flex flex-col items-center justify-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <CheckCheck className="w-6 h-6 stroke-[1.5] text-blue-600" />
            </div>
            <div className="space-y-1">
              <p className="text-base font-semibold text-neutral-800">
                No tasks completed yet
              </p>
              <p className="text-xs text-neutral-500 max-w-sm">
                When you check off tasks on your To-Do list, they will be archived here so you can track what you accomplished.
              </p>
            </div>
            <button
              type="button"
              onClick={onNavigateToTodoList}
              className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors"
            >
              <span>Go to To-Do List</span>
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {completedTasks.map((task) => (
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
    </div>
  );
}
