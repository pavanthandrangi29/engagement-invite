import { useEffect, useState } from 'react';

/**
 * Gentle "scroll" cue on the right edge, shown after the envelope opens.
 * Hides for good once the guest scrolls a little.
 */
export default function ScrollHint() {
  const [show, setShow] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setShow(true), 1400);
    const onScroll = () => {
      if (window.scrollY > 160) {
        setGone(true);
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const next = () => document.getElementById('couple')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <button
      type="button"
      className={`scroll-hint ${show && !gone ? 'is-shown' : ''}`}
      onClick={next}
      aria-label="Scroll down to see the invitation"
      tabIndex={show && !gone ? 0 : -1}
    >
      <span className="scroll-hint__text">Scroll</span>
      <span className="scroll-hint__track" aria-hidden="true">
        <span className="scroll-hint__dot" />
      </span>
      <svg className="scroll-hint__arrow" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M6 9l6 6 6-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
