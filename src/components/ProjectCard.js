import { h } from '../utils/dom.js';
import { createBaseCard } from './BaseCard.js';
import { icon } from './Icon.js';
import { safeHref } from '../utils/validation.js';

// Image, short intro, and a button that opens the case study PDF in a new tab.
export function createProjectCard(project, { ctaLabel }) {
  const media = h('div', { class: 'project__media' },
    project.image && h('img', { src: project.image, alt: project.imageAlt ?? project.title, loading: 'lazy', decoding: 'async' }));
  return createBaseCard({
    slot: 'project',
    variant: 'card--project',
    children: [
      media,
      h('h3', { class: 'card__title' }, project.title),
      h('p', { class: 'card__text' }, project.summary),
      project.tags?.length && h('ul', { class: 'pill-list' }, ...project.tags.map((t) => h('li', { class: 'pill' }, t))),
      h('a', { class: 'btn', href: safeHref(project.caseStudy), target: '_blank', rel: 'noopener noreferrer', 'aria-label': `${ctaLabel}: ${project.title} (opens PDF in a new tab)` }, ctaLabel, icon('arrow-right'))
    ]
  });
}
