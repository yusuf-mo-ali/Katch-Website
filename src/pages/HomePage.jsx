import { ServicesPreview, WhyKatch, ProcessPreview } from '../components/Capabilities';
import { ClientCTA } from '../components/Contact';
import { Hero, ValueStrip } from '../components/Hero';
import { PageFrame } from '../components/PageFrame';
import { PageMeta } from '../components/PageMeta';
import { SelectedWorkPreview } from '../components/Work';

export default function HomePage() {
  return (
    <PageFrame>
      <PageMeta
        title="Katch — Modern Websites That Grow Businesses"
        description="Katch designs and builds fast, modern, conversion-focused websites for businesses, brands, restaurants, and online stores."
        path="/"
      />
      <Hero />
      <ValueStrip />
      <SelectedWorkPreview />
      <ServicesPreview />
      <WhyKatch />
      <ProcessPreview />
      <ClientCTA />
    </PageFrame>
  );
}
