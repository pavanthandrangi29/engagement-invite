import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { weddingConfig as c } from '../data/weddingConfig';
import { GoldSwoosh, LeafLine, LilyBouquet, OrganicSeal, TempleArch, FloralSpray } from './EnvelopeArt';
import { Corner, FallingPetals, Ganesha, HangingLantern, Lotus } from './Ornaments';

type Props = { onOpen: () => void };

const OPEN_DURATION = 3000;
const BURST = 26;

/** Fixed twinkle positions (percent of the screen) so the layout is stable. */
const SPARKLES: [number, number, number][] = [
  [12, 30, 0],
  [86, 26, 1.2],
  [8, 58, 2.1],
  [92, 52, 0.6],
  [20, 82, 1.7],
  [80, 80, 2.6],
  [50, 6, 0.9],
  [30, 46, 3.1],
  [70, 44, 1.5],
  [62, 92, 2.3],
];

export default function InvitationEnvelope({ onOpen }: Props) {
  const [phase, setPhase] = useState<'closed' | 'opening' | 'leaving'>('closed');
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    btnRef.current?.focus({ preventScroll: true });
  }, []);

  const open = () => {
    if (phase !== 'closed') return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setPhase('opening');
    window.setTimeout(() => setPhase('leaving'), reduce ? 50 : OPEN_DURATION - 700);
    window.setTimeout(onOpen, reduce ? 300 : OPEN_DURATION);
  };

  return (
    <div className={`envelope-screen is-${phase}`} role="dialog" aria-modal="true" aria-labelledby="env-title">
      <div className="envelope-screen__glow" aria-hidden="true" />

      <FloralSpray className="envelope-screen__spray envelope-screen__spray--l" />
      <FloralSpray className="envelope-screen__spray envelope-screen__spray--r" />
      <HangingLantern className="envelope-screen__lantern envelope-screen__lantern--l" drop={70} />
      <HangingLantern className="envelope-screen__lantern envelope-screen__lantern--r" drop={150} />
      <LilyBouquet className="envelope-screen__bouquet envelope-screen__bouquet--l" />
      <LilyBouquet className="envelope-screen__bouquet envelope-screen__bouquet--r" />
      <GoldSwoosh className="envelope-screen__swoosh" />
      <div className="envelope-screen__sparkles" aria-hidden="true">
        {SPARKLES.map(([x, y, d], i) => (
          <span key={i} className="sparkle" style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${d}s` }} />
        ))}
      </div>
      <FallingPetals className="envelope-screen__petals" count={10} />

      <div className="envelope-stage">
        <header className="envelope-intro">
          <TempleArch className="envelope-intro__arch" />
          {c.invocation && (
            <>
              <Ganesha className="envelope-intro__mark" />
              <p className="envelope-intro__invocation">{c.invocation}</p>
            </>
          )}
          <div className="envelope-intro__rule" aria-hidden="true">
            <span />
            <Lotus className="envelope-intro__lotus" />
            <span />
          </div>
          <p className="envelope-intro__eyebrow">
            You’re invited to the
            <br />
            engagement of
          </p>
        </header>

        <div className="envelope" onClick={open} aria-hidden="true">
          <div className="envelope__back" />

          {/* Inner card that rises out on open */}
          <div className="envelope__card">
            <div className="envelope__card-inner">
              <Lotus className="envelope__card-lotus" />
              <p className="envelope__card-eyebrow">{c.heroEyebrow}</p>
              <p className="envelope__card-names">
                {c.groom.name}
                <span className="amp">&amp;</span>
                {c.bride.name}
              </p>
              <p className="envelope__card-date">{c.event.dateFull}</p>
            </div>
          </div>

          {/* Front pocket carries the names */}
          <div className="envelope__pocket">
            <svg className="envelope__folds" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 0 L50 40 L100 0" />
            </svg>
            <LeafLine className="envelope__leaves envelope__leaves--l" />
            <LeafLine className="envelope__leaves envelope__leaves--r" />
            <div className="envelope__front-frame">
              <Corner className="corner--tl" />
              <Corner className="corner--tr" />
              <Corner className="corner--bl" />
              <Corner className="corner--br" />
            </div>
            <div className="envelope__front-text">
              <h1 id="env-title" className="envelope__names">
                {c.groom.name}
                <span className="envelope__amp">&amp;</span>
                {c.bride.name}
              </h1>
              <div className="envelope__rule" aria-hidden="true">
                <span />
                <i />
                <span />
              </div>
              <p className="envelope__family">{c.familyTitle}</p>
              <p className="envelope__event">{c.eventType}</p>
            </div>
          </div>

          <div className="envelope__flap">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="g-liner" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#E9DCF5" />
                  <stop offset="1" stopColor="#CDB6E6" />
                </linearGradient>
                {/* tiny white blossoms printed on the lavender liner */}
                <pattern id="p-liner" width="7" height="7" patternUnits="userSpaceOnUse">
                  <g fill="#fff" opacity=".6">
                    <circle cx="3.5" cy="2.4" r=".75" />
                    <circle cx="2.4" cy="3.6" r=".75" />
                    <circle cx="4.6" cy="3.6" r=".75" />
                    <circle cx="3.5" cy="4.6" r=".75" />
                  </g>
                  <circle cx="3.5" cy="3.5" r=".5" fill="#E2C47A" />
                </pattern>
              </defs>
              <polygon points="0,0 100,0 50,100" fill="url(#g-liner)" />
              <polygon points="0,0 100,0 50,100" fill="url(#p-liner)" />
              <polygon points="6,0 94,0 50,86" className="envelope__flap-fill" />
              <polyline points="0,0 50,100 100,0" className="envelope__flap-edge" />
              <polyline points="6,0 50,86 94,0" className="envelope__flap-edge envelope__flap-edge--inner" />
              <polyline points="10,0 50,79 90,0" className="envelope__flap-stitch" />
            </svg>
          </div>

          <OrganicSeal className="envelope__seal" initials={[c.groom.name[0], c.bride.name[0]]} />

          {/* Petal burst on open */}
          <div className="env-burst" aria-hidden="true">
            {Array.from({ length: BURST }, (_, i) => {
              const a = (i / BURST) * Math.PI * 2;
              const d = 110 + (i % 4) * 45;
              return (
                <span
                  key={i}
                  className={`env-burst__petal env-burst__petal--${i % 3}`}
                  style={
                    {
                      '--bx': `${Math.cos(a) * d}px`,
                      '--by': `${Math.sin(a) * d - 60}px`,
                      '--br': `${(i * 67) % 360}deg`,
                      animationDelay: `${0.25 + (i % 4) * 0.05}s`,
                    } as CSSProperties
                  }
                />
              );
            })}
          </div>
        </div>

        <button ref={btnRef} type="button" className="btn envelope__cta" onClick={open} disabled={phase !== 'closed'}>
          <span>Open Invitation</span>
          <svg className="envelope__cta-arrow" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M4 12h15M13 6l6 6-6 6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <p className="envelope__hint">Tap the seal to open</p>
      </div>
    </div>
  );
}
