"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * Текущий год. На сервере (при статической сборке) значение может устареть,
 * поэтому после загрузки год берётся из часов браузера.
 */
export function CurrentYear() {
  const year = useSyncExternalStore(
    noopSubscribe,
    () => new Date().getFullYear(),
    () => null,
  );
  return <span>{year ?? ""}</span>;
}
