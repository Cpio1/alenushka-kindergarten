"use client";

import { Clock3, MapPin, Navigation, Phone } from "lucide-react";
import { useT } from "@/lib/i18n";
import { routeHref, site, telHref, twoGisEmbed, twoGisHref, waHref } from "@/lib/site";
import { Heart, Tulip } from "../decor/Doodles";
import { InstagramIcon, WhatsAppIcon } from "../ui/BrandIcons";
import { SectionHeading } from "../ui/SectionHeading";

export function Contacts() {
  const t = useT();
  const c = t.contacts;
  const embed = twoGisEmbed();

  return (
    <section id="contacts" data-section aria-labelledby="contacts-title" className="section-y relative isolate bg-pink-soft">
      <Heart className="decor -z-10 right-3 top-3 w-6 lg:right-[7%] lg:top-10 lg:w-7" fill="#ff846f" />
      <Tulip className="decor -z-10 left-3 top-2 h-9 lg:left-[5%] lg:top-12 lg:h-12" color="#dccbff" />

      <div className="container-x">
        <SectionHeading id="contacts-title" eyebrow={c.eyebrow} title={c.title} lead={c.lead} tone="coral" />

        <div className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-6">
          <div className="grid min-w-0 grid-cols-[minmax(0,1fr)] content-start gap-3 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-4">
            {/* адрес */}
            <Card className="sm:col-span-2" icon={<MapPin className="size-5" aria-hidden />} chip="bg-coral-soft text-coral-deep" title={c.address}>
              <address className="not-italic text-[15.5px] font-bold leading-snug text-ink">{c.addressValue}</address>
            </Card>

            {/* телефоны */}
            <Card className="sm:col-span-2" icon={<Phone className="size-5" aria-hidden />} chip="bg-sun text-sun-deep" title={c.phones}>
              <ul className="mt-0.5 grid gap-2.5">
                {site.phones.map((p) => (
                  <li key={p.e164} className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
                    <a href={telHref(p.e164)} className="text-[17px] font-extrabold tabular-nums text-ink hover:text-coral-deep">
                      {p.display}
                    </a>
                    <span className="flex flex-wrap gap-2">
                      <a
                        href={telHref(p.e164)}
                        aria-label={`${c.call}: ${p.display}`}
                        title={c.call}
                        className="grid size-10 place-items-center rounded-full bg-white text-ink ring-2 ring-sun transition hover:bg-sun-soft"
                      >
                        <Phone className="size-4" aria-hidden />
                      </a>
                      <a
                        href={waHref(p.wa, t.wa.message)}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`WhatsApp ${p.display}`}
                        className="inline-flex min-h-10 items-center gap-1.5 rounded-full bg-wa px-3.5 text-[13.5px] font-extrabold text-white"
                      >
                        <WhatsAppIcon className="size-4" />
                        WhatsApp
                      </a>
                    </span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card icon={<Clock3 className="size-5" aria-hidden />} chip="bg-mint text-mint-deep" title={c.hours}>
              <p className="whitespace-nowrap font-display text-[19px] font-extrabold tabular-nums text-ink">{site.hours}</p>
            </Card>

            <Card icon={<InstagramIcon className="size-5" />} chip="bg-lavender text-lavender-deep" title={c.instagram}>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] font-extrabold [overflow-wrap:anywhere] text-lavender-deep underline decoration-lavender decoration-2 underline-offset-4 hover:decoration-lavender-deep"
              >
                {site.instagram.handle}
              </a>
            </Card>
          </div>

          {/* карта */}
          <div className="reveal flex flex-col overflow-hidden rounded-[26px] bg-white shadow-soft ring-1 ring-line">
            {embed ? (
              <iframe
                src={embed}
                title={c.mapTitle}
                loading="lazy"
                className="h-[clamp(260px,40vw,340px)] w-full border-0"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <a
                href={twoGisHref()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${c.map2gis}: ${c.addressValue}`}
                className="group relative block h-[clamp(200px,34vw,280px)] overflow-hidden bg-[#eef6ec] lg:h-auto lg:min-h-[220px] lg:flex-1"
              >
                <MapArt />
                <span className="absolute left-1/2 top-[44%] flex -translate-x-1/2 -translate-y-full flex-col items-center transition-transform duration-300 group-hover:-translate-y-[calc(100%+4px)]">
                  <span className="mb-1 max-w-[220px] rounded-2xl bg-white px-3 py-1.5 text-center text-[13px] font-extrabold leading-tight text-ink shadow-lift">
                    «Алёнушка»
                    <span className="block text-[11.5px] font-bold text-ink-soft">Самұрық, 57</span>
                  </span>
                  <MapPin className="size-10 fill-coral text-coral-deep drop-shadow" aria-hidden />
                </span>
                <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-[12px] font-extrabold text-ink shadow-soft">2GIS</span>
              </a>
            )}
            <div className="flex flex-col gap-3 p-4 sm:p-5">
              <p className="text-[13.5px] text-ink-soft">{c.mapNote}</p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <a
                  href={twoGisHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#1f8a3e] px-5 text-[15px] font-extrabold text-white transition hover:brightness-110"
                >
                  <MapPin className="size-[18px]" aria-hidden />
                  {c.map2gis}
                </a>
                <a
                  href={routeHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-white px-5 text-[15px] font-extrabold text-ink ring-2 ring-coral transition hover:bg-coral-soft"
                >
                  <Navigation className="size-[18px] text-coral-deep" aria-hidden />
                  {c.route}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({
  icon,
  chip,
  title,
  children,
  className = "",
}: {
  icon: React.ReactNode;
  chip: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`reveal flex items-start gap-3.5 rounded-[22px] bg-white p-4 shadow-soft ring-1 ring-line sm:p-5 ${className}`}>
      <span className={`grid size-11 shrink-0 place-items-center rounded-2xl ${chip}`}>{icon}</span>
      <div className="min-w-0 flex-1">
        <h3 className="mb-1 font-sans text-[13px] font-extrabold text-ink-soft">{title}</h3>
        {children}
      </div>
    </div>
  );
}

/** Условная схема местности — не настоящая карта, только иллюстрация для кнопки 2GIS. */
function MapArt() {
  return (
    <svg aria-hidden focusable={false} viewBox="0 0 600 340" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <rect width="600" height="340" fill="#eef6ec" />
      <path d="M-20 250C120 210 220 290 360 240S560 180 640 210" stroke="#c5eafb" strokeWidth="26" fill="none" />
      <path d="M-10 120h620M180-10v360M420-10v360M-10 300h620" stroke="#fff" strokeWidth="16" />
      <path d="M-10 120h620M180-10v360M420-10v360" stroke="#ece3d3" strokeWidth="2" strokeDasharray="10 10" />
      {[
        [30, 20, 120, 80, "#ffd9e5"],
        [220, 20, 170, 80, "#fff3c4"],
        [460, 20, 120, 80, "#dccbff"],
        [30, 145, 120, 70, "#bdeed8"],
        [460, 145, 120, 70, "#ffd9e5"],
      ].map(([x, y, w, h, f]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} rx="14" fill={f as string} opacity=".7" />
      ))}
      <rect x="218" y="140" width="176" height="86" rx="16" fill="#ffe47a" opacity=".9" />
      <circle cx="80" cy="280" r="16" fill="#9be0c0" />
      <circle cx="520" cy="270" r="20" fill="#9be0c0" />
      <circle cx="300" cy="300" r="12" fill="#9be0c0" />
    </svg>
  );
}
