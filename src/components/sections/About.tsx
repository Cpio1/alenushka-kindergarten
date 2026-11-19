"use client";

import Image from "next/image";
import { Baby, Clock3, Languages, Layers3, Utensils, type LucideIcon } from "lucide-react";
import { useT } from "@/lib/i18n";
import { aboutPhoto, aboutVideo } from "@/lib/media";
import { Butterfly, Heart, Sparkle, Sun, Tulip } from "../decor/Doodles";
import { SectionHeading } from "../ui/SectionHeading";

const FEATURES: { icon: LucideIcon; card: string; chip: string }[] = [
  { icon: Languages, card: "bg-sky-soft ring-sky", chip: "bg-sky text-sky-deep rounded-[14px_18px_14px_18px]" },
  { icon: Layers3, card: "bg-lavender-soft ring-lavender", chip: "bg-lavender text-lavender-deep rounded-full" },
  { icon: Utensils, card: "bg-sun-soft ring-sun", chip: "bg-sun text-sun-deep rounded-[18px_10px_18px_10px]" },
  { icon: Clock3, card: "bg-mint-soft ring-mint", chip: "bg-mint text-mint-deep rounded-[45%_55%_50%_50%]" },
  { icon: Baby, card: "bg-pink-soft ring-pink", chip: "bg-pink text-pink-deep rounded-[12px]" },
];

export function About() {
  const t = useT();
  const a = t.about;
  const photo = aboutPhoto;
  const video = photo ? null : aboutVideo;

  return (
    <section id="about" data-section aria-labelledby="about-title" className="section-y relative isolate bg-cream">
      <Sun className="decor -z-10 right-3 top-6 w-12 opacity-90 sm:right-[4%] lg:top-10 lg:w-16" />
      <Butterfly className="decor -z-10 bottom-10 left-3 hidden w-12 animate-bob sm:block lg:left-[3%]" />
      <Sparkle className="decor -z-10 left-[8%] top-16 w-5" fill="#ffd9e5" />

      <div className="container-x">
        <div className="grid items-start gap-7 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
          <div>
            <SectionHeading id="about-title" eyebrow={a.eyebrow} title={a.title} tone="pink" align="split" />
            <div className="reveal -mt-2 space-y-3 text-[clamp(1rem,0.96rem+0.2vw,1.1rem)] leading-relaxed text-ink lg:-mt-4">
              <p>{a.lead}</p>
              <p className="text-ink-soft">{a.text}</p>
            </div>
          </div>

          {/* Фото учреждения или аккуратное место под него */}
          <div className={`reveal relative mx-auto lg:mt-2 ${photo || video ? "w-fit max-w-[calc(100%-16px)] lg:max-w-[460px]" : "w-[calc(100%-16px)] max-w-[460px]"}`} style={{ "--d": "120ms" } as React.CSSProperties}>
            <div className="absolute -inset-2 -z-10 rotate-[1.5deg] rounded-[34px] bg-gradient-to-br from-mint via-sky to-lavender opacity-80" />
            {video ? (
              <div className="overflow-hidden rounded-[28px] bg-white p-1.5 shadow-lift">
                <video
                  src={video.src}
                  poster={video.poster ?? undefined}
                  controls
                  playsInline
                  muted
                  preload="metadata"
                  aria-label={a.photoAlt}
                  className="block h-auto max-h-[min(48svh,400px)] w-full rounded-[22px] bg-cream object-contain"
                />
              </div>
            ) : photo ? (
              <div className="w-fit max-w-full overflow-hidden rounded-[28px] bg-white p-1.5 shadow-lift">
                <Image
                  src={photo.src}
                  alt={a.photoAlt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(min-width: 1024px) 460px, 92vw"
                  className="block h-auto max-h-[min(48svh,400px)] w-auto max-w-full rounded-[22px]"
                />
              </div>
            ) : (
              <div className="relative flex aspect-[4/3] lg:aspect-[16/11] flex-col items-center justify-center gap-3 rounded-[28px] border-2 border-dashed border-lavender bg-white/90 p-6 text-center shadow-soft">
                <div className="flex items-end gap-1.5" aria-hidden>
                  <Tulip className="h-12" color="#ff846f" />
                  <Heart className="mb-2 w-9" />
                  <Tulip className="h-10" color="#dccbff" />
                </div>
                <p className="max-w-[16rem] text-[15px] font-bold text-ink-soft">{a.photoPlaceholder}</p>
              </div>
            )}
          </div>
        </div>

        {/* Преимущества: на телефоне — горизонтальные плашки, на десктопе — ряд из пяти */}
        <ul className="mt-8 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 md:grid-cols-3 lg:mt-10 lg:grid-cols-5 lg:gap-4">
          {a.features.map((f, i) => {
            const { icon: Icon, card, chip } = FEATURES[i];
            return (
              <li
                key={f.title}
                className={`reveal flex items-start gap-3 rounded-[20px] p-3.5 ring-1 transition-transform duration-300 hover:-translate-y-0.5 lg:flex-col lg:gap-2.5 lg:p-4 ${card} ${
                  i === 4 ? "min-[420px]:max-md:col-span-2" : ""
                } ${i === 3 ? "md:max-lg:col-start-1" : ""}`}
                style={{ "--d": `${i * 60}ms` } as React.CSSProperties}
              >
                <span className={`grid size-11 shrink-0 place-items-center ${chip}`}>
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-[15.5px] font-extrabold leading-snug text-ink">{f.title}</span>
                  <span className="mt-0.5 block text-[13.5px] leading-snug text-ink-soft">{f.text}</span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
