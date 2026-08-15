import { ContactForm } from '../components/Contact';
import { PageFrame } from '../components/PageFrame';
import { PageMeta } from '../components/PageMeta';

export default function ContactPage() {
  return (
    <PageFrame className="contact-page">
      <PageMeta
        title="Start a Project — Katch"
        description="Tell Katch about your website, e-commerce, redesign, AI integration, automation, or optimization project."
        path="/contact"
      />
      <ContactForm />
    </PageFrame>
  );
}
