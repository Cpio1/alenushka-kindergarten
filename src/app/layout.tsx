import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import { kk } from "@/lib/i18n/kk";
import { ru } from "@/lib/i18n/ru";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

// cyrillic-ext обязателен для казахских букв Ә Ғ Қ Ң Ө Ұ Ү Һ І
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: kk.meta.title,
  description: kk.meta.description,
  applicationName: "Алёнушка",
  keywords: [
    "Алёнушка",
    "детский сад Алёнушка",
    "ясли-сад Өрікті",
    "детский сад Орикти",
    "детский сад Енбекшиказахский район",
    "балабақша Өрікті",
    "Алёнушка балабақшасы",
    "бөбекжай-балабақша",
  ],
  formatDetection: { telephone: false, address: false, email: false },
  alternates: { canonical: "/" },
  openGraph: {
    title: kk.meta.title,
    description: kk.meta.description,
    siteName: "«Алёнушка» бөбекжай-балабақшасы",
    locale: "kk_KZ",
    alternateLocale: ["ru_RU"],
    type: "website",
    url: "/",
  },
  twitter: { card: "summary_large_image", title: kk.meta.title, description: kk.meta.description },
  robots: { index: true, follow: true },
  other: { "description:ru": ru.meta.description },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "only light",
  themeColor: "#fffdf9",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="kk"
      className={`${nunito.variable} antialiased`}
      style={{ colorScheme: "only light" }}
      suppressHydrationWarning
    >
      <head>
        {/* Анимации появления включаются только при работающем JS; язык выставляется до отрисовки */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');try{if(localStorage.getItem('alenushka-lang')==='ru')document.documentElement.lang='ru'}catch(e){}",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
