import { h } from '../utils/dom.js';
import { icon } from './Icon.js';

// Light/dark switch. The initial theme is set before paint by public/theme-init.js.
export function createThemeToggle() {
  const root = document.documentElement;
  const button = h('button', { class: 'icon-btn', type: 'button' });
  const render = () => {
    const dark = root.getAttribute('data-theme') === 'dark';
    button.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    button.replaceChildren(icon(dark ? 'sun' : 'moon'));
  };
  button.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch { /* storage blocked: theme still switches for this visit */ }
    render();
  });
  render();
  return button;
}
