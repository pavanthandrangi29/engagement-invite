import { useCallback, useEffect, useRef, useState } from 'react';
import { weddingConfig as c } from '../data/weddingConfig';
import { asset } from '../lib/links';
import { ChevronLeft, ChevronRight, X } from './Icons';
import SectionHeading from './SectionHeading';

export default function PhotoGallery() {
  return c.gallery.length ? <Gallery /> : null;
}

function Gallery() {
  const items = c.gallery;
  const [index, setIndex] = useState<number | null>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const open = (i: number) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setIndex(i);
  };
  const close = useCallback(() => {
    setIndex(null);
    lastFocus.current?.focus();
  }, []);
  const step = useCallback(
    (d: number) => setIndex((i) => (i === null ? i : (i + d + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (index === null) return;
    closeBtn.current?.focus();
    document.documentElement.classList.add('no-scroll');
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.classList.remove('no-scroll');
    };
  }, [index, close, step]);

  if (!items.length) return null;
  const current = index !== null ? items[index] : null;

  return (
    <section className="section gallery" id="gallery" aria-labelledby="gallery-title">
      <SectionHeading numeral="IV" eyebrow="Moments" title="Gallery" id="gallery-title" />

      <ul className={`gallery__grid gallery__grid--${Math.min(items.length, 3)}`}>
        {items.map((it, i) => (
          <li key={it.src} className="gallery__item" data-reveal style={{ transitionDelay: `${(i % 3) * 90}ms` }}>
            <button type="button" className="gallery__btn" onClick={() => open(i)} aria-label={`View photo: ${it.caption ?? it.alt}`}>
              <img
                src={asset(it.src)}
                srcSet={it.srcLarge ? `${asset(it.src)} 640w, ${asset(it.srcLarge)} 1280w` : undefined}
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 380px"
                alt={it.alt}
                width={it.width}
                height={it.height}
                loading="lazy"
                decoding="async"
              />
              {it.caption && <span className="gallery__caption">{it.caption}</span>}
            </button>
          </li>
        ))}
      </ul>

      {current && index !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Photo ${index + 1} of ${items.length}`}
          onClick={(e) => e.target === e.currentTarget && close()}
          onTouchStart={(e) => (touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY })}
          onTouchEnd={(e) => {
            if (!touch.current) return;
            const dx = e.changedTouches[0].clientX - touch.current.x;
            const dy = e.changedTouches[0].clientY - touch.current.y;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
            else if (dy > 90) close();
            touch.current = null;
          }}
        >
          <button ref={closeBtn} type="button" className="lightbox__close" onClick={close} aria-label="Close">
            <X width={26} height={26} />
          </button>
          {items.length > 1 && (
            <>
              <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={() => step(-1)} aria-label="Previous photo">
                <ChevronLeft width={30} height={30} />
              </button>
              <button type="button" className="lightbox__nav lightbox__nav--next" onClick={() => step(1)} aria-label="Next photo">
                <ChevronRight width={30} height={30} />
              </button>
            </>
          )}
          <figure className="lightbox__figure" key={index}>
            <img src={asset(current.srcLarge ?? current.src)} alt={current.alt} />
            <figcaption>
              {current.caption && <span>{current.caption}</span>}
              <span className="lightbox__count">
                {index + 1} / {items.length}
              </span>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
