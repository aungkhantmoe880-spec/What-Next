import { useState, useRef, FormEvent, KeyboardEvent } from 'react';
import { StarRating } from '../types';
import StarRatingPicker from './StarRatingPicker';
import { Plus } from 'lucide-react';

interface TaskInputProps {
  onAddTask: (text: string, rating: StarRating) => void;
}

export default function TaskInput({ onAddTask }: TaskInputProps) {
  const [text, setText] = useState('');
  const [rating, setRating] = useState<StarRating>(3);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e?: FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) {
      setError('Please enter a task description.');
      inputRef.current?.focus();
      return;
    }

    onAddTask(trimmed, rating);
    setText('');
    setError(null);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border border-neutral-200/90 p-4 sm:p-5 shadow-xs transition-shadow focus-within:border-sky-400 focus-within:ring-1 focus-within:ring-sky-400/50"
    >
      <div className="flex flex-col gap-3.5">
        {/* Main Text Input Field */}
        <div>
          <label htmlFor="task-description-input" className="sr-only">
            What do you need to do today?
          </label>
          <div className="relative">
            <input
              id="task-description-input"
              ref={inputRef}
              type="text"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                if (error && e.target.value.trim()) {
                  setError(null);
                }
              }}
              onKeyDown={handleKeyDown}
              placeholder="What do you need to do today?"
              className="w-full text-base sm:text-lg text-neutral-900 placeholder:text-neutral-400 bg-transparent border-0 border-b border-neutral-200 pb-2.5 pt-1 focus:ring-0 focus:border-sky-500 focus:outline-none transition-colors"
              autoComplete="off"
            />
          </div>
          {error && (
            <p className="mt-1.5 text-xs text-rose-600 font-medium animate-fadeIn">
              {error}
            </p>
          )}
        </div>

        {/* Bottom controls: Star rating selector & Add Task button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
          <StarRatingPicker value={rating} onChange={setRating} />

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-white bg-neutral-900 rounded-lg hover:bg-neutral-800 active:bg-neutral-950 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-600 whitespace-nowrap shrink-0 self-end sm:self-auto shadow-xs"
          >
            <Plus className="w-4 h-4 text-blue-400" />
            <span>Add Task</span>
          </button>
        </div>
      </div>
    </form>
  );
}
