/**
 * Небольшие декоративные SVG-фигурки: облака, солнце, радуга, цветы, звёзды,
 * бабочки, мяч, сердечко, яблоко. Все — aria-hidden и без pointer-events.
 */
type P = { className?: string; style?: React.CSSProperties };

const base = { "aria-hidden": true, focusable: false } as const;

export function Cloud({ className, style, fill = "#fff" }: P & { fill?: string }) {
  return (
    <svg {...base} viewBox="0 0 120 64" className={className} style={style}>
      <path
        d="M28 58h66a20 20 0 0 0 2-39.9A26 26 0 0 0 46.5 14 17 17 0 0 0 22 29.4 14.5 14.5 0 0 0 28 58Z"
        fill={fill}
      />
      <path d="M30 50h58" stroke="#30334b" strokeOpacity=".06" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Sun({ className, style }: P) {
  return (
    <svg {...base} viewBox="0 0 100 100" className={className} style={style}>
      <g className="origin-center animate-spin-slow" style={{ transformBox: "fill-box" }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <rect key={i} x="47" y="2" width="6" height="16" rx="3" fill="#ffd23f" transform={`rotate(${i * 30} 50 50)`} />
        ))}
      </g>
      <circle cx="50" cy="50" r="26" fill="#ffe47a" />
      <circle cx="50" cy="50" r="26" fill="none" stroke="#ffc928" strokeWidth="3" />
      <circle cx="41" cy="47" r="3" fill="#30334b" />
      <circle cx="59" cy="47" r="3" fill="#30334b" />
      <path d="M41 57q9 8 18 0" fill="none" stroke="#30334b" strokeWidth="3" strokeLinecap="round" />
      <circle cx="35" cy="56" r="4" fill="#ff846f" opacity=".45" />
      <circle cx="65" cy="56" r="4" fill="#ff846f" opacity=".45" />
    </svg>
  );
}

export function Rainbow({ className, style }: P) {
  const arcs = ["#ff846f", "#ffe47a", "#bdeed8", "#c5eafb", "#dccbff"];
  return (
    <svg {...base} viewBox="0 0 200 104" className={className} style={style}>
      {arcs.map((c, i) => {
        const r = 92 - i * 13;
        return <path key={c} d={`M${100 - r} 100a${r} ${r} 0 0 1 ${r * 2} 0`} fill="none" stroke={c} strokeWidth="13" strokeLinecap="round" />;
      })}
    </svg>
  );
}

export function Flower({ className, style, petal = "#ffd9e5", core = "#ffe47a" }: P & { petal?: string; core?: string }) {
  return (
    <svg {...base} viewBox="0 0 60 60" className={className} style={style}>
      {Array.from({ length: 6 }).map((_, i) => (
        <ellipse key={i} cx="30" cy="15" rx="9" ry="13" fill={petal} transform={`rotate(${i * 60} 30 30)`} />
      ))}
      <circle cx="30" cy="30" r="9" fill={core} />
      <circle cx="30" cy="30" r="9" fill="none" stroke="#30334b" strokeOpacity=".12" strokeWidth="2" />
    </svg>
  );
}

export function Tulip({ className, style, color = "#ff846f" }: P & { color?: string }) {
  return (
    <svg {...base} viewBox="0 0 40 70" className={className} style={style}>
      <path d="M20 30v38" stroke="#4fb88a" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M20 52c-9-1-14-7-15-14 8 0 13 5 15 14Z" fill="#7fd3ad" />
      <path d="M20 46c8-1 13-6 14-12-7 0-12 4-14 12Z" fill="#7fd3ad" />
      <path d="M8 10c3 6 6 8 12 8s9-2 12-8c1 12-3 22-12 22S7 22 8 10Z" fill={color} />
      <path d="M20 4c4 4 5 9 5 14h-10c0-5 1-10 5-14Z" fill={color} />
    </svg>
  );
}

export function Star({ className, style, fill = "#ffe47a" }: P & { fill?: string }) {
  return (
    <svg {...base} viewBox="0 0 40 40" className={className} style={style}>
      <path
        d="M20 3.5c1.2 0 2 .8 2.5 2l3.6 7.6 8.2 1.2c2.6.4 3.6 3.5 1.7 5.3l-6 5.8 1.4 8.2c.5 2.6-2.3 4.6-4.6 3.3L20 33l-6.8 3.9c-2.3 1.3-5.1-.7-4.6-3.3l1.4-8.2-6-5.8c-1.9-1.8-.9-4.9 1.7-5.3l8.2-1.2 3.6-7.6c.5-1.2 1.3-2 2.5-2Z"
        fill={fill}
      />
    </svg>
  );
}

