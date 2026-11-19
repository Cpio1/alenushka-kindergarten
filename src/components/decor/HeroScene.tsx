import { Butterfly, Cloud, Flower, Rainbow, Sparkle, Star, Sun, Tulip } from "./Doodles";

const INK = "#30334b";

/** Домик детского сада — общий для обеих композиций. */
function House({ className }: { className?: string }) {
  return (
    <svg aria-hidden focusable={false} viewBox="0 0 220 190" className={className}>
      <ellipse cx="110" cy="184" rx="100" ry="6" fill={INK} opacity=".07" />
      {/* труба */}
      <rect x="146" y="26" width="18" height="34" rx="4" fill="#ff846f" />
      {/* крыша */}
      <path d="M18 84 110 16l92 68Z" fill="#ff846f" />
      <path d="M18 84 110 16l92 68" stroke="#e8634c" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" fill="none" />
      {/* окошко на крыше */}
      <circle cx="110" cy="58" r="14" fill="#fff" />
      <circle cx="110" cy="58" r="9" fill="#c5eafb" />
      <path d="M110 49v18M101 58h18" stroke="#fff" strokeWidth="3" />
      {/* стены */}
      <rect x="34" y="82" width="152" height="98" rx="10" fill="#fff8ef" />
      <rect x="34" y="82" width="152" height="98" rx="10" fill="none" stroke="#f0e1cf" strokeWidth="3" />
      {/* вывеска */}
      <rect x="62" y="92" width="96" height="20" rx="10" fill="#ffe47a" />
      <circle cx="74" cy="102" r="3" fill="#ff846f" />
      <circle cx="146" cy="102" r="3" fill="#ff846f" />
      <rect x="82" y="99" width="56" height="6" rx="3" fill={INK} opacity=".18" />
      {/* окна */}
      <rect x="48" y="122" width="34" height="30" rx="8" fill="#c5eafb" />
      <path d="M65 122v30M48 137h34" stroke="#fff" strokeWidth="3" />
      <rect x="138" y="122" width="34" height="30" rx="8" fill="#dccbff" />
      <path d="M155 122v30M138 137h34" stroke="#fff" strokeWidth="3" />
      {/* дверь */}
      <path d="M94 180v-38a16 16 0 0 1 32 0v38Z" fill="#bdeed8" />
      <circle cx="119" cy="160" r="2.6" fill={INK} opacity=".5" />
      {/* ступенька */}
      <rect x="86" y="176" width="48" height="6" rx="3" fill="#f0e1cf" />
    </svg>
  );
}

/** Десктоп: объёмная композиция справа от текста. */
export function HeroSceneDesktop() {
  return (
    <div className="relative mx-auto aspect-[10/9] w-full max-w-[540px]">
      {/* мягкое пятно-подложка */}
      <div className="absolute inset-[6%_4%_8%_4%] rounded-[46%_54%_48%_52%/55%_45%_55%_45%] bg-gradient-to-br from-sky via-lavender-soft to-pink" />
      <div className="absolute inset-x-[10%] bottom-[10%] h-[26%] rounded-[50%] bg-mint/80" />
      <Rainbow className="absolute left-1/2 top-[8%] w-[78%] -translate-x-1/2" />
      <Sun className="absolute right-[2%] top-[2%] w-[20%]" />
      <Cloud className="absolute left-[2%] top-[18%] w-[26%] animate-drift" />
      <Cloud className="absolute right-[10%] top-[34%] w-[18%] animate-drift-slow" fill="#fffdf9" />
      <House className="absolute bottom-[12%] left-1/2 w-[50%] -translate-x-1/2" />
      <Tulip className="absolute bottom-[12%] left-[14%] w-[7%]" color="#ff846f" />
      <Tulip className="absolute bottom-[11%] left-[20%] w-[6%]" color="#dccbff" />
      <Flower className="absolute bottom-[9%] right-[14%] w-[10%]" />
      <Flower className="absolute bottom-[19%] right-[8%] w-[7%]" petal="#c5eafb" />
      <Butterfly className="absolute left-[8%] top-[46%] w-[11%] animate-bob" />
      <Star className="absolute right-[4%] top-[52%] w-[6%]" fill="#ffe47a" />
      <Sparkle className="absolute left-[22%] top-[4%] w-[5%]" fill="#ff846f" />
      <Sparkle className="absolute bottom-[34%] right-[2%] w-[4%]" />
    </div>
  );
}

/** Телефон: низкая горизонтальная композиция, не отнимающая первый экран. */
export function HeroSceneMobile() {
  return (
    <div className="relative mx-auto h-[150px] w-full max-w-[420px] sm:h-[190px]">
      <div className="absolute inset-x-0 bottom-0 h-[86%] rounded-[28px] bg-gradient-to-br from-sky via-lavender-soft to-pink" />
      <div className="absolute inset-x-[6%] bottom-0 h-[22%] rounded-t-[50%] bg-mint/80" />
      <Rainbow className="absolute left-[4%] top-[18%] w-[38%]" />
      <Sun className="absolute right-[4%] top-0 w-[17%]" />
      <Cloud className="absolute left-[30%] top-[16%] w-[20%] animate-drift" />
      <House className="absolute bottom-[3%] left-1/2 h-[78%] -translate-x-[18%]" />
      <Tulip className="absolute bottom-[4%] left-[8%] h-[30%]" color="#ff846f" />
      <Flower className="absolute bottom-[6%] left-[18%] h-[18%]" />
      <Butterfly className="absolute right-[6%] top-[48%] w-[11%] animate-bob" />
    </div>
  );
}
