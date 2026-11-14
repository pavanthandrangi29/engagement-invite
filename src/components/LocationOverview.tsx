import { weddingConfig as c } from '../data/weddingConfig';
import { asset, maps } from '../lib/links';
import { External, Landmark } from './Icons';
import LazyFrame from './LazyFrame';

/** MAP VIEW 1 — neighbourhood overview, pinned to the house, plus the landmark to look for. */
export default function LocationOverview() {
  const marks = c.venue.landmarks;
  return (
    <div className="mapview mapview--overview" data-reveal>
      <div className="mapview__head">
        <p className="mapview__kicker">Map view 1 of 2</p>
        <h3 className="mapview__title">Location Overview</h3>
        <p className="mapview__lede">
          The pin marks the house in Prasanthi Nagar, off Kanithi Road in {c.venue.area}. Pinch and drag to explore the
          neighbourhood.
        </p>
      </div>
      <div className="mapview__frame">
        <LazyFrame src={maps.overviewEmbed} title="Google Map pinned to the venue in Gajuwaka, Visakhapatnam" />
      </div>
      <a className="mapview__link" href={maps.open} target="_blank" rel="noopener noreferrer">
        View larger map <External width={16} height={16} />
      </a>

      {marks.map((m) => (
        <figure className="landmark" key={m.name}>
          {m.image && (
            <img
              className="landmark__img"
              src={asset(m.image.src)}
              alt={m.image.alt}
              width={m.image.width}
              height={m.image.height}
              loading="lazy"
              decoding="async"
            />
          )}
          <figcaption className="landmark__text">
            <span className="landmark__label">
              <Landmark width={16} height={16} /> Landmark
            </span>
            <span className="landmark__name">{m.name}</span>
            {m.note && <span className="landmark__note">{m.note}</span>}
            <span className="landmark__hint">Look for this showroom — the house is on the street opposite it.</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
