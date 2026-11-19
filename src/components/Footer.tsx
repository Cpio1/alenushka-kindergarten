"use client";

import { ArrowUp, Clock3, MapPin, Phone } from "lucide-react";
import { useT } from "@/lib/i18n";
import { site, telHref } from "@/lib/site";
import { NAV, scrollToSection } from "./Header";
import { InstagramIcon } from "./ui/BrandIcons";
import { Logo } from "./ui/Logo";
import { Wave } from "./decor/Doodles";

export function Footer() {
  const t = useT();
  const year = new Date().getFullYear();

  return (
    <footer id="site-footer" className="relative bg-ink text-white">
      <Wave fill="#30334b" className="absolute bottom-full left-0 block h-6 w-full sm:h-8" flip />
      <div className="container-x grid gap-8 pb-[calc(28px+env(safe-area-inset-bottom))] pt-10 md:grid-cols-[1.2fr_1fr_1.2fr] lg:pt-12">
        <div>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("top");
            }}
            aria-label={t.header.home}
            className="inline-block rounded-2xl bg-white px-3 py-2"
          >
            <Logo />
          </a>
          <p className="mt-4 max-w-xs text-[14px] text-white/75">{site.legalName}</p>
        </div>

        <nav aria-label={t.footer.nav}>
          <h2 className="font-sans text-[13px] font-extrabold text-white/60">{t.footer.nav}</h2>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-[15px] font-bold">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(n.id);
                  }}
                  className="text-white/90 hover:text-sun"
                >
                  {t.nav[n.id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-[13px] font-extrabold text-white/60">{t.footer.contacts}</h2>
          <ul className="mt-3 space-y-2.5 text-[14.5px]">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-coral" aria-hidden />
              <span className="text-white/90">{t.contacts.addressValue}</span>
            </li>
            {site.phones.map((p) => (
              <li key={p.e164} className="flex gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-sun" aria-hidden />
                <a href={telHref(p.e164)} className="font-bold tabular-nums hover:text-sun">
                  {p.display}
                </a>
              </li>
            ))}
            <li className="flex gap-2.5">
              <Clock3 className="mt-0.5 size-4 shrink-0 text-mint" aria-hidden />
              <span className="text-white/90">{site.hours}</span>
            </li>
            <li className="flex gap-2.5">
              <InstagramIcon className="mt-0.5 size-4 shrink-0 text-lavender" />
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="font-bold hover:text-sun">
                {site.instagram.handle}
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-5 text-[13px] text-white/60 sm:flex-row sm:items-center sm:justify-between md:col-span-3">
          <p>
            © {year} {site.legalName}. {t.footer.rights}
          </p>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("top");
            }}
            className="inline-flex items-center gap-1.5 self-start font-bold text-white/80 hover:text-sun sm:self-auto"
          >
            <ArrowUp className="size-4" aria-hidden />
            {t.footer.top}
          </a>
        </div>
      </div>
    </footer>
  );
}
