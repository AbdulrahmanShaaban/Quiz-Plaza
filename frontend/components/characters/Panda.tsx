import React from 'react';

interface PandaProps {
  className?: string;
}

export default function Panda({ className = '' }: PandaProps) {
  return (
    <svg 
      width="60" 
      height="60" 
      viewBox="0 0 60 60" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Ears - black */}
      <circle cx="12" cy="18" r="8" fill="#1A1A2E" />
      <circle cx="48" cy="18" r="8" fill="#1A1A2E" />
      
      {/* Head - white */}
      <circle cx="30" cy="30" r="22" fill="#FFFFFF" />
      
      {/* Eye patches - black */}
      <ellipse cx="20" cy="35" rx="6" ry="8" fill="#1A1A2E" transform="rotate(-15 20 35)" />
      <ellipse cx="40" cy="35" rx="6" ry="8" fill="#1A1A2E" transform="rotate(15 40 35)" />
      
      {/* Eyes - white dots */}
      <circle cx="20" cy="34" r="2" fill="#FFFFFF" />
      <circle cx="40" cy="34" r="2" fill="#FFFFFF" />
      
      {/* Nose */}
      <ellipse cx="30" cy="40" rx="3" ry="2" fill="#1A1A2E" />
      
      {/* Mouth */}
      <path d="M 27 44 Q 30 47 33 44" stroke="#1A1A2E" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      
      {/* Headband - Red */}
      <rect x="8" y="16" width="44" height="8" fill="#E94560" />
      
      {/* Headband tails */}
      <path d="M 50 18 C 55 18 58 22 55 26 C 53 24 51 22 50 18 Z" fill="#E94560" />
      
      {/* Blush */}
      <ellipse cx="14" cy="42" rx="3" ry="1.5" fill="#E94560" opacity="0.4" />
      <ellipse cx="46" cy="42" rx="3" ry="1.5" fill="#E94560" opacity="0.4" />
    </svg>
  );
}
