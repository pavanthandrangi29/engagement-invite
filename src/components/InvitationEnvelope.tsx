import { useEffect, useRef, useState } from 'react';
import { weddingConfig as c } from '../data/weddingConfig';
import { Corner, Divider, Lotus, WaxSeal } from './Ornaments';

type Props = { onOpen: () => void };

const OPEN_DURATION = 2600;

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
      <div className="envelope-screen__pattern" aria-hidden="true" />
      <div className="envelope-screen__glow" aria-hidden="true" />

      <div className="envelope-stage">
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

          {/* Front pocket carries the title */}
          <div className="envelope__pocket">
            <svg className="envelope__folds" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0 0 L50 46 L100 0" />
            </svg>
            <div className="envelope__front-frame">
              <Corner className="corner--tl" />
              <Corner className="corner--tr" />
              <Corner className="corner--bl" />
              <Corner className="corner--br" />
            </div>
            <div className="envelope__front-text">
              {c.invocation && <p className="envelope__invocation">{c.invocation}</p>}
              <h1 id="env-title" className="envelope__title">
                {c.familyTitle}
              </h1>
              <Divider className="divider--sm" />
              <p className="envelope__tagline">{c.tagline}</p>
              <p className="envelope__event">{c.eventType}</p>
            </div>
          </div>

          <div className="envelope__flap">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              <polygon points="0,0 100,0 50,100" className="envelope__flap-fill" />
              <polyline points="0,0 50,100 100,0" className="envelope__flap-edge" />
              <polyline points="6,0 50,88 94,0" className="envelope__flap-edge envelope__flap-edge--inner" />
            </svg>
          </div>

          <WaxSeal className="envelope__seal" initials={[c.groom.name[0], c.bride.name[0]]} />
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
