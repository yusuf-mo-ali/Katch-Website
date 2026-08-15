import { useState } from 'react';
import { ArrowDownRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { ButtonLink } from './Button';

const initialForm = {
  name: '',
  email: '',
  company: '',
  projectType: '',
  budget: '',
  details: '',
  website: '',
};

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) errors.email = 'Please enter a valid email address.';
  if (!values.projectType) errors.projectType = 'Please choose a project type.';
  if (!values.budget) errors.budget = 'Please choose a budget range.';
  if (values.details.trim().length < 20) errors.details = 'Tell us a little more—at least 20 characters.';
  return errors;
}

export function ClientCTA() {
  return (
    <section className="client-cta" aria-labelledby="client-cta-title">
      <div className="client-cta-inner shell reveal">
        <p className="eyebrow">The next move</p>
        <div>
          <h2 id="client-cta-title">Have a business<br />worth showing off?</h2>
          <p>Let&apos;s build a website that does it justice.</p>
        </div>
        <div className="client-cta-actions">
          <ButtonLink href="/contact" variant="dark">Start a Project</ButtonLink>
          <ButtonLink href="/demos" variant="dark-text">View Our Demos</ButtonLink>
        </div>
      </div>
    </section>
  );
}

export function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [serverMessage, setServerMessage] = useState('');

  const update = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: '' }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    setServerMessage('');

    if (Object.keys(nextErrors).length > 0) {
      setStatus('error');
      event.currentTarget.querySelector(`[name="${Object.keys(nextErrors)[0]}"]`)?.focus();
      return;
    }

    setStatus('submitting');
    try {
      const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT || '/api/contact';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, submittedAt: new Date().toISOString() }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || 'We could not send your request. Please try again.');
      setStatus('success');
      setForm(initialForm);
    } catch (error) {
      setStatus('error');
      setServerMessage(error.message || 'We could not send your request. Please try again in a moment.');
    }
  };

  const fieldClass = (name) => `form-field ${errors[name] ? 'form-field--error' : ''}`;

  return (
    <section className="contact section section--dark" aria-labelledby="contact-title">
      <div className="contact-layout shell">
        <div className="contact-intro reveal">
          <p className="eyebrow">Start a project</p>
          <h1 id="contact-title">Tell us what you&apos;re building.</h1>
          <p>Share the essentials. We&apos;ll review your project and come back with the clearest next step.</p>
          <div className="contact-expectation">
            <span>What happens next</span>
            <ol>
              <li><i>01</i>We review your project</li>
              <li><i>02</i>We clarify fit and scope</li>
              <li><i>03</i>We schedule a free consultation</li>
            </ol>
          </div>
        </div>

        <div className="contact-form-wrap reveal">
          {status === 'success' ? (
            <div className="form-success" role="status">
              <CheckCircle2 aria-hidden="true" />
              <p className="eyebrow">Request received</p>
              <h2>Thanks. Your project is on our radar.</h2>
              <p>We&apos;ll review the details and follow up using the email you provided.</p>
              <button type="button" onClick={() => setStatus('idle')}>
                Send another request <ArrowDownRight aria-hidden="true" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-grid">
                <div className={fieldClass('name')}>
                  <label htmlFor="name">Name <span aria-hidden="true">*</span></label>
                  <input id="name" name="name" value={form.name} onChange={update} autoComplete="name" placeholder="Your name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />
                  {errors.name && <small id="name-error">{errors.name}</small>}
                </div>
                <div className={fieldClass('email')}>
                  <label htmlFor="email">Email <span aria-hidden="true">*</span></label>
                  <input id="email" name="email" type="email" value={form.email} onChange={update} autoComplete="email" inputMode="email" placeholder="you@company.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />
                  {errors.email && <small id="email-error">{errors.email}</small>}
                </div>
                <div className={fieldClass('company')}>
                  <label htmlFor="company">Business / Company</label>
                  <input id="company" name="company" value={form.company} onChange={update} autoComplete="organization" placeholder="Company name" />
                </div>
                <div className={fieldClass('projectType')}>
                  <label htmlFor="projectType">Project Type <span aria-hidden="true">*</span></label>
                  <div className="select-wrap">
                    <select id="projectType" name="projectType" value={form.projectType} onChange={update} aria-invalid={Boolean(errors.projectType)} aria-describedby={errors.projectType ? 'project-type-error' : undefined}>
                      <option value="">Select a project</option>
                      <option>Business Website</option>
                      <option>Landing Page</option>
                      <option>E-commerce Website</option>
                      <option>Restaurant Website</option>
                      <option>Portfolio Website</option>
                      <option>SaaS Website</option>
                      <option>Website Redesign</option>
                      <option>AI Integration</option>
                      <option>Business Automation</option>
                      <option>Maintenance / Optimization</option>
                      <option>Other</option>
                    </select>
                    <ArrowDownRight aria-hidden="true" />
                  </div>
                  {errors.projectType && <small id="project-type-error">{errors.projectType}</small>}
                </div>
                <div className={`${fieldClass('budget')} form-field--full`}>
                  <label htmlFor="budget">Budget Range <span aria-hidden="true">*</span></label>
                  <div className="select-wrap">
                    <select id="budget" name="budget" value={form.budget} onChange={update} aria-invalid={Boolean(errors.budget)} aria-describedby={errors.budget ? 'budget-error' : undefined}>
                      <option value="">Select a range</option>
                      <option>$200 or less</option>
                      <option>$400 – $600</option>
                      <option>$700 – $1,000</option>
                      <option>$1,000+</option>
                    </select>
                    <ArrowDownRight aria-hidden="true" />
                  </div>
                  {errors.budget && <small id="budget-error">{errors.budget}</small>}
                </div>
                <div className={`${fieldClass('details')} form-field--full`}>
                  <label htmlFor="details">Project Details <span aria-hidden="true">*</span></label>
                  <textarea id="details" name="details" value={form.details} onChange={update} rows="5" placeholder="What do you need, what is not working today, and when would you like to launch?" aria-invalid={Boolean(errors.details)} aria-describedby={errors.details ? 'details-error' : 'details-hint'} />
                  <small id={errors.details ? 'details-error' : 'details-hint'}>{errors.details || 'A few useful details are enough to start.'}</small>
                </div>
                <div className="form-honeypot" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" value={form.website} onChange={update} tabIndex="-1" autoComplete="off" />
                </div>
              </div>

              <div className="form-submit-row">
                <button className="submit-button" type="submit" disabled={status === 'submitting'}>
                  <span>{status === 'submitting' ? 'Sending…' : 'Send Project Request'}</span>
                  <ArrowUpRight aria-hidden="true" />
                </button>
                <p>By submitting, you agree to be contacted about your project. No mailing list.</p>
              </div>
              <div className="form-status" aria-live="polite">
                {serverMessage && <p className="form-server-error">{serverMessage}</p>}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
