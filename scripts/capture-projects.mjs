import { chromium } from 'playwright';

const projects = [
  ['smash', 'https://smash-burger-co-phi.vercel.app/'],
  ['bta3', 'https://bta3-7awa4y-demo.vercel.app/'],
  ['raw', 'https://raw-clothing-brand.vercel.app/'],
  ['refined', 'https://refined-artistry-platform.lovable.app/'],
];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 960 },
  deviceScaleFactor: 1,
  reducedMotion: 'reduce',
});

for (const [name, url] of projects) {
  const page = await context.newPage();
  console.log(`Capturing ${name}…`);
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90_000 });
  await page.waitForTimeout(7_000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(700);
  await page.screenshot({
    path: `public/projects/${name}-preview.jpg`,
    type: 'jpeg',
    quality: 86,
    fullPage: false,
  });
  await page.close();
}

await browser.close();
