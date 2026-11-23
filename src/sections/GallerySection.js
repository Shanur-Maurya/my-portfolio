import { h } from '../utils/dom.js';
import { icon } from '../components/Icon.js';

// Masonry of design images; clicking one opens the full-size file in a dialog.
// Inside the dialog, click the image to zoom to full width (tall pages then scroll).
export function createGallerySection(cfg, key) {
  const items = cfg.items.filter((i) => i.visible !== false).sort((a, b) => a.order - b.order);
  const big = h('img', { class: 'lightbox__img', alt: '' });
  const zoom = h('button', { class: 'lightbox__zoom', type: 'button', 'aria-label': 'Toggle zoom' }, big);
  const caption = h('p', { class: 'lightbox__caption' });
  const close = h('button', { class: 'icon-btn lightbox__close', type: 'button', 'aria-label': 'Close' }, icon('x'));
  const dialog = h('dialog', { class: 'lightbox', 'aria-label': cfg.title }, close, zoom, caption);
  close.addEventListener('click', () => dialog.close());
  zoom.addEventListener('click', () => dialog.classList.toggle('is-zoomed'));
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => dialog.classList.remove('is-zoomed'));

  const tiles = items.map((it) => {
    const tile = h('button', { class: 'gallery__item', type: 'button', 'aria-label': `View larger: ${it.title ?? it.alt}` },
      h('img', { src: it.src, alt: '', width: it.width, height: it.height, loading: 'lazy', decoding: 'async' }),
      h('span', { class: 'gallery__veil', 'aria-hidden': 'true' },
        h('span', { class: 'gallery__title' }, it.title ?? ''),
        h('span', { class: 'gallery__zoom' }, icon('zoom-in'))));
    tile.addEventListener('click', () => {
      big.src = it.full ?? it.src; big.alt = it.alt;
      caption.textContent = `${it.title ?? it.alt} · click the image to zoom`;
      dialog.showModal();
    });
    return tile;
  });
  return h('section', { class: 'section', 'aria-labelledby': `${key}-title` },
    h('header', { class: 'section__head' },
      h('h2', { class: 'section__title', id: `${key}-title` }, cfg.title),
      cfg.description && h('p', { class: 'section__intro' }, cfg.description)),
    h('div', { class: 'gallery' }, ...tiles),
    dialog);
}
