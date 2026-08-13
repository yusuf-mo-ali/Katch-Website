import { chromium } from 'playwright';
import { readFile } from 'node:fs/promises';

const logo = await readFile('public/katch-logo.png');
const logoData = `data:image/png;base64,${logo.toString('base64')}`;

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });

await page.setContent(`<!doctype html><html><style>
@font-face{font-family:Manrope;src:url('file:///home/user/katch/public/fonts/manrope-600.woff2')}@font-face{font-family:Instrument;src:url('file:///home/user/katch/public/fonts/instrument-serif-italic.woff2');font-style:italic}
*{box-sizing:border-box}html,body{margin:0;width:1200px;height:630px;overflow:hidden;background:#11110f;color:#fffefa;font-family:Manrope,Arial,sans-serif}.frame{position:relative;width:100%;height:100%;padding:54px 62px;display:flex;flex-direction:column;justify-content:space-between;background-image:linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px);background-size:72px 72px}.logo img{display:block;width:176px;height:auto;filter:invert(1)}.label{position:absolute;right:62px;top:62px;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#989890}.headline{font-size:82px;line-height:.88;letter-spacing:-.067em;width:1030px}.headline em{display:block;color:#d7ff4f;font-family:Instrument,Georgia,serif;font-weight:400}.foot{display:flex;justify-content:space-between;align-items:end;border-top:1px solid rgba(255,255,255,.19);padding-top:20px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#aaa}.pill{border:1px solid rgba(255,255,255,.25);border-radius:999px;padding:9px 16px;color:#fff}
</style><body><div class="frame"><div class="logo"><img src="${logoData}" alt="Katch"></div><div class="label">Web design & development</div><div class="headline">Websites that make businesses <em>impossible to ignore.</em></div><div class="foot"><span>Strategy · Design · Development · Optimization</span><span class="pill">Built for action ↘</span></div></div></body></html>`, { waitUntil: 'load' });
await page.waitForTimeout(500);
await page.screenshot({ path: 'public/og-image.png', type: 'png' });
await browser.close();
