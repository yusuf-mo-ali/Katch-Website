import { chromium } from 'playwright';
import fs from 'node:fs/promises';

await fs.mkdir('audit', { recursive: true });
const browser = await chromium.launch({ headless: true });
const errors = [];
const widths = [320, 375, 390, 414, 768, 1024, 1280, 1440, 1920];

for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: width < 600 ? 844 : 960 } });
  page.on('console', (msg) => { if (msg.type() === 'error') errors.push(`${width}: ${msg.text()}`); });
  page.on('pageerror', (error) => errors.push(`${width}: ${error.message}`));
  await page.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
  const metrics = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    bodyWidth: document.body.scrollWidth,
    h1: document.querySelector('h1')?.textContent.trim(),
    buttons: document.querySelectorAll('button, a').length,
  }));
  console.log(width, metrics);
  if (metrics.scrollWidth > metrics.viewport + 1) errors.push(`${width}: horizontal overflow ${metrics.scrollWidth} > ${metrics.viewport}`);
  if (width === 390) await page.screenshot({ path: 'audit/mobile-home.jpg', type: 'jpeg', quality: 80, fullPage: true });
  if (width === 1440) await page.screenshot({ path: 'audit/desktop-home.jpg', type: 'jpeg', quality: 78, fullPage: true });
  await page.close();
}

const interaction = await browser.newPage({ viewport: { width: 390, height: 844 } });
await interaction.goto('http://127.0.0.1:5173/', { waitUntil: 'networkidle' });
await interaction.locator('.menu-toggle').click();
console.log('mobile menu open:', await interaction.locator('.mobile-menu').getAttribute('class'));
await interaction.locator('.menu-toggle').click();
await interaction.locator('.project-card').first().scrollIntoViewIfNeeded();
await interaction.locator('.project-card .project-visual button').first().click();
console.log('case dialog open:', await interaction.locator('.case-dialog').evaluate((el) => el.open));
console.log('case title:', await interaction.locator('.case-intro h2').textContent());
await interaction.locator('.case-icon-close').click();
await interaction.locator('#contact').scrollIntoViewIfNeeded();
await interaction.locator('.submit-button').click();
console.log('validation errors:', await interaction.locator('.form-field--error').count());

await browser.close();
console.log('ERRORS', errors);
if (errors.length) process.exitCode = 1;
