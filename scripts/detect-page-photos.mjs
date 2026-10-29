/**
 * Находит фотографии разделов в public/images (или public/image) и записывает их пути и размеры
 * в lib/page-photos.generated.json. Если есть несколько файлов с одним именем, берётся PNG
 * (сохраняет прозрачность), затем WebP, AVIF, JPG.
 * Запускается автоматически перед `npm run dev` и `npm run build`.
 *
 *   main-page.*  — главный экран
 *   main-page2.* — раздел «Біз туралы / О нас»
 */
import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.dirname(path.dirname(new URL(import.meta.url).pathname));
const PHOTO_DIRS = ["images", "image"];
/** Порядок предпочтения форматов. */
const PHOTO_EXTENSIONS = [".png", ".webp", ".avif", ".jpg", ".jpeg"];
const PHOTOS = { main: "main-page", about: "main-page2" };

async function findPublicImage(baseName) {
  const candidates = [];
  for (const dir of PHOTO_DIRS) {
    let files;
    try {
      files = await readdir(path.join(root, "public", dir));
    } catch {
      continue;
    }
    for (const file of files) {
      const ext = path.extname(file);
      const rank = PHOTO_EXTENSIONS.indexOf(ext.toLowerCase());
      if (rank !== -1 && path.basename(file, ext).toLowerCase() === baseName) candidates.push({ dir, file, rank });
    }
  }
  candidates.sort((a, b) => a.rank - b.rank);

  for (const { dir, file } of candidates) {
    const meta = await sharp(path.join(root, "public", dir, file)).metadata();
    if (!meta.width || !meta.height) continue;
    // Переименованный JPG остаётся JPG (без прозрачности): такой файл пропускаем и берём следующий по списку.
    const ext = path.extname(file).slice(1).toLowerCase().replace("jpg", "jpeg");
    if (meta.format && meta.format !== ext) {
      console.warn(`[photos] ${file}: расширение .${ext}, но внутри формат ${meta.format} — файл пропущен. Пересохраните его в нужном формате.`);
      continue;
    }
    // EXIF-ориентация 5–8 означает поворот на 90°: ширина и высота меняются местами.
    const rotated = (meta.orientation ?? 1) >= 5;
    return {
      src: `/${dir}/${encodeURIComponent(file)}`,
      width: rotated ? meta.height : meta.width,
      height: rotated ? meta.width : meta.height,
    };
  }
  return null;
}

const result = {};
for (const [key, baseName] of Object.entries(PHOTOS)) {
  result[key] = await findPublicImage(baseName);
  console.log(`[photos] ${baseName}: ${result[key] ? `${result[key].src} ${result[key].width}×${result[key].height}` : "не найдено"}`);
}
await writeFile(path.join(root, "lib", "page-photos.generated.json"), JSON.stringify(result, null, 2) + "\n");
