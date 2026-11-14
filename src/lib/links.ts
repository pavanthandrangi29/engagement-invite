import { weddingConfig as c } from '../data/weddingConfig';

/** Resolve a /public asset against Vite's base path (works on GitHub project pages). */
export const asset = (path: string) =>
  path ? `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}` : '';

const { lat, lng } = c.venue.coordinates;
/** Exact house pin as "lat,lng" — far more precise than the street address. */
const q = `${lat},${lng}`;

export const maps = {
  /** Opens the venue — exact pin if provided, otherwise an address search. */
  open: c.venue.googleMapsShareLink || `https://www.google.com/maps/search/?api=1&query=${q}`,
  /** Official Maps URLs API — turn-by-turn directions from the guest's location to the house pin. */
  directions: `https://www.google.com/maps/dir/?api=1&destination=${q}&travelmode=driving`,
};

export const siteUrl = () => {
  if (c.siteUrl) return c.siteUrl;
  if (typeof window === 'undefined') return '';
  const { origin, pathname } = window.location;
  return origin + pathname;
};

export const whatsappShareUrl = () => {
  const msg = c.whatsappMessage.includes('{link}')
    ? c.whatsappMessage.replace('{link}', siteUrl())
    : `${c.whatsappMessage}\n\n${siteUrl()}`;
  return `https://wa.me/?text=${encodeURIComponent(msg)}`;
};

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
