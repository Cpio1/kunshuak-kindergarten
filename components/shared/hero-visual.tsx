"use client";

import type { ImageFile } from "@/lib/site-data";
import { Cloud, Sun } from "./decor";
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

  return (
    <div className={`relative isolate inline-flex ${sceneClassName}`}>
      <span aria-hidden="true" className="shape-arch absolute inset-0 -z-10 translate-x-[5%] translate-y-[3%] bg-sun-soft" />
      <SectionPhoto photo={photo} alt={t.hero.photoAlt} sizes={sizes} preload shape="arch" className={imageClassName} />
      <Sun className="absolute -right-[6%] -top-[4%] w-[16%] max-w-16" />
      <Cloud className="absolute -left-[8%] bottom-[14%] w-[24%] max-w-24 drop-shadow-sm" />
    </div>
  );
}

/**
 * Без фотографии: логотип в белой арке. Логотип нарисован на белом фоне, поэтому края файла
 * сливаются с аркой, а сам квадрат логотипа целиком помещается внутри формы (не обрезается).
 */
function LogoScene({ className, logoSize }: { className: string; logoSize: number }) {
  return (
    <div className={`relative isolate ${className}`} style={{ width: logoSize * 1.25, maxWidth: "100%" }}>
      <span aria-hidden="true" className="shape-arch absolute inset-0 -z-10 translate-x-[7%] translate-y-[4%] bg-sun-soft" />
      <div className="shape-arch flex aspect-[1/1.15] w-full items-end justify-center bg-white pb-[9%] shadow-soft">
        <Logo size={logoSize} preload />
      </div>
      <Sun className="absolute -right-[10%] -top-[3%] w-[22%]" />
      <Cloud className="absolute -left-[16%] top-[30%] w-[30%] drop-shadow-sm" />
      <Cloud className="absolute -right-[12%] bottom-[10%] w-[24%] drop-shadow-sm" />
    </div>
  );
}
