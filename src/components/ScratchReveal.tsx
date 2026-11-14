import { useCallback, useEffect, useRef, useState } from 'react';
import { weddingConfig as c } from '../data/weddingConfig';
import { Calendar } from './Icons';
import SectionHeading from './SectionHeading';

/** Share of the foil that must be scratched before it clears itself. */
const REVEAL_AT = 0.5;
const BRUSH = 22;

const toUtcStamp = (d: Date) =>
  d
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '');

function calendarUrl() {
  const start = new Date(c.event.startISO);
  const end = new Date(start.getTime() + 4 * 60 * 60 * 1000);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `Engagement · ${c.groom.name} & ${c.bride.name}`,
    dates: `${toUtcStamp(start)}/${toUtcStamp(end)}`,
    details: `${c.event.title} — ${c.event.time}. ${c.event.followedBy}.`,
    location: c.venue.addressOneLine,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

/** Paints the gold foil, with a soft sheen and glitter speckles. */
function paintFoil(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.globalCompositeOperation = 'source-over';
  const base = ctx.createLinearGradient(0, 0, w, h);
  base.addColorStop(0, '#f3dfa2');
  base.addColorStop(0.42, '#c99a45');
  base.addColorStop(0.7, '#a8792c');
  base.addColorStop(1, '#e7c878');
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, w, h);

  const sheen = ctx.createRadialGradient(w * 0.4, h * 0.32, 0, w * 0.4, h * 0.32, w * 0.55);
  sheen.addColorStop(0, 'rgba(255, 248, 225, 0.85)');
  sheen.addColorStop(1, 'rgba(255, 248, 225, 0)');
  ctx.fillStyle = sheen;
  ctx.fillRect(0, 0, w, h);

  const count = Math.round((w * h) / 140);
  for (let i = 0; i < count; i++) {
    const light = Math.random() > 0.45;
    ctx.fillStyle = light
      ? `rgba(255, 250, 230, ${0.35 + Math.random() * 0.55})`
      : `rgba(110, 72, 20, ${0.2 + Math.random() * 0.35})`;
    ctx.beginPath();
    ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 1.6 + 0.3, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = 'rgba(44, 22, 64, 0.6)';
  ctx.font = `600 ${Math.round(w * 0.05)}px Jost, system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.fillText('SCRATCH HERE', w / 2, h * 0.44);
}

export default function ScratchReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const last = useRef<{ x: number; y: number } | null>(null);
  const strokes = useRef(0);
  const [revealed, setRevealed] = useState(false);

  const setup = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    // clientWidth ignores the scroll-in transform, unlike getBoundingClientRect.
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (!width) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    paintFoil(ctx, width, height);
  }, [revealed]);

  useEffect(() => {
    setup();
    const canvas = canvasRef.current;
    if (!canvas || !('ResizeObserver' in window)) return;
    let w = canvas.clientWidth;
    const ro = new ResizeObserver(([entry]) => {
      if (Math.abs(entry.contentRect.width - w) > 1) {
        w = entry.contentRect.width;
        setup();
      }
    });
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [setup]);

  const scratchedShare = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return 0;
    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let clear = 0;
    let total = 0;
    // Sample every 8th pixel — plenty accurate, cheap on phones.
    for (let i = 3; i < data.length; i += 32) {
      total++;
      if (data[i] < 40) clear++;
    }
    return total ? clear / total : 0;
  };

  const point = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    // Map screen coords back to CSS pixels in case a transform is active.
    return {
      x: ((e.clientX - r.left) * el.clientWidth) / r.width,
      y: ((e.clientY - r.top) * el.clientHeight) / r.height,
    };
  };

  const scratch = (from: { x: number; y: number }, to: { x: number; y: number }) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = BRUSH * 2;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(to.x, to.y, BRUSH, 0, Math.PI * 2);
    ctx.fill();
  };

  const onDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (revealed) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const p = point(e);
    last.current = p;
    scratch(p, p);
  };

  const onMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!last.current || revealed) return;
    const p = point(e);
    scratch(last.current, p);
    last.current = p;
    if (++strokes.current % 12 === 0 && scratchedShare() >= REVEAL_AT) setRevealed(true);
  };

  const onUp = () => {
    if (!last.current) return;
    last.current = null;
    if (!revealed && scratchedShare() >= REVEAL_AT) setRevealed(true);
  };

  const [day, month, year] = c.event.dateLong.split(' ');

  return (
    <section className="section scratch" id="save-the-date" aria-labelledby="scratch-title">
      <SectionHeading title="Scratch to Reveal" id="scratch-title" />

      <div data-reveal>
        <div className={`scratch__heart ${revealed ? 'is-revealed' : ''}`}>
          <div className="scratch__mask">
            <div className="scratch__date" aria-live="polite">
              <span className="scratch__day">{c.event.dayName}</span>
              <span className="scratch__num">{day}</span>
              <span className="scratch__month">
                {month} {year}
              </span>
              <span className="scratch__time">{c.event.time}</span>
            </div>
            <canvas
              ref={canvasRef}
              className="scratch__foil"
              aria-hidden="true"
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
            />
          </div>
        </div>
      </div>

      <p className="scratch__hint" data-reveal>
        {revealed ? (
          'We can’t wait to celebrate with you!'
        ) : (
          <>
            Scratch the heart with your finger —{' '}
            <button type="button" className="scratch__skip" onClick={() => setRevealed(true)}>
              or tap here to reveal
            </button>
          </>
        )}
      </p>

      <div className="scratch__cta" data-reveal>
        <a className="btn btn--maroon" href={calendarUrl()} target="_blank" rel="noopener noreferrer">
          <Calendar />
          Save the Date
        </a>
      </div>
    </section>
  );
}