export function Sparkle({ className, style, fill = "#dccbff" }: P & { fill?: string }) {
  return (
    <svg {...base} viewBox="0 0 30 30" className={className} style={style}>
      <path d="M15 1c1.2 7 6 12.4 14 14-8 1.6-12.8 7-14 14-1.2-7-6-12.4-14-14C9 13.4 13.8 8 15 1Z" fill={fill} />
    </svg>
  );
}

export function Butterfly({ className, style, a = "#dccbff", b = "#ffd9e5" }: P & { a?: string; b?: string }) {
  return (
    <svg {...base} viewBox="0 0 64 52" className={className} style={style}>
      <path d="M31 24C24 6 6 2 4 12c-2 9 10 14 27 12Z" fill={a} />
      <path d="M33 24C40 6 58 2 60 12c2 9-10 14-27 12Z" fill={a} />
      <path d="M31 27C18 28 10 38 15 44c5 6 14-3 16-17Z" fill={b} />
      <path d="M33 27c13 1 21 11 16 17-5 6-14-3-16-17Z" fill={b} />
      <rect x="29.5" y="16" width="5" height="26" rx="2.5" fill="#30334b" />
      <path d="M31 17c-2-6-5-9-8-10M33 17c2-6 5-9 8-10" stroke="#30334b" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function Heart({ className, style, fill = "#ff846f" }: P & { fill?: string }) {
  return (
    <svg {...base} viewBox="0 0 40 36" className={className} style={style}>
      <path d="M20 34S3 23.5 3 12.5A8.5 8.5 0 0 1 20 8a8.5 8.5 0 0 1 17 4.5C37 23.5 20 34 20 34Z" fill={fill} />
    </svg>
  );
}

export function Ball({ className, style }: P) {
  return (
    <svg {...base} viewBox="0 0 50 50" className={className} style={style}>
      <circle cx="25" cy="25" r="22" fill="#c5eafb" />
      <path d="M25 3a22 22 0 0 1 0 44" fill="#ff846f" />
      <path d="M3 25h44" stroke="#fff" strokeWidth="5" />
      <circle cx="25" cy="25" r="22" fill="none" stroke="#30334b" strokeOpacity=".12" strokeWidth="2" />
    </svg>
  );
}

export function Apple({ className, style, fill = "#ff846f" }: P & { fill?: string }) {
  return (
    <svg {...base} viewBox="0 0 44 48" className={className} style={style}>
      <path d="M22 13c-3-3-15-4-17 8-2 11 6 24 12 24 2 0 3-1 5-1s3 1 5 1c6 0 14-13 12-24-2-12-14-11-17-8Z" fill={fill} />
      <path d="M22 13c0-5 1-8 4-10" stroke="#7a5230" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M24 9c3-5 9-6 12-4-2 5-8 6-12 4Z" fill="#5cc497" />
      <ellipse cx="13" cy="23" rx="3" ry="5" fill="#fff" opacity=".5" />
    </svg>
  );
}

export function Pear({ className, style }: P) {
  return (
    <svg {...base} viewBox="0 0 40 52" className={className} style={style}>
      <path d="M20 8c-5 0-6 6-7 11-1 4-8 8-8 18 0 8 7 13 15 13s15-5 15-13c0-10-7-14-8-18-1-5-2-11-7-11Z" fill="#cde97a" />
      <path d="M20 9V2" stroke="#7a5230" strokeWidth="3" strokeLinecap="round" />
      <path d="M21 6c3-4 8-4 10-2-2 4-7 4-10 2Z" fill="#5cc497" />
    </svg>
  );
}

/** Мягкая волна-разделитель между секциями. `fill` — цвет следующей секции. */
export function Wave({ className, fill, flip = false }: { className?: string; fill: string; flip?: boolean }) {
  return (
    <svg
      {...base}
      viewBox="0 0 1440 48"
      preserveAspectRatio="none"
      className={className}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M0 26c160-22 320-22 480 0s320 22 480 0 320-22 480 0v22H0Z" fill={fill} />
    </svg>
  );
}
