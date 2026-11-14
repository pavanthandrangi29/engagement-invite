import { weddingConfig as c } from '../data/weddingConfig';
import { asset, maps } from '../lib/links';
import { Landmark, MapPin, Navigation } from './Icons';

/** Getting there: route card with the landmark and one-tap navigation to the house pin. */
export default function DirectionsSection() {
  const marks = c.venue.landmarks;
  return (
    <div className="mapview mapview--directions" data-reveal>
      <div className="mapview__head">
        <h3 className="mapview__title">Getting There</h3>
      </div>

      <div className="route">
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
                <div>
                  <p className="route__label">Landmark</p>
                  <p className="route__value">{m.name}</p>
                </div>
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
              <p className="route__value route__value--address">{c.venue.addressOneLine}</p>
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
        <p className="route__tip">
          One tap opens turn-by-turn directions in Google Maps, straight to the house pin, from wherever you are.
        </p>
      </div>
    </div>
  );
}
