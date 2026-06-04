export const ApprenticeNinjaIcon = ({ className = "", size = 48 }: { className?: string; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Ninja body (smaller) */}
    <path
      d="M18 22C18 17 21 14 24 14C27 14 30 17 30 22V36C30 39 27 40 24 40C21 40 18 39 18 36V22Z"
      fill="#27AE60"
      stroke="#1E8449"
      strokeWidth="2.5"
    />
    
    {/* Ninja hood/head (smaller) */}
    <ellipse cx="24" cy="18" rx="8" ry="6" fill="#27AE60" stroke="#1E8449" strokeWidth="2.5" />
    
    {/* Eyes (slits) */}
    <path d="M20 18L23 18" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M25 18L28 18" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Headband tie */}
    <path
      d="M16 16C15 15 13 16 13 17C13 18 15 19 16 18"
      fill="none"
      stroke="#2C3E50"
      strokeWidth="2"
      strokeLinecap="round"
    />
    
    {/* Dark headband */}
    <path
      d="M16 16Q24 13 32 16"
      fill="none"
      stroke="#2C3E50"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    
    {/* C rank badge */}
    <circle cx="38" cy="12" r="7" fill="#2ECC71" stroke="#27AE60" strokeWidth="2" />
    <text
      x="38"
      y="16"
      textAnchor="middle"
      fontSize="11"
      fontWeight="bold"
      fill="#FFF"
      fontFamily="Arial, sans-serif"
    >
      C
    </text>
    
    {/* Training dummy decoration */}
    <rect x="6" y="28" width="8" height="12" rx="2" fill="#D5DBDB" stroke="#95A5A6" strokeWidth="1.5" />
    <circle cx="10" cy="26" r="3" fill="#D5DBDB" stroke="#95A5A6" strokeWidth="1.5" />
  </svg>
);
