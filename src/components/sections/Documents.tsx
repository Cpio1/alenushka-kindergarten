"use client";

import { BadgeCheck, Building2, Download, ExternalLink, FileText, FolderOpen, Landmark, Phone, type LucideIcon } from "lucide-react";
import { useLang, useT } from "@/lib/i18n";
import { documents, type DocumentCategory } from "@/lib/documents";
import { site, telHref } from "@/lib/site";
import { Sparkle, Star } from "../decor/Doodles";
import { SectionHeading } from "../ui/SectionHeading";

const CATEGORY: Record<DocumentCategory, { icon: LucideIcon; chip: string }> = {
  license: { icon: BadgeCheck, chip: "bg-mint text-mint-deep" },
  organization: { icon: Building2, chip: "bg-sky text-sky-deep" },
  founding: { icon: Landmark, chip: "bg-lavender text-lavender-deep" },
  other: { icon: FolderOpen, chip: "bg-sun text-sun-deep" },
};

function formatSize(bytes?: number) {
  if (!bytes) return null;
  return bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export function Documents() {
  const t = useT();
  const [lang] = useLang();
  const d = t.documents;

  return (
    <section id="documents" data-section aria-labelledby="documents-title" className="section-y relative isolate bg-sky-soft">
      <Star className="decor -z-10 left-5 top-10 w-6 lg:left-[7%]" fill="#dccbff" />
      <Sparkle className="decor -z-10 bottom-10 right-6 w-6 lg:right-[8%]" fill="#ffe47a" />

      <div className="container-x">
        <SectionHeading id="documents-title" eyebrow={d.eyebrow} title={d.title} lead={d.lead} tone="sky" />

        {documents.length > 0 ? (
          <ul className="mx-auto grid max-w-[1000px] gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
            {documents.map((doc, i) => {
              const { icon: Icon, chip } = CATEGORY[doc.category];
              const size = formatSize(doc.size);
              const external = doc.source !== "local";
              return (
                <li
                  key={doc.id}
                  className="reveal flex flex-col rounded-[22px] bg-white p-4 shadow-soft ring-1 ring-line sm:p-5"
                  style={{ "--d": `${i * 60}ms` } as React.CSSProperties}
                >
                  <div className="flex items-start gap-3">
                    <span className={`grid size-11 shrink-0 place-items-center rounded-2xl ${chip}`}>
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[12.5px] font-bold text-ink-soft">{d.categories[doc.category]}</p>
                      <h3 className="mt-0.5 break-words font-sans text-[16px] font-extrabold leading-snug text-ink">{doc.title[lang]}</h3>
                      {(doc.format || size) && (
                        <p className="mt-1 text-[12.5px] font-semibold text-ink-soft">{[doc.format, size].filter(Boolean).join(" · ")}</p>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 pt-1">
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-sky-deep px-4 text-[14.5px] font-extrabold text-white transition hover:brightness-110"
                    >
                      {external ? <ExternalLink className="size-4" aria-hidden /> : <FileText className="size-4" aria-hidden />}
                      {d.open}
                    </a>
                    {doc.downloadUrl && (
                      <a
                        href={doc.downloadUrl}
                        {...(doc.source === "local" ? { download: "" } : { target: "_blank", rel: "noopener noreferrer" })}
                        className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-white px-4 text-[14.5px] font-extrabold text-sky-deep ring-2 ring-sky transition hover:bg-sky-soft"
                      >
                        <Download className="size-4" aria-hidden />
                        {d.download}
                      </a>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="reveal mx-auto max-w-[880px] rounded-[28px] bg-white p-5 shadow-soft ring-1 ring-line sm:p-8">
            {/* Какие документы появятся — без ссылок, чтобы не было неработающих кнопок */}
            <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
              {(Object.keys(CATEGORY) as DocumentCategory[]).map((c) => {
                const { icon: Icon, chip } = CATEGORY[c];
                return (
                  <li key={c} className="flex flex-col items-center gap-2 rounded-2xl bg-sky-soft/70 px-2 py-3.5 text-center">
                    <span className={`grid size-11 place-items-center rounded-2xl ${chip}`}>
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span className="text-[13.5px] font-bold leading-snug text-ink">{d.categories[c]}</span>
                    <span className="rounded-full bg-white px-2 py-0.5 text-[11.5px] font-bold text-ink-soft ring-1 ring-line">{d.soon}</span>
                  </li>
                );
              })}
            </ul>
            <div className="mt-6 flex flex-col items-center gap-3 text-center sm:mt-7">
              <h3 className="font-display text-[18px] font-extrabold text-ink">{d.emptyTitle}</h3>
              <p className="max-w-lg text-[14.5px] text-ink-soft">{d.emptyText}</p>
              <a
                href={telHref(site.phones[0].e164)}
                className="mt-1 inline-flex min-h-11 items-center gap-2 rounded-full bg-sky-deep px-5 text-[15px] font-extrabold text-white transition hover:brightness-110"
              >
                <Phone className="size-4" aria-hidden />
                {d.emptyCta}: {site.phones[0].display}
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
