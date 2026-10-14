import { StarRating, RATING_LABELS } from '../types';

interface StarRatingDisplayProps {
  rating: StarRating;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function StarRatingDisplay({
  rating,
  showLabel = false,
  size = 'md',
}: StarRatingDisplayProps) {
  const sizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <div className="inline-flex items-center gap-1.5" title={`${rating} of 5 stars — ${RATING_LABELS[rating]}`}>
      <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((starIndex) => {
          const isFilled = starIndex <= rating;
          return (
            <svg
              key={starIndex}
              className={`${sizeClasses[size]} ${
                isFilled
                  ? 'text-amber-500 fill-amber-400'
                  : 'text-neutral-300 fill-neutral-100'
              } transition-colors`}
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
          );
        })}
      </div>
      {showLabel && (
        <span className="text-xs text-neutral-500 font-medium tracking-tight">
          {RATING_LABELS[rating]}
        </span>
      )}
    </div>
  );
}
