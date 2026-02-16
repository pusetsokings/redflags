interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  variant?: 'default' | 'white';
}

export function Logo({ size = 'md', showText = true, variant = 'default' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  const iconSize = {
    sm: 32,
    md: 40,
    lg: 56
  };

  const stroke = variant === 'white' ? '#ffffff' : 'var(--logo-stroke)';

  return (
    <div className={`flex items-center gap-3 ${variant === 'white' ? '' : 'text-foreground'}`}>
      <div className={`${sizeClasses[size]} relative flex-shrink-0`}>
        <svg
          width={iconSize[size]}
          height={iconSize[size]}
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Radar circle with flag - stroke uses --logo-stroke (bluish grey in dark) */}
          <circle
            cx="28"
            cy="28"
            r="20"
            fill={variant === 'white' ? '#ffffff' : '#C7B8FF'}
            stroke={stroke}
            strokeWidth="3"
          />
          
          {/* Radar scanning line */}
          <line
            x1="28"
            y1="28"
            x2="42"
            y2="14"
            stroke={stroke}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          
          {/* Flag pole (vertical line) */}
          <line
            x1="42"
            y1="14"
            x2="42"
            y2="6"
            stroke={stroke}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          
          {/* Large prominent flag */}
          <path
            d="M42 6 L42 14 L52 10 L42 6 Z"
            fill="#FF5A5F"
            stroke={stroke}
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          
          {/* Radar rings */}
          <circle
            cx="28"
            cy="28"
            r="10"
            stroke={stroke}
            strokeWidth="2"
            fill="none"
            opacity="0.5"
          />
          <circle
            cx="28"
            cy="28"
            r="15"
            stroke={stroke}
            strokeWidth="1.5"
            fill="none"
            opacity="0.3"
          />
        </svg>
      </div>
      
      {showText && (
        <div className="flex flex-col -space-y-1">
          <span className={`${textSizeClasses[size]} font-bold tracking-tight ${
            variant === 'white' ? 'text-white' : 'text-foreground'
          }`}>
            FlagSense
          </span>
        </div>
      )}
    </div>
  );
}