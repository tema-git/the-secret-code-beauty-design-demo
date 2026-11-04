# Portable heading and header guard

This is a targeted fix on the salon design, starting from `3265a21`. It changes neither company identity nor service, planner or booking behavior. Apply the principle to another site after checking its actual font; do not copy a whole stylesheet or font catalog.

## Why the heading touched

The local Cormorant Garamond Cyrillic WOFF2 at weight 400 has these ink metrics, measured directly with FreeType/Pillow at 1000px:

- `р`: 274 units below the baseline.
- `Н`: 623 units above the baseline.
- Combined clearance requirement: 897 units.
- Previous `.hero h1` line-height `.9`: only 900 units between baselines, leaving 3 units. At 122.4px this is approximately 0.367px, so raster edges visually touch.

The heading has ordinary `<br>` line breaks. Neither `h1` nor `.hero-copy` has a scroll/pointer transform or negative vertical offset. The cramped leading, including its duplicated mobile override, caused the collision.

## Minimal typography rule

`.hero h1` now has one unitless `line-height: 1.12` for every breakpoint. Existing font-size clamps remain intact. At a 70px mobile size the current `р`/`Н` pair has about 15.61px of ink clearance. A 1.12em baseline step also leaves room for the local font's taller accented capitals and descenders.

`.hero-copy { min-width: 0 }` lets the grid/flex child shrink. `.hero h1 { overflow-wrap: anywhere }` permits an emergency break for a single word wider than the column. Ordinary words still wrap at spaces. No glyph clipping, masking, line clamping, fixed title height, negative margin or corrective transform is used.

For a future longer heading, first curate its natural line breaks or remove the deliberate `<br>` elements; allow more lines and more hero height. Keep the current company's wording unchanged. If that copy needs a smaller size, adjust its font-size clamp, independently of leading. Do not squeeze leading to force text into a fixed height.

## A longer company name

- `.wordmark` can wrap and break an exceptionally long word. Its current font sizes are unchanged.
- `.header .wordmark` has `max-width: 24rem`; the Contacts anchor keeps `flex: none`.
- `.header` has `height: auto`, `min-height: var(--header-min)` and vertical padding. The CSS minima are 88px desktop / 76px mobile, not guaranteed rendered heights. Normal mobile content measured about 79.4px in browser QA; longer branding can increase this further.
- `--header-min` is the independent CSS minimum. `--header` is the measured sticky-header height used by scroll padding, focus margins and sticky art.
- `syncHeaderHeight()` in `app.js` measures the actual header; `ResizeObserver`, resize, load, pageshow and font readiness keep the offset current. Measuring must never overwrite `--header-min`, or a grown header would stop shrinking on a wider viewport.

Keep the outer Contacts anchor stationary. This fix affects text flow and header dimensions, not the magnetic visual or normal scroll/pointer scenes.

## Source guard

Run in this repository; the check prevents reintroducing a conflicting mobile leading or a fixed header height:

```sh
node --check app.js
node <<'JS'
const fs = require('fs');
const assert = require('assert');
const css = fs.readFileSync('styles.css', 'utf8');
const rules = [...css.matchAll(/\.hero h1\{([^}]+)\}/g)].map(match => match[1]);
const leading = rules.flatMap(rule => [...rule.matchAll(/(?:^|;)line-height:([\d.]+)(?:;|$)/g)].map(match => Number(match[1])));
assert.deepEqual(leading, [1.12]);
assert(rules[0].includes('overflow-wrap:anywhere'));
for (const [, rule] of css.matchAll(/\.header\{([^}]+)\}/g)) {
  assert(!/(?:^|;)height:(?!auto)[^;]+/.test(rule));
}
console.log('Heading/header source guard passed.');
JS
git diff --check
```

Source checks complement visual checks; they do not measure rendered line boxes. Test real and longer fixture copy at 320/390/620/621/768/800/801/1024/1050/1051/1280/1440px, after fonts load, at initial scroll and during pointer/scroll motion. Check full glyphs, no horizontal overflow, reachable Contacts, correct anchor/focus offset and header shrinking again after resizing wider. Repeat with system reduced motion. The parent agent owns the browser run and screenshots.
