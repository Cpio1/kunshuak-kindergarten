"use client";

import type { PagePhotos } from "@/lib/site-data";
import { About } from "./about";
import { Contacts, Documents } from "./contacts";
import { Footer } from "./footer";
import { Gallery } from "./gallery";
import { GroupsFood } from "./groups-food";
import { Header } from "./header";
import { Hero } from "./hero";

/** Версия для компьютера (от 1024 px). */
export function DesktopWebsite({ photos }: { photos: PagePhotos }) {
  return (
    <>
      <Header />
      <main id="main">
        <Hero photo={photos.main} />
        <About photo={photos.about} />
        <GroupsFood />
        <Gallery />
        <Documents />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
