/**
 * Capture step-by-step demo GIFs → animated WebP (1600×1200, ≤200KB)
 * from editor-free preview.
 *
 * Usage:
 *   pnpm exec vite --host 127.0.0.1 --port 5173
 *   node scripts/capture-element-gifs.mjs
 *   node scripts/capture-element-gifs.mjs --thumbs-only
 */
import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';
import gifenc from 'gifenc';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const { GIFEncoder, quantize, applyPalette } = gifenc;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const OUT_GIF = path.join(ROOT, 'notion-screenshots', 'gifs');
const OUT_WEBP = path.join(ROOT, 'notion-screenshots', 'webps');
const DESKTOP_THUMBS = path.join(
  process.env.HOME || '',
  'Desktop',
  'ثامبنيلز-عناصر-الأزياء-WebP'
);
const DEMO_URL =
  process.env.DEMO_URL ||
  'http://127.0.0.1:5174/node_modules/.salla-temp/index.html';
const W = 1600;
const H = 1200;
const FRAME_MS = 900;
const MAX_BYTES = 200 * 1024;

const ALL = [
  'abaya-length-calculator',
  'abaya-care-assistant',
  'abaya-fabric-lab',
  'abaya-style-duel',
  'abaya-style-swipe',
  'collection-reveal',
  'virtual-abaya-boutique',
  'abaya-comparison-arena',
  'abaya-look-builder',
  'abaya-configurator',
  'echo-salon',
  'silhouette-fit-ritual',
  'inquiry-parlour',
  'abaya-motion-mirror',
  'abaya-light-studio',
  'abaya-embroidery-map',
];

/** 6 featured Desktop thumbnails */
const THUMB_SIX = [
  'abaya-length-calculator',
  'abaya-style-duel',
  'abaya-style-swipe',
  'collection-reveal',
  'virtual-abaya-boutique',
  'abaya-configurator',
];

const thumbsOnly = process.argv.includes('--thumbs-only');
const COMPONENTS = thumbsOnly ? THUMB_SIX : ALL;

fs.mkdirSync(OUT_GIF, { recursive: true });
fs.mkdirSync(OUT_WEBP, { recursive: true });
fs.mkdirSync(DESKTOP_THUMBS, { recursive: true });

function fitToCanvas(pngBuffer, bg = [246, 240, 234]) {
  const src = PNG.sync.read(pngBuffer);
  const out = new PNG({ width: W, height: H });
  for (let i = 0; i < W * H; i++) {
    const o = i * 4;
    out.data[o] = bg[0];
    out.data[o + 1] = bg[1];
    out.data[o + 2] = bg[2];
    out.data[o + 3] = 255;
  }
  const scale = Math.min(W / src.width, H / src.height, 1);
  const dw = Math.max(1, Math.round(src.width * scale));
  const dh = Math.max(1, Math.round(src.height * scale));
  const ox = Math.floor((W - dw) / 2);
  const oy = Math.floor((H - dh) / 2);
  for (let y = 0; y < dh; y++) {
    for (let x = 0; x < dw; x++) {
      const sx = Math.min(src.width - 1, Math.floor(x / scale));
      const sy = Math.min(src.height - 1, Math.floor(y / scale));
      const si = (sy * src.width + sx) * 4;
      const di = ((oy + y) * W + (ox + x)) * 4;
      const a = src.data[si + 3] / 255;
      out.data[di] = Math.round(src.data[si] * a + bg[0] * (1 - a));
      out.data[di + 1] = Math.round(src.data[si + 1] * a + bg[1] * (1 - a));
      out.data[di + 2] = Math.round(src.data[si + 2] * a + bg[2] * (1 - a));
      out.data[di + 3] = 255;
    }
  }
  return out.data;
}

function encodeGif(framesRgba) {
  const gif = GIFEncoder();
  let palette;
  for (const data of framesRgba) {
    if (!palette) palette = quantize(data, 128);
    gif.writeFrame(applyPalette(data, palette), W, H, {
      palette,
      delay: FRAME_MS,
      dispose: 1,
    });
  }
  gif.finish();
  return Buffer.from(gif.bytes());
}

