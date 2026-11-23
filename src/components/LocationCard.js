import { h } from '../utils/dom.js';
import { createBaseCard } from './BaseCard.js';

// The map is optional: with no asset configured the card simply shows the region.
export function createLocationCard({ title, region, map }) {
  return createBaseCard({
    slot: 'location',
    title,
    icon: 'map-pin',
    children: [
      h('p', { class: 'card__region' }, region),
      map && h('img', { class: 'map', src: map.src, alt: map.alt, width: map.width, height: map.height, loading: 'lazy' })
    ]
  });
}
