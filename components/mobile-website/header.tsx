"use client";

import { useEffect, useRef, useState } from "react";
import { site, sectionIds } from "@/lib/site-data";
import { Logo } from "@/components/shared/logo";
import { CloseIcon, MenuIcon, PhoneIcon } from "@/components/shared/icons";
import { LangSwitch } from "@/components/shared/lang-switch";
import { useLanguage } from "@/components/shared/language-provider";

/** В мобильной версии id разделов начинаются с «m-», чтобы не совпадать с версией для компьютера. */
export const mobileId = (id: string) => `m-${id}`;

export function MobileHeader() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
      <a
        href={`#${mobileId("main")}`}
        className="sr-only rounded-full bg-ink px-4 py-2 text-sm font-bold text-white focus:not-sr-only focus:absolute focus:left-3 focus:top-2 focus:z-10"
      >
        {t.header.skip}
      </a>
      <div className="border-b border-line/80 bg-milk/95 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-3xl items-center gap-2 px-4">
          <a href={`#${mobileId("home")}`} className="mr-auto flex items-center gap-2 rounded-xl">
            <Logo size={44} preload />
            <span aria-hidden="true" className="font-display text-[19px] font-extrabold text-ink">{site.shortName}</span>
          </a>
          <a
            href={site.phone.href}
            className="btn-primary inline-flex size-11 items-center justify-center rounded-full"
            aria-label={`${t.header.call}: ${site.phone.display}`}
          >
            <PhoneIcon className="size-5" />
          </a>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.header.menuClose : t.header.menuOpen}
            className="btn-secondary inline-flex size-11 items-center justify-center rounded-full"
          >
            {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-b border-line bg-milk shadow-[0_18px_30px_-20px_rgb(74_56_12/0.35)]"
      >
        <nav aria-label={t.header.menu} className="mx-auto max-w-3xl px-4 pb-4 pt-2">
          <ul className="grid grid-cols-2 gap-1.5">
            {sectionIds.map((id) => (
              <li key={id}>
                <a
                  href={`#${mobileId(id)}`}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center rounded-xl bg-white px-3.5 text-[15px] font-semibold text-ink ring-1 ring-line"
                >
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center justify-between gap-3">
            <LangSwitch />
            <a
              href={site.phone.href}
              className="btn-primary inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-full px-4 text-[15px] font-bold"
            >
              <PhoneIcon className="size-5" />
              {t.header.call}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