async function gifToWebpUnderLimit(gifBuf) {
  let quality = 55;
  let buf;
  for (let i = 0; i < 10; i++) {
    buf = await sharp(gifBuf, { animated: true, limitInputPixels: false })
      .webp({ quality, effort: 6, loop: 0 })
      .toBuffer();
    if (buf.length <= MAX_BYTES) return buf;
    quality -= 6;
    if (quality < 18) break;
  }
  // Last resort: fewer colors via lower quality + smaller effort already applied
  buf = await sharp(gifBuf, { animated: true, limitInputPixels: false })
    .webp({ quality: 15, effort: 6, loop: 0 })
    .toBuffer();
  return buf;
}

async function getHost(card) {
  const handle = await card.evaluateHandle((el) => {
    const name = el.getAttribute('data-component');
    return (
      [...el.querySelectorAll('*')].find((n) =>
        n.tagName.toLowerCase().startsWith(`salla-${name}`)
      ) || el
    );
  });
  return handle.asElement();
}

async function setStepBadge(card, label, step, total) {
  await card.evaluate(
    (el, payload) => {
      let bar = el.querySelector('.gif-demo-bar');
      if (!bar) {
        bar = document.createElement('div');
        bar.className = 'gif-demo-bar';
        bar.setAttribute(
          'style',
          [
            'position:sticky',
            'top:0',
            'z-index:50',
            'display:flex',
            'align-items:center',
            'justify-content:space-between',
            'gap:12px',
            'padding:14px 18px',
            'background:linear-gradient(90deg,#2c1810,#8b5e4b)',
            'color:#fff',
            'font:800 18px/1.35 "Segoe UI",Tahoma,sans-serif',
            'border-bottom:1px solid rgba(255,255,255,.2)',
            'direction:rtl',
          ].join(';')
        );
        el.insertBefore(bar, el.firstChild);
      }
      bar.innerHTML = `<span>${payload.label}</span><span style="opacity:.9;font-size:14px;font-weight:700">الخطوة ${payload.step} من ${payload.total}</span>`;
    },
    { label, step, total }
  );
}

async function clickInHost(page, host, selectors, index = 0) {
  return page.evaluate(
    ({ el, selectors, index }) => {
      const root = el.shadowRoot || el;
      for (const sel of selectors) {
        const nodes = [...root.querySelectorAll(sel)].filter((n) => {
          const s = getComputedStyle(n);
          const r = n.getBoundingClientRect();
          return (
            s.display !== 'none' &&
            s.visibility !== 'hidden' &&
            r.width > 4 &&
            r.height > 4 &&
            !n.disabled
          );
        });
        if (nodes[index]) {
          nodes[index].click();
          return true;
        }
      }
      return false;
    },
    { el: host, selectors, index }
  );
}

async function clickPrimaryNav(page, host) {
  return page.evaluate((el) => {
    const root = el.shadowRoot || el;
    const btns = [...root.querySelectorAll('button.fs-btn, button')].filter((n) => {
      const s = getComputedStyle(n);
      const r = n.getBoundingClientRect();
      const cls = n.className?.toString?.() || '';
      return (
        s.display !== 'none' &&
        s.visibility !== 'hidden' &&
        r.width > 20 &&
        !n.disabled &&
        !cls.includes('ghost') &&
        !cls.includes('close')
      );
    });
    const prefer = btns.find((b) =>
      /احسب|التالي|عرض|نتيجة|ابدأ|تسوق|قارن|صوّت|اكشف|Next|Reveal|Vote|Compare|Calculate/i.test(
        b.textContent || ''
      )
    );
    (prefer || btns[btns.length - 1])?.click();
    return Boolean(prefer || btns.length);
  }, host);
}

async function genericDemo(page, host, shot, labels) {
  await shot(labels[0]);
  for (let i = 1; i < labels.length; i++) {
    await clickInHost(page, host, ['button', '[role="button"]', 'input', 'label', 'a'], (i - 1) % 3);
    await page.waitForTimeout(400);
    await shot(labels[i]);
  }
}

