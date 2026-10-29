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

/** Файл изображения без подписи — подпись берётся из переводов. */
export type ImageFile = Omit<Photo, "alt">;

/**
 * Фотографии разделов. Находятся автоматически перед сборкой (scripts/detect-page-photos.mjs):
 * main  — public/images/main-page.* (главный экран),
 * about — public/images/main-page2.* (раздел «Біз туралы / О нас»).
 * Подходят .jpg, .jpeg, .png, .webp, .avif; также ищется папка public/image.
 */
export type PagePhotos = {
  main: ImageFile | null;
  about: ImageFile | null;
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
  /** Карточка объекта в 2ГИС и данные для официального виджета (widgets.2gis.com). */
  twoGis: {
    url: "https://2gis.kz/almaty/geo/70000001024316818/77.031636,43.439782",
    orgId: "70000001024316818",
    city: "almaty",
    lat: 43.439782,
    lon: 77.031636,
    zoom: 16,
  },
  /** Строка для поиска адреса в Google Maps. */
  mapQuery: "Казахстан, Алматинская область, Талгарский район, село Еркін, улица Маметова, 14",
  phone: {
    display: "+7 (771) 456-00-59",
    href: "tel:+77714560059",
  },
  /** WhatsApp на тот же номер, что и телефон. */
  whatsapp: {
    display: "+7 (771) 456-00-59",
    url: "https://wa.me/77714560059",
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
   * Описания групп. Если список заполнен, он выводится в разделе «Топтар және тамақтану / Группы и питание» под карточками.
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
  twoGis: site.twoGis.url,
  /**
   * Адрес iframe официального виджета 2ГИС «Фирмы на карте» — так же его собирает
   * загрузчик https://widgets.2gis.com/js/DGWidgetLoader.js. Ключ не требуется.
   */
  twoGisWidget: `https://widgets.2gis.com/widget?type=firmsonmap&options=${encodeURIComponent(
    JSON.stringify({
      pos: { lat: site.twoGis.lat, lon: site.twoGis.lon, zoom: site.twoGis.zoom },
      opt: { city: site.twoGis.city },
      org: site.twoGis.orgId,
    }),
  )}`,
};

export const sectionIds = [
  "home",
  "about",
  "life",
  "gallery",
  "documents",
  "contacts",
] as const;

export type SectionId = (typeof sectionIds)[number];
