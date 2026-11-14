import type { CSSProperties } from 'react';

/**
 * Artwork for the opening screen: wisteria, lilies, the temple arch,
 * an organic wax seal, fine leaf line-art and gold swooshes.
 * Gradients like #g-gold / #g-lav / #g-jasmine come from <OrnamentDefs />.
 */

type P = { className?: string; style?: CSSProperties };

const mix = (a: number[], b: number[], t: number) =>
  `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(',')})`;
const LIGHT = [240, 230, 250];
const MID = [196, 168, 226];
const DEEP = [132, 98, 180];

/* ── Hanging wisteria (top-left; mirror with CSS for the right) ── */
const RACEMES: [number, number, number, number][] = [
  // x, top y, florets, scale
  [14, 24, 20, 1],
  [40, 20, 26, 1.12],
  [66, 16, 15, 0.9],
  [92, 14, 23, 1.06],
  [122, 12, 12, 0.85],
  [150, 10, 19, 1],
  [182, 8, 9, 0.8],
  [208, 7, 14, 0.9],
];

export function Wisteria({ className, style }: P) {
  return (
    <svg className={`wisteria ${className ?? ''}`} style={style} viewBox="0 0 230 320" aria-hidden="true">
      <path d="M-6 26 C 50 14 120 10 236 4" fill="none" stroke="#8C7A5E" strokeWidth="3" strokeLinecap="round" />
      <path d="M40 18 C 60 30 70 34 92 30" fill="none" stroke="#8C7A5E" strokeWidth="1.6" strokeLinecap="round" />
      {RACEMES.map(([x, y0, n, k], ri) => (
        <g
          key={ri}
          className="wisteria__raceme"
          style={{ animationDelay: `${-ri * 0.9}s`, transformOrigin: `${x}px ${y0}px` }}
        >
          {Array.from({ length: n }, (_, i) => {
            const t = i / (n - 1);
            const r = (8.2 - t * 5.4) * k;
            const yy = y0 + 6 + i * 7.2 * k;
            const sway = Math.sin(i * 0.7 + ri) * 1.6;
            const c = t < 0.5 ? mix(LIGHT, MID, t * 2) : mix(MID, DEEP, (t - 0.5) * 2);
            const side = i % 2 ? 1 : -1;
            return (
              <g key={i}>
                <ellipse
                  cx={x + sway + side * r * 0.55}
                  cy={yy}
                  rx={r * 0.78}
                  ry={r * 0.6}
                  transform={`rotate(${side * 18} ${x + sway + side * r * 0.55} ${yy})`}
                  fill={c}
                />
                <ellipse
                  cx={x + sway - side * r * 0.5}
                  cy={yy + 2.4}
                  rx={r * 0.7}
                  ry={r * 0.56}
                  fill={c}
                  opacity=".92"
                />
                <circle cx={x + sway + side * r * 0.35} cy={yy - 1.4} r={r * 0.2} fill="#fff" opacity=".6" />
              </g>
            );
          })}
        </g>
      ))}
      {[
        [26, 22, -30],
        [54, 15, 20],
        [80, 13, -20],
        [106, 11, 30],
        [136, 9, -24],
        [166, 7, 26],
        [196, 6, -18],
        [222, 5, 22],
      ].map(([x, y, r], i) => (
        <ellipse
          key={i}
          cx={x}
          cy={y}
          rx="4.6"
          ry="12"
          transform={`rotate(${r + 90} ${x} ${y})`}
          fill={i % 2 ? '#A9B79A' : '#8FA37E'}
        />
      ))}
    </svg>
  );
}

/* ── Lily & lavender bouquet (bottom-left; mirror for the right) ── */
function Lily({ x, y, s, rot }: { x: number; y: number; s: number; rot: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      {[0, 60, 120, 180, 240, 300].map((a, i) => (
        <path
          key={a}
          d="M0 0 C 9 -14 9 -34 0 -50 C -9 -34 -9 -14 0 0 Z"
          transform={`rotate(${a})`}
          fill={i % 2 ? '#FBF7FB' : 'url(#g-lily)'}
          stroke="#E6D9E9"
          strokeWidth=".6"
        />
      ))}
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <path key={a} d="M0 -6 L0 -30" transform={`rotate(${a})`} stroke="#E9C9DA" strokeWidth=".8" opacity=".7" />
      ))}
      {[-20, 0, 20, 40, -40].map((a) => (
        <g key={a} transform={`rotate(${a})`}>
          <line x1="0" y1="0" x2="0" y2="-22" stroke="#B5A26A" strokeWidth=".9" />
          <ellipse cx="0" cy="-23" rx="1.6" ry="3" fill="#C9862E" />
        </g>
      ))}
      <circle r="4" fill="#E7D7A8" />
    </g>
  );
}

