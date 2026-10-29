"use client";

import { mapLinks, site } from "@/lib/site-data";
import { Cloud, SunMark } from "@/components/shared/decor";
import { DocumentsAction, useDocumentsText } from "@/components/shared/documents-action";
import { GalleryEmpty, GalleryRowFiller, GalleryThumb, Lightbox, justifiedItemStyle, useGallery } from "@/components/shared/gallery";
import {
  BalloonIcon,
  BowlIcon,
  ChatIcon,
  ChevronDownIcon,
  ClockIcon,
  FolderIcon,
  InstagramIcon,
  PhoneIcon,
  PinIcon,
  UsersIcon,
} from "@/components/shared/icons";
import { useLanguage } from "@/components/shared/language-provider";
import { mobileId } from "./header";

const container = "mx-auto max-w-3xl px-4";
const sectionTitle = "mt-2 text-[24px] font-extrabold leading-tight text-ink md:text-[28px]";

const cardIcons = { age: BalloonIcon, groups: UsersIcon, language: ChatIcon, hours: ClockIcon } as const;

export function MobileAbout() {
  const { t } = useLanguage();
  const cards = Object.entries(t.about.cards) as [keyof typeof cardIcons, { label: string; value: string }][];

  return (
    <section id={mobileId("about")} className="scroll-mt-14 py-8">
      <div className={container}>
        <p className="kicker">{t.about.kicker}</p>
        <h2 className={sectionTitle}>{t.about.title}</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{t.about.text}</p>
        <ul className="mt-5 grid grid-cols-2 gap-2.5 md:grid-cols-4">
          {cards.map(([key, card], i) => {
            const Icon = cardIcons[key];
            return (
              <li key={key} className="card p-3.5">
                <span
                  className={`inline-flex size-9 items-center justify-center rounded-xl ${
                    i % 2 === 0 ? "bg-sun-soft text-ink" : "bg-leaf-soft text-leaf-deep"
                  }`}
                >
                  <Icon className="size-5" />
                </span>
                <span className="mt-2 block text-[13px] leading-tight text-ink-soft">{card.label}</span>
                <span className="mt-0.5 block font-display text-[17px] font-extrabold leading-tight text-ink">
                  {card.value}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function MobileGroupsFood() {
  const { locale, t } = useLanguage();

  return (
    <div className={`${container} grid gap-3 py-2 md:grid-cols-2`}>
      <section
        id={mobileId("groups")}
        aria-labelledby="m-groups-title"
        className="relative scroll-mt-20 overflow-hidden rounded-[22px] bg-sun-soft/70 p-5"
      >
        <Cloud className="absolute -right-3 top-3 w-16 opacity-80" />
        <p className="kicker">{t.groups.kicker}</p>
        <div className="relative mt-3 flex items-center gap-4">
          <span className="inline-flex size-[72px] shrink-0 items-center justify-center rounded-full bg-sun font-display text-[40px] font-black text-ink shadow-[0_0_0_6px_rgb(255_255_255/0.55)]">
            {site.groupsCount}
          </span>
          <div className="min-w-0">
            <h2 id="m-groups-title" className="text-2xl font-extrabold leading-tight text-ink">
              {t.groups.count}
            </h2>
            <p className="mt-0.5 text-[15px] font-semibold text-ink">{t.groups.ages}</p>
          </div>
        </div>
        <p className="relative mt-3 text-sm leading-relaxed text-ink-soft">{t.groups.note}</p>

        {site.groups.length > 0 && (
          <div className="relative mt-4">
            <h3 className="text-[15px] font-extrabold text-ink">{t.groups.listTitle}</h3>
            <ul className="mt-2 grid grid-cols-2 gap-2">
              {site.groups.map((group) => (
                <li key={group.name.kk} className="rounded-xl bg-white/85 px-3 py-2.5">
                  <span className="block text-sm font-bold text-ink">{group.name[locale]}</span>
                  {group.description && (
                    <span className="mt-0.5 block text-xs text-ink-soft">{group.description[locale]}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section id={mobileId("food")} aria-labelledby="m-food-title" className="card scroll-mt-20 p-5">
        <p className="kicker">{t.food.kicker}</p>
        <div className="mt-3 flex items-center gap-4">
          <span className="inline-flex size-[72px] shrink-0 items-center justify-center rounded-full bg-leaf-soft text-leaf-deep">
            <BowlIcon className="size-9" />
          </span>
          <div className="min-w-0">
            <h2 id="m-food-title" className="text-xl font-extrabold leading-tight text-ink">
              {t.food.title}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">{t.food.text}</p>
          </div>
        </div>
        <div className="mt-3 flex gap-1.5" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <SunMark key={i} className="size-6" />
          ))}
        </div>
      </section>
    </div>
  );
}

const ROW_HEIGHT = 100;
const INITIAL_COUNT = 4;

export function MobileGallery() {
  const { t } = useLanguage();
  const photos = site.gallery;
  const gallery = useGallery(photos, INITIAL_COUNT);

  return (
    <section id={mobileId("gallery")} className="scroll-mt-14 py-8">
      <div className={container}>
        <p className="kicker">{t.gallery.kicker}</p>
        <h2 className={sectionTitle}>{t.gallery.title}</h2>

        {photos.length === 0 ? (
          <GalleryEmpty className="mt-4" />
        ) : (
          <>
            <ul className="mt-4 flex flex-wrap gap-2">
              {gallery.visible.map((photo, index) => (
                <li key={photo.src} style={justifiedItemStyle(photo, ROW_HEIGHT)}>
                  <GalleryThumb
                    photo={photo}
                    index={index}
                    onOpen={gallery.open}
                    sizes="(min-width: 768px) 240px, 46vw"
                  />
                </li>
              ))}
              <GalleryRowFiller />
            </ul>
            {gallery.hasMore && (
              <button
                type="button"
                onClick={gallery.toggle}
                aria-expanded={gallery.expanded}
                className="btn-secondary mt-2 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-5 text-[15px] font-bold"
              >
                {gallery.expanded ? t.gallery.showLess : t.gallery.showMore}
                <ChevronDownIcon className={`size-4 transition-transform ${gallery.expanded ? "rotate-180" : ""}`} />
              </button>
            )}
          </>
        )}
      </div>

      <Lightbox photos={photos} index={gallery.openIndex} onClose={gallery.close} onChange={gallery.setOpenIndex} />
    </section>
  );
}

export function MobileDocuments() {
  const { t } = useLanguage();
  const text = useDocumentsText();

  return (
    <section id={mobileId("documents")} aria-labelledby="m-documents-title" className="scroll-mt-20 py-2">
      <div className={container}>
        <div className="card p-5 md:flex md:items-center md:gap-4">
          <div className="flex items-center gap-3.5 md:flex-1">
            <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-sun-soft text-ink">
              <FolderIcon className="size-6" />
            </span>
            <div className="min-w-0">
              <h2 id="m-documents-title" className="text-xl font-extrabold text-ink">
                {t.documents.title}
              </h2>
              <p className="mt-0.5 text-sm leading-snug text-ink-soft">{text}</p>
            </div>
          </div>
          <DocumentsAction className="mt-4 w-full md:mt-0 md:w-auto" />
        </div>
      </div>
    </section>
  );
}

export function MobileContacts() {
  const { locale, t } = useLanguage();

  const rows = [
    { icon: PinIcon, label: t.contacts.address, content: <span>{site.address[locale]}</span> },
    {
      icon: PhoneIcon,
      label: t.contacts.phone,
      content: (
        <a href={site.phone.href} className="font-bold text-ink underline underline-offset-4">
          {site.phone.display}
        </a>
      ),
    },
    { icon: ClockIcon, label: t.contacts.hours, content: <span>{site.hours}</span> },
    {
      icon: InstagramIcon,
      label: t.contacts.instagram,
      content: (
        <a
          href={site.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-ink underline underline-offset-4"
        >
          {site.instagram.handle}
          <span className="sr-only"> {t.contacts.newTab}</span>
        </a>
      ),
    },
  ];

  return (
    <section id={mobileId("contacts")} className="scroll-mt-14 py-8">
      <div className={container}>
        <p className="kicker">{t.contacts.kicker}</p>
        <h2 className={sectionTitle}>{t.contacts.title}</h2>

        <ul className="card mt-4 divide-y divide-line px-4 md:grid md:grid-cols-2 md:gap-x-6 md:divide-y-0 md:py-2">
          {rows.map(({ icon: Icon, label, content }) => (
            <li key={label} className="flex gap-3 py-3.5">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-leaf-soft text-leaf-deep">
                <Icon className="size-5" />
              </span>
              <span className="min-w-0 text-[15px] leading-snug text-ink">
                <span className="block text-[13px] text-ink-soft">{label}</span>
                <span className="mt-0.5 block break-words">{content}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <a
            href={site.phone.href}
            className="btn-primary col-span-2 inline-flex h-12 items-center justify-center gap-2 rounded-full px-4 text-[15px] font-bold"
          >
            <PhoneIcon className="size-5" />
            {t.header.call}
          </a>
          <p className="col-span-2 mt-1 text-sm font-semibold text-ink">{t.contacts.map}</p>
          {[
            { href: mapLinks.google, label: t.contacts.mapGoogle },
            { href: mapLinks.twoGis, label: t.contacts.map2gis },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex min-h-12 items-center justify-center gap-1.5 rounded-full px-3 py-2 text-center text-sm font-bold leading-tight"
            >
              <PinIcon className="size-4 shrink-0" />
              {link.label}
              <span className="sr-only"> {t.contacts.newTab}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
