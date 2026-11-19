"use client";

import Image from "next/image";
import { useT } from "@/lib/i18n";
import { logoImage } from "@/lib/media";

/** Знак: солнышко-цветок с косичкой-лепестком. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden focusable={false} className={className}>
      {Array.from({ length: 8 }).map((_, i) => (
        <ellipse
          key={i}
          cx="24"
          cy="9"
          rx="6"
          ry="8"
          fill={["#ffd9e5", "#ffe47a", "#bdeed8", "#dccbff", "#c5eafb", "#ffd9e5", "#ffe47a", "#bdeed8"][i]}
          transform={`rotate(${i * 45} 24 24)`}
        />
      ))}
      <circle cx="24" cy="24" r="11" fill="#ff846f" />
      <circle cx="20" cy="22.5" r="1.7" fill="#30334b" />
      <circle cx="28" cy="22.5" r="1.7" fill="#30334b" />
      <path d="M20 27.5q4 3.2 8 0" stroke="#30334b" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  const t = useT();
  return (
    <span className="flex items-center gap-2.5">
      {logoImage ? (
        // Предоставленный PNG-логотип (с прозрачным фоном)
        <Image
          src={logoImage.src}
          alt=""
          width={logoImage.width}
          height={logoImage.height}
          priority
          className="h-10 w-auto max-w-[64px] shrink-0 object-contain lg:h-11"
        />
      ) : (
        <LogoMark className="size-10 shrink-0 lg:size-11" />
      )}
      <span className="flex flex-col leading-none">
        <span className="font-display text-[21px] font-extrabold tracking-[-0.01em] text-ink lg:text-[23px]">
          Алёнушка
        </span>
        {!compact && (
          <span className="mt-1 text-[11.5px] font-semibold text-ink-soft lg:text-[12.5px]">{t.brandSub}</span>
        )}
      </span>
    </span>
  );
}
