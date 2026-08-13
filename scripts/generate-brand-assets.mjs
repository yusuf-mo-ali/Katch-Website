import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });

await page.setContent(`<!doctype html><html><style>
@font-face{font-family:Manrope;src:url('file:///home/user/katch/public/fonts/manrope-600.ttf')}@font-face{font-family:Instrument;src:url('file:///home/user/katch/public/fonts/instrument-serif-italic.ttf');font-style:italic}
*{box-sizing:border-box}html,body{margin:0;width:1200px;height:630px;overflow:hidden;background:#11110f;color:#fffefa;font-family:Manrope,Arial,sans-serif}.frame{position:relative;width:100%;height:100%;padding:54px 62px;display:flex;flex-direction:column;justify-content:space-between;background-image:linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px);background-size:72px 72px}.logo{font-size:31px;font-weight:600;letter-spacing:-.07em;display:flex;align-items:flex-end}.dot{width:10px;height:10px;border-radius:50%;background:#d7ff4f;margin:0 0 4px 3px}.label{position:absolute;right:62px;top:62px;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#989890}.headline{font-size:82px;line-height:.88;letter-spacing:-.067em;width:1030px}.headline em{display:block;color:#d7ff4f;font-family:Instrument,Georgia,serif;font-weight:400}.foot{display:flex;justify-content:space-between;align-items:end;border-top:1px solid rgba(255,255,255,.19);padding-top:20px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#aaa}.pill{border:1px solid rgba(255,255,255,.25);border-radius:999px;padding:9px 16px;color:#fff}
</style><body><div class="frame"><div class="logo">Katch<span class="dot"></span></div><div class="label">Web design & development</div><div class="headline">Websites that make businesses <em>impossible to ignore.</em></div><div class="foot"><span>Strategy · Design · Development · Optimization</span><span class="pill">Built for action ↘</span></div></div></body></html>`, { waitUntil: 'load' });
await page.waitForTimeout(500);
await page.screenshot({ path: 'public/og-image.png', type: 'png' });

await page.setViewportSize({ width: 180, height: 180 });
await page.setContent(`<!doctype html><html><style>*{box-sizing:border-box}html,body{margin:0;width:180px;height:180px;background:#11110f;color:#fffefa;font-family:Arial,sans-serif}.icon{width:180px;height:180px;display:grid;place-items:center;position:relative;font-size:110px;font-weight:700;letter-spacing:-.1em}.dot{position:absolute;width:20px;height:20px;border-radius:50%;background:#d7ff4f;right:24px;bottom:23px}</style><body><div class="icon">K<span class="dot"></span></div></body></html>`);
await page.screenshot({ path: 'public/apple-touch-icon.png', type: 'png' });
await browser.close();
