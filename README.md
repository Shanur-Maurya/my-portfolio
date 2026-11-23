# Portfolio

Vanilla HTML, CSS and JS with Vite. Three small font packages, no framework.

## Run
`npm install`, then `npm run dev`. Deploy `dist/`; `public/_headers` carries the CSP and security headers (Netlify and Cloudflare Pages format; copy them to your host's config otherwise).

## Change content
- Name, title, intro, skills, region, email: `src/data/public-profile.json`. Everything there is public; never put secrets in it.
- Skills: `{ id, label, visible, order, emphasis }`. Add, remove, hide or reorder by editing the list.
- Toggle a card: set `enabled: false` in `src/config/site.config.js`. It is not rendered and takes no space.
- CTA: `introduction.cta` (`type: 'email'` or `type: 'link'` with `href`).

## Structure
`app/` boots and renders sections in the order of `config/sections.config.js`. `sections/` compose `components/`. Every card is built by `BaseCard`. `Connector` is the only class (it observes layout).

## Add a card
Create `components/XCard.js` that returns `createBaseCard({ slot, title, icon, children })`, add its config to `site.config.js`, and place it in a rail in `HeroSection.js`. Add its `data-slot` to `connectors` and to the mobile order in `responsive.css`.

## Add a section
Create `sections/AboutSection.js`, add it to `app/sectionRegistry.js`, then add `{ id: 'about', enabled: true, order: 2 }` to `sections.config.js` and an `about` block to `site.config.js`.

## Replace the photo
Use a transparent WebP at `public/assets/images/profile.webp` and update `photo.width/height` in the JSON. Tune where connectors land with `connectors` in `site.config.js`. Name overlap: `--name-overlap` in `variables.css`.

## Theme
All tokens are in `src/styles/variables.css`. The site is light-only: keep `color-scheme: only light` and the meta tag in `index.html`.

## Backend later
`services/contact.service.js` is the only place that talks to a server. Point it at a serverless endpoint that validates, rate-limits and adds spam protection, keep secrets server-side, and add the endpoint origin to `connect-src` in `public/_headers`.

## Map credit
`public/assets/maps/goa.svg` is drawn from Natural Earth admin-1 boundaries (public domain). It shows only the state outline, with no pin or coordinates. To swap it, change `location.map` in `public-profile.json`.

## Projects and Skills sections
- Projects: edit `projects` in `src/data/public-profile.json` (`title`, `summary`, `tags`, `caseStudy` PDF link, `image` path from `public/` plus `imageAlt`). The PDF opens in a new tab; to self-host, put it in `public/case-studies/` and use `/case-studies/name.pdf`. The images in `public/assets/images/projects/` are placeholders: replace them with your screenshots using the same filenames. The section intro is `projectsIntro`.
- Order or hide a section in `config/sections.config.js`. Both have anchors: `#projects`, `#skills`.

## Navigation, galleries and motion
- Nav bar: built from `config/sections.config.js` (`nav` label and `anchor` per section). Remove `nav` to hide a section from the bar; `nav.enabled` in `site.config.js` turns the whole bar off.
- Gallery: `webDesigns` in `public-profile.json` (`src`, `alt`, `width`, `height`). Images in `public/assets/images/design/` are placeholders; replace them with your own using the same filenames, and update `width`/`height` to match. Click opens a larger view.
- Motion: hero entrance, scroll reveal (`utils/reveal.js`), hover effects and the live background (`components/Background.js`) all live in the motion block at the end of `components.css`, and switch off when the visitor prefers reduced motion.

## Gallery and contact icons
- Gallery items in `webDesigns`: `{ id, title, src (thumbnail), full (large file for the dialog), alt, width, height, visible, order }`. Thumbnails are 640px wide, full files up to 1500px, both WebP. Click an image in the dialog to zoom; tall pages then scroll.
- Contact links in `contact.links` take an `icon` (`linkedin`, `github`, `link`, ...). Icons live in `components/Icon.js`.
