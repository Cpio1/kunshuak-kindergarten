"use client";

import { MobileFooter } from "./footer";
import { MobileHeader, mobileId } from "./header";
import { MobileHero } from "./hero";
import { MobileAbout, MobileContacts, MobileDocuments, MobileGallery, MobileGroupsFood } from "./sections";

/** Версия для телефона и планшета (до 1024 px). */
export function MobileWebsite() {
  return (
    <>
      <MobileHeader />
      <main id={mobileId("main")}>
        <MobileHero />
        <MobileAbout />
        <MobileGroupsFood />
        <MobileGallery />
        <MobileDocuments />
        <MobileContacts />
      </main>
      <MobileFooter />
    </>
  );
}