const DEMOS = {
  async 'abaya-length-calculator'(page, host, shot) {
    const steps = [
      'البداية: إدخال طول العميلة',
      'اختيار نوع الحذاء',
      'حساب الطول المناسب',
      'عرض المقاس المقترح',
      'التسوق حسب النطاق',
    ];
    await shot(steps[0]);
    await clickInHost(page, host, ['input', '.alc-chip', 'button'], 0);
    await page.waitForTimeout(350);
    await shot(steps[1]);
    await clickInHost(page, host, ['.alc-chip', 'button'], 1);
    await page.waitForTimeout(350);
    await shot(steps[2]);
    await clickPrimaryNav(page, host);
    await page.waitForTimeout(550);
    await shot(steps[3]);
    await clickInHost(page, host, ['a', 'button.fs-btn', 'button'], 0);
    await page.waitForTimeout(400);
    await shot(steps[4]);
  },

  async 'abaya-care-assistant'(page, host, shot) {
    await genericDemo(page, host, shot, [
      'استعراض مساعد العناية',
      'اختيار نوع القماش',
      'عرض تعليمات الغسيل',
      'قراءة نصائح الكي والتخزين',
      'نسخ أو طباعة الدليل',
    ]);
  },

  async 'abaya-fabric-lab'(page, host, shot) {
    await genericDemo(page, host, shot, [
      'استعراض مختبر الأقمشة',
      'اختيار قماش أول',
      'قراءة خصائص القماش',
      'تفعيل المقارنة',
      'مقارنة قماشين جنبًا إلى جنب',
    ]);
  },

  async 'abaya-style-duel'(page, host, shot) {
    const steps = [
      'بداية تحدي العبايات',
      'التصويت للخيار الأول',
      'عرض نتيجة الجولة',
      'الانتقال للجولة التالية',
      'استكمال التحدي',
    ];
    await shot(steps[0]);
    await clickInHost(page, host, ['.asd-option', 'button', '[role="button"]'], 0);
    await page.waitForTimeout(500);
    await shot(steps[1]);
    await page.waitForTimeout(400);
    await shot(steps[2]);
    await clickInHost(page, host, ['button.fs-btn', 'button'], 0);
    await page.waitForTimeout(500);
    await shot(steps[3]);
    await clickInHost(page, host, ['.asd-option', 'button'], 1);
    await page.waitForTimeout(450);
    await shot(steps[4]);
  },

  async 'abaya-style-swipe'(page, host, shot) {
    const steps = [
      'بداية اكتشاف الذوق',
      'الإعجاب بإطلالة',
      'تخطي إطلالة',
      'متابعة السوايب',
      'عرض نتيجة الذوق',
    ];
    await shot(steps[0]);
    await clickInHost(page, host, ['.ass-btn-round--like', 'button'], 0);
    await page.waitForTimeout(500);
    await shot(steps[1]);
    await clickInHost(page, host, ['.ass-btn-round--skip', 'button'], 0);
    await page.waitForTimeout(500);
    await shot(steps[2]);
    await clickInHost(page, host, ['.ass-btn-round--like', 'button'], 0);
    await page.waitForTimeout(500);
    await shot(steps[3]);
    await clickInHost(page, host, ['.ass-btn-round--like', 'button', 'a'], 0);
    await page.waitForTimeout(550);
    await shot(steps[4]);
  },

  async 'collection-reveal'(page, host, shot) {
    const steps = [
      'مرحلة التشويق قبل الإطلاق',
      'العد التنازلي للمجموعة',
      'الانتقال لمرحلة الإطلاق',
      'كشف منتجات المجموعة',
      'استعراض بطاقات المنتجات',
    ];
    await shot(steps[0]);
    await page.waitForTimeout(600);
    await shot(steps[1]);
    await clickInHost(page, host, ['button.fs-btn', 'button', 'a'], 0);
    await page.waitForTimeout(700);
    await shot(steps[2]);
    await page.waitForTimeout(600);
    await shot(steps[3]);
    await page.waitForTimeout(400);
    await shot(steps[4]);
  },

  async 'virtual-abaya-boutique'(page, host, shot) {
    const steps = [
      'عرض خريطة البوتيك',
      'اختيار نقطة على الخريطة',
      'فتح بطاقة المنطقة',
      'استعراض منتجات المنطقة',
      'الانتقال لمنطقة أخرى',
    ];
    await shot(steps[0]);
    await clickInHost(page, host, ['.vab-card__dot', 'button', '[role="button"]'], 0);
    await page.waitForTimeout(500);
    await shot(steps[1]);
    await page.waitForTimeout(350);
    await shot(steps[2]);
    await clickInHost(page, host, ['a', 'button.fs-btn', 'button'], 0);
    await page.waitForTimeout(450);
    await shot(steps[3]);
    await clickInHost(page, host, ['.vab-card__dot', 'button'], 1);
    await page.waitForTimeout(450);
    await shot(steps[4]);
  },

  async 'abaya-comparison-arena'(page, host, shot) {
    await genericDemo(page, host, shot, [
      'فتح ساحة المقارنة',
      'اختيار منتج أول',
      'اختيار منتج ثانٍ',
      'عرض جدول المقارنة',
      'مراجعة الفروقات',
    ]);
  },

  async 'abaya-look-builder'(page, host, shot) {
    await genericDemo(page, host, shot, [
      'بداية منسقة الإطلالة',
      'اختيار تبويب الأساس',
      'إضافة قطعة للإطلالة',
      'التنقل لتبويب الإكسسوارات',
      'عرض ملخص الإطلالة',
    ]);
  },

  async 'abaya-configurator'(page, host, shot) {
    const steps = [
      'معاينة التصميم الأساسية',
      'اختيار خيار من المجموعة الأولى',
      'تحديث الطبقة في المعاينة',
      'اختيار خيار آخر',
      'مراجعة السعر والملخص',
    ];
    await shot(steps[0]);
    await clickInHost(page, host, ['.acfg-option', 'button'], 0);
    await page.waitForTimeout(500);
    await shot(steps[1]);
    await page.waitForTimeout(350);
    await shot(steps[2]);
    await clickInHost(page, host, ['.acfg-option', 'button'], 1);
    await page.waitForTimeout(450);
    await shot(steps[3]);
    await clickInHost(page, host, ['.acfg-option', 'button'], 2);
    await page.waitForTimeout(450);
    await shot(steps[4]);
  },

  async 'echo-salon'(page, host, shot) {
    await genericDemo(page, host, shot, [
      'استعراض رواق الشهادات',
      'التنقل لشهادة تالية',
      'قراءة تقييم العميلة',
      'عرض صورة وملاحظة المنتج',
      'متابعة الشهادات',
    ]);
  },

  async 'silhouette-fit-ritual'(page, host, shot) {
    await genericDemo(page, host, shot, [
      'بداية طقوس القياس',
      'عرض خطوة القياس الأولى',
      'الانتقال للخطوة التالية',
      'مراجعة جدول المقاسات',
      'اختيار المقاس المناسب',
    ]);
  },

  async 'inquiry-parlour'(page, host, shot) {
    await genericDemo(page, host, shot, [
      'فتح ديوان الأسئلة',
      'البحث أو تصفية الأسئلة',
      'فتح سؤال شائع',
      'قراءة الجواب',
      'استعراض تصنيف آخر',
    ]);
  },

  async 'abaya-motion-mirror'(page, host, shot) {
    await genericDemo(page, host, shot, [
      'عرض مرآة حركة العباية',
      'تشغيل تسلسل الحركة',
      'السحب للتحكم في الوقت',
      'قراءة معلومات الخامة',
      'فتح رابط المنتج',
    ]);
  },

  async 'abaya-light-studio'(page, host, shot) {
    await genericDemo(page, host, shot, [
      'استوديو الإضاءة والخامة',
      'اختيار وضع إضاءة',
      'مقارنة وضعين',
      'قراءة مؤشرات اللمعان',
      'تجربة وضع إضاءة آخر',
    ]);
  },

  async 'abaya-embroidery-map'(page, host, shot) {
    await genericDemo(page, host, shot, [
      'عرض خريطة التطريز',
      'اختيار نقطة تفصيلة',
      'قراءة وصف التطريز',
      'عرض صورة مقربة',
      'التنقل لتفصيلة أخرى',
    ]);
  },
};

