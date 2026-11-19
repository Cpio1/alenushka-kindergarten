/** Иллюстрации для групп и приёмов пищи. Простые формы, мягкие цвета, без мелких деталей. */
type P = { className?: string };
const base = { "aria-hidden": true, focusable: false } as const;
const INK = "#30334b";

/* ───────── Группы ───────── */

export function TeddyBear({ className }: P) {
  return (
    <svg {...base} viewBox="0 0 120 120" className={className}>
      <ellipse cx="60" cy="112" rx="30" ry="4" fill={INK} opacity=".08" />
      <circle cx="32" cy="30" r="13" fill="#d99a6c" />
      <circle cx="88" cy="30" r="13" fill="#d99a6c" />
      <circle cx="32" cy="30" r="6.5" fill="#ffd9e5" />
      <circle cx="88" cy="30" r="6.5" fill="#ffd9e5" />
      <ellipse cx="60" cy="88" rx="27" ry="23" fill="#d99a6c" />
      <ellipse cx="60" cy="91" rx="15" ry="13" fill="#f3d1b0" />
      <circle cx="35" cy="104" r="9" fill="#c98757" />
      <circle cx="85" cy="104" r="9" fill="#c98757" />
      <circle cx="60" cy="50" r="30" fill="#e3a678" />
      <ellipse cx="60" cy="60" rx="13" ry="10" fill="#f6dcc1" />
      <ellipse cx="60" cy="56" rx="5" ry="3.6" fill={INK} />
      <path d="M60 60v3.5M55 65q5 4 10 0" stroke={INK} strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <circle cx="48" cy="45" r="3.4" fill={INK} />
      <circle cx="72" cy="45" r="3.4" fill={INK} />
      <circle cx="42" cy="56" r="4" fill="#ff846f" opacity=".4" />
      <circle cx="78" cy="56" r="4" fill="#ff846f" opacity=".4" />
      <path d="M50 78l10 6 10-6-4 10h-12Z" fill="#ff846f" />
    </svg>
  );
}

export function BabyCamel({ className }: P) {
  return (
    <svg {...base} viewBox="0 0 130 120" className={className}>
      <ellipse cx="64" cy="113" rx="40" ry="4" fill={INK} opacity=".08" />
      {/* ноги */}
      {[38, 50, 76, 88].map((x) => (
        <rect key={x} x={x} y="76" width="8" height="34" rx="4" fill="#d4a26f" />
      ))}
      {/* тело и горбик */}
      <path d="M30 80c0-16 10-24 22-24 4-10 10-14 16-14s12 4 16 14c12 0 18 8 18 22 0 6-4 10-10 10H40c-6 0-10-3-10-8Z" fill="#e9bb84" />
      <path d="M50 52c3-8 9-12 15-12" stroke="#fff" strokeOpacity=".5" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* попона */}
      <path d="M52 58h32c2 8 2 14 0 20H52c-2-6-2-12 0-20Z" fill="#dccbff" />
      <path d="M52 68h32" stroke="#ffe47a" strokeWidth="3" strokeDasharray="4 4" />
      {/* шея и голова */}
      <path d="M100 74c-2-14 0-28 4-36" stroke="#e9bb84" strokeWidth="14" strokeLinecap="round" fill="none" />
      <ellipse cx="110" cy="32" rx="15" ry="12" fill="#e9bb84" />
      <ellipse cx="120" cy="36" rx="7" ry="6" fill="#f3d3ab" />
      <ellipse cx="100" cy="21" rx="4" ry="6" fill="#d4a26f" transform="rotate(-20 100 21)" />
      <circle cx="108" cy="29" r="3" fill={INK} />
      <path d="M118 38q3 2 5 0" stroke={INK} strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="104" cy="36" r="3.5" fill="#ff846f" opacity=".4" />
      {/* хвостик */}
      <path d="M30 70c-6 2-9 8-8 14" stroke="#d4a26f" strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function QuestionBook({ className }: P) {
  return (
    <svg {...base} viewBox="0 0 120 120" className={className}>
      <ellipse cx="60" cy="112" rx="38" ry="4" fill={INK} opacity=".08" />
      {/* лампочка */}
      <circle cx="60" cy="30" r="18" fill="#ffe47a" />
      <path d="M53 46h14v6a3 3 0 0 1-3 3h-8a3 3 0 0 1-3-3Z" fill="#9aa0c4" />
      <path d="M55 31l5 6 5-6" stroke="#e0a800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {[-60, -25, 25, 60].map((a) => (
        <rect key={a} x="58" y="2" width="4" height="8" rx="2" fill="#ffc928" transform={`rotate(${a} 60 30)`} />
      ))}
      {/* книга */}
      <path d="M14 66c16-6 32-6 46 4v40c-14-10-30-10-46-4Z" fill="#c5eafb" />
      <path d="M106 66c-16-6-32-6-46 4v40c14-10 30-10 46-4Z" fill="#bdeed8" />
      <path d="M60 70v40" stroke={INK} strokeOpacity=".2" strokeWidth="2" />
      <path d="M24 78c9-2 18-2 26 2M24 88c9-2 18-2 26 2M70 80c8-4 17-4 26-2M70 90c8-4 17-4 26-2" stroke={INK} strokeOpacity=".18" strokeWidth="2.5" strokeLinecap="round" />
      {/* вопросики */}
      <text x="12" y="52" fontFamily="Nunito, sans-serif" fontWeight="800" fontSize="22" fill="#ff846f">?</text>
      <text x="96" y="50" fontFamily="Nunito, sans-serif" fontWeight="800" fontSize="18" fill="#6a4cc7">?</text>
    </svg>
  );
}

