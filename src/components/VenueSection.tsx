import { weddingConfig as c } from '../data/weddingConfig';
import { Phone } from './Icons';
import SectionHeading from './SectionHeading';
import DirectionsSection from './DirectionsSection';

export default function VenueSection() {
  return (
    <section className="section venue" id="venue" aria-labelledby="venue-title">
      <SectionHeading numeral="II" eyebrow="Where we gather" title={c.venue.heading} id="venue-title" />

      <DirectionsSection />

      <div className="venue__contacts venue__contacts--solo" data-reveal>
        <p className="venue__contacts-label">For any assistance</p>
        <div className="venue__contacts-row">
          {c.contacts.map((p) => (
            <a key={p.tel} className="btn btn--maroon" href={`tel:${p.tel}`} aria-label={`Call ${p.display}`}>
              <Phone />
              <span>{p.display}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
