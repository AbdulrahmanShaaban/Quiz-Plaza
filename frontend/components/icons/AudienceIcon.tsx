export const AudienceIcon = ({ className = "", size = 48 }: { className?: string; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Person 1 - left */}
    <circle cx="12" cy="20" r="6" fill="#FFB347" stroke="#E89850" strokeWidth="2" />
    <path
      d="M6 26C6 26 6 38 12 38C18 38 18 26 18 26"
      fill="#3498DB"
      stroke="#2980B9"
      strokeWidth="2"
    />
    {/* Hand up */}
    <path
      d="M6 24L2 16"
      fill="none"
      stroke="#FFB347"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <circle cx="2" cy="14" r="2" fill="#FFB347" stroke="#E89850" strokeWidth="1.5" />
    
    {/* Person 2 - center front */}
    <circle cx="24" cy="24" r="7" fill="#FFB347" stroke="#E89850" strokeWidth="2" />
    <path
      d="M17 30C17 30 17 42 24 42C31 42 31 30 31 30"
      fill="#E74C3C"
      stroke="#C0392B"
      strokeWidth="2"
    />
    {/* Both hands up */}
    <path
      d="M19 28L14 18"
      fill="none"
      stroke="#FFB347"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <circle cx="14" cy="16" r="2" fill="#FFB347" stroke="#E89850" strokeWidth="1.5" />
    <path
      d="M29 28L34 18"
      fill="none"
      stroke="#FFB347"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <circle cx="34" cy="16" r="2" fill="#FFB347" stroke="#E89850" strokeWidth="1.5" />
    
    {/* Person 3 - right */}
    <circle cx="36" cy="20" r="6" fill="#FFB347" stroke="#E89850" strokeWidth="2" />
    <path
      d="M30 26C30 26 30 38 36 38C42 38 42 26 42 26"
      fill="#2ECC71"
      stroke="#27AE60"
      strokeWidth="2"
    />
    {/* Hand up */}
    <path
      d="M42 24L46 16"
      fill="none"
      stroke="#FFB347"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <circle cx="46" cy="14" r="2" fill="#FFB347" stroke="#E89850" strokeWidth="1.5" />
    
    {/* Person 4 - back left (smaller) */}
    <circle cx="18" cy="12" r="4" fill="#FFB347" stroke="#E89850" strokeWidth="1.5" />
    <path
      d="M14 15C14 15 14 22 18 22C22 22 22 15 22 15"
      fill="#9B59B6"
      stroke="#8E44AD"
      strokeWidth="1.5"
    />
    
    {/* Person 5 - back right (smaller) */}
    <circle cx="30" cy="12" r="4" fill="#FFB347" stroke="#E89850" strokeWidth="1.5" />
    <path
      d="M26 15C26 15 26 22 30 22C34 22 34 15 34 15"
      fill="#F39C12"
      stroke="#E67E22"
      strokeWidth="1.5"
    />
  </svg>
);
