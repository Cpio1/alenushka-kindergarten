"use client";

import { Info } from "lucide-react";
import { useT } from "@/lib/i18n";
import { Apple, Pear, Sparkle } from "../decor/Doodles";
import { BreakfastArt, LunchArt, SnackArt, VitaminArt } from "../decor/Illustrations";
import { SectionHeading } from "../ui/SectionHeading";

const MEALS = [
  { Art: BreakfastArt, card: "bg-sun-soft", art: "bg-sun", num: "text-sun-deep", tilt: "lg:-rotate-[1.2deg]" },
  { Art: VitaminArt, card: "bg-pink-soft", art: "bg-pink", num: "text-pink-deep", tilt: "lg:rotate-[0.8deg] lg:translate-y-3" },
  { Art: LunchArt, card: "bg-mint-soft", art: "bg-mint", num: "text-mint-deep", tilt: "lg:-rotate-[0.6deg]" },
  { Art: SnackArt, card: "bg-lavender-soft", art: "bg-lavender", num: "text-lavender-deep", tilt: "lg:rotate-[1.2deg] lg:translate-y-3" },
];

export function Food() {
  const t = useT();
  const f = t.food;

  return (
    <section id="food" data-section aria-labelledby="food-title" className="section-y relative isolate bg-paper">
      <Apple className="decor -z-10 left-3 top-2 w-8 rotate-[-12deg] lg:left-[5%] lg:top-10 lg:w-11" />
      <Pear className="decor -z-10 right-3 top-2 w-7 rotate-[10deg] lg:right-[6%] lg:top-14 lg:w-10" />
      <Sparkle className="decor -z-10 bottom-4 left-[4%] hidden w-5 lg:block" fill="#ffe47a" />

      <div className="container-x">
        <SectionHeading id="food-title" eyebrow={f.eyebrow} title={f.title} lead={f.lead} tone="sun" />

        <ol className="mx-auto grid max-w-[1040px] grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5 lg:pb-3">
          {f.meals.map((meal, i) => {
            const { Art, card, art, num, tilt } = MEALS[i];
            return (
              <li
                key={meal}
                className={`reveal ${tilt}`}
                style={{ "--d": `${i * 80}ms` } as React.CSSProperties}
              >
                <div className={`group flex h-full flex-col rounded-[24px] p-3 shadow-soft ring-1 ring-line transition-transform duration-300 hover:-translate-y-1 sm:p-4 ${card}`}>
                  <div className={`grid aspect-[4/3] place-items-center rounded-[18px] ${art}`}>
                    <Art className="w-[78%] max-w-[170px] transition-transform duration-500 group-hover:scale-[1.04]" />
                  </div>
                  <div className="flex items-baseline justify-between gap-2 px-1 pt-3">
                    <h3 className="min-w-0 font-display text-[clamp(1.02rem,0.95rem+0.4vw,1.25rem)] font-extrabold leading-tight text-ink">
                      {meal}
                    </h3>
                    <span className={`shrink-0 font-display text-[22px] font-extrabold leading-none ${num}`} aria-hidden>
                      {i + 1}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <p className="reveal mx-auto mt-7 flex max-w-xl items-start justify-center gap-2 text-center text-[14.5px] text-ink-soft">
          <Info className="mt-0.5 size-4 shrink-0 text-sun-deep" aria-hidden />
          {f.ask}
        </p>
      </div>
    </section>
  );
}
