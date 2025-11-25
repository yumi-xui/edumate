export default function GroupIcon({ size = 48, className = '' }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="32" cy="32" r="32" fill="#9A6BFF" />
      <circle cx="32" cy="32" r="28" fill="#FFFEEC" />

      {/* Heads */}
      <circle cx="24" cy="28" r="8" fill="#9A6BFF" />
      <circle cx="40" cy="24" r="8" fill="#9A6BFF" />

      {/* Body */}
      <path
        d="M13 44c0-8.284 7.611-15 17-15h4c9.389 0 17 6.716 17 15v9H13v-9z"
        fill="#9A6BFF"
      />
      <path
        d="M14 46.5c4.5-5.5 11.5-9.5 20-9.5 7 0 13 2 18 6.5V53H14v-6.5z"
        fill="#FFFEEC"
      />
    </svg>
  )
}


