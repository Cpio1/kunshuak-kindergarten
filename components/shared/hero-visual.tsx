"use client";

import Image from "next/image";
import { site } from "@/lib/site-data";
import { SkyScene } from "./decor";
import { useLanguage } from "./language-provider";

/**
 * Главная фотография из site.heroPhoto. Без фотографии — декоративная сцена.
 * Фото не обрезается: сохраняются исходные пропорции, размер ограничивает className.
 */
export function HeroVisual({
  imageClassName = "",
  sceneClassName = "",
  sizes,
}: {
  imageClassName?: string;
  sceneClassName?: string;
  sizes: string;
}) {
  const { locale } = useLanguage();
  const photo = site.heroPhoto;

  if (!photo) return <SkyScene className={sceneClassName} />;

  return (
    <Image
      src={photo.src}
      width={photo.width}
      height={photo.height}
      alt={photo.alt[locale]}
      sizes={sizes}
      preload
      className={`h-auto w-auto max-w-full rounded-[28px] shadow-soft ${imageClassName}`}
    />
  );
}
