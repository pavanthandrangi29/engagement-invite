import { useEffect, useState } from 'react';
import { weddingConfig as c } from '../data/weddingConfig';
import { hasMusic, isMusicPlaying, onMusicChange, toggleMusic } from '../lib/music';
import { Music, Pause } from './Icons';

/** Play / pause button for the looping background music. */
export default function MusicToggle() {
  const [playing, setPlaying] = useState(isMusicPlaying());

  useEffect(() => {
    const off = onMusicChange(setPlaying);
    return () => {
      off();
    };
  }, []);

  if (!hasMusic()) return null;

  return (
    <button
      type="button"
      className={`fab fab--music ${playing ? 'is-playing' : ''}`}
      onClick={toggleMusic}
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
