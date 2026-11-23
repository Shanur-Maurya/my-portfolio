import { h } from '../utils/dom.js';
import { createProjectCard } from '../components/ProjectCard.js';

export function createProjectsSection(cfg) {
  const items = cfg.items.filter((p) => p.visible !== false).sort((a, b) => a.order - b.order);
  return h('section', { class: 'section', id: 'projects', 'aria-labelledby': 'projects-title' },
    h('header', { class: 'section__head' },
      h('h2', { class: 'section__title', id: 'projects-title' }, cfg.title),
      cfg.description && h('p', { class: 'section__intro' }, cfg.description)),
    h('div', { class: 'card-grid' }, ...items.map((p) => createProjectCard(p, { ctaLabel: cfg.ctaLabel }))));
}
