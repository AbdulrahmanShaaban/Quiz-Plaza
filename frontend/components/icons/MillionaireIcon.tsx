export const MillionaireIcon = ({ className = "", size = 48 }: { className?: string; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Trophy cup */}
    <path
      d="M12 8C12 6 14 4 16 4H32C34 4 36 6 36 8V12C36 20 32 26 24 28C16 26 12 20 12 12V8Z"
      fill="#FFD700"
      stroke="#B8860B"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* Trophy handles */}
    <path
      d="M12 10C8 10 6 14 6 18C6 22 9 24 12 24"
      fill="none"
      stroke="#FFD700"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M36 10C40 10 42 14 42 18C42 22 39 24 36 24"
      fill="none"
      stroke="#FFD700"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Trophy base */}
    <rect x="20" y="28" width="8" height="6" fill="#FFD700" stroke="#B8860B" strokeWidth="2.5" />
    <rect x="16" y="34" width="16" height="4" rx="1" fill="#FFD700" stroke="#B8860B" strokeWidth="2.5" />
    {/* Star on trophy */}
    <path
      d="M24 10L25.5 14H29.5L26.5 16.5L27.5 20.5L24 18L20.5 20.5L21.5 16.5L18.5 14H22.5L24 10Z"
      fill="#FFF8DC"
      stroke="#B8860B"
      strokeWidth="1.5"
    />
    {/* Sparkles */}
    <path
      d="M8 6L9 8L11 9L9 10L8 12L7 10L5 9L7 8L8 6Z"
      fill="#FFD700"
      stroke="#B8860B"
      strokeWidth="1.5"
    />
    <path
      d="M40 6L41 8L43 9L41 10L40 12L39 10L37 9L39 8L40 6Z"
      fill="#FFD700"
      stroke="#B8860B"
      strokeWidth="1.5"
    />
    <path
      d="M44 20L45 22L47 23L45 24L44 26L43 24L41 23L43 22L44 20Z"
      fill="#FFD700"
      stroke="#B8860B"
      strokeWidth="1.5"
    />
  </svg>
);
