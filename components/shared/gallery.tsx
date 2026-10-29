"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Photo } from "@/lib/site-data";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon, ImageIcon } from "./icons";
import { useLanguage } from "./language-provider";
import { galleryShape } from "./shapes";

/** Состояние галереи: сколько фото видно и какое открыто в просмотрщике. */
export function useGallery(photos: Photo[], initialCount: number) {
  const [expanded, setExpanded] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return {
    visible: expanded ? photos : photos.slice(0, initialCount),
    hasMore: photos.length > initialCount,
    expanded,
    toggle: () => setExpanded((value) => !value),
    openIndex,
    open: (index: number) => setOpenIndex(index),
    close: () => setOpenIndex(null),
    setOpenIndex,
  };
}

/**
 * Стиль элемента «выровненного ряда»: все фото в ряду одной высоты, ширина — по пропорциям.
 * Снимки не обрезаются. Последним в списке ставьте <GalleryRowFiller />.
 */
export function justifiedItemStyle(photo: Photo, rowHeight: number): React.CSSProperties {
  const ratio = photo.width / photo.height;
  return { flex: `${ratio} 1 ${Math.round(ratio * rowHeight)}px`, maxWidth: "100%" };
}

/** Невидимый хвост ряда, чтобы одиночное последнее фото не растягивалось на всю ширину. */
export function GalleryRowFiller() {
  return <li aria-hidden="true" className="h-0" style={{ flex: "1000 1 0px" }} />;
}

export function GalleryEmpty({ className = "" }: { className?: string }) {
  const { t } = useLanguage();
  return (
    <p
      className={`shape-petal flex items-center gap-3 border border-dashed border-sun-deep/40 bg-white/70 px-5 py-4 text-ink-soft ${className}`}
    >
      <ImageIcon className="size-6 shrink-0 text-sun-deep" />
      <span className="font-semibold">{t.gallery.empty}</span>
    </p>
  );
}

/** Миниатюра без обрезки: сохраняет исходные пропорции снимка; форма углов чередуется по номеру. */
export function GalleryThumb({
  photo,
  index,
  onOpen,
  sizes,
}: {
  photo: Photo;
  index: number;
  onOpen: (index: number) => void;
  sizes: string;
}) {
  const { locale, t } = useLanguage();
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      className={`group block w-full overflow-hidden bg-cream shadow-soft ${galleryShape(index)}`}
      aria-label={`${t.gallery.open}: ${photo.alt[locale]}`}
    >
      <Image
        src={photo.src}
        width={photo.width}
        height={photo.height}
        alt=""
        sizes={sizes}
        className="h-auto w-full transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
    </button>
  );
}

export function Lightbox({
  photos,
  index,
  onClose,
  onChange,
}: {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  onChange: (index: number) => void;
}) {
  const { locale, t } = useLanguage();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const isOpen = index !== null;
  const total = photos.length;

  const go = useCallback(
    (step: number) => {
      if (index === null || total < 2) return;
      onChange((index + step + total) % total);
    },
    [index, total, onChange],
  );

  // Фокус внутрь просмотрщика, блокировка прокрутки и возврат фокуса после закрытия.
  useEffect(() => {
    if (!isOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowLeft") go(-1);
      else if (event.key === "ArrowRight") go(1);
      else if (event.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>("button:not([disabled])");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, go, onClose]);

  if (index === null) return null;
  const photo = photos[index];

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={t.gallery.dialog}
      className="lightbox fixed inset-0 z-[70] flex flex-col bg-[#17140f]/[0.97] text-white"
      onTouchStart={(event) => {
        const touch = event.touches[0];
        touchStart.current = { x: touch.clientX, y: touch.clientY };
      }}
      onTouchEnd={(event) => {
        const start = touchStart.current;
        touchStart.current = null;
        if (!start) return;
        const touch = event.changedTouches[0];
        const dx = touch.clientX - start.x;
        const dy = touch.clientY - start.y;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
        else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) onClose();
      }}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3">
        <p className="text-sm font-semibold text-white/85" aria-live="polite">
          {t.gallery.counter(index + 1, total)}
        </p>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="inline-flex size-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
          aria-label={t.gallery.close}
        >
          <CloseIcon className="size-6" />
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-3 pb-3 sm:px-16"
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <figure className="flex w-full flex-col items-center">
          <Image
            key={photo.src}
            src={photo.src}
            width={photo.width}
            height={photo.height}
            alt={photo.alt[locale]}
            sizes="100vw"
            loading="eager"
            style={{
              width: `min(100%, calc((100dvh - 8.5rem) * ${photo.width / photo.height}))`,
              aspectRatio: `${photo.width} / ${photo.height}`,
            }}
            className="h-auto rounded-xl object-contain"
          />
          <figcaption className="mt-2 max-w-prose text-center text-sm text-white/80">{photo.alt[locale]}</figcaption>
        </figure>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              className="absolute left-2 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 sm:left-4"
              aria-label={t.gallery.prev}
            >
              <ChevronLeftIcon className="size-6" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="absolute right-2 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 sm:right-4"
              aria-label={t.gallery.next}
            >
              <ChevronRightIcon className="size-6" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
