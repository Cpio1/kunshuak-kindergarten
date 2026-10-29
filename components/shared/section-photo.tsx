import Image from "next/image";
import type { ImageFile } from "@/lib/site-data";
import { Cloud, Sun } from "./decor";

const shapes = {
  /** Мягкий прямоугольник с тенью — для отдельной фотографии. */
  soft: "rounded-[24px] shadow-soft",
  /** Арка (главная фотография): срезаются только верхние углы, центр кадра не трогается. */
  arch: "shape-arch shadow-soft",
  /** Внутри фигурной подложки (см. PebblePhoto): только лёгкое скругление. */
  inset: "rounded-[18px]",
} as const;

/**
 * Фотография раздела без обрезки: исходные пропорции сохраняются,
 * а максимальную высоту задаёт className (например, max-h-[400px]).
 */
export function SectionPhoto({
  photo,
  alt,
  sizes,
  preload = false,
  shape = "soft",
  className = "",
}: {
  photo: ImageFile;
  alt: string;
  sizes: string;
  preload?: boolean;
  shape?: keyof typeof shapes;
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
      className={`h-auto w-auto max-w-full object-contain ${shapes[shape]} ${className}`}
    />
  );
}

/**
 * Фото на белой подложке-«гальке» с отступом 13 %: фигура мягкая, а сам снимок не обрезается
 * (углы кадра с запасом лежат внутри формы). Позади — зелёная клякса, солнце и облако.
 * Ширину задаёт className.
 */
export function PebblePhoto({
  photo,
  alt,
  sizes,
  className = "",
  compact = false,
}: {
  photo: ImageFile;
  alt: string;
  sizes: string;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={`relative isolate ${className}`}>
      <span aria-hidden="true" className="icon-blob absolute inset-[4%] -z-10 translate-x-[5%] translate-y-[4%] rotate-12 bg-leaf-soft" />
      <div className="shape-pebble bg-white p-[13%] shadow-soft">
        <SectionPhoto photo={photo} alt={alt} sizes={sizes} shape="inset" className="w-full!" />
      </div>
      <Sun className={`absolute ${compact ? "-top-1 right-[6%] w-9" : "-top-2 right-[8%] w-14"}`} />
      <Cloud className={`absolute drop-shadow-sm ${compact ? "-left-2 bottom-[10%] w-14" : "-left-5 bottom-[12%] w-24"}`} />
    </div>
  );
}
