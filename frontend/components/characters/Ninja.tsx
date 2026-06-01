import React from 'react';

interface NinjaProps {
  className?: string;
}

export default function Ninja({ className = '' }: NinjaProps) {
  return (
    <svg 
      width="60" 
      height="80" 
      viewBox="0 0 60 80" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Body - capsule shape */}
      <rect x="10" y="10" width="40" height="70" rx="20" fill="#1A1A2E" />
      
      {/* Headband */}
      <rect x="8" y="25" width="44" height="10" fill="#E94560" />
      
      {/* Headband tails */}
      <path d="M 48 30 C 55 35 58 40 55 45 C 52 40 50 35 48 30 Z" fill="#E94560" />
      <path d="M 48 28 C 58 28 62 32 60 38 C 55 35 52 32 48 28 Z" fill="#E94560" />
      
      {/* Eyes (white dots) */}
      <circle cx="22" cy="38" r="3" fill="#FFFFFF" />
      <circle cx="38" cy="38" r="3" fill="#FFFFFF" />
      
      {/* Cute little blush */}
      <ellipse cx="18" cy="43" rx="4" ry="2" fill="#E94560" opacity="0.5" />
      <ellipse cx="42" cy="43" rx="4" ry="2" fill="#E94560" opacity="0.5" />
    </svg>
  );
}
