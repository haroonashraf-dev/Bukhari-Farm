export default function GoatLogo({ className }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      {/* Horns */}
      <path d="M7 6C4.5 3.5 2.5 3 1.5 4.5c0 0 2.5 4.5 5.5 5.5" />
      <path d="M17 6c2.5-2.5 4.5-3 5.5-1.5 0 0-2.5 4.5-5.5 5.5" />
      {/* Head */}
      <path d="M7 9l5 10 5-10V6L12 3 7 6v3z" />
      {/* Ears */}
      <path d="M7 9c-2.5 0-4.5 1-5.5 2.5 2.5 1.5 4.5 0 5.5-2.5z" />
      <path d="M17 9c2.5 0 4.5 1 5.5 2.5-2.5 1.5-4.5 0-5.5-2.5z" />
      {/* Eyes */}
      <circle cx="10" cy="8" r="1" fill="currentColor" stroke="none" />
      <circle cx="14" cy="8" r="1" fill="currentColor" stroke="none" />
      {/* Nose/Mouth */}
      <path d="M12 16v3" />
      <path d="M10.5 16h3" />
    </svg>
  );
}
