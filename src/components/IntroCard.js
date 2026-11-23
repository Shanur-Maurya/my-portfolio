import { h } from '../utils/dom.js';
import { createBaseCard } from './BaseCard.js';
import { icon } from './Icon.js';
import { safeHref } from '../utils/validation.js';

// A title written as "Role | Tagline" is shown as a heading with the tagline beneath it.
export function createIntroCard({ title, description, cta }, { email }) {
  const href = cta.type === 'email' ? `mailto:${email}` : safeHref(cta.href);
  const [role, ...rest] = title.split('|').map((t) => t.trim());
  const tagline = rest.join(' | ');
  return createBaseCard({
    slot: 'introduction',
    title: role,
    children: [
      tagline && h('p', { class: 'card__tagline' }, tagline),
      h('p', { class: 'card__text' }, description),
      h('a', { class: 'link-cta', href }, cta.label, icon('arrow-right'))
    ]
  });
}
