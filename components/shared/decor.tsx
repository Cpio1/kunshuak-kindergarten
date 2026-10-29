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

/** Композиция для главного экрана, пока нет реальной фотографии. */
export function SkyScene({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 320" className={`pointer-events-none ${className}`} aria-hidden="true" focusable="false">
      <path
        d="M58 74C96 22 190 6 262 26s128 76 122 146-74 128-168 132S28 262 20 196 20 126 58 74Z"
        fill="var(--color-cream)"
      />
      <g className="sun-rays" style={{ transformOrigin: "200px 150px" }}>
        {rays.map((deg) => (
          <rect
            key={deg}
            x="194"
            y="52"
            width="12"
            height="26"
            rx="6"
            fill="var(--color-sun)"
            opacity="0.85"
            transform={`rotate(${deg} 200 150)`}
          />
        ))}
      </g>
      <circle cx="200" cy="150" r="58" fill="var(--color-sun)" />
      <ellipse cx="180" cy="122" rx="22" ry="14" fill="white" opacity="0.28" transform="rotate(-30 180 122)" />
      <circle cx="182" cy="142" r="5" fill="var(--color-ink)" opacity="0.8" />
      <circle cx="218" cy="142" r="5" fill="var(--color-ink)" opacity="0.8" />
      <path d="M184 164q16 13 32 0" stroke="var(--color-ink)" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.8" />
      <circle cx="172" cy="160" r="6" fill="#F59E7A" opacity="0.45" />
      <circle cx="228" cy="160" r="6" fill="#F59E7A" opacity="0.45" />
      <path
        d="M70 214h86a22 22 0 0 0 1-44 30 30 0 0 0-55-6 20 20 0 0 0-31 15 17.5 17.5 0 0 0-1 35Z"
        fill="white"
      />
      <path
        d="M262 98h62a16 16 0 0 0 1-32 21 21 0 0 0-39-5 14.5 14.5 0 0 0-23 11 13 13 0 0 0-1 26Z"
        fill="white"
      />
      <path d="M36 290c50-40 120-48 178-30s110 20 156-8v52H36Z" fill="var(--color-leaf-soft)" />
      <path d="M120 304c40-26 96-30 150-14s70 10 100 0v14Z" fill="var(--color-leaf)" opacity="0.55" />
    </svg>
  );
}