function LavenderSprig({ x, y, len, rot }: { x: number; y: number; len: number; rot: number }) {
  const buds = Math.round(len / 9);
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <path d={`M0 0 Q 4 ${-len / 2} 0 ${-len}`} stroke="#8FA37E" strokeWidth="1.4" fill="none" />
      {Array.from({ length: buds }, (_, i) => {
        const yy = -len * 0.35 - i * ((len * 0.65) / buds);
        const r = 3.6 - (i / buds) * 1.8;
        return (
          <g key={i}>
            <ellipse cx={-2.4} cy={yy} rx={r * 0.7} ry={r} transform={`rotate(-25 -2.4 ${yy})`} fill="url(#g-lav)" />
            <ellipse
              cx={2.4}
              cy={yy - 3}
              rx={r * 0.7}
              ry={r}
              transform={`rotate(25 2.4 ${yy - 3})`}
              fill="url(#g-lav)"
            />
          </g>
        );
      })}
    </g>
  );
}

export function LilyBouquet({ className, style }: P) {
  return (
    <svg className={`bouquet ${className ?? ''}`} style={style} viewBox="0 0 240 230" aria-hidden="true">
      <defs>
        <radialGradient id="g-lily" cx=".5" cy=".9" r=".9">
          <stop offset="0" stopColor="#F4DCE8" />
          <stop offset=".45" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#F5EEF5" />
        </radialGradient>
      </defs>
      <g className="bouquet__sway">
        {[
          [20, 230, -12, 70, 9],
          [40, 230, 20, 60, 8],
          [70, 230, 50, 72, 9],
          [0, 200, 30, 54, 7],
        ].map(([x, y, r, ry, rx], i) => (
          <ellipse
            key={i}
            cx={x}
            cy={y - ry}
            rx={rx}
            ry={ry}
            transform={`rotate(${r} ${x} ${y})`}
            fill={i % 2 ? '#A9B79A' : '#8FA37E'}
            opacity=".9"
          />
        ))}
        <LavenderSprig x={10} y={230} len={150} rot={8} />
        <LavenderSprig x={30} y={230} len={120} rot={28} />
        <LavenderSprig x={60} y={230} len={100} rot={52} />
        <LavenderSprig x={0} y={210} len={90} rot={-6} />
        <LavenderSprig x={90} y={232} len={80} rot={70} />
        <path d="M30 230 C 40 200 50 175 62 160" stroke="#8FA37E" strokeWidth="2" fill="none" />
        <Lily x={70} y={160} s={1} rot={-20} />
        <Lily x={128} y={204} s={0.62} rot={30} />
        {[
          [110, 150],
          [150, 176],
          [44, 120],
          [96, 120],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={i % 2 ? 2.4 : 3} fill="url(#g-jasmine)" />
        ))}
      </g>
    </svg>
  );
}

/* ── Scalloped temple arch that frames the header ─────────── */
const ARCH =
  'M8 300 V150 Q8 122 36 118 Q58 114 66 98 Q76 80 102 78 Q130 76 140 56 Q150 36 176 31 Q195 27 200 2 Q205 27 224 31 Q250 36 260 56 Q270 76 298 78 Q324 80 334 98 Q342 114 364 118 Q392 122 392 150 V300';

export function TempleArch({ className, style }: P) {
  return (
    <svg className={className} style={style} viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <radialGradient id="g-arch-fill" cx=".5" cy=".3" r=".8">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity=".85" />
          <stop offset=".6" stopColor="#FFFBFD" stopOpacity=".5" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d={ARCH} fill="url(#g-arch-fill)" />
      <path className="arch__line" d={ARCH} pathLength={1} fill="none" stroke="url(#g-gold)" strokeWidth="1.8" />
      <path
        className="arch__line arch__line--inner"
        d={ARCH}
        pathLength={1}
        fill="none"
        stroke="url(#g-gold)"
        strokeWidth=".7"
        transform="translate(10 12) scale(.95 .96)"
        opacity=".6"
      />
    </svg>
  );
}

