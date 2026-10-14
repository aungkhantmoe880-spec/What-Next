import { useState } from 'react';
import { StarRating, RATING_LABELS } from '../types';

interface StarRatingPickerProps {
  value: StarRating;
  onChange: (rating: StarRating) => void;
  disabled?: boolean;
}

export default function StarRatingPicker({
  value,
  onChange,
  disabled = false,
}: StarRatingPickerProps) {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const displayedRating = hoverRating !== null ? hoverRating : value;
  const currentLabel = RATING_LABELS[displayedRating as StarRating] || '';

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mr-1 select-none">
          Priority:
        </span>
        <div
          className="flex items-center gap-1"
          role="radiogroup"
          aria-label="Importance rating from 1 to 5 stars"
          onMouseLeave={() => setHoverRating(null)}
        >
          {[1, 2, 3, 4, 5].map((starNum) => {
            const isFilled = starNum <= displayedRating;
            return (
              <button
                key={starNum}
                type="button"
                disabled={disabled}
                role="radio"
                aria-checked={value === starNum}
                aria-label={`${starNum} stars - ${RATING_LABELS[starNum as StarRating]}`}
                onMouseEnter={() => setHoverRating(starNum)}
                onClick={() => onChange(starNum as StarRating)}
                className="p-1 rounded-md transition-transform hover:scale-115 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 disabled:opacity-50"
              >
                <svg
                  className={`w-6 h-6 transition-colors ${
                    isFilled
                      ? 'text-amber-500 fill-amber-400 drop-shadow-xs'
                      : 'text-neutral-300 fill-neutral-100'
                  }`}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
              </button>
            );
          })}
        </div>
      </div>

      <div className="text-xs text-neutral-600 sm:border-l sm:border-neutral-200 sm:pl-3 min-h-[1.25rem] flex items-center">
        <span className="font-medium text-neutral-800">{displayedRating} / 5</span>
        <span className="mx-1 text-neutral-300">·</span>
        <span className="text-neutral-600">{currentLabel}</span>
      </div>
    </div>
  );
}
