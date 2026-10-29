"use client";

import { mapLinks, site } from "@/lib/site-data";
import { CardUnderlay, Cloud } from "@/components/shared/decor";
import { DocumentsAction, useDocumentsText } from "@/components/shared/documents-action";
import { ClockIcon, ExternalIcon, FolderIcon, InstagramIcon, PhoneIcon, PinIcon } from "@/components/shared/icons";
import { useLanguage } from "@/components/shared/language-provider";
import { iconShape } from "@/components/shared/shapes";
import { TwoGisMap } from "@/components/shared/two-gis-map";

export function Documents() {
  const { t } = useLanguage();
  const text = useDocumentsText();

  return (
    <section id="documents" aria-labelledby="documents-title" className="scroll-mt-24 pb-6">
      <div className="mx-auto max-w-[1200px] px-8">
        <div className="relative isolate">
        <CardUnderlay variant="sun" />
        <div className="card shape-leaf relative flex items-center gap-5 px-7 py-5 [--shape-big:36px] [--shape-small:14px]">
          <span className="icon-blob inline-flex size-14 shrink-0 items-center justify-center bg-sun-soft text-ink">
            <FolderIcon className="size-7" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 id="documents-title" className="text-2xl font-extrabold text-ink">
              {t.documents.title}
            </h2>
            <p className="mt-0.5 text-[15px] text-ink-soft">{text}</p>
          </div>
          <DocumentsAction className="shrink-0" />
        </div>
        </div>
      </div>
    </section>
  );
}

export function Contacts() {
  const { locale, t } = useLanguage();

  const rows = [
    { icon: PinIcon, label: t.contacts.address, content: <span>{site.address[locale]}</span> },
    {
      icon: PhoneIcon,
      label: t.contacts.phone,
      content: (
        <a href={site.phone.href} className="font-bold text-ink underline-offset-4 hover:underline">
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
          className="font-bold text-ink underline-offset-4 hover:underline"
        >
          {site.instagram.handle}
          <span className="sr-only"> {t.contacts.newTab}</span>
        </a>
      ),
    },
  ];

  return (
    <section id="contacts" className="scroll-mt-16 py-12 xl:py-14">
      <div className="relative mx-auto max-w-[1200px] px-8">
        <Cloud className="absolute right-10 top-2 w-24" fill="var(--color-leaf-soft)" />
        <p className="kicker">{t.contacts.kicker}</p>
        <h2 className="mt-3 text-[34px] font-extrabold leading-tight text-ink xl:text-[38px]">{t.contacts.title}</h2>

        <div className="mt-6 grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-6">
          <div className="relative isolate">
          <CardUnderlay variant="blob" />
          <div className="card shape-petal relative flex h-full flex-col p-6 [--shape-big:36px] [--shape-small:14px]">
            <ul className="flex flex-col gap-4">
              {rows.map(({ icon: Icon, label, content }, i) => (
                <li key={label} className="flex gap-3.5">
                  <span className={`inline-flex size-11 shrink-0 items-center justify-center bg-leaf-soft text-leaf-deep ${iconShape(i)}`}>
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0 text-[15px] leading-snug text-ink">
                    <span className="block text-sm text-ink-soft">{label}</span>
                    <span className="mt-0.5 block break-words">{content}</span>
                  </span>
                </li>
              ))}
            </ul>
            <a
              href={site.phone.href}
              className="btn-primary mt-auto inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-[15px] font-bold"
            >
              <PhoneIcon className="size-5" />
              {t.header.call}
            </a>
          </div>
          </div>

          <div className="flex flex-col gap-3">
            <TwoGisMap className="h-[310px]" />
            <div className="flex flex-wrap gap-2.5">
              {[
                { href: mapLinks.twoGis, label: t.contacts.open2gis },
                { href: mapLinks.google, label: t.contacts.mapGoogle },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex h-11 items-center justify-center gap-1.5 rounded-full px-5 text-sm font-bold"
                >
                  <PinIcon className="size-4 shrink-0" />
                  {link.label}
                  <ExternalIcon className="size-4 shrink-0 text-ink-soft" />
                  <span className="sr-only"> {t.contacts.newTab}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
