import { h } from '../utils/dom.js';
import { createBaseCard } from './BaseCard.js';

export function createSkillsCard({ title, description, items }) {
  const skills = items.filter((s) => s.visible !== false).sort((a, b) => a.order - b.order);
  return createBaseCard({
    slot: 'skills',
    title,
    children: [
      h('p', { class: 'card__text' }, description),
      h('ul', { class: 'pill-list' }, ...skills.map((s) => h('li', { class: s.emphasis ? 'pill pill--emphasis' : 'pill' }, s.label)))
    ]
  });
}
