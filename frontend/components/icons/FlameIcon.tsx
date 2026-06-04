export const FlameIcon = ({ className = "", size = 48 }: { className?: string; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Main flame body */}
    <path
      d="M24 8C24 8 16 16 16 26C16 32 20 38 24 38C28 38 32 32 32 26C32 16 24 8 24 8Z"
      fill="#E74C3C"
      stroke="#C0392B"
      strokeWidth="2.5"
    />
    
    {/* Inner flame */}
    <path
      d="M24 14C24 14 20 20 20 26C20 30 22 34 24 34C26 34 28 30 28 26C28 20 24 14 24 14Z"
      fill="#F39C12"
      stroke="#E67E22"
      strokeWidth="2"
    />
    
    {/* Flame core */}
    <path
      d="M24 20C24 20 22 24 22 28C22 30 23 32 24 32C25 32 26 30 26 28C26 24 24 20 24 20Z"
      fill="#F1C40F"
      stroke="#F39C12"
      strokeWidth="1.5"
    />
    
    {/* Flame tip highlight */}
    <ellipse cx="24" cy="12" rx="3" ry="4" fill="#FFF5E6" stroke="#F39C12" strokeWidth="1" opacity="0.6" />
    
    {/* Small sparks */}
    <circle cx="18" cy="20" r="2" fill="#F39C12" opacity="0.8" />
    <circle cx="30" cy="22" r="1.5" fill="#F39C12" opacity="0.8" />
    <circle cx="20" cy="30" r="1" fill="#E74C3C" opacity="0.6" />
    <circle cx="28" cy="28" r="1.5" fill="#E74C3C" opacity="0.6" />
    
    {/* Rising spark */}
    <path
      d="M34 16L36 12L38 16L36 18L34 16Z"
      fill="#F39C12"
      stroke="#E67E22"
      strokeWidth="1"
    />
  </svg>
);
