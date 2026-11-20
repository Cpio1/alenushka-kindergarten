import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Nunito } from "next/font/google";
import { kk } from "@/lib/i18n/kk";
import { LangProvider } from "@/lib/i18n";
import { LANG_COOKIE, parseLang } from "@/lib/i18n/config";
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

async function currentLang() {
  return parseLang((await cookies()).get(LANG_COOKIE)?.value);
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await currentLang();
  const d = lang === "kk" ? kk : ru;
  const other = lang === "kk" ? ru : kk;
  return {
    metadataBase: new URL(SITE_URL),
    title: d.meta.title,
    description: d.meta.description,
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
      title: d.meta.title,
      description: d.meta.description,
      siteName: lang === "kk" ? "«Алёнушка» бөбекжай-балабақшасы" : "Детский ясли-сад «Алёнушка»",
      locale: lang === "kk" ? "kk_KZ" : "ru_RU",
      alternateLocale: [lang === "kk" ? "ru_RU" : "kk_KZ"],
      type: "website",
      url: "/",
    },
    twitter: { card: "summary_large_image", title: d.meta.title, description: d.meta.description },
    robots: { index: true, follow: true },
    // Запрещаем Google Chrome автоматически переводить страницу: у сайта есть свои RU/KZ тексты.
    other: { google: "notranslate", [`description:${lang === "kk" ? "ru" : "kk"}`]: other.meta.description },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "only light",
  themeColor: "#fffdf9",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const lang = await currentLang();
  return (
    <html
      lang={lang}
      translate="no"
      className={`${nunito.variable} notranslate antialiased`}
      style={{ colorScheme: "only light" }}
      suppressHydrationWarning
    >
      <head>
        {/* Анимации появления включаются только при работающем JS */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body translate="no">
        <LangProvider initial={lang}>{children}</LangProvider>
      </body>
    </html>
  );
}
