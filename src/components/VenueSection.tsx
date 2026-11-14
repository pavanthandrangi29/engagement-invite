import { useState } from 'react';
import { weddingConfig as c } from '../data/weddingConfig';
import { copyText, maps } from '../lib/links';
import { Check, Copy, External, MapPin, Navigation, Phone } from './Icons';
import { Corner } from './Ornaments';
import SectionHeading from './SectionHeading';
import LocationOverview from './LocationOverview';
import DirectionsSection from './DirectionsSection';

export default function VenueSection() {
  const [copied, setCopied] = useState<'idle' | 'ok' | 'fail'>('idle');

  const onCopy = async () => {
    const ok = await copyText(c.venue.addressOneLine);
    setCopied(ok ? 'ok' : 'fail');
    window.setTimeout(() => setCopied('idle'), 2400);
  };

  return (
    <section className="section venue" id="venue" aria-labelledby="venue-title">
      <SectionHeading numeral="II" eyebrow="Where we gather" title={c.venue.heading} id="venue-title" />

      <div className="venue__card" data-reveal>
        <Corner className="corner--tl" />
        <Corner className="corner--br" />
        <MapPin className="venue__pin" width={28} height={28} />
        <address className="venue__address">
          {c.venue.addressLines.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </address>

        <div className="venue__actions">
          <button type="button" className="btn btn--outline" onClick={onCopy}>
            {copied === 'ok' ? <Check /> : <Copy />}
            <span>{copied === 'ok' ? 'Address copied' : copied === 'fail' ? 'Copy failed' : 'Copy address'}</span>
          </button>
          <a className="btn btn--outline" href={maps.open} target="_blank" rel="noopener noreferrer">
            <External />
            <span>Open in Google Maps</span>
          </a>
          <a className="btn btn--gold" href={maps.directions} target="_blank" rel="noopener noreferrer">
            <Navigation />
            <span>Get Directions</span>
          </a>
        </div>
        <span className="sr-only" role="status" aria-live="polite">
          {copied === 'ok' ? 'Address copied to clipboard' : ''}
        </span>

        <div className="venue__contacts">
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
      </div>

      <LocationOverview />
      <DirectionsSection />
    </section>
  );
}
