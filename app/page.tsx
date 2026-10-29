import { MobileWebsite } from "@/components/mobile-website";
import { DesktopWebsite } from "@/components/website";
import pagePhotos from "@/lib/page-photos.generated.json";
import type { PagePhotos } from "@/lib/site-data";

// Файл создаёт scripts/detect-page-photos.mjs перед каждой сборкой (main-page.* и main-page2.*).
const photos: PagePhotos = pagePhotos;

/**
 * Обе компоновки рендерятся по одному адресу; видимую выбирает CSS (брейкпоинт lg = 1024 px),
 * поэтому нет определения устройства и расхождений при гидратации.
 */
export default function Home() {
  return (
    <>
      <div className="hidden lg:block">
        <DesktopWebsite photos={photos} />
      </div>
      <div className="lg:hidden">
        <MobileWebsite photos={photos} />
      </div>
    </>
  );
}
