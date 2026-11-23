import { createHeroSection } from '../sections/HeroSection.js';
import { createProjectsSection } from '../sections/ProjectsSection.js';
import { createGallerySection } from '../sections/GallerySection.js';

// id -> renderer. A new section is one file plus one line here and one in sections.config.js.
export const registry = {
  hero: createHeroSection,
  projects: createProjectsSection,
  webui: (cfg) => createGallerySection(cfg, 'webui')
};
