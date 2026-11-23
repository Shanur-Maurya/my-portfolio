import { h } from '../utils/dom.js';
import { icon } from './Icon.js';

// Every card is built from this: shared structure, per-card content.
export function createBaseCard({ slot, variant = '', title, icon: iconName, children = [], headingTag = 'h2' }) {
  const head = (iconName || title) && h('header', { class: 'card__head' },
    iconName && h('span', { class: 'icon-tile' }, icon(iconName)),
    title && h(headingTag, { class: 'card__title' }, title));
  return h('article', { class: `card ${variant}`.trim(), 'data-slot': slot }, head, ...children);
}
