export const PhoneFriendIcon = ({ className = "", size = 48 }: { className?: string; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Phone body */}
    <rect x="14" y="8" width="20" height="34" rx="4" fill="#3498DB" stroke="#2980B9" strokeWidth="2.5" />
    
    {/* Phone screen */}
    <rect x="17" y="12" width="14" height="22" rx="2" fill="#ECF0F1" stroke="#BDC3C7" strokeWidth="1.5" />
    
    {/* Phone button */}
    <circle cx="24" cy="38" r="3" fill="#2980B9" />
    
    {/* Phone speaker */}
    <rect x="20" y="10" width="8" height="2" rx="1" fill="#2980B9" />
    
    {/* Sound waves */}
    <path
      d="M38 20Q42 24 38 28"
      fill="none"
      stroke="#E94560"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M42 16Q50 24 42 32"
      fill="none"
      stroke="#E94560"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M46 12Q58 24 46 36"
      fill="none"
      stroke="#E94560"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    
    {/* Small sound wave on other side */}
    <path
      d="M10 22Q12 24 10 26"
      fill="none"
      stroke="#E94560"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
