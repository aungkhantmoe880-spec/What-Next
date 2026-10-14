import { useState, useRef, FormEvent, KeyboardEvent } from 'react';
import { Task, StarRating, RATING_LABELS, RATING_DESCRIPTIONS } from '../types';
import StarRatingPicker from '../components/StarRatingPicker';
import StarRatingDisplay from '../components/StarRatingDisplay';
import { Plus, ArrowRight, Check, ListTodo, Sparkles } from 'lucide-react';

interface InputTasksScreenProps {
  onAddTask: (text: string, rating: StarRating) => string;
  onNavigateToTodoList: () => void;
  onLoadSamples?: () => void;
  recentTasks: Task[];
  hasExistingTasks: boolean;
}

export default function InputTasksScreen({
  onAddTask,
  onNavigateToTodoList,
  onLoadSamples,
  recentTasks,
  hasExistingTasks,
}: InputTasksScreenProps) {
  const [text, setText] = useState('');
  const [rating, setRating] = useState<StarRating>(3);
  const [error, setError] = useState<string | null>(null);
  const [lastAddedText, setLastAddedText] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e?: FormEvent, andNavigate = false) => {
    if (e) e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) {
      setError('Please enter a task description before adding.');
      inputRef.current?.focus();
      return;
    }

    onAddTask(trimmed, rating);
    setLastAddedText(trimmed);
    setText('');
    setError(null);

    if (andNavigate) {
      onNavigateToTodoList();
    } else {
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="space-y-6">
      {/* Screen Title & Brief */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
          Input Daily Tasks
        </h2>
        <p className="text-sm text-neutral-600 leading-relaxed">
          Write down what you need to do today and assign an importance rating from 1 to 5 stars.
          Your tasks will automatically be sorted with the highest priority first.
        </p>
      </div>

      {/* Main Task Input Card */}
      <form
        onSubmit={(e) => handleSubmit(e, false)}
        className="bg-white rounded-2xl border border-neutral-200/90 p-5 sm:p-6 shadow-xs space-y-5"
      >
        {/* Text Input */}
        <div>
          <label
            htmlFor="task-input-field"
            className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-2"
          >
            Task Description
          </label>
          <input
            id="task-input-field"
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              if (error && e.target.value.trim()) setError(null);
            }}
            onKeyDown={handleKeyDown}
            placeholder="What do you need to do today?"
            className="w-full text-base sm:text-lg text-neutral-900 placeholder:text-neutral-400 bg-neutral-50/70 border border-neutral-200 rounded-xl px-4 py-3 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-all"
            autoComplete="off"
            autoFocus
          />
          {error && (
            <p className="mt-2 text-xs text-rose-600 font-medium">
              {error}
            </p>
          )}
        </div>

        {/* 1-5 Star Priority Picker */}
        <div className="space-y-2 pt-1 border-t border-neutral-100">
          <StarRatingPicker value={rating} onChange={setRating} />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-neutral-100">
          <div className="flex items-center gap-2">
            {lastAddedText && (
              <span className="inline-flex items-center gap-1.5 text-xs text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md animate-fadeIn">
                <Check className="w-3.5 h-3.5 text-blue-600" />
                <span>Task added successfully!</span>
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-white bg-neutral-900 rounded-xl hover:bg-neutral-800 active:bg-neutral-950 transition-colors shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <Plus className="w-4 h-4 text-blue-400" />
              <span>Add Task</span>
            </button>

            <button
              type="button"
              onClick={() => handleSubmit(undefined, true)}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-neutral-800 bg-neutral-100 hover:bg-sky-50 active:bg-sky-100 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <span>Add & View To-Do List</span>
              <ArrowRight className="w-4 h-4 text-blue-600" />
            </button>
          </div>
        </div>
      </form>

      {/* Importance Rating Scale Reference */}
      <div className="bg-white rounded-2xl border border-neutral-200/80 p-5 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-600">
          Importance Scale Reference
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {([5, 4, 3, 2, 1] as StarRating[]).map((star) => (
            <div
              key={star}
              className={`flex items-center justify-between p-2 rounded-lg border transition-colors ${
                rating === star
                  ? 'bg-sky-50 border-sky-300 ring-1 ring-sky-300'
                  : 'bg-neutral-50/60 border-neutral-200/70'
              }`}
            >
              <div className="flex items-center gap-2">
                <StarRatingDisplay rating={star} size="sm" />
                <span className="font-semibold text-neutral-900">
                  {RATING_LABELS[star]}
                </span>
              </div>
              <span className="text-neutral-600 tabular-nums">{star}★</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-neutral-600 pt-1">
          When you view your To-Do list, 5-star tasks are placed at the very top so you always know what to tackle first.
        </p>
      </div>

      {/* Navigation Shortcut & Starter Pack */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={onNavigateToTodoList}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <ListTodo className="w-4 h-4 text-blue-600" />
          <span>Switch to To-Do List Screen</span>
          <ArrowRight className="w-4 h-4 text-blue-600" />
        </button>

        {!hasExistingTasks && onLoadSamples && (
          <button
            type="button"
            onClick={onLoadSamples}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-medium text-neutral-700 bg-white border border-neutral-200 hover:bg-neutral-50 rounded-lg transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Load Sample Daily Tasks</span>
          </button>
        )}
      </div>

      {/* Recently Added In This Session Preview */}
      {recentTasks.length > 0 && (
        <div className="space-y-2 pt-2 border-t border-neutral-200">
          <div className="flex items-center justify-between text-xs text-neutral-600">
            <span className="font-semibold uppercase tracking-wider">
              Recently Added ({recentTasks.length})
            </span>
            <button
              type="button"
              onClick={onNavigateToTodoList}
              className="text-neutral-700 hover:text-neutral-950 font-medium"
            >
              View in Prioritized List →
            </button>
          </div>
          <div className="space-y-1.5">
            {recentTasks.slice(0, 5).map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between px-3 py-2 bg-white rounded-lg border border-neutral-200/80 text-xs text-neutral-800"
              >
                <span className="truncate pr-2 font-medium">{task.text}</span>
                <StarRatingDisplay rating={task.rating} size="sm" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
