/**
 * Hand-built SVG ornaments — mango-leaf toran, jasmine strands, brass lamp,
 * mandapam arch, lotus dividers and kolam corners. All vector, all tiny.
 */
import type { CSSProperties } from 'react';
import { asset } from '../lib/links';

type P = { className?: string; style?: CSSProperties };

/** Shared gradients — rendered once near the top of the document. */
export function OrnamentDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" style={{ position: 'absolute' }}>
      <defs>
        <linearGradient id="g-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F3DFA2" />
          <stop offset=".45" stopColor="#C99A45" />
          <stop offset=".7" stopColor="#A8792C" />
          <stop offset="1" stopColor="#E7C878" />
        </linearGradient>
        <linearGradient id="g-gold-v" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F6E3A6" />
          <stop offset=".5" stopColor="#C3913C" />
          <stop offset="1" stopColor="#8E6421" />
        </linearGradient>
        <linearGradient id="g-leaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3C7A4E" />
          <stop offset=".6" stopColor="#1F4D33" />
          <stop offset="1" stopColor="#163A27" />
        </linearGradient>
        <linearGradient id="g-leaf-2" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5E8F4A" />
          <stop offset="1" stopColor="#24563A" />
        </linearGradient>
        <radialGradient id="g-lav" cx=".35" cy=".3" r=".8">
          <stop offset="0" stopColor="#F1E6FA" />
          <stop offset=".55" stopColor="#C9AEE3" />
          <stop offset="1" stopColor="#9C7CC4" />
        </radialGradient>
        <radialGradient id="g-blush" cx=".35" cy=".3" r=".8">
          <stop offset="0" stopColor="#FFF0F5" />
          <stop offset=".6" stopColor="#F2C9DC" />
          <stop offset="1" stopColor="#D89BBB" />
        </radialGradient>
        <radialGradient id="g-marigold" cx=".4" cy=".35" r=".7">
          <stop offset="0" stopColor="#FFD27A" />
          <stop offset=".6" stopColor="#F0A12E" />
          <stop offset="1" stopColor="#C46D12" />
        </radialGradient>
        <radialGradient id="g-jasmine" cx=".4" cy=".3" r=".8">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset=".7" stopColor="#F6F1E4" />
          <stop offset="1" stopColor="#DCD3BC" />
        </radialGradient>
        <radialGradient id="g-flame" cx=".5" cy=".75" r=".75">
          <stop offset="0" stopColor="#FFF8D6" />
          <stop offset=".35" stopColor="#FFD35C" />
          <stop offset=".75" stopColor="#F28A1B" />
          <stop offset="1" stopColor="#D2560F" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="g-glow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor="#FFD877" stopOpacity=".55" />
          <stop offset="1" stopColor="#FFD877" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}

/* ── Floral garland: lavender & blush blossoms on a gold cord ── */
const PETALS = [0, 72, 144, 216, 288];

function Blossom({ r, fill }: { r: number; fill: string }) {
  return (
    <g className="garland__bloom">
      {PETALS.map((a) => (
        <ellipse key={a} cy={-r * 0.62} rx={r * 0.48} ry={r * 0.62} transform={`rotate(${a})`} fill={fill} />
      ))}
      <circle r={r * 0.26} fill="url(#g-gold)" />
      <circle r={r * 0.1} fill="#FFF6DA" />
    </g>
  );
}

