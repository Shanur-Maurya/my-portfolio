import { h } from '../utils/dom.js';
import { createBaseCard } from './BaseCard.js';
import { icon } from './Icon.js';
import { getPublicEmail } from '../services/contact.service.js';
import { safeHref } from '../utils/validation.js';

// One row per contact method: icon tile, label, and an arrow that appears on hover.
function row({ iconName, label, href, external = false }) {
  const attrs = { class: 'contact__row', href };
  if (external) Object.assign(attrs, { target: '_blank', rel: 'noopener noreferrer' });
  return h('li', {}, h('a', attrs,
    h('span', { class: 'icon-tile icon-tile--sm' }, icon(iconName)),
    h('span', { class: 'contact__label' }, label),
    icon('arrow-up-right')));
}

export function createContactCard(cfg) {
  const email = getPublicEmail(cfg);
  return createBaseCard({
    slot: 'contact',
    title: cfg.title,
    icon: 'send',
    children: [
      h('ul', { class: 'contact__list' },
        row({ iconName: 'mail', label: email, href: `mailto:${email}` }),
        cfg.phone && row({ iconName: 'phone', label: cfg.phone, href: `tel:${cfg.phone.replace(/[^\d+]/g, '')}` }),
        ...(cfg.links ?? []).map((l) => row({ iconName: l.icon ?? 'link', label: l.label, href: safeHref(l.href), external: true })))
    ]
  });
}
