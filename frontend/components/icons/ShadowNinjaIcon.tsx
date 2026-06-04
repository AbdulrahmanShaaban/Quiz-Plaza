export const ShadowNinjaIcon = ({ className = "", size = 48 }: { className?: string; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Golden aura glow */}
    <circle cx="24" cy="28" r="22" fill="url(#goldenGlow)" opacity="0.3" />
    <circle cx="24" cy="28" r="18" fill="url(#goldenGlow)" opacity="0.5" />
    
    {/* Ninja body */}
    <path
      d="M16 20C16 14 20 10 24 10C28 10 32 14 32 20V38C32 42 28 44 24 44C20 44 16 42 16 38V20Z"
      fill="#1A1A2E"
      stroke="#16213E"
      strokeWidth="2.5"
    />
    
    {/* Ninja hood/head */}
    <ellipse cx="24" cy="16" rx="10" ry="8" fill="#1A1A2E" stroke="#16213E" strokeWidth="2.5" />
    
    {/* Eyes (slits) */}
    <path d="M18 16L22 16" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
    <path d="M26 16L30 16" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" />
    
    {/* Headband tie */}
    <path
      d="M14 14C12 12 10 14 10 16C10 18 12 20 14 18"
      fill="none"
      stroke="#FFD700"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    
    {/* Golden headband */}
    <path
      d="M14 14Q24 10 34 14"
      fill="none"
      stroke="#FFD700"
      strokeWidth="3"
      strokeLinecap="round"
    />
    
    {/* S rank badge */}
    <circle cx="38" cy="10" r="8" fill="#FFD700" stroke="#B8860B" strokeWidth="2" />
    <text
      x="38"
      y="14"
      textAnchor="middle"
      fontSize="12"
      fontWeight="bold"
      fill="#1A1A2E"
      fontFamily="Arial, sans-serif"
    >
      S
    </text>
    
    {/* Golden sparkles */}
    <path
      d="M8 8L9 10L11 11L9 12L8 14L7 12L5 11L7 10L8 8Z"
      fill="#FFD700"
      stroke="#B8860B"
      strokeWidth="1"
    />
    <path
      d="M40 40L41 42L43 43L41 44L40 46L39 44L37 43L39 42L40 40Z"
      fill="#FFD700"
      stroke="#B8860B"
      strokeWidth="1"
    />
    
    <defs>
      <radialGradient id="goldenGlow">
        <stop offset="0%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
      </radialGradient>
    </defs>
  </svg>
);