export function Toran({ count = 25, className, style }: P & { count?: number }) {
  const step = 44;
  const w = count * step + step;
  const sag = 26;
  const y = (t: number) => 6 + 2 * t * (1 - t) * sag * 2;
  const items = Array.from({ length: count }, (_, i) => {
    const t = (i + 1) / (count + 1);
    return { x: t * w, y: y(t), i };
  });
  return (
    <svg
      className={`toran ${className ?? ''}`}
      style={style}
      viewBox={`0 0 ${w} ${sag + 80}`}
      preserveAspectRatio="xMidYMin meet"
      aria-hidden="true"
    >
      <path d={`M0 6 Q ${w / 2} ${6 + sag * 2} ${w} 6`} fill="none" stroke="url(#g-gold)" strokeWidth="1.6" />
      {items.map(({ x, y: yy, i }) => {
        const kind = i % 4;
        const len = kind === 0 ? 30 : kind === 2 ? 20 : 10;
        return (
          <g
            key={i}
            className="garland__drop"
            style={{ animationDelay: `${(i % 7) * -0.7}s` }}
            transform={`translate(${x} ${yy})`}
          >
            <line x1="0" y1="0" x2="0" y2={len} stroke="#C9A45C" strokeWidth=".8" />
            {/* small leaves at the stem */}
            <ellipse cx="-4" cy="5" rx="2.2" ry="5" transform="rotate(-40 -4 5)" fill="#A9B79A" opacity=".8" />
            <ellipse cx="4" cy="7" rx="2" ry="4.6" transform="rotate(40 4 7)" fill="#C2CDB4" opacity=".8" />
            <g transform={`translate(0 ${len})`}>
              {kind === 0 && <Blossom r={11} fill="url(#g-lav)" />}
              {kind === 2 && <Blossom r={8.5} fill="url(#g-blush)" />}
              {(kind === 1 || kind === 3) && (
                <g className="garland__bud">
                  <circle cx="-3" r="2.6" fill="url(#g-jasmine)" />
                  <circle cx="3" cy="2" r="2.2" fill="url(#g-jasmine)" />
                  <circle cy="5" r="3.2" fill={kind === 1 ? 'url(#g-lav)' : 'url(#g-blush)'} />
                </g>
              )}
            </g>
          </g>
        );
      })}
    </svg>
  );
}

