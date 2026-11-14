import { weddingConfig as c } from '../data/weddingConfig';
import { asset, maps } from '../lib/links';
import { Landmark, MapPin, Navigation } from './Icons';

/** MAP VIEW 2 — getting there: an illustrated route card, not another map. */
export default function DirectionsSection() {
  const marks = c.venue.landmarks;
  return (
    <div className="mapview mapview--directions" data-reveal>
      <div className="mapview__head">
        <p className="mapview__kicker">Map view 2 of 2</p>
        <h3 className="mapview__title">Getting There</h3>
        <p className="mapview__lede">
          One tap opens turn-by-turn directions in Google Maps, straight to the house pin, from wherever you are.
        </p>
      </div>

      <div className="route">
        <svg className="route__art" viewBox="0 0 320 120" aria-hidden="true">
          <path
            className="route__path"
            d="M24 92 C 80 92 84 28 140 34 C 196 40 196 96 252 86 C 276 82 288 60 296 44"
            fill="none"
          />
          <circle cx="24" cy="92" r="7" className="route__start" />
          <circle cx="24" cy="92" r="13" className="route__start-ring" />
          <g transform="translate(296 44)">
            <path
              d="M0 -24 C 9 -24 13 -17 13 -11 C 13 -2 0 8 0 8 C 0 8 -13 -2 -13 -11 C -13 -17 -9 -24 0 -24 Z"
              className="route__pin"
            />
            <circle cy="-11" r="4" fill="#FBF6EC" />
          </g>
        </svg>

        <ol className="route__steps">
          <li>
            <span className="route__dot route__dot--start" aria-hidden="true" />
            <div>
              <p className="route__label">From</p>
              <p className="route__value">Your current location</p>
            </div>
          </li>
          {marks.map((m) => (
            <li key={m.name}>
              <Landmark className="route__icon" width={18} height={18} />
              <div className="route__landmark">
                <p className="route__label">Landmark</p>
                <p className="route__value">{m.name}</p>
                {m.image && (
                  <img
                    className="route__thumb"
                    src={asset(m.image.src)}
                    alt={m.image.alt}
                    width={m.image.width}
                    height={m.image.height}
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </div>
            </li>
          ))}
          <li>
            <MapPin className="route__icon route__icon--end" width={18} height={18} />
            <div>
              <p className="route__label">To</p>
              <p className="route__value">{c.venue.addressOneLine}</p>
            </div>
          </li>
        </ol>

        <a
          className="btn btn--gold btn--lg route__cta"
          href={maps.directions}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Navigation />
          <span>Start Navigation</span>
        </a>
        <p className="route__tip">Opens the Google Maps app on phones, or maps.google.com on a computer.</p>
      </div>
    </div>
  );
}
