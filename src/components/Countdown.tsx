import { useEffect, useState } from 'react';
import { weddingConfig as c } from '../data/weddingConfig';

const TARGET = Date.parse(c.event.startISO);

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

export default function Countdown() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const remaining = TARGET - now;

  if (remaining <= 0) {
    return (
      <div className="countdown countdown--done" role="status">
        <span className="countdown__sparkle" aria-hidden="true">✦</span>
        <p>{c.event.afterEventMessage}</p>
      </div>
    );
  }

  const p = parts(remaining);
  const cells: [string, number][] = [
    ['Days', p.days],
    ['Hours', p.hours],
    ['Minutes', p.minutes],
    ['Seconds', p.seconds],
  ];

  return (
    <div className="countdown" role="timer" aria-label={`Time until the ceremony: ${p.days} days, ${p.hours} hours, ${p.minutes} minutes`}>
      {cells.map(([label, v]) => (
        <div className="countdown__cell" key={label}>
          <span className="countdown__num" aria-hidden="true">
            {String(v).padStart(2, '0')}
          </span>
          <span className="countdown__label" aria-hidden="true">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
