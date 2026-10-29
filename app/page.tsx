import { MobileWebsite } from "@/components/mobile-website";
import { DesktopWebsite } from "@/components/website";

/**
 * Обе компоновки рендерятся по одному адресу; видимую выбирает CSS (брейкпоинт lg = 1024 px),
 * поэтому нет определения устройства и расхождений при гидратации.
 */
export default function Home() {
  return (
    <>
      <div className="hidden lg:block">
        <DesktopWebsite />
      </div>
      <div className="lg:hidden">
        <MobileWebsite />
      </div>
    </>
  );
}
