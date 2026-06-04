export const FiftyFiftyIcon = ({ className = "", size = 48 }: { className?: string; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Paper being cut */}
    <rect x="8" y="16" width="20" height="24" rx="2" fill="#FFF8DC" stroke="#8B4513" strokeWidth="2" />
    <line x1="12" y1="22" x2="24" y2="22" stroke="#8B4513" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="12" y1="28" x2="22" y2="28" stroke="#8B4513" strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Cut line */}
    <line x1="18" y1="16" x2="18" y2="40" stroke="#E94560" strokeWidth="2" strokeDasharray="4 2" />
    
    {/* Scissors */}
    <g transform="translate(28, 20) rotate(-15)">
      {/* Scissors blades */}
      <path
        d="M0 0L20 8L18 12L-2 4L0 0Z"
        fill="#C0C0C0"
        stroke="#808080"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M2 4L22 12L20 16L0 8L2 4Z"
        fill="#C0C0C0"
        stroke="#808080"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      
      {/* Scissors handles */}
      <circle cx="-4" cy="2" r="6" fill="none" stroke="#E94560" strokeWidth="3" />
      <circle cx="-2" cy="10" r="6" fill="none" stroke="#E94560" strokeWidth="3" />
      
      {/* Pivot point */}
      <circle cx="2" cy="6" r="2" fill="#808080" />
    </g>
    
    {/* Cut pieces falling */}
    <rect x="20" y="32" width="6" height="8" rx="1" fill="#FFF8DC" stroke="#8B4513" strokeWidth="1.5" transform="rotate(20, 23, 36)" />
  </svg>
);
