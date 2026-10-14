interface ProgressCircleProps {
  completedCount: number;
  totalCount: number;
  size?: number;
  strokeWidth?: number;
}

export default function ProgressCircle({
  completedCount,
  totalCount,
  size = 112,
  strokeWidth = 9,
}: ProgressCircleProps) {
  const percentage =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (percentage / 100) * circumference;

  const isCompleted = totalCount > 0 && completedCount === totalCount;

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-center gap-5">
      {/* SVG Circular Progress Ring */}
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg
          className="w-full h-full -rotate-90 transform"
          viewBox={`0 0 ${size} ${size}`}
          aria-hidden="true"
        >
          {/* Background circle track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="text-neutral-200 stroke-current"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Active progress ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className={`stroke-current transition-all duration-500 ease-out ${
              isCompleted
                ? 'text-blue-600'
                : percentage > 0
                ? 'text-blue-600'
                : 'text-neutral-300'
            }`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold tracking-tight text-neutral-900 tabular-nums">
            {percentage}%
          </span>
          <span className="text-[10px] uppercase font-semibold text-neutral-600 tracking-wider">
            {isCompleted ? 'Done' : 'Progress'}
          </span>
        </div>
      </div>

      {/* Progress text metadata */}
      <div className="text-center sm:text-left space-y-1">
        <div className="text-base font-semibold text-neutral-900 tabular-nums">
          {totalCount === 0 ? (
            <span>0 of 0 tasks completed</span>
          ) : (
            <span>
              {completedCount} of {totalCount} task{totalCount === 1 ? '' : 's'} completed
            </span>
          )}
        </div>
        <p className="text-xs text-neutral-600 max-w-xs leading-relaxed">
          {totalCount === 0
            ? 'Add your first task to start organizing your day by importance.'
            : isCompleted
            ? 'All tasks completed for today! Outstanding work.'
            : totalCount - completedCount === 1
            ? 'Almost there! Just 1 remaining task to finish.'
            : `${totalCount - completedCount} tasks remaining. Focus on the highest rated first.`}
        </p>
      </div>
    </div>
  );
}
