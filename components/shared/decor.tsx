/**
 * Декоративные элементы. Все они aria-hidden и не перехватывают клики.
 */

export function Cloud({ className = "", fill = "white" }: { className?: string; fill?: string }) {
  return (
    <svg viewBox="0 0 120 56" className={`pointer-events-none ${className}`} aria-hidden="true" focusable="false">
      <path
        d="M24 52h74a20 20 0 0 0 2-39.9A26 26 0 0 0 51.5 9 18 18 0 0 0 24 22.5 15 15 0 0 0 24 52Z"
        fill={fill}
      />
    </svg>
  );
}

/** Маленькое солнце: круг и восемь скруглённых лучей. Размер задаёт className. */
export function Sun({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={`pointer-events-none ${className}`} aria-hidden="true" focusable="false">
      <g stroke="var(--color-sun)" strokeWidth="3.4" strokeLinecap="round">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <path key={angle} d="M24 4.5v5" transform={`rotate(${angle} 24 24)`} />
        ))}
      </g>
      <circle cx="24" cy="24" r="10.5" fill="var(--color-sun)" />
      <circle cx="20.5" cy="20.5" r="3.2" fill="#fff" opacity="0.45" />
    </svg>
  );
}

/**
 * Волнистый переход между разделами. Заливка — currentColor (задайте text-butter и т. п.),
 * волна «смотрит» вверх; flip переворачивает её для нижнего края полосы.
 */
export function Wave({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 40"
      preserveAspectRatio="none"
      className={`pointer-events-none block w-full ${flip ? "rotate-180" : ""} ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0 22C120 8 240 4 360 12s240 26 360 24 240-26 360-28 240 14 360 22v10H0Z"
        fill="currentColor"
      />
    </svg>
  );
}

type UnderlayVariant = "circle" | "hill" | "cloud" | "blob" | "sun";

/**
 * Подложка позади текстовой карточки: выглядывает из-за края и не ограничивает содержимое.
 * Родитель — relative isolate, сама карточка — relative (поверх подложки).
 */
export function CardUnderlay({ variant, compact = false }: { variant: UnderlayVariant; compact?: boolean }) {
  switch (variant) {
    case "circle":
      return (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute -z-10 rounded-full bg-sun-soft ${
            compact ? "-right-1.5 -top-1.5 size-12" : "-right-2.5 -top-2.5 size-20"
          }`}
        />
      );
    case "hill":
      return (
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute -z-10 rounded-full bg-leaf ${
            compact ? "-bottom-1.5 left-4 h-6 w-20 opacity-45" : "-bottom-2.5 left-8 h-9 w-32 opacity-45"
          }`}
        />
      );
    case "cloud":
      return <Cloud className={`absolute -z-10 ${compact ? "-right-2 top-2 w-12" : "-top-5 right-6 w-24"}`} />;
    case "blob":
      return (
        <span
          aria-hidden="true"
          className={`icon-blob pointer-events-none absolute -z-10 bg-leaf-soft ${
            compact ? "-bottom-1.5 -left-1.5 size-14" : "-bottom-3 -left-3 size-24"
          }`}
        />
      );
    case "sun":
      return <Sun className={`absolute -z-10 ${compact ? "-right-2 -top-3 w-10" : "-right-4 -top-5 w-16"}`} />;
  }
}
