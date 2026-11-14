import { weddingConfig as c } from '../data/weddingConfig';
import { Corner, Divider, Lotus } from './Ornaments';

export default function FamilyInvitation() {
  const f = c.familyInvitation;
  return (
    <section className="section family" id="invitation" aria-labelledby="family-title">
      <div className="family__card" data-reveal>
        <Corner className="corner--tl" />
        <Corner className="corner--tr" />
        <Corner className="corner--bl" />
        <Corner className="corner--br" />

        <div className="family__inner">
          <Lotus className="family__lotus" />
          <p className="family__eyebrow" id="family-title">
            {f.eyebrow}
          </p>
          <Divider className="divider--sm" />
          <p className="family__hosts">
            <span>{c.hosts[0]}</span>
            <span className="family__and">and</span>
            <span>{c.hosts[1]}</span>
          </p>
          <p className="family__request">{f.request}</p>
          <p className="family__couple">
            {c.groom.name.toUpperCase()} <span className="amp">&amp;</span> {c.bride.name.toUpperCase()}
          </p>
          <Divider className="divider--sm" />
          <p className="family__closing">{f.closing}</p>
        </div>
      </div>
    </section>
  );
}
