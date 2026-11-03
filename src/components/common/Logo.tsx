import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  variant = 'dark',
  showSubtitle = true,
}) => {
  const iconDimensions = {
    sm: { width: 28, height: 28 },
    md: { width: 34, height: 34 },
    lg: { width: 42, height: 42 },
  }[size];

  const textSize = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  }[size];

  const isLight = variant === 'light';

  return (
    <div className={`flex items-center gap-2.5 shrink-0 ${className}`}>
      {/* PurelySEO Geometric Growth & Search Emblem */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          width={iconDimensions.width}
          height={iconDimensions.height}
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-200 group-hover:scale-105"
        >
          {/* Base rounded shield container */}
          <rect
            width="36"
            height="36"
            rx="10"
            fill={isLight ? '#0B132B' : '#0B132B'}
          />
          
          {/* Subtle perimeter glow border */}
          <rect
            x="0.5"
            y="0.5"
            width="35"
            height="35"
            rx="9.5"
            stroke="url(#emblem_border)"
            strokeOpacity="0.4"
          />

          {/* Search Lens Ring (Search Intelligence) */}
          <circle
            cx="16"
            cy="16"
            r="7"
            stroke="#06B6D4"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Search Handle */}
          <path
            d="M21.2 21.2L27 27"
            stroke="#0D9488"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Dynamic Growth / Ranking Trend Curve */}
          <path
            d="M11 18.5L14.5 15L17.5 18L21 13.5"
            stroke="#10B981"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Ascent Spark Dot (Top #1 Ranking Achievement) */}
          <circle cx="21" cy="13.5" r="1.5" fill="#34D399" />

          {/* Gradients */}
          <defs>
            <linearGradient id="emblem_border" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
              <stop stopColor="#06B6D4" />
              <stop offset="1" stopColor="#10B981" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Wordmark */}
      <div className="flex flex-col leading-none">
        <div className={`font-extrabold tracking-tight ${textSize} flex items-center`}>
          <span className={isLight ? 'text-white' : 'text-[#0F172A]'}>
            Purely
          </span>
          <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-500 bg-clip-text text-transparent font-black ml-0.5">
            SEO
          </span>
        </div>
        {showSubtitle && (
          <span
            className={`text-[9.5px] font-semibold tracking-wider uppercase mt-0.5 ${
              isLight ? 'text-slate-400' : 'text-slate-500'
            }`}
          >
            Organic Intelligence
          </span>
        )}
      </div>
    </div>
  );
};
