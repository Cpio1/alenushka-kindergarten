"use client";

import { MessageCircle } from "lucide-react";
import { useT } from "@/lib/i18n";
import { site, waHref } from "@/lib/site";
import { Ball, Cloud, Star } from "../decor/Doodles";
import { BabyCamel, Baiterek, LittleStars, QuestionBook, TeddyBear } from "../decor/Illustrations";
import { SectionHeading } from "../ui/SectionHeading";

type GroupKey = "bobek" | "botakan" | "pochemuchki" | "baiterek" | "zvezdochki";

/** Названия групп одинаковы на обоих языках. */
const GROUPS: {
  key: GroupKey;
  name: string;
  Art: (p: { className?: string }) => React.ReactNode;
  blob: string;
  shape: string;
  age: string;
  ring: string;
  place: string;
}[] = [
  {
    key: "bobek",
    name: "Бөбек",
    Art: TeddyBear,
    blob: "bg-pink",
    shape: "rounded-[46%_54%_42%_58%/55%_45%_55%_45%]",
    age: "bg-pink-soft text-pink-deep",
    ring: "hover:ring-pink",
    place: "md:col-span-2 lg:col-span-1",
  },
  {
    key: "botakan",
    name: "Ботақан",
    Art: BabyCamel,
    blob: "bg-sun",
    shape: "rounded-[38%_62%_55%_45%/48%_40%_60%_52%]",
    age: "bg-sun-soft text-sun-deep",
    ring: "hover:ring-sun",
    place: "md:col-span-2 lg:col-span-1",
  },
  {
    key: "pochemuchki",
    name: "Почемучки",
    Art: QuestionBook,
    blob: "bg-sky",
    shape: "rounded-[30px_50px_30px_50px]",
    age: "bg-sky-soft text-sky-deep",
    ring: "hover:ring-sky",
    place: "min-[480px]:max-md:col-span-2 md:col-span-2 lg:col-span-1",
  },
  {
    key: "baiterek",
    name: "Бәйтерек",
    Art: Baiterek,
    blob: "bg-mint",
    shape: "rounded-[50%_50%_40%_40%/60%_60%_40%_40%]",
    age: "bg-mint-soft text-mint-deep",
    ring: "hover:ring-mint",
    place: "md:col-span-2 md:col-start-2 lg:col-span-1 lg:col-start-auto",
  },
  {
    key: "zvezdochki",
    name: "Звёздочки",
    Art: LittleStars,
    blob: "bg-lavender",
    shape: "rounded-[55%_45%_50%_50%/45%_55%_45%_55%]",
    age: "bg-lavender-soft text-lavender-deep",
    ring: "hover:ring-lavender",
    place: "md:col-span-2 lg:col-span-1",
  },
];

export function Groups() {
  const t = useT();
  const g = t.groups;

  return (
    <section
      id="groups"
      data-section
      aria-labelledby="groups-title"
      className="section-y relative isolate bg-lavender-soft"
      style={{
        backgroundImage: "radial-gradient(rgb(106 76 199 / 0.07) 1.5px, transparent 1.5px)",
        backgroundSize: "22px 22px",
      }}
    >
      <Cloud className="decor -z-10 left-[-24px] top-8 w-24 animate-drift lg:left-[4%] lg:w-28" />
      <Star className="decor -z-10 right-5 top-10 w-7 lg:right-[6%]" />
      <Ball className="decor -z-10 bottom-8 right-4 hidden w-10 sm:block lg:right-[4%]" />

      <div className="container-x">
        <SectionHeading id="groups-title" eyebrow={g.eyebrow} title={g.title} lead={g.lead} tone="lavender" />

        <ul className="mx-auto grid max-w-[1040px] grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:gap-4 md:grid-cols-6 lg:max-w-none lg:grid-cols-5 lg:gap-3 xl:gap-4">
          {GROUPS.map(({ key, name, Art, blob, shape, age, ring, place }, i) => {
            const item = g.items[key];
            return (
              <li
                key={key}
                className={`reveal group flex min-w-0 items-center gap-3.5 rounded-[24px] bg-white p-3.5 shadow-soft ring-2 ring-transparent transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift min-[480px]:flex-col min-[480px]:gap-3 min-[480px]:p-4 min-[480px]:text-center lg:px-2.5 lg:py-4 xl:px-3.5 ${ring} ${place}`}
                style={{ "--d": `${i * 70}ms` } as React.CSSProperties}
              >
                <div className={`relative grid size-20 shrink-0 place-items-center sm:size-24 ${blob} ${shape}`}>
                  <Art className="size-[82%] transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-[1.04]" />
                </div>
                <div className="min-w-0 flex-1 min-[480px]:flex min-[480px]:w-full min-[480px]:flex-col min-[480px]:items-center">
                  <h3 className="font-display text-[clamp(1.15rem,1.05rem+0.35vw,1.35rem)] font-extrabold leading-tight text-ink [overflow-wrap:anywhere]">{name}</h3>
                  <p className="mt-0.5 text-[14px] font-semibold leading-snug text-ink-soft [overflow-wrap:anywhere] lg:text-[13.5px] xl:text-[14px]">{item.type}</p>
                  <span className={`mt-2 inline-flex max-w-full flex-wrap items-center justify-center gap-x-1.5 rounded-full px-2.5 py-1 text-[13px] font-bold leading-tight ${age}`}>
                    {!item.age.startsWith(item.badge) && (
                      <>
                        <span className="font-display font-extrabold">{item.badge}</span>
                        <span aria-hidden className="opacity-50">·</span>
                      </>
                    )}
                    <span>{item.age}</span>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="reveal mt-7 flex justify-center lg:mt-8">
          <a
            href={waHref(site.phones[0].wa, t.wa.message)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-[15.5px] font-extrabold text-lavender-deep shadow-soft ring-2 ring-lavender transition hover:-translate-y-0.5 hover:shadow-lift"
          >
            <MessageCircle className="size-[18px]" aria-hidden />
            {g.ask}
          </a>
        </div>
      </div>
    </section>
  );
}
