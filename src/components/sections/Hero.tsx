"use client";

import Image from "next/image";
import { ArrowDown, Clock3 } from "lucide-react";
import { useT } from "@/lib/i18n";
import { heroPhoto } from "@/lib/media";
import { site, waHref } from "@/lib/site";
import { Cloud, Flower, Sparkle, Star, Wave } from "../decor/Doodles";
import { HeroSceneDesktop, HeroSceneMobile } from "../decor/HeroScene";
import { scrollToSection } from "../Header";
import { WhatsAppIcon } from "../ui/BrandIcons";

const FACT_STYLES = [
  "bg-pink text-pink-deep",
  "bg-sun text-sun-deep",
  "bg-mint text-mint-deep",
  "bg-lavender text-lavender-deep",
];

export function Hero() {
  const t = useT();
  const h = t.hero;

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate bg-gradient-to-b from-sky-soft via-paper to-pink-soft pt-[var(--header-h)]"
    >
      {/* фоновые фигурки */}
      <Cloud className="decor -z-10 left-[2%] top-[calc(var(--header-h)+10px)] hidden w-28 animate-drift opacity-90 xl:block" />
      <Cloud className="decor -z-10 right-[38%] top-[calc(var(--header-h)+6px)] hidden w-24 animate-drift-slow lg:block" />
      <Sparkle className="decor -z-10 right-4 top-[calc(var(--header-h)+8px)] w-4 lg:hidden" fill="#ff846f" />
      <Star className="decor -z-10 bottom-8 right-[6%] hidden w-6 lg:block" />
      <Flower className="decor -z-10 bottom-6 left-[2%] hidden w-9 opacity-80 xl:block" petal="#dccbff" />

      <div className="container-x grid items-center gap-6 pb-12 pt-7 sm:pt-10 lg:min-h-[min(calc(100svh-var(--header-h)),780px)] lg:grid-cols-[1.12fr_0.88fr] lg:gap-10 lg:py-10 xl:gap-14">
        {/* На телефоне — своя последовательность: кнопки сразу под текстом, затем картинка и факты */}
        <div className="relative flex max-w-[640px] flex-col">
          <p className="reveal order-1 inline-flex items-center gap-2 self-start rounded-full bg-white/85 px-3.5 py-1.5 text-[13px] font-extrabold text-coral-deep shadow-soft ring-1 ring-pink">
            <span className="size-2 rounded-full bg-coral" aria-hidden />
            {h.badge}
          </p>

          <h1
            id="hero-title"
            className="reveal order-2 mt-4 text-[clamp(1.9rem,1.3rem+2.6vw,3.15rem)] font-black leading-[1.08] tracking-[-0.02em] text-ink"
            style={{ "--d": "60ms" } as React.CSSProperties}
          >
            <span className="relative inline-block text-coral-deep">
              {h.titleBefore}
              <svg aria-hidden viewBox="0 0 200 12" preserveAspectRatio="none" className="absolute -bottom-1 left-0 h-2.5 w-full">
                <path d="M3 8c40-6 90-7 194-2" stroke="#ffe47a" strokeWidth="6" strokeLinecap="round" fill="none" />
              </svg>
            </span>{" "}
            {h.titleAfter}
          </h1>

          <p
            className="reveal order-3 mt-3 max-w-[30rem] sm:mt-4 text-[clamp(1.02rem,0.95rem+0.4vw,1.25rem)] font-semibold text-ink-soft"
            style={{ "--d": "120ms" } as React.CSSProperties}
          >
            {h.subtitle}
          </p>

          {/* Компактная иллюстрация для телефона */}
          <div className="reveal order-5 mt-6 lg:hidden" style={{ "--d": "150ms" } as React.CSSProperties}>
            {heroPhoto ? <HeroPhoto alt={h.photoAlt} mobile /> : <HeroSceneMobile />}
          </div>

          <ul className="order-6 mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:order-4 lg:mt-7 lg:max-w-[600px] lg:gap-3">
            {h.facts.map((f, i) => (
              <li
                key={f.label}
                className="reveal flex min-w-0 flex-col rounded-2xl bg-white/90 px-3 py-2.5 shadow-soft ring-1 ring-line/70 sm:px-3.5 sm:py-3"
                style={{ "--d": `${180 + i * 60}ms` } as React.CSSProperties}
              >
                <span className={`self-start rounded-lg px-2 py-0.5 font-display text-[15px] font-extrabold ${FACT_STYLES[i]}`}>
                  {f.value}
                </span>
                <span className="mt-1.5 text-[13.5px] font-bold leading-snug text-ink">{f.label}</span>
              </li>
            ))}
          </ul>

          <div
            className="reveal order-4 mt-5 flex flex-col gap-2.5 min-[400px]:flex-row min-[400px]:flex-wrap sm:gap-3 lg:order-5 lg:mt-8"
            style={{ "--d": "420ms" } as React.CSSProperties}
          >
            <a
              href={waHref(site.phones[0].wa, t.wa.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-wa px-6 text-[16px] font-extrabold text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
            >
              <WhatsAppIcon className="size-5" />
              {h.ctaPrimary}
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("about");
              }}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-[16px] font-extrabold text-ink shadow-soft ring-2 ring-lavender transition hover:-translate-y-0.5 hover:ring-lavender-deep/40"
            >
              {h.ctaSecondary}
              <ArrowDown className="size-[18px]" aria-hidden />
            </a>
          </div>

          <p className="reveal order-7 mt-5 flex items-center gap-2 text-[14px] font-semibold text-ink-soft" style={{ "--d": "480ms" } as React.CSSProperties}>
            <Clock3 className="size-4 text-mint-deep" aria-hidden />
            {h.hours}
          </p>
        </div>

        {/* Десктопная композиция */}
        <div className="reveal hidden lg:block" style={{ "--d": "200ms" } as React.CSSProperties}>
          {heroPhoto ? <HeroPhoto alt={h.photoAlt} /> : <HeroSceneDesktop />}
          <span className="sr-only">{h.sceneAlt}</span>
        </div>
      </div>

      <Wave fill="#fff8ef" className="block h-6 w-full sm:h-8 lg:h-10" />
    </section>
  );
}

/** Настоящая фотография сада (если добавлена) в мягкой рамке; пропорции фото сохраняются. */
function HeroPhoto({ alt, mobile = false }: { alt: string; mobile?: boolean }) {
  if (!heroPhoto) return null;
  const portrait = heroPhoto.height > heroPhoto.width;
  return (
    <div className={`relative mx-auto w-fit max-w-full ${mobile ? "" : portrait ? "lg:max-w-[420px]" : "lg:max-w-[560px]"}`}>
      <div className="absolute -inset-2 -z-10 rotate-[-2.5deg] rounded-[34px] bg-gradient-to-br from-sun via-pink to-lavender" />
      <div className="mx-auto w-fit max-w-full overflow-hidden rounded-[28px] bg-white p-1.5 shadow-lift">
        {/* Пропорции фото сохраняются: ограничиваем высоту, ширина подстраивается — без обрезки */}
        <Image
          src={heroPhoto.src}
          alt={alt}
          width={heroPhoto.width}
          height={heroPhoto.height}
          priority
          sizes="(min-width: 1024px) 560px, 92vw"
          className={`block h-auto w-auto max-w-full rounded-[22px] ${mobile ? "max-h-[min(34svh,240px)]" : "max-h-[min(calc(100svh-var(--header-h)-120px),560px)]"}`}
        />
      </div>
      <Star className="absolute -right-3 -top-3 w-9 drop-shadow-sm" />
      <Flower className="absolute -bottom-4 -left-4 w-11" />
    </div>
  );
}
