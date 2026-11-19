type Tone = "pink" | "sun" | "mint" | "lavender" | "sky" | "coral";

const tones: Record<Tone, string> = {
  pink: "bg-pink text-pink-deep",
  sun: "bg-sun text-sun-deep",
  mint: "bg-mint text-mint-deep",
  lavender: "bg-lavender text-lavender-deep",
  sky: "bg-sky text-sky-deep",
  coral: "bg-coral-soft text-coral-deep",
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  tone = "pink",
  align = "center",
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  tone?: Tone;
  align?: "center" | "left" | "split";
}) {
  // split: по центру на телефоне, слева на десктопе (для двухколоночных секций)
  const pos = align === "center" ? "mx-auto text-center" : align === "split" ? "mx-auto text-center lg:mx-0 lg:text-left" : "";
  return (
    <header className={`reveal mb-8 max-w-2xl lg:mb-10 ${pos}`}>
      <span className={`inline-flex rounded-full px-3.5 py-1 text-[13px] font-extrabold ${tones[tone]}`}>{eyebrow}</span>
      <h2 id={id} className="mt-3 text-[clamp(1.6rem,1.2rem+1.8vw,2.45rem)] font-extrabold leading-[1.15] text-ink">
        {title}
      </h2>
      {lead && <p className="mt-3 text-[clamp(1rem,0.95rem+0.25vw,1.125rem)] text-ink-soft">{lead}</p>}
    </header>
  );
}
