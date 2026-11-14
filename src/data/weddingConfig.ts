/**
 * ─────────────────────────────────────────────────────────────
 *  THANDRANGI'S — CENTRAL INVITATION CONFIGURATION
 *  Every name, date, address, number, image and link on the
 *  website comes from this one file. Edit here, rebuild, done.
 * ─────────────────────────────────────────────────────────────
 */

/** Paths are relative to the /public folder (no leading slash). */
export type ImageAsset = {
  src: string;
  /** Optional larger version for full-screen viewing / srcset. */
  srcLarge?: string;
  alt: string;
  width?: number;
  height?: number;
};

export type GalleryItem = ImageAsset & {
  category: 'couple' | 'portrait' | 'family' | 'engagement' | 'other';
  caption?: string;
};

const ADDRESS_LINES = [
  '26-55-5,',
  'Vinayaka Temple Street,',
  'Prasanthi Nagar,',
  'Kanithi Road,',
  'Gajuwaka,',
  'Visakhapatnam,',
  'Andhra Pradesh, India.',
];

/** Single-line form, used for maps, copying and sharing. */
const ADDRESS_ONE_LINE =
  '26-55-5, Vinayaka Temple Street, Prasanthi Nagar, Kanithi Road, Gajuwaka, Visakhapatnam, Andhra Pradesh, India';

export const weddingConfig = {
  // ── Identity ────────────────────────────────────────────────
  familyTitle: "THANDRANGI'S",
  tagline: 'A Celebration of Togetherness',
  eventType: 'Engagement Invitation',
  heroEyebrow: 'Engagement Celebration',

  /** Traditional Telugu blessing line shown above the invitation. Set to '' to hide. */
  teluguBlessing: 'శ్రీరస్తు  ·  శుభమస్తు  ·  అవిఘ్నమస్తు',

  // ── Couple ──────────────────────────────────────────────────
  groom: { name: 'Harsha' },
  bride: { name: 'Jayasree' },
  /** Illustrated artwork of the couple (no real photographs are published). */
  coupleIllustration: {
    src: 'images/couple/couple-illustration-1388.webp',
    srcSmall: 'images/couple/couple-illustration-720.webp',
    alt: 'Illustration of Harsha and Jayasree holding hands, wearing jasmine garlands, in traditional South Indian attire before a temple backdrop',
    width: 1388,
    height: 1133,
  },

  // ── Hosts ───────────────────────────────────────────────────
  hosts: ['Thandrangi Venkata Ramana', 'Smt. Lakshmi'],
  invitationWording:
    'Thandrangi Venkata Ramana and Smt. Lakshmi cordially invite you to celebrate the engagement ceremony of',
  familyInvitation: {
    eyebrow: 'With the blessings of our elders',
    request:
      'Request the pleasure of your gracious presence and blessings at the engagement ceremony of',
    closing: 'Your presence will make this special occasion even more memorable.',
  },

  // ── Event ───────────────────────────────────────────────────
  event: {
    title: 'The Engagement Ceremony',
    dayName: 'Sunday',
    dateLong: '22 November 2026',
    dateFull: 'Sunday, 22 November 2026',
    time: '9:31 AM onwards',
    followedBy: 'Followed by Lunch',
    /** Exact ceremony moment in Indian Standard Time — drives the countdown. */
    startISO: '2026-11-22T09:31:00+05:30',
    afterEventMessage:
      'The auspicious moment has arrived. Harsha & Jayasree are now engaged — thank you for your love and blessings.',
  },

  // ── Venue ───────────────────────────────────────────────────
  venue: {
    heading: 'The Celebration Venue',
    addressLines: ADDRESS_LINES,
    addressOneLine: ADDRESS_ONE_LINE,
    area: 'Gajuwaka, Visakhapatnam',
    /**
     * Your exact Google Maps share link (e.g. https://maps.app.goo.gl/xxxx).
     * When set, every "Open in Google Maps" button uses it instead of an
     * address search.
     */
    googleMapsShareLink: '',
    /**
     * Nearby landmarks — add only ones you have verified.
     * Example: { name: 'Gajuwaka Junction', note: 'about 2 km' }
     */
    landmarks: [] as { name: string; note?: string }[],
  },

  /**
   * MAP VIEW 3 — the actual building.
   * In Google Maps: find the venue → drag the yellow Pegman onto the street
   * in front of the building → face the entrance → Share → "Embed a map"
   * → copy ONLY the src="…" URL and paste it below.
   * Until then the section shows an honest satellite fallback.
   */
  buildingView: {
    streetViewEmbedUrl: '',
    /** Optional: a link straight into that Street View scene. */
    streetViewLink: '',
    entranceNote: '',
  },

  // ── Contact ─────────────────────────────────────────────────
  contacts: [
    { display: '94400 97210', tel: '+919440097210' },
    { display: '92937 91244', tel: '+919293791244' },
  ],

  // ── Sharing ─────────────────────────────────────────────────
  /**
   * Published URL, e.g. https://<username>.github.io/<repo>/
   * Leave '' to use the address the guest opened automatically.
   */
  siteUrl: '',
  whatsappMessage: [
    'With great joy, we invite you to the engagement celebration of Harsha & Jayasree.',
    '',
    'Date: Sunday, 22 November 2026',
    'Time: 9:31 AM onwards',
    'Followed by Lunch',
    '',
    'Venue: 26-55-5, Vinayaka Temple Street, Prasanthi Nagar, Kanithi Road, Gajuwaka, Visakhapatnam.',
    '',
    'We look forward to your presence and blessings!',
  ].join('\n'),

  // ── Music (optional, never autoplays) ───────────────────────
  /** e.g. 'music/nadaswaram.mp3' placed in public/music/. '' hides the button. */
  music: { src: '', title: '' },

  // ── Gallery ─────────────────────────────────────────────────
  /** Empty = gallery section hidden. */
  gallery: [] as GalleryItem[],

  // ── Closing ─────────────────────────────────────────────────
  closing: {
    headingLines: ['Two hearts.', 'One beautiful beginning.'],
    body: [
      'Your presence and blessings will make this celebration even more special.',
      'We warmly welcome you to celebrate this beautiful occasion with us.',
    ],
    signOff: 'With love,',
    signature: 'Thandrangi Family',
  },
};

export type WeddingConfig = typeof weddingConfig;
