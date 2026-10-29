"use client";

import { site } from "@/lib/site-data";
import { GalleryEmpty, GalleryRowFiller, GalleryThumb, Lightbox, justifiedItemStyle, useGallery } from "@/components/shared/gallery";
import { Cloud, Sun } from "@/components/shared/decor";
import { ChevronDownIcon } from "@/components/shared/icons";
import { useLanguage } from "@/components/shared/language-provider";

const ROW_HEIGHT = 190;
const INITIAL_COUNT = 6;

export function Gallery() {
  const { t } = useLanguage();
  const photos = site.gallery;
  const gallery = useGallery(photos, INITIAL_COUNT);

  return (
    <section id="gallery" className="scroll-mt-16 py-14 xl:py-16">
      <div className="relative mx-auto max-w-[1200px] px-8">
        <Sun className="absolute right-24 top-0 w-14" />
        <Cloud className="absolute right-6 top-9 w-24" fill="var(--color-sun-soft)" />
        <p className="kicker">{t.gallery.kicker}</p>
        <h2 className="mt-3 text-[34px] font-extrabold leading-tight text-ink xl:text-[38px]">{t.gallery.title}</h2>

        {photos.length === 0 ? (
          <GalleryEmpty className="mt-6 max-w-xl" />
        ) : (
          <>
            <ul className="mt-6 flex flex-wrap gap-3">
              {gallery.visible.map((photo, index) => (
                <li key={photo.src} style={justifiedItemStyle(photo, ROW_HEIGHT)}>
                  <GalleryThumb
                    photo={photo}
                    index={index}
                    onOpen={gallery.open}
                    sizes="(min-width: 1200px) 380px, 31vw"
                  />
                </li>
              ))}
              <GalleryRowFiller />
            </ul>
            {gallery.hasMore && (
              <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  onClick={gallery.toggle}
                  aria-expanded={gallery.expanded}
                  className="btn-secondary inline-flex h-11 items-center gap-2 rounded-full px-6 text-sm font-bold"
                >
                  {gallery.expanded ? t.gallery.showLess : t.gallery.showMore}
                  <ChevronDownIcon className={`size-4 transition-transform ${gallery.expanded ? "rotate-180" : ""}`} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <Lightbox photos={photos} index={gallery.openIndex} onClose={gallery.close} onChange={gallery.setOpenIndex} />
    </section>
  );
}
