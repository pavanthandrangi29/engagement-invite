import { weddingConfig as c } from '../data/weddingConfig';
import { maps } from '../lib/links';
import { External } from './Icons';
import LazyFrame from './LazyFrame';

/** MAP VIEW 1 — neighbourhood overview. */
export default function LocationOverview() {
  return (
    <div className="mapview mapview--overview" data-reveal>
      <div className="mapview__head">
        <p className="mapview__kicker">Map view 1 of 3</p>
        <h3 className="mapview__title">Location Overview</h3>
        <p className="mapview__lede">
          The venue sits in Prasanthi Nagar, off Kanithi Road in {c.venue.area}. Pinch and drag to explore the
          neighbourhood.
        </p>
      </div>
      <div className="mapview__frame">
        <LazyFrame src={maps.overviewEmbed} title="Google Map of the venue area in Gajuwaka, Visakhapatnam" />
      </div>
      <a className="mapview__link" href={maps.open} target="_blank" rel="noopener noreferrer">
        View larger map <External width={16} height={16} />
      </a>
    </div>
  );
}
