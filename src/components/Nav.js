import { h } from '../utils/dom.js';
import { icon } from './Icon.js';

// Sticky bar: brand and section links. Links collapse into a menu on small screens.
export function createNav({ brand, links }) {
  const menuBtn = h('button', { class: 'icon-btn nav__menu', type: 'button', 'aria-expanded': 'false', 'aria-controls': 'site-menu', 'aria-label': 'Open menu' }, icon('menu'));
  const list = h('nav', { class: 'nav__links', id: 'site-menu', 'aria-label': 'Primary' },
    ...links.map((l) => h('a', { class: 'nav__link', href: `#${l.anchor}` }, l.label)));
  const header = h('header', { class: 'page__nav' }, h('div', { class: 'nav' },
    h('a', { class: 'nav__brand', href: `#${links[0]?.anchor ?? ''}`, 'aria-label': 'Back to top' }, brand),
    list,
    h('div', { class: 'nav__actions' }, menuBtn)));

  const setOpen = (open) => {
    header.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menuBtn.replaceChildren(icon(open ? 'x' : 'menu'));
  };
  menuBtn.addEventListener('click', () => setOpen(!header.classList.contains('is-open')));
  list.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });

  const onScroll = () => header.classList.toggle('is-stuck', window.scrollY > 8);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  return header;
}

// Marks the link of the section crossing the middle of the screen. Call after the sections are in the page.
export function trackActive(nav, anchors) {
  if (!('IntersectionObserver' in window)) return;
  const links = new Map([...nav.querySelectorAll('.nav__link')].map((a) => [a.getAttribute('href').slice(1), a]));
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      links.forEach((a, id) => (id === e.target.id ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')));
    }
  }, { rootMargin: '-45% 0px -50% 0px' });
  anchors.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
}