export function Baiterek({ className }: P) {
  return (
    <svg {...base} viewBox="0 0 120 120" className={className}>
      <ellipse cx="60" cy="112" rx="34" ry="4" fill={INK} opacity=".08" />
      {/* ствол */}
      <path d="M54 112c2-14 2-32 0-50h12c-2 18-2 36 0 50Z" fill="#b07a4f" />
      <path d="M60 80c-6-4-12-6-18-6M60 72c6-5 12-7 18-7" stroke="#b07a4f" strokeWidth="5" strokeLinecap="round" fill="none" />
      {/* крона */}
      <circle cx="40" cy="56" r="20" fill="#7fd3ad" />
      <circle cx="80" cy="56" r="20" fill="#7fd3ad" />
      <circle cx="60" cy="42" r="26" fill="#9be0c0" />
      <circle cx="46" cy="36" r="5" fill="#fff" opacity=".4" />
      {/* золотое яйцо Самұрық */}
      <ellipse cx="60" cy="20" rx="10" ry="12" fill="#ffe47a" />
      <ellipse cx="57" cy="16" rx="3" ry="4.5" fill="#fff" opacity=".6" />
      {/* яблочки */}
      <circle cx="36" cy="62" r="4" fill="#ff846f" />
      <circle cx="84" cy="60" r="4" fill="#ff846f" />
      <circle cx="70" cy="50" r="3.5" fill="#ffd9e5" />
    </svg>
  );
}

export function LittleStars({ className }: P) {
  const star =
    "M20 3.5c1.2 0 2 .8 2.5 2l3.6 7.6 8.2 1.2c2.6.4 3.6 3.5 1.7 5.3l-6 5.8 1.4 8.2c.5 2.6-2.3 4.6-4.6 3.3L20 33l-6.8 3.9c-2.3 1.3-5.1-.7-4.6-3.3l1.4-8.2-6-5.8c-1.9-1.8-.9-4.9 1.7-5.3l8.2-1.2 3.6-7.6c.5-1.2 1.3-2 2.5-2Z";
  return (
    <svg {...base} viewBox="0 0 120 120" className={className}>
      <ellipse cx="60" cy="112" rx="30" ry="4" fill={INK} opacity=".08" />
      <g transform="translate(24 30) scale(1.8)">
        <path d={star} fill="#ffe47a" />
        <circle cx="15" cy="21" r="1.8" fill={INK} />
        <circle cx="25" cy="21" r="1.8" fill={INK} />
        <path d="M16.5 25.5q3.5 3 7 0" stroke={INK} strokeWidth="1.6" strokeLinecap="round" fill="none" />
      </g>
      <g transform="translate(8 14) scale(.62)">
        <path d={star} fill="#dccbff" />
      </g>
      <g transform="translate(88 18) scale(.72)">
        <path d={star} fill="#ffd9e5" />
      </g>
      <g transform="translate(92 80) scale(.5)">
        <path d={star} fill="#c5eafb" />
      </g>
      <path d="M14 96c10-6 20-6 30 0" stroke="#ffc928" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 7" fill="none" />
    </svg>
  );
}

/* ───────── Питание ───────── */

