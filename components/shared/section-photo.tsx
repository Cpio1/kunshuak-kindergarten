import Image from "next/image";
import type { ImageFile } from "@/lib/site-data";

/**
 * Фотография раздела без обрезки: исходные пропорции сохраняются,
 * а максимальную высоту задаёт className (например, max-h-[400px]).
 */
export function SectionPhoto({
  photo,
  alt,
  sizes,
  preload = false,
  className = "",
}: {
  photo: ImageFile;
  alt: string;
  sizes: string;
  preload?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={photo.src}
      width={photo.width}
      height={photo.height}
      alt={alt}
      sizes={sizes}
      preload={preload}
      className={`h-auto w-auto max-w-full rounded-[24px] object-contain shadow-soft ${className}`}
    />
  );
}
