"use client";

import { mapLinks } from "@/lib/site-data";
import { useLanguage } from "./language-provider";

/** Официальный виджет 2ГИС «Фирмы на карте» с карточкой садика. Высоту задаёт className. */
export function TwoGisMap({ className = "" }: { className?: string }) {
  const { t } = useLanguage();
  return (
    <div className={`overflow-hidden rounded-[20px] border border-line bg-cream shadow-soft ${className}`}>
      <iframe
        src={mapLinks.twoGisWidget}
        title={t.contacts.mapTitle}
        loading="lazy"
        className="block size-full border-0"
      />
    </div>
  );
}
