# The Secret Code — revised design system

Independent Russian-language concept for the real salon. Five substantive sections: hero, compact introduction, three service directions, personal visit planner, contacts and demo booking. Deep wine, rose metal, glass and silk are the visual language. All visible artwork is original inline SVG; no photographs, raster motion, video, imported component code or external runtime.

## Visual direction

- Palette: plum `#351528`, wine `#54213c`, rose `#f1a9c7`, pale paper `#f9eef1`. Rose is the primary action on wine; plum is the primary action on paper. Selection changes letters only: berry on light surfaces and pale rose on dark surfaces, with transparent background and no shadow.
- Cormorant Garamond provides expressive Cyrillic headlines; Manrope provides body text and controls. Body 18px, controls 16px minimum, secondary copy 14px. The tiny wordmark subline is part of the brand lockup, not navigation or content.
- Hero artwork: an oval mirror with a sculpted rose-metal edge, reflective glass, a folded silk ribbon, translucent perfume bottle and pearls. Material comes from layered vector gradients and strokes. Separate groups respond to scroll and pointer movement.
- Compact introduction: a ribbon threads through an integrated mirror ring, with no framed image or arbitrary card. Less vertical space and short purposeful copy.
- Distinct service art: individual glossy hair strands and comb; eye, eyebrow hairs and brush; glass dropper, layered stones and steam paths. Switching directions transitions both the scene and its relevant copy.
- The former mood card, photo interlude and generic process section are replaced by one useful visit planner. No section-count padding, fake masters, reviews, prices or appointment availability.

## References inspected in the shared design pass — 2026-11-04

- https://styles.refero.design/style/cdc4a162-cefa-49a1-81e7-4857e421ae24 — Adam Lippes: editorial hierarchy and large focal objects. Adapted to Cyrillic scale and the existing wine palette, without copying photographic assets or small labels.
- https://styles.refero.design/style/efd8dda0-b7dc-4b0b-b65f-348849d2cd65 — Glossier: product-sized objects, confident spacing and clear service/product emphasis. Interpreted through original material illustrations.
- https://21st.dev/@mohammadshehadeh/components/magnetic-button and https://mcp.21st.dev/blog/react-magnetic-cursor-effects — public descriptions informed bounded magnetism and spring-back. The live preview timed out; no component source was imported or claimed tested. Original vanilla implementation: fixed anchor hitbox and an inner visual moving at most 5px horizontally / 4px vertically.
- https://motionsites.ai/lesson/build-scroll-animated-website-with-ai — independent text/art layers and native scroll mapped to progress. Adapted to real SVG geometry, separate object travel and path drawing; no video, image sequence or tiny-type prompt copied.
- https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/ — accessible select-only combobox model. DOM focus stays on the trigger; arrows/Home/End/typeahead highlight; Enter/Space/Tab commit; Escape/outside cancel. Active options stay visible.

Local skills applied: source-guided-web-design, frontend-design, motion best practices. These references guide original implementation; the user's twelve site requirements and latest revision brief take precedence.

## Motion map

| Section | Input | Response | Usability bounds |
| --- | --- | --- | --- |
| Hero | Early reversible scroll, pointer | Mirror, silk, flacon and pearls converge from separated positions, up to 130px; reflected glint follows pointer; outer line draws | Text and CTA never move. Mobile uses smaller travel. |
| Introduction | Early scroll, pointer | Ring rotates from 25° and moves 100px; ribbon enters from the opposite side; thread draws | Short integrated composition, copy fixed. |
| Services | Scroll, pointer, service selection | Hair/comb, eye/brush, bottle/stones assemble separately; distinct scene crossfade and 55px switch movement | Accordion buttons stay fixed on hover; selection uses native buttons. |
| Planner | Scroll, pointer, native radio changes | Orbital lines converge from opposite sides; dial rotates and fills from 0/3 to 3/3; preview updates immediately | The paper card, controls and result actions are stable. |
| Contacts | Scroll, pointer | Rose rings converge behind contact copy within a clipped decorative container | Fields, focus outlines, dropdown and contact actions are not clipped or transformed. |
| Header | Fine pointer | Inner Contacts pill moves at most 5/4px and returns on leave/focus | Anchor box stationary; touch and system reduced motion disable displacement. |

Progress begins when a section enters the viewport, remains visible throughout, and reverses with native scrolling. Rendering is scheduled from input events; no endless animation loop. Pointer geometry is cached per section. The thematic mirror cursor appears only on nontext visual zones. Text, controls, links and fields retain normal cursors. Reduced motion follows the operating system only; there is no manual toggle or persisted option.

## Useful interactive flow

1. Choose occasion, available time and primary direction. Native radio groups support mouse, touch and keyboard; a live preview reflects each choice.
2. Generate a plan: a tailored focus, practical time constraint, and concrete preparation. All 27 combinations produce a coherent recommendation. Time is the visitor's budget, never a promised service duration.
3. Transfer the complete brief and selected direction to the demo form. Changing a planner choice invalidates an old result and any attached brief. Choosing a different service clears the old brief; confirming the same service retains it.
4. Reset clears the choices, result, attached brief and attached service. The first choice receives focus.
5. The demo form requires a valid name, phone and direction; shows useful errors, focuses the first invalid field, clears personal values after success, and supports repeat. No network request or personal-data storage is made.

The branded dropdown is a single accessible combobox, backed by a hidden select. Its fixed menu stays within the viewport, closes when the trigger leaves the usable area, and does not cover the sticky header. Contact details are from the existing verified research; demo status remains explicit. Footer credit is plain text: “Сайт создан Spoki Studio”.
