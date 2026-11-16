import { weddingConfig as c } from '../data/weddingConfig';
import { Lotus } from './Ornaments';

/** Ogee-ended pill that frames each time (stretches to fit). */
function TimePill() {
  return (
    <svg className="sched__pill-bg" viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M24 2 H176 C 184 2 186 10 192 14 C 196 17 198 24 198 30 C 198 36 196 43 192 46 C 186 50 184 58 176 58 H24 C 16 58 14 50 8 46 C 4 43 2 36 2 30 C 2 24 4 17 8 14 C 14 10 16 2 24 2 Z"
        fill="url(#g-sched-pill)"
        stroke="#C9A14E"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function Cloche({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 40" aria-hidden="true">
      <g fill="none" stroke="url(#g-gold)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="32" cy="6" r="3" />
        <path d="M10 30 C 10 17 20 10 32 10 C 44 10 54 17 54 30" />
        <path d="M5 30 H59" />
        <path d="M9 34 H55" />
        <path d="M18 26 C 19 20 23 16 28 15" opacity=".6" />
      </g>
    </svg>
  );
}

/** Jasmine sprig for the card's corners. */
function Jasmine({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 64" aria-hidden="true">
      <path d="M6 58 C 14 44 22 36 36 30" fill="none" stroke="#7E9470" strokeWidth="1.2" />
      <path d="M8 56 C 2 46 4 38 12 34 C 16 44 14 52 8 56 Z" fill="#7FA06B" />
      <path d="M40 22 C 52 14 64 14 74 20 C 64 28 50 28 40 22 Z" fill="#8FAE7A" />
      <path d="M20 44 C 14 40 12 32 16 26 C 22 32 23 38 20 44 Z" fill="#6E9160" />
      {[
        [30, 30, 11],
        [50, 18, 9],
      ].map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x} ${y})`}>
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse
              key={a}
              cy={-r * 0.58}
              rx={r * 0.42}
              ry={r * 0.6}
              transform={`rotate(${a})`}
              fill="#FFFDF8"
              stroke="#E9DFC9"
              strokeWidth=".6"
            />
          ))}
          <circle r={r * 0.22} fill="#E2B33C" />
          <circle r={r * 0.1} fill="#F6D77A" />
        </g>
      ))}
    </svg>
  );
}

/** Engagement muhurtham + lunch timings, styled as an ornate card. */
export default function ScheduleCard() {
  return (
    <div className="sched" role="group" aria-label="Timings">
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <linearGradient id="g-sched-pill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F7F0FA" />
            <stop offset="1" stopColor="#EADCF2" />
          </linearGradient>
        </defs>
      </svg>
      <Jasmine className="sched__jasmine sched__jasmine--tl" />
      <Jasmine className="sched__jasmine sched__jasmine--br" />

      <div className="sched__col">
        <div className="sched__icon-row" aria-hidden="true">
          <span />
          <Lotus className="sched__icon" />
          <span />
        </div>
        <p className="sched__label">
          Engagement
          <br />
          Muhurtham
        </p>
        <div className="sched__pill">
          <TimePill />
          <span className="sched__time">{c.event.time}</span>
        </div>
      </div>

      <div className="sched__divider" aria-hidden="true">
        <span />
        <svg viewBox="0 0 20 20">
          <g fill="#C9A14E">
            <ellipse cx="10" cy="4.5" rx="2.6" ry="4" />
            <ellipse cx="10" cy="15.5" rx="2.6" ry="4" />
            <ellipse cx="4.5" cy="10" rx="4" ry="2.6" />
            <ellipse cx="15.5" cy="10" rx="4" ry="2.6" />
          </g>
          <circle cx="10" cy="10" r="1.8" fill="#FBF3E2" />
        </svg>
        <span />
      </div>

      <div className="sched__col">
        <div className="sched__icon-row" aria-hidden="true">
          <span />
          <Cloche className="sched__icon" />
          <span />
        </div>
        <p className="sched__label">Lunch</p>
        <div className="sched__pill">
          <TimePill />
          <span className="sched__time">
            {c.event.lunchTime.replace(/\s*onwards$/i, '')}
            {/onwards$/i.test(c.event.lunchTime) && <em className="sched__onwards">onwards</em>}
          </span>
        </div>
      </div>
    </div>
  );
}
