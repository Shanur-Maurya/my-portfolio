import { h } from '../utils/dom.js';
import { createBaseCard } from '../components/BaseCard.js';

export function createSkillsSection(cfg) {
  const items = cfg.items.filter((s) => s.visible !== false).sort((a, b) => a.order - b.order);
  return h('section', { class: 'section', id: 'skills', 'aria-labelledby': 'skills-title' },
    h('header', { class: 'section__head' },
      h('h2', { class: 'section__title', id: 'skills-title' }, cfg.title),
      cfg.description && h('p', { class: 'section__intro' }, cfg.description)),
    h('div', { class: 'card-grid' }, ...items.map((s) => createBaseCard({
      slot: 'skill', title: s.label, icon: s.icon, headingTag: 'h3',
      children: [h('p', { class: 'card__text' }, s.description)]
    }))));
}
