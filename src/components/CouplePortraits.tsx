import { weddingConfig as c } from '../data/weddingConfig';
import { asset } from '../lib/links';
import { Corner, JasmineStrand } from './Ornaments';
import SectionHeading from './SectionHeading';

export default function CouplePortraits() {
  const art = c.coupleIllustration;
  return (
    <section className="section couple" id="couple" aria-labelledby="couple-title">
      <SectionHeading numeral="I" eyebrow="Meet the couple" title="The Couple" id="couple-title" />
      <figure className="couple-art" data-reveal>
        <div className="couple-art__frame">
          <JasmineStrand className="couple-art__jasmine couple-art__jasmine--l" length={9} />
          <JasmineStrand className="couple-art__jasmine couple-art__jasmine--r" length={9} />
          <div className="couple-art__arch">
            <img
              src={asset(art.src)}
              srcSet={`${asset(art.srcSmall)} 720w, ${asset(art.src)} ${art.width}w`}
              sizes="(min-width: 960px) 880px, 92vw"
              alt={art.alt}
              width={art.width}
              height={art.height}
              loading="lazy"
              decoding="async"
            />
          </div>
          <Corner className="portrait__corner portrait__corner--bl" />
          <Corner className="portrait__corner portrait__corner--br" />
        </div>
        <figcaption className="couple-art__names">
          <span className="couple-art__person">
            <span className="portrait__role">The Groom-to-be</span>
            <span className="portrait__name">{c.groom.name}</span>
          </span>
          <span className="couple__amp" aria-hidden="true">
            &amp;
          </span>
          <span className="couple-art__person">
            <span className="portrait__role">The Bride-to-be</span>
            <span className="portrait__name">{c.bride.name}</span>
          </span>
        </figcaption>
      </figure>
    </section>
  );
}
