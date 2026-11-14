import { useEffect, useRef, useState } from 'react';
import { weddingConfig as c } from '../data/weddingConfig';
import { asset } from '../lib/links';
import { Music, Pause } from './Icons';

/** Optional background music. Never autoplays; hidden when no track is configured. */
export default function MusicToggle() {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => () => audio.current?.pause(), []);

  if (!c.music.src) return null;

  const toggle = async () => {
    if (!audio.current) {
      audio.current = new Audio(asset(c.music.src));
      audio.current.loop = true;
      audio.current.volume = 0.55;
    }
    if (playing) {
      audio.current.pause();
      setPlaying(false);
    } else {
      try {
        await audio.current.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  };

  return (
    <button
      type="button"
      className={`fab fab--music ${playing ? 'is-playing' : ''}`}
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? 'Pause music' : `Play music${c.music.title ? `: ${c.music.title}` : ''}`}
    >
      {playing ? <Pause /> : <Music />}
      <span className="fab__bars" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
    </button>
  );
}
