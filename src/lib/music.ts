import { weddingConfig as c } from '../data/weddingConfig';
import { asset } from './links';

/**
 * Gapless looping background music.
 * Uses the Web Audio API (an <audio loop> leaves a short silence at the end
 * of every MP3), and trims leading/trailing silence so the loop is seamless.
 * Must be started from a tap (browsers block autoplay otherwise).
 */

type Listener = (playing: boolean) => void;

let ctx: AudioContext | null = null;
let gain: GainNode | null = null;
let buffer: AudioBuffer | null = null;
let loopStart = 0;
let loopEnd = 0;
let source: AudioBufferSourceNode | null = null;
let loading: Promise<void> | null = null;
let playing = false;
let fallback: HTMLAudioElement | null = null;
const listeners = new Set<Listener>();

const VOLUME = 0.5;
const emit = () => listeners.forEach((l) => l(playing));

export const onMusicChange = (l: Listener) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
export const isMusicPlaying = () => playing;
export const hasMusic = () => Boolean(c.music.src);

/** Find where the actual sound begins and ends (skip encoder silence). */
function findBounds(buf: AudioBuffer) {
  const data = buf.getChannelData(0);
  const threshold = 0.002;
  let start = 0;
  let end = data.length - 1;
  while (start < end && Math.abs(data[start]) < threshold) start++;
  while (end > start && Math.abs(data[end]) < threshold) end--;
  return { start: start / buf.sampleRate, end: (end + 1) / buf.sampleRate };
}

async function load() {
  if (!ctx) return;
  const res = await fetch(asset(c.music.src));
  const raw = await res.arrayBuffer();
  buffer = await ctx.decodeAudioData(raw);
  const b = findBounds(buffer);
  loopStart = b.start;
  loopEnd = b.end;
}

function startSource() {
  if (!ctx || !gain || !buffer) return;
  source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;
  source.loopStart = loopStart;
  source.loopEnd = loopEnd;
  source.connect(gain);
  gain.gain.cancelScheduledValues(ctx.currentTime);
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(VOLUME, ctx.currentTime + 1.2);
  source.start(0, loopStart);
}

function useFallback() {
  if (!fallback) {
    fallback = new Audio(asset(c.music.src));
    fallback.loop = true;
    fallback.volume = VOLUME;
  }
  return fallback.play();
}

export async function playMusic() {
  if (!hasMusic()) return;
  if (playing) {
    ctx?.resume(); // already queued; a tap lets the browser unmute it
    return;
  }
  playing = true;
  emit();
  try {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!ctx) {
      ctx = new AC();
      gain = ctx.createGain();
      gain.connect(ctx.destination);
    }
    // resume synchronously inside the tap so the browser allows sound
    const resumed = ctx.resume();
    if (!buffer) loading ??= load();
    await resumed;
    await loading;
    if (!playing) return;
    startSource();
  } catch {
    try {
      await useFallback();
    } catch {
      playing = false;
      emit();
    }
  }
}

export function pauseMusic() {
  if (!playing) return;
  playing = false;
  emit();
  if (fallback) fallback.pause();
  if (ctx && gain && source) {
    const s = source;
    source = null;
    gain.gain.cancelScheduledValues(ctx.currentTime);
    gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
    window.setTimeout(() => s.stop(), 450);
  }
}

export const toggleMusic = () => (playing ? pauseMusic() : playMusic());

// Pause when the tab is hidden, resume when it comes back.
let pausedByHide = false;
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && playing) {
      pausedByHide = true;
      pauseMusic();
    } else if (!document.hidden && pausedByHide) {
      pausedByHide = false;
      playMusic();
    }
  });
}

/**
 * Start the music as early as possible on page load.
 * Browsers only allow sound after the guest's first touch, so the music is
 * queued now and begins (from the start) on the very first tap, scroll or key.
 */
export function autoStartMusic() {
  if (!hasMusic()) return;
  playMusic();
  const unlock = () => {
    ctx?.resume();
    if (!playing) playMusic();
    ['pointerdown', 'touchstart', 'keydown'].forEach((e) => document.removeEventListener(e, unlock, true));
  };
  ['pointerdown', 'touchstart', 'keydown'].forEach((e) =>
    document.addEventListener(e, unlock, { capture: true, passive: true }),
  );
}
