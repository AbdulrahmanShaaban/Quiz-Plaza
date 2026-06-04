export const DailyChallengeIcon = ({ className = "", size = 48 }: { className?: string; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Calendar body */}
    <rect x="6" y="10" width="36" height="32" rx="3" fill="#E8D5F0" stroke="#7B2FBE" strokeWidth="2.5" />
    
    {/* Calendar header */}
    <rect x="6" y="10" width="36" height="10" rx="3" fill="#9B59B6" stroke="#7B2FBE" strokeWidth="2.5" />
    <rect x="6" y="14" width="36" height="6" fill="#9B59B6" />
    
    {/* Calendar rings */}
    <circle cx="14" cy="8" r="3" fill="#9B59B6" stroke="#7B2FBE" strokeWidth="2" />
    <circle cx="34" cy="8" r="3" fill="#9B59B6" stroke="#7B2FBE" strokeWidth="2" />
    
    {/* Calendar grid */}
    <line x1="6" y1="22" x2="42" y2="22" stroke="#7B2FBE" strokeWidth="1.5" />
    <line x1="6" y1="28" x2="42" y2="28" stroke="#7B2FBE" strokeWidth="1.5" />
    <line x1="6" y1="34" x2="42" y2="34" stroke="#7B2FBE" strokeWidth="1.5" />
    <line x1="18" y1="20" x2="18" y2="42" stroke="#7B2FBE" strokeWidth="1.5" />
    <line x1="30" y1="20" x2="30" y2="42" stroke="#7B2FBE" strokeWidth="1.5" />
    
    {/* Date highlight */}
    <rect x="20" y="24" width="8" height="6" rx="1" fill="#7B2FBE" />
    
    {/* Shuriken (ninja star) on corner */}
    <g transform="translate(38, 38) rotate(45)">
      <path
        d="M0 -8L2 -2L8 0L2 2L0 8L-2 2L-8 0L-2 -2L0 -8Z"
        fill="#E94560"
        stroke="#C0392B"
        strokeWidth="2"
      />
      <circle cx="0" cy="0" r="2" fill="#C0392B" />
    </g>
  </svg>
);
