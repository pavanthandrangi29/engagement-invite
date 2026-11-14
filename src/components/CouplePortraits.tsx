import { weddingConfig as c } from '../data/weddingConfig';
import { asset } from '../lib/links';
import { Corner, JasmineStrand } from './Ornaments';
import SectionHeading from './SectionHeading';

/**
 * Animated overlay on the still illustration: a gold ring drifts in,
 * slips onto the bride's finger where the couple's hands meet, then
 * sparkles and releases a few hearts. Pure CSS, loops gently.
 */
function RingMoment() {
  return (
    <div className="ring-fx" aria-hidden="true">
      <span className="ring-fx__glow" />
      <svg className="ring-fx__ring" viewBox="0 0 48 48">
        <defs>
          <linearGradient id="ring-band" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#FFF1C2" />
            <stop offset=".45" stopColor="#D9A94E" />
            <stop offset=".75" stopColor="#A8792C" />
            <stop offset="1" stopColor="#F3D88E" />
          </linearGradient>
        </defs>
        <ellipse cx="24" cy="30" rx="14" ry="12" fill="none" stroke="url(#ring-band)" strokeWidth="4.2" />
        <path d="M24 6l6 7-6 6-6-6z" fill="#F4F0FF" stroke="#C9AEE3" strokeWidth="1" />
        <path d="M18 13h12M24 6v13" stroke="#fff" strokeWidth=".7" opacity=".8" />
      </svg>
      <svg className="ring-fx__burst" viewBox="0 0 60 60">
        <g fill="#FFE9A8">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <path key={a} d="M30 4l2 18-2 4-2-4z" transform={`rotate(${a} 30 30)`} opacity={a % 90 ? 0.6 : 1} />
          ))}
        </g>
      </svg>
      {[0, 1, 2].map((i) => (
        <svg key={i} className={`ring-fx__heart ring-fx__heart--${i}`} viewBox="0 0 24 22">
          <path
            d="M12 21C5 15.5 1 12 1 7a5.5 5.5 0 0 1 11-1 5.5 5.5 0 0 1 11 1c0 5-4 8.5-11 14z"
            fill={i === 1 ? '#E9A6C6' : '#B794DA'}
          />
        </svg>
      ))}
    </div>
  );
}

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
            <RingMoment />
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
