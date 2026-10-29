"use client";

import { site } from "@/lib/site-data";
import { WhatsAppIcon } from "./icons";
import { useLanguage } from "./language-provider";

/** Кнопка «Написать в WhatsApp» (открывается в новой вкладке). Размеры и раскладку задаёт className. */
export function WhatsAppAction({ className = "" }: { className?: string }) {
  const { t } = useLanguage();

  return (
    <a
      href={site.whatsapp.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-whatsapp inline-flex items-center justify-center gap-2 font-bold ${className}`}
    >
      <WhatsAppIcon className="size-5 shrink-0" />
      {t.contacts.whatsapp}
      <span className="sr-only">
        {" "}
        {site.whatsapp.display} {t.contacts.newTab}
      </span>
    </a>
  );
}
