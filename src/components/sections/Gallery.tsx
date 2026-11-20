"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Camera, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Expand, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { useT } from "@/lib/i18n";
import { galleryPhotos, type Photo } from "@/lib/media";
import { site } from "@/lib/site";
import { Butterfly, Cloud, Flower } from "../decor/Doodles";
import { InstagramIcon } from "../ui/BrandIcons";
import { SectionHeading } from "../ui/SectionHeading";

/** Сколько рядов показывать за раз: на десктопе — 2, на планшете — 3. */
const LG = "(min-width: 1024px)";
const rowsPerPage = () => (window.matchMedia(LG).matches ? 2 : 3);
/** До измерения (SSR и первый кадр) — примерное число фото. */
const FALLBACK = 8;
const noop = () => () => {};
/** true только на клиенте после гидрации — для портала. */
const useMounted = () => useSyncExternalStore(noop, () => true, () => false);

export function Gallery() {
  const t = useT();
  const g = t.gallery;
  const photos = galleryPhotos;
  const [pages, setPages] = useState(1);
  const grid = useRef<HTMLUListElement>(null);
  const probe = useRef<HTMLDivElement>(null);
  const [perPage, setPerPage] = useState<number[] | null>(null);
  // Число фото в каждой «странице» из целых рядов: повторяем правило переноса flex-wrap,
  // чтобы видимые ряды всегда были заполнены, а не обрывались на середине.
  useEffect(() => {
    const ul = grid.current;
    const pr = probe.current;
    if (!ul || !pr) return;
    const measure = () => {
      const width = ul.clientWidth;
      const rowH = pr.offsetHeight;
      if (!width || !rowH) return;
      const gap = parseFloat(getComputedStyle(ul).columnGap) || 0;
      const lines: number[] = [];
      let used = -gap;
      let count = 0;
      for (const p of photos) {
        const basis = (p.width / p.height) * rowH;
        if (count > 0 && used + gap + basis > width + 0.5) {
          lines.push(count);
          used = -gap;
          count = 0;
        }
        used += gap + basis;
        count++;
      }
      if (count) lines.push(count);
      const per = rowsPerPage();
      const cuts: number[] = [];
      for (let i = per; i < lines.length; i += per) cuts.push(lines.slice(0, i).reduce((a, b) => a + b, 0));
      setPerPage(cuts);
    };
    const ro = new ResizeObserver(measure);
    ro.observe(ul);
    ro.observe(pr);
    return () => ro.disconnect();
  }, [photos]);
  // cuts — границы страниц по рядам; после последней границы показываются все фото
  const cuts = perPage ?? (photos.length > FALLBACK ? [FALLBACK] : []);
  const shown = pages - 1 < cuts.length ? cuts[pages - 1] : photos.length;
  const hasMore = cuts.length > 0;
  const [index, setIndex] = useState<number | null>(null);
  const thumbs = useRef<(HTMLButtonElement | null)[]>([]);
  const slides = useRef<(HTMLButtonElement | null)[]>([]);

  const close = useCallback(() => {
    setIndex((i) => {
      if (i !== null)
        requestAnimationFrame(() => {
          // возвращаем фокус на видимую миниатюру (лента на телефоне или сетка на десктопе)
          const el = [slides.current[i], thumbs.current[i]].find((b) => b && b.offsetParent !== null);
          el?.focus({ preventScroll: true });
        });
      return null;
    });
  }, []);

  const visible = photos.slice(0, shown);
  const mounted = useMounted();

  return (
    <section
      id="gallery"
      data-section
      aria-labelledby="gallery-title"
      className="section-y relative isolate bg-mint-soft [--row-h:150px] lg:[--row-h:min(180px,20svh)]"
    >
      <Cloud className="decor -z-10 right-[-20px] top-8 w-24 animate-drift-slow lg:right-[5%]" />
      <Butterfly className="decor -z-10 left-4 top-12 w-10 animate-bob lg:left-[6%]" a="#c5eafb" b="#ffe47a" />
      <Flower className="decor -z-10 bottom-8 right-6 hidden w-9 sm:block" petal="#ffd9e5" />

      <div className="container-x">
        <SectionHeading id="gallery-title" eyebrow={g.eyebrow} title={g.title} lead={photos.length ? g.lead : undefined} tone="mint" />

        {photos.length === 0 ? (
          <EmptyGallery />
        ) : (
          <>
            {/* Телефон: горизонтальная лента со свайпом. Высота фиксирована, ширина — по пропорциям фото */}
            <div className="reveal sm:hidden">
              <ul
                className="-mx-[var(--gutter)] flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-[var(--gutter)] pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                style={{ scrollPaddingInline: "var(--gutter)" }}
                aria-label={g.title}
              >
                {photos.map((p, i) => (
                  <li key={p.src} className="flex shrink-0 snap-start items-center">
                    <button
                      ref={(el) => {
                        slides.current[i] = el;
                      }}
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-label={`${g.open}: ${g.counter(i + 1, photos.length)}`}
                      className="relative block overflow-hidden rounded-[20px] bg-white shadow-soft ring-1 ring-line"
                      style={{
                        aspectRatio: `${p.width} / ${p.height}`,
                        // высота ограничена и экраном, и шириной — пропорции сохраняются без полей
                        height: `min(48svh, 320px, calc((100vw - 56px) * ${p.height / p.width}))`,
                      }}
                    >
                      <Image
                        src={p.src}
                        alt={`${g.photoAlt} — ${i + 1}`}
                        fill
                        sizes="85vw"
                        quality={70}
                        className="object-contain"
                      />
                    </button>
                  </li>
                ))}
              </ul>
              <p className="mt-1 flex items-center justify-center gap-1.5 text-[13px] font-bold text-ink-soft" aria-hidden>
                <ChevronLeft className="size-4" /> {photos.length} <Camera className="size-4" /> <ChevronRight className="size-4" />
              </p>
            </div>

            {/* Планшет и десктоп: ряды одинаковой высоты, ширина каждой плитки — по пропорциям фото (без обрезки) */}
            <div ref={probe} aria-hidden className="invisible absolute h-[var(--row-h)] w-0" />
            <ul ref={grid} className="hidden flex-wrap gap-3 sm:flex lg:gap-4">
              {visible.map((p, i) => {
                const ratio = p.width / p.height;
                return (
                <li
                  key={p.src}
                  className="reveal"
                  style={{ "--d": `${Math.min(i, 8) * 50}ms`, flexGrow: ratio, flexBasis: `calc(${ratio} * var(--row-h))` } as React.CSSProperties}
                >
                  <button
                    ref={(el) => {
                      thumbs.current[i] = el;
                    }}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`${g.open}: ${g.counter(i + 1, photos.length)}`}
                    className="group relative block w-full overflow-hidden rounded-[18px] bg-white shadow-soft ring-1 ring-line"
                    style={{ aspectRatio: `${p.width} / ${p.height}` }}
                  >
                    <Image
                      src={p.src}
                      alt={`${g.photoAlt} — ${i + 1}`}
                      fill
                      sizes="(min-width: 1024px) 420px, 50vw"
                      quality={70}
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-white/85 text-ink opacity-0 shadow-soft transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                      <Expand className="size-4" aria-hidden />
                    </span>
                  </button>
                </li>
                );
              })}
              {/* распорка: последний (неполный) ряд всех фото не растягивается на всю ширину */}
              {shown >= photos.length && <li aria-hidden className="h-0" style={{ flexGrow: 10, flexBasis: 0 }} />}
            </ul>

            {hasMore && (
              <div className="mt-6 hidden justify-center sm:flex">
                <button
                  type="button"
                  onClick={() => setPages((n) => (shown >= photos.length ? 1 : n + 1))}
                  className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-[15.5px] font-extrabold text-mint-deep shadow-soft ring-2 ring-mint transition hover:-translate-y-0.5"
                >
                  {shown >= photos.length ? (
                    <>
                      {g.less} <ChevronUp className="size-4" aria-hidden />
                    </>
                  ) : (
                    <>
                      {g.more} <ChevronDown className="size-4" aria-hidden />
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Окно просмотра выносится в <body>, чтобы его не перекрывали следующие секции */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {index !== null && <Lightbox photos={photos} index={index} setIndex={setIndex} onClose={close} />}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
}

function EmptyGallery() {
  const t = useT();
  const tiles = ["bg-pink", "bg-sun", "bg-sky", "bg-lavender"];
  return (
    <div className="reveal mx-auto max-w-3xl rounded-[28px] border-2 border-dashed border-mint bg-white/80 p-5 text-center shadow-soft sm:p-8">
      <div className="mx-auto grid max-w-md grid-cols-4 gap-2 sm:gap-3" aria-hidden>
        {tiles.map((c, i) => (
          <div key={c} className={`grid aspect-square place-items-center rounded-2xl ${c} ${i % 2 ? "translate-y-2" : ""}`}>
            <Camera className="size-6 text-ink/30" />
          </div>
        ))}
      </div>
      <p className="mt-7 font-display text-[17px] font-extrabold text-ink">{t.gallery.empty}</p>
      <a
        href={site.instagram.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-r from-[#f58529] via-[#dd2a7b] to-[#8134af] px-5 text-[15px] font-extrabold text-white shadow-soft"
      >
        <InstagramIcon className="size-5" />
        {t.gallery.emptyHint}
      </a>
    </div>
  );
}

function Lightbox({
  photos,
  index,
  setIndex,
  onClose,
}: {
  photos: Photo[];
  index: number;
  setIndex: (i: number) => void;
  onClose: () => void;
}) {
  const t = useT();
  const g = t.gallery;
  const reduce = useReducedMotion();
  const closeBtn = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const [dir, setDir] = useState(0);
  const total = photos.length;
  const photo = photos[index];

  const prev = useCallback(() => {
    setDir(-1);
    setIndex((index - 1 + total) % total);
  }, [index, total, setIndex]);
  const next = useCallback(() => {
    setDir(1);
    setIndex((index + 1) % total);
  }, [index, total, setIndex]);

  useEffect(() => {
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    closeBtn.current?.focus({ preventScroll: true });
    return () => {
      root.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Tab" && dialog.current) {
        // простая ловушка фокуса внутри окна
        const items = dialog.current.querySelectorAll<HTMLElement>("button");
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  // Соседние фото — заранее, чтобы листание было мгновенным
  const neighbours = total > 1 ? [photos[(index + 1) % total], photos[(index - 1 + total) % total]] : [];

  return (
    <motion.div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label={g.dialog}
      className="fixed inset-0 z-[80] flex flex-col bg-[#1f2133] text-white"
      style={{ colorScheme: "only light" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : 0.2 }}
      onTouchStart={(e) => {
        const p = e.touches[0];
        touch.current = { x: p.clientX, y: p.clientY };
      }}
      onTouchEnd={(e) => {
        const s = touch.current;
        touch.current = null;
        if (!s) return;
        const p = e.changedTouches[0];
        const dx = p.clientX - s.x;
        const dy = p.clientY - s.y;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) (dx < 0 ? next : prev)();
        else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) onClose();
      }}
    >
      <div className="flex shrink-0 items-center justify-between gap-3 px-3 pb-2 pt-[max(12px,env(safe-area-inset-top))] sm:px-5">
        <span className="rounded-full bg-white/10 px-3 py-1.5 text-sm font-bold tabular-nums" aria-live="polite">
          {g.counter(index + 1, total)}
        </span>
        <button
          ref={closeBtn}
          type="button"
          onClick={onClose}
          aria-label={g.close}
          className="grid size-12 place-items-center rounded-full bg-white text-ink shadow-lift transition active:scale-95"
        >
          <X className="size-6" aria-hidden />
        </button>
      </div>

      {/* клик по пустому месту закрывает окно */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <AnimatePresence mode="popLayout" initial={false} custom={dir}>
          <motion.div
            key={photo.src}
            custom={dir}
            className="relative flex h-full w-full items-center justify-center"
            onClick={(e) => e.target === e.currentTarget && onClose()}
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -40 }}
            transition={{ duration: reduce ? 0 : 0.22 }}
          >
            <Image
              src={photo.src}
              alt={`${g.photoAlt} — ${index + 1}`}
              width={photo.width}
              height={photo.height}
              sizes="100vw"
              quality={80}
              priority
              className="h-auto max-h-full w-auto max-w-full rounded-xl object-contain shadow-2xl"
              style={{ maxHeight: "calc(100dvh - 150px)" }}
            />
          </motion.div>
        </AnimatePresence>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label={g.prev}
              className="absolute left-2 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-lift transition hover:bg-white sm:grid"
            >
              <ChevronLeft className="size-6" aria-hidden />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label={g.next}
              className="absolute right-2 top-1/2 hidden size-12 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-lift transition hover:bg-white sm:grid"
            >
              <ChevronRight className="size-6" aria-hidden />
            </button>
          </>
        )}
      </div>

      {/* Телефон: крупные кнопки снизу, под большим пальцем */}
      <div className="flex shrink-0 items-center justify-center gap-4 px-3 pb-[max(14px,env(safe-area-inset-bottom))] pt-3 sm:hidden">
        {total > 1 && (
          <button type="button" onClick={prev} aria-label={g.prev} className="grid size-12 place-items-center rounded-full bg-white/15 text-white active:bg-white/25">
            <ChevronLeft className="size-6" aria-hidden />
          </button>
        )}
        <button type="button" onClick={onClose} className="min-h-12 rounded-full bg-white px-6 text-[15px] font-extrabold text-ink">
          {g.close}
        </button>
        {total > 1 && (
          <button type="button" onClick={next} aria-label={g.next} className="grid size-12 place-items-center rounded-full bg-white/15 text-white active:bg-white/25">
            <ChevronRight className="size-6" aria-hidden />
          </button>
        )}
      </div>
      <div className="hidden h-4 sm:block" />

      <div className="sr-only" aria-hidden>
        {neighbours.map((n) => (
          <Image key={n.src} src={n.src} alt="" width={n.width} height={n.height} sizes="100vw" quality={80} loading="eager" />
        ))}
      </div>
    </motion.div>
  );
}
