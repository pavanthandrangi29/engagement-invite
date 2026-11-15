import type { CSSProperties } from 'react';

/**
 * Artwork for the opening screen: floral sprays, lilies, the temple arch,
 * an organic wax seal, fine leaf line-art and gold swooshes.
 * Gradients like #g-gold / #g-lav / #g-jasmine come from <OrnamentDefs />.
 */

type P = { className?: string; style?: CSSProperties };

/* ── Cascading floral spray (top-left; mirror with CSS for the right) ── */
function Peony({ r, tone }: { r: number; tone: 'lav' | 'blush' }) {
  const outer = tone === 'lav' ? 'url(#g-lav)' : 'url(#g-blush)';
  const inner = tone === 'lav' ? '#EADCF7' : '#FCE6EF';
  const rings: [number, number, number, string][] = [
    // petals, distance, size, fill
    [8, 0.62, 0.5, outer],
    [7, 0.4, 0.42, inner],
    [5, 0.18, 0.3, outer],
  ];
  return (
    <g className="spray__bloom">
      {rings.map(([n, d, sz, fill], ri) =>
        Array.from({ length: n }, (_, i) => {
          const a = (i / n) * 360 + ri * 22;
          return (
            <ellipse
              key={`${ri}-${i}`}
              cx="0"
              cy={-r * d}
              rx={r * sz * 0.85}
              ry={r * sz}
              transform={`rotate(${a})`}
              fill={fill}
              stroke="#fff"
              strokeWidth=".5"
              strokeOpacity=".6"
            />
          );
        }),
      )}
      <circle r={r * 0.14} fill="url(#g-gold)" />
    </g>
  );
}

function Leaf({ x, y, r, s = 1, light }: { x: number; y: number; r: number; s?: number; light?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d="M0 0 C 8 -8 22 -8 32 0 C 22 8 8 8 0 0 Z" fill={light ? '#B9C6A8' : '#93A882'} />
      <path d="M2 0 L 28 0" stroke="#7E9470" strokeWidth=".6" opacity=".6" />
    </g>
  );
}

export function FloralSpray({ className, style }: P) {
  return (
    <svg className={`spray ${className ?? ''}`} style={style} viewBox="0 0 240 260" aria-hidden="true">
      <g className="spray__branch">
        <path
          d="M-4 6 C 50 20 90 40 118 86 C 134 112 140 150 136 196"
          fill="none"
          stroke="#8C7A5E"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M60 22 C 110 24 160 18 214 4" fill="none" stroke="#8C7A5E" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M100 60 C 72 92 56 126 52 170" fill="none" stroke="#8C7A5E" strokeWidth="1.2" strokeLinecap="round" />
        <Leaf x={30} y={14} r={20} />
        <Leaf x={84} y={36} r={50} light />
        <Leaf x={120} y={98} r={110} s={0.9} />
        <Leaf x={132} y={150} r={70} light s={0.8} />
        <Leaf x={150} y={18} r={-20} s={0.9} />
        <Leaf x={190} y={9} r={-30} light s={0.8} />
        <Leaf x={70} y={120} r={120} s={0.8} light />
        <Leaf x={58} y={20} r={-150} s={0.7} />

        <g transform="translate(46 30)">
          <Peony r={30} tone="lav" />
        </g>
        <g transform="translate(108 64)">
          <Peony r={22} tone="blush" />
        </g>
        <g transform="translate(136 130)">
          <Peony r={17} tone="lav" />
        </g>
        <g transform="translate(170 18)">
          <Peony r={15} tone="blush" />
        </g>
        <g transform="translate(58 150)">
          <Peony r={13} tone="blush" />
        </g>
        <g transform="translate(138 196)">
          <Peony r={10} tone="lav" />
        </g>
        {[
          [214, 6, 'lav'],
          [52, 176, 'lav'],
          [92, 104, 'blush'],
          [16, 52, 'blush'],
        ].map(([x, y, t], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <ellipse rx="4.5" ry="6.5" fill={t === 'lav' ? 'url(#g-lav)' : 'url(#g-blush)'} />
            <path d="M-4 3 Q0 9 4 3" fill="#93A882" />
          </g>
        ))}
        {[
          [24, 74],
          [86, 12],
          [128, 36],
          [158, 100],
          [100, 150],
          [196, 30],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 2 ? 2.2 : 2.8} fill="url(#g-jasmine)" />
        ))}
      </g>
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
      <text x="40" y="62" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="19" fill="#F1DDA6">
        {initials[0]}
      </text>
      <text x="80" y="62" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="19" fill="#F1DDA6">
        {initials[1]}
      </text>
      {/* infinity between the initials */}
      <path
        d="M60 55 C 56.5 50 50 50 50 55 C 50 60 56.5 60 60 55 C 63.5 50 70 50 70 55 C 70 60 63.5 60 60 55 Z"
        fill="none"
        stroke="#E2C47A"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
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
