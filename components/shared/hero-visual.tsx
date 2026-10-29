"use client";

import type { ImageFile } from "@/lib/site-data";
import { Cloud } from "./decor";
import { useLanguage } from "./language-provider";
import { Logo } from "./logo";
import { SectionPhoto } from "./section-photo";

/**
 * Главная фотография (public/images/main-page.*). Без фотографии — логотип сада на мягкой подложке.
 * Фото не обрезается: сохраняются исходные пропорции, размер ограничивает className.
 */
export function HeroVisual({
  photo,
  imageClassName = "",
  sceneClassName = "",
  sizes,
  logoSize,
}: {
  photo: ImageFile | null;
  imageClassName?: string;
  sceneClassName?: string;
  sizes: string;
  /** Размер логотипа в CSS-пикселях, когда фотографии нет. */
  logoSize: number;
}) {
  const { t } = useLanguage();

  if (!photo) return <LogoScene className={sceneClassName} logoSize={logoSize} />;

  return <SectionPhoto photo={photo} alt={t.hero.photoAlt} sizes={sizes} preload className={imageClassName} />;
}

/** Белая подложка совпадает с фоном файла логотипа, поэтому края изображения не видны. */
function LogoScene({ className, logoSize }: { className: string; logoSize: number }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: logoSize * 1.72, maxWidth: "100%" }}>
      <svg viewBox="0 0 200 200" className="pointer-events-none absolute inset-0 size-full" aria-hidden="true" focusable="false">
        <path
          d="M100 4c38 0 66 14 82 42s18 64 4 94-46 56-86 56-70-18-86-48S0 78 16 50 62 4 100 4Z"
          fill="var(--color-sun-soft)"
          opacity="0.6"
        />
        <circle cx="100" cy="100" r="84" fill="white" />
      </svg>
      <div className="aspect-square w-full" aria-hidden="true" />
      <Logo size={logoSize} preload className="absolute" />
      <Cloud className="absolute -left-2 top-[8%] w-[22%] drop-shadow-sm" />
      <Cloud className="absolute -right-1 bottom-[12%] w-[18%] drop-shadow-sm" />
    </div>
  );
}
