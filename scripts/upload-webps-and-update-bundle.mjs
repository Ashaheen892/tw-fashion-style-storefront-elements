/**
 * Upload animated WebPs to catbox.moe and update twilight-bundle.json image/preview_image.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const WEBP_DIR = path.join(ROOT, 'notion-screenshots', 'webps');
const BUNDLE = path.join(ROOT, 'twilight-bundle.json');
const URLS_OUT = path.join(WEBP_DIR, 'urls.json');

async function uploadCatbox(filePath) {
  const buf = fs.readFileSync(filePath);
  const blob = new Blob([buf], { type: 'image/webp' });
  const form = new FormData();
  form.append('reqtype', 'fileupload');
  form.append('fileToUpload', blob, path.basename(filePath));
  const res = await fetch('https://catbox.moe/user/api.php', {
    method: 'POST',
    body: form,
  });
  const text = (await res.text()).trim();
  if (!res.ok || !text.startsWith('https://')) {
    throw new Error(`Upload failed for ${path.basename(filePath)}: ${text}`);
  }
  return text;
}

const files = fs
  .readdirSync(WEBP_DIR)
  .filter((f) => f.endsWith('.webp'))
  .sort();

if (!files.length) {
  console.error('No WebPs found in', WEBP_DIR);
  process.exit(1);
}

const urls = {};
for (const file of files) {
  const name = file.replace(/\.webp$/, '');
  process.stdout.write(`upload ${name}... `);
  let url;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      url = await uploadCatbox(path.join(WEBP_DIR, file));
      break;
    } catch (e) {
      if (attempt === 2) throw e;
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
  urls[name] = url;
  console.log(url);
}

fs.writeFileSync(URLS_OUT, JSON.stringify(urls, null, 2));

const bundle = JSON.parse(fs.readFileSync(BUNDLE, 'utf8'));
let updated = 0;
for (const comp of bundle.components || []) {
  if (urls[comp.name]) {
    comp.image = urls[comp.name];
    comp.preview_image = urls[comp.name];
    updated++;
  }
}
fs.writeFileSync(BUNDLE, JSON.stringify(bundle, null, 4) + '\n');
console.log(`Updated ${updated} components in twilight-bundle.json`);
console.log('URLs saved to', URLS_OUT);
