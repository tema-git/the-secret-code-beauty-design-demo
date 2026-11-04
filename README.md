# The Secret Code — demo site

Buildless HTML/CSS/JavaScript for GitHub Pages. Serve this directory through any static HTTP server. All asset paths are relative; no installation or build required.

## Making another salon copy

1. Copy the directory to a new project and retain its original version.
2. Change `config.js`: company address, phone and email. Data-bound text and links update on startup.
3. Edit `index.html`: title/meta, wordmarks, introduction, verified services, address detail, map query, footer and any brand lettering in the SVG flacon. Do not invent services, prices, results or availability.
4. Adapt the original SVG scene geometry and palette as needed. The current page uses no photography. Keep local licensed fonts and their OFL notices, or replace them with properly licensed alternatives.
5. Update tokens in `styles.css`. Preserve sticky Contacts, stable targets, body/control text sizes, transparent selection, vector arrows and system reduced-motion support.
6. Adapt the visit planner's labels and recommendation data in `app.js` to the new business. All three answers should materially affect the brief. Keep reset, stale-result clearing and form handoff consistent.
7. Keep the form demo notice truthful. This project has no booking backend. Changing `demoMode` in the config does not connect one. Never claim an actual booking without a working authorised integration.
8. Replace research and run the scenarios below before publishing. `noindex,follow` keeps the independent concept from competing with an official brand site.

## Functional scenarios

- Header/Contacts at desktop and 320px/390px; no horizontal overflow or focus obscured by the sticky header.
- Three service buttons show the correct panel and a visibly different SVG scene. All links hand the right service to the form, including after a previous success.
- Planner: incomplete warning; three native radio choices; preview; meaningful completed result; reset; rapid repeated choices. Try all priorities and time budgets.
- Planner → form: full brief and service transfer; same service confirmation preserves brief; different service or changed planner answer clears stale attached data.
- Combobox: click/touch; arrows/Home/End/typeahead; Enter/Space/Tab commit; Escape/outside cancel; selected and active states; opening near viewport edges; scrolling under header closes it.
- Form: empty/invalid name, letters in phone, misplaced plus, missing direction; valid demo success; cleared PII; repeat; service/plan handoff after success.
- Early reversible code motion, bounded pointer response, stationary action targets and system reduced motion. No manual motion setting.
- Real tel/mail/map links match researched contacts. No real message or booking is sent by the form.

Design decisions and exact references: `DESIGN.md`. Provenance: `assets/provenance.json`. Business research: `research.json`. Current verification: `QA.md`.

For future copies with longer branding or headlines, follow `TYPOGRAPHY.md`: preserve comfortable unitless leading, allow real wrapping, and measure an auto-height sticky header. It includes the actual local-font diagnosis and a small source guard; no brand replacement is built into the fix.
