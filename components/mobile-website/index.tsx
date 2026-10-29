"use client";

import type { PagePhotos } from "@/lib/site-data";
import { MobileFooter } from "./footer";
import { MobileHeader, mobileId } from "./header";
import { MobileHero } from "./hero";
import { MobileAbout, MobileContacts, MobileDocuments, MobileGallery, MobileLife } from "./sections";

/** Версия для телефона и планшета (до 1024 px). */
export function MobileWebsite({ photos }: { photos: PagePhotos }) {
  return (
    <>
      <MobileHeader />
      <main id={mobileId("main")}>
        <MobileHero photo={photos.main} />
        <MobileAbout photo={photos.about} />
        <MobileLife />
        <MobileGallery />
        <MobileDocuments />
        <MobileContacts />
      </main>
      <MobileFooter />
    </>
  );
}
