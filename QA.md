# Revision verification — 2026-11-04

## Static and logic checks completed by the implementation agent

- `node --check app.js`, `node --check config.js` and `git diff --check`.
- Unique HTML IDs, resolved ARIA references, local asset existence, hash targets, balanced/non-nested anchors.
- No img/video/iframe or external image dependency in the page. Five original inline SVG scenes; vector details generated once by JavaScript.
- All 27 occasion/time/priority combinations evaluated from the actual planner code. Each produces distinct complete focus/time/preparation text and a coherent title. No promised service duration.
- Name cases: ordinary and hyphenated Unicode names accepted; `А1`, `А-`, one letter and punctuation rejected. Phone cases: valid digit/format forms accepted; letters, embedded/repeated plus and wrong digit counts rejected.
- Actual `setService` logic: same selection retains the attached brief, a different user selection clears it, programmatic handoff preserves it.
- Dropdown visibility guard closes when its trigger moves under the sticky header or outside the usable viewport. The menu is not placed inside an overflow-clipped art layer.
- Personal data cleared on demo success, repeat and pagehide. No fetch, storage, cookies, form endpoint, trackers or manually persisted motion preference.

## Browser verification

Actual browser QA completed in the in-app browser on the local revision:

- Widths 320, 390, 768, 1024, 1280 and 1440: document width equals viewport width; visible controls are at least 16px. The 320px Contacts button has its 16px right gutter and remains available while scrolling.
- Visually reviewed hero, compact introduction, all three distinct service scenes, planner and mobile form. Service switching works by click and Enter; only the active scene is exposed.
- Planner: incomplete submission focuses the first missing choice; completed hair/event/short, care/change/long and brows/everyday/medium combinations yield coherent results. Rapid changes, keyboard Space, reset and exact form handoff pass.
- Invalid name/phone and missing service produce errors/focus. Valid demo clears personal values. Retry and a new plan after success reopen the form correctly. Navigating away and Back leaves fields empty and menu closed.
- Dropdown: click, arrows, Home/End, Enter/Space/Tab and Escape pass. Same-value confirmation preserves the attached brief; a changed service clears it. Mobile popup fits the viewport and closes when its trigger goes under the header or offscreen.
- Contacts inner visual translates about 3px while its hitbox stays fixed. Text retains its ordinary cursor. Selection backgrounds are transparent with rose/plum lettering on dark/light surfaces.
- Early entry: intro progress 0.412 while its top is 664px in a 1000px viewport; reverse scroll returns to 0.166 at top 864px. Ring/silk transforms follow that progress.
- The reduced-motion branches were rendered through a local QA-only response substitution for the media condition. Decorative transforms stop, and the planner still reaches a result. No QA override is shipped.
- Browser error/warning log was empty in the tested flows. Shared integrity checker passes for syntax, IDs, ARIA, links, assets and explicit brief requirements.

Limits: mobile checks use resized browser viewports, not physical iOS/Android hardware or touch injection. OS setting integration was not toggled; its exact CSS/JS branches were tested through the QA route. Russian typeahead was code-tested, not verified with physical keyboard input. GitHub deployment evidence is recorded separately after publication.

## Key selectors

- `.hero-studio`, `.intro-art`, `.service-scene[data-service-scene]`, `.service-toggle[data-service]`
- Planner `#ritual`, `input[name=occasion]`, `input[name=budget]`, `input[name=priority]`, `#reveal-plan`, `#plan-result`, `#use-plan`, `#reset-plan`
- Form `#booking-form`, `#name`, `#phone`, `#service-trigger`, `#service-listbox [role=option]`, `#selected-plan`, `#booking-success`, `#booking-reset`
- Header `.magnetic-contact` (stable hitbox), `.magnetic-visual` (bounded visual)

## Heading and long-copy regression — 2026-11-04

- The publishing agent tested the actual content and a server-only longer-brand/heading fixture at widths 320, 390, 620, 621, 768, 800, 801, 1024, 1050, 1051 and 1440px. All passed with no horizontal overflow; `.hero h1` retained unitless leading 1.12 and no transform. No fixture wording is shipped.
- The long header's Contacts anchor landed at 139px while the sticky header bottom was 116.6px, leaving the target visible. Header minima remain 88/76px; actual rendered height is measured, including the approximately 79.4px normal mobile case.
- Final static review passed: one hero leading across breakpoint overrides, emergency wrapping, independent header minimum and measured offset, unchanged company text, no change to planner/contact behavior, JavaScript syntax and `git diff --check`. Local WOFF2 metrics and a portable source guard are documented in `TYPOGRAPHY.md`.
