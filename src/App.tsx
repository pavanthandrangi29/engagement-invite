import { useCallback, useEffect, useState } from 'react';
import InvitationEnvelope from './components/InvitationEnvelope';
import HeroSection from './components/HeroSection';
import CouplePortraits from './components/CouplePortraits';
import FamilyInvitation from './components/FamilyInvitation';
import ScratchReveal from './components/ScratchReveal';
import EventDetails from './components/EventDetails';
import VenueSection from './components/VenueSection';
import PhotoGallery from './components/PhotoGallery';
import BuildingView from './components/BuildingView';
import Footer from './components/Footer';
import WhatsAppShare from './components/WhatsAppShare';
import MusicToggle from './components/MusicToggle';
import { OrnamentDefs } from './components/Ornaments';
import { useReveal } from './hooks/useReveal';

export default function App() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('no-scroll', !opened);
    if (opened) {
      window.scrollTo(0, 0);
      document.getElementById('top')?.focus({ preventScroll: true });
    }
  }, [opened]);

  useReveal(opened);
  const handleOpen = useCallback(() => setOpened(true), []);

  return (
    <>
      <OrnamentDefs />
      <a className="skip-link" href="#couple">
        Skip to invitation
      </a>
      {!opened && <InvitationEnvelope onOpen={handleOpen} />}

      <div className={`site ${opened ? 'is-revealed' : ''}`} aria-hidden={!opened}>
        <HeroSection />
        <main>
          <CouplePortraits />
          <FamilyInvitation />
          <ScratchReveal />
          <EventDetails />
          <VenueSection />
          <PhotoGallery />
          <BuildingView />
        </main>
        <Footer />
        {opened && (
          <>
            <WhatsAppShare />
            <MusicToggle />
          </>
        )}
      </div>
    </>
  );
}
