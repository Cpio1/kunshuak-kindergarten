import type { Metadata, Viewport } from "next";
import { Nunito, Onest } from "next/font/google";
import { LanguageProvider } from "@/components/shared/language-provider";
import "./globals.css";

// Оба шрифта содержат кириллицу с расширением: Ә, Ғ, Қ, Ң, Ө, Ұ, Ү, Һ, І.
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["cyrillic", "cyrillic-ext", "latin"],
  weight: ["700", "800", "900"],
  display: "swap",
});

const onest = Onest({
  variable: "--font-onest",
  subsets: ["cyrillic", "cyrillic-ext", "latin"],
  display: "swap",
});

const title = "«Күншуақ» бөбекжай-бақшасы — Еркін ауылы | Ясли-сад «Күншуақ», село Еркін";
const description =
  "Еркін ауылындағы 2–6 жастағы балаларға арналған «Күншуақ» бөбекжай-бақшасы, оқыту тілі — қазақ тілі. Ясли-сад «Күншуақ» в селе Еркін (Талгарский район) для детей от 2 до 6 лет, обучение на казахском языке.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "kk_KZ",
    alternateLocale: ["ru_RU"],
  },
};

export const viewport: Viewport = {
  themeColor: "#fffbf2",
  colorScheme: "only light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="kk" className={`${nunito.variable} ${onest.variable} antialiased`}>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