async function captureComponent(page, name) {
  const cardSel = `.component-card[data-component="${name}"]`;
  const card = page.locator(cardSel).first();
  await card.waitFor({ state: 'attached', timeout: 60000 });
  await card.evaluate((el) => el.scrollIntoView({ block: 'center', inline: 'nearest' }));
  await page.waitForTimeout(800);

  const host = await getHost(card);
  if (!host) throw new Error(`No host for ${name}`);

  const frames = [];
  let stepIndex = 0;
  const totalSteps = 5;

  const shot = async (label) => {
    stepIndex += 1;
    const live = page.locator(cardSel).first();
    await setStepBadge(live, label, stepIndex, totalSteps);
    await page.waitForTimeout(220);
    const buf = await live.screenshot({ type: 'png', animations: 'allow' });
    frames.push(fitToCanvas(buf));
  };

  const demo = DEMOS[name];
  if (demo) await demo(page, host, shot);
  else await genericDemo(page, host, shot, ['استعراض', 'تفاعل 2', 'تفاعل 3', 'تفاعل 4', 'تفاعل 5']);

  if (frames.length < 3) throw new Error('Too few frames');
  return encodeGif(frames);
}

async function preparePage(page) {
  await page.goto(DEMO_URL, { waitUntil: 'networkidle', timeout: 120000 });
  await page.waitForSelector('.component-card[data-component]', { timeout: 90000 });
  await page.addStyleTag({
    content: `
      .sidebar, .nav-sidebar, .app-sidebar, .header-bar, .device-switcher,
      .form-builder, .settings-panel, .component-card-header, .component-card-actions,
      [class*="sidebar"], [class*="form-builder"], [class*="editor-panel"],
      .visibility-list, .empty-state, .template-switcher {
        display: none !important;
      }
      .app-body, .preview-area, .preview-viewport, main, .components-area {
        margin: 0 !important; padding: 0 !important; width: 100% !important; max-width: 100% !important;
      }
      body { background: #f6f0ea !important; }
      .component-card {
        border: none !important; box-shadow: none !important; background: #fff !important;
        margin: 0 auto 2rem !important; max-width: 1600px !important;
      }
    `,
  });
  await page.waitForTimeout(4000);
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: W, height: H + 260 },
  deviceScaleFactor: 1,
});

