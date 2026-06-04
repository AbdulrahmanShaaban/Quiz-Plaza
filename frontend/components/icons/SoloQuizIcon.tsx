export const SoloQuizIcon = ({ className = "", size = 48 }: { className?: string; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Scroll body - rolled paper */}
    <ellipse cx="24" cy="38" rx="16" ry="4" fill="#F5DEB3" stroke="#8B4513" strokeWidth="2.5" />
    <rect x="8" y="10" width="32" height="28" rx="2" fill="#FFF8DC" stroke="#8B4513" strokeWidth="2.5" />
    
    {/* Scroll top roll */}
    <ellipse cx="24" cy="10" rx="16" ry="4" fill="#DEB887" stroke="#8B4513" strokeWidth="2.5" />
    <ellipse cx="24" cy="10" rx="12" ry="2.5" fill="#F5DEB3" stroke="#8B4513" strokeWidth="1.5" />
    
    {/* Lines on scroll (text) */}
    <line x1="14" y1="18" x2="34" y2="18" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" />
    <line x1="14" y1="24" x2="30" y2="24" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" />
    <line x1="14" y1="30" x2="32" y2="30" stroke="#8B4513" strokeWidth="2" strokeLinecap="round" />
    
    {/* Pencil */}
    <g transform="rotate(-30, 36, 20)">
      {/* Pencil body */}
      <rect x="32" y="12" width="8" height="20" rx="1" fill="#FFD700" stroke="#B8860B" strokeWidth="2" />
      {/* Pencil tip */}
      <path d="M32 32L36 38L40 32" fill="#FFD700" stroke="#B8860B" strokeWidth="2" strokeLinejoin="round" />
      {/* Pencil lead */}
      <path d="M36 35L36 38" stroke="#2C2C2C" strokeWidth="2" strokeLinecap="round" />
      {/* Pencil eraser */}
      <rect x="32" y="8" width="8" height="4" rx="1" fill="#FF6B6B" stroke="#E94560" strokeWidth="2" />
      {/* Metal band */}
      <rect x="32" y="11" width="8" height="2" fill="#C0C0C0" stroke="#808080" strokeWidth="1" />
    </g>
  </svg>
);
