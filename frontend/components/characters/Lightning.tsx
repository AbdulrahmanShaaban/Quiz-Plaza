import React from 'react';

interface LightningProps {
  className?: string;
}

export default function Lightning({ className = '' }: LightningProps) {
  return (
    <svg 
      width="30" 
      height="50" 
      viewBox="0 0 30 50" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Lightning shape - yellow zigzag */}
      <path 
        d="M 18 2 L 4 24 L 16 24 L 12 48 L 26 26 L 14 26 Z" 
        fill="#F5A623" 
        stroke="#1A1A2E" 
        strokeWidth="2" 
        strokeLinejoin="round" 
      />
      
      {/* Eyes */}
      <circle cx="12" cy="18" r="1.5" fill="#1A1A2E" />
      <circle cx="18" cy="18" r="1.5" fill="#1A1A2E" />
      
      {/* Smile */}
      <path 
        d="M 13 21 Q 15 23 17 21" 
        stroke="#1A1A2E" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        fill="none" 
      />
    </svg>
  );
}