console.log(thumbsOnly ? 'Mode: 6 Desktop thumbnails' : 'Mode: all element step WebPs');
await preparePage(page);

const results = [];
for (let i = 0; i < COMPONENTS.length; i++) {
  const name = COMPONENTS[i];
  process.stdout.write(`${name}... `);
  let ok = false;
  for (let attempt = 0; attempt < 2 && !ok; attempt++) {
    try {
      if (attempt > 0 || i > 0 && i % 4 === 0) {
        await preparePage(page);
      }
      const gif = await captureComponent(page, name);
      const gifPath = path.join(OUT_GIF, `${name}.gif`);
      fs.writeFileSync(gifPath, gif);

      const webp = await gifToWebpUnderLimit(gif);
      const webpPath = path.join(OUT_WEBP, `${name}.webp`);
      fs.writeFileSync(webpPath, webp);

      if (THUMB_SIX.includes(name)) {
        fs.copyFileSync(webpPath, path.join(DESKTOP_THUMBS, `${name}.webp`));
      }

      const over = webp.length > MAX_BYTES ? ' OVER' : '';
      console.log(`gif=${(gif.length / 1024).toFixed(0)}KB webp=${(webp.length / 1024).toFixed(0)}KB${over}`);
      results.push({
        name,
        gifPath,
        webpPath,
        gifSize: gif.length,
        webpSize: webp.length,
        ok: webp.length <= MAX_BYTES,
      });
      ok = true;
    } catch (err) {
      if (attempt === 1) {
        console.log('FAIL', err.message);
        results.push({ name, ok: false, error: String(err.message || err) });
      } else {
        process.stdout.write('retry... ');
      }
    }
  }
}

if (!thumbsOnly) {
  for (const name of THUMB_SIX) {
    const src = path.join(OUT_WEBP, `${name}.webp`);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(DESKTOP_THUMBS, `${name}.webp`));
  }
}

fs.writeFileSync(path.join(OUT_WEBP, 'manifest.json'), JSON.stringify(results, null, 2));
await browser.close();
console.log(`DONE ${results.filter((r) => r.ok).length}/${results.length} under 200KB`);
console.log(`Desktop thumbs → ${DESKTOP_THUMBS}`);
