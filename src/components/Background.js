import { h } from '../utils/dom.js';

const SHAPES = ['ring', 'square', 'dot', 'plus', 'ring', 'dot', 'square', 'plus'];

// Decorative, fixed layer behind the page: drifting colour glows, a dot grid, floating shapes and a soft
// light that follows the pointer. CSS-only motion; see the "Live background" block in components.css.
export function createBackground() {
  const spot = h('div', { class: 'bg__spot' });
  const bg = h('div', { class: 'bg', 'aria-hidden': 'true' },
    h('div', { class: 'bg__grid' }),
    h('div', { class: 'bg__blob bg__blob--a' }),
    h('div', { class: 'bg__blob bg__blob--b' }),
    h('div', { class: 'bg__blob bg__blob--c' }),
    spot,
    h('div', { class: 'bg__shapes' }, ...SHAPES.map((s) => h('span', { class: `bg__shape bg__shape--${s}` }))));

  const canFollow = matchMedia('(hover: hover) and (pointer: fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (canFollow) {
    let frame = 0;
    window.addEventListener('pointermove', (e) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        bg.style.setProperty('--mx', `${e.clientX}px`);
        bg.style.setProperty('--my', `${e.clientY}px`);
        bg.classList.add('has-pointer');
      });
    }, { passive: true });
  }
  return bg;
}
