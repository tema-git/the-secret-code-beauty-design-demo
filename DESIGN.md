# The Secret Code — visual direction

An independent Russian-language design concept for a real multi-service beauty salon from the user's no-site list. The visitor can explore services, create a beauty mood card, and contact the salon. The form is a clearly labelled local demo. Do not convert it to a real booking claim without a backend and the owner's agreement.

## Visual plan and review

Deep wine beauty editorial, asymmetrical portrait, sculptural rose orbits and silk-like vector ribbons. One large portrait is a fictional campaign mood, not a portfolio. Typography leads the page: Cormorant Garamond for expressive Russian headlines and Manrope for legible controls.

Initial default cream/serif direction was rejected in favour of a wine/pink fashion campaign. Photography and ribbon geometry carry personality. No fake stats, placeholder team or fabricated reviews.

Palette: plum `#351528`, wine `#54213c`, rose `#f1a9c7`, paper pink `#f9eef1`, text `#3c1f30`, secondary `#775b69`. Bright rose is the primary action on dark surfaces; wine is the action on pale sections. Body 18px; controls 16px; minor text minimum 14px. Desktop section padding 112px, mobile 65–78px; fluid headlines. Rounded CTA, arched portraits and unboxed content contrast with the rectangular configurator.

## References inspected on 2026-11-04

- https://styles.refero.design/style/cdc4a162-cefa-49a1-81e7-4857e421ae24 — Adam Lippes: editorial image proportions, restrained layout framing, photographic composition. Deliberately replaced monochrome/small labels with rose actions and readable Cyrillic type per user requirements.
- https://21st.dev/@manuarora700/components/card-spotlight — public component description, usage and MIT metadata read. Spotlight's input→light relationship inspired an original vanilla CSS/JS light field over imagery. No gated component code copied, no React dependency; imported component behavior is not claimed tested.
- https://motionsites.ai/lesson/build-scroll-animated-website-with-ai — scroll-as-progress and separate text/art layers. Adapted to original lightweight SVG ribbon drawing, orbit assembly and photo transforms; no source video, image sequence or paid prompt used.

## Motion map

| Section | Input | Visible response | Bounds / alternative |
| --- | --- | --- | --- |
| Hero | Pointer and native scroll | Portrait light changes, offset outline, three long SVG ribbons draw, portrait scales | Decorative layers only; links stay fixed. Mobile uses native scroll. |
| About | Early section entry, pointer | Still-life enters from -115px with -11° rotation, vector ribbon draws, light movement | Smaller 40px mobile travel; text always visible. |
| Services | Scroll, pointer, click/focus | Two ellipses assemble from opposite sides (±90px), portrait converges, service detail opens and art treatment changes | All headings are native buttons, targets stationary. |
| Beauty code | Scroll, pointer, button choices | Sphere and orbital rings assemble from ±100px, selection changes palette and result card | Native buttons, aria-pressed and focus result; tap and keyboard fully supported. |
| Editorial interlude | Scroll, pointer | Portrait zooms 1.35→1.05; large type moves from the side; bounded parallax | No text content hidden; motion reduced to final composition. |
| Visit | Early section entry, pointer | Line draws across three steps; numbered markers converge from 55/85/115px | Vertical line and smaller composition on mobile. |
| Contacts | Scroll and pointer | Large orbit curves assemble behind the contact copy | Form and all contact actions remain stationary. |

Progress starts when the section top first enters the bottom of the viewport; it does not wait for full visibility or pinning. Progress is reversible and follows native scrolling. Frame work is scheduled on input, not an endless loop. Pointer coordinates use section bounds cached on enter/resize. There is no custom cursor.

## User requirements

Sticky header including mobile, always-visible accented Contacts, SVG arrows diagonal up-right to right on hover/focus. Text selection uses transparent background and contrasting letter colour. Reduced motion respects OS settings and a footer switch. No auto-play or video. No tracking or localStorage; personal form values are cleared on success, reset and pagehide. A demo message and image provenance label are visible.

## Interactive scenario

Select one occasion and one mood → click Show my code → receive a named mood, description and relevant service directions → discuss with master or reset. Incomplete choices give an explicit message and focus the missing group. Rapid repeats remain deterministic. Booking validates name and phone, then clears values and shows a truthful demo success; user can restart.
