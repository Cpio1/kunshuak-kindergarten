/**
 * Декоративные элементы. Все они aria-hidden и не перехватывают клики.
 */

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
