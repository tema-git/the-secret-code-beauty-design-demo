# The Secret Code — demo site

Buildless HTML/CSS/JavaScript, intended for GitHub Pages. Open `index.html` through any static HTTP server. All asset paths are relative; no installation or build required.

## Making another salon copy

1. Copy this directory to a new project. Keep the existing source intact.
2. Change `config.js`: company address, phone and email. Data-bound content and links update on startup.
3. Edit `index.html`: title/meta, brand wordmarks, headline, verified service descriptions, address detail, map query, image labels and footer. Static content remains meaningful before JavaScript loads.
4. Replace static photos in `assets/` and update `assets/provenance.json`; do not imply stock/AI photos are client work. Licensed font files and their OFL notices are included.
5. Update tokens at the top of `styles.css` if the brand palette changes. Preserve the accessibility and interaction requirements documented in `DESIGN.md`.
6. Keep demoMode truthful. This project has no booking backend. Changing the config flag alone does not connect one.
7. Update research and test the scenarios below before publishing. `noindex,follow` keeps the independent concept from competing with an official brand site.

## Scenarios to check

- Navigation and Contacts at desktop and 390px/320px mobile; no horizontal overflow.
- Each service accordion by mouse and keyboard; correct aria-expanded and linked panel.
- Beauty code: missing choice warning; each choice group; completed result; reset; rapid clicks.
- Form: empty and malformed fields; valid demo submission; cleared name/phone; success message; restart.
- Motion begins at section entry, reverses during scroll, pointer does not move hit targets.
- Footer reduced-motion switch and OS preference; all content and actions remain usable.
- External tel/mail/map links match verified contacts.

Research: `research.json`. Design and reference adaptation: `DESIGN.md`. Asset source and generation prompts: `assets/provenance.json`. No paid source code or media from reference websites is bundled.
