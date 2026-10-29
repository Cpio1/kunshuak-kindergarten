import Image from "next/image";
import { site } from "@/lib/site-data";

/** Официальный логотип сада. Пропорции сохраняются (object-contain), размер задаёт className. */
export function Logo({
  size,
  className = "",
  preload = false,
}: {
  /** Отображаемый размер в CSS-пикселях — по нему браузер выбирает файл нужной чёткости. */
  size: number;
  className?: string;
  preload?: boolean;
}) {
  return (
    <Image
      src={site.logo.src}
      width={site.logo.width}
      height={site.logo.height}
      alt={site.shortName}
      sizes={`${size}px`}
      style={{ width: size, height: size }}
      preload={preload}
      className={`shrink-0 object-contain ${className}`.trim()}
    />
  );
}
