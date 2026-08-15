import { chromium } from 'playwright';

const baseURL = process.env.QA_BASE_URL || 'http://127.0.0.1:5173';
const browser = await chromium.launch({ headless: true });
const failures = [];
const notes = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

async function openPage(path, viewport) {
  const page = await browser.newPage({ viewport });
  const errors = [];
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(`console: ${message.text()}`);
  });
  page.on('pageerror', (error) => errors.push(`page: ${error.message}`));
  page.on('response', (response) => {
    if (response.status() >= 400 && !response.url().includes('/api/contact')) {
      errors.push(`${response.status()}: ${response.url()}`);
    }
  });
  await page.goto(`${baseURL}${path}`, { waitUntil: 'networkidle' });
  return { page, errors };
}

const primaryRoutes = ['/', '/work', '/services', '/process', '/about', '/contact'];
const caseRoutes = [
  '/work/smash-burger',
  '/work/bta3-7awa4y',
  '/work/raw',
  '/work/refined-artistry',
];
const widths = [320, 360, 375, 390, 414, 768, 820, 1024, 1280, 1440, 1920];

for (const width of widths) {
  const height = width <= 414 ? 844 : width <= 820 ? 1024 : 960;
  for (const route of primaryRoutes) {
    const { page, errors } = await openPage(route, { width, height });
    const result = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      h1Count: document.querySelectorAll('h1').length,
      brokenImages: Array.from(document.images).filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.src),
      emptyControls: Array.from(document.querySelectorAll('a, button')).filter((element) => !element.getAttribute('aria-label') && !element.textContent.trim() && !element.querySelector('img[alt]')).length,
    }));
    check(result.scrollWidth <= result.clientWidth + 1, `${width}px ${route}: horizontal overflow ${result.scrollWidth}/${result.clientWidth}`);
    check(result.h1Count === 1, `${width}px ${route}: expected one h1, found ${result.h1Count}`);
    check(result.brokenImages.length === 0, `${width}px ${route}: broken images ${result.brokenImages.join(', ')}`);
    check(result.emptyControls === 0, `${width}px ${route}: ${result.emptyControls} unnamed controls`);
    check(errors.length === 0, `${width}px ${route}: ${errors.join(' | ')}`);
    await page.close();
  }
  notes.push(`Responsive routes passed at ${width}px`);
}

for (const route of [...caseRoutes, '/404', '/not-a-real-page']) {
  for (const width of [390, 1440]) {
    const { page, errors } = await openPage(route, { width, height: width === 390 ? 844 : 960 });
    const result = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1: document.querySelector('h1')?.textContent.trim(),
      title: document.title,
    }));
    check(result.overflow <= 1, `${route} at ${width}px: horizontal overflow ${result.overflow}`);
    check(Boolean(result.h1), `${route} at ${width}px: missing h1`);
    check(errors.length === 0, `${route} at ${width}px: ${errors.join(' | ')}`);
    if (route.includes('not-a-real') || route === '/404') check(result.h1 === 'Page not found.', `${route}: wrong 404 heading`);
    await page.reload({ waitUntil: 'networkidle' });
    check((await page.locator('h1').count()) === 1, `${route} at ${width}px: refresh failed`);
    await page.close();
  }
}
notes.push('Case studies, 404, and direct refresh checks passed');

// Mobile menu at every meaningful scroll position and on short screens.
for (const [width, height] of [[320, 568], [360, 640], [375, 667], [390, 844], [414, 896], [812, 375]]) {
  const { page, errors } = await openPage('/', { width, height });
  const maximumScroll = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  for (const ratio of [0, 0.25, 0.5, 0.9]) {
    await page.evaluate((top) => window.scrollTo(0, top), maximumScroll * ratio);
    await page.waitForTimeout(80);
    const before = await page.evaluate(() => window.scrollY);
    await page.locator('.menu-toggle').click();
    await page.waitForTimeout(460);
    const menu = await page.evaluate(() => {
      const layer = document.querySelector('.mobile-nav-layer');
      const panel = document.querySelector('.mobile-nav-panel');
      const cta = document.querySelector('.mobile-nav-cta');
      const panelRect = panel.getBoundingClientRect();
      const ctaRect = cta.getBoundingClientRect();
      return {
        open: layer.classList.contains('mobile-nav-layer--open'),
        panelTop: panelRect.top,
        panelBottom: panelRect.bottom,
        panelRight: panelRect.right,
        panelLeft: panelRect.left,
        ctaTop: ctaRect.top,
        ctaBottom: ctaRect.bottom,
        panelScrollHeight: panel.scrollHeight,
        panelClientHeight: panel.clientHeight,
        bodyPosition: getComputedStyle(document.body).position,
        bodyTop: getComputedStyle(document.body).top,
      };
    });
    check(menu.open, `${width}x${height} @${ratio}: menu did not open`);
    check(menu.panelTop >= -1 && menu.panelBottom <= height + 1, `${width}x${height} @${ratio}: panel outside viewport`);
    check(menu.panelLeft >= -1 && menu.panelRight <= width + 1, `${width}x${height} @${ratio}: panel horizontal overflow`);
    check(menu.ctaBottom <= Math.max(menu.panelBottom, menu.panelScrollHeight + menu.panelTop) + 1, `${width}x${height} @${ratio}: CTA clipped`);
    check(menu.bodyPosition === 'fixed', `${width}x${height} @${ratio}: body was not scroll locked`);
    check(Math.abs(Number.parseFloat(menu.bodyTop) + before) <= 1, `${width}x${height} @${ratio}: body lock changed visual position`);

    await page.keyboard.press('Escape');
    await page.waitForTimeout(80);
    const restored = await page.evaluate(() => window.scrollY);
    check(Math.abs(restored - before) <= 1, `${width}x${height} @${ratio}: scroll not restored ${before}/${restored}`);
  }
  check(errors.length === 0, `${width}x${height} menu: ${errors.join(' | ')}`);
  await page.close();
}
notes.push('Mobile menu passed top, 25%, 50%, and near-bottom checks');

