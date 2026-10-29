/**
 * Единый источник фактических данных о детском саде.
 * Обе версии сайта (компьютер и телефон) читают данные только отсюда.
 */

export type Locale = "kk" | "ru";

export type Localized = Record<Locale, string>;

export type Photo = {
  /** Путь от папки public, например "/gallery/01.jpg". */
  src: string;
  /** Реальные размеры исходного файла в пикселях — нужны против скачков вёрстки. */
  width: number;
  height: number;
  alt: Localized;
};

export type GroupInfo = {
  name: Localized;
  description?: Localized;
};

export const site = {
  name: {
    kk: "«Күншуақ» бөбекжай-бақшасы",
    ru: "Ясли-сад «Күншуақ»",
  },
  shortName: "Күншуақ",
  /** Логотип сада: public/images/logo.jpeg, реальные размеры файла. */
  logo: { src: "/images/logo.jpeg", width: 1254, height: 1254 },
  address: {
    kk: "Алматы облысы, Талғар ауданы, Еркін ауылы, Маметова көшесі, 14",
    ru: "Алматинская область, Талгарский район, село Еркін, улица Маметова, 14",
  },
  /** Строка для поиска на карте. Точные координаты не установлены. */
  mapQuery: "Казахстан, Алматинская область, Талгарский район, село Еркін, улица Маметова, 14",
  phone: {
    display: "+7 (727) 305-46-22",
    href: "tel:+77273054622",
  },
  instagram: {
    handle: "@kunshuak_erkin",
    url: "https://www.instagram.com/kunshuak_erkin/",
  },
  hours: "07:30–18:00",
  groupsCount: 8,

  /**
   * Ссылка на документы. Пока строка пустая, на сайте показывается
   * неактивная кнопка «Жақында / Скоро». Вставьте сюда полный URL
   * (например, ссылку на Google Drive) — кнопка станет активной.
   */
  documentsUrl: "",

  /**
   * Главная фотография для первого экрана. Пока null — показывается
   * декоративная композиция с солнцем и облаками.
   * Пример: { src: "/images/hero.jpg", width: 1600, height: 1200, alt: { kk: "...", ru: "..." } }
   */
  heroPhoto: null as Photo | null,

  /**
   * Описания групп. Пока список пуст, показывается общий блок «8 топ / 8 групп».
   * Пример элемента: { name: { kk: "Балапан", ru: "Балапан" }, description: { kk: "...", ru: "..." } }
   */
  groups: [] as GroupInfo[],

  /**
   * Фотографии галереи. Положите файлы в public/gallery и добавьте
   * сюда по записи на каждый файл, указав реальные размеры.
   * Пример: { src: "/gallery/01.jpg", width: 1200, height: 900, alt: { kk: "...", ru: "..." } }
   */
  gallery: [] as Photo[],
};

export const mapLinks = {
  google: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`,
  twoGis: `https://2gis.kz/search/${encodeURIComponent(site.mapQuery)}`,
};

export const sectionIds = [
  "home",
  "about",
  "groups",
  "food",
  "gallery",
  "documents",
  "contacts",
] as const;

export type SectionId = (typeof sectionIds)[number];