export function BreakfastArt({ className }: P) {
  return (
    <svg {...base} viewBox="0 0 120 90" className={className}>
      <ellipse cx="60" cy="84" rx="44" ry="4" fill={INK} opacity=".08" />
      {/* чашка */}
      <path d="M70 46h32v18a14 14 0 0 1-14 14h-4a14 14 0 0 1-14-14Z" fill="#fff" stroke="#ffc928" strokeWidth="3" />
      <path d="M102 52c8 0 8 14 0 14" stroke="#ffc928" strokeWidth="3" fill="none" />
      <path d="M80 36c-3-4 3-6 0-10M92 36c-3-4 3-6 0-10" stroke="#ffc928" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity=".7" />
      {/* миска */}
      <path d="M14 50h52a26 26 0 0 1-52 0Z" fill="#ffd9e5" />
      <ellipse cx="40" cy="50" rx="26" ry="5" fill="#fff6e0" />
      <circle cx="34" cy="48" r="3" fill="#ff846f" />
      <circle cx="44" cy="49" r="2.5" fill="#dccbff" />
      <path d="M52 22l-8 28" stroke="#9aa0c4" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function LunchArt({ className }: P) {
  return (
    <svg {...base} viewBox="0 0 120 90" className={className}>
      <ellipse cx="60" cy="84" rx="44" ry="4" fill={INK} opacity=".08" />
      <ellipse cx="60" cy="56" rx="46" ry="12" fill="#fff" stroke="#7fd3ad" strokeWidth="3" />
      <path d="M26 50h68a34 30 0 0 1-68 0Z" fill="#bdeed8" />
      <ellipse cx="60" cy="50" rx="34" ry="6" fill="#ffe9a8" />
      <circle cx="50" cy="49" r="3" fill="#ff846f" />
      <circle cx="64" cy="51" r="2.5" fill="#7fd3ad" />
      <circle cx="72" cy="48" r="2" fill="#ff846f" />
      <path d="M50 38c-3-5 3-7 0-12M62 38c-3-5 3-7 0-12M74 38c-3-5 3-7 0-12" stroke="#7fd3ad" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M100 24l-14 30" stroke="#9aa0c4" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="102" cy="21" rx="5" ry="7" fill="#9aa0c4" transform="rotate(25 102 21)" />
    </svg>
  );
}

export function SnackArt({ className }: P) {
  return (
    <svg {...base} viewBox="0 0 120 90" className={className}>
      <ellipse cx="60" cy="84" rx="44" ry="4" fill={INK} opacity=".08" />
      {/* стакан */}
      <path d="M72 26h26l-3 52H75Z" fill="#fff" stroke="#9fb6f0" strokeWidth="3" strokeLinejoin="round" />
      <path d="M74 44h22l-2 32H76Z" fill="#c5eafb" />
      {/* яблоко */}
      <path d="M40 40c-3-3-17-4-19 9-2 12 7 27 13 27 2 0 4-1 6-1s4 1 6 1c6 0 15-15 13-27-2-13-16-12-19-9Z" fill="#ff846f" />
      <path d="M40 40c0-5 1-9 4-11" stroke="#7a5230" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M43 35c3-5 9-6 12-4-2 5-8 6-12 4Z" fill="#5cc497" />
      <ellipse cx="29" cy="52" rx="3" ry="5" fill="#fff" opacity=".5" />
      {/* печенька */}
      <circle cx="60" cy="74" r="9" fill="#f2c27b" />
      <circle cx="57" cy="72" r="1.5" fill="#7a5230" />
      <circle cx="62" cy="76" r="1.5" fill="#7a5230" />
    </svg>
  );
}

export function DinnerArt({ className }: P) {
  return (
    <svg {...base} viewBox="0 0 120 90" className={className}>
      <ellipse cx="60" cy="84" rx="44" ry="4" fill={INK} opacity=".08" />
      {/* вилка */}
      <path d="M16 20v18a5 5 0 0 0 10 0V20M21 20v18M21 42v34" stroke="#9aa0c4" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      {/* тарелка */}
      <circle cx="60" cy="50" r="30" fill="#fff" stroke="#b7a3f0" strokeWidth="3" />
      <circle cx="60" cy="50" r="21" fill="#f5f0ff" />
      <circle cx="54" cy="46" r="7" fill="#ffe47a" />
      <circle cx="66" cy="54" r="6" fill="#bdeed8" />
      <circle cx="64" cy="42" r="4" fill="#ff846f" />
      {/* ложка */}
      <ellipse cx="102" cy="28" rx="6" ry="9" fill="#9aa0c4" />
      <path d="M102 36v40" stroke="#9aa0c4" strokeWidth="3.5" strokeLinecap="round" />
      {/* месяц */}
      <path d="M96 4a8 8 0 1 0 8 10 6 6 0 1 1-8-10Z" fill="#ffe47a" />
    </svg>
  );
}
