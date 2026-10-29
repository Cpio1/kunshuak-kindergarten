"use client";

import { site } from "@/lib/site-data";
import { ExternalIcon } from "./icons";
import { useLanguage } from "./language-provider";

/** Кнопка документов: неактивна, пока site.documentsUrl пуст. */
export function DocumentsAction({ className = "" }: { className?: string }) {
  const { t } = useLanguage();
  const url = site.documentsUrl.trim();

  if (!url) {
    return (
      <button
        type="button"
        disabled
        className={`inline-flex min-h-11 cursor-not-allowed items-center justify-center rounded-full border border-dashed border-ink-soft/40 bg-white/70 px-5 text-sm font-bold text-ink-soft ${className}`}
      >
        {t.documents.soon}
      </button>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn-primary inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-bold ${className}`}
    >
      {t.documents.view}
      <ExternalIcon className="size-4" />
      <span className="sr-only">{t.documents.newTab}</span>
    </a>
  );
}

export function useDocumentsText() {
  const { t } = useLanguage();
  return site.documentsUrl.trim() ? t.documents.textReady : t.documents.textPending;
}
