import React from 'react';

interface BontesLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  variant?: 'light' | 'dark';
}

export const BontesLogo: React.FC<BontesLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  variant = 'light'
}) => {
  const sizeMap = {
    sm: { mark: 32, title: 'text-base', subtitle: 'text-[9px]' },
    md: { mark: 40, title: 'text-xl', subtitle: 'text-[10px]' },
    lg: { mark: 52, title: 'text-2xl', subtitle: 'text-[11px]' },
    xl: { mark: 68, title: 'text-3xl', subtitle: 'text-[12px]' }
  };

  const currentSize = sizeMap[size];
  const navyColor = variant === 'dark' ? '#FFFFFF' : '#0F172A';
  const goldColor = '#C5A880';
  const slateColor = variant === 'dark' ? '#94A3B8' : '#475569';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* High-Precision Bontes Monogram SVG based on user uploaded brand asset */}
      <svg
        width={currentSize.mark}
        height={currentSize.mark}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm transition-transform hover:scale-105 duration-300"
      >
        {/* Main Monogram Body 'B' in Obsidian Navy */}
        <path
          d="M 30 10 
             H 62 
             C 78 10, 88 18, 88 32 
             C 88 43, 80 50, 68 52 
             C 82 55, 90 65, 90 80 
             C 90 94, 78 100, 60 100 
             H 30 
             Z"
          fill={navyColor}
        />
        {/* Upper Counter (Inner Hole) */}
        <path
          d="M 46 24 
             H 60 
             C 68 24, 73 28, 73 34 
             C 73 40, 68 44, 60 44 
             H 46 
             Z"
          fill={variant === 'dark' ? '#0F172A' : '#F8FAFC'}
        />
        {/* Bottom Outer Right Loop Curve Cutout */}
        <path
          d="M 46 58 
             H 60 
             C 68 58, 74 62, 74 70 
             C 74 78, 67 82, 58 82 
             H 46 
             Z"
          fill={variant === 'dark' ? '#0F172A' : '#F8FAFC'}
        />
        
        {/* Geometric Champagne Gold Diagonal Wings Cutout at the bottom left curve */}
        <path
          d="M 28 80 L 48 58 L 58 58 L 38 80 Z"
          fill={goldColor}
        />
        <path
          d="M 28 98 L 58 66 H 68 C 68 76, 60 86, 48 98 Z"
          fill={goldColor}
        />
      </svg>

      {showText && (
        <div className="flex flex-col justify-center leading-tight">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-montserrat font-extrabold tracking-tight uppercase ${currentSize.title}`}
              style={{ color: navyColor }}
            >
              BONTES
            </span>
            <span className="text-xl font-extrabold text-[#C5A880] -ml-0.5">.cl</span>
          </div>
          <span
            className={`font-montserrat font-bold tracking-widest uppercase ${currentSize.subtitle}`}
            style={{ color: slateColor }}
          >
            Ingeniería Contractual & Claims
          </span>
        </div>
      )}
    </div>
  );
};
