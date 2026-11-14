import { whatsappShareUrl } from '../lib/links';
import { WhatsApp } from './Icons';

export default function WhatsAppShare() {
  return (
    <a
      className="fab fab--whatsapp"
      href={whatsappShareUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Share this invitation on WhatsApp"
    >
      <WhatsApp width={26} height={26} />
      <span className="fab__label">Share invitation</span>
    </a>
  );
}
