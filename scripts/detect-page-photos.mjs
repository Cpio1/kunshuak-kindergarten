/**
 * Находит фотографии разделов в public/images (или public/image) с любым расширением
 * и записывает их пути и размеры в lib/page-photos.generated.json.
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
const PHOTO_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const PHOTOS = { main: "main-page", about: "main-page2" };

async function findPublicImage(baseName) {
  for (const dir of PHOTO_DIRS) {
    const absoluteDir = path.join(root, "public", dir);
    let files;
    try {
      files = await readdir(absoluteDir);
    } catch {
      continue;
    }
    const file = files.find((name) => {
      const ext = path.extname(name);
      return PHOTO_EXTENSIONS.has(ext.toLowerCase()) && path.basename(name, ext).toLowerCase() === baseName;
    });
    if (!file) continue;

    const meta = await sharp(path.join(absoluteDir, file)).metadata();
    if (!meta.width || !meta.height) continue;
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
