import { weddingConfig as c } from '../data/weddingConfig';
import { Calendar, Clock, Utensils } from './Icons';
import { Corner, Toran } from './Ornaments';
import SectionHeading from './SectionHeading';

export default function EventDetails() {
  const e = c.event;
  const rows = [
    { icon: <Calendar />, label: 'Date', value: e.dateFull },
    { icon: <Clock />, label: 'Muhurtham', value: e.time },
    { icon: <Utensils />, label: 'Celebration', value: e.followedBy },
  ];
  return (
    <section className="section event" id="celebration" aria-labelledby="event-title">
      <SectionHeading numeral="II" eyebrow="Save the date" title="The Celebration" id="event-title" />
      <article className="event__card" data-reveal>
        <Toran className="event__toran" count={13} />
        <Corner className="corner--bl" />
        <Corner className="corner--br" />
        <h3 className="event__title">{e.title}</h3>
        <dl className="event__rows">
          {rows.map((r) => (
            <div className="event__row" key={r.label}>
              <dt>
                <span className="event__icon">{r.icon}</span>
                {r.label}
              </dt>
              <dd>{r.value}</dd>
            </div>
          ))}
        </dl>
      </article>
    </section>
  );
}
