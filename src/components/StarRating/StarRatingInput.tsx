import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface StarRatingProps {
  rating?: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (rating: number) => void;
  showText?: boolean;
  className?: string;
  readonly?: boolean;
}

const StarRatingInput: React.FC<StarRatingProps> = ({
  rating = 0,
  maxRating = 5,
  size = 'md',
  onChange,
  showText = true,
  className = '',
  readonly = false,
}) => {
  const [internalRating, setInternalRating] = useState(rating);
  const [hoverRating, setHoverRating] = useState(0);
  const { t } = useTranslation();
  
  // تحديد حجم النجوم بناءً على الخاصية size
  const starSizeClass = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-9 h-9',
  }[size];
  
  // تحديد وصف التقييم بناءً على القيمة
  const getRatingText = (rating: number): string => {
    if (rating >= 4.5) return t('Amazing');
    if (rating >= 4.0) return t('Good/Amazing');
    if (rating >= 3.5) return t('Good');
    if (rating >= 3.0) return t('Average/Good');
    if (rating >= 2.5) return t('Average');
    if (rating >= 2.0) return t('Poor/Average');
    if (rating >= 1.5) return t('Poor');
    if (rating >= 1.0) return t('Very Poor/Poor');
    return rating === 0 ? t('Rate this course') : t('Very Poor');
  };

  // تعيين التقييم
  const handleSetRating = (value: number) => {
    if (readonly) return;
    
    setInternalRating(value);
    if (onChange) {
      onChange(value);
    }
  };

  // الحصول على التقييم الحالي (إما من الخارج أو من الداخل)
  const currentRating = readonly ? rating : (hoverRating || internalRating);
  
  // تحديد ما إذا كانت النجمة مملوءة أو نصف مملوءة أو فارغة
  const getStarType = (starIndex: number) => {
    const adjustedRating = readonly ? rating : currentRating;
    
    if (starIndex < Math.floor(adjustedRating)) {
      return 'filled';
    } else if (starIndex < Math.ceil(adjustedRating) && adjustedRating % 1 !== 0) {
      return 'half';
    } else {
      return 'empty';
    }
  };

  return (
    <div className={`flex ${readonly ? 'items-center' : 'flex-col'} ${className}`}>
      {readonly && showText && (
        <div className="flex items-center mr-2">
          <span className="font-bold text-lg">{rating.toFixed(1)}</span>
          <span className="text-gray-500 ml-1">({getRatingText(rating)})</span>
        </div>
      )}
      
      <div className="flex">
        {Array.from({ length: maxRating }, (_, index) => {
          const starType = getStarType(index);
          const isActive = starType !== 'empty';
          
          return (
            <div
              key={index}
              className={`${starSizeClass} ${readonly ? '' : 'cursor-pointer'} focus:outline-none transition-colors duration-200`}
              onClick={() => handleSetRating(index + 1)}
              onMouseEnter={() => !readonly && setHoverRating(index + 1)}
              onMouseLeave={() => !readonly && setHoverRating(0)}
            >
              <svg
                className={`${isActive ? 'text-orange-400' : 'text-gray-300'} transition-colors duration-200`}
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {starType === 'half' ? (
                  <>
                    <defs>
                      <linearGradient id={`half-star-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="50%" stopColor="currentColor" />
                        <stop offset="50%" stopColor="none" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                      fill={`url(#half-star-${index})`}
                      stroke="currentColor"
                      strokeWidth="0.5"
                    />
                  </>
                ) : (
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                )}
              </svg>
            </div>
          );
        })}
      </div>
      
      {!readonly && showText && (
        <div className="mt-1 text-center text-gray-600">
          {getRatingText(currentRating)}
        </div>
      )}
    </div>
  );
};

export default StarRatingInput;
