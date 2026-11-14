import type { CSSProperties } from 'react';
import { weddingConfig as c } from '../data/weddingConfig';
import { Divider, Lotus, Toran } from './Ornaments';

/** Final blessings + footer, with falling jasmine. */
export default function Footer() {
  const k = c.closing;
  const petals = Array.from({ length: 16 }, (_, i) => i);
  return (
    <footer className="blessings" id="blessings" aria-labelledby="blessings-title">
      <Toran className="blessings__toran" count={21} />
      <div className="blessings__petals" aria-hidden="true">
        {petals.map((i) => (
          <span
            key={i}
            className="petal"
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

      <div className="blessings__inner" data-reveal>
        <Lotus className="blessings__lotus" />
        <h2 className="blessings__title" id="blessings-title">
          {k.headingLines.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </h2>
        <Divider />
        {k.body.map((p) => (
          <p key={p} className="blessings__body">
            {p}
          </p>
        ))}
        <p className="blessings__signoff">{k.signOff}</p>
        <p className="blessings__signature">{k.signature}</p>
      </div>

      <div className="blessings__foot">
        <span>{c.familyTitle}</span>
        <span aria-hidden="true">◆</span>
        <span>
          {c.groom.name} &amp; {c.bride.name}
        </span>
        <span aria-hidden="true">◆</span>
        <span>22 · 11 · 2026</span>
      </div>
    </footer>
  );
}
