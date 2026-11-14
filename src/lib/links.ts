import { weddingConfig as c } from '../data/weddingConfig';

/** Resolve a /public asset against Vite's base path (works on GitHub project pages). */
export const asset = (path: string) =>
  path ? `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}` : '';

const q = encodeURIComponent(c.venue.addressOneLine);

export const maps = {
  /** Keyless Google Maps embed (supported "output=embed" URL). */
  overviewEmbed: `https://maps.google.com/maps?q=${q}&z=16&hl=en&output=embed`,
  /** Satellite embed used as the honest fallback for the building view. */
  satelliteEmbed: `https://maps.google.com/maps?q=${q}&t=k&z=19&hl=en&output=embed`,
  /** Opens the venue — exact pin if provided, otherwise an address search. */
  open: c.venue.googleMapsShareLink || `https://www.google.com/maps/search/?api=1&query=${q}`,
  /** Official Maps URLs API — opens turn-by-turn directions from the guest's location. */
  directions: `https://www.google.com/maps/dir/?api=1&destination=${q}`,
};

export const siteUrl = () => {
  if (c.siteUrl) return c.siteUrl;
  if (typeof window === 'undefined') return '';
  const { origin, pathname } = window.location;
  return origin + pathname;
};

export const whatsappShareUrl = () =>
  `https://wa.me/?text=${encodeURIComponent(`${c.whatsappMessage}\n\n${siteUrl()}`)}`;

export async function copyText(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to legacy path */
  }
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  } catch {
    return false;
  }
}
