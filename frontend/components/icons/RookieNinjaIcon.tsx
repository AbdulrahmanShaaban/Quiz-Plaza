export const RookieNinjaIcon = ({ className = "", size = 48 }: { className?: string; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Panda body */}
    <ellipse cx="24" cy="32" rx="14" ry="12" fill="#2C3E50" stroke="#1A252F" strokeWidth="2.5" />
    
    {/* Panda head */}
    <circle cx="24" cy="20" r="12" fill="#2C3E50" stroke="#1A252F" strokeWidth="2.5" />
    
    {/* White face patch */}
    <ellipse cx="24" cy="22" rx="8" ry="7" fill="#ECF0F1" stroke="#BDC3C7" strokeWidth="1.5" />
    
    {/* Black eye patches */}
    <ellipse cx="19" cy="20" rx="4" ry="3" fill="#2C3E50" stroke="#1A252F" strokeWidth="1.5" />
    <ellipse cx="29" cy="20" rx="4" ry="3" fill="#2C3E50" stroke="#1A252F" strokeWidth="1.5" />
    
    {/* Eyes */}
    <circle cx="19" cy="20" r="1.5" fill="#FFF" />
    <circle cx="29" cy="20" r="1.5" fill="#FFF" />
    
    {/* Nose */}
    <ellipse cx="24" cy="25" rx="2" ry="1.5" fill="#2C3E50" />
    
    {/* Ears */}
    <circle cx="14" cy="12" r="5" fill="#2C3E50" stroke="#1A252F" strokeWidth="2" />
    <circle cx="34" cy="12" r="5" fill="#2C3E50" stroke="#1A252F" strokeWidth="2" />
    
    {/* Ninja headband */}
    <path
      d="M12 18Q24 14 36 18"
      fill="none"
      stroke="#E94560"
      strokeWidth="3"
      strokeLinecap="round"
    />
    
    {/* Headband tie */}
    <path
      d="M12 18C10 16 8 18 8 20C8 22 10 24 12 22"
      fill="none"
      stroke="#E94560"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    
    {/* F rank badge */}
    <circle cx="40" cy="8" r="7" fill="#95A5A6" stroke="#7F8C8D" strokeWidth="2" />
    <text
      x="40"
      y="12"
      textAnchor="middle"
      fontSize="11"
      fontWeight="bold"
      fill="#FFF"
      fontFamily="Arial, sans-serif"
    >
      F
    </text>
    
    {/* Bamboo shoot decoration */}
    <path
      d="M6 36L6 44"
      fill="none"
      stroke="#27AE60"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M4 38L8 38"
      fill="none"
      stroke="#27AE60"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M4 42L8 42"
      fill="none"
      stroke="#27AE60"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
