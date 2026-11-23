// Fades section content in once as it scrolls into view. Skipped for reduced motion.
// The hero is left alone (its connectors measure element positions).
export function initReveal(root) {
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  root.querySelectorAll('.section .section__head, .section .card, .section .gallery__item').forEach((el) => {
    el.style.setProperty('--i', String([...el.parentElement.children].indexOf(el) % 3));
    el.classList.add('reveal');
    // Once revealed, drop the helper classes so hover transitions are not delayed.
    el.addEventListener('transitionend', (ev) => {
      if (ev.target === el && ev.propertyName === 'transform' && el.classList.contains('is-visible')) el.classList.remove('reveal', 'is-visible');
    });
    io.observe(el);
  });
}
