"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import type { ImageFile } from "@/lib/site-data";
import { Cloud } from "./decor";
import { useLanguage } from "./language-provider";
import { Logo } from "./logo";

/** Диаметр белого круга в процентах от стороны сцены (r = 84 из 200 в SVG ниже). */
const CIRCLE = 84;

/**
 * Главный экран: округлая асимметричная фигура с широкой нежно-жёлтой обводкой, белый круг внутри
 * и два облачка (сверху слева и снизу справа). Внутри — public/images/main-page.* (PNG в приоритете,
 * прозрачность сохраняется), а без файла — логотип сада.
 * Изображение вписано в круг целиком (object-contain, без обрезки и растягивания) и не имеет своей подложки.
 * Размер сцены — sceneSize CSS-пикселей, на узком экране она пропорционально уменьшается до ширины контейнера.
 */
export function HeroVisual({
  photo,
  sizes,
  sceneSize,
  logoSize,
  className = "",
}: {
  photo: ImageFile | null;
  sizes: string;
  sceneSize: number;
  /** Размер логотипа в CSS-пикселях, когда фотографии нет. */
  logoSize: number;
  className?: string;
}) {
  const { t } = useLanguage();

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: sceneSize, maxWidth: "100%" }}>
      <svg viewBox="0 0 200 200" className="pointer-events-none absolute inset-0 size-full" aria-hidden="true" focusable="false">
        <path
          d="M100 4c38 0 66 14 82 42s18 64 4 94-46 56-86 56-70-18-86-48S0 78 16 50 62 4 100 4Z"
          fill="var(--color-sun-soft)"
          opacity="0.6"
        />
        <circle cx="100" cy="100" r="84" fill="white" />
      </svg>
      <div className="aspect-square w-full" aria-hidden="true" />
      {photo ? (
        <span className="absolute" style={inscribedBox(photo)}>
          <Image src={photo.src} alt={t.hero.photoAlt} fill sizes={sizes} preload className="object-contain" />
        </span>
      ) : (
        <Logo size={logoSize} preload className="absolute" />
      )}
      <Cloud className="absolute -left-2 top-[8%] w-[22%] drop-shadow-sm" />
      <Cloud className="absolute -right-1 bottom-[12%] w-[18%] drop-shadow-sm" />
    </div>
  );
}

/**
 * Самый большой прямоугольник с пропорциями фото, который целиком помещается в белый круг
 * (диагональ = диаметр), с небольшим запасом от края. Проценты — от стороны сцены.
 */
function inscribedBox(photo: ImageFile): CSSProperties {
  const ratio = photo.width / photo.height;
  const diagonal = CIRCLE * 0.95;
  const width = (diagonal * ratio) / Math.hypot(ratio, 1);
  const height = diagonal / Math.hypot(ratio, 1);
  return { width: `${width}%`, height: `${height}%`, left: `${(100 - width) / 2}%`, top: `${(100 - height) / 2}%` };
}
