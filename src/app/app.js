import { siteConfig } from '../config/site.config.js';
import { sectionsConfig } from '../config/sections.config.js';
import { registry } from './sectionRegistry.js';
import { validateSiteConfig } from '../utils/validation.js';
import { initReveal } from '../utils/reveal.js';
import { createNav, trackActive } from '../components/Nav.js';
import { createBackground } from '../components/Background.js';
import { h } from '../utils/dom.js';

export function createApp(root) {
  validateSiteConfig(siteConfig);
  const active = sectionsConfig
    .filter((s) => s.enabled && registry[s.id] && siteConfig[s.id]?.enabled !== false)
    .sort((a, b) => a.order - b.order);
  const sections = active.map((s) => {
    const el = registry[s.id](siteConfig[s.id]);
    el.id = s.anchor ?? s.id;
    return el;
  });
  const links = active.filter((s) => s.nav).map((s) => ({ label: s.nav, anchor: s.anchor ?? s.id }));
  const navOn = siteConfig.nav.enabled;
  const nav = navOn ? createNav({ brand: siteConfig.nav.brand, links }) : h('div', { class: 'page__nav' });
  root.replaceChildren(createBackground(), h('div', { class: 'page' },
    nav,
    h('main', { class: 'page__main' }, ...sections),
    h('div', { class: 'page__footer', 'aria-hidden': 'true' }))); // reserved for the future footer
  if (navOn) trackActive(nav, links.map((l) => l.anchor));
  initReveal(root);
}
