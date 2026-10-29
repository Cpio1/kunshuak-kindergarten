/**
 * Декоративные элементы. Все они aria-hidden и не перехватывают клики.
 * SunMark — простой значок солнца рядом с названием, это не официальный логотип.
 */

const rays = Array.from({ length: 12 }, (_, i) => i * 30);

export function SunMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={`pointer-events-none ${className}`} aria-hidden="true" focusable="false">
      <g stroke="var(--color-sun-deep)" strokeWidth="2.6" strokeLinecap="round">
        {rays.map((deg) => (
          <line key={deg} x1="20" y1="3.5" x2="20" y2="7.5" transform={`rotate(${deg} 20 20)`} />
        ))}
      </g>
      <circle cx="20" cy="20" r="8.5" fill="var(--color-sun)" />
    </svg>
  );
}

export function Cloud({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 56" className={`pointer-events-none ${className}`} aria-hidden="true" focusable="false">
      <path
        d="M24 52h74a20 20 0 0 0 2-39.9A26 26 0 0 0 51.5 9 18 18 0 0 0 24 22.5 15 15 0 0 0 24 52Z"
        fill="white"
      />
    </svg>
  );
}
