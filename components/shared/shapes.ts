/** Формы из app/globals.css, которые чередуются в сетках карточек. */
const iconShapeList = ["rounded-full", "icon-blob", "icon-petal", "icon-leaf"] as const;

/** Подложка иконки по номеру карточки: круг → клякса → лепесток → листик. */
export const iconShape = (index: number) => iconShapeList[index % iconShapeList.length];

/** Зеркальные «лепестки» по очереди, чтобы соседние карточки не были одинаковыми прямоугольниками. */
export const cardShape = (index: number) => (index % 2 === 0 ? "shape-petal" : "shape-leaf");

/** Скругления миниатюр галереи: мягкий прямоугольник, лепесток и листик по кругу. */
const galleryShapeList = [
  "rounded-[14px] lg:rounded-[22px]",
  "shape-petal [--shape-big:20px] [--shape-small:6px] lg:[--shape-big:30px] lg:[--shape-small:8px]",
  "shape-leaf [--shape-big:20px] [--shape-small:6px] lg:[--shape-big:30px] lg:[--shape-small:8px]",
] as const;

export const galleryShape = (index: number) => galleryShapeList[index % galleryShapeList.length];
