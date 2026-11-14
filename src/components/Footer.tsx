import { weddingConfig as c } from '../data/weddingConfig';
import { Divider, FallingPetals, FloralCorner, Lotus, Toran } from './Ornaments';

/** Final blessings + footer, with drifting petals. */
export default function Footer() {
  const k = c.closing;
  return (
    <footer className="blessings" id="blessings" aria-labelledby="blessings-title">
      <Toran className="blessings__toran" count={21} />
      <FallingPetals className="blessings__petals" />

      <div className="blessings__inner" data-reveal>
        <FloralCorner className="blessings__flora blessings__flora--tl" />
        <FloralCorner className="blessings__flora blessings__flora--br" />
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
