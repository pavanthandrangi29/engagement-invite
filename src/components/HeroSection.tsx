import { weddingConfig as c } from '../data/weddingConfig';
import { si } from '../lib/style';
import Countdown from './Countdown';
import GoldParticles from './GoldParticles';
import { ChevronDown } from './Icons';
import { BrassLamp, Divider, JasmineStrand, MandapamArch, Namam, Toran } from './Ornaments';

export default function HeroSection() {
  return (
    <header className="hero" id="top" tabIndex={-1}>
      <GoldParticles />
      <Toran className="hero__toran" count={27} />
      <JasmineStrand className="hero__jasmine hero__jasmine--l" length={22} />
      <JasmineStrand className="hero__jasmine hero__jasmine--l2" length={14} />
      <JasmineStrand className="hero__jasmine hero__jasmine--r" length={22} />
      <JasmineStrand className="hero__jasmine hero__jasmine--r2" length={14} />
      <BrassLamp className="hero__lamp hero__lamp--l" />
      <BrassLamp className="hero__lamp hero__lamp--r" />

      <div className="hero__inner">
        <div className="hero__content">
          {c.invocation && (
            <div className="invocation stagger" style={si(0)}>
              <Namam className="invocation__mark" />
              <p className="invocation__text">{c.invocation}</p>
            </div>
          )}
          {c.teluguBlessing && (
            <p className="hero__telugu stagger" lang="te" style={si(0)}>
              {c.teluguBlessing}
            </p>
          )}
          <p className="hero__family stagger" style={si(1)}>
            {c.familyTitle}
          </p>
          <p className="hero__eyebrow stagger" style={si(2)}>
            {c.heroEyebrow}
          </p>

          <div className="hero__mandapam">
            <MandapamArch className="hero__arch stagger" style={si(3)} />
            <h2 className="hero__names" aria-label={`${c.groom.name} and ${c.bride.name}`}>
              <span className="hero__name stagger" style={si(3)}>
                {c.groom.name}
              </span>
              <span className="hero__amp stagger" style={si(4)} aria-hidden="true">
                &amp;
              </span>
              <span className="hero__name stagger" style={si(5)}>
                {c.bride.name}
              </span>
            </h2>
          </div>

          <Divider className="stagger" style={si(6)} />

          <div className="hero__when stagger" style={si(7)}>
            <p className="hero__day">{c.event.dayName}</p>
            <p className="hero__date">{c.event.dateLong}</p>
            <p className="hero__time">
              {c.event.time}
              <span className="dot" aria-hidden="true">
                ◆
              </span>
              {c.event.followedBy}
            </p>
          </div>

          <div className="stagger" style={si(8)}>
            <Countdown />
          </div>
        </div>
      </div>

      <a className="hero__scroll" href="#couple" aria-label="Scroll to the couple">
        <ChevronDown />
      </a>
    </header>
  );
}
