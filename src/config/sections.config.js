// `anchor` is the #link target, `nav` the label in the navigation bar (omit nav to hide it from the bar).
// Add future sections here and register a renderer in app/sectionRegistry.js.
export const sectionsConfig = [
  { id: 'hero', enabled: true, order: 1, anchor: 'home', nav: 'Home' },
  { id: 'projects', enabled: true, order: 2, anchor: 'projects', nav: 'Projects' },
  { id: 'webui', enabled: true, order: 3, anchor: 'web-ui-design', nav: 'Web & UI' }
];