/* ── Organic wax seal with monogram and lotus ─────────────── */
const blob = (() => {
  const pts: string[] = [];
  for (let i = 0; i <= 72; i++) {
    const a = (i / 72) * Math.PI * 2;
    const r = 52 + 2.6 * Math.sin(5 * a) + 1.8 * Math.sin(9 * a + 1) + 1.2 * Math.sin(14 * a + 2);
    pts.push(`${(60 + Math.cos(a) * r).toFixed(1)} ${(60 + Math.sin(a) * r).toFixed(1)}`);
  }
  return `M${pts.join(' L')} Z`;
})();

export function OrganicSeal({ initials, className, style }: P & { initials: [string, string] }) {
  return (
    <svg className={className} style={style} viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <radialGradient id="g-seal" cx=".38" cy=".3" r=".85">
          <stop offset="0" stopColor="#9A6CC4" />
          <stop offset=".55" stopColor="#6A3D8F" />
          <stop offset="1" stopColor="#40205C" />
        </radialGradient>
        <radialGradient id="g-seal-in" cx=".4" cy=".35" r=".8">
          <stop offset="0" stopColor="#8A5DB6" />
          <stop offset="1" stopColor="#552E79" />
        </radialGradient>
      </defs>
      <path d={blob} fill="url(#g-seal)" />
      <circle cx="60" cy="60" r="38" fill="url(#g-seal-in)" />
      <circle cx="60" cy="60" r="38" fill="none" stroke="#3A1D52" strokeWidth="2" opacity=".35" />
      <circle cx="60" cy="60" r="34" fill="none" stroke="#E2C47A" strokeWidth="1.1" />
      <text x="47" y="62" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="20" fill="#F1DDA6">
        {initials[0]}
      </text>
      <text x="73" y="62" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="20" fill="#F1DDA6">
        {initials[1]}
      </text>
      <path d="M60 44 V64" stroke="#E2C47A" strokeWidth=".9" />
      <g transform="translate(60 76) scale(.42)" fill="none" stroke="#E2C47A" strokeWidth="2.2">
        <path d="M0 -14 C 6 -6 6 2 0 10 C -6 2 -6 -6 0 -14 Z" />
        <path d="M0 10 C -8 7 -14 0 -15 -8 C -7 -6 -2 1 0 10 Z" />
        <path d="M0 10 C 8 7 14 0 15 -8 C 7 -6 2 1 0 10 Z" />
      </g>
      <ellipse cx="44" cy="34" rx="16" ry="7" fill="#fff" opacity=".12" transform="rotate(-30 44 34)" />
    </svg>
  );
}

/* ── Fine leaf line-art for the envelope's upper corners ──── */
export function LeafLine({ className, style }: P) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 110" aria-hidden="true">
      <g fill="none" stroke="#CDB98F" strokeWidth=".9" strokeLinecap="round" opacity=".75">
        <path d="M6 104 C 20 70 40 40 86 8" />
        {[
          [22, 74, -40],
          [34, 56, -50],
          [48, 40, -55],
          [62, 28, -60],
          [74, 18, -66],
          [28, 70, 40],
          [42, 52, 30],
          [58, 36, 24],
        ].map(([x, y, r], i) => (
          <path key={i} d={`M${x} ${y} c 6 -6 14 -6 18 -2 c -6 6 -14 6 -18 2 z`} transform={`rotate(${r} ${x} ${y})`} />
        ))}
      </g>
    </svg>
  );
}

/* ── Gold swooshes along the bottom ───────────────────────── */
export function GoldSwoosh({ className, style }: P) {
  return (
    <svg className={className} style={style} viewBox="0 0 400 90" preserveAspectRatio="none" aria-hidden="true">
      <path
        className="swoosh__line"
        pathLength={1}
        d="M-10 70 C 80 30 150 86 230 56 C 300 30 350 40 410 22"
        fill="none"
        stroke="url(#g-gold)"
        strokeWidth="1.4"
      />
      <path
        className="swoosh__line swoosh__line--2"
        pathLength={1}
        d="M-10 84 C 90 52 170 96 250 70 C 320 48 360 56 410 40"
        fill="none"
        stroke="url(#g-gold)"
        strokeWidth=".8"
        opacity=".7"
      />
    </svg>
  );
}
