import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Task, StarRating } from '../types';
import StarRatingDisplay from './StarRatingDisplay';
import StarRatingPicker from './StarRatingPicker';
import { Check, Edit2, Trash2, RotateCcw, X, Save } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEditTask: (id: string, text: string, rating: StarRating) => void;
  onDeleteTask: (id: string) => void;
  onRestoreTask?: (id: string) => void;
}

export default function TaskItem({
  task,
  onToggleComplete,
  onEditTask,
  onDeleteTask,
  onRestoreTask,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editRating, setEditRating] = useState<StarRating>(task.rating);
  const [editError, setEditError] = useState<string | null>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      setEditText(task.text);
      setEditRating(task.rating);
      setEditError(null);
      setTimeout(() => {
        editInputRef.current?.focus();
        editInputRef.current?.select();
      }, 50);
    }
  }, [isEditing, task.text, task.rating]);

  const handleSaveEdit = () => {
    const trimmed = editText.trim();
    if (!trimmed) {
      setEditError('Task description cannot be empty.');
      return;
    }
    onEditTask(task.id, trimmed, editRating);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditText(task.text);
    setEditRating(task.rating);
    setEditError(null);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancelEdit();
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-xl border-2 border-sky-400 p-4 shadow-sm transition-all">
        <div className="space-y-3">
          <div>
            <label htmlFor={`edit-task-${task.id}`} className="sr-only">
              Edit task description
            </label>
            <input
              id={`edit-task-${task.id}`}
              ref={editInputRef}
              type="text"
              value={editText}
              onChange={(e) => {
                setEditText(e.target.value);
                if (editError && e.target.value.trim()) setEditError(null);
              }}
              onKeyDown={handleKeyDown}
              className="w-full text-base font-medium text-neutral-900 bg-neutral-50 px-3 py-2 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400"
              placeholder="Task description"
            />
            {editError && (
              <p className="mt-1 text-xs text-rose-600 font-medium">
                {editError}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <StarRatingPicker value={editRating} onChange={setEditRating} />

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <X className="w-3.5 h-3.5" />
                <span>Cancel</span>
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`group relative flex items-start sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl border transition-all ${
        task.completed
          ? 'bg-neutral-50/70 border-neutral-200/60 opacity-80 hover:opacity-100'
          : 'bg-white border-neutral-200/90 hover:border-neutral-300 shadow-xs hover:shadow-sm'
      }`}
    >
      {/* Left side: Circular Completion Control & Task Text */}
      <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
        {/* Circular Checkbox */}
        <button
          type="button"
          onClick={() => onToggleComplete(task.id)}
          role="checkbox"
          aria-checked={task.completed}
          aria-label={
            task.completed
              ? `Mark "${task.text}" as incomplete`
              : `Mark "${task.text}" as complete`
          }
          className={`mt-0.5 sm:mt-0 w-6 h-6 rounded-full shrink-0 flex items-center justify-center border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sky-400 ${
            task.completed
              ? 'bg-emerald-600 border-emerald-600 text-white'
              : 'border-neutral-300 hover:border-sky-400 bg-white'
          }`}
        >
          {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </button>

        {/* Task Text & Mobile Star display */}
        <div className="min-w-0 flex-1">
          <p
            className={`text-sm sm:text-base leading-snug break-words transition-colors ${
              task.completed
                ? 'line-through text-neutral-400 font-normal'
                : 'text-neutral-900 font-medium'
            }`}
          >
            {task.text}
          </p>

          {/* Star rating for mobile screens */}
          <div className="mt-1 flex sm:hidden items-center gap-2">
            <StarRatingDisplay rating={task.rating} size="sm" showLabel />
          </div>
        </div>
      </div>

      {/* Right side: Star rating on desktop & Action buttons */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        {/* Desktop Star Rating */}
        <div className="hidden sm:block">
          <StarRatingDisplay
            rating={task.rating}
            size="md"
            showLabel={!task.completed}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1">
          {task.completed ? (
            <button
              type="button"
              onClick={() => {
                if (onRestoreTask) {
                  onRestoreTask(task.id);
                } else {
                  onToggleComplete(task.id);
                }
              }}
              title="Restore to active tasks"
              aria-label={`Restore task "${task.text}"`}
              className="p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <RotateCcw className="w-4 h-4 text-blue-600" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              title="Edit task"
              aria-label={`Edit task "${task.text}"`}
              className="p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              <Edit2 className="w-4 h-4 text-blue-600" />
            </button>
          )}

          <button
            type="button"
            onClick={() => onDeleteTask(task.id)}
            title="Delete task"
            aria-label={`Delete task "${task.text}"`}
            className="p-1.5 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-600"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
