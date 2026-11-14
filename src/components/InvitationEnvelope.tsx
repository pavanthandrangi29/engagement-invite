import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { weddingConfig as c } from '../data/weddingConfig';
import {
  Corner,
  Divider,
  FallingPetals,
  FloralCorner,
  HangingLantern,
  Lotus,
  Namam,
  Toran,
  WaxSeal,
} from './Ornaments';

type Props = { onOpen: () => void };

const OPEN_DURATION = 3000;
const BURST = 26;

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
      <Toran className="envelope-screen__garland" count={15} />
      <HangingLantern className="envelope-screen__lantern envelope-screen__lantern--l" drop={60} />
      <HangingLantern className="envelope-screen__lantern envelope-screen__lantern--r" drop={110} />
      <FloralCorner className="envelope-screen__flora envelope-screen__flora--tl" />
      <FloralCorner className="envelope-screen__flora envelope-screen__flora--br" />
      <FallingPetals className="envelope-screen__petals" count={14} />

      <div className="envelope-stage">
        <header className="envelope-intro">
          {c.invocation && (
            <>
              <Namam className="envelope-intro__mark" />
              <p className="envelope-intro__invocation">{c.invocation}</p>
            </>
          )}
          <p className="envelope-intro__eyebrow">You’re invited to the engagement of</p>
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
              <path d="M0 0 L50 46 L100 0" />
            </svg>
            <div className="envelope__front-frame">
              <Corner className="corner--bl" />
              <Corner className="corner--br" />
            </div>
            <div className="envelope__front-text">
              <h1 id="env-title" className="envelope__names">
                {c.groom.name}
                <span className="envelope__amp">&amp;</span>
                {c.bride.name}
              </h1>
              <Divider className="divider--sm" />
              <p className="envelope__event">{c.eventType}</p>
              <p className="envelope__family">{c.familyTitle}</p>
            </div>
          </div>

          <div className="envelope__flap">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="g-liner" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#E9DCF5" />
                  <stop offset="1" stopColor="#CDB6E6" />
                </linearGradient>
              </defs>
              <polygon points="0,0 100,0 50,100" fill="url(#g-liner)" />
              <polygon points="5,0 95,0 50,88" className="envelope__flap-fill" />
              <polyline points="0,0 50,100 100,0" className="envelope__flap-edge" />
              <polyline points="5,0 50,88 95,0" className="envelope__flap-edge envelope__flap-edge--inner" />
            </svg>
          </div>

          <WaxSeal className="envelope__seal" initials={[c.groom.name[0], c.bride.name[0]]} />

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

        <button
          ref={btnRef}
          type="button"
          className="btn btn--gold envelope__cta"
          onClick={open}
          disabled={phase !== 'closed'}
        >
          <span>Open Invitation</span>
        </button>
        <p className="envelope__hint">Tap the seal to open</p>
      </div>
    </div>
  );
}
