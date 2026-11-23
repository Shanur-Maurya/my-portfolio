import { h } from '../utils/dom.js';

export function createHeroImage({ src, alt, width, height }) {
  return h('img', { class: 'hero__figure', src, alt, width, height, decoding: 'async', fetchpriority: 'high' });
}
