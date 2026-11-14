import { weddingConfig as c } from '../data/weddingConfig';
import { maps } from '../lib/links';
import { Eye, External, MapPin } from './Icons';
import LazyFrame from './LazyFrame';
import SectionHeading from './SectionHeading';

/**
 * MAP VIEW 3 — the actual building. Final location experience.
 * Shows a Street View embed once `buildingView.streetViewEmbedUrl` is set;
 * until then, an honestly-labelled satellite view of the address.
 */
export default function BuildingView() {
  const b = c.buildingView;
  const hasStreetView = Boolean(b.streetViewEmbedUrl);

  return (
    <section className="section building" id="building" aria-labelledby="building-title">
      <SectionHeading numeral="V" eyebrow="Map view 3 of 3" title="Find the Entrance" id="building-title" />

      <div className="building__wrap" data-reveal>
        <p className="building__lede">
          {hasStreetView
            ? 'Look around the street exactly as you will see it when you arrive. Drag to turn, tap the arrows to move.'
            : 'A closer look at the venue address from above, so you can recognise the street as you arrive.'}
        </p>

        <div className={`building__frame ${hasStreetView ? 'is-street' : 'is-fallback'}`}>
          <LazyFrame
            src={hasStreetView ? b.streetViewEmbedUrl : maps.satelliteEmbed}
            title={hasStreetView ? 'Street View of the venue building' : 'Satellite view of the venue address'}
          />
          <span className="building__badge">
            <Eye width={15} height={15} />
            {hasStreetView ? 'Street View' : 'Satellite view · based on the address'}
          </span>
        </div>

        {!hasStreetView && (
          <p className="building__note">
            Street-level imagery of the building will appear here once the exact location pin is confirmed. The
            satellite view above is positioned from the written address and may be approximate.
          </p>
        )}
        {b.entranceNote && <p className="building__entrance">{b.entranceNote}</p>}

        <div className="building__actions">
          <a className="btn btn--gold" href={maps.open} target="_blank" rel="noopener noreferrer">
            <MapPin />
            <span>Open exact location</span>
          </a>
          {b.streetViewLink && (
            <a className="btn btn--outline" href={b.streetViewLink} target="_blank" rel="noopener noreferrer">
              <External />
              <span>Open Street View</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
