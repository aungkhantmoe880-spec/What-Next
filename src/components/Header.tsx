import { Calendar } from 'lucide-react';

interface HeaderProps {
  onResetTasks?: () => void;
  hasTasks: boolean;
}

export default function Header({ onResetTasks, hasTasks }: HeaderProps) {
  // Format today's date nicely: "Wednesday, October 14, 2026"
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <header className="border-b border-neutral-200/80 bg-white/80 backdrop-blur-xs sticky top-0 z-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        {/* Brand / App Title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-xs select-none">
            W
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-neutral-900 leading-none">
              What Next?
            </h1>
          </div>
        </div>

        {/* Date and Optional Reset */}
        <div className="flex items-center gap-4 text-xs font-medium text-neutral-600">
          <div className="flex items-center gap-1.5 text-neutral-600">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            <time dateTime={today.toISOString().split('T')[0]}>
              {formattedDate}
            </time>
          </div>

          {hasTasks && onResetTasks && (
            <button
              type="button"
              onClick={onResetTasks}
              className="text-neutral-400 hover:text-neutral-700 transition-colors hidden sm:inline-block"
              title="Reset all tasks for a fresh start"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
