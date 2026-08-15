import { ButtonLink } from '../components/Button';
import { PageFrame } from '../components/PageFrame';
import { PageMeta } from '../components/PageMeta';

export default function NotFoundPage() {
  return (
    <PageFrame className="not-found-page">
      <PageMeta
        title="Page Not Found — Katch"
        description="The page you requested could not be found."
        path="/404"
        noIndex
      />
      <section className="not-found">
        <div className="not-found-inner shell">
          <p className="eyebrow">404 / Wrong turn</p>
          <h1>Page not found.</h1>
          <p>The page may have moved, or the address may not be quite right.</p>
          <div className="not-found-actions">
            <ButtonLink href="/">Back Home</ButtonLink>
            <ButtonLink href="/demos" variant="text">View Our Demos</ButtonLink>
          </div>
        </div>
      </section>
    </PageFrame>
  );
}
