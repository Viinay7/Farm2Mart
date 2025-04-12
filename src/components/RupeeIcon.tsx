
import React from 'react';

interface RupeeIconProps {
  className?: string;
  size?: number;
}

const RupeeIcon = ({ className, size = 24 }: RupeeIconProps) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M6 3h12M6 8h12M6 13h3m3 0 6 8m-6-8v8m-6-8c0-4.4 3.6-8 8-8" />
    </svg>
  );
};

export default RupeeIcon;