// Outside click, repeated opening, focus trap, Escape, and mobile route navigation.
{
  const { page, errors } = await openPage('/', { width: 390, height: 844 });
  for (let index = 0; index < 3; index += 1) {
    await page.locator('.menu-toggle').click();
    await page.waitForTimeout(60);
    check(await page.locator('.mobile-nav-layer--open').isVisible(), `Repeated menu open ${index + 1} failed`);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(60);
  }
  await page.locator('.menu-toggle').focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(80);
  check(await page.locator('.mobile-nav-close').evaluate((element) => document.activeElement === element), 'Menu close button did not receive focus');
  await page.keyboard.press('Shift+Tab');
  check(await page.locator('.mobile-nav-panel').evaluate((panel) => panel.contains(document.activeElement)), 'Keyboard focus escaped the menu panel');
  await page.locator('.mobile-nav-cta').focus();
  await page.keyboard.press('Tab');
  check(await page.locator('.mobile-nav-brand').evaluate((element) => document.activeElement === element), 'Focus trap did not wrap forward');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(80);
  check(await page.locator('.menu-toggle').evaluate((element) => document.activeElement === element), 'Escape did not restore focus to menu button');

  await page.locator('.menu-toggle').click();
  await page.waitForTimeout(80);
  await page.mouse.click(2, 2);
  await page.waitForTimeout(80);
  check((await page.locator('.mobile-nav-layer--open').count()) === 0, 'Outside click did not close menu');

  await page.locator('.menu-toggle').click();
  await page.locator('.mobile-nav-links a').filter({ hasText: 'Work' }).click();
  await page.locator('.page-hero h1').waitFor();
  await page.waitForTimeout(120);
  check(new URL(page.url()).pathname === '/work', 'Mobile Work link did not navigate to /work');
  check((await page.locator('.mobile-nav-layer--open').count()) === 0, 'Menu did not close after route navigation');
  check((await page.evaluate(() => window.scrollY)) <= 1, 'New route did not start at top');
  check((await page.locator('.desktop-nav a.is-active').count()) === 1, 'Active navigation state missing');
  check(errors.length === 0, `Mobile interaction errors: ${errors.join(' | ')}`);
  await page.close();
}
notes.push('Mobile menu outside click, focus, Escape, repeat, and navigation passed');

// Browser back/forward and scroll restoration.
{
  const { page } = await openPage('/', { width: 1280, height: 900 });
  await page.evaluate(() => window.scrollTo(0, 1100));
  await page.waitForTimeout(100);
  const previousScroll = await page.evaluate(() => window.scrollY);
  await page.locator('.desktop-nav a').filter({ hasText: 'Work' }).click();
  await page.locator('.page-hero h1').waitFor();
  await page.waitForTimeout(160);
  check((await page.evaluate(() => window.scrollY)) <= 1, 'Push navigation did not reset scroll');
  await page.goBack({ waitUntil: 'networkidle' });
  await page.waitForTimeout(180);
  const restoredScroll = await page.evaluate(() => window.scrollY);
  check(Math.abs(restoredScroll - previousScroll) < 60, `Back navigation did not restore scroll ${previousScroll}/${restoredScroll}`);
  await page.goForward({ waitUntil: 'networkidle' });
  check(new URL(page.url()).pathname === '/work', 'Forward navigation failed');
  await page.close();
}
notes.push('Scroll restoration and browser history passed');

// Contact form validation, exact budget option, successful submission UI.
{
  const { page, errors } = await openPage('/contact', { width: 390, height: 844 });
  await page.locator('.submit-button').click();
  check((await page.locator('.form-field--error').count()) === 5, 'Required form validation did not show five errors');
  await page.locator('#name').fill('Alex Morgan');
  await page.locator('#email').fill('alex@example.com');
  await page.locator('#company').fill('North Studio');
  await page.locator('#projectType').selectOption({ label: 'Business Website' });
  await page.locator('#budget').selectOption({ label: '$700 – $1,000' });
  await page.locator('#details').fill('We need a focused business website that explains our services and generates qualified enquiries.');
  check((await page.locator('#budget').inputValue()) === '$700 – $1,000', 'Budget value did not remain selected');
  const selectRect = await page.locator('#budget').evaluate((element) => element.getBoundingClientRect().toJSON());
  check(selectRect.left >= 0 && selectRect.right <= 390, 'Budget select overflowed mobile viewport');
  await page.route('**/api/contact', (route) => route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }));
  await page.locator('.submit-button').click();
  await page.locator('.form-success').waitFor();
  check(await page.locator('.form-success').isVisible(), 'Successful form state did not render');
  check(errors.length === 0, `Contact form errors: ${errors.join(' | ')}`);
  await page.close();
}
notes.push('Contact validation, budget, mobile select, and success state passed');

await browser.close();
console.log(notes.join('\n'));
if (failures.length) {
  console.error(`\nQA FAILURES (${failures.length})`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}
console.log('\nProduction QA passed with no failures.');
