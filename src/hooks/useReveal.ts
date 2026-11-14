import { useEffect } from 'react';

/**
 * Adds `is-visible` to every `[data-reveal]` element once it scrolls into view.
 * One shared IntersectionObserver keeps it cheap on low-end phones.
 */
export function useReveal(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [enabled]);
}
