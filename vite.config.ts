import { defineConfig } from 'vite';
import {
  sallaBuildPlugin,
  sallaDemoPlugin,
  sallaTransformPlugin,
} from '@salla.sa/twilight-bundles/vite-plugins';

// Avoid unhandled 'error' on readline when the terminal TTY drops (Node 22/24 + EIO).
for (const stream of [process.stdin, process.stdout, process.stderr]) {
  stream?.on?.('error', (err: NodeJS.ErrnoException) => {
    if (err?.code === 'EIO' || err?.code === 'EPIPE') return;
  });
}

/**
 * Seeds localStorage with twilight-bundle.json field defaults so the demo
 * renders components immediately (Salla demo only reads saved form data).
 */
const seedDemoDefaultsJs = `
(function seedTwilightDemoDefaults() {
  function isEmptyData(data) {
    if (!data || typeof data !== 'object') return true;
    return !Object.keys(data).some(function (key) {
      return key !== 'twilight-bundles-component-name' && data[key] != null && data[key] !== '';
    });
  }

  function buildDefaults(raw) {
    var data = {};
    if (!raw || !Array.isArray(raw.fields)) return data;

    raw.fields.forEach(function (field) {
      if (!field || !field.id) return;
      if (field.type === 'static') return;
      if (String(field.id).indexOf('static-') === 0) return;
      if (field.id === 'twilight-bundles-component-name') return;

      if (field.type === 'collection') {
        data[field.id] = Array.isArray(field.value) ? field.value : [];
        return;
      }

      if (field.format === 'dropdown-list' && Array.isArray(field.selected) && field.selected[0]) {
        var pick = field.selected[0];
        data[field.id] =
          pick && typeof pick === 'object'
            ? pick.value != null
              ? pick.value
              : pick.key != null
                ? pick.key
                : pick
            : pick;
        return;
      }

      if (typeof field.value !== 'undefined') {
        data[field.id] = field.value;
      }
    });

    return data;
  }

  function migrateMotionMirrorSpeed(data) {
    if (!data || typeof data !== 'object') return data;
    var fps = data.amm_fps;
    var val = fps;
    if (fps && typeof fps === 'object') {
      if (Array.isArray(fps.selected) && fps.selected[0]) {
        val = fps.selected[0].value != null ? fps.selected[0].value : fps.selected[0].key;
      } else if (fps.value != null) {
        val = fps.value;
      }
    }
    var n = Number(val);
    if (n === 6 || n === 8 || n === 12 || n === 15) {
      data.amm_fps = {
        selected: [{ key: '1', label: '1 FPS (بطيء)', value: '1' }],
        options: [],
        source: 'Manual',
      };
    }
    return data;
  }

  function seed() {
    var rawMap = window.customComponentsRaw || {};
    var seeded = false;

    Object.keys(rawMap).forEach(function (name) {
      var key = 'form-builder::data_' + name;
      var existingRaw = localStorage.getItem(key);
      var shouldSeed = !existingRaw;

      if (existingRaw) {
        try {
          var parsed = JSON.parse(existingRaw);
          if (name === 'abaya-motion-mirror') {
            var before = JSON.stringify(parsed.amm_fps);
            parsed = migrateMotionMirrorSpeed(parsed);
            if (JSON.stringify(parsed.amm_fps) !== before) {
              localStorage.setItem(key, JSON.stringify(parsed));
              seeded = true;
            }
          }
          shouldSeed = isEmptyData(parsed);
        } catch (err) {
          shouldSeed = true;
        }
      }

      if (!shouldSeed) return;

      var defaults = buildDefaults(rawMap[name]);
      if (!Object.keys(defaults).length) return;

      localStorage.setItem(key, JSON.stringify(defaults));
      seeded = true;
    });

    if (seeded) {
      console.info('[demo] Seeded default component data from twilight-bundle.json');
    }
  }

  seed();
  document.addEventListener('DOMContentLoaded', seed);
})();
`;

export default defineConfig({
  plugins: [
    sallaTransformPlugin(),
    sallaBuildPlugin(),
    sallaDemoPlugin({
      js: seedDemoDefaultsJs,
    }),
    },
    {
      name: 'no-cache-headers',
      configureServer(server) {
        server.middlewares.use((_req, res, next) => {
          res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
          res.setHeader('Pragma', 'no-cache');
          res.setHeader('Expires', '0');
          next();
        });
      },
      configurePreviewServer(server) {
        server.middlewares.use((_req, res, next) => {
          res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
          res.setHeader('Pragma', 'no-cache');
          res.setHeader('Expires', '0');
          next();
        });
      },
    },
  ],
});
