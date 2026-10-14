import { Task, StarRating } from '../types';
import ProgressCircle from '../components/ProgressCircle';
import UpNextSpotlight from '../components/UpNextSpotlight';
import TaskItem from '../components/TaskItem';
import { Plus, CheckCircle2, Inbox, ArrowRight } from 'lucide-react';

interface TodoListScreenProps {
  activeTasks: Task[];
  completedCount: number;
  totalCount: number;
  onToggleComplete: (id: string) => void;
  onEditTask: (id: string, text: string, rating: StarRating) => void;
  onDeleteTask: (id: string) => void;
  onNavigateToInput: () => void;
  onNavigateToCompleted: () => void;
  onLoadSamples?: () => void;
}

export default function TodoListScreen({
  activeTasks,
  completedCount,
  totalCount,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
  onNavigateToInput,
  onNavigateToCompleted,
  onLoadSamples,
}: TodoListScreenProps) {
  const upNextTask = activeTasks.length > 0 ? activeTasks[0] : null;
  const allCompleted = totalCount > 0 && activeTasks.length === 0;

  return (
    <div className="space-y-6">
      {/* Top Progress & Daily Status Card */}
      <section
        aria-labelledby="progress-status-heading"
        className="bg-white rounded-2xl border border-neutral-200/90 p-5 sm:p-6 shadow-xs"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <ProgressCircle
            completedCount={completedCount}
            totalCount={totalCount}
          />

          <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-neutral-200/80 pt-4 sm:pt-0 sm:pl-6 gap-3">
            <div className="flex items-center gap-4 text-center sm:text-right">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-600 block">
                  Remaining
                </span>
                <span className="text-xl sm:text-2xl font-bold text-neutral-900 tabular-nums">
                  {activeTasks.length}
                </span>
              </div>
              <div className="w-px h-8 bg-neutral-200 sm:hidden" />
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-600 block">
                  Finished
                </span>
                <span className="text-xl sm:text-2xl font-bold text-emerald-600 tabular-nums">
                  {completedCount}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={onNavigateToInput}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 text-blue-400" />
              <span>Add Task</span>
            </button>
          </div>
        </div>
      </section>

      {/* Up Next Spotlight (The #1 highest-priority task right now) */}
      {upNextTask && (
        <UpNextSpotlight
          task={upNextTask}
          onToggleComplete={onToggleComplete}
        />
      )}

      {/* All Tasks Completed Celebratory Banner */}
      {allCompleted && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 stroke-[2.5] text-blue-600" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-neutral-900">
              All tasks completed!
            </h3>
            <p className="text-sm text-neutral-600 max-w-md mx-auto">
              You finished all {totalCount} task{totalCount === 1 ? '' : 's'} scheduled for today. Outstanding work!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
            <button
              type="button"
              onClick={onNavigateToCompleted}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <span>View Completed Tasks ({completedCount})</span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-200" />
            </button>
            <button
              type="button"
              onClick={onNavigateToInput}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-blue-900 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-blue-600" />
              <span>Add More Tasks</span>
            </button>
          </div>
        </div>
      )}

      {/* Active Tasks Section Header */}
      {!allCompleted && (
        <section aria-labelledby="todo-tasks-list-heading" className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2
                id="todo-tasks-list-heading"
                className="text-lg font-bold text-neutral-900 tracking-tight"
              >
                Your Tasks
              </h2>
              <span className="text-xs font-semibold text-neutral-500 tabular-nums">
                ({activeTasks.length})
              </span>
            </div>

            {activeTasks.length > 0 && (
              <span className="text-xs text-neutral-600">
                Sorted by importance (5★ → 1★)
              </span>
            )}
          </div>

          {activeTasks.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-neutral-300 p-8 text-center flex flex-col items-center justify-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <Inbox className="w-6 h-6 stroke-[1.5] text-blue-600" />
              </div>
              <div className="space-y-1">
                <p className="text-base font-semibold text-neutral-800">
                  Nothing planned yet. What’s next?
                </p>
                <p className="text-xs text-neutral-500 max-w-sm">
                  Add the tasks you need to complete today and rank them by importance.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={onNavigateToInput}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4 text-blue-400" />
                  <span>Input Your Tasks</span>
                </button>
                {onLoadSamples && (
                  <button
                    type="button"
                    onClick={onLoadSamples}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
                  >
                    <span>Load Starter Tasks</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-2.5">
              {activeTasks.map((task) => (
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
      )}

      {/* Completed Section Teaser Link (if user has finished tasks) */}
      {completedCount > 0 && !allCompleted && (
        <div className="pt-2 flex items-center justify-between text-xs text-neutral-500 border-t border-neutral-200">
          <span>{completedCount} task{completedCount === 1 ? '' : 's'} completed today</span>
          <button
            type="button"
            onClick={onNavigateToCompleted}
            className="inline-flex items-center gap-1 font-semibold text-neutral-900 hover:underline"
          >
            <span>View Completed Screen</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
          </button>
        </div>
      )}
    </div>
  );
}