/* ── Drifting lavender petals ───────────────────────────────── */
export function FallingPetals({ count = 16, className }: { count?: number; className?: string }) {
  const tones = ['petal--lav', 'petal--blush', 'petal--white'];
  return (
    <div className={`petals ${className ?? ''}`} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className={`petal ${tones[i % 3]}`}
          style={
            {
              left: `${(i * 61) % 100}%`,
              animationDelay: `${(i * 1.7) % 11}s`,
              animationDuration: `${11 + (i % 5) * 2}s`,
              '--drift': `${(i % 2 ? 1 : -1) * (20 + (i % 4) * 14)}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

/* ── Hanging jasmine strand ─────────────────────────────────── */
export function JasmineStrand({ length = 14, className, style }: P & { length?: number }) {
  const gap = 15;
  const h = length * gap + 30;
  return (
    <svg className={`jasmine ${className ?? ''}`} style={style} viewBox={`0 0 30 ${h}`} aria-hidden="true">
      <line x1="15" y1="0" x2="15" y2={h - 18} stroke="#C9A45C" strokeWidth=".8" />
      {Array.from({ length }, (_, i) => {
        const yy = 10 + i * gap;
        const accent = i % 6 === 5;
        return (
          <g key={i} transform={`translate(15 ${yy})`}>
            {accent ? (
              <circle r="4.6" fill="url(#g-marigold)" />
            ) : (
              <>
                <ellipse
                  cx="-4"
                  rx="3.4"
                  ry="5.6"
                  transform="rotate(-24 -4 0)"
                  fill="url(#g-jasmine)"
                  stroke="#E3D9C1"
                  strokeWidth=".4"
                />
                <ellipse
                  cx="4"
                  rx="3.4"
                  ry="5.6"
                  transform="rotate(24 4 0)"
                  fill="url(#g-jasmine)"
                  stroke="#E3D9C1"
                  strokeWidth=".4"
                />
                <circle cy="-2" r="1.3" fill="#9BB37A" />
              </>
            )}
          </g>
        );
      })}
      <g transform={`translate(15 ${h - 14})`}>
        <path d="M0 -6 C 4 -2 4 4 0 8 C -4 4 -4 -2 0 -6 Z" fill="url(#g-gold-v)" />
      </g>
    </svg>
  );
}

/* ── Brass kuthu-vilakku lamp with living flame ─────────────── */
export function BrassLamp({ className, style }: P) {
  return (
    <svg className={`lamp ${className ?? ''}`} style={style} viewBox="0 0 90 230" aria-hidden="true">
      <circle className="lamp__glow" cx="45" cy="26" r="38" fill="url(#g-glow)" />
      <path className="lamp__flame" d="M45 4 C 52 16 54 26 45 36 C 36 26 38 16 45 4 Z" fill="url(#g-flame)" />
      <path d="M45 18 C 48 24 48 29 45 33 C 42 29 42 24 45 18 Z" fill="#FFF6D2" opacity=".85" />
      {/* bowl */}
      <path d="M10 42 Q45 66 80 42 L74 38 Q45 52 16 38 Z" fill="url(#g-gold)" />
      <ellipse cx="45" cy="39" rx="31" ry="5" fill="#7A5418" opacity=".55" />
      {/* stem with knots */}
      <path d="M41 56 L39 168 L51 168 L49 56 Z" fill="url(#g-gold-v)" />
      <ellipse cx="45" cy="62" rx="9" ry="5" fill="url(#g-gold)" />
      <ellipse cx="45" cy="92" rx="12" ry="6" fill="url(#g-gold)" />
      <ellipse cx="45" cy="98" rx="8" ry="3.5" fill="url(#g-gold-v)" />
      <ellipse cx="45" cy="130" rx="10" ry="5" fill="url(#g-gold)" />
      <ellipse cx="45" cy="160" rx="13" ry="6" fill="url(#g-gold)" />
      {/* base */}
      <path d="M30 168 L60 168 L72 196 L18 196 Z" fill="url(#g-gold-v)" />
      <rect x="10" y="196" width="70" height="9" rx="3" fill="url(#g-gold)" />
      <rect x="4" y="205" width="82" height="10" rx="4" fill="url(#g-gold-v)" />
      <path d="M22 186 Q45 178 68 186" stroke="#7A5418" strokeWidth="1" fill="none" opacity=".5" />
    </svg>
  );
}

/* ── Temple mandapam arch (frames the couple's names) ───────── */
export function MandapamArch({ className, style }: P) {
  // Multi-cusped arch built from a row of small scallops over a pointed curve.
  const cusps = Array.from({ length: 13 }, (_, i) => {
    const a = Math.PI - (i / 12) * Math.PI;
    return { x: 300 + Math.cos(a) * 220, y: 280 - Math.sin(a) * 200 };
  });
  return (
    <svg
      className={`mandapam ${className ?? ''}`}
      style={style}
      viewBox="0 -10 600 830"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <g fill="none" stroke="url(#g-gold)" strokeLinecap="round" vectorEffect="non-scaling-stroke">
        {/* outer & inner arch */}
        <path d="M60 300 C 60 120 180 40 300 22 C 420 40 540 120 540 300" strokeWidth="2.2" />
        <path d="M80 300 C 80 136 190 62 300 46 C 410 62 520 136 520 300" strokeWidth=".9" />
        {/* finial */}
        <path d="M300 22 L300 2 M292 10 Q300 -2 308 10" strokeWidth="1.4" />
        <circle cx="300" cy="-4" r="3" fill="#C99A45" stroke="none" />
        {/* scallops */}
        {cusps.slice(0, -1).map((p, i) => {
          const n = cusps[i + 1];
          const mx = (p.x + n.x) / 2;
          const my = (p.y + n.y) / 2;
          const dx = mx - 300;
          const dy = my - 280;
          const len = Math.hypot(dx, dy);
          return (
            <path
              key={i}
              d={`M${p.x} ${p.y} Q ${mx - (dx / len) * 16} ${my - (dy / len) * 16} ${n.x} ${n.y}`}
              strokeWidth="1"
              opacity=".85"
            />
          );
        })}
        {cusps.map((p, i) => (
          <circle key={`d${i}`} cx={p.x} cy={p.y} r="2.2" fill="#C99A45" stroke="none" />
        ))}
        {/* pillars */}
        {[60, 520].map((x) => (
          <g key={x}>
            <rect x={x - 10} y="300" width="40" height="14" rx="2" strokeWidth="1.4" />
            <path d={`M${x - 4} 314 L${x + 24} 314 L${x + 20} 330 L${x} 330 Z`} strokeWidth="1" />
            <path d={`M${x + 2} 330 L${x + 2} 760 M${x + 18} 330 L${x + 18} 760`} strokeWidth="1.4" />
            {[400, 520, 640].map((yy) => (
              <g key={yy}>
                <path d={`M${x - 2} ${yy} L${x + 22} ${yy}`} strokeWidth="1" />
                <circle cx={x + 10} cy={yy + 12} r="4" strokeWidth=".9" />
                <path d={`M${x - 2} ${yy + 24} L${x + 22} ${yy + 24}`} strokeWidth="1" />
              </g>
            ))}
            <rect x={x - 12} y="760" width="44" height="12" rx="2" strokeWidth="1.4" />
            <rect x={x - 18} y="772" width="56" height="14" rx="2" strokeWidth="1.4" />
          </g>
        ))}
        {/* hanging bells */}
        {[160, 230, 370, 440].map((x, i) => {
          const yy = i === 0 || i === 3 ? 150 : 96;
          return (
            <g
              key={x}
              className="mandapam__bell"
              style={{ animationDelay: `${i * -0.8}s`, transformOrigin: `${x}px ${yy - 30}px` }}
            >
              <path d={`M${x} ${yy - 34} L${x} ${yy}`} strokeWidth=".8" />
              <path
                d={`M${x - 7} ${yy + 12} Q${x - 7} ${yy} ${x} ${yy} Q${x + 7} ${yy} ${x + 7} ${yy + 12} Z`}
                fill="#C99A45"
                stroke="none"
              />
              <circle cx={x} cy={yy + 15} r="2" fill="#C99A45" stroke="none" />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/* ── Lotus mark & dividers ──────────────────────────────────── */
export function Lotus({ className, style }: P) {
  return (
    <svg className={className} style={style} viewBox="0 0 64 40" aria-hidden="true">
      <g fill="none" stroke="url(#g-gold)" strokeWidth="1.3" strokeLinejoin="round">
        <path d="M32 4 C 40 14 40 26 32 36 C 24 26 24 14 32 4 Z" />
        <path d="M32 36 C 22 32 14 24 12 12 C 22 14 29 22 32 36 Z" />
        <path d="M32 36 C 42 32 50 24 52 12 C 42 14 35 22 32 36 Z" />
        <path d="M32 36 C 20 36 8 32 2 24 C 12 22 24 26 32 36 Z" />
        <path d="M32 36 C 44 36 56 32 62 24 C 52 22 40 26 32 36 Z" />
      </g>
    </svg>
  );
}

export function Divider({ className, style }: P) {
  return (
    <div className={`divider ${className ?? ''}`} style={style} aria-hidden="true">
      <span className="divider__line" />
      <svg viewBox="0 0 120 24" className="divider__mark">
        <g fill="url(#g-gold)">
          <path d="M60 2 L66 12 L60 22 L54 12 Z" />
          <circle cx="44" cy="12" r="2.4" />
          <circle cx="76" cy="12" r="2.4" />
          <circle cx="33" cy="12" r="1.5" />
          <circle cx="87" cy="12" r="1.5" />
        </g>
        <path d="M2 12 H28 M92 12 H118" stroke="url(#g-gold)" strokeWidth="1" />
      </svg>
      <span className="divider__line" />
    </div>
  );
}

/* ── Kolam-inspired corner flourish ─────────────────────────── */
export function Corner({ className, style }: P) {
  return (
    <svg className={`corner ${className ?? ''}`} style={style} viewBox="0 0 120 120" aria-hidden="true">
      <g fill="none" stroke="url(#g-gold)" strokeLinecap="round">
        <path d="M6 114 V6 H114" strokeWidth="1.6" />
        <path d="M14 114 V14 H114" strokeWidth=".7" />
        <path d="M14 60 C 30 60 40 50 40 34 C 40 22 30 14 22 22 C 16 28 22 38 30 34" strokeWidth="1.1" />
        <path d="M60 14 C 60 30 50 40 34 40" strokeWidth="1.1" />
        <path d="M24 24 C 36 36 46 40 60 40 C 72 40 80 34 86 26" strokeWidth=".8" opacity=".8" />
        <path d="M24 24 C 36 36 40 46 40 60 C 40 72 34 80 26 86" strokeWidth=".8" opacity=".8" />
      </g>
      <g fill="#C99A45">
        <circle cx="24" cy="24" r="3" />
        <circle cx="90" cy="24" r="1.8" />
        <circle cx="24" cy="90" r="1.8" />
        <circle cx="100" cy="14" r="1.4" />
        <circle cx="14" cy="100" r="1.4" />
      </g>
    </svg>
  );
}

/* ── Wax seal monogram ──────────────────────────────────────── */
export function WaxSeal({ initials, className, style }: P & { initials: [string, string] }) {
  const petals = Array.from({ length: 18 }, (_, i) => (i * 360) / 18);
  return (
    <svg className={className} style={style} viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <radialGradient id="g-wax" cx=".38" cy=".32" r=".75">
          <stop offset="0" stopColor="#7A4C9E" />
          <stop offset=".6" stopColor="#55307A" />
          <stop offset="1" stopColor="#321A4A" />
        </radialGradient>
      </defs>
      <g transform="translate(60 60)">
        {petals.map((a) => (
          <circle
            key={a}
            cx={Math.cos((a * Math.PI) / 180) * 47}
            cy={Math.sin((a * Math.PI) / 180) * 47}
            r="10"
            fill="url(#g-wax)"
          />
        ))}
        <circle r="48" fill="url(#g-wax)" />
        <circle r="38" fill="none" stroke="#D9B86A" strokeWidth="1.2" opacity=".9" />
        <circle r="34" fill="none" stroke="#D9B86A" strokeWidth=".5" strokeDasharray="1.5 3" opacity=".9" />
        <text x="-13" y="9" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="25" fill="#E9CF8E">
          {initials[0]}
        </text>
        <text x="13" y="9" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="25" fill="#E9CF8E">
          {initials[1]}
        </text>
        <path d="M0 -14 L0 14" stroke="#D9B86A" strokeWidth=".8" />
        <ellipse cx="-14" cy="-20" rx="12" ry="6" fill="#fff" opacity=".07" transform="rotate(-30 -14 -20)" />
      </g>
    </svg>
  );
}

/* ── Tirunamam — Lord Venkateswara's sacred mark ──────────── */
export function Namam({ className, style }: P) {
  return (
    <svg className={className} style={style} viewBox="0 0 40 48" aria-hidden="true">
      <defs>
        <linearGradient id="namam-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F3DFA2" />
          <stop offset=".55" stopColor="#C99A45" />
          <stop offset="1" stopColor="#A8792C" />
        </linearGradient>
      </defs>
      {/* U-shaped white namam rendered in gold, with the red srichurnam at its centre */}
      <path d="M6 2h7v22c0 6 3 10 7 10s7-4 7-10V2h7v22c0 11-6 18-14 18S6 35 6 24z" fill="url(#namam-gold)" />
      <path d="M17.6 4h4.8v26c0 1.6-1 2.6-2.4 2.6s-2.4-1-2.4-2.6z" fill="#B23A48" />
      <path d="M12 46h16" stroke="url(#namam-gold)" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/* ── Watercolour-style floral corner bouquet ───────────────── */
export function FloralCorner({ className, style }: P) {
  return (
    <svg className={`floral-corner ${className ?? ''}`} style={style} viewBox="0 0 200 200" aria-hidden="true">
      <g fill="none" stroke="#9FAF8F" strokeWidth="1.4" strokeLinecap="round" opacity=".85">
        <path d="M0 0 C 40 30 70 60 96 112" />
        <path d="M0 0 C 50 12 100 20 150 44" />
        <path d="M0 0 C 14 46 20 96 30 150" />
      </g>
      <g opacity=".9">
        {[
          [44, 34, -30],
          [70, 62, 20],
          [104, 28, -60],
          [26, 78, 10],
          [130, 40, -20],
          [22, 120, 30],
          [84, 92, 40],
        ].map(([x, y, r], i) => (
          <ellipse
            key={i}
            cx={x}
            cy={y}
            rx="5"
            ry="12"
            transform={`rotate(${r} ${x} ${y})`}
            fill={i % 2 ? '#B5C2A5' : '#94A884'}
          />
        ))}
      </g>
      <g className="floral-corner__sway">
        <g transform="translate(40 40)">
          <Blossom r={30} fill="url(#g-lav)" />
        </g>
        <g transform="translate(96 30)">
          <Blossom r={18} fill="url(#g-blush)" />
        </g>
        <g transform="translate(28 100)">
          <Blossom r={17} fill="url(#g-blush)" />
        </g>
        <g transform="translate(92 104)">
          <Blossom r={13} fill="url(#g-lav)" />
        </g>
        <g transform="translate(146 46)">
          <Blossom r={10} fill="url(#g-lav)" />
        </g>
        <g transform="translate(30 150)">
          <Blossom r={9} fill="url(#g-lav)" />
        </g>
        {[
          [70, 20],
          [120, 64],
          [58, 78],
          [12, 130],
          [160, 58],
          [110, 120],
          [50, 128],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 ? 2.6 : 3.4} fill="url(#g-jasmine)" />
        ))}
      </g>
    </svg>
  );
}

/* ── Hanging brass lantern with a flickering flame ─────────── */
export function HangingLantern({ className, style, drop = 90 }: P & { drop?: number }) {
  return (
    <svg className={`lantern ${className ?? ''}`} style={style} viewBox={`0 0 60 ${drop + 92}`} aria-hidden="true">
      <line x1="30" y1="0" x2="30" y2={drop} stroke="url(#g-gold-v)" strokeWidth="1.4" strokeDasharray="3 2" />
      <g transform={`translate(0 ${drop})`}>
        <circle cx="30" cy="4" r="4" fill="none" stroke="url(#g-gold)" strokeWidth="1.6" />
        <path d="M14 18 Q30 2 46 18 Z" fill="url(#g-gold)" />
        <rect x="16" y="18" width="28" height="4" rx="1.5" fill="url(#g-gold-v)" />
        <path d="M17 22 L43 22 L40 62 L20 62 Z" fill="#FFF3D6" opacity=".55" />
        <circle className="lantern__glow" cx="30" cy="44" r="24" fill="url(#g-glow)" />
        <path className="lantern__flame" d="M30 32 C 35 40 35 46 30 52 C 25 46 25 40 30 32 Z" fill="url(#g-flame)" />
        <path d="M17 22 L20 62 M43 22 L40 62 M30 22 L30 30" stroke="url(#g-gold)" strokeWidth="1.6" fill="none" />
        <rect x="16" y="62" width="28" height="5" rx="2" fill="url(#g-gold-v)" />
        <path d="M22 67 L38 67 L30 80 Z" fill="url(#g-gold)" />
        <circle cx="30" cy="86" r="3" fill="url(#g-gold)" />
      </g>
    </svg>
  );
}

/* ── Lord Ganesha line art, shown above the invocation ─────── */
export function Ganesha({ className, style }: P) {
  return (
    <img
      className={className}
      style={style}
      src={asset('images/ganesha.png')}
      alt=""
      aria-hidden="true"
      width={294}
      height={348}
      decoding="async"
    />
  );
}

/* ── Floral sprig tucked behind the envelope's wax seal ────── */
export function SealSprig({ className, style }: P) {
  const leaves: [number, number, number][] = [
    [34, 58, -64],
    [52, 40, -40],
    [126, 58, 64],
    [108, 40, 40],
    [80, 22, 0],
    [24, 80, -86],
    [136, 80, 86],
  ];
  return (
    <svg className={className} style={style} viewBox="0 0 160 120" aria-hidden="true">
      <g stroke="#9FAF8F" strokeWidth="1.3" fill="none" strokeLinecap="round">
        <path d="M80 92 C 60 70 40 60 18 56" />
        <path d="M80 92 C 100 70 120 60 142 56" />
        <path d="M80 92 C 78 60 80 40 80 14" />
      </g>
      {leaves.map(([x, y, r], i) => (
        <ellipse
          key={i}
          cx={x}
          cy={y}
          rx="5"
          ry="13"
          transform={`rotate(${r} ${x} ${y})`}
          fill={i % 2 ? '#B5C2A5' : '#94A884'}
        />
      ))}
      <g transform="translate(30 50)">
        <Blossom r={13} fill="url(#g-lav)" />
      </g>
      <g transform="translate(130 50)">
        <Blossom r={13} fill="url(#g-blush)" />
      </g>
      <g transform="translate(56 30)">
        <Blossom r={9} fill="url(#g-blush)" />
      </g>
      <g transform="translate(104 30)">
        <Blossom r={9} fill="url(#g-lav)" />
      </g>
      <g transform="translate(80 12)">
        <Blossom r={8} fill="url(#g-lav)" />
      </g>
      {[
        [14, 66],
        [146, 66],
        [44, 20],
        [116, 20],
        [66, 14],
        [94, 14],
        [20, 40],
        [140, 40],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 2 ? 2.4 : 3} fill="url(#g-jasmine)" />
      ))}
    </svg>
  );
}
