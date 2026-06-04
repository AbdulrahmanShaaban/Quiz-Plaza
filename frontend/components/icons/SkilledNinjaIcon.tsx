export const SkilledNinjaIcon = ({ className = "", size = 48 }: { className?: string; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Ninja body */}
    <path
      d="M16 20C16 14 20 10 24 10C28 10 32 14 32 20V38C32 42 28 44 24 44C20 44 16 42 16 38V20Z"
      fill="#2980B9"
      stroke="#1A5276"
      strokeWidth="2.5"
    />
    
    {/* Ninja hood/head */}
    <ellipse cx="24" cy="16" rx="10" ry="8" fill="#2980B9" stroke="#1A5276" strokeWidth="2.5" />
    
    {/* Eyes (slits) */}
    <path d="M18 16L22 16" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
    <path d="M26 16L30 16" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
    
    {/* Headband tie */}
    <path
      d="M14 14C12 12 10 14 10 16C10 18 12 20 14 18"
      fill="none"
      stroke="#2C3E50"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    
    {/* Dark headband */}
    <path
      d="M14 14Q24 10 34 14"
      fill="none"
      stroke="#2C3E50"
      strokeWidth="3"
      strokeLinecap="round"
    />
    
    {/* B rank badge */}
    <circle cx="38" cy="10" r="8" fill="#3498DB" stroke="#2980B9" strokeWidth="2" />
    <text
      x="38"
      y="14"
      textAnchor="middle"
      fontSize="12"
      fontWeight="bold"
      fill="#FFF"
      fontFamily="Arial, sans-serif"
    >
      B
    </text>
    
    {/* Ninja star decoration */}
    <g transform="translate(8, 36) rotate(15)">
      <path
        d="M0 -6L1 -2L5 0L1 2L0 6L-1 2L-5 0L-1 -2L0 -6Z"
        fill="#BDC3C7"
        stroke="#7F8C8D"
        strokeWidth="1.5"
      />
    </g>
  </svg>
);
